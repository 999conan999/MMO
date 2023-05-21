
history.pushState(null, null, location.href);
window.onpopstate = function(event) {
    history.go(1);
};
document.getElementById("menu-mb").addEventListener("click", () => { 
    document.getElementById("set-menu").classList.remove("hide-menu");
    document.getElementById("set-menu").classList.add("show-menu");
 });
try{
let ww = document.getElementsByClassName("danhdev-product")[0].offsetWidth;
var imgElements = document.querySelectorAll(".zz");
imgElements.forEach(e => {
    e.style.height = (ww - 2) + "px";
});
let wz = document.getElementById("cccx").offsetWidth;
var uu = document.getElementById("ccck").style.height = wz + 'px';
 }catch(e){}
function hide_menu(){
    document.getElementById("set-menu").classList.add("hide-menu");
    document.getElementById("set-menu").classList.remove("show-menu");
    document.getElementById("set-menu").classList.remove("menu-mt");
    window.toggle_menu=false;
}
function toggle_menu_destop(){
    console.log("🚀 ~ file: script-js.js:26 ~ toggle_menu_destop ~ window.toggle_menu:", window.toggle_menu)

    if(window.toggle_menu==undefined||window.toggle_menu==false){
        document.getElementById("set-menu").classList.add("menu-mt");
        window.toggle_menu=true;
    }else{
        document.getElementById("set-menu").classList.remove("menu-mt");
        window.toggle_menu=false;
    }
}

function set_kt(data,id){
    document.getElementById("price_og").innerHTML=(Number(data.g_og)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    document.getElementById("ktz").innerHTML=data.kt;
    document.getElementById("pricez").innerHTML=(Number(data.g_sale)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    remove_class_by_class("btnz");
    document.getElementById("kt_"+id).classList.add("checked");
    window.data.size=data.kt;
    window.data.price=data.g_sale;
    localStorage.setItem("order_2",JSON.stringify(window.data));
}
function remove_class_by_class(triger){
    var testarray = document.getElementsByClassName(triger);
    for(var i = 0; i < testarray.length; i++)
    {
        testarray[i].classList.remove("checked");
    }
}
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });