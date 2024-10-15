import { Button, Input, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import AppContext from '../../appContext';
import { NodeType } from '../../types';
import Node from './node';
import SearchResult from './searchResult';
import { ConvertTreeToFlat } from '../../utils';
import ArrowUpIcon from '../SvgIcons/arrow-up';
import ArrowDownIcon from '../SvgIcons/arrow-down';

const { Search } = Input;

interface Props {
  handleContextMenuClick: (key: number, node: NodeType) => void;
}

const TreeExtended: React.FC<Props> = ({ handleContextMenuClick }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const searchedKeyword = useRef();
  const [searchResultVisible, setSearchResultVisible] = useState(false);
  const { treeData } = useContext(AppContext);
  const [flatData, setFlatData] = useState<NodeType[]>([]);
  const onExpand = (newExpandedKeys: any[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  const [searchValue, setSearchValue] = useState<string>();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (setSearchResultVisible) {
      setFlatData(
        ConvertTreeToFlat(treeData).filter((item: NodeType) =>
          item.title.includes(searchValue)
        )
      );
    }
  }, [searchValue, treeData, searchResultVisible]);

  const handlePressEnter = () => {
    setSearchResultVisible(!searchResultVisible);
  };

  const titleRenderer = (node: NodeType) => {
    return <Node node={node} handleContextMenuClick={handleContextMenuClick} />;
  };
  const toggleSearchResultVisibility = () => {
    setSearchResultVisible((prev) => !prev);
  };
  return (
    <div className="tree-wrap">
      <Search
        style={{ marginBottom: 8 }}
        placeholder="جستجو"
        onChange={handleSearchInputChange}
        onPressEnter={handlePressEnter}
      />

      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        titleRender={titleRenderer}
      />

      <SearchResult
        items={flatData ?? []}
        searchResultVisible={searchResultVisible}
        toggleSearchResultVisibility={toggleSearchResultVisibility}
      />
    </div>
  );
};

export default TreeExtended;
