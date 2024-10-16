import { useEffect, useContext, useState, useMemo, Children } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from './Components/Tree'
import { getNodes } from "./transportLayer";
import { NodeType,MenuAction } from "./types";
import { notification } from "antd";
import { ArgsProps, IconType } from "antd/lib/notification";
import { addNodeToParent, deleteNodeFromTree } from "./utils";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const fetchTreeData = async () => {
    const result = await getNodes();
    setTreeData(result);
  }

  useEffect(() => {
    fetchTreeData()
  }, [])

  const openNotification = (notifProps: ArgsProps, type: IconType) => {
    api[type]({
      message: notifProps.message,
      description:notifProps.description,
      placement:'top',
      type:notifProps.type
    })
  }

  const handleContextMenuClick = (event:React.MouseEvent,actionKey: number, node: NodeType) => {
    event.stopPropagation();
    switch (actionKey) {
      case MenuAction.ADD:
        handleAddNode(node)
        break;
      case MenuAction.CUT:
        setSelectedItem(node)
        break;
      case MenuAction.PASTE:
        handlePasteNode(node)
        break;
      case MenuAction.DELETE:
          handleDeleteNode(node)
          break;
    }
  }
  const handleAddNode = (targetNode: NodeType) => {
    setShowEdit(false)
    setSelectedItem(targetNode)
  };


  const handleDeleteNode = (deletedNode: NodeType) => {
    if(deletedNode.children.length > 0 ){
      openNotification({message:'حذف',description:'به‌دلیل داشتن زیرمجموعه نمی‌توان این آیتم را حذف کرد.'},'error')
    } else {
      setTreeData(deleteNodeFromTree(treeData,deletedNode.key));
      openNotification({message:'حذف',description:'آیتم موردنظر حذف شد.'},'success');
    }
  };

  const handlePasteNode = (targetNode: NodeType) => {
    if (selectedItem) {
      const filteredTree = deleteNodeFromTree(treeData,selectedItem.key);
      const updatedTree = addNodeToParent(filteredTree, selectedItem, targetNode.key);
      setTreeData(updatedTree);
      setSelectedItem(null);
      openNotification({ message: 'چسباندن', description: 'آیتم با موفقیت چسبانده شد.' }, 'success');
  }};
  
  const handleUpdateTree = (nodes: NodeType[]) => {
    setTreeData(nodes);
  }

  const handleUpdateNode = (key: string, data: any) => {
    if(selectedItem){
      const updatedTree = addNodeToParent(treeData, data, key);
      setTreeData(updatedTree); 
      setShowEdit(false);
      openNotification({ message: 'ایجاد', description: 'آیتم با موفقیت ایجاد شد.' }, 'success');
    }
  }

  const handleItemClick = (node:NodeType) => {
      setSelectedItem(node)
      setShowEdit(true)
  }

  return (
    <AppContext.Provider
      value={{
        treeData,
        updateTreeData: handleUpdateTree
      }}
    >
      <div className="App">
      {contextHolder}
        <Sidebar>
          <ExtendedTree handleContextMenuClick={(e,key,node) => handleContextMenuClick(e,key,node)} handleItemClick={handleItemClick} />
        </Sidebar>
        <Form item={selectedItem} updateNode={handleUpdateNode} editMode={showEdit} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
