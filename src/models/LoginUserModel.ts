import {observable} from 'mobx';

export default class UserLoginModel {
	@observable
	public user_name: string = '';

	@observable
	public password: string = '';
}
