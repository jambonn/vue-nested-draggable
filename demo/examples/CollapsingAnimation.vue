<template>
  <div>
    <h2>Collapse Animation</h2>
    <Tree
      :data="originalData"
      draggable="draggable"
      crossTree="crossTree"
      ref="tree1"
      @change="tree1Change"
      @drag="ondrag"
      @drop="ondrop"
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
import Tree0 from '@/components/DraggableTree'
import CustomTreeNode from './CustomTreeNode.vue'

const Tree = {
  extends: Tree0,
  components: {
    TreeNode: CustomTreeNode,
  },
  data() {
    return {
      nodesTransition: 'fade',
    }
  },
}

export default {
  components: { Tree },
  data() {
    return {
      originalData: [
        { text: 'node 1' },
        { text: 'node 2' },
        { text: 'node 3' },
        { text: 'node 4' },
        { text: 'node 4 undroppable', droppable: false },
        {
          text: 'node 5',
          children: [
            { text: 'node 1' },
            {
              text: 'node 2',
              children: [{ text: 'node 3' }, { text: 'node 4' }],
            },
            {
              text: 'node 2 undroppable',
              droppable: false,
              children: [{ text: 'node 3' }, { text: 'node 4' }],
            },
            {
              text: 'node 2',
              children: [
                { text: 'node 3' },
                { text: 'node 4 undroppable', droppable: false },
              ],
            },
            { text: 'node 3' },
            { text: 'node 4' },
            { text: 'node 3' },
            { text: 'node 4' },
            { text: 'node 3' },
            { text: 'node 4' },
            { text: 'node 3' },
            { text: 'node 4' },
          ],
        },
      ],
      data: null,
    }
  },
  methods: {
    tree1Change(node, targetTree) {
      this.data = targetTree.getPureData()
    },
    ondrag() {
      const tree = this.$refs.tree1
      tree.nodesTransition = null
    },
    ondrop() {
      const tree = this.$refs.tree1
      tree.nodesTransition = 'fade'
    },
  },
}
</script>

<style></style>
