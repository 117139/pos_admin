//app.js
App({
	IPurl: 'http://pos.a.800123456.top/',
	IPurl1:'http://pos.a.800123456.top/',
	onLaunch: function() {
		let that=this
		wx.removeStorageSync('userInfo')
		wx.removeStorageSync('tokenstr')
		// 获取用户信息
		wx.getSetting({
		  success: res => {
		    // console.log('16app'+JSON.stringify(res))
		    // console.log(res.authSetting['scope.userInfo'])
		    if (res.authSetting['scope.userInfo']==true) {
		      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
		      console.log('已经授权')
					wx.getUserInfo({
						success(res) {
							that.globalData.userInfo = res.userInfo
							console.log(that.globalData.userInfo)
							wx.setStorageSync('userInfo', res.userInfo)
							if(!that.globalData.userInfo){
							
							}else{
		            wx.login({
		              success: function (res) {
		                // 发送 res.code 到后台换取 openId, sessionKey, unionId
		                var uinfo = that.globalData.userInfo
		                let data = {
		                  code: res.code,
		                  nickname: uinfo.nickName,
                      avatar: uinfo.avatarUrl
		                }
		                let rcode = res.code
		                console.log(res.code)
                    // return
		                wx.request({
                      url: that.IPurl +'/api/login/login',
		                  data: data,
		                  header: {
		                    'content-type': 'application/x-www-form-urlencoded'
		                  },
		                  dataType: 'json',
		                  method: 'POST',
		                  success(res) {
		                    console.log(res.data)
		                    if (res.data.code == 1) {
		                      console.log('登录成功')
                          wx.setStorageSync('loginmsg', res.data.data)
                          wx.setStorageSync('user_type', res.data.type)
                          // if (res.data.type==0){
                          //   wx.navigateTo({
                          //     url: '/pages/login_tel/login_tel',
                          //   })
                          // }
                          
		                    } else {
		                      wx.removeStorageSync('userInfo')
		                      wx.removeStorageSync('tokenstr')
		                      wx.showToast({
		                        icon: 'none',
		                        title: '登录失败',
		                      })
		                    }
		
		                  },
		                  fail() {
		                    wx.showToast({
		                      icon: 'none',
		                      title: '登录失败'
		                    })
		                  }
		                })
		              }
		            })
							}
						}
					})
					
		    }else{
				  
		    }
		  }
		})
	},
  dologin(type) {
    let that = this
    wx.login({
      success: function (res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var uinfo = that.globalData.userInfo
        let data = {
          code: res.code,
          nickname: uinfo.nickName,
          avatar: uinfo.avatarUrl
        }
        let rcode = res.code
        console.log(res.code)
        wx.request({
          url: that.IPurl + '/api/login/login',
          data: data,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          dataType: 'json',
          method: 'POST',
          success(res) {
            console.log(res.data)
            if (res.data.code == 1) {
              console.log('登录成功')
              wx.setStorageSync('loginmsg', res.data.data)
              wx.setStorageSync('user_type', res.data.type)
              if (res.data.type == 0) {
                wx.navigateTo({
                  url: '/pages/login_tel/login_tel',
                })
              }
              if (type == 'shouquan') {
                wx.navigateBack()
              }



            } else {
              wx.removeStorageSync('userInfo')
              wx.removeStorageSync('tokenstr')
              wx.showToast({
                icon: 'none',
                title: '登录失败',
              })
            }

          },
          fail() {
            wx.showToast({
              icon: 'none',
              title: '登录失败'
            })
          }
        })
      }
    })
  },

	globalData: {
		userInfo: null
	},
	jump(e) {
    console.log(e)
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    if (wx.getStorageSync('loginmsg').type == 0) {
      wx.showToast({
        icon:'none',
        title: '请先绑定账号',
      })
      setTimeout(function (){
        wx.navigateTo({
          url: '/pages/login_tel/login_tel',
        })
      },1000)
     
      return
    }
    // if (e.currentTarget.dataset.quanxian){
    //   if (!wx.getStorageSync('userInfo')) {
    //     wx.navigateTo({
    //       url: '/pages/login/login',
    //     })
    //     return
    //   }
    // }
		if(e.currentTarget.dataset.url){
			wx.navigateTo({
				url: e.currentTarget.dataset.url
			})
		}
		
	},
  pveimg(current, urls) {
    let urls1 = []
    if (urls) {
      urls1 = urls

    } else {
      urls1[0] = current
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls1 // 需要预览的图片http链接列表
    })
  },
  data: {
    haveLocation: false,
    activity_lat: -1,
    activity_lng: -1,
    activity_location: ""
  },
	call(e) {
		// if (!wx.getStorageSync('userInfo')) {
		// 	wx.navigateTo({
		// 		url: '/pages/login/login',
		// 	})
		// 	return
		// }
		
    var tel = e.currentTarget.dataset.tel
    console.log(tel==null)
    if (!tel) {
      wx.showToast({
        icon: 'none',
        title: '未绑定手机号',
      })
      return
    }
		
      
    wx.makePhoneCall({
      phoneNumber: tel
    })
		
		
	},
	data: {
		haveLocation: false,
		activity_lat: -1,
		activity_lng: -1,
		activity_location: ""
	}
})
