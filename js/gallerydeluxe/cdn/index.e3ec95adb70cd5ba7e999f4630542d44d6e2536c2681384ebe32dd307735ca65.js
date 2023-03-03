(()=>{var N=!0,z=!1,H=!1;var W=function(){let t=[],i=!1;function e(){i||(i=!0,window.requestAnimationFrame?window.requestAnimationFrame(l):setTimeout(l,66))}function l(){t.forEach(function(o){o()}),i=!1}return{add:function(o){t.length||window.addEventListener("resize",e),t.push(o)},disable:function(){window.removeEventListener("resize",e)},reEnable:function(){window.addEventListener("resize",e)}}}();function Z(t,i,e){let l="#"+t+" {  position: relative;}."+i+"-figure {  background-color: #D5D5D5;  overflow: hidden;  left: 0;  position: absolute;  top: 0;  margin: 0;}."+i+"-figure img {  left: 0;  position: absolute;  top: 0;  height: 100%;  width: 100%;  opacity: 0;  transition: "+(e/1e3).toString(10)+"s ease opacity;  -webkit-transition: "+(e/1e3).toString(10)+"s ease opacity;}."+i+"-figure img."+i+"-thumbnail {  -webkit-filter: blur(30px);  filter: blur(30px);  left: auto;  position: relative;  width: auto;}."+i+"-figure img."+i+"-loaded {  opacity: 1;}",o=document.head||document.getElementsByTagName("head")[0],u=document.createElement("style");u.type="text/css",u.styleSheet?u.styleSheet.cssText=l:u.appendChild(document.createTextNode(l)),o.appendChild(u)}function j(t,i){for(let e in i)i.hasOwnProperty(e)&&(t[e]=i[e])}function J(t){let i=0;do isNaN(t.offsetTop)||(i+=t.offsetTop),t=t.offsetParent;while(t);return i}function m(t,i){return this.inRAF=!1,this.isTransitioning=!1,this.minAspectRatioRequiresTransition=!1,this.minAspectRatio=null,this.latestYOffset=0,this.lastWindowWidth=window.innerWidth,this.scrollDirection="down",this.visibleImages=[],this.settings={containerId:"pig",scroller:window,classPrefix:"pig",figureTagName:"figure",spaceBetweenImages:8,transitionSpeed:500,primaryImageBufferHeight:1e3,secondaryImageBufferHeight:300,thumbnailSize:20,urlForSize:function(e,l){return"/img/"+l.toString(10)+"/"+e},styleForElement:function(e){return""},onClickHandler:null,getMinAspectRatio:function(e){return e<=640?2:e<=1280?4:e<=1920?5:6},getImageSize:function(e){return e<=640?100:e<=1920?250:500}},j(this.settings,i||{}),this.container=document.getElementById(this.settings.containerId),this.container||console.error("Could not find element with ID "+this.settings.containerId),this.scroller=this.settings.scroller,this.images=this._parseImageData(t),Z(this.settings.containerId,this.settings.classPrefix,this.settings.transitionSpeed),this}m.prototype._getTransitionTimeout=function(){return this.settings.transitionSpeed*1.5};m.prototype._getTransitionString=function(){return this.isTransitioning?(this.settings.transitionSpeed/1e3).toString(10)+"s transform ease":"none"};m.prototype._recomputeMinAspectRatio=function(){let t=this.minAspectRatio;this.minAspectRatio=this.settings.getMinAspectRatio(this.lastWindowWidth),t!==null&&t!==this.minAspectRatio?this.minAspectRatioRequiresTransition=!0:this.minAspectRatioRequiresTransition=!1};m.prototype._parseImageData=function(t){let i=[];return t.forEach(function(e,l){let o=new I(e,l,this);i.push(o)}.bind(this)),i};m.prototype._computeLayout=function(){let t=parseInt(this.container.clientWidth,10),i=[],e=0,l=0,o=0;this._recomputeMinAspectRatio(),!this.isTransitioning&&this.minAspectRatioRequiresTransition&&(this.isTransitioning=!0,setTimeout(function(){this.isTransitioning=!1},this._getTransitionTimeout()));let u=this._getTransitionString();[].forEach.call(this.images,function(a,w){if(o+=parseFloat(a.aspectRatio),i.push(a),o>=this.minAspectRatio||w+1===this.images.length){o=Math.max(o,this.minAspectRatio);let s=(t-this.settings.spaceBetweenImages*(i.length-1))/o;i.forEach(function(r){let h=s*r.aspectRatio;r.style={width:parseInt(h,10),height:parseInt(s,10),translateX:e,translateY:l,transition:u},e+=h+this.settings.spaceBetweenImages}.bind(this)),i=[],o=0,l+=parseInt(s,10)+this.settings.spaceBetweenImages,e=0}}.bind(this)),this.totalHeight=l-this.settings.spaceBetweenImages};m.prototype._doLayout=function(){this.container.style.height=this.totalHeight+"px";let t=this.scrollDirection==="up"?this.settings.primaryImageBufferHeight:this.settings.secondaryImageBufferHeight,i=this.scrollDirection==="down"?this.settings.secondaryImageBufferHeight:this.settings.primaryImageBufferHeight,e=J(this.container),l=this.scroller===window?window.innerHeight:this.scroller.offsetHeight,o=this.latestYOffset-e-t,u=this.latestYOffset-e+l+i;this.images.forEach(function(a){a.style.translateY+a.style.height<o||a.style.translateY>u?a.hide():a.load()}.bind(this))};m.prototype._getOnScroll=function(){let t=this;return function(){let e=t.scroller===window?window.pageYOffset:t.scroller.scrollTop;t.previousYOffset=t.latestYOffset||e,t.latestYOffset=e,t.scrollDirection=t.latestYOffset>t.previousYOffset?"down":"up",t.inRAF||(t.inRAF=!0,window.requestAnimationFrame(function(){t._doLayout(),t.inRAF=!1}))}};m.prototype.enable=function(){this.onScroll=this._getOnScroll(),this.scroller.addEventListener("scroll",this.onScroll),this.onScroll(),this._computeLayout(),this._doLayout();let t=()=>this.scroller===window?window.innerWidth:this.scroller.offsetWidth;return W.add(function(){this.lastWindowWidth=t(),this._computeLayout(),this._doLayout();let i=t();i!==this.lastWindowWidth&&(this.lastWindowWidth=i,this._computeLayout(),this._doLayout())}.bind(this)),this};m.prototype.disable=function(){return this.scroller.removeEventListener("scroll",this.onScroll),W.disable(),this};function I(t,i,e){return this.existsOnPage=!1,this.aspectRatio=t.aspectRatio,this.filename=t.filename,this.index=i,this.pig=e,this.classNames={figure:e.settings.classPrefix+"-figure",thumbnail:e.settings.classPrefix+"-thumbnail",loaded:e.settings.classPrefix+"-loaded"},this}I.prototype.load=function(){this.existsOnPage=!0,this._updateStyles(),this.pig.container.appendChild(this.getElement()),setTimeout(function(){this.existsOnPage&&(this.thumbnail||(this.thumbnail=new Image,this.thumbnail.src=this.pig.settings.urlForSize(this.filename,this.pig.settings.thumbnailSize),this.thumbnail.className=this.classNames.thumbnail,this.thumbnail.onload=function(){this.thumbnail&&(this.thumbnail.className+=" "+this.classNames.loaded)}.bind(this),this.getElement().appendChild(this.thumbnail)),this.fullImage||(this.fullImage=new Image,this.fullImage.src=this.pig.settings.urlForSize(this.filename,this.pig.settings.getImageSize(this.pig.lastWindowWidth)),this.fullImage.onload=function(){this.fullImage&&(this.fullImage.className+=" "+this.classNames.loaded)}.bind(this),this.getElement().appendChild(this.fullImage)))}.bind(this),100)};I.prototype.hide=function(){this.getElement()&&(this.thumbnail&&(this.thumbnail.src="",this.getElement().removeChild(this.thumbnail),delete this.thumbnail),this.fullImage&&(this.fullImage.src="",this.getElement().removeChild(this.fullImage),delete this.fullImage)),this.existsOnPage&&this.pig.container.removeChild(this.getElement()),this.existsOnPage=!1};I.prototype.getElement=function(){if(!this.element){this.element=document.createElement(this.pig.settings.figureTagName),this.element.className=this.classNames.figure;let t=this.pig.settings.styleForElement(this.filename);this.style&&(this.element.style=t),this.pig.settings.onClickHandler!==null&&this.element.addEventListener("click",function(){this.pig.settings.onClickHandler(this.filename)}.bind(this)),this._updateStyles()}return this.element};I.prototype._updateStyles=function(){this.getElement().style.transition=this.style.transition,this.getElement().style.width=this.style.width+"px",this.getElement().style.height=this.style.height+"px",this.getElement().style.transform="translate3d("+this.style.translateX+"px,"+this.style.translateY+"px, 0)"};function M(t,i){let e=function(){},u=s=>Math.hypot(s[0].pageX-s[1].pageX,s[0].pageY-s[1].pageY);var a={touchstart:{x:-1,y:-1,x2:-1,y2:-1,d:-1},touchmove:{x:-1,y:-1,x2:-1,y2:-1,d:-1},multitouch:!1};a.direction=function(){if(this.touchmove.x==-1)return"";let s=this.touchmove.x-this.touchstart.x;if(Math.abs(s)<50){let r=this.touchmove.y-this.touchstart.y;return Math.abs(r)<50?"":r>0?"down":"up"}return s>0?"right":"left"},a.reset=function(){this.touchstart.x=-1,this.touchstart.y=-1,this.touchmove.x=-1,this.touchmove.y=-1,this.touchstart.d=-1,this.touchmove.d=-1,this.touchstart.x2=-1,this.touchstart.y2=-1,this.touchmove.x2=-1,this.touchmove.y2=-1,this.multitouch=!1},a.update=function(s,r){this.multitouch=this.multitouch||r.length>1,r.length>1&&(this[s.type].d=u(r),this[s.type].x2=r[1].pageX,this[s.type].y2=r[1].pageY),this[s.type].x=r[0].pageX,this[s.type].y=r[0].pageY};let w=function(s,r){let h=1;if(r.length===2){s.scale?h=s.scale:(h=a.touchmove.d/a.touchstart.d,h=Math.round(h*100)/100),h<1&&(h=1);let b=((a.touchmove.x+a.touchmove.x2)/2-(a.touchstart.x+a.touchstart.x2)/2)*2,d=((a.touchmove.y+a.touchmove.y2)/2-(a.touchstart.y+a.touchstart.y2)/2)*2;t.style.transform=`translate3d(${b}px, ${d}px, 0) scale(${h})`,t.style.zIndex=1e3}else t.style.transform="",t.style.zIndex=""};var g=function(s){if(e("event",s.type),typeof s<"u"&&typeof s.touches<"u"){let r=s.touches;switch(s.type){case"touchstart":a.reset(),a.update(s,r);break;case"touchmove":a.update(s,r),w(s,r);break;case"touchend":if(t.style.transform="",!a.multitouch){let h=a.direction();e("direction",h),h&&i(h)}break;default:break}}};t.addEventListener("touchstart",g,{passive:!0}),t.addEventListener("touchmove",g,{passive:!0}),t.addEventListener("touchend",g,{passive:!0})}var P=function(){},K={init:async function(){let t="gallerydeluxe",i="data-gd-image-data-url",e=document.getElementById(t);if(!e)throw new Error(`No element with id ${t} found.`);let l=e.getAttribute(i);if(!l)throw new Error(`No ${i} attribute found.`);let o,u,a=document.getElementById("gd-modal"),w=a.querySelector("#gd-modal-close"),g=function(n){n.preventDefault()},s=document.createElement("div");s.classList.add("gd-modal-content-wrapper"),a.insertBefore(s,a.firstChild);let r=n=>{n&&n.preventDefault(),s.removeEventListener("touchmove",g),s.removeEventListener("gesturestart",g),a.style.display="none",document.body.style.overflow="auto"};w.addEventListener("click",function(){r()});let h=function(n){switch(P("swipe",n),n){case"left":o=o.next,b();break;case"right":o=o.prev,b();break;default:r();break}};M(s,function(n){h(n)}),document.addEventListener("keydown",function(n){switch(n.key){case"ArrowLeft":h("right");break;case"ArrowRight":h("left");break;case"Escape":r(n);break}});let b=()=>{s.addEventListener("touchmove",g),s.addEventListener("gesturestart",g);let n="gd-modal-loaded",c="gd-modal-thumbnail";document.body.style.overflow="hidden";let v=a.querySelectorAll(".gd-modal-content"),T=!1,p=()=>{T||(T=!0,v.forEach(S=>{S.remove()}))};if(o){let S=document.getElementById("gd-modal");if(N){u&&clearTimeout(u);let y=S.querySelector("#gd-modal-exif"),k="gd-modal-exif-ontimeout",R=y.lastElementChild;for(;R;)y.removeChild(R),R=y.lastElementChild;let A=document.createElement("dl");y.appendChild(A);let O=(L,G)=>{let B=document.createElement("dt");B.innerText=Q(L),A.appendChild(B);let F=document.createElement("dd");F.innerText=G,A.appendChild(F)},Y=new Date(o.exif.Date);var $=new Date(Y.getTime()-Y.getTimezoneOffset()*6e4).toISOString().split("T")[0];O("Date",$);let D=o.exif.Tags;for(let L in D)O(L,D[L]);y.classList.remove(k),u=setTimeout(()=>{y.classList.add(k)},1200)}let f=new Image;f.classList.add("gd-modal-content"),f.width=o.width,f.height=o.height,f.style.aspectRatio=o.width/o.height;let x=f.cloneNode(!1);f.classList.add(c),x.src=o.full,f.src=o[20],f.onload=function(){f&&(s.appendChild(f),p())},x.onload=function(){x&&(s.appendChild(x),x.classList.add(n),f&&f.classList.add(n),p())},S.style.display="block"}setTimeout(function(){p()},1e3)},d=await(await fetch(l)).json();H?d=d.map(n=>({value:n,sort:Math.random()})).sort((n,c)=>n.sort-c.sort).map(({value:n})=>n):z&&(d=d.reverse());let E=new Map,C=[];for(let n=0;n<d.length;n++){let c=d[n];c.prev=d[(n+d.length-1)%d.length],c.next=d[(n+1)%d.length],C.push({filename:c.name,aspectRatio:c.width/c.height,image:c}),E.set(c.name,c)}var X={onClickHandler:function(n){P("onClickHandler",n),o=E.get(n),o&&b()},containerId:t,classPrefix:"gd",spaceBetweenImages:1,urlForSize:function(n,c){return E.get(n)[c]},styleForElement:function(n){let c=E.get(n);if(!c||c.colors.size<1)return"";let v=c.colors,T=v[0],p="#ccc";return v.length>1&&(p=v[1]),` background: linear-gradient(15deg, ${T}, ${p});`}};new m(C,X).enable()}};function Q(t){return t.replace(/([A-Z])/g," $1").replace(/^./,function(i){return i.toUpperCase()})}var q=K;q.init();})();
/*! The Pig library is MIT License (MIT) Copyright (c) 2015 Dan Schlosser, see https://github.com/schlosser/pig.js/blob/master/LICENSE.md  */
