import { APIRequestContext } from "playwright-core";

export default class API {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  private async makeRequest(endpoint: string, method: string, reqBody?: object, token?: string) {
    const headers: Record<string, string> = token ? { 'Cookie': `token=${token}` } : {};

    const requestOptions = {
      headers,
      data: reqBody,
    };

    const res = await this.request[method](endpoint, requestOptions);
    return res;
  }

  async postReq(endpoint: string, reqBody: object) {
    return this.makeRequest(endpoint, 'post', reqBody);
  }

  async getReq(endpoint: string) {
    return this.makeRequest(endpoint, 'get');
  }

  async putReq(endpoint: string, reqBody: object, token: string) {
    return this.makeRequest(endpoint, 'put', reqBody, token);
  }

  async patchReq(endpoint: string, reqBody: object, token: string) {
    return this.makeRequest(endpoint, 'patch', reqBody, token);
  }

  async deleteReq(endpoint: string, token: string) {
    return this.makeRequest(endpoint, 'delete', undefined, token);
  }
}
