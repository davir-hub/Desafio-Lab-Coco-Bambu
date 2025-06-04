
# 📄 Documento de Análise de Fluxos Críticos – Plataforma Coco Bambu Delivery

**Ambiente analisado:**  
[https://app-hom.cocobambu.com/delivery]
**Autor:** Davi Romão  
**Objetivo:** Identificar os fluxos mais críticos da plataforma que, em caso de falha, impedem o cliente de realizar uma compra.

---

## 🔍 Visão Geral

Durante a análise exploratória da plataforma de delivery do Coco Bambu, foram identificados fluxos essenciais para a jornada de compra do usuário. Qualquer falha nesses fluxos representa um **bloqueio direto** à conversão (compra) e à experiência do cliente.

---

## ✅ Fluxos Críticos Identificados

### 1. Escolha de Localização / Endereço de Entrega

**Descrição:**  
A definição de localização é o primeiro passo funcional para o uso da plataforma. O sistema depende dessa informação para verificar se o endereço do cliente é atendido e, com base nisso, exibir o cardápio e opções de entrega disponíveis.

**Motivos para ser um fluxo crítico:**

- Sem endereço válido, o cliente não consegue prosseguir para o pedido.
- A localização influencia produtos disponíveis, frete e horário de entrega.
- Erros na localização ou falhas na validação do endereço impedem o início do processo de compra.

**Riscos associados:**

- Mensagens incorretas de "área não atendida".
- Campos de endereço que não funcionam ou não salvam corretamente.
- Botão de “Confirmar endereço” inativo ou sem feedback.

---

### 2. Cadastro de Novo Usuário

**Descrição:**  
O cadastro é necessário para que o cliente avance para o login e realize pedidos. Ele coleta dados como nome, e-mail, senha e local.

**Motivos para ser um fluxo crítico:**

- Impede o primeiro acesso de novos clientes.
- Sem cadastro, o cliente não consegue montar ou finalizar pedidos.
- Atrasos ou erros nessa etapa causam abandono da plataforma ainda na etapa inicial.

**Riscos associados:**

- Formulário de cadastro com validações mal implementadas.
- Campos obrigatórios não marcados corretamente.
- Falta de feedback claro em caso de erro.

---

### 3. Pagamento e Finalização do Pedido

**Descrição:**  
Etapa final da jornada de compra, onde o usuário escolhe a forma de pagamento, revisa os itens e confirma o pedido.

**Motivos para ser um fluxo crítico:**

- Falhas nesse ponto destroem toda a experiência anterior.
- Envolve confiança do usuário (dados sensíveis, valor cobrado).
- Qualquer erro pode gerar desistência imediata e frustração.

**Riscos associados:**

- Botão de “Finalizar pedido” sem ação.
- Erros de pagamento sem mensagens explicativas.
- Falta de confirmação clara após a finalização.
- Inconsistências no valor total exibido.

---

## 🧠 Resumo de Impacto

| Fluxo                          | Consequência em Caso de Falha              | Justificativa                                  |
|-------------------------------|--------------------------------------------|------------------------------------------------|
| Escolha de Localização        | Cliente impedido de iniciar o pedido       | Sem endereço válido, o sistema não avança      |
| Cadastro de Novo Usuário      | Cliente não consegue acessar a plataforma  | Primeiro passo obrigatório para novos usuários |
| Pagamento e Finalização       | Cliente não completa a compra              | Ponto final e mais sensível da compra          |

---
