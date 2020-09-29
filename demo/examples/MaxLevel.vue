<template>
  <div>
    <h2>
      Max Level
      <input v-model="maxLevel" type="number" />
    </h2>
    <Tree
      :data="originalData"
      draggable="draggable"
      crossTree="crossTree"
      ref="tree1"
      @drag="ondrag"
    >
      <div slot-scope="{ data, store }">
        <b
          v-if="data.children &amp;&amp; data.children.length"
          @click="store.toggleOpen(data)"
        >
          {{ data.open ? '-' : '+' }}&nbsp;
        </b>
        <span>{{ data.text }}-droppable:{{ data.droppable }}</span>
      </div>
    </Tree>
  </div>
</template>

<script>
import Tree from '@/components/DraggableTree'
import * as th from 'tree-helper'

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
            { text: 'node 2' },
            { text: 'node 2 undroppable', droppable: false },
            { text: 'node 2' },
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
      maxLevel: 2,
    }
  },
  methods: {
    ondrag(node) {
      const { maxLevel } = this
      let nodeLevels = 1
      th.depthFirstSearch(node, childNode => {
        if (childNode._vm.level > nodeLevels) {
          nodeLevels = childNode._vm.level
        }
      })
      nodeLevels = nodeLevels - node._vm.level + 1
      const childNodeMaxLevel = maxLevel - nodeLevels
      //
      th.depthFirstSearch(this.originalData, childNode => {
        if (childNode === node) {
          return 'skip children'
        }
        if (!childNode._vm) {
          // eslint-disable-next-line
          console.log(childNode)
        }
        this.$set(
          childNode,
          'droppable',
          childNode._vm.level <= childNodeMaxLevel,
        )
      })
    },
  },
}
</script>

<style></style>
