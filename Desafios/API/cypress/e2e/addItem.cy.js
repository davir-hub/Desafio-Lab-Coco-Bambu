function gerarProduto() {                         // Função auxiliar para gerar um produto aleatório (com id entre 1 e 30, quantidade entre 1 e 5)
  return {
    id: Math.floor(Math.random() * 30) + 1,
    quantity: Math.floor(Math.random() * 5) + 1
  };
}

describe('API - Adicionar ao carrinho', () => {
  const userId = 1;                                               // ID fixo do usuário para os testes

  it('Deve adicionar um produto ao carrinho com sucesso', () => {
    const produto = gerarProduto();                               // Gera um produto aleatório para o teste

    cy.api('POST', '/carts/add', {                                // Faz requisição POST para adicionar produto ao carrinho
      userId,
      products: [produto]
      
    }).then((res) => {

      expect(res.status).to.eq(201);                             // Valida que o status da resposta é 201 (Created)
      expect(res.body.products[0]).to.deep.include(produto);     // Verifica se o produto adicionado está presente na resposta
      expect(res.body.userId).to.eq(userId);                     // Verifica se o ID do usuário retornado é o mesmo que foi enviado
      expect(res.body.total).to.be.a('number');                  // Verifica se o total do carrinho é um número (valor monetário)
    });
  });

  it('Deve retornar erro ao enviar userId inválido', () => {

    cy.api({                                                     // Tenta adicionar produto com userId inválido (null)
      method: 'POST',
      url: '/carts/add',
      failOnStatusCode: false,                                   // Não falha o teste automaticamente se status for erro
      body: {
        userId: null,
        products: [gerarProduto()]
      }
    }).then((res) => {

      expect(res.status).to.be.oneOf([400, 500]);                // Espera um erro (status 400 ou 500 dependendo do servidor)
    });
  });

  it('Deve retornar erro ao enviar sem produtos', () => {

    cy.api({                                                    // Tenta adicionar um carrinho sem nenhum produto
      method: 'POST',
      url: '/carts/add',
      failOnStatusCode: false,
      body: {
        userId,
        products: []                                            // Lista vazia de produtos
      }
    }).then((res) => {                                          // Espera um erro indicando que a requisição é inválida

      expect(res.status).to.be.oneOf([400, 422]);               // 422 = Unprocessable Entity
    });
  });
});

