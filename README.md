# 三视角视频评测

[打开 GitHub Pages 演示](https://isqingyun.github.io/robot-video-metrics-demo/)

公开演示沿用计算工作台的界面。按头部、左腕和右腕分别选择原始视频与压缩视频，即可预览六个文件的配对方式。打开内置样例可以查看三路逐帧 MS-SSIM 统计与等权平均分。

[指标目录](https://isqingyun.github.io/robot-video-metrics-demo/#catalog)按传统指标、代理指标和关键指标分组，共 21 项。展开指标可查看定义、所需输入和计算状态。计算服务目前已实现 MS-SSIM，其余 20 项已预留接口。

演示页中的文件选择只在当前浏览器中生效。页面上的示例分数来自合成测试视频。需要评测自己的文件时，请使用已部署的计算工作台。

站点使用仓库根目录的静态文件，无需安装依赖或执行构建。发布来源可在仓库的 `Settings → Pages` 中查看。
