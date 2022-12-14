let theme;
let ids = [];
var anim;
document.addEventListener('DOMContentLoaded', (e) => {
    anim = new KeyframeEffect(document.getElementById('meme'),[{'from':'opacity:100%;','to':'opacity:0%;'}])
    //console.log('yippee');
    if(window.location.search.length > 0) goTo(window.location.search.replace('?',''));
    document.querySelectorAll('.menu').forEach(e => e.addEventListener('click',dropMenu));
    document.querySelectorAll('.slideshow').forEach(s => {
        let dots = '';
        var im = s.querySelector('.imgContainer');
        for(let i = 0; i < im.childElementCount; i++){
            dots += `<span class="dot ${i}${i === 0 ? (() => {im.children[i].classList.add('show');return' active';}).call() : ''}" onclick="slide(this,${i})"></span>`;
            im.children[i].classList.add(`img${i}`,'diapo');
        }
        s.querySelector('.slide-dot').innerHTML = dots;
        // setInterval(() => s.querySelector('.toRight').click(),10000)
        s.addEventListener('mousemove',onMouseMove)
        s.addEventListener('mouseleave',onMouseLeave)
        s.id = `sh${ids.push(NaN)-1}`
    })
    document.querySelectorAll('.toRight, .toLeft').forEach(a => a.addEventListener('click',arrowSlide))
    document.querySelectorAll('.slideshow > .fullscreen').forEach(f => f.addEventListener('click',slideshowFullscreen))
    document.querySelectorAll('img:not(.diapo, #cookies, #meme, .toLeft > img, .toRight > img)').forEach(i => i.addEventListener('click',openImage))
    theme = localStorage.getItem('theme') || 'dark';
    applyTheme();
    if(!localStorage.getItem('warning')){
        alert('!!!  IMPORTANT  !!!\n\nThis website is not affiliated in any kind of way to the New Orleans town. This is just a project made for an English Homework. More information can be found in the "About Us" page of the website.')
        localStorage.setItem('warning', true)
    }
    if(mobileCheck()) alert('!!! WARNING !!!\n\n This website is not designed to run on mobile yet. I\'m working on it, but it\'s still not finished. I\'d recommand using a laptop or even a tablet (horizontal side) to check it, because the text cant be seen clearly with vertical screen.')
});

function mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

document.addEventListener('keydown', (e) => {
    //console.log(e.key);
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

function openImage(e){
    open(this.src,'_blank')
    if(Math.random()<=0.01) for(let i=0;i<14;i++) open(this.src,'_blank');
}

function dropMenu(e){
    if(e.composedPath().find((e) => (e.classList?.contains('menu') && e.classList?.contains('open'))) && !e.target.classList.contains('menu')) return;
    if(this.classList.contains('open')) this.classList.remove('open');
    else{
        document.querySelector('.open')?.classList.remove('open');
        this.classList.add('open');
    }
}

function changeTheme(){
    theme = (theme === 'dark') ? 'light' : 'dark';
    applyTheme();
}

function applyTheme(){
    localStorage.setItem('theme',theme);
    document.querySelectorAll('body, header, footer, #easteregg').forEach(e => e.classList = theme);
}

function removeCSS(){
    document.querySelectorAll('style, link').forEach(s => s.remove());
    setTimeout(() => alert('This is how a raw HTML page looks like, without CSS ! As previously mentionned, CSS does all the style things, it\'s CSS that hides the dropdown menus for example, or change the text color. In clear, HTML places all the base "building blocks" in place, and CSS does all the visual stuff. If you want to revert the page back to its normal state, just reload it, and the CSS will be back'),20)
    document.getElementById('easteregg').remove();
}

function slide(elem,int){
    //console.log(elem,elem.parentElement.parentElement)
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
    this.classList.remove('immersion');
    if(!isNaN(ids[this.id.slice(2)])) clearTimeout(ids[this.id.slice(2)]);
    if(!(this.querySelector('.toLeft').matches(':hover')||this.querySelector('.toRight').matches(':hover'))) ids[this.id.slice(2)] = setTimeout(() => {
        this.querySelector('.toLeft').classList.remove('hover');
        this.querySelector('.toRight').classList.remove('hover');
        this.classList.add('immersion');
        ids[this.id.slice(2)] = NaN;
    },4000);
    else ids[this.id.slice(2)] = NaN;
}

function onMouseLeave(e){
    this.querySelector('.toLeft').classList.remove('hover');
    this.querySelector('.toRight').classList.remove('hover');
    try{clearTimeout(ids[this.id.slice(2)]);}catch(e){};
}

function goTo(e){
    scrollTo({top:document.getElementById(e).offsetTop-40,behavior:'smooth'})
}



const memes = ['duck','moai','gnome','nerd']

function meme(){
    if(document.getElementById('meme').classList.contains('showmeme')) return;
    var m = memes[Math.floor(Math.random()*memes.length)];
    console.log(document.querySelector('title').innerHTML == 'Visit New Orleans', m)
    document.getElementById('audio').src = `${document.querySelector('title').innerHTML == 'Visit New Orleans' ? '.' : '..'}/Audio/${m}.mp3`
    document.getElementById('meme').src = `${document.querySelector('title').innerHTML == 'Visit New Orleans' ? '.' : '..'}/Images/${m}.jpg`
    // document.getElementById('meme').classList.add('showmeme');
    // setInterval(() => document.getElementById('meme').classList.remove('showmeme'), 3500);
    fade(document.getElementById('meme'));
    document.getElementById('audio').play();
}

function fade(element) {
    var op = 1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op <= 0.1){
            element.style.opacity = '0';
            element.style.display = 'none';
            clearInterval(timer);
        }
        element.style.opacity = op;
        op -= 0.02;
    }, 25);
}