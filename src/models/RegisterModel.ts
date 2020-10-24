import {observable} from 'mobx';

export default class RegisterModel {
	@observable user_name: string = '';

	@observable name: string = '';

	@observable email: string = '';

	@observable password: string = '';
}
