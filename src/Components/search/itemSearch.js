import React from 'react';
import { Card } from 'antd';
import TextTruncate from 'react-text-truncate';
import { connect } from 'react-redux';

const { Meta } = Card;

const mapDispatchToProps = dispatch => {
  return {
    onItemGiphyClick: item =>
      dispatch({
        type: 'click_item',
        payload: item
      })
  };
};

function SearchItem(props) {
  return (
    <Card
      onClick={() => {
        props.onItemGiphyClick(props.item);
      }}
      hoverable
      cover={
        <div>
          <img
            src={props.item.images.original.url}
            style={{ height: '300px', width: '300px', paddingTop: '16px' }}
          />
        </div>
      }
    >
      <Meta
        title={props.item.title}
        description={
          <TextTruncate
            line={2}
            truncateText="…"
          />
        }
      />
    </Card>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(SearchItem);
