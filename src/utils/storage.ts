import {readJsonSync, writeJsonSync, pathExistsSync} from 'fs-extra';
import {join} from 'path';
import {Command} from '@oclif/command';
import * as os from 'os';

const STORAGE_FILE_NAME = '/djira.conf'

export class DataTemplate {
  public name: string;
  public jql: string;
  public forceCreate: string;

  constructor(name: string, jql: string, forceCreate: string) {
    this.name = name;
    this.jql = jql;
    this.forceCreate = forceCreate;
  }
}

export class DataConfig {
  public url: string;
  public email: string;
  public token: string;
  public templates: DataTemplate[];

  constructor(url: string, email: string, token: string, templates: DataTemplate[]) {
    this.url = url;
    this.email = email;
    this.token = token;
    this.templates = templates;
  }
}

export async function read(ctx: Command): Promise<DataConfig> {
  const file = join(os.homedir(), STORAGE_FILE_NAME);

  if (!pathExistsSync(file)) {
    writeJsonSync(file, {});
  }

  try {
    return readJsonSync(file);
  } catch (error) {
    ctx.error(error || 'A djira CLI error has occurred from read config.json file.', {
      exit: 1
    });
  }
}

export async function write(ctx: Command, data: DataConfig) {
  const file = join(os.homedir(), STORAGE_FILE_NAME);

  try {
    writeJsonSync(file, data);
  } catch (error) {
    ctx.error(error || 'A djira CLI error has occurred from write config.json file.', {
      exit: 1
    });
  }
}
