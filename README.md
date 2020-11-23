djira
=====

JIRA para o desenvolvedor.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/djira.svg)](https://npmjs.org/package/djira)
[![Downloads/week](https://img.shields.io/npm/dw/djira.svg)](https://npmjs.org/package/djira)
[![License](https://img.shields.io/npm/l/djira.svg)](https://github.com/Downloads/djira/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g djira
$ djira COMMAND
running command...
$ djira (-v|--version|version)
djira/0.0.1 darwin-x64 node-v10.16.0
$ djira --help [COMMAND]
USAGE
  $ djira COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`djira hello [FILE]`](#djira-hello-file)
* [`djira help [COMMAND]`](#djira-help-command)

## `djira hello [FILE]`

```
USAGE
  $ djira hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ djira hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Downloads/djira/blob/v0.0.1/src/commands/hello.ts)_

## `djira help [COMMAND]`

```
USAGE
  $ djira help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
