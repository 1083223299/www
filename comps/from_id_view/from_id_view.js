// comps/from_id_view.js
import api from '../../lib/account';
Component.C({
  data: {},
  attached: function () {
    /**
     * this.$root
     * this.$parent
     */
	},
	methods: { 
    updata_from_id(e){

      if (e.detail.formId != 'the formId is a mock one') {
        
        api.user.get_form_id({form_id:JSON.stringify([e.detail.formId])},e=>{
				})

      }
      
    },
  }
});
