import {LockOutlined, MailOutlined, TeamOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input} from 'antd';
import React from 'react';

interface IProps {
	onFormSubmit: any;
	onFormFaild: any;
}

interface IState {}
class RegisterCardComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.onFinish = this.onFinish.bind(this);
	}

	onFinish(values: any) {
		this.props.onFormSubmit(values);
	}

	generateCardTitle() {
		return (
			<div style={{textAlign: 'center', fontSize: '18px', color: '#646973', paddingTop: '15px'}}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						paddingBottom: '8px',
					}}></div>
				Register
			</div>
		);
	}

	render() {
		return (
			<Card
				size='small'
				style={{
					width: 300,
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
					backgroundColor: '#f6f9fb',
					boxShadow: '10px -2px 51px -12px rgba(0,0,0,0.75)',
				}}
				title={this.generateCardTitle()}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}>
					<Form
						name='basic'
						initialValues={{username: '', password: '', name: '', email: ''}}
						onFinish={this.onFinish}
						onFinishFailed={this.props.onFormFaild}>
						<Form.Item
							name='email'
							rules={[
								{
									type: 'email',
									message: 'The input is not valid E-mail!',
								},
								{
									required: true,
									message: 'Please input your E-mail!',
								},
							]}>
							<Input addonBefore={<MailOutlined />} placeholder={'Email'} />
						</Form.Item>
						<Form.Item
							name='username'
							rules={[{required: true, message: 'Please input your username!'}]}
							style={{paddingTop: '10px'}}>
							<Input addonBefore={<TeamOutlined />} placeholder={'Username'} />
						</Form.Item>
						<Form.Item
							name='name'
							rules={[{required: true, message: 'Please input your name!'}]}
							style={{paddingTop: '10px'}}>
							<Input addonBefore={<TeamOutlined />} placeholder={'name'} />
						</Form.Item>
						<Form.Item name='password' rules={[{required: true, message: 'Please input your password!'}]}>
							<Input.Password addonBefore={<LockOutlined />} placeholder={'Password'} />
						</Form.Item>
						<Form.Item
							name='confirm'
							dependencies={['password']}
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Please confirm your password!',
								},
								({getFieldValue}) => ({
									validator(_rule, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject('The two passwords that you entered do not match!');
									},
								}),
							]}>
							<Input.Password addonBefore={<LockOutlined />} placeholder={'Confirm passwrod'} />
						</Form.Item>
						<Form.Item>
							<Button
								type='primary'
								style={{
									backgroundColor: '#ffa940',
									border: '#ffa940',
									display: 'block',
									marginLeft: 'auto',
									marginRight: 'auto',
									borderRadius: '7px',
								}}
								htmlType='submit'
								size={'large'}>
								Submit
							</Button>
						</Form.Item>
						<Form.Item style={{textAlign: 'center', marginBottom: '5px'}}></Form.Item>
					</Form>
				</div>
			</Card>
		);
	}
}

export default RegisterCardComponent;
