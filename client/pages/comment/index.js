// pages/comment/index.js
var WxParse = require('../wxParse/wxParse.js');
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: [],
    tagList: [],
    commentCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tid = options.id;
    this.onLoadComment(tid);
    this.onLoadTag(tid);
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

  onLoadComment: function (id) {
    var that = this;
    wx.request({
      url: config.service.host + '/comment/top/' + id + '/10', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var article = res.data.data['desc'];
        var articlehtml = WxParse.wxParse('article', 'html', article, that, 5)
        that.setData({
          'commentList': res.data.data,
          'commentCount': res.data.count
        });
        console.log(that.data['commentList'])
        console.log(that.data['commentCount'])
      }
    });
  },

  onLoadTag: function (id) {
    var that = this;
    wx.request({
      url: config.service.host + '/comment/tag/' + id + '/10', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var article = res.data.data['desc'];
        var articlehtml = WxParse.wxParse('article', 'html', article, that, 5)
        that.setData({
          'tagList': res.data.data
        });
        console.log(that.data['tagList'])
      }
    });
  }
})