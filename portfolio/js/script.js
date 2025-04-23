$(function () {

  // ページ内スクロール
  const navHeight = $(".header").outerHeight();

  $('a[href^="#"]').on("click", function () {
    const href = $(this).attr("href");
    const target = $(href == "#" || href == "" ? "html" : href);
    const position = target.offset().top - navHeight;
    $("html, body").animate({ scrollTop: position }, 300, "swing");
    return false;
  });

  // ページトップ
  $("#js-page-top").on("click", function () {
    $("body,html").animate({ scrollTop: 0 }, 300);
    return false;
  });
  
  // ハンバーガーメニューの開閉
  $("#js-hamburger").on("click", function () {
    $("body").toggleClass("nav-open");

    // メニューが開いている場合は背景のスクロールを無効化
    if ($("body").hasClass("nav-open")) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "auto");
    }
  });

  // メニュー内のリンクをクリックしたら閉じてスクロールを復活
  $(".nav-sp a").on("click", function () {
    $("body").removeClass("nav-open");
    $("body").css("overflow", "auto");
  });

  // ハンバーガーメニューの背景をクリックしたときに閉じる
  $(".nav-sp").on("click", function(e) {
    // クリックしたのが.nav-sp自体、または.nav-listの外側の場合のみ閉じる
    if (e.target === this || ($(e.target).closest('.nav-list').length === 0 && !$(e.target).hasClass('hamburger') && !$(e.target).parent().hasClass('hamburger'))) {
      $("body").removeClass("nav-open");
      $("body").css("overflow", "auto");
    }
  });
  


  // スライドショー
  const slides = $('.slide-item');
  let currentIndex = 0;
  let autoSlideTimer;

  function updateSlides() {
    slides.removeClass('active').css('opacity', '0');
    $(slides[currentIndex]).addClass('active').css('opacity', '1');
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(function () {
      showNextSlide();
    }, 3200);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideTimer);
  }

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  }

  updateSlides();
  startAutoSlide();

  $('#next').on('click', function () {
    stopAutoSlide();
    showNextSlide();
    setTimeout(startAutoSlide, 1000);
  });

  $('#prev').on('click', function () {
    stopAutoSlide();
    showPrevSlide();
    setTimeout(startAutoSlide, 1000);
  });
  
  // 言語切り替え機能
  function switchLanguage(lang) {
    console.log('Switching language to:', lang); // デバッグ用ログ
    
    // テキストの切り替え
    $('[data-ja][data-en]').each(function () {
      const html = $(this).data(lang);
      if (html) {
        $(this).html(html);
      }
    });

    // 英語の時に指定の箇所のみ大文字クラス追加、日本語なら削除
    if (lang === 'en') {
      $('.works-name, .hobby-detail h5, .btn-main, .article-body h3, .article-title').addClass('capitalize');
    } else {
      $('.works-name, .hobby-detail h5, .btn-main, .article-body h3, .article-title').removeClass('capitalize');
    }

    if (lang === 'en') {
      $('.about-title, .btn-main').addClass('uppercase');
    } else {
      $('.about-title, .btn-main').removeClass('uppercase');
    }

    // メインビジュアル画像を切り替え
    updateMainVisualImage(lang);

    function updateMainVisualImage(lang) {
      const mvImg = document.getElementById('mv-lang');
      if (!mvImg) {
        console.log('Main visual image element not found'); // デバッグ用ログ
        return;
      }
    
      if (lang === 'en') {
        mvImg.src = 'img/main-img-en.png';
      } else {
        mvImg.src = 'img/main-img.png';
      }
    }

    // スライドショー内のdata-titleも切り替え
    $('[data-ja-title][data-en-title]').each(function () {
      const newTitle = $(this).data(`${lang}-title`);
      if (newTitle) {
        $(this).attr('data-title', newTitle);
      }
    });

    // 言語を保存
    localStorage.setItem('lang', lang);
  }

  // ボタンクリックで切り替え
  $(document).on('click', '#lang-ja, #lang-ja-sp', function(e) {
    console.log('Japanese button clicked'); // デバッグ用ログ
    e.preventDefault();
    switchLanguage('ja');
  });

  $(document).on('click', '#lang-en, #lang-en-sp', function(e) {
    console.log('English button clicked'); // デバッグ用ログ
    e.preventDefault();
    switchLanguage('en');
  });

  // ページ読み込み時に保存言語を適用
  $(document).ready(function() {
    const savedLang = localStorage.getItem('lang') || 'ja';
    console.log('Initial language:', savedLang); // デバッグ用ログ
    switchLanguage(savedLang);
  });
  
});