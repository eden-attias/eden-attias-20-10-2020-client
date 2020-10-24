import {BaseFetcher} from './base/baseFetcher';
import UserLoginModel from '../models/LoginUserModel';
import SendMessageModel from 'src/models/SendMessageModel';
import RegisterModel from 'src/models/RegisterModel';

class MainFetcher extends BaseFetcher {
	public async login(loginUserModel: UserLoginModel) {
		try {
			return await this.post('/login', loginUserModel);
		} catch (e) {
			throw e;
		}
	}

	public async getUserMessages(user_id: string, token: string) {
		const AuthStr = {headers: {Authorization: 'Bearer ' + token}};
		try {
			return await this.get(`/get_all_messages?user_id=${user_id}`, AuthStr);
		} catch (e) {
			throw e;
		}
	}

	public async sendNewMessage(body: SendMessageModel, token: string) {
		const AuthStr = {headers: {Authorization: 'Bearer ' + token}};
		try {
			return await this.post(`/add_message`, body, AuthStr);
		} catch (e) {
			throw e;
		}
	}

	public async removeMessagesById(user_id: string, messagesIds: number[], token: string) {
		const body = {messages_ids: messagesIds, user_id};
		const AuthStr = {headers: {Authorization: 'Bearer ' + token}};
		try {
			return await this.post(`/delete_messages`, body, AuthStr);
		} catch (e) {
			throw e;
		}
	}

	public async register(userData: RegisterModel) {
		try {
			return await this.post('/register', userData);
		} catch (e) {
			throw e;
		}
	}
}

export default new MainFetcher('');
