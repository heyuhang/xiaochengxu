// pages/order/index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    let shopId = options.shopId;
    if (proId > 0){
      //立刻购买
      this.onOrderDetailByShopId(shopId);
    }else{
      this.onOrderDetail(1);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onOrderDetail(1);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log("heyuhang");
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: 'xx小程序',
      path: 'pages/index/index',
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },

  onOrderDetailByShopId: function(shopId){
    var that = this;

    wx.request({
      url: config.service.host + '/shop/getShopDetailById/' + wx.getStorageSync('openId') + '/' + proId, //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          'orderDetail': res.data.data
        });
      }
    });
  },

  onOrderDetail: function(uid) {
    var that = this;

    wx.request({
      url: config.service.host + '/shop/getShopDetail/' + wx.getStorageSync('openId'), //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        that.setData({
          'orderDetail': res.data.data
        });
      }
    });
  },

  onOrder: function() {
    let openId = wx.getStorageSync('openId')
    wx.request({
      url: config.service.host + '/shop/insertShop/' + openId + '/' + productId + '/' + size + '/' + num, //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data.count > 0) {
          wx.navigateTo({
            url: '/pages/order/index?shopId=1',
          })
        }
      }
    });
  },

  onSumit: function(){
    var that = this;
    var openId = wx.getStorageSync('openId');
    var orderDetail = this.data.orderDetail;
    var content = "";
    for (let index in orderDetail.detail){
      content += (orderDetail.detail[index].shopId + "-");
    }
    if (content.length > 0){
      content = content.substring(0, content.length-1);
    }
    var price = orderDetail.totlePrice;
    wx.request({
      url: config.service.host + '/order/sumbit/' + openId + '/' + content + '/' + price, //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.data > 0) {
          wx.showToast({
            title: '提交成功',
            icon: 'succes',
            duration: 1000,
            mask: true,
          });
          wx.switchTab({
            url: '/pages/my/index'
          })
        }
      }
    });
  },

  onReturn: function() {
    wx.navigateBack({
      delta: 1
    });
  }
})