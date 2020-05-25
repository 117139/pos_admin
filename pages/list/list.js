// pages/list/list.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    data_list: [1, 1, 1, 1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(that.options)

    if (options.type) {
      that.setData({
        type: that.options.type
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
    wx.stopPullDownRefresh();
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
  jump(e) {
    var that = this

    if (that.data.type == 200) {
      wx.navigateTo({
        url: '/pages/kaitong/kaitong?id=' + e.currentTarget.dataset.id,
      })
      return
    }
    if (that.data.type == 201) {
      wx.navigateTo({
        url: '/pages/zuobiao/zuobiao?id=' + e.currentTarget.dataset.id,
      })
      return
    }
    if (that.data.type == 204) {
      wx.navigateTo({
        url: '/pages/shanghu_set/shanghu_set?id=' + e.currentTarget.dataset.id,
      })
      return
    }
    console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type == 2) {
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    } else {
      app.jump(e)
    }
  }
})