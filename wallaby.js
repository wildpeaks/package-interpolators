
module.exports = () => {
	return {
		debug: true,
		testFramework: 'jasmine',
		files: [
			'src/**/*.ts'
		],
		tests: [
			'test/*.spec.ts'
		],
		env: {
			type: 'node',
		}
	};
};
