import React from 'react';
import { List } from 'antd';
import GiphyItem from './itemGiphy';

function ListGiphy(props) {
  return (
    <div style={{ minHeight: '300px' }}>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={props.items}
        renderItem={item => (
          <List.Item>
            <GiphyItem item={item} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default ListGiphy;
