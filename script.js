const enterBtn=document.getElementById('enterBtn');
const welcome=document.getElementById('welcome');
const app=document.getElementById('app');
enterBtn.addEventListener('click',()=>{welcome.classList.add('hidden');app.classList.remove('hidden');showPage('about');});

const navButtons=[...document.querySelectorAll('.nav-btn')];
function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===`page-${name}`));
  navButtons.forEach(b=>b.classList.toggle('active',b.dataset.page===name));
}
navButtons.forEach(btn=>btn.addEventListener('click',()=>showPage(btn.dataset.page)));

function updateClock(){
  const now=new Date();
  document.getElementById('clockTime').textContent=now.toLocaleTimeString('es-ES',{hour12:false});
  document.getElementById('clockDate').textContent=now.toLocaleDateString('es-ES',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});
}
updateClock();setInterval(updateClock,1000);

// Sustituye los archivos de ejemplo por tus MP3. Los títulos solo aparecen en el reproductor.
const tracks=[
  {title:'HIMNO FC BARCELONA',artist:'FC BARCELONA',src:'cancion1.mp3'},
  {title:'CASI ALGO',artist:'MAISAK',src:'cancion2.mp3'},
  {title:'ME VAS A VER',artist:'JOANA SANTOS',src:'cancion3.mp3'}
];
const audio=document.getElementById('audio'),title=document.getElementById('trackTitle'),artist=document.getElementById('trackArtist');
const playBtn=document.getElementById('playBtn'),progress=document.getElementById('progress'),currentTime=document.getElementById('currentTime'),duration=document.getElementById('duration'),playlist=document.getElementById('playlist');
let current=0;
const timeFmt=s=>{if(!Number.isFinite(s))return '0:00';return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`};
function loadTrack(index,autoplay=false){
 current=(index+tracks.length)%tracks.length;const t=tracks[current];
 audio.src=t.src;title.textContent=t.title;artist.textContent=t.artist;
 [...playlist.children].forEach((el,i)=>el.classList.toggle('selected',i===current));
 playBtn.textContent='▶';playBtn.setAttribute('aria-label','Reproducir');
 if(autoplay) audio.play().then(()=>{playBtn.textContent='Ⅱ'}).catch(()=>{});
}
tracks.forEach((t,i)=>{const b=document.createElement('button');b.className='track-btn';b.innerHTML=`<span>♫ &nbsp; ${t.title}</span><span>0${i+1}</span>`;b.addEventListener('click',()=>loadTrack(i,true));playlist.appendChild(b)});
playBtn.addEventListener('click',()=>{if(audio.paused){audio.play().then(()=>{playBtn.textContent='Ⅱ'}).catch(()=>alert('Añade tus archivos MP3 a la carpeta music para reproducir canciones.'));}else{audio.pause();playBtn.textContent='▶'}});
document.getElementById('prevBtn').addEventListener('click',()=>loadTrack(current-1,true));
document.getElementById('nextBtn').addEventListener('click',()=>loadTrack(current+1,true));
audio.addEventListener('timeupdate',()=>{currentTime.textContent=timeFmt(audio.currentTime);progress.value=audio.duration?audio.currentTime/audio.duration*100:0});
audio.addEventListener('loadedmetadata',()=>duration.textContent=timeFmt(audio.duration));
audio.addEventListener('ended',()=>loadTrack(current+1,true));
progress.addEventListener('input',()=>{if(audio.duration)audio.currentTime=Number(progress.value)/100*audio.duration});
loadTrack(0);
