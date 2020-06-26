
var burger=document.querySelector('.burger');
var navBar=document.querySelector('.navbar');
var navList=document.querySelector('.nav-list');
var sname=document.querySelector('.shop-name');
burger.addEventListener('click',()=>
{
 navList.classList.toggle('v-class-res');
 navBar.classList.toggle('h-nav-res');
 sname.classList.toggle('shop-res');
})

var as=document.getElementById("as");
var mb=document.getElementById("cs");
var os=document.getElementById("os");
var ne=document.getElementById("ne");

as.addEventListener('click',()=>
{
 window.location.href="/html/addProduct.html";
})
cs.addEventListener('click',()=>
{
 window.location.href="/html/currentStock.html";
})
os.addEventListener('click',()=>
{
 window.location.href="/html/outofStock.html";
})
ne.addEventListener('click',()=>
{
 window.location.href="/html/nearExpire.html";
})

 