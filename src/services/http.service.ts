/* eslint-disable @typescript-eslint/no-explicit-any */
import { TFetchOptions, THttpOptions } from "@/types";
import { env } from "../../env";

export const API_BASE_URL = env.API_BASE_URL;

class HttpService {
  constructor(public baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(path?: string, options: THttpOptions = {}) {
    const url = new URL(this.baseUrl);
    if (path) {
      url.pathname = path;
    }

    const transformedOptions = this.buildOptions(url, options);

    const res = await fetch(url.toString(), {
      ...transformedOptions,
      method: "GET",
    });
    const data = await res.json();
    return data;
  }
  async post(path: string, payload: any, options: THttpOptions = {}) {
    const url = new URL(this.baseUrl);
    if (path) {
      url.pathname = path;
    }

    const { headers, ...rest } = this.buildOptions(url, options);

    const res = await fetch(url.toString(), {
      ...rest,
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(headers as Record<string, string>),
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  }

  async put(path: string, payload: any, options: THttpOptions = {}) {
    const url = new URL(this.baseUrl);
    if (path) {
      url.pathname = path;
    }

    const { headers, ...rest } = this.buildOptions(url, options);

    const res = await fetch(url.toString(), {
      ...rest,
      method: "PUT",
      headers: {
        "content-type": "application/json",
        ...(headers as Record<string, string>),
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  }

  async patch(path: string, payload: any, options: THttpOptions = {}) {
    const url = new URL(this.baseUrl);
    if (path) {
      url.pathname = path;
    }

    const { headers, ...rest } = this.buildOptions(url, options);

    const res = await fetch(url.toString(), {
      ...rest,
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        ...(headers as Record<string, string>),
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  }

  async delete(path: string, payload: any = null, options: THttpOptions = {}) {
    const url = new URL(this.baseUrl);
    if (path) {
      url.pathname = path;
    }

    const { headers, ...rest } = this.buildOptions(url, options);

    const body = payload ? JSON.stringify(payload) : undefined;

    const res = await fetch(url.toString(), {
      ...rest,
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        ...(headers as Record<string, string>),
      },
      body,
    });
    const data = await res.json();
    return data;
  }

  buildOptions(url: URL, options: THttpOptions) {
    const { params, headers = {}, cache, revalidate, tags } = options;

    if (params && Object.keys(params).length > 0) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    const fetchOptions: TFetchOptions = {};

    if (cache) {
      fetchOptions.cache = options.cache as RequestCache;
    }
    if (revalidate) {
      fetchOptions.next = {
        revalidate,
      };
    }
    if (tags && tags.length) {
      fetchOptions.next = {
        ...fetchOptions.next,
        tags,
      };
    }
    return { ...fetchOptions, headers };
  }
}

const httpService = new HttpService(API_BASE_URL);

export default httpService;
