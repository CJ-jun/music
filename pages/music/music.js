// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:2,
    //播放列表
    playList:[{
      id:1,
      title:'图书馆',
      singer:'王蓉',
      src:"http://96.ierge.cn/14/215/430992.mp3",
      coverImgUrl:'./images/1.jpg'
    },{
        id: 2,
        title: '爱在西元前',
        singer: '周杰伦',
        src: "https://webfs.yun.kugou.com/202003271103/04bc27dcd6078ecb486f9135ab9cfd45/part/0/961038/G080/M08/0E/07/kA0DAFgu0fuAG70UADk4wCK3FIQ713.mp3",
        coverImgUrl: './images/1.jpg'
        },
        {
        id:3,
        title: '图书馆3',
        singer: '王蓉3',
        src: "http://96.ierge.cn/14/215/430993.mp3",
        coverImgUrl: './images/1.jpg'
      }],
      state:'paused',   //记录播放的状态
    playIndex: 0,  //记录正在播放第几首歌
      play:{
          currentTime:'00:00',
          duration:'00:00',
          percent:0,
          title:'',
          singer:'',
          coverImgUrl:''
      }   
  },
  //点击按钮播放
  play:function(){
    this.audioCtx.play()
    this.setData({state:'running'})

  },

// 暂停
pause:function(){
  this.audioCtx.pause()
  this.setData({state: 'paused'})
},
// 下一首
next:function(){
  var index = this.data.playIndex>=this.data.playList.length-1?0:this.data.playIndex+1
  this.setMusic(index)
  if(this.data.state=='running'){
    this.play()
  }
},
  // tab的点击事件
  changeItem:function(e){
    console.log(e)
    this.setData({ item: e.target.dataset.item })
  },
  // swiper滑动的事件
  changeTab:function(e)
  {
    console.log(e)
    this.setData({item:e.detail.current})
  },
  //slider拖动事件
  slideChange:function(e){
    console.log(e)
    var second =this.audioCtx.duration * e.detail.value /100
    this.audioCtx.seek(second)
  },
  //选歌
  change:function(e){
    console.log(e)
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
  },
  //切换到播放列表页
  changePage:function(){
    this.setData({
      item:2
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  audioCtx:null,//音乐实例对象
  onReady: function () {
    this.audioCtx=wx.createInnerAudioContext(),
    //默认播放第一首歌
    this.setMusic(0)
  //检测播放是否失败
  this.audioCtx.onError(function(err){
    console.log(err)
  })
  var that =this
  //播放完毕自动播放下一首
  this.audioCtx.onEnded(function(){
    thst.next()
  })
  //更新播放进度
  this.audioCtx.onPlay(function(){
    console.log('音乐正在播放')
  })
  this.audioCtx.onTimeUpdate(function(){
    that.setData({
      'play.currentTime':formatTime(that.audioCtx.currentTime),
      'play.duration':formatTime(that.audioCtx.duration),
      'play.percent':that.audioCtx.currentTime / that.audioCtx.duration*100
    })
  })
  //格式化时间
  function formatTime(time){
    var minute = Math.floor(time/60)
    var second =Math.floor(time)%60
    return (minute <10 ?'0' +minute:minute)+':'
    +(second <10 ?'0' +second :second)
  }
  },
  //设置歌曲
  setMusic:function(index){
    var music =this.data.playList[index]
    this.audioCtx.src=music.src
    this.setData({
      playIndex:index,
      'play.title':music.title,
      'play.singer':music.singer,
      'play.coverImgUrl':music.coverImgUrl,
      'play.currentTime':'00:00',
      'play.duration':'00:00',
      'play.percent':0
    })
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

  }
})