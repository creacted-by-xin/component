# 手写题

## C-BL-001：在组件树中查找节点

实现 `findComponentById`：输入组件树和目标 ID，返回第一个匹配节点；找不到返回 `null`。不得修改输入。

```ts
type ComponentNode = {
  id: string;
  name: string;
  children?: ComponentNode[];
};

function findComponentById(
  nodes: ComponentNode[],
  id: string,
): ComponentNode | null {
  // TODO
}
```

**验收**：写出时间/空间复杂度；覆盖空数组、目标在根层、目标在深层和目标不存在四种情况。

### 参考实现（首次学习后可看；复练时遮住）

```ts
function findComponentById(
  nodes: ComponentNode[],
  id: string,
): ComponentNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;

    const found = findComponentById(node.children ?? [], id);
    if (found) return found;
  }

  return null;
}
```

- 时间复杂度：最坏 `O(n)`，每个节点至多访问一次。
- 空间复杂度：递归调用栈为 `O(h)`，`h` 是树高；极深树可能栈溢出，可改写为显式栈迭代。
- 额外边界：重复 ID 时该实现返回深度优先遇到的第一个节点，真实 Schema 应保证 ID 唯一。

## C-BL-002（选做）：不可变删除

实现 `removeComponent(nodes, id)`，返回删除目标节点及其全部后代后的新树。要求：输入树不得被改写；目标不存在时可返回原引用或等价新树，但需说明选择。

**项目映射**：现有 `deleteComponent` 会直接改写父节点 `children`；本题是为后续历史栈、导入导出和 AI patch 准备的纯函数基础。
