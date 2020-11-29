import * as Storage from './storage';
// @ts-ignore
import * as timestring from 'timestring';
import * as luxon from 'luxon';
import axios from 'axios';
import {DataTemplate} from './storage';

const withParams = (value: string, params: string[]) => {
  if (params && params.length > 0) {
    let index: number = 1;
    while (true) {
      let key = `{param${index}}`;

      if (value.includes(key)) {
        value = value.replace(key, params[0]);
      } else {
        break;
      }
      index++;
    }
  }

  return value;
};

export async function search(ctx: any, key: string, params: string[], template?: DataTemplate): Promise<any> {
  const config: Storage.DataConfig = await Storage.read(ctx);

  return axios.post(`${config.url}/rest/api/3/search`, {
    "jql": !template ? `issue = ${key}` : withParams(template.jql, params),
    "fields": ["key"]
  }, {
    auth: {
      username: config.email,
      password: config.token
    }
  })
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function () {
      return Promise.resolve(null);
    });
}

export async function create(ctx: any, forceCreateBody: string, params: string[]): Promise<void> {
  const config: Storage.DataConfig = await Storage.read(ctx);

  return axios.post(`${config.url}/rest/api/3/issue`, JSON.parse(withParams(forceCreateBody, params)), {
    auth: {
      username: config.email,
      password: config.token
    }
  })
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}

export async function log(ctx: any, key: string, time: string, date?: string): Promise<void> {
  const FORMAT_DATE_TIME = "yyyy-MM-dd'T'HH:mm:ss.SSSZZZ";
  const FORMAT_DATE = "yyyy-MM-dd";

  const config: Storage.DataConfig = await Storage.read(ctx);
  const dateNow = luxon.DateTime.local();
  let started = dateNow.toFormat(FORMAT_DATE_TIME);

  if (date) {
    const dateParam = luxon.DateTime.fromFormat(date, FORMAT_DATE);
    const dateDiff: any = dateNow.diff(dateParam, ['days']).toObject();
    started = dateNow.minus({days: dateDiff.days | 0}).toFormat(FORMAT_DATE_TIME);
  }

  return axios.post(`${config.url}/rest/api/3/issue/${key}/worklog`, {
    "started": started,
    "timeSpentSeconds": timestring(time)
  }, {
    auth: {
      username: config.email,
      password: config.token
    }
  })
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}
