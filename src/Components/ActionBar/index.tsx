import { Button } from 'antd';
import React from 'react';
interface ActionType {
	title: string;
	handler: () => void;
}

interface Props {
	actions: ActionType[];
}

function ActionBar({ actions }: Props) {
	return <div className='actionbar' >
	  <Button type="primary" onClick={actions[0].handler}>{actions[0].title}</Button>
	</div>;
}
export default ActionBar