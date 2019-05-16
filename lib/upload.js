import api from './account'


export default{

    //文件上传
    upload:function (file,dir,succ,page_this) {

        //正式上传
        this.forload(file,dir,succ,page_this);

    },

    file_index:0,
    oss_url:[],
    forload(file,dir,succ,page_this){

        const _this = this;
        
        const type = file[_this.file_index ].substring(file[_this.file_index ].lastIndexOf('.'));
            
        page_this.$api.base.get_oss_sign({},data=>{

            //oss库
            if(data.path===undefined||data.path=='undefined'||data.path==''){
                data.path = 'achievement/';
            }

            const key = data.path + dir + data.key + type; //文件名 包括路径
            const upload_url = data.upload_url;
            const accessid = data.access_id;

            wx.showLoading({
                title: '上传中'+'('+(_this.file_index+1)+'/'+file.length+')',
            })
            
            wx.uploadFile({
                url: upload_url,
                filePath: file[_this.file_index ],
                name: 'file',
                formData: {
                    'key': key,
                    'policy': data.policy,
                    'OSSAccessKeyId': accessid,
                    'signature': data.signature,
                    'success_action_status': '200',
                },
                
                success: function (res) {
                    console.log(res)
                    wx.hideLoading()
                    if (res.statusCode != 200) {
                        wx.showToast({
                            title: '上传失败',
                            icon:'none',
                            duration: 2000
                        })
                        return;
                    }
                    if (succ) {
                        //储存单次对象地址
                        _this.oss_url.push(upload_url+'/'+key);
                        //是否所有的都上传了
                        if(_this.file_index<file.length-1){
                            _this.file_index++;
                            _this.forload(file,dir,succ,page_this);
                        }else{
                            _this.file_index=0;
                            succ(_this.oss_url);
                            _this.oss_url=[];
                        }
                    }
                },
                fail: function (err) {
                    wx.hideLoading()
                    // if (params.fail) {
                    //     params.fail(err)
                    // }
                },
            })

        },page_this)

    }
    
    
}