import React from "react";
import ClientCookies from "../service/storage/ClientCookies";
import { Redirect } from "react-router-dom";

interface IProps {}

interface IState {}

export default function withAuth(WrappedComponent: any) {
  return class ReactComponentWithAuth extends React.Component<IProps, IState> {
    render() {
      const token = ClientCookies.getLoginCookieData();
      if (!token) {
        return <Redirect to="/login" />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}
