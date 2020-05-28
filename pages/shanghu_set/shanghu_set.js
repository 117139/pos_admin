// pages/details/details.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var location = "";
var config = require('../../config.js');
var htmlStatus = require('../../utils/htmlStatus/index.js')
var http = require('../../utils/httputils.js');   //请求
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnkg:0,
    id: '',
    uname: '',
    utel:'',
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (that.options.id) {
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
    that.getdatamsg()

    
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
  getdata() {
    var that = this
    var data = {
      token: wx.getStorageSync('loginmsg').token,
      id: that.data.id

    }
    var jkurl = app.IPurl + '/api/dire/zd_dire_show'
    data = {
      token: wx.getStorageSync('loginmsg').token,
      id: that.data.id
    }
    /*var prams = {
      token: wx.getStorageSync('loginmsg').token,
      id: that.data.id
    }
    http.postRequest("/api/dire/zd_dire_show", prams,
      function (res) {
        if (res.data.code == 1) {
          console.log('获取成功')
          that.setData({
            datas: res.data.data
          })

        } else {
          if (res.data.data.msg) {
            wx.showToast({
              icon: 'none',
              title: res.data.data.msg
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '加载失败'
            })
          }
        }
      },
      function (err) {
        if (err.data.data.msg) {
          wx.showToast({
            icon: 'none',
            title: err.data.data.msg
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })
        }
      })*/
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
          if (res.data.data.msg) {
            wx.showToast({
              icon: 'none',
              title: res.data.data.msg
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
          title: '加载失败'
        })
      }
    })
  },
  getdatamsg() {
    var that = this
    var data = {
      token: wx.getStorageSync('loginmsg').token,
      id: that.data.id

    }
    var jkurl = app.IPurl + '/api/deal/deal_edit'
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
            uname: res.data.data.contacts,
            utel: res.data.data.contacts_phone
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
    var data = {
      token: wx.getStorageSync('loginmsg').token,
      id: id,
      contacts: uname,
      contacts_phone: utel,

    }
    var jkurl = app.IPurl + '/api/deal/update'
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
       
      }
    })
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