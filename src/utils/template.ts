import * as Config from './config';

export async function getByName(name: string, ctx: any): Promise<Config.DataTemplate> {
  const config: Config.DataConfig = await Config.read(ctx);
  const findTemplate = config.templates.filter(function (template: Config.DataTemplate) {
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
