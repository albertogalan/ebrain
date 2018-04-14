//
// function saveintobrowser(filename,html){
//
// // filename=$( "#tittle" ).val()
// // html=evt.editor.getData()
// // lack of sync into the server
//   var db = new Dexie("m13");
//   db.version(1).stores({
//     files: "filename,html"
//   });
//
//   db.open().catch(function (e) {
//      alert ("Open failed: " + e);});
//
//
//   db.transaction("rw", db.files, function () {
//       // Update the register if exists if not add
//      db.files.where("filename").equals(filename).modify({html: html}).then(function(updated)
//      {
//        if (updated)
//            console.log ("pedro found and update");
//        else
//        {
//        console.log ("pedro not found ");
//        db.files.add({filename: $( "#tittle" ).val(), html:  evt.editor.getData()});} });   });
//
// };


var ctrlI = false;






// Add an event listener
document.addEventListener("name-of-event", function(e) {
    console.log(e.detail); // Prints "Example of an event"
});




$(document).ready(function() {

    var b1 = document.getElementById("MW");

    b1.tabIndex = 5; //change the default tabindex



    var url = getParameterByName('url');
    if (url) {

        console.log(url);

        $("#tittle").val(url);
        $("#rename").val(url);
        //  read();
        //$(".first_editor").focus();
        // $("#tittle").focus().select();
    } else {
        $("#tittle").focus().select();
    }


    loadautosearch("/resources/files2.json");


    // $( ".first_editor h3" ).click(function() {
    //   alert('clicked');
    //   $(this).nextUntil( ".first_editor h3, .first_editor h2" ).toggle();
    // });
    // $( ".first_editor h4" ).click(function() {
    //   $(this).nextUntil( ".first_editor h4, .first_editor h3 " ).toggle();
    // });
    //
    // $( "h2" ).click(function() {
    //   $(this).next( "h2, h1" ).toggle();
    // });
    //
    // $( "h1" ).click(function() {
    //   $(this).next( "h1" ).toggle();
    // });


    $("#tittle").focusout(function() {
        // console.log('1');

        console.log($("#tittle").val());
        $("#rename").val($("#tittle").val());
        $('.first_editor').attr('id', $("#tittle").val());
        $('.first_editor').attr("contenteditable", "true");
        $('.first_editor').focus();
        read();
        // editor.setData($( "#hidden" ).html());  // load data in the editor

        // hljs.initHighlightingOnLoad();

    });


    $("#rename").focusout(function() {
        // console.log('2');

        if ($("#tittle").val() == $("#rename").val())

            // editor.setData($( "#hidden" ).html());  // load data in the editor
            read();
        else {
            rename();
        }


    });





    CKEDITOR.instances['introduction'].destroy();
    var editor = CKEDITOR.inline("introduction");




    document.addEventListener('paste', function(e) {
        //    var html = e.clipboardData.getData ("Text");
        // e.preventDefault();
        //      if ( ctrlI ){
        //        // CKEDITOR.instances['introduction'].destroy();
        //        //
        //        //    var editor = CKEDITOR.inline("introduction");
        //
        //        console.log ("paste event");
        //        // editor.insertHtml(html);
        //      }
        //    // var html = e.clipboardData.getData('text/html');
        //    console.log(html);
        //    // Whatever you want to do with the html
    });



    editor.on('key', function(evt) {
        // console.log('3');
        //http://stackoverflow.com/questions/4401469/how-to-select-a-text-range-in-ckeditor-programatically

        var charCode = evt.data.keyCode; // at the moment this is wrong, keyCode needs to be properly converted to charCode
        // var clipboardData = evt.data.dataValue;
        // console.log(charCode);
        var tag = "h1";
        //  console.log(selectedText);
        switch (charCode) {
            case 1114161: // Ctrl 1
                tag = "<h1></h1>";
                break;
            case 1114162: // Ctrl 2
                tag = "<h2></h2>";
                break;
            case 1114163: // Ctrl 3
                tag = "<h3></h3>";
                break;
            case 1114164: // Ctrl 4
                tag = "<h4></h4>";
                break;
            case 1114166: // Ctrl 6
                tag = "<h5></h5>";
                break;

            case 1114169: // Ctrl 6
                editor.insertHtml("<div class='savetofile'>put text</div>");
                break;

            case 5570638: // Ctrl Alt N
                // tag="<b></b>";
                tag = "<em></em>"; //emphasis
                break;


            case 5570637: // Ctrl Alt M
                tag = "<mark></mark>";
                break;
            case 5570628: // Ctrl Alt D
                var d = new Date();
                var datetime = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
                tag = "<del datetime=" + datetime + " title=" + datetime + "></div>"; //del text
                break;
            case 5570633: // Ctrl Alt I
                tag = "<em></em>"; //emphasis
                break;
            case 2228314: // Shift Z   Test
                $("#cke_3_top").toggle();
                break;
            case 3342408: // CTRL Shift H  Hide/show tool bar
                // evt.data.stopPropagation();
                // evt.data.preventDefault();
                $("#cke_3_top").toggle();
                break;
            case 1114195: //Ctrl S save a version
                version();
                if ($('.savetofile').length > 0)
                    save(evt, "savetofile");

                break;

                // case 1114188 : //ctrl L
                //  var domEvent = evt.data;
                // // Prevent the click to chave any effect in the element.
                //  // domEvent.preventDefault();
                // // evt.data.preventDefault(); //avoid other shortcut keys
                //
                //
                // break;


            case 3342404: // Ctrl Shift D  Insert detail/Summary html
                var sel = editor.getSelection().getSelectedText();
                if (sel.length > 0) {
                    var details = new CKEDITOR.dom.element('details');
                    details.setHtml(' <summary>' + sel + '</summary><p>More info about the details.</p>');
                    editor.insertElement(details);
                }
                break;
            case 1114191: // Ctrl O  Open codeSnippet dialog
                editor.execCommand('codeSnippet'); //widget
                break;

            case 1114185: // Ctrl I  Inserthtml
                // var sel = editor.getSelection().getSelectedText();
                ctrlI = !ctrlI;

                // evt.data.dataValue = evt.data.dataValue
                // editor.fire( 'paste',editor);
                // console.log(e.clipboardData.getData('text/html'));

                // This code obviously will not preserve the case of the first and last letters.
                // Let it be an exercise for the reader ;).
                // editor.execCommand( 'inserthtml4x');  //widget

                break;

            case 1114182: // Ctrl F open dialog Find and replace
                editor.execCommand('find');
                break;

            case 3342402: // Ctrl Shift B
                editor.insertHtml("<br/>");
                break;
                // case 7798868:// Ctrl ALT SHIT T
                //   editor.insertHtml( "<table class=table1Class' > <tbody> \
                //      <tr><td>1</td><td>2</td></tr><tr><td>1</td><td>2</td></tr> \
                //      </tbody></table>");
                //   //  editor.insertHtml( clipboardData);
                //     // console.log(clipboardData);
                //    break;
            case 3342422: // Ctrol shift V
                texto = 'Crtl + SHIFT V'; // Ctrl 1
                // text = window.clipboardData.getData("Text");
                // console.log(texto);
                // editor.insertHtml( clipboardData);
                // console.log(texto);
                break;
            default:
                texto = 'Other key';
        }


        var keypress = [1114161, 1114162, 1114163, 1114164, 1114166, 1114169, 5570637, 5570628, 5570633, 5570638];
        // console.log(keypress.indexOf(charCode));
        if (keypress.indexOf(charCode) > -1) { // retag the select area
            var sel = editor.getSelection().getSelectedText();
            if (sel.length > 0) {
                //  var newElement = new CKEDITOR.dom.element(tag);
                var newElement = CKEDITOR.dom.element.createFromHtml(tag)
                // newElement.setAttributes({style: ''});
                newElement.setText(sel);
                editor.insertElement(newElement);
            } else {
                var newElement = new CKEDITOR.dom.element(tag);
                // newElement.setAttributes({style: ''});
                newElement.setText(sel);
                //  editor.insertElement(newElement).selectElement();
                //  editor.getSelection().selectElement(newElement);

            }
        }


    });





    // override shortcut firefox keyboard
    $('.first_editor').keypress(function(event) {

        // console.log('4');


        // console.log('evento es: '+ event.key +'shift: '+event.ctrlKey + 'crtl: '+ event.ctrlKey);
        var a = event.key;
        var b = event.ctrlKey;
        var c = event.shiftKey;
        var d = event.altKey;
        var response = event.key + event.ctrlKey + event.shiftKey + event.altKey;
        //  console.log(response);
        // console.log(b);
        switch (true) {


            case (a == 'F' && b && c && d):
                var sel = editor.getSelection().getSelectedText();
                sel = sel.replace(/\s+/g, '+');; //replace any space with +
                openInNewTab('https://en.wikipedia.org/w/index.php?search=' + sel);
                console.log(sel);
                break;

            case (a == 'F' && b && c):
                var sel = editor.getSelection().getSelectedText();
                sel = sel.replace(/\s+/g, '+');; //replace any space with +
                openInNewTab('https://www.google.com/search?q=' + sel);
                console.log(sel);
                break;


            case (a == 'H' && b && c):
            case (a == 's' && b):
                event.preventDefault(); //avoid other shortcut keys
                break;

                // case (a == 'L' && b  && c) : // Ctrl Shift L
                //      event.preventDefault(); //avoid other shortcut keys
                //     text = editor.getClipboardData("Text");
                //
                //      console.log(text);
                //
                // break;




            case (a == 'i' && b && d): //Ctrl Alt i
                editor.execCommand('mathjax'); //widget
                break;

            case (a == 'i' && b):
                console.log('press ctrl I');
                event.preventDefault(); //avoid other shortcut keys

                editor.execCommand('inserthtml4x'); //widget
                break;



        }


        // if (event.key === 'H' && event.ctrlKey && event.shiftKey  )
        //     event.preventDefault();
        // if (event.key === 's' && event.ctrlKey  )
        //     event.preventDefault();
    });


    editor.on('paste', function(evt) {

        //
        // if ( ctrlI == 1){
        //
        //   // var html = editor.getClipboardData("Text");
        //   // console.log ("paste event" + html);
        //   // editor.insertHtml(html);
        //   ctrlI=0;
        //   editor.getClipboardData( { title: 'Get my data' }, function( data ) {
        //       if ( data )
        //           console.log( 'data is: ' + data.dataValue );
        //   } );
        //
        // }
        //




        // highlightjsworkers();
    });


    editor.on('focus', function(evt) {
        // highlightjsworkers();
    });


    editor.on('blur', function(evt) {

        console.log("blurr");

        save(evt, "save");
        // editor.focus();

    });


    //change event
    editor.on('change', function(evt) {
        // console.log( 'Total bytes: ' + evt.editor.getData().length );
        // console.log('saved'+$( "#tittle" ).val());
        // $.post( "/inc/save.php", { editabledata: evt.editor.getData(), editorID: $( "#tittle" ).val() } );

    });

});