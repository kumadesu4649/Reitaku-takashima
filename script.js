document.addEventListener('DOMContentLoaded', () => {
    
    // --- 設定（ここでスプラッシュ画面の秒数を調整できます） ---
    // ----------------------------------------------------------
    // Intersection Observerによるスクロールアニメーション
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // 一度表示されたら監視を解除する
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // アニメーション対象の要素を取得して監視を開始
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    
    // パララックス風スクロール効果の追加
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
        
        // スクロール時に上部タブナビゲーションを表示
        const topNav = document.getElementById('top-nav');
        if (topNav) {
            // 一定以上（今回は100px）スクロールしたらメニューを表示させる
            if (scrolled > 100) {
                topNav.classList.add('is-scrolled');
            } else {
                topNav.classList.remove('is-scrolled');
            }
        }
        
        // スクロールインジケーターを「TOPへ戻る」ボタンへ切り替え
        const scrollIndicatorObj = document.getElementById('scroll-indicator');
        const scrollTextObj = document.getElementById('scroll-text');
        
        if (scrollIndicatorObj && scrollTextObj) {
            if (scrolled > window.innerHeight * 0.3) {
                // 画面の30%以上スクロールした場合、TOPボタンに変化
                scrollIndicatorObj.classList.add('is-totop');
                scrollTextObj.innerHTML = '↑ Top'; // 矢印を追加してわかりやすく
            } else {
                // 上部に戻ってきたら元のScrollに戻す
                scrollIndicatorObj.classList.remove('is-totop');
                scrollTextObj.innerText = 'Scroll';
            }
        }
    });

    // スクロールインジケーターのクリックイベント
    const scrollerBtn = document.getElementById('scroll-indicator');
    if (scrollerBtn) {
        scrollerBtn.addEventListener('click', () => {
            if (scrollerBtn.classList.contains('is-totop')) {
                // 「TOP」状態の時は一番上へスクロールさせる
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // 「Scroll」状態の時は少し下（約1ページ分）にスクロールさせる
                window.scrollBy({
                    top: window.innerHeight * 0.8,
                    behavior: 'smooth'
                });
            }
        });
    }

});