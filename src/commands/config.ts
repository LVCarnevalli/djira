import {Command, flags} from '@oclif/command';
import * as ConfigUtils from '../utils/config';

export default class Config extends Command {
  static description = 'configure CLI';

  static examples = [
    `$ djira config --email teste@domain.com.br --token HASH123 --url https://www.atlassian.com`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    email: flags.string({char: 'e', required: true, description: 'email for JIRA, examples: -e teste@domain.com.br'}),
    token: flags.string({
      char: 't', required: true, description: 'token for JIRA, examples: -t HASH123' +
        '\nreference: https://confluence.atlassian.com/cloud/api-tokens-938839638.html'
    }),
    url: flags.string({char: 'u', required: true, description: 'url for JIRA, examples: -u https://www.atlassian.com'}),
  };

  static args = [];

  async run() {
    const {args, flags} = this.parse(Config);

    await ConfigUtils.configure(this, flags.url, flags.email, flags.token);
  }
}
