(() => {
 const root=document.documentElement, reduced=matchMedia('(prefers-reduced-motion: reduce)');
 root.classList.add('js');
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
 const menu=document.querySelector('.menu'),nav=document.querySelector('.nav nav');
 function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.querySelector('span').textContent='+'}
 menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.querySelector('span').textContent=open?'−':'+'});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
 const progress=document.querySelector('.progress');let scheduled=false;
 function update(){const total=root.scrollHeight-innerHeight;progress.style.width=(total>0?scrollY/total*100:0)+'%';scheduled=false}
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}},{passive:true});update();
 const cursor=document.querySelector('.cursor');
 document.querySelectorAll('.project-image').forEach(el=>{el.addEventListener('pointerenter',()=>{if(!reduced.matches&&!root.classList.contains('paused'))cursor.classList.add('active')});el.addEventListener('pointerleave',()=>cursor.classList.remove('active'));el.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'})});
 const toggle=document.querySelector('.motion-toggle');
 function setPaused(paused){root.classList.toggle('paused',paused);toggle.setAttribute('aria-pressed',String(paused));toggle.setAttribute('aria-label',paused?'Ativar animações':'Pausar animações');toggle.innerHTML=(paused?'▶':'Ⅱ')+' <span>'+(paused?'Ativar movimento':'Pausar movimento')+'</span>';if(paused)cursor.classList.remove('active')}
 setPaused(reduced.matches);toggle.addEventListener('click',()=>setPaused(!root.classList.contains('paused')));reduced.addEventListener('change',e=>setPaused(e.matches));
 function clock(){document.getElementById('clock').textContent=new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit',timeZone:'America/Sao_Paulo'}).format(new Date())}
 clock();setInterval(clock,60000);document.getElementById('year').textContent=new Date().getFullYear();
})();
