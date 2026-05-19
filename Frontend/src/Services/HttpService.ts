import axios, { type AxiosInstance } from "axios";
import { appConfig } from "../Utils/AppConfig";

// Thin wrapper around a single axios instance for all REST API calls.
class HttpService {
  private readonly client: AxiosInstance;

  public constructor() {
    this.client = axios.create({ baseURL: appConfig.apiBaseUrl });
  }

  public async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  public async post<T>(url: string, body?: unknown): Promise<T> {
    const response = await this.client.post<T>(url, body);
    return response.data;
  }
}

export const httpService = new HttpService();
