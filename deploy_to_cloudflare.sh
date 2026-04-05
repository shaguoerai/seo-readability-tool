#!/bin/bash
# deploy_to_cloudflare.sh - 部署SEO工具站到Cloudflare Pages
# 使用方法: ./deploy_to_cloudflare.sh

set -e  # 遇到错误立即退出

echo "================================================================================"
echo "                    SEO工具站 - Cloudflare Pages部署脚本"
echo "================================================================================"
echo ""

# 检查是否在正确目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误: 不在SEO工具站项目目录中"
    echo "请切换到: cd /root/seo-readability-tool"
    exit 1
fi

# 检查wrangler是否安装
if ! command -v wrangler &> /dev/null; then
    echo "❌ 错误: wrangler CLI未安装"
    echo "安装命令: npm install -g wrangler"
    echo "或使用: pnpm add -g wrangler"
    exit 1
fi

# 检查环境变量
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ 错误: CLOUDFLARE_API_TOKEN环境变量未设置"
    echo ""
    echo "设置方法:"
    echo "1. 获取Cloudflare API Token:"
    echo "   - 登录 https://dash.cloudflare.com/"
    echo "   - 进入 My Profile → API Tokens"
    echo "   - 创建Token，选择 'Edit Cloudflare Workers' 模板"
    echo "   - 添加 'Account.Account Settings' 和 'Account.Worker Scripts' 权限"
    echo "   - 资源: 包含 'All accounts'"
    echo ""
    echo "2. 设置环境变量（永久）:"
    echo "   echo 'export CLOUDFLARE_API_TOKEN=你的token' >> ~/.bashrc"
    echo "   source ~/.bashrc"
    echo ""
    echo "3. 设置环境变量（临时）:"
    echo "   export CLOUDFLARE_API_TOKEN=你的token"
    echo ""
    echo "⚠️ 重要: 不要将token明文写在脚本中！"
    exit 1
fi

echo "✅ 环境检查通过"
echo "📁 项目目录: $(pwd)"
echo "🔧 wrangler版本: $(wrangler --version)"
echo ""

# 显示部署信息
echo "📋 部署配置"
echo "------------------------------------------------------------------------"
echo "项目名称: seo-readability-tool"
echo "部署目录: . (当前目录)"
echo "主要文件:"
echo "  - index.html (主界面)"
echo "  - analyzer.js (分析引擎)"
echo "  - i18n.js (国际化)"
echo "  - styles.css (样式)"
echo ""

# 确认部署
read -p "🚀 确认部署到Cloudflare Pages? (y/N): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 部署已取消"
    exit 0
fi

echo "🔄 开始部署..."

# 执行部署命令
wrangler pages deploy . \
  --project-name="seo-readability-tool" \
  --branch="main" \
  --commit-message="Deploy via wrangler CLI - $(date '+%Y-%m-%d %H:%M:%S')"

echo ""
echo "✅ 部署命令已提交"
echo ""
echo "📊 下一步操作:"
echo "1. 访问Cloudflare控制台查看部署状态"
echo "2. 等待1-2分钟部署完成"
echo "3. 访问新地址: https://[hash].seo-readability-tool.pages.dev"
echo "4. 检查所有功能是否正常"
echo ""
echo "🔧 故障排除:"
echo "- 如果部署失败，检查API Token权限"
echo "- 查看部署日志: wrangler pages deployment list"
echo "- 重新部署: 再次运行此脚本"
echo ""
echo "================================================================================"
echo "                           部署脚本执行完成"
echo "================================================================================"