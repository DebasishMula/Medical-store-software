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
$pname=$_POST['pname'];
$address=$_POST['address'];
$mobile=$_POST['mobile'];
$sql="DELETE FROM `order-item` where patient_name='$pname' && address='$address' && mobile='$mobile' ";
mysqli_query($con,$sql);
?>