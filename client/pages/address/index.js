// pages/address/index.js
var city = require('../../utils/city.js')
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [],
    objectMultiArray: [],
    addressDetail: {},
    address: "",
    multiIndex: [26, 0, 11]
  },

  bindchange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },

  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    var locals = []
    var localss = []
    switch (e.detail.column) {
      case 0:
        city.citylist[data.multiIndex[0]].c.forEach((item) => {
          locals.push(item.n)
        })
        if (city.citylist[data.multiIndex[0]].c[0].a) {
          city.citylist[data.multiIndex[0]].c[0].a.forEach((item) => {
            localss.push(item.s)
          })
        }
        data.multiArray[1] = locals;
        data.multiArray[2] = localss
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        if (city.citylist[data.multiIndex[0]].c[data.multiIndex[1]].a) {
          city.citylist[data.multiIndex[0]].c[data.multiIndex[1]].a.forEach((item) => {
            localss.push(item.s)
          })
          data.multiArray[2] = localss
          data.multiIndex[2] = 0;
        } else {
          data.multiArray[2] = []
          data.multiIndex[2] = 0;
        }
        break;
    }
    this.setData(data);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let openId = wx.getStorageSync('openId')
    if (openId){
      this.onAddress(openId);
    }else{
      that.setData({
        'addressDetail': {
          "name": "",
          "local": [
            20,
            0,
            11
          ],
          "phone": "",
          "address": ""
        },
        'multiIndex': [26, 0, 11]
      });
      console.log(that.data.addressDetail);
      that.onInit();
      wx.showToast({
        title: '未登陆',//提示文字
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

  onInit: function() {
    var contrys = []
    var locals = []
    var localss = []
    var multiArray = []
    city.citylist.forEach((item) => {
      contrys.push(item.p)
    })
    city.citylist[this.data.multiIndex[0]].c.forEach((items) => {
      locals.push(items.n)
    })
    city.citylist[this.data.multiIndex[0]].c[this.data.multiIndex[1]].a.forEach((item) => {
      localss.push(item.s)
    })

    multiArray.push(contrys)
    multiArray.push(locals)
    multiArray.push(localss)
    console.log(multiArray);
    this.setData({
      multiArray: multiArray,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  },

  onAddress: function(openId) {
    var that = this;
    wx.request({
      url: config.service.host + '/shop/address/' + openId, //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        var addrs = res.data.data.address.split("-");
        that.setData({
          'addressDetail': res.data.data,
          'address': addrs[addrs.length-1],
          'multiIndex': res.data.data.local
        });
        console.log(that.data.addressDetail);
        that.onInit();
      }
    });
  },

  formSubmit: function(e) {
    console.log(e.detail.value)
    if (e.detail.value.name.length == 0) {
      wx.showToast({
        title: '收件人不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (e.detail.value.mobile.length == 0) {
      wx.showToast({
        title: '电话不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (e.detail.value.local.length == 0) {
      wx.showToast({
        title: '区域不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (e.detail.value.detail.length == 0) {
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else {
      let name = e.detail.value.name
      let mobile = e.detail.value.mobile
      let locals = e.detail.value.local
      let detail = e.detail.value.detail
      let local1 = city.citylist[locals[0]].p
      let local2 = city.citylist[locals[0]].c[locals[1]].n
      let local = local1 + "-" + local2
      let local3 = ''
      if (city.citylist[locals[0]].c[locals[1]].a) {
        local3 = city.citylist[locals[0]].c[locals[1]].a[locals[2]].s
        local += ("-" + local3)
      }

      let localNum = locals[0] + "-" + locals[1]
      if (city.citylist[locals[0]].c[locals[1]].a) {
        localNum += ("-" + locals[2])
      }
      console.log(localNum);
      var that = this;

      let openId = wx.getStorageSync('openId');
      if (openId) {
        detail = local + '-'+ detail;
        //util.showSuccess('登录成功');
        wx.request({
          url: config.service.host + '/user/address/' + openId + '/' + name + '/' + mobile + '/' + localNum + '/' + local + '/' + detail, //仅为示例，并非真实的接口地址
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            res = res.data
            if (res.code == 0) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 1000,
                mask: true
              });
            } else if (res.code == 1) {
              wx.showToast({
                title: ' 参数不能为空',
                icon: 'none',
                duration: 1000,
                mask: true
              });
            } else {
              wx.showToast({
                title: ' 保存失败',
                icon: 'none',
                duration: 1000,
                mask: true
              });
            }
          }
        });
      }else{
        util.showModel('未登陆')
      }
    }
  },

  onReturn: function() {
    wx.navigateBack({
      delta: 1
    });
  }
})