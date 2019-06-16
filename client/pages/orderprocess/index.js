// pages/orderprocess/index.js
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    var type = options.type;
    this.onLoadOrderList(type);
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
    //this.onLoadOrderList(1);
  },

  onLoadOrderList: function(state) {
    let openId = wx.getStorageSync('openId')
    var that = this;
    wx.request({
      url: config.service.host + '/order/orderList/' + openId + "/" + state,
      data: {},
      success: function(res) {
        that.setData({
          'orderList': res.data.data,
        });
      }
    })
  },

  onDelOrder: function (event) {
    var id = event.currentTarget.dataset.id;
    var state = event.currentTarget.dataset.state;
    console.log(id)
    let openId = wx.getStorageSync('openId')
    var that = this;
    wx.request({
      url: config.service.host + '/order/del/' + openId + "/" + id,
      data: {},
      success: function (res) {
        if(res.data.data>0){
          wx.showToast({
            title: '删除成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          });
          that.onLoadOrderList(state);
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  onIndex: function (e) {
    console.log("heyuhang");
    wx.switchTab({
      url: '/pages/my/index'
    })
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

  }
})