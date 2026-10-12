# 参与贡献

本仓库仅维护城市配送作品。请先按 [README](README.md) 安装并启动前端与 8114 规划服务。

## 修改范围

使用独立分支和拉取请求，一次只做一件事。保留已确认方案、历史案例、数据来源和第三方授权；不要把合成任务或模拟播放写成企业实际运行。

与修改相关的验证包括：

```bash
npm run typecheck
npm run frontend:test
npm run frontend:build
npm run frontend:e2e:city-delivery
npm run frontend:e2e:gis
```

Python 检查命令和浏览器安装要求见 README。实际打开页面完成相关操作，不能只靠构建通过判断交付。

不提交软件安装目录、虚拟环境、密钥、客户资料或临时运行日志。不要修改已冻结案例和历史证据以制造更好的结果；需要更新计算时，另存新输入、结果及来源。

拉取请求须说明改动目的、影响范围、实际操作结果、仍未验证的边界，以及许可/数据来源是否变化。
