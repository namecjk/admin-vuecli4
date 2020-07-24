//在根目录下创建vue.config.js,如下配置：
// module.exports = {
//     devServer: {
//       proxy: {  
//         '/api': {//106.52.151.159:3000/api
//         //   target: 'http://v.juhe.cn/toutiao/index?type=top&key=6ce0c6218675cd56890affac9a655daf', //路径指向本地主机地址及端口号
//           target: 'http://106.52.151.159:8080/api', //路径指向本地主机地址及端口号
//         //   target: 'http://localhost:4949/api', //路径指向本地主机地址及端口号
//           ws: true, 
//           changeOrigin: true,
//           pathRewrite:{
//               '^/api': '' //路径转发代理
//           }
//         }
//       }
//     }
//   }

  module.exports = {
    devServer: {
      proxy: {  
        [process.env.VUE_APP_API]: {//106.52.151.159:3000/api
        //   target: 'http://v.juhe.cn/toutiao/index?type=top&key=6ce0c6218675cd56890affac9a655daf', //路径指向本地主机地址及端口号
          target: 'http://106.52.151.159:8080/api', //路径指向本地主机地址及端口号
        //   target: 'http://localhost:4949/api', //路径指向本地主机地址及端口号
          ws: true, 
          changeOrigin: true,
          pathRewrite:{
              // ['^' + process.env.VUE_APP_API ]: '' //路径转发代理
              [`^${process.env.VUE_APP_API}`]: '' //路径转发代理
          }
        }
      }
    }
  }