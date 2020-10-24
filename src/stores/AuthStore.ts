import {action, IObservableArray, observable} from 'mobx';
import MainFetcher from 'src/fetchers/MainFetcher';
import UserLoginModel from 'src/models/LoginUserModel';
import Message from 'src/models/MessageModel';
import RegisterModel from 'src/models/RegisterModel';
import SendMessageModel from 'src/models/SendMessageModel';
import ClientCookies from 'src/service/storage/ClientCookies';
import User from '../models/UserModel';

export default class AuthStore {
	@observable currentUser: User;

	@observable messages: IObservableArray<Message> = observable([]);

	constructor() {
		this.currentUser = new User();
	}

	@action
	public async handleUserLogin(user: UserLoginModel) {
		const response = await MainFetcher.login(user).then((res) => res.data);
		if (response.token) {
			this.currentUser.email = response.email;
			this.currentUser.name = response.name;
			this.currentUser.token = response.token;
			this.currentUser.id = response.id;
			this.currentUser.user_name = response.user_name;
			ClientCookies.addLoginCookie(this.currentUser);
		} else {
			throw new Error('Could not get userDTO');
		}
	}

	@action
	public async trySilentLogin() {
		try {
			const userData: any = ClientCookies.getLoginCookieData();
			this.currentUser.user_name = userData.user_name;
			this.currentUser.token = userData.token;
			this.currentUser.name = userData.name;
			this.currentUser.email = userData.email;
			this.currentUser.id = userData.id;
		} catch (e) {
			throw e;
		}
	}

	@action
	public async getUserMessages() {
		const response: any = await MainFetcher.getUserMessages(this.currentUser.id, this.currentUser.token).then(
			(res) => res.data
		);
		if (response) {
			this.messages.replace(response.messages);
			return;
		} else {
			throw new Error('Could not get user messages');
		}
	}

	public async sendNewMessage(newMessage: SendMessageModel) {
		const response: any = await MainFetcher.sendNewMessage(newMessage, this.currentUser.token).then((res) => res.data);
		if (response.status) {
			return true;
		} else {
			throw new Error('Message didnt send');
		}
	}

	public async removeSelectedMessages(messagesIds: number[]) {
		const response: any = await MainFetcher.removeMessagesById(
			this.currentUser.id,
			messagesIds,
			this.currentUser.token
		).then((res) => res.data);
		if (response.status) {
			return true;
		} else {
			throw new Error('Message didnt send');
		}
	}

	public async register(userData: RegisterModel) {
		const response = await MainFetcher.register(userData).then((res) => res.data);
		if (response) {
			return true;
		} else {
			throw new Error('Register Failed');
		}
	}
}
