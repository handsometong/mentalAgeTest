document.addEventListener('DOMContentLoaded', function() {
    console.log('心理年龄测试网站初始化完成');
    
    // 监听开始测试按钮
    const startButton = document.querySelector('a[href="test.html"]');
    if (startButton) {
        startButton.addEventListener('click', function(e) {
            // 如果需要在开始测试前做一些准备工作，可以在这里添加
            console.log('开始测试');
            
            // 确保本地存储已清除上一次的测试数据
            localStorage.removeItem('testAnswers');
            localStorage.removeItem('currentQuestion');
        });
    }
    
    // 添加页面动画效果
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }
    
    // 如果有公告或特殊信息需要展示，可以在这里添加动态创建元素的代码
    
    // 示例：检测是否有未完成的测试，提供继续测试的选项
    const unfinishedTest = localStorage.getItem('currentQuestion');
    if (unfinishedTest) {
        createContinueTestBanner();
    }
});

// 创建继续未完成测试的提示横幅
function createContinueTestBanner() {
    const banner = document.createElement('div');
    banner.className = 'fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 flex justify-between items-center';
    banner.innerHTML = `
        <p>您有一个未完成的测试。</p>
        <div>
            <button id="continueBannerBtn" class="bg-white text-blue-600 px-4 py-2 rounded-lg mr-2 hover:bg-blue-50 transition-colors">
                继续测试
            </button>
            <button id="discardBannerBtn" class="text-white border border-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                放弃
            </button>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    // 添加事件监听
    document.getElementById('continueBannerBtn').addEventListener('click', function() {
        window.location.href = 'test.html';
    });
    
    document.getElementById('discardBannerBtn').addEventListener('click', function() {
        localStorage.removeItem('testAnswers');
        localStorage.removeItem('currentQuestion');
        banner.remove();
    });
}

