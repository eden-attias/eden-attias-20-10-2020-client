import {observable} from 'mobx';

export default class SendMessageModel {
	@observable sender: string = '';

	@observable receiver: string = '';

	@observable subject: string = '';

	@observable message: string = '';
}
