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
$qnty=$_POST['qnty'];
$edate=$_POST['edate'];
$batch=$_POST['batch'];
$stk=$_POST['stk'];
$sql="DELETE FROM items where item_name='$item' && qnty='$qnty'";
$query_result=mysqli_query($con,$sql);

$sql2="DELETE FROM `items_info` WHERE item_name='$item' && qnty='$qnty' && expiry_date='$edate' && batch_no='$batch' && stokist='$stk'";
mysqli_query($con,$sql2);
?>