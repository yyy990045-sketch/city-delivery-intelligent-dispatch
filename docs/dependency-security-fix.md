# 开发依赖安全修复与完整回归

基线 main：`aa3673c11fe052e30fcc78eac396632f9b9396af`。独立分支：`codex/city-delivery-development-dependency-security`。本轮只修复开发依赖，不修改六页、三维装载、GIS 几何、演示数据、Python、业务算法或既有测试。

## 安全结果

| 审计范围 | 修复前 | 修复后 |
| --- | --- | --- |
| 全部依赖中的受影响记录 | 7 | 0 |
| Critical | 2 | 0 |
| High | 2 | 0 |
| Moderate | 3 | 0 |
| 运行依赖中的受影响记录 | 0 | 0 |

修复前的 7 是 npm 对受影响依赖的计数，包含同一漏洞沿依赖链传递的记录，不等于 7 个独立漏洞。修复后的审计既在工作分支运行，也在独立干净目录执行 `npm ci` 后重新运行，两次结果一致；没有执行 `npm audit fix --force`。

原始报告：[全部依赖修复前](../artifacts/dependency-security/audit-before.json)、[修复后](../artifacts/dependency-security/audit-after.json)、[运行依赖修复前](../artifacts/dependency-security/audit-production-before.json)、[修复后](../artifacts/dependency-security/audit-production-after.json)。

## 实际版本变化

| 依赖 | 原版本 | 当前版本或处理 |
| --- | --- | --- |
| Vitest | 2.1.9 | 5.0.3，直接依赖固定版本 |
| Tinypool | 1.1.1 | 已移除；Vitest 5 不再依赖，锁文件和实际安装均无副本 |
| source-map-js | 1.2.1 | 1.2.2，通过现有传递依赖允许的版本范围更新 |
| @vitest/mocker | 2.1.9 | 5.0.3 |
| @vitest/spy | 2.1.9 | 5.0.3 |
| chai | 5.3.3 | 6.3.0，Vitest 必需依赖 |
| es-module-lexer | 1.7.0 | 2.3.2，Vitest 必需依赖 |
| std-env | 3.10.0 | 4.3.0，Vitest 必需依赖 |
| tinybench | 2.9.0 | 6.2.2，Vitest 必需依赖 |
| tinyexec | 0.3.2 | 1.3.1，Vitest 必需依赖 |
| why-is-node-running | 2.3.0 | 3.2.1，Vitest 必需依赖 |
| vite-node | 2.1.9 | 随旧测试链移除 |
| 测试链中的 Vite | 5.4.21，两处副本 | 已移除；使用原有顶层 Vite 7.3.6 |
| 测试链中的 esbuild | 0.21.5，两处副本 | 已移除；原有顶层 esbuild 0.28.2 不变 |

新增 `@types/chai`、`@types/deep-eql`、`obug` 和 Vitest 专用的 `magic-string` 副本等均来自 Vitest 5 必需闭包。完整逐路径变化见 [版本对照](../artifacts/dependency-security/dependency-changes.json)。锁文件的包记录由 322 变为 259，均含项目根记录；依赖包数由 321 变为 258。

React、React DOM、React Router、Three.js 及全部运行依赖的锁定记录未变。Vite、Playwright、TypeScript、Tailwind、jsdom 和其他直接开发依赖未升级。未引入强制版本覆盖规则。额外删除的根目录重复 `tslib@2.8.1` 不再需要；Tailwind WASI 子树所需的同版本副本仍保留，引用关系未变。第三方许可清单同步刷新到 258 条，OSM 和车辆模型的许可与署名未动。

## 兼容性

[Vitest 官方迁移说明](https://vitest.dev/guide/migration/)要求 Vite 至少 6.4、Node 至少 22.12；5.0.3 发布包声明 Node 范围为 `^22.12.0 || ^24.0.0 || >=26.0.0`。现有 Vite 7.3.6 满足要求，不需要升级。项目安装条件和 README 对齐该范围；此次实际使用 Node 24.18.0。

没有出现需要修改页面、配置、测试或断言的兼容性失败。所有既有测试文件逐字未变，没有删除、跳过、降低检查条件或扩大等待时限。

## 完整回归结果

在独立干净目录导出修复后的文件，重新 `npm ci` 并创建 Python 环境，不复用旧依赖目录。实际启动该目录中的 8111 和 8114 服务。

| 核查 | 结果 |
| --- | --- |
| npm ci | 成功，安装后重新审计为 0 |
| TypeScript 类型检查 | 通过 |
| 原有单元检查 | 4 个文件、21 项全部通过 |
| 前端构建 | 通过，原有大文件提示仍保留 |
| Python verify.py | 通过，四店与九店关联、装卸和时间窗规则保持正常 |
| Python verify_v3.py | 通过，新输入、输入拒绝、有限搜索失败、授权边界与并发状态正确；33 项路线时长核对通过 |
| GIS 数据核对 | 通过，3646 条有向道路边、100 条道路路径、10 个锚点及矩阵单位一致 |
| 城市配送浏览器回归 | 原有 9 项全部通过，无跳过、失败或重试后通过项 |
| GIS 浏览器回归 | 1440×900、1920×1080 的原有 4 项全部通过，无跳过、失败或重试后通过项 |
| 8114 健康检查 | ready，标准场景和兼容接口持续可用 |
| 8111 六页 | 全部实际打开并截图查看，未出现页面运行异常；根入口进入驾驶舱 |
| 第三方许可核对 | 通过，未知许可项 0 |

浏览器使用可见 WebKit，没有启动 Chrome/Chromium。城市配送与 GIS 检查顺序运行，避免并行改写结果。六页截图属于本轮真实运行记录，未使用上一轮画面代替查看。

业务实操保持：SKU 包装批次及任务导入、真实规划、失败后的明确恢复、候选与确认计划隔离、04 实际货位和装车播放、05 逐车卸货至剩余 0、作业单导出。独立六店场景中路线优先与仅修货位均返回搜索失败，联合反馈返回 ¥194.8 的可执行候选；本轮没有改变该算法或结论。GIS 场景中三车改两车、路网重组、相机、配载确认、卸货与导出均正常。

机器可读结果：[完整验收摘要](../artifacts/dependency-security/verification.json)。

## 保留的边界

0 项表示扫描时 npm 公告库没有发现当前依赖的已知漏洞，不等于整套系统安全认证，也不覆盖未知漏洞、Python 依赖或业务权限审计。原有大文件构建提示不在本轮优化范围；项目整体许可证尚未由 Owner 选择，第三方许可均保留。

本轮提交独立 PR 等待 Owner 审查，不自动合并，不修改原仓库，不改既有提交时间和历史。
