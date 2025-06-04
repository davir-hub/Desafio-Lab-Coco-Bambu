describe('API - Atualizar carrinho', () => {
  const baseUrl = '/carts/1';                                        // Define a URL base para o carrinho de ID 1

  it('Atualiza carrinho existente com merge', () => {                // Define o produto a ser adicionado (merge = true)
    const produto = { id: 2, quantity: 3 };                          

    cy.api('PUT', baseUrl, {                                         // Faz requisição PUT para atualizar carrinho existente
      merge: true,                                                   // merge = true: mantém os produtos já existentes no carrinho
      products: [produto]
    }).then((res) => {

      expect(res.status).to.be.oneOf([200, 201]);                    // Valida que o status da resposta é 200 ou 201 (sucesso)
      expect(res.body.id).to.eq(1);                                  // Verifica se o carrinho atualizado tem o ID esperado

      const item = res.body.products.find(p => p.id === produto.id); // Busca o produto pelo ID na resposta da API
      expect(item).to.exist;                                         // Verifica se o produto foi realmente adicionado
      expect(item.quantity).to.eq(produto.quantity);                 // Confirma que a quantidade foi atualizada corretamente
    });
  });

  it('Substitui produtos no carrinho com merge = false', () => {
    const produto = { id: 3, quantity: 2 };                          // Define o novo produto a ser adicionado

    cy.api('PUT', baseUrl, {                                         // Faz requisição PUT para atualizar carrinho
      merge: false,                                                  // merge = false: substitui todos os produtos do carrinho
      products: [produto]
    }).then((res) => {

      expect(res.status).to.be.oneOf([200, 201]);                    // Verifica se a atualização foi bem-sucedida
      expect(res.body.products).to.have.length(1);                   // Verifica que agora há apenas um produto no carrinho

      const item = res.body.products[0];                             // Obtém o primeiro (e único) item do carrinho
      expect(item.id).to.eq(produto.id);                             // Verifica se o ID do produto está correto
      expect(item.quantity).to.eq(produto.quantity);                 // Verifica se a quantidade do produto está correta
    });
  });

  it('Retorna erro ao atualizar carrinho inexistente', () => {

    cy.api({                                                        
      method: 'PUT',                                                // Faz requisição PUT para um carrinho que não existe
      url: '/carts/9999',                                           // Carrinho inexistente (ID 9999)
      failOnStatusCode: false,                                      // Impede que o Cypress falhe automaticamente no erro HTTP
      body: {
        merge: true,
        products: [{ id: 1, quantity: 1 }]
      }
    }).then((res) => {

      expect(res.status).to.eq(404);                                // Espera erro 404 (não encontrado)
      expect(res.body.message).to.include('not found');             // Verifica se a mensagem de erro indica carrinho inexistente
    });
  });
});
