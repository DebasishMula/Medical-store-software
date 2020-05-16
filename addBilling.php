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
$sql1="insert into billing(c_name,date)values('$cname','$date')";
mysqli_query($con,$sql1);

?>