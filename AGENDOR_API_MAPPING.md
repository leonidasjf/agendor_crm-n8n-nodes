# Agendor API v3 - Mapeamento Completo de Endpoints

## Status da Implementação

### ✅ Atualmente Implementado
- **Deals**: CRUD básico (Create, Get, Get All, Update)
- **Organizations**: CRUD básico (Create, Get, Get All, Update)
- **People**: CRUD básico (Create, Get, Get All, Update)
- **Tasks**: CRUD básico (Create, Get, Get All, Update)

### ❌ Faltando Implementar

---

## 1. PESSOAS (People) - Endpoints Faltantes

### 1.1 Operações de Busca Avançada
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/people?email={email}` | Buscar pessoa por email | ❌ |
| GET | `/v3/people?mobile_phone={phone}` | Buscar pessoa por telefone | ❌ |
| GET | `/v3/people?cpf={cpf}` | Buscar pessoa por CPF | ❌ |
| GET | `/v3/people/{id}?withCustomFields=true` | Buscar com campos customizados | ❌ |

### 1.2 Operações de Sincronização
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/people/stream?since={date}` | Buscar pessoas atualizadas desde uma data | ❌ |

### 1.3 Operações de Upsert
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| POST | `/v3/people/upsert` | Criar ou atualizar pessoa por email | ❌ |
| POST | `/v3/people/upsert` | Criar ou atualizar pessoa por CPF | ❌ |

---

## 2. EMPRESAS (Organizations) - Endpoints Faltantes

### 2.1 Operações de Busca Avançada
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/organizations?cnpj={cnpj}` | Buscar empresa por CNPJ | ❌ |
| GET | `/v3/organizations/{id}?withCustomFields=true` | Buscar com campos customizados | ❌ |

### 2.2 Operações de Sincronização
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/organizations/stream?since={date}` | Buscar empresas atualizadas desde uma data | ❌ |

### 2.3 Operações de Upsert
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| POST | `/v3/organizations/upsert` | Criar ou atualizar empresa por CNPJ | ❌ |
| POST | `/v3/organizations/upsert` | Criar ou atualizar empresa por nome | ❌ |

---

## 3. NEGÓCIOS (Deals) - Endpoints Faltantes

### 3.1 Criação em Contexto
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| POST | `/v3/organizations/{id}/deals` | Criar negócio em empresa | ❌ |
| POST | `/v3/people/{id}/deals` | Criar negócio em pessoa | ❌ |

### 3.2 Movimentação de Negócios
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| PUT | `/v3/deals/{id}/stage` | Mover negócio para outra etapa | ❌ |
| PUT | `/v3/deals/{id}/status` | Marcar como ganho/perdido | ❌ |

### 3.3 Busca Avançada de Negócios
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/deals?dealStage={stage_id}` | Buscar negócios por etapa | ❌ |
| GET | `/v3/deals?userOwner={user_id}` | Buscar negócios por responsável | ❌ |
| GET | `/v3/deals?dealStatus={status}` | Buscar negócios por status | ❌ |
| GET | `/v3/deals?organization={org_id}` | Buscar negócios de uma empresa | ❌ |
| GET | `/v3/deals?withCustomFields=true` | Buscar com campos customizados | ❌ |

### 3.4 Sincronização de Negócios
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/deals/stream?since={date}` | Buscar negócios atualizados | ❌ |
| GET | `/v3/deals/stream?dealStatus=1&since={date}` | Buscar negócios em andamento atualizados | ❌ |
| GET | `/v3/deals/stream?dealStatus=2&since={date}` | Buscar negócios ganhos recentemente | ❌ |

### 3.5 Histórico de Movimentações
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/deals/movements_history` | Listar movimentações de negócios | ❌ |

---

## 4. TAREFAS (Tasks) - Endpoints Faltantes

### 4.1 Criação em Contexto
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| POST | `/v3/deals/{id}/tasks` | Criar tarefa em negócio | ❌ |
| POST | `/v3/people/{id}/tasks` | Criar tarefa em pessoa | ❌ |

### 4.2 Listagem por Contexto
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/deals/{id}/tasks` | Listar tarefas de um negócio | ❌ |

### 4.3 Busca por Período
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/tasks?updatedDateGt={date}&updatedDateLt={date}` | Listar tarefas por período | ❌ |

### 4.4 Exportação
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| POST | `/v3/tasks/export` | Exportar tarefas em XLSX | ❌ |

### 4.5 Finalização
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| PUT | `/v3/tasks/{id}` | Marcar tarefa como finalizada | ❌ |

---

## 5. RECURSOS COMPLETAMENTE AUSENTES

### 5.1 Funis (Funnels)
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/funnels` | Listar todos os funis e suas etapas | ❌ |

### 5.2 Produtos (Products)
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/products` | Listar todos os produtos | ❌ |
| GET | `/v3/products?code={codigo}` | Buscar produto por código | ❌ |
| POST | `/v3/products` | Criar produto | ❌ |

### 5.3 Usuários (Users)
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/users` | Listar todos os usuários | ❌ |
| GET | `/v3/users?email={email}` | Buscar usuário por email | ❌ |

### 5.4 Origens de Cliente (Lead Origins)
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/lead_origins` | Listar todas as origens de cliente | ❌ |

### 5.5 Categorias (Categories)
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/categories` | Listar todas as categorias | ❌ |

### 5.6 Campos Customizados (Custom Fields)
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/custom_fields/organizations` | Campos customizados de empresas | ❌ |
| GET | `/v3/custom_fields/deals` | Campos customizados de negócios | ❌ |
| GET | `/v3/custom_fields/people` | Campos customizados de pessoas | ❌ |

### 5.7 Busca de Contatos (Contact Search)
| Método | Endpoint | Descrição | Implementado |
|--------|----------|-----------|--------------|
| GET | `/v3/contacts_search?q={telefone}` | Buscar contatos por telefone (pessoas e empresas) | ❌ |

---

## 6. RESUMO ESTATÍSTICO

### Implementação Atual
- **Resources Implementados**: 4 (Deal, Organization, Person, Task)
- **Operações por Resource**: 4 (Create, Get, Get All, Update)
- **Total de Endpoints Implementados**: 16

### Faltando Implementar
- **Resources Novos**: 6 (Funnels, Products, Users, Lead Origins, Categories, Custom Fields, Contact Search)
- **Operações Adicionais em Resources Existentes**: ~40
- **Total de Endpoints Faltantes**: ~46

### Taxa de Completude
- **Atual**: ~25% da API completa
- **Após implementação**: 100% da API v3

---

## 7. PRIORIZAÇÃO SUGERIDA

### 🔥 Alta Prioridade (Essenciais para CRM)
1. **Funis** - Essencial para navegação entre etapas
2. **Operações de Upsert** - Prevenção de duplicatas
3. **Busca Avançada** - Por email, telefone, CNPJ, CPF
4. **Movimentação de Negócios** - Mudar etapas e status
5. **Usuários** - Gestão de responsáveis

### 🔶 Média Prioridade (Produtividade)
1. **Produtos** - Gestão de catálogo
2. **Tarefas em Contexto** - Tarefas vinculadas a negócios/pessoas
3. **Stream/Sincronização** - Integração com outros sistemas
4. **Campos Customizados** - Flexibilidade de dados

### 🔵 Baixa Prioridade (Complementares)
1. **Exportação de Tarefas**
2. **Histórico de Movimentações**
3. **Categorias e Origens**
4. **Busca de Contatos Universal**

---

## 8. ESTIMATIVA DE IMPLEMENTAÇÃO

### Por Complexidade:
- **Simples** (GET básicos): ~1-2h cada
- **Médio** (POST/PUT com validações): ~3-4h cada
- **Complexo** (Upsert, Stream, Exportação): ~6-8h cada

### Total Estimado: ~120-160 horas de desenvolvimento

---

*Documento gerado em: Setembro 2025*
*Baseado em: Agendor API V3.postman_collection.json*