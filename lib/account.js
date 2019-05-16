import request from './request';
import g from './upload';

export default{

    //用户及公共接口
    user:{

        //登录接口
        login: (para, data, _this) => request.request('api/user/login', para, e => { data(e) },undefined,_this),
        
        //退出登录
        logout: (para, data, _this) => request.request('api/user/logout', para, e => { data(e) }, undefined, _this),

        //设置微信信息
        wx_info: (para, data, _this) => request.request('api/user/wx_info', para, e => { data(e) },undefined,_this),

        //设置微信信息
        subordinate: (para, data, _this) => request.request('api/user/subordinate', para, e => { data(e) },undefined,_this),

        //添加用户
        add: (para, data, _this) => request.request('api/user/add', para, e => { data(e) },undefined,_this),

        //取得当前用户可添加的角色类型
        role: (para, data, _this) => request.request('api/user/role', para, e => { data(e) },undefined,_this),

        //业绩和总上访
        total: (para, data, _this) => request.request('api/user/total', para, e => { data(e) },undefined,_this),

        //业绩和总上访
        del: (para, data, _this) => request.request('api/user/del', para, e => { data(e) },undefined,_this),

        //业绩和总上访
        wx_login: (para, data, _this) => request.request('api/user/wx_login', para, e => { data(e) },undefined,_this),

        //业绩和总上访
        info: (para, data, _this) => request.request('api/user/info', para, e => { data(e) },undefined,_this),

        //修改用户信息
        upd: (para, data, _this) => request.request('api/user/upd', para, e => { data(e) },undefined,_this),

        //取得部门用户列表
        framework: (para, data, _this) => request.request('api/user/framework', para, e => { data(e) },undefined,_this),

        //修改自己密码
        my_pwd: (para, data, _this) => request.request('api/user/my_pwd', para, e => { data(e) },undefined,_this),

        //业务用户搜索
        business: (para, data, _this) => request.request('api/user/business', para, e => { data(e) },undefined,_this),

        //用户还原
        reset: (para, data, _this) => request.request('api/user/reset', para, e => { data(e) },undefined,_this),

        //用户还原
        reset: (para, data, _this) => request.request('api/user/reset', para, e => { data(e) },undefined,_this),

        //取得已删除的用户
        subordinate_del: (para, data, _this) => request.request('api/user/subordinate_del', para, e => { data(e) },undefined,_this),

        //搜集form_id
        get_form_id: (para, data, _this) => request.request('api/user/get_form_id', para, e => { data(e) },undefined,'no_this'),

    },

    framework:{

        //取得部门下级
        tree: (para, data, _this) => request.request('api/framework/tree', para, e => { data(e) },undefined,_this),

        //取得部门下级
        framework: (para, data, _this) => request.request('api/framework/framework', para, e => { data(e) },undefined,_this),

        //添加部门
        add: (para, data, _this) => request.request('api/framework/add', para, e => { data(e) },undefined,_this),

        //添加部门
        del: (para, data, _this) => request.request('api/framework/del', para, e => { data(e) },undefined,_this),

        //添加部门
        upd: (para, data, _this) => request.request('api/framework/upd', para, e => { data(e) },undefined,_this),

        //还原部门
        reset: (para, data, _this) => request.request('api/framework/reset', para, e => { data(e) },undefined,_this),

    },

    base:{

        //取得用户类型
        user_type: (para, data, _this) => request.request('api/base/user_type', para, e => { data(e) },undefined,_this),

        //取得权限列表
        jurisdiction_list: (para, data, _this) => request.request('api/base/jurisdiction_list', para, e => { data(e) },undefined,_this),

        //取得权限列表
        get_oss_sign: (para, data, _this) => request.request('api/base/get_oss_sign', para, e => { data(e) },undefined,_this),

    },

    goods:{
        
        //商品列表
        goods: (para, data, _this) => request.request('api/goods/goods', para, e => { data(e) },undefined,_this),

    },

    achievement:{
        
        //添加业绩
        add: (para, data, _this) => request.request('api/achievement/add', para, e => { data(e) },undefined,_this),

        //取得所有业绩记录
        all_history: (para, data, _this) => request.request('api/achievement/all_history', para, e => { data(e) },undefined,_this),

        //取得我的业绩记录
        history: (para, data, _this) => request.request('api/achievement/history', para, e => { data(e) },undefined,_this),

        //提交退款
        refund: (para, data, _this) => request.request('api/achievement/refund', para, e => { data(e) },undefined,_this),

        //删除业绩
        del: (para, data, _this) => request.request('api/achievement/del', para, e => { data(e) },undefined,_this),

        //删除业绩
        reset: (para, data, _this) => request.request('api/achievement/reset', para, e => { data(e) },undefined,_this),

    },

    petition:{
        
        //添加上访
        add: (para, data, _this) => request.request('api/petition/add', para, e => { data(e) },undefined,_this),

        //取得所有上访记录
        all_history: (para, data, _this) => request.request('api/petition/all_history', para, e => { data(e) },undefined,_this),

        //取得我的上访记录
        history: (para, data, _this) => request.request('api/petition/history', para, e => { data(e) },undefined,_this),

    },

    total:{
        
        //商品列表
        total: (para, data, _this) => request.request('api/total/total', para, e => { data(e) },undefined,_this),

    },

    ranks:{
        
        //排行榜数据
        month: (para, data, _this) => request.request('api/ranks/month', para, e => { data(e) },undefined,_this),

    },

    detail:{

        //排行榜数据
        total: (para, data, _this) => request.request('api/detail/total', para, e => { data(e) },undefined,_this),

    },

    cases:{

        //添加案例
        add: (para, data, _this) => request.request('api/cases/add', para, e => { data(e) },undefined,_this),

        //案例列表
        subordinate: (para, data, _this) => request.request('api/cases/subordinate', para, e => { data(e) },undefined,_this),

        //我的案例列表
        my_subordinate: (para, data, _this) => request.request('api/cases/my_subordinate', para, e => { data(e) },undefined,_this),

        //取得案例详情
        info: (para, data, _this) => request.request('api/cases/info', para, e => { data(e) },undefined,_this),

        //删除案例
        del: (para, data, _this) => request.request('api/cases/del', para, e => { data(e) },undefined,_this),

        //复原案例
        reset: (para, data, _this) => request.request('api/cases/reset', para, e => { data(e) },undefined,_this),

    },

    upload:{

        //上传案例图片
        anli:(para,data,_this) => g.upload( para ,  "anli/" , e=>{data(e)} ,_this),

        //上传喜报图片
        xibao:(para,data,_this) => g.upload( para ,  "xibao/" , e=>{data(e)} ,_this),

        //上传知识库图片
        knowledge:(para,data,_this) => g.upload( para ,  "knowledge/" , e=>{data(e)} ,_this),

    },

    congratulate:{

        //添加案例
        tpl: (para, data, _this) => request.request('api/congratulate/tpl', para, e => { data(e) },undefined,_this),

        //添加喜报
        add: (para, data, _this) => request.request('api/congratulate/add', para, e => { data(e) },undefined,_this),
        
        //喜报列表
        subordinate: (para, data, _this) => request.request('api/congratulate/subordinate', para, e => { data(e) },undefined,_this),

        //我的喜报列表
        my_subordinate: (para, data, _this) => request.request('api/congratulate/my_subordinate', para, e => { data(e) },undefined,_this),

        //删除喜报
        del: (para, data, _this) => request.request('api/congratulate/del', para, e => { data(e) },undefined,_this),

        //恢复喜报
        reset: (para, data, _this) => request.request('api/congratulate/reset', para, e => { data(e) },undefined,_this),

    },

    complain:{

        //添加客诉
        add: (para, data, _this) => request.request('api/complain/add', para, e => { data(e) },undefined,_this),

        //全部客诉
        all_history: (para, data, _this) => request.request('api/complain/all_history', para, e => { data(e) },undefined,_this),

        //我的客诉
        history: (para, data, _this) => request.request('api/complain/history', para, e => { data(e) },undefined,_this),

        //删除客诉
        del: (para, data, _this) => request.request('api/complain/del', para, e => { data(e) },undefined,_this),

        //删除客诉
        reset: (para, data, _this) => request.request('api/complain/reset', para, e => { data(e) },undefined,_this),

    },

    knowledge:{

        //添加文章
        add: (para, data, _this) => request.request('api/knowledge/add', para, e => { data(e) },undefined,_this),

        //文章详情
        info: (para, data, _this) => request.request('api/knowledge/info', para, e => { data(e) },undefined,_this),

        //文章列表
        subordinate: (para, data, _this) => request.request('api/knowledge/subordinate', para, e => { data(e) },undefined,_this),

        //文章详情
        info: (para, data, _this) => request.request('api/knowledge/info', para, e => { data(e) },undefined,_this),

        //我的文章详情
        my_subordinate: (para, data, _this) => request.request('api/knowledge/my_subordinate', para, e => { data(e) },undefined,_this),

        //删除文章
        del: (para, data, _this) => request.request('api/knowledge/del', para, e => { data(e) },undefined,_this),

        //恢复文章
        reset: (para, data, _this) => request.request('api/knowledge/reset', para, e => { data(e) },undefined,_this),

    }

    
}