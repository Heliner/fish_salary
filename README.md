# 工资计算器应用

一个简单的工资计算应用，可根据工作模式、工作时间和时薪显示今日实时收入工资。

![](https://github.com/Heliner/fish_salary/blob/main/res/demo.gif)

## 功能特点
- 支持多种工作模式（双休、大小周、996）
- 自定义工作时间段和时薪设置
- 收入实时更新，每10秒自动刷新
- 收入增加时显示浮动动画效果
- 响应式设计，适配各种设备

## 本地开发

### 前提条件
- Node.js (v14+) 和 npm

### 安装步骤
1. 克隆本仓库
```bash
git clone https://github.com/yourusername/salary-calculator.git
cd salary-calculator
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm start
```

4. 在浏览器中访问 `http://localhost:1234`

这是一个简单的摸鱼助手，用于展示当天已经赚到的钱，数据每 5 秒更新一次。

## 功能特性
1. 根据当天工作时长计算已收获的工资
2. 支持修改工作时间、月工资和工作模式（双休、大小周、996）
3. 友好的界面，类似番茄时钟，中间有大图标显示收益
4. 收益更新时有动画特效

## 默认设置
- 工作时间：9:00 - 18:00
- 月工资：8000
- 工作模式：每月双休

## 安装与运行
1. 安装依赖
```bash
npm install
```
2. 启动开发服务器
```bash
npm start
```
3. 构建项目
```bash
npm run build
```

## 使用方法
1. 在设置区域修改工作时间、月工资和工作模式
2. 点击“更新设置”按钮应用新设置
3. 界面会自动每 5 秒更新一次收益数据

## 注意事项
- 双休日历数据为模拟数据，实际使用时可从接口获取真实数据
- 计算结果仅供娱乐，不代表实际工资收入

## 在Vercel上免费部署

### 准备工作
1. 将项目推送到GitHub仓库
2. 注册/登录Vercel账号: https://vercel.com/signup

### 部署步骤
1. 安装Vercel CLI
```bash
npm install -g vercel
```

2. 在项目根目录执行部署命令
```bash
vercel
```

3. 按照提示完成部署配置:
   - 确认项目根目录
   - 选择框架预设: `Other`
   - 设置构建命令: `npm run build`
   - 设置输出目录: `dist`
   - 是否覆盖现有设置: `No`

4. 等待部署完成，Vercel会提供一个URL（如 https://salary-calculator.vercel.app）

### 自动部署配置
1. 将代码推送到GitHub后，Vercel会自动检测并部署更新
2. 如需自定义部署设置，可在Vercel控制台修改项目配置

## 技术栈
- HTML/CSS/JavaScript
- Parcel 打包工具
- 本地存储 (localStorage) 保存用户设置

## 许可证
MIT