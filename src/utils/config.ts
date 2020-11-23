import {readJson} from 'fs-extra';
import {join} from 'path';
import {Command} from '@oclif/command';

export class DataTemplate {
  public name: string;
  public jql: string;

  constructor(name: string, jql: string) {
    this.name = name;
    this.jql = jql;
  }
}

export class DataConfig {
  public templates: DataTemplate[];

  constructor(templates: DataTemplate[]) {
    this.templates = templates;
  }
}

export async function read(ctx: Command): Promise<DataConfig> {
  const config = join(process.cwd(), 'config.json');
  try {
    return await readJson(config);
  } catch (error) {
    ctx.error(error || 'A djira CLI error has occurred from read config.json file.', {
      exit: 1
    });
  }
}

