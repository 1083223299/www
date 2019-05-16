// src/components/block/jurisdiction/jurisdiction.js
import api from '../../lib/account';

Component({
  options: {  
    multipleSlots: true // 在组件定义时的选项中启用多slot支持  
  },
  data: {  
    formIdString:[],
    index:1
  },
  properties:{
    source:{
      type: String,
      value:'未说明来源'
    }
  },
  methods: { 
    formSubmit(e){

      setTimeout(function(){
        
        console.log(e.detail.formId);

      },100)

      if (e.detail.formId != 'the formId is a mock one') {
        
        this.data.formIdString.push(e.detail.formId);

        this.data.index = this.data.index+1;

        if(this.data.index==16){
          this.upDataFromId();
        }

      }
      
    },
    upDataFromId(){
      this.data.index=1;
      api.user.get_form_id({form_id:JSON.stringify(this.data.formIdString),source:this.data.source},e=>{
        this.data.formIdString=[];
      })
    }
  }
})