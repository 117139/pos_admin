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
    uname: '',
    uphone:'',
    utel:'',
    ubeizhu:'',
    

    cate_data: [],
    index:0,
    pj_data:[],
    hao_data:[],
    whtype: 1,
    zptype:1,
    indexp1: 0,
    indexp2: 0,
    indexp3: 0,
    indexp4: 0,
    indexp5: 0,
    num1: 0,
    num2: 0,
    num3: 0,
    num4: 0,
    num5: 0,
    indexp0:0,
    
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
      uphone: e.detail.value
    })
  },
  get_val2(e) {
    console.log(e.detail)
    this.setData({
      utel: e.detail.value
    })
  },
  get_val3(e) {
    console.log(e.detail)
    this.setData({
      ubeizhu: e.detail.value
    })
  },
  radioChange(e) {
    var type = e.currentTarget.dataset.type
    var val = e.detail.value
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    if (type == 1) {
      this.setData({
        whtype: val
      })
    }
    if (type == 2) {
      this.setData({
        zptype: val
      })
    }
  },
  get_val_li(e) {
    var ptype = e.currentTarget.dataset.ptype
    console.log(e.detail)
    if (ptype == 1) {
      this.setData({
        num1: e.detail.value,
      })
    }
    if (ptype == 2) {
      this.setData({
        num2: e.detail.value,
      })
    }
    if (ptype == 3) {
      this.setData({
        num3: e.detail.value,
      })
    }
    if (ptype == 4) {
      this.setData({
        num4: e.detail.value,
      })
    }
    if (ptype == 5) {
      this.setData({
        num5: e.detail.value,
      })
    }
  },
  bindPickerChange1: function (e) {
    console.log(e.currentTarget.dataset.ptype)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var ptype = e.currentTarget.dataset.ptype
    var idx = e.detail.value
    if (ptype == 0) {
      this.setData({
        indexp0: idx,
      })
    }
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
    if (utel == '') {
      wx.showToast({
        icon: 'none',
        title: '手机不能为空'
      })
      return
    }
    console.log(id)
    console.log(uname)
    console.log(utel)
    var data = {
      token: wx.getStorageSync('loginmsg').token,
      urgent:that.data.whtype,
      who:that.data.zptype,
      type:that.data,
      name: that.data.uname,
      tel: that.data.utel,
      pone: that.data.uphone,
      gong_desc: that.data.ubeizhu,
      pei1: that.data.pj_data.length>0 ? that.data.pj_data[that.data.indexp1].id:'',
      pei2: that.data.pj_data.length > 0 ? that.data.pj_data[that.data.indexp2].id : '',
      hao1: that.data.hao_data.length > 0 ? that.data.hao_data[that.data.indexp3].id : '',
      hao2: that.data.hao_data.length > 0 ? that.data.hao_data[that.data.indexp4].id : '',
      pei_num1: that.data.pj_data.length > 0 ?that.data.num1:'',
      pei_num2: that.data.pj_data.length > 0 ? that.data.num2 : '',
      hao_num1: that.data.hao_data.length > 0 ? that.data.num3 : '',
      hao_num2: that.data.hao_data.length > 0 ? that.data.num4 : '',
      id:that.data.id,
      password: that.data.mima,

    }
    var jkurl = app.IPurl + '/api/dire/wd_dire_save'
    console.log(data)
    // return
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
            wx.navigateBack({
              delta: 2
            })
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
  getdata() {
    var that = this
    var data = {
      token: wx.getStorageSync('loginmsg').token,
      id: that.data.id

    }
    var jkurl = app.IPurl + '/api/dire/wd_dire_edit'
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
            datas: res.data.data,
            cate_data: res.data.cate,
            pj_data: res.data.pei,
            hao_data:res.data.hao
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