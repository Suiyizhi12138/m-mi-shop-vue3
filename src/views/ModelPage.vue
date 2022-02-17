<template>
  <div class="model-page">
    <h1>页面模板</h1>
  </div>
</template>

<script>
import {reactive,toRefs,onMounted} from 'vue'

export default {
  setup(){
    const state = reactive({
      
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style>

</style>