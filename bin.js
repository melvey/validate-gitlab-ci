#! /usr/bin/env node
var minimist = require('minimist');
var validateGitlabCi = require('./validate-gitlab-ci');

var args = minimist(process.argv);

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
	process.exit(-1);
};

validateGitlabCi(args.server || 'https://gitlab.com', args.filename).then(() => {
	process.exit();
});
