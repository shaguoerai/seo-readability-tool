// ReadabilitySEO Analyzer - Core Analysis Engine

class ReadabilitySEOAnalyzer {
    constructor() {
        this.results = {
            readability: {},
            seo: {},
            suggestions: []
        };
    }

    // Main analysis function
    analyze(content, title = '', metaDescription = '', language = 'en') {
        this.results = {
            readability: this.analyzeReadability(content, language),
            seo: this.analyzeSEO(content, title, metaDescription, language),
            suggestions: [],
            language: language
        };

        this.generateSuggestions(language);
        return this.results;
    }

    // Readability analysis
    analyzeReadability(text, language = 'en') {
        const sentences = this.extractSentences(text);
        const words = this.extractWords(text);
        const syllables = this.countSyllables(text);
        
        const totalSentences = sentences.length;
        const totalWords = words.length;
        const totalSyllables = syllables;
        
        // Adjust Flesch formula for Chinese
        let fleschScore, fkGrade;
        
        if (language === 'zh' && this.isChineseText(text)) {
            // Adjusted Chinese readability scoring
            // Goal: produce scores in similar range to English (0-100)
            const avgSentenceLength = totalSentences > 0 ? totalWords / totalSentences : 0;
            const chineseCharCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
            const charRatio = totalWords > 0 ? chineseCharCount / totalWords : 0;
            
            // Adjusted formula to produce scores 0-100 similar to English
            // Base score: 70 (good starting point)
            // Penalize long sentences: -1 per word over 15
            // Penalize high character ratio: -10 if > 0.8 (very dense Chinese)
            let baseScore = 70;
            
            // Sentence length adjustment
            if (avgSentenceLength > 15) {
                baseScore -= (avgSentenceLength - 15) * 1;
            } else if (avgSentenceLength < 8) {
                baseScore += (8 - avgSentenceLength) * 2; // Reward short sentences
            }
            
            // Character density adjustment
            if (charRatio > 0.8) {
                baseScore -= 10;
            } else if (charRatio < 0.5) {
                baseScore += 5; // Reward mixed content (easier to read)
            }
            
            // Ensure score is in 0-100 range
            fleschScore = Math.max(0, Math.min(100, baseScore));
            
            // Grade level: map score to approximate grade
            if (fleschScore >= 80) fkGrade = 5;
            else if (fleschScore >= 70) fkGrade = 7;
            else if (fleschScore >= 60) fkGrade = 9;
            else if (fleschScore >= 50) fkGrade = 11;
            else if (fleschScore >= 40) fkGrade = 13;
            else if (fleschScore >= 30) fkGrade = 15;
            else fkGrade = 17;
        } else {
            // Standard English formulas
            fleschScore = totalWords > 0 && totalSentences > 0 
                ? 206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (totalSyllables / totalWords)
                : 0;
            
            fkGrade = totalWords > 0 && totalSentences > 0
                ? 0.39 * (totalWords / totalSentences) + 11.8 * (totalSyllables / totalWords) - 15.59
                : 0;
        }
        
        // Average sentence length
        const avgSentenceLength = totalSentences > 0 ? totalWords / totalSentences : 0;
        
        // Average word length
        const avgWordLength = totalWords > 0 ? text.replace(/\s+/g, '').length / totalWords : 0;
        
        // Paragraph analysis
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        const avgParagraphLength = paragraphs.length > 0 
            ? paragraphs.reduce((sum, p) => sum + this.extractWords(p).length, 0) / paragraphs.length
            : 0;
        
        return {
            fleschReadingEase: Math.round(fleschScore * 10) / 10,
            fleschKincaidGrade: Math.round(fkGrade * 10) / 10,
            totalSentences,
            totalWords,
            totalSyllables,
            avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
            avgWordLength: Math.round(avgWordLength * 10) / 10,
            paragraphCount: paragraphs.length,
            avgParagraphLength: Math.round(avgParagraphLength * 10) / 10,
            readingLevel: this.getReadingLevel(fleschScore, language)
        };
    }
    
    // Check if text is primarily Chinese
    isChineseText(text) {
        const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
        const totalChars = text.replace(/\s+/g, '').length;
        return totalChars > 0 && (chineseChars / totalChars) > 0.3; // 30%+ Chinese characters
    }

    // SEO analysis
    analyzeSEO(content, title, metaDescription) {
        const words = this.extractWords(content);
        const totalWords = words.length;
        
        // Title analysis
        const titleLength = title.length;
        const titleWordCount = this.extractWords(title).length;
        
        // Meta description analysis
        const metaLength = metaDescription.length;
        const metaWordCount = this.extractWords(metaDescription).length;
        
        // Keyword density (simplified - using most frequent words)
        const keywordDensity = this.calculateKeywordDensity(content);
        
        // Heading analysis
        const headingStructure = this.analyzeHeadings(content);
        
        // Content length score
        const contentLengthScore = totalWords >= 300 ? 100 : Math.min(100, (totalWords / 300) * 100);
        
        return {
            title: {
                length: titleLength,
                wordCount: titleWordCount,
                score: this.scoreTitle(title)
            },
            metaDescription: {
                length: metaLength,
                wordCount: metaWordCount,
                score: this.scoreMetaDescription(metaDescription)
            },
            keywordDensity: {
                density: keywordDensity,
                score: this.scoreKeywordDensity(keywordDensity)
            },
            headings: headingStructure,
            contentLength: {
                words: totalWords,
                score: contentLengthScore
            },
            overallSEOScore: this.calculateOverallSEOScore(title, metaDescription, keywordDensity, headingStructure, totalWords)
        };
    }

    // Helper methods
    extractSentences(text) {
        // Support both English and Chinese sentence endings
        return text.split(/[.!?。！？]+/).filter(s => s.trim().length > 0);
    }

    extractWords(text) {
        // Support both English words and Chinese characters
        // English words: sequences of letters
        // Chinese characters: individual characters (excluding punctuation)
        const englishWords = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
        const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
        return [...englishWords, ...chineseChars];
    }

    countSyllables(text) {
        const words = this.extractWords(text);
        let totalSyllables = 0;
        
        words.forEach(word => {
            // Check if word is Chinese character
            if (/^[\u4e00-\u9fa5]$/.test(word)) {
                // Chinese characters: typically 1 syllable per character
                totalSyllables += 1;
            } else {
                // English word syllable counting
                word = word.toLowerCase();
                if (word.length <= 3) {
                    totalSyllables += 1;
                } else {
                    // Count vowel groups
                    const vowelGroups = word.match(/[aeiouy]+/g);
                    totalSyllables += vowelGroups ? vowelGroups.length : 1;
                    
                    // Adjust for silent e
                    if (word.endsWith('e') && !word.endsWith('le')) {
                        totalSyllables -= 1;
                    }
                }
            }
            
            // Ensure at least one syllable
            if (totalSyllables === 0) totalSyllables = 1;
        });
        
        return totalSyllables;
    }

    getReadingLevel(fleschScore, language = 'en') {
        if (language === 'zh') {
            // Adjusted Chinese reading levels to match new scoring
            if (fleschScore >= 80) return '非常容易 (小学水平)';
            if (fleschScore >= 70) return '容易 (初中水平)';
            if (fleschScore >= 60) return '相当容易 (高中水平)';
            if (fleschScore >= 50) return '标准 (大学水平)';
            if (fleschScore >= 40) return '相当困难 (专业水平)';
            return '非常困难 (学术水平)';
        } else {
            // English reading levels
            if (fleschScore >= 90) return 'Very Easy (5th grade)';
            if (fleschScore >= 80) return 'Easy (6th grade)';
            if (fleschScore >= 70) return 'Fairly Easy (7th grade)';
            if (fleschScore >= 60) return 'Standard (8th-9th grade)';
            if (fleschScore >= 50) return 'Fairly Difficult (10th-12th grade)';
            if (fleschScore >= 30) return 'Difficult (College)';
            return 'Very Difficult (College graduate)';
        }
    }

    calculateKeywordDensity(text) {
        const words = this.extractWords(text);
        if (words.length === 0) return 0;
        
        // Find most frequent word (simplified keyword)
        const wordCounts = {};
        words.forEach(word => {
            if (word.length > 3) { // Ignore short words
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            }
        });
        
        const sortedWords = Object.entries(wordCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        if (sortedWords.length === 0) return 0;
        
        // Return density of top keyword
        const topKeywordCount = sortedWords[0][1];
        return Math.round((topKeywordCount / words.length) * 10000) / 100; // Percentage with 2 decimals
    }

    analyzeHeadings(text) {
        // Simplified heading analysis - looking for H1, H2 patterns
        const lines = text.split('\n');
        let h1Count = 0;
        let h2Count = 0;
        let h3PlusCount = 0;
        
        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed.length > 0) {
                // Check if line looks like a heading (short, ends with colon, or all caps)
                const wordCount = this.extractWords(trimmed).length;
                const endsWithColon = trimmed.endsWith(':');
                const isAllCaps = trimmed === trimmed.toUpperCase() && trimmed.length < 50;
                
                if (wordCount <= 10 && (endsWithColon || isAllCaps)) {
                    if (h1Count === 0) {
                        h1Count = 1;
                    } else if (h2Count < 3) {
                        h2Count++;
                    } else {
                        h3PlusCount++;
                    }
                }
            }
        });
        
        return {
            h1Count,
            h2Count,
            h3PlusCount,
            score: this.scoreHeadings(h1Count, h2Count, h3PlusCount)
        };
    }

    // Scoring functions
    scoreTitle(title) {
        const length = title.length;
        if (length >= 50 && length <= 60) return 100;
        if (length >= 40 && length <= 70) return 80;
        if (length >= 30 && length <= 80) return 60;
        if (length >= 20 && length <= 90) return 40;
        return 20;
    }

    scoreMetaDescription(meta) {
        const length = meta.length;
        if (length >= 120 && length <= 160) return 100;
        if (length >= 100 && length <= 180) return 80;
        if (length >= 80 && length <= 200) return 60;
        if (length >= 50 && length <= 250) return 40;
        return 20;
    }

    scoreKeywordDensity(density) {
        if (density >= 1 && density <= 2) return 100;
        if (density >= 0.5 && density <= 3) return 80;
        if (density >= 0.3 && density <= 4) return 60;
        if (density >= 0.1 && density <= 5) return 40;
        return 20;
    }

    scoreHeadings(h1Count, h2Count, h3PlusCount) {
        let score = 0;
        
        // H1 should be exactly 1
        if (h1Count === 1) score += 40;
        else if (h1Count > 0) score += 20;
        
        // Should have some H2s
        if (h2Count >= 2 && h2Count <= 5) score += 40;
        else if (h2Count > 0) score += 20;
        
        // H3+ are optional but good
        if (h3PlusCount > 0) score += 20;
        
        return Math.min(100, score);
    }

    calculateOverallSEOScore(title, meta, keywordDensity, headings, wordCount) {
        const titleScore = this.scoreTitle(title);
        const metaScore = this.scoreMetaDescription(meta);
        const keywordScore = this.scoreKeywordDensity(keywordDensity.density || 0);
        const headingScore = headings.score;
        const lengthScore = wordCount >= 300 ? 100 : Math.min(100, (wordCount / 300) * 100);
        
        // Weighted average
        return Math.round((
            titleScore * 0.2 +
            metaScore * 0.15 +
            keywordScore * 0.25 +
            headingScore * 0.2 +
            lengthScore * 0.2
        ) * 10) / 10;
    }

    // Generate suggestions based on analysis
    generateSuggestions(language = 'en') {
        const suggestions = [];
        const { readability, seo } = this.results;
        
        if (language === 'zh') {
            // Chinese suggestions
            if (readability.fleschReadingEase < 40) {
                suggestions.push({
                    category: 'readability',
                    priority: 'high',
                    message: `您的内容可读性分数为 ${readability.fleschReadingEase}。建议达到40分以上以获得更广泛的受众。`,
                    action: '缩短句子长度，使用更简单的词汇。'
                });
            }
            
            if (readability.avgSentenceLength > 25) {
                suggestions.push({
                    category: 'readability',
                    priority: 'medium',
                    message: `平均句子长度为 ${readability.avgSentenceLength} 个词。建议控制在15-20个词以内。`,
                    action: '将长句子拆分为多个短句。'
                });
            }
            
            if (readability.avgParagraphLength > 200) {
                suggestions.push({
                    category: 'readability',
                    priority: 'medium',
                    message: `平均段落长度为 ${readability.avgParagraphLength} 个词。`,
                    action: '将长段落拆分为3-5句话的段落。'
                });
            }
        } else {
            // English suggestions
            if (readability.fleschReadingEase < 60) {
                suggestions.push({
                    category: 'readability',
                    priority: 'high',
                    message: `Your content has a reading ease score of ${readability.fleschReadingEase}. Aim for 60+ for broader audience reach.`,
                    action: 'Shorten sentences and use simpler vocabulary.'
                });
            }
            
            if (readability.avgSentenceLength > 20) {
                suggestions.push({
                    category: 'readability',
                    priority: 'medium',
                    message: `Average sentence length is ${readability.avgSentenceLength} words. Optimal is 15-20 words.`,
                    action: 'Break long sentences into shorter ones.'
                });
            }
            
            if (readability.avgParagraphLength > 150) {
                suggestions.push({
                    category: 'readability',
                    priority: 'medium',
                    message: `Average paragraph length is ${readability.avgParagraphLength} words.`,
                    action: 'Break long paragraphs into 3-5 sentences each.'
                });
            }
        }
        
        if (readability.avgSentenceLength > 20) {
            suggestions.push({
                category: 'readability',
                priority: 'medium',
                message: `Average sentence length is ${readability.avgSentenceLength} words. Optimal is 15-20 words.`,
                action: 'Break long sentences into shorter ones.'
            });
        }
        
        if (readability.avgParagraphLength > 150) {
            suggestions.push({
                category: 'readability',
                priority: 'medium',
                message: `Average paragraph length is ${readability.avgParagraphLength} words.`,
                action: 'Break long paragraphs into 3-5 sentences each.'
            });
        }
        
        // SEO suggestions (language-specific)
        if (seo.title.score < 80) {
            if (language === 'zh') {
                suggestions.push({
                    category: 'seo',
                    priority: 'high',
                    message: `标题长度为 ${seo.title.length} 字符（建议：15-30字符）。`,
                    action: '缩短标题，包含主要关键词，保持在30字符以内。'
                });
            } else {
                suggestions.push({
                    category: 'seo',
                    priority: 'high',
                    message: `Title is ${seo.title.length} characters (optimal: 50-60).`,
                    action: 'Shorten title to include main keyword and stay under 60 characters.'
                });
            }
        }
        
        if (seo.metaDescription.score < 80) {
            if (language === 'zh') {
                suggestions.push({
                    category: 'seo',
                    priority: 'high',
                    message: `元描述长度为 ${seo.metaDescription.length} 字符（建议：70-150字符）。`,
                    action: '调整元描述长度，包含行动号召。'
                });
            } else {
                suggestions.push({
                    category: 'seo',
                    priority: 'high',
                    message: `Meta description is ${seo.metaDescription.length} characters (optimal: 120-160).`,
                    action: 'Adjust meta description length and include a call-to-action.'
                });
            }
        }
        
        if (seo.keywordDensity.score < 80) {
            if (language === 'zh') {
                suggestions.push({
                    category: 'seo',
                    priority: 'medium',
                    message: `主要关键词密度为 ${seo.keywordDensity.density}%（建议：1-3%）。`,
                    action: seo.keywordDensity.density < 1 
                        ? '自然地增加关键词使用。' 
                        : '减少关键词堆砌。'
                });
            } else {
                suggestions.push({
                    category: 'seo',
                    priority: 'medium',
                    message: `Main keyword density is ${seo.keywordDensity.density}% (optimal: 1-2%).`,
                    action: seo.keywordDensity.density < 1 
                        ? 'Increase keyword usage naturally.' 
                        : 'Reduce keyword stuffing.'
                });
            }
        }
        
        if (seo.headings.h1Count !== 1) {
            if (language === 'zh') {
                suggestions.push({
                    category: 'seo',
                    priority: 'high',
                    message: `发现 ${seo.headings.h1Count} 个H1标题（应该正好1个）。`,
                    action: '确保您有且仅有一个H1标题，包含主要关键词。'
                });
            } else {
                suggestions.push({
                    category: 'seo',
                    priority: 'high',
                    message: `Found ${seo.headings.h1Count} H1 headings (should be exactly 1).`,
                    action: 'Ensure you have exactly one H1 heading containing your main keyword.'
                });
            }
        }
        
        if (seo.contentLength.words < 300) {
            if (language === 'zh') {
                suggestions.push({
                    category: 'seo',
                    priority: 'medium',
                    message: `内容长度为 ${seo.contentLength.words} 个词（建议至少300词）。`,
                    action: '添加更多有价值的内容，达到至少300词。'
                });
            } else {
                suggestions.push({
                    category: 'seo',
                    priority: 'medium',
                    message: `Content length is ${seo.contentLength.words} words (minimum 300 recommended).`,
                    action: 'Add more valuable content to reach at least 300 words.'
                });
            }
        }
        
        this.results.suggestions = suggestions;
    }
    
    // Detect language of text
    detectLanguage(text) {
        const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
        const englishWords = (text.match(/\b[a-z]+\b/gi) || []).length;
        
        if (chineseChars > englishWords * 2) {
            return 'zh';
        } else if (englishWords > chineseChars * 2) {
            return 'en';
        } else {
            return 'en'; // Default to English for mixed content
        }
    }

    // Get color for score visualization
    getScoreColor(score) {
        if (score >= 80) return '#10b981'; // Green
        if (score >= 60) return '#f59e0b'; // Yellow
        return '#ef4444'; // Red
    }

    // Get reading ease color
    getReadingEaseColor(score) {
        if (score >= 70) return '#10b981'; // Green - Easy to read
        if (score >= 50) return '#f59e0b'; // Yellow - Moderate
        return '#ef4444'; // Red - Difficult
    }
}

// Export for use in browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReadabilitySEOAnalyzer;
} else {
    window.ReadabilitySEOAnalyzer = ReadabilitySEOAnalyzer;
}