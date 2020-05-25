// pages/details/details.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var location = "";
var config = require('../../config.js');
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    uname: '',
    utel:'',
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(that.options)
    if (that.options.id){
      that.setData({
        id: that.options.id
      })
    }
    if (that.options.name) {
      wx.setNavigationBarTitle({
        title: that.options.name,
      })
    }


    
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
    var that = this;

    
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
    wx.stopPullDownRefresh();
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
  jump(e) {
    console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type == 2) {
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    } else {
      app.jump(e)
    }
  },
  call(e){
    app.call(e)
  },
  get_val(e) {
    console.log(e.detail)
    this.setData({
      uname: e.detail.value
    })
  },
  get_val1(e) {
    console.log(e.detail)
    this.setData({
      utel: e.detail.value
    })
  },

  sub(){
    var that =this
    var id = that.data.id
    var uname = that.data.uname
    var utel = that.data.utel
    
    if (!uname) {
      wx.showToast({
        icon: 'none',
        title: '请填写联系人',
      })
      return

    }
    if (utel == '' || !(/^1\d{10}$/.test(utel))) {
      wx.showToast({
        icon: 'none',
        title: '手机号有误'
      })
      return
    }
    console.log(id)
    console.log(uname)
    console.log(utel)
  },
  bindPickerChange1: function (e) {
    console.log(e.currentTarget.dataset.ptype)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var idx = e.detail.value
    if (ptype == 1) {
      this.setData({
        indexp1: idx,
      })
    }
    if (ptype == 2) {
      this.setData({
        indexp2: idx,
      })
    }
    if (ptype == 3) {
      this.setData({
        indexp3: idx,
      })
    }
    if (ptype == 4) {
      this.setData({
        indexp4: idx,
      })
    }
    if (ptype == 5) {
      this.setData({
        indexp5: idx,
      })
    }
    // this.getgoods(idx, this.data.fw_data[idx].id)
  },
})