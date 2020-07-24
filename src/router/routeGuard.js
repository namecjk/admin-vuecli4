import router from "../router";
import cookies from 'cookiesjs';
import store from '@/store/index'
import {dynamicRoutes} from "@/router/index";


// 白名单
let whiteRouter = ['/login'];

// 账户 、token 这里定义的cookies在下面第一次打开页面会取不到值
// let data = {userName:cookies('userName'),token:cookies('token')};
// console.log(data);

router.beforeEach((to, from, next) => {//to:即将要进入的目标 路由对象  from: 当前导航正要离开的路由    
        // 参数3 to, from, next
        // to === 即将要去的页面  打印出来看
        // from === 从哪个页面去哪个页面
    if (cookies('token')) {
        console.log('token存在')
        if (to.path == '/login') {
            // 清空token和username
            cookies({token : null})
            cookies({userName : null})
            next();
        }else{
            console.log(333333);
            let userName = cookies('userName');
            let token = cookies('token');
            const account = {userName,token};
                if(account.userName == undefined || account.token == undefined) return console.log(`账户token错误--------userName=${account.userName}-----------token=${account.token}`);
                //调用vuex里的方法，将数组存入vuex中的state中,成功回调后，通过vuex中的getters方法拿到刚才存入的state的值
                if(store.getters['dynamicRoutes/getRouterRole'].length === 0){
                    console.log(111111);
                    store.dispatch('dynamicRoutes/setRouterRole',account).then(res=>{//到这一步说明，以及将角色信息存入store的state中，然后循环动态路由，匹配角色信息是否存在
                            let role = res;//拿到角色的信息，再条用vuex创建和保存动态路由
                            store.dispatch('dynamicRoutes/createDynamicRoutes',role).then(()=>{
                                //到这一步说明已经根据角色信息，将动态路由和默认路由拼接成功，通过getter方法取
                                let AllRoutesCreated = store.getters['dynamicRoutes/getAllRouters'];//拼接好的所有路由-调用路由更新
                                let dynamicRoutesCreated = store.getters['dynamicRoutes/getDynamicRoutesWraper'];//过滤好的动态路由-调用添加动态路由的VUE官方API
                                // 更新路由
                                router.options.routes = AllRoutesCreated//router.options.routes 是拿到默认展现的路由参数，然后再将匹配好的所有参数赋值给它，达到更新效果
                                console.log(router.options.routes);
                                // 将404路由也添加进过滤好的动态路由当中
                                dynamicRoutesCreated.push(dynamicRoutes[dynamicRoutes.length - 1]);
                                // 添加动态路由的VUE官方API
                                router.addRoutes(dynamicRoutesCreated);
                                // 角色按钮
                                store.dispatch('dynamicRoutes/getRoleBtinInfo',account).then(()=>{
                                 // 到这一步说明已经拿到角色按钮信息并且保存到vuex中，在全局函数里面取就行
                                 // 调转路由
                                 next({...to,replace:true})//replace:true == 不记录历史页面
                                 // next({...to}) ==  next({path:'/login'}) || next('/login')
                                 // replace:true == 不记录历史页面
                                })
                               
                            })
                    }).catch(err=>{
                        console.log(err);
                    })
                }else{
                    console.log(44444);
                    // console.log(router.options.routes);
                    next();
                }
            // next();//token 存在就执行 next()  默认执行to的地址，而to的地址就是你路由设置调转的console地址 
        }
    }else{
        console.log('token不存在')
        if (whiteRouter.indexOf(to.path) !== -1) {// 不等于 -1  包含
            // console.log('包括 --------- 结束');
            next();
        }else{
            // console.log('不包括 --------- 跳转')
            next('/login');
        }
    }

})