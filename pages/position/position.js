// pages/position/position.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var app=getApp()
Page({
  data: {
    latitude: 0,//地图初次加载时的纬度坐标
    longitude: 0, //地图初次加载时的经度坐标
    name:"", //选择的位置名称
    address:'',
    shownum:1
  },
  onLoad: function () {
    this.setData({
      shownum:1
    })
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'FORBZ-KIPEF-WECJR-NFZKA-MREDV-FCF3O'
    });
   var that=this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          name: res.name
        });
       
        // app.data1 = {
        //   addresschose: res.name,
        //   latitude: res.latitude,
        //   longitude: res.longitude,
        // }
        // console.log(res)
        that.data.shownum++
        that.setData({
          shownum: that.data.shownum
        })
        // console.log(res.name);
        // //选择地点之后返回到原来页面
        // // wx.navigateTo({
        // //   url: "/pages/index/index?address="+res.name
        // // });
        // var pages = getCurrentPages();   //当前页面
        // var prevPage = pages[pages.length - 2];   //上一页面

        // prevPage.setData({
        //   //直接给上一个页面赋值
        //   addresschose: res.name,
        //   latitude: res.latitude,
        //   longitude: res.longitude,
        // });
        wx.navigateBack()
        // wx.navigateBack({
        //      //返回
        //      delta: 1
        // })
        // wx.navigateBack()
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },
  onShow(){
    
    console.log('onshow')
    if(this.data.shownum==1){
      this.data.shownum++
      this.setData({
        shownum: this.data.shownum
      })
    } else if(this.data.shownum == 2){
      console.log(app.data1)
      // var pages = getCurrentPages();   //当前页面
      // var prevPage = pages[pages.length - 2];   //上一页面
      // let currPage = pages[pages.length - 1];
      
      // app.data1 = {
      //   addresschose: currPage.data.addresschose,
      //   latitude:  currPage.data.latitude,
      //   longitude:  currPage.data.longitude,
      // }
      // prevPage.setData({
      //   //直接给上一个页面赋值
      //   addresschose: currPage.data.addresschose,
      //   latitude: currPage.data.latitude,
      //   longitude: currPage.data.longitude,
      // });
      wx.navigateBack()
    }
  },
  onUnload(){
    var res=this.data
    app.data1 = {
      addresschose: res.name,
      latitude: res.latitude,
      longitude: res.longitude,
    }
    console.log(res)
    
    //选择地点之后返回到原来页面
    // wx.navigateTo({
    //   url: "/pages/index/index?address="+res.name
    // });
    var pages = getCurrentPages();   //当前页面
    var prevPage = pages[pages.length - 2];   //上一页面

    prevPage.setData({
      //直接给上一个页面赋值
      addresschose: res.name,
      latitude: res.latitude,
      longitude: res.longitude,
    });
  },
  //移动选点
  moveToLocation: function () {
    var that = this;
    
  }
});