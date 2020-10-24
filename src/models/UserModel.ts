import {observable} from 'mobx';

export default class User {
	@observable user_name: string = '';

	@observable token: string = '';

	@observable name: string = '';

	@observable email: string = '';

	@observable id: any = '';
}
