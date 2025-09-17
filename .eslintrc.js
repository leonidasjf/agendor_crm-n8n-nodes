module.exports = {
	root: true,

	env: {
		browser: true,
		es6: true,
		node: true,
	},

	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
		sourceType: 'module',
	},

	ignorePatterns: [
		'.eslintrc.js',
		'**/*.js',
		'node_modules',
		'dist',
	],

	extends: [
		'eslint:recommended',
		'@typescript-eslint/recommended',
		'plugin:n8n-nodes-base/community',
	],

	plugins: [
		'@typescript-eslint',
	],

	rules: {
		'n8n-nodes-base/node-param-default-missing': 'error',
		'n8n-nodes-base/node-param-description-boolean-without-whether': 'error',
		'n8n-nodes-base/node-param-description-comma-separated-hyphen': 'error',
		'n8n-nodes-base/node-param-description-empty-string': 'error',
		'n8n-nodes-base/node-param-description-excess-inner-whitespace': 'error',
		'n8n-nodes-base/node-param-description-identical-to-display-name': 'error',
		'n8n-nodes-base/node-param-description-line-break-html-tag': 'error',
		'n8n-nodes-base/node-param-description-lowercase-first-char': 'error',
		'n8n-nodes-base/node-param-description-miscased-id': 'error',
		'n8n-nodes-base/node-param-description-miscased-json': 'error',
		'n8n-nodes-base/node-param-description-miscased-url': 'error',
		'n8n-nodes-base/node-param-description-missing-final-period': 'error',
		'n8n-nodes-base/node-param-description-missing-from-dynamic-multi-options': 'error',
		'n8n-nodes-base/node-param-description-missing-from-dynamic-options': 'error',
		'n8n-nodes-base/node-param-description-unneeded-backticks': 'error',
		'n8n-nodes-base/node-param-description-untrimmed': 'error',
		'n8n-nodes-base/node-param-description-url-missing-protocol': 'error',
		'n8n-nodes-base/node-param-description-weak': 'error',
		'n8n-nodes-base/node-param-display-name-excess-inner-whitespace': 'error',
		'n8n-nodes-base/node-param-display-name-untrimmed': 'error',
		'n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options': 'error',
		'n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options': 'error',
		'n8n-nodes-base/node-param-display-name-wrong-for-simplify': 'error',
		'n8n-nodes-base/node-param-display-name-wrong-for-update-fields': 'error',
		'n8n-nodes-base/node-param-multi-options-type-unsorted-items': 'error',
		'n8n-nodes-base/node-param-operation-without-no-data-expression': 'error',
		'n8n-nodes-base/node-param-option-description-identical-to-name': 'error',
		'n8n-nodes-base/node-param-option-name-containing-star': 'error',
		'n8n-nodes-base/node-param-option-name-duplicate': 'error',
		'n8n-nodes-base/node-param-option-name-wrong-for-get-many': 'error',
		'n8n-nodes-base/node-param-option-name-wrong-for-upsert': 'error',
		'n8n-nodes-base/node-param-option-value-duplicate': 'error',
		'n8n-nodes-base/node-param-options-type-unsorted-items': 'error',
		'n8n-nodes-base/node-param-resource-without-no-data-expression': 'error',
		'n8n-nodes-base/node-param-resource-with-plural-option': 'error',
		'n8n-nodes-base/node-param-type-options-missing-from-limit': 'error',

		// Custom rules for this project
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
	},
};