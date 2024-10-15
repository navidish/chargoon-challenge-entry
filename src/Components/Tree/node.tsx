import React from 'react';
import { NodeType,MenuAction } from '../../types';
import {ContextMenuTriggerEx, ContextMenuItemEx, ContextMenuEx } from '../ContextMenu';

interface Props {
	node: NodeType;
	handleContextMenuClick: (key: number,node:NodeType) => void;
}

function Node({node, handleContextMenuClick}: Props) {
	return (
    <div>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
			<ContextMenuTriggerEx
        id={node.key}
        title={node.title}
       />
         
      <ContextMenuEx  id={node.key}>
        <ContextMenuItemEx disabled={false} handleClick={() => handleContextMenuClick(MenuAction.ADD,node)} title={'افزودن زیرشاخه'}/>
        <ContextMenuItemEx disabled={node?.children?.length > 0} handleClick={() => handleContextMenuClick(MenuAction.CUT,node)} title={'برش'}/>
        <ContextMenuItemEx disabled={false} handleClick={() => handleContextMenuClick(MenuAction.PASTE,node)} title={'چسباندن'}/>
        <ContextMenuItemEx disabled={false} handleClick={() => handleContextMenuClick(MenuAction.DELETE,node)} title={'حذف'}/>
      </ContextMenuEx>
 
    </div>
  );
}
export default Node