import api from './account';
import conf from '../conf';

// const api_url = 'https://supplies.zhizhuguanjia.com'; //请求地址
const api_url = conf.port_url; //请求地址

// const ws_url = "ws://"+api_url.replace(/https:\/\/|http:\/\//,'')+":9502"; //聊天服务器地址
// const ws_url = "wss://"+api_url.replace(/https:\/\/|http:\/\//,'')+"/wss"; //聊天服务器地址

const version = conf.version; //版本

export default {
  // c_url:ws_url,
  api_url:api_url,
  // 接口请求函数封装
  request:function(url,param,succ,err,_this){

    //打开load层
    // is_load?wx.showLoading({title:'加载中',mask:true}):[];
  
    //防止参数为空时报错
    if(param==='')param=new Object();

    //获取this指针
    var that = this;

    //设置版本
    param['version'] =  conf.version;

    //token缓存是否存在 存在 设置token
    // wx.getStorageSync("token")!=''?param['token'] = wx.getStorageSync("token"):[];
    
    if(_this=='no_this'){
      wx.getStorageSync("_t")!=''?param['_t'] = wx.getStorageSync("_t"):[];
    }else{
      _this.$cache.get('_t')!=undefined||_this.$cache.get('_t')!=''?param['_t'] = _this.$cache.get('_t'):[];
    }
   

    var _param = {
      _param : JSON.stringify(param) 
    };


    //发起请求
    wx.request({

      //拼接请求地址
      url: api_url+'/'+url+'.html',

      //设置请求参数
      data: _param ,

      method:'POST',

      //设置header
      header: {
        "content-type": "application/x-www-form-urlencoded"
        //'content-type': 'application/json'
        // 'cookie': wx.getStorageSync("cookie")
      },
      
      //请求成功
      success: function(data){

        //判断接口有无返回Cookie
        data.header["Set-Cookie"]!==undefined?wx.setStorageSync('cookie',data.header["Set-Cookie"]):[];

        //关闭load层
        // wx.hideLoading();

        //调用失败
        if(data.statusCode != '200'){
          err!==undefined?err(data):that.errorToast(data.errMsg+'['+data.statusCode+']');
          return ;
        }

        //接口没有返回任何东西
        if(data.data==''||data.data===undefined){
          return;
        }

        data = data.data;
        
        //自身后端 成功回调
        if(data['_code'] == '0'){
          
          succ(data);

        }else{

          if(data['_code'] == conf.login_invalid_bcz){

            that.errorToast('用户不存在，请重新登录。');

            setTimeout(()=>{
             _this._redirect('login');
            },1000);

            return;

          }

          if(data['_code'] == conf.login_invalid_sc){

            that.errorToast('用户已被删除，请重新登录。');

            setTimeout(()=>{
             _this._redirect('login');
            },1000);

            return;

          }

          if(data['_code'] == conf.login_invalid_wx){

            that.errorToast('请先绑定账号。');

            setTimeout(()=>{
              _this._redirect('login');
            },1000);

            return;

          }

          //登录状态过期
          if(data['_code'] == conf.login_invalid){

            that.errorToast('登录状态失效或未登录，稍后自动重新登录。');

            that.wx_login(_this);

            return;
          }

          //判断请求失败方法是否存在  在的话直接调用并传递后台返回的数据  不存在抛出后台返回的提示
          err!==undefined?err(data):that.errorToast(data['_msg']);

        }

      },

      fail:function(data){
        that.errorToast('网络异常，请稍后重试。');
      },

      // complete:function(){
      //   that.errorToast('网络异常，请稍后重试。');
      // }
    })
  },
  errorToast:function(title){
    //TODO 由于默认只有success和loading两种，需自定义
    //wx.hideLoading();
    if(title === undefined||title == ''){
      return;
    }
    wx.showToast({
      title: title,
      icon:'none',
      duration: 2000
    })
  },
  //TODO icon的有效值（success，loading，none)默认不传为none
  successToast:function(title,icon){
    (icon === undefined) ? icon = 'none' : [];
    if(title === undefined||title == ''){
      return;
    }
    wx.showToast({
      title: title,
      icon: icon,
      duration: 2000
    })
  },
  wx_login:function(_this){
    //打开load层
    wx.showLoading({title:'正在登录',mask:true});
    // that.errorToast('正在登录');

    //设置token
    _this.$cache.get('_t','');

    //设置token
    wx.setStorageSync('_t','');

    //2秒后开始重新登录
    setTimeout(()=>{

      //重新登录
      wx.login({
        success:function(e){

          //登录
          _this.$api.user.wx_login({'code':e.code},e=>{
            
            //设置token
            _this.$cache.set('_t', e._t);

            //设置token
						wx.setStorageSync('_t',e._t);

            //设置token
            _this.$cache.set('user_info',e.user_info);

            //关闭load层
            wx.hideLoading();
            
            //跳转到首页
            _this._switch('index');
            
          },_this)
        }
      })
    },1000);
  }

}
