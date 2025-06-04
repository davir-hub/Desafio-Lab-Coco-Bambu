# 🧪 Desafio Lab Coco Bambu

Projeto desenvolvido como parte do desafio técnico de QA para a Lab Coco Bambu, com foco em testes automatizados de **UI** e **API** utilizando **Cypress**.

---

## 📌 Descrição

Este repositório contém testes end-to-end para validar fluxos críticos da aplicação fornecida no desafio. Os testes abrangem cenários positivos e negativos tanto para a interface do usuário quanto para os endpoints da API.

---

## 🚀 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/)
- [Node.js](https://nodejs.org/)

---

## 🗂 Estrutura do Projeto

Desafio-Lab-CocoBambu/
├── Desafios/
│ ├── UI/
│ │ └── cypress/
│ │ └── e2e/
│ │ └── testes-ui.cy.js
│ └── API/
│ └── cypress/
│ └── e2e/
│ └── testes-api.cy.js

markdown
Copiar
Editar

- **Testes de UI:** `Desafios/UI/cypress/e2e`
- **Testes de API:** `Desafios/API/cypress/e2e`

---

## 💻 Como Rodar o Projeto Localmente

1. Instale o [VSCode](https://code.visualstudio.com/) (caso ainda não tenha).
2. Clone o repositório ou acesse a pasta local do projeto:

bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
Navegue até o diretório desejado (UI ou API):

bash
Copiar
Editar
cd Desafio-Lab-CocoBambu/Desafios/API
ou

bash
Copiar
Editar
cd Desafio-Lab-CocoBambu/Desafios/UI
Instale as dependências:

bash
Copiar
Editar
npm install
Inicie o Cypress:

bash
Copiar
Editar
npx cypress open
Execute os testes desejados pela interface gráfica.

📊 (Opcional) Geração de Relatórios
Você pode adicionar geração de relatórios com Mochawesome:

Instale os pacotes:

bash
Copiar
Editar
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
Configure o cypress.config.js:

js
Copiar
Editar
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true
}
Rode os testes:

bash
Copiar
Editar
npx cypress run
Abra o relatório HTML em cypress/reports.

✅ Objetivos
Automatizar fluxos críticos com cobertura de testes.

Validar comportamentos esperados e erros na API.

Garantir consistência e qualidade nos testes automatizados.

Projeto desenvolvido por Davi Romão como parte do desafio da Lab Coco Bambu.