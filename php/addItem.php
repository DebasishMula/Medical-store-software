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

$item=$_POST['itemname'];
$qnty=$_POST['quantity'];
$price=$_POST['price'];
$eDate=$_POST['edate'];
$bNo=$_POST['batch_no'];
$sName=$_POST['stockist'];
$sql1="select count(item_name) from items where item_name='$item'";
$sql2="select count(item_name) from items_info where item_name='$item' && batch_no='$bNo' && stokist='$sName' ";
$query_result1=mysqli_query($con,$sql1);
$query_result2=mysqli_query($con,$sql2);
$array=mysqli_fetch_array($query_result1);
$array2=mysqli_fetch_array($query_result2);
if($array[0]>0 && $array2[0]>0)
{
  //adding quantity to items
  $sql3="SELECT qnty FROM items where item_name='$item'";
  $row=mysqli_fetch_array(mysqli_query($con,$sql3));
  $qnty2=$qnty+$row['qnty'];
  $sql4="UPDATE items set qnty='$qnty2' where item_name='$item'";
  mysqli_query($con,$sql4);

  //adding quantity to items_info
  $sql5="SELECT qnty FROM items_info where item_name='$item' && batch_no='$bNo' && stokist='$sName' ";
  $row1=mysqli_fetch_array(mysqli_query($con,$sql5));
  $qnty1=$qnty+$row1['qnty'];
  $sql6="UPDATE items_info set qnty='$qnty1' where item_name='$item' && batch_no='$bNo' && stokist='$sName' ";
  mysqli_query($con,$sql6);

 
  $response=array("response"=>'Added');
}
else if($array[0]>0 && $array2[0]<=0)
{
  //adding quantity to items
  $sql3="SELECT qnty FROM items where item_name='$item'";
  $row=mysqli_fetch_array(mysqli_query($con,$sql3));
  $qnty2=$qnty+$row['qnty'];
  $sql4="UPDATE items set qnty='$qnty2' where item_name='$item'";
  mysqli_query($con,$sql4);
  //insert item_info
  $sql9="insert into items_info(item_name,qnty,expiry_date,batch_no,stokist)values('$item','$qnty','$eDate','$bNo','$sName')";
  mysqli_query($con,$sql9);
  $response=array("response"=>'Added');
}
else{0
     //insert item 
    $sql7="insert into items(item_name,qnty,price)values('$item','$qnty','$price')";
    mysqli_query($con,$sql7);
    //insert item_info
    $sql8="insert into items_info(item_name,qnty,expiry_date,batch_no,stokist)values('$item','$qnty','$eDate','$bNo','$sName')";
    mysqli_query($con,$sql8);
   
    $response=array("response"=>'Added');
}

echo json_encode($response);
?>

