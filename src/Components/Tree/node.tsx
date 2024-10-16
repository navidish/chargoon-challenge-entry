import React from 'react';
import { NodeType,MenuAction } from '../../types';
import {ContextMenuTriggerEx, ContextMenuItemEx, ContextMenuEx } from '../ContextMenu';

interface Props {
	node: NodeType;
	handleContextMenuClick: (event:React.MouseEvent, key: number, node: NodeType) => void;
  handleItemClick: (node: NodeType) => void;
}

function Node({node, handleContextMenuClick,handleItemClick}: Props) {
	return (
    <div onClick={() => handleItemClick(node)}>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
			<ContextMenuTriggerEx
        id={node.key}
        title={node.title}
       />
         
      <ContextMenuEx  id={node.key}>
        <ContextMenuItemEx disabled={false} handleClick={(event:React.MouseEvent) => handleContextMenuClick(event,MenuAction.ADD,node)} title={'افزودن زیرشاخه'}/>
        <ContextMenuItemEx disabled={node?.children?.length > 0} handleClick={(event:React.MouseEvent) => handleContextMenuClick(event,MenuAction.CUT,node)} title={'برش'}/>
        <ContextMenuItemEx disabled={false} handleClick={(event:React.MouseEvent) => handleContextMenuClick(event,MenuAction.PASTE,node)} title={'چسباندن'}/>
        <ContextMenuItemEx disabled={false} handleClick={(event:React.MouseEvent) => handleContextMenuClick(event,MenuAction.DELETE,node)} title={'حذف'}/>
      </ContextMenuEx>
 
    </div>
  );
}
export default Node