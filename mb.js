var pNo=1,rNo=1, items = [],tAmount=0,discountValue=0,tGst=0;
//Adding listner to Add Product button
document.getElementById("apB").addEventListener("click",addProduct);
//Adding input listner to discount 
document.getElementById("dinput").addEventListener("input",discountCalculation);
//Adding listner to Generate Bill Button
document.getElementById("gnBill").addEventListener("click",generateBill);

function addProduct()
{
  
  billingitemInfo();
 
  
  

}

 function makeNewProduct()
 {
  //making tr
  var tr=document.createElement("tr");
  tr.id="row"+pNo;
  tr.style.textAlign='center';
  
   //making td
   var td1=document.createElement('td');
   var td2=document.createElement('td');
   var td3=document.createElement('td');
   var td4=document.createElement('td');
   var td5=document.createElement('td');
   var td6=document.createElement('td');
   var td7=document.createElement('td');
   //adding style to td 
  
   td2.style.border='1px solid rgb(0, 90, 235)';
   td2.style.backgroundColor='#f1f1f1';
   ;

   td3.style.border='1px solid rgb(0, 90, 235)';
   td3.style.backgroundColor='#f1f1f1';
   

   td4.style.border='1px solid rgb(0, 90, 235)';
   td4.style.backgroundColor='#f1f1f1';
  

   td5.style.border='1px solid rgb(0, 90, 235)';
   td5.style.backgroundColor='#f1f1f1';
  

   td6.style.border='1px solid black';
   
   //add id to td
   td1.id="item"+pNo;
   td2.id="bno"+pNo;
   td3.id="qnty"+pNo;
   td4.id="price"+pNo;
   td5.id="gst"+pNo;
   td6.id="tprice"+pNo;
   //making  button
  var btn=document.createElement('button');
  // adding style to btn
  btn.style.background='transparent';
  btn.style.color='rgb(202, 211, 187)';
  btn.style.borderColor='rgb(202, 211, 187)';
  btn.style.borderStyle='solid';
  btn.style.cursor='pointer';
  //add id to btn
  btn.id="delete"+pNo;
  //makimg an image
  var image=document.createElement('img');
  //adding style to image
  image.style.height='20px';
  image.style.width='20px';
  
  //setting image path
  image.setAttribute("src","/images/delete.png");
  //add image to button
  btn.appendChild(image);
  //
  td7.appendChild(btn);  

  //making td to editable except total price
  
  td2.setAttribute('contenteditable',true);
  td3.setAttribute('contenteditable',true);
  td4.setAttribute('contenteditable',true);
  td5.setAttribute('contenteditable',true);
  
   //making input for td1
   var input = document.createElement("input");
   input.id="pinput"+pNo;
   input.setAttribute("class", "priceInput");
   td1.appendChild(input);
  
   //adding td to tr
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  tr.appendChild(td7);
  
  //adding tr to table body
  document.getElementById("product_list").appendChild(tr);
  //get focus to item td
  tdFocus(pNo);

 chkGst(document.getElementById(td5.id));
 chkPrice(document.getElementById(td4.id));
 chkQnty(document.getElementById(td3.id));
 chkbatch(document.getElementById(td2.id));
 chkItem(document.getElementById(input.id));
 removeProduct(document.getElementById(btn.id));
 autocomplete(document.getElementById(input.id), items);
 
 
 }
 function billingitemInfo()
{
   if(rNo==1)
   {
     //insert  Bill details to Billing
      var cname=document.getElementById("fname").value;
      var date=document.getElementById("date").value;
      if(cname==""||date=="")
      {
        alert("Enter Customar Name And Date First");
      }
      else{
        var url="addBilling.php";
        var queryString="cname=" + cname + "&date=" + date;
        sentDetails(url,queryString);
        makeNewProduct();
        pNo++;
        rNo++;
      }
     
   }
   else
   {
     
      makeNewProduct();
      pNo++;
      rNo++;
     }
     
   
}
function tdFocus(pNo)
{
   document.getElementById("pinput"+pNo).focus();
}
function totalPriceCalculation(slno)
{
  
    
    var qntyId="qnty"+slno;
    var priceId="price"+slno;
    var gstId="gst"+slno;
    var tpriceId="tprice"+slno;

    
     //if total price is not empty
    if(document.getElementById(tpriceId).innerText!="")
    {
      //editing total Amount
      tAmount-=document.getElementById(tpriceId).innerText;
    }
      
       if(document.getElementById(qntyId).innerText!="" && document.getElementById(priceId).innerText!="" && document.getElementById(gstId).innerText!="")
       {
             var qnty=parseInt(document.getElementById(qntyId).innerText,10);
             var price=parseInt(document.getElementById(priceId).innerText,10);
             var gst=parseInt( document.getElementById(gstId).innerHTML,10);
             var tprice=((100+gst)/100)*price*qnty;
             document.getElementById(tpriceId).innerText=parseFloat(tprice).toFixed(2);
              tAmount+=tprice;
             document.getElementById("tAmount").innerHTML=parseFloat(tAmount).toFixed(2);;
             //editing discount
             if(document.getElementById("dinput").value!="")
             {
               discountCalculation();
             }
            
            
       }
  
   
}
function sentDetails(url,queryString)
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
    }
  };
  
  xhttp.open("POST",url, true);
 
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(queryString);
}
function getDetails(url,cfunction)
{
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cfunction(this);
      
    
     
    }
    
  };
  
  xhttp.open("GET",url, true);
 
  xhttp.send();
  
 
}

function getItemNames(xhhtp)
{
 
  var myArray=JSON.parse(xhhtp.responseText);
  for( var i=0;i<myArray.length;i++)
  {
    items[i]=myArray[i].item;
     
  }
  
}
   // get all Product Name
   getDetails("getAllItems.php",getItemNames);
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      var slist=document.getElementById("slist");
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete");
      a.setAttribute("class", "autocomplete");
      /*append the DIV element as a child of the autocomplete container:*/
      slist.appendChild(a);
      
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
         var b = document.createElement("DIV");
          b.setAttribute("class","autocomplete-items");
         
          /*make the matching letters bold:*/
          b.innerHTML += "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              //clearing batch field
              sl_no=inp.id.slice(6);
              document.getElementById("bno"+sl_no).innerText="";
              //clearing qnty field
               document.getElementById("qnty"+sl_no).innerText="";
               //making the right color
               inp.style.backgroundColor='rgb(241, 241, 241)';
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
          
        }
       
      }
  });
  
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete");
    for (var i = 0; i < x.length; i++) {
      x[i].parentNode.removeChild(x[i]);
    
  }
}
 

 /*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}
function chkbatch(batchField)
{
  batchField.addEventListener("input",function(e)
  {
    var batch=batchField.innerText;
   var sl_no=this.id.slice(3);
  //clearing qnty field
  document.getElementById("qnty"+sl_no).innerText="";
  var url="/php/chkbatch.php";
  var item=document.getElementById("pinput"+sl_no).value;
  var queryString="item=" + item + "&batch=" + batch;
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myArray=JSON.parse(this.responseText);
      var msg=myArray['message'];
      console.log(msg);
      if(msg=="not exist")
      {
        batchField.style.backgroundColor='darksalmon';
      }
      else{
        batchField.style.backgroundColor='rgb(241, 241, 241)';
      }
    }
  };
  
  xhttp.open("POST",url, true);
 
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(queryString);
  });
   
}
function chkItem(itemField)
{
  itemField.addEventListener("input",function(e)
  {
    var item=itemField.value;
   var sl_no=this.id.slice(6); 
  //clearing batch field
  document.getElementById("bno"+sl_no).innerText="";
  //clearing qnty field
  document.getElementById("qnty"+sl_no).innerText="";

  var url="/php/chkItem.php";
  var queryString="item=" + item;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myArray=JSON.parse(this.responseText);
      var msg=myArray['message'];
      console.log(msg);
      if(msg=="not exist")
      {
        itemField.style.backgroundColor='darksalmon';
      }
      else{
        itemField.style.backgroundColor='rgb(241, 241, 241)';
      }
    }
  };
  
  xhttp.open("POST",url, true);
 
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(queryString);

  });
 
   
}
function chkQnty(qntyField)
{
  qntyField.addEventListener("input",function(e)
  {
    var url="/php/chkQnty.php";
    var qnty= qntyField.innerText;
    var slno=this.id.slice(4);
    var item=document.getElementById("pinput"+slno).value;
    var batch= document.getElementById("bno"+slno).innerText;
    var queryString="item=" + item + "&batch=" + batch + "&qnty=" + qnty;
    if(!/^[0-9]+$/.test(qnty)){
      qntyField.style.backgroundColor='darksalmon';
    }
    else
    {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myArray=JSON.parse(this.responseText);
        var msg=myArray['message'];
        console.log(msg);
        if(msg=="insufficient")
        {
          alert("Insufficient Product Quantity");
          qntyField.style.backgroundColor='darksalmon';
        }
        else{
          qntyField.style.backgroundColor='rgb(241, 241, 241)';
        }
      }
    };
    
    xhttp.open("POST",url, true);
   
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(queryString);

    //
    var priceId="price"+slno;
    var gstId="gst"+slno;
    var tpriceId="tprice"+slno;
    var price=parseInt(document.getElementById(priceId).innerText,10);
    var gst=parseInt( document.getElementById(gstId).innerHTML,10);
    var tprice=document.getElementById(tpriceId).innerHTML;
     if(qnty!="" && document.getElementById(priceId).innerText!="" && document.getElementById(gstId).innerText!="")
     {
     //if total price is not empty
     if(document.getElementById(tpriceId).innerText!="")
     {
       //calculation of previous  Quantity
       var preQnty=(tprice*100)/((100+gst)*price);
       //editing total gst
       tGst-=((gst/100)*price*preQnty);
       console.log(tGst)
       tGst+=((gst/100)*(parseInt(qnty,10))*price);
       console.log(tGst)
     }
     else
     {
          //editing total gst
          tGst+=((gst/100)*(parseInt(qnty,10))*price);
          
          
     }
    }
    //price calculation
    totalPriceCalculation(slno);
  }
  });


}
function chkPrice(priceField)
{
  priceField.addEventListener("input",function(e)
  {
  var price= priceField.innerText;
  var slno=this.id.slice(5);
  //if text is entered 
  if(!/^[0-9]+$/.test(price)){
    //making background to wrong color
    priceField.style.backgroundColor='darksalmon';
  }
  else
  {
    //making background to right color
    priceField.style.backgroundColor='rgb(241, 241, 241)';
    var qntyId="qnty"+slno;
    var gstId="gst"+slno;
    var tpriceId="tprice"+slno;
    var qnty=parseInt(document.getElementById(qntyId).innerText,10);
    var gst=parseInt( document.getElementById(gstId).innerHTML,10);
    var tprice= document.getElementById(tpriceId).innerHTML;
    if(document.getElementById(qntyId).innerText!="" && price!="" && document.getElementById(gstId).innerText!="")
    {
     //if total price is not empty
     if(document.getElementById(tpriceId).innerText!="")
     {
       //calculation of previous  Price
       var prePrice=(tprice*100)/((100+gst)*qnty);
       //editing total gst
       tGst-=((gst/100)*qnty*prePrice);
       console.log(tGst)
       tGst+=((gst/100)*qnty*(parseInt(price,10)));
       console.log(tGst)
     }
     else
     {
          //editing total gst
          tGst+=((gst/100)*qnty*(parseInt(price,10)));
     }
    }
    totalPriceCalculation(slno);
  }
  });
  
}
function chkGst(gstField)
{ 
  gstField.addEventListener("input",function(e)
  {
   
    var gst= gstField.innerText;
    var slno=this.id.slice(3);
     //if text is entered 
    if(!/^[0-9]+$/.test(gst)){
     //making background color wrong color
      gstField.style.backgroundColor='darksalmon';
    }
    else
    {
      //making background to right color
      gstField.style.backgroundColor='rgb(241, 241, 241)';
      
      var qntyId="qnty"+slno;
      var priceId="price"+slno;
      var tpriceId="tprice"+slno;
      var qnty=parseInt(document.getElementById(qntyId).innerText,10);
      var price=parseInt(document.getElementById(priceId).innerText,10);
      var tprice= document.getElementById(tpriceId).innerHTML;
      if(document.getElementById(qntyId).innerText!="" && document.getElementById(priceId).innerText!="" && gst!="")
      {
      //if total price is not empty
      if(document.getElementById(tpriceId).innerText!="")
    {
     
      //calculation of previous  Gst Percent
      var preGstPercent=((tprice*100)/(qnty*price))-100;
      
      //editing total gst
      tGst-=((preGstPercent/100)*qnty*price);
     
      tGst+=(((parseInt(gst,10))/100)*qnty*price);
     
     
    }
    else
    {
         
         tGst+=(((parseInt(gst,10))/100)*qnty*price);
         
         
    }
  }
      totalPriceCalculation(slno);
    }
  });
  
}
function removeProduct(btn)
{
  btn.addEventListener("click",function(e)
  {
    var slno=this.id.slice(6);
    var tr=document.getElementById("row"+slno);
    var item=document.getElementById("pinput"+slno).value;
    var batch= document.getElementById("bno"+slno).innerText;

    document.getElementById("product_list").removeChild(tr);
    rNo--;
    

  });
}
function discountCalculation()
{
  //getting discount percent from UI
  var discountPercent=document.getElementById("dinput").value;
  //calculating discount value
  discountValue=parseFloat((tAmount/100)*discountPercent).toFixed(2);
  //calculating net Amount
  var netAmount=tAmount-discountValue;
  //Round off net Amount
  var rfNetAmount=Math.round(netAmount);
  //displaying the discount value 
  document.getElementById("dAmount").innerHTML=discountValue;
  //displaying net amount
  document.getElementById("nAmount").innerHTML=rfNetAmount;
  //displaying Round Off Value
  if((netAmount-rfNetAmount)>=0)
  {
    document.getElementById("rf").innerHTML=parseFloat(netAmount-rfNetAmount).toFixed(2);
  }
  else
  {
    document.getElementById("rf").innerHTML=0;
  }
  if(discountPercent=="")
  {
   //displaying the discount value 
   document.getElementById("dAmount").innerHTML=0;
   //displaying net amount
   document.getElementById("nAmount").innerHTML=0;
   document.getElementById("cgst").innerHTML=0;
   document.getElementById("sgst").innerHTML=0;

  
}
  else{
    if(discountPercent==0)
  {
    //displaying cgst and sgst
    document.getElementById("cgst").innerHTML=(parseFloat(tGst/2).toFixed(2));
    document.getElementById("sgst").innerHTML=(parseFloat(tGst/2).toFixed(2));
  }
  else 
  {
    
    //displaying cgst and sgst
    document.getElementById("cgst").innerHTML=0;
    document.getElementById("sgst").innerHTML=0;
  }
  }
 
  
}
function generateBill()
{
  //if there is no added prduct
  if(rNo==1)
  {
    alert("Add atleast One Product");
  }
  //if discount percent field is empty
  else if(document.getElementById("dinput").value=='')
  {
    alert("Fill Discount Percent");
  }
  else{
    //for every product row
   for(i=1;i<=pNo;i++)
   {
     if(document.getElementById("row"+i))
     {
       //sebding product details to database 
       sendingRow(i);
     }
   }
   //sending Bill Details to Database 
  sendingBillDetails();
  window.print();
  location.reload();
  }
  
}
function sendingRow(preP)
{
  //insert billing itemInfo to billing_info
  
  var itemField=document.getElementById("pinput"+preP);
  var bnoField=document.getElementById("bno"+preP);
  var qntyField=document.getElementById("qnty"+preP);
  var priceField=document.getElementById("price"+preP)
  var gstField=document.getElementById("gst"+preP);
  var item=itemField.value;
  var bno=bnoField.innerText;
  var qnty=qntyField.innerText;
  var price=priceField.innerText;
  var gst=gstField.innerText;
  var tprice=document.getElementById("tprice"+preP).innerText;
  if(item==""||bno==""||qnty==""||price==""||gst=="")
  {
        alert("Invalid Entry");
  }
  else if(itemField.style.backgroundColor=='darksalmon'||bnoField.style.backgroundColor=='darksalmon'||qntyField.style.backgroundColor=='darksalmon'||priceField.style.backgroundColor=='darksalmon'||gstField.style.backgroundColor=='darksalmon')
  {
    alert("Invalid Product Information");
  }
  else
  {
   var url="addBillingItemInfo.php";
   var queryString="item=" + item + "&batch_no=" + bno + "&qnty=" + qnty + "&price=" + price + "&gst=" + gst + "&tprice=" + tprice;
   sentDetails(url,queryString);
}
}
function sendingBillDetails()
{
  var gAmount=document.getElementById("tAmount").innerHTML;
  var discount=document.getElementById("dAmount").innerHTML;
  var rOff=document.getElementById("rf").innerHTML;
  var nAmount=document.getElementById("nAmount").innerHTML;
  var tGst=document.getElementById("cgst").innerHTML;
  var url="/php/addBillInfo.php";
   var queryString="gamount=" + gAmount + "&discount=" + discount + "&roff=" + rOff + "&namount=" + nAmount + "&tgst=" + tGst ;
   sentDetails(url,queryString);
   
}