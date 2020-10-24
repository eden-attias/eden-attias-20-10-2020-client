import {EllipsisOutlined, MailOutlined} from '@ant-design/icons';
import {Input, Form, Button} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import AlertUtils from 'src/service/Alerts/AlertUtils';
import stores from 'src/stores';

const {TextArea} = Input;

interface IProps {
	visible: boolean;
	setVisible: any;
	sendNewMessage: any;
}

interface IState {}

const {uiStore} = stores;

class SendMessageModalComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.onFinish = this.onFinish.bind(this);
	}

	private onFinish(values: any) {
		uiStore.blockUiSite();
		this.props.sendNewMessage(values);
		uiStore.unblockUiSite();
		AlertUtils.showSuccessPopUp('Succsess', 'Message was sent', () => this.props.setVisible(false));
	}

	render() {
		return (
			<Modal
				title='New Message'
				centered
				visible={this.props.visible}
				onCancel={() => this.props.setVisible(false)}
				footer={[
					<Button form='myForm' key='submit' htmlType='submit'>
						Submit
					</Button>,
				]}
				width={1000}>
				<Form name='basic' initialValues={{subject: '', reciver: '', message: ''}} onFinish={this.onFinish} id='myForm'>
					<Form.Item name={['reciver']} rules={[{required: true, type: 'email', message: 'Please type vaild email'}]}>
						<Input prefix={<MailOutlined />} placeholder={'Mail address'} />
					</Form.Item>
					<Form.Item name={['subject']} rules={[{required: true, message: 'Please type your subject'}]}>
						<Input prefix={<EllipsisOutlined placeholder={'Subject'} />} />
					</Form.Item>
					<Form.Item name={['message']} rules={[{required: true, message: 'Please type your message'}]}>
						<TextArea rows={4} allowClear />
					</Form.Item>
				</Form>
			</Modal>
		);
	}
}

export default SendMessageModalComponent;
