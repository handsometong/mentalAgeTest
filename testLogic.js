document.addEventListener('DOMContentLoaded', function() {
    const testQuestions = [
        // Dimension 1: 情绪调节能力 (Emotional Regulation)
        {
            dimension: "情绪调节能力",
            question: "当您感到强烈的压力或焦虑时，您通常如何应对？",
            options: [
                { value: "A", text: "感到不知所措，难以集中精力，甚至逃避。", score: 1 },
                { value: "B", text: "情绪波动较大，但会尝试做些什么来缓解。", score: 2 },
                { value: "C", text: "能够意识到自己的情绪，并尝试一些基本方法让自己平静下来。", score: 3 },
                { value: "D", text: "能主动运用有效的策略管理情绪，并寻求建设性的解决方案。", score: 4 },
                { value: "E", text: "即使在巨大压力下，也能保持相对平稳的情绪，并能从中学习和成长。", score: 5 }
            ]
        },
        {
            dimension: "情绪调节能力",
            question: "在受到他人批评或负面评价后，您的典型反应是？",
            options: [
                { value: "A", text: "非常沮丧或愤怒，长时间无法释怀。", score: 1 },
                { value: "B", text: "感到不快，可能会反驳或内心抵触。", score: 2 },
                { value: "C", text: "会有些不舒服，但能尝试理解对方的观点。", score: 3 },
                { value: "D", text: "能够区分建设性批评和非理性攻击，并从中学习。", score: 4 },
                { value: "E", text: "平静接受反馈，客观评估，并将其视为提升自我的机会。", score: 5 }
            ]
        },
        {
            dimension: "情绪调节能力",
            question: "当计划被打乱或遇到意外挫折时，您的情绪恢复速度如何？",
            options: [
                { value: "A", text: "需要很长时间才能平复，且会影响其他方面。", score: 1 },
                { value: "B", text: "会感到沮丧一段时间，但最终能调整过来。", score: 2 },
                { value: "C", text: "能够较快接受现实，并开始思考下一步。", score: 3 },
                { value: "D", text: "能迅速调整心态，积极寻找新的解决方案。", score: 4 },
                { value: "E", text: "将挫折视为常态，并能灵活适应，保持积极心态。", score: 5 }
            ]
        },
        // Dimension 2: 认知灵活性与开放性 (Cognitive Flexibility & Openness)
        {
            dimension: "认知灵活性与开放性",
            question: "面对一个与您现有观念完全不同的新观点，您倾向于？",
            options: [
                { value: "A", text: "立即排斥，认为其不可靠或错误。", score: 1 },
                { value: "B", text: "持怀疑态度，不太愿意深入了解。", score: 2 },
                { value: "C", text: "愿意听一听，但很难改变自己原有的看法。", score: 3 },
                { value: "D", text: "有兴趣了解，并思考其合理性，可能调整自己。", score: 4 },
                { value: "E", text: "积极拥抱新观点，乐于挑战和更新自己的认知框架。", score: 5 }
            ]
        },
        {
            dimension: "认知灵活性与开放性",
            question: "当您需要学习一项全新的技能或知识时，您的感受是？",
            options: [
                { value: "A", text: "感到畏惧和抗拒，认为太难。", score: 1 },
                { value: "B", text: "有些不情愿，但如果必须会去学。", score: 2 },
                { value: "C", text: "愿意尝试，但需要较多时间和外部激励。", score: 3 },
                { value: "D", text: "抱有好奇心，主动投入学习并享受过程。", score: 4 },
                { value: "E", text: "非常兴奋，视其为拓展自我的机会，并能快速上手。", score: 5 }
            ]
        },
        {
            dimension: "认知灵活性与开放性",
            question: "在解决问题时，如果常规方法行不通，您会如何做？",
            options: [
                { value: "A", text: "容易感到沮丧并放弃尝试。", score: 1 },
                { value: "B", text: "反复尝试旧方法，或寻求他人直接给出答案。", score: 2 },
                { value: "C", text: "会尝试思考其他可能性，但思路有限。", score: 3 },
                { value: "D", text: "积极寻找多种不同的解决方案，并乐于尝试创新方法。", score: 4 },
                { value: "E", text: "能够跳出思维定势，从多角度、创造性地构想并测试新策略。", score: 5 }
            ]
        },
        // Dimension 3: 社会适应性与人际理解 (Social Adaptability & Interpersonal Understanding)
        {
            dimension: "社会适应性与人际理解",
            question: "进入一个新的社交环境（如新公司、新社群），您通常？",
            options: [
                { value: "A", text: "感到非常不自在，倾向于独处，很难主动与人交流。", score: 1 },
                { value: "B", text: "比较慢热，需要一段时间才能适应和融入。", score: 2 },
                { value: "C", text: "能够观察并逐渐适应，但主要与少数人互动。", score: 3 },
                { value: "D", text: "能较快适应，主动与不同的人建立联系，并参与集体活动。", score: 4 },
                { value: "E", text: "能迅速融入并感到舒适，善于理解和适应不同社交规则，并建立良好关系。", score: 5 }
            ]
        },
        {
            dimension: "社会适应性与人际理解",
            question: "当与他人发生意见分歧或冲突时，您倾向于如何处理？",
            options: [
                { value: "A", text: "回避冲突，或者情绪化地坚持己见。", score: 1 },
                { value: "B", text: "感到不悦，可能会争论，但难以达成共识。", score: 2 },
                { value: "C", text: "尝试表达自己的观点，也愿意听对方的，但有时难以真正理解。", score: 3 },
                { value: "D", text: "努力理解对方立场，寻求共同点，并尝试找到双方都能接受的解决方案。", score: 4 },
                { value: "E", text: "能够冷静、成熟地处理分歧，善于沟通协调，促进相互理解和合作。", score: 5 }
            ]
        },
        {
            dimension: "社会适应性与人际理解",
            question: "您对于理解他人的情绪和动机有多大把握？",
            options: [
                { value: "A", text: "经常不确定他人的真实想法和感受。", score: 1 },
                { value: "B", text: "有时能感觉到，但不够敏锐或准确。", score: 2 },
                { value: "C", text: "通常能通过观察和交流大致理解他人。", score: 3 },
                { value: "D", text: "能较好地洞察他人的情绪和潜在需求，并做出适度回应。", score: 4 },
                { value: "E", text: "具备较强的同理心和洞察力，能深刻理解他人，并建立深层连接。", score: 5 }
            ]
        },
        // Dimension 4: 责任感与决策能力 (Responsibility & Decision-Making)
        {
            dimension: "责任感与决策能力",
            question: "当您承担一项重要任务时，您的态度是？",
            options: [
                { value: "A", text: "感到压力很大，担心失败，可能拖延。", score: 1 },
                { value: "B", text: "会尽力完成，但如果遇到困难，可能需要他人推动。", score: 2 },
                { value: "C", text: "认真对待，按计划执行，能够独立完成大部分工作。", score: 3 },
                { value: "D", text: "主动负责，积极规划并克服困难，确保任务高质量完成。", score: 4 },
                { value: "E", text: "不仅对任务结果负责，还会主动承担超额责任，追求卓越。", score: 5 }
            ]
        },
        {
            dimension: "责任感与决策能力",
            question: "在做重要决策时，您通常如何进行？",
            options: [
                { value: "A", text: "犹豫不决，难以抉择，或依赖他人意见。", score: 1 },
                { value: "B", text: "会考虑一些因素，但容易受情绪或短期利益影响。", score: 2 },
                { value: "C", text: "能够收集信息，进行分析，但有时缺乏果断。", score: 3 },
                { value: "D", text: "系统评估各种选项的利弊，权衡长远影响，做出理性决策。", score: 4 },
                { value: "E", text: "能够果断、自信地做出艰难决策，并勇于承担决策后果。", score: 5 }
            ]
        },
        {
            dimension: "责任感与决策能力",
            question: "如果您的某个决定导致了不良后果，您会？",
            options: [
                { value: "A", text: "倾向于找借口或推卸责任。", score: 1 },
                { value: "B", text: "承认错误，但感到沮丧，不知如何弥补。", score: 2 },
                { value: "C", text: "承担责任，并尝试修正，但可能缺乏系统方法。", score: 3 },
                { value: "D", text: "主动承担责任，分析原因，积极采取措施补救，并从中吸取教训。", score: 4 },
                { value: "E", text: "不仅承担责任并弥补，还会反思整个决策过程，以优化未来行为。", score: 5 }
            ]
        },
        // Dimension 5: 未来规划与目标导向 (Future Planning & Goal Orientation)
        {
            dimension: "未来规划与目标导向",
            question: "您对自己的未来（例如1-3年）是否有清晰的规划？",
            options: [
                { value: "A", text: "几乎没有思考过，走一步看一步。", score: 1 },
                { value: "B", text: "有一些模糊的想法，但没有具体计划。", score: 2 },
                { value: "C", text: "有大致方向和一些短期目标，但缺乏长期连贯性。", score: 3 },
                { value: "D", text: "有比较明确的中长期目标，并制定了可行的实施步骤。", score: 4 },
                { value: "E", text: "有清晰的愿景和详细的、可调整的长期规划，并定期检视进度。", score: 5 }
            ]
        },
        {
            dimension: "未来规划与目标导向",
            question: "在追求目标的过程中遇到障碍或诱惑时，您通常？",
            options: [
                { value: "A", text: "很容易分心或放弃原有目标。", score: 1 },
                { value: "B", text: "会动摇，但有时能坚持下来。", score: 2 },
                { value: "C", text: "能保持一定的专注，但有时需要外部提醒或激励。", score: 3 },
                { value: "D", text: "具备较强的自制力和毅力，能够克服多数障碍，专注目标。", score: 4 },
                { value: "E", text: "目标感极强，能主动排除干扰，灵活调整策略，坚定不移地向目标迈进。", score: 5 }
            ]
        },
        {
            dimension: "未来规划与目标导向",
            question: "您是否会定期评估自己的进展，并根据情况调整计划？",
            options: [
                { value: "A", text: "很少或从不评估。", score: 1 },
                { value: "B", text: "偶尔会想一下，但没有系统性的评估和调整。", score: 2 },
                { value: "C", text: "当遇到重大问题时会评估，但调整不够主动。", score: 3 },
                { value: "D", text: "会定期（如每月/每季度）回顾进展，并主动调整计划。", score: 4 },
                { value: "E", text: "将评估和调整作为规划的常态部分，持续优化路径以达成目标。", score: 5 }
            ]
        },
        // Dimension 6: 自我认知与独立性 (Self-Awareness & Autonomy)
        {
            dimension: "自我认知与独立性",
            question: "您对自己优点和缺点的了解程度如何？",
            options: [
                { value: "A", text: "不太清楚，或者对他人的评价很在意。", score: 1 },
                { value: "B", text: "大致了解一些，但不够深入或客观。", score: 2 },
                { value: "C", text: "对自己的主要优缺点有一定认识。", score: 3 },
                { value: "D", text: "能够比较清晰和客观地认识自己的长处与不足，并接纳它们。", score: 4 },
                { value: "E", text: "有深刻且动态的自我认知，持续探索和发展自我，并能扬长避短。", score: 5 }
            ]
        },
        {
            dimension: "自我认知与独立性",
            question: "在做个人选择时，您多大程度上依赖他人的意见或认可？",
            options: [
                { value: "A", text: "非常依赖，如果他人不赞同，自己会很难坚持。", score: 1 },
                { value: "B", text: "会参考他人意见，有时会因此改变初衷。", score: 2 },
                { value: "C", text: "重视他人意见，但最终会基于自己的判断做决定。", score: 3 },
                { value: "D", text: "相信自己的判断，即使与他人不同，也能坚持自己的选择。", score: 4 },
                { value: "E", text: "有坚定的内在价值体系和自主决策能力，不受外界轻易干扰。", score: 5 }
            ]
        },
        {
            dimension: "自我认知与独立性",
            question: "您如何看待独处的时间？",
            options: [
                { value: "A", text: "尽量避免独处，会感到孤独或无聊。", score: 1 },
                { value: "B", text: "可以独处，但不会主动寻求。", score: 2 },
                { value: "C", text: "认为独处有一定价值，可以放松或思考。", score: 3 },
                { value: "D", text: "享受独处时光，将其视为自我充电和反思的重要机会。", score: 4 },
                { value: "E", text: "珍视并主动创造独处时间，认为这是深刻自我连接和内在成长的关键。", score: 5 }
            ]
        }
    ];
    
    let currentQuestionIndex = 0;
    let userAnswers = {};
    
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const currentQuestionNumElement = document.getElementById('currentQuestionNum');
    const totalQuestionsElement = document.getElementById('totalQuestions');
    const progressBarFillElement = document.getElementById('progressBarFill');
    const dimensionLabelElement = document.getElementById('dimensionLabel');
    const questionTextElement = document.getElementById('questionText');
    const optionsContainerElement = document.getElementById('optionsContainer');
    
    const savedCurrentQuestion = localStorage.getItem('currentQuestion');
    const savedAnswers = localStorage.getItem('testAnswers');
    
    if (savedCurrentQuestion) {
        currentQuestionIndex = parseInt(savedCurrentQuestion);
    }
    
    if (savedAnswers) {
        userAnswers = JSON.parse(savedAnswers);
    }
    
    totalQuestionsElement.textContent = testQuestions.length;
    
    if (testQuestions.length > 0) {
        displayQuestion(currentQuestionIndex);
    } else {
        questionTextElement.textContent = "未能加载测试题目。请检查题库数据。";
        if(nextButton) nextButton.disabled = true;
        if(prevButton) prevButton.disabled = true;
        if(dimensionLabelElement) dimensionLabelElement.textContent = "错误";
    }
    
    if(prevButton) {
        prevButton.addEventListener('click', function() {
            if (currentQuestionIndex > 0) {
                 saveCurrentAnswer();
                currentQuestionIndex--;
                displayQuestion(currentQuestionIndex);
                localStorage.setItem('currentQuestion', currentQuestionIndex);
            }
        });
    }
    
    if(nextButton) {
        nextButton.addEventListener('click', function() {
            const selectedOption = document.querySelector('input[name="answer"]:checked');
            
            if (!selectedOption) {
                 alert('请选择一个选项再继续');
                 return;
            }
            
            saveCurrentAnswer();
            
            if (currentQuestionIndex < testQuestions.length - 1) {
                currentQuestionIndex++;
                displayQuestion(currentQuestionIndex);
                localStorage.setItem('currentQuestion', currentQuestionIndex);
            } else {
                completeTest();
            }
        });
    }

    function saveCurrentAnswer() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (selectedOption && testQuestions[currentQuestionIndex]) {
            const questionId = currentQuestionIndex; // Use index as ID
            const answerValue = selectedOption.value;
            const optionData = testQuestions[currentQuestionIndex].options.find(opt => opt.value === answerValue);
            
            if (optionData) {
                userAnswers[questionId] = {
                    dimension: testQuestions[currentQuestionIndex].dimension,
                    answer: answerValue,
                    score: optionData.score
                };
                localStorage.setItem('testAnswers', JSON.stringify(userAnswers));
            } else {
                console.error(`Could not find score for option ${answerValue} on question ${currentQuestionIndex}`);
            }
        }
    }
    
    function displayQuestion(index) {
        if (!testQuestions[index]) {
            console.error("Question index out of bounds:", index);
            questionTextElement.textContent = "题目加载错误。";
            return;
        }

        currentQuestionNumElement.textContent = index + 1;
        const progressPercentage = ((index + 1) / testQuestions.length) * 100;
        progressBarFillElement.style.width = `${progressPercentage}%`;
        
        dimensionLabelElement.textContent = testQuestions[index].dimension;
        questionTextElement.textContent = testQuestions[index].question;
        
        optionsContainerElement.innerHTML = '';
        testQuestions[index].options.forEach(option => {
            const isChecked = userAnswers[index] && userAnswers[index].answer === option.value;
            const optionHTML = `
                <label class="block">
                    <div class="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 group transition-colors ${isChecked ? 'bg-blue-50 border-blue-500' : ''}">
                        <input type="radio" name="answer" value="${option.value}" class="mt-1 mr-4 h-4 w-4 text-blue-600" ${isChecked ? 'checked' : ''}>
                        <div>
                            <span class="font-medium text-gray-800 group-hover:text-gray-900 block mb-1">${option.value}.</span>
                            <span class="text-gray-600 group-hover:text-gray-700">${option.text}</span>
                        </div>
                    </div>
                </label>
            `;
            optionsContainerElement.innerHTML += optionHTML;
        });
        
        if(prevButton) prevButton.disabled = index === 0;
        
        if(nextButton) {
            if (index === testQuestions.length - 1) {
                nextButton.textContent = "提交答案";
            } else {
                nextButton.textContent = "下一题";
            }
        }
    }
    
    function completeTest() {
        const dimensionScores = {};
        const dimensionCounts = {};
        
        Object.values(userAnswers).forEach(answer => {
            if (!dimensionScores[answer.dimension]) {
                dimensionScores[answer.dimension] = 0;
                dimensionCounts[answer.dimension] = 0;
            }
            dimensionScores[answer.dimension] += answer.score;
            dimensionCounts[answer.dimension]++;
        });
        
        const dimensionAverages = {};
        Object.keys(dimensionScores).forEach(dimension => {
             if (dimensionCounts[dimension] > 0) {
                dimensionAverages[dimension] = dimensionScores[dimension] / dimensionCounts[dimension];
             } else {
                dimensionAverages[dimension] = 0; 
             }
        });
        
        localStorage.setItem('testResults', JSON.stringify({
            dimensionScores,
            dimensionCounts,
            dimensionAverages,
            totalQuestions: testQuestions.length,
            completedAt: new Date().toISOString()
        }));
        
        localStorage.removeItem('currentQuestion');
        // localStorage.removeItem('testAnswers'); // Keep answers for review or re-submission if needed, or clear if preferred. Let's clear it for a fresh start on next test.
        localStorage.removeItem('testAnswers'); 

        window.location.href = 'results.html';
    }
});
