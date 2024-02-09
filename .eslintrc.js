module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': ['eslint:recommended', 'plugin:vue/vue3-essential'],
	'overrides': [{
		'env': { 'node': true },
		'files': ['.eslintrc.{js,cjs}'],
		'parserOptions': { 'sourceType': 'script' }
	}],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'vue',
		'import',
		'import-newlines'
	],
	'rules': {
		'semi': ['error', 'always'],
		'indent': [
			'error',
			'tab',
			{ 'SwitchCase': 2 }
		],
		'comma-dangle': ['error', 'never'],
		'comma-spacing': 'error',
		'no-unused-vars': 'off',
		'no-multi-spaces': 'error',
		'no-trailing-spaces': 'error',
		'keyword-spacing': 'error',
		'space-infix-ops': 'error',
		'space-before-blocks': 'error',
		'arrow-spacing': 'error',
		'key-spacing': 'error',
		'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 2 }],
		'space-before-function-paren': ['error',
			{
				'anonymous': 'always',
				'named': 'never',
				'asyncArrow': 'always'
			}],
		'padded-blocks': ['error', 'never'],
		'padding-line-between-statements': [
			'error',
			{
				'blankLine': 'always',
				'prev': '*',
				'next': [
					'return',
					'block',
					'block-like'
				]
			},
			{
				'blankLine': 'always',
				'prev': [
					'return',
					'block',
					'block-like'
				],
				'next': '*'
			},
			{
				'blankLine': 'never',
				'prev': [
					'singleline-const',
					'singleline-let',
					'singleline-var'
				],
				'next': [
					'singleline-const',
					'singleline-let',
					'singleline-var'
				]
			},
			{
				'blankLine': 'always',
				'prev': ['import'],
				'next': '*'
			},
			{
				'blankLine': 'any',
				'prev': ['import'],
				'next': ['import']
			},
			{
				'blankLine': 'always',
				'prev': ['export'],
				'next': '*'
			},
			{
				'blankLine': 'any',
				'prev': ['export'],
				'next': ['export']
			}
		],
		'space-in-parens': ['error', 'never'],
		'array-bracket-newline': ['error', { minItems: 3 }],
		'array-element-newline': ['error',
			{
				'multiline': true,
				'minItems': 3
			}],
		'no-multiple-empty-lines': ['error', { max: 1 }],
		'object-curly-newline': ['error', { 'multiline': true }],
		'object-curly-spacing': ['error', 'always'],
		'sort-imports': ['error',
			{
				'ignoreCase': true,
				'ignoreDeclarationSort': true,
				'ignoreMemberSort': false,
				'memberSyntaxSortOrder': [
					'none',
					'all',
					'multiple',
					'single'
				]
			}],
		'import/order': ['error',
			{
				alphabetize: {
					order: 'asc',
					caseInsensitive: true
				},
				'distinctGroup': true,
				'newlines-between': 'always'
			}],
		'import/no-duplicates': 'error',
		'import-newlines/enforce': ['error', { 'items': 4 }],
		'object-property-newline': 'error',
		'vue/html-indent': ['error', 'tab'],
		// Revisar estas reglas
		'vue/v-on-event-hyphenation': 'off',
		'vue/no-mutating-props': 'off',
		'no-useless-escape': 'off'
	}
};
