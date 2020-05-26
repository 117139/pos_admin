// pages/caiwu/caiwu.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		type:[
			'全部',
			'提现',
			'收益',
		],
		tidx:0,
    page:1,
    pagesize:20,
		cw_data:[
				[
					{
						name:'空调维修',
						pri:'+20元',
						time:'今天 15:26',
						inr:'材料费提成'
					},
					{
						name:'空调维修',
						pri:'+20元',
						time:'今天 15:26',
						inr:'材料费提成'
					},
					{
						name:'提现',
						pri:'+20元',
						time:'2019.08.14 12:00',
						inr:''
					},
					{
						name:'提现',
						pri:'+20元',
						time:'2019.08.14 12:00',
						inr:''
					},
				],
				[],
				[],
		],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList()
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
  retry(){

    this.data.cw_data = []
    this.setData({
      pages: 1,
      cw_data: this.data.cw_data
    })
    this.getOrderList('onshow')
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
    this.retry()
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
	bindcur(e){
		var that =this
	  console.log(e.currentTarget.dataset.type)
	  that.setData({
	    tidx: e.currentTarget.dataset.type
	  })
    const htmlStatus1 = htmlStatus.default(that)
    htmlStatus1.finish()
		// that.getOrderList()
    if (that.data.cw_data[that.data.tidx].length==0){
			that.getOrderList()
		}
	},
  //获取列表
  getOrderList(ttype) {

    let that = this
    const htmlStatus1 = htmlStatus.default(that)
    console.log('获取列表')
    
   
    
    wx.request({
      url: app.IPurl +'/api/app_deal/search',
      data: {
        token: wx.getStorageSync('loginmsg').token,
        search:'52581175',
        page: that.data.page
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        if (res.data.code == 1) {   //成功
          let resultd = res.data.data
          

          if (res.data.datalist.length == 0) {  //数据为空
            if (that.data.page == 1) {      //第一次加载
              htmlStatus1.dataNull()    // 切换为空数据状态
            } else {
              wx.showToast({
                icon: 'none',
                title: '暂无更多数据'
              })
            }

          } else {                           //数据不为空
            if (that.data.page == 1) {
              that.data.data_list = resultd
              that.data.page++
              that.setData({
                data_list: resultd
              })
            }else{
              that.data.cw_data = that.data.cw_data.concat(resultd)
              that.data.page++
              that.setData({
                cw_data: that.data.cw_data,
                page: that.data.page,
              })
              console.log(that.data.cw_data)
            }
            
            htmlStatus1.finish()    // 切换为finish状态
          }
          // console.log(res.data.list)


        } else {  //失败
          if (res.data.msg) {
            wx.showToast({
              icon: 'none',
              title: res.data.returnstr
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '加载失败'
            })
          }
          htmlStatus1.error()    // 切换为error状态
        }
        // 停止下拉动作
        wx.stopPullDownRefresh();
        // htmlStatus1.error()    // 切换为error状态
      },
      fail(err) {
        wx.showToast({
          icon: "none",
          title: "加载失败"
        })

        console.log(err)
        htmlStatus1.error()    // 切换为error状态
      },
      complete() {
        wx.setNavigationBarTitle({
          title: '交易记录'
        })
      }
    })
  },
})