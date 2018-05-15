

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="robots" content="noindex, nofollow">
  <meta name="viewport" content="width=device-width">

  
	<title><?php
    $tittle=$_GET['url'];

	echo "$tittle"; ?></title>
<script> var CKEDITOR_BASEPATH = '/js/ckeditor4/'; </script>
  <script src="/js/ckeditor4/ckeditor.js"></script>
  <script src="/js/jquery-3.1.0.min.js"></script>
    <!-- <script src="/js/pepe_functions.js"></script> -->
    <!-- <script src="/js/money.min.js"></script> -->
  <script src="/js/dist/bundle.js"></script>

  
<!-- replace maybe by JwPLAYER -->
  <link href="/css/video-js.css" rel="stylesheet">
  <script src="/js/video.js"></script>

  <!-- https://highlightjs.org -->
  <script src="/js/highlight.pack.js"></script>
 <!-- Autocomplete script -->
  <!-- <script src="/js/jquery-1.11.2.min.js"></script> -->
  <script src="/js/jquery.easy-autocomplete.min.js" type="text/javascript" ></script>


  <script src="/js/pdfobject.js"></script>


  <!-- <script type="text/javascript" src="js/MathJax-master/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script> -->

  <link href="/css/main.css" rel="stylesheet" type="text/css">
	<link href="/css/readerstyle.css" rel="stylesheet" type="text/css">
	<!-- <link href="/css/easy-autocomplete.min.css" rel="stylesheet" type="text/css"> -->
  <!-- pre code theme -->
	<link rel="stylesheet" href="/css/atom-one-light.css">

	<!-- To save data in the browser directly -->
	<!-- <script src="https://unpkg.com/dexie@latest/dist/dexie.js"></script> -->
	<!-- <link href="http://sdk.ckeditor.com/theme/css/sdk-inline.css" rel="stylesheet"> -->

</head>

<?php


// error_reporting(E_ALL);
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ERROR | E_WARNING | E_PARSE);
// // mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// session_start([
//     'cookie_lifetime' => 10,
// ]);

// // echo $_SESSION["login2"]; 


// if ( ($_SESSION["login2"])){

// 	echo "Login correcto<p>";
// 	// echo " login correctly";
// }
// else
// {
// 	echo "Need to <a href='session.php'>login</a>";
// }


// if ($_SESSION["loginedit"]){

// 	$editable="true";
// 	echo "edit mode";
// }
// else
// {
// 	$editable="false";
// 	echo "read mode<p>";

// }


// include ('inc/function_read.php');
// $path="/data//";
// $datafile="data/files.json";
// generate_content($path,$datafile);

?>

		
<body >

  <div id="commandArea" class="col1">
  <a id="sharelink" src=""> Share Link</a>
    <input id="tittle" value="introduction" class="searchfile"></input>   <input id="rename" value="introduction" class="searchfile"></input>
    <button id="autotrans" class="buttonpanel"  name="button">Auto Trans</button>
    <button id="trans" class="buttonpanel"  name="button">Translation</button>
    <button id="showtranslate" class="buttonpanel"  name="button">Original and translation</button>
    <button id="addabsolutepath" class="buttonpanel"  name="button">update images path</button>
    <button id="updatecost" class="buttonpanel"  name="button">update cost</button>
    <button id="sharelink" class="buttonpanel"  name="button">share link</button>
    <button id="MW" class="buttonpanel" name="button" onclick="version()" >MW</button>
    <button id="puttogether" class="buttonpanel" name="button"  >Put together</button>
    <button id="testspeech" class="buttonpanel" name="button" >testspeech</button>
    <button id="jieba2" class="buttonpanel" name="button" " >Jieba</button>
    <button id="jiebaauto" class="buttonpanel" name="button" " >Auto Jieba</button>
    <div class="mobilebuttonpanel">
    <input type="checkbox" id="editmode" name="interest" value="true" >
    Edit
</div>
<div id="small" class="small">A</div> <div id="medium" class="medium">A</div><div id="big" class="big">A</div>
    <select id="lang" name="lang"> <!--Supplement an id here instead of using 'text'-->
      <option value="en">English</option>
      <option value="zh" selected>Chinese</option> 
      <option value="de" >German</option>
      <option value="spa">Spanish</option>
      <option value="kor">Korean</option>
    </select>
    <select id="langto" name="langto"> <!--Supplement an id here instead of using 'text'-->
      <option value="en" selected>English</option>
      <option value="zh">Chinese</option> 
      <option value="de" >German</option>
      <option value="spa">Spanish</option>
      <option value="kor">Korean</option>
    </select>
  </div>

<div id="inputArea" class="col2">

<div id="menu" > 

<div id="menupanel" class="menu">Panel </div>
</div>
       
      <div id=fanyiArea class="fanyi">
  <div class="audiofanyi"> <audio id="audiofanyi" src="" autoplay="" controls="" volume="0.8">This is audio</audio></div>
 <div id=fanyi55>
 Transalation content
</div>
  </div>

    <div id="scrollArea" class="clusterize-scroll ">
        <div id="contentArea" class="clusterize-content">
        <div id="introduction" contenteditable="true" class="first_editor"  >
        <?php
        			readfile("/data/rw1/m1/".$_GET['url'])  ;
         ?>
        </div>
        </div>
    </div>
</div>

<div  id="showArea" class="col3">
  <div id="hash"></div><div id="textinfo" ></div>
<div id="video">
     <video  id="my-player" controls class="video-js vjs-default-skin videoread" width="520" 
             data-setup='{  "playbackRates": [0.5,1, 1.5, 2] }'>
      <source src="/img/file_zy8w7i.mp4" type="video/mp4"></source>
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="http://videojs.com/html5-video-support/" target="_blank">
          supports HTML5 video
        </a>
      </p>
      </video>
<div id="pdfobject">
</div>

</div>
    <!-- <audio src="/img/file_RKVjFV.mp3" width="400px" controls="">&nbsp;</audio> -->
    <!-- <div class="map"><div id="allmap"></div></div> -->
</div>

</div>


<div id="hidden"></div>
  <script> 
    // Turn off automatic editor creation first.
    // CKEDITOR.disableAutoInline = true;
    // CKEDITOR.inline( 'introduction' );
</script>

</body>

</html>
