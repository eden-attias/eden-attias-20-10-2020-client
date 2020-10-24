import React from 'react';
import ClientCookies from '../service/storage/ClientCookies';
import {Redirect} from 'react-router-dom';

interface IProps {}

interface IState {}

export default function WithoutAuth(WrappedComponent: any) {
	return class ReactComponentWithOutAuth extends React.Component<IProps, IState> {
		render() {
			const token = ClientCookies.getLoginCookieData();
			if (token) {
				return <Redirect to='messages' />;
			}
			return <WrappedComponent {...this.props} />;
		}
	};
}
