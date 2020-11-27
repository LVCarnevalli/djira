import {readJson, writeJson} from 'fs-extra';
import {join} from 'path';
import {Command} from '@oclif/command';

export class DataHttp {
  public body: any;

  constructor(body: any) {
    this.body = body;
  }
}

export class DataTemplate {
  public name: string;
  public jql: string;
  public forceCreate: DataHttp;

  constructor(name: string, jql: string, forceCreate: DataHttp) {
    this.name = name;
    this.jql = jql;
    this.forceCreate = forceCreate;
  }
}

export class DataUser {
  public email: string;
  public token: string;

  constructor(email: string, token: string) {
    this.email = email;
    this.token = token;
  }
}

export class DataConfig {
  public user: DataUser;
  public templates: DataTemplate[];

  constructor(user: DataUser, templates: DataTemplate[]) {
    this.user = user;
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

export async function write(ctx: Command, data: DataConfig) {
  try {
    await writeJson('config.json', data);
  } catch (error) {
    ctx.error(error || 'A djira CLI error has occurred from write config.json file.', {
      exit: 1
    });
  }
}
