// pages/my/index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userDetail: {},
    orderCount: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onUserInfo: function(token){
    var that = this;
    wx.request({
      url: config.service.host + '/user/info/' + token, //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          'userDetail': res.data.data,
          'userInfo': res.data.data,
          'logged': true
        });
      }
    });
  },
  // 用户登录示例
  userLogin: function () {
    var that = this;
    wx.checkSession({
      success: function () {
        //存在登陆态
        console.log('log')
      },
      fail: function () {
        //不存在登陆态
        that.onLogin()
      }
    })
  },

  onMyaddr: function(){
    let openId = wx.getStorageSync('openId')
    if (openId) {
      wx.navigateTo({
        url: '/pages/address/index',
        success: function () {

        }
      })
    }else{
      wx.showToast({
        title: '请先登陆',//提示文字
        duration: 2000,//显示时长
        mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'success', //图标，支持"success"、"loading"  
        success: function () {
        },//接口调用成功
        fail: function () {
        },  //接口调用失败的回调函数  
        complete: function () {
        } //接口调用结束的回调函数  
      })
    }
  },

  // 用户登录示例
  onLogin: function (e) {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          console.log(res.code);
          wx.request({
            url: config.service.host + '/login/openId/' + res.code,
            data: {
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data.data)
              if (res.data.data) {
                //获取到用户凭证 存儲 3rd_session 
                var json = res.data.data;
                console.log(json)
                wx.setStorageSync("session_key", json.session_key);
                wx.setStorageSync('openId', json.openid);
                if (e.detail.userInfo){
                  that.userInfoSetInSQL(e.detail.userInfo, json.openid)
                }
              } else {

              }
            },
            fail: function (res) {

            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  userInfoSetInSQL: function (userInfo, openId) {
    var that = this;
    wx.getStorage({
      key: 'session_key',
      success: function (res) {
        wx.request({
          url: config.service.host + '/login/userInfo',
          data: {
            openId: openId,
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl
            // gender: userInfo.gender,
            // province: userInfo.province,
            // city: userInfo.city,
            // country: userInfo.country
          },
          success: function (res) {
            util.showSuccess('登录成功');
            that.onUserInfo(openId);
          }
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.onOrderCount()
  },

  onOrderCount: function(){
    let openId = wx.getStorageSync('openId')
    var that = this;
    wx.request({
      url: config.service.host + '/order/orderCount/' + openId,
      data: {
      },
      success: function (res) {
        that.setData({
          'orderCount': res.data.data,
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //this.onOrderCount()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    let openId = wx.getStorageSync('openId');
    console.log('openid1:' + openId);
    if (openId){
      that.onUserInfo(openId);
    }
    this.onOrderCount()
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

  }
})