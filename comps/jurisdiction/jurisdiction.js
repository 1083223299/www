// src/components/block/jurisdiction/jurisdiction.js
import api from '../../lib/account'

Component({
  options: {  
    multipleSlots: true // 在组件定义时的选项中启用多slot支持  
  },
  properties: {  
    toastText: {            // 属性名  
      type: String,  
      value: '内容'  
    }  
  },
  data: {  
    is_show:true,  
  },
  methods: { 
    getAuthorize(e){

      if(e.detail.iv!==undefined){

        this.setData({'is_show':false});
        wx.showTabBar({animation:true});

        var _this = this;


        //回调事件
        if(_this.employIdCallback){
          this.setData({'is_show':true});
          _this.employIdCallback(e);
        }


      }
    }
  }
})