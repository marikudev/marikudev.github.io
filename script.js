/* ================================================================
   MALIK — Portfolio (vanilla) · script.js
   ----------------------------------------------------------------
   Berkas ini berisi SEMUA perilaku situs. index.html hanya
   berisi struktur, style.css hanya berisi tampilan.

   Alur besarnya: DATA (array di bagian atas) dibaca oleh fungsi
   RENDER menjadi kartu HTML, lalu blok-blok interaksi (carousel,
   menu, scrollspy, efek kursor) menghidupkan halaman. Toggle
   bahasa menggambar ulang semuanya dari data bahasa lain.

   Peta berkas (urut dari atas ke bawah):
     1. Data konten — EXPERIENCE / PROJECTS / ARTIKEL dalam dua
        bahasa (Inggris + Jepang). Mengubah isi situs cukup
        dengan mengubah array ini.
     2. Bahasa aktif (currentLang) & fungsi pembantu L().
     3. renderExperience() & renderProjects() — menggambar kartu
        Experience dan Projects dari data.
     4. Carousel proyek "My Projects" di hero — autoplay 2 detik,
        bisa diseret (drag/swipe), panah keyboard, dan klik kartu
        menggulir ke kartu proyek yang sama di bagian Projects.
     5. Spotlight kursor & kilau Liquid Glass pada kartu.
     6. Scrollspy — menu aktif mengikuti posisi scroll.
     7. Carousel artikel Zenn — autoplay + crossfade.
     8. Menu burger untuk mobile.
     9. Kamus teks statis (STR) & setLanguage() — toggle bahasa
        Jepang / Inggris untuk seluruh halaman.

   Bahasa bawaan saat halaman pertama dibuka: Jepang ("ja").
   ================================================================ */

/* ================================================================
   Data — sama seperti pola array di demo sebelumnya:
   ganti isi array ini untuk mengubah konten halaman.
   ================================================================ */
var EXPERIENCE = [
  {
    /* Riwayat ASLI Malik (sama seperti versi Next.js, lib/data.ts):
       hanya 2 entri, tanpa tahun/perusahaan karena datanya memang
       tidak pernah diberikan. url: null berarti tidak ada situs
       perusahaan untuk ditautkan — renderExperience() menampilkan
       judul sebagai teks biasa (bukan tautan). */
    period: "Present",
    title: "Web Engineer",
    url: null,
    ariaLabel: "Web Engineer",
    prevRoles: [],
    description: "Build end-to-end web applications — from the interface people touch to the systems and APIs behind it. Works include Chourei Connect, a Japanese-language translation assistant for morning assemblies (chourei) at automotive factories, and BOJ Data Explorer, a tool for searching and visualising official Bank of Japan time-series data.",
    relatedLinks: [],
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "JavaScript"]
  },
  {
    period: "Previous",
    title: "Hospitality — Customer Service (Front Line)",
    url: null,
    ariaLabel: "Hospitality — customer service on the front line",
    prevRoles: [],
    description: "Worked face to face with customers on the front line of the hospitality industry, and developed the ability to understand what people truly need. That experience is now the foundation of how I build products — always imagining the feelings of the person on the other side of the screen.",
    relatedLinks: [],
    tags: ["Customer Service", "Communication"]
  }
];

/* Versi bahasa Jepang dari EXPERIENCE di atas (konten yang
   sama, diterjemahkan). Bahasa aktif dipilih lewat
   currentLang; fungsi experienceData() / projectsData() /
   artikelData() mengembalikan array sesuai bahasa. */
var EXPERIENCE_JA = [
  {
    period: "現在",
    title: "Webエンジニア",
    url: null,
    ariaLabel: "Webエンジニア",
    prevRoles: [],
    description: "ユーザーが触れるインターフェースから、その裏側のシステムやAPIまで、Webアプリケーションをエンドツーエンドで設計・開発しています。制作実績として、自動車工場の朝礼向け翻訳支援アプリ「朝礼コネクト（Chourei Connect）」や、日本銀行の公式時系列データを検索・可視化する「BOJ Data Explorer」などがあります。",
    relatedLinks: [],
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "JavaScript"]
  },
  {
    period: "前職",
    title: "ホスピタリティ業界（接客）",
    url: null,
    ariaLabel: "ホスピタリティ業界（接客）",
    prevRoles: [],
    description: "ホスピタリティ業界の現場でお客様と直接向き合う仕事に従事する中で、人が本当に必要としているものを理解する力を身につけました。その経験が、今の私のプロダクトづくりの土台になっています。画面の向こうにいる人の気持ちを想像しながら設計・実装しています。",
    relatedLinks: [],
    tags: ["接客", "コミュニケーション"]
  }
];

/* PROJECTS — tiga karya yang tampil di bagian Projects dan
   di carousel "My Projects" pada hero. Field "id" adalah
   jangkar: klik kartu di carousel menggulir ke kartu proyek
   dengan id yang sama di bagian Projects. Field "url" adalah
   alamat situs proyek (dibuka di tab baru saat kartunya
   diklik); proyek yang belum terbit memakai alamat sementara
   https://www.example.com — ganti di sini dan di PROJECTS_JA
   begitu domain aslinya tersedia. */

var PROJECTS = [
  {
    id: "project-genba-connect",
    title: "Genba Connect",
    url: "https://www.example.com",
    description: "A web platform that helps Japanese workplace staff communicate with multilingual team members. Its first product, Chourei Connect, translates morning-assembly (chourei) announcements of up to 300 characters into 7 languages \u2014 Indonesian, Burmese, Portuguese, English, Vietnamese, Tagalog, and Simplified Chinese \u2014 displayed in 1\u20134 panels, using AI via OpenRouter with each user\u2019s own API key. A second product, Mendan Connect, is also planned. Not yet published.",
    image: "assets/cover-genba.svg",
    imageAlt: "Genba Connect project cover",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "OpenRouter API", "Cloudflare Workers"],
    installs: null
  },
  {
    /* Belum dipublikasikan: url sementara diisi placeholder
       https://www.example.com — ganti dengan domain aslinya
       di sini (dan di PROJECTS_JA) begitu sudah tersedia. */
    id: "project-boj-data-explorer",
    title: "BOJ Data Explorer",
    url: "https://www.example.com",
    description: "A web app for searching, visualising (charts and tables), and exporting official Bank of Japan time-series data through the official BOJ API. Bilingual in Japanese and English, built with vanilla JavaScript and Chart.js behind a serverless proxy. Not yet published.",
    image: "assets/cover-boj.svg",
    imageAlt: "BOJ Data Explorer project cover",
    tags: ["JavaScript", "Chart.js", "BOJ API", "Cloudflare Workers"],
    installs: null
  },
  {
    /* Kartu ini adalah karya TERPISAH: versi Next.js dari
       portofolio ini (bukan situs vanilla yang sedang dibaca).
       Versi Next.js belum pernah di-deploy, jadi url sementara
       diisi placeholder https://www.example.com — ganti dengan
       domain aslinya di sini (dan di PROJECTS_JA) begitu
       sudah tersedia. */
    id: "project-malik-portfolio-nextjs",
    title: "MALIK Portfolio",
    url: "https://www.example.com",
    description: "A fullstack version of this portfolio, built separately with Next.js and Tailwind CSS. Bilingual in Japanese and English, server-rendered, with its own built-in API routes for projects, articles, and contact. Not yet published.",
    image: "assets/cover-portfolio.svg",
    imageAlt: "MALIK Portfolio project cover",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    installs: null
  }
];

/* Versi bahasa Jepang dari PROJECTS di atas. Sebagian judul
   proyek punya bentuk Jepang sendiri (mis. 現場コネクト),
   jadi judul ikut diterjemahkan, sama seperti deskripsi,
   alt gambar, dan label instalasi. */
var PROJECTS_JA = [
  {
    id: "project-genba-connect",
    title: "現場コネクト（Genba Connect）",
    url: "https://www.example.com",
    description: "日本の現場スタッフと多言語のメンバーとのコミュニケーションを支援するWebプラットフォームです。第1弾の「朝礼コネクト」は、朝礼のお知らせ（最大300文字）を、インドネシア語・ビルマ語・ポルトガル語・英語・ベトナム語・タガログ語・中国語（簡体字）の7言語に翻訳し、1〜4つのパネルで表示します。OpenRouter経由でAIを利用し、APIキーは利用者ご自身のものを使います。第2弾の「面談コネクト」も計画中です。現在は未公開です。",
    image: "assets/cover-genba.svg",
    imageAlt: "現場コネクトのプロジェクトカバー",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "OpenRouter API", "Cloudflare Workers"],
    installs: null
  },
  {
    /* 未公開のため、url は仮の https://www.example.com。
       ドメインが用意できたらここ（と PROJECTS 側）を
       実際の URL に差し替える。 */
    id: "project-boj-data-explorer",
    title: "BOJ Data Explorer",
    url: "https://www.example.com",
    description: "日本銀行の公式APIを通じて、公式の時系列データを検索し、グラフと表で可視化し、エクスポートできるWebアプリです。日本語・英語の二言語対応で、バニラJavaScriptとChart.js、サーバーレスプロキシで構築しています。現在は未公開です。",
    image: "assets/cover-boj.svg",
    imageAlt: "BOJ Data Explorerのプロジェクトカバー",
    tags: ["JavaScript", "Chart.js", "BOJ API", "Cloudflare Workers"],
    installs: null
  },
  {
    /* このカードは別作品: このポートフォリオの Next.js 版
       （閲覧中のバニラ版サイト自体ではない）。Next.js 版は
       まだデプロイされていないため、url は仮の
       https://www.example.com。ドメインが用意できたら
       ここ（と PROJECTS 側）を実際の URL に差し替える。 */
    id: "project-malik-portfolio-nextjs",
    title: "MALIKポートフォリオ",
    url: "https://www.example.com",
    description: "このポートフォリオの別バージョンとして、Next.jsとTailwind CSSで構築したフルスタックのポートフォリオです。日本語・英語の二言語対応、サーバーレンダリングと、プロジェクト・記事・お問い合わせのための独自APIを備えています。現在は未公開です。",
    image: "assets/cover-portfolio.svg",
    imageAlt: "MALIKポートフォリオのプロジェクトカバー",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    installs: null
  }
];

/* ================================================================
   Bahasa situs — dwibahasa Jepang / Inggris.
   Bahasa utama saat situs pertama dibuka adalah Jepang
   ("ja"); toggle bahasa mengganti currentLang lalu seluruh
   konten dirender ulang dari data bahasa yang sesuai.
   L(ja, en) memilih string sesuai bahasa aktif, dipakai
   label-label yang dibuat dari JS (aria-label, teks live
   region carousel, dsb).
   ================================================================ */
var currentLang = "ja";

/* L(ja, en) — "Language picker": fungsi pembantu (helper)
   yang menerima dua versi teks dan mengembalikan versi
   sesuai bahasa aktif. Dipakai untuk label yang dibuat
   dari JavaScript (aria-label, teks live region, dsb).
   Contoh: L("記事", "Article") → "記事" saat bahasa Jepang. */
function L(ja, en) { return currentLang === "ja" ? ja : en; }

/* experienceData() / projectsData() — memilih array data
   sesuai bahasa aktif. Pola ini membuat fungsi render di
   bawah tidak perlu tahu bahasa apa yang sedang aktif:
   mereka cukup memanggil fungsi ini. */
function experienceData() { return currentLang === "ja" ? EXPERIENCE_JA : EXPERIENCE; }
function projectsData() { return currentLang === "ja" ? PROJECTS_JA : PROJECTS; }

/* ================================================================
   Render — vanilla JS, tanpa library
   ================================================================ */
var ARROW_SVG = '<svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';
var LINK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
var STAR_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

/* tagListHTML(tags) — mengubah array nama teknologi,
   misalnya ["React", "TypeScript"], menjadi string HTML
   berisi pill <li> di dalam <ul class="tag-list">.
   Array kosong menghasilkan string kosong (tidak ada pill).
   Dipakai bersama oleh render Experience dan Projects,
   supaya logika pill tidak ditulis dua kali (prinsip DRY:
   Don't Repeat Yourself). */
function tagListHTML(tags) {
  if (!tags.length) return "";
  return '<ul class="tag-list" aria-label="' + L("使用技術", "Technologies used") + '">' +
    tags.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>";
}

/* renderExperience() — merender array EXPERIENCE (bahasa
   aktif) menjadi kartu-kartu <li class="card"> di dalam
   <ol id="experience-list">. Alurnya: .map() mengubah tiap
   objek pekerjaan menjadi string HTML, .join("") menggabung
   semuanya, lalu hasilnya ditulis sekali ke innerHTML.
   Dipanggil saat halaman dimuat dan setiap ganti bahasa. */
function renderExperience() {
  document.getElementById("experience-list").innerHTML = experienceData().map(function (job) {
    /* Judul jadi tautan hanya bila job.url ada; bila url null
       (seperti kedua entri Experience asli ini — tidak ada situs
       perusahaan), judul tampil sebagai teks biasa. Pola yang sama
       dipakai renderProjects() untuk url null. */
    var titleHTML = job.url
      ? '<a href="' + job.url + '" target="_blank" rel="noreferrer" aria-label="' + job.ariaLabel + '">' + job.title + ARROW_SVG + "</a>"
      : job.title;
    var prev = job.prevRoles.map(function (r) {
      return '<div class="prev-roles" aria-hidden="true">' + r + "</div>";
    }).join("");
    var related = "";
    if (job.relatedLinks.length) {
      related = '<div class="related-links">' + job.relatedLinks.map(function (l) {
        return '<a href="' + l.url + '" target="_blank" rel="noreferrer" aria-label="' + l.label + L("（新しいタブで開く）", " (opens in a new tab)") + '">' + LINK_SVG + l.label + "</a>";
      }).join("") + "</div>";
    }
    return '<li class="card">' +
      '<div class="card-date">' + job.period + "</div>" +
      '<div class="card-body">' +
        '<h3 class="card-title">' + titleHTML + "</h3>" +
        prev +
        '<p class="card-desc">' + job.description + "</p>" +
        related +
        tagListHTML(job.tags) +
      "</div></li>";
  }).join("");
}

/* renderProjects() — pola yang sama seperti
   renderExperience(), tetapi untuk array PROJECTS:
   hasilnya ditulis ke <ul id="project-list">, dan tiap
   kartu dilengkapi thumbnail gambar + tautan instalasi
   (installs) bila datanya ada. Tiap kartu membawa
   id proyeknya (p.id) sebagai jangkar: klik kartu di
   carousel My Projects melompat ke kartu proyek yang
   sesuai di sini. Judul kartu adalah tautan ke website
   proyeknya (tautannya membentang ke seluruh kartu lewat
   .card-title a::before, jadi klik di mana pun pada kartu
   mengikuti tautan itu); proyek yang belum rilis memakai
   url placeholder https://www.example.com sampai domain
   aslinya tersedia. Dukungan url null (judul teks biasa
   tanpa tautan) tetap dipertahankan untuk data lama. */
function renderProjects() {
  document.getElementById("project-list").innerHTML = projectsData().map(function (p) {
    var installs = "";
    if (p.installs) {
      installs = '<a class="installs-link" href="' + p.installs.url + '" target="_blank" rel="noreferrer" aria-label="' + p.installs.ariaLabel + '">' + STAR_SVG + p.installs.label + "</a>";
    }
    var titleHTML = p.url
      ? '<a href="' + p.url + '" target="_blank" rel="noreferrer" aria-label="' + p.title + L("（新しいタブで開く）", " (opens in a new tab)") + '">' + p.title + ARROW_SVG + "</a>"
      : p.title;
    return '<li class="card" id="' + p.id + '">' +
      '<div class="card-body with-thumb">' +
        '<h3 class="card-title">' + titleHTML + "</h3>" +
        '<p class="card-desc">' + p.description + "</p>" +
        installs +
        tagListHTML(p.tags) +
      "</div>" +
      '<div class="card-thumb"><img src="' + p.image + '" alt="' + p.imageAlt + '" loading="lazy" /></div>' +
    "</li>";
  }).join("");
}

/* Render pertama saat halaman dimuat (bahasa bawaan: Jepang).
   Setelah ini, render ulang hanya terjadi saat bahasa diganti
   lewat setLanguage(). */
renderExperience();
renderProjects();

/* ================================================================
   Carousel proyek unggulan — di hero kolom kanan.
   Mekanisme sama persis seperti demo Versi 2 (state kelas):
   tiga kartu selalu ada di deck, JS hanya mengganti kelas peran
   (.is-active besar, .is-next kecil, .is-hidden menunggu) dan CSS
   transition yang menganimasikannya. Autoplay looping 2 detik.
   Kartu menampilkan 3 proyek pertama dari array PROJECTS di atas;
   setiap kartu adalah tautan ke jangkar proyeknya sendiri
   (# + p.id, yaitu id kartu proyek yang sesuai di bagian
   Projects), jadi klik = bergeser ke kartu proyek yang
   diklik, bukan sekadar ke bagian Projects secara umum.
   ================================================================ */
(function () {
  var deck = document.getElementById("pc-deck");
  var cardsBox = document.getElementById("pc-cards");
  var dotsWrap = document.getElementById("pc-dots");
  var counterNow = document.getElementById("pc-counter-now");
  var live = document.getElementById("pc-live");
  if (!deck || !cardsBox || !dotsWrap) return;

  var items = projectsData().slice(0, 3);
  var N = items.length;
  var ROLES = ["is-active", "is-next", "is-hidden"];
  var AUTOPLAY_MS = 2000;   // autoplay looping 2 detik
  var TRANS_MS = 720;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var index = 0;
  var timer = null;
  var userPaused = false;
  var exitingCard = null;
  var exitingTimer = null;
  var suppressClick = false;

  /* Bangun kartu dari data proyek */
  var cards = items.map(function (p, i) {
    var a = document.createElement("a");
    a.className = "pcard " + ROLES[i];
    a.href = "#" + p.id;
    a.setAttribute("aria-label", p.title + L(" — プロジェクトセクションのこのプロジェクトへ移動", " — jump to this project in the Projects section"));
    if (i === 2) { a.setAttribute("aria-hidden", "true"); a.tabIndex = -1; }

    var img = document.createElement("img");
    img.src = p.image;
    img.alt = p.imageAlt;
    img.draggable = false;
    if (i > 0) img.loading = "lazy";

    var cap = document.createElement("span");
    cap.className = "pcard-caption";
    var name = document.createElement("span");
    name.className = "pcard-name";
    name.textContent = p.title;
    cap.appendChild(name);

    a.appendChild(img);
    a.appendChild(cap);
    cardsBox.appendChild(a);
    return a;
  });

  /* Titik vertikal dibuat dari JS, seperti Versi 2 */
  var dots = cards.map(function (card, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", L("プロジェクト " + (i + 1) + "：" + items[i].title, "Go to project " + (i + 1) + ": " + items[i].title));
    b.addEventListener("click", function () { goTo(i); restart(); });
    dotsWrap.appendChild(b);
    return b;
  });

  /* ---------- Peran kartu ----------
     roleOf(i): 0 = aktif (besar), 1 = berikutnya (kecil), 2 = sembunyi. */
  function roleOf(i) { return ((i - index) % N + N) % N; }

  function setRole(card, role) {
    card.classList.remove("is-active", "is-next", "is-hidden", "is-exiting");
    card.classList.add(ROLES[role]);
    var hidden = role === 2;
    card.setAttribute("aria-hidden", hidden ? "true" : "false");
    card.tabIndex = hidden ? -1 : 0;
  }

  /* Kartu yang sedang keluar langsung diam di posisi sembunyi
     sebelum langkah baru dimulai (mis. saat tombol ditekan cepat). */
  function finalizeExiting() {
    if (!exitingCard) return;
    clearTimeout(exitingTimer);
    var c = exitingCard;
    exitingCard = null;
    c.classList.add("no-anim");
    setRole(c, 2);
    void c.offsetWidth;
    c.classList.remove("no-anim");
  }

  function syncMeta() {
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === index);
      d.setAttribute("aria-selected", i === index ? "true" : "false");
    });
    counterNow.textContent = ("0" + (index + 1)).slice(-2);
    if (live) live.textContent = L("プロジェクト " + (index + 1) + " / " + N + "：" + items[index].title, "Project " + (index + 1) + " of " + N + ": " + items[index].title);
  }

  /* ---------- Langkah maju / mundur (sama seperti Versi 2) ----------
     Maju: kartu aktif keluar ke kiri (.is-exiting), kartu kecil
     membesar jadi .is-active, kartu sembunyi meluncur masuk jadi
     .is-next. Setelah transisi selesai, kartu yang keluar diteleport
     ke posisi .is-hidden tanpa animasi.
     Mundur: kartu sebelumnya masuk dari kiri sambil membesar. */
  function advance(dir) {
    finalizeExiting();
    var old = index;
    index = ((index + dir) % N + N) % N;

    if (dir > 0) {
      var out = cards[old];
      cards.forEach(function (c, i) { if (c !== out) setRole(c, roleOf(i)); });
      out.classList.remove("is-active", "is-next", "is-hidden");
      out.classList.add("is-exiting");
      out.setAttribute("aria-hidden", "true");
      out.tabIndex = -1;
      exitingCard = out;
      exitingTimer = setTimeout(function () {
        if (exitingCard !== out) return;
        exitingCard = null;
        out.classList.add("no-anim");
        setRole(out, 2);
        void out.offsetWidth;
        out.classList.remove("no-anim");
      }, TRANS_MS + 60);
    } else {
      var enter = cards[index];
      enter.classList.add("no-anim");
      setRole(enter, 0);
      enter.classList.add("is-entering");
      cards.forEach(function (c, i) { if (c !== enter) setRole(c, roleOf(i)); });
      void enter.offsetWidth;
      enter.classList.remove("no-anim");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { enter.classList.remove("is-entering"); });
      });
    }
    syncMeta();
  }

  function next() { advance(1); }
  function prev() { advance(-1); }
  function goTo(i) {
    if (i === index) return;
    advance(i === (index + 1) % N ? 1 : -1);
  }

  /* ---------- Autoplay 2 detik ---------- */
  function play() {
    if (reduced || userPaused || timer !== null) return;
    timer = setInterval(next, AUTOPLAY_MS);
  }
  function pause() {
    if (timer !== null) { clearInterval(timer); timer = null; }
  }
  function restart() { pause(); play(); }

  document.getElementById("pc-next").addEventListener("click", function () { next(); restart(); });
  document.getElementById("pc-prev").addEventListener("click", function () { prev(); restart(); });

  deck.addEventListener("pointerenter", pause);
  deck.addEventListener("pointerleave", play);
  deck.addEventListener("focusin", pause);
  deck.addEventListener("focusout", play);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) pause(); else play();
  });

  /* ---------- Drag / swipe: seluruh tumpukan kartu ikut terseret ---------- */
  var dragging = false, startX = 0, dragX = 0;
  deck.addEventListener("pointerdown", function (e) {
    dragging = true; startX = e.clientX; dragX = 0;
    deck.classList.add("dragging");
    cardsBox.classList.add("no-anim");
    try { deck.setPointerCapture(e.pointerId); } catch (err) {}
    pause();
  });
  deck.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    dragX = e.clientX - startX;
    cardsBox.style.transform = "translateX(" + dragX + "px)";
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    deck.classList.remove("dragging");
    cardsBox.classList.remove("no-anim");
    cardsBox.style.transform = "";
    if (Math.abs(dragX) > 8) suppressClick = true;  // geser bukan klik
    if (Math.abs(dragX) > 55) { if (dragX < 0) next(); else prev(); }
    play();
  }
  deck.addEventListener("pointerup", endDrag);
  deck.addEventListener("pointercancel", endDrag);

  /* Klik setelah drag/swipe tidak boleh memicu navigasi */
  cardsBox.addEventListener("click", function (e) {
    if (suppressClick) { e.preventDefault(); suppressClick = false; }
  }, true);

  /* ---------- Keyboard: panah saat deck difokuskan ---------- */
  deck.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { next(); restart(); }
    else if (e.key === "ArrowLeft") { prev(); restart(); }
  });

  /* Saat bahasa diganti, kartu dibangun ulang datanya dari
     array bahasa yang aktif: judul yang tampil, alt gambar,
     dan gambar sampul mengikuti bahasa baru (judul proyek
     memang punya versi Inggris dan Jepang, mis. "Genba
     Connect" <-> "現場コネクト（Genba Connect）"), begitu
     juga aria-label kartu + titik dan teks live region.
     Diekspos ke setLanguage() lewat window.__showcaseLang. */
  function applyLang() {
    items = projectsData().slice(0, 3);
    cards.forEach(function (c, i) {
      var p = items[i];
      var img = c.querySelector("img");
      if (img) { img.src = p.image; img.alt = p.imageAlt; }
      var nm = c.querySelector(".pcard-name");
      if (nm) nm.textContent = p.title;
      c.setAttribute("aria-label", p.title + L(" — プロジェクトセクションのこのプロジェクトへ移動", " — jump to this project in the Projects section"));
    });
    dots.forEach(function (d, i) {
      d.setAttribute("aria-label", L("プロジェクト " + (i + 1) + "：" + items[i].title, "Go to project " + (i + 1) + ": " + items[i].title));
    });
    syncMeta();
  }
  window.__showcaseLang = applyLang;

  syncMeta();
  play();
})();

/* ================================================================
   Spotlight mengikuti kursor (hanya pointer presisi)
   ================================================================ */
(function () {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  var raf = null;
  document.addEventListener("mousemove", function (e) {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      document.documentElement.style.setProperty("--spot-x", e.clientX + "px");
      document.documentElement.style.setProperty("--spot-y", e.clientY + "px");
      raf = null;
    });
  });
})();

/* ================================================================
   Liquid Glass — kilau kaca mengikuti kursor di dalam kartu.
   Posisi kursor relatif terhadap kartu disimpan ke variabel CSS
   --mx / --my yang dipakai gradasi pada .card::before, jadi
   pantulan cahayanya bergerak mengikuti gerakan mouse.
   ================================================================ */
(function () {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  var raf = null;
  var lastEvent = null;
  document.addEventListener("pointermove", function (e) {
    lastEvent = e;
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = null;
      var t = lastEvent.target;
      /* Panel isi Zenn Article (.featured-panel) ikut menerima
         kilau Liquid Glass yang sama seperti kartu. */
      var card = t && t.closest ? t.closest(".card, .featured-panel") : null;
      if (card) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (lastEvent.clientX - r.left) + "px");
        card.style.setProperty("--my", (lastEvent.clientY - r.top) + "px");
      }
    });
  });
})();

/* ================================================================
   Scrollspy — menu aktif mengikuti posisi scroll.
   Dulu memakai IntersectionObserver dengan pita rootMargin
   sempit (-40%/-55%): pada beberapa ukuran layar, section yang
   dituju dari klik nav tidak pernah melintasi pita itu, jadi
   status aktif tertinggal di section sebelumnya (mis. tetap
   About padahal konten sudah di Experience). Sekarang status
   aktif dihitung langsung dari posisi scroll — section aktif
   adalah section terakhir yang tepi atasnya sudah melewati
   garis 40% tinggi viewport — dan klik pada tautan nav juga
   langsung mengaktifkan tautan yang diklik.
   ================================================================ */
(function () {
  var links = {};
  document.querySelectorAll(".nav-link").forEach(function (a) {
    links[a.getAttribute("data-nav")] = a;
  });
  var ids = ["about", "experience", "projects"];
  var sections = ids.map(function (id) {
    return document.getElementById(id);
  }).filter(function (el) { return !!el; });
  if (!sections.length) return;

  function setActive(id) {
    Object.keys(links).forEach(function (k) {
      links[k].classList.toggle("active", k === id);
    });
  }

  /* Klik nav: aktifkan tautan yang diklik saat itu juga,
     tanpa menunggu animasi smooth-scroll selesai.
     Khusus Home: tujuannya adalah posisi paling atas halaman
     (jangkar #home pada .layout). Klik ditangani eksplisit di
     sini — default-nya dicegah lalu halaman di-scroll halus
     ke atas — supaya tombol Home selalu berfungsi, termasuk
     di desktop di mana sebelumnya tautan "#" tidak membawa
     pengunjung ke mana-mana. */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  Object.keys(links).forEach(function (id) {
    links[id].addEventListener("click", function (e) {
      setActive(id);
      if (id === "home") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", "#home");
        }
      }
    });
  });

  var ticking = false;
  function updateSpy() {
    ticking = false;
    var line = window.innerHeight * 0.4;
    /* Default-nya Home: selama belum ada section yang tepi
       atasnya melewati garis 40% viewport, berarti pengunjung
       masih di bagian hero — jadi Home yang aktif, di semua
       ukuran layar (desktop/tablet maupun mobile). Begitu
       About/Experience/Projects melewati garis itu, status
       aktif berpindah ke section tersebut. */
    var current = links.home ? "home" : sections[0].id;
    sections.forEach(function (sec) {
      if (sec.getBoundingClientRect().top <= line) current = sec.id;
    });
    setActive(current);
  }
  function onScrollOrResize() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateSpy);
    }
  }
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
  updateSpy();
})();

/* ================================================================
   Carousel artikel Zenn — di kiri paling bawah kolom kiri
   (desktop). Tampilannya mengikuti gaya kartu halaman ini:
   judul bergaya kartu dan pill kategori (tanpa tanggal).
   Logika autoplay/crossfade sama seperti sebelumnya. Ganti isi
   ARTIKEL ini untuk artikel asli.
   ================================================================ */
var ARTIKEL = [
  {
    judul: "Getting Started with Modern JavaScript: From Variables to Async/Await",
    kategori: "JavaScript, Tutorial, Web Development",
    tautan: "#"
  },
  {
    judul: "Building Interactive UIs with React Hooks",
    kategori: "React, Frontend, Hooks",
    tautan: "#"
  },
  {
    judul: "Type-Safe Data Fetching with TanStack Query",
    kategori: "TanStack, React, Data Fetching",
    tautan: "#"
  }
];

/* Versi bahasa Jepang dari ARTIKEL di atas (judul + kategori
   placeholder yang sama, diterjemahkan). */
var ARTIKEL_JA = [
  {
    judul: "モダンJavaScript入門：変数からAsync/Awaitまで",
    kategori: "JavaScript, チュートリアル, Web開発",
    tautan: "#"
  },
  {
    judul: "React Hooksで作るインタラクティブなUI",
    kategori: "React, フロントエンド, Hooks",
    tautan: "#"
  },
  {
    judul: "TanStack Queryによる型安全なデータ取得",
    kategori: "TanStack, React, データ取得",
    tautan: "#"
  }
];

/* artikelData() — pemilih data artikel sesuai bahasa
   aktif; pola yang sama seperti experienceData() di atas. */
function artikelData() { return currentLang === "ja" ? ARTIKEL_JA : ARTIKEL; }

(function () {
  var featured = document.getElementById("featured");
  var slidesBox = document.getElementById("slides");
  var dotsBox = document.getElementById("dots");
  var liveInfo = document.getElementById("liveInfo");
  if (!featured || !slidesBox || !dotsBox) return;

  var AUTOPLAY_MS = 3400;   // ritme video: ±3,4 detik per artikel
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var N = 0;
  var data = [];
  var slides = [];
  var dots = [];
  var index = 0;
  var timer = null;
  var userPaused = false;

  /* Bangun slide + titik dari data bahasa aktif. Dipanggil
     saat pertama dimuat dan setiap kali bahasa diganti
     (lewat window.__artikelRebuild), karena judul dan
     kategori artikel berbeda di tiap bahasa. */
  function build() {
    data = artikelData();
    N = data.length;
    if (index >= N) index = 0;
    slidesBox.innerHTML = "";
    dotsBox.innerHTML = "";
    slides = data.map(function (a, i) {
    var art = document.createElement("article");
    art.className = "slide" + (i === 0 ? " is-active" : "");
    art.setAttribute("aria-hidden", i === 0 ? "false" : "true");
    art.setAttribute("aria-label", L("記事 " + (i + 1) + " / " + N, "Article " + (i + 1) + " of " + N));

    /* Urutan & gaya mengikuti gaya kartu halaman ini: judul
       (gaya .card-title + panah) → kategori sebagai pill
       .tag-list */
    var h = document.createElement("h2");
    h.className = "judul";
    var link = document.createElement("a");
    link.href = a.tautan;
    link.textContent = a.judul;
    link.insertAdjacentHTML("beforeend", ARROW_SVG);
    h.appendChild(link);

    var kat = document.createElement("ul");
    kat.className = "tag-list";
    kat.setAttribute("aria-label", L("記事のカテゴリ", "Article categories"));
    a.kategori.split(",").forEach(function (k) {
      var li = document.createElement("li");
      li.textContent = k.trim();
      kat.appendChild(li);
    });

    art.appendChild(h);
    art.appendChild(kat);
    slidesBox.appendChild(art);
    return art;
    });
    dots = data.map(function (a, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", L("記事 " + (i + 1) + "：" + a.judul + " を表示", "Go to article " + (i + 1) + ": " + a.judul));
    b.addEventListener("click", function () { goTo(i); restart(); });
    dotsBox.appendChild(b);
    return b;
    });
    show(index);
  }
  window.__artikelRebuild = build;

  /* Pergantian: crossfade tumpang-tindih — slide lama dan baru
     sama-sama di-transition opacity .7s, jadi keduanya sempat
     terlihat bersamaan, persis video referensinya. */
  function show(i) {
    slides.forEach(function (s, k) {
      var on = k === i;
      s.classList.toggle("is-active", on);
      s.setAttribute("aria-hidden", on ? "false" : "true");
    });
    dots.forEach(function (d, k) {
      d.classList.toggle("active", k === i);
      d.setAttribute("aria-selected", k === i ? "true" : "false");
    });
    index = i;
    if (liveInfo) {
      liveInfo.textContent = L("記事 " + (i + 1) + " / " + N + "：" + data[i].judul, "Article " + (i + 1) + " of " + N + ": " + data[i].judul);
    }
  }
  function next() { show((index + 1) % N); }
  function prev() { show((index - 1 + N) % N); }
  function goTo(i) { if (i !== index) show(i); }

  /* Autoplay */
  function play() {
    if (reduced || userPaused || timer !== null) return;
    timer = setInterval(next, AUTOPLAY_MS);
  }
  function pause() {
    if (timer !== null) { clearInterval(timer); timer = null; }
  }
  function restart() { pause(); play(); }

  featured.addEventListener("pointerenter", pause);
  featured.addEventListener("pointerleave", play);
  featured.addEventListener("focusin", pause);
  featured.addEventListener("focusout", play);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) pause(); else play();
  });

  /* Geser / swipe di area carousel */
  var startX = null;
  featured.addEventListener("pointerdown", function (e) { startX = e.clientX; });
  featured.addEventListener("pointerup", function (e) {
    if (startX === null) return;
    var dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 48) { if (dx < 0) next(); else prev(); restart(); }
  });

  /* Keyboard: hanya saat carousel sedang terlihat di layar */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var r = featured.getBoundingClientRect();
    if (r.width === 0 || r.bottom <= 0 || r.top >= window.innerHeight) return;
    if (e.key === "ArrowRight") next(); else prev();
    restart();
  });

  build();
  play();
})();

/* ================================================================
   Toggle burger — menu navigasi versi mobile.
   Tombol hanya tampil di bawah 1024px (CSS); klik membuka /
   menutup panel menu, ikon berubah jadi silang lewat
   aria-expanded. Menu tertutup otomatis saat tautan diklik,
   tombol Escape ditekan, atau layar melebar ke ukuran desktop.
   ================================================================ */
(function () {
  var btn = document.getElementById("burger-btn");
  var nav = document.getElementById("main-nav");
  if (!btn || !nav) return;
  function setOpen(open) {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? L("ナビゲーションメニューを閉じる", "Close navigation menu") : L("ナビゲーションメニューを開く", "Open navigation menu"));
    /* Menu yang terbuka membuat tombol + panel langsung
       mengambang, juga di bagian HOME (posisi paling atas);
       updateFloat menilai ulang kelas .floating-nya. Tidak
       ada ruang kosong yang disisakan di tempat asal panel:
       begitu panel melayang (position: fixed, keluar dari
       alur halaman), konten di bawahnya langsung naik mengisi
       tempatnya, jadi di bagian Home tidak ada lagi space
       kosong bekas navbar. */
    updateFloat();
  }
  btn.addEventListener("click", function () {
    setOpen(!nav.classList.contains("open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setOpen(false);
      btn.focus();
    }
  });
  var desktopMq = window.matchMedia("(min-width: 1024px)");
  function onBreakpoint(e) { if (e.matches) setOpen(false); }
  if (desktopMq.addEventListener) desktopMq.addEventListener("change", onBreakpoint);
  else if (desktopMq.addListener) desktopMq.addListener(onBreakpoint);

  /* ---------- Tombol + panel mengambang (mobile) ----------
     Kelas .floating dipasang dalam dua keadaan: posisi scroll
     sudah melewati tombol di header, ATAU menu sedang terbuka
     — keadaan kedua membuat tombol + panel ikut mengambang
     juga di bagian HOME / paling atas halaman begitu burger
     diklik. Saat mengambang, tombol menjadi fixed di pojok
     kanan atas layar dan panel menu yang terbuka ikut fixed
     di bawahnya, keduanya berlatar Liquid Glass (gaya
     visualnya di CSS, blok max-width 1023.98px). Dengan
     begitu menu tetap bisa dibuka dari posisi scroll mana
     pun — termasuk untuk kembali ke atas lewat menu Home.
     Ambang batas scroll-nya diukur dari posisi asli tombol
     di header, dan hanya berlaku di bawah 1024px. */
  var floatMq = window.matchMedia("(max-width: 1023.98px)");
  var floatThreshold = 100;
  function measureFloat() {
    if (!btn.classList.contains("floating")) {
      floatThreshold = btn.offsetTop + btn.offsetHeight + 8;
    }
  }
  var floatTicking = false;
  function updateFloat() {
    floatTicking = false;
    var on = floatMq.matches && (window.scrollY > floatThreshold || nav.classList.contains("open"));
    btn.classList.toggle("floating", on);
    nav.classList.toggle("floating", on);
  }
  function onFloatScroll() {
    if (!floatTicking) {
      floatTicking = true;
      requestAnimationFrame(updateFloat);
    }
  }
  window.addEventListener("scroll", onFloatScroll, { passive: true });
  window.addEventListener("resize", function () { measureFloat(); updateFloat(); });
  measureFloat();
  updateFloat();
})();

/* ================================================================
   Toggle bahasa — kamus teks statis (elemen ber-atribut
   data-i18n untuk teks, data-i18n-aria untuk aria-label)
   dan fungsi setLanguage(). Konten dinamis (kartu Experience
   / Projects dan kedua carousel) dirender ulang dari data
   bahasa aktif lewat experienceData() / projectsData() /
   artikelData() dan hook __artikelRebuild / __showcaseLang.
   Label tombol selalu nama bahasa TUJUAN: tampilan Jepang →
   "English", tampilan Inggris → "日本語".
   ================================================================ */
/* STR — kamus teks statis dua bahasa. Kunci (key) di objek
   "ja" dan "en" harus selalu sama; yang berbeda hanya
   nilainya. Di HTML, elemen menunjuk kunci ini lewat
   atribut data-i18n="namaKunci". */
var STR = {
  ja: {
    docTitle: "MALIK — Webエンジニア",
    docDesc: "MALIKはWebエンジニアです。ユーザーが触れるインターフェースから、その裏側のシステムまで、Web体験をエンドツーエンドで構築します。バニラHTML、CSS、JavaScriptで再構築したポートフォリオ。",
    skip: "コンテンツへスキップ",
    role: "Webエンジニア",
    tagline: "ユーザーが触れるインターフェースから、その裏側のシステムまで、Web体験をエンドツーエンドで構築します。",
    navHome: "ホーム",
    navAbout: "自己紹介",
    navExperience: "職務経歴",
    navProjects: "プロジェクト",
    navLabel: "ページ内リンク",
    zennLabel: "Zennの記事",
    articlesRegion: "Zennの最新記事3件",
    chooseArticle: "記事を選択",
    showcaseLabel: "主なプロジェクト",
    deckLabel: "主なプロジェクトのカルーセル。カードをクリックすると、そのプロジェクトのカードへ移動します。左右の矢印キーでも操作できます。",
    chooseProject: "プロジェクトを選択",
    prevProject: "前のプロジェクト",
    nextProject: "次のプロジェクト",
    techStack: "使用技術",
    aboutLabel: "自己紹介",
    aboutTitle: "自己紹介",
    aboutP1: "接客業からWebエンジニアリングへキャリアチェンジしました。現場でお客様と直接向き合う中で、人が本当に必要としているものを理解する力を身につけました。その経験が、今の私のプロダクトづくりの土台になっています。",
    aboutP2: "フロントエンドからバックエンドまで、画面の向こうにいる人の気持ちを想像しながら設計・実装しています。ユーザーの視点を決して見失わないWebエンジニアであり続けたいと思っています。",
    experienceLabel: "職務経歴",
    experienceTitle: "職務経歴",
    projectsLabel: "プロジェクト",
    projectsTitle: "プロジェクト",
    resume: "履歴書を見る",
    archive: "プロジェクトアーカイブを見る",
    footer: "© 2026 Malik. スキルを磨き、プロジェクトを届ける。",
    socialLabel: "SNSと連絡先",
    burgerOpen: "ナビゲーションメニューを開く",
    burgerClose: "ナビゲーションメニューを閉じる"
  },
  en: {
    docTitle: "MALIK — Web Engineer",
    docDesc: "MALIK is a web engineer who builds end-to-end web experiences — from the interface people touch to the systems behind it. Portfolio rebuilt with 100% vanilla HTML, CSS, and JavaScript.",
    skip: "Skip to content",
    role: "Web Engineer",
    tagline: "I build end-to-end web experiences — from the interface people touch to the systems behind it.",
    navHome: "Home",
    navAbout: "About",
    navExperience: "Experience",
    navProjects: "Projects",
    navLabel: "In-page jump links",
    zennLabel: "Zenn Article",
    articlesRegion: "3 latest articles on Zenn",
    chooseArticle: "Choose article",
    showcaseLabel: "My Projects",
    deckLabel: "Featured projects carousel. Click a card to jump to that project in the Projects section, or use the left and right arrow keys.",
    chooseProject: "Choose project",
    prevProject: "Previous project",
    nextProject: "Next project",
    techStack: "Tech stack",
    aboutLabel: "About me",
    aboutTitle: "About",
    aboutP1: "I made a career change from hospitality to web engineering. Working face to face with customers on the front line, I developed the ability to understand what people truly need. That experience is now the foundation of how I build products.",
    aboutP2: "I design and implement everything from the frontend to the backend, always imagining the feelings of the person on the other side of the screen. I want to remain a web engineer who never loses sight of the user's perspective.",
    experienceLabel: "Work experience",
    experienceTitle: "Experience",
    projectsLabel: "Selected projects",
    projectsTitle: "Projects",
    resume: "View Full Résumé",
    archive: "View Full Project Archive",
    footer: "© 2026 Malik. Building skills, shipping projects.",
    socialLabel: "Social media and contact",
    burgerOpen: "Open navigation menu",
    burgerClose: "Close navigation menu"
  }
};

/* setLanguage(lang) — satu-satunya pintu masuk pergantian
   bahasa. Langkahnya:
     1. Validasi: hanya "ja" atau "en" yang diterima.
     2. Simpan ke currentLang + perbarui atribut lang,
        judul tab, dan meta description dokumen.
     3. Ganti semua teks statis: elemen ber-atribut
        data-i18n (teks) dan data-i18n-aria (aria-label)
        diisi dari kamus STR[lang].
     4. Perbarui label kedua tombol toggle menjadi nama
        bahasa TUJUAN (Jepang aktif → tombol "English").
     5. Render ulang konten dinamis (kartu + dua carousel)
        dari data bahasa yang baru. */
function setLanguage(lang) {
  if (lang !== "ja" && lang !== "en") return;
  currentLang = lang;
  var S = STR[lang];
  document.documentElement.setAttribute("lang", lang);
  document.title = S.docTitle;
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", S.docDesc);
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var k = el.getAttribute("data-i18n");
    if (S[k] != null) el.textContent = S[k];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
    var k = el.getAttribute("data-i18n-aria");
    if (S[k] != null) el.setAttribute("aria-label", S[k]);
  });
  /* Kedua tombol toggle (fixed desktop + di dalam panel
     mobile) menampilkan nama bahasa tujuan yang sama. */
  var targetName = lang === "ja" ? "English" : "日本語";
  document.querySelectorAll(".lang-toggle").forEach(function (b) {
    var t = b.querySelector(".lang-toggle-text");
    if (t) t.textContent = targetName;
    b.setAttribute("aria-label", lang === "ja" ? "Switch to English" : "日本語に切り替える");
  });
  renderExperience();
  renderProjects();
  if (window.__artikelRebuild) window.__artikelRebuild();
  if (window.__showcaseLang) window.__showcaseLang();
  var bb = document.getElementById("burger-btn");
  if (bb) bb.setAttribute("aria-label", bb.getAttribute("aria-expanded") === "true" ? S.burgerClose : S.burgerOpen);
}

/* Penghubung tombol toggle bahasa: setiap klik pada tombol
   .lang-toggle menukar bahasa aktif (ja <-> en) lewat
   setLanguage(). Blok ini sengaja diletakkan paling akhir —
   semua fungsi dan blok di atas harus terdaftar lebih dulu. */
document.querySelectorAll(".lang-toggle").forEach(function (b) {
  b.addEventListener("click", function () {
    setLanguage(currentLang === "ja" ? "en" : "ja");
  });
});
