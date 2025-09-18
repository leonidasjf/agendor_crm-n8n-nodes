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
				const debugMode = this.getNodeParameter('debugMode', false) as boolean;

				try {
					if (debugMode) {
						console.log('🔍 Checking if webhook exists for:', {
							url: webhookUrl,
							event: event
						});
					}

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

					if (debugMode) {
						console.log(`📋 Found ${webhooks.length} existing webhooks:`, webhooks.map((w: any) => ({
							id: w.id,
							url: w.target_url,
							event: w.event,
							active: w.active
						})));
					}

					for (const webhook of webhooks) {
						if (webhook.target_url === webhookUrl && webhook.event === event) {
							if (debugMode) {
								console.log('✅ Webhook already exists:', {
									id: webhook.id,
									url: webhook.target_url,
									event: webhook.event,
									active: webhook.active
								});
							}
							return true;
						}
					}

					if (debugMode) {
						console.log('❌ Webhook does not exist, will create new one');
					}
					
					return false;
				} catch (error) {
					console.error('Error checking webhook existence:', error);
					if (debugMode) {
						console.error('Full error details:', error);
					}
					return false;
				}
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;
				const debugMode = this.getNodeParameter('debugMode', false) as boolean;
				const options = this.getNodeParameter('options', {}) as IDataObject;

				// FORCE LOGGING - sempre mostra logs básicos
				console.log('🚀 WEBHOOK CREATE STARTED');
				console.log('📍 Webhook URL:', webhookUrl);
				console.log('🎯 Event:', event);
				console.log('🔧 Debug Mode:', debugMode);

				// Validate webhook URL
				if (!webhookUrl || !webhookUrl.startsWith('http')) {
					const error = `❌ Invalid webhook URL: ${webhookUrl}. Make sure n8n is accessible externally.`;
					console.error(error);
					throw new Error(error);
				}

				// Validate event
				const validEvents = [
					'on_activity_created', 'on_organization_created', 'on_organization_updated', 
					'on_organization_deleted', 'on_deal_created', 'on_deal_updated', 
					'on_deal_deleted', 'on_deal_stage_updated', 'on_deal_won', 
					'on_deal_lost', 'on_person_created', 'on_person_updated', 'on_person_deleted'
				];
				
				if (!validEvents.includes(event)) {
					const error = `❌ Invalid event: ${event}. Valid events: ${validEvents.join(', ')}`;
					console.error(error);
					throw new Error(error);
				}

				// Test API authentication first
				console.log('🔐 Testing API authentication...');
				try {
					await agendorApiRequest.call(this, 'GET', '/users/me');
					console.log('✅ API authentication successful');
				} catch (error) {
					const authError = `❌ API authentication failed: ${(error as Error).message}. Please check your Agendor API token.`;
					console.error(authError);
					throw new Error(authError);
				}

				const body = {
					target_url: webhookUrl,
					event: event,
					active: true,
					...(options.description && { description: options.description }),
				};

				console.log('� Sending webhook creation request to Agendor...');
				console.log('📋 Request body:', JSON.stringify(body, null, 2));

				try {
					const response = await agendorApiRequest.call(this, 'POST', '/integrations/subscriptions', body);
					
					console.log('✅ Webhook created successfully!');
					console.log('📥 Response:', JSON.stringify(response, null, 2));
					
					return true;
				} catch (error) {
					console.log('❌ WEBHOOK CREATION FAILED - DETAILED ERROR:');
					
					const errorObj = error as any;
					let detailedError = `Failed to create webhook: ${errorObj.message || 'Unknown error'}`;
					
					console.log('🔍 Error object keys:', Object.keys(errorObj));
					console.log('🔍 Error message:', errorObj.message);
					console.log('🔍 Error response:', errorObj.response);
					console.log('🔍 Error status:', errorObj.statusCode || errorObj.response?.status);
					console.log('🔍 Error data:', errorObj.response?.data || errorObj.response?.body);
					
					// Add more specific error details
					if (errorObj.response) {
						const status = errorObj.response.status || errorObj.statusCode;
						const responseData = errorObj.response.data || errorObj.response.body;
						
						detailedError += `\n\n🔍 HTTP Status: ${status}`;
						
						if (responseData) {
							if (typeof responseData === 'string') {
								detailedError += `\n🔍 Response: ${responseData}`;
							} else if (responseData.message) {
								detailedError += `\n🔍 Agendor Message: ${responseData.message}`;
							} else if (responseData.errors) {
								detailedError += `\n🔍 Errors: ${JSON.stringify(responseData.errors, null, 2)}`;
							} else {
								detailedError += `\n🔍 Response Data: ${JSON.stringify(responseData, null, 2)}`;
							}
						}
						
						// Common error scenarios
						if (status === 400) {
							detailedError += `\n\n� Common causes for 400 Bad Request:`;
							detailedError += `\n• Invalid webhook URL (must be accessible from internet)`;
							detailedError += `\n• URL already registered for this event`;
							detailedError += `\n• Invalid event name`;
							detailedError += `\n• Missing required parameters`;
							detailedError += `\n\n� Try:`;
							detailedError += `\n1. Check if n8n is accessible from external networks`;
							detailedError += `\n2. Verify webhook URL: ${webhookUrl}`;
							detailedError += `\n3. Check if webhook already exists in Agendor`;
						} else if (status === 401) {
							detailedError += `\n\n� Authentication error: Check your Agendor API token`;
						} else if (status === 403) {
							detailedError += `\n\n� Permission error: Your API token may not have webhook permissions`;
						}
					}
					
					console.error('📋 Final error message:', detailedError);
					throw new Error(detailedError);
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