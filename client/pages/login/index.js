// pages/login/index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  onJumpIndex: function () {
    wx.switchTab({
      url: '/pages/list/index'
    });
  },

  userLogin: function(){
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
                that.userInfoSetInSQL(e.detail.userInfo, json.openid)
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

  userInfoSetInSQL: function (userInfo, openId){
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
            wx.switchTab({
              url: '/pages/shop/index'
            });
          }
        })
      }
    });
  },

  onLoginReq: function(){
    util.showBusy('正在登录')
    var that = this;
    var openid = '';
    qcloud.setLoginUrl(config.service.host + '/login');
    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          console.log(result);
          wx.setStorageSync('openId', result.openId);
          console.log("heyuhang=" + result.openId);
          console.log('openid1:' + result.openId);
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              console.log(result.data.data.openId);
              util.showSuccess('登录成功');
              wx.setStorageSync('openId', result.data.data.openId);
              wx.switchTab({
                url: '/pages/shop/index'
              });
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
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