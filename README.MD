# Brev.ly – Encurtador de URL

Aplicação FullStack desenvolvida como parte do desafio da Rocketseat para criação de um encurtador de URLs.

O sistema permite criar links encurtados, redirecionar usuários, acompanhar estatísticas de acesso e exportar dados em CSV.

---

# Tecnologias utilizadas

## Backend

* Node.js
* Express
* PostgreSQL
* Cloudflare R2 (armazenamento de arquivos)
* JSON2CSV

## Frontend

* React
* Vite
* CSS
* React Router DOM
* Lucide Icons

---

# Funcionalidades

## Backend

Criar link encurtado

POST /links

Criar um novo link encurtado a partir de uma URL original.

---

Listar links

GET /links

Retorna todos os links cadastrados ordenados pela data de criação.

---

Redirecionar link

GET /:shortUrl

Redireciona o usuário para a URL original e incrementa o contador de acessos.

---

Estatísticas de acesso

GET /links/:shortUrl/stats

Retorna o número de acessos de um link encurtado.

---

Deletar link

DELETE /links/:id

Remove um link da base de dados.

---

Exportar CSV

GET /links/export

Exporta os links cadastrados em formato CSV e armazena o arquivo no Cloudflare R2.

---

# Frontend

Interface web que permite:

* Criar novos links encurtados
* Visualizar lista de links
* Copiar link encurtado
* Deletar links
* Visualizar número de acessos
* Exportar dados em CSV
* Redirecionar usuários ao acessar um link encurtado
* Exibir página de erro quando o link não existir

---

# Estrutura do projeto

server

* database
* storage
* server.js

web

* components
* pages
* services
* styles

---

# Como executar o projeto

## Backend

Entrar na pasta server

npm install

npm run dev

Servidor disponível em:

http://localhost:3333

---

## Frontend

Entrar na pasta web

npm install

npm run dev

Aplicação disponível em:

http://localhost:5173

---

# Autor

Projeto desenvolvido como parte do desafio da Rocketseat.
