import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IRequest } from './request.interface';

export class Request implements IRequest {
  constructor(
    private url: string,
    private data?: any,
    private config?: AxiosRequestConfig,
  ) {}

  post(): Promise<AxiosResponse> {
    return axios.post(this.url, this.data, this.config);
  }

  get(): Promise<AxiosResponse> {
    return axios.get(this.url, this.config);
  }
}
