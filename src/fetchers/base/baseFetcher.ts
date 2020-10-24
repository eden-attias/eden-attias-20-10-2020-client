import axios, {AxiosInstance} from 'axios';
import EnvConfig from '../../service/envConfig';

export class BaseFetcher {
	public axios: AxiosInstance;

	constructor(baseRoute: string, fetcherBaseURL?: string) {
		let baseApiUrl = fetcherBaseURL ? fetcherBaseURL : this.getBaseApiUrl();
		baseApiUrl += `/${baseRoute}`;
		this.axios = axios.create({
			baseURL: baseApiUrl,
		});
	}

	public get<V>(url: string, headers?: any): Promise<any> {
		return this.axios.get<any, V>(url, headers);
	}

	public post<V>(url: string, body?: any, headers?: any): Promise<any> {
		return this.axios.post<any, V>(url, body, headers);
	}

	public put(url: string, body?: any, headers?: any): Promise<any> {
		return this.axios.put(url, body, headers);
	}

	public del(url: string, headers?: any): Promise<any> {
		return this.axios.delete(url, headers);
	}

	private getBaseApiUrl() {
		return EnvConfig.getApiUrlFromServer();
	}
}
