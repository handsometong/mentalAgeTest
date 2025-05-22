document.addEventListener('DOMContentLoaded', function() {
    const testResultsData = localStorage.getItem('testResults');
    // const userAnswersData = localStorage.getItem('testAnswers'); // Answers are processed into results

    if (!testResultsData) {
        alert('没有找到测试结果，请先完成测试。');
        window.location.href = 'test.html';
        return;
    }
    
    const results = JSON.parse(testResultsData);
    // const answers = userAnswersData ? JSON.parse(userAnswersData) : {};
    
    const testDateElement = document.getElementById('testDate');
    if (testDateElement && results.completedAt) {
        testDateElement.textContent = formatDate(new Date(results.completedAt));
    }
    
    updateDimensionResults(results.dimensionScores, results.dimensionCounts);
    calculateAndDisplayMentalAge(results.dimensionAverages, results.dimensionCounts); // Pass counts for potential use in overall text
    generateDimensionsChart(results.dimensionScores, results.dimensionCounts);
    generateGrowthSuggestions(results.dimensionAverages); // Use averages for suggestions
    
    const downloadReportButton = document.getElementById('downloadReport');
    if (downloadReportButton) {
        downloadReportButton.addEventListener('click', function() {
            // For a real report, consider jsPDF or html2canvas if client-side, or server-side generation.
            alert('报告下载功能正在开发中，敬请期待！');
        });
    }
    
    const shareButton = document.getElementById('shareButton');
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            const mentalAgeText = document.getElementById('mentalAge') ? document.getElementById('mentalAge').textContent : "我的";
            if (navigator.share) {
                navigator.share({
                    title: '我的心理年龄测试结果',
                    text: `我测得的心理年龄是 ${mentalAgeText} 岁！你也来试试吧！`,
                    url: window.location.href,
                })
                .catch((error) => console.log('分享失败:', error));
            } else {
                alert('您的浏览器不支持分享功能。您可以手动复制页面链接进行分享。');
            }
        });
    }

    // "Retake Test" button should clear previous results if user confirms
    const retakeButton = document.querySelector('a[href="test.html"][class*="border-gray-300"]'); // More specific selector
    if(retakeButton && retakeButton.textContent.includes("重新测试")){
        retakeButton.addEventListener('click', function(e){
            if(!confirm("重新测试将会清除本次测试结果，确定吗？")){
                e.preventDefault();
            } else {
                localStorage.removeItem('testResults');
                localStorage.removeItem('testAnswers'); // Ensure answers are also cleared
                localStorage.removeItem('currentQuestion');
            }
        });
    }
});

function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}年${month}月${day}日`;
}

function updateDimensionResults(dimensionScores, dimensionCounts) {
    const dimensionResultsContainer = document.getElementById('dimensionResults');
    if (!dimensionResultsContainer) return;
    dimensionResultsContainer.innerHTML = '';

    const interpretations = {
        "情绪调节能力": {
            getText: (percentage) => {
                if (percentage < 40) return "您在情绪管理方面可能还需加强。面对压力和负面情绪时，可能感到难以应对，情绪波动较大。积极学习情绪识别和调节技巧对您非常有益。";
                if (percentage < 70) return "您具备一定的情绪调节能力，多数情况下能处理自己的情绪。在特定情境下可能仍感挑战，持续提升情绪管理策略能让您更从容。";
                return "您在情绪调节方面表现成熟。能够有效地识别、理解和管理自己的情绪，即使在复杂情境下也能保持相对稳定和积极的心态。";
            },
            tags: ["情绪管理", "压力应对", "自我觉察"]
        },
        "认知灵活性与开放性": {
            getText: (percentage) => {
                if (percentage < 40) return "您可能倾向于固守已有的观念和方法，对新事物和变化的接纳度有提升空间。尝试以更开放的心态接触不同观点，有助于拓展认知边界。";
                if (percentage < 70) return "您对新观点和变化持有一定的开放性，愿意尝试和学习。在某些熟悉领域外，可能会稍感不适，鼓励持续探索未知。";
                return "您展现出优秀的认知灵活性和开放性。乐于接受新思想、新经验，能够从多角度思考问题，并快速适应变化的环境。";
            },
            tags: ["思维开放", "学习能力", "适应变化"]
        },
        "社会适应性与人际理解": {
            getText: (percentage) => {
                if (percentage < 40) return "在社交场合和人际互动中，您可能感到不太自在或难以有效沟通。提升同理心和社交技巧，能帮助您建立更和谐的人际关系。";
                if (percentage < 70) return "您具备基本的社会适应能力和人际交往技巧。在熟悉的环境中表现尚可，但在复杂或陌生的人际情境中可能需要更多努力。";
                return "您在社会适应和人际理解方面表现出色。能够轻松融入不同社交环境，有效沟通，并与他人建立积极正面的关系。";
            },
            tags: ["人际交往", "同理心", "沟通技巧"]
        },
        "责任感与决策能力": {
            getText: (percentage) => {
                if (percentage < 40) return "在承担责任和做决策方面，您可能感到犹豫或缺乏信心。培养独立思考和勇于担当的品质，对提升此方面能力至关重要。";
                if (percentage < 70) return "您能承担一定的责任，并做出常规决策。但在面对重大责任或复杂抉择时，可能需要更多支持和深思熟虑。";
                return "您展现出强烈的责任感和良好的决策能力。能够主动承担责任，审慎思考并果断做出决定，并对结果负责。";
            },
            tags: ["责任担当", "决策分析", "问题解决"]
        },
        "未来规划与目标导向": {
            getText: (percentage) => {
                if (percentage < 40) return "您可能对未来缺乏清晰规划，目标感不强。设定明确、可实现的目标，并制定行动计划，将有助于您更有方向地前进。";
                if (percentage < 70) return "您对未来有一些想法和短期目标，但在长期规划和持续执行力方面有提升空间。加强目标管理和自律性会带来更大成就。";
                return "您具备良好的未来规划能力和目标导向性。能够为自己设定清晰长远的目标，并坚持不懈地为之努力。";
            },
            tags: ["目标设定", "计划执行", "长远眼光"]
        },
        "自我认知与独立性": {
            getText: (percentage) => {
                if (percentage < 40) return "您对自身的了解可能不够深入，在做决定时容易受到外界影响。加强自我探索，建立内在评价体系，有助于提升独立性。";
                if (percentage < 70) return "您对自我有一定认知，也能独立处理一些事务。在坚持自我和不受他人干扰方面，仍有成长空间。";
                return "您拥有清晰的自我认知和高度的独立性。了解自己的优缺点，能够独立思考、自主决策，并坚持自己的价值观。";
            },
            tags: ["自我探索", "独立思考", "内在驱动"]
        }
    };

    for (const dimension in dimensionScores) {
        if (dimensionScores.hasOwnProperty(dimension)) {
            const score = dimensionScores[dimension];
            const count = dimensionCounts[dimension] || 0;
            const maxScore = count * 5; // Max score is 5 per question
            const percentageScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
            
            const interpretation = interpretations[dimension] || { getText: () => "暂无详细解读。", tags: [] };
            const evaluationText = interpretation.getText(percentageScore);
            const tags = interpretation.tags;

            const dimensionHTML = `
                <div class="p-5 border rounded-lg hover:shadow-sm transition-shadow bg-white">
                    <div class="flex justify-between items-start mb-3">
                        <h4 class="text-lg font-medium text-gray-800">${dimension}</h4>
                        <div class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            得分: <span>${score}/${maxScore}</span> (${percentageScore}%)
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${percentageScore}%"></div>
                    </div>
                    <p class="text-gray-600 text-sm mb-3">
                        ${evaluationText}
                    </p>
                    <div class="flex gap-2 flex-wrap">
                        ${tags.map(tag => `<span class="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-700">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            dimensionResultsContainer.innerHTML += dimensionHTML;
        }
    }
}

function calculateAndDisplayMentalAge(dimensionAverages) {
    let totalAverageScore = 0;
    let numDimensions = 0;

    for (const dimension in dimensionAverages) {
        if (dimensionAverages.hasOwnProperty(dimension)) {
            totalAverageScore += dimensionAverages[dimension];
            numDimensions++;
        }
    }

    let overallMaturityScore = 0;
    if (numDimensions > 0) {
        overallMaturityScore = totalAverageScore / numDimensions; // Score from 1 to 5
    }

    // Map overallMaturityScore (1-5) to mentalAge (e.g., 16-50)
    const minMentalAge = 16;
    const maxMentalAge = 50; 
    let mentalAge = minMentalAge;

    if (overallMaturityScore > 0) {
      // Linear interpolation: mentalAge = minAge + ((score - minScore) / (maxScore - minScore)) * (maxAgeRange)
      // score range is 1-5. (overallMaturityScore - 1) / (5 - 1) gives a 0-1 normalized value.
      mentalAge = minMentalAge + ((overallMaturityScore - 1) / 4) * (maxMentalAge - minMentalAge);
    }
    
    mentalAge = Math.max(minMentalAge, Math.min(maxMentalAge, mentalAge)); // Clamp
    mentalAge = Math.round(mentalAge);

    const mentalAgeElement = document.getElementById('mentalAge');
    if (mentalAgeElement) {
        mentalAgeElement.textContent = mentalAge;
    }

    const overallAnalysisElement = document.getElementById('overallAnalysis');
    if (overallAnalysisElement) {
        const analysisTextElement = overallAnalysisElement.querySelector('p');
        if (analysisTextElement) {
            let analysisText = "";
            if (mentalAge < 20) {
                analysisText = `您的心理年龄约为 ${mentalAge} 岁。这表明您可能拥有年轻的心态，充满活力和好奇心。在情绪管理、深度思考和人际交往的成熟度上可能还有较大的成长空间，这是发展的黄金时期。`;
            } else if (mentalAge < 25) {
                analysisText = `您的心理年龄约为 ${mentalAge} 岁。您正处于从青涩向成熟过渡的关键阶段，开始展现出更强的独立性和责任感，同时在认知和情绪调控方面也在不断进步。`;
            } else if (mentalAge < 35) {
                analysisText = `您的心理年龄约为 ${mentalAge} 岁。这反映出您具备了较好的心理成熟度，在理性思考、情绪控制、人际适应和责任承担方面表现均衡，能够较好地应对生活中的各种挑战。`;
            } else if (mentalAge < 45) {
                analysisText = `您的心理年龄约为 ${mentalAge} 岁。您展现出高度的心理成熟，具备深刻的自我认知、稳定的情绪管理能力和成熟的决策判断力，在社会和个人生活中游刃有余。`;
            } else {
                analysisText = `您的心理年龄约为 ${mentalAge} 岁。这代表您拥有非常成熟和智慧的心理状态，经验丰富，心态平和，对人生有深刻的理解和洞察，展现出卓越的适应能力和内在力量。`;
            }
            analysisText += ` 综合来看，您的平均成熟度得分为 ${overallMaturityScore.toFixed(2)} (满分5分)。`;
            analysisTextElement.textContent = analysisText;
        }
    }
}


function generateDimensionsChart(dimensionScores, dimensionCounts) {
    const chartCanvas = document.getElementById('dimensionsChart');
    if (!chartCanvas) return;

    const labels = Object.keys(dimensionScores);
    const data = labels.map(label => {
        const score = dimensionScores[label] || 0;
        const count = dimensionCounts[label] || 0;
        const maxScore = count * 5;
        return maxScore > 0 ? (score / maxScore) * 100 : 0; // Percentage
    });

    const ctx = chartCanvas.getContext('2d');
    if (chartCanvas.chart) { // Destroy previous chart instance if exists
        chartCanvas.chart.destroy();
    }

    chartCanvas.chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: '成熟度百分比',
                data: data,
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { display: true },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        beginAtZero: true,
                        stepSize: 20,
                        backdropColor: 'rgba(255, 255, 255, 0.75)', // For better readability over grid lines
                        font: { size: 10 },
                        callback: function(value) { return value + '%'; }
                    },
                    pointLabels: {
                        font: { size: 12, weight: '500' },
                         padding:15, // Add padding for point labels
                    }
                }
            },
            plugins: {
                legend: { 
                    display: true, 
                    position: 'top',
                    labels: { font: { size: 14 } }
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.dataset.label + ': ' + tooltipItem.raw.toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
}

function generateGrowthSuggestions(dimensionAverages) {
    const suggestionsContainer = document.getElementById('growthSuggestions');
    if (!suggestionsContainer) return;
    suggestionsContainer.innerHTML = '';

    const suggestionBank = {
        "情绪调节能力": [
            "练习正念冥想，提升对当下情绪的觉察和接纳。",
            "尝试记录情绪日记，分析情绪触发点和应对模式。",
            "学习深呼吸或渐进式肌肉放松技巧，以应对急性压力。"
        ],
        "认知灵活性与开放性": [
            "主动阅读不同领域的书籍或文章，拓展知识面。",
            "刻意练习从他人视角看待问题，挑战自己的固有假设。",
            "尝试学习一项全新的技能，培养适应新事物的能力。"
        ],
        "社会适应性与人际理解": [
            "积极参与一些社群活动，练习在不同场合与人交流。",
            "学习积极倾听技巧，尝试真正理解对方的观点和感受。",
            "在发生分歧时，尝试寻找双赢的解决方案而非争论对错。"
        ],
        "责任感与决策能力": [
            "从小事做起，主动承担责任并坚持完成。",
            "做决策前，列出不同选项的利弊，进行理性分析。",
            "为自己的决定负责，从错误中学习并及时修正。"
        ],
        "未来规划与目标导向": [
            "设定具体、可衡量、可达成、相关性强、有时间限制（SMART）的短期和长期目标。",
            "将大目标分解为小步骤，并为每个步骤设定完成期限。",
            "定期回顾目标进展，根据实际情况灵活调整计划。"
        ],
        "自我认知与独立性": [
            "定期进行自我反思，思考自己的价值观、优点和待提升领域。",
            "在做决定时，优先考虑自己的真实需求和感受，减少外界干扰。",
            "尝试独自完成一些有挑战性的任务，培养自信和独立性。"
        ],
        "通用建议": [
            "保持好奇心和学习的热情，持续探索和成长。",
            "寻求良师益友的反馈和支持，共同进步。",
            "允许自己犯错，并将错误视为学习的机会。"
        ]
    };

    let suggestionsList = [];
    // Add specific suggestions for dimensions with lower scores (e.g., average < 3.5)
    for (const dimension in dimensionAverages) {
        if (dimensionAverages.hasOwnProperty(dimension) && dimensionAverages[dimension] < 3.5) {
            if (suggestionBank[dimension] && suggestionBank[dimension].length > 0) {
                suggestionsList.push(suggestionBank[dimension][Math.floor(Math.random() * suggestionBank[dimension].length)]); // Pick one random suggestion
            }
        }
    }

    // Ensure at least 2-3 suggestions, add generic ones if specific are few
    let genericSuggestionsAdded = 0;
    while (suggestionsList.length < 3 && genericSuggestionsAdded < suggestionBank["通用建议"].length) {
        let randomGenericSuggestion = suggestionBank["通用建议"][Math.floor(Math.random() * suggestionBank["通用建议"].length)];
        if (!suggestionsList.includes(randomGenericSuggestion)) { // Avoid duplicates
            suggestionsList.push(randomGenericSuggestion);
        }
        genericSuggestionsAdded++; // safety break
    }
    
    if (suggestionsList.length === 0) {
        suggestionsContainer.innerHTML = '<p class="text-gray-600">您在各个维度均表现出色，请继续保持！</p>';
    } else {
        suggestionsList.forEach(suggestion => {
            const li = `
                <li class="flex items-start py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-700">${suggestion}</span>
                </li>
            `;
            suggestionsContainer.innerHTML += li;
        });
    }
}
