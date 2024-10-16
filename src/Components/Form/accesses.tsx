import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { getAccessList } from '../../transportLayer';

interface Props {
	initialValue?: any;
	onChangeAccesses?:(access:any)=>void
}

function Accesses({initialValue , onChangeAccesses }: Props) {
	const [options, setOptions] = useState([]);

	const fetchAccessList = async () => {
		const result = await getAccessList();
		setOptions(result);
	}
	useEffect(() => {
		fetchAccessList();
		if (initialValue) {
			onChangeAccesses(initialValue);
		}
	  }, [initialValue]);

	function handleOnChange(checkedValues: any[]) {
		onChangeAccesses(checkedValues);
	}

	return (
		<Checkbox.Group  options={options as any} onChange={handleOnChange} value={initialValue} />
	);
}
export default Accesses