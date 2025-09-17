import {
	IExecuteFunctions,
	IHookFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	JsonObject,
	NodeApiError,
	IHttpRequestMethods,
	IRequestOptions,
} from 'n8n-workflow';

export async function agendorApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: any = {},
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('agendorApi');

	const options: IRequestOptions = {
		headers: {
			'Authorization': `Token ${credentials.apiToken}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		method,
		qs,
		body,
		uri: uri || `${credentials.apiUrl}${resource}`,
		json: true,
	};

	options.headers = Object.assign({}, options.headers, option.headers);

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	try {
		const response = await this.helpers.request!(options);

		// Handle Agendor API response format
		if (response && typeof response === 'object') {
			// If response has data property, return it; otherwise return the whole response
			return response.data !== undefined ? response.data : response;
		}

		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function agendorApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: any = {},
	query: IDataObject = {},
): Promise<any> {
	const returnData: IDataObject[] = [];

	let responseData;
	query.page = 1;
	query.per_page = 100; // Agendor API default pagination

	do {
		responseData = await agendorApiRequest.call(this, method, endpoint, body, query);

		// Handle different response formats
		let items;
		if (Array.isArray(responseData)) {
			items = responseData;
		} else if (responseData.data && Array.isArray(responseData.data)) {
			items = responseData.data;
		} else if (responseData.results && Array.isArray(responseData.results)) {
			items = responseData.results;
		} else {
			break;
		}

		returnData.push.apply(returnData, items);

		// Check if there are more pages
		const hasNextPage = items.length === query.per_page;
		if (!hasNextPage) {
			break;
		}

		query.page++;
	} while (true);

	return returnData;
}