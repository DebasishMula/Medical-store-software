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
   
    
      
    //create main div
   var mainDiv=document.createElement('div');
   mainDiv.className="sContainer";

   //create div for patient name
   var div1=document.createElement('div');
   div1.className="rowContainer";
   var span11=document.createElement('span');
   span11.className="stitle"
   span11.innerText="Paitient Name: ";
   var span12=document.createElement('span');
   span12.id="pname"+sl_no;
   span12.innerText=myArray[i].pname;
   div1.appendChild(span11);
   div1.appendChild(span12);

   
    //create div for address
   var div2=document.createElement('div');
   div2.className="rowContainer";
   var span21=document.createElement('span');
   span21.className="stitle"
   span21.innerText="Address: ";
   var span22=document.createElement('span');
   span22.id="add"+sl_no;
   span22.innerText=myArray[i].address;
   div2.appendChild(span21);
   div2.appendChild(span22);

   //create div for mobile
   var div3=document.createElement('div');
   div3.className="rowContainer";
   var span31=document.createElement('span');
   span31.className="stitle"
   span31.innerText="Mobile: ";
   var span32=document.createElement('span');
   span32.id="mobile"+sl_no;
   span32.innerText=myArray[i].mobile;
   div3.appendChild(span31);
   div3.appendChild(span32);

   //create div for prescription
   var div4=document.createElement('div');
   div4.className="rowContainer";
   var a=document.createElement('a');
   a.setAttribute("href","../prescription/"+myArray[i].mobile);
   a.innerHTML="Download Prescription";
   div4.appendChild(a);

   //create div for delete
   var div5=document.createElement('div');
   div5.className="bContainer";
   var db=document.createElement('button');
   db.id="delete"+sl_no;
   db.innerHTML="Delete";
   db.style.float="right";
   db.style.padding="2px 5px";
   db.style.cursor="pointer";
   div5.appendChild(db);
   
   mainDiv.appendChild(div1);
   mainDiv.appendChild(div2);
   mainDiv.appendChild(div3);
   mainDiv.appendChild(div4);
   mainDiv.appendChild(div5)

   document.querySelector(".container").appendChild(mainDiv);
   document.getElementById(db.id).onclick = deleteBtn_click;
   sl_no++;


}



}
 };
 xmlhttp.open("GET", url, true);
xmlhttp.send();
}
var deleteBtn_click=function()
   {
      
      //Slno
      var rowId = this.id.slice(6);
      //td id
      var pname=document.getElementById("pname"+rowId).innerText ;
      var address=document.getElementById("add"+rowId).innerText ;
      var mobile=document.getElementById("mobile"+rowId).innerText ;

       deleteItem(pname,address,mobile);
       loadDoc('/php/orderRequest.php');
   }
   function deleteItem(pname,address,mobile)
   {
      var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
      location.reload(true);
      alert("OrderRequest Deleted");
    }
  };
  var queryString = "pname=" + pname + "&address=" + address + "&mobile=" + mobile;
  xhttp.open("POST","/php/deleteOR.php", true);
 // xhttp.send();
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(queryString);
   }
loadDoc('/php/orderRequest.php');