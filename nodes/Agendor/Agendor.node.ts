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
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Deal',
						value: 'deal',
						description: 'Operações com Negócios',
					},
					{
						name: 'Organization',
						value: 'organization',
						description: 'Operações com Organizações',
					},
					{
						name: 'Person',
						value: 'person',
						description: 'Operações com Pessoas',
					},
					{
						name: 'Task',
						value: 'task',
						description: 'Operações com Tarefas',
					},
				],
				default: 'deal',
			},

			// Deal Operations
			{
				displayName: 'Operation',
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
						name: 'Create',
						value: 'create',
						description: 'Criar novo negócio',
						action: 'Create a deal',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Buscar negócio específico',
						action: 'Get a deal',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar múltiplos negócios',
						action: 'Get many deals',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Atualizar negócio',
						action: 'Update a deal',
					},
				],
				default: 'create',
			},

			// Organization Operations
			{
				displayName: 'Operation',
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
						name: 'Create',
						value: 'create',
						description: 'Criar nova organização',
						action: 'Create an organization',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Buscar organização específica',
						action: 'Get an organization',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar múltiplas organizações',
						action: 'Get many organizations',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Atualizar organização',
						action: 'Update an organization',
					},
				],
				default: 'create',
			},

			// Person Operations
			{
				displayName: 'Operation',
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
						name: 'Create',
						value: 'create',
						description: 'Criar nova pessoa',
						action: 'Create a person',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Buscar pessoa específica',
						action: 'Get a person',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar múltiplas pessoas',
						action: 'Get many people',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Atualizar pessoa',
						action: 'Update a person',
					},
				],
				default: 'create',
			},

			// Task Operations
			{
				displayName: 'Operation',
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
						name: 'Create',
						value: 'create',
						description: 'Criar nova tarefa',
						action: 'Create a task',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Buscar tarefa específica',
						action: 'Get a task',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Listar múltiplas tarefas',
						action: 'Get many tasks',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Atualizar tarefa',
						action: 'Update a task',
					},
				],
				default: 'create',
			},

			// ID field for get/update operations
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['get', 'update'],
					},
				},
				default: '',
				description: 'ID do registro',
			},

			// Deal fields
			{
				displayName: 'Title',
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
				displayName: 'Name',
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
				description: 'Nome da organização',
			},

			// Person fields
			{
				displayName: 'Name',
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
				displayName: 'Title',
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
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Descrição',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'number',
						default: 0,
						description: 'Valor (para negócios)',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						description: 'Email',
					},
					{
						displayName: 'Phone',
						name: 'phone',
						type: 'string',
						default: '',
						description: 'Telefone',
					},
				],
			},

			// Return All option
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},

			// Limit option
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['getAll'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 50,
				description: 'Max number of results to return',
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
					if (operation === 'create') {
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body: any = {
							title,
							...additionalFields,
						};

						responseData = await agendorApiRequest.call(this, 'POST', '/deals', body);
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						responseData = await agendorApiRequest.call(this, 'GET', `/deals/${id}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await agendorApiRequestAllItems.call(this, 'GET', '/deals');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await agendorApiRequest.call(this, 'GET', '/deals', {}, { limit });
							responseData = response.data || response;
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						responseData = await agendorApiRequest.call(this, 'PUT', `/deals/${id}`, additionalFields);
					}
				} else if (resource === 'organization') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body: any = {
							name,
							...additionalFields,
						};

						responseData = await agendorApiRequest.call(this, 'POST', '/organizations', body);
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						responseData = await agendorApiRequest.call(this, 'GET', `/organizations/${id}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await agendorApiRequestAllItems.call(this, 'GET', '/organizations');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await agendorApiRequest.call(this, 'GET', '/organizations', {}, { limit });
							responseData = response.data || response;
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						responseData = await agendorApiRequest.call(this, 'PUT', `/organizations/${id}`, additionalFields);
					}
				} else if (resource === 'person') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body: any = {
							name,
							...additionalFields,
						};

						responseData = await agendorApiRequest.call(this, 'POST', '/people', body);
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						responseData = await agendorApiRequest.call(this, 'GET', `/people/${id}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await agendorApiRequestAllItems.call(this, 'GET', '/people');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await agendorApiRequest.call(this, 'GET', '/people', {}, { limit });
							responseData = response.data || response;
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						responseData = await agendorApiRequest.call(this, 'PUT', `/people/${id}`, additionalFields);
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