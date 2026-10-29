const commons = name => 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(name) + '?width=900';
const photos={
 plaza:{src:commons('Journal Square Transportation Center, PATH plaza.jpg'),credit:'Plaza photograph · Kiran891 / Wikimedia Commons · CC BY-SA 4.0',link:'https://commons.wikimedia.org/wiki/File:Journal_Square_Transportation_Center,_PATH_plaza.jpg'},
 path:{src:commons('Journal Square entrance vc.jpg'),credit:'Journal Square station entrance · Wikimedia Commons',link:'https://commons.wikimedia.org/wiki/File:Journal_Square_entrance_vc.jpg'},
 statue:{src:'https://dspace.njstatelib.org/bitstreams/814a82bf-b6a1-466b-bd70-9634175404e1/download',credit:'Jackie Robinson statue · New Jersey State Library archive (view original)',link:'https://dspace.njstatelib.org/items/814a82bf-b6a1-466b-bd70-9634175404e1'},
 historic:{src:commons('SummitAveStation(H&M)1910sJSQ.png'),credit:'Summit Avenue station, 1910s · Wikimedia Commons',link:'https://commons.wikimedia.org/wiki/File:SummitAveStation(H%26M)1910sJSQ.png'},
 street:{src:commons('JSQ plaza.jpg'),credit:'Journal Square area view (not a storefront photograph) · TFSyndicate / Wikimedia Commons',link:'https://commons.wikimedia.org/wiki/File:JSQ_plaza.jpg'},
 landscape:{src:commons('Journal Square Transportation Center plaza.agr.jpg'),credit:'Plaza area photograph · Wikimedia Commons',link:'https://commons.wikimedia.org/wiki/File:Journal_Square_Transportation_Center_plaza.agr.jpg'}
};
const places={
 starbucks:{title:'Starbucks',desc:'A coffee stop near the plaza. It may influence where people briefly stop on their way through the square.',label:'COFFEE / DAILY ROUTINES',photo:'street',now:'Today, coffee stops are part of the plaza’s daily rhythm. Coffee stops are part of the plaza’s daily rhythm.',then:'Commercial activity around Journal Square developed alongside its role as a transportation hub. This is a present-day location, not a historical Starbucks site.',source:'https://www.panynj.gov/bus-terminals/en/journal-square/history---journal-square.html'},
 path:{title:'PATH Station Building',desc:'The station borders the outdoor plaza. The project observes outdoor movement, not PATH ridership.',label:'TRANSPORT / HISTORY',photo:'path',now:'Today, the PATH station and bus terminal make this a transportation-centered public space.',then:'The area was once served by Summit Avenue station. The present transportation center was developed during the 1970s; its PATH entrance opened in 1973.',source:'https://www.panynj.gov/bus-terminals/en/journal-square/history---journal-square.html'},
 statue:{title:'Jackie Robinson Statue',desc:'A memorial that gives this everyday transit space a connection to baseball and civil-rights history.',label:'MEMORY / PUBLIC ART',photo:'statue',now:'Today, the statue stands near the station as a landmark that commuters can pass, notice, or pause beside.',then:'Jackie Robinson made his Montreal Royals debut against the Jersey City Giants at Roosevelt Stadium in 1946. Susan Wagner’s statue was dedicated here in 1998.',source:'https://portfolio.panynj.gov/2017/02/07/jackie-robinson-tribute-at-journal-square-and-heres-to-you-mr-robinson/'},
 plaza:{title:'The Open Plaza',desc:'An outdoor space where walking, waiting, and brief stops overlap.',label:'MOVEMENT / STILLNESS',photo:'plaza',now:'People cross, wait, meet, and pause in the same public space.',then:'Journal Square became an important transportation and commercial district during the early twentieth century. Its open space continues to serve changing everyday routines.',source:'https://www.panynj.gov/bus-terminals/en/journal-square/history---journal-square.html'},
 taxi:{title:'Taxi Pickup Area',desc:'The left-side street links waiting passengers and arriving taxis to the plaza.',label:'TRANSPORT / WAITING',photo:'taxi',now:'Taxi pickup adds a waiting zone along the edge of the plaza. The taxi pickup area is part of the plaza’s everyday movement and waiting patterns.',then:'Before the modern transportation center, buses loaded and unloaded on the streets around the square. Transport has long shaped how people gather here.',source:'https://www.panynj.gov/bus-terminals/en/journal-square/history---journal-square.html'},
 shops:{title:'Nearby Shops',desc:'Food and retail stops can affect where pedestrians slow down or change direction.',label:'COMMERCE / DAILY ROUTINES',photo:'street',now:'Nearby businesses give some pedestrians reasons to stop instead of walking straight through. This is an area view, not a specific shop.',then:'The district grew as a commercial center alongside the original station in the 1920s.',source:'https://www.panynj.gov/bus-terminals/en/journal-square/history---journal-square.html'},
 trees:{title:'Trees & Planting',desc:'Greenery changes the feeling of the space, offering shade and places to pause.',label:'ECOLOGY / PUBLIC SPACE',photo:'landscape',now:'Trees and planting soften the paved plaza and can influence where people linger.',then:'The plaza’s landscape is part of its changing design. This project does not claim the current trees existed in the historic station era.',source:'https://www.panynj.gov/bus-terminals/en/journal-square/history---journal-square.html'}
};
const panelTitle=document.getElementById('panelTitle'),panelDescription=document.getElementById('panelDescription'),photo=document.getElementById('placePhoto'),photoFallback=document.getElementById('photoFallback'),historyText=document.getElementById('historyText'),tooltip=document.getElementById('tooltip'),frame=document.getElementById('mapFrame');
const positions={statue:[31,36],plaza:[57,54],taxi:[18,22],shops:[75,28],starbucks:[41,19],path:[48,84],trees:[44,39]};
let activePlace='plaza',historyMode='now';
function showPhoto(data){photo.hidden=false;photoFallback.hidden=true;photo.src=data.src;photo.alt=data.alt||"Journal Square location photograph";}
photo.addEventListener('error',()=>{photo.hidden=true;photoFallback.hidden=false});
photo.addEventListener('load',()=>{photo.hidden=false;photoFallback.hidden=true});
function updatePanel(){const item=places[activePlace];panelTitle.textContent=item.title;panelDescription.textContent=item.desc;historyText.textContent=historyMode==='then'?item.then:item.now;let selected=photos[item.photo];if(activePlace==='statue')selected={src:'statue-photo.png',alt:'Jackie Robinson statue in Journal Square'};if(activePlace==='taxi')selected={src:'taxi-photo.png',alt:'Yellow taxis at the Journal Square pickup area'};if(historyMode==='then' && (activePlace==='path'||activePlace==='plaza'||activePlace==='shops'))selected=photos.historic;showPhoto(selected);}
for(const btn of document.querySelectorAll('.hotspot')){const key=btn.dataset.place;const showTip=()=>{tooltip.textContent=places[key].title;tooltip.style.display='block';tooltip.style.left=`${positions[key][0]+2}%`;tooltip.style.top=`${positions[key][1]-8}%`};btn.addEventListener('mouseenter',showTip);btn.addEventListener('mouseleave',()=>tooltip.style.display='none');btn.addEventListener('focus',showTip);btn.addEventListener('blur',()=>tooltip.style.display='none');btn.addEventListener('click',()=>{activePlace=key;document.querySelectorAll('.hotspot').forEach(x=>x.classList.toggle('selected',x===btn));updatePanel()});}
document.querySelectorAll('.history-mode').forEach(btn=>btn.addEventListener('click',()=>{historyMode=btn.dataset.mode;document.querySelectorAll('.history-mode').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});updatePanel()}));
updatePanel();
const peopleLayer=document.getElementById('peopleLayer');
const slider=document.getElementById('hourSlider');
let hour=8,paused=false,hidden=false;
function rand(i,k){const v=Math.sin((i+1)*12.9898+k*78.233)*43758.5453;return v-Math.floor(v)}
function hourActivity(h){const rushAM=Math.exp(-Math.pow((h-9)/1.65,2));const rushPM=Math.exp(-Math.pow((h-18)/1.7,2));const midday=Math.exp(-Math.pow((h-13)/3.5,2));return Math.max(.08,.13+.80*rushAM+.88*rushPM+.25*midday)}
function hourText(h){return `${h%12||12}:00 ${h<12?'AM':'PM'}`}
function renderPeople(){
 peopleLayer.replaceChildren();
 const activity=hourActivity(hour);
 const coffeeRush=Math.exp(-Math.pow((hour-9)/2.4,2))+.6*Math.exp(-Math.pow((hour-17)/2.7,2));
 const counts={
  walk:Math.round(5+37*activity),
  wait:Math.round(2+10*activity),
  coffee:Math.round(1+5*activity+6*coffeeRush),
  shop:Math.round(1+8*activity),
  chat:Math.round(1+7*activity),
  luggage:Math.round(1+5*activity)
 };
 let i=0;
 for(const [kind,count] of Object.entries(counts)){
  for(let n=0;n<count;n++,i++){
   const person=document.createElement('span');
   person.className='person '+kind;
   let x,y;
   if(kind==='wait'){x=10+rand(i,2)*12;y=15+rand(i,3)*43}
   else if(kind==='coffee'){x=34+rand(i,4)*16;y=17+rand(i,5)*14}
   else if(kind==='shop'){x=67+rand(i,6)*19;y=24+rand(i,7)*20}
   else if(kind==='chat'){x=37+rand(i,4)*28;y=36+rand(i,5)*27}
   else if(kind==='luggage'){x=38+rand(i,6)*23;y=65+rand(i,7)*17}
   else{x=25+rand(i,6)*50;y=28+rand(i,7)*43}
   person.style.left=x+'%';person.style.top=y+'%';
   person.style.setProperty('--dx',((rand(i,8)-.3)*110)+'px');
   person.style.setProperty('--dy',((rand(i,9)-.5)*65)+'px');
   person.style.setProperty('--duration',(5+8*(1-activity)+rand(i,10)*5)+'s');
   person.style.setProperty('--delay',(-rand(i,11)*8)+'s');
   peopleLayer.appendChild(person);
  }
 }
}
function updateScene(){
 document.getElementById('hourReadout').textContent=hourText(hour);
 slider.style.setProperty('--progress',`${hour/23*100}%`);
 document.body.classList.toggle('evening',hour>=19||hour<=5);
 document.body.classList.toggle('afternoon',hour>=12&&hour<17);
 renderPeople();
}
slider.addEventListener('input',e=>{hour=Number(e.target.value);updateScene()});
document.getElementById('toggleMotion').addEventListener('click',e=>{paused=!paused;frame.classList.toggle('paused',paused);e.currentTarget.textContent=paused?'Resume movement':'Pause movement'});
document.getElementById('togglePeople').addEventListener('click',e=>{hidden=!hidden;frame.classList.toggle('hidden-people',hidden);e.currentTarget.textContent=hidden?'Show people':'Hide people'});
updateScene();
