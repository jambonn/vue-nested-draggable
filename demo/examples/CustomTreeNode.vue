<template>
  <div
    class="tree-node"
    :class="[
      data.active ? store.activatedClass : '',
      data.open ? store.openedClass : '',
      data.class,
    ]"
    :style="data.style"
    :id="data._id"
  >
    <div
      class="tree-node-inner-back"
      v-if="!isRoot"
      :style="[innerBackStyle, data.innerBackStyle]"
      :class="[data.innerBackClass]"
    >
      <div
        class="tree-node-inner"
        :style="[data.innerStyle]"
        :class="[data.innerClass]"
      >
        <slot :data="data" :store="store" :vm="vm"></slot>
      </div>
    </div>
    <transition :name="store.nodesTransition">
      <div class="tree-node-children" v-if="childrenVisible">
        <TreeNode
          v-for="child in data.children"
          :key="child._id"
          :data="child"
          :store="store"
          :level="childrenLevel"
        >
          <template slot-scope="props">
            <slot :data="props.data" :store="props.store" :vm="props.vm"></slot>
          </template>
        </TreeNode>
      </div>
    </transition>
  </div>
</template>

<script>
import DraggableTreeNode from '@/components/DraggableTreeNode'

export default {
  name: 'TreeNode',
  extends: DraggableTreeNode,
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
