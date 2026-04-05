# Cloudflare Pages 部署设置指南

## 🚀 快速设置

### 1. 安装 wrangler CLI
```bash
# 使用 npm
npm install -g wrangler

# 或使用 pnpm
pnpm add -g wrangler
```

### 2. 获取 Cloudflare API Token
1. 登录 https://dash.cloudflare.com/
2. 进入 **My Profile** → **API Tokens**
3. 点击 **Create Token**
4. 选择模板: **Edit Cloudflare Workers**
5. 添加权限:
   - `Account.Account Settings` - Read
   - `Account.Worker Scripts` - Edit
6. 资源: 选择 **All accounts**
7. 点击 **Continue to summary** → **Create Token**
8. 复制生成的Token（只显示一次）

### 3. 设置环境变量（永久）
```bash
# 添加到 ~/.bashrc
echo 'export CLOUDFLARE_API_TOKEN=你的token' >> ~/.bashrc

# 立即生效
source ~/.bashrc

# 验证设置
echo $CLOUDFLARE_API_TOKEN
```

### 4. 登录 wrangler
```bash
# 使用API Token登录
wrangler login

# 或使用全局API Key（备用）
wrangler config
```

## 📁 项目结构要求

### 必需文件
```
seo-readability-tool/
├── index.html          # 主页面
├── package.json        # 项目配置
├── _headers           # 安全头配置
├── _redirects         # 重定向配置
├── _routes.json       # 路由配置（可选）
├── deploy_to_cloudflare.sh  # 部署脚本
└── ...其他文件
```

### package.json 示例
```json
{
  "name": "seo-readability-tool",
  "version": "1.0.0",
  "description": "SEO可读性分析工具",
  "main": "index.html",
  "scripts": {
    "deploy": "./deploy_to_cloudflare.sh"
  }
}
```

## 🔧 部署流程

### 手动部署
```bash
# 切换到项目目录
cd /root/seo-readability-tool

# 运行部署脚本
./deploy_to_cloudflare.sh
```

### 自动部署（GitHub Actions）
创建 `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: seo-readability-tool
          directory: .
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

## ⚙️ 部署命令详解

### 基础命令
```bash
# 使用环境变量中的token
CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN wrangler pages deploy . \
  --project-name="seo-readability-tool" \
  --branch="main"
```

### 完整命令（脚本中使用）
```bash
wrangler pages deploy . \
  --project-name="seo-readability-tool" \
  --branch="main" \
  --commit-message="Deploy via wrangler CLI - $(date '+%Y-%m-%d %H:%M:%S')"
```

### 命令选项
- `--project-name`: 项目名称（必须与Cloudflare中一致）
- `--branch`: 分支名称（默认：当前分支）
- `--commit-message`: 部署提交信息
- `--directory`: 部署目录（默认：当前目录）

## 📊 部署状态管理

### 查看部署列表
```bash
wrangler pages deployment list --project-name=seo-readability-tool
```

### 查看部署详情
```bash
wrangler pages deployment get <deployment-id> --project-name=seo-readability-tool
```

### 删除部署
```bash
wrangler pages deployment delete <deployment-id> --project-name=seo-readability-tool
```

## 🛡️ 安全最佳实践

### Token 安全
1. **不要明文存储**: 永远不要将token写在脚本、代码或提交记录中
2. **使用环境变量**: 通过环境变量传递token
3. **限制权限**: 只授予必要的最小权限
4. **定期轮换**: 每3-6个月更新一次token

### 环境变量管理
```bash
# 安全设置环境变量
export CLOUDFLARE_API_TOKEN="你的token"

# 验证而不显示
echo $CLOUDFLARE_API_TOKEN | wc -c

# 从文件读取（更安全）
source ~/.cloudflare-token.env
```

## 🔍 故障排除

### 常见问题

#### 1. Token 无效
```
Error: Failed to authenticate. Please make sure you're logged in.
```
**解决**: 重新生成Token，确保权限正确

#### 2. 项目不存在
```
Error: Project 'seo-readability-tool' not found.
```
**解决**: 先在Cloudflare控制台创建项目，或检查项目名称拼写

#### 3. 部署失败
```
Error: Failed to upload project.
```
**解决**: 检查文件权限和大小限制（Cloudflare Pages有100MB限制）

#### 4. 访问权限不足
```
Error: You do not have permission to perform this action.
```
**解决**: 检查Token权限，确保包含Pages部署权限

### 调试命令
```bash
# 启用详细日志
WRANGLER_LOG=debug wrangler pages deploy ...

# 检查网络连接
curl -I https://api.cloudflare.com/

# 检查wrangler版本
wrangler --version
```

## 🌐 多环境部署

### 生产环境
```bash
# 生产部署（主分支）
./deploy_to_cloudflare.sh
```

### 预览环境
```bash
# 预览部署（特性分支）
wrangler pages deploy . \
  --project-name="seo-readability-tool" \
  --branch="feature/new-design" \
  --env="preview"
```

### 自定义域名
1. 在Cloudflare控制台添加自定义域名
2. 更新DNS记录指向Cloudflare Pages
3. 等待SSL证书自动签发

## 📈 监控与日志

### 查看访问日志
1. 登录Cloudflare控制台
2. 进入 **Analytics & Logs** → **Workers & Pages**
3. 选择 **seo-readability-tool** 项目
4. 查看请求、错误、性能数据

### 性能监控
- **加载时间**: 目标 < 2秒
- **可用性**: 目标 99.9%
- **错误率**: 目标 < 0.1%

### 告警设置
1. 进入 **Notifications** → **Create**
2. 选择 **Pages** → **Deployment Failed**
3. 设置通知渠道（Email, Slack, Webhook）

## 🔄 持续集成/持续部署

### GitHub Actions 工作流
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Test HTML validity
        run: |
          # 添加测试脚本
          npm test
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Cloudflare Pages
        run: ./deploy_to_cloudflare.sh
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## 🎯 最佳实践总结

1. **自动化部署**: 使用脚本或CI/CD流水线
2. **版本控制**: 每次部署都有明确的提交记录
3. **回滚计划**: 知道如何快速回滚到上一版本
4. **监控告警**: 设置部署失败告警
5. **文档更新**: 每次部署后更新README中的链接
6. **测试验证**: 部署后立即验证功能

---

**立即执行**: 
1. 设置环境变量 `CLOUDFLARE_API_TOKEN`
2. 测试部署脚本 `./deploy_to_cloudflare.sh`
3. 验证新地址 https://3107b270.seo-readability-tool.pages.dev