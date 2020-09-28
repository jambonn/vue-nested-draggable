<template>
  <div>
    <h2>Empty</h2>
    <Tree
      :data="originalData"
      draggable="draggable"
      crossTree="crossTree"
      ref="tree1"
    >
      <div slot-scope="{ data, store }">
        <b
          v-if="data.children &amp;&amp; data.children.length"
          @click="store.toggleOpen(data)"
        >
          {{ data.open ? '-' : '+' }}&nbsp;
        </b>
        <span>{{ data.text }}</span>
      </div>
    </Tree>
  </div>
</template>

<script>
import Tree from '@/components/DraggableTree'
export default {
  components: { Tree },
  data() {
    return {
      originalData: [],
    }
  },
}
</script>
