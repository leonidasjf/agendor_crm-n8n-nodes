import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

import { agendorApiRequest, agendorApiRequestAllItems } from './GenericFunctions';

export class Agendor implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Agendor',
		name: 'agendor',
		icon: 'file:agendor.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Integração completa com Agendor CRM',
		defaults: {
			name: 'Agendor',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'agendorApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Negócio',
						value: 'deal',
						description: 'Operações com negócios',
					},
					{
						name: 'Empresa',
						value: 'organization',
						description: 'Operações com empresas',
					},
					{
						name: 'Pessoa',
						value: 'person',
						description: 'Operações com pessoas',
					},
					{
						name: 'Tarefa',
						value: 'task',
						description: 'Operações com tarefas',
					},
					{
						name: 'Funil',
						value: 'funnel',
						description: 'Operações com funis e etapas',
					},
					{
						name: 'Produto',
						value: 'product',
						description: 'Operações com produtos',
					},
					{
						name: 'Usuário',
						value: 'user',
						description: 'Operações com usuários',
					},
					{
						name: 'Sistema',
						value: 'system',
						description: 'Operações do sistema (categorias, origens, etc.)',
					},
				],
				default: 'deal',
			},

			// Deal Operations
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['deal'],
					},
				},
				options: [
					{
						name: 'Buscar',
						value: 'search',
						description: 'Buscar negócios por diferentes critérios',
						action: 'Buscar negócios',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo negócio',
						action: 'Criar um negócio',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar negócio',
						action: 'Atualizar um negócio',
					},
					{
						name: 'Mover',
						value: 'move',
						description: 'Mover negócio entre etapas/status',
						action: 'Mover um negócio',
					},
					{
						name: 'Atualizações Recentes',
						value: 'stream',
						description: 'Buscar negócios atualizados recentemente',
						action: 'Buscar atualizações recentes',
					},
					{
						name: 'Histórico de Movimentações',
						value: 'movements',
						description: 'Listar histórico de movimentações',
						action: 'Listar movimentações',
					},
				],
				default: 'create',
			},

			// Organization Operations
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['organization'],
					},
				},
				options: [
					{
						name: 'Buscar',
						value: 'search',
						description: 'Buscar empresas por diferentes critérios',
						action: 'Buscar empresas',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova empresa',
						action: 'Criar uma empresa',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar empresa',
						action: 'Atualizar uma empresa',
					},
					{
						name: 'Criar ou Atualizar',
						value: 'upsert',
						description: 'Criar nova empresa ou atualizar se já existir',
						action: 'Criar ou atualizar empresa',
					},
					{
						name: 'Atualizações Recentes',
						value: 'stream',
						description: 'Buscar empresas atualizadas recentemente',
						action: 'Buscar atualizações recentes',
					},
				],
				default: 'create',
			},

			// Person Operations
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['person'],
					},
				},
				options: [
					{
						name: 'Buscar',
						value: 'search',
						description: 'Buscar pessoas por diferentes critérios',
						action: 'Buscar pessoas',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova pessoa',
						action: 'Criar uma pessoa',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar pessoa',
						action: 'Atualizar uma pessoa',
					},
					{
						name: 'Criar ou Atualizar',
						value: 'upsert',
						description: 'Criar nova pessoa ou atualizar se já existir',
						action: 'Criar ou atualizar pessoa',
					},
					{
						name: 'Atualizações Recentes',
						value: 'stream',
						description: 'Buscar pessoas atualizadas recentemente',
						action: 'Buscar atualizações recentes',
					},
				],
				default: 'create',
			},

			// Task Operations
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['task'],
					},
				},
				options: [
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar nova tarefa',
						action: 'Criar uma tarefa',
					},
					{
						name: 'Obter',
						value: 'get',
						description: 'Buscar tarefa específica',
						action: 'Obter uma tarefa',
					},
					{
						name: 'Listar',
						value: 'getAll',
						description: 'Listar múltiplas tarefas',
						action: 'Listar tarefas',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar tarefa',
						action: 'Atualizar uma tarefa',
					},
				],
				default: 'create',
			},

			// Funnel Operations
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['funnel'],
					},
				},
				options: [
					{
						name: 'Listar Funis',
						value: 'getFunnels',
						description: 'Listar todos os funis',
						action: 'Listar funis',
					},
					{
						name: 'Listar Etapas',
						value: 'getStages',
						description: 'Listar etapas de um funil',
						action: 'Listar etapas do funil',
					},
				],
				default: 'getFunnels',
			},

			// Product Operations
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['product'],
					},
				},
				options: [
					{
						name: 'Buscar',
						value: 'search',
						description: 'Buscar produtos por diferentes critérios',
						action: 'Buscar produtos',
					},
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar novo produto',
						action: 'Criar um produto',
					},
				],
				default: 'search',
			},

			// User Operations
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Buscar',
						value: 'search',
						description: 'Buscar usuários por diferentes critérios',
						action: 'Buscar usuários',
					},
				],
				default: 'search',
			},

			// System Operations
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['system'],
					},
				},
				options: [
					{
						name: 'Obter Categorias',
						value: 'getCategories',
						description: 'Listar todas as categorias',
						action: 'Obter categorias',
					},
					{
						name: 'Obter Origens de Lead',
						value: 'getLeadOrigins',
						description: 'Listar todas as origens de lead',
						action: 'Obter origens de lead',
					},
					{
						name: 'Obter Campos Customizados',
						value: 'getCustomFields',
						description: 'Obter campos customizados por tipo',
						action: 'Obter campos customizados',
					},
				],
				default: 'getCategories',
			},

			// Person Search Type
			{
				displayName: 'Tipo de Busca',
				name: 'searchType',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['person'],
						operation: ['search'],
					},
				},
				options: [
					{
						name: 'Por ID',
						value: 'id',
						description: 'Buscar pessoa por ID específico',
					},
					{
						name: 'Por E-mail',
						value: 'email',
						description: 'Buscar pessoa por endereço de e-mail',
					},
					{
						name: 'Por Telefone',
						value: 'phone',
						description: 'Buscar pessoa por número de telefone',
					},
					{
						name: 'Por CPF',
						value: 'cpf',
						description: 'Buscar pessoa por CPF',
					},
					{
						name: 'Listar Todos',
						value: 'all',
						description: 'Listar todas as pessoas',
					},
				],
				default: 'id',
			},

			// Person ID field
			{
				displayName: 'ID da Pessoa',
				name: 'personId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['person'],
						operation: ['search'],
						searchType: ['id'],
					},
				},
				default: '',
				description: 'ID único da pessoa no Agendor',
			},

			// Person Email field
			{
				displayName: 'E-mail',
				name: 'email',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['person'],
						operation: ['search'],
						searchType: ['email'],
					},
				},
				default: '',
				description: 'Endereço de e-mail da pessoa',
				placeholder: 'joao@empresa.com',
			},

			// Person Phone field
			{
				displayName: 'Telefone',
				name: 'phone',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['person'],
						operation: ['search'],
						searchType: ['phone'],
					},
				},
				default: '',
				description: 'Número de telefone (apenas números)',
				placeholder: '11999887766',
			},

			// Person CPF field
			{
				displayName: 'CPF',
				name: 'cpf',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['person'],
						operation: ['search'],
						searchType: ['cpf'],
					},
				},
				default: '',
				description: 'CPF da pessoa (apenas números)',
				placeholder: '12345678901',
			},

			// Organization Search Type
			{
				displayName: 'Tipo de Busca',
				name: 'searchType',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['organization'],
						operation: ['search'],
					},
				},
				options: [
					{
						name: 'Por ID',
						value: 'id',
						description: 'Buscar empresa por ID específico',
					},
					{
						name: 'Por CNPJ',
						value: 'cnpj',
						description: 'Buscar empresa por CNPJ',
					},
					{
						name: 'Listar Todos',
						value: 'all',
						description: 'Listar todas as empresas',
					},
				],
				default: 'id',
			},

			// Organization ID field
			{
				displayName: 'ID da Empresa',
				name: 'organizationId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['organization'],
						operation: ['search'],
						searchType: ['id'],
					},
				},
				default: '',
				description: 'ID único da empresa no Agendor',
			},

			// Organization CNPJ field
			{
				displayName: 'CNPJ',
				name: 'cnpj',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['organization'],
						operation: ['search'],
						searchType: ['cnpj'],
					},
				},
				default: '',
				description: 'CNPJ da empresa (apenas números)',
				placeholder: '12345678000195',
			},

			// Deal Search Type
			{
				displayName: 'Tipo de Busca',
				name: 'searchType',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['search'],
					},
				},
				options: [
					{
						name: 'Por ID',
						value: 'id',
						description: 'Buscar negócio por ID específico',
					},
					{
						name: 'Por Etapa',
						value: 'stage',
						description: 'Buscar negócios por etapa do funil',
					},
					{
						name: 'Por Responsável',
						value: 'owner',
						description: 'Buscar negócios por responsável',
					},
					{
						name: 'Por Status',
						value: 'status',
						description: 'Buscar negócios por status',
					},
					{
						name: 'Por Empresa',
						value: 'organization',
						description: 'Buscar negócios de uma empresa',
					},
					{
						name: 'Listar Todos',
						value: 'all',
						description: 'Listar todos os negócios',
					},
				],
				default: 'id',
			},

			// Deal ID field
			{
				displayName: 'ID do Negócio',
				name: 'dealId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['search'],
						searchType: ['id'],
					},
				},
				default: '',
				description: 'ID único do negócio no Agendor',
			},

			// Deal Stage field
			{
				displayName: 'ID da Etapa',
				name: 'stageId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['search'],
						searchType: ['stage'],
					},
				},
				default: '',
				description: 'ID da etapa do funil',
			},

			// Deal Owner field
			{
				displayName: 'ID do Responsável',
				name: 'ownerId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['search'],
						searchType: ['owner'],
					},
				},
				default: '',
				description: 'ID do usuário responsável pelo negócio',
			},

			// Deal Status field
			{
				displayName: 'Status',
				name: 'dealStatus',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['search'],
						searchType: ['status'],
					},
				},
				options: [
					{
						name: 'Em Andamento',
						value: '1',
						description: 'Negócios em andamento',
					},
					{
						name: 'Ganho',
						value: '2',
						description: 'Negócios ganhos',
					},
					{
						name: 'Perdido',
						value: '3',
						description: 'Negócios perdidos',
					},
				],
				default: '1',
			},

			// Deal Organization field
			{
				displayName: 'ID da Empresa',
				name: 'organizationIdForDeal',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['search'],
						searchType: ['organization'],
					},
				},
				default: '',
				description: 'ID da empresa para buscar seus negócios',
			},

			// Deal Move Type
			{
				displayName: 'Tipo de Movimentação',
				name: 'moveType',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['move'],
					},
				},
				options: [
					{
						name: 'Alterar Etapa',
						value: 'stage',
						description: 'Mover negócio para outra etapa',
					},
					{
						name: 'Alterar Status',
						value: 'status',
						description: 'Marcar como ganho ou perdido',
					},
					{
						name: 'Alterar Funil',
						value: 'funnel',
						description: 'Mover para outro funil',
					},
				],
				default: 'stage',
			},

			// Deal ID for move operations
			{
				displayName: 'ID do Negócio',
				name: 'dealIdToMove',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['move'],
					},
				},
				default: '',
				description: 'ID do negócio a ser movido',
			},

			// New Stage for move
			{
				displayName: 'Nova Etapa',
				name: 'newStage',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['move'],
						moveType: ['stage'],
					},
				},
				default: '',
				description: 'ID da nova etapa',
			},

			// New Status for move
			{
				displayName: 'Novo Status',
				name: 'newStatus',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['move'],
						moveType: ['status'],
					},
				},
				options: [
					{
						name: 'Ganho',
						value: 'won',
						description: 'Marcar como ganho',
					},
					{
						name: 'Perdido',
						value: 'lost',
						description: 'Marcar como perdido',
					},
				],
				default: 'won',
			},

			// New Funnel for move
			{
				displayName: 'ID do Novo Funil',
				name: 'newFunnel',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['move'],
						moveType: ['funnel'],
					},
				},
				default: '',
				description: 'ID do funil de destino',
			},

			// New Stage for funnel move
			{
				displayName: 'Etapa no Novo Funil',
				name: 'newStageInFunnel',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['move'],
						moveType: ['funnel'],
					},
				},
				default: '',
				description: 'ID da etapa no funil de destino',
			},

			// Product Search Type
			{
				displayName: 'Tipo de Busca',
				name: 'searchType',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['search'],
					},
				},
				options: [
					{
						name: 'Por ID',
						value: 'id',
						description: 'Buscar produto por ID específico',
					},
					{
						name: 'Por Código',
						value: 'code',
						description: 'Buscar produto por código',
					},
					{
						name: 'Listar Todos',
						value: 'all',
						description: 'Listar todos os produtos',
					},
				],
				default: 'all',
			},

			// Product ID field
			{
				displayName: 'ID do Produto',
				name: 'productId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['search'],
						searchType: ['id'],
					},
				},
				default: '',
				description: 'ID único do produto no Agendor',
			},

			// Product Code field
			{
				displayName: 'Código do Produto',
				name: 'productCode',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['search'],
						searchType: ['code'],
					},
				},
				default: '',
				description: 'Código único do produto',
			},

			// Product Name for create
			{
				displayName: 'Nome do Produto',
				name: 'productName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Nome do produto',
			},

			// Product Code for create
			{
				displayName: 'Código',
				name: 'productCodeCreate',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Código único do produto',
			},

			// User Search Type
			{
				displayName: 'Tipo de Busca',
				name: 'searchType',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['search'],
					},
				},
				options: [
					{
						name: 'Por ID',
						value: 'id',
						description: 'Buscar usuário por ID específico',
					},
					{
						name: 'Por E-mail',
						value: 'email',
						description: 'Buscar usuário por e-mail',
					},
					{
						name: 'Listar Todos',
						value: 'all',
						description: 'Listar todos os usuários',
					},
				],
				default: 'all',
			},

			// User ID field
			{
				displayName: 'ID do Usuário',
				name: 'userId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['search'],
						searchType: ['id'],
					},
				},
				default: '',
				description: 'ID único do usuário no Agendor',
			},

			// User Email field
			{
				displayName: 'E-mail do Usuário',
				name: 'userEmail',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['search'],
						searchType: ['email'],
					},
				},
				default: '',
				description: 'E-mail do usuário',
			},

			// Custom Fields Entity Type
			{
				displayName: 'Tipo de Entidade',
				name: 'entityType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['system'],
						operation: ['getCustomFields'],
					},
				},
				options: [
					{
						name: 'Pessoas',
						value: 'people',
						description: 'Campos customizados de pessoas',
					},
					{
						name: 'Empresas',
						value: 'organizations',
						description: 'Campos customizados de empresas',
					},
					{
						name: 'Negócios',
						value: 'deals',
						description: 'Campos customizados de negócios',
					},
				],
				default: 'people',
			},

			// ID field for update operations
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['update'],
					},
				},
				default: '',
				description: 'ID do registro',
			},

			// Deal fields
			{
				displayName: 'Título',
				name: 'title',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Título do negócio',
			},

			// Organization fields
			{
				displayName: 'Nome',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['organization'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Nome da empresa',
			},

			// Person fields
			{
				displayName: 'Nome',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['person'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Nome da pessoa',
			},

			// Task fields
			{
				displayName: 'Título',
				name: 'title',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['task'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Título da tarefa',
			},

			// Additional fields
			{
				displayName: 'Campos Adicionais',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Descrição do registro',
					},
					{
						displayName: 'Valor',
						name: 'value',
						type: 'number',
						default: 0,
						description: 'Valor em reais (para negócios)',
					},
					{
						displayName: 'E-mail',
						name: 'email',
						type: 'string',
						default: '',
						description: 'Endereço de e-mail',
					},
					{
						displayName: 'Telefone',
						name: 'phone',
						type: 'string',
						default: '',
						description: 'Número de telefone',
					},
				],
			},

			// Stream Since Date
			{
				displayName: 'Data Inicial',
				name: 'sinceDate',
				type: 'dateTime',
				required: true,
				displayOptions: {
					show: {
						operation: ['stream'],
					},
				},
				default: '',
				description: 'Buscar registros atualizados desde esta data',
			},

			// With Custom Fields option
			{
				displayName: 'Incluir Campos Customizados',
				name: 'withCustomFields',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['person', 'organization', 'deal'],
						operation: ['search'],
					},
				},
				default: false,
				description: 'Incluir campos customizados na resposta',
			},

			// Return All option
			{
				displayName: 'Retornar Todos',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['search'],
						searchType: ['all'],
					},
				},
				default: false,
				description: 'Se deve retornar todos os resultados ou apenas até um limite específico',
			},

			// Limit option
			{
				displayName: 'Limite',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['search'],
						searchType: ['all'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 50,
				description: 'Número máximo de resultados a retornar',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let responseData;

				if (resource === 'deal') {
					if (operation === 'search') {
						const searchType = this.getNodeParameter('searchType', i) as string;
						const withCustomFields = this.getNodeParameter('withCustomFields', i) as boolean;

						let endpoint = '/deals';
						let queryParams: any = {};

						if (withCustomFields) {
							queryParams.withCustomFields = 'true';
						}

						if (searchType === 'id') {
							const dealId = this.getNodeParameter('dealId', i) as string;
							endpoint = `/deals/${dealId}`;
						} else if (searchType === 'stage') {
							const stageId = this.getNodeParameter('stageId', i) as string;
							queryParams.dealStage = stageId;
						} else if (searchType === 'owner') {
							const ownerId = this.getNodeParameter('ownerId', i) as string;
							queryParams.userOwner = ownerId;
						} else if (searchType === 'status') {
							const dealStatus = this.getNodeParameter('dealStatus', i) as string;
							queryParams.dealStatus = dealStatus;
						} else if (searchType === 'organization') {
							const organizationId = this.getNodeParameter('organizationIdForDeal', i) as string;
							queryParams.organization = organizationId;
						} else if (searchType === 'all') {
							const returnAll = this.getNodeParameter('returnAll', i) as boolean;
							if (!returnAll) {
								const limit = this.getNodeParameter('limit', i) as number;
								queryParams.limit = limit;
							}
						}

						if (searchType === 'all' && this.getNodeParameter('returnAll', i)) {
							responseData = await agendorApiRequestAllItems.call(this, 'GET', endpoint, {}, queryParams);
						} else {
							responseData = await agendorApiRequest.call(this, 'GET', endpoint, {}, queryParams);
						}
					} else if (operation === 'create') {
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body: any = {
							title,
							...additionalFields,
						};

						responseData = await agendorApiRequest.call(this, 'POST', '/deals', body);
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						responseData = await agendorApiRequest.call(this, 'PUT', `/deals/${id}`, additionalFields);
					} else if (operation === 'move') {
						const dealId = this.getNodeParameter('dealIdToMove', i) as string;
						const moveType = this.getNodeParameter('moveType', i) as string;

						if (moveType === 'stage') {
							const newStage = this.getNodeParameter('newStage', i) as string;
							const body = { dealStage: parseInt(newStage, 10) };
							responseData = await agendorApiRequest.call(this, 'PUT', `/deals/${dealId}/stage`, body);
						} else if (moveType === 'status') {
							const newStatus = this.getNodeParameter('newStatus', i) as string;
							const body = { dealStatusText: newStatus };
							responseData = await agendorApiRequest.call(this, 'PUT', `/deals/${dealId}/status`, body);
						} else if (moveType === 'funnel') {
							const newFunnel = this.getNodeParameter('newFunnel', i) as string;
							const newStageInFunnel = this.getNodeParameter('newStageInFunnel', i) as string;
							const body = {
								dealStage: parseInt(newStageInFunnel, 10),
								funnel: parseInt(newFunnel, 10)
							};
							responseData = await agendorApiRequest.call(this, 'PUT', `/deals/${dealId}/stage`, body);
						}
					} else if (operation === 'stream') {
						const sinceDate = this.getNodeParameter('sinceDate', i) as string;
						const queryParams = { since: sinceDate };

						responseData = await agendorApiRequest.call(this, 'GET', '/deals/stream', {}, queryParams);
					} else if (operation === 'movements') {
						const sinceDate = this.getNodeParameter('sinceDate', i) as string;
						const queryParams = { since: sinceDate, days_interval: 7 };

						responseData = await agendorApiRequest.call(this, 'GET', '/deals/movements_history', {}, queryParams);
					}
				} else if (resource === 'organization') {
					if (operation === 'search') {
						const searchType = this.getNodeParameter('searchType', i) as string;
						const withCustomFields = this.getNodeParameter('withCustomFields', i) as boolean;

						let endpoint = '/organizations';
						let queryParams: any = {};

						if (withCustomFields) {
							queryParams.withCustomFields = 'true';
						}

						if (searchType === 'id') {
							const organizationId = this.getNodeParameter('organizationId', i) as string;
							endpoint = `/organizations/${organizationId}`;
						} else if (searchType === 'cnpj') {
							const cnpj = this.getNodeParameter('cnpj', i) as string;
							queryParams.cnpj = cnpj;
						} else if (searchType === 'all') {
							const returnAll = this.getNodeParameter('returnAll', i) as boolean;
							if (!returnAll) {
								const limit = this.getNodeParameter('limit', i) as number;
								queryParams.limit = limit;
							}
						}

						if (searchType === 'all' && this.getNodeParameter('returnAll', i)) {
							responseData = await agendorApiRequestAllItems.call(this, 'GET', endpoint, {}, queryParams);
						} else {
							responseData = await agendorApiRequest.call(this, 'GET', endpoint, {}, queryParams);
						}
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body: any = {
							name,
							...additionalFields,
						};

						responseData = await agendorApiRequest.call(this, 'POST', '/organizations', body);
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						responseData = await agendorApiRequest.call(this, 'PUT', `/organizations/${id}`, additionalFields);
					} else if (operation === 'upsert') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body: any = {
							name,
							...additionalFields,
						};

						responseData = await agendorApiRequest.call(this, 'POST', '/organizations/upsert', body);
					} else if (operation === 'stream') {
						const sinceDate = this.getNodeParameter('sinceDate', i) as string;
						const queryParams = { since: sinceDate };

						responseData = await agendorApiRequest.call(this, 'GET', '/organizations/stream', {}, queryParams);
					}
				} else if (resource === 'person') {
					if (operation === 'search') {
						const searchType = this.getNodeParameter('searchType', i) as string;
						const withCustomFields = this.getNodeParameter('withCustomFields', i) as boolean;

						let endpoint = '/people';
						let queryParams: any = {};

						if (withCustomFields) {
							queryParams.withCustomFields = 'true';
						}

						if (searchType === 'id') {
							const personId = this.getNodeParameter('personId', i) as string;
							endpoint = `/people/${personId}`;
						} else if (searchType === 'email') {
							const email = this.getNodeParameter('email', i) as string;
							queryParams.email = email;
						} else if (searchType === 'phone') {
							const phone = this.getNodeParameter('phone', i) as string;
							queryParams.mobile_phone = phone;
						} else if (searchType === 'cpf') {
							const cpf = this.getNodeParameter('cpf', i) as string;
							queryParams.cpf = cpf;
						} else if (searchType === 'all') {
							const returnAll = this.getNodeParameter('returnAll', i) as boolean;
							if (!returnAll) {
								const limit = this.getNodeParameter('limit', i) as number;
								queryParams.limit = limit;
							}
						}

						if (searchType === 'all' && this.getNodeParameter('returnAll', i)) {
							responseData = await agendorApiRequestAllItems.call(this, 'GET', endpoint, {}, queryParams);
						} else {
							responseData = await agendorApiRequest.call(this, 'GET', endpoint, {}, queryParams);
						}
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body: any = {
							name,
							...additionalFields,
						};

						responseData = await agendorApiRequest.call(this, 'POST', '/people', body);
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						responseData = await agendorApiRequest.call(this, 'PUT', `/people/${id}`, additionalFields);
					} else if (operation === 'upsert') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body: any = {
							name,
							...additionalFields,
						};

						responseData = await agendorApiRequest.call(this, 'POST', '/people/upsert', body);
					} else if (operation === 'stream') {
						const sinceDate = this.getNodeParameter('sinceDate', i) as string;
						const queryParams = { since: sinceDate };

						responseData = await agendorApiRequest.call(this, 'GET', '/people/stream', {}, queryParams);
					}
				} else if (resource === 'task') {
					if (operation === 'create') {
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body: any = {
							title,
							...additionalFields,
						};

						responseData = await agendorApiRequest.call(this, 'POST', '/tasks', body);
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						responseData = await agendorApiRequest.call(this, 'GET', `/tasks/${id}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await agendorApiRequestAllItems.call(this, 'GET', '/tasks');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await agendorApiRequest.call(this, 'GET', '/tasks', {}, { limit });
							responseData = response.data || response;
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						responseData = await agendorApiRequest.call(this, 'PUT', `/tasks/${id}`, additionalFields);
					}
				} else if (resource === 'funnel') {
					if (operation === 'getFunnels') {
						responseData = await agendorApiRequest.call(this, 'GET', '/funnels');
					} else if (operation === 'getStages') {
						responseData = await agendorApiRequest.call(this, 'GET', '/funnels');
						// O endpoint /funnels retorna os funis com suas etapas
						// Extrair apenas as etapas se necessário
					}
				} else if (resource === 'product') {
					if (operation === 'search') {
						const searchType = this.getNodeParameter('searchType', i) as string;

						let endpoint = '/products';
						let queryParams: any = {};

						if (searchType === 'id') {
							const productId = this.getNodeParameter('productId', i) as string;
							endpoint = `/products/${productId}`;
						} else if (searchType === 'code') {
							const productCode = this.getNodeParameter('productCode', i) as string;
							queryParams.code = productCode;
						} else if (searchType === 'all') {
							const returnAll = this.getNodeParameter('returnAll', i) as boolean;
							if (!returnAll) {
								const limit = this.getNodeParameter('limit', i) as number;
								queryParams.limit = limit;
							}
						}

						if (searchType === 'all' && this.getNodeParameter('returnAll', i)) {
							responseData = await agendorApiRequestAllItems.call(this, 'GET', endpoint, {}, queryParams);
						} else {
							responseData = await agendorApiRequest.call(this, 'GET', endpoint, {}, queryParams);
						}
					} else if (operation === 'create') {
						const productName = this.getNodeParameter('productName', i) as string;
						const productCode = this.getNodeParameter('productCodeCreate', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body: any = {
							name: productName,
							code: productCode,
							active: true,
							...additionalFields,
						};

						responseData = await agendorApiRequest.call(this, 'POST', '/products', body);
					}
				} else if (resource === 'user') {
					if (operation === 'search') {
						const searchType = this.getNodeParameter('searchType', i) as string;

						let endpoint = '/users';
						let queryParams: any = {};

						if (searchType === 'id') {
							const userId = this.getNodeParameter('userId', i) as string;
							endpoint = `/users/${userId}`;
						} else if (searchType === 'email') {
							const userEmail = this.getNodeParameter('userEmail', i) as string;
							queryParams.email = userEmail;
						} else if (searchType === 'all') {
							const returnAll = this.getNodeParameter('returnAll', i) as boolean;
							if (!returnAll) {
								const limit = this.getNodeParameter('limit', i) as number;
								queryParams.limit = limit;
							}
						}

						if (searchType === 'all' && this.getNodeParameter('returnAll', i)) {
							responseData = await agendorApiRequestAllItems.call(this, 'GET', endpoint, {}, queryParams);
						} else {
							responseData = await agendorApiRequest.call(this, 'GET', endpoint, {}, queryParams);
						}
					}
				} else if (resource === 'system') {
					if (operation === 'getCategories') {
						responseData = await agendorApiRequest.call(this, 'GET', '/categories');
					} else if (operation === 'getLeadOrigins') {
						responseData = await agendorApiRequest.call(this, 'GET', '/lead_origins');
					} else if (operation === 'getCustomFields') {
						const entityType = this.getNodeParameter('entityType', i) as string;
						responseData = await agendorApiRequest.call(this, 'GET', `/custom_fields/${entityType}`);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}