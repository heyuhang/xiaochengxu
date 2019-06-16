// pages/addcomment/index.js
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {},
    picList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    var orderId = options.id;
    this.onLoadOrderDetail(orderId);
  },

  onLoadOrderDetail: function (id) {
    let openId = wx.getStorageSync('openId')
    var that = this;
    wx.request({
      url: config.service.host + '/order/orderDetail/' + openId + "/" + id,
      data: {},
      success: function (res) {
        that.setData({
          'orderDetail': res.data.data,
        });
      }
    })
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

  chooseImage: function (e) {
    var index = e.currentTarget.dataset.id;
    var that = this;
    if (that.data.picList.length == 2) {
      wx.showModal({
        title: '错误提示',
        content: '最多上传两张',
        showCancel: false,
        success: function (res) { }
      })
      return;
    }
    wx.chooseImage({
      count: 2, //最多可以选择的图片总数  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url: config.service.host + '/image',
            filePath: tempFilePaths[i],
            name: 'uploadfile_ant',
            formData: {
              'imgIndex': i
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              uploadImgCount++;
              var data = JSON.parse(res.data);
              //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
              var picList = that.data.picList;
              if (picList[index] == null) {
                picList[index] = [];
              }
              if (data.code == 0) {
                picList[index].push({
                  "fileName": data.data.key,
                })
                console.log(picList);
                that.setData({
                  picList: picList
                });
              } else {
                wx.hideToast();
                wx.showModal({
                  title: '错误提示',
                  content: '上传图片失败',
                  showCancel: false,
                  success: function (res) { }
                })
              }
              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  onClose: function (event) {
    var index1 = event.currentTarget.dataset.index1;
    var index2 = event.currentTarget.dataset.index1;
    var picList = this.data.picList;
    if (picList[index1].length > index2) {
      picList[index1].splice(index2, 1);
    }
    console.log(picList);
    this.setData({
      picList: picList
    });
  },

  onAddComment: function (openId, content, pics, pid, size, orderId) {
    var that = this;
    wx.request({
      url: config.service.host + '/comment/add', //仅为示例，并非真实的接口地址
      data: {
        token: openId,
        content: content,
        pics: pics,
        proId: pid,
        size: size,
        orderId: orderId,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        res = res.data
        if (res.code == 0) {
          wx.showToast({
            title: ' 保存成功',
            icon: 'success',
            duration: 2000,
            mask: true
          });
        } else if (res.code == 1) {
          wx.showToast({
            title: ' 参数不能为空',
            icon: 'none',
            duration: 2000,
            mask: true
          });
        } else {
          wx.showToast({
            title: ' 保存失败',
            icon: 'none',
            duration: 2000,
            mask: true
          });
        }
      }
    });
  },

  formSubmit: function (e) {
    console.log(e.detail.value)
    var orderDetail = this.data.orderDetail;
    var proList = orderDetail.proList;
    console.log(proList.length);
    for (var i = 0; i < proList.length; i++) {
      var content = e.detail.value['content' + i];
      console.log(content);
      if (content.length <= 10) {
        console.log('heyuhang2')
        wx.showToast({
          title: '第' + (i + 1) + '条内容不能少于10个字符',
          icon: 'none',
          duration: 2000,
          mask: true
        });
        return;
      }
      var pro = this.data.orderDetail.proList[i];
      var pics = "";
      var orderId = this.data.orderDetail.id;
      if (this.data.picList[i]) {
        var picList = this.data.picList[i];
        console.log(picList);
        for (var j = 0; j < picList.length; j++) {
          if(picList[j]){
            pics += picList[j].fileName + ",";
          }
        }
        if (pics.length > 0) {
          pics = pics.substr(0, pics.length - 1);
        }else {
          pics = "0"
        }
      }

      let openId = wx.getStorageSync('openId');
      console.log(orderId)
      this.onAddComment(openId, content, pics, pro.id, pro.size, orderId);
    }
    wx.navigateBack({
      delta: 1
    });
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

  onReturn: function () {
    wx.navigateBack({
      delta: 1
    });
  }
})