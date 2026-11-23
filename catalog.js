// Generated from robot_video_metrics.registry.METRIC_LIST
const metricCatalog = [
  {
    "id": "ms_ssim",
    "name": "MS-SSIM",
    "group": "全图画质",
    "category": "traditional",
    "description": "逐帧比较多尺度结构相似度，并分别汇总三个视角。",
    "requires": [
      "帧对齐的原片与压缩片"
    ],
    "direction": "越高越好",
    "purpose": "",
    "available": true,
    "input_scope": "frame_pair"
  },
  {
    "id": "psnr",
    "name": "PSNR",
    "group": "全图画质",
    "category": "traditional",
    "description": "根据原片和压缩片对应像素的均方误差计算峰值信噪比，单位为 dB。",
    "requires": [
      "帧对齐的原片与压缩片",
      "像素动态范围与颜色通道口径"
    ],
    "direction": "越高越好",
    "purpose": "",
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "ssim",
    "name": "SSIM",
    "group": "全图画质",
    "category": "traditional",
    "description": "逐帧比较原片和压缩片在单一尺度下的局部亮度、对比度和结构。",
    "requires": [
      "帧对齐的原片与压缩片",
      "颜色通道与 SSIM 窗口设置"
    ],
    "direction": "越高越好",
    "purpose": "",
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "masked_kpc",
    "name": "Masked-KPC",
    "group": "前景与几何",
    "category": "proxy",
    "description": "比较运动学投影点与前景中的图像观测位置。",
    "requires": [
      "关节状态与 URDF",
      "相机及手眼标定",
      "前景掩膜与图像对应点"
    ],
    "direction": "越低越好",
    "purpose": "",
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "cmc",
    "name": "CMC",
    "group": "前景与几何",
    "category": "proxy",
    "description": "比较原片和压缩片的接触概率图。",
    "requires": [
      "经接触真值验证的冻结接触预测器",
      "无接触帧与归一化规则"
    ],
    "direction": "越高越好",
    "purpose": "",
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "fg_dino",
    "name": "FG-DINO",
    "group": "前景与几何",
    "category": "proxy",
    "description": "比较任务前景内 DINOv2 局部特征的余弦相似度。",
    "requires": [
      "原片前景掩膜",
      "冻结的 DINOv2-small 权重和特征层"
    ],
    "direction": "越高越好",
    "purpose": "",
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "tde",
    "name": "TDE",
    "group": "前景与几何",
    "category": "proxy",
    "description": "比较多视角对应点在压缩前后的三角化位置。",
    "requires": [
      "跨视角同步与标定",
      "同名点",
      "参考深度或运动学锚点"
    ],
    "direction": "越低越好",
    "purpose": "",
    "available": false,
    "input_scope": "multiview"
  },
  {
    "id": "ral_edge",
    "name": "RAL_edge",
    "group": "机械臂区域",
    "category": "proxy",
    "description": "计算机械臂或夹爪轮廓边缘带内的梯度结构损失。",
    "requires": [
      "原片中冻结的机械臂或夹爪轮廓"
    ],
    "direction": "越低越好",
    "purpose": "",
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "ral_align",
    "name": "RAL_align",
    "group": "机械臂区域",
    "category": "proxy",
    "description": "测量轮廓带内两组边缘的双向距离。",
    "requires": [
      "冻结的轮廓边缘带",
      "空边缘集规则"
    ],
    "direction": "越低越好",
    "purpose": "",
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "ral_inner",
    "name": "RAL_inner",
    "group": "机械臂区域",
    "category": "proxy",
    "description": "评估机械臂或夹爪内部的亮度与纹理结构损失。",
    "requires": [
      "原片填充掩膜",
      "内部区域与权重规则"
    ],
    "direction": "越低越好",
    "purpose": "",
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "ral_total",
    "name": "RAL_total",
    "group": "机械臂区域",
    "category": "proxy",
    "description": "加权汇总头部视角的边缘、对齐与内部损失。",
    "requires": [
      "三个头部 RAL 分量",
      "有效样本与聚合规则"
    ],
    "direction": "越低越好",
    "purpose": "",
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "ral_edge_inner",
    "name": "RAL_edge_inner",
    "group": "机械臂区域",
    "category": "proxy",
    "description": "评估腕部画面中夹爪内侧边缘的结构损失。",
    "requires": [
      "夹爪内侧轮廓标注或确定的提取规则"
    ],
    "direction": "越低越好",
    "purpose": "",
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "ral_align_inner",
    "name": "RAL_align_inner",
    "group": "机械臂区域",
    "category": "proxy",
    "description": "评估腕部画面中夹爪内侧轮廓的错位。",
    "requires": [
      "夹爪内侧轮廓标注或确定的提取规则"
    ],
    "direction": "越低越好",
    "purpose": "",
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "action_mae_rmse",
    "name": "Action MAE/RMSE",
    "group": "动作与策略",
    "category": "proxy",
    "description": "比较原片与压缩片输入下的策略动作，或将预测动作与专家动作对齐，报告平均绝对误差和均方根误差。",
    "requires": [
      "时间对齐的预测动作及参考动作",
      "动作单位、归一化与多维聚合规则"
    ],
    "direction": "越低越好",
    "purpose": "低成本检查动作输出的一致性。",
    "available": false,
    "input_scope": "experiment"
  },
  {
    "id": "ard",
    "name": "ARD",
    "group": "动作与策略",
    "category": "proxy",
    "description": "比较同一策略在原始观测和压缩观测下的动作分布。",
    "requires": [
      "配对观测下的动作分布或采样结果",
      "采样规则与分布距离定义"
    ],
    "direction": "越低越好",
    "purpose": "诊断策略响应差异，不能代替闭环成功率（SR）。",
    "available": false,
    "input_scope": "experiment"
  },
  {
    "id": "pfd",
    "name": "PFD",
    "group": "动作与策略",
    "category": "proxy",
    "description": "衡量扩散策略（DP）视觉特征在原片和压缩片之间的余弦漂移。",
    "requires": [
      "对齐的原片与压缩片",
      "冻结的 DP 视觉编码器权重、特征层与预处理"
    ],
    "direction": "越低越好",
    "purpose": "检查压缩对策略内部视觉表征的破坏程度。",
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "cved",
    "name": "CVED",
    "group": "多视角几何",
    "category": "proxy",
    "description": "比较解码后与原片中对应像点的跨视图极线误差，报告误差增量。",
    "requires": [
      "同步的跨视角原片与解码帧",
      "相机内外参",
      "具有相同身份的跨视角对应点"
    ],
    "direction": "越低越好",
    "purpose": "诊断多视角几何一致性。",
    "available": false,
    "input_scope": "multiview"
  },
  {
    "id": "dr_h",
    "name": "DR^H",
    "group": "动作与策略",
    "category": "proxy",
    "description": "估计采用压缩观测下的动作后，相对原始观测下动作的长期成功概率损失。",
    "requires": [
      "配对状态与策略动作",
      "校准的成功概率估计器",
      "预测时域 H"
    ],
    "direction": "越低越好，可为负",
    "purpose": "评估动作对长期任务成功的影响。",
    "available": false,
    "input_scope": "experiment"
  },
  {
    "id": "delta_sr",
    "name": "ΔSR",
    "group": "闭环任务",
    "category": "key",
    "description": "比较使用原始与压缩训练数据的策略成功率。",
    "requires": [
      "配对训练条件",
      "相同场景与种子的逐局闭环结果"
    ],
    "direction": "越高越好",
    "purpose": "",
    "available": false,
    "input_scope": "experiment"
  },
  {
    "id": "iscr",
    "name": "ISCR(ε)",
    "group": "闭环任务",
    "category": "key",
    "description": "计算满足成功率容差的最大实际存储压缩比。",
    "requires": [
      "成功率容差 ε",
      "候选档位的 ΔSR",
      "完整交付字节"
    ],
    "direction": "越高越好",
    "purpose": "",
    "available": false,
    "input_scope": "experiment"
  },
  {
    "id": "caia_loss",
    "name": "CAIA-Loss",
    "group": "编码诊断",
    "category": "proxy",
    "description": "评估三视角视觉信息对动作预测贡献的压缩损失。",
    "requires": [
      "正式公式或参考实现",
      "同步状态和动作",
      "预测器与聚合规则"
    ],
    "direction": "",
    "purpose": "编码端诊断，分析三视角和不同任务阶段的码率分配。",
    "available": false,
    "input_scope": "multiview"
  }
];
