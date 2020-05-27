// pages/login1/login1.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		btnkg:0,  //o ok    1off
		pwd:'',
		showpwd:1,
		tel:'',
		yzm:'',
		setstate:0,
		time:60,
    yc_data: [
      { name: '公司员工',type:1 },
      { name: '商户', type: 2 },

    ],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		// wx.showToast({
		// 	icon:'none',
		// 	title:'请先注册账号'
		// })
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
	oniptblur(e){
		console.log(e.detail.value)
		this.setData({
			tel:e.detail.value
		})
	},
	getcode(){
		let that =this
		
		if(that.data.tel=='' || !(/^1\d{10}$/.test(that.data.tel))){
			wx.showToast({
				icon:'none',
				title:'手机号有误'
			})
			return 
		}
		if(that.data.btnkg==1){
			return
		}else{
			that.setData({
				btnkg:1
			})
		}
		wx.showToast({
			icon:'none',
			title:'发送成功'
		})
		that.codetime()
		that.setData({
			btnkg:0
		})
		return
		
		wx.request({
      url: app.IPurl +'/api/login/binding_staff',
			data:  {
					// tokenstr:that.data.tokenstr,
					phone:that.data.tel
		    },
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'POST',
			success(res) {
				that.setData({
					btnkg:0
				})
				if(res.data.code=1){
					wx.showToast({
						icon:'none',
						title:'发送成功'
					})
					that.codetime()
				}else{
					that.setData({
						btnkg:0
					})
					if(res.data.msg){
						wx.showToast({
							icon:'none',
							title:res.data.msg
						})
					}else{
						wx.showToast({
							icon:'none',
							title:'操作失败'
						})
					}
				}
				
				// console.log(res.data.code)
				// that.setData({
				// 	yzm:res.data.code.substr(0,4)
				// })
				// console.log(that.data.yzm)
				// that.codetime()
			},
			fail(err){
				that.setData({
					btnkg:0
				})
				wx.showToast({
					icon:'none',
					title:'操作失败'
				})
				console.log(err)
			}
		})
		
	},
	codetime(){
		let that =this
		let time=60
		let st=setInterval(function(){
		    if(time==0){
		        that.setData({
							setstate:0,
						})
		        clearInterval(st);
		    }else{
		        let news=time--;
						// console.log(news)
						that.setData({
							setstate:1,
							time:news
						})
		        
		    }
		},1000);
	},
	//提交表单
	formSubmit(e) {
		// console.log(app.globalData.userInfo)
		// let uinfo=app.globalData.userInfo
		// console.log(uinfo.nickName)
	 //  if (uinfo===null){
	 //    wx.showToast({
	 //      title: '您的授权已失效，请重新授权',
	 //      duration: 2000,
	 //      icon: 'none'
	 //    });
	 //    setTimeout(function(){
	 //      wx.reLaunch({
	 //        url: '/pages/shouquan/shouquan',
	 //        fail: (err) => {
	 //          console.log("失败: " + JSON.stringify(err));
	 //        }
	 //      })
	 //    },500) 
	 //    return
	 //  }
		// console.log(uinfo.avatarUrl)
		let that =this
	  console.log('form发生了submit事件，携带数据为：', e.detail.value)
		let formresult=e.detail.value
		
		if (!formresult.tel) {
			wx.showToast({
        title: '账号不能为空',
				duration: 2000,
				icon:'none'
			});
			return false;
		}
		// if (formresult.code=='') {
		// 	wx.showToast({
		// 		title: '验证码不能为空',
		// 		duration: 2000,
		// 		icon:'none'
		// 	});
		// 	return false;
		// }
		if (formresult.pwd.length<6) {
			wx.showToast({
				title: '密码长度不能小于6位',
				duration: 2000,
				icon:'none'
			});
			return false;
		}
		
		// return
		if(that.data.btnkg==1){
			return
		}else{
			that.setData({
				btnkg:1
			})
		}
		wx.showLoading({
			title: '正在登录中',
			mask:true
		})
		
    var datas = {
      token: wx.getStorageSync('loginmsg').token,
      username: formresult.tel,
      password: formresult.pwd,
      type: that.data.yc_data[that.data.index].type
    }
    console.log(datas)
		wx.request({
      url: app.IPurl +'/api/login/binding_staff',
			data:  datas,
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'POST',
			success(res) {
				console.log(res.data)
				wx.hideLoading()
				if(res.data.code==1){
					wx.showToast({
						title: '登录成功',
						duration: 1000,
						icon:'none'
					});
          wx.setStorageSync('user_type', that.data.yc_data[that.data.index].type)
					setTimeout(function() {
						that.setData({
							btnkg:0
						})
						wx.reLaunch({
							url:'/pages/index/index'
						})
					}, 500);
					
					wx.setStorageSync('login', 'login')
					
				}else{
					that.setData({
						btnkg:0
					})
					if(res.data.msg){
						wx.showToast({
							title: res.data.msg,
							duration: 2000,
							icon:'none'
						});
					}else{
						wx.showToast({
							title: '网络异常',
							duration: 2000,
							icon:'none'
						});
					}
				}
			},
			fail() {
				that.setData({
					btnkg:0
				})
				wx.hideLoading()
				wx.showToast({
					title: '网络异常',
					duration: 2000,
					icon:'none'
				});
			}
		})
	},
	goback(){
		wx.navigateBack()
	},
	toggless(e){
		console.log(e.currentTarget.dataset.type)
		this.setData({
			showpwd:e.currentTarget.dataset.type
		})
	},
	oniptblurpwd(e){
		console.log(e.detail.value)
		this.setData({
			pwd:e.detail.value
		})
	},
})