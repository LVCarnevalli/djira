import * as Storage from './storage';
import {DataTemplate} from './storage';

async function readStorage(ctx: any) {
  const storage: Storage.DataConfig = await Storage.read(ctx);
  if (!storage.templates) {
    storage.templates = [];
  }
  return storage;
}

export async function get(ctx: any, name: string): Promise<Storage.DataTemplate[]> {
  const storage = await readStorage(ctx);
  const templates = storage.templates.filter((template: Storage.DataTemplate) => {
    return template.name == name;
  });
  return templates;
}

export async function list(ctx: any): Promise<DataTemplate[]> {
  const storage = await readStorage(ctx);

  return storage.templates;
}

export async function add(ctx: any, name: string, jql: string, forceCreateBody: string) {
  const storage = await readStorage(ctx);
  storage.templates.push(new DataTemplate(name, jql, forceCreateBody));

  await Storage.write(ctx, storage);
}

export async function remove(ctx: any, name: string) {
  const storage = await readStorage(ctx);
  storage.templates = storage.templates.filter((element) => {
    return element.name != name;
  });

  await Storage.write(ctx, storage);
}



