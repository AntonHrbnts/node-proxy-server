start:
	node --env-file=.env index.js

install-eslint:
	npm install eslint-plugin-node
	npm install eslint-plugin-promise
	npm install eslint-plugin-security
	npm install eslint-plugin-import
	npm install @typescript-eslint/eslint-plugin
	npm install eslint-config-airbnb-base
	npm install eslint-config-standard
	npm install eslint-config-prettier

eslint-init:
	npx eslint --init
eslint-check:
	npx eslint .