// pages/gd_yc/gd_yc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yc_data: [
      {name:12},      
      {name:13},
      {name:142},
      {name:1233},
      {name:15},

    ],
    index: 1,
    jb_data: [
      {name:12},      
      {name:13},
      {name:14},
      {name:15},
      {name:16},

    ],
    index1: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var idx = e.detail.value
    this.setData({
      index: idx,
    })
    // this.getgoods(idx, this.data.fw_data[idx].id)
  },
  bindPicker1Change: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var idx = e.detail.value
    this.setData({
      index1: idx,
    })
    // this.getgoods(idx, this.data.fw_data[idx].id)
  },
  sub(){
    var that =this 
    console.log(that.data.yc_data[that.data.index].name)
    console.log(that.data.jb_data[that.data.index1].name)
    return
    wx.request({
      url: app.IPurl,
      data: {
        apipage: "shop",
        op: "grouplist",
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data.list.length == 0) {  //数据为空
          wx.showToast({
            icon: 'none',
            title: '暂无分类'
          })
        } else if (res.data.list.length > 0) {                           //数据不为空
          var rlist = res.data.list
          that.setData({
            fw_data: rlist
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })
        }
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
      },
      complete() {
        // wx.setNavigationBarTitle({
        //   title: '下单',
        // })
      }
    })
  }
})