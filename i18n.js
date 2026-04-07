// Internationalization module for SEO Readability Analyzer

const translations = {
    en: {
        // Header
        title: "ReadabilitySEO Analyzer",
        subtitle: "Free online tool to analyze content readability and SEO optimization",
        
        // Input section
        analyzeYourContent: "📝 Analyze Your Content",
        pageTitle: "Page Title",
        pageTitlePlaceholder: "Enter your page title (50-60 characters optimal)",
        metaDescription: "Page Description",
        metaDescriptionPlaceholder: "Enter your page description (120-160 characters optimal)",
        metaDescriptionExplanation: "(Short description shown in search results)",
        content: "Content",
        contentPlaceholder: "Paste your content here...",
        analyzeButton: "🚀 Analyze Content",
        resetButton: "🔄 Reset",
        analyzing: "Analyzing your content...",
        
        // Results section
        analysisResults: "📈 Analysis Results",
        readabilityScore: "Readability Score",
        seoScore: "SEO Score",
        detailedAnalysis: "Detailed Analysis",
        
        // Readability metrics
        fleschReadingEase: "Flesch Reading Ease",
        gradeLevel: "Grade Level",
        readingLevel: "Reading Level",
        sentences: "Sentences",
        words: "Words",
        avgSentenceLength: "Avg. Sentence Length",
        avgParagraphLength: "Avg. Paragraph Length",
        
        // SEO metrics
        overallSEOScore: "Overall SEO Score",
        titleLength: "Title Length",
        metaDescriptionLength: "Meta Description Length",
        keywordDensity: "Keyword Density",
        headings: "Headings (H1/H2/H3+)",
        contentLength: "Content Length",
        
        // Suggestions
        suggestions: "Improvement Suggestions",
        highPriority: "HIGH PRIORITY",
        mediumPriority: "MEDIUM PRIORITY",
        lowPriority: "LOW PRIORITY",
        
        // Reading levels
        veryEasy: "Very Easy (5th grade)",
        easy: "Easy (6th grade)",
        fairlyEasy: "Fairly Easy (7th grade)",
        standard: "Standard (8th-9th grade)",
        fairlyDifficult: "Fairly Difficult (10th-12th grade)",
        difficult: "Difficult (College)",
        veryDifficult: "Very Difficult (College graduate)",
        
        // Footer
        builtBy: "Built by",
        privacyNote: "Your content is analyzed locally in your browser - no data is sent to any server.",
        
        // Language switcher
        language: "Language",
        english: "English",
        chinese: "中文",
        
        // Usage instructions
        howToUse: "How to use:",
        instructionsText: "1. Enter title and description (check character counters) 2. Paste your content 3. Click \"Analyze\" 4. Review specific suggestions and improve",
        
        // Character counters
        charactersEntered: "Characters entered:",
        recommended: "recommended",
        
        // Analysis result descriptions
        titleLengthGood: "Good length for SEO",
        titleLengthShort: "Too short - add more keywords",
        titleLengthLong: "Too long - shorten for better display",
        metaLengthGood: "Good length for search results",
        metaLengthShort: "Too short - add more details",
        metaLengthLong: "Too long - may be truncated",
        keywordDensityGood: "Good keyword balance",
        keywordDensityLow: "Low - consider adding more keywords",
        keywordDensityHigh: "High - reduce keyword stuffing",
        headingsGood: "Good heading structure",
        headingsNoH1: "Missing H1 heading",
        headingsMultipleH1: "Multiple H1 headings - should have only one",
        contentLengthGood: "Good content length",
        contentLengthShort: "Content is short - consider adding more detail",
        contentLengthLong: "Content is long - good for comprehensive coverage",
        
        // Example content
        exampleTitle: "How to Improve Your Content Readability and SEO Score",
        exampleMeta: "Learn how to analyze and improve your content readability and SEO with our free tool. Get actionable suggestions for better engagement and rankings.",
        exampleContent: `Welcome to our comprehensive guide on content optimization. In today's digital landscape, creating content that is both readable and search-engine friendly is crucial for success.

Readability refers to how easy your content is to understand. Factors like sentence length, vocabulary complexity, and paragraph structure all contribute to readability. Research shows that content with good readability scores higher in user engagement and retention.

SEO (Search Engine Optimization) involves optimizing your content to rank higher in search engine results. This includes proper use of keywords, meta tags, heading structure, and content length. Well-optimized content attracts more organic traffic and converts better.

Our tool analyzes both aspects and provides specific suggestions for improvement. Simply paste your content above and click "Analyze" to get started.

Key areas we analyze:
1. Readability scores (Flesch Reading Ease, Flesch-Kincaid Grade Level)
2. SEO elements (title, meta description, keyword density)
3. Content structure and formatting
4. Overall optimization score

Start optimizing your content today for better engagement and search rankings!`,
        
        // Tool recommendation (English)
        recommendationTitle: "Boost Your Content Creation Efficiency",
        recommendationText: "You've analyzed your content readability. Now automate 92% of your business writing with AI.",
        emailAutomation: "Email Automation",
        emailSaving: "28 minutes → 2 minutes per email",
        proposalAutomation: "Proposal Automation",
        proposalSaving: "2.75 hours → 15 minutes",
        reportAutomation: "Report Automation",
        reportSaving: "55 minutes → 5 minutes",
        getToolButton: "Get $90 Value for $1 (Emergency Launch)",
        riskFree: "30-day money-back guarantee • Limited time offer"
    },
    
    zh: {
        // Header
        title: "可读性SEO分析器",
        subtitle: "免费在线工具，分析内容可读性和SEO优化",
        
        // Input section
        analyzeYourContent: "📝 分析您的内容",
        pageTitle: "页面标题",
        pageTitlePlaceholder: "输入页面标题（建议50-60字符）",
        metaDescription: "页面描述",
        metaDescriptionPlaceholder: "输入页面描述（建议120-160字符）",
        metaDescriptionExplanation: "（在搜索结果中显示的简短描述）",
        content: "内容",
        contentPlaceholder: "在此粘贴您的内容...",
        analyzeButton: "🚀 分析内容",
        resetButton: "🔄 重置",
        analyzing: "正在分析您的内容...",
        
        // Results section
        analysisResults: "📈 分析结果",
        readabilityScore: "可读性分数",
        seoScore: "SEO分数",
        detailedAnalysis: "详细分析",
        
        // Readability metrics
        fleschReadingEase: "Flesch阅读易度",
        gradeLevel: "年级水平",
        readingLevel: "阅读水平",
        sentences: "句子数",
        words: "单词数",
        avgSentenceLength: "平均句子长度",
        avgParagraphLength: "平均段落长度",
        
        // SEO metrics
        overallSEOScore: "总体SEO分数",
        titleLength: "标题长度",
        metaDescriptionLength: "页面描述长度",
        keywordDensity: "关键词密度",
        headings: "标题结构 (H1/H2/H3+)",
        contentLength: "内容长度",
        
        // Suggestions
        suggestions: "改进建议",
        highPriority: "高优先级",
        mediumPriority: "中优先级",
        lowPriority: "低优先级",
        
        // Reading levels
        veryEasy: "非常容易 (5年级)",
        easy: "容易 (6年级)",
        fairlyEasy: "相当容易 (7年级)",
        standard: "标准 (8-9年级)",
        fairlyDifficult: "相当困难 (10-12年级)",
        difficult: "困难 (大学)",
        veryDifficult: "非常困难 (研究生)",
        
        // Footer
        builtBy: "由",
        privacyNote: "您的内容在浏览器本地分析 - 不会发送到任何服务器。",
        
        // Language switcher
        language: "语言",
        english: "English",
        chinese: "中文",
        
        // Usage instructions
        howToUse: "使用方法:",
        instructionsText: "1. 输入标题和描述（查看字符计数） 2. 粘贴您的内容 3. 点击\"分析内容\" 4. 查看具体建议并改进",
        
        // Character counters
        charactersEntered: "已输入字符:",
        recommended: "建议",
        
        // Analysis result descriptions
        titleLengthGood: "SEO标题长度良好",
        titleLengthShort: "标题太短 - 建议添加更多关键词",
        titleLengthLong: "标题太长 - 建议缩短以便更好显示",
        metaLengthGood: "描述长度适合搜索结果",
        metaLengthShort: "描述太短 - 建议添加更多细节",
        metaLengthLong: "描述太长 - 可能被截断",
        keywordDensityGood: "关键词密度良好",
        keywordDensityLow: "关键词密度低 - 考虑添加更多关键词",
        keywordDensityHigh: "关键词密度高 - 减少关键词堆砌",
        headingsGood: "标题结构良好",
        headingsNoH1: "缺少H1标题",
        headingsMultipleH1: "多个H1标题 - 应该只有一个",
        contentLengthGood: "内容长度良好",
        contentLengthShort: "内容较短 - 考虑添加更多细节",
        contentLengthLong: "内容较长 - 有利于全面覆盖",
        
        // Example content (Chinese)
        exampleTitle: "如何提高内容可读性和SEO分数",
        exampleMeta: "使用我们的免费工具分析和改进内容可读性和SEO。获取可操作建议，提高参与度和排名。",
        exampleContent: `欢迎阅读我们的内容优化综合指南。在当今数字环境中，创建既易读又对搜索引擎友好的内容至关重要。

可读性指的是您的内容易于理解的程度。句子长度、词汇复杂度和段落结构等因素都会影响可读性。研究表明，可读性好的内容在用户参与度和留存率方面得分更高。

SEO（搜索引擎优化）涉及优化您的内容以在搜索引擎结果中获得更高排名。这包括关键词的正确使用、元标签、标题结构和内容长度。优化良好的内容能吸引更多有机流量并提高转化率。

我们的工具分析这两个方面，并提供具体的改进建议。只需将您的内容粘贴到上方，然后点击"分析"即可开始。

我们分析的关键领域：
1. 可读性分数（Flesch阅读易度、Flesch-Kincaid年级水平）
2. SEO元素（标题、元描述、关键词密度）
3. 内容结构和格式
4. 整体优化分数

立即开始优化您的内容，以获得更好的参与度和搜索排名！`,
        
        // Tool recommendation (Chinese)
        recommendationTitle: "提升内容创作效率",
        recommendationText: "您已分析了内容可读性。现在使用AI自动化92%的商业写作。",
        emailAutomation: "邮件自动化",
        emailSaving: "28分钟 → 2分钟每封邮件",
        proposalAutomation: "提案自动化",
        proposalSaving: "2.75小时 → 15分钟",
        reportAutomation: "报告自动化",
        reportSaving: "55分钟 → 5分钟",
        getToolButton: "获取$90价值仅需$1（紧急启动）",
        riskFree: "30天退款保证 • 限时优惠"
    }
};

class I18n {
    constructor() {
        this.currentLang = this.getSavedLanguage() || 'en';
        this.init();
    }
    
    getSavedLanguage() {
        return localStorage.getItem('seo-tool-language');
    }
    
    saveLanguage(lang) {
        localStorage.setItem('seo-tool-language', lang);
        this.currentLang = lang;
    }
    
    init() {
        // Apply saved language on load
        this.applyLanguage(this.currentLang);
        
        // Setup language switcher
        this.setupLanguageSwitcher();
    }
    
    applyLanguage(lang) {
        this.currentLang = lang;
        this.saveLanguage(lang);
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        
        // Update title and meta description
        document.title = translations[lang].title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', translations[lang].subtitle);
        }
        
        // Update example content if needed
        this.updateExampleContent(lang);
        
        // Trigger language change event
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
    }
    
    setupLanguageSwitcher() {
        const switcher = document.getElementById('language-switcher');
        if (switcher) {
            switcher.value = this.currentLang;
            switcher.addEventListener('change', (e) => {
                this.applyLanguage(e.target.value);
            });
        }
    }
    
    updateExampleContent(lang) {
        // Only update example content if fields are completely empty
        // Never translate or replace user-entered content
        const titleField = document.getElementById('title');
        const metaField = document.getElementById('meta');
        const contentField = document.getElementById('content');
        
        // Check if fields are truly empty (not just whitespace)
        const isTitleEmpty = titleField && titleField.value.trim() === '';
        const isMetaEmpty = metaField && metaField.value.trim() === '';
        const isContentEmpty = contentField && contentField.value.trim() === '';
        
        // Only update if completely empty
        if (isTitleEmpty) {
            titleField.value = translations[lang].exampleTitle || '';
        }
        
        if (isMetaEmpty) {
            metaField.value = translations[lang].exampleMeta || '';
        }
        
        if (isContentEmpty) {
            contentField.value = translations[lang].exampleContent || '';
        }
        
        // Update character counters after setting example content
        if (isTitleEmpty || isMetaEmpty) {
            setTimeout(() => {
                if (typeof updateTitleCounter === 'function') updateTitleCounter();
                if (typeof updateMetaCounter === 'function') updateMetaCounter();
            }, 100);
        }
    }
    
    t(key) {
        return translations[this.currentLang][key] || key;
    }
    
    getCurrentLanguage() {
        return this.currentLang;
    }
}

// Export for browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { I18n, translations };
} else {
    window.I18n = I18n;
    window.translations = translations;
}