
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
var mb=document.getElementById("mb");
var os=document.getElementById("os");
var or=document.getElementById("or");
as.addEventListener('click',()=>
{
 window.location.href="/html/addProduct.html";
})
mb.addEventListener('click',()=>
{
 window.location.href="/html/makeBill.html";
})
os.addEventListener('click',()=>
{
 window.location.href="/html/outofStock.html";
})
or.addEventListener('click',()=>
{
 window.location.href="/html/orderRequest.html";
})
