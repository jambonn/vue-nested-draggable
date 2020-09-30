<script>
import { arrayRemove } from '@/plugins/utils'
import DraggableTreeNode from './DraggableTreeNode.vue'
import Tree from './Tree.vue'

const trees = [] // for multiple trees
const dplh = {
  _id: 'draggable_tree_drag_placeHolder',
  level: null,
  droppable: false,
  isDragPlaceHolder: true,
  class: 'draggable-placeholder',
  style: {},
  innerStyle: {},
  innerClass: 'draggable-placeholder-inner',
  innerBackStyle: {},
  innerBackClass: 'draggable-placeholder-inner-back',
}

export default {
  extends: Tree,
  props: {
    getTriggerEl: { type: Function },
    draggable: {},
    droppable: { default: true },
    crossTree: {},
    ondragstart: { type: Function },
    ondragend: { type: Function },
    preventSelect: { default: true },
  },
  components: {
    TreeNode: DraggableTreeNode,
  },
  data() {
    return {
      dplh,
      trees,
    }
  },
  created() {
    trees.push(this)
  },
  beforeDestroy() {
    arrayRemove(trees, this)
  },
}
</script>
