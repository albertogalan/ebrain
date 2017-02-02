function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function hashCode (str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


function message (str){

  $( "#saving" ).html(str).css({opacity: 0.99});
  $( "#saving" ).animate({opacity: 0}, 1200 );
}

function basename(path,suffix) {
  var b = path
 var lastChar = b.charAt(b.length - 1)

 if (lastChar === '/' || lastChar === '\\') {
   b = b.slice(0, -1)
 }

 b = b.replace(/^.*[\/\\]/g, '')

 if (typeof suffix === 'string' && b.substr(b.length - suffix.length) === suffix) {
   b = b.substr(0, b.length - suffix.length)
 }

 return b
}


function dirname(path) {
  return path.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '')
}

function agregatext (selector) {
    var texts = '';

    $(".first_editor").children(selector).each(function() {

        $(this).children("p").each(function()
        {

          texts += $(this).text() + "\r\n";

        });

        var allListElements = $( "li br" );

      $( ".first_editor" ).find( allListElements ).each(function()
      // $(this).nextAll("li").each(function()
      {
        texts += "  " + $(this).contents().get(0).nodeValue + "\r\n";

      });





    });


    return texts;
}






function save (evt,action) {


    switch (action) {
      case "save": // editor save content
       console.log ("editor save 2");
       $.post( "/inc/save.php", { action:"save",data: evt.editor.getData(), path:"/data/rw1/m1" ,file: $("#tittle").val() } );
//  to prevent time consuming
      //  read();
      message("file saved");




        break;
     case "savetofile":
     console.log("save text");
      var file = $(".first_editor").children(".path").text();
      console.log(file);
      message("file saved " + file);


      // var file = "/data/m3/mm.mm";
    var path = dirname(file);
    var file = basename (file,'');
    // var data='';
// $("#savetofile").each(function() {
//    data = data  +  $(this).val();
//    //code
// });
   data=agregatext(".savetofile");
  //  data="test";
      console.log(data);
      console.log(path);
      console.log(file);

      $.post( "/inc/save.php", { action:"save",data: data, path:path,file:file } );


      // console.log(path.basename(str, '.html'));

     break;
     default:


      console.log("save default");

   }




    //  console.log("hascode is is: " + hashCode($( "#hidden" ).text()));
    // console.log ("1 " +hashCode($( "#hidden" ).text()));
    // console.log ("2 " +$( "#hash" ).text());

}


function read(){



  $.get('/m1/'+$( "#tittle" ).val(),{ "_": $.now() }, function(data2) {
    console.log("reading file " + '/m1/'+$( "#tittle" ).val());


       // console.log(data);
      //  $('#hidden').html(data2);
        $('.first_editor').html(data2);

        highlightjsworkers();


        // $('.first_editor').html(data);

      })  .done(function() {


        // if (hashCode($( "#hidden" ).text()) == $( "#hash" ).text()   )
        // message("no modifiations");
        // else {
        //   message ("saved!")
        //   $( "#hash" ).html(hashCode($( "#hidden" ).text()));}
        //
  }).fail(function() {
//$('.first_editor').html("<h1>error 404 no file</h1>"); // or whatever
}, 'text');

}

function highlightjsworkers(){

// hljs.initHighlightingOnLoad();
$('pre code').each(function(i, block) {
   hljs.highlightBlock(block);
 });

//  var code = document.querySelector('pre code');
//  var worker = new Worker('/js/worker.js');
//  if (!worker.onmessage) {//avoid null object in case doesnt exists
//  worker.onmessage = function(event) { code.innerHTML = event.data; }
// // worker.postMessage(code.textContent);
// }
};


//rename file
function rename(){

  console.log("change this file: "+$("#tittle").val()+" by this file: "+$("#rename").val());
   $.post( "/inc/save.php", { action:"rename", file: $("#tittle").val() , path:"/data/rw1/m1", fileout: $("#rename").val() } , function() {
       $("#tittle").val( $("#rename").val());
   })
     .done(function() {
       $( "#saving" ).html("file renamed to "+ $("#rename").val());
     })
     .fail(function() {
       alert( "error" );
     });

};


//rename file
function version(){

  console.log("creating a new version of this: "+$("#tittle").val());

   $.post( "/inc/save.php", { action:"version", file: $("#tittle").val() ,  path:"/data/rw1/m1",fileout: $("#rename").val() } , function() {
       $("#tittle").val( $("#rename").val());
   })
     .done(function() {
      message("New version backed");
     })
     .fail(function() {
       alert( "error" );
     });

};






function loadautosearch(source){

var options = {
    url: source,
    getValue: "filename",
    // minLength: 3,
    //  autoFocus: true,
    //  my : "100 100",
    //  at: "bottom" ,
    //  of:"#tittle",

    template: {
        type: "description",
        fields: {
            // description: "email"
        }
    },
    list: {
        match: {
            enabled: true
        }
    },

    theme: "plate-dark"
};

$("#tittle").easyAutocomplete(options);

};





function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
