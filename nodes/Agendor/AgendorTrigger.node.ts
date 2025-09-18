import {
	IWebhookFunctions,
	IWebhookResponseData,
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IHookFunctions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	NodeConnectionType,
} from 'n8n-workflow';

import { agendorApiRequest } from './GenericFunctions';

export class AgendorTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Agendor Trigger',
		name: 'agendorTrigger',
		icon: 'file:agendor.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Handle Agendor webhooks',
		defaults: {
			name: 'Agendor Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'agendorApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [
					{
						name: 'Activity Created',
						value: 'on_activity_created',
						description: 'Triggered when an activity/task/comment is created',
					},
					{
						name: 'Organization Created',
						value: 'on_organization_created',
						description: 'Triggered when a company is created',
					},
					{
						name: 'Organization Updated',
						value: 'on_organization_updated',
						description: 'Triggered when a company is updated',
					},
					{
						name: 'Organization Deleted',
						value: 'on_organization_deleted',
						description: 'Triggered when a company is deleted',
					},
					{
						name: 'Deal Created',
						value: 'on_deal_created',
						description: 'Triggered when a business opportunity is created',
					},
					{
						name: 'Deal Updated',
						value: 'on_deal_updated',
						description: 'Triggered when a business opportunity is updated',
					},
					{
						name: 'Deal Deleted',
						value: 'on_deal_deleted',
						description: 'Triggered when a business opportunity is deleted',
					},
					{
						name: 'Deal Stage Updated',
						value: 'on_deal_stage_updated',
						description: 'Triggered when a business opportunity changes stage',
					},
					{
						name: 'Deal Won',
						value: 'on_deal_won',
						description: 'Triggered when a business opportunity is won',
					},
					{
						name: 'Deal Lost',
						value: 'on_deal_lost',
						description: 'Triggered when a business opportunity is lost',
					},
					{
						name: 'Person Created',
						value: 'on_person_created',
						description: 'Triggered when a person is created',
					},
					{
						name: 'Person Updated',
						value: 'on_person_updated',
						description: 'Triggered when a person is updated',
					},
					{
						name: 'Person Deleted',
						value: 'on_person_deleted',
						description: 'Triggered when a person is deleted',
					},
				],
				default: 'on_deal_created',
				required: true,
				description: 'The event that will trigger the webhook',
			},
			{
				displayName: 'Debug Mode',
				name: 'debugMode',
				type: 'boolean',
				default: false,
				description: 'Whether to enable debug logging for webhook operations',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Webhook Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Optional description for the webhook',
					},
					{
						displayName: 'Timeout (seconds)',
						name: 'timeout',
						type: 'number',
						default: 30,
						description: 'Timeout for webhook requests in seconds',
					},
				],
			},
		],
	};

	// @ts-ignore
	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;

				try {
					const response = await agendorApiRequest.call(this, 'GET', '/integrations/subscriptions');
					
					// Handle different response formats
					let webhooks = [];
					if (Array.isArray(response)) {
						webhooks = response;
					} else if (response && response.data && Array.isArray(response.data)) {
						webhooks = response.data;
					} else if (response && Array.isArray(response.results)) {
						webhooks = response.results;
					}

					for (const webhook of webhooks) {
						if (webhook.target_url === webhookUrl && webhook.event === event) {
							return true;
						}
					}
				} catch (error) {
					console.error('Error checking webhook existence:', error);
					return false;
				}

				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;
				const debugMode = this.getNodeParameter('debugMode', false) as boolean;
				const options = this.getNodeParameter('options', {}) as IDataObject;

				const body = {
					target_url: webhookUrl,
					event: event,
					active: true,
					...(options.description && { description: options.description }),
				};

				try {
					if (debugMode) {
						console.log('Creating webhook with data:', body);
					}
					
					const response = await agendorApiRequest.call(this, 'POST', '/integrations/subscriptions', body);
					
					if (debugMode) {
						console.log('Webhook created successfully:', response);
					}
					
					return true;
				} catch (error) {
					const errorMessage = `Failed to create webhook: ${(error as Error).message || 'Unknown error'}`;
					console.error('Error creating webhook:', errorMessage);
					
					if (debugMode) {
						console.error('Full error details:', error);
					}
					
					throw new Error(errorMessage);
				}
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;

				try {
					const response = await agendorApiRequest.call(this, 'GET', '/integrations/subscriptions');
					
					let webhooks = [];
					if (Array.isArray(response)) {
						webhooks = response;
					} else if (response && response.data && Array.isArray(response.data)) {
						webhooks = response.data;
					} else if (response && Array.isArray(response.results)) {
						webhooks = response.results;
					}

					for (const webhook of webhooks) {
						if (webhook.target_url === webhookUrl && webhook.event === event) {
							console.log('Deleting webhook with ID:', webhook.id);
							await agendorApiRequest.call(this, 'DELETE', `/integrations/subscriptions/${webhook.id}`);
							console.log('Webhook deleted successfully');
							return true;
						}
					}
				} catch (error) {
					console.error('Error deleting webhook:', error);
					// Don't throw error here, just return false
					return false;
				}

				return false;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const headerData = this.getHeaderData() as IDataObject;
		const queryData = this.getQueryData() as IDataObject;

		// Log the received webhook for debugging
		console.log('Received webhook data:', {
			body: bodyData,
			headers: headerData,
			query: queryData
		});

		// Process the webhook data
		const processedData = {
			event: bodyData.event || 'unknown',
			data: bodyData.data || bodyData,
			timestamp: new Date().toISOString(),
			headers: {
				'content-type': headerData['content-type'],
				'user-agent': headerData['user-agent'],
				'x-agendor-webhook-id': headerData['x-agendor-webhook-id'],
				'x-agendor-signature': headerData['x-agendor-signature'],
			},
			query: queryData,
		};

		return {
			workflowData: [
				[
					{
						json: processedData,
					},
				],
			],
		};
	}
}