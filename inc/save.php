

<?php

// http://ckeditor.com/addon/inlinesave
//
// include ('./inc/conex.php');
// include ('./inc/functions_update.php');


//
// editabledata: '<h1>Hello world!</h1>\n\n<p>I&#39;m an instance of <a href="http://ckeditor.com">CKEditor</a>.</p>\n'
// editorID: 'cke_editor'
// test: 'true'

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ERROR | E_WARNING | E_PARSE);

include ('function_read.php'); // implement main function library



$action=$_POST['action'];
$data=$_POST['data'];


$file=$_POST['file'];
$fileout=$_POST['fileout'];


$path=$_POST['path'];


// // variables to prove
// $filename="/data/rw1/m1/introduction.html";
// $action="save";
//   $file="_linux-course19-.html";
//   $path="/data/rw1/m1";


// $fileout="introduction33.html";
// $data="pere ......";


switch ($action) {



  case "version":  //create new version of file

      {
      echo "do it version of $path/$file";
      version_content($path,$file,$file);
      break;
      }
  case "rename":  // rename file
    {
      echo "rename of $path/$file";
      rename_content($path,$file,$fileout);
      break;
    }

    case "save":  // save file
      {
        echo "save of $path/$file";
        save_content("$path/$file","$data");
        break;
      }

}



?>
