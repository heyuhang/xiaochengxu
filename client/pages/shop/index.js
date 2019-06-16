// pages/shop/index.js
let filter = require('../../utils/filter.js');
var config = require('../../config')
Page(filter.identityFilter({

  /**
   * 页面的初始数据
   */
  data: {
    light_list: [
    ],
    editIndex: 0,
    delBtnWidth: 80,
    totlePrice: 0,
    productionShopDisplay: 'block',
    emptyBthDisplay: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onShop();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onProNumJia: function (event) {
    var index = event.currentTarget.dataset.index;
    var light_list = this.data.light_list;
    var count = parseInt(light_list[index].num) + 1;
    light_list[index].num = count;
    var totlePrice = this.data.totlePrice;
    totlePrice += parseInt(light_list[index].price);
    this.setData({
      light_list: light_list,
      totlePrice: totlePrice
    });
    this.updateNum(light_list[index].id, count);
  },

  updateNum: function(pid, num){
    wx.request({
      url: config.service.host + '/shop/updateNum/' + pid + "/" + num, //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.count == 1) {
          
        }
      }
    });    
  },

  onProNumChange: function (event) {
    var count = event.detail.value;
    var index = event.currentTarget.dataset.index;
    var light_list = this.data.light_list;
    var count2 = parseInt(light_list[index].num);
    if (count < 1) {
      count = 1;
    }
    var totlePrice = this.data.totlePrice;
    totlePrice += light_list[index].price * (count - count2);
    light_list[index].num = count;
    this.setData({
      light_list: light_list,
      totlePrice: totlePrice
    });
    this.updateNum(light_list[index].id, count);
  },

  onProNumJian: function (event) {
    var index = event.currentTarget.dataset.index;
    var light_list = this.data.light_list;
    var count = parseInt(light_list[index].num) - 1;
    var totlePrice = this.data.totlePrice;
    if(count < 1){
      count = 1;
    }else{
      totlePrice -= parseInt(light_list[index].price);
    }
    light_list[index].num = count;
    this.setData({
      light_list: light_list,
      totlePrice: totlePrice
    });
    this.updateNum(light_list[index].id, count);
  },
  
  onDel: function (event) {
    var uid = wx.getStorageSync('openId');
    var productId = event.currentTarget.dataset.productId;
    var that = this;
    wx.request({
      url: config.service.host + '/shop/delUid/' + uid + "/" + productId, //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.count == 1) {
          wx.showToast({
            title: '删除成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          });
          that.onShop();
        }
      }
    });
  },

  onShop: function () {
    var that = this;
    this.setData({
      productionShopDisplay: "block",
      emptyBthDisplay: 'none'
    });
    wx.request({
      url: config.service.host + '/shop/listUid/' + wx.getStorageSync('openId'), //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.data.length == 0) {
          that.setData({
            productionShopDisplay: "none",
            emptyBthDisplay: 'block'
          });
        }else{
          that.setData({
            productionShopDisplay: "block",
            emptyBthDisplay: 'none'
          });
        }
        var totlePrice = 0;
        for (var i = 0; i < res.data.data.length; i++){
          totlePrice += (res.data.data[i].price * res.data.data[i].num);
        }
        that.setData({
          'light_list': res.data.data,
          'totlePrice': totlePrice
        });
      }
    });
  },

  onCloseShop: function () {
    this.setData({
      productionShopDisplay: "none",
      emptyBthDisplay: 'none'
    });
  },

  onIndex: function (e) {
    console.log("heyuhang");
    wx.switchTab({
      url: '/pages/list/index'
    })
  },

  //手指刚放到屏幕触发
  touchS: function (e) {
    console.log("touchS" + e);
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    console.log("touchM:" + e);
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.light_list;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        light_list: list
      });
    }
  },

  touchE: function (e) {
    console.log("touchE" + e);
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.light_list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        light_list: list
      });
    }
  }
}))