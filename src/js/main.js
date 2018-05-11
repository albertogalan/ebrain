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
var fx = require('money');
// require('ckeditor');
// CKEDITOR.replace( 'editor' );


// Add an event listener
document.addEventListener("name-of-event", function(e) {
    // console.log(e.detail); // Prints "Example of an event"
});


// $(".videolink").click(function(){

//     var src = $(this).attr("value");
//    // alert(src);
// // console.log(evt);
// // console.log($(this));
// // console.log("clicked videolink in ckeditor");
// loadVideo(src);


// })

// function loadVideo2(){

//     console.log('clicked loadVideo2');
// }


$(document).ready(function() {

    // var b1 = document.getElementById("MW");
    // b1.tabIndex = 5; //change the default tabindex



    $('.jieba').on('click touchstart', function() {
       // console.log('hello')

         
    // text="展示的时候"
    text=$(this).text()

           console.log(text)
        lang = 'zh'
        langto = 'en'
            console.log('doing translation')

        fanyi(text, lang, langto).then(function(aa) {
            console.log(aa.src)
            aa.dst = aa.pinyin + "<br>" + aa.translate + aa.handi
            var trad = '<div class="audiofanyi">' + aa.audio + '</div>' +aa.src + ': </br> ' + aa.dst ;
            $('#fanyi55').html(trad)
        });

    }); 




    var url = getParameterByName('url');
    if (url) {

        // console.log(url);

        $("#tittle").val(url);
        $("#rename").val(url);
        //  read();
        //$(".first_editor").focus();
        // $("#tittle").focus().select();
    } else {
        $("#tittle").focus().select();
    }


    // loadautosearch("/resources/files2.json");


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





window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "ArrowDown":
      // Do something for "down arrow" key press.
      break;
    case "ArrowUp":
      // Do something for "up arrow" key press.
      break;
    case "ArrowLeft":
      // Do something for "left arrow" key press.
      break;
    case "ArrowRight":
      // Do something for "right arrow" key press.
      break;
    case "Enter":
      // Do something for "enter" or "return" key press.
      break;
    case "Escape":
      // Do something for "esc" key press.
      console.log('press escape')
             translate_select();
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);


function translate_select(){


        text = window.getSelection().toString()
                console.log(text)
        lang = 'zh'
        langto = 'en'
            console.log('doing translation')

        fanyi(text, lang, langto).then(function(aa) {
            console.log(aa.src)
            aa.dst = aa.pinyin + "<br>" + aa.translate + aa.handi
            var trad = '<div class="audiofanyi">' + aa.audio + '</div>' +aa.src + ': </br> ' + aa.dst ;
            $('#fanyi55').html(trad)
        });

}


    $(".jieba").dblclick(function() {
  

translate_select()


    })








    $("button#puttogether").click(function() {
        sel = editor.extractSelectedHtml()
        aa = sel.getHtml().replace(/<br>/gm, '')
        editor.insertHtml(aa);
    })

    $("button#autotrans").click(function() {
        $("span[lang='zh-cn']").css('color', 'red')
        let lang = 'zh'
        let langto = 'en'
        let bb = $("span[lang='zh-cn']:eq(1)").text()
        console.log(`to translate: ${bb}`)
        fanyi(bb, 'zh', 'en').then(function(aa) {
            let translation = "<span class='original' lang='" + lang + "' data-pseudo-content='" + aa.src + "' >&nbsp;</span><span class='translate'  lang='" + langto + "' >" + aa.translate + "</span>"
            console.log(aa.i)
            $("span[lang='zh-cn']:eq(1)").html(translation)
            $("span[lang='zh-cn']:eq(1)").attr('lang', '')
        })

    })



    $("button#position").click(function() {
        console.log('clicked save position')
        $("#scrollArea").scrollTop()


    });

    $("button#trans").click(function() {
        console.log('clicked translate')
        $(".translate").show();
        $(".original").hide();


    });

    $("button#showtranslate").click(function() {
        console.log('clicked showtranslate')
        $(".translate").show();
        $(".original").show();

    });


    $("button#addabsolutepath").click(function() {

        console.log('clicked addabsolutepath2')


        $('img').each(function(i, v) {
            if ($(this).attr('src').includes("http")) {
                console.log('not change')

            } else {
                var aaa = document.location.origin + $(this).attr('src');
                $(this).attr('src', aaa);
                console.log($(this).attr('src'))
            }
        });

    });

    $("button#sharelink").click(function() {


        console.log('clicked sharelink ')
        console.log(document.location.origin +"/ebrain?url=" + $('#tittle').val())

        $.getJSON('ebrain?url=' + $('#tittle').val(),
            function(data) {

                $('#sharelink').attr('href', document.location.origin +'/view.php?url=' + data.hash)

            })


    });

    $("button#updatecost").click(function() {
        console.log('clicked updatedcost ')

        $.getJSON(
            // NB: using Open Exchange Rates here, but you can use any source!
            'https://openexchangerates.org/api/latest.json?app_id=960f0b8dca9344328b13ef816957d810',
            function(data) {
                // Check money.js has finished loading:
                if (typeof fx !== "undefined" && fx.rates) {
                    fx.rates = data.rates;
                    fx.base = data.base;


                    console.log('updating cost...')

                    $('.cost').each(function(i, v) {
                        aa = $(this).attr('data-cost')
                        total = Math.round(fx(aa).from("CNY").to("EUR") / 0.0095) / 100;
                        console.log("converting CNY into EUR" + fx(1).from("CNY").to("EUR"));
                        $(this).text(total)
                    });

                } else {
                    // If not, apply  to fxSetup global:
                    var fxSetup = {
                        rates: data.rates,
                        base: data.base
                    }

                }
                var d = new Date();
                var datetime = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
                editor.insertHtml("<span class='information'> date: " + datetime + " CNY to EUR Convert rate is  " + fx(1).from("CNY").to("EUR") + "</span>")
            }
        );






    });
    // https://openexchangerates.github.io/money.js/#download


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


    editor.on('paste', function(evt) {
        evt.stop();
        var data = evt.data.dataValue;

        if (window.chrome || window.safari) {
            // removing span wrapper on webkit browsers.
            data = $(data).html();
        }
        evt.editor.insertHtml(data);
    });



    editor.on('key', function(evt) {
        // console.log('3');
        //http://stackoverflow.com/questions/4401469/how-to-select-a-text-range-in-ckeditor-programatically

        var charCode = evt.data.keyCode; // at the moment this is wrong, keyCode needs to be properly converted to charCode
        // var clipboardData = evt.data.dataValue;
        console.log(charCode);
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

            case 1114300: // Ctrl ,
                console.log('convert Coin');

                sel = editor.getSelection().getSelectedText()
                console.log(sel)

                editor.insertHtml(convertCoin(sel, "yuan", "euro"))
                $('p:has(span.cost)').addClass('middle');

                break;


            case 1114304: // Ctrl `
                console.log('request fanyi');
                let lang = $("#lang").val(),
                    langto = $("#langto").val()



                sel = editor.getSelection().getSelectedText().replace(/(\r\n\t|\n|\r\t)/gm, "");
                if (sel.length > 0) {
                    fanyi(sel, lang, langto).then(function(aa) {
                        let translation = "<span class='original' lang='" + lang + "' data-pseudo-content='" + aa.src + "' >&nbsp;</span><span class='translate'  lang='" + langto + "' >" + aa.translate + "</span>"
                        editor.insertHtml(translation);
                    })
                }



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
                // console.log(sel);
                break;

            case (a == 'F' && b && c):
                var sel = editor.getSelection().getSelectedText();
                sel = sel.replace(/\s+/g, '+');; //replace any space with +
                openInNewTab('https://www.google.com/search?q=' + sel);
                // console.log(sel);
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
                // console.log('press ctrl I');
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

    editor.on('click', function(evt) {

        console.log('click');

    });

    editor.on('doubleclick', function(evt) {
        var element = evt.data.element;
        //console.log('doubleclick');
        classe = element.getAttribute("class");
        console.log('doubleclick in class ' + classe)
        if (classe == 'jieba'){

           translate_select();



        }
        if (classe == 'videolink') {
            loadVideo(element);
        }
        classe = element.getAttribute("class");
        if (classe == 'videolink') {
            loadVideo(element);
        }
        var tag = element.getName();
        // console.log(tag);
        if (tag == 'a') {
            url = element.getAttribute("href");
            openInNewTab(url);
            // console.log ('click link'+ url);

        }

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


function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function hashCode(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


function convertCoin(value, coin, tocoin) {
    console.log('convertCoin')

    let aa = "<span data-cost='" + value + "' data-coin='" + coin + "' data-coin-convert='" + tocoin + "' class='cost'>To convert " + coin + " into " + tocoin + " " + value + "</span>"
    // $('td p:has(span.cost)').addClass('middle');
    return aa
}


function doSomething() {
    return new Promise((resolve, reject) => {
        console.log("It is done.");
        // Succeed half of the time.
        if (Math.random() > .5) {
            resolve("SUCCESS")
        } else {
            reject("FAILURE")
        }
    })
}

function fanyi(text, lang, langto) {
    return new Promise((resolve, reject) => {
        console.log(`It is done. ${text} ${lang} ${langto}`);
        // Succeed half of the time.
        // lang = 'zh'
        // langto = 'en'
        var url = document.location.origin +'/fanyi'
        var headers = {
            "Content-Type": "application/json"
        };
        var data = {
            "from": lang,
            "to": langto,
            "src": text,
            "i": '1'
        };
        console.log('this is the text to translate ' + text)

        var encode_params = $.param(data, true)
        var url = url + '?' + encode_params

        $.getJSON(url, function(data) {

            resolve(data)
        });


    })

}






function message(str) {

    $("#textinfo").html(str).css({ opacity: 0.99 });
    $("#textinfo").animate({ opacity: 0 }, 1200);
}

function basename(path, suffix) {
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

function agregatext(selector) {
    var texts = '';

    $(".first_editor").children(selector).each(function() {

        $(this).children("p").each(function() {

            texts += $(this).text() + "\r\n";

        });

        var allListElements = $("li br");

        $(".first_editor").find(allListElements).each(function()
            // $(this).nextAll("li").each(function()
            {
                texts += "  " + $(this).contents().get(0).nodeValue + "\r\n";

            });





    });


    return texts;
}






function save(evt, action) {


    switch (action) {
        case "save": // editor save content
            console.log("editor save 2");
            $.post("/inc/save.php", { action: "save", data: evt.editor.getData(), path: "/data/rw1/m1", file: $("#tittle").val() });
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
            var file = basename(file, '');
            // var data='';
            // $("#savetofile").each(function() {
            //    data = data  +  $(this).val();
            //    //code
            // });
            data = agregatext(".savetofile");
            //  data="test";
            console.log(data);
            console.log(path);
            console.log(file);

            $.post("/inc/save.php", { action: "save", data: data, path: path, file: file });


            // console.log(path.basename(str, '.html'));

            break;
        default:


            console.log("save default");

    }




    //  console.log("hascode is is: " + hashCode($( "#hidden" ).text()));
    // console.log ("1 " +hashCode($( "#hidden" ).text()));
    // console.log ("2 " +$( "#hash" ).text());

}


function read() {



    $.get('/m1/' + $("#tittle").val(), { "_": $.now() }, function(data2) {
        console.log("reading file " + '/m1/' + $("#tittle").val());


        // console.log(data);
        //  $('#hidden').html(data2);
        $('.first_editor').html(data2);

        highlightjsworkers();


        // $('.first_editor').html(data);

    }).done(function() {


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

function highlightjsworkers() {

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
function rename() {

    console.log("change this file: " + $("#tittle").val() + " by this file: " + $("#rename").val());
    $.post("/inc/save.php", { action: "rename", file: $("#tittle").val(), path: "/data/rw1/m1", fileout: $("#rename").val() }, function() {
            $("#tittle").val($("#rename").val());
        })
        .done(function() {
            message("file renamed to " + $("#rename").val());
        })
        .fail(function() {
            alert("error");
        });

};


//rename file
function version() {

    console.log("creating a new version of this: " + $("#tittle").val());

    $.post("/inc/save.php", { action: "version", file: $("#tittle").val(), path: "/data/rw1/m1", fileout: $("#rename").val() }, function() {
            $("#tittle").val($("#rename").val());
        })
        .done(function() {
            message("New version backed");
        })
        .fail(function() {
            alert("error");
        });

};






function loadautosearch(source) {

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




function loadVideo(element) {

    console.log('element is videolink');
    console.log(element.getAttribute("value"));
    src = element.getAttribute("value");
    // $('video.videoread source').attr('src', src);
    $('#my-player_html5_api').attr('src', src);
    $('#my-player_html5_api').load();
    $('#my-player_html5_api').play();
    // $("video.videoread")[0].load();
    // $("video.videoread")[0].play();
    // evt.data.dialog = 'tableProperties'   ;

}



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function insertBaidumap() {


    var map = new BMap.Map("allmap"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl({
        mapTypes: [
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]
    }));
    map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

}