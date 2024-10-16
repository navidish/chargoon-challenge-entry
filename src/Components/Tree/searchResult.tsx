import React from 'react';
import { NodeType } from '../../types';
import ArrowUpIcon from '../SvgIcons/arrow-up';
import ArrowDownIcon from '../SvgIcons/arrow-down';
interface Props {
  items: (NodeType & { hierarchy: string[] })[];
  searchResultVisible: boolean;
  onToggleSearchResultVisibility: () => void;
}

function SearchResult({
  items,
  searchResultVisible,
  onToggleSearchResultVisibility,
}: Props) {
  return (
    <div
      className="search-result"
      onClick={onToggleSearchResultVisibility}
      style={{
        height: `${searchResultVisible ? '268px' : '68px'}`,
        overflow: 'auto',
        width: '98%',
      }}
    >
      {searchResultVisible ? (
        <div className="iconContainer">
          <div className="arrowIcon">
            <ArrowUpIcon />
          </div>
          {
            items.length > 0  ? items.map((item) => (
              <div className='searchResultItem'>{item.title}</div>
            )) : <h5>نتیجه‌ای برای جستجوی شما وجود نداشت.</h5>
          }
          </div> ) : (
        <div className="iconContainer">
          <div className="arrowIcon">
            <ArrowDownIcon />
          </div>
        </div>
      )}
    </div>
  );
}
export default SearchResult;
