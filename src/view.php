

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="robots" content="noindex, nofollow">
	<title><?php
    $tittle=$_GET['url'];

	echo "$tittle"; ?></title>
  <script src="/ckeditor/ckeditor.js"></script>
  <script src="/js/jquery-3.1.0.min.js"></script>
		<script src="/js/dist/bundle.js"></script>
		<!-- <script src="/js/money.min.js"></script> -->
 <!-- Autocomplete script -->
	<!-- <script src="/js/jquery-1.11.2.min.js"></script> -->
	<script src="/js/jquery.easy-autocomplete.min.js" type="text/javascript" ></script>

  <!-- <script type="text/javascript" src="js/MathJax-master/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script> -->

  <link href="/css/main.css" rel="stylesheet" type="text/css">
	<link href="/css/readerstyle.css" rel="stylesheet" type="text/css">
	<link href="/css/style.css" rel="stylesheet" type="text/css">
	<link href="/css/easy-autocomplete.min.css" rel="stylesheet" type="text/css">
  <!-- pre code theme -->
	<link rel="stylesheet" href="/css/atom-one-light.css">

	<!-- To save data in the browser directly -->
	<!-- <script src="https://unpkg.com/dexie@latest/dist/dexie.js"></script> -->
	<!-- <link href="http://sdk.ckeditor.com/theme/css/sdk-inline.css" rel="stylesheet"> -->

</head>

<?php


error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ERROR | E_WARNING | E_PARSE);
// mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

session_start([
    'cookie_lifetime' => 10,
]);

// echo $_SESSION["login2"]; 



include ('inc/function_read.php');
$path="/data//";
$datafile="data/files.json";
generate_content($path,$datafile);

?>

		
<body >
  	<button id="trans" class="panel"  name="button">Translation</button>
  	<button id="showtranslate" class="panel"  name="button">Original and translation</button>
  	<button id="addabsolutepath" class="panel"  name="button">update images path</button>
  	<button id="updatecost" class="panel"  name="button">update cost</button>
  	<button id="sharelink" class="panel"  name="button">share link</button>
	<br/><br/><br/><br/>


<div id="inputArea" class="col2">
    	

    <div id="scrollArea" class="clusterize-scroll ">
        <div id="contentArea" class="clusterize-content">


<?php
if (true){
// if ($_SESSION["login2"]){

		if (isset($_GET['url'])) {
			readfile("/data/rw1/share/".$_GET['url'])  ;
		}

		}
else
		{
			readfile("/data/rw1/m1/welcome.html")  ;
		}


 ?>

</div></div></div>

</body>


</html>
