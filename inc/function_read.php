<?php

//
//
//
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ERROR | E_WARNING | E_PARSE);


// mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// $file='/data/rw1/m1/test.html';
//  echo genera_newfile ($file);



// genera new version file without limits in a subpath
function genera_newfile ($file,$subpath)
{
  $path_parts = pathinfo($file);
  // echo $path_parts['dirname'], "\n";
  // echo $path_parts['basename'], "\n";
  // echo $path_parts['extension'], "\n";
  // echo $path_parts['filename'], "\n"; // since PHP 5.2.0
  $newfile=$path_parts['dirname'].$subpath.$path_parts['basename'];
  $i=1;
  while (file_exists($newfile)){
    $i=$i+1;
    $newfile=$path_parts['dirname'].$subpath.$path_parts['filename'].".$i.".$path_parts['extension'];
  }
  return $newfile;
}


// genera content
function generate_content($path,$resourcesfile)
{


  // $path="/data//";
  $file=$path.$_GET['f'];

  $dir    = '/data/rw1/m1';
  $files1 = scandir($dir);

  $newArray = array();
  $newRow = array();
  foreach ($files1 as $row) {
      //  echo $row;
      // $key = array_keys($row)[0];
      // $value = array_values($row)[0];
$key = is_array($row)? array_keys($row)[0]: array();
$value = is_array($row)? array_values($row)[0]: array();

      $newArray[] = $newRow;
      $newRow["filename"] = $row;
  }
  $newArray[] = $newRow;

  // echo(var_dump($newArray));

  $contenido=json_encode($newArray);
  $contenido=str_replace("[],","",$contenido); //remove undesired element
  // $resourcesfile="/data/rw3/i487.com/resources/files2.json";

  // chmod($resourcesfile, 0777);
  $fh = fopen($resourcesfile, 'w') or die("Can't create file $resourcesfile");
  fwrite($fh, $contenido);

}

// create a version. copy of the file
function version_content($path,$file,$fileout)
{
  echo "version content";
  if (copy ( "$path/$fileout", genera_newfile("$path/$fileout","/vers/") ))
    {
    echo "copy success!";
    }
}


// rename content and put in a trash if exist a file to not override
function rename_content($path,$file,$fileout)
{
  echo  "renamed   ";


  if (!file_exists("$path/$fileout"))
  {
   rename("$path/$file", "$path/$fileout");
  }
  else {
   rename("$path/$fileout", genera_newfile("$path/$fileout","/trash/"));
   rename("$path/$file", "$path/$fileout","/trash/");

  }

}


function save_content ($file,$contenido)
{
  $data=$contenido;
  echo "saving file content and modfifing with chown";
  chown($file, "www-data");  //assign new username
  chgrp($file, "www-data");  //assign new usergroup

 if (file_exists($file)) {
        $fh = fopen($file, 'w') or die("Can't create file");
        fwrite($fh, $contenido);
      }
  else
      {
      echo "file doesnt exists $file";
      $fh = fopen($file, 'w') or die('Cannot open file:  '.$file); //implicitly creates file
      fwrite($fh, $contenido);
      chown($file, "www-data");  //assign new username
    }
   fclose($fh);
   chmod($file, 0777);
   echo "Saved - Grabado2";  }







?>
