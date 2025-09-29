// ===== لغة بسيطة (AR/EN) =====
var i18n = {
  ar: {
    hero_title:"منصة احترافية لإصدار التأشيرات والإقامات",
    hero_sub:"واجهة عصرية، تفاعلات سلسة، وتجربة تلهم العملاء للبدء فورًا.",
    why_title:"لماذا Nux.T؟", why_sub:"بطاقات طويلة مع غشاوة تتلاشى وتوهّج يتبع المؤشر.",
    preview_title:"استعراض سريع", preview_sub:"إعلانات متغيرة كل 20 ثانية بعنوان ونص وتأثير حركة مختلف.",
    process_title:"كيف نعمل؟", faq_title:"الأسئلة الشائعة",
    cta_title:"جاهز نبدأ؟", cta_sub:"أرسل تفاصيلك أو تواصل عبر واتساب وسنعاودك بسرعة.",
    cta_whatsapp:"محادثة واتساب", cta_request:"طلب تواصل",
    pill_speed:"سرعة المتابعة", pill_price:"أسعار شفافة", pill_support:"دعم فوري"
  },
  en: {
    hero_title:"Professional platform for visas & iqama",
    hero_sub:"Modern UI, smooth interactions, and a delightful start experience.",
    why_title:"Why Nux.T?", why_sub:"Tall cards with blur-to-clear and mouse-follow glow.",
    preview_title:"Quick Preview", preview_sub:"Three rotating promos (20s) with unique motion.",
    process_title:"How We Work", faq_title:"FAQ",
    cta_title:"Ready to start?", cta_sub:"Send your details or ping us on WhatsApp and we’ll reply quickly.",
    cta_whatsapp:"WhatsApp Chat", cta_request:"Request Callback",
    pill_speed:"Fast Processing", pill_price:"Transparent Pricing", pill_support:"Instant Support"
  }
};

function sanitize(text){
  return String(text || '')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}

function applyI18n(lang){
  var dict = i18n[lang] || i18n.ar;
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var key = el.getAttribute('data-i18n');
    if(dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = (lang==='en'?'en':'ar');
  document.documentElement.dir  = (lang==='en'?'ltr':'rtl');
  localStorage.setItem('lang',lang);
}

function initLang(){
  var saved = localStorage.getItem('lang') || 'ar';
  applyI18n(saved);

  function toggle(){ applyI18n(document.documentElement.lang==='ar' ? 'en' : 'ar'); }
  document.addEventListener('click', function(e){
    if(e.target && (e.target.id==='langToggle' || e.target.id==='langToggle_m')) toggle();
  });
}

// ===== ثيم (فاتح/داكن) =====
function initTheme(){
  var saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  function tgl(){
    var now = document.documentElement.getAttribute('data-theme')==='dark' ? 'light':'dark';
    document.documentElement.setAttribute('data-theme', now);
    localStorage.setItem('theme', now);
  }
  document.addEventListener('click', function(e){
    if(e.target && (e.target.id==='themeToggle' || e.target.id==='themeToggle_m')) tgl();
  });
}

// ===== لماذا Nux.T (تحميل بطاقات) =====
function loadWhy(){
  var grid = document.getElementById('whyGrid');
  if(!grid) return;
  fetch(grid.dataset.endpoint).then(function(r){return r.json();}).then(function(res){
    var list = (res && res.success && Array.isArray(res.data)) ? res.data : [];
    grid.innerHTML = list.map(function(s){
      var title   = sanitize(s.title);
      var excerpt = sanitize(s.excerpt || '');
      var slug    = sanitize(s.slug || '');
      var img     = sanitize(s.image_url || 'assets/images/services/placeholder.jpg');
      var feats   = Array.isArray(s.features) ? s.features.slice(0,3) : [];
      var featsTxt = feats.map(function(x){ return '&bull; ' + sanitize(x); }).join(' &mdash; ');
      return (
        '<article class="card interactive long-card reveal">'+
          '<div class="thumb">'+
            '<img src="'+img+'" alt="'+title+'">'+
            '<div class="overlay"><div><h3 class="title">'+title+'</h3><div class="meta">'+excerpt+'</div></div></div>'+
          '</div>'+
          '<div class="body">'+
            '<p class="desc">'+featsTxt+'</p>'+
            '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">'+
              '<a class="btn btn-ghost" href="pages/services.html#'+slug+'">التفاصيل</a>'+
              '<a class="btn btn-brand" target="_blank" href="https://wa.me/966500000000?text='+encodeURIComponent('أريد '+title)+'">اطلب الآن</a>'+
            '</div>'+
          '</div>'+
        '</article>'
      );
    }).join('') || '<div class="muted mini">لا توجد خدمات حالياً.</div>';
  }).catch(function(){
    grid.innerHTML = '<div class="muted mini">تعذّر تحميل الخدمات.</div>';
  });
}

// ===== الاستعراض السريع (3 شرائح / 20 ثانية) =====
function initPreview(){
  var stage = document.getElementById('previewStage');
  if(!stage) return;
  var slides = Array.prototype.slice.call(stage.querySelectorAll('.ad-slide'));
  if(!slides.length) return;

  var idx = 0, timer = null;
  var fx = ['fx-fade','fx-slide','fx-zoom'];

  function clearFX(el){ el.classList.remove('in','fx-fade','fx-slide','fx-zoom'); }

  function show(i){
    slides.forEach(clearFX);
    var el = slides[i];
    el.classList.add('in', fx[i % fx.length]);
    idx = i;
    restart();
  }

  function next(){ show( (idx+1) % slides.length ); }
  function prev(){ show( (idx-1+slides.length) % slides.length ); }

  function restart(){
    if(timer) clearTimeout(timer);
    timer = setTimeout(next, 20000);
  }

  var prevBtn = document.getElementById('prevAd');
  var nextBtn = document.getElementById('nextAd');
  if(prevBtn) prevBtn.addEventListener('click', prev);
  if(nextBtn) nextBtn.addEventListener('click', next);

  stage.addEventListener('mouseenter', function(){ if(timer) clearTimeout(timer); });
  stage.addEventListener('mouseleave', restart);

  show(0);
}

// ===== FAQ =====
function loadFAQ(){
  var wrap = document.getElementById('faqWrap');
  if(!wrap) return;
  fetch(wrap.dataset.endpoint).then(function(r){return r.json();}).then(function(res){
    var rows = (res && res.success && Array.isArray(res.data)) ? res.data : [];
    var extra = [
      {question:'كيف أعرف حالة طلبي؟',answer:'نرسل لك تحديثات عبر واتساب/البريد عند كل خطوة.'},
      {question:'هل يمكن تسريع الطلب؟',answer:'نعم حسب الجهة والقدرة المتاحة. نبلغك بالخيارات الممكنة.'},
      {question:'هل تدعمون عدة جنسيات؟',answer:'نعم، نخدم معظم الجنسيات وفق اشتراطات الجهات.'},
      {question:'هل البيانات آمنة؟',answer:'نلتزم بأفضل ممارسات الخصوصية ونستخدم قنوات رسمية.'},
      {question:'كيف أدفع؟',answer:'تحويل بنكي/مدى/نقدي وفق سياسة المؤسسة.'}
    ];
    var all = rows.concat(extra).slice(0,12);
    wrap.innerHTML = all.map(function(f){
      return (
        '<div class="item card interactive">'+
          '<div class="q">'+sanitize(f.question)+'</div>'+
          '<div class="a">'+sanitize(f.answer)+'</div>'+
        '</div>'
      );
    }).join('') || '<div class="muted mini">لا توجد أسئلة حالياً.</div>';

    wrap.querySelectorAll('.item .q').forEach(function(q){
      q.addEventListener('click', function(){ q.parentElement.classList.toggle('open'); });
    });
  }).catch(function(){
    wrap.innerHTML = '<div class="muted mini">تعذّر تحميل الأسئلة.</div>';
  });
}

// ===== Header interactions =====
function initHeaderNav(){
  // dropdown (desktop)
  document.querySelectorAll('.site-header .has-menu').forEach(function(item){
    var btn = item.querySelector('.menu-toggle');
    if(!btn) return;
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function(e){
      if(!item.contains(e.target)) { item.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
    });
  });

  // mobile
  var burger = document.getElementById('navHamburger');
  var panel  = document.getElementById('mobilePanel');
  if(burger && panel){
    burger.addEventListener('click', function(){
      var expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', (!expanded).toString());
      panel.hidden = expanded;
      document.body.style.overflow = expanded ? '' : 'hidden';
    });
  }
}

// ===== Footer سنة =====
function setYear(){
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
}

// ===== Run =====
document.addEventListener('DOMContentLoaded', function(){
  initLang();
  initTheme();
  initHeaderNav();
  setYear();
  loadWhy();
  initPreview();
  loadFAQ();
});