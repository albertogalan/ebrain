
<html>

<head>
	<meta charset="utf-8">
	<meta name="robots" content="noindex, nofollow">
<link href="/css/style.css" rel="stylesheet" type="text/css">
<link href="/css/clusterize.css" rel="stylesheet" type="text/css">
<!-- <script src="/js/readbook.js"></script> -->
<!-- <script src="/js/require.js"></script> -->
<!-- <script data-main="js/readbook" src="/js/require.js"></script> -->
<!-- <script src="/js/pdfviewer.js"></script> -->
<!-- <script src="//mozilla.github.io/pdf.js/build/pdf.js"></script> -->
  <!-- <script src="/js/jquery-3.1.0.min.js"></script> -->

  <script src="/js/jquery-3.1.0.min.js"></script>
<script src="/js/bundle.js"></script>

</head>

<div>
  <button id="prev">Previous</button>
  <button id="next">Next</button>
  <button id="page_go">Go to</button>
  <input id="page_input" value="1"></input> 
  <span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>
  
</div>

<body>

	<div id=fanyi55 class="fanyi">
		dfd

	</div>
<div id="scrollArea" class="clusterize-scroll">
  <div id="contentArea" class="clusterize-content">

<?php
            readfile("/data/rw1/m1/".$_GET['url'])  ;
?>


  </div>
</div>


</body>

</html>



