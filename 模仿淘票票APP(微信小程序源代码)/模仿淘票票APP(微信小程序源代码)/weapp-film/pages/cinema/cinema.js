// pages/cinema/cinema.js
Page({
  data:{
    cinermas:{}
  },
  onLoad:function(options){
    var that=this
    wx.request({
      url: 'http://platform.mobile.meituan.com/open/maoyan/v1/cinemas.json',
      data: {
        ct:'武汉'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
       console.log(res.data.data)
      that.setData({
        cinermas:res.data.data
      })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})