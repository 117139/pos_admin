// pages/caiwu/caiwu.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnkg:0,
    id:'',
		type:[],
		tidx:0,
    page:1,
    pagesize:20,
		cw_data:'',
    message:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id:options.id
      })
    }
    this.getOrderList()
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
  retry(){

    
    this.setData({
      pages: 1,
      cw_data: []
    })
    this.getOrderList('onshow')
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
    this.retry()
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
	
  //获取列表
  getOrderList(ttype) {

    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    console.log('获取列表')
    
    wx.request({
      url: app.IPurl +'/api/dire/gathering_show',
      data: {
        token: wx.getStorageSync('loginmsg').token,
        id:that.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'post',
      success(res) {
        if (res.data.code == 1) {   //成功
          let resultd = res.data.data
          
            
           
            that.setData({
              cw_data: resultd,
              message: resultd.message
            })
            
            
            htmlStatus1.finish()    // 切换为finish状态
         
          // console.log(res.data.list)


        } else {  //失败
          if (res.data.msg) {
            wx.showToast({
              icon: 'none',
              title: res.data.returnstr
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '加载失败'
            })
          }
          htmlStatus1.error()    // 切换为error状态
        }
        // 停止下拉动作
        wx.stopPullDownRefresh();
        // htmlStatus1.error()    // 切换为error状态
      },
      fail(err) {
        wx.showToast({
          icon: "none",
          title: "加载失败"
        })

        console.log(err)
        htmlStatus1.error()    // 切换为error状态
      },
      complete() {
        wx.setNavigationBarTitle({
          title: '交易记录'
        })
      }
    })
  },
  sub() {
    var that = this
    var id = that.data.id
    console.log(id)
    var data = {
      token: wx.getStorageSync('loginmsg').token,
      id: that.data.id,

    }
    var jkurl = app.IPurl + '/api/dire/gathering_save'
    if (that.data.btnkg == 0) {
      that.setData({
        btnkg: 1
      })
    } else {
      return
    }
    wx.request({
      url: jkurl,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'post',
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {  //数据为空
          wx.showToast({
            icon: 'none',
            title: '操作成功'
          })
          // that.setData({
          //   zhanghao: res.data.data.username,
          //   mima: res.data.data.password
          // })
          setTimeout(function () {
            wx.navigateBack()
          }, 1000)
        } else {
          if (res.data.msg) {
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })

          } else {
            wx.showToast({
              icon: 'none',
              title: '操作失败'
            })
          }
        }
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '操作失败'
        })
      },
      complete() {
        that.setData({
          btnkg: 0
        })
        // wx.setNavigationBarTitle({
        //   title: '下单',
        // })
      }
    })
  },
})