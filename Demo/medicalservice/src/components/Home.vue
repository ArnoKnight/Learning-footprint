<template>
  <div style="height: 100%">
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <div class="header_left">
            <img class="logo" src="../assets/logo.png" alt="" />
            <i class="el-icon-s-grid"></i>
        </div>
        <div class="user">
          <i class="el-icon-s-tools"></i>
          <i class="el-icon-message-solid"></i>
          <i class="el-icon-message"></i>
          <img class="userIcon" src="../assets/user.jpeg" alt="" />
          <span>username</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
      </el-header>
      <el-container style="height: 100%">
        <!-- 侧边栏 -->
        <el-aside class="aside" style="height: 100%">
          <div class="searchInputBox">
                <el-input class="searchInput" placeholder="请输入" suffix-icon="el-icon-search">
                </el-input>
          </div>
          <el-col class="col" :span="12" style="height: 100%">
            <el-menu
              default-active="2"
              text-color="#616C80"
              active-text-color="#1890FF"
              style="height: 100%"
              background-color="#eceff4"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-s-home"></i>
                  <span>首页</span>
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">数据集成</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-s-comment"></i>
                <span slot="title">数据计算</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">业务流程</span>
              </el-menu-item>
              <el-menu-item index="5">
                <i class="el-icon-location"></i>
                <span slot="title">数据地图</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <!-- 主体 -->
        <el-main class="main">
          <div class="mainNav">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              class="mainTag"
            >
              {{ tag }}
            </el-tag>
          </div>
          <div class="mainBody">
            <div class="mainTitle">
              <span>明细统计</span>
              <div class="pickerBox">
                <span>统计时间:</span>
                <el-date-picker
                  class="picker"
                  v-model="value1"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" 
                  @change="dataChange()"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="mainStatistics">
              <div class="statisticsItem_left">
                <div class="totalCost">
                  <div class="totalCost_logoBox">
                    <i class="el-icon-coin totalCost_logo"></i>
                  </div>
                  <div class="paymentDetailsBox" style="border: none">
                    <div style="fontSize: 16px">本月总费用</div>
                    <div>
                      <span style="fontSize: 22px; fontWeight: bold"
                        >500.23</span
                      ><span style="fontSize: 12px">万人</span>
                    </div>
                  </div>
                </div>
                <div class="paymentDetailsBox">
                  <div style="textalign: center">个账</div>
                  <div>322.300.355</div>
                </div>
                <div class="paymentDetailsBox">
                  <div style="textalign: center">自费</div>
                  <div>322.300.355</div>
                </div>
                <div class="paymentDetailsBox">
                  <div style="textalign: center">基金支出</div>
                  <div>322.300.355</div>
                </div>
              </div>
              <div class="statisticsItem_right">
                <div class="totalCost">
                  <div
                    class="totalCost_logoBox"
                    style="backgroundColor: #a3caf4"
                  >
                    <i class="el-icon-user totalCost_logo"></i>
                  </div>
                  <div class="paymentDetailsBox" style="border: none">
                    <div style="fontSize: 16px">本月结算人次</div>
                    <div>
                      <span style="fontSize: 22px; fontWeight: bold">56336</span
                      ><span style="fontSize: 12px">人</span>
                    </div>
                  </div>
                </div>
                <div class="settlementDetails">
                  <div style="textalign: center">门诊</div>
                  <div>500</div>
                </div>
                <div class="settlementDetails">
                  <div style="textalign: center">购药</div>
                  <div>485</div>
                </div>
                <div class="settlementDetails">
                  <div style="textalign: center">住院</div>
                  <div>662</div>
                </div>
              </div>
            </div>
            <!-- 表格 -->
            <div style="marginTop: 10px">
              <el-button class="exportTable" icon="el-icon-upload2" size="mini"
                >导出报表</el-button
              >
            </div>
            <el-table
              :data="
                tableAllDate.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
              style="width: 100%"
            >
              <el-table-column type="selection" width="70"></el-table-column>
              <el-table-column label="序列号" type="index" width="70">
              </el-table-column>
              <el-table-column prop="costDate" label="费用日期">
              </el-table-column>
              <el-table-column prop="medicineNum" label="购药人次">
              </el-table-column>
              <el-table-column prop="total" label="总金额(元)">
              </el-table-column>
              <el-table-column prop="persionMoney" label="个账金额(元)">
              </el-table-column>
              <el-table-column prop="fundMoney" label="基金金额(元)">
              </el-table-column>
              <el-table-column prop="cost" label="自费金额(元)">
              </el-table-column>
              <el-table-column label="操作">
                <template>
                  <el-button
                    type="primary"
                    size="mini"
                    class="viewDetails"
                    @click="viewDetails()"
                    >查看详细<i class="el-icon-caret-bottom viewDetailsIcon"></i
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <div class="pagingBox">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableAllDate.length"
                :current-page="currentPage"
              >
              </el-pagination>
            </div>
            <!-- 遮罩层 -->
            <el-dialog title="弹窗标题" :visible.sync="dialogTableVisible">
              <el-table :data="detailsDate" border>
                <el-table-column property="title" label=""></el-table-column>
                <el-table-column property="num" label="总数"></el-table-column>
                <el-table-column
                  property="addUp"
                  label="累积结算机构数"
                  width="200"
                ></el-table-column>
                <el-table-column
                  property="noaddUp"
                  label="未发生结算机构数"
                ></el-table-column>
                <el-table-column
                  property="noaddUp"
                  label="昨日新增"
                ></el-table-column>
                <el-table-column
                  property="thisMonthAdd"
                  label="本月新增"
                ></el-table-column>
                <el-table-column
                  property="quarterAdd"
                  label="近3个月新增"
                ></el-table-column>
              </el-table>
              <div style="height: 45px">
                <el-button
                  class="exitBtn"
                  type="primary"
                  @click="exitDetailsDate()"
                  >退出</el-button
                >
              </div>
            </el-dialog>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三", "标签四", "标签五"],
      inputVisible: false,
      inputValue: "",
      tableDate: [
        {
          costDate: "2021-05-26",
          medicineNum: 200,
          total: 7856.36,
          persionMoney: 7856.36,
          fundMoney: 7856.36,
          cost: 7856.36,
        },
      ],
      currentPage: 1,
      pageSize: 10,
      dialogTableVisible: false,
      detailsDate: [
        {
          title: "定点医疗机构",
          num: 60000,
          addUp: 1000,
          noaddUp: 2900,
          yesterdayAdd: "10(1.1%)",
          thisMonthAdd: "400(14.1%)",
          quarterAdd: "500(18%)",
        },
        {
          title: "定点药店",
          num: 60000,
          addUp: 1000,
          noaddUp: 2900,
          yesterdayAdd: "10(1.1%)",
          thisMonthAdd: "400(14.1%)",
          quarterAdd: "500(18%)",
        },
        {
          title: "全部机构",
          num: 60000,
          addUp: 1000,
          noaddUp: 2900,
          yesterdayAdd: "10(1.1%)",
          thisMonthAdd: "400(14.1%)",
          quarterAdd: "500(18%)",
        },
        {
          title: "定点药店",
          num: 60000,
          addUp: 1000,
          noaddUp: 2900,
          yesterdayAdd: "10(1.1%)",
          thisMonthAdd: "400(14.1%)",
          quarterAdd: "500(18%)",
        },
        {
          title: "医疗机构",
          num: 60000,
          addUp: 1000,
          noaddUp: 2900,
          yesterdayAdd: "10(1.1%)",
          thisMonthAdd: "400(14.1%)",
          quarterAdd: "500(18%)",
        },
      ],
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      ischeckDate: false
    };
  },
  computed: {
    tableAllDate() {
      let arr = [];
      if(this.ischeckDate){
        for (let i = 0; i < 400; i++) {
        arr.push(this.tableDate[0]);
      }
    }
      return arr;
    },
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    viewDetails() {
      this.dialogTableVisible = true;
    },
    exitDetailsDate() {
      this.dialogTableVisible = false;
    },
    dataChange(){
        console.log('change');
        this.ischeckDate = true
    }
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  background-color: #eceff4;
}

.header_left{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 294px;
}

.logo {
  width: 200px;
  height: 40px;
}

.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
}

.userIcon {
  width: 20px;
  height: 20px;
}

.aside {
  width: 258px;
  height: 100%;
  background-color: #eceff4;
}

.searchInputBox{
    padding: 0 24px;
    box-sizing: border-box;
}

.searchInput{
    width: 253px;
    box-sizing: border-box;
    border-radius: 20px !important;
}

.col {
  width: 100%;
}

.main {
  width: 100%;
  height: 100%;
  padding: 0;
  background-color: #ffffff;
}

.mainNav {
  display: flex;
  align-items: center;
  width: 100%;
  height: 46px;
  box-sizing: border-box;
  padding: 0 10px;
  border-bottom: 1px solid #e7e7e7;
}

.mainTag {
    cursor: pointer;
    color: #505d74;
    background-color: #eceff3;
}

.mainTag:hover {
  color: #ffffff;
  background-color: #1890ff;
}

.el-tag .el-tag__close {
  color: #505d74;
}

.mainTag:hover .el-tag__close {
  color: #ffffff;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.mainBody {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}

.mainTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 0;
}

.mainStatistics {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
}

.statisticsItem_left,
.statisticsItem_right {
  display: flex;
  justify-content: space-between;
  width: 580px;
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 16px 13px;
  color: #ffffff;
}

.statisticsItem_left {
  background: linear-gradient(to right, #7adfba, #4ecbad);
}

.statisticsItem_right {
  background: linear-gradient(to right, #a0c7f2, #58a0ec);
}

.totalCost {
  display: flex;
}

.totalCost_logoBox {
  width: 50px;
  height: 50px;
  line-height: 64px;
  text-align: center;
  background-color: #8cdfc9;
  box-sizing: border-box;
  border-radius: 5px;
}

.totalCost_logo::before {
  font-size: 36px;
}

.paymentDetailsBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
  padding: 0 12px;
  border-left: 1px solid #ffffff;
  text-align: center;
}

.settlementDetails {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 117px;
  height: 48px;
  text-align: center;
  font-size: 16px;
  /* padding: 0 12px; */
  border-left: 1px solid #ffffff;
}

.pagingBox {
  float: right;
  /* display: flex; */
  /* justify-content: end; */
}

.viewDetails:hover {
  background-color: #ff7f52;
  border: 1px solid #ff7f52;
}

.viewDetails {
  padding: 7px 10px 7px 18px;
  border-radius: 5px;
}

.viewDetails:hover .viewDetailsIcon {
  visibility: inherit;
}

.viewDetailsIcon {
  visibility: hidden;
}

.el-dialog {
  width: 70%;
  text-align: center;
}

.el-table {
  background-color: #f9fafe;
}

.exitBtn {
  float: right;
  margin-top: 15px;
}

.pickerBox {
  display: flex;
  align-items: center;
  font-weight: normal;
}

.picker {
  width: 360px !important;
  height: 24px;
  line-height: 24px;
  margin-left: 10px;
}

.el-date-editor .el-range-separator,
.el-date-editor .el-range__icon {
  line-height: 16px;
}

.exportTable {
  float: right;
}

.aside::-webkit-scrollbar,
.main::-webkit-scrollbar,
.el-dialog::-webkit-scrollbar {
  display: none;
}
</style>