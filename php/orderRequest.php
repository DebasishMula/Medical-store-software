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
$sql="SELECT patient_name,address,mobile FROM `order-item` order by id DESC";
$query_result=mysqli_query($con,$sql);

$response=array();
while($data = mysqli_fetch_array($query_result))
{
  $temp=array("pname"=>$data['patient_name'],"address"=>$data['address'],"mobile"=>$data['mobile']);  
  array_push($response,$temp);
}
echo json_encode($response);
?>