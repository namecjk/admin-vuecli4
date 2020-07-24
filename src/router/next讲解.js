// 需求：判断用户登录状态，如果正确就进入，如果错误就返回登录页面

// 错误
// router.beforeEach((to, from, next) => {
//     //判断登录状态简单实例
//     var userInfo = window.localStorage.getItem('token');
//     if (userInfo) {
//         next();
//     } else {
//         next('/login');  //这里会存在死循环，必须判断to == login的时候 next() 否则在 next('/login')
//     }
// })


/**
 * 正确
    to: Route: 即将要进入的目标路由对象
    from: Route: 当前导航正要离开的路由
    next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
*/ 
router.beforeEach((to, from, next) => {
    var userInfo = window.localStorage.getItem('token');//获取浏览器缓存的用户信息
    if(userInfo){ //如果有就直接到首页咯
        next();
    } else {
        if(to.path=='/login'){ //如果是登录页面路径，就直接next()
            next();
        } else { //不然就跳转到登录；
            next('/login');
        }

    }
})
/*
next()注意

当用户输入的页面不存在时我们统一跳转到根路径（'/'路径），所以必须要判断（if(to.path == '/'){ next() }），
不然当我们直接访问根路径时会陷入死循环，导致页面无法显示；
*/ 