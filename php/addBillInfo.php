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
$gAmount=$_POST['gamount'];
$discount=$_POST['discount'];
$rOff=$_POST['roff'];
$nAmount=$_POST['namount'];
$tGst=$_POST['tgst'];
//fetching last id of billing
$sql1=" select * from billing ORDER BY id DESC LIMIT 1";
$query_result=mysqli_query($con,$sql1);
$row=mysqli_fetch_array($query_result);
$bid=$row['id'];
$sql2="update billing set gamount='$gAmount', discount='$discount', roff='$rOff', namount='$nAmount',tgst='$tGst' WHERE id='$bid'";
mysqli_query($con,$sql2);

?>