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
					const webhooks = response.data || [];

					for (const webhook of webhooks) {
						if (webhook.target_url === webhookUrl && webhook.event === event) {
							return true;
						}
					}
				} catch (error) {
					return false;
				}

				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;

				const body = {
					target_url: webhookUrl,
					event: event,
				};

				try {
					await agendorApiRequest.call(this, 'POST', '/integrations/subscriptions', body);
					return true;
				} catch (error) {
					return false;
				}
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;

				try {
					const response = await agendorApiRequest.call(this, 'GET', '/integrations/subscriptions');
					const webhooks = response.data || [];

					for (const webhook of webhooks) {
						if (webhook.target_url === webhookUrl && webhook.event === event) {
							await agendorApiRequest.call(this, 'DELETE', `/integrations/subscriptions/${webhook.id}`);
							return true;
						}
					}
				} catch (error) {
					return false;
				}

				return false;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const headerData = this.getHeaderData() as IDataObject;

		return {
			workflowData: [
				[
					{
						json: {
							...bodyData,
							headers: headerData,
						},
					},
				],
			],
		};
	}
}