function identityFilter(pageObj) {
  if (pageObj.onShow) {
    let _onShow = pageObj.onShow;
    pageObj.onShow = function () {
      //改动点
      //wx.clearStorageSync('openId');
      let thisOpenId = wx.getStorageSync('openId');
      console.log("thisOpenId=" + thisOpenId);
      console.log(thisOpenId);
      if (thisOpenId) {
        let currentInstance = getPageInstance();
        _onShow.call(currentInstance);
      }else{
        wx.redirectTo({
          url: "/pages/login/index"
        });
      }
    }
  }
  return pageObj;
}

function getPageInstance() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

exports.identityFilter = identityFilter;