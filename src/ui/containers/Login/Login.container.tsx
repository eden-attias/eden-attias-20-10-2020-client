import {observer} from 'mobx-react';
import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import WithoutAuth from 'src/hocs/WithOutAuth.hoc';
import UserLoginModel from 'src/models/LoginUserModel';
import AlertUtils from 'src/service/Alerts/AlertUtils';
import stores from 'src/stores';
import LoginCardComponent from 'src/ui/components/Login/LoginCard.component';

interface IProps extends RouteComponentProps {
	history: any;
}

interface IState {}

const {authStore} = stores;

@observer
class LoginContainer extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
	}

	public async handleLogin(userData: any) {
		const loginRequest = new UserLoginModel();
		loginRequest.password = userData.password;
		loginRequest.user_name = userData.username;
		try {
			await authStore.handleUserLogin(loginRequest);
			this.props.history.push('/messages');
		} catch (e) {
			await AlertUtils.showErrorMessege('Login Failed', 'Please check username or password');
		}
	}

	render() {
		return <LoginCardComponent onFormSubmit={this.handleLogin} onFormFaild={{}} />;
	}
}

export default WithoutAuth(withRouter(LoginContainer));
