import api from './lib/account';
import conf from './conf'
var underscore = require('./lib/underscore');
require('./lib/wxpage').A({
	config: {
		route: '/pages/$page',
		extendPageBefore: function (name, def, modules) {
			
			//api
			def.$api = api;

			//路由不关闭当前页
			def._route = function (page,para=''){
				this.$route('/pages/'+page+'/'+page+'?'+para);
			};

			//路由关闭当前页
			def._redirect = function (page,para=''){
				wx.redirectTo({
					url: '/pages/'+page+'/'+page+'?'+para
				});
			};
			
			//路由tab
			def._switch = function (page,para=''){
				this.$switch('/pages/'+page+'/'+page+'?'+para);
			};

			//underscore
			def.$_ = function(){
				return underscore;
			};

			//app
			def.$app = function(){
				return getApp();
			};

			//获取暂存版本
			def.$get_storage = function(vm){

				//是否暂存
				conf.version == 3?vm.data._version=true:vm.data._version=false;
				
			};

			//用户列表
			def.$user_type_key = {
				 Ld : 1, //超管
				 Fz : 2, //分总
				 Zj : 3, //总监
				 Jl : 4, //经理
				 Yw : 5, //话务
				 Cw : 6, //财务
				 Qt : 7, //前台
			};

			//权限类型
			def.$JurisdictionType = {
				 Yj : '1', //提交业绩权限
				 Sf : '2', //提交上访权限
				 Tk : '3', //提交退款权限
				 Al : '4', //提交案例权限
				 Xb : '5', //提交喜报权限
				 Ks : '6', //提交客诉权限
				 Yh : '7', //用户管理权限
				 Bm : '8', //部门管理权限
				 BB_Tk : '9', //部门管理权限
				 BB_Ks : '10', //部门管理权限
				 BB_Cw : '11', //部门管理权限
				 Wz : '12', //提交文章权限
			};

			//是否被禁用权限
			def.$user_jurisdiction = function(_this,type_key,vm) {

				var user_type = _this.$cache.get('user_info').user_type;

				var user_type_key = _this.$user_type_key;

				for(var i in type_key){
					if(type_key[i]==user_type){
						return false;
					}
				}

				return true;

			};

			//设置权限
			def.$init_jurisdiction = function (vm,type,succ,err) {

				//打开load层
				wx.showLoading({title:'加载中',mask:true});
				//取得权限列表
				vm.$api.base.jurisdiction_list('',e=>{
					
					var jurisdiction_list = e.jurisdiction_list[type];

					var user_type = vm.$cache.get('user_info').user_type;

					for(var i in jurisdiction_list.value){
						if(jurisdiction_list.value[i]==user_type){
							//关闭load层
							wx.hideLoading();
							succ();
							return;
						}
					}
					//关闭load层
					wx.hideLoading();
					err!=undefined?err():[];

				},vm);
				
			}

			//计时器
			def.$setout=function(fun,time){
				setTimeout(fun,time);
			};

			//金额加逗号
			def.$add_money=function(my,_this){

				var is_fnum =false;

				//转未字符串
				my = my.toString();

				//是否为数字
				if(!_this.$app().isNumber(my))return my;

				
				//是否为负数
				if(my.indexOf("-") != -1){
					my=my.substring(1,my.length);
					is_fnum=true;
				}

				//拆分为单个字符
				var spMy = my.split('');

				var newMy = '';

				var k=1;

				for(var i=spMy.length;i>0;i--){
					
					newMy=spMy[i-1]+newMy;
					if(k%3==0){
						if(k!=spMy.length){
							newMy=','+newMy;
						}
					}
					k++;

				}

				//负数加上-
				is_fnum?newMy='-'+newMy:'';

				//返回数据
				return newMy;
				
			},

			//任务队列
			def.$nextRegister=function(){

				var args = arguments;
				var count = 0;
				var comm = {};
				function nextTime(){
						count++;
						if(count < args.length){
								if(args[count] && Object.prototype.toString.call(args[count]) == '[object Function]'){
										args[count](comm,nextTime);
								}
						}
				}
				if(args[count] && Object.prototype.toString.call(args[count]) == '[object Function]'){
						args[count](comm,nextTime);
				}  
				
			},

			//取得下级部门
			def.$leve_senior=function(vm,data){

				vm.$api.framework.tree({flg:1},e=>{
					
					var framework_list = e.framework_tree[e.framework_tree[0][0].framework_id],
							new_framework = [];

					//剔除类型不是公司的数据
					for(var i in framework_list){
						if(framework_list[i].framework_type==2){
							new_framework.push(framework_list[i]);
						}
					}
					
					//回调
					data(new_framework);
					
				},vm);

			}

			//取得当前日期
			def.$get_date=function(){

				var myDate = new Date();

				return {
					n:myDate.getFullYear(),
					y:function(){
						var y = myDate.getMonth()+1;
						if(y<10) y = '0'+y;
						return y;
					}(),
					r:function(){
						var y = myDate.getDate();
						if(y<10) y = '0'+y;
						return y;
					}(),
				}

			}

		},
		extendPageAfter: function (name, def, modules){

			//获取点击参数
			def.$get_para = function(e){
				return e.currentTarget.dataset;
			}

			//校验数据
			def.$checkData = function(v){
				return v==''||v==undefined||v==null;
			}
			
			//获取所有的用户类型
			def.$get_user_type = function(_this,bc){
				_this.$api.base.user_type('',e=>{
					bc(e.user_type)
				},_this);
			}

			//获取自身可添加的用户类型
			def.$get_add_user_type = function(_this,bc){

				var user_info = _this.$cache.get('user_info');

				_this.$api.base.user_type('',e=>{

					var user_type = e.user_type;
					var new_user_type = Array();
					var ts_user_type = Array();

					//拆出前台财务
					for(var i in user_type){
						if(i<user_type.length-2){
							new_user_type.push(user_type[i])
						}else{
							ts_user_type.push(user_type[i]);
						}
					}

					//根据自身类型取得可添加的角色
					switch(user_info.user_type){
						case 1:
							new_user_type.push(...ts_user_type);
							bc(new_user_type);
						break;
						case 2:
							new_user_type.push(...ts_user_type);
							bc(new_user_type.splice(1,new_user_type.length));
						break;
						case 3:
							bc(new_user_type.splice(2,new_user_type.length));
						break;
						case 4:
							bc(new_user_type.splice(3,new_user_type.length));
						break;
					}

				},_this);

			}

		}
	},
	onLaunch: function(opts) {
		
	},
	
	onShow: function () {
		// Do something
	},

	//校验授权
	check_grant(key){
		return new Promise((resolve, reject)=>{
			var state = false;
			wx.getSetting({
				success (res){
					if (res.authSetting['scope.'+key]) {
					state = true;
					resolve(state);
					}else{
					state = false;
					reject(state)
					}
				}
			})
		})
	},

	//登录与权限
	login(succ,_this){

		
		if(_this.$cache.get('_t')!=null&&_this.$cache.get('_t')!=''){

			//已登录回调
			succ!==undefined?succ():[];
			
			return;
		}


		//链式调用 
		new Promise((resolve, reject)=>{
			
			//微信登录
			wx.login({

				success:function(e){

					//登录
					_this.$api.user.wx_login({'code':e.code},e=>{

						//设置token
						wx.setStorageSync('_t',e._t);
					
						//设置token
						_this.$cache.set('_t',e._t);

						_this.$cache.set('user_info',e.user_info);

						//登录成功后回调
						succ!==undefined?succ():[];

						resolve();

					},_this);

				}
		
			})

		}).then(()=>{
			
			//改变登录状态
			this.gData.is_login=true;

			//判断是否授权
			this.check_grant('userInfo').then((e)=>{

				//获取微信用户信息
				wx.getUserInfo({
					success:e=>{

						//获取用户信息
						_this.$api.user.wx_info({
							'avatar':JSON.parse(e.rawData).avatarUrl
						},e=>{

							//设置公共数据
							this.gData.aut_userinfo=true;

							//app实例初始化完成后的回调
							if(this.employIdCallback){
								this.employIdCallback(this.gData);
							}

						},_this);

					}
				})

			}).catch((e)=>{

			//没有授权的处理在这
			this.gData.aut_userinfo=false;

			//app实例初始化完成后的回调
			if(this.employIdCallback){
				this.employIdCallback(this.gData);
			}

			})

		}).catch(()=>{

			wx.showToast({
			title: '登录失败',
			icon:'none',
			duration: 2000
			})

			//app实例初始化完成后的回调
			if(this.employIdCallback){
			this.employIdCallback(this.gData);
			}

		})
	},
	gData:{
		aut_userinfo:false,
    is_realname_phone: false,
	},
	isNumber:function(val) {
		var regPos = /^\d+(\.\d+)?$/; //非负浮点数
		var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
		if(regPos.test(val) || regNeg.test(val)) {
			return true;
		} else {
			return false;
		}
	}
  
})
