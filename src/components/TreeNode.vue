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
    <slot
      v-if="!isRoot"
      name="node-inner-back"
      :styleObj="innerBackStyle"
      :data="data"
      :store="store"
      :vm="vm"
    >
      <div
        class="tree-node-inner-back"
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
    </slot>
    <transition :name="store.childrenTransitionName">
      <div class="tree-node-children" v-if="childrenVisible">
        <TreeNode
          v-for="child in data.children"
          :key="child._id"
          :data="child"
          :store="store"
          :level="childrenLevel"
          :allow-add-item="allowAddItem"
          :add-item-text="addItemText"
          @addItem="onClickChildItem"
        >
          <template slot-scope="props">
            <slot :data="props.data" :store="props.store" :vm="props.vm"></slot>
          </template>
          <template
            v-if="store.customInnerBack"
            slot="node-inner-back"
            slot-scope="props"
          >
            <slot
              name="node-inner-back"
              :styleObj="props.styleObj"
              :data="props.data"
              :store="props.store"
              :vm="props.vm"
            ></slot>
          </template>
        </TreeNode>
        <div
          v-if="allowAddItem"
          class="tree-node-action"
          :data-level="childrenLevel"
          :style="[actionStyle]"
        >
          <button class="tree-node-add" @click.prevent="onClickAddItem">
            {{ addItemText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    data: {},
    store: {},
    allowAddItem: { type: Boolean, default: false },
    addItemText: { type: String, default: 'Add item' },
    level: { default: 0 }, // readonly
  },
  data() {
    return {
      vm: this,
    }
  },
  computed: {
    childrenLevel() {
      return this.level + 1
    },
    isRoot() {
      return this.data && this.data.isRoot
    },
    childrenVisible() {
      const { data } = this
      return (
        this.isRoot ||
        (data && data.children && data.children.length && data.open)
      )
    },
    innerBackStyle() {
      const r = {
        marginBottom: this.store.space + 'px',
      }
      if (!this.isRoot && this.level > 1) {
        r.paddingLeft = (this.level - 1) * this.store.indent + 'px'
      }
      return r
    },
    actionStyle() {
      const r = {}
      if (!this.isRoot && this.level > 0) {
        r.paddingLeft = this.level * this.store.indent + 'px'
      }
      return r
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(data) {
        if (data) {
          data._vm = this
          if (!data._treeNodePropertiesCompleted && !data.isRoot) {
            this.store.completeNode(data, this.$parent.data)
          }
        }
      },
    },
  },
  methods: {
    onClickAddItem() {
      this.$emit('addItem', this.data)
    },
    onClickChildItem(data) {
      this.$emit('addItem', data)
    },
  },
}
</script>
