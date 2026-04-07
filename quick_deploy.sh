#!/bin/bash
# quick_deploy.sh - 快速部署脚本（无交互）
# 专门用于自动化部署场景

set -e

# 静默模式检查
if [ "$1" = "--silent" ]; then
    SILENT=true
else
    SILENT=false
fi

log() {
    if [ "$SILENT" = false ]; then
        echo "$1"
    fi
}

# 检查目录
if [ ! -f "index.html" ]; then
    log "❌ 错误: 不在SEO工具站项目目录中"
    exit 1
fi

# 检查wrangler
if ! command -v wrangler &> /dev/null; then
    log "❌ 错误: wrangler CLI未安装"
    exit 1
fi

# 从~/.bashrc读取token（避免source命令）
TOKEN_LINE=$(grep "CLOUDFLARE_API_TOKEN=" ~/.bashrc | head -1)
if [ -z "$TOKEN_LINE" ]; then
    log "❌ 错误: 在~/.bashrc中找不到CLOUDFLARE_API_TOKEN"
    exit 1
fi

# 提取token值
CLOUDFLARE_API_TOKEN="${TOKEN_LINE#*=}"
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN//\"/}"
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN//\'/}"

if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    log "❌ 错误: token值为空"
    exit 1
fi

# 执行部署
log "🔄 部署中..."
CLOUDFLARE_API_TOKEN="$CLOUDFLARE_API_TOKEN" wrangler pages deploy . \
  --project-name="seo-readability-tool" \
  --branch="main" \
  --commit-dirty=true \
  --commit-message="Auto-deploy $(date '+%Y-%m-%d %H:%M')" > /tmp/deploy.log 2>&1

if [ $? -eq 0 ]; then
    log "✅ 部署成功"
    # 从日志中提取部署URL
    DEPLOY_URL=$(grep -o "https://[a-f0-9]*\.seo-readability-tool\.pages\.dev" /tmp/deploy.log | tail -1)
    if [ -n "$DEPLOY_URL" ]; then
        log "🔗 部署地址: $DEPLOY_URL"
    fi
else
    log "❌ 部署失败"
    if [ "$SILENT" = false ]; then
        echo "=== 错误日志 ==="
        tail -20 /tmp/deploy.log
    fi
    exit 1
fi