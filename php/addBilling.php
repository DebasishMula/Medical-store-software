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
$cname=$_POST['cname'];
$date=$_POST['date'];
$response=array();
$sql1="insert into billing(c_name,date,gamount,discount,roff,namount,tgst)values('$cname','$date','','','','','')";
mysqli_query($con,$sql1);
$sql2=" select *from billing ORDER BY id DESC LIMIT 1";
$query_result=mysqli_query($con,$sql2);
$row=mysqli_fetch_array($query_result);
$bid=$row['id'];
$response=array('bid'=>$bid);
echo json_encode($response);
?>