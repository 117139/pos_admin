// pages/gd_upimg/gd_upimg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_type:0,
    imgb: [],
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
  ss_type: function (e) {
    var that = this
    if (that.data.s_type == e.currentTarget.dataset.type) return
    console.log(e.currentTarget.dataset.type)
    that.setData({
      s_type: e.currentTarget.dataset.type
    })
  },
  imgdel(e) {
    var that = this
    console.log(e.currentTarget.dataset.idx)
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.data.imgb.splice(e.currentTarget.dataset.idx, 1)
          that.setData({
            imgb: that.data.imgb
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  scpic() {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        const tempFilePaths = res.tempFilePaths

        const imglen = that.data.imgb.length
        that.upimg(tempFilePaths, 0)

      }
    })
  },
  upimg(imgs, i) {
    var that = this
    const imglen = that.data.imgb.length
    var newlen = Number(imglen) + Number(i)
    if (imglen == 9) {
      wx.showToast({
        icon: 'none',
        title: '最多可上传九张'
      })
      return
    }
    var newdata = that.data.imgb
    console.log(i)
    newdata.push(imgs[i])
    that.setData({
      imgb: newdata
    })
    var news1 = that.data.imgb.length
    if (news1 < 9 && i < imgs.length - 1) {
      i++
      that.upimg(imgs, i)
    }
    return
    // console.log(img1)
    wx.uploadFile({
      url: app.IPurl, //仅为示例，非真实的接口地址
      filePath: imgs[i],
      name: 'upfile',
      formData: {
        'apipage': 'uppic',
      },
      success(res) {
        // console.log(res.data)
        var ndata = JSON.parse(res.data)
        if (ndata.error == 0) {
          console.log(imgs[i], i, ndata.url)
          var newdata = that.data.imgb
          console.log(i)
          newdata.push(ndata.url)
          that.setData({
            imgb: newdata
          })
          // i++
          // that.upimg(imgs, i)
          var news1 = that.data.imgb.length
          if (news1 < 9) {
            i++
            that.upimg(imgs, i)
          }
        } else {
          wx.showToast({
            icon: "none",
            title: "上传失败"
          })
        }
      }
    })
  },
})