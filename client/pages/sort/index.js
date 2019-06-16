// pages/sort/index.js
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: '',
    light_list: [
      {
        list_img: "/resources/images/light01.jpg",
        list_info: "北欧玻璃罩实木台灯复古温馨床头灯LED创意生日礼物就把台灯",
        list_price: "145",
        list_size: "100",
        list_tag: "新品",
        id: "1001"
      },
      {
        list_img: "/resources/images/menu08.jpg",
        list_info: "北欧玻璃罩实木台灯复古温馨床头灯LED创意生日礼物就把台灯",
        list_price: "145",
        list_size: "100",
        list_tag: "新品",
        id: "1001"
      },
      {
        list_img: "/resources/images/menu05.jpeg",
        list_info: "北欧玻璃罩实木台灯复古温馨床头灯LED创意生日礼物就把台灯",
        list_price: "145",
        list_size: "100",
        list_tag: "新品",
        id: "1001"
      },
      {
        list_img: "/resources/images/menu04.jpeg",
        list_info: "北欧玻璃罩实木台灯复古温馨床头灯LED创意生日礼物就把台灯",
        list_price: "145",
        list_size: "100",
        list_tag: "新品",
        id: "1001"
      }
    ]  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sort = options.sort;
    var name = options.name;
    this.onSort(sort, name);
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

  onSort: function (sort, name) {
    var that = this;
    wx.request({
      url: config.service.host+'/production/plist/0/' + sort, //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          'light_list': res.data.data,
          'sort': name,
        });
        console.log(that.data['light_list'])
      }
    });
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