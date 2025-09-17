import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AgendorApi implements ICredentialType {
	name = 'agendorApi';
	displayName = 'Agendor API';
	documentationUrl = 'https://api.agendor.com.br/docs/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Token de acesso da API do Agendor. Obtido em: Configurações > Integrações > Token de API',
		},
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: 'https://api.agendor.com.br/v3',
			required: true,
			description: 'URL base da API do Agendor (padrão: https://api.agendor.com.br/v3)',
		},
	];
}