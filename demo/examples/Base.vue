<template>
  <div>
    <h2>Base</h2>
    <Tree
      ref="tree1"
      :draggable="true"
      :crossTree="true"
      :data="originalData"
      :allow-add-item="true"
      add-item-text="Add item"
      @change="tree1Change"
      @addItem="onClickAddItem"
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
    onClickAddItem(data) {
      if (data.children) data.children.push({ text: 'New menu' })
    },
  },
}
</script>

<style></style>
