#!/bin/bash
# check_deployment.sh - 检查部署状态和网站健康度

set -e

echo "================================================================================"
echo "                    SEO工具站 - 部署状态检查"
echo "================================================================================"
echo "检查时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# 1. 检查当前目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误: 不在SEO工具站项目目录中"
    echo "请切换到: cd /root/seo-readability-tool"
    exit 1
fi

echo "✅ 目录检查通过"
echo "📁 项目目录: $(pwd)"
echo ""

# 2. 检查Git状态
echo "📊 Git状态检查"
echo "------------------------------------------------------------------------"
git status --short
echo ""

# 3. 检查文件完整性
echo "📁 文件完整性检查"
echo "------------------------------------------------------------------------"
REQUIRED_FILES=("index.html" "analyzer.js" "i18n.js" "styles.css")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (缺失)"
    fi
done
echo ""

# 4. 检查最新部署状态
echo "🌐 部署状态检查"
echo "------------------------------------------------------------------------"

# 尝试从wrangler获取最新部署信息
if command -v wrangler &> /dev/null; then
    # 从~/.bashrc读取token
    TOKEN_LINE=$(grep "CLOUDFLARE_API_TOKEN=" ~/.bashrc | head -1)
    if [ -n "$TOKEN_LINE" ]; then
        CLOUDFLARE_API_TOKEN="${TOKEN_LINE#*=}"
        CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN//\"/}"
        CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN//\'/}"
        
        echo "🔧 获取部署列表..."
        CLOUDFLARE_API_TOKEN="$CLOUDFLARE_API_TOKEN" wrangler pages deployment list \
          --project-name="seo-readability-tool" 2>/dev/null | head -10
    else
        echo "⚠️ 无法读取token，跳过部署状态检查"
    fi
else
    echo "⚠️ wrangler未安装，跳过部署状态检查"
fi

echo ""

# 5. 检查网站可访问性
echo "🔗 网站可访问性检查"
echo "------------------------------------------------------------------------"

# 获取最新部署URL（从日志或已知模式）
LATEST_URL="https://e93f416b.seo-readability-tool.pages.dev"
echo "测试访问: $LATEST_URL"

# 使用curl检查网站状态
if command -v curl &> /dev/null; then
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$LATEST_URL" --max-time 10 2>/dev/null || echo "000")
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ 网站可访问 (HTTP $HTTP_CODE)"
        
        # 检查页面内容
        PAGE_TITLE=$(curl -s "$LATEST_URL" | grep -o "<title>[^<]*</title>" | sed 's/<title>//;s/<\/title>//')
        if [ -n "$PAGE_TITLE" ]; then
            echo "📄 页面标题: $PAGE_TITLE"
        fi
        
        # 检查加载时间
        LOAD_TIME=$(curl -s -w "%{time_total}s\n" -o /dev/null "$LATEST_URL")
        echo "⏱️ 加载时间: $LOAD_TIME"
        
    elif [ "$HTTP_CODE" = "000" ]; then
        echo "❌ 网站无法访问 (超时或网络错误)"
    else
        echo "⚠️ 网站返回异常状态: HTTP $HTTP_CODE"
    fi
else
    echo "⚠️ curl未安装，跳过网站检查"
fi

echo ""

# 6. 总结和建议
echo "📋 检查总结"
echo "------------------------------------------------------------------------"

# 检查是否有未提交的更改
if git status --porcelain | grep -q "."; then
    echo "⚠️ 发现未提交的更改"
    echo "   建议: git add . && git commit -m '更新' && git push"
else
    echo "✅ Git仓库干净"
fi

# 检查是否需要部署
LAST_DEPLOY_FILE="/tmp/last_deploy_time"
if [ -f "$LAST_DEPLOY_FILE" ]; then
    LAST_DEPLOY=$(cat "$LAST_DEPLOY_FILE")
    NOW=$(date +%s)
    DIFF=$((NOW - LAST_DEPLOY))
    
    if [ $DIFF -gt 3600 ]; then # 超过1小时
        echo "🔄 距离上次部署已超过1小时"
        echo "   建议: 运行 ./quick_deploy.sh 更新部署"
    else
        echo "✅ 部署状态新鲜 ($((DIFF/60)) 分钟前)"
    fi
else
    echo "🔄 未找到上次部署记录"
    echo "   建议: 运行 ./quick_deploy.sh 进行首次部署"
fi

echo ""
echo "================================================================================"
echo "                           检查完成"
echo "================================================================================"
echo ""
echo "🔧 可用命令:"
echo "  ./quick_deploy.sh     - 快速部署"
echo "  ./deploy_exec.sh      - 详细部署"
echo "  ./check_deployment.sh - 检查状态"
echo ""
echo "📊 建议:"
echo "  1. 定期运行此脚本监控状态"
echo "  2. 设置cron任务自动化检查"
echo "  3. 根据检查结果采取相应行动"