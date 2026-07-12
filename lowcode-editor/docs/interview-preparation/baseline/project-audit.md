# P0 项目运行与代码审计

## 元信息

| 字段 | 结论 |
| --- | --- |
| 任务 | `P0-PRJ-001` |
| 审计日期 | 2026-07-12 |
| 范围 | 静态架构、Lint、构建与开发服务器启动；未修改业务代码 |
| 结论 | `COMPLETE_WITH_BLOCKERS`：具备编辑器雏形，但当前不能通过质量门禁，不能作为稳定演示版本 |

## 验证证据

| 检查 | 命令 | 结果 |
| --- | --- | --- |
| Lint | `npm run lint` | 失败：80 errors、20 warnings；主要为 Hook 调用顺序/依赖、`any`、未使用变量与 `setState` effect 规则 |
| 构建 | `npm run build` | 失败（TypeScript 编译错误）；集中在 `Outline`、设置面板、拖拽 Hook 与物料组件的隐式 `any`、可能 `undefined`、联合类型索引与 ref 类型 |
| 开发服务器 | `npm run dev -- --host 127.0.0.1` | 未完成：当前自动化受限环境拒绝监听 `127.0.0.1:5173`（`EPERM`），不是应用自身启动成功的证据 |
| 自动化测试 | 配置与文件清点 | 未发现测试脚本、测试依赖或测试文件 |

运行命令均在 2026-07-12 执行，且执行前已保留用户已有的 `package-lock.json` 修改；本次仅新增 `docs/interview-preparation/` 文档。

## 当前架构与可讲述能力

```text
物料注册表（component-config）
        -> React DnD 拖入 / 移动
        -> Zustand 组件树（components）
        -> 编辑态 dev renderer + 选中/悬浮遮罩
        -> 属性/样式/事件设置面板
        -> 预览态 prod renderer + 事件动作
```

- React 19 + TypeScript + Vite，使用 Ant Design、Zustand、React DnD、Monaco、Allotment。
- 物料配置将 `dev`/`prod` renderer、默认属性、设置器和可用事件集中在 `src/editor/stores/component-config.tsx`；编辑器通过组件树递归渲染。
- 当前有物料、页面大纲、源码查看、选择/删除、属性/样式/事件编辑与预览切换的实现痕迹；必须在修复类型门禁后再做人机回归验证，不能宣称已稳定可用。

## 风险与优先级

| 优先级 | 发现 | 证据 | 影响与建议 |
| --- | --- | --- | --- |
| P0 | 预览态把编辑器内配置的字符串交给 `new Function` 执行 | `src/editor/components/Preview/index.tsx:44-52` | 任意脚本执行（XSS/数据泄露）风险。先禁用 `customJS` 执行路径；后续改为受限声明式动作协议，必要时隔离 iframe、白名单能力与审计。 |
| P0 | 构建、Lint 均失败 | 上述验证证据 | 先建立“零 TypeScript 错误、零 ESLint error”的门禁，再谈功能扩展。不要以关闭规则掩盖问题。 |
| P0 | 部分组件在条件 return 后才调用 Hook | `src/editor/materials/Page/dev.tsx:7-10`、`src/editor/materials/Modal/dev.tsx:8-11` | 违反 Hook 调用顺序，可能在 props 变化时导致运行错误；把 Hook 移到条件分支前并用安全默认值处理。 |
| P1 | 组件树操作直接改写嵌套对象，ID 由毫秒时间生成 | `src/editor/stores/components.tsx:56-128`、`src/editor/hooks/useMamerialDrop.tsx:19-31` | 撤销/重做、导入导出与并发操作难以可靠实现，且可能 ID 冲突。定义显式 Schema、不可变树操作和稳定 ID 生成策略。 |
| P1 | 未启用持久化、无导入导出/撤销重做证据、无测试 | `src/editor/stores/components.tsx:146-151` 及测试清点 | 编辑结果会丢失，核心交互回归无防护。优先覆盖“添加—选择—改属性—预览—删除”的最小回归链。 |
| P1 | 事件配置与预览实现存在可维护性缺陷 | `src/editor/components/Setting/ComponentEvent.tsx:34-45,60-62` | 直接 `splice` 改写 state，空动作判断表达式失效；应使用不可变更新并以 `actions?.length` 判空。 |
| P2 | `Table` 可配置任意 URL，但无错误、超时、取消、数据结构校验或安全边界 | `src/editor/materials/Table/prod.tsx:11-29` | 演示和生产都有不确定性。后续应经数据源协议和受控请求层处理。 |

## 推荐改造顺序

1. 禁用预览中的 `customJS` 直接执行，修正 Hook 顺序和 TypeScript 错误，使 `npm run build`、`npm run lint` 通过。
2. 明确 `ComponentNode`/Schema、动作协议和不可变树更新；补充稳定 ID、序列化、导入导出与历史栈设计。
3. 以最小编辑链编写组件/端到端测试，并记录本地手工演示证据。
4. 在安全 Schema 边界稳定后，才进入“自然语言 -> Schema -> 校验 -> 预览确认 -> 可撤销写入”的 AI 主线。

## 面试表达素材（当前真实口径）

可以说：项目已完成物料注册、递归渲染、拖拽落位、属性/样式/事件配置和预览链路的原型，并已通过审计识别出类型门禁、可执行脚本与状态模型三个优先级最高的问题；下一步先收敛为受约束 Schema 和声明式动作，而不是把任意 JS 当作低代码能力。不得说：项目已经稳定上线、具备完整安全沙箱或已经有测试覆盖。
