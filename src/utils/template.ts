import * as Config from './storage';
import {DataTemplate} from './storage';

export async function get(ctx: any, name: string): Promise<Config.DataTemplate> {
  const config: Config.DataConfig = await Config.read(ctx);
  const findTemplate = config.templates.filter((template: Config.DataTemplate) => {
    return template.name == name;
  });

  if (!findTemplate || findTemplate.length == 0) {
    ctx.error('Not found template.', {
      exit: 1
    });
  }

  if (findTemplate.length > 1) {
    ctx.error('There are more than one template.', {
      exit: 1
    });
  }

  return findTemplate[0];
}

export async function list(ctx: any): Promise<DataTemplate[]> {
  const config: Config.DataConfig = await Config.read(ctx);
  return config.templates;
}

export async function add(ctx: any, name: string, jql: string, forceCreateBody: any) {
  const config: Config.DataConfig = await Config.read(ctx);
  config.templates.push(new DataTemplate(name, jql, forceCreateBody));
  await Config.write(ctx, config);
}

export async function remove(ctx: any, name: string) {
  const config: Config.DataConfig = await Config.read(ctx);
  config.templates = config.templates.filter((element) => {
    return element.name != name;
  });
  await Config.write(ctx, config);
}



