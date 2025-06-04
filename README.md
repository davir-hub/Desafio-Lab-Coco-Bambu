
# 🧪 Desafio Lab Coco Bambu

Projeto de testes automatizados de interface (UI) e API utilizando Cypress, desenvolvido para o desafio técnico de QA da Lab Coco Bambu.

---

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[📦 Implantação](#-implantação)** para saber como implantar o projeto.

---

### 📋 Pré-requisitos

Você precisará dos seguintes softwares instalados:

```
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [VSCode](https://code.visualstudio.com/)
- Git (opcional, para clonar o projeto)
```

---

### 🔧 Instalação

1. Clone o repositório (ou baixe como ZIP):

```
git clone https://github.com/seu-usuario/desafio-lab-coco-bambu.git
```

2. Acesse o diretório do projeto (UI ou API):

```
cd Desafios/UI
```

ou

```
cd Desafios/API
```

3. Instale as dependências do projeto:

```
npm install
```

4. Abra o Cypress:

```
npx cypress open
```

5. Execute os testes pela interface do Cypress.

---

## ⚙️ Executando os testes

O projeto possui testes automatizados para verificar o funcionamento correto da aplicação, tanto na interface quanto na camada de API.

---

### 🔩 Análise dos testes de ponta a ponta

Os testes end-to-end verificam fluxos críticos, como:

```
- Adicionar produto ao carrinho
- Atualizar produtos com merge ou substituição
- Remover carrinho existente
- Testar cenários de erro: usuário inválido, carrinho inexistente, payloads inválidos
```

Exemplo de estrutura de teste de API:

```js
cy.api('POST', '/carts/add', {
  userId: 1,
  products: [{ id: 5, quantity: 2 }]
});
```

---

### ⌨️ E testes de estilo de codificação

Este projeto não utiliza testes de lint (estilo de código), mas recomenda-se o uso de ferramentas como ESLint ou Prettier em projetos futuros para padronização.

---

## 📦 Implantação

Como este é um projeto de testes, não há implantação em ambiente de produção. Para simular os testes, utilize a estrutura local com a aplicação ou mock API.

---

## 🛠️ Construído com

Ferramentas e frameworks utilizados:

* [Cypress](https://www.cypress.io/) – Testes E2E e de API
* [Node.js](https://nodejs.org/) – Ambiente de execução do Cypress

---

## 🖇️ Colaborando

Por enquanto, contribuições externas não estão sendo aceitas por se tratar de um desafio técnico pessoal. Mas fique à vontade para abrir *issues* com sugestões.

---

## 📌 Versão

Usa-se controle de versão semântico ([SemVer](http://semver.org/)).

---

## ✒️ Autores

* **Davi Romão** – *Desenvolvimento e automação de testes* – [@seuGitHub](https://github.com/seuGitHub)

---

## 📄 Licença

Este projeto não possui uma licença definida no momento.
