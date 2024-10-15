import { NodeType } from "./types";

export const deleteNodeFromTree = (nodes: NodeType[], key: string): NodeType[] => {
    return nodes.reduce<NodeType[]>((acc, node) => {
        if (node.key === key) return acc;
        const children = deleteNodeFromTree(node.children || [], key);
        if (children.length > 0 || node.key !== key) {
            acc.push({ ...node, children });
        }
        return acc;
    }, []);
};