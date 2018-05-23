var https = require('https');
var fs = require('fs');
var fetch = require('node-fetch');
var yaml = require('js-yaml');

var endpointPath = '/api/v4/ci/lint';

function validateGitlabCi(server, filename) {
	var text = fs.readFileSync(filename);
	var yamlDoc = yaml.safeLoad(text.toString());
	var yamlEncoded = JSON.stringify(yamlDoc);
	return fetch(server + endpointPath, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({content: yamlEncoded})
	})
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((err) => console.error(err));
}

module.exports = validateGitlabCi;
