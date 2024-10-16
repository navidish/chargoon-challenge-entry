import { Form, Input } from 'antd';
import React, { useEffect } from 'react';
import UserAutoComplete from './user-autocomplete';
import UserTable from './user-table';
import { NodeType, TableAction, UserType } from '../../types';

interface Props {
	initialValue?: NodeType;
	editMode?: boolean;
	onChangeTable?:(data:any) => void
}
function BasicInformation({initialValue,editMode }: Props) {
	const [form] = Form.useForm();
	useEffect(() => {
		editMode ? form.setFieldsValue(initialValue) : form.resetFields()
	},[editMode])

	const mockUsers: UserType[] = [
		{ code: '1', title: 'کاربر یک', isDefault: false },
		{ code: '2', title: 'کاربر دو', isDefault: true },
		{ code: '3', title: 'کاربر سه',  isDefault: false },
	];

	const handleOnChangeTable = (user: UserType, action: TableAction) => {
		switch (action) {
			case TableAction.ISDEFAULT:
				mockUsers.map(user => ({...user, isDefault: user.code === user.code }))
				break;
			case TableAction.DELETE:
				mockUsers.filter(item => item.code !== user.code)
				break;
		}
	}
	const onValuesChange = (changedValues: any) => {
			form.setFieldsValue(changedValues)
	};
	

	return (
		<Form form={form}  onValuesChange={onValuesChange}>
			<Form.Item name="title" label="عنوان" labelCol={{ span: 2 }} >
				<Input />
			</Form.Item>
			<Form.Item name="key" label="کد" labelCol={{ span: 2 }}>
				<Input />
			</Form.Item>
			<Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
				<UserAutoComplete />
			</Form.Item>
			<Form.Item name="usersTable" label="جدول" labelCol={{ span: 2 }}>
               <UserTable initialValue={initialValue?.users ?? mockUsers} onHandleUsers={(user,action)=>{ handleOnChangeTable(user,action) }} />
			</Form.Item>
		</Form>
	);
}
export default BasicInformation