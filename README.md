## ✅ Melhorias implementadas

Com base no feedback recebido, foram realizadas as seguintes melhorias no projeto:

* ✔ Ajuste das variáveis de ambiente para padrão Cloudflare (CLOUDFLARE_*)
* ✔ Criação do arquivo `.env.example`
* ✔ Remoção de valores hardcoded (porta e conexão com banco)
* ✔ Implementação de validação robusta de URLs (http/https + estrutura válida)
* ✔ Tratamento de erros no frontend para melhor experiência do usuário
* ✔ Implementação de responsividade para dispositivos móveis
* ✔ Ajustes visuais para melhor aderência ao layout proposto
* ✔ Organização e limpeza do repositório

### 🔧 Melhorias futuras

* Implementação de exportação CSV com streams para melhor performance
* Migração do backend para TypeScript + Fastify + Drizzle ORM conforme stack proposta


# Brev.ly - Encurtador de URLs

Projeto desenvolvido como desafio prático para criação de um encurtador de URLs com backend e frontend integrados.

---

## 🚀 Funcionalidades

* Criar links encurtados
* Listar links cadastrados
* Deletar links
* Copiar link encurtado
* Redirecionamento automático
* Contador de acessos
* Exportação de relatório em CSV

---

## 🛠️ Tecnologias utilizadas

### Backend

* Node.js
* Express
* PostgreSQL
* Cloudflare R2 (armazenamento do CSV)

### Frontend

* React
* Vite

---

## ⚙️ Configuração do projeto

### 1. Clonar repositório

git clone https://github.com/Janainaffalco/brevly-url-shortener.git

---

### 2. Backend

Acesse a pasta:

cd server

Instale as dependências:

npm install

Crie o arquivo `.env` com base no `.env.example`

Execute:

npm run dev

---

### 3. Frontend

Acesse a pasta:

cd web

Instale as dependências:

npm install

Execute:

npm run dev

---

## 🔐 Variáveis de ambiente

Exemplo disponível em:

.env.example

---

## 📌 Observações

* A API realiza validação de URLs garantindo uso de http/https
* O CSV é gerado com nome único e armazenado no Cloudflare R2
* Melhorias de performance podem ser aplicadas utilizando paginação ou streams

---

## 👩‍💻 Autora

Janaina Falco
