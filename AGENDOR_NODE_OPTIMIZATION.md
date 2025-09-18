# Agendor Node - Proposta de Otimização da Arquitetura

## 🎯 Problema Atual
- Muitos endpoints similares que poderiam ser agrupados
- Operações de busca fragmentadas em múltiplos "resources"
- Estrutura pode ficar muito complexa com 46+ endpoints separados

## 💡 Solução Proposta: Agrupamento Inteligente

### 1. **PEOPLE (Pessoas) - Operação "Search" Unificada**

#### Ao invés de:
- ❌ Get by ID
- ❌ Get by Email
- ❌ Get by Phone
- ❌ Get by CPF

#### Fazer:
```typescript
Operation: "Search"
Search Type: [ID | Email | Phone | CPF | Get All]
```

**Implementação:**
- Quando `searchType = "ID"` → campo `ID` aparece
- Quando `searchType = "Email"` → campo `Email` aparece
- Quando `searchType = "Phone"` → campo `Phone` aparece
- Quando `searchType = "CPF"` → campo `CPF` aparece
- Quando `searchType = "Get All"` → opções de paginação aparecem

---

### 2. **ORGANIZATIONS (Empresas) - Busca Unificada**

```typescript
Operation: "Search"
Search Type: [ID | CNPJ | Get All]
```

---

### 3. **DEALS (Negócios) - Agrupamentos Inteligentes**

#### 3.1 Busca de Negócios
```typescript
Operation: "Search"
Search Type: [
  ID,
  "By Stage",
  "By Owner",
  "By Status",
  "By Organization",
  "Recent Updates",
  "Get All"
]
```

#### 3.2 Movimentação de Negócios
```typescript
Operation: "Move"
Move Type: [
  "Change Stage",
  "Change Status",
  "Change Funnel"
]
```

#### 3.3 Criação Contextual
```typescript
Operation: "Create"
Create In: [
  "Standalone",
  "Organization",
  "Person"
]
```

---

### 4. **TASKS (Tarefas) - Agrupamentos**

#### 4.1 Busca de Tarefas
```typescript
Operation: "Search"
Search Type: [
  "ID",
  "By Deal",
  "By Person",
  "By Date Range",
  "Get All"
]
```

#### 4.2 Criação Contextual
```typescript
Operation: "Create"
Create In: [
  "Standalone",
  "Deal",
  "Person"
]
```

---

### 5. **NOVOS RESOURCES OTIMIZADOS**

#### 5.1 Funis e Etapas (Unified)
```typescript
Resource: "Funnel"
Operation: [
  "Get All Funnels",
  "Get Funnel Stages"
]
```

#### 5.2 Produtos
```typescript
Resource: "Product"
Operation: [
  "Search", // com Search Type: [ID, Code, Get All]
  "Create"
]
```

#### 5.3 Usuários
```typescript
Resource: "User"
Operation: [
  "Search" // com Search Type: [ID, Email, Get All]
]
```

#### 5.4 Campos Customizados
```typescript
Resource: "Custom Field"
Operation: "Get Fields"
Entity Type: [People, Organizations, Deals]
```

#### 5.5 Sistema (Metadata)
```typescript
Resource: "System"
Operation: [
  "Get Categories",
  "Get Lead Origins"
]
```

---

## 📋 Estrutura Final Otimizada

### Resources Principais (8 ao invés de 13+):
1. **Person** - 5 operations (Search, Create, Update, Upsert, Stream)
2. **Organization** - 5 operations (Search, Create, Update, Upsert, Stream)
3. **Deal** - 6 operations (Search, Create, Update, Move, Movements, Stream)
4. **Task** - 5 operations (Search, Create, Update, Complete, Export)
5. **Funnel** - 2 operations (Get Funnels, Get Stages)
6. **Product** - 2 operations (Search, Create)
7. **User** - 1 operation (Search)
8. **System** - 3 operations (Get Categories, Get Lead Origins, Get Custom Fields)

### Vantagens desta Abordagem:

#### ✅ **UX Melhorada**
- Menos confusão para o usuário
- Agrupamento lógico de operações relacionadas
- Interface mais limpa no n8n

#### ✅ **Manutenção Simplificada**
- Menos código duplicado
- Validações centralizadas
- Reutilização de lógica

#### ✅ **Flexibilidade**
- Fácil adicionar novos tipos de busca
- Estrutura extensível
- Parâmetros condicionais inteligentes

---

## 🔧 Exemplo de Implementação

### Exemplo: Person Search
```typescript
// Operation: Search
{
  displayName: 'Search Type',
  name: 'searchType',
  type: 'options',
  options: [
    { name: 'By ID', value: 'id' },
    { name: 'By Email', value: 'email' },
    { name: 'By Phone', value: 'phone' },
    { name: 'By CPF', value: 'cpf' },
    { name: 'Get All', value: 'all' }
  ]
},
{
  displayName: 'Person ID',
  name: 'personId',
  type: 'string',
  displayOptions: { show: { searchType: ['id'] } }
},
{
  displayName: 'Email',
  name: 'email',
  type: 'string',
  displayOptions: { show: { searchType: ['email'] } }
}
// etc...
```

### Exemplo: Deal Move
```typescript
// Operation: Move
{
  displayName: 'Move Type',
  name: 'moveType',
  type: 'options',
  options: [
    { name: 'Change Stage', value: 'stage' },
    { name: 'Change Status', value: 'status' },
    { name: 'Change Funnel', value: 'funnel' }
  ]
},
{
  displayName: 'New Stage',
  name: 'newStage',
  type: 'number',
  displayOptions: { show: { moveType: ['stage'] } }
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  options: [
    { name: 'Won', value: 'won' },
    { name: 'Lost', value: 'lost' }
  ],
  displayOptions: { show: { moveType: ['status'] } }
}
```

---

## 📊 Comparação: Antes vs Depois

### Antes (Fragmentado):
- **Resources**: 13+
- **Total Operations**: 46+
- **Complexidade Interface**: Alta
- **Curva Aprendizado**: Steep

### Depois (Otimizado):
- **Resources**: 8
- **Total Operations**: 29
- **Complexidade Interface**: Baixa
- **Curva Aprendizado**: Suave

### Redução: ~37% menos operações com mesma funcionalidade!

---

## 🎯 Recomendação Final

1. **Implementar estrutura otimizada** ao invés da fragmentada
2. **Priorizar resources** por ordem: Person → Organization → Deal → Task → System
3. **Usar parâmetros condicionais** extensivamente
4. **Manter nomenclatura consistente** entre resources

Esta abordagem oferece 100% da funcionalidade com muito menos complexidade!