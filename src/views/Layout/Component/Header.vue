<template>
  <div>
    <div class="header-wrapper">
      <div class="menuIcon" @click="changeLists">
        <svg-icon svgName="menu" svgClass="asd" />
      </div>

      <div class="userInfo">
        <!-- <div class="userAndOut"> -->
        <div class="userAndHeader">
          <svg-icon svgName="header" svgClass="asd" />
          <div class="userName">{{getUserName}}</div>
        </div>

        <div class="line"></div>

        <div class="outbtn" @click="getOut">
          <svg-icon svgName="out" svgClass="asd" />
        </div>

        <!-- </div> -->
      </div>
    </div>
  </div>
</template>


<script>
import { reactive, toRefs, computed } from "@vue/composition-api";
// import cookies from 'cookiesjs'

export default {
  name: "Header",
  setup(props, { root }) {
    // 没有props  拿不到 root.$store
    let data = reactive({
      changeLists: () => root.$store.commit("app/SET_SHOWNAVLIST"), // 通过调用vuex中的mutations中的同步方法拿到state中的值
      // changeLists: () => root.$store.dispatch('changeNav', {'asd':123123123}), // 通过调用vuex中的mutations中的同步方法拿到state中的值
      getUserName: computed(() => root.$store.state.app.userName),
      getOut: () => {
        root
          .$confirm("此操作将退出登录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            root.$message({
              type: "success",
              message: "退出成功!"
            });
            // 退出
            root.$store.dispatch("app/exit").then(() => {
              root.$router.push('/login')
              console.log('退出成功');
            });
          })
          .catch(() => {
            root.$message({
              type: "info",
              message: "已取消退出"
            });
          });
    }
    });
    console.log(data.getUserName);
    console.log(root.$store.getters['app/SET_NUM']);
    return { ...toRefs(data) };
  }
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  background-color: #ffffff;
  width: 100%;
  height: 60px;
  box-shadow: 0px 5px 5px rgba(203, 203, 203, 0.5);

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 15px 0px 15px 15px;
  box-sizing: border-box;

  .userInfo {
    display: flex;

    .userAndHeader {
      display: flex;
      .userName {
        line-height: 25px;
        margin-left: 20px;
      }
    }
    .line {
      margin: 0px 0px 0px 30px;
      height: 100%;
      border: 1px solid #eeeeee;
      + .outbtn {
        text-align: center;
        width: 60px;
      }
    }
  }
}
</style>