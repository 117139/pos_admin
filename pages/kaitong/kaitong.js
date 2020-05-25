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
    id: '',
    type: '',
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
    num1: 0,
    num2: 0,
    num3: 0,
    num4: 0,
    num5: 0,

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
 
  sub(){
    var that =this
    var id = that.data.id
    console.log(id)
    
  },
  
})