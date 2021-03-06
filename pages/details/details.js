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
    type: '',
    id:'',
    datas:'',
    activity_location: '',
    location:'',
    yc_data: [
      { name: 12 },
      { name: 13 },
      { name: 142 },
      { name: 1233 },
      { name: 15 },

    ],
    indexp1: 0,
    indexp2: 0,
    indexp3: 0,
    indexp4: 0,
    indexp5:0,
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(that.options)
    if (options.indextype) {
      that.setData({
        indextype: options.indextype
      })
    }
    if (that.options.type){
      that.setData({
        type: that.options.type,
        id: that.options.id,
        
      })
    }
    if (that.options.name) {
      wx.setNavigationBarTitle({
        title: that.options.name,
      })
    }
    that.getdata()

    /*判断是第一次加载还是从position页面返回
        如果从position页面返回，会传递用户选择的地点*/
    console.log(options)
    if (options.address != null && options.address != '') {
      //设置变量 address 的值
      // this.setData({
      //   address: options.address,
      //   location: options.location
      // });
    } else {
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
        //此key需要用户自己申请
        key: 'WOUBZ-TTHHR-OMAWI-WC5F6-XPB5H-CHFRU'
      });
      var that = this;
      // 调用接口
      qqmapsdk.reverseGeocoder({
        success: function (res) {
          // console.log(res);
          // console.log(res.result.address);
          // that.setData({
          //   // address: res.result.address,
          //   // location: res.result.location,
          //   activity_location: res.result.address
          // });
          // console.log(that.data.address);
        },
        fail: function (res) {
          //console.log(res);

        },
        complete: function (res) {
          //console.log(res);
        }
      });
    }
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

    location = getApp().data.activity_location;
    console.log('118'+location)
    console.log(getApp().data)
   
    if (location != "") {
      that.setData({
        activity_location: location

        // activity_location: this.data.address//这个没用，可能onshow最先获取不到onLoad值
      });
    }
    /*let pages = getCurrentPages();
    // console.log('128' + pages)
    // console.log('128' + JSON.stringify(pages))
    let currPage = pages[pages.length - 1];
    // console.log('128' + JSON.stringify(currPage))
    console.log(app.data1)
    // if (currPage.data.addresschose) {
    if (app.data.activity_location) {
      
      var zb = {
        latitude: app.data.latitude,
        longitude: app.data.longitude
      }
      this.setData({//将携带的参数赋值
        activity_location: app.data1.addresschose,
        location:zb
      });
      setTimeout(function (){
        // var new_data = JSON.parse(JSON.stringify(currPage))
        // console.log(new_data.data)
        var address_new = app.data1.addresschose
        currPage.data.addresschose=''
        that.set_add(address_new)
      },100)
    }*/
    wx.getSetting({
      success: (res) => {
        console.log(res.authSetting['scope.userLocation'])
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
          that.setData({
            ldata: false
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
          // that.getLocation(that);
          that.setData({
            ldata: false
          })
        }
        else { //授权后默认加载
          console.log('授权后默认加载')
          // that.getLocation(that);
          that.setData({
            ldata: true
          })
        }
      }
    })
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
    var that =this
    wx.stopPullDownRefresh();
    that.getdata()
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
  handler: function (e) {
    var that = this;
    if (!e.detail.authSetting['scope.userLocation']) {
      that.setData({
        ldata: false
      })
    } else {
      that.setData({
        ldata: true,
      })
      // 调用接口
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
        //此key需要用户自己申请
        key: 'FORBZ-KIPEF-WECJR-NFZKA-MREDV-FCF3O'
      });
      qqmapsdk.reverseGeocoder({
        success: function (res) {
          console.log(res.result.address);
          that.setData({
            // address: res.result.address,
            activity_location: res.result.address
          });
          // console.log(that.data.address);
        },
        fail: function (res) {
          //console.log(res);

        },
        complete: function (res) {
          //console.log(res);
        }
      });
      // that.getLocation(that);
      /*wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude

          that.setData({
            latitude: latitude,
            longitude: longitude
          })
          wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 28
          })
        }
      })*/
    }
  },

  //判断获取地址授权
  again_getLocation: function () {
    var that = this;
    // 获取位置信息
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
            success: function (res) {
              console.log(res)
              if (res.cancel) {
                that.setData({
                  isshowCIty: false
                })
                wx.showToast({
                  title: '授权失败',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    console.log(dataAu)
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      // 调用接口
                      // 实例化API核心类
                      qqmapsdk = new QQMapWX({
                        //此key需要用户自己申请
                        key: 'FORBZ-KIPEF-WECJR-NFZKA-MREDV-FCF3O'
                      });
                      qqmapsdk.reverseGeocoder({
                        success: function (res) {
                          console.log(res.result.address);
                          that.setData({
                            // address: res.result.address,
                            activity_location: res.result.address
                          });
                          // console.log(that.data.address);
                        },
                        fail: function (res) {
                          //console.log(res);

                        },
                        complete: function (res) {
                          //console.log(res);
                        }
                      });
                      //再次授权，调用getLocationt的API
                      //that.getLocation(that);
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入

          // 实例化API核心类
          qqmapsdk = new QQMapWX({
            //此key需要用户自己申请
            key: 'FORBZ-KIPEF-WECJR-NFZKA-MREDV-FCF3O'
          });
          // 调用接口
          qqmapsdk.reverseGeocoder({
            success: function (res) {
              console.log(res.result.address);
              that.setData({
                // address: res.result.address,
                activity_location: res.result.address
              });
              // console.log(that.data.address);
            },
            fail: function (res) {
              //console.log(res);

            },
            complete: function (res) {
              //console.log(res);
            }
          });
          // that.getLocation(that);
        }
        else { //授权后默认加载
          console.log(1)
          // 调用接口
          qqmapsdk = new QQMapWX({
            key: 'FORBZ-KIPEF-WECJR-NFZKA-MREDV-FCF3O'
          });
          qqmapsdk.reverseGeocoder({
            success: function (res) {
              console.log(res.result.address);
              that.setData({
                // address: res.result.address,
                activity_location: res.result.address
              });
              // console.log(that.data.address);
            },
            fail: function (res) {
              console.log(res);

            },
            complete: function (res) {
              //console.log(res);
            }
          });
          // that.getLocation(that);
        }
      }
    })

  },
  getLocation: function () {
    let that =this
    let plugin = requirePlugin('routePlan');
    let key = 'WOUBZ-TTHHR-OMAWI-WC5F6-XPB5H-CHFRU';  //使用在腾讯位置服务申请的key
    let referer = 'pos机进销存管理系统';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': that.data.datas.address,
      'latitude': that.data.location.latitude,
      'longitude': that.data.location.longitude
    });
    console.log(endPoint)
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
    return
    // wx.navigateTo({
    //   url: '/pages/addLocation/addLocation',
    // });
    this.moveToLocation()
    wx.navigateTo({
      url: "/pages/position/position"
    });
  },
  getLocation1: function () {
    
    // wx.navigateTo({
    //   url: '/pages/addLocation/addLocation',
    // });
    this.moveToLocation()
    // wx.navigateTo({
    //   url: "/pages/position/position"
    // });
  },
  //移动选点
  moveToLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res.name);
        var zb = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        that.setData({//将携带的参数赋值
          activity_location: res.name,
          location: zb
        });
        that.set_add(res.name)
        //选择地点之后返回到原来页面
        // wx.navigateTo({
        //   url: "/pages/index/index?address="+res.name
        // });
        // var pages = getCurrentPages();   //当前页面
        // var prevPage = pages[pages.length - 2];   //上一页面
        // prevPage.setData({
        //   //直接给上一个页面赋值
        //   addresschose: res.name,
        // });

        // wx.navigateBack({
        //   //返回
        //   delta: 1
        // })
        // // wx.navigateBack()
      },
      fail: function (err) {
        console.log(err)
      }
    });
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
  getdata(){
    var that =this
    var data = {
      token: wx.getStorageSync('loginmsg').token,
      id: that.data.id

    }
    var jkurl = app.IPurl + '/api/dire/zd_dire_show'
    if (that.data.indextype == 1) { //巡机单
      jkurl = app.IPurl + '/api/dire/xd_dire_show'
    }
    if (that.data.indextype == 2) { //装机单
      jkurl = app.IPurl + '/api/dire/zd_dire_show'
    }
    if (that.data.indextype == 3) { //维护单
      jkurl = app.IPurl + '/api/dire/wd_dire_show'
    }
    if (that.data.indextype == 4) { //换机单
      jkurl = app.IPurl + '/api/dire/hd_dire_show'
    }
    if (that.data.indextype == 5) { //撤机单
      jkurl = app.IPurl + '/api/dire/cd_dire_show'
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
          var zb = {
            latitude: res.data.data.coordinate1,
            longitude: res.data.data.coordinate2
          }
         that.setData({
           datas:res.data.data,
           location: zb
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
  set_add(add){
    var that=this
    console.log('592' + add)
    var data = {
      token: wx.getStorageSync('loginmsg').token,
      id: that.data.id,
      address: add,
      coordinate1: that.data.location.latitude,
      coordinate2: that.data.location.longitude
    }
    var jkurl = app.IPurl + '/api/dire/zd_dire_up'
    if (that.data.indextype == 1) { //巡机单
      jkurl = app.IPurl + '/api/dire/xd_dire_up'
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
        if (res.data.code == 1) {  //数据为空
          wx.showToast({
            icon: 'none',
            title: '操作成功'
          })
          app.data1={}
          that.getdata()
        }  else {
          if(res.msg){
            wx.showToast({
              icon: 'none',
              title: res.msg
            })
          }else{
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
        // wx.setNavigationBarTitle({
        //   title: '下单',
        // })
      }
    })
  },
  pveimg(e) {
    var curr = e.currentTarget.dataset.src
    var urls = e.currentTarget.dataset.array
    let urls1 = []
    if (urls) {
      urls1 = urls

    } else {
      urls1[0] = curr
    }
    wx.previewImage({
      current: curr, // 当前显示图片的http链接
      urls: urls1 // 需要预览的图片http链接列表
    })
  },
})