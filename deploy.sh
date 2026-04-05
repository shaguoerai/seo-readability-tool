#!/bin/bash
# deploy.sh - 简化版Cloudflare Pages部署脚本
# 前提: 已设置 CLOUDFLARE_API_TOKEN 环境变量
# 使用方法: ./deploy.sh

set -e

echo "🚀 开始部署SEO工具站到Cloudflare Pages"
echo "项目目录: $(pwd)"
echo ""

# 检查必需文件
if [ ! -f "index.html" ]; then
    echo "❌ 错误: 不在SEO工具站项目目录中"
    echo "请切换到: cd /root/seo-readability-tool"
    exit 1
fi

# 检查wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ 错误: wrangler CLI未安装"
    echo "安装: npm install -g wrangler"
    exit 1
fi

# 检查环境变量
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ 错误: CLOUDFLARE_API_TOKEN环境变量未设置"
    echo ""
    echo "设置方法:"
    echo "1. 获取Cloudflare API Token (Pages编辑权限)"
    echo "2. 执行: echo 'export CLOUDFLARE_API_TOKEN=你的token' >> ~/.bashrc"
    echo "3. 执行: source ~/.bashrc"
    echo "4. 验证: echo \$CLOUDFLARE_API_TOKEN | wc -c"
    exit 1
fi

echo "✅ 环境检查通过"
echo "🔧 wrangler版本: $(wrangler --version)"
echo ""

# 执行部署
echo "🔄 执行部署命令..."
wrangler pages deploy . \
  --project-name="seo-readability-tool" \
  --branch="main" \
  --commit-message="Deploy via script - $(date '+%Y-%m-%d %H:%M:%S')"

echo ""
echo "✅ 部署完成"
echo "📱 新地址将在1-2分钟内可用"
echo "🔗 当前地址: https://3107b270.seo-readability-tool.pages.dev"
echo ""
echo "📋 部署后检查:"
echo "1. 访问上述链接"
echo "2. 验证所有功能正常"
echo "3. 检查5个bug修复是否生效"