// تحديث سنة الفوتر
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// إظهار قائمة الموبايل
const navToggle = document.getElementById("navToggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
}

// Smooth scroll للانتقالات بين الصفحات
document.documentElement.style.scrollBehavior = "smooth";

// بناء هيدر/تنقل موبايل موحّد لكل الصفحات
function buildMobileShell() {
    const existing = document.getElementById("mobileShell");
    if (existing) return;

    const pageKey = document.body.dataset.page || "";
    const navItems = [
        { key: "home", href: "index.html", icon: "fa-solid fa-house", label: "الرئيسية" },
        { key: "gallery", href: "gallery.html", icon: "fa-regular fa-image", label: "المعرض" },
        { key: "btec", href: "btec.html", icon: "fa-solid fa-graduation-cap", label: "BTEC" },
        { key: "calculator", href: "calculator.html", icon: "fa-solid fa-calculator", label: "حاسبة" },
        { key: "videos", href: "videos.html", icon: "fa-regular fa-circle-play", label: "فيديو" },
        { key: "ai", href: "ai.html", icon: "fa-solid fa-robot", label: "المساعد" }
    ];

    const shell = document.createElement("div");
    shell.id = "mobileShell";
    shell.className = "mobile-header";
    shell.innerHTML = `
        <div class="mobile-bar">
            <div class="mobile-brand" onclick="location.href='index.html'">
                <img src="assets/images/school-logo.png" alt="شعار المدرسة">
                <span>مدرستي</span>
            </div>
            <div class="mobile-actions">
                <a href="settings.html" aria-label="الإعدادات"><i class="fa-solid fa-gear"></i></a>
                <button id="themeToggleMobile" aria-label="تبديل الوضع"><i class="fa-solid fa-circle-half-stroke"></i></button>
            </div>
        </div>
        <div class="mobile-nav-icons">
            ${navItems.map(item => `
                <a href="${item.href}" aria-label="${item.label}" class="${pageKey === item.key ? "active" : ""}">
                    <i class="${item.icon}"></i>
                </a>
            `).join("")}
            <a href="settings.html" aria-label="الإعدادات" class="${pageKey === "settings" ? "active" : ""}">
                <i class="fa-solid fa-gear"></i>
            </a>
        </div>
    `;
    document.body.prepend(shell);
}


// ضبط اللغة مباشرة عند تحميل السكربت بناءً على التفضيل المخزن (قبل أي DOMContentLoaded)
(function primeDocumentLanguage() {
    try {
        const target = "ar"; // لغة افتراضية ثابتة
        document.documentElement.lang = target;
        document.documentElement.dir = target === "en" ? "ltr" : "rtl";
        document.body?.setAttribute("data-lang", target);
        localStorage.setItem("appLanguage", target);
    } catch (_) {
        // تجاهل أي أخطاء في الوصول إلى التخزين المحلي
    }
})();

// خريطة عكسية للنصوص العربية لتسهيل ربط data-i18n تلقائياً
function buildArValueMap() {
    const map = new Map();
    Object.entries(translations.ar || {}).forEach(([key, value]) => {
        const text = (value || "").trim();
        if (!text) return;
        if (!map.has(text)) {
            map.set(text, key);
        }
    });
    return map;
}

// محاولة ربط عناصر بلا data-i18n بالمفاتيح بناءً على النص العربي المطابق
function autoBindTranslationKeys() {
    if (document.body?.dataset.autoBound === "true") return;
    const arMap = buildArValueMap();
    if (!arMap.size) return;

    const candidates = Array.from(document.querySelectorAll("body *"))
        .filter(el => !el.dataset.i18n && el.childElementCount === 0);

    candidates.forEach(el => {
        const text = (el.textContent || "").trim();
        if (!text || text.length > 200) return;
        const key = arMap.get(text);
        if (key) {
            el.dataset.i18n = key;
        }
    });
    if (document.body) {
        document.body.dataset.autoBound = "true";
    }
}

const translations = {
    ar: {
        "nav.home": "الرئيسية",
        "nav.gallery": "معرض الإنجازات",
        "nav.btec": "نظام BTEC",
        "nav.calculator": "حاسبة المعدل",
        "nav.videos": "فيديوهات توعوية",
        "nav.ai": "المساعد الذكي",
        "hero.title": "أهلاً بك في <span>مدرستي</span><br> مسار مميّز مع نظام <span>BTEC Pearson</span>",
        "hero.desc": "منصة تعليمية حديثة تجمع بين التعليم المدرسي الأردني ونظام التعليم المهني البريطاني BTEC في تخصصي <strong>تكنولوجيا المعلومات</strong> و<strong>الضيافة الفندقية</strong>.",
        "hero.cta": "جرّب المساعد الذكي",
        "ach1.title": "مدرسة وادي موسى الثانوية",
        "ach1.desc": "تقع المدرسة في مدينة وادي موسى – لواء البتـراء، وتقدّم تعليماً شاملاً من الصف التاسع حتى التوجيهي، مع مسار مهني مميز ضمن نظام BTEC البريطاني.",
        "ach1.stat1": "كوادر تعليمية متمرسة في المسار المهني والأكاديمي",
        "ach1.stat2": "مشاريع عملية تعكس واقع سوق العمل",
        "ach1.stat3": "توجيه فردي للطلاب ودعم في اتخاذ القرار المهني",
        "ach2.title": "مدرسة وادي موسى الثانوية",
        "ach2.desc": "تشمل مدرسة وادي موسى الثانوية الشاملة للبنين تدريس النظام البرطاني الجديد (BTEC) أو ما يسمّى بالعربية",
        "ach2.stat1": "134 طالب في مسار BTEC",
        "ach2.stat2": "59 تخصص تكنولوجيا المعلومات",
        "ach2.stat3": "74 الضيافة الفندقية",
        "ach3.title": "حاسبة معدل النظام البرطاني (BTEC)",
        "ach3.desc": "هذه واجهة متكاملة لحساب معدل التقارير والواجبات الخاصة بالطلاب.",
        "ach3.stat1": "تقييم (P) يعادل النجاح",
        "ach3.stat2": "تقييم (M) يعادل التفوق",
        "ach3.stat3": "تقييم (D) يعادل الامتياز",
        "ach4.title": "مدرسة وادي موسى الثانوية",
        "ach4.desc": "فيديوهات توعوية عن نظام بتيك في مدرستنا وكيف يصفه طلاب التخصص.",
        "ach4.stat1": "معلومات عن تخصصات البتيك في مدرستنا",
        "ach4.stat2": "تجربة التخصص من منظور الطلاب",
        "ach4.stat3": "فيديوهات قصيرة تشرح النظام",
        "ach5.title": "مدرسة وادي موسى الثانوية",
        "ach5.desc": "تتضمن الصفحة مساعداً ذكياً يقدم معلومات عن التخصصات والأنشطة داخل المدرسة.",
        "ach5.stat1": "معلومات عن تخصصات BTEC",
        "ach5.stat2": "معلومات عن المدرسة ومعلميها",
        "ach5.stat3": "إجابات عامة عن استفسارات الطلاب",
        "social.title": "ابقَ على تواصل مع <span>مدرستك</span>",
        "social.subtitle": "تواصل مباشر مع الإدارة عبر الواتساب، وتابع آخر الأخبار والإنجازات عبر صفحة فيسبوك.",
        "social.whatsapp.title": "الواتساب الرسمي للمدرسة",
        "social.whatsapp.desc": "تواصل مع الإدارة للإستفسارات حول التسجيل، الدوام، والتخصصات المتاحة.",
        "social.whatsapp.number": "+962 7 7724 4572",
        "social.whatsapp.action": "افتح محادثة واتساب",
        "social.facebook.title": "صفحة المدرسة على فيسبوك",
        "social.facebook.desc": "شاهد أحدث الأخبار، الأنشطة، والإنجازات اليومية لطلاب المدرسة.",
        "social.facebook.handle": "@WadiMusaSecondarySchool",
        "social.facebook.action": "انتقل إلى الصفحة",
        "footer.copyright": "© <span id=\"year\"></span> مدرسة وادي موسى الثانوية الشاملة للبنين",
        "footer.dev": "تصميم وبرمجة  <strong>الطالب ثائر محمد السلامين</strong>",
        "footer.support": "دعم لوجستي <strong>الطالب عمر راجي الهلالات</strong>",
        "footer.supervisor": "بإشراف  <strong>المهندس حسن النوافلة</strong>",
        "videos.title": "🎥 مكتبة الفيديوهات التعليمية",
        "videos.subtitle": "فيديوهات تساعدك تفهم نظام BTEC من الطلاب ومعلمي الاختصاص.",
        "videos.card1.title": "🔶 فيديو تعريفي عن تخصص الضيافة",
        "videos.card1.desc": "شرح بسيط عن المسار، وين بيشتغل الطالب، ومحتوى الدروس العملية والنظرية.",
        "videos.card2.title": "💻 رأي طالب IT في نظام BTEC",
        "videos.card2.desc": "طالب IT يشرح تجربته ومشروعه وكيف ساعده النظام يطوّر مهاراته.",
        "videos.card3.title": "🚀 مشاريع طلاب BTEC",
        "videos.card3.desc": "عرض سريع لأفضل مشاريع نظام BTEC في المدرسة.",
        "settings.title": "الإعدادات",
        "settings.eyebrow": "التحكم الكامل",
        "settings.heading": "خصص تجربتك",
        "settings.lead": "غيّر اللغة والألوان، ويمكن للأدمن الدخول لإدارة المعرض.",
        "settings.admin.eyebrow": "المسؤول",
        "settings.admin.title": "صلاحيات الأدمن",
        "settings.admin.tag": "حماية المعرض",
        "settings.admin.note": "تسجيل الدخول مخصص للبريد المصرّح به لإدارة منشورات المعرض فقط.",
        "settings.admin.button": "تسجيل دخول الأدمن",
        "settings.colors.eyebrow": "الألوان",
        "settings.colors.title": "ألوان الصفحات",
        "settings.colors.tag": "متزامنة مع كل الصفحات",
        "settings.colors.note": "اختر لوحة هادئة تناسب ذوقك، وستطبق على كل الصفحات.",
        "settings.colors.classic": "أزرق مدرسي",
        "settings.colors.classicDesc": "اللون الأزرق مع برتقالي دافئ.",
        "settings.colors.oasis": "أخضر حكيم",
        "settings.colors.oasisDesc": "درجات نعناع ورمال مريحة.",
        "settings.colors.dusk": "سماء هادئة",
        "settings.colors.duskDesc": "سماوي مع وردي خفيف.",
        "settings.lang.eyebrow": "اللغة",
        "settings.lang.title": "اللغة",
        "settings.lang.tag": "ينطبق على كل الصفحات",
        "settings.lang.note": "بدّل بين العربية والإنجليزية لكل الواجهة.",
        "settings.lang.ar": "العربية",
        "settings.lang.en": "English"
    },
    en: {
        "nav.home": "Home",
        "nav.gallery": "Gallery",
        "nav.btec": "BTEC System",
        "nav.calculator": "GPA Calculator",
        "nav.videos": "Awareness Videos",
        "nav.ai": "AI Assistant",
        "hero.title": "Welcome to <span>Madrasati</span><br> A distinctive path with <span>BTEC Pearson</span>",
        "hero.desc": "A modern platform that blends Jordanian schooling with the British BTEC vocational track in <strong>Information Technology</strong> and <strong>Hospitality</strong>.",
        "hero.cta": "Try the smart assistant",
        "ach1.title": "Wadi Musa Secondary School",
        "ach1.desc": "Located in Wadi Musa – Petra district, offering education from 9th grade to Tawjihi with a standout BTEC vocational pathway.",
        "ach1.stat1": "Experienced educators in academic and vocational tracks",
        "ach1.stat2": "Hands-on projects that mirror real workplaces",
        "ach1.stat3": "Personal guidance to help students choose their path",
        "ach2.title": "Wadi Musa Secondary School",
        "ach2.desc": "The school teaches the British BTEC system for our male students.",
        "ach2.stat1": "134 students on the BTEC track",
        "ach2.stat2": "59 students in IT",
        "ach2.stat3": "74 students in Hospitality",
        "ach3.title": "BTEC GPA Calculator",
        "ach3.desc": "A complete interface to calculate coursework averages for students.",
        "ach3.stat1": "(P) grade equals Pass",
        "ach3.stat2": "(M) grade equals Merit",
        "ach3.stat3": "(D) grade equals Distinction",
        "ach4.title": "Wadi Musa Secondary School",
        "ach4.desc": "Awareness videos about BTEC from our students’ perspective.",
        "ach4.stat1": "Details about BTEC majors at our school",
        "ach4.stat2": "How students describe the experience",
        "ach4.stat3": "Extra clips and short explainers",
        "ach5.title": "Wadi Musa Secondary School",
        "ach5.desc": "A smart assistant that shares answers about majors, teachers, and school life.",
        "ach5.stat1": "Details about BTEC majors",
        "ach5.stat2": "Info about the school and teachers",
        "ach5.stat3": "General answers for students",
        "social.title": "Stay connected with your <span>school</span>",
        "social.subtitle": "Chat directly with administration on WhatsApp and follow daily updates on Facebook.",
        "social.whatsapp.title": "Official school WhatsApp",
        "social.whatsapp.desc": "Reach admin for questions on enrollment, schedules, and available majors.",
        "social.whatsapp.number": "+962 7 7724 4572",
        "social.whatsapp.action": "Open WhatsApp chat",
        "social.facebook.title": "School page on Facebook",
        "social.facebook.desc": "See the latest news, activities, and daily achievements.",
        "social.facebook.handle": "@WadiMusaSecondarySchool",
        "social.facebook.action": "Go to the page",
        "footer.copyright": "© <span id=\"year\"></span> Wadi Musa Comprehensive Secondary School for Boys",
        "footer.dev": "Designed & built by <strong>student Thaer Mohammad Al-Salamin</strong>",
        "footer.support": "Logistics support <strong>student Omar Raji Al-Helalat</strong>",
        "footer.supervisor": "Supervised by <strong>Eng. Hasan Al-Nawafleh</strong>",
        "videos.title": "🎥 Video Library",
        "videos.subtitle": "Clips that help you understand the BTEC system from students and teachers.",
        "videos.card1.title": "🔶 Intro to Hospitality",
        "videos.card1.desc": "A short overview of the track, workplaces, and course content.",
        "videos.card2.title": "💻 An IT student talks BTEC",
        "videos.card2.desc": "How one IT student used projects to grow his skills.",
        "videos.card3.title": "🚀 BTEC student projects",
        "videos.card3.desc": "A quick tour of standout BTEC projects at school.",
        "settings.title": "Settings",
        "settings.eyebrow": "Full control",
        "settings.heading": "Personalize your experience",
        "settings.lead": "Adjust language and colors; admins can sign in to manage the gallery.",
        "settings.admin.eyebrow": "Admin",
        "settings.admin.title": "Admin access",
        "settings.admin.tag": "Gallery protection",
        "settings.admin.note": "Sign-in is restricted to the authorized email for managing gallery posts only.",
        "settings.admin.button": "Admin sign-in",
        "settings.colors.eyebrow": "Colors",
        "settings.colors.title": "Color themes",
        "settings.colors.tag": "Syncs across all pages",
        "settings.colors.note": "Pick a calm palette that fits every page.",
        "settings.colors.classic": "School blue",
        "settings.colors.classicDesc": "Blue with a warm orange accent.",
        "settings.colors.oasis": "Sage oasis",
        "settings.colors.oasisDesc": "Mint and sand for a soft vibe.",
        "settings.colors.dusk": "Calm sky",
        "settings.colors.duskDesc": "Sky blue with a gentle rose tone.",
        "settings.lang.eyebrow": "Language",
        "settings.lang.title": "Language",
        "settings.lang.tag": "Applies to all pages",
        "settings.lang.note": "Switch the full interface between Arabic and English.",
        "settings.lang.ar": "Arabic",
        "settings.lang.en": "English"
    }
};

const colorSchemes = {
    classic: {
        vars: {
            "--accent-primary": "#2563eb",
            "--accent-secondary": "#f97316",
            "--accent-soft": "rgba(37, 99, 235, 0.12)",
            "--bg-gradient-from": "#f7f9ff",
            "--bg-gradient-to": "#eef2ff",
            "--hero-overlay": "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
            "--surface-muted": "#f8fafc",
            "--surface-card": "#ffffff"
        }
    },
    oasis: {
        vars: {
            "--accent-primary": "#2a9d8f",
            "--accent-secondary": "#e9c46a",
            "--accent-soft": "rgba(42, 157, 143, 0.14)",
            "--bg-gradient-from": "#f1f8f5",
            "--bg-gradient-to": "#e9f1ec",
            "--hero-overlay": "linear-gradient(to bottom, rgba(13,94,84,0.55), rgba(6,45,38,0.8))",
            "--surface-muted": "#f4faf6",
            "--surface-card": "#ffffff"
        }
    },
    dusk: {
        vars: {
            "--accent-primary": "#0ea5e9",
            "--accent-secondary": "#fb7185",
            "--accent-soft": "rgba(14,165,233,0.16)",
            "--bg-gradient-from": "#f4f7ff",
            "--bg-gradient-to": "#e9f3ff",
            "--hero-overlay": "linear-gradient(to bottom, rgba(8,47,73,0.6), rgba(4,24,44,0.85))",
            "--surface-muted": "#f6f9ff",
            "--surface-card": "#ffffff"
        }
    }
};

function applyColorScheme(schemeKey) {
    const scheme = colorSchemes[schemeKey] || colorSchemes.classic;
    Object.entries(scheme.vars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
    const accentPrimary = scheme.vars["--accent-primary"];
    const accentSecondary = scheme.vars["--accent-secondary"];
    if (accentPrimary) {
        document.documentElement.style.setProperty("--accent-blue", accentPrimary);
        document.documentElement.style.setProperty("--accent-blue-strong", accentPrimary);
    }
    if (accentSecondary) {
        document.documentElement.style.setProperty("--accent-orange", accentSecondary);
        document.documentElement.style.setProperty("--accent-orange-strong", accentSecondary);
    }
    localStorage.setItem("colorSchemePreference", schemeKey);
    document.querySelectorAll("[data-color-scheme]").forEach(card => {
        card.classList.toggle("active", card.dataset.colorScheme === schemeKey);
    });
}

function applyLanguage(lang) {
    const targetLang = "ar"; // إجبار الواجهة على العربية
    document.documentElement.lang = targetLang;
    document.documentElement.dir = targetLang === "en" ? "ltr" : "rtl";
    document.body.setAttribute("data-lang", targetLang);
    localStorage.setItem("appLanguage", targetLang);
    clearGoogleTranslateArtifacts();

    document.querySelectorAll("[data-i18n], [data-i18n-placeholder], [data-i18n-label], [data-i18n-title]").forEach(el => {
        const key = el.dataset.i18n;
        const placeholderKey = el.dataset.i18nPlaceholder;
        if (key && translations[targetLang]?.[key]) {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.value = "";
                el.placeholder = translations[targetLang][key];
            } else {
                el.innerHTML = translations[targetLang][key];
            }
        }
        if (placeholderKey && translations[targetLang]?.[placeholderKey]) {
            el.placeholder = translations[targetLang][placeholderKey];
        }
        if (el.dataset.i18nLabel && translations[targetLang]?.[el.dataset.i18nLabel]) {
            el.setAttribute("aria-label", translations[targetLang][el.dataset.i18nLabel]);
        }
        if (el.dataset.i18nTitle && translations[targetLang]?.[el.dataset.i18nTitle]) {
            el.setAttribute("title", translations[targetLang][el.dataset.i18nTitle]);
        }
    });

    document.querySelectorAll(".language-switch button").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === targetLang);
    });
}

// تنظيف أي آثار لترجمة جوجل السابقة (كوكيز / عناصر DOM)
function clearGoogleTranslateArtifacts() {
    const domain = window.location.hostname;
    const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
    document.cookie = `googtrans=;${expire}`;
    if (domain && domain !== "localhost") {
        document.cookie = `googtrans=;${expire}domain=${domain};`;
    }
    const googleNodes = document.querySelectorAll(".goog-te-banner-frame, .goog-te-gadget, .skiptranslate, #google_translate_element, script[src*='translate_a/element']");
    googleNodes.forEach(el => el.remove());
}

function initSettingsPage() {
    if (document.body.dataset.page !== "settings") return;

    const paletteCards = document.querySelectorAll("[data-color-scheme]");

    paletteCards.forEach(card => {
        card.addEventListener("click", () => applyColorScheme(card.dataset.colorScheme));
    });
}

// وظائف عامة تُطبّق على كل الصفحات: تمييز كلمات العلامات وسلوك البطاقات الآمن للموبايل
document.addEventListener('DOMContentLoaded', () => {
    buildMobileShell();
    // التحكم في حجم الخط (صغير / عادي / كبير / كبير جداً) مع حفظ الإعداد
    const fontSizes = ["small", "medium", "large", "xlarge"];
    const storedFont = localStorage.getItem("fontSizePreference") || "medium";
    const storedLang = "ar"; // فرض العربية دائماً
    const storedScheme = localStorage.getItem("colorSchemePreference") || "classic";

    autoBindTranslationKeys();
    applyLanguage(storedLang);
    applyColorScheme(storedScheme);
    // لو اللغة المختارة إنجليزي، أعد تأكيد وجود ترجمة جوجل لتغطية النصوص التي لا تملك data-i18n
    if (storedLang === "en") {
        ensureGoogleTranslate();
    }

    // إزالة أي بقايا لترجمة جوجل عند تحميل الصفحة
    clearGoogleTranslateArtifacts();

    function setFontSize(size) {
        if (!fontSizes.includes(size)) return;
        if (size === "medium") {
            document.documentElement.removeAttribute("data-font-size");
        } else {
            document.documentElement.setAttribute("data-font-size", size);
        }
        localStorage.setItem("fontSizePreference", size);
        document.querySelectorAll(".font-size-toggle button").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.size === size);
        });
    }

    // وضع الإعداد المخزن مباشرة عند التحميل
    setFontSize(storedFont);

    // إنشاء أزرار التبديل وحقنها في الهيدر
    (function injectFontSizeToggle() {
        const themeToggle = document.getElementById("themeToggle");
        const navToggleBtn = document.getElementById("navToggle");
        if (!themeToggle || !navToggleBtn) return;

        const wrapper = document.createElement("div");
        wrapper.className = "font-size-toggle";
        wrapper.innerHTML = `
            <button type="button" class="fs-trigger" aria-label="تغيير حجم الخط">T</button>
            <div class="fs-menu" role="menu">
                <button type="button" class="fs-option" data-size="small" role="menuitem"><span>-</span>صغير</button>
                <button type="button" class="fs-option" data-size="medium" role="menuitem"><span>T</span>عادي</button>
                <button type="button" class="fs-option" data-size="large" role="menuitem"><span>+</span>كبير</button>
                <button type="button" class="fs-option" data-size="xlarge" role="menuitem"><span>+</span>كبير جداً</button>
            </div>
        `;

        const trigger = wrapper.querySelector(".fs-trigger");
        const menu = wrapper.querySelector(".fs-menu");
        const options = wrapper.querySelectorAll(".fs-option");

        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            wrapper.classList.toggle("open");
        });

        options.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                setFontSize(btn.dataset.size);
                wrapper.classList.remove("open");
            });
        });

        document.addEventListener("click", () => wrapper.classList.remove("open"));

        themeToggle.parentElement.insertBefore(wrapper, navToggleBtn);
        setFontSize(storedFont);
    })();

    initSettingsPage();
    // --- تمييز الكلمات (BTEC / بتيك) و (Pearson / بيرسون) ---
    function highlightKeywords(root = document.body) {
        const patterns = [
            {re: /\b(BTEC|بتيك)\b/gi, cls: 'kw-btec'},
            {re: /\b(Pearson|بيرسون)\b/gi, cls: 'kw-pearson'}
        ];

        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                const parent = node.parentNode;
                if (!parent) return NodeFilter.FILTER_REJECT;
                const skipTags = ['SCRIPT','STYLE','CODE','A','BUTTON','TEXTAREA','INPUT','NOSCRIPT'];
                if (skipTags.includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });

        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        textNodes.forEach(textNode => {
            let text = textNode.nodeValue;
            let matched = false;
            patterns.forEach(p => { p.re.lastIndex = 0; if (p.re.test(text)) matched = true; });
            if (!matched) return;

            let replaced = text;
            patterns.forEach(p => {
                replaced = replaced.replace(p.re, match => `<span class="${p.cls}">${match}</span>`);
            });

            const wrapper = document.createElement('span');
            wrapper.innerHTML = replaced;
            textNode.parentNode.replaceChild(wrapper, textNode);
        });
    }

    highlightKeywords();

    // --- سلوك البطاقات: تأثير للماوس فقط، ولمس (tap) بسيط للموبايل دون تعطيل التمرير ---
    const cards = document.querySelectorAll('.info-card, .major-card, .level-box, .project-card');

    cards.forEach(card => {
        // سلوك ثابت بلا تحريك للبطاقات لضمان سلاسة التمرير خصوصاً على الموبايل
        card.style.willChange = 'auto';
    });

    // --- سلايدر خاص بصفحة BTEC إذا كانت موجودة ---
    const btecSlides = document.querySelectorAll('.btec-hero-slider .btec-slide');
    if (btecSlides.length > 0) {
        let btecSliderIndex = 0;
        function switchBtecBackground() {
            btecSlides.forEach((slide, i) => {
                if (i === btecSliderIndex) slide.classList.add('active'); else slide.classList.remove('active');
            });
            btecSliderIndex = (btecSliderIndex + 1) % btecSlides.length;
        }
        switchBtecBackground();
        setInterval(switchBtecBackground, 5000);
    }
});
