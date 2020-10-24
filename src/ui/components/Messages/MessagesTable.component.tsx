import {Table} from 'antd';
import React from 'react';
import Message from 'src/models/MessageModel';

interface IProps {
	messages: Message[];
	selectedMessagesChange: any;
}

interface IState {
	[x: string]: boolean;
}

class MessagesTableComponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.formatMessages = this.formatMessages.bind(this);
	}

	private formatMessages() {
		return this.props.messages.map((message) => {
			return {
				key: message.id,
				subject: message.subject,
				creation_date: new Date(message.creation_date).toDateString(),
				sender: message.sender,
				receiver: message.receiver,
				id: message.id,
				message: `${message.message.substring(0, 25)} ...`,
				description: message.message,
			};
		});
	}

	private getTableColumns() {
		type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
		const columns = [
			{
				title: 'Date',
				dataIndex: 'creation_date',
				sorter: {
					compare: (a: any, b: any) => a.creation_date - b.creation_date,
				},
			},
			{
				title: 'Subject',
				dataIndex: 'subject',
				responsive: ['md' as Breakpoint],
			},
			{
				title: 'Receiver',
				dataIndex: 'receiver',
				responsive: ['sm' as Breakpoint],
				sorter: {
					compare: (a: any, b: any) => a.receiver.length - b.receiver.length,
				},
			},
			{
				title: 'Sender',
				dataIndex: 'sender',
				// responsive: ['sm' as Breakpoint],
				sorter: {
					compare: (a: any, b: any) => a.sender.length - b.sender.length,
				},
			},
			{
				title: 'Message',
				dataIndex: 'message',
				responsive: ['md' as Breakpoint],
			},
		];
		return columns;
	}

	render() {
		const rowSelection = {
			onChange: (selectedRowKeys: any, selectedRows: any) => {
				console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
				this.props.selectedMessagesChange(selectedRowKeys);
			},
		};

		return (
			<>
				<Table
					rowSelection={{
						type: 'checkbox',
						...rowSelection,
					}}
					expandable={{
						expandedRowRender: (record) => <p style={{margin: 0}}>{record.description}</p>,
					}}
					pagination={{pageSize: 6}}
					columns={this.getTableColumns()}
					dataSource={this.formatMessages()}
				/>
			</>
		);
	}
}

export default MessagesTableComponent;
