# 🔧 Guia de Troubleshooting - Webhook Agendor

## ✅ Melhorias Implementadas

### 1. **Tratamento de Resposta da API**
- ✅ Suporte a diferentes formatos de resposta (`data`, `results`, array direto)
- ✅ Logs detalhados para debugging
- ✅ Tratamento específico para endpoints de webhook

### 2. **Gerenciamento de Webhook**
- ✅ Verificação melhorada de existência de webhooks
- ✅ Criação com parâmetros corretos (`active: true`)
- ✅ Deleção mais robusta com múltiplas tentativas

### 3. **Processamento de Dados**
- ✅ Estrutura melhorada dos dados recebidos
- ✅ Headers específicos do Agendor preservados
- ✅ Timestamp automático
- ✅ Logs detalhados para debugging

## 🧪 Como Testar o Webhook

### Passo 1: Preparar o Ambiente
1. Compile o node: `npm run build`
2. Reinicie o n8n
3. Verifique se as credenciais estão configuradas

### Passo 2: Criar Workflow de Teste
1. **Adicione o node Agendor Trigger**:
   - Event: `Deal Created` (para teste simples)
   - Debug Mode: ✅ **Ativado**

2. **Adicione um node de teste** (HTTP Request, por exemplo):
   - Method: POST
   - URL: `https://httpbin.org/post`
   - Body: `{{ JSON.stringify($json) }}`

### Passo 3: Ativar e Testar
1. **Ative o workflow**
2. **Verifique os logs**:
   - Deve mostrar "Creating webhook with data"
   - Deve mostrar "Webhook created successfully"

3. **Teste no Agendor**:
   - Crie um novo negócio no Agendor
   - Verifique se o workflow foi disparado

## 🔍 Debugging

### Verificar Webhooks Registrados
```bash
curl -X GET "https://api.agendor.com.br/v3/integrations/subscriptions" \
  -H "Authorization: Token SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json"
```

### Logs Importantes
- **Console do n8n**: Busque por "Creating webhook", "Webhook created"
- **Execuções**: Verifique se há execuções na aba "Executions"
- **Erros**: Qualquer erro será logado com detalhes

## 🚨 Problemas Comuns

### 1. **Webhook não é criado**
**Sintomas**: Erro ao ativar o workflow
**Possíveis causas**:
- Token da API inválido
- URL do n8n não acessível pelo Agendor
- Formato do evento incorreto

**Solução**:
```typescript
// Verificar no console:
// "Creating webhook with data: { target_url: '...', event: '...', active: true }"
```

### 2. **Webhook não recebe dados**
**Sintomas**: Workflow não dispara quando há mudanças no Agendor
**Possíveis causas**:
- Webhook foi criado mas não está ativo
- URL do webhook não é acessível
- Evento específico não está sendo disparado

**Solução**:
1. Ative o "Debug Mode"
2. Verifique se o webhook existe no Agendor
3. Teste com evento mais comum (`on_deal_created`)

### 3. **Dados malformados**
**Sintomas**: Workflow dispara mas com dados estranhos
**Solução**: Os dados agora são processados e estruturados:
```json
{
  "event": "on_deal_created",
  "data": { /* dados do evento */ },
  "timestamp": "2025-09-17T23:05:44.123Z",
  "headers": { /* headers relevantes */ },
  "query": { /* parâmetros de query */ }
}
```

## 🔧 Configurações Avançadas

### Debug Mode
Ativa logs detalhados:
- Dados enviados na criação do webhook
- Resposta completa da API
- Dados recebidos em cada webhook

### Options
- **Description**: Descrição do webhook (opcional)
- **Timeout**: Timeout para requisições (padrão: 30s)

## 📊 Eventos Disponíveis

| Evento | Valor | Descrição |
|--------|--------|-----------|
| Activity Created | `on_activity_created` | Atividade/tarefa criada |
| Organization Created | `on_organization_created` | Empresa criada |
| Organization Updated | `on_organization_updated` | Empresa atualizada |
| Organization Deleted | `on_organization_deleted` | Empresa deletada |
| Deal Created | `on_deal_created` | Negócio criado ⭐ |
| Deal Updated | `on_deal_updated` | Negócio atualizado |
| Deal Deleted | `on_deal_deleted` | Negócio deletado |
| Deal Stage Updated | `on_deal_stage_updated` | Estágio alterado |
| Deal Won | `on_deal_won` | Negócio ganho |
| Deal Lost | `on_deal_lost` | Negócio perdido |
| Person Created | `on_person_created` | Pessoa criada |
| Person Updated | `on_person_updated` | Pessoa atualizada |
| Person Deleted | `on_person_deleted` | Pessoa deletada |

⭐ **Recomendado para teste inicial**

## 🆘 Se Ainda Não Funcionar

1. **Ative o Debug Mode**
2. **Capture os logs completos**
3. **Teste com `on_deal_created` primeiro**
4. **Verifique se o n8n é acessível externamente**
5. **Confirme se o token tem permissões de webhook**

O webhook agora deve funcionar muito melhor com todas essas melhorias! 🚀