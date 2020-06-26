<?php
$server_name="localhost";
$dbname="medistore";
$user_name="root";
$password="";
$con=mysqli_connect($server_name,$user_name,$password,$dbname);
if(!$con)
{
    echo "Connection is not established".mysql_error();
}
 $itemN=$_POST['item_name1'];
 $itemO=$_POST['item_name2'];
 $price=$_POST['price'];
 $qnty=$_POST['qnty'];
 $sql="UPDATE items set item_name='$itemN',qnty='$qnty',price='$price' where item_name='$itemO'";
$query_result=mysqli_query($con,$sql);


if($query_result)
{
   echo "updated";
}
else{
    echo "not Updated";
}
?>