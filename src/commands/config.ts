import {Command, flags} from '@oclif/command';

export default class Config extends Command {
  static description = 'configure CLI';

  static examples = [
    `$ djira config auth --email teste@domain.com.br --token HASH123`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    email: flags.string({char: 'e', required: true, description: 'email for JIRA, examples: -e teste@domain.com.br'}),
    token: flags.string({char: 't', required: true, description: 'token for JIRA, examples: -t HASH123' +
        '\nreference: https://confluence.atlassian.com/cloud/api-tokens-938839638.html'}),
  };

  static args = [
    {name: 'type', options: ['auth'], required: true, description: "action for configuration"},
  ];

  async run() {
    const {args, flags} = this.parse(Config);

    this.log(`email = ${flags.email}`);
    this.log(`token = ${flags.token}`);
    this.log(`type = ${args.type}`);
  }
}
