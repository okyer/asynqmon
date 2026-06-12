# Changelog

All notable changes to this project will be documented in this file.

The format is based on ["Keep a Changelog"](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-06-12

### 核心升级内容

| 技术栈 | 旧版本 | 新版本 |
|--------|--------|--------|
| 构建工具 | `react-scripts` 5.0.1 (CRA) | **Vite 6.4.3** |
| React | 16.13.1 | **19.x** |
| TypeScript | 4.2.4 | **5.7.x** |
| MUI | `@material-ui` 4.12.3 | **`@mui/material` 6.4.0** |
| React Router | 5.3.0 | **7.1.0** |
| Redux Toolkit | 1.6.2 | **2.5.0** |
| react-redux | 7.2.4 | **9.2.0** |
| axios | 0.21.2 | **1.7.9** |
| golang | 1.16.0 | 1.26.0 |

### 关键变更

1. **构建工具迁移**：从 Create React App 迁移到 Vite，启动更快，配置更简洁
2. **MUI v4 → v6**：所有 `@material-ui/*` 包替换为 `@mui/material`，`makeStyles` 通过 `tss-react` 库兼容
3. **React Router v5 → v7**：`Switch` → `Routes`，`useHistory` → `useNavigate`，移除 `useRouteMatch`
4. **React 19**：使用 `createRoot` API，移除 `React` 默认导入
5. **配置文件**：新增 `vite.config.ts`、`tsconfig.node.json`，更新 `tsconfig.json` 适配现代 TypeScript
6. **SVG 处理**：将 SVG logo 内联为 React 组件（替代 CRA 的 `svgr` 语法）
7. **Makefile**：简化构建命令适配 Vite

### Fixed

1. 修复 asynq v0.26.0 的 Redis Lua 脚本兼容性问题。

**修改内容：** `vendor/github.com/hibiken/asynq/internal/rdb/inspect.go` 中的 `memoryUsageCmd` 脚本

- **问题：** `redis.call("MEMORY", "USAGE", key)` 在 Redis 7.x 中 key 不存在时返回 `false`（boolean），脚本直接对其做算术运算导致 `attempt to perform arithmetic on local 'bytes' (a boolean value)`
- **修复：** 对 3 处 `MEMORY USAGE` 的返回值统一加了 `tonumber()` 转换和 `if bytes then` 保护：
  - 第 266 行：`local bytes = tonumber(redis.call("MEMORY", "USAGE", ARGV[1] .. id))`
  - 第 283 行：`local bytes = tonumber(redis.call("MEMORY", "USAGE", ARGV[1] .. id))`
  - 第 306 行：`local bytes = tonumber(redis.call("MEMORY", "USAGE", ARGV[1] .. id))`
  - 对容器本身的 `MEMORY USAGE` 也加了 `tonumber()`（第 273、290 行）

2. **前端：Vite 环境判断错误** — `ui/src/api.ts` 第 8 行
   - 原代码：`import.meta.env.DEV === "production"`（永远 false）
   - 修复为：`import.meta.env.DEV`（正确区分开发和生产环境）

3. **前端：双斜杠 URL** — `ui/src/api.ts` `getBaseUrl()`
   - 原代码：`window.ROOT_PATH = "/"` 时生成 `//api`
   - 修复为：`const root = window.ROOT_PATH === "/" ? "" : window.ROOT_PATH;`

## [0.7.0] - 2022-04-11

Version 0.7 added support for [Task Aggregation](https://github.com/hibiken/asynq/wiki/Task-aggregation) feature

### Added
 
- (ui): Added tasks view to show aggregated tasks

## [0.6.1] - 2022-03-17

### Fixed
- (ui): Show metrics link in sidebar when --prometheus-addr flag is provided

## [0.6.0] - 2022-03-02

### Added

- (cmd): Added `--read-only` flag to specify read-only mode
- (pkg): Added `Options.ReadOnly` to restrict user to view-only mode
- (ui): Hide action buttons in read-only mode
- (ui): Display queue latency in dashboard page and queue detail page.
- (ui): Added copy-to-clipboard button for task ID in tasks list-view page.
- (ui): Use logo image in the appbar (thank you @koddr!)

### Fixed
- (ui): Pagination in ActiveTasks table is fixed

## [0.5.0] - 2021-12-19

Version 0.5 added support for [Prometheus](https://prometheus.io/) integration.

- (cmd): Added `--enable-metrics-exporter` option to export queue metrics.
- (cmd): Added `--prometheus-addr` to enable metrics view in Web UI.
- (pkg): Added `Options.PrometheusAddress` to enable metrics view in Web UI.

## [0.4.0] - 2021-11-06

- Added "completed" state
- Updated to be compatible with asynq v0.19

## [0.3.2] - 2021-10-22

- (ui): Fixed build

## [0.3.1] - 2021-10-21

### Added

- (cmd): Added --max-payload-length to allow specifying number of characters displayed for payload, defaults to 200 chars
- (pkg): DefaultPayloadFormatter is now exported from the package

## [0.3.0]

### Changed

- Asynqmon is now a go package that can be imported to other projects!

## [0.2.1]

### Addded

- Task details view is added
- Search by task ID feature is added

## [0.2]

### Changed

- Updated to depend on asynq 0.18

## [0.1.0-beta1] - 2021-01-31

Initial Beta Release 🎉


