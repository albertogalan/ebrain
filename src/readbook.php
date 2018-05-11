
<html>

<head>
	<meta charset="utf-8">
	<meta name="robots" content="noindex, nofollow">
  
<!-- <script src="/js/readbook.js"></script> -->
<!-- <script src="/js/require.js"></script> -->
<!-- <script data-main="js/readbook" src="/js/require.js"></script> -->
<!-- <script src="/js/pdfviewer.js"></script> -->
<!-- <script src="//mozilla.github.io/pdf.js/build/pdf.js"></script> -->
  <!-- <script src="/js/jquery-3.1.0.min.js"></script> -->

  <link href="/css/main.css" rel="stylesheet" type="text/css">
  <link href="/css/readerstyle.css" rel="stylesheet" type="text/css">
  <script src="/js/jquery-3.1.0.min.js"></script>
<script src="/js/dist/bundle.js"></script>

</head>

<div id="commands" class="col1">
  <button id="prev">Previous</button>  
  <button id="position">Save position</button>
  <button id="next">Next</button>
  <button id="page_go">Go to</button>
  <input id="page_input" value="1"></input> 
  <span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>
  
</div>

<body>
<div id="commands" class="col2">

	<div id="fanyi55" class="fanyi">
	Transalation content

	</div>
<div id="scrollArea" class="clusterize-scroll">
  <div id="contentArea" class="clusterize-content">

<?php
            readfile("/data/rw1/m1/".$_GET['url'])  ;
?>


  </div>
  </div>
</div>


</body>

</html>



