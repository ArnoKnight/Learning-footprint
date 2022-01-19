<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h1>当前求和的10倍为：{{ bigSum }}</h1>
    <h3>姓名：{{ name }}</h3>
    <h3>年龄：{{ age }}</h3>
    <select v-model="num">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <!-- 鼠标事件默认传参event，如果用到了mapMutations，则需要把计算的参数过去 -->
    <button @click="increment(num)">+</button>
    <button @click="decrement(num)">-</button>
    <button @click="incrementOdd(num)">当前求和为奇数再加</button>
    <button @click="incrementWait(num)">等一等再加</button>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Count",
  data() {
    return {
      num: 1,
    };
  },
  methods: {
    // 不需要发送ajax请求或者其他操作可以直接调用commit与mutation对话
    // increment() {
    //   this.$store.commit("JIA", this.num);
    // },
    // decrement() {
    //   this.$store.commit("JIAN", this.num);
    // },
    // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations
    ...mapMutations({ increment: "JIA", decrement: "JIAN" }),

    
    // incrementOdd() {
    //   // 判断逻辑应该写在action中
    //   // if (this.$store.state.sum % 2) this.$store.dispatch("jiaOdd", this.num);
    //   this.$store.dispatch("jiaOdd", this.num);
    // },
    // incrementWait() {
    //   // setTimeout(() => {
    //   //   this.$store.dispatch("jiaWait", this.num);
    //   // }, 500);
    //   this.$store.dispatch("jiaWait", this.num);
    // },
    // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations
    ...mapActions({ incrementOdd: "jiaOdd", incrementWait: "jiaWait" }),
  },
  computed: {
    // 手搓计算属性
    // sum() {
    //   return this.$store.state.sum;
    // },
    // bigSum() {
    //   return this.$store.getters.bigSum;
    // },
    // name() {
    //   return this.$store.state.name;
    // },
    // age() {
    //   return this.$store.state.age;
    // },
    // 借助mapState生成计算属性，从state中读取数据(对象写法) 对象写法无法采用简写方式，因为sum不在本组件中，是从state中读取出来的
    // ...mapState({ 计算属性名: "读取属性名" }),
    // ...mapState({ sum: "sum", name: "name", age: "age" }),
    // 借助mapState生成计算属性，从state中读取数据(数组写法)   生成的属性名和读取的属性名一致，则可以采用数组写法
    ...mapState(["sum", "name", "age"]),
    // 借助mapGetters生成计算属性，从state中读取数据(数组写法)
    ...mapGetters(["bigSum"]),
  },
  mounted() {
    console.log(this);
  },
};
</script>

<style>
button {
  margin-left: 10px;
}
</style>