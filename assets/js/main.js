/* ビッグバン株式会社 公式サイト — main.js
   ・スマホメニューの開閉
   ・固定ヘッダーの高さ（アンカー位置の調整用）と影
   ・スクロール時のフェードイン（動きを減らす設定の端末では無効） */
(() => {
  const btn = document.querySelector('.menu-btn'),
    nav = document.getElementById('gnav');
  const set = (open) => {
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    nav.classList.toggle('open', open);
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') set(false);
  });

  const hd = document.querySelector('.hd');
  const setH = () => document.documentElement.style.setProperty('--hdh', hd.offsetHeight + 'px');
  setH();
  addEventListener('resize', setH);
  addEventListener('load', setH);
  // CSS やフォントの読み込み後に高さが変わっても追従する
  if ('ResizeObserver' in window) new ResizeObserver(setH).observe(hd);
  const stuck = () => hd.classList.toggle('is-stuck', scrollY > 4);
  stuck();
  addEventListener('scroll', stuck, { passive: true });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('.rv,.rv-img');
  if (reduce || !('IntersectionObserver' in window)) els.forEach((e) => e.classList.add('in'));
  else {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach((e) => io.observe(e));
  }
})();
