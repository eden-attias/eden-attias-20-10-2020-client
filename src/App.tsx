import 'antd/dist/antd.css';
import React from 'react';
import 'react-block-ui/style.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import stores from './stores';
import LayoutContainer from './ui/containers/Layout/Layout.container';
import LoginContainer from './ui/containers/Login/Login.container';
import MessagesContainer from './ui/containers/Messages/Messages.container';
import RegisterContianer from './ui/containers/Register/Register.contianer';

interface IProps {}

interface IState {}

const {authStore} = stores;

export default class App extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}

	async componentWillMount() {
		try {
			await authStore.trySilentLogin();
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<Switch>
				<Route
					path='/messages'
					render={(props: any) => (
						<LayoutContainer {...props}>
							<MessagesContainer />
						</LayoutContainer>
					)}
				/>
				{/* <Route path='/dashboard/messages' component={MessagesContainer} key={12345678} /> */}
				<Route path={'/login'} component={LoginContainer} key={123456789} />
				<Route path={'/register'} component={RegisterContianer} key={123456789} />
				<Redirect to='/login' />
			</Switch>
		);
	}
}
