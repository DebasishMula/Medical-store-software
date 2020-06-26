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

    $mobile=$_POST['mobile'];
    $pname=$_POST['pname'];
    $address=$_POST['address'];
    
    $sql1="INSERT INTO `order-item`( `patient_name`, `address`, `mobile`) VALUES ('$pname','$address','$mobile')";
      if(mysqli_query($con,$sql1))
      {

      
    $currentDir = getcwd();
    $uploadDirectory = "../prescription/";

    $fileExtensions = ['jpeg','jpg','png',"pdf","doc","docx"]; // Get all the file extensions.

    $fileName = $_FILES['myfile']['name'];
    $fileSize = $_FILES['myfile']['size'];
    $fileTmpName  = $_FILES['myfile']['tmp_name'];
    $fileType = $_FILES['myfile']['type'];
    $fileExtension = strtolower(end(explode('.',$fileName)));

    $uploadPath =  $uploadDirectory . basename("$mobile.$fileExtension"); 

    echo $uploadPath;

    if (isset($fileName)) {

        if (! in_array($fileExtension,$fileExtensions)) {
            $response=array("response"=>'Unknown File Format');
        }

        if ($fileSize > 2000000) {
            $response=array("response"=>'File Size Should not Exceed 2MB.');
        }

        
            $didUpload = move_uploaded_file($fileTmpName, $uploadPath);

            if ($didUpload) {
                $response=array("response"=>'Order Request Submited');
            } else {
                $response=array("response"=>'Something Wrong');
            }
        
        
    }
}
echo json_encode($response);

?>