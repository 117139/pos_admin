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
    activity_location: '',
    location:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(that.options)
    if (that.options.type){
      that.setData({
        type: that.options.type
      })
    }
    if (that.options.name) {
      wx.setNavigationBarTitle({
        title: that.options.name,
      })
    }


    /*判断是第一次加载还是从position页面返回
        如果从position页面返回，会传递用户选择的地点*/
    console.log(options)
    if (options.address != null && options.address != '') {
      //设置变量 address 的值
      this.setData({
        address: options.address,
        location: options.location
      });
    } else {
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
        //此key需要用户自己申请
        key: 'FORBZ-KIPEF-WECJR-NFZKA-MREDV-FCF3O'
      });
      var that = this;
      // 调用接口
      qqmapsdk.reverseGeocoder({
        success: function (res) {
          console.log(res);
          console.log(res.result.address);
          that.setData({
            // address: res.result.address,
            location: res.result.location,
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
    if (location != "") {
      that.setData({
        activity_location: location
        // activity_location: this.data.address//这个没用，可能onshow最先获取不到onLoad值
      });
    }
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if (currPage.data.addresschose) {
      this.setData({//将携带的参数赋值
        activity_location: currPage.data.addresschose
      });
    }
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
      'name': that.data.activity_location,
      'latitude': that.data.location.lat,
      'longitude': that.data.location.lng
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
    wx.navigateTo({
      url: "/pages/position/position"
    });
  },
  //移动选点
  moveToLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res.name);
        that.setData({
          activity_location: res.name
        })
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
})