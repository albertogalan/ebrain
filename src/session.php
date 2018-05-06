 <html>
<head>
	<meta charset="utf-8">
	<meta name="robots" content="noindex, nofollow">
	<title><?php
    $tittle=$_GET['url'];

	echo "$tittle"; ?></title>
	<link href="/css/style.css" rel="stylesheet" type="text/css">

</head>

<?php


/*session is started if you don't write this line can't use $_Session  global variable*/


$user=$_POST['user'];
$pass=$_POST['pass'];



if ($user=='agalan' && $pass=='1234'){
session_start([
    'cookie_lifetime' => 43200,
]);
$_SESSION["login2"]=true;
$_SESSION["loginedit"]=true;
echo "User login correctly";
header("Location: read6.php?url=.all-all.html");

}
else if ($user=='agalanread' && $pass=='1234')
{
$_SESSION["login2"]=true;
$_SESSION["loginedit"]=false;
echo "User login correctly";
header("Location: read6.php?url=chinese-.html");
}
else
{
unset($_SESSION["login2"]);
unset($_SESSION["login2read"]);
$_SESSION["loginedit"]=false;
echo "Wrong user or password";
	}

?>

<body>

<form action="session.php" method="post">
User <input type="text" name="user"><br>
Password <input type="password" name="pass"><br>
<input type="submit">
</form>

</body>
</html> 