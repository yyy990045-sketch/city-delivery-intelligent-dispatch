# 城市配送许可记录

本仓库尚未选择项目整体许可证；`private: true` 只表示不发布到 npm，不代表已授予开源使用许可。本轮不替 Owner 选择许可证。

## 必须保留的来源与授权

- [车辆模型授权](../../frontend/public/assets/models/LICENSE.md)：3dassets.dev 的两份 GLB，CC0 1.0。
- [柏林与杭州离线地图说明](../../frontend/public/demo/city-delivery/geo-city/v1/README.md)：© OpenStreetMap contributors，ODbL 1.0，保留原始快照、来源、署名及相同方式共享要求。
- [杭州历史地理包来源](../../frontend/public/demo/city-delivery/geo-hangzhou-xixi/v1/LICENSE.md)：OpenStreetMap，ODbL 1.0。
- [当前 npm 依赖清单](third-party-dependencies.md)：来自当前锁文件，不把缺失许可信息视为授权；安装包中的版权与许可证原文保持不变。
- [Python 依赖](../../tools/city-delivery-decision/requirements.txt)：OR-Tools 9.11.4210，Apache-2.0；其传递依赖遵循安装包各自的许可证。
- [行为准则](../../CODE_OF_CONDUCT.md)：保留 Contributor Covenant 2.1 的来源与署名。

合成订单、仓库、车辆参数和业务成本不是企业数据。第三方资料的许可不自动覆盖本项目自有代码，也不构成法律意见。

更新依赖后可运行 `npm run licenses:report` 与 `npm run licenses:verify`，重新生成清单并核对来源。修改或分发第三方数据时，仍须遵守对应许可原文。
