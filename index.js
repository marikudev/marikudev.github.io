document.addEventListener('DOMContentLoaded', () => {

  // --- State Management ---
  let currentLang = 'ja';
  let activeServiceId = 'frontend';
  let currentProjectIndex = 0;
  let projectInterval;
  let typeTimeout;
  let rotationTimeout;

  // --- Translations ---
  const TRANSLATIONS = {
    en: {
      "nav.home": "Home",
      "nav.projects": "Projects",
      "nav.about": "About",
      "nav.contact": "Contact",
      "hero.span1": "modern web user",
      "hero.span2": "seamless digital experience",
      "services.frontend.title": "Frontend Mastery",
      "services.uiux.title": "UI/UX Design",
      "services.fullstack.title": "Full-Stack Solutions",
      "projects.featured": "Featured Projects",
      "about.title": "About Me",
      "about.description": "A fresh take on digital craftsmanship, I build robust and beautiful web applications just in time for your next big idea. Available for new projects.",
      "about.readMore": "Read More",
      // Dynamic Content
      "subheadlineRotation": ["Frontend Developer", "MERN Stack Developer", "Freelancer"],
      "service.frontend.headline": "Mohamad Malik",
      "service.frontend.description": "Introducing a collection of dynamic, responsive, and intuitive user interfaces, designed specifically for the <span class='text-gray-300 border-b border-gray-500/50 pb-0.5' data-lang='hero.span1'>modern web user</span> and a <span class='text-gray-300 border-b border-gray-500/50 pb-0.5' data-lang='hero.span2'>seamless digital experience</span>.",
      "service.uiux.headline": "Designing Experiences",
      "service.uiux.subheadline": "User-Centric Interfaces",
      "service.uiux.description": "A deep dive into user-centric design principles, creating wireframes, prototypes, and final designs that are both beautiful and highly functional.",
      "service.fullstack.headline": "Building Solutions",
      "service.fullstack.subheadline": "End-to-End Development",
      "service.fullstack.description": "From server-side logic and API development to database management, crafting robust and scalable full-stack applications that bring ideas to life.",
      "project.nebula.title": "Launch of Project Nebula",
      "project.nebula.tech": "React, Node.js, GraphQL",
      "project.fintech.title": "UI/UX Overhaul for FinTech App",
      "project.fintech.tech": "Figma, Next.js, Vercel",
      "project.ecommerce.title": "E-commerce Platform Architecture",
      "project.ecommerce.tech": "TypeScript, Kubernetes, AWS",
    },
    ja: {
      "nav.home": "ホーム",
      "nav.projects": "プロジェクト",
      "nav.about": "概要",
      "nav.contact": "お問い合わせ",
      "hero.span1": "現代のウェブユーザー",
      "hero.span2": "シームレスなデジタル体験",
      "services.frontend.title": "フロントエンドの習得",
      "services.uiux.title": "UI/UXデザイン",
      "services.fullstack.title": "フルスタックソリューション",
      "projects.featured": "注目のプロジェクト",
      "about.title": "私について",
      "about.description": "デジタルの職人技に新たな視点を取り入れ、あなたの次の大きなアイデアに間に合うように、堅牢で美しいウェブアプリケーションを構築します。新しいプロジェクトに対応可能です。",
      "about.readMore": "もっと読む",
      // Dynamic Content
      "subheadlineRotation": ["フロントエンド開発者", "MERNスタック開発者", "フリーランサー"],
      "service.frontend.headline": "モハマド・マリク",
      "service.frontend.description": "<span class='text-gray-300 border-b border-gray-500/50 pb-0.5' data-lang='hero.span1'>現代のウェブユーザー</span>と<span class='text-gray-300 border-b border-gray-500/50 pb-0.5' data-lang='hero.span2'>シームレスなデジタル体験</span>のために特別に設計された、ダイナミックでレスポンシブ、直感的なユーザーインターフェースのコレクションを紹介します。",
      "service.uiux.headline": "体験をデザインする",
      "service.uiux.subheadline": "ユーザー中心のインターフェース",
      "service.uiux.description": "ユーザー中心のデザイン原則を深く掘り下げ、美しく機能的なワイヤーフレーム、プロトタイプ、最終デザインを作成します。",
      "service.fullstack.headline": "ソリューションを構築する",
      "service.fullstack.subheadline": "エンドツーエンド開発",
      "service.fullstack.description": "サーバーサイドのロジックやAPI開発からデータベース管理まで、アイデアを実現する堅牢でスケーラブルなフルスタックアプリケーションを構築します。",
      "project.nebula.title": "プロジェクト・ネビュラのローンチ",
      "project.nebula.tech": "React, Node.js, GraphQL",
      "project.fintech.title": "フィンテックアプリのUI/UX全面改修",
      "project.fintech.tech": "Figma, Next.js, Vercel",
      "project.ecommerce.title": "Eコマースプラットフォームのアーキテクチャ",
      "project.ecommerce.tech": "TypeScript, Kubernetes, AWS",
    }
  };

  // --- Data Models ---
  const PROJECTS_DATA = [
    { titleKey: 'project.nebula.title', techKey: 'project.nebula.tech', period: 'Q4 2024' },
    { titleKey: 'project.fintech.title', techKey: 'project.fintech.tech', period: 'Q1 2025' },
    { titleKey: 'project.ecommerce.title', techKey: 'project.ecommerce.tech', period: 'Q2 2025' },
  ];

  const SERVICES_CONTENT = {
    frontend: { number: '01', titleKey: 'services.frontend.title', headlineKey: 'service.frontend.headline', subheadlineKey: null, descriptionKey: 'service.frontend.description' },
    uiux: { number: '02', titleKey: 'services.uiux.title', headlineKey: 'service.uiux.headline', subheadlineKey: 'service.uiux.subheadline', descriptionKey: 'service.uiux.description' },
    fullstack: { number: '03', titleKey: 'services.fullstack.title', headlineKey: 'service.fullstack.headline', subheadlineKey: 'service.fullstack.subheadline', descriptionKey: 'service.fullstack.description' }
  };

  // --- Element References ---
  const navLinksContainer = document.getElementById('nav-links');
  const projectTitleEl = document.getElementById('project-title');
  const projectTechEl = document.getElementById('project-tech');
  const projectPeriodEl = document.getElementById('project-period');
  const dotsContainer = document.getElementById('project-dots');
  const servicesList = document.getElementById('services-list');
  const heroHeadline = document.getElementById('hero-headline');
  const heroSubheadline = document.getElementById('hero-subheadline');
  const heroDescription = document.getElementById('hero-description');
  const langSwitcher = document.getElementById('lang-switcher');

  // --- Typewriter Effect Logic ---
  function clearTypewriterTimeouts() {
    clearTimeout(typeTimeout);
    clearTimeout(rotationTimeout);
  }

  function typewriterEffect(element, text, speed = 50, onComplete) {
    let i = 0;
    element.innerHTML = "";
    element.classList.add('typing');
    clearTypewriterTimeouts();

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        typeTimeout = setTimeout(type, speed);
      } else {
        if (onComplete) {
          onComplete();
        } else {
          setTimeout(() => element.classList.remove('typing'), 2000);
        }
      }
    }
    type();
  }

  function startRotatingText(element, texts, pause = 2000) {
    let currentIndex = 0;
    function cycle() {
      const textToType = texts[currentIndex];
      typewriterEffect(element, textToType, 50, () => {
        rotationTimeout = setTimeout(cycle, pause);
      });
      currentIndex = (currentIndex + 1) % texts.length;
    }
    cycle();
  }
  
  // --- Language Switcher Logic ---
  const setLanguage = (lang) => {
    if (lang !== 'en' && lang !== 'ja') return;
    currentLang = lang;

    // Update static text
    document.querySelectorAll('[data-lang]').forEach(el => {
      const key = el.getAttribute('data-lang');
      if (TRANSLATIONS[currentLang][key]) {
        el.innerHTML = TRANSLATIONS[currentLang][key];
      }
    });

    // Update lang switcher UI
    langSwitcher.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.langBtn === currentLang) {
            btn.classList.remove('opacity-50');
            btn.classList.add('opacity-100');
        } else {
            btn.classList.remove('opacity-100');
            btn.classList.add('opacity-50');
        }
    });

    // Re-render dynamic content with new language
    updateView(activeServiceId, true);
    updateProject(currentProjectIndex, true);
  };
  
  if (langSwitcher) {
    langSwitcher.addEventListener('click', (e) => {
      const target = e.target.closest('.lang-btn');
      if (target && target.dataset.langBtn) {
        setLanguage(target.dataset.langBtn);
      }
    });
  }

  // --- Navigation Logic ---
  if (navLinksContainer) {
    navLinksContainer.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target.closest('.nav-link');
      if (!target) return;
      navLinksContainer.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      target.classList.add('active');
    });
  }

  // --- Featured Projects Carousel Logic ---
  const updateProject = (index, isLangChange = false) => {
    currentProjectIndex = index;
    const project = PROJECTS_DATA[index];
    if (!project) return;
    
    const title = TRANSLATIONS[currentLang][project.titleKey] || '';
    const tech = TRANSLATIONS[currentLang][project.techKey] || '';

    if (!isLangChange) {
      projectTitleEl.style.opacity = '0';
      projectTechEl.style.opacity = '0';
      projectPeriodEl.style.opacity = '0';
    }

    setTimeout(() => {
        projectTitleEl.textContent = title;
        projectTechEl.textContent = tech;
        projectPeriodEl.textContent = project.period;
        if (!isLangChange) {
            projectTitleEl.style.opacity = '1';
            projectTechEl.style.opacity = '1';
            projectPeriodEl.style.opacity = '1';
        }
    }, isLangChange ? 0 : 300);

    dotsContainer.querySelectorAll('button').forEach((dot, dotIndex) => {
      dot.classList.toggle('bg-yellow-400', dotIndex === index);
      dot.classList.toggle('bg-gray-600', dotIndex !== index);
      dot.classList.toggle('hover:bg-gray-500', dotIndex !== index);
    });
  };

  const startProjectInterval = () => {
    clearInterval(projectInterval);
    projectInterval = setInterval(() => {
      const newIndex = (currentProjectIndex + 1) % PROJECTS_DATA.length;
      updateProject(newIndex);
    }, 5000);
  };

  if (projectTitleEl && projectTechEl && projectPeriodEl && dotsContainer) {
    if (dotsContainer.children.length === 0) {
        PROJECTS_DATA.forEach((_, index) => {
            const button = document.createElement('button');
            button.className = 'w-2.5 h-2.5 rounded-full transition-colors duration-300';
            button.setAttribute('aria-label', `Go to project ${index + 1}`);
            button.addEventListener('click', () => {
              updateProject(index);
              startProjectInterval();
            });
            dotsContainer.appendChild(button);
        });
    }
    [projectTitleEl, projectTechEl, projectPeriodEl].forEach(el => el.style.transition = 'opacity 300ms ease-in-out');
  }

  // --- Services/Hero Content Logic ---
  const updateView = (serviceId, isLangChange = false) => {
      activeServiceId = serviceId;
      const serviceData = SERVICES_CONTENT[serviceId];
      if (!serviceData) return;
      
      clearTypewriterTimeouts();

      const headline = TRANSLATIONS[currentLang][serviceData.headlineKey] || '';
      const subheadline = serviceData.subheadlineKey ? TRANSLATIONS[currentLang][serviceData.subheadlineKey] : null;
      const description = TRANSLATIONS[currentLang][serviceData.descriptionKey] || '';

      const heroElements = [heroHeadline, heroSubheadline, heroDescription];
      if (!isLangChange) {
        heroElements.forEach(el => el.style.opacity = '0');
      }

      setTimeout(() => {
          heroHeadline.innerHTML = headline;
          heroDescription.innerHTML = description;
          document.querySelectorAll('[data-lang]').forEach(el => {
              const key = el.getAttribute('data-lang');
              if (TRANSLATIONS[currentLang][key]) {
                  el.innerHTML = TRANSLATIONS[currentLang][key];
              }
          });


          if (serviceId === 'frontend') {
            const rotationTexts = TRANSLATIONS[currentLang].subheadlineRotation;
            startRotatingText(heroSubheadline, rotationTexts);
          } else if (subheadline) {
            heroSubheadline.classList.remove('hidden');
            typewriterEffect(heroSubheadline, subheadline);
          } else {
            heroSubheadline.classList.add('hidden');
            heroSubheadline.innerHTML = '';
          }
          
          if (!isLangChange) {
            heroElements.forEach(el => el.style.opacity = '1');
          }
          
      }, isLangChange ? 0 : 300);

      servicesList.querySelectorAll('.service-item').forEach(item => {
          const currentId = item.dataset.serviceId;
          const content = SERVICES_CONTENT[currentId];
          const container = item.querySelector('div:first-child');
          const indicator = item.querySelector('.indicator');
          const numberEl = item.querySelector('.number');
          const titleEl = item.querySelector('.title');
          
          titleEl.textContent = TRANSLATIONS[currentLang][content.titleKey];

          const isActive = currentId === serviceId;
          container.classList.toggle('pl-16', !isActive);
          indicator.classList.toggle('bg-yellow-400', isActive);
          numberEl.classList.toggle('hidden', !isActive);
          if(isActive) numberEl.textContent = `/${content.number}`;
          titleEl.classList.toggle('text-gray-500', !isActive);
          titleEl.classList.toggle('text-lg', !isActive);
          titleEl.classList.toggle('text-white', isActive);
          titleEl.classList.toggle('text-xl', isActive);
          titleEl.classList.toggle('font-semibold', isActive);
      });
  };

  if (servicesList && heroHeadline && heroSubheadline && heroDescription) {
      servicesList.addEventListener('click', (e) => {
          const targetService = e.target.closest('.service-item');
          if (targetService && targetService.dataset.serviceId !== activeServiceId) {
            updateView(targetService.dataset.serviceId);
          }
      });
      [heroHeadline, heroSubheadline, heroDescription].forEach(el => {
          el.style.transition = 'opacity 300ms ease-in-out';
      });
  }
  
  // --- Initial Page Load ---
  setLanguage('ja'); // Set initial language and render all content
  startProjectInterval();
});