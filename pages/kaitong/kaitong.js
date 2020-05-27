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
    btnkg:0,
    id: '',
    datas: '',
    zhanghao: '',
    mima:'',
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
    that.getdata()
    that.getkm()
   
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

  getkm() {
    var that = this
    var id = that.data.id
    console.log(id)
    var data = {
      token: wx.getStorageSync('loginmsg').token,
      id: that.data.id

    }
    var jkurl = app.IPurl + '/api/deal/generate_user'
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
          // wx.showToast({
          //   icon: 'none',
          //   title: '操作成功'
          // })
          that.setData({
            zhanghao: res.data.data.username,
            mima: res.data.data.password
          })
          // setTimeout(function () {
          //   wx.navigateBack()
          // }, 1000)
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
  sub() {
    var that = this
    var id = that.data.id
    console.log(id)
    var data = {
      token: wx.getStorageSync('loginmsg').token,
      com_tenant_code: that.data.datas.com_tenant_code,
      com_tenant_name: that.data.datas.com_tenant_name,
      username: that.data.zhanghao,
      password: that.data.mima,

    }
    var jkurl = app.IPurl + '/api/deal/add'
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
          // setTimeout(function () {
          //   wx.navigateBack()
          // }, 1000)
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
  getdata() {
    var that = this
    var data = {
      token: wx.getStorageSync('loginmsg').token,
      id: that.data.id

    }
    var jkurl= app.IPurl + '/api/dire/zd_dire_show'
      data = {
        token: wx.getStorageSync('loginmsg').token,
        id: that.data.id
      }

   
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
          that.setData({
            datas: res.data.data
          })

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
})