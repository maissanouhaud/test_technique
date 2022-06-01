import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IRequest } from './request/request.interface';
import { Request } from './request/request';

export class HttpService {

  private static async processPostRequest(
    request: IRequest,
  ): Promise<AxiosResponse> {
    return await request.post();
  }

  private static async processGetRequest(
    request: IRequest,
  ): Promise<AxiosResponse> {
    return await request.get();
  }

  public async post(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return HttpService.processPostRequest(new Request(url, data, config));
  }

  public async get(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return HttpService.processGetRequest(new Request(url, config));
  }
}
