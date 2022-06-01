import { AxiosResponse } from 'axios';

export interface IRequest {
  post(): Promise<AxiosResponse>;
  get(): Promise<AxiosResponse>;
}
