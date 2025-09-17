<div align="center">

<table border="0">
<tr>
<td align="center" style="background-color: white; border-radius: 50%; padding: 10px;">
<img src="https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png" width="80" alt="n8n Logo" style="background-color: white; border-radius: 50%; padding: 5px;"/>
</td>
<td align="center" style="font-size: 30px; padding: 0 20px;">
<h2>+</h2>
</td>
<td align="center">
<img src="https://raw.githubusercontent.com/leonidasjf/n8n-nodes-agendor-crm/main/assets/agendorlogo.ico" width="80" alt="Agendor Logo"/>
</td>
</tr>
</table>

# 🚀 agendor_crm-n8n-nodes

**Node não-oficial do n8n para integração completa com o Agendor CRM**


[![npm version](https://badge.fury.io/js/agendor_crm-n8n-nodes.svg)](https://badge.fury.io/js/agendor_crm-n8n-nodes)
[![npm downloads](https://img.shields.io/npm/dm/agendor_crm-n8n-nodes.svg)](https://www.npmjs.com/package/agendor_crm-n8n-nodes)
[![GitHub stars](https://img.shields.io/github/stars/leonidasjf/agendor_crm-n8n-nodes.svg)](https://github.com/leonidasjf/agendor_crm-n8n-nodes)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

*Automatize seu CRM com workflows poderosos - Conecte o Agendor ao n8n e transforme seus processos de vendas!*

</div>

---

## ✨ Funcionalidades

### 📋 Recursos Suportados

#### 🔄 **Node Regular (Agendor)**
- **📊 Organizações** - CRUD completo, busca e filtros
- **👥 Pessoas** - CRUD completo, busca e filtros
- **💼 Negócios** - CRUD completo, mudança de estágio, busca
- **✅ Tarefas** - CRUD completo, marcar como concluída
- **🏷️ Produtos** - CRUD completo
- **👤 Usuários** - Consulta de usuários e dados próprios
- **🎯 Funis** - Listagem de funis de vendas
- **📈 Estágios** - Listagem de estágios de negócios
- **🔧 Campos Personalizados** - Consulta de campos customizados
- **📊 Relatórios** - Analytics de vendas, pipeline e performance

#### ⚡ **Trigger Node (Agendor Trigger)**
- **🎯 Webhooks em Tempo Real** - 13 eventos diferentes
- **🔄 Gerenciamento Automático** - Criação/remoção automática de webhooks
- **📡 Eventos Completos** - Recebe payload completo dos eventos
- **🔧 Zero Configuração** - Setup automático no Agendor

### 🔧 Operações Disponíveis

#### Organizações
- ✅ Criar nova organização
- ✅ Buscar organização específica
- ✅ Listar múltiplas organizações
- ✅ Atualizar organização
- ✅ Deletar organização
- ✅ Buscar organizações

#### Pessoas
- ✅ Criar nova pessoa
- ✅ Buscar pessoa específica
- ✅ Listar múltiplas pessoas
- ✅ Atualizar pessoa
- ✅ Deletar pessoa
- ✅ Buscar pessoas

#### Negócios
- ✅ Criar novo negócio
- ✅ Buscar negócio específico
- ✅ Listar múltiplos negócios
- ✅ Atualizar negócio
- ✅ Deletar negócio
- ✅ Buscar negócios
- ✅ Mover negócio para outro estágio

#### Tarefas
- ✅ Criar nova tarefa
- ✅ Buscar tarefa específica
- ✅ Listar múltiplas tarefas
- ✅ Atualizar tarefa
- ✅ Deletar tarefa
- ✅ Marcar tarefa como concluída

#### Produtos
- ✅ Criar novo produto
- ✅ Buscar produto específico
- ✅ Listar múltiplos produtos
- ✅ Atualizar produto
- ✅ Deletar produto

#### Usuários
- ✅ Buscar usuário específico
- ✅ Listar múltiplos usuários
- ✅ Buscar dados do usuário atual

#### Funis e Configurações
- ✅ Listar funis de vendas
- ✅ Listar estágios de negócios
- ✅ Listar campos personalizados

#### Relatórios
- ✅ Análise de vendas
- ✅ Relatório de pipeline
- ✅ Relatório de performance

### ⚡ Webhooks Disponíveis (Agendor Trigger)

#### 📝 Eventos de Atividades
- **🎯 Activity Created** (`on_activity_created`) - Atividade/tarefa/comentário criado

#### 🏢 Eventos de Organizações
- **🎯 Organization Created** (`on_organization_created`) - Empresa criada
- **🎯 Organization Updated** (`on_organization_updated`) - Empresa atualizada
- **🎯 Organization Deleted** (`on_organization_deleted`) - Empresa deletada

#### 💼 Eventos de Negócios
- **🎯 Deal Created** (`on_deal_created`) - Negócio criado
- **🎯 Deal Updated** (`on_deal_updated`) - Negócio atualizado
- **🎯 Deal Deleted** (`on_deal_deleted`) - Negócio deletado
- **🎯 Deal Stage Updated** (`on_deal_stage_updated`) - Estágio alterado
- **🎯 Deal Won** (`on_deal_won`) - Negócio ganho
- **🎯 Deal Lost** (`on_deal_lost`) - Negócio perdido

#### 👥 Eventos de Pessoas
- **🎯 Person Created** (`on_person_created`) - Pessoa criada
- **🎯 Person Updated** (`on_person_updated`) - Pessoa atualizada
- **🎯 Person Deleted** (`on_person_deleted`) - Pessoa deletada

## 🚀 Instalação

### Via npm
```bash
npm install agendor_crm-n8n-nodes
```

### Via Community Nodes (n8n Cloud/Self-hosted)

1. Acesse **Settings** → **Community Nodes**
2. Clique em **Install a community node**
3. Digite: `agendor_crm-n8n-nodes`
4. Clique em **Install**

## 🔐 Configuração

### 1. Obter Token da API Agendor

1. Acesse sua conta no [Agendor](https://app.agendor.com.br/)
2. Vá em **Configurações** → **Integrações**
3. Clique em **Token de API**
4. Copie seu token

### 2. Configurar Credenciais no n8n

1. No n8n, vá para **Credentials**
2. Clique em **+ Add Credential**
3. Busque por **Agendor API**
4. Preencha:
   - **API Token**: Seu token copiado do Agendor
   - **API URL**: `https://api.agendor.com.br/v3` (padrão)

## 📖 Como Usar

### Exemplo Básico: Criar Organização

1. Adicione o node **Agendor** ao seu workflow
2. Configure:
   - **Credential**: Selecione sua credencial Agendor
   - **Resource**: Organization
   - **Operation**: Create
   - **Name**: Nome da organização
3. Execute o workflow

### Exemplo: Listar Negócios Recentes

1. Configure o node Agendor:
   - **Resource**: Deal
   - **Operation**: Get Many
   - **Filters**:
     - **Created After**: Data desejada
     - **Limit**: 50

### Exemplo: Buscar e Atualizar

1. **Node 1** - Buscar negócios:
   - **Resource**: Deal
   - **Operation**: Search
   - **Search Term**: "proposta"

2. **Node 2** - Atualizar negócios encontrados:
   - **Resource**: Deal
   - **Operation**: Update
   - **ID**: `{{$json.id}}`
   - **Additional Fields**: Campos a atualizar

## ⚡ Como Usar Webhooks (Triggers)

### Exemplo: Notificação Quando Negócio é Ganho

1. **Adicione o node Agendor Trigger**:
   - **Event**: Deal Won
   - **Credential**: Sua credencial Agendor

2. **Adicione node de notificação** (Slack, Email, Discord):
   - **Message**: `Parabéns! Negócio "{{$json.title}}" foi ganho! Valor: R$ {{$json.value}}`

3. **Ative o workflow** - O webhook será criado automaticamente no Agendor

### Exemplo: Sincronização Automática

1. **Agendor Trigger** - Evento: Organization Created
2. **HTTP Request** - Enviar dados para seu sistema
3. **Agendor** - Criar tarefa de follow-up automática

### Exemplo: Pipeline de Automação

```
Agendor Trigger (Deal Stage Updated) →
  IF (Stage = "Proposta") →
    Agendor (Create Task: "Enviar contrato") →
    Email (Notificar equipe)
```

## 🔍 Filtros e Parâmetros

### Filtros Comuns
- **Created After/Before**: Filtrar por data de criação
- **Updated After/Before**: Filtrar por data de atualização
- **Owner ID**: Filtrar por responsável
- **Return All**: Retornar todos os resultados (ignora limit)
- **Limit**: Limitar quantidade de resultados (1-500)

### Campos Suportados

#### Organizações
- Nome, CNPJ, Email, Telefone
- Website, Endereço, Cidade, Estado
- País, CEP, Descrição, Setor, Porte

#### Pessoas
- Nome, Email, Telefone, Celular
- CPF, Cargo, Organização, Aniversário
- Descrição

#### Negócios
- Título, Valor, Organização, Pessoa
- Funil, Estágio, Responsável
- Data Prevista, Descrição, Origem
- Probabilidade

#### Tarefas
- Título, Data de Vencimento, Tipo
- Descrição, Negócio Relacionado
- Organização, Pessoa, Responsável
- Prioridade

#### Produtos
- Nome, Preço, Descrição
- SKU, Categoria, Status

## 🎯 Casos de Uso

### 🔄 **Com Node Regular**

#### 1. Sincronização de Leads
```
Webhook → Agendor (Create Organization) → Agendor (Create Person) → Agendor (Create Deal)
```

#### 2. Follow-up Automático
```
Schedule → Agendor (Get Deals) → Filter (sem atividade) → Agendor (Create Task)
```

#### 3. Relatório Diário
```
Schedule → Agendor (Sales Analytics) → Email/Slack (Send Report)
```

#### 4. Backup de Dados
```
Schedule → Agendor (Get All Data) → Google Sheets/Database (Store)
```

### ⚡ **Com Webhooks (Trigger Node)**

#### 5. Notificações em Tempo Real
```
Agendor Trigger (Deal Won) → Slack/Discord (Celebrar vitória) → Agendor (Create Task: Pós-venda)
```
#### 6. Automação de Pipeline
```
Agendor Trigger (Deal Stage Updated) → IF (Stage = Proposta) → Email (Enviar contrato)
```

#### 7. Follow-up Inteligente
```
Agendor Trigger (Deal Lost) → Wait (7 days) → Agendor (Create Task: Re-engagement)
```
#### 8. Analytics Avançado
```
Agendor Trigger (Any Event) → Database (Log) → BI Tool (Real-time Dashboard)
```

## 🔧 Desenvolvimento

### Pré-requisitos
- Node.js 18+
- pnpm 8+

### Setup Local
```bash
git clone https://github.com/leonidasjf/agendor_crm-n8n-nodes
cd agendor_crm-n8n-nodes
pnpm install
pnpm build
```

### Scripts Disponíveis
```bash
pnpm build      # Build do projeto
pnpm dev        # Watch mode para desenvolvimento
pnpm lint       # Lint do código
pnpm format     # Format do código
```

## 📚 Documentação da API


### 📖 Recursos Úteis
- [Documentação Agendor API](https://api.agendor.com.br/docs/)
- [Agendor Webhooks Guide](https://ajuda.agendor.com.br/pt-BR/articles/6281963-a-api-do-agendor-possui-webhooks-gatilhos)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
- [n8n Development Guide](https://docs.n8n.io/integrations/creating-nodes/)

### ⚡ Webhooks - Como Funcionam

#### Configuração Automática
1. **Ativação**: Quando você ativa um workflow com Agendor Trigger, o webhook é automaticamente registrado no Agendor
2. **URL Dinâmica**: O n8n gera uma URL única para receber os eventos: `https://seu-n8n.com/webhook/agendor-xyz`
3. **Autenticação**: Usa as mesmas credenciais do node regular
4. **Cleanup**: Quando desativa o workflow, o webhook é automaticamente removido

#### Payload dos Eventos
Cada evento webhook contém:
```json
{
  "event": "on_deal_won",
  "data": {
    "id": 12345,
    "title": "Venda Importante",
    "value": 50000,
    "organization": {...},
    "person": {...}
  },
  "headers": {...}
}
```

#### Endpoints Utilizados
- **GET** `/integrations/subscriptions` - Listar webhooks existentes
- **POST** `/integrations/subscriptions` - Criar novo webhook
- **DELETE** `/integrations/subscriptions/{id}` - Remover webhook

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request


## 🏷️ Keywords

- n8n
- agendor
- crm
- automation
- workflow
- integration
- sales
- pipeline
- leads

---

## ⚖️ Termos e Responsabilidade

- **Não-oficial**: Este node não é desenvolvido, mantido ou endossado pela empresa Agendor
- **Independente**: Projeto independente não afiliado ao Agendor
- **Responsabilidade**: O uso é por conta e risco do usuário


**Desenvolvido por [Leônidas Caldeira](https://github.com/leonidasjf)**