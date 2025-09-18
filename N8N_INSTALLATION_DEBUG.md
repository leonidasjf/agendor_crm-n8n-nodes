# Debug da Instalação do Node n8n

## Logs de Erro Analisados

### 1. Erro de Frontend
```
TypeError: Cannot read properties of undefined (reading 'installedNodes')
```
**Causa:** O n8n frontend não consegue acessar a lista de nodes instalados.

### 2. Erro de Community Packages
```
/rest/community-packages:1 Failed to load resource: the server responded with a status of 400 (Bad Request)
```
**Causa:** API de community packages do n8n não está funcionando.

### 3. Erro NPM API
```
api.npmjs.org/downloads/range/2022-01-01:2025-09-17/n8n-nodes-agendor-integration:1 Failed to load resource: the server responded with a status of 404
```
**Causa:** API do NPM para estatísticas de download não encontra o pacote (normal para pacotes novos).

## Possíveis Soluções

### Opção 1: Reinstalar via n8n Interface
1. Vá em Settings > Community nodes
2. Remova o node se estiver instalado
3. Instale novamente: `n8n-nodes-agendor-integration@2.0.3`

### Opção 2: Verificar se n8n aceita community nodes
Certifique-se que a variável de ambiente está definida:
```bash
N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

### Opção 3: Instalação Manual via Docker
Se usando Docker, adicione ao docker-compose:
```yaml
environment:
  - N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
volumes:
  - ./custom:/home/node/.n8n/custom
```

### Opção 4: Restart Completo
1. Pare o n8n completamente
2. Limpe cache se necessário
3. Reinicie com logs habilitados

## Comandos de Diagnóstico

Para verificar se o node foi instalado corretamente, execute no container n8n:
```bash
npm list n8n-nodes-agendor-integration
```

Para ver logs detalhados do n8n:
```bash
N8N_LOG_LEVEL=debug n8n start
```