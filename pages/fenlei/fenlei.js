// pages/fenlei/fenlei.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_li: [
      {
        name: '开通商户账号',
        img: '/static/images/3_03.jpg',
        url: '/pages/list/list?type=200',
        sftype: 1,
        type: '2'
      },
      {
        name: '坐标手机',
        img: '/static/images/3_05.jpg',
        url: '/pages/list/list?type=201',
        sftype: 1,
        type: '2'
      },
      {
        name: '查看商户详情',
        img: '/static/images/3_09.jpg',
        url: '/pages/list/list',
        sftype: 1,
        type: '2'
      },
      // {
      //   name: '杉众耗材配送',
      //   img: '/static/images/3_10.jpg',
      //   url: '/pages/list/list',
      //   type: '2'
      // },
      {
        name: '修改商户信息',
        img: '/static/images/3_13.jpg',
        url: '/pages/list/list?type=204',
        sftype: 1,
        type: '2'
      },
      {
        name: '新增维护单',
        img: '/static/images/3_14.jpg',
        url: '/pages/list_new/list_new',
        sftype: 1,
        type: '2'
      },
      {
        name: '切换账号',
        img: '/static/images/3_17.jpg',
        url: '/pages/login_tel/login_tel',
        sftype: 2,
        type: '2'
      }

    ],
    fl_cur:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('user_type')) {
      this.setData({
        h_type: wx.getStorageSync('user_type')
      })
    }
  },
  retry() { 
    this.setData({
      page: 1
    })
    this.getdata()
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
    console.log('下拉')
    wx.stopPullDownRefresh();
    this.retry()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底')
    this.getdata()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getdata() {
    return
    ///api/homeIndex
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl + '/api/busList',
      data: {
        cate_id: that.data.catid,
        page:that.data.page,
      },
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
          if (that.data.page==1){
          that.setData({
            cate: res.data.data.cate,
            BusinessModel: res.data.data.BusinessModel.data
          })
        }else{
          that.data.BusinessModel = that.data.BusinessModel.concat(res.data.data.BusinessModel.data)
          that.setData({
            BusinessModel: res.data.data.BusinessModel.data
          })
        }
        if (res.data.data.BusinessModel.data.length>0){
          that.data.page++
          that.setData({
            page:that.data.page
          })
        }else{
          if(that.data.page>1){
            wx.showToast({
              icon:'none',
              title: '到底了...',
            })
          } else {
            htmlStatus1.dataNull()    // 切换为空数据状态
          }
        }

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
  qhcur(e){
    console.log(e.currentTarget.dataset.idx)
    var that =this
    that.setData({
      fl_cur: e.currentTarget.dataset.idx,
      catid: e.currentTarget.dataset.id
    })
    that.retry()
  },
  jump(e) {
    app.jump(e)
  },
})