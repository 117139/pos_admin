// pages/list/list.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    indextype:'',
    page: 1,
    size:20,
    data_list: [1, 1, 1, 1],
    search: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(that.options)
    if (options.indextype){
      that.setData({
        indextype: options.indextype
      })
    }
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
    this.retry()
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
    this.retry()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getdata_lsit()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  sub_ss(e) {
    console.log(e.detail.value)
    this.setData({
      search: e.detail.value
    })
    this.retry()
  },
  retry(){
    this.setData({
      page:1,
      data_list:[]
    })
    this.getdata_lsit()
  },
  getdata_lsit(){
    let that = this
    const htmlStatus1 = htmlStatus.default(that)
    var  data = {
      token: wx.getStorageSync('loginmsg').token,
      page: that.data.page,
      search: that.data.search,
    }
    var jkurl = app.IPurl + '/api/app_deal/index'
   
    // return
    wx.request({
      url: jkurl,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          console.log('获取成功')
          var resultd = res.data.data.data
          if (resultd.length == 0) {  //数据为空
            console.log('获取为空')
            if (that.data.page == 1) {      //第一次加载
              htmlStatus1.dataNull()    // 切换为空数据状态
            } else {
              wx.showToast({
                icon: 'none',
                title: '暂无更多数据'
              })
            }

          }
          if (that.data.page == 1) {
            that.data.data_list = resultd
            that.setData({
              data_list: resultd
            })
          } else {
            that.data.data_list = that.data.data_list.concat(resultd)

            that.setData({
              data_list: that.data.data_list
            })
          }
          htmlStatus1.finish()
        } else {
          if (res.data.msg) {
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '加载失败'
            })
          }
        }

      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '登录失败'
        })
      }
    })
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
    if (that.data.type == 111) {
      wx.navigateTo({
        url: '/pages/caiwu/caiwu?id=' + e.currentTarget.dataset.id,
      })
      return
    }
    console.log(e.currentTarget.dataset.type)
   
      app.jump(e)
    
  }
})