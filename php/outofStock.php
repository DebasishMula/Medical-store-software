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

$sql="SELECT item_name,qnty,price FROM items where qnty<=10 ORDER BY item_name";
$query_result=mysqli_query($con,$sql);

$response=array();
while($data = mysqli_fetch_array($query_result))
{
  $temp=array("item"=>$data['item_name'],"qnty"=>$data['qnty'],"price"=>$data['price']);  
  array_push($response,$temp);
}
echo json_encode($response);
?>
