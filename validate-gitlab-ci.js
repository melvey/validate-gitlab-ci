var https = require('https');
var fs = require('fs');
var minimist = require('minimist');
var fetch = require('node-fetch');
var yaml = require('js-yaml');

var endpointPath = '/api/v4/ci/lint';

const args = minimist(process.argv);

function showUsage() {
	console.log(
		'usage validate-gitlab-ci --server <gitlab server> --filename <filename>\n'
		+ 'arguments:\n'
		+ '	--filename 		Path to .gitlab-ci file to validate\n'
		+ '	--server: 		Base URL for the gitlab server to validate against'
	);
}

if(!args.filename) {
	showUsage();
	return -1;
};

fs.readFile(args.filename, (err, text) => {
	console.log(text.toString());
	var yamlDoc = yaml.safeLoad(text.toString());
	var yamlEncoded = JSON.stringify(yamlDoc);
	console.log(JSON.stringify({content: yamlEncoded}));
	return fetch(args.server + endpointPath, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({content: yamlEncoded})
	})
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((err) => console.error(err));
});
