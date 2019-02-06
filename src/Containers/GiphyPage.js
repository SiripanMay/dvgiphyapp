import React, { Component } from 'react';
import { Spin, Pagination } from 'antd';
import ListGiphy from '../Components/giphy/listGiphy';

class GiphyPage extends Component {
  state = {
    items: [],
    page: 1,
    perPage: 40,
    isLoading: true,
    total:[]
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const offset = (this.state.page - 1) * 40
    this.setState({ isLoading: true });
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=hMms1qM2oT2R0Usd2BywMpguqPdb4wwm&limit=40&offset=${offset}&rating=G`)
      .then(response => response.json())
      .then(items => this.setState({ items:items.data, 
        total:items.pagination.total_count, 
        isLoading: false }));
  };

  onSelectPage = (page, pageSize) => {
    this.setState({ page, perPage: pageSize }, () => {
      this.loadData();
    });
  };

  render() {
    
    return (
      
      <div
        style={{
          padding: '16px',
          marginTop: 64,
          minHeight: '600px',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex'
        }}
      >

        {!this.state.isLoading ? (
          <div>
            <ListGiphy items={this.state.items} />
            <br />
            <Pagination
              total={400}
              pageSize={40}
              defaultCurrent={this.state.page}
              onChange={this.onSelectPage}
            />
          </div>
        ) : (
          <Spin size="large" />
        )}
        
      </div>
      
    );
  }
}

export default GiphyPage;
