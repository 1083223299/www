// src/components/block/jurisdiction/jurisdiction.js
Component({
  options: {  
    multipleSlots: true // 在组件定义时的选项中启用多slot支持  
  },
  properties: {  
    toastText: {            // 属性名  
      type: String,  
      value: '内容'  
    },
    scope_type:{
      type: String,  
      value: ''  
    }  
  },
  data: {  
    is_show:true,  
    noaut:true
  },
  methods: { 
    getAuthorize(){

      this.setData({'is_show':false});

      //回调事件
      if(this.employIdCallback){
        this.setData({'is_show':true});
        this.employIdCallback();
      }
    },
    getSett(){
      var _this = this;
      wx.getSetting({
        success(res) {
          if(res.authSetting[_this.data.scope_type]===undefined){
            _this.setData({noaut:true});
          }else{
            _this.setData({noaut:false});
          }
        }
      })
    },
    getrecord(){
      var _this = this;
      wx.authorize({
        scope: _this.data.scope_type,
        success () {
          
        },
        fail(){
          
        },
        complete(){
          _this.setData({noaut:false});
          //回调事件
          if(_this.employIdCallback){
            _this.setData({'is_show':true});
            _this.employIdCallback();
          }
        }
      })
    }
  }
})