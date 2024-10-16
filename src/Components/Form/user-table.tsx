import { Button, Checkbox, notification, Popover } from 'antd';
import { TableAction, UserType } from '../../types';
interface Props {
	initialValue?: UserType[];
	onHandleUsers: (data:any,action:TableAction) => void
}
const UserTable = ({ initialValue, onHandleUsers }: Props) => {
   
  const handleDelete = (user: UserType) => {
      onHandleUsers(user,TableAction.DELETE);
      notification.success({ message: 'کاربر با موفقیت حذف شد.' });
  };
  const handleCheckboxChange = (user: UserType) => {
    onHandleUsers(user,TableAction.ISDEFAULT);
    // setUserData(userData.map(user => 
    //         ({...user,
    //             isDefault: user.code === code })
    //         ));
};
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>عملیات</th>
            <th>پیشفرض</th>
            <th>نام</th>
          </tr>
        </thead>
        <tbody>
          {initialValue?.map((item) => (
            <tr key={item.code}>
                <td>{ 
                    <Popover content={<div>
                        <Button type="link" onClick={() => handleDelete(item)}>حذف</Button>
                            </div>} trigger="click">
                        <Button type="link">...</Button>
                    </Popover>}
                </td>
          
                <td> {item.title}</td>
                
                <td>
                  { <Checkbox
                    checked={item.isDefault}
                    onChange={() => handleCheckboxChange(item)}/>}
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;