import { NodeType } from './types';

export const deleteNodeFromTree = (
  nodes: NodeType[],
  key: string
): NodeType[] => {
  return nodes.reduce<NodeType[]>((acc, node) => {
    if (node.key === key) return acc;
    const children = deleteNodeFromTree(node.children || [], key);
    if (children.length > 0 || node.key !== key) {
      acc.push({ ...node, children });
    }
    return acc;
  }, []);
};

export const addNodeToParent = (
  nodes: NodeType[],
  newNode: NodeType,
  parentKey: string
): NodeType[] => {
  return nodes.map((node) => {
    if (node.key === parentKey) {
      const updatedNewNode = { ...newNode, parentKey: parentKey };
      return {
        ...node,
        children: [...(node.children || []), updatedNewNode],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: addNodeToParent(node.children, newNode, parentKey),
      };
    }
    return node;
  });
};

export const ConvertTreeToFlat = (items: NodeType[]) => {
  return items?.reduce((accumulator, item) => {
    accumulator?.push(item);

    if (item['children']) {
      accumulator = accumulator.concat(ConvertTreeToFlat(item['children']));
      return accumulator;
    }
  }, []);
};
