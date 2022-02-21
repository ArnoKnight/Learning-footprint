<template>
  <div class="table-box">
    <el-table
      ref="multipleTable"
      :data="
        tableData.slice((currentPage - 1) * PageSize, currentPage * PageSize)
      "
      tooltip-effect="dark"
      border
      size="small"
      @select-all="SelectAll"
      @select="select"
      :row-key="primaryKey"
    >
      <el-table-column
        v-if="!showTableItem.showSelection ? false : true"
        type="selection"
        width="55"
        :reserve-selection="true"
      >
      </el-table-column>
      <el-table-column type="index"> </el-table-column>
      <el-table-column
        v-for="(item, index) in targetTable"
        :key="index"
        :width="item.targetTableWidth"
        :prop="item.targetTableProp"
        :label="item.targetTableLabel"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        class="table-button-box"
        width="260px"
        v-if="!showTableItem.showTargetTable ? false : true"
      >
        <template slot-scope="scope">
          <el-button
            v-if="!showTableItem.showEditBtn ? false : true"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editBtn(scope.row)"
            >修改</el-button
          >
          <el-button
            v-if="!showTableItem.showDeleteBtn ? false : true"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteBtn(scope.row)"
            >删除</el-button
          >
          <el-button
            v-if="!showTableItem.showDetailsBtn ? false : true"
            type="info"
            icon="el-icon-share"
            size="mini"
            @click="detailBtn(scope.row)"
            >详情</el-button
          >
          <el-button
            v-if="!showTableItem.showExamineBtn ? false : true"
            type="primary"
            size="mini"
            @click="examineBtn(scope.row)"
            >审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="PageSize"
        layout="total, prev, pager, next,sizes, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ['targetTable', 'tableData', 'showTableItem', 'primaryKey'],
  data () {
    return {
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [10, 20, 30, 50],
      // 默认每页显示的条数（可修改）
      PageSize: 10,
      fmIdList: []
    }
  },
  methods: {
    editBtn (row) {
      this.$bus.$emit('showEditDialog', row)
    },
    deleteBtn (row) {
      this.$bus.$emit('deleteBtn', row)
    },
    detailBtn (row) {
      this.$bus.$emit('showDetailDialog', row)
    },
    examineBtn (row) {
      this.$bus.$emit('showExamineBtn', row)
    },
    handleSizeChange (val) {
      console.log(val)
      this.currentPage = 1
      this.PageSize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    select (selection, row) {
      if (this.fmIdList.indexOf(row.fmId) !== -1) {
        this.fmIdList.splice(this.fmIdList.indexOf(row.fmId), 1)
      } else {
        this.fmIdList.push(row.fmId)
      }
      this.$bus.$emit('getFmIdList', this.fmIdList)
    },
    SelectAll (selection) {
      selection.forEach(item => {
        if (this.fmIdList.indexOf(item.fmId) !== -1) {
          this.fmIdList.splice(this.fmIdList.indexOf(item.fmId), 1)
        } else {
          this.fmIdList.push(item.fmId)
        }
        this.$bus.$emit('getFmIdList', this.fmIdList)
      })
      console.log('selection', selection)
    }
  },
  mounted () {
    this.$bus.$on('clearAllCheckBox', () => {
      this.$refs.multipleTable.clearSelection()
    })
    this.$bus.$on('clearAllCheckBoxNo', () => {
      this.$refs.multipleTable.clearSelection()
    })
    this.$bus.$on('clearFmIdList', () => {
      this.fmIdList = []
    })
  },
  beforeDestroy () {
    this.$bus.$off('clearAllCheckBox')
    this.$bus.$off('clearAllCheckBoxNo')
    this.$bus.$off('clearFmIdList')
  }
}
</script>

<style scoped>
.table-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 20px;
}

.el-table {
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.pagination-box {
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  padding-top: 10px;
}
</style>
