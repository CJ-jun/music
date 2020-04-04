// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // slider事件
  sliderChange:function(e){
      console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //创建实例
    var audioCtx =wx.createInnerAudioContext()
    //实例进行设置，音频的播放地址
    audioCtx.src ='http://96.ierge.cn/14/215/430990.mp3'
    //当播放时，输出调试的信息
    audioCtx.onPlay(function(){
      console.log('开始播放')
    })
    audioCtx.onError(function(err){
      console.log(err)
    })
    //开始播放
    // audioCtx.play()
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