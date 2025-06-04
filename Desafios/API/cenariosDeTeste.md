
# 📄 Documentação de Cenários de Teste - API DummyJSON

## 🔹 Funcionalidade Testada: Carrinho de Compras
**Rotas testadas**:
- `POST /carts/add`
- `PUT /carts/{id}`
- `DELETE /carts/{id}`

---

## 📘 1. Cenários de Teste Documentados

### ✅ Adicionar ao carrinho (`POST /carts/add`)

| Cenário | Descrição | Entrada | Resultado Esperado |
|--------|-----------|---------|---------------------|
| 1. Adição com sucesso | Adiciona um produto válido ao carrinho de um usuário existente | `userId` válido, produto com `id` e `quantity` válidos | Status 201; produto aparece no retorno; total é numérico |
| 2. User ID inválido | Envia `userId` como `null` | `userId = null`, produto válido | Status 400 ou 500 |
| 3. Lista de produtos vazia | Tenta adicionar ao carrinho sem produtos | `userId` válido, `products = []` | Status 400 ou 422 |

### 🔄 Atualizar carrinho (`PUT /carts/{id}`)

| Cenário | Descrição | Entrada | Resultado Esperado |
|--------|-----------|---------|---------------------|
| 4. Atualizar com merge (true) | Adiciona produto mantendo os existentes | `merge = true`, produto válido | Status 200 ou 201; produto adicionado junto aos existentes |
| 5. Substituir produtos (merge false) | Substitui todos os produtos do carrinho | `merge = false`, produto válido | Status 200 ou 201; apenas o novo produto aparece |
| 6. Atualizar carrinho inexistente | Atualiza carrinho com ID que não existe | `cartId = 9999` | Status 404; mensagem de erro contendo "not found" |

### ❌ Deletar carrinho (`DELETE /carts/{id}`)

| Cenário | Descrição | Entrada | Resultado Esperado |
|--------|-----------|---------|---------------------|
| 7. Deletar carrinho existente | Remove carrinho existente (ID 1) | `cartId = 1` | Status 200 (ou 400/404, pois a API pode não garantir deleção sempre); `isDeleted = true` |
| 8. Deletar carrinho inexistente | Remove carrinho com ID inválido | `cartId = 9999` | Status 404; mensagem de erro com "not found" |

---

## 🧠 Técnica de Teste Utilizada: Particionamento de Equivalência + Análise de Valor Limite

### 📌 Por que Particionamento de Equivalência?
Essa técnica foi usada para agrupar os dados em classes válidas e inválidas, reduzindo o número de testes, mas garantindo uma boa cobertura. Exemplos:
- `userId` válido (`1`) vs. inválido (`null`)
- Lista de produtos com item vs. lista vazia
- Carrinho existente (`id: 1`) vs. inexistente (`id: 9999`)

### 📌 Por que Análise de Valor Limite?
Utilizada especialmente para IDs e quantidades, onde usamos valores nos extremos dos intervalos conhecidos:
- `id` do produto entre 1 e 30
- `quantity` entre 1 e 5
- `cartId` com valor fora do intervalo conhecido (ex: 9999) para validar comportamento no limite

---

## ✅ Resumo Final
A combinação das duas técnicas permitiu:
- Cobrir os principais fluxos funcionais da API
- Identificar pontos de falha e validações do backend
- Criar testes eficientes com boa abrangência e sem redundância
