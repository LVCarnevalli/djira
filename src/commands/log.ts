import {Command, flags} from '@oclif/command';

export default class Log extends Command {
  static description = 'log working time';

  static examples = [
    `$ djira log daily 30m
$ djira log daily 10m --params value1 value2
$ djira log TASK-123 1h
$ djira log TASK-123 2h --date 25/02/2020
    `,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    date: flags.string({char: 'd', description: 'date to log the work, pattern: DD/MM/YYYY, examples: -d 25/02/2020'}),
    params: flags.string({multiple: true, char: 'p', description: 'parameters for the template if the args KEY is a template name, examples: -p value1 value2'}),
  };

  static args = [
    {name: 'key', required: true, description: "key of task or template name, examples: TASK-123, daily"},
    {name: 'time', required: true, description: "time of worked, examples: 30m, 1h"},
  ];

  async run() {
    const {args, flags} = this.parse(Log);

    this.log(`date = ${flags.date}`);
    this.log(`params = ${flags.params}`);
    this.log(`key = ${args.key}`);
    this.log(`time = ${args.time}`);
  }
}
