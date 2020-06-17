// pages/gd_upimg/gd_upimg.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnkg:0,
    s_type:0,
    imgb: [],
    imgb1: [],


    pj_data: [],
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
    ck1: 1,
    ck2: 1,
    ck3: 0,
    ck4: 1,
    ck5: 0,
    ck6: 1,
    ck7: 1,
    ck8: 1,
    ck9: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.indextype) {
      that.setData({
        indextype: options.indextype
      })
    }
    that.setData({
      id: options.id
    })
    that.getyc()
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
  imgdel1(e) {
    var that = this
    console.log(e.currentTarget.dataset.idx)
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.data.imgb1.splice(e.currentTarget.dataset.idx, 1)
          that.setData({
            imgb1: that.data.imgb1
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
    // if (imglen == 9) {
    //   wx.showToast({
    //     icon: 'none',
    //     title: '最多可上传九张'
    //   })
    //   return
    // }
    wx.showLoading({
      title: '正在上传',
    })
    // console.log(img1)
    wx.uploadFile({
      url: app.IPurl +'/api/uploads/uploadMore',
      filePath: imgs[i],
      name: 'file',
      formData: {
        'apipage': 'uppic',
      },
      success(res) {
        // console.log(res.data)
        var ndata = JSON.parse(res.data)
        if (ndata.code == 1) {
          console.log(imgs[i], i, ndata.data)
          var newdata
          if (that.data.s_type == 0) {
            newdata = that.data.imgb
          }else{
            newdata = that.data.imgb1
          }
          console.log(i)
          newdata.push(ndata.data)
          if(that.data.s_type==0){
            that.setData({
              imgb: newdata
            })
            var news1 = that.data.imgb.length
            if (news1 < 9) {
              i++
              that.upimg(imgs, i)
            }
          }else{
            that.setData({
              imgb1: newdata
            })
            var news1 = that.data.imgb1.length
            if (news1 < 9) {
              i++
              that.upimg(imgs, i)
            }
          }
         
          // i++
          // that.upimg(imgs, i)
         
        } else {
          wx.showToast({
            icon: "none",
            title: "上传失败"
          })
        }
      },
      complete(){
        wx.hideLoading()
      }
    })
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
  groupchange(e) {
    var that = this
    console.log(e.currentTarget.dataset.type)
    console.log(e.detail.value)
    if (e.currentTarget.dataset.type == 1) {
      that.setData({
        ck1: e.detail.value.length
      })
    }
    if (e.currentTarget.dataset.type == 2) {
      that.setData({
        ck2: e.detail.value.length
      })
    }
    if (e.currentTarget.dataset.type == 3) {
      that.setData({
        ck3: e.detail.value.length
      })
    }
    if (e.currentTarget.dataset.type == 4) {
      that.setData({
        ck4: e.detail.value.length
      })
    }
    if (e.currentTarget.dataset.type == 5) {
      that.setData({
        ck5: e.detail.value.length
      })
    }
    if (e.currentTarget.dataset.type == 6) {
      that.setData({
        ck6: e.detail.value.length
      })
    }
    if (e.currentTarget.dataset.type == 7) {
      that.setData({
        ck7: e.detail.value.length
      })
    }
    if (e.currentTarget.dataset.type == 8) {
      that.setData({
        ck8: e.detail.value.length
      })
    }
    if (e.currentTarget.dataset.type == 9) {
      that.setData({
        ck9: e.detail.value.length
      })
    }
  },
  sub() {
    var that = this
    // console.log(that.data.yc_data[that.data.index].name)
    // console.log(that.data.jb_data[that.data.index1].name)
    var data = {
      token: wx.getStorageSync('loginmsg').token,
      id: that.data.id,
      type: 1,
      menmian: that.data.imgb.join(','),
      xiaopiao: that.data.imgb1.join(','),
      non_1: that.data.pj_data[that.data.indexp1].id,
      non_2: that.data.pj_data[that.data.indexp2].id,
      non_3: that.data.pj_data[that.data.indexp3].id,
      non_4: that.data.pj_data[that.data.indexp4].id,
      non_5: that.data.pj_data[that.data.indexp5].id,
      non_1_num: that.data.num1,
      non_2_num: that.data.num2,
      non_3_num: that.data.num3,
      non_4_num: that.data.num4,
      non_5_num: that.data.num5,
    }
    var jkurl
    if (that.data.indextype == 1) { //巡机单
      jkurl = app.IPurl + '/api/dire/xd_dire_up'
      data = {
        token: wx.getStorageSync('loginmsg').token,
        id: that.data.id,
        type: 1,
        menmian: that.data.imgb,
        xiaopiao: that.data.imgb1,
        non_1: that.data.pj_data[that.data.indexp1].id,
        non_2: that.data.pj_data[that.data.indexp2].id,
        non_3: that.data.pj_data[that.data.indexp3].id,
        non_4: that.data.pj_data[that.data.indexp4].id,
        non_5: that.data.pj_data[that.data.indexp5].id,
        non_1_num: that.data.num1,
        non_2_num: that.data.num2,
        non_3_num: that.data.num3,
        non_4_num: that.data.num4,
        non_5_num: that.data.num5,
        is_zcjy: that.data.ck1,
        is_shjj: that.data.ck2,
        is_shjjydj: that.data.ck3,
        is_sysl: that.data.ck4,
        is_xjqz: that.data.ck5,
        is_shmcc: that.data.ck6,
        is_djay: that.data.ck7,
        is_syypx: that.data.ck8,
        is_poszc: that.data.ck9
      }
    }
    if (that.data.indextype == 2) { //装机单
      jkurl = app.IPurl + '/api/dire/zd_dire_up'

    }
    if (that.data.indextype == 3) { //维护单
      jkurl = app.IPurl + '/api/dire/wd_dire_up'

    }
    if (that.data.indextype == 4) { //换机单
      jkurl = app.IPurl + '/api/dire/hd_dire_up'

    }
    if (that.data.indextype == 5) { //撤机单
      jkurl = app.IPurl + '/api/dire/cd_dire_up'

    }
    console.log(jkurl)
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
          setTimeout(function () {
            var pages = getCurrentPages();   //当前页面
            var prevPage = pages[pages.length - 3];   //上一页面
            prevPage.setData({
              //直接给上一个页面赋值
              caozuo: true,
            });
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
  getyc() {
    var that = this
    //api/index/cate
    wx.request({
      url: app.IPurl + '/api/index/cate',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'post',
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {  //数据为空
          that.setData({
            yc_data: res.data.data.cate_y,
            jb_data: res.data.data.cate_j,
            pj_data: res.data.data.non,
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
              title: '操作失败'
            })
          }
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