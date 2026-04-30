document.addEventListener('DOMContentLoaded', () => {
    

    document.documentElement.classList.add("light-theme");

    // --- 白黒テーマ切り替え機能 ---
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (themeBtn && themeIcon) {
        themeBtn.addEventListener('click', () => {
            // :root に .light-theme クラスをトグル
            document.documentElement.classList.toggle('light-theme');
            
            // アイコンの切り替え（太陽 ⇔ 月）
            if (document.documentElement.classList.contains('light-theme')) {
                // 月のアイコン（ダークモードへ戻す用）
                themeIcon.innerHTML = `
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                `;
            } else {
                // 太陽のアイコン（ライトモードへにする用）
                themeIcon.innerHTML = `
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                `;
            }
        });
    }

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
            if (scrolled < window.innerHeight * 999) {
                // 画面の30%以上スクロールした場合、TOPボタンに変化
                scrollIndicatorObj.classList.add('is-totop');
                scrollTextObj.innerHTML = 'お申し込み'; // 矢印を追加してわかりやすく
            } else {
                // 上部に戻ってきたら元のScrollに戻す
                scrollIndicatorObj.classList.remove('is-totop');
                scrollTextObj.innerText = 'お申し込み';
            }
        }
    });

    // スクロールインジケーターのクリックイベント
        const scrollerBtn = document.getElementById('scroll-indicator');

        if (scrollerBtn) {
            scrollerBtn.addEventListener('click', () => {

                const target = document.getElementById('registration');

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
});
