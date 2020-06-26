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
     var txt="",sl_no=1;
     
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
      //set id to
      td2.id="item"+sl_no;
      td3.id="qnty"+sl_no;
      td4.id="price"+sl_no;
      //making button
        //var btn1=document.createElement('button');//edit
          var btn2=document.createElement('button');//delete
        //var btn3=document.createElement('button');//save
      //set id to button
      // btn1.id="edit"+sl_no;
      btn2.id="delete"+sl_no;
      //btn3.id="save"+sl_no;
      //making textNode 
      var cell1=document.createTextNode(sl_no);
      var cell2=document.createTextNode(myArray[i].item);
      var cell3=document.createTextNode(myArray[i].qnty);
      var cell4=document.createTextNode(myArray[i].price);
     // var cell5_1=document.createTextNode('Edit');
      var cell5_2=document.createTextNode('Delete');
     // var cell5_3=document.createTextNode('Save');
      //appending textNode to Button
     // btn1.appendChild(cell5_1);
      btn2.appendChild(cell5_2);
     // btn3.appendChild(cell5_3);

     
      
      //making invisible to save button
      //btn3.style.display='none';
      //appending textnode and button to td
      td1.appendChild(cell1);
      td2.appendChild(cell2);
      td3.appendChild(cell3);
      td4.appendChild(cell4);
      //td5.appendChild(btn1);
      // td5.appendChild(btn3);
      td5.appendChild(btn2);
   //appending td to tr
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
    //appending tr to table body
   document.getElementById('table-container').appendChild(tr);
  // document.getElementById(btn1.id).onclick = editBtn_click;
   document.getElementById(btn2.id).onclick = deleteBtn_click;
  // document.getElementById(btn3.id).onclick = saveBtn_click;
    sl_no++;
 }
 
 
 
}

};
xmlhttp.open("GET", url, true);
xmlhttp.send();
   }
   

   loadDoc('/php/getAllItems.php');
    
   // var editBtn_click=function()
   // {
   //    //Slno
   //    var rowId = this.id.slice(4);
   //    //td id
   //    var itemId="item"+rowId;
   //    var qntyId="qnty"+rowId;
   //    var priceId="price"+rowId;

   //    var saveId="save"+rowId;

   //    document.getElementById(saveId).style.display='inline';//back to display save button
   //    document.getElementById(this.id).style.display='none';//removing display edit button

   //    // document.getElementById(itemId).setAttribute('contenteditable','true');//make editable
   //    // document.getElementById(itemId).style.border='2px solid rgb(0, 90, 235)';//add style to focus
     
   //    document.getElementById(priceId).setAttribute('contenteditable','true');//make editable
   //    document.getElementById(priceId).style.border='2px solid rgb(0, 90, 235)';//add style to focus

   //    document.getElementById(qntyId).setAttribute('contenteditable','true');//make editable
   //    document.getElementById(qntyId).style.border='2px solid rgb(0, 90, 235)';//add style to focus
   //    document.getElementById(qntyId).focus();//add focus
      
      
   //    //alert("Button clicked id: "+this.id+"  row:"+rowId+"  itemId:"+itemId+"  text: "+this.innerHTML);
      
   // }
   var deleteBtn_click=function()
   {
      
      //Slno
      var rowId = this.id.slice(6);
      //td id
      var itemId="item"+rowId;
       deleteItem(document.getElementById(itemId).innerText);
       loadDoc('/php/getAllItems.php');
   }
//    var saveBtn_click=function()
//    {
//       //Slno
//       var rowId = this.id.slice(4);
//       //td id
//       var itemId="item"+rowId;
//       var qntyId="qnty"+rowId;
//       var priceId="price"+rowId;
//       //edit button Id
//       var editId="edit"+rowId;
      

//       document.getElementById(editId).style.display='inline';//back to display edit button
//       document.getElementById(this.id).style.display='none'; //removing display delete button

//       // document.getElementById(itemId).setAttribute('contenteditable','false');//make uneditable
//       // document.getElementById(itemId).style.border='1px solid black';//back to unfocus style

//       document.getElementById(qntyId).setAttribute('contenteditable','false');//make uneditable
//       document.getElementById(qntyId).style.border='1px solid black';//back to unfocus style

//       document.getElementById(priceId).setAttribute('contenteditable','false');//make uneditable
//       document.getElementById(priceId).style.border='1px solid black';//back to unfocus style

//       updateItemDetails(document.getElementById(itemId).innerText,document.getElementById(itemId).innerText,document.getElementById(qntyId).innerText,document.getElementById(priceId).innerText);

      
//    }
//    function updateItemDetails(itemN,itemO,qnty,price)
//    {
//       var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       alert("Updated Item-Details");
//     }
//   };
//   var queryString = "item_name1=" + itemN + "&item_name2=" + itemO + "&price=" + price + "&qnty=" + qnty;
//   xhttp.open("POST","updateItem.php", true);
//  // xhttp.send();
//   xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhttp.send(queryString);
//    }
   function deleteItem(item)
   {
      var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
      location.reload(true);
      alert("Product Deleted");
    }
  };
  var queryString = "item_name=" + item;
  xhttp.open("POST","/php/deleteItem.php", true);
 // xhttp.send();
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(queryString);
   }
   
  
