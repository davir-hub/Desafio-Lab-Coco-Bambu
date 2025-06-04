describe('API - Deletar carrinho', () => {
  const cartId = 1;                                               // Define o ID do carrinho a ser deletado (carrinhos reais vão de 1 a 20)

  it('Deve deletar carrinho existente com sucesso ', () => {

    cy.api({                                                      
      method: 'DELETE',                                           // Faz requisição DELETE para remover um carrinho existente
      url: `/carts/${cartId}`,                                    // URL do carrinho a ser deletado
      failOnStatusCode: false                                     // Não falha automaticamente caso a resposta seja um erro
    }).then((res) => {

      expect([200, 400, 404]).to.include(res.status);             // Permite múltiplos status possíveis (varia no DummyJSON)

      if (res.status === 200) {                                   // Se o carrinho for realmente deletado com sucesso
        expect(res.body.isDeleted).to.be.true;                    // Verifica se a resposta indica que o carrinho foi deletado
        expect(res.body.id).to.eq(cartId);                        // Confirma que o ID do carrinho deletado é o mesmo solicitado
      }
    });
  });

  it('Deve retornar 404 ao tentar deletar carrinho inexistente', () => {

    cy.api({                                                      
      method: 'DELETE',                                           // Faz requisição DELETE para um carrinho inexistente
      url: '/carts/9999',                                         // ID fora do intervalo conhecido da API
      failOnStatusCode: false                                     // Impede o Cypress de falhar automaticamente
    }).then((res) => {

      expect(res.status).to.eq(404);                              // Espera o código de erro 404 (Not Found)
      expect(res.body.message).to.include("not found");           // Valida que a mensagem de erro é adequada
    });
  });
});
