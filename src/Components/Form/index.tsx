import { Tabs } from 'antd';
import ErrorBoundry from '../../ErrorBoundry';
import ActionBar from '../ActionBar';
import Accesses from './accesses';
import BasicInformation from './basic-information';
import { NodeType } from '../../types';

interface Props {
	item: NodeType;
	editMode: boolean;
	updateNode: (key: string, data: any) => void
}

function Form({ item, updateNode , editMode }: Props) {

	const handleSave = () => {
		updateNode('key', {})
	}

	return (
		<div className='detail'>
			<div>
				<Tabs >
					<Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
						<div className='form-content'>
							<BasicInformation initialValue={editMode && item} editMode={editMode}/>
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab="دسترسی ها" key="item-2">
						<div className='form-content'>
							<ErrorBoundry>
								<Accesses initialValue={item} />
							</ErrorBoundry>
						</div>
					</Tabs.TabPane>
				</Tabs>
			</div>
			<ActionBar actions={[]} />
		</div>
	);
}
export default Form