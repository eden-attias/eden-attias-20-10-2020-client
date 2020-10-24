import {observable} from 'mobx';

export default class Message {
	@observable sender: string = '';

	@observable receiver: string = '';

	@observable subject: string = '';

	@observable message: string = '';

	@observable date: string = '';

	@observable id: string = '';

	@observable creation_date: string = '';
}
