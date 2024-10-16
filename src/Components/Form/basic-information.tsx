import { Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import UserAutoComplete from './user-autocomplete';
import UserTable from './user-table';
import { NodeType, TableAction, UserType } from '../../types';

interface Props {
	initialValue?: NodeType;
	editMode?: boolean;
	resetForm?:boolean;
	onChangeForm?:(data:any) => void
}
function BasicInformation({initialValue,editMode,resetForm,onChangeForm }: Props) {
	const [form] = Form.useForm();
	const [formData, setFormData] = useState<NodeType|null>(null);
	const [users, setUsers] = useState<UserType[]>([
		{ code: '1', title: 'کاربر یک', isDefault: false },
		{ code: '2', title: 'کاربر دو', isDefault: true },
		{ code: '3', title: 'کاربر سه',  isDefault: false },
	]);
	// useEffect(()=>{
	// 	if(resetForm){
	// 		form.resetFields();
	// 		setUsers([]);
	// 	}
	// },[resetForm])
	useEffect(() => {
		editMode ? form.setFieldsValue(initialValue) : form.resetFields()
	},[editMode,resetForm]);

	useEffect(()=>{
		const FormValue = {...formData,users};
		onChangeForm(FormValue)
	},[formData,users])
	
	const handleOnChangeTable = (user: UserType, action: TableAction) => {
		switch (action) {
			case TableAction.ISDEFAULT:
				setUsers(users.map(item => ({...item, isDefault: item.code === user.code })))
				break;
			case TableAction.DELETE:
				setUsers(users.filter(item => item.code !== user.code))
				break;
		}
	}
	const onValuesChange = (changedValues: any) => {
			setFormData({ ...form.getFieldsValue(), ...changedValues });
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
               <UserTable initialValue={editMode ? initialValue?.users : users} onHandleUsers={(user,action)=>{ handleOnChangeTable(user,action) }} />
			</Form.Item>
		</Form>
	);
}
export default BasicInformation