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
$item=$_POST['item_name'];
$sql="DELETE FROM items where item_name='$item'";
$query_result=mysqli_query($con,$sql);

$sql2="DELETE FROM `items_info` WHERE item_name='$item'";
mysqli_query($con,$sql2);

?>
