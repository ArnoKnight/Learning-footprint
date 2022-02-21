<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <h4>“家庭健康账户”管理平台</h4>
        <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
        <div class="header-right">
          <p class="username">欢迎，admin</p>
          <el-tooltip
            class="item"
            effect="dark"
            content="重新登录"
            placement="bottom"
          >
            <el-button
              type="primary"
              icon="el-icon-refresh-left"
              class="operation-btn"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="退出"
            placement="bottom"
          >
            <el-button type="danger" icon="el-icon-back"></el-button>
          </el-tooltip>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside class="aside" style="width: 200px">
          <!-- 菜单 -->
          <el-menu
            router
            unique-opened
            :default-active="this.$route.path"
            @open="closeMenu"
            ref="menu"
          >
            <el-submenu
              :index="String(index1)"
              v-for="(item1, index1) in menuList"
              :key="index1"
            >
              <template slot="title">
                <i :class="item1.iconClass"></i>
                <span>{{ item1.subMenuTitle }}</span>
              </template>
              <el-menu-item
                :index="item2.navIndex"
                v-for="(item2, index2) in item1.children"
                :key="index2"
                @click="checkMenuItem(item2)"
                >{{ item2.menuItemTitle }}</el-menu-item
              >
            </el-submenu>
          </el-menu></el-aside
        >
        <!-- 主体 -->
        <el-main class="main">
          <!-- 标签导航栏 -->
          <div class="nav-tab-box">
            <el-tag
              @click="goHome()"
              :type="this.$route.path === '/home/Hello' ? 'dark' : 'light'"
            >
              <i class="el-icon-s-home"></i>
              首页
            </el-tag>
            <el-tag
              v-for="tag in tags"
              :key="tag.menuItemTitle"
              closable
              :type="tag.type"
              @close="closeNavTag(tag)"
              @click="clickNavTag(tag)"
            >
              {{ tag.menuItemTitle }}
            </el-tag>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {

  },
  data () {
    return {
      activeMenuIndex: 0,
      // 菜单列表
      menuList: [{
        subMenuTitle: '家庭信息管理',
        iconClass: 'el-icon-s-home',
        children: [{
          menuItemTitle: '家庭信息维护',
          navIndex: '/home/familyInformationManagement/FamilyInformationMaintenance'
        }, {
          menuItemTitle: '家庭信息审核',
          navIndex: '/home/familyInformationManagement/FamilyInformationReview'
        }, {
          menuItemTitle: '家庭成员维护',
          navIndex: '/home/familyInformationManagement/FamilyMemberMaintenance'
        }, {
          menuItemTitle: '家庭成员审核',
          navIndex: '/home/familyInformationManagement/FamilyMemberReview'
        }, {
          menuItemTitle: '家庭信息查询',
          navIndex: '/home/familyInformationManagement/FamilyInformationQuery'
        }, {
          menuItemTitle: '家庭成员查询',
          navIndex: '/home/familyInformationManagement/FamilyMemberQuery'
        }]
      }, {
        subMenuTitle: '家庭账户管理',
        iconClass: 'el-icon-bank-card',
        children: [{
          menuItemTitle: '家庭账户收入',
          navIndex: '/home/householdBillManagement/HouseholdAccountIncome'
        }, {
          menuItemTitle: '家庭账户支出',
          navIndex: '/home/householdBillManagement/HouseholdAccountExpenditure'
        }, {
          menuItemTitle: '家庭账户查询',
          navIndex: '/home/householdBillManagement/HouseholdAccountQuery'
        }]
      }, {
        subMenuTitle: '手工报账管理',
        iconClass: 'el-icon-notebook-1',
        children: [{
          menuItemTitle: '手工报账维护',
          navIndex: '/home/manualReimbursementManagement/ManualReimbursementMaintenance'
        }, {
          menuItemTitle: '手工报账审核',
          navIndex: '/home/manualReimbursementManagement/ManualReimbursementApproval'
        }, {
          menuItemTitle: '手工报账查询',
          navIndex: '/home/manualReimbursementManagement/ManualReimbursementQuery'
        }]
      }, {
        subMenuTitle: '综合查询',
        iconClass: 'el-icon-collection',
        children: [{
          menuItemTitle: '综合查询',
          navIndex: '/home/comprehensiveQuery/comprehensiveQuery'
        }]
      }],
      tags: []
    }
  },
  mounted () {
    this.goHome()
  },
  methods: {
    // 收起当前打开的菜单栏
    closeMenu (key, keyPath) {
      // console.log(key, keyPath)
      // close(key)
      this.activeMenuIndex = key
    },
    // 返回主页
    goHome () {
      this.$router.push('/home/Hello')
      this.tags.forEach((i) => {
        i.type = 'light'
      })
      this.$refs.menu.close(this.activeMenuIndex)
    },
    // 关闭标签页
    closeNavTag (tag) {
      // console.log(this.tags.indexOf(tag))
      console.log(tag)
      if (tag.navIndex !== this.$route.path) {
        this.tags.splice(this.tags.indexOf(tag), 1)
      } else {
        if (this.tags.indexOf(tag) !== 0) {
          this.$router.push(this.tags[this.tags.indexOf(tag) - 1].navIndex)
          this.tags[this.tags.indexOf(tag) - 1].type = 'dark'
          this.tags.splice(this.tags.indexOf(tag), 1)
        } else {
          this.tags.splice(this.tags.indexOf(tag), 1)
          this.goHome()
        }
      }
    },
    // 点击标签页
    clickNavTag (tag) {
      this.$router.push(tag.navIndex)
      // console.log(this.$router.path)
      this.tags.forEach((i) => {
        i.type = 'light'
      })
      tag.type = 'dark'
    },
    // 点击导航栏事件
    checkMenuItem (item) {
      if (this.tags.indexOf(item) === -1) {
        this.tags.push(item)
        this.tags.forEach((i) => {
          i.type = 'light'
        })
        item.type = 'dark'
      } else {
        this.tags.forEach((i) => {
          i.type = 'light'
        })
        item.type = 'dark'
      }
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.el-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  box-sizing: border-box;
  color: #ffffff;
  background-color: #438eb9;
}

.header-right {
  display: flex;
  /* justify-content: space-between; */
  /* width: 240px; */
}

.username {
  margin-right: 10px;
}

.operation-btn {
  /* font-size: 15px; */
}

.el-aside {
  background-color: skyblue;
}

.el-menu {
  height: 100%;
}

/* 深选择器：如果相对设置了scoped的子组件里的元素进行控制可以使用'>>>'或者'deep'设置选中或悬浮的颜色 */
/* .el-submenu >>> .el-submenu__title,
.el-menu-item {
  background-color: #f9f9f9;
}

.el-submenu >>> .el-submenu__title:hover,
.el-menu-item:hover,
.el-submenu >>> .el-menu-item:hover {
  background-color: #ecf5ff;
} */

.el-main {
  width: 100%;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
}

.aside::-webkit-scrollbar,
.main::-webkit-scrollbar,
.el-dialog::-webkit-scrollbar {
  display: none;
}

.nav-tab-box {
  width: 100%;
  height: 32px;
  overflow: hidden;
  white-space: nowrap;
  /* background-color: pink; */
}

.el-tag {
  cursor: pointer;
}
</style>
