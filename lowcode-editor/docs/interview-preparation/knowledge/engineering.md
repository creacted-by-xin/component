# 工程化与低代码安全

## 质量门禁

在功能演示前，先让 TypeScript 构建和 ESLint error 清零；测试覆盖最小用户链路。规则不是为了“通过工具”，而是提早发现 Hook 顺序、空值和类型边界错误。

## 低代码动作协议的安全边界

1. Schema 只保存白名单动作，例如 `showMessage`、`navigate`、`openModal`。
2. 运行前做 JSON Schema/运行时校验，拒绝未知字段和越权目标。
3. action handler 按白名单映射实现能力，不把用户配置传入 `eval`、`new Function` 或动态脚本标签。
4. 复杂集成经后端策略、权限和审计处理；需要脚本扩展时，另行设计隔离沙箱与最小能力集。

**项目映射**：`src/editor/components/Preview/index.tsx:44-52` 直接执行配置代码，属于 P0；完整证据见 `../baseline/project-audit.md`。
