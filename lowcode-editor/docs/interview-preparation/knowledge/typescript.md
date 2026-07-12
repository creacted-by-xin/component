# TypeScript 类型边界

## `unknown`、`any` 与联合类型

- `unknown`：用于类型尚不可信的外部输入，例如接口响应、导入的 JSON 或 AI 输出；使用前必须通过 `typeof`、`Array.isArray`、自定义 type guard 或 schema 校验收窄。
- `any`：关闭当前值及其后续传播链的类型检查，只能作为短期迁移缺口；不能把它当成“我不知道类型”的默认答案。
- 联合类型：值只可能是有限几种已知类型或状态，例如 `mode: 'edit' | 'preview'`、`Action = ShowMessageAction | NavigateAction`；使用时按 discriminator 或 `typeof` 收窄。

**项目映射**：拖拽 item 可定义为受限联合，而非 `any`；从外部导入的页面 Schema 先以 `unknown` 接收并校验；事件动作使用带 `type` 字段的联合类型，避免预览器执行未知动作。
