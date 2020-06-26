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
document.getElementById("sb").addEventListener("click",searchBill);
document.getElementById("print").addEventListener("click",printDocument);
function searchBill()
{
  document.getElementById('product_list').innerHTML=null;
 var cname= document.getElementById("fname").value;
 var date=document.getElementById("date").value;
 if(cname=="" && date=="")
  {
   alert("Invalid Entry");
  }
  else
  {
   var url="/php/searchBill.php";
 
  var queryString="cname=" + cname + "&date=" + date;
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myArray=JSON.parse(this.responseText);
       if(myArray['response']=="No Bill Found")
       {
         alert("No Bill Found");
       }
       else
       {
       var bno=myArray[0][0];
       var gamount=myArray[0][3];
       var discount=myArray[0][4];
       var roff=myArray[0][5];
       var namount=myArray[0][6];
       var tgst=myArray[0][7];
     for(i=1;i<myArray.length;i++)
     {    //making tr
      var tr=document.createElement('tr');
      tr.style.textAlign='center';
      //making td
      var td1=document.createElement('td');
      var td2=document.createElement('td');
      var td3=document.createElement('td');
      var td4=document.createElement('td');
      var td5=document.createElement('td');
      
     
      var cell1=document.createTextNode(myArray[i].item);
      var cell2=document.createTextNode(myArray[i].qnty);
      var cell3=document.createTextNode(myArray[i].price);
      var cell4=document.createTextNode(myArray[i].gst);
      var cell5=document.createTextNode(myArray[i].tp);


      td1.appendChild(cell1);
      td2.appendChild(cell2);
      td3.appendChild(cell3);
      td4.appendChild(cell4);
      td5.appendChild(cell5);


      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);

      document.getElementById('product_list').appendChild(tr);
    }
    document.querySelector(".billContainer").style.visibility="unset";
     document.getElementById("bn").innerText=bno;
     document.getElementById("Billcname").innerText=cname;
     document.getElementById("Billdate").innerText=date;
     document.getElementById("cgst").innerText=tgst/2;
     document.getElementById("sgst").innerText=tgst/2;
     document.getElementById("gamount").innerText=gamount;
     document.getElementById("discount").innerText=discount;
     document.getElementById("roff").innerText=roff;
     document.getElementById("namount").innerText=namount;

     document.getElementById("fname").value="";
     document.getElementById("date").value="";

       
  }
    
  }
  };
  
  xhttp.open("POST",url, true);
 
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(queryString);
  
  }
 
}
function printDocument()
{
  navBar.style.display="none";
  document.querySelector('.container').style.display='none';
  document.getElementById("print").style.display='none';
  document.getElementById("gamount").style.marginLeft='6%';
  document.querySelector('.pgHeader').innerHTML='Maa Manasa Medical Store';
  window.print();
  location.reload();
}
