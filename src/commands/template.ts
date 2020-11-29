import {Command, flags} from '@oclif/command';
import * as TemplateUtils from '../utils/template';
import {DataTemplate} from '../utils/storage';

export default class Template extends Command {
  static description = 'create, list and remove templates';

  static examples = [
    `$ djira template add --name daily --jql "project = TASK AND issuetype = \\"Alinhamento Diario\\" AND sprint in openSprints()"
$ djira template add --name daily \
--jql "project = TASK AND issuetype = \\"Alinhamento Diario\\" AND issue = {param1}" \
--force-create "{\\"fields\\":{\\"project\\":{\\"key\\":\\"TEST\\"},\\"parent\\":{\\"key\\":\\"{param1}\\"},\\"summary\\":\\"Sub-task of TEST-101\\",\\"issuetype\\":{\\"id\\":\\"5\\"}}}"
$ djira template list
$ djira template list --name daily
$ djira template remove --name daily
`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'template name, examples: -n daily'}),
    jql: flags.string({
      char: 'j', description: 'jql query of JIRA, examples: -j "project = TASK"' +
        '\nreference: https://www.atlassian.com/software/jira/guides/expand-jira/jql'
    }),
    "force-create": flags.string({
      char: 'f',
      description: 'create task if not exists using the body of JIRA, examples: -f {json_body}' +
        '\nreference: https://developer.atlassian.com/server/jira/platform/jira-rest-api-examples/' +
        '\nreference issues types: https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-types/'

    }),
  };

  static args = [
    {name: 'type', options: ['add', 'remove', 'list'], required: true, description: "action for template"},
  ];

  async run() {
    const {args, flags} = this.parse(Template);

    switch (args.type) {
      case 'list':
        await this.list();
        break;
      case 'add':
        // @ts-ignore
        await this.add(flags.name, flags.jql, flags["force-create"]);
        break;
      case 'remove':
        // @ts-ignore
        await this.remove(flags.name);
        break;
    }
  }

  async list() {
    const templates: DataTemplate[] = await TemplateUtils.list(this);
    this.log(JSON.stringify(templates));
  }

  async add(name: string, jql: string, forceCreate: string) {
    await TemplateUtils.add(this, name, jql, forceCreate);
  }

  async remove(name: string) {
    await TemplateUtils.remove(this, name);
  }
}
