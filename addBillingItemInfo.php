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
$batch=$_POST['batch_no'];
$qnty=$_POST['qnty'];
$price=$_POST['price'];
$gst=$_POST['gst'];
$tprice=$_POST['tprice'];


     
//fetching last id of billing
$sql1=" select *from billing ORDER BY id DESC LIMIT 1";
$query_result=mysqli_query($con,$sql1);
$row=mysqli_fetch_array($query_result);
$bid=$row['id'];

$sql2="insert into billing_item(item,qnty,price,gst,tp,bId) values('$item','$qnty','$price','$gst','$tprice','$bid')";
if(mysqli_query($con,$sql2))
{
    $count=0;
     
    $sql2="SELECT id,qnty from items_info WHERE item_name='$item' and batch_no='$batch'";
    $query_result1=mysqli_query($con,$sql2);
    while($data = mysqli_fetch_array($query_result1))
    {
      $count+=$data['qnty'];
      $id=$data['id'];
      if($qnty<=$count)
      {
          //deleting qnty from item_info
         $rest=$data['qnty']-$qnty;
         $sql3="UPDATE items_info set qnty='$rest' where id='$id'";
         mysqli_query($con,$sql3);
         //deleting quantity from items
         $sql4="SELECT qnty FROM items where item_name='$item'";
         $row=mysqli_fetch_array(mysqli_query($con,$sql4));
         $rest2=$row['qnty']-$qnty;
         $sql5="UPDATE items set qnty='$rest2' where item_name='$item'";
         mysqli_query($con,$sql5 );
      }
      else
      {
          //deleting qnty from item_info
         $sql6="UPDATE items_info set qnty='0' where id='$id'";
         mysqli_query($con,$sql6);
         //deleting quantity from items
         $sql7="SELECT qnty FROM items where item_name='$item'";
         $row=mysqli_fetch_array(mysqli_query($con,$sql7));
         $rest2=$row['qnty']-$data['qnty'];
         $sql8="UPDATE items set qnty='$rest2' where item_name='$item'";
         mysqli_query($con,$sql8 );
         $qnty-=$data['qnty'];
      }
    }
    $sql1="delete from items_info where qnty='0'";
    mysqli_query($con,$sql1);
    

}

?>