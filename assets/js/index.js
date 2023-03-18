$(function(){
    //调用此函数获取用户基本信息
    getUserinfo()
    var layer = layui.layer
    $('#btnlogout').on('click',function(){
        console.log(123);
        layer.confirm('is not?', {icon: 3, title:'提示'}, 
        function(index){
            //do something
                // 1.清空本地储存的token
                localStorage.removeItem('token')
                // 2.重新跳转到登录页面
                location.href='/login.html'
                //关闭confirm询问框
            layer.close(index);
          });
    })
})
//获取用户基本信息
function getUserinfo(){
    $.ajax(
        {
            method: 'GET',
            url: '/my/userinfo',
            //headers 就是请求头配置对象
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res){
                if(res.status !== 0){
                    return layui.layer.msg('获取用户信息失败')
                }
                renderAvatar(res.data)
            }
            // 无论成功或失败都会调用此回调函数
            // complete: function(res){
            //     //调试
            //     // console.log('执行了');
            //     console.log(res);
            //     //在complete回调中可以使用res.responseJSON拿到服务器响应回来的数据
            //     if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败!'){
            //         // 1.强制清空token
            //         localStorage.removeItem('token')
            //         // 2.强制跳转到登录页面
            //         location.href ='/login.html'
            //     }
            // }
        }
    )
}

// 渲染用户头像
function renderAvatar(user){
    // 1.获取用户名称
    var name =user.nickname || user.username
    // 设置欢迎文本
    
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    // 3按需渲染图片头像
    if(user.user_pic!==null)
    {
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }
    else{
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}