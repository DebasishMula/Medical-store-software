function loadDoc(url)
{
     var txt="";
     var sl_no=1;
    var xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
 var myArray=JSON.parse(this.responseText);
 txt += "<table border='1' width='500px'>"
 txt+="<th>SL No</th><th>Item</th><th>Quantity</th><th>Expiry Date</th><th>Batch No</th><th>Stokist</th>"
for(var i=0;i<myArray.length;i++)
{
   
    
      txt += "<tr align='center'><td>" + sl_no + "</td><td>"+myArray[i].item+"</td><td>"+myArray[i].qnty+"</td><td>"+myArray[i].expiry_date+"</td><td>"+myArray[i].batch_no+"</td><td>"+myArray[i].stokist+"</td></tr>";
    
      sl_no++;
}
txt += "</table>"    
document.getElementById("demo").innerHTML = txt;


}
 };
 xmlhttp.open("GET", url, true);
xmlhttp.send();
}

loadDoc('nearExpire.php');
function reload()
     {
       window.print();
      location.reload();
     }  