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
// $item=$_POST['item'];
$sql="SELECT item_name,qnty,expiry_date,batch_no,stokist FROM items_info where item_name='aaa'";
$query_result=mysqli_query($con,$sql);

$response=array();
while($data = mysqli_fetch_array($query_result))
{
  $temp=array("item"=>$data['item_name'],"qnty"=>$data['qnty'],"exp"=>$data['expiry_date'],"batch"=>$data['batch_no'],"stokist"=>$data['stokist']);  
  array_push($response,$temp);
}
echo json_encode($response);
?>