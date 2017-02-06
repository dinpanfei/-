//index.js
Page({
  data: {
    films: [],
    limit: 6,
    loading: false,
    windowHeight: 0,
    windowWidth: 0
  },
  onLoad: function (){
     wx.showToast({title:'加载中..',icon:'loading',duration:600})
    this.setData({
      loading: true,
    })  
  },
  onShow: function(){
    var that = this
    wx.request({
      url: 'http://m.maoyan.com/movie/list.json', //仅为示例，并非真实的接口地址
      data: {
        offset: 0,
        type: 'hot',
        limit: that.data.limit
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          films: res.data.data.movies,
          loading: true
        })
      }
    })
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  pullDownRefresh: function(e) {
     this.onLoad()
  },
  // 滚动条滚动到底部时触发
  pullUpLoad: function(e) {
     
   wx.showToast({title:'加载中..',icon:'loading',duration: 600})
    var limit = this.data.limit + 6
    console.log(limit)
    this.setData({
      limit: limit
    })
    this.onShow()
  }
})
