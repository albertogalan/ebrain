

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
		<script src="/js/pepe_functions.js"></script>
	<script src="/js/pepe.js"></script>
	<!-- https://highlightjs.org -->
	<script src="/js/highlight.pack.js"></script>
 <!-- Autocomplete script -->
	<script src="/js/jquery-1.11.2.min.js"></script>
	<script src="/js/jquery.easy-autocomplete.min.js" type="text/javascript" ></script>

  <!-- <script type="text/javascript" src="js/MathJax-master/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script> -->

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

include ('inc/function_read.php');
$path="/data//";
$resourcesfile="/data/rw3/i487.com/resources/files2.json";
generate_content($path,$resourcesfile);

?>


<body >
	<input id="tittle" value="introduction"></input> 	<input id="rename" value="introduction"></input><div id="hash"></div><button id="MW" name="button" onclick="version()" >MW</button>
	<div id="hash"></div><br/><br/>
	<div id="saving"></div><br/><br/>
	<br/><br/>
  <div id="introduction" contenteditable="true" class="first_editor"  >
<?php
if (isset($_GET['url'])) {
	// echo "hola";
	// file_get_contents('http://www.google.com.com/');

	// $homepage = file_get_contents('http://www.example.com/');
// echo $homepage;
readfile("/data/rw1/m1/".$_GET['url'])  ;
}


 ?>



</div>
<div id="hidden"></div>

</body>
<script>


$(document).ready(function(){

	console.log($("#tittle").text());




});

</script>

</html>
