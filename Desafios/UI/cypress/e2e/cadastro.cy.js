import { faker } from '@faker-js/faker';          // Importa a biblioteca faker, usada para gerar dados falsos e únicos (como nomes e e-mails).

describe('Suite de testes para cadastro', () => { //Início da suíte de testes de cadastro. Agrupa todos os testes relacionados a esse fluxo.
  let nome;                                       // Declara variáveis globais para nome e email, que serão usadas em todos os testes.
  let email;

  beforeEach(() => {                                  //Reseta o ambiente para cada teste garantindo a independência entre eless
    nome = faker.person.fullName();                   // Gera um nome aleatório
    email = gerarEmailAleatorio(nome);                // Gera e-mail baseado no nome gerado
    cy.visit("https://app-hom.cocobambu.com/entrar"); // Acessa a URL da aplicação
    cy.get('[text-left=""] > .link').click();         // Clica no link para iniciar o cadastro
  });

  function gerarEmailAleatorio(nome) {                          //Gera um e-mail único a partir do nome, removendo espaços e adicionando timestamp para evitar duplicação em testes. 
    return `${nome.replace(/\s/g, '')}${Date.now()}@gmail.com`; 
  }

  it('Teste 1 - Deve cadastrar um novo usuário com sucesso', () => {
    cy.preencherFormularioCadastro(nome, email, "SenhaForte@123", "SenhaForte@123"); // Preenche o formulário
    cy.selecioneSeuEstado();                                                         // Seleciona o estado (campo obrigatório)
    cy.preencherCamposObrigatórios();                                                // Marca os termos obrigatórios

    cy.get('.button-container > button').click();                                    // Clica em "Cadastrar"
    cy.get('.is-primary').click();                                                   // Confirma etapa do cadastro
    cy.get('input[type="text"]').first().type("AAAAAA");                             // Autentica o e-mail utilizado para o cadastro com o código enviado para o mesmo
    cy.get('.buttons-container > :nth-child(1)').click();                            // Avança e finaliza a etapa de cadastro
    cy.contains("Onde você quer receber seu pedido?").should("be.visible");          // Usa o texto da próxima tela para confirmar o cadastro
  });

   it('Teste 2 - Cadastro com caracteres especiais válidos no nome', () => {         
    cy.preencherFormularioCadastro("Joana D'arc", email, "SenhaForte@123", "SenhaForte@123");
    cy.selecioneSeuEstado();
    cy.preencherCamposObrigatórios();

    cy.get('.button-container > button').click();
    cy.get('.is-primary').click();

  })

   it('Teste 3 - Cadastro com nome em caixa alta', () => {
    cy.preencherFormularioCadastro("WADE WILSON", email, "SenhaForte@123", "SenhaForte@123");
    cy.selecioneSeuEstado();
    cy.preencherCamposObrigatórios();

    cy.get('.button-container > button').click();
    cy.get('.is-primary').click();
    cy.contains("Informe o código recebido em seu e-mail").should("be.visible")


  })

  it('Teste 4 - Deve exibir erro ao tentar cadastrar com campos vazios', () => { // Simula o clique sem preencher os campos
    cy.get('#ion-input-4').click();                                              // Clica nos campos (mas não preenche)
    cy.get('#ion-input-5').click();
    cy.get('#ion-input-6').click();
    cy.get('#ion-input-7').click();
    cy.get('.selector-field > .ng-untouched').click();
    cy.get('.action-sheet-container > :nth-child(1) > :nth-child(8)').click();
    cy.get('.checkbox.ion-valid > .ng-untouched').click();
    cy.get('.checkbox.ion-invalid > .md > :nth-child(2)').click();
    cy.get('.is-primary').click();

    cy.contains("Nome completo obrigatório.").should("be.visible");              // Valida mensagens de erro
    cy.contains("E-mail é obrigatório.").should("be.visible");
    cy.contains("Senha é obrigatória.").should("be.visible");
    cy.contains("Confirmação de senha é obrigatória.").should("be.visible");
  });


  it('Teste 5 - Deve exibir erro para nome inválido', () => {
    cy.preencherFormularioCadastro("@Bambu!", email, "SenhaForte@123", "SenhaForte@123"); // Preenche campos com dados inválidos
    cy.selecioneSeuEstado();
    cy.preencherCamposObrigatórios();

    cy.get('.button-container > button').should("be.disabled");                           // Botão deve estar desativado
    cy.contains("Digite seu nome completo.").should("be.visible");                        
  });


  it('Teste 6 - Deve exibir erro para e-mail inválido', () => {
    cy.preencherFormularioCadastro(nome, "davi_erro.teste", "SenhaForte@123", "SenhaForte@123");
    cy.selecioneSeuEstado();
    cy.preencherCamposObrigatórios();

    cy.get('.button-container > button').should("be.disabled");
    cy.contains("E-mail inválido.").should("be.visible");
  });


  it('Teste 7 - Deve exibir erro para senha fraca', () => {
    cy.preencherFormularioCadastro(nome, email, "fraca", "fraca");
    cy.selecioneSeuEstado();
    cy.preencherCamposObrigatórios();

    cy.get('.button-container > button').should("be.disabled");
    cy.contains("Senha deve conter no mínimo 6 caracteres.").should("be.visible");
  });


  it('Teste 8 - Deve exibir erro para senhas diferentes', () => {
    cy.preencherFormularioCadastro(nome, email, "SenhaForte@123", "SenhaErrada@123");
    cy.selecioneSeuEstado();
    cy.preencherCamposObrigatórios();

    cy.get('.button-container > button').should("be.disabled");
    cy.contains("As senhas inseridas são diferentes.").should("be.visible");
  });


  it('Teste 9 - Botão "Cadastrar" insdiponível ao não marcar os termos', () => {     // Aceita 1 termo      //Testa a interdependência entre aceitar os termos e liberar o botão de cadastro.
    cy.preencherFormularioCadastro(nome, email, "SenhaForte@123", "SenhaForte@123"); // Aceita 2º termo
    cy.selecioneSeuEstado();

    cy.get('.checkbox.ion-valid > .ng-untouched').click();
    cy.get('.checkbox.ion-invalid > .md > :nth-child(2)').click();
    cy.get('.is-primary').click();
    cy.contains('CADASTRAR').should("be.enabled")                                    // Botão deve estar ativo
    cy.get('.checkbox-container > :nth-child(2) > .md').click();                     // Desmarca termo
    cy.contains('CADASTRAR').should("be.disabled")                                   // Botão fica inativo

  })

  it('Teste 10 - Deve exibir erro ao tentar cadastrar com e-mail ja cadastrado', () => {
    cy.preencherFormularioCadastro("Coco Bambu", "testebambu3030@gmail.com", "SenhaForte@123", "SenhaForte@123");
    cy.selecioneSeuEstado();
    cy.preencherCamposObrigatórios();
    cy.get('.button-container > button').should("be.disabled");
    cy.contains("E-mail já cadastrado.").should("be.visible");

  })

})
