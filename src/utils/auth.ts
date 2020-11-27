import * as Config from './storage';
import {DataUser} from './storage';

export async function configure(ctx: any, email: string, token: string) {
  const config: Config.DataConfig = await Config.read(ctx);
  config.user = new DataUser(email, token);
  await Config.write(ctx, config);
}

export async function validate(ctx: any) {
  const config: Config.DataConfig = await Config.read(ctx);

  if (!config.user || !config.user.email || !config.user.token) {
    ctx.error('Configure your credentials, using command "config".', {
      exit: 1
    });
  }
}
