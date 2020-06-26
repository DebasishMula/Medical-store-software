document.getElementById("login").addEventListener("click",login);
document.getElementById("orderSubmit").addEventListener("click",orderMedicine);
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
function login()
{
    
  var username= document.getElementById("uname").value;
  var password=document.getElementById("password").value;
  
  if(username=="" && password=="")
  {
   alert("Invalid Entry");
  }
  else
  {
   var url="/php/login.php";
 
  var queryString="username=" + username + "&password=" + password;
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myArray=JSON.parse(this.responseText);
      var msg=myArray['response'];
      console.log(msg);
      if(msg=="Not Matched")
      {
        alert("Invalid Credentials");
      }
      else{
        
        window.location.href="html/home.html";
        
      }
    }
  };
  
  xhttp.open("POST",url, true);
 
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(queryString);
  
  }
}
function orderMedicine()
{
  //get the patient info
  var pname=document.getElementById("pname").value;
  var address=document.getElementById("address").value;
  var mobile=document.getElementById("phone").value;

  var fileSelect = document.getElementById('file');
  // Get the files from the input
        var files = fileSelect.files;
        //if files has something
        if(files.length>0)
        {
          //if pname,address and mobile is empty
          if(pname==""||address==""||mobile=="")
          {
            alert("Invalid Entry");
          }
          else{
               if(mobile.length!=10)
               {
                 alert("Invalid Mobile Number");
               }
               else
               {

               
          
                 var formData = new FormData();
                 // Create a FormData object.

                 var file = files[0]; 
                 //Grab only one file since this script disallows multiple file uploads.

                 // if (!file.type.match('image.*')) {
                  //Check the file type.
                  // alert( 'Only Image File to be Accepted.');
            
                  // }

                 if (file.size >= 2000000 ) {
                  alert( 'Image size should Not exceed 2 Mb.');
           
                  }
        
                  // Add the file to the AJAX request.
                  formData.append('myfile', file, file.name);
                  //add patient info to the Ajax file
                  formData.append("mobile",mobile);
                  formData.append("pname",pname);
                  formData.append("address",address);
                  // Set up the request.
                  var xhr = new XMLHttpRequest();
 
                  // Open the connection.
                  xhr.open('POST', '/php/orderMedicine.php', true);
 
 
                  // Set up a handler for when the task for the request is complete.
                  xhr.onload = function () {
                    if (xhr.readyState == 4 && xhr.status == 200 ) {
                      
                      
                      alert("Order Request Submitted");
                      window.location.href="index.html";
                    } else {
                      console.log('An error occurred during the upload. Try again.');
                    }
                  };
 
                 // Send the data.
                 xhr.send(formData);
                }
              }
          }
    else
  
     {
       alert("Please Select a File")
     }
 }
