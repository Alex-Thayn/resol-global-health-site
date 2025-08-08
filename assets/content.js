async function loadJSON(path){ const r = await fetch(path, {cache:'no-store'}); return r.json(); }
const $ = (sel, root=document) => root.querySelector(sel);

function setSection(sec, item){
  if(!sec || !item) return;
  const h2 = $('h2', sec), p = $('p', sec), img = $('img.spot-img', sec);
  if(h2 && item.title) h2.textContent = item.title;
  if(p && item.body)  p.innerHTML = item.body;
  if(img && item.image){ img.src = item.image; img.alt = item.alt || ''; }
}

export async function hydrateProjects(){
  const data = await loadJSON('/content/projects.json');
  const ids = ['education','water','jornadas','midwives'];
  ids.forEach((id, i) => setSection(document.getElementById(id), data.current?.[i]));
  const cards = document.querySelectorAll('.grid.grid-4 .card');
  (data.future || []).forEach((f,i)=>{
    const c = cards[i]; if(!c) return;
    $('h3', c).textContent = f.title || '';
    $('p', c).textContent  = f.text  || '';
  });
}

export async function hydrateAbout(){
  const d = await loadJSON('/content/about.json');
  const who = $('#who-intro'); if(who && d.who_intro) who.textContent = d.who_intro;
  const mean = $('#meaning'); if(mean && d.meaning) mean.textContent = d.meaning;
  const values = d.values || [];
  document.querySelectorAll('[data-value]').forEach((el, i)=>{
    const v = values[i] || {}; const h3 = $('h3', el); const p = $('p', el);
    if(h3 && v.title) h3.textContent = v.title;
    if(p  && v.text)  p.textContent = v.text;
  });
  if(d.about_image) $('.spotlight-photo.about')?.style.setProperty('background-image', `url(${d.about_image})`);
  if(d.partners_image) $('.spotlight-photo.partners')?.style.setProperty('background-image', `url(${d.partners_image})`);
}

export async function hydrateDonate(){
  const d = await loadJSON('/content/donate.json');
  const t = $('#donate-hero-title'); if(t && d.hero_title) t.textContent = d.hero_title;
  const i = $('#donate-hero-intro'); if(i && d.hero_intro) i.textContent = d.hero_intro;
  const tiles = d.tiles || [];
  document.querySelectorAll('.donate-tiles .card').forEach((c, idx)=>{
    const it = tiles[idx] || {}; const h = $('h3', c); const p = $('p', c);
    if(h && it.title) h.textContent = it.title;
    if(p && it.text)  p.textContent = it.text;
  });
  if(d.donate_url) document.querySelectorAll('[data-donate-url]').forEach(a=>a.href=d.donate_url);
  if(d.monthly_url) document.querySelectorAll('[data-monthly-url]').forEach(a=>a.href=d.monthly_url);
}

export async function hydrateContact(){
  const d = await loadJSON('/content/contact.json');
  const t = $('#contact-hero-title'); if(t && d.hero_title) t.textContent = d.hero_title;
  const i = $('#contact-hero-intro'); if(i && d.hero_intro) i.textContent = d.hero_intro;
  if(d.email) document.querySelectorAll('[data-email]').forEach(a=>a.href=`mailto:${d.email}`);
  if(d.address) { const m = $('#mailing-address'); if(m) m.textContent = d.address; }
}