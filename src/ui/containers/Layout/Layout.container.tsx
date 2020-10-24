import {Avatar, Dropdown, Layout, Menu} from 'antd';
import React from 'react';
import BlockUi from 'react-block-ui';
import ClientCookies from 'src/service/storage/ClientCookies';
import stores from 'src/stores';

const {Header, Content, Footer} = Layout;

interface IProps {}

interface IState {}

const {authStore, uiStore} = stores;
class LayoutContainer extends React.Component<IProps, IState> {
	private generateSubMenu() {
		return (
			<Menu>
				<Menu.Item key='0' onClick={ClientCookies.deleteLoginCookie}>
					Log Out
				</Menu.Item>
			</Menu>
		);
	}

	render() {
		return (
			<>
				<BlockUi tag='div' blocking={uiStore.shouldBlockUiSite}>
					<Layout className='layout' style={{minHeight: '100vh'}}>
						<Header>
							<Dropdown overlay={this.generateSubMenu()} trigger={['click']}>
								<Avatar
									size={'large'}
									style={{
										color: '#f56a00',
										backgroundColor: '#fde3cf',
										float: 'right',
										marginTop: '12px',
										cursor: 'pointer',
									}}>
									{authStore.currentUser.name.charAt(0).toUpperCase()}
								</Avatar>
							</Dropdown>
						</Header>
						<Content style={{padding: '0 50px'}}>
							<div className='site-layout-content'>{this.props.children}</div>
						</Content>
						<Footer style={{textAlign: 'center'}}>©2020 Created by Eden Attias</Footer>
					</Layout>
				</BlockUi>
			</>
		);
	}
}

export default LayoutContainer;
