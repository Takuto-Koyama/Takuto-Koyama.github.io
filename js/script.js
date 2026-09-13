$(function () {

  //ページ内スクロール
  var navHeight = $(".header").outerHeight();

  $('a[href^="#"]').on("click", function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - navHeight;
    $("html, body").animate({ scrollTop: position, }, 300, "swing");
    return false;
  });

  //ページトップ
  $("#js-page-top").on("click", function () {
    $("body,html").animate({ scrollTop: 0, }, 300);
    return false;
  });

  //スクロールに合わせて要素をフェードインさせる
  (function () {
    if (!("IntersectionObserver" in window)) return;

    var targets = document.querySelectorAll([
      ".section .title",
      ".profile",
      ".timeline-item",
      ".accordion-item",
      ".skill-item",
      ".contact .lead",
      ".contact-list"
    ].join(","));
    if (!targets.length) return;

    //JSが動く環境でのみ非表示にする（JS無効時は通常表示のまま）
    targets.forEach(function (el) {
      el.classList.add("reveal");
    });

    //同じリスト内の要素は少しずつ遅らせて登場させる
    document.querySelectorAll(".timeline, .skill-list").forEach(function (parent) {
      parent.querySelectorAll(".reveal").forEach(function (el, index) {
        el.style.transitionDelay = Math.min(index, 6) * 80 + "ms";
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });

    targets.forEach(function (el) {
      observer.observe(el);
    });
  })();

});
