const progress=document.querySelector('.progress');
const glow=document.querySelector('.cursor-glow');
const reveals=document.querySelectorAll('.reveal');
const sections=[...document.querySelectorAll('main section[id]')];
const nav=[...document.querySelectorAll('.topbar nav a')];

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target)}
}),{threshold:.12});
reveals.forEach(el=>observer.observe(el));

function updateProgress(){
  const h=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(h>0?(scrollY/h)*100:0)+'%';
  let current='home';
  sections.forEach(s=>{if(scrollY>=s.offsetTop-180) current=s.id});
  nav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
}
addEventListener('scroll',updateProgress,{passive:true});updateProgress();

addEventListener('pointermove',e=>{
  glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';
});

document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    if(innerWidth<901)return;
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${-y*2}deg) rotateY(${x*2}deg) translateY(-5px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{
  nav.forEach(n=>n.classList.remove('active'));
  const n=document.querySelector(`.topbar nav a[href="${a.getAttribute('href')}"]`);
  if(n)n.classList.add('active');
}));