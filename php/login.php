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
$username=$_POST['username'];
$password=$_POST['password'];

$sql1="SELECT COUNT(id) from admin where username='$username' and password='$password'";
$response=array();
$arr=mysqli_fetch_array(mysqli_query($con,$sql1));
if($arr[0]==1)
{
  $response=array("response"=>'Matched');
}
else
{
 $response=array("response"=>'Not Matched');
}
echo json_encode($response);
?>





