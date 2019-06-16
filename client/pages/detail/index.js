// pages/detail/index.js
var WxParse = require('../wxParse/wxParse.js');
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productionSizeDisplay: "none",
    protectDisplay: "none",
    blockDisplay: "none",
    detail_info: {    
    },
    commentList:[],
    tagList:[],
    specifications:[

    ],
    commentCount: 0,
    selectPrice: 0,
    selectSprice: 0,
    totlePrice: 0,
    totleSprice: 0,
    selectIndex: 0,
    selectCount: 1,
    buyBtnType: 1,
    shopCount: 0,
    article: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    var tid = options.id;
    this.onLoadProduction(tid);
    this.onLoadComment(tid);
    this.onLoadTag(tid);
    this.onShopCount(1);
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  
  /**
   * 添加购物车
   */
  onShop: function(event){
    var specifications = event.currentTarget.dataset.specifications;
    var specificationArr = specifications.split(',');
    var guigeArr = new Array(); 
    for (var i = 0; i < specificationArr.length; i++){
      var priceArr = specificationArr[i].split(':');
      guigeArr.push({ 
        name: priceArr[0],
        price: priceArr[1],
        sPrice: priceArr[2],
      })
    }

    this.setData({
      specifications: guigeArr,
      productionSizeDisplay: "block",
      blockDisplay: "block", 
      buyBtnType: 1
    })
  },

  onProtect: function(event) {
    this.setData({
      protectDisplay: "block",
      blockDisplay: "block"
    })
  },

  onBuy: function (event){
    var specifications = event.currentTarget.dataset.specifications;
    var specificationArr = specifications.split(',');
    var guigeArr = new Array();
    for (var i = 0; i < specificationArr.length; i++) {
      var priceArr = specificationArr[i].split(':');
      guigeArr.push({
        name: priceArr[0],
        price: priceArr[1],
        sPrice: priceArr[2],
      })
    }

    this.setData({
      specifications: guigeArr,
      productionSizeDisplay: "block",
      blockDisplay: "block", 
      buyBtnType: 2
    })
  },

  /**
   * 关闭弹层
   */
  onCloseShop: function(){
    this.setData({
      productionSizeDisplay: "none",
      blockDisplay: "none",
      protectDisplay: "none"
    });    
  },

  /**
   * 添加购物车
   */
  onAddShop: function(event){
    this.onCloseShop();
    var productId = event.currentTarget.dataset.productId;
    var that = this;
    var userId = wx.getStorageSync('openId');
    var size = that.data.selectIndex;
    var num = that.data.selectCount;

    wx.request({
      url: config.service.host + '/shop/insertShop/' + userId + '/' + productId + '/' + size + '/' + num, //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data.shopId > 0){
          wx.showToast({
            title: '添加成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          });
          that.onShopCount(userId);
        }
      }
    });
  },

  onProNumJia: function(){
    var count = this.data.selectCount+1;
    var price = this.data.selectPrice;
    var sprice = this.data.selectSprice;
    this.setData({
      totlePrice: price * count,
      totleSprice: sprice * count,
      selectCount: count
    })   
  },

  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '18702905363',
    })
  },

  onProNumChange: function (event) {
    var count = event.detail.value;
    if (count < 1) {
      count = 1;
    }
    var price = this.data.selectPrice;
    var sprice = this.data.selectSprice;
    this.setData({
      totlePrice: price * count,
      totleSprice: sprice * count,
      selectCount: count
    }) 
  },

  onProNumJian: function(){
    var count = this.data.selectCount - 1;
    if(count < 1){
      count = 1;
    }
    var price = this.data.selectPrice;
    var sprice = this.data.selectSprice;
    this.setData({
      totlePrice: price * count,
      totleSprice: sprice * count,
      selectCount: count
    }) 
  },

  onSelectSp: function(event){
    var price = event.currentTarget.dataset.price;
    var sprice = event.currentTarget.dataset.sprice;
    var index = event.currentTarget.dataset.index;
    var count = this.data.selectCount;
    this.setData({
      selectPrice: price,
      selectSprice: sprice,
      totlePrice: price * count,
      totleSprice: sprice * count,      
      selectIndex: index    
    })
  },

  onLoadComment: function (id) {
    var that = this;
    wx.request({
      url: config.service.host + '/comment/top/' + id + '/3', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //var article = res.data.data['desc'];
        //var articlehtml = WxParse.wxParse('article', 'html', article, that, 5)
        that.setData({
          'commentList': res.data.data,
          'commentCount': res.data.count
        });
      }
    });
  },

  onLoadTag: function (id) {
    var that = this;
    wx.request({
      url: config.service.host + '/comment/tag/' + id + '/5', //仅为示例，并非真实的接口地址
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
      }
    });
  },

  onShopCount: function(uid){
    var that = this;
    wx.request({
      url: config.service.host + '/shop/count/' + wx.getStorageSync('openId'), //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          'shopCount': res.data.data
        });
      }
    });
  },

  jumpShop: function(){
    //console.log('heyuhang');
    wx.switchTab({
      url: '/pages/shop/index',
    });
  },

  onNowBuy: function (event){
    var that = this;
    var productId = event.currentTarget.dataset.productId;
    var userId = wx.getStorageSync('openId');
    var size = that.data.selectIndex;
    var num = that.data.selectCount;
    wx.request({
      url: config.service.host + '/shop/insertShop/' + userId + '/' + productId + '/' + size + '/' + num, //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.shopId > 0) {
          wx.showToast({
            title: '添加成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          });
          that.onShopCount(userId);
          wx.navigateTo({
            url: '/pages/order/index?shopId=' + res.data.shopId,
            success: function () {

            }
          });
        }
      }
    });
  },

  onLoadProduction: function(id){
    var that = this;
    wx.request({
      url: config.service.host + '/production/detail/'+id, //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var article = res.data.data['desc'];
        console.log("heyuhang"+article);
        var articlehtml = WxParse.wxParse('desc', 'html', article, that, 5)
        that.setData({
          'detail_info': res.data.data,
          'selectPrice': res.data.data['price'],
          'selectSprice': res.data.data['source_price'],
          'totlePrice': res.data.data['price'],
          'totleSprice': res.data.data['source_price'],
          'selectCount': 1,
          'article': articlehtml
        });
      }
    });    
  }
})