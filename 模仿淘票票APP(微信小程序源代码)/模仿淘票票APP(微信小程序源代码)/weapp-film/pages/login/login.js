var sliderWidth = 160; // 需要设置slider的宽度，用于计算中间位置
Page({
  data:{
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0
  },
  onLoad:function(options){
   var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth /2 - sliderWidth) / 2
                });
            }
        });
  },
   tabClick: function (e) {
        console.log(e)
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
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