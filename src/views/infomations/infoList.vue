<template>
  <div class="wrapper">
    <!-- infoList -->
    <el-row type="flex" justify="space-around" style="width:100%;">
      <!-- optionsType -->
      <el-col :span="4">
        <div class="optionsType-wrapper infoListWrapper">
          <label class="words infoListWords">类型:</label>
          <div class="optionsType">
            <el-select v-model="optionsTypeValue" placeholder="请选择" size="small">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.classParent_Name"
                :value="item.classParent_Name"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <!-- optionsDate  -->
      <el-col :span="9">
        <div class="optionsDate-wrapper infoListWrapper">
          <label class="words infoListWords">日期:</label>
          <div class="optionsDate">
            <el-date-picker
              v-model="optionsDateValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <!-- searchKeyword -->
      <el-col :span="7">
        <!-- <div class="searchKeyword-wrapper infoListWrapper">
          <label class="words infoListWords">关键词:</label>
          <div class="searchKeyword">
            <el-select v-model="searchKeywordValue" placeholder="请选择" size="small">
              <el-option
                v-for="item in optionsSearchKeyword"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </div>
          <div class="searchInput">
            <el-input
              v-model="searchInput"
              placeholder="请输入内容"
              size="small"
            ></el-input>
          </div>
        </div> -->
          <SearchVue :data="ChildrenSearchDatas" @childrenClick="searchNow.search"/>
      </el-col>
      <el-col :span="4">
        <div class="btnAdd">
          <!-- <el-button type="danger" size="small" @click="searchNow.search">搜索</el-button> -->
          <el-button type="success" size="small" @click="dialog" v-ShowBtn="'infoList.add'" class="hideBtn">新增</el-button>
        </div>
      </el-col>
    
    </el-row>
    <!-- 占位高度 -->
    <div class="heightSpace"></div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        size="mini"
        v-loading="loading"
        :data="displayData"
        border
        style="width:99%;box-sizing: border-box;"
        :cell-style="{'text-align':'center'}"
        :header-cell-style="{'text-align':'center'}"
        @row-click="currentClick"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="标题" width="300"  ></el-table-column>
        <el-table-column prop="classify" label="类别" sortable></el-table-column>
        <el-table-column prop="time" label="日期" sortable></el-table-column>
        <el-table-column prop="roleTitle" label="管理人"  sortable></el-table-column>
        <el-table-column prop label="新增" type="index" width="240" > -->
          <!-- template slot-scope="scope"代表可以传参当前被点击的参数 -->
          <template slot-scope="scope"> 
          <el-button   type="danger" size="small" index="delete" @click="deletePresent(scope)" v-ShowBtn="'infoList.delete'" class="hideBtn">删除</el-button>
          <el-button  type="success" size="small" @click="EditPresent(scope)" v-ShowBtn="'infoList.edit'" class="hideBtn">编辑</el-button>
          <!-- HTML 设置 跳转方式 -->
          <!-- <router-link :to="{name:'EditCurrentData',query:{id:scope.$index,title:scope.row.title}}">
          <el-button type="success" size="small">编辑详情</el-button> 
          </router-link> -->
          <!-- 点击事件 设置 跳转方式 -->
           <el-button  type="success" size="small" @click="EditDetailPages.EditDetail(scope)" v-ShowBtn="'infoList.details'" class="hideBtn">编辑详情</el-button> 
          </template>
        </el-table-column>
      </el-table>

      <!-- table组件 -->
    <!-- <TableVue :data="tableVueDatas">
        <template v-slot:newAdd="tableVueData">
           <el-button type="danger" size="small" index="delete" @click="deletePresent(tableVueData.data.scope)">删除</el-button>
           <el-button type="success" size="small" @click="EditPresent(tableVueData.data.scope)">编辑</el-button>
           <el-button type="success" size="small" @click="EditDetailPages.EditDetail(tableVueData.data.scope)">编辑详情</el-button> 
        </template>
    </TableVue> -->

    </div>
    <!-- 占位高度 -->
    <div class="heightSpace"></div>
    <!-- footer -->
    <div class="footer">
      <div class="btn">
        <el-button size="small" @click="deleteAll" v-if="showBtn('infoList.selectDelete')">批量删除</el-button>
        <span
          style="fontSize:12px;margin-left:10px;"
        >已选 {{optionsNum.Selected}}/{{optionsNum.total}}</span>
      </div>
      <div class="pages">
        <!-- <el-pagination small background layout="prev, pager, next" :total="20"></el-pagination> -->
        <el-pagination
          small
          :disabled="disablePage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="8"
          layout="total, prev, pager, next"
          :total="totalPages"
        ></el-pagination>
      </div>
    </div>
    <!-- footer-end -->

    <!-- 新增弹窗组件 -->
    <!-- 需要操作复杂的步骤 可以使用emit中的回调函数  emit("dialogClose"), dialogClose=父组件 本页面 执行的函数名称 -->
    <addList
      :showDialog="dialogFormVisible"
      :ClassifyData="options"
      @dialogClose="close"
      :parsentEmail="emails"
      :parsentToken="tokens"
      :PresentClassify="optionsPresent"
      :parentDisplayData="displayData"
      @close="closed"
    />
    <!-- 如果只是需要修改一个值数据，可以使用sync修饰器方法 子组件直接调用emit中传值 父级.sync 自己update:父级属性名,传值改变
    update:showDialog,传值 语句改变  不需要使用回调函数-->
    <!-- <addList :showDialog.sync= dialogFormVisible   />  -->

    <EditList
          :ShowEditCurrentData="ShowEditCurrentData"
          :ClassifyData="options"
          @close="closed"
          :CurrentData="currentData"
          @editBack="editBacked"
          :parsentEmail="emails"
          :parsentToken="tokens"
     />
  </div>
</template>


<script>
// import TableVue from "@/components/TableVue";
import {
  reactive,
  toRefs,
  onMounted,
  watchEffect,
  ref
} from "@vue/composition-api";
import { globalVueT } from "@/utils/global_V3.0";
import { SearchChildUser } from "@/utils/Search.js";
import addList from "./addList/addList";
import EditList from "./EditList/EditList";
import cookies from "cookiesjs";
import SearchVue from '../../components/SearchVue/SearchVue';
export default {
  components: {
    addList,EditList,SearchVue
  },
  setup(props, { root }) {
    //通用属性PresentName 请求分页的数据
    let getPageListData = ref({
      email: cookies("userName"),
      token: cookies("token"),
      pageNo: 1, //请求第几页
      pageSize: 8 //每一页显示多少条
    });
    // 生命周期，组件加载完毕后
    onMounted(() => {
      if (data.emails && data.tokens) {//// 获取所有数组  -- 简单判断账户和token
        root.$store.dispatch("command/cmdGetPageList", getPageListData.value) //监听请求的所有数据，如果有变化就触发
          .then(res => {
            console.log("cmdGetPageList-----------");
            console.log(res);
            data.totalPages = res.arrayLength;//存储数组的总量
            data.loading = false;//转圈结束
            data.displayData = res.result;//渲染数组赋值
            data.displayData.forEach((item,i)=>item.currentId = i);
            data.optionsNum.total = data.displayData.length; //显示总共数量
          });
        // root.$store.dispatch("command/cmdGetClassify",data.Account) 
        //   .then(res => {
        //     console.log('1123123123');
        //     console.log(res);
        //   });
      } else {
        root.$message({ type: "info", message: "无效账户" });
      }
      // 设置通用属性账户和token
      data.currentAccount = { email: data.emails, token: data.tokens };
      // vuex 方式  给子组件传东西
      root.$store
        .dispatch("command/cmdGetClassify", data.currentAccount)
        .then(res => {
          //请求当前账户所有的数组所有的数据
          data.options = res; //传递给子组件的-----addlist子组件-选项分类名字需要  选当前页面选项中也需要
        });
      // vue3 自定义方式 可监听
      // root.$store.dispatch('command/cmdGetContentData',dataAccount).then(res=>{
      //   console.log('cmdGetContentData-----------')
      //   console.log(res)
      // });
      // vue3自定义函数并监听方式
      // comfirmGetClassify(dataAccount);//调用此方法让数据给到comfirmData.itemArr，watchEffect监听它并赋值;
    });

    // Vue3自定义函数封装并监听数据
    // const {comfirmData:aa,comfirmData:bb,comfirmData,comfirmGetClassify} = globalVueT();
    const { comfirmData: aa, comfirmData: bb } = globalVueT();
    watchEffect(() => {
      // 监听创建一个table组件的组件
        //  table组件的数据
        data.tableVueDatas.tabelData = data.displayData//  table组件的数据

      console.log("监听成功------------11----------watchEffect");
      data.optionsPresent = data.optionsTypeValue; //监听当前类型
      // data.options = comfirmData.itemArr;//监听并赋值给渲染数据 （类型） 下拉框
      // let PresentName = {
      //   email: data.emails,
      //   token: data.tokens,
      //   PresentName: data.optionsPresent
      // };
      // root.$store.dispatch("command/cmdGetAllClassData", PresentName)//监听请求的所有数据，如果有变化就触发
      //   .then(res => {
      //     console.log("cmdGetContentData-----------");
      //     console.log(res);
      //     data.displayData = res;
      //   });
    });

    // vu3自定义函数
    // const {getAllClassData} = useSearch().then(res=>{
    //   console.log('useSearchuseSearchuseSearchuseSearchuseSearch');
    //   console.log(res);
    // });
    
    //  useSearch();

    
   
    // 搜索功能模块,vue3单独抽离
    const searchNow = reactive({
        search:(childrenDataObj)=>{
          const {search} = SearchChildUser();
          let datas = {
            email:data.emails,
            token:data.tokens,
            optionsPresent:data.optionsPresent,//当前选择分类
            optionsDateValue0:data.optionsDateValue[0],//日期起至
            optionsDateValue1:data.optionsDateValue[1],//日期结束
            // searchKeywordValue:data.searchKeywordValue,//搜索值分类-父组件传递过来的
            searchKeywordValue:childrenDataObj.optionsClassifyData,//搜索值分类-父组件传递过来的
            searchInput:childrenDataObj.inputData//搜索框的值-父组件传递过来的
            }
          search(datas,root).then(res=>{
            data.displayData = res;//赋值渲染数组
            data.totalPages = res.length;//更改页码数据
            data.optionsNum.total = res.length//已选显示总数

          })
        }
    })
    
    // 编辑详情页面-跳转事件
    const EditDetailPages = reactive({
            EditDetail:(res)=>{  
              console.log(res);
              // js跳转路由方式 - query传参 刷新URL不消失参数
              // root.$router.push({
              //   name:'EditCurrentData',
              //   query:{
              //     id:res.row.id,
              //     title:res.row.title
              //   }
              // })

               // js跳转路由方式 - params传参 刷新URL参数会消失   但是参数隐藏
              // root.$router.push({
              //   name:'EditCurrentData',
              //   params:{
              //     id:res.$index,
              //     title:res.row.title
              //   }
              // })

               // js跳转路由方式 - params传参 刷新URL参数会消失 页面刷新参数不会丢失 路由router要设置参数占位 
              //  root.$router.push({
              //   path:`/EditCurrentData/${res.$index}/${res.row.title}`
              // })

              // vuex + html5  实现
              // 先存数组到vuex - state
               let params = {
                  id:{
                    value:res.$index,
                    sesstion:true,
                    sessionName:'infoId'
                  },
                  title:{
                    value:res.row.title,
                    sesstion:true,
                    sessionName:'infoTitle'
                  },
                  classify:{
                    value:res.row.classify,
                    sesstion:true,
                    sessionName:'infoClass'
                  },
                  content:{
                    value:res.row.content,
                    sesstion:true,
                    sessionName:'infoContent'
                  },
                  time:{
                    value:res.row.time,
                    sesstion:true,
                    sessionName:'infoTime'
                  },
                   img:{
                    value:res.row.img,
                    sesstion:true,
                    sessionName:'infoImg'
                  }
                }
              root.$store.commit('EditDetail/SET_STATE_ALL',params);
              // root.$store.commit('EditDetail/SET_STATE_ID',{
              //       value:res.$index,
              //       sesstion:true,
              //       sessionName:'infoId'
              //     })
              // root.$store.commit('EditDetail/SET_STATE_TITLE',{
              //       value:res.row.title,
              //       sesstion:true,
              //       sessionName:'infoTitle'
              //     }); 
              // 再跳转
              root.$router.push({
                name:'EditCurrentData',
              })
          }
    });
   
   // 数据
    const data = reactive({
      asd:false,
      // 方法
      // 使用Vue原型注如全局方法调用
      // deletePresent:() => root.globalDelete({root,msg:'确定删除(本条信息)，删除后无法恢复！！！',warn:'警告',fn:data.delete}),
      // deleteAll:() => root.globalDelete({root,msg:'确定删除(选中信息)，删除后无法恢复！！！'}),
      // delete:() => console.log('删除删除删除删除'),
      //分页事件
      handleSizeChange: val => {//每一页的数量发生变化触发
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange: val => {//点击页码触发val是当前页面，分页事件
        console.log(`当前页: ${val}`);
        data.loading = true;//让请求转圈转起来
        data.disablePage = true;//让按钮禁用防止恶意点击
        getPageListData.value.pageNo = val; //改变页页码数
        root.$store
          .dispatch("command/cmdGetPageList", getPageListData.value)
          .then(res => {
            setTimeout(()=>{data.loading=false;data.disablePage=false;},2000); //2秒执行-取消转圈 解除禁用按钮
            data.displayData = res.result; //改变渲染的数组=当前页码数
            data.optionsNum.total = data.displayData.length; //显示总共数量
          });
      },
      // 全局引用方法-Vue3.0响应式写法可监听
      currentClick: row => {//table方法，把当前被点击的对象放进一个通用数据中
        //table中的点击方法
        console.log(row);
        data.currentData = row; //把当前被点击的对象放进一个通用数据中
      },
      handleSelectionChange: val => { //勾选批量删除，val是勾选的值,这是table表格中的方法
        console.log(val);
        data.selectDeleteArr = val; //存入一个数组中
        data.optionsNum.Selected = data.selectDeleteArr.length; //批量显示数字
      },
      deletePresent: index => { //删除当前数据-按钮
        data.deleteState = "deletePresent";
        aa.globalDelete(root, {
          index,
          msg: "确定删除(本条信息)，删除后无法恢复！！！",
          warn: "警告",
          fn: data.delete,
          dd:index
        });
      },
      EditPresent: (res) =>{
        console.log(res);
        data.currentData = res.row
        data.ShowEditCurrentData = !data.ShowEditCurrentData;
        console.log(data.ShowEditCurrentData);
      },
      deleteAll: () => {//批量删除数据-按钮
        data.deleteState = "deleteAll";
        if (data.selectDeleteArr.length <= 0)
          return root.$message({ type: "info", message: "请选择" });
        bb.globalDelete(root, {
          id: 22,
          msg: "确定删除(选中信息)，删除后无法恢复！！！",
          warn: "警告",
          fn: data.delete
        });
      },
      delete: (vueData) => {//单个删除和批量删除，都会执行本函数，通过变量来判断点击是哪个按钮
        // 删除装填判断
        if (data.deleteState == "deletePresent") {
        // 请求所有数组
        root.$store.dispatch('command/cmdGetAllClassData',data.currentAccount).then(res=>{
                  let resultArr = res.resultFind == undefined ? res.childRes[0].ClassNameAllData : res.resultFind[0].ClassNameAllData;//拿到所有数据
                  resultArr.reverse();//颠倒数组，不然id是倒的
                  resultArr.forEach((item, i) => (item.currentId = i)); //被触发一次就循环一次索引，提供给splice删除方法的起始位置
                  // resultArr.splice(data.currentData.currentId, 1); //执行删除
                  let arr = resultArr.filter(item => item.title ==  vueData.row.title);//拿到删除的id
                  resultArr.splice(arr[0].currentId, 1);//执行删除 
                  data.displayData.splice(arr[0].currentId, 1)//显示数据假删除
                  data.currentAccount["parentDisplayDatas"] = resultArr; //添加提交给数据库的更新数组 删除完后
                  data.totalPages = resultArr.length//改变显示总共多少条
                  resultArr.reverse();//颠倒回来
                      //调更新api
                      root.$store
                      .dispatch("command/cmdSetClassify", data.currentAccount)
                      .then(res => {
                        console.log(
                          "delete---deletePresent--------单个删除----成功回调函数"
                        );
                        console.log(res);
                      });
        });
          //批量删除状态
         } else if (data.deleteState == "deleteAll") {
          //批量删除状态
          console.log("删除成功------deleteAll");
          root.$store.dispatch("command/cmdGetAllClassData", getPageListData.value).then(res=>{//先请求到所有的数据
                let allData = res.childRes[0].ClassNameAllData;
                  data.selectDeleteArr.forEach(selectDeleteArr => {//勾选的数量已被存入通用data.selectDeleteArr中,先循环勾选的数量，勾选几个就循环几次删除
                   allData.forEach((allDataItem, i) => {//再循环所有的数据
                      if (allDataItem.title == selectDeleteArr.title) {//循环过程中如果与title相等，就执行删除
                        allData.splice(i, 1); //执行删除
                      }
                    });
                  });
                   // 调用更新接口
                  data.currentAccount["parentDisplayDatas"] = allData; //添加提交给数据库的更新数组 删除完后
                  root.$store.dispatch("command/cmdSetClassify", data.currentAccount).then(res => {
                      console.log("delete-----deleteAll------批量删除----成功回调函数");
                      console.log(res);
                      root.$store.dispatch("command/cmdGetPageList", getPageListData.value).then(allres=>{
                          data.displayData = allres.result;
                      })
                    });
          });
        }
      },
      dialog: () => { //新增点击事件
        data.dialogFormVisible = !data.dialogFormVisible;
      },
      close: (res,obj) => {//接收子组件传递过来的回调函数
        data.dialogFormVisible = false;
        data.totalPages = res;//子组件传递过来的最新总共数组长度
        data.displayData.splice(0,0,obj);//假添加数据 实现马上显示
      },
      closed:(datas)=>{//只关闭窗口
        if (datas == 'edit') {//编辑窗口关闭
          console.log('edit    for    closed ');
          data.ShowEditCurrentData = false;
        }else{//添加数据关闭
              data.dialogFormVisible = false;
        }
      },
      editBacked:(currentData)=>{//编辑子组件回调函数
        console.log('-----------------editBacked----------');
        root.$store.dispatch('command/cmdGetAllClassData',data.Account).then(res=>{
          let all = res.resultFind == undefined ? res.childRes[0].ClassNameAllData : res.resultFind[0].ClassNameAllData;;//拿到所有数据
          all.reverse();//颠倒数组，不然子组件传过来的id对不上
          all.forEach((item,i)=>item.currentId = i);//保证每个对象id正常，循环一遍
          let oldData = all.filter(item => item.currentId == currentData.currentId);//过滤出当前被点击的对象，没被修改的；
          // 在拿当前页面渲染的数据要找
          if (oldData.length == 0) return console.log('!!!oldData------失败---id有问题');
          all.forEach(item =>{
             if (oldData.length == 0) return;
                if (item.title == oldData[0].title){
                  console.log('item.title == oldData[0].title');
                    item.title = currentData.title;
                    item.content = currentData.content;
                    item.currentId = currentData.currentId;
                    item.time = root.$store.state.app.dateToString();
                    console.log(item);

                    // 判断是否有管理员名称
                    if(item.roleTitle == undefined || item.roleTitle == ''){
                      console.log(22);
                        item.roleTitle = data.emails || '管理员名有误';
                    }else{
                      item.roleTitle = data.emails || '管理员名有误';
                    }
                    console.log(item);
                }
          });
          //提交更新api
          let parentDisplayDatas = all;
          console.log(parentDisplayDatas);
          let dataAccount = {email:data.emails,token:data.tokens,parentDisplayDatas};//配置更新API需要的参数
           root.$store.dispatch('command/cmdSetClassify',dataAccount).then(()=>{
              console.log('编辑调用api----更新成功-----');
                   data.displayData.forEach((item,i) => {//假修改数据，不用请求api，向界面显示修改后的数据
                      if(oldData[0].currentId == item.currentId){
                        data.displayData.splice(i,1,oldData[0])
                      }
                     });
              data.ShowEditCurrentData = false;
           });
        })
      },
      // 数据
      tableVueDatas:{
         titleOptions: [
           {
            prop: "title",
            label: "标题"
           },
           {
            prop: "classify",
            label: "类别"
           },
           {
            prop: "time",
            label: "日期"
           },
           {
            prop: "name",
            label: "管理人"
           },
           {
            prop: "",
            label: "新增",
            displayType: "slot",
            slotName: "newAdd"
           }
         ],
         tabelData:[]
      },//给tabale组件的数据
      routerList: root.$router,//路由地址-拿到路由参数
      emails: cookies("userName"),
      tokens: cookies("token"),
      ShowEditCurrentData:false,
      totalPages:null,//用来存储总共数组的数量容器
      disablePage:false,//是否禁用页码按钮
      loading: true, //表格的加载样式 默认转圈
      currentAccount: {}, //当前账户token的容器，生命周期开始就设置好了
      selectDeleteArr: [], //选择多个删除容器
      deleteState: "", //删除按钮状态
      displayData: [], //渲染数据数组
      currentData: {}, //table当前被点击的对象
      dialogFormVisible: false,
      optionsTypeValue: "", //控制类型的名字
      optionsPresent: "", //控制当前类型名字
      optionsDateValue: "", //控制日期的名字
      searchKeywordValue: "ID",
      // searchInput: "",
      options: [],
      ChildrenSearchDatas: {
            options:[
                  {
                    value: "选项1",
                    label: "ID"
                  },
                  {
                    value: "选项2",
                    label: "标题"
                  }
                ],
          click:'childrenClick'
          },
      tableData: [
        {
          date: "2016-05-02 19:20:31",
          name: "马子",
          address:
            "阿斯达三大阿斯达阿斯达阿斯达阿斯达阿斯达as的1518弄阿斯达阿斯达as大萨达"
        },
        {
          date: "2016-05-04 19:20:31",
          name: "李四",
          address: "师德师风三顿饭三顿饭但是防守打法胜多负弄"
        },
        {
          date: "2016-05-01 19:20:31",
          name: "张三",
          address: "情味二二ter地方地方三大弄"
        }
      ],
      Account: { email: cookies("userName"), token: cookies("token") },
      optionsNum: { Selected: 0, total: 10 }, //批量选择显示数量双向绑定
      pickerOptions: { //日期快捷键数据
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
    });

    return { ...toRefs(data), getPageListData,searchNow,EditDetailPages};
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main.scss";
.infoListWrapper {
  @include infoListWrapper();
}
.infoListWords {
  @include infoListWords();
}
.wrapper {
  font-size: 14px;
  color: #344a5f;
  width: $fullCount;
  height: $fullCount;
     display: flex;
    flex-direction: column;
    justify-content: space-around;

  .optionsType-wrapper { // 选择分类容器
    // .optionsType {
    //   width: 200px;
    // }
    .words {
      width: 45px;
    }
  }
  .optionsDate-wrapper {// 选择日期容器
    display: flex;
    flex-direction: row;
    justify-content: center;
    // .optionsDate {
    //   // width: $infolistWidth;
    // }
    .words {
      width: 40px;
    }
  }
  .btnAdd {//搜索和新增按钮 容器
    // .el-button{
    //   width: 100px;
    // }
    display: flex;
    flex: row;
    justify-content: center;
  }
  .footer { //底部容器
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .table {
    width: $fullCount;
  }
  .heightSpace {
    height: $spaceHeight;
  }
}
</style>
<style> 
button.hideBtn{display: none;}
button.showBtn{display: inline-block;}
</style> 