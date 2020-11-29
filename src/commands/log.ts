import {Command, flags} from '@oclif/command';
import * as ConfigUtils from '../utils/config';
import * as JiraUtils from '../utils/jira';
import {DataTemplate} from '../utils/storage';
import * as TemplateUtils from '../utils/template';

export default class Log extends Command {
  static description = 'log working time';

  static examples = [
    `$ djira log daily 30m
$ djira log daily 10m --params value1 value2
$ djira log TASK-123 1h
$ djira log TASK-123 2h --date 2020-02-25
    `,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    date: flags.string({char: 'd', description: 'date to log the work, pattern: YYYY-MM-DD, examples: -d 2020-02-25'}),
    params: flags.string({
      multiple: true,
      char: 'p',
      description: 'parameters for the template if the args KEY is a template name, examples: -p value1 value2'
    }),
  };

  static args = [
    {name: 'key', required: true, description: "key of task or template name, examples: TASK-123, daily"},
    {name: 'time', required: true, description: "time of worked, examples: 30m, 1h"},
  ];

  async run() {
    await ConfigUtils.validate(this);

    const {args, flags} = this.parse(Log);
    const templates: DataTemplate[] = await TemplateUtils.get(this, args.key);

    if (templates.length <= 1) {
      let responseSearch;
      if (templates && templates.length == 1) {
        let templateFound = templates[0];
        responseSearch = await JiraUtils.search(this, args.key, flags.params, templateFound);

        if (templateFound.forceCreate && this.isNotFoundIssues(responseSearch)) {
          await this.createIssue(templateFound, flags);
          responseSearch = await JiraUtils.search(this, args.key, flags.params, templateFound);
        }
      } else {
        // @ts-ignore
        responseSearch = await JiraUtils.search(this, args.key);
      }

      if (this.isNotFoundIssues(responseSearch)) {
        this.throwNotFoundIssue();
      } else if (responseSearch.issues.length > 1) {
        this.throwThereAreMoreIssue(responseSearch);
      } else {
        this.logWorklog(responseSearch, args, flags);
      }
    } else {
      this.throwThereAreMoreTemplate();
    }
  }

  private async createIssue(templateFound: any, flags: any) {
    await JiraUtils.create(this, templateFound.forceCreate, flags.params);
    this.log("Create issue with force create from config in template.")
  }

  private logWorklog(responseSearch: any, args: { [p: string]: any }, flags: any) {
    const issueKey = responseSearch.issues[0].key;
    JiraUtils.log(this, issueKey, args.time, flags.date).then(() => {
      this.log(`Logged ${args.time} of worklog time in ${issueKey}.`);
    });
  }

  private throwThereAreMoreTemplate() {
    this.error('There are more than one template.', {
      exit: 1
    });
  }

  private throwThereAreMoreIssue(responseSearch: any) {
    const keysFound = responseSearch.issues.map(function (obj: any) {
      return obj.key;
    });

    this.error(`More than one task was found (${keysFound}), verify your JQL query in template configured.`, {
      exit: 1
    });
  }

  private throwNotFoundIssue() {
    this.error(`No task was found, verify your JQL query in template configured or key issue.`, {
      exit: 1
    });
  }

  private isNotFoundIssues(responseSearch: any) {
    return !responseSearch || responseSearch.issues.length == 0;
  }
}
