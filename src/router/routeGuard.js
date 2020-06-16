import router from "../router";
import cookies from 'cookiesjs';

// 白名单
let whiteRouter = ['/login'];

router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    if (cookies('token')) {
        console.log('存在')
        if (to.path == '/login') {
            // 清空token和username
            cookies({token : null})
            cookies({userName : null})
            next();
        }else{
            next();//token 存在就执行 next()  默认执行to的地址，而to的地址就是你路由设置调转的console地址 
        }
    }else{
        console.log('不存在')
        if (whiteRouter.indexOf(to.path) !== -1) {// 不等于 -1  包含
            console.log('包括 --------- 结束');
            next();
        }else{
            console.log('不包括 --------- 跳转')
            next('/login');
        }
    }

})