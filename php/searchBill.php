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
$response=array();
$cname=$_POST['cname'];
$date=$_POST['date'];

$sql1="SELECT `id`, `c_name`, `date`, `gamount`, `discount`, `roff`, `namount`, `tgst` FROM `billing` WHERE c_name='$cname' && date='$date' order by id desc";
$row=mysqli_fetch_row(mysqli_query($con,$sql1));
if($row)
{

array_push($response,$row);
 $bid= $row[0];
 $sql2=" SELECT  `item`, `qnty`, `price`, `gst`, `tp` FROM `billing_item` WHERE bId=$bid";
 $query_result=mysqli_query($con,$sql2);
 while($data = mysqli_fetch_array($query_result))
{
  $temp=array("item"=>$data['item'],"qnty"=>$data['qnty'],"price"=>$data['price'],"gst"=>$data['gst'],"tp"=>$data['tp']);  
  array_push($response,$temp);
}

}
else
{
  $response=array('response'=>"No Bill Found");
}
echo json_encode($response);

?>