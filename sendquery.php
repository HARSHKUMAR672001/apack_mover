<?php

/*session_start();

if (count($_POST) > 0) 
{
    if ($_POST["captcha_code"] == $_SESSION["captcha_code"]) 
	{*/
	
//captcha code part start
	
$requirement=$_REQUEST['requirement'];

if(strpos($requirement, 'http') == true) 
{
$requirement = "";
echo "URL Not Allowed";
}


elseif(strpos($requirement, '.com') == true) 
{
$requirement = "";
echo "URL Not Allowed";
}


elseif(strpos($requirement, 'www') == true) 
{
$requirement = "";
echo "URL Not Allowed";
}

elseif(strpos($requirement, 'porn') == true) 
{
$requirement = "";
echo "porn Not Allowed";
}



elseif(strpos($requirement, 'Casino') == true) 
{
$requirement = "";
echo "Casino Not Allowed";
}


elseif(strpos($requirement, 'Webmater') == true) 
{
$requirement = "";
echo "Webmater Not Allowed";
}


elseif(strpos($requirement, 'Content') == true) 
{
$requirement = "";
echo "Content Not Allowed";
}


elseif(strpos($requirement, 'viagra') == true) 
{
$requirement = "";
echo "viagra Not Allowed";
}


elseif(strpos($requirement, 'Movie') == true) 
{
$requirement = "";
echo "Movie Not Allowed";
}


elseif(strpos($requirement, 'Games') == true) 
{
$requirement = "";
echo "Games Not Allowed";
}


elseif(strpos($requirement, 'Resort') == true) 
{
$requirement = "";
echo "Resort Not Allowed";
}

elseif(strpos($requirement, 'Url') == true) 
{
$requirement = "";
echo "Url Not Allowed";
}


elseif(strpos($requirement, 'http//:') == true) 
{
$requirement = "";
echo "http//: Not Allowed";
}


elseif(strpos($requirement, 'coupons') == true) 
{
$requirement = "";
echo "coupons Not Allowed";
}


elseif(strpos($requirement, 'Link') == true) 
{
$requirement = "";
echo "Link Not Allowed";
}


elseif(strpos($requirement, 'Rank') == true) 
{
$requirement = "";
echo "Rank Not Allowed";
}


elseif(strpos($requirement, 'Earn') == true) 
{
$requirement = "";
echo "Earn Not Allowed";
}


elseif(strpos($requirement, 'Link') == true) 
{
$requirement = "";
echo "Link Not Allowed";
}


elseif(strpos($requirement, 'Link') == true) 
{
$requirement = "";
echo "Link Not Allowed";
}


elseif(strpos($requirement, 'Link') == true) 
{
$requirement = "";
echo "Link Not Allowed";
}








if(

!empty($_REQUEST['txtname']) && 

!empty($_REQUEST['txtemail']) && 

!empty($_REQUEST['txtphone']) && 

!empty($_REQUEST['location']) && 

!empty($requirement))

{

  $txtname=$_REQUEST['txtname'];

  $txtemail = $_REQUEST['txtemail']; 
  
  $from = $_REQUEST['txtemail']; 

  $txtphone=$_REQUEST['txtphone'];

  $location=$_REQUEST['location'];

  $requirement=$_REQUEST['requirement'];

  $subject = "agarwalexpressrelocation.com"; 

  $my_email = "indiaastrologer@yahoo.com";

  $ip = $_SERVER['REMOTE_ADDR']; 





if($txtphone!='')
{
 $to = "smartisoft@yahoo.com";
    $subject = "agarwalexpressrelocation.com";
    $body             .= '<strong>Dear Admin,</strong><br><br>';
    $body             .= 'Enquiry details given below,<br><br />';
    $body             .= '<strong>Name : </strong>'.$txtname.'<br>';
    $body             .= '<strong>Mobile : </strong>'.$txtphone.'<br>';
    $body             .= '<strong>Email : </strong>'.$txtemail.'<br>';
    $body             .= '<strong>Location : </strong>'.$location.'<br>';
    $body             .= '<strong>Message : </strong>'.$requirement.'<br>';

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'Bcc: agarwalexpressrelocation.com <agarwalexpresrelocation@gmail.com>' . "\r\n";
	$headers .= 'Bcc: agarwalexpressrelocation.com <iksmartisoft@gmail.com>' . "\r\n";
    $headers .= 'From: agarwalexpressrelocation.com <'.$from.'>' . "\r\n";
    $chk = mail($to,$subject,$body,$headers);
}
if(!$chk)


{

echo "Plz Fill form<br />";

echo '<button onclick="goBack()">Go Back</button>



<script>

function goBack() {

    window.history.back();

}

</script>';

}



else

{

echo "mail done";

echo "<script>location.href='https://agarwalexpressrelocation.com/'</script>";

}









}
//captcha code part close
/*    } 
	else 
	{
	
echo "Plz Fill captcha<br />";

echo '<button onclick="goBack()">Go Back</button>



<script>

function goBack() {

    window.history.back();

}

</script>';

    }
}*/

?>