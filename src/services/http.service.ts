/* eslint-disable @typescript-eslint/no-explicit-any */
import { TFetchOptions, THttpOptions } from "@/types";
import { env } from "../../env";

export const API_BASE_URL =
  typeof window === "undefined"
    ? env.API_BASE_URL
    : env.NEXT_PUBLIC_API_BASE_URL;

class HttpService {
  constructor(public baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Get Request
  async get(path?: string, options: THttpOptions = {}) {
    const url = new URL(this.getUrl(path || ""));

    const transformedOptions = this.buildOptions(url, options);

    const res = await fetch(url.toString(), {
      ...transformedOptions,
      method: "GET",
    });
    const data = await res.json();
    return data;
  }

  // Post request
  async post(path: string, payload: any, options: THttpOptions = {}) {
    const url = new URL(this.getUrl(path || ""));
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

  // Put Request
  async put(path: string, payload: any, options: THttpOptions = {}) {
    const url = new URL(this.getUrl(path || ""));

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

  // Patch Request
  async patch(path: string, payload: any, options: THttpOptions = {}) {
    const url = new URL(this.getUrl(path || ""));

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

  // Delete request
  async delete(path: string, payload: any = null, options: THttpOptions = {}) {
    const url = new URL(this.getUrl(path || ""));

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

  private getUrl(path: string): string {
    const baseUrl = this.baseUrl.endsWith("/")
      ? this.baseUrl
      : `${this.baseUrl}/`;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return new URL(cleanPath, baseUrl).toString();
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
