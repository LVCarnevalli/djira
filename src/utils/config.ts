import * as Storage from './storage';

export async function configure(ctx: any, url: string, email: string, token: string) {
  const config: Storage.DataConfig = await Storage.read(ctx);
  config.url = url;
  config.email = email;
  config.token = token;
  await Storage.write(ctx, config);
}

export async function validate(ctx: any) {
  const config: Storage.DataConfig = await Storage.read(ctx);

  if (!config.url || !config.email || !config.token) {
    ctx.error('Configure your CLI, using command "config".', {
      exit: 1
    });
  }
}
