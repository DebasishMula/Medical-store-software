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
$batch=$_POST['batch'];
$qnty=$_POST['qnty'];
$sql="SELECT qnty from items_info WHERE item_name='$item' and batch_no='$batch'";
$query_result=mysqli_query($con,$sql);
$response=array();

$count=0;
while($data = mysqli_fetch_array($query_result))
{ 
 $count+=$data['qnty']; 
}
  if($qnty<=$count)
  {
    $response=array("message"=>'sufficient');
  }
  else
  $response=array("message"=>'insufficient');
echo json_encode($response);
?>