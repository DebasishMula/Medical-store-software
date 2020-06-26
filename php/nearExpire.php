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

$sql="SELECT * FROM `items_info` WHERE DATEDIFF(expiry_date,date(now()))<=90 && DATEDIFF(expiry_date,date(now()))>=0";
$query_result=mysqli_query($con,$sql);

$response=array();
while($data = mysqli_fetch_array($query_result))
{
  $temp=array("item"=>$data['item_name'],"qnty"=>$data['qnty'],"expiry_date"=>$data['expiry_date'],"batch_no"=>$data['batch_no'],"stokist"=>$data['stokist']);  
  array_push($response,$temp);
}
echo json_encode($response);
?>