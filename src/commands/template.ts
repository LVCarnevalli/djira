import {Command, flags} from '@oclif/command';

export default class Template extends Command {
  static description = 'create, list and remove templates';

  static examples = [
    `$ djira template add --name daily --jql "project = TASK AND issuetype = \\"Alinhamento Diario\\" AND sprint in openSprints()"
$ djira template add --name daily
--jql "project = TASK AND issuetype = \\"Alinhamento Diario\\" AND issue = {param1}"
--force-create '{
    "fields": {
        "project": {
            "key": "TEST"
        },
        "parent": {
            "key": "{param1}"
        },
        "summary": "Sub-task of TEST-101",
        "description": "Don't forget to do this too.",
        "issuetype": {
            "id": "5"
        }
    }
}
$ djira template list
$ djira template list --name daily
$ djira template remove --name daily
`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'template name, examples: -n daily'}),
    jql: flags.string({char: 'j', description: 'jql query of JIRA, examples: -j "project = TASK"' +
        '\nreference: https://www.atlassian.com/software/jira/guides/expand-jira/jql'}),
    "force-create": flags.string({
      char: 'f',
      description: 'create task if not exists using the body of JIRA, examples: -f {json_body}' +
        '\nreference: https://developer.atlassian.com/server/jira/platform/jira-rest-api-examples/'
    }),
  };

  static args = [
    {name: 'type', options: ['add', 'remove', 'list'], required: true, description: "action for template"},
  ];

  async run() {
    const {args, flags} = this.parse(Template);

    this.log(`name = ${flags.name}`);
    this.log(`jql = ${flags.jql}`);
    this.log(`force-create = ${flags["force-create"]}`);
    this.log(`type = ${args.type}`);
  }
}
