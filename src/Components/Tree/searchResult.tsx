import React from 'react';
import { NodeType } from '../../types';
import ArrowUpIcon from '../SvgIcons/arrow-up';
import ArrowDownIcon from '../SvgIcons/arrow-down';
interface Props {
  items: (NodeType & { hierarchy: string[] })[];
  searchResultVisible: boolean;
  toggleSearchResultVisibility: () => void;
}

function SearchResult({
  items,
  searchResultVisible,
  toggleSearchResultVisibility,
}: Props) {
  console.log('searchResultVisible', searchResultVisible);
  return (
    <div
      className="search-result"
      onClick={toggleSearchResultVisibility}
      style={{
        height: `${searchResultVisible ? '200px' : '50px'}`,
        overflow: 'auto',
        width: '98%',
      }}
    >
      {searchResultVisible ? (
        <div className="iconContainer">
          <div className="arrowIcon">
            <ArrowUpIcon />
          </div>
        </div>
      ) : (
        <div className="iconContainer">
          <div className="arrowIcon">
            <ArrowDownIcon />
          </div>
        </div>
      )}

      {items.map((item) => (
        <div>{item.title}</div>
      ))}
    </div>
  );
}
export default SearchResult;
