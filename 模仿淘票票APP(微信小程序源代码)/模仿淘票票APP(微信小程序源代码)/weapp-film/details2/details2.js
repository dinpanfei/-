// details2/details2.js
Page({
  data:{
    title: '影院',
    cinerma:{},
    images:[],
    imageIndex:'0',
    dateIndex:'0',
    addr:'',
    tel:'',
    url:'',
    windowWidth: 0,
    windoHeight: 0,
    scrollLeft:0,
    left:0
  },
  onLoad:function(options){
    // console.log(options.id)
    // console.log(options.titles)
    // console.log(options.addr)
    // console.log(options.tel)
    this.setData({
      title:options.titles,
      addr:options.addr,
      tel:options.tel,
      url:'http://platform.mobile.meituan.com/open/maoyan/v1/cinema/'+options.id+'/movies/shows.json'
    })
    this.getCinema()
  },
  getCinema:function()
  {
    var that=this
     wx.request({
      url:that.data.url,
      data: {},
      method: 'GET',  
       header: {
          'Content-Type': 'application/json'
      },
      success: function(res){
       console.log(res.data.data.movies)
       let movies = []
       //使用map方法对每一部电影的图片进行相应的处理并返回一个新的数组
        movies = res.data.data.movies.map(movie => {
          const arr = movie.img.split('/')
          const str = arr[arr.length-1]
          movie.img = 'http://p0.meituan.net/165.220/movie/'+str
          return movie
          })
      console.log(movies+'****')
       that.setData({
       cinerma:res.data.data,
       images:movies,
  
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
  //获取当前点击图片项的的index
  swichNav:function(e)
  {
   console.log(e.currentTarget.dataset.index)
   let index=e.currentTarget.dataset.index
   this.setData({
     imageIndex:index,
     scrollLeft:index*83
   })
   //83=大图的宽+父容器的左右margin值
   //取当前scrollLeft值为当前点击项索引*83
   console.log('dian'+this.data.scrollLeft)
  },
  //滚动条滚动式触发
  EventHandle:function (e) {
   let scrollLeft=e.detail.scrollLeft
   //确定当前scrollLeft 与哪个索引的图片更接近,在范围内取整
   //取一个范围内较接近的值重新设置为当前的索引下标
   let movieIndex=Math.round(scrollLeft/83)
   this.setData({
   imageIndex:movieIndex,
   scrollLeft:83*movieIndex
   })
   console.log('hua'+this.data.scrollLeft)
  },
  //时间滚动条点击触发
  chooseDate:function(e)
  {
   console.log(this.data.images[1].shows[1]) 
   this.setData({
     dateIndex:e.currentTarget.dataset.index
   })
  },
  onReady:function(){
    var that = this
    wx.setNavigationBarTitle({
      title: that.data.title
    })
  },
  //获取系统设备宽高度
  onShow:function(){
    var that=this
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          left:res.windowWidth/2-42
        })
        //42 来源:42=小图的一半+本身的padding值或父容器设置的margin 值
      // 在这里是 42=(67/2)+8+8; 8为父容器的margin
      }
    })
    console.log(this.data.windowWidth)
   
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})