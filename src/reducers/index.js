export default (
  state = {
    itemGiphy: {},
    isShowDialog: false
  },
  action
) => {
  switch (action.type) {
    case 'click_item':
      return {
        isShowDialog: true,
        itemGiphy: action.payload
      };
    case 'dismiss_dialog':
      return {
        isShowDialog: false,
        itemGiphy: {}
      };
    default:
      return state;
  }
};
