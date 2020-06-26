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
     var txt="";
     var sl_no=1;
    var xmlhttp = new XMLHttpRequest();
 xmlhttp.onload = function() {
if (this.readyState == 4 && this.status == 200) {
 var myArray=JSON.parse(this.responseText);
 
 for(i=0;i<myArray.length;i++)
 {    //making tr
      var tr=document.createElement('tr');
      tr.style.textAlign='center';
      //making td
      var td1=document.createElement('td');
      var td2=document.createElement('td');
      var td3=document.createElement('td');
      var td4=document.createElement('td');
      var td5=document.createElement('td');
      var td6=document.createElement('td');
      var td7=document.createElement('td');
      //set id to
      td2.id="item"+sl_no;
      td3.id="qnty"+sl_no;
      td4.id="edate"+sl_no;
      td5.id="batch"+sl_no;
      td6.id="stk"+sl_no;
      td1.style.border='1px solid rgb(0, 90, 235)';
      td2.style.border='1px solid rgb(0, 90, 235)';
      td3.style.border='1px solid rgb(0, 90, 235)';
      td4.style.border='1px solid rgb(0, 90, 235)';
      td5.style.border='1px solid rgb(0, 90, 235)';
      td6.style.border='1px solid rgb(0, 90, 235)';
      //making button
        
          var btn2=document.createElement('button');//delete
        
      //set id to button
      
      btn2.id="delete"+sl_no;
      
      //making textNode 
      var cell1=document.createTextNode(sl_no);
      var cell2=document.createTextNode(myArray[i].item);
      var cell3=document.createTextNode(myArray[i].qnty);
      var cell4=document.createTextNode(myArray[i].expiry_date);
      var cell5=document.createTextNode(myArray[i].batch_no);
      var cell6=document.createTextNode(myArray[i].stokist);
     
      var cell5_2=document.createTextNode('Return');
     
      //appending textNode to Button
     
      btn2.appendChild(cell5_2);
     
     
      
      
      //appending textnode and button to td
      td1.appendChild(cell1);
      td2.appendChild(cell2);
      td3.appendChild(cell3);
      td4.appendChild(cell4);
      td5.appendChild(cell5);
      td6.appendChild(cell6);
      
      td7.appendChild(btn2);
   //appending td to tr
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tr.appendChild(td7);
    //appending tr to table body
   document.getElementById('table-container').appendChild(tr);
 
   document.getElementById(btn2.id).onclick = deleteBtn_click;
  sl_no++;
 }
 

}
 };
 xmlhttp.open("GET", url, true);
xmlhttp.send();
}

loadDoc('/php/nearExpire.php');
//     function reload()
//      {
//        window.print();
//       location.reload();
//      }  
     var deleteBtn_click=function()
     {
        
        //Slno
        var rowId = this.id.slice(6);
        //td id
        var item= document.getElementById("item"+rowId).innerText ;
        var qnty=  document.getElementById("qnty"+rowId).innerText ;
        var edate= document.getElementById("edate"+rowId).innerText ;
        var batch= document.getElementById("batch"+rowId).innerText ;
        var stk=   document.getElementById("stk"+rowId).innerText ;
         deleteItem(item,qnty,edate,batch,stk);
         loadDoc('/php/getAllItems.php');
     }
     function deleteItem(item,qnty,edate,batch,stk)
     {
        var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       
        //location.reload(true);
        location.reload();
        alert("Product to be Returned");
      }
    };
    var queryString = "item_name=" + item + "&qnty=" + qnty + "&edate=" + edate + "&batch=" + batch + "&stk=" + stk;
    xhttp.open("POST","/php/returnItem.php", true);
   // xhttp.send();
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(queryString);
     }