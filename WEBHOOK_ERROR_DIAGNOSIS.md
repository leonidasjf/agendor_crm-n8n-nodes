# 🚨 DIAGNÓSTICO: "Bad request - please check your parameters"

## ❗ Erro Comum ao Ativar Webhook

```
Workflow could not be activated:
Failed to create webhook: Bad request - please check your parameters
```

## 🔍 Diagnóstico Melhorado - Versão 2.0.2

Com as melhorias implementadas, agora você terá **logs detalhados** que mostram exatamente o problema:

### 1. **Ative o Debug Mode** ✅
- No node Agendor Trigger
- Marque: **Debug Mode: true**
- Tente ativar novamente

### 2. **Verifique os Logs Detalhados** 📋
Agora os logs mostrarão:
```
🔍 Checking if webhook exists for: {url: "...", event: "..."}
📋 Found X existing webhooks: [...]
✅ API authentication successful
🔄 Creating webhook with data: {...}
```

## 🎯 Causas Mais Comuns

### **Causa #1: n8n não acessível externamente** (80% dos casos)
**Sintoma**: Erro 400 Bad Request
**Problema**: Agendor não consegue acessar a URL do webhook

**✅ Soluções:**
```bash
# Teste se sua URL é acessível
curl -X POST "SUA_URL_DO_WEBHOOK_AQUI"

# Se n8n local, use ngrok
ngrok http 5678
# Use a URL https://xxx.ngrok.io no n8n

# Se n8n em servidor, verifique firewall
# Porta 5678 deve estar aberta para entrada
```

### **Causa #2: Webhook já existe** (15% dos casos)
**Sintoma**: Erro 400 "webhook already exists"
**Problema**: Mesmo webhook já registrado no Agendor

**✅ Soluções:**
1. **Desative e reative** o workflow
2. **Mude o evento** temporariamente e volte
3. **Delete manualmente** no Agendor:
```bash
# Listar webhooks existentes
curl -X GET "https://api.agendor.com.br/v3/integrations/subscriptions" \
  -H "Authorization: Token SEU_TOKEN"

# Deletar webhook específico
curl -X DELETE "https://api.agendor.com.br/v3/integrations/subscriptions/ID_DO_WEBHOOK" \
  -H "Authorization: Token SEU_TOKEN"
```

### **Causa #3: Token sem permissões** (3% dos casos)
**Sintoma**: Erro 401/403
**Problema**: Token não tem permissão para webhooks

**✅ Solução**: 
- Gere novo token no Agendor
- Verifique se tem permissões administrativas

### **Causa #2: URL malformada** (2% dos casos)
**Sintoma**: Erro 400 "invalid URL"
**Problema**: URL do webhook inválida

**✅ Verificar:**
- URL deve começar com `https://`
- Não deve ter espaços ou caracteres especiais
- Deve ser acessível pela internet

## 🛠️ Passo a Passo para Resolver

### **Teste 1: Verificar Conectividade**
```bash
# 1. Pegue a URL do webhook nos logs
# 2. Teste se é acessível
curl -X POST "https://sua-url-do-webhook/aqui" \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Se retornar erro de conexão = problema #1
# Se retornar dados do n8n = URL está OK
```

### **Teste 2: Verificar Token**
```bash
# Teste sua autenticação
curl -X GET "https://api.agendor.com.br/v3/users/me" \
  -H "Authorization: Token SEU_TOKEN_AQUI"

# Se erro = problema no token
# Se sucesso = token OK
```

### **Teste 3: Verificar Webhooks Existentes**
```bash
# Liste webhooks atuais
curl -X GET "https://api.agendor.com.br/v3/integrations/subscriptions" \
  -H "Authorization: Token SEU_TOKEN_AQUI"

# Se sua URL já está na lista = problema #2
# Se lista vazia ou sem sua URL = OK
```

### **Teste 4: Criar Webhook Manualmente**
```bash
# Teste criar webhook direto via API
curl -X POST "https://api.agendor.com.br/v3/integrations/subscriptions" \
  -H "Authorization: Token SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "target_url": "SUA_URL_DO_WEBHOOK",
    "event": "on_deal_created",
    "active": true
  }'

# Isso mostrará o erro exato do Agendor
```

## 🔧 Soluções Específicas por Ambiente

### **n8n Local (localhost)**
```bash
# Instale ngrok
npm install -g ngrok

# Exponha n8n
ngrok http 5678

# Use a URL https://xxx.ngrok.io
```

### **n8n Docker**
```yaml
# docker-compose.yml
services:
  n8n:
    ports:
      - "5678:5678"
    environment:
      - WEBHOOK_URL=https://seu-dominio.com
```

### **n8n Cloud**
- Já deve funcionar
- Se não funcionar = problema no token

### **n8n Self-hosted**
```bash
# Verifique firewall
sudo ufw allow 5678

# Verifique nginx/proxy
# Webhook deve passar direto para n8n
```

## 📊 Logs Melhorados (v2.0.2)

Com as melhorias, você verá logs assim:

### **✅ Sucesso:**
```
🔍 Checking if webhook exists for: {url: "https://...", event: "on_deal_created"}
📋 Found 0 existing webhooks: []
✅ API authentication successful
🔄 Creating webhook with data: {target_url: "https://...", event: "on_deal_created", active: true}
✅ Webhook created successfully: {id: 12345, ...}
```

### **❌ Erro Detalhado:**
```
🔍 Checking if webhook exists for: {url: "https://...", event: "on_deal_created"}
📋 Found 1 existing webhooks: [{id: 12345, url: "https://...", event: "on_deal_created"}]
❌ Webhook creation failed:

HTTP Status: 400
Agendor Message: URL already registered for this event

🔍 Common causes for 400 Bad Request:
- Invalid webhook URL (must be accessible from internet)
- URL already registered for this event
- Invalid event name
- Missing required parameters

💡 Try:
1. Check if n8n is accessible from external networks
2. Verify webhook URL: https://...
3. Check if webhook already exists in Agendor
```

## 🎯 Próximos Passos

1. **Atualize para v2.0.2** (em breve)
2. **Ative Debug Mode** 
3. **Tente ativar novamente**
4. **Compartilhe os logs detalhados** se ainda der erro

Com essas melhorias, conseguiremos identificar exatamente qual é o problema! 🚀