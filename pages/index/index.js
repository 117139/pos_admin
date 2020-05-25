// pages/index/index.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: '',
    homeSeek: '',
    homeTeacher: '',
    homeVideo: '',
    index_li:[
      // {
      //   name: '未达标商户',
      //   img: '/static/images/1_03.jpg',
      //   url: '/pages/list/list',
      //   type: '1'
      // },
      // {
      //   name: '达标商户',
      //   img: '/static/images/1_05.jpg',
      //   url: '/pages/list/list',
      //   type: '2'
      // },
      {
        name: '巡机单',
        img: '/static/images/1_09.jpg',
        url: '/pages/list/list',
        type: '2'
      },
      {
        name: '已巡机',
        img: '/static/images/1_10.jpg',
        url: '/pages/list/list',
        type: '3'
      },
      {
        name: '装机单',
        img: '/static/images/1_13.jpg',
        url: '/pages/list/list',
        type: '4'
      },
      {
        name: '已装机',
        img: '/static/images/1_14.jpg',
        url: '/pages/list/list',
        type: '5'
      },
      {
        name: '维护单',
        img: '/static/images/1_17.jpg',
        url: '/pages/list/list',
        type: '6'
      },
      {
        name: '已维护',
        img: '/static/images/1_18.jpg',
        url: '/pages/list/list',
        type: '7'
      },
      {
        name: '换机单',
        img: '/static/images/2_09.jpg',
        url: '/pages/list/list',
        type: '8'
      },
      {
        name: '已换机',
        img: '/static/images/2_10.jpg',
        url: '/pages/list/list',
        type: '9'
      },
      {
        name: '撤机单',
        img: '/static/images/2_13.jpg',
        url: '/pages/list/list',
        type: '10'
      },
      {
        name: '已撤机',
        img: '/static/images/2_14.jpg',
        url: '/pages/list/list',
        type: '11'
      },
      {
        name: '终端交易查询',
        img: '/static/images/2_17.jpg',
        url: '/pages/list/list',
        type: '12'
      },
      {
        name: '应收列表',
        img: '/static/images/2_18.jpg',
        url: '/pages/list/list',
        type: '13'
      },
      
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    // that.getdata()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
	retry() {
    this.getdata()
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
    this.getdata()
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
  getdata(){
    ///api/homeIndex
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl + '/api/homeIndex',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        // 停止下拉动作
        wx.stopPullDownRefresh();
        htmlStatus1.finish()
        console.log(res.data)
        if (res.data.code == 1) {  //数据为空

          that.setData({
            banner: res.data.data.homeBanner,
            homeSeek: res.data.data.homeSeek,
            homeTeacher: res.data.data.homeTeacher,
            homeVideo: res.data.data.homeVideo,
          })
        } else {
          htmlStatus1.error()
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })

        }
      },
      fail() {
        // 停止下拉动作
        wx.stopPullDownRefresh();
        htmlStatus1.error()
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })

      },
      complete() {
        // // 停止下拉动作
        // wx.stopPullDownRefresh();
      }
    })
  },
  jump(e){
    console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type==2){
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    } else {
      app.jump(e)
    }
  },
	kffuc(e){
		console.log(e)
	}
})