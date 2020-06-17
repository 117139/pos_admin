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
    index_num:'',
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
        indextype:1,
        sftype:1,
        type: '1'
      },
      {
        name: '已巡机',
        img: '/static/images/1_10.jpg',
        url: '/pages/list/list',
        indextype: 1,
        sftype: 1,
        type: '2'
      },
      {
        name: '装机单',
        img: '/static/images/1_13.jpg',
        url: '/pages/list1/list',
        sftype: 1,
        indextype: 2,
        type: '1'
      },
      {
        name: '已装机',
        img: '/static/images/1_14.jpg',
        url: '/pages/list1/list',
        sftype: 1,
        indextype: 2,
        type: '2'
      },
      {
        name: '维护单',
        img: '/static/images/1_17.jpg',
        url: '/pages/list/list',
        sftype: 1,
        indextype: 3,
        type: '1'
      },
      {
        name: '已维护',
        img: '/static/images/1_18.jpg',
        url: '/pages/list/list',
        indextype: 3,
        sftype: 1,
        type: '2'
      },
      {
        name: '换机单',
        img: '/static/images/2_09.jpg',
        url: '/pages/list/list',
        indextype: 4,
        sftype: 1,
        type: '1'
      },
      {
        name: '已换机',
        img: '/static/images/2_10.jpg',
        url: '/pages/list/list',
        sftype: 1,
        indextype: 4,
        type: '2'
      },
      {
        name: '撤机单',
        img: '/static/images/2_13.jpg',
        url: '/pages/list/list',
        indextype: 5,
        sftype: 1,
        type: '1'
      },
      {
        name: '已撤机',
        img: '/static/images/2_14.jpg',
        url: '/pages/list/list',
        indextype: 5,
        sftype: 1,
        type: '2'
      },
      {
        name: '终端交易查询',
        img: '/static/images/2_17.jpg',
        url: '/pages/list_zd/list_zd',
        sftype: 2,
        type: '111'
      },
      {
        name: '应收列表',
        img: '/static/images/2_18.jpg',
        url: '/pages/list2/list',
        indextype: 6,
        sftype: 1,
        type: '2'
      },
      
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    h_type:1
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
    var that =this
    if (wx.getStorageSync('user_type')){
      this.setData({
        h_type: wx.getStorageSync('user_type')
      })
    }
    setTimeout(function (){
      that.getdata()
    },1000)
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
    // this.getdata()
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
    if (!wx.getStorageSync('userInfo')) {
     
      return
    }
    if (wx.getStorageSync('loginmsg').type == 0) {
      
      return
    }
    ///api/homeIndex
    var that = this
    
    wx.request({
      url: app.IPurl + '/api/index/index',
      data: {
        token: wx.getStorageSync('loginmsg').token,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'post',
      success(res) {
        // 停止下拉动作
        wx.stopPullDownRefresh();
        
        console.log(res.data)
        if (res.data.code == 1) {  //数据为空
          var index_li=that.data.index_li
          var inums = res.data.data
          index_li[0].inum = inums.wait_pat_app
          index_li[2].inum = inums.wait_dis_app
          index_li[4].inum = inums.wait_mai_app
          index_li[6].inum = inums.wait_cha_h_app
          index_li[8].inum = inums.wait_cha_c_app
          that.setData({
            index_li: index_li
          })
        } else {
          
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