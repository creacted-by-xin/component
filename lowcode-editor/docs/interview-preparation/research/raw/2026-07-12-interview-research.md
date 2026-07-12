# 2026-07-12 每日面试资料调研

## 范围与结论

- **范围**：仅小红书、B站、知乎、脉脉、掘金、牛客；仅前端岗位、前端知识、低代码前端或 AI 前端应用。
- **结果**：本次未新增任何来源、题目或趋势结论。失败被如实记录，已有资料不重复登记。
- **抓取日期**：2026-07-12。

## 执行与通道状态

| 平台 | Agent Reach 路由/查询 | 结果 | 原因与处理 |
| --- | --- | --- | --- |
| 小红书 | 先运行 `agent-reach doctor --json` 与 `opencli doctor`，再拟搜索“2026 前端 React 面经 项目难点” | 失败，未读取笔记 | 自动化受限环境无法对 `/Users/liuxin/.agent-reach` 执行 Agent Reach 所需权限；OpenCLI daemon 未运行、Chrome 扩展未连接。未尝试裸 ID，也未保存/暴露 xsec_token。 |
| B站 | Agent Reach `bili search` | 失败 | 当前 PATH 中无 `bili` 命令，未安装可用 B站 CLI。 |
| 知乎 | Exa 定向搜索 | 失败 | Exa MCP 域名 `mcp.exa.ai` DNS 解析失败。 |
| 脉脉 | Exa 定向搜索 | 失败 | 同上；未用营销/转载内容替代。 |
| 掘金 | Exa 定向搜索 | 失败 | 同上。 |
| 牛客 | Exa 定向搜索 | 失败 | 同上。 |

## 重试条件

1. 在具备本机用户目录写权限的运行环境中重新运行 `agent-reach doctor --json`。
2. 为小红书保持 Chrome、OpenCLI 扩展与登录态可用；每次先搜索取得当次完整 URL，再读取，且只保存稳定笔记链接/ID。
3. 恢复代理/DNS 与 Exa 连通性，并补齐 B站 CLI 后再做增量检索、去重和正文核验。

没有把任何 Cookie、Token、xsec_token 或秘密写入本文档。
