# 快速部署指南

## 🚀 一键部署命令

### 前提条件
1. 已在服务器设置环境变量：
   ```bash
   echo 'export CLOUDFLARE_API_TOKEN=你的真实token' >> ~/.bashrc
   source ~/.bashrc
   ```

2. 已安装 wrangler CLI：
   ```bash
   npm install -g wrangler
   ```

### 部署命令
```bash
cd /root/seo-readability-tool && wrangler pages deploy . --project-name seo-readability-tool
```

### 或使用部署脚本
```bash
cd /root/seo-readability-tool
./deploy.sh
```

## 📁 项目结构
```
/root/seo-readability-tool/
├── index.html          # 主界面
├── deploy.sh          # 部署脚本
├── package.json       # 项目配置
├── _headers          # 安全头
├── _redirects        # 重定向
└── ...其他文件
```

## 🔗 工具地址
- **Cloudflare Pages**: https://3107b270.seo-readability-tool.pages.dev
- **GitHub Pages**: https://shaguoerai.github.io/seo-readability-tool/

## 🔧 修复bug后的标准流程
1. 修改代码文件
2. 测试修复效果
3. 提交到GitHub：
   ```bash
   git add .
   git commit -m "修复描述"
   git push origin main
   ```
4. 部署到Cloudflare：
   ```bash
   cd /root/seo-readability-tool
   ./deploy.sh
   ```
5. 验证更新（1-2分钟后）

## ⚠️ 重要提醒
- **Token安全**: 永远不要将token写在代码或提交记录中
- **环境变量**: 只通过环境变量传递token
- **权限最小化**: 使用最小必要权限的token
- **验证部署**: 每次部署后检查功能是否正常