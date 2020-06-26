
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
document.getElementById("add").addEventListener("click",add);
function add()
{
    
  var pname= document.getElementById("pname").value;
  var qnty=document.getElementById("qnty").value;
  var price=document.getElementById("price").value;
  var edate=document.getElementById("ed").value;
  var batch=document.getElementById("bno").value;
  var stokist=document.getElementById("stk").value;
  
  if(pname=="" && qnty=="" && price=="" && edate=="" && batch=="" && stokist=="")
  {
   alert("Invalid Entry");
  }
  else
  {
   var url="/php/addItem.php";
 
  var queryString="itemname=" + pname + "&quantity=" + qnty + "&price=" + price + "&edate=" + edate + "&batch_no=" + batch + "&stockist=" + stokist;
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myArray=JSON.parse(this.responseText);
      var msg=myArray['response'];
      console.log(msg);
      if(msg=="Added")
      {
       alert("Product Added")
       window.location.href="../html/addProduct.html";
      }
      else{
        
          alert("Something Wrong");
        
      }
    }
  };
  
  xhttp.open("POST",url, true);
 
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(queryString);
  
  }
}