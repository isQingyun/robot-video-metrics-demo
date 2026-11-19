// Generated from robot_video_metrics.registry.METRIC_LIST
const metricCatalog = [
  {
    "id": "ms_ssim",
    "name": "MS-SSIM",
    "group": "全图画质",
    "description": "逐帧比较多尺度结构相似度，并分别汇总三个视角。",
    "requires": [
      "帧对齐的原片与压缩片"
    ],
    "available": true,
    "input_scope": "frame_pair"
  },
  {
    "id": "masked_kpc",
    "name": "Masked-KPC",
    "group": "前景与几何",
    "description": "比较运动学投影点与前景中的图像观测位置。",
    "requires": [
      "关节状态与 URDF",
      "相机及手眼标定",
      "前景掩膜与图像对应点"
    ],
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "cmc",
    "name": "CMC",
    "group": "前景与几何",
    "description": "比较原片和压缩片的接触概率图。",
    "requires": [
      "经接触真值验证的冻结接触预测器",
      "无接触帧与归一化规则"
    ],
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "fg_dino",
    "name": "FG-DINO",
    "group": "前景与几何",
    "description": "比较任务前景内 DINOv2 局部特征的余弦相似度。",
    "requires": [
      "原片前景掩膜",
      "冻结的 DINOv2-small 权重和特征层"
    ],
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "tde",
    "name": "TDE",
    "group": "前景与几何",
    "description": "比较多视角对应点在压缩前后的三角化位置。",
    "requires": [
      "跨视角同步与标定",
      "同名点",
      "参考深度或运动学锚点"
    ],
    "available": false,
    "input_scope": "multiview"
  },
  {
    "id": "ral_edge",
    "name": "RAL_edge",
    "group": "机械臂区域",
    "description": "计算机械臂或夹爪轮廓边缘带内的梯度结构损失。",
    "requires": [
      "原片中冻结的机械臂或夹爪轮廓"
    ],
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "ral_align",
    "name": "RAL_align",
    "group": "机械臂区域",
    "description": "测量轮廓带内两组边缘的双向距离。",
    "requires": [
      "冻结的轮廓边缘带",
      "空边缘集规则"
    ],
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "ral_inner",
    "name": "RAL_inner",
    "group": "机械臂区域",
    "description": "评估机械臂或夹爪内部的亮度与纹理结构损失。",
    "requires": [
      "原片填充掩膜",
      "内部区域与权重规则"
    ],
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "ral_total",
    "name": "RAL_total",
    "group": "机械臂区域",
    "description": "加权汇总头部视角的边缘、对齐与内部损失。",
    "requires": [
      "三个头部 RAL 分量",
      "有效样本与聚合规则"
    ],
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "ral_edge_inner",
    "name": "RAL_edge_inner",
    "group": "机械臂区域",
    "description": "评估腕部画面中夹爪内侧边缘的结构损失。",
    "requires": [
      "夹爪内侧轮廓标注或确定的提取规则"
    ],
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "ral_align_inner",
    "name": "RAL_align_inner",
    "group": "机械臂区域",
    "description": "评估腕部画面中夹爪内侧轮廓的错位。",
    "requires": [
      "夹爪内侧轮廓标注或确定的提取规则"
    ],
    "available": false,
    "input_scope": "frame_pair"
  },
  {
    "id": "delta_sr",
    "name": "ΔSR",
    "group": "闭环任务",
    "description": "比较使用原始与压缩训练数据的策略成功率。",
    "requires": [
      "配对训练条件",
      "相同场景与种子的逐局闭环结果"
    ],
    "available": false,
    "input_scope": "experiment"
  },
  {
    "id": "iscr",
    "name": "ISCR(ε)",
    "group": "闭环任务",
    "description": "计算满足成功率容差的最大实际存储压缩比。",
    "requires": [
      "成功率容差 ε",
      "候选档位的 ΔSR",
      "完整交付字节"
    ],
    "available": false,
    "input_scope": "experiment"
  },
  {
    "id": "caia_loss",
    "name": "CAIA-Loss",
    "group": "编码诊断",
    "description": "评估三视角视觉信息对动作预测贡献的压缩损失。",
    "requires": [
      "正式公式或参考实现",
      "同步状态和动作",
      "预测器与聚合规则"
    ],
    "available": false,
    "input_scope": "multiview"
  }
];
