# 三视角视频评测

[打开 GitHub Pages 演示](https://isqingyun.github.io/robot-video-metrics-demo/)

切换头部、左夹爪和右夹爪视角，查看合成样例压缩前后的首帧和逐帧 MS-SSIM 统计。页面也列出了 14 个指标的实现状态、输入要求，以及计算服务接收六个 MP4 或 MOV 文件的 HTTP 接口。

此仓库仅包含静态网页、合成样例首帧与预先计算的统计值。真实视频通过单独部署的计算服务提交。

GitHub Pages 从 `main` 分支根目录发布。更新页面后，将静态文件提交到此分支即可。
