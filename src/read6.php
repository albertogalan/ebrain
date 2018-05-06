

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
		<!-- <script src="/js/pepe_functions.js"></script> -->
		<!-- <script src="/js/money.min.js"></script> -->
	<script src="/js/bundle.js"></script>

	
<!-- replace maybe by JwPLAYER -->
	<link href="http://vjs.zencdn.net/6.6.3/video-js.css" rel="stylesheet">
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

session_start([
    'cookie_lifetime' => 10,
]);

// echo $_SESSION["login2"]; 


if ( ($_SESSION["login2"])){

	echo "Login correcto<p>";
	// echo " login correctly";
}
else
{
	echo "Need to <a href='session.php'>login</a>";
}


if ($_SESSION["loginedit"]){

	$editable="true";
	echo "edit mode";
}
else
{
	$editable="false";
	echo "read mode<p>";

}


include ('inc/function_read.php');
$path="/data//";
$datafile="data/files2.json";
generate_content($path,$datafile);

?>

		
<body >
  <a id="sharelink" src=""> Share Link</a>
	<input id="tittle" value="introduction"></input> 	<input id="rename" value="introduction"></input><div id="hash"></div>
	<div id="hash"></div><br/>
	<div id="saving"></div>
    <button id="autotrans" class="panel"  name="button">Auto Trans</button>
  	<button id="trans" class="panel"  name="button">Translation</button>
  	<button id="showtranslate" class="panel"  name="button">Original and translation</button>
  	<button id="addabsolutepath" class="panel"  name="button">update images path</button>
  	<button id="updatecost" class="panel"  name="button">update cost</button>
  	<button id="sharelink" class="panel"  name="button">share link</button>
  	<button id="MW" class="panel" name="button" onclick="version()" >MW</button>

<select id="lang" name="lang"> <!--Supplement an id here instead of using 'text'-->
  <option value="en">English</option>
  <option value="zh" selected>Chinese</option> 
  <option value="de" >German</option>
  <option value="spa">Spanish</option>
</select>

<select id="langto" name="langto"> <!--Supplement an id here instead of using 'text'-->
  <option value="en" selected>English</option>
  <option value="zh">Chinese</option> 
  <option value="de" >German</option>
  <option value="spa">Spanish</option>
</select>

	<br/><br/><br/><br/>
  <div id="introduction" contenteditable="true" class="first_editor"  >
<?php
if (true){
// if ($_SESSION["login2"]){

		if (isset($_GET['url'])) {
			readfile("/data/rw1/m1/".$_GET['url'])  ;
		}

		}
else
		{
			readfile("/data/rw1/m1/welcome.html")  ;
		}


 ?>



</div>
<div  class="first_reader">
	
 <!-- <div class="videolink" onclick=loadVideo() value="/img/file_GFJ4Zp.mp4">/img/file_GFJ4Zp.mp4</div> -->

 <!-- <div class="vid" value="/img/file_GFJ4Zp.mp4">/img/file_GFJ4Zp.mp4</div> -->
 <video 

 id="my-player"
    controls

class="video-js vjs-default-skin videoread" width="520" 
 data-setup='{  "playbackRates": [1, 1.5, 2] }'
    >
  <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>

<p class="vjs-no-js">
    To view this video please enable JavaScript, and consider upgrading to a
    web browser that
    <a href="http://videojs.com/html5-video-support/" target="_blank">
      supports HTML5 video
    </a>
  </p>
</video>
 <!-- class="videoread" width=520 controls=controls   onclick=this.play()> <source src=/img/file_8sVaZG.mp4 type=video/mp4> dddd </video>   -->

<audio src="/img/file_RKVjFV.mp3" width="400px" controls="">&nbsp;</audio>
<div class="map"><div id="allmap"></div></div>
</div>
<!-- <div  class="first_reader"> -->
	<!-- 
<video
    id="my-player"
    class="video-js"
    controls
    preload="auto"
    poster="//vjs.zencdn.net/v/oceans.png"
    data-setup='{}'>
  <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
  <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
  <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
  <p class="vjs-no-js">
    To view this video please enable JavaScript, and consider upgrading to a
    web browser that
    <a href="http://videojs.com/html5-video-support/" target="_blank">
      supports HTML5 video
    </a>
  </p>
</video> -->


</div>
<div id="hidden"></div>

  <script src="http://vjs.zencdn.net/6.6.3/video.js"></script>
</body>
<script>


$(document).ready(function(){

	console.log($("#tittle").text());




});

</script>


<!-- <script type="text/javascript">
	
var map = new BMap.Map("allmap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));	  
	map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放


</script> -->

</html>
