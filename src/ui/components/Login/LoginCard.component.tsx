import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input, Typography} from 'antd';
import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

const {Link} = Typography;

interface IProps extends RouteComponentProps {
	onFormSubmit: any;
	onFormFaild: any;
	history: any;
}

interface IState {}

class LoginCardComponent extends React.Component<IProps, IState> {
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
				Login
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
						initialValues={{remember: true, username: '', password: ''}}
						onFinish={this.onFinish}
						onFinishFailed={this.props.onFormFaild}>
						<Form.Item
							name='username'
							rules={[{required: true, message: 'Please input your username!'}]}
							style={{paddingTop: '10px'}}>
							<Input addonBefore={<MailOutlined />} placeholder={'Username'} />
						</Form.Item>
						<Form.Item name='password' rules={[{required: true, message: 'Please input your password!'}]}>
							<Input.Password addonBefore={<LockOutlined />} placeholder={'Password'} />
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
								Log in
							</Button>
						</Form.Item>
						<Form.Item style={{textAlign: 'center', marginBottom: '5px'}}>
							<Link target='_blank' onClick={() => this.props.history.push('/register')}>
								Click to Register
							</Link>
						</Form.Item>
					</Form>
				</div>
			</Card>
		);
	}
}

export default withRouter(LoginCardComponent);
