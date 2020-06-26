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


function loadDoc(url)
{
    
     var sl_no=1;
    var xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
 var myArray=JSON.parse(this.responseText);
 
for(var i=0;i<myArray.length;i++)
{
     
     //making tr
  var tr=document.createElement("tr");
  tr.style.textAlign='center';

  //making td
  var td1=document.createElement('td');
  var td2=document.createElement('td');
  var td3=document.createElement('td');

  td1.style.border='1px solid rgb(0, 90, 235)';
   

  td2.style.border='1px solid rgb(0, 90, 235)';
   
   

   td3.style.border='1px solid rgb(0, 90, 235)';
  
   
   var cell1=document.createTextNode(sl_no);
   var cell2=document.createTextNode(myArray[i].item);
   var cell3=document.createTextNode(myArray[i].qnty);
   td1.appendChild(cell1);
   td2.appendChild(cell2);
   td3.appendChild(cell3);
   
   tr.appendChild(td1);
   tr.appendChild(td2);
   tr.appendChild(td3);
   document.getElementById("tb").appendChild(tr);
   sl_no++;


}



}
 };
 xmlhttp.open("GET", url, true);
xmlhttp.send();
}

loadDoc('/php/outofStock.php');
function reload()
     {
      document.getElementById("printButton").style.display="none";
      navBar.style.display="none";
      window.print();
      location.reload();
     }  