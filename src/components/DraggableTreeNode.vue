<script>
import draggableHelper from 'draggable-helper'
import { arrayRemove, insertAfter } from '@/plugins/utils'
import TreeNode from './TreeNode.vue'
import autoMoveDragPlaceHolder, {
  isNodeDraggable,
  isNodeDroppable,
} from '@/helpers/autoMoveDragPlaceHolder'
import { isPropTrue } from '@/plugins/utils'

export default {
  extends: TreeNode,
  name: 'TreeNode',
  mounted() {
    this.store.isNodeDraggable = isNodeDraggable
    this.store.isNodeDroppable = isNodeDroppable
    if (this.isRoot || this.data.isDragPlaceHolder) {
      return
    }
    const { dplh } = this.store
    this.$watch(
      'store.draggable',
      draggable => {
        if (isPropTrue(draggable)) {
          const triggerEl = this.store.getTriggerEl
            ? this.store.getTriggerEl(this)
            : this.$el.querySelector('.tree-node-inner')
          this._draggableDestroy = draggableHelper(triggerEl, {
            preventSelect: isPropTrue(this.store.preventSelect),
            // trigger el
            getEl: () => this.$el,
            minTranslate: 10,
            drag: (e, opt, store) => {
              autoMoveDragPlaceHolder.dragStart()
              // this store is not tree
              const draggableHelperInfo = { event: e, options: opt, store }
              if (
                this.store.ondragstart &&
                this.store.ondragstart(this.data, draggableHelperInfo) === false
              ) {
                return false
              }
              if (!isNodeDraggable(this.data)) {
                return false
              }
              this.store.$emit('drag', this.data)
              // record start position
              const siblings = this.data.parent.children
              this.startPosition = {
                siblings,
                index: siblings.indexOf(this.data),
              }
              dplh.innerStyle.height = store.el.offsetHeight + 'px'
              insertAfter(dplh, this.data)
              this.data.class += ' dragging'
            },
            moving: (e, opt, store) => {
              if (store.movedCount === 0) {
                return
              }
              const draggableHelperInfo = { event: e, options: opt, store }
              return autoMoveDragPlaceHolder.call(this, draggableHelperInfo)
            },
            drop: (e, opt, store) => {
              autoMoveDragPlaceHolder.dragEnd()
              const draggableHelperInfo = { event: e, options: opt, store }
              if (
                this.store.ondragend &&
                this.store.ondragend(this.data, draggableHelperInfo) === false
              ) {
                arrayRemove(dplh.parent.children, dplh)
                // can't drop, no change
              } else {
                const targetTree = dplh._vm.store
                const crossTree = targetTree !== this.store
                const oldTree = crossTree ? this.store : null
                insertAfter(this.data, dplh)
                arrayRemove(dplh.parent.children, dplh)
                this.data.class = this.data.class.replace(
                  /(^| )dragging( |$)/g,
                  ' ',
                )
                targetTree.$emit('drop', this.data, targetTree, oldTree)
                oldTree && oldTree.$emit('drop', this.data, targetTree, oldTree)
                // emit change event if changed
                const siblings = this.data.parent.children
                if (
                  siblings === this.startPosition.siblings &&
                  siblings.indexOf(this.data) === this.startPosition.index
                ) {
                  // not moved
                } else {
                  this.store.$emit('change', this.data, targetTree, oldTree)
                  oldTree &&
                    oldTree.$emit('change', this.data, targetTree, oldTree)
                }
                this.startPosition = null
              }
            },
          })
        } else {
          if (this._draggableDestroy) {
            this._draggableDestroy()
            this._draggableDestroy = null
          }
        }
      },
      { immediate: true },
    )
  },
}
</script>
