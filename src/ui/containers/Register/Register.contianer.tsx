import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import WithoutAuth from 'src/hocs/WithOutAuth.hoc';
import RegisterModel from 'src/models/RegisterModel';
import AlertUtils from 'src/service/Alerts/AlertUtils';
import stores from 'src/stores';
import RegisterCardComponent from 'src/ui/components/Register/RegisterCard.component';

interface IProps extends RouteComponentProps {
	history: any;
}

interface IState {}

const {authStore} = stores;

class RegisterContianer extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	private async onFormSubmit(values: any) {
		const registerModel: RegisterModel = new RegisterModel();
		registerModel.name = values.name;
		registerModel.email = values.email;
		registerModel.password = values.password;
		registerModel.user_name = values.username;
		try {
			const res = await authStore.register(registerModel);
			if (res) {
				AlertUtils.showSuccessPopUp('Succsess', 'Register Completed', () => this.props.history.push('/login'));
			}
		} catch (e) {
			AlertUtils.showErrorMessege('Falid', 'Email or username alerady exsists');
		}
	}

	render() {
		return <RegisterCardComponent onFormSubmit={this.onFormSubmit} onFormFaild={() => {}} />;
	}
}

export default WithoutAuth(withRouter(RegisterContianer));
