import { MessageBox } from 'element-ui';
export default {

    install(Vue,options){
        Vue.prototype.globalDelete = (params) => {
            console.log(options + '--------------options')
            MessageBox.confirm(params.msg, params.warn || '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  //判断 
                  params && params.fn()
                  params.root.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }).catch(() => {
                params.root.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });

        }
    }
}