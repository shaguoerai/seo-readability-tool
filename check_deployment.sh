#!/bin/bash
# check_deployment.sh - 检查部署状态和配置

echo "================================================================================"
echo "                    Cloudflare Pages部署状态检查"
echo "================================================================================"
echo ""

echo "📁 项目结构检查"
echo "------------------------------------------------------------------------"
echo "必需文件:"
[ -f "index.html" ] && echo "✅ index.html - 主页面" || echo "❌ index.html - 缺失"
[ -f "package.json" ] && echo "✅ package.json - 项目配置" || echo "❌ package.json - 缺失"
[ -f "_headers" ] && echo "✅ _headers - 安全头配置" || echo "❌ _headers - 缺失"
[ -f "_redirects" ] && echo "✅ _redirects - 重定向配置" || echo "❌ _redirects - 缺失"
[ -f "_routes.json" ] && echo "✅ _routes.json - 路由配置" || echo "❌ _routes.json - 缺失"
echo ""

echo "🔧 修复验证检查"
echo "------------------------------------------------------------------------"
echo "1. 底部署名检查:"
if grep -q "YuGe AI" index.html; then
    echo "   ✅ index.html中包含'YuGe AI'"
else
    echo "   ❌ index.html中不包含'YuGe AI'"
fi

echo ""
echo "2. 使用说明检查:"
if grep -q "howToUse" index.html; then
    echo "   ✅ index.html中包含使用说明"
else
    echo "   ❌ index.html中不包含使用说明"
fi

echo ""
echo "3. 下拉菜单样式检查:"
if grep -q "language-switcher select option" styles.css; then
    echo "   ✅ styles.css中包含下拉菜单修复"
else
    echo "   ❌ styles.css中不包含下拉菜单修复"
fi

echo ""
echo "4. 页面描述术语检查:"
if grep -q '"metaDescription": "页面描述"' i18n.js; then
    echo "   ✅ i18n.js中已改为'页面描述'"
else
    echo "   ❌ i18n.js中未改为'页面描述'"
fi

echo ""
echo "🚀 部署配置建议"
echo "------------------------------------------------------------------------"
echo "如果Cloudflare Pages仍未更新，请检查:"
echo "1. Cloudflare项目设置 → Build & deployment"
echo "   - Build command: (留空，静态站点)"
echo "   - Build output directory: . (根目录)"
echo "   - Root directory: (留空)"
echo ""
echo "2. 手动触发重新部署:"
echo "   - 进入Cloudflare Pages控制台"
echo "   - 选择项目: seo-readability-tool"
echo "   - 点击'Retry deployment'或'Clear cache & redeploy'"
echo ""
echo "3. 检查部署日志:"
echo "   - 查看最近的部署记录"
echo "   - 检查是否有构建错误"
echo "   - 确认部署状态为'Success'"
echo ""
echo "🔗 工具URL: https://d9f47603.seo-readability-tool.pages.dev"
echo "🕒 检查时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""
echo "================================================================================"
echo "                           检查完成"
echo "================================================================================"