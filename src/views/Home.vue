<template>
  <div class="home">
    <p v-auth="'ADMIN'">有ADMIN权限可以看到此行</p>
    <p v-auth="'USER'">有USER权限可以看到此行</p>
    <p v-role="'ADMIN'">有ADMIN角色可以看到此行</p>
    <p v-role="'MEMBER'">有MEMBER角色可以看到此行</p>
    <p>
      <el-button @click="slideVisible = true">打开</el-button>
    </p>

    <slideout v-if="slideVisible" append-to="main" @mask="slideVisible = false">
      <div>
        <p>第1行</p>
        <p>第2行</p>
        <p>第3行</p>
        <p>第4行</p>
        <p>第5行</p>
        <p>第6行</p>
        <p>第7行</p>
        <p>第8行</p>
        <p>第9行</p>
      </div>
    </slideout>
  </div>
</template>

<script>
import Slideout from '../components/slideout/Slideout'

export default {
  name: 'home',
  components: { Slideout },
  data () {
    return {
      slideVisible: false
    }
  },
  created () {
    console.log('Created!')
  }
}
</script>
