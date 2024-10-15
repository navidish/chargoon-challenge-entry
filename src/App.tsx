import { useEffect, useContext, useState, useMemo, Children } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from './Components/Tree'
import { getNodes } from "./transportLayer";
import { NodeType,MenuAction } from "./types";
import { notification } from "antd";
import { ArgsProps, IconType } from "antd/lib/notification";
import { deleteNodeFromTree } from "./utils";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEdit, setShowEdit] = useState(true);
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

  const handleContextMenuClick = (actionKey: number, node: NodeType) => {
    switch (actionKey) {
      case MenuAction.ADD:
        break;
      case MenuAction.CUT:
        break;
      case MenuAction.PASTE:
        break;
      case MenuAction.DELETE:
          handleDeleteNode(node)
          break;
    }
  }

  const handleDeleteNode = (deletedNode: NodeType) => {
    if(deletedNode.children.length > 0 ){
      openNotification({message:'حذف',description:'به‌دلیل داشتن زیرمجموعه نمی‌توان این آیتم را حذف کرد.'},'error')
    } else {
      setTreeData(deleteNodeFromTree(treeData,deletedNode.key));
      openNotification({message:'حذف',description:'آیتم موردنظر حذف شد.'},'success');
    }
  };
  const handleUpdateTree = (nodes: NodeType[]) => {
    setTreeData(nodes);
  }

  const handleUpdateNode = (key: string, data: any) => {

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
          <ExtendedTree handleContextMenuClick={handleContextMenuClick} />
        </Sidebar>
        {showEdit && <Form item={selectedItem} updateNode={handleUpdateNode} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
