import "dotenv/config";

import express from "express";
import cors from "cors";
import { pool } from "./database/connection.js";
import { Parser } from "json2csv";
import { s3 } from "./storage/s3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";


function generateShortCode(length = 6) {
  return crypto.randomBytes(length).toString("base64url").slice(0, length);
}
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Brev.ly API running");
});

async function testDatabase() {
  try {
    const client = await pool.connect();
    console.log("Conectado ao PostgreSQL");
    client.release();
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
  }
}

testDatabase();

app.post("/links", async (req, res) => {
  const { originalUrl } = req.body;
  let { shortUrl } = req.body;

  //valida protocolo
if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
  return res.status(400).json({
    error: "URL inválida"
  });
}

  // validar URL
  try {
    new URL(originalUrl);
  } catch {
    return res.status(400).json({
      error: "URL inválida"
    });
  }

  try {
    // se não veio shortUrl, gerar automaticamente
    if (!shortUrl) {
      shortUrl = generateShortCode(6);
    }

    // verificar se já existe
    const existing = await pool.query(
      "SELECT * FROM links WHERE short_url = $1",
      [shortUrl]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        error: "URL encurtada já existe"
      });
    }
    if (shortUrl && shortUrl.length > 20) {
      return res.status(400).json({
        error: "shortUrl muito longa"
      });
    }

    if (shortUrl && shortUrl.includes(" ")) {
      return res.status(400).json({
        error: "shortUrl não pode conter espaços"
      });
    }

    const result = await pool.query(
      "INSERT INTO links (original_url, short_url) VALUES ($1, $2) RETURNING *",
      [originalUrl, shortUrl]
    );

    return res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao criar link"
    });
  }
});

app.get("/links", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM links ORDER BY created_at DESC"
    )

    return res.json(result.rows)

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: "Erro ao listar links"
    })
  }
})


app.get("/links/export", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT original_url, short_url, access_count, created_at FROM links ORDER BY created_at DESC"
    );

    const links = result.rows;

    const parser = new Parser({
      fields: ["original_url", "short_url", "access_count", "created_at"],
    });

    const csv = parser.parse(links);

    const fileName = `links-${crypto.randomUUID()}.csv`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET,
        Key: fileName,
        Body: csv,
        ContentType: "text/csv",
      })
    );

    const publicUrl = `${process.env.CLOUDFLARE_PUBLIC_URL}/${fileName}`;

    return res.json({
      url: publicUrl,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao exportar CSV",
    });
  }
});

app.delete("/links/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM links WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Link não encontrado"
      });
    }

    return res.json({
      message: "Link deletado com sucesso"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao deletar link"
    });
  }
});

app.get("/links/:shortUrl/stats", async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const result = await pool.query(
      "SELECT original_url, short_url, access_count, created_at FROM links WHERE short_url = $1",
      [shortUrl]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Link não encontrado"
      });
    }

    return res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao buscar estatísticas"
    });
  }
});

app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM links WHERE short_url = $1",
      [shortUrl]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Link não encontrado"
      });
    }

    const link = result.rows[0];

    await pool.query(
      "UPDATE links SET access_count = access_count + 1 WHERE id = $1",
      [link.id]
    );

    return res.redirect(link.original_url);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao buscar link"
    });
  }
});
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});