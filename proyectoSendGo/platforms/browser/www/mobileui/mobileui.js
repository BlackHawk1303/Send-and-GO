/*component-base*/var userAgent=navigator.userAgent||navigator.vendor||window.opera,SO={name:"unknown",code:0};/android/i.test(userAgent)&&(SO.name="Android",SO.class="platform-android",SO.code=1);/iPad|iPhone|iPod/.test(userAgent)&&!window.MSStream&&(SO.name="iOS",SO.class="platform-ios",SO.code=2);/windows phone/i.test(userAgent)&&(SO.name="Windows Phone",SO.class="platform-wp",SO.code=3);SO.class&&document.getElementsByTagName("body").length&&(document.getElementsByTagName("body")[0].className+=" "+SO.class);


/*component-button*/document.addEventListener("click",function(e){if(1!==SO.code)return!1;var t=e.target;if("button"!==t.tagName.toLowerCase())return!1;var o=t.getBoundingClientRect(),s=t.querySelector(".ripple");s||((s=document.createElement("span")).className="ripple",s.style.height=s.style.width=Math.max(o.width,o.height)+"px",t.appendChild(s)),s.classList.remove("show");var a=e.pageY-o.top-s.offsetHeight/2-document.body.scrollTop,l=e.pageX-o.left-s.offsetWidth/2-document.body.scrollLeft;return s.style.top=a+"px",s.style.left=l+"px",s.classList.add("show"),!1},!1);
/*component-include*/window.include=function(n,e,t){e.indexOf(".html")<0&&(e+=".html");var i=new XMLHttpRequest;i.onload=function(){if(4==this.readyState){var e=this.responseText,i="string"==typeof n?document.getElementById(n):n;console.log(i),i&&(i.innerHTML=e),t&&t()}},i.open("GET",e+"?cache="+(new Date).getTime(),!0),i.send()},window.bindIncludeEvent=function(){document.querySelectorAll("[include]").forEach(function(n,e){window.include(n,n.getAttribute("include"))})},window.bindIncludeEvent(),document.addEventListener("openPage",function(){window.bindIncludeEvent()});/*component-input*/!function e(){setTimeout(function(){var t=document.getElementsByTagName("input");for(i in t){var a=t[i].parentNode;a&&(a.className.indexOf("left")>=0||a.className.indexOf("right")>=0)&&a.parentNode.className.indexOf("item")>=0&&(a=a.parentNode),a&&a.className.indexOf("item")>=0&&a.className.indexOf("bind-input-event-click")<0&&(a.className+=" bind-input-event-click",a.addEventListener("click",function(){this.getElementsByTagName("input").length&&(this.getElementsByTagName("input")[0].focus(),"radio"!==this.getElementsByTagName("input")[0].type||this.getElementsByTagName("input")[0].disabled||(this.getElementsByTagName("input")[0].checked=!0))},!1))}var l=document.getElementsByClassName("label-float");for(i in l)l[i].className&&l[i].className.indexOf("bind-input-event-focus")<0&&l[i].querySelectorAll("input,textarea").length&&(l[i].className+=" bind-input-event-focus",l[i].querySelectorAll("input,textarea")[0].addEventListener("focus",function(){this.parentNode.getElementsByTagName("label").length&&this.parentNode.getElementsByTagName("label")[0].className.indexOf("focus")<0&&(this.parentNode.getElementsByTagName("label")[0].className+=" focus")},!1),l[i].querySelectorAll("input,textarea")[0].addEventListener("blur",function(){this.parentNode.getElementsByTagName("label").length&&this.parentNode.getElementsByTagName("label")[0].className&&!this.value.length&&(this.parentNode.getElementsByTagName("label")[0].className=this.parentNode.getElementsByTagName("label")[0].className.replace("focus",""))},!1),l[i].querySelectorAll("input,textarea")[0].value&&l[i].querySelectorAll("input,textarea")[0].value.length&&(l[i].querySelectorAll("input,textarea")[0].parentNode.getElementsByTagName("label")[0].className+=" focus"));e()},500)}();
/*component-menu*/window.menu={},window.openMenu=function(e){var n=e;if((e=document.getElementById(e)).className.indexOf("menu")>=0&&e.className.indexOf("open")<0){var o=document.createElement("div");if(o.className="backdrop backdrop-menu",e.parentNode.appendChild(o),setTimeout(function(){o.className+=" show"}),o.addEventListener("click",function(e){window.closeMenu(n)},!1),2===SO.code){e.style.height=window.innerHeight+"px";var d=" side-menu";if(window.menu.position="left",e.className.indexOf("menu-right")>=0){d=" side-menu-right",window.menu.position="right";var a=document.getElementsByClassName("header");if(a.length)for(i in a)a[i].className&&a[i].className.indexOf("side-menu-right")<0&&(a[i].className+=" side-menu-right")}e.parentNode.className.indexOf("body")>=0?e.parentNode.className+=d:document.getElementsByTagName("body")[0].className+=d}e.className+=" open";var t=new CustomEvent("openMenu",{detail:{menu:n}});document.dispatchEvent(t),window.menu.openFired=!0,document.addEventListener("firedCloseMenu",function(e){window.closeMenu(n)},!1)}},window.closeMenu=function(e){var n=e;if((e=document.getElementById(e)).className.indexOf("open")<0)return!1;var o=new CustomEvent("closeMenu",{detail:{menu:n}});document.dispatchEvent(o),window.menu.openFired=!1,e.className=e.className.replace("open","");var d=document.getElementsByClassName("header");if(d.length)for(i in d)d[i].className&&d[i].className.indexOf("side-menu-right")>=0&&(d[i].className=d[i].className.replace(" side-menu-right",""));var a=e.parentNode.getElementsByClassName("backdrop-menu");a&&a.length&&((a=a[0]).className=a.className.replace("show",""),setTimeout(function(){a&&a.parentNode&&a.parentNode.removeChild(a)},500)),1!==SO.code&&(e.parentNode.className.indexOf("body")>=0?e.parentNode.className=e.parentNode.className.replace("side-menu",""):document.getElementsByTagName("body")[0].className=document.getElementsByTagName("body")[0].className.replace("side-menu",""))},document.querySelector("body").addEventListener("touchstart",function(e){window.menu.xDown=e.touches[0].clientX,window.menu.yDown=e.touches[0].clientY},!1),window.menu.handleTouchMove=function(e,n){if(window.menu.xDown&&window.menu.yDown){var o=e.touches[0].clientX,i=e.touches[0].clientY;if(window.menu.xDiff=window.menu.xDown-o,window.menu.yDiff=window.menu.yDown-i,Math.abs(window.menu.xDiff)>Math.abs(window.menu.yDiff)){var d=-1!==document.getElementById(n).classList.value.indexOf("menu-right");window.menu.xDiff>0?d&&!window.menu.openFired?window.openMenu(n):!d&&window.menu.openFired&&window.closeMenu(n):d||window.menu.openFired?d&&window.menu.openFired&&window.closeMenu(n):window.openMenu(n)}window.menu.xDown=null,window.menu.yDown=null}},window.menu.enableSwiper=function(e){document.querySelector("body").addEventListener("touchmove",function(n){window.menu.handleTouchMove(n,e)},!1)};
/*component-page*/window.PAGE={handePage:100},document.addEventListener("deviceready",function(){document.addEventListener("backbutton",function(e){if(window.disabledBackButton)return e.preventDefault();var t=document.getElementsByClassName("box-block");t.length?(e.preventDefault(),window.backPage(t[t.length-1].id)):navigator.app.exitApp()},!1)},!1),window.dispatch=function(e,t){return(e="function"==typeof e?e:window[e]).apply(this,t||[])},window.openPage=function(e,t,n){if(2===arguments.length&&(n=t),e.indexOf(".html")<0&&(e+=".html"),document.getElementById(e)){var a=document.getElementsByClassName("box-block");if(a[a.length-1].id===document.getElementById(e).id)return!1;document.getElementById(e).parentNode.removeChild(document.getElementById(e))}var s=new XMLHttpRequest;s.onload=function(){if(4==this.readyState){var a=this.responseText;a=a.replace("backPage()","backPage('"+e+"')");var s=document.getElementsByTagName("body")[0];document.getElementsByClassName("body").length&&(s=document.getElementsByClassName("body")[0]);var d=document.createElement("div");d.setAttribute("class","box-block"),d.setAttribute("id",e),d.innerHTML=a,s.appendChild(d),function(){window.PAGE.handePage++;var a="z-index:"+window.PAGE.handePage,s=";transform: translateY(0px);will-change: transform, -webkit-transform, opacity;transition-duration: 280ms;transition-timing-function: cubic-bezier(0.36,0.66,0.04,1);";2===SO.code&&(s=";transform: translateX(0px);transition-duration: 280ms;"),window.disabledOpenPageEffect&&(s=";opacity: 1;top: 0;");var d=document.getElementById(e).getElementsByClassName("page")[0].getAttribute("style");d?d+=" "+a+s:d=a+s,document.getElementById(e).getElementsByClassName("page")[0].setAttribute("style",d),n&&window.dispatch(n,[t]);var o=document.getElementById(e).getElementsByClassName("page")[0].getAttribute("class");o+=" show";var l=function(){setTimeout(function(){document.getElementById(e)&&document.getElementById(e).querySelectorAll(".page").length?i():l()},10)};l();var m=new CustomEvent("openPage",{detail:{page:e}});document.dispatchEvent(m);var i=function(){setTimeout(function(){document.getElementById(e).getElementsByClassName("page")[0].setAttribute("class",o),setTimeout(function(){var t=document.getElementById(e).getElementsByClassName("page")[0].getAttribute("style");t=t.replace(s,""),document.getElementById(e).getElementsByClassName("page")[0].setAttribute("style",t)},280)},100)}}()}},s.open("GET",e+"?cache="+(new Date).getTime(),!0),document.dispatchEvent(new Event("firedCloseMenu")),s.send()},window.backPage=function(e){if(!e){for(var t=document.querySelectorAll(".page.show"),n={zIndex:-1},a=0;a<t.length;a++){var s=Number(t[a].style.zIndex);n.zIndex<s&&(n.zIndex=s,n.element=t[a])}n.zIndex&&(e=n.element.parentElement.id)}document.getElementById(e).getElementsByClassName("page")[0];var d=";transform: translateY(0px);will-change: transform, -webkit-transform, opacity;transition-duration: 280ms;";window.disabledOpenPageEffect&&(d="");var o=document.getElementById(e).getElementsByClassName("page")[0].getAttribute("style");o?o+=" "+d:o=d,document.getElementById(e).getElementsByClassName("page")[0].setAttribute("style",o);var l=document.getElementById(e).getElementsByClassName("page")[0].getAttribute("class");l+=l.replace("show",""),document.getElementById(e).getElementsByClassName("page")[0].setAttribute("class",l);var m=new CustomEvent("backPage",{detail:{page:e}});document.dispatchEvent(m),setTimeout(function(){var t=document.getElementById(e);t.parentElement.removeChild(t)},window.disabledOpenPageEffect?0:280)};