json-cli
========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/json-cli.svg)](https://npmjs.org/package/json-cli)
[![Downloads/week](https://img.shields.io/npm/dw/json-cli.svg)](https://npmjs.org/package/json-cli)
[![License](https://img.shields.io/npm/l/json-cli.svg)](https://github.com/NPM_Tools/json-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g json-cli
$ json COMMAND
running command...
$ json (-v|--version|version)
json-cli/1.0.0 win32-x64 node-v12.18.2
$ json --help [COMMAND]
USAGE
  $ json COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`json beautify [DIR]`](#json-beautify-dir)
* [`json help [COMMAND]`](#json-help-command)
* [`json validate [DIR]`](#json-validate-dir)

## `json beautify [DIR]`

Beautify JSON content

```
USAGE
  $ json beautify [DIR]

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [src\commands\beautify.ts](https://github.com/NPM_Tools/json-cli/blob/v1.0.0/src\commands\beautify.ts)_

## `json help [COMMAND]`

display help for json

```
USAGE
  $ json help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src\commands\help.ts)_

## `json validate [DIR]`

Validate JSON content

```
USAGE
  $ json validate [DIR]

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [src\commands\validate.ts](https://github.com/NPM_Tools/json-cli/blob/v1.0.0/src\commands\validate.ts)_
<!-- commandsstop -->
