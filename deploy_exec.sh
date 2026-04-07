#!/bin/bash
# deploy_exec.sh - 专门用于exec环境的部署脚本
# 注意: exec会话无法正确加载~/.bashrc，需要特殊处理
# 使用方法: ./deploy_exec.sh

set -e

echo "================================================================================"
echo "              SEO工具站 - exec环境专用部署脚本"
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
    exit 1
fi

# 特殊处理: exec环境无法加载~/.bashrc
# 尝试从可能的来源读取token
TOKEN_SOURCES=(
    "$HOME/.bashrc"
    "$HOME/.profile"
    "$HOME/.bash_profile"
    "/etc/environment"
)

CLOUDFLARE_API_TOKEN=""

# 尝试从文件读取token
for source_file in "${TOKEN_SOURCES[@]}"; do
    if [ -f "$source_file" ]; then
        echo "🔍 检查文件: $source_file"
        # 使用grep提取token，避免source命令
        token_line=$(grep "CLOUDFLARE_API_TOKEN=" "$source_file" | head -1)
        if [ -n "$token_line" ]; then
            # 提取token值（去除export和=号前的部分）
            CLOUDFLARE_API_TOKEN="${token_line#*=}"
            # 去除可能的引号
            CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN//\"/}"
            CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN//\'/}"
            echo "✅ 从 $source_file 找到token"
            break
        fi
    fi
done

# 如果还是没找到，尝试从环境变量读取（可能已设置）
if [ -z "$CLOUDFLARE_API_TOKEN" ] && [ -n "${CLOUDFLARE_API_TOKEN}" ]; then
    CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}"
    echo "✅ 从环境变量读取token"
fi

# 最终检查
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ 错误: 无法找到CLOUDFLARE_API_TOKEN"
    echo ""
    echo "🔧 解决方案:"
    echo "1. 确保token已设置在 ~/.bashrc 中"
    echo "2. 或者在命令中直接设置:"
    echo "   CLOUDFLARE_API_TOKEN=你的token ./deploy_exec.sh"
    echo ""
    echo "⚠️ 安全提示: 不要将token明文写在任何地方！"
    exit 1
fi

echo "✅ 环境检查通过"
echo "📁 项目目录: $(pwd)"
echo "🔧 wrangler版本: $(wrangler --version)"
echo "🔐 token状态: 已找到（长度: ${#CLOUDFLARE_API_TOKEN} 字符）"
echo ""

# 显示部署信息
echo "📋 部署配置"
echo "------------------------------------------------------------------------"
echo "项目名称: seo-readability-tool"
echo "部署目录: . (当前目录)"
echo ""

# 执行部署（使用找到的token）
echo "🔄 开始部署..."
CLOUDFLARE_API_TOKEN="$CLOUDFLARE_API_TOKEN" wrangler pages deploy . \
  --project-name="seo-readability-tool" \
  --branch="main" \
  --commit-message="Auto-deploy via exec script - $(date '+%Y-%m-%d %H:%M:%S')"

echo ""
echo "✅ 部署命令已提交"
echo ""
echo "📊 部署状态:"
echo "- 部署通常需要1-2分钟完成"
echo "- 新地址将在部署完成后可用"
echo "- 检查部署: wrangler pages deployment list"
echo ""
echo "================================================================================"
echo "                     exec环境部署脚本执行完成"
echo "================================================================================"