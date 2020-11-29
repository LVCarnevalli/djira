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
* [`djira config`](#djira-config)
* [`djira help [COMMAND]`](#djira-help-command)
* [`djira log KEY TIME`](#djira-log-key-time)
* [`djira template TYPE`](#djira-template-type)

## `djira config`

```
USAGE
  $ djira config

OPTIONS
  -e, --email=email  (required) email for JIRA, examples: -e teste@domain.com.br
  -h, --help         show CLI help

  -t, --token=token  (required) token for JIRA, examples: -t HASH123
                     reference: https://confluence.atlassian.com/cloud/api-tokens-938839638.html

  -u, --url=url      (required) url for JIRA, examples: -u https://www.atlassian.com

EXAMPLE
  $ djira config --email teste@domain.com.br --token HASH123 --url https://www.atlassian.com
```

_See code: [src/commands/config.ts](https://github.com/LVCarnevalli/djira/blob/v0.0.1/src/commands/config.ts)_

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

## `djira log KEY TIME`

```
USAGE
  $ djira log KEY TIME

ARGUMENTS
  KEY   key of task or template name, examples: TASK-123, daily
  TIME  time of worked, examples: 30m, 1h

OPTIONS
  -d, --date=date      date to log the work, pattern: YYYY-MM-DD, examples: -d 2020-02-25
  -h, --help           show CLI help
  -p, --params=params  parameters for the template if the args KEY is a template name, examples: -p value1 value2

EXAMPLE
  $ djira log daily 30m
  $ djira log daily 10m --params value1 value2
  $ djira log TASK-123 1h
  $ djira log TASK-123 2h --date 2020-02-25
```

_See code: [src/commands/log.ts](https://github.com/LVCarnevalli/djira/blob/v0.0.1/src/commands/log.ts)_

## `djira template TYPE`

```
USAGE
  $ djira template TYPE

ARGUMENTS
  TYPE  (add|remove|list) action for template

OPTIONS
  -f, --force-create=force-create  create task if not exists using the body of JIRA, examples: -f {json_body}
                                   reference:
                                   https://developer.atlassian.com/server/jira/platform/jira-rest-api-examples/
                                   reference issues types:
                                   https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-types/

  -h, --help                       show CLI help

  -j, --jql=jql                    jql query of JIRA, examples: -j "project = TASK"
                                   reference: https://www.atlassian.com/software/jira/guides/expand-jira/jql

  -n, --name=name                  template name, examples: -n daily

EXAMPLE
  $ djira template add --name daily --jql "project = TASK AND issuetype = \"Alinhamento Diario\" AND sprint in 
  openSprints()"
  $ djira template add --name daily ]
  --jql "project = TASK AND issuetype = \"Alinhamento Diario\" AND issue = {param1}" --force-create 
  "{\"fields\":{\"project\":{\"key\":\"TEST\"},\"parent\":{\"key\":\"{param1}\"},\"summary\":\"Sub-task of 
  TEST-101\",\"issuetype\":{\"id\":\"5\"}}}"
  $ djira template list
  $ djira template list --name daily
  $ djira template remove --name daily
```

_See code: [src/commands/template.ts](https://github.com/LVCarnevalli/djira/blob/v0.0.1/src/commands/template.ts)_
<!-- commandsstop -->
