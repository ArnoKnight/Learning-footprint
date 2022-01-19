<template>
  <transition name="item">
    <li>
      <label>
        <input
          type="checkbox"
          :checked="todo.done"
          @change="checkChanged(todo.id)"
        />
        <span v-show="!todo.isEdit">{{ todo.title }}</span>
        <input
          type="text"
          v-show="todo.isEdit"
          :value="todo.title"
          @blur="handleBlur(todo, $event)"
          ref="inputTitle"
        />
      </label>
      <button class="btn btn-danger" @click="deleteItem(todo.id)">删除</button>
      <button
        class="btn btn-edit"
        v-show="!todo.isEdit"
        @click="editItem(todo)"
      >
        编辑
      </button>
    </li>
  </transition>
</template>

<script>
export default {
  name: "MyItem",
  props: ["todo"],
  mounted() {
    console.log(this.todo);
  },
  methods: {
    checkChanged(id) {
      // this.checkTodo(id);
      this.$bus.$emit("checkTodo", id);
    },
    deleteItem(id) {
      // if (confirm("确认删除吗？")) this.deleteTodo(id);
      if (confirm("确认删除吗？")) this.$bus.$emit("deleteTodo", id);
      // this.deleteTodo(id);
    },
    editItem(todo) {
      if (todo.hasOwnProperty("isEdit")) {
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true);
      }
      // setTimeout(() => {
      //   this.$refs.inputTitle.focus();
      // }, 200);
      this.$nextTick(() => {
        this.$refs.inputTitle.focus();
      });
    },
    handleBlur(todo, e) {
      todo.isEdit = false;
      if (!e.target.value.trim()) return alert("输入框不能为空");
      this.$bus.$emit("updateTodo", todo.id, e.target.value);
    },
  },
};
</script>

<style scoped>
/* 过渡 */
.item-enter,
.item-leave-to {
  transform: translateX(-100%);
  background-color: skyblue;
}

.item-enter-,
.item-leave {
  transform: translateX(0);
}
/* 动画 */
/* .item-enter-active {
  animation: item 1s;
  background-color: skyblue;
}

.item-leave-active {
  animation: item 1s reverse;
}

@keyframes item {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
} */
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
  /* 过渡 */
  transition: 0.5s linear;
}

li:hover {
  background-color: skyblue;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:hover button {
  display: block;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>