# Contributing

## System Dependencies

### Node

* [Node.js](https://nodejs.org/) - v4.2.0+
* [npm](https://www.npmjs.com/) - v2.14.7+

## Install project dependencies

### Global Node Module(s)

* Grunt CLI - `npm install grunt-cli -g`

### Code

* Fork and clone the npm-package-json-lint repo

### Install project dependencies

`npm install`

This installs dependencies from `package.json`.

### Running the module Locally

Run `node src/cli.js`

## Code guidelines

### JS

npm package json lint utilizes both JSHint and JSCS to enforce JavaScript standards. Please see the `.jshintrc` file for JSHint config and `.jscsrc` for JSCS config.

* [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
* [grunt-jscs](https://github.com/jscs-dev/grunt-jscs)

#### JSON

npm package json lint utilizes JSON Lint to ensure JSON files are valid.

* [grunt-jsonlint](https://github.com/brandonramirez/grunt-jsonlint)

#### Checking coding style

Run `grunt lint` before committing to ensure your changes follow our coding standards.


### More info on Grunt

The configuration for Grunt tasks in this project are all in the `grunt/` folder in individual files. The Gruntfile loads in all the tasks from this folder.

## Versioning

Please use the following grunt commands to increment the package's version numbers
EX: Assume current version is 0.0.1

`grunt bump:patch`

If you run this command the version will increase the patch number (ie 0.0.2)

`grunt bump:minor`

If you run this command the version will increase the minor number (ie 0.1.0)

`grunt bump:major`

If you run this command the version will increase the major number (ie 1.0.0)


## EditorConfig

EditorConfig helps maintain consistent file formatting between different editors and developers. Please [install the plugin for you editor of choice](https://editorconfig.org/#download). Please see the `.editorconfig` file at the root of this repo to see what settings are enforced.

## License

Contributions to npm-package-json-lint are subject to the [MIT License](https://github.com/tclindner/npm-package-json-lint/blob/master/LICENSE).
