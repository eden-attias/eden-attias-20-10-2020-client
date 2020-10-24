import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Card} from 'antd';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import withAuth from 'src/hocs/WithAuth.hoc';
import SendMessageModel from 'src/models/SendMessageModel';
import AlertUtils from 'src/service/Alerts/AlertUtils';
import stores from 'src/stores';
import MessagesTableComponent from 'src/ui/components/Messages/MessagesTable.component';
import SendMessageModalComponent from 'src/ui/components/SendMessage/SendMessageModal.component';

interface IProps extends RouteComponentProps {
	history: any;
}

interface IState {
	visable: boolean;
	selectedMessages: number[];
}

const {authStore, uiStore} = stores;

@observer
class MessagesContainer extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			visable: false,
			selectedMessages: [],
		};
		this.setVisable = this.setVisable.bind(this);
		this.sendNewMessage = this.sendNewMessage.bind(this);
		this.selectedMessagesChange = this.selectedMessagesChange.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
		this.removeSelectedMessages = this.removeSelectedMessages.bind(this);
	}

	async componentDidMount() {
		await authStore.getUserMessages();
	}

	private async sendNewMessage(values: any) {
		const newMessage: SendMessageModel = new SendMessageModel();
		newMessage.message = values.message;
		newMessage.subject = values.subject;
		newMessage.receiver = values.reciver;
		newMessage.sender = authStore.currentUser.email;
		const resposne = await authStore.sendNewMessage(newMessage);
		if (resposne) {
			this.refreshPage();
		}
	}

	private refreshPage() {
		uiStore.unblockUiSite();
		this.props.history.push('/temp');
		this.props.history.goBack();
	}

	private async removeSelectedMessages() {
		if (this.state.selectedMessages.length !== 0) {
			uiStore.blockUiSite();
			const resposne = await authStore.removeSelectedMessages(this.state.selectedMessages);
			if (resposne) {
				this.refreshPage();
			} else {
				AlertUtils.showErrorMessege('Delete Falied', 'Could not delete those messages');
				uiStore.unblockUiSite();
			}
		}
	}

	private setVisable(value: boolean) {
		this.setState({visable: value});
	}

	private selectedMessagesChange(messagesIds: []) {
		this.setState({selectedMessages: messagesIds});
	}

	render() {
		return (
			<div style={{marginTop: '11vh'}}>
				<SendMessageModalComponent
					visible={this.state.visable}
					setVisible={this.setVisable}
					sendNewMessage={this.sendNewMessage}
				/>
				<Card
					actions={[
						<DeleteOutlined onClick={() => AlertUtils.showQuestionMessage(this.removeSelectedMessages)} />,
						<EditOutlined key='edit' onClick={() => this.setVisable(true)} />,
					]}>
					<MessagesTableComponent
						messages={toJS(authStore.messages)}
						selectedMessagesChange={this.selectedMessagesChange}
					/>
				</Card>
			</div>
		);
	}
}

export default withAuth(withRouter(MessagesContainer));
