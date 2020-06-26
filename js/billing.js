
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

var mb=document.getElementById("mb");
var sb=document.getElementById("sb");
var rf=document.getElementById("rf");

mb.addEventListener('click',()=>
{
 window.location.href="/html/makeBill.html";
})
sb.addEventListener('click',()=>
{
 window.location.href="/html/searchBill.html";
})
rf.addEventListener('click',()=>
{
 window.location.href="/html/refund.html";
})

