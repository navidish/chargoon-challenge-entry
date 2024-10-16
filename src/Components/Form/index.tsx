import { Tabs } from 'antd';
import ErrorBoundry from '../../ErrorBoundry';
import ActionBar from '../ActionBar';
import BasicInformation from './basic-information';
import { NodeType } from '../../types';
import { useEffect, useState } from 'react';
import Accesses from './accesses';

interface Props {
	item: NodeType;
	editMode: boolean;
	updateNode: (key: string, data: any) => void;
}

function Form({ item, updateNode , editMode}: Props) {
	const [FormInputs,setFormInputs] = useState<NodeType>();
	const [accesseList, setAccesses] = useState(item?.accesses);
	const [resetForm, setResetForm] = useState<boolean>(false);
	useEffect(()=>{
		setResetForm(false)
	},[item])
	const handleSave = () => {
		updateNode(item.key, {...FormInputs,accesses:accesseList})
	}

	const handleChangedAccesses=(changedAccesses:string[])=>{
		setAccesses(changedAccesses)
	}

	const handleChangedForm=(formData:NodeType)=>{
		setFormInputs(formData);
		setResetForm(true);
	}

	return (
		<div className='detail'>
			<div>
				<Tabs >
					<Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
						<div className='form-content'>
							<BasicInformation resetForm={resetForm} initialValue={item} editMode={editMode} onChangeForm={handleChangedForm}/>
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab="دسترسی ها" key="item-2">
						<div className='form-content'>
							<ErrorBoundry>
								<Accesses initialValue={ accesseList}  onChangeAccesses={handleChangedAccesses} />
							</ErrorBoundry>
						</div>
					</Tabs.TabPane>
				</Tabs>
			</div>
			<ActionBar actions={[{ title: 'ذخیره', handler: handleSave }]} />
		</div>
	);
}
export default Form