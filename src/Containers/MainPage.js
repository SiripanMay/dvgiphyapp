import React, { Component } from 'react';
import { Layout, Menu, Modal, Button, message, Badge, Icon, Spin } from 'antd';
import RouteMenu from './RouteMenu';
import { connect } from 'react-redux';

const { Header, Content, Footer } = Layout;
const menus = ['home', 'favorite', 'profile', 'search'];

const mapStateToProps = state => {
  return {
    isShowDialog: state.isShowDialog,
    itemGiphy: state.itemGiphy
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDismissDialog: () =>
      dispatch({
        type: 'dismiss_dialog'
      }),
    onItemGiphyClick: item =>
      dispatch({
        type: 'click_item',
        payload: item
      })
  };
};

class MainPage extends Component {
  state = {
    items: [],
    currentMenu: menus[0],
    email: '',
    favItems: [],
    cartItems: []
  };

  componentDidMount() {
    const jsonStr = localStorage.getItem('user-data');
    const email = jsonStr && JSON.parse(jsonStr).email;
    const { pathname } = this.props.location;
    var currentMenu = menus[0];
    if (pathname != '/') {
      currentMenu = pathname.replace('/', '');
      if (!menus.includes(currentMenu)) currentMenu = menus[0];
    }
    const jsonFavStr = localStorage.getItem(`list-fav-${email}`);
    if (jsonFavStr) {
      const items = jsonFavStr && JSON.parse(jsonFavStr);
      this.setState({ favItems: items });
    }

    this.setState({ currentMenu, email });
  }

  onMenuClick = e => {
    if (e.key) {
      var path = '/';
      path = `/${e.key}`;
      this.props.history.replace(path);
    }
  };

  onClickFavoriteItem = () => {
    const items = this.state.favItems;
    const itemFav = this.props.itemGiphy;
    const index = items.findIndex(item => {
      return item.title === itemFav.title;
    });
    if (index != -1) {
      items.splice(index, 1);
      localStorage.setItem(
        `list-fav-${this.state.email}`,
        JSON.stringify(items)
      );
      message.success('unfavorite this item successfully', 1, () => {
        this.setState({ favItems: items });
        this.onModalClickCancel();
      });
    } else {
      items.push(itemFav);
      localStorage.setItem(
        `list-fav-${this.state.email}`,
        JSON.stringify(items)
      );
      message.success('Saved your favorite this item', 1, () => {
        this.setState({ favItems: items });
        this.onModalClickCancel();
      });
    }
  };

  onClickLink = () => {
    const itemGiphy = this.props.itemGiphy;
    navigator.clipboard.writeText(itemGiphy.images.original.url)
    message.success(itemGiphy.title + ' Copies', 1);
  }

  onModalClickCancel = () => {
    this.props.onDismissDialog();
  };

  checkItemFavorited = () => {
    const items = this.state.favItems;
    const itemGiphy = this.props.itemGiphy;
    const result = items.find(item => {
      return item.title === itemGiphy.title;
    });
    if (result) {
      return 'primary';
    } else {
      return '';
    }
  };

  render() {
    const itemGiphy = this.props.itemGiphy;
    console.log(this.state.items.length);
    return (
      <div>
        {this.state.items.length <= 0 ? (
          
          <div style={{ height: '100vh' }}>
            {' '}
            <Layout className="layout" style={{ background: 'white' }}>
              <Header
                style={{
                  padding: '0px',
                  position: 'fixed',
                  zIndex: 1,
                  width: '100%'
                }}
              >
                <Menu
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={[this.state.currentMenu]}
                  style={{ lineHeight: '64px', position: 'relative' }}
                  onClick={e => {
                    this.onMenuClick(e);
                  }}
                >
                  <Menu.Item key={menus[0]}>Trending</Menu.Item>
                  <Menu.Item key={menus[1]}>Favorite</Menu.Item>
                  <Menu.Item key={menus[3]}>Search</Menu.Item>
                  <Menu.Item key={menus[2]}>Profile</Menu.Item>
                </Menu>
              </Header>
              <Content>
                <RouteMenu items={this.state.items} />
              </Content>
              <Footer style={{ textAlign: 'center', background: 'white' }}>
                Giphy Application Workshop @ CAMT
            </Footer>
            </Layout>
          </div>
         ) : (
            <Spin size="large" tip="Loading..." />
          )} 

        {itemGiphy != null ? (
          <div>
            <Modal
              width="40%"
              style={{ maxHeight: '70%' }}
              title={itemGiphy.title}
              visible={this.props.isShowDialog}
              onCancel={this.onModalClickCancel}
              footer={[
                <Button
                  key="submit"
                  type={this.checkItemFavorited()}
                  icon="heart"
                  size="large"
                  shape="circle"
                  onClick={this.onClickFavoriteItem}
                />,
                <Button
                  key="submit"
                  type="primary"
                  icon="link"
                  size="large"
                  shape="circle"
                  onClick={this.onClickLink}
                />
              ]}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}
              >
                {itemGiphy.images != null ? (
                  <img src={itemGiphy.images.original.url} style={{ width: '100%' }} />
                ) : (
                    <div></div>
                  )}
              </div>

            </Modal>
          </div>
        ) : (
            <div />
          )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
