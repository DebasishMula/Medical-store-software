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
$item=$_POST['item'];

$sql="SELECT COUNT(batch_no) from items_info WHERE item_name='$item' ";
$query_result=mysqli_query($con,$sql);

$response=array();
$data = mysqli_fetch_array($query_result);
if($data[0]>0)
{
  $response=array("message"=>'exist');
}
else
{
  $response=array("message"=>'not exist');
}

echo json_encode($response);
?>