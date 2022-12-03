let theme;
let ids = [];
document.addEventListener('DOMContentLoaded', () =>{
    console.log('yippee');
    document.querySelectorAll('.menu').forEach(e => e.addEventListener('click',dropMenu));
    document.querySelectorAll('.slideshow').forEach(s => {
        let dots = '';
        var im = s.querySelector('.imgContainer');
        for(let i = 0; i < im.childElementCount; i++){
            dots += `<span class="dot ${i}${i === 0 ? (() => {im.children[i].classList.add('show');return' active';}).call() : ''}" onclick="slide(this,${i})"></span>`;
            im.children[i].classList.add(`img${i}`);
        }
        s.querySelector('.slide-dot').innerHTML = dots;
        // setInterval(() => s.querySelector('.toRight').click(),10000)
        s.addEventListener('mousemove',onMouseMove)
        s.addEventListener('mouseleave',onMouseLeave)
        s.id = `sh${ids.push(NaN)-1}`
    })
    document.querySelectorAll('.toRight, .toLeft').forEach(a => a.addEventListener('click',arrowSlide))
    document.querySelectorAll('.slideshow > .fullscreen').forEach(f => f.addEventListener('click',slideshowFullscreen))
    theme = sessionStorage.getItem('theme') || 'dark';
    applyTheme();
});

document.addEventListener('keydown', (e) => {
    console.log(e.key);
    if(fsElem()){
        e.preventDefault();
        if (e.key === 'ArrowLeft') fsElem().querySelector('.toLeft').click();
        else if (e.key === 'ArrowRight') fsElem().querySelector('.toRight').click();
    }
})

document.addEventListener('click', (e) => {
    if(e.composedPath().find((e) => e.classList?.contains('menu'))) return;
    document.querySelector('.open')?.classList.remove('open');
})

document.addEventListener('scroll', (e) => document.querySelector('.open')?.classList.remove('open'))

function dropMenu(e){
    if(e.composedPath().find((e) => (e.classList?.contains('menu') && e.classList?.contains('open'))) && !e.target.classList.contains('menu')) return;
    if(this.classList.contains('open')) this.classList.remove('open');
    else{
        document.querySelector('.open')?.classList.remove('open');
        this.classList.add('open');
    }
}

function applyTheme(){
    sessionStorage.setItem('theme',theme);
    document.querySelectorAll('body, header, .menu, menu, menu *').forEach(e => e.classList.add(theme));
}

function slide(elem,int){
    console.log(elem,elem.parentElement.parentElement)
    if(elem.classList.contains('active')) return;
    elem.parentElement.parentElement.querySelector('.show').classList.remove('show')
    elem.parentElement.parentElement.querySelector(`.img${int}`).classList.add('show');
    elem.parentElement.parentElement.querySelector('.active').classList.remove('active')
    elem.classList.add('active')
}

function arrowSlide(e){
    var int = parseInt(this.parentElement.querySelector('.active').classList[1]) + (this.classList.contains('toRight') ? 1 : -1);
    if (int < 0) int = this.parentElement.querySelector('.imgContainer').childElementCount - 1;
    else if(int >= this.parentElement.querySelector('.imgContainer').childElementCount)int = 0;
    slide(this.parentElement.querySelector('.slide-dot').children[int],int);
}

document.addEventListener('fullscreenchange', (e) => {
    if(!fsElem()) document.querySelectorAll('.fullscreen').forEach(e => e.style.background = "");
})

function fsElem(){
    return (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement);
}

function slideshowFullscreen(e){
    if(fsElem()){
        document.exitFullscreen();
        this.style.background = "";
    }else{
        this.parentElement.requestFullscreen();
        this.style.background = "url(./Images/normalscreen.png) center/contain";
    }
}

function onMouseMove(e){
    this.querySelector('.toLeft').classList.add('hover');
    this.querySelector('.toRight').classList.add('hover');
    if(!isNaN(ids[this.id.slice(2)])) clearTimeout(ids[this.id.slice(2)]);
    ids[this.id.slice(2)] = setTimeout(() => {
        this.querySelector('.toLeft').classList.remove('hover');
        this.querySelector('.toRight').classList.remove('hover');
        ids[this.id.slice(2)] = NaN;
    },4000);
}

function onMouseLeave(e){
    this.querySelector('.toLeft').classList.remove('hover');
    this.querySelector('.toRight').classList.remove('hover');
    try{clearTimeout(ids[this.id.slice(2)]);}catch(e){}
}