// pages/list/index.js
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    home_pics: [
    ],
    menu_list: [
      {
        menu_img: "/resources/images/menu01.jpg",
        menu_text: "吊灯"
      },
      {
        menu_img: "/resources/images/menu02.jpeg",
        menu_text: "台灯"
      },
      {
        menu_img: "/resources/images/menu03.jpeg",
        menu_text: "吸顶灯"
      },
      {
        menu_img: "/resources/images/menu04.jpeg",
        menu_text: "落地灯"
      },
      {
        menu_img: "/resources/images/menu05.jpeg",
        menu_text: "壁灯"
      },
      {
        menu_img: "/resources/images/menu06.jpeg",
        menu_text: "风扇灯"
      },
      {
        menu_img: "/resources/images/menu07.jpeg",
        menu_text: "光源"
      },
      {
        menu_img: "/resources/images/menu08.jpg",
        menu_text: "全部"
      }
    ],
    light_list: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ 
      title: "加载中...",
      mask: true
    });
    this.onLightList(); 
    this.onAd();
    this.onSortList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
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
    this.onLightList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  onSearch: function() {
    wx.navigateTo({
      url:'/pages/search/index',
      success:function() { }
    })   
  },

  onAd: function(){
    var that = this;
    wx.request({
      url: config.service.host + '/ad/adlist', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {   
        that.setData({
          'home_pics': res.data.data
        });
        console.log(that.data['home_pics']) 
      }
    });
  },

  onSortList: function() {
    var that = this;
    wx.request({
      url: config.service.host + '/sort/sortList/0/8', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          'menu_list': res.data.data
        });
        console.log(that.data['menu_list'])
      }
    });
  },

  onLightList: function () {
    var that = this;
    wx.request({
      url: config.service.host + '/production/index', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          'light_list': res.data.data
        });
        console.log(that.data['light_list']);
      }
    });
  },

  onAdRedirect: function(event){
    var type = event.currentTarget.dataset.urlType;
    if (type == 1) {
      wx.navigateTo({
        url: '/pages/ad/index?url=' + event.currentTarget.dataset.adUrl
      })
    }else{
      wx.navigateTo({
        url: '/pages/detail/index?id=' + event.currentTarget.dataset.adUrl
      })
    }
  }
})