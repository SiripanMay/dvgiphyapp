import React, { Component } from 'react';
import ListSearch from '../Components/search/listSearch';
import { Input, Spin, Pagination } from 'antd';

class SearchPage extends Component {
    state = {
        items: [],
        page: 1,
        perPage: 40,
        isLoading: true,
        total: []
    };

    componentDidMount() {
        this.loadSearchData();
    }

    loadSearchData = (value) => {
        const offset = (this.state.page - 1) * 40
        this.setState({ isLoading: true });
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=hMms1qM2oT2R0Usd2BywMpguqPdb4wwm&q=${value}&limit=40&offset=${offset}&rating=G&lang=en`)
            .then(response => response.json())
            .then(items => this.setState({
                items: items.data,
                total: items.pagination.total_count,
                isLoading: false
            }));
    };
    onSelectPage = (page, pageSize) => {
        this.setState({ page, perPage: pageSize }, () => {
            this.loadSearchData();
        });
    };

    render() {
        const Search = Input.Search;
        console.log(this.state.items.length);
        
        return (

            <div
                style={{
                    padding: '16px',
                    marginTop: 64,
                    minHeight: '600px'
                }}
            >

                <Search
                    placeholder="search..."
                    onSearch={value => this.loadSearchData(value)}
                    style={{ width: 200 }}

                />
                <div>
                    {!this.state.isLoading ? (
                        <div>
                            <ListSearch items={this.state.items} />
                            <br />
                            <Pagination
                                total={400}
                                pageSize={40}
                                defaultCurrent={this.state.page}
                                onChange={this.onSelectPage}
                            />
                        </div>
                    ) : (
                            <Spin size="large" style={{ marginTop: '20%' }} />
                        )}
                </div>
            </div>


        );
    }
}

export default SearchPage;
