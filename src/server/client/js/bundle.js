(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// var nodejieba = require("./nodejieba");


// Add an event listener
document.addEventListener("name-of-event", function(e) {
    // console.log(e.detail); // Prints "Example of an event"
});




$(document).ready(function() {

    // var b1 = document.getElementById("MW");
    // b1.tabIndex = 5; //change the default tabindex

    require('ckeditor');
    // CKEDITOR.replace( 'editor' );

    CKEDITOR.instances['introduction'].destroy();
    var editor = CKEDITOR.inline("introduction");


    $('.jieba').on('click touchstart', function() {
        text = $(this).text()
        console.log(text)
        lang = 'zh'
        langto = 'en'
        console.log('doing translation')
        translate_select(text)
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

    window.addEventListener("keydown", function(event) {
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
                sel = window.getSelection();
                console.log('sel ' + sel)
                translate_select(sel);
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);


    function translate_select(texto) {



        console.log(texto)
        lang = 'zh'
        langto = 'en'
        console.log('doing translation')

        fanyi(texto, lang, langto).then(function(aa) {
            console.log(aa.src)
            aa.dst = aa.pinyin + "<br>" + aa.translate + aa.handi
            var trad = aa.src + ': </br> ' + aa.dst;
            $('#fanyi55').html(trad)
            $('audiofanyi').attr('src',aa.audio)
        });

    }


    //     $(".jieba").dblclick(function() {
    //     // text = window.getSelection().toString()
    // text=$(this).text()
    // console.log(text)
    // // translate_select(text)


    //     })




    $("button#puttogether").click(function() {
        sel = editor.extractSelectedHtml()
        aa = sel.getHtml().replace(/<br>/gm, '')
        editor.insertHtml(aa);
    })

    $("button#jieba2").click(function() {
//                 sel = window.getSelection();


console.log("click in jieba button")
var result = nodejieba.cut("南京市长江大桥");
console.log(result);



    })


$("button#testspeech").click(function(){

    var Speech = require('speak-tts') //if you use es5
Speech.init({
    'onVoicesLoaded': (data) => {console.log('voices', data.voices)},
    'lang': 'zh-CN', // specify en-US language (no detection applied)
    'volume': 0.5,
    'rate': 0.8,
    'pitch': 0.8,
    'voice': 'Samantha'
})

Speech.speak({
    text: 'Hello, how are you today ?',
    onError: (e) => {console.log('sorry an error occurred.', e)}, // optionnal error callback
    onEnd: () => {console.log('your text has successfully been spoken.')} // optionnal onEnd callback
})

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
        console.log(document.location.origin + "/ebrain?url=" + $('#tittle').val())

        $.getJSON('ebrain?url=' + $('#tittle').val(),
            function(data) {

                $('#sharelink').attr('href', document.location.origin + '/view.php?url=' + data.hash)

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
        if (classe == 'jieba') {
            var text = window.getSelection();
            console.log(text)
            translate_select(text);
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
    });

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
        var url = document.location.origin + '/fanyi'
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
},{"ckeditor":2,"money":7,"speak-tts":9}],2:[function(require,module,exports){
/*
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){window.CKEDITOR&&window.CKEDITOR.dom||(window.CKEDITOR||(window.CKEDITOR=function(){var a=/(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,e={timestamp:"I3I8",version:"4.9.2 (Standard)",revision:"95e5d83ee",rnd:Math.floor(900*Math.random())+100,_:{pending:[],basePathSrcPattern:a},status:"unloaded",basePath:function(){var b=window.CKEDITOR_BASEPATH||"";if(!b)for(var c=document.getElementsByTagName("script"),e=0;e<c.length;e++){var g=c[e].src.match(a);if(g){b=g[1];break}}-1==b.indexOf(":/")&&"//"!=
b.slice(0,2)&&(b=0===b.indexOf("/")?location.href.match(/^.*?:\/\/[^\/]*/)[0]+b:location.href.match(/^[^\?]*\/(?:)/)[0]+b);if(!b)throw'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';return b}(),getUrl:function(a){-1==a.indexOf(":/")&&0!==a.indexOf("/")&&(a=this.basePath+a);this.timestamp&&"/"!=a.charAt(a.length-1)&&!/[&?]t=/.test(a)&&(a+=(0<=a.indexOf("?")?"\x26":"?")+"t\x3d"+this.timestamp);
return a},domReady:function(){function a(){try{document.addEventListener?(document.removeEventListener("DOMContentLoaded",a,!1),b()):document.attachEvent&&"complete"===document.readyState&&(document.detachEvent("onreadystatechange",a),b())}catch(g){}}function b(){for(var a;a=c.shift();)a()}var c=[];return function(g){function b(){try{document.documentElement.doScroll("left")}catch(f){setTimeout(b,1);return}a()}c.push(g);"complete"===document.readyState&&setTimeout(a,1);if(1==c.length)if(document.addEventListener)document.addEventListener("DOMContentLoaded",
a,!1),window.addEventListener("load",a,!1);else if(document.attachEvent){document.attachEvent("onreadystatechange",a);window.attachEvent("onload",a);g=!1;try{g=!window.frameElement}catch(m){}document.documentElement.doScroll&&g&&b()}}}()},b=window.CKEDITOR_GETURL;if(b){var c=e.getUrl;e.getUrl=function(a){return b.call(e,a)||c.call(e,a)}}return e}()),CKEDITOR.event||(CKEDITOR.event=function(){},CKEDITOR.event.implementOn=function(a){var e=CKEDITOR.event.prototype,b;for(b in e)null==a[b]&&(a[b]=e[b])},
CKEDITOR.event.prototype=function(){function a(a){var d=e(this);return d[a]||(d[a]=new b(a))}var e=function(a){a=a.getPrivate&&a.getPrivate()||a._||(a._={});return a.events||(a.events={})},b=function(a){this.name=a;this.listeners=[]};b.prototype={getListenerIndex:function(a){for(var b=0,e=this.listeners;b<e.length;b++)if(e[b].fn==a)return b;return-1}};return{define:function(b,d){var e=a.call(this,b);CKEDITOR.tools.extend(e,d,!0)},on:function(b,d,e,k,g){function h(f,a,g,n){f={name:b,sender:this,editor:f,
data:a,listenerData:k,stop:g,cancel:n,removeListener:m};return!1===d.call(e,f)?!1:f.data}function m(){n.removeListener(b,d)}var f=a.call(this,b);if(0>f.getListenerIndex(d)){f=f.listeners;e||(e=this);isNaN(g)&&(g=10);var n=this;h.fn=d;h.priority=g;for(var p=f.length-1;0<=p;p--)if(f[p].priority<=g)return f.splice(p+1,0,h),{removeListener:m};f.unshift(h)}return{removeListener:m}},once:function(){var a=Array.prototype.slice.call(arguments),b=a[1];a[1]=function(a){a.removeListener();return b.apply(this,
arguments)};return this.on.apply(this,a)},capture:function(){CKEDITOR.event.useCapture=1;var a=this.on.apply(this,arguments);CKEDITOR.event.useCapture=0;return a},fire:function(){var a=0,b=function(){a=1},l=0,k=function(){l=1};return function(g,h,m){var f=e(this)[g];g=a;var n=l;a=l=0;if(f){var p=f.listeners;if(p.length)for(var p=p.slice(0),r,v=0;v<p.length;v++){if(f.errorProof)try{r=p[v].call(this,m,h,b,k)}catch(x){}else r=p[v].call(this,m,h,b,k);!1===r?l=1:"undefined"!=typeof r&&(h=r);if(a||l)break}}h=
l?!1:"undefined"==typeof h?!0:h;a=g;l=n;return h}}(),fireOnce:function(a,b,l){b=this.fire(a,b,l);delete e(this)[a];return b},removeListener:function(a,b){var l=e(this)[a];if(l){var k=l.getListenerIndex(b);0<=k&&l.listeners.splice(k,1)}},removeAllListeners:function(){var a=e(this),b;for(b in a)delete a[b]},hasListeners:function(a){return(a=e(this)[a])&&0<a.listeners.length}}}()),CKEDITOR.editor||(CKEDITOR.editor=function(){CKEDITOR._.pending.push([this,arguments]);CKEDITOR.event.call(this)},CKEDITOR.editor.prototype.fire=
function(a,e){a in{instanceReady:1,loaded:1}&&(this[a]=!0);return CKEDITOR.event.prototype.fire.call(this,a,e,this)},CKEDITOR.editor.prototype.fireOnce=function(a,e){a in{instanceReady:1,loaded:1}&&(this[a]=!0);return CKEDITOR.event.prototype.fireOnce.call(this,a,e,this)},CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)),CKEDITOR.env||(CKEDITOR.env=function(){var a=navigator.userAgent.toLowerCase(),e=a.match(/edge[ \/](\d+.?\d*)/),b=-1<a.indexOf("trident/"),b=!(!e&&!b),b={ie:b,edge:!!e,webkit:!b&&
-1<a.indexOf(" applewebkit/"),air:-1<a.indexOf(" adobeair/"),mac:-1<a.indexOf("macintosh"),quirks:"BackCompat"==document.compatMode&&(!document.documentMode||10>document.documentMode),mobile:-1<a.indexOf("mobile"),iOS:/(ipad|iphone|ipod)/.test(a),isCustomDomain:function(){if(!this.ie)return!1;var a=document.domain,b=window.location.hostname;return a!=b&&a!="["+b+"]"},secure:"https:"==location.protocol};b.gecko="Gecko"==navigator.product&&!b.webkit&&!b.ie;b.webkit&&(-1<a.indexOf("chrome")?b.chrome=
!0:b.safari=!0);var c=0;b.ie&&(c=e?parseFloat(e[1]):b.quirks||!document.documentMode?parseFloat(a.match(/msie (\d+)/)[1]):document.documentMode,b.ie9Compat=9==c,b.ie8Compat=8==c,b.ie7Compat=7==c,b.ie6Compat=7>c||b.quirks);b.gecko&&(e=a.match(/rv:([\d\.]+)/))&&(e=e[1].split("."),c=1E4*e[0]+100*(e[1]||0)+1*(e[2]||0));b.air&&(c=parseFloat(a.match(/ adobeair\/(\d+)/)[1]));b.webkit&&(c=parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));b.version=c;b.isCompatible=!(b.ie&&7>c)&&!(b.gecko&&4E4>c)&&!(b.webkit&&
534>c);b.hidpi=2<=window.devicePixelRatio;b.needsBrFiller=b.gecko||b.webkit||b.ie&&10<c;b.needsNbspFiller=b.ie&&11>c;b.cssClass="cke_browser_"+(b.ie?"ie":b.gecko?"gecko":b.webkit?"webkit":"unknown");b.quirks&&(b.cssClass+=" cke_browser_quirks");b.ie&&(b.cssClass+=" cke_browser_ie"+(b.quirks?"6 cke_browser_iequirks":b.version));b.air&&(b.cssClass+=" cke_browser_air");b.iOS&&(b.cssClass+=" cke_browser_ios");b.hidpi&&(b.cssClass+=" cke_hidpi");return b}()),"unloaded"==CKEDITOR.status&&function(){CKEDITOR.event.implementOn(CKEDITOR);
CKEDITOR.loadFullCore=function(){if("basic_ready"!=CKEDITOR.status)CKEDITOR.loadFullCore._load=1;else{delete CKEDITOR.loadFullCore;var a=document.createElement("script");a.type="text/javascript";a.src=CKEDITOR.basePath+"ckeditor.js";document.getElementsByTagName("head")[0].appendChild(a)}};CKEDITOR.loadFullCoreTimeout=0;CKEDITOR.add=function(a){(this._.pending||(this._.pending=[])).push(a)};(function(){CKEDITOR.domReady(function(){var a=CKEDITOR.loadFullCore,e=CKEDITOR.loadFullCoreTimeout;a&&(CKEDITOR.status=
"basic_ready",a&&a._load?a():e&&setTimeout(function(){CKEDITOR.loadFullCore&&CKEDITOR.loadFullCore()},1E3*e))})})();CKEDITOR.status="basic_loaded"}(),"use strict",CKEDITOR.VERBOSITY_WARN=1,CKEDITOR.VERBOSITY_ERROR=2,CKEDITOR.verbosity=CKEDITOR.VERBOSITY_WARN|CKEDITOR.VERBOSITY_ERROR,CKEDITOR.warn=function(a,e){CKEDITOR.verbosity&CKEDITOR.VERBOSITY_WARN&&CKEDITOR.fire("log",{type:"warn",errorCode:a,additionalData:e})},CKEDITOR.error=function(a,e){CKEDITOR.verbosity&CKEDITOR.VERBOSITY_ERROR&&CKEDITOR.fire("log",
{type:"error",errorCode:a,additionalData:e})},CKEDITOR.on("log",function(a){if(window.console&&window.console.log){var e=console[a.data.type]?a.data.type:"log",b=a.data.errorCode;if(a=a.data.additionalData)console[e]("[CKEDITOR] Error code: "+b+".",a);else console[e]("[CKEDITOR] Error code: "+b+".");console[e]("[CKEDITOR] For more information about this error go to https://docs.ckeditor.com/ckeditor4/docs/#!/guide/dev_errors-section-"+b)}},null,null,999),CKEDITOR.dom={},function(){var a=[],e=CKEDITOR.env.gecko?
"-moz-":CKEDITOR.env.webkit?"-webkit-":CKEDITOR.env.ie?"-ms-":"",b=/&/g,c=/>/g,d=/</g,l=/"/g,k=/&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,g={lt:"\x3c",gt:"\x3e",amp:"\x26",quot:'"',nbsp:" ",shy:"­"},h=function(a,f){return"#"==f[0]?String.fromCharCode(parseInt(f.slice(1),10)):g[f]};CKEDITOR.on("reset",function(){a=[]});CKEDITOR.tools={arrayCompare:function(a,f){if(!a&&!f)return!0;if(!a||!f||a.length!=f.length)return!1;for(var b=0;b<a.length;b++)if(a[b]!=f[b])return!1;return!0},getIndex:function(a,f){for(var b=
0;b<a.length;++b)if(f(a[b]))return b;return-1},clone:function(a){var f;if(a&&a instanceof Array){f=[];for(var b=0;b<a.length;b++)f[b]=CKEDITOR.tools.clone(a[b]);return f}if(null===a||"object"!=typeof a||a instanceof String||a instanceof Number||a instanceof Boolean||a instanceof Date||a instanceof RegExp||a.nodeType||a.window===a)return a;f=new a.constructor;for(b in a)f[b]=CKEDITOR.tools.clone(a[b]);return f},capitalize:function(a,f){return a.charAt(0).toUpperCase()+(f?a.slice(1):a.slice(1).toLowerCase())},
extend:function(a){var f=arguments.length,b,g;"boolean"==typeof(b=arguments[f-1])?f--:"boolean"==typeof(b=arguments[f-2])&&(g=arguments[f-1],f-=2);for(var h=1;h<f;h++){var c=arguments[h],d;for(d in c)if(!0===b||null==a[d])if(!g||d in g)a[d]=c[d]}return a},prototypedCopy:function(a){var f=function(){};f.prototype=a;return new f},copy:function(a){var f={},b;for(b in a)f[b]=a[b];return f},isArray:function(a){return"[object Array]"==Object.prototype.toString.call(a)},isEmpty:function(a){for(var f in a)if(a.hasOwnProperty(f))return!1;
return!0},cssVendorPrefix:function(a,f,b){if(b)return e+a+":"+f+";"+a+":"+f;b={};b[a]=f;b[e+a]=f;return b},cssStyleToDomStyle:function(){var a=document.createElement("div").style,f="undefined"!=typeof a.cssFloat?"cssFloat":"undefined"!=typeof a.styleFloat?"styleFloat":"float";return function(a){return"float"==a?f:a.replace(/-./g,function(f){return f.substr(1).toUpperCase()})}}(),buildStyleHtml:function(a){a=[].concat(a);for(var f,b=[],g=0;g<a.length;g++)if(f=a[g])/@import|[{}]/.test(f)?b.push("\x3cstyle\x3e"+
f+"\x3c/style\x3e"):b.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"'+f+'"\x3e');return b.join("")},htmlEncode:function(a){return void 0===a||null===a?"":String(a).replace(b,"\x26amp;").replace(c,"\x26gt;").replace(d,"\x26lt;")},htmlDecode:function(a){return a.replace(k,h)},htmlEncodeAttr:function(a){return CKEDITOR.tools.htmlEncode(a).replace(l,"\x26quot;")},htmlDecodeAttr:function(a){return CKEDITOR.tools.htmlDecode(a)},transformPlainTextToHtml:function(a,f){var b=f==CKEDITOR.ENTER_BR,
g=this.htmlEncode(a.replace(/\r\n/g,"\n")),g=g.replace(/\t/g,"\x26nbsp;\x26nbsp; \x26nbsp;"),h=f==CKEDITOR.ENTER_P?"p":"div";if(!b){var c=/\n{2}/g;if(c.test(g))var d="\x3c"+h+"\x3e",e="\x3c/"+h+"\x3e",g=d+g.replace(c,function(){return e+d})+e}g=g.replace(/\n/g,"\x3cbr\x3e");b||(g=g.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/"+h+"\x3e)"),function(f){return CKEDITOR.tools.repeat(f,2)}));g=g.replace(/^ | $/g,"\x26nbsp;");return g=g.replace(/(>|\s) /g,function(f,a){return a+"\x26nbsp;"}).replace(/ (?=<)/g,
"\x26nbsp;")},getNextNumber:function(){var a=0;return function(){return++a}}(),getNextId:function(){return"cke_"+this.getNextNumber()},getUniqueId:function(){for(var a="e",f=0;8>f;f++)a+=Math.floor(65536*(1+Math.random())).toString(16).substring(1);return a},override:function(a,f){var b=f(a);b.prototype=a.prototype;return b},setTimeout:function(a,f,b,g,h){h||(h=window);b||(b=h);return h.setTimeout(function(){g?a.apply(b,[].concat(g)):a.apply(b)},f||0)},trim:function(){var a=/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
return function(f){return f.replace(a,"")}}(),ltrim:function(){var a=/^[ \t\n\r]+/g;return function(f){return f.replace(a,"")}}(),rtrim:function(){var a=/[ \t\n\r]+$/g;return function(f){return f.replace(a,"")}}(),indexOf:function(a,f){if("function"==typeof f)for(var b=0,g=a.length;b<g;b++){if(f(a[b]))return b}else{if(a.indexOf)return a.indexOf(f);b=0;for(g=a.length;b<g;b++)if(a[b]===f)return b}return-1},search:function(a,f){var b=CKEDITOR.tools.indexOf(a,f);return 0<=b?a[b]:null},bind:function(a,
f){return function(){return a.apply(f,arguments)}},createClass:function(a){var f=a.$,b=a.base,g=a.privates||a._,h=a.proto;a=a.statics;!f&&(f=function(){b&&this.base.apply(this,arguments)});if(g)var c=f,f=function(){var f=this._||(this._={}),a;for(a in g){var b=g[a];f[a]="function"==typeof b?CKEDITOR.tools.bind(b,this):b}c.apply(this,arguments)};b&&(f.prototype=this.prototypedCopy(b.prototype),f.prototype.constructor=f,f.base=b,f.baseProto=b.prototype,f.prototype.base=function(){this.base=b.prototype.base;
b.apply(this,arguments);this.base=arguments.callee});h&&this.extend(f.prototype,h,!0);a&&this.extend(f,a,!0);return f},addFunction:function(b,f){return a.push(function(){return b.apply(f||this,arguments)})-1},removeFunction:function(b){a[b]=null},callFunction:function(b){var f=a[b];return f&&f.apply(window,Array.prototype.slice.call(arguments,1))},cssLength:function(){var a=/^-?\d+\.?\d*px$/,f;return function(b){f=CKEDITOR.tools.trim(b+"")+"px";return a.test(f)?f:b||""}}(),convertToPx:function(){var a;
return function(f){a||(a=CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e',CKEDITOR.document),CKEDITOR.document.getBody().append(a));return/%$/.test(f)?f:(a.setStyle("width",f),a.$.clientWidth)}}(),repeat:function(a,f){return Array(f+1).join(a)},tryThese:function(){for(var a,f=0,b=arguments.length;f<b;f++){var g=arguments[f];try{a=g();break}catch(h){}}return a},genKey:function(){return Array.prototype.slice.call(arguments).join("-")},
defer:function(a){return function(){var f=arguments,b=this;window.setTimeout(function(){a.apply(b,f)},0)}},normalizeCssText:function(a,f){var b=[],g,h=CKEDITOR.tools.parseCssText(a,!0,f);for(g in h)b.push(g+":"+h[g]);b.sort();return b.length?b.join(";")+";":""},convertRgbToHex:function(a){return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi,function(f,a,b,g){f=[a,b,g];for(a=0;3>a;a++)f[a]=("0"+parseInt(f[a],10).toString(16)).slice(-2);return"#"+f.join("")})},normalizeHex:function(a){return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi,
function(a,b,g,h){a=b.toLowerCase();3==a.length&&(a=a.split(""),a=[a[0],a[0],a[1],a[1],a[2],a[2]].join(""));return"#"+a+h})},parseCssText:function(a,f,b){var g={};b&&(a=(new CKEDITOR.dom.element("span")).setAttribute("style",a).getAttribute("style")||"");a&&(a=CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a)));if(!a||";"==a)return g;a.replace(/&quot;/g,'"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(a,b,h){f&&(b=b.toLowerCase(),"font-family"==b&&(h=h.replace(/\s*,\s*/g,
",")),h=CKEDITOR.tools.trim(h));g[b]=h});return g},writeCssText:function(a,f){var b,g=[];for(b in a)g.push(b+":"+a[b]);f&&g.sort();return g.join("; ")},objectCompare:function(a,f,b){var g;if(!a&&!f)return!0;if(!a||!f)return!1;for(g in a)if(a[g]!=f[g])return!1;if(!b)for(g in f)if(a[g]!=f[g])return!1;return!0},objectKeys:function(a){var f=[],b;for(b in a)f.push(b);return f},convertArrayToObject:function(a,f){var b={};1==arguments.length&&(f=!0);for(var g=0,h=a.length;g<h;++g)b[a[g]]=f;return b},fixDomain:function(){for(var a;;)try{a=
window.parent.document.domain;break}catch(f){a=a?a.replace(/.+?(?:\.|$)/,""):document.domain;if(!a)break;document.domain=a}return!!a},eventsBuffer:function(a,f,b){function g(){c=(new Date).getTime();h=!1;b?f.call(b):f()}var h,c=0;return{input:function(){if(!h){var f=(new Date).getTime()-c;f<a?h=setTimeout(g,a-f):g()}},reset:function(){h&&clearTimeout(h);h=c=0}}},enableHtml5Elements:function(a,f){for(var b="abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "),
g=b.length,h;g--;)h=a.createElement(b[g]),f&&a.appendChild(h)},checkIfAnyArrayItemMatches:function(a,f){for(var b=0,g=a.length;b<g;++b)if(a[b].match(f))return!0;return!1},checkIfAnyObjectPropertyMatches:function(a,f){for(var b in a)if(b.match(f))return!0;return!1},keystrokeToString:function(a,f){var b=this.keystrokeToArray(a,f);b.display=b.display.join("+");b.aria=b.aria.join("+");return b},keystrokeToArray:function(a,f){var b=f&16711680,g=f&65535,h=CKEDITOR.env.mac,c=[],d=[];b&CKEDITOR.CTRL&&(c.push(h?
"⌘":a[17]),d.push(h?a[224]:a[17]));b&CKEDITOR.ALT&&(c.push(h?"⌥":a[18]),d.push(a[18]));b&CKEDITOR.SHIFT&&(c.push(h?"⇧":a[16]),d.push(a[16]));g&&(a[g]?(c.push(a[g]),d.push(a[g])):(c.push(String.fromCharCode(g)),d.push(String.fromCharCode(g))));return{display:c,aria:d}},transparentImageData:"data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",getCookie:function(a){a=a.toLowerCase();for(var f=document.cookie.split(";"),b,g,h=0;h<f.length;h++)if(b=f[h].split("\x3d"),
g=decodeURIComponent(CKEDITOR.tools.trim(b[0]).toLowerCase()),g===a)return decodeURIComponent(1<b.length?b[1]:"");return null},setCookie:function(a,f){document.cookie=encodeURIComponent(a)+"\x3d"+encodeURIComponent(f)+";path\x3d/"},getCsrfToken:function(){var a=CKEDITOR.tools.getCookie("ckCsrfToken");if(!a||40!=a.length){var a=[],f="";if(window.crypto&&window.crypto.getRandomValues)a=new Uint8Array(40),window.crypto.getRandomValues(a);else for(var b=0;40>b;b++)a.push(Math.floor(256*Math.random()));
for(b=0;b<a.length;b++)var g="abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[b]%36),f=f+(.5<Math.random()?g.toUpperCase():g);a=f;CKEDITOR.tools.setCookie("ckCsrfToken",a)}return a},escapeCss:function(a){return a?window.CSS&&CSS.escape?CSS.escape(a):isNaN(parseInt(a.charAt(0),10))?a:"\\3"+a.charAt(0)+" "+a.substring(1,a.length):""},getMouseButton:function(a){var f=(a=a.data)&&a.$;return a&&f?CKEDITOR.env.ie&&9>CKEDITOR.env.version?4===f.button?CKEDITOR.MOUSE_BUTTON_MIDDLE:1===f.button?CKEDITOR.MOUSE_BUTTON_LEFT:
CKEDITOR.MOUSE_BUTTON_RIGHT:f.button:!1},convertHexStringToBytes:function(a){var f=[],b=a.length/2,g;for(g=0;g<b;g++)f.push(parseInt(a.substr(2*g,2),16));return f},convertBytesToBase64:function(a){var f="",b=a.length,g;for(g=0;g<b;g+=3){var h=a.slice(g,g+3),c=h.length,d=[],e;if(3>c)for(e=c;3>e;e++)h[e]=0;d[0]=(h[0]&252)>>2;d[1]=(h[0]&3)<<4|h[1]>>4;d[2]=(h[1]&15)<<2|(h[2]&192)>>6;d[3]=h[2]&63;for(e=0;4>e;e++)f=e<=c?f+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d[e]):f+
"\x3d"}return f},style:{parse:{_colors:{aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aqua:"#00FFFF",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blue:"#0000FF",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",
darkgreen:"#006400",darkgrey:"#A9A9A9",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",fuchsia:"#FF00FF",
gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",gray:"#808080",green:"#008000",greenyellow:"#ADFF2F",grey:"#808080",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgray:"#D3D3D3",lightgreen:"#90EE90",lightgrey:"#D3D3D3",lightpink:"#FFB6C1",
lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",lime:"#00FF00",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",maroon:"#800000",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",
mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",navy:"#000080",oldlace:"#FDF5E6",olive:"#808000",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",purple:"#800080",rebeccapurple:"#663399",red:"#FF0000",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",
sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",silver:"#C0C0C0",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",teal:"#008080",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",white:"#FFFFFF",whitesmoke:"#F5F5F5",yellow:"#FFFF00",yellowgreen:"#9ACD32"},_borderStyle:"none hidden dotted dashed solid double groove ridge inset outset".split(" "),
_widthRegExp:/^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/,_rgbaRegExp:/rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi,_hslaRegExp:/hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi,background:function(a){var f={},b=this._findColor(a);b.length&&(f.color=b[0],CKEDITOR.tools.array.forEach(b,function(f){a=a.replace(f,"")}));if(a=CKEDITOR.tools.trim(a))f.unprocessed=a;return f},margin:function(a){function f(a){b.top=g[a[0]];b.right=
g[a[1]];b.bottom=g[a[2]];b.left=g[a[3]]}var b={},g=a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset)/g)||["0px"];switch(g.length){case 1:f([0,0,0,0]);break;case 2:f([0,1,0,1]);break;case 3:f([0,1,2,1]);break;case 4:f([0,1,2,3])}return b},border:function(a){var f={},b=a.split(/\s+/g);a=CKEDITOR.tools.style.parse._findColor(a);a.length&&(f.color=a[0]);CKEDITOR.tools.array.forEach(b,function(a){f.style||-1===CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle,a)?!f.width&&CKEDITOR.tools.style.parse._widthRegExp.test(a)&&
(f.width=a):f.style=a});return f},_findColor:function(a){var f=[],b=CKEDITOR.tools.array,f=f.concat(a.match(this._rgbaRegExp)||[]),f=f.concat(a.match(this._hslaRegExp)||[]);return f=f.concat(b.filter(a.split(/\s+/),function(a){return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi)?!0:a.toLowerCase()in CKEDITOR.tools.style.parse._colors}))}}},array:{filter:function(a,f,b){var g=[];this.forEach(a,function(h,c){f.call(b,h,c,a)&&g.push(h)});return g},forEach:function(a,f,b){var g=a.length,h;for(h=0;h<g;h++)f.call(b,
a[h],h,a)},map:function(a,f,b){for(var g=[],h=0;h<a.length;h++)g.push(f.call(b,a[h],h,a));return g},reduce:function(a,f,b,g){for(var h=0;h<a.length;h++)b=f.call(g,b,a[h],h,a);return b},every:function(a,f,b){if(!a.length)return!0;f=this.filter(a,f,b);return a.length===f.length}},object:{findKey:function(a,f){if("object"!==typeof a)return null;for(var b in a)if(a[b]===f)return b;return null},merge:function(a,f){var b=CKEDITOR.tools,g=b.clone(a),h=b.clone(f);b.array.forEach(b.objectKeys(h),function(a){g[a]=
"object"===typeof h[a]&&"object"===typeof g[a]?b.object.merge(g[a],h[a]):h[a]});return g}}};CKEDITOR.tools.array.indexOf=CKEDITOR.tools.indexOf;CKEDITOR.tools.array.isArray=CKEDITOR.tools.isArray;CKEDITOR.MOUSE_BUTTON_LEFT=0;CKEDITOR.MOUSE_BUTTON_MIDDLE=1;CKEDITOR.MOUSE_BUTTON_RIGHT=2}(),CKEDITOR.dtd=function(){var a=CKEDITOR.tools.extend,e=function(a,f){for(var b=CKEDITOR.tools.clone(a),g=1;g<arguments.length;g++){f=arguments[g];for(var h in f)delete b[h]}return b},b={},c={},d={address:1,article:1,
aside:1,blockquote:1,details:1,div:1,dl:1,fieldset:1,figure:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,hr:1,main:1,menu:1,nav:1,ol:1,p:1,pre:1,section:1,table:1,ul:1},l={command:1,link:1,meta:1,noscript:1,script:1,style:1},k={},g={"#":1},h={center:1,dir:1,noframes:1};a(b,{a:1,abbr:1,area:1,audio:1,b:1,bdi:1,bdo:1,br:1,button:1,canvas:1,cite:1,code:1,command:1,datalist:1,del:1,dfn:1,em:1,embed:1,i:1,iframe:1,img:1,input:1,ins:1,kbd:1,keygen:1,label:1,map:1,mark:1,meter:1,noscript:1,
object:1,output:1,progress:1,q:1,ruby:1,s:1,samp:1,script:1,select:1,small:1,span:1,strong:1,sub:1,sup:1,textarea:1,time:1,u:1,"var":1,video:1,wbr:1},g,{acronym:1,applet:1,basefont:1,big:1,font:1,isindex:1,strike:1,style:1,tt:1});a(c,d,b,h);e={a:e(b,{a:1,button:1}),abbr:b,address:c,area:k,article:c,aside:c,audio:a({source:1,track:1},c),b:b,base:k,bdi:b,bdo:b,blockquote:c,body:c,br:k,button:e(b,{a:1,button:1}),canvas:b,caption:c,cite:b,code:b,col:k,colgroup:{col:1},command:k,datalist:a({option:1},
b),dd:c,del:b,details:a({summary:1},c),dfn:b,div:c,dl:{dt:1,dd:1},dt:c,em:b,embed:k,fieldset:a({legend:1},c),figcaption:c,figure:a({figcaption:1},c),footer:c,form:c,h1:b,h2:b,h3:b,h4:b,h5:b,h6:b,head:a({title:1,base:1},l),header:c,hgroup:{h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},hr:k,html:a({head:1,body:1},c,l),i:b,iframe:g,img:k,input:k,ins:b,kbd:b,keygen:k,label:b,legend:b,li:c,link:k,main:c,map:c,mark:b,menu:a({li:1},c),meta:k,meter:e(b,{meter:1}),nav:c,noscript:a({link:1,meta:1,style:1},b),object:a({param:1},
b),ol:{li:1},optgroup:{option:1},option:g,output:b,p:b,param:k,pre:b,progress:e(b,{progress:1}),q:b,rp:b,rt:b,ruby:a({rp:1,rt:1},b),s:b,samp:b,script:g,section:c,select:{optgroup:1,option:1},small:b,source:k,span:b,strong:b,style:g,sub:b,summary:a({h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},b),sup:b,table:{caption:1,colgroup:1,thead:1,tfoot:1,tbody:1,tr:1},tbody:{tr:1},td:c,textarea:g,tfoot:{tr:1},th:c,thead:{tr:1},time:e(b,{time:1}),title:g,tr:{th:1,td:1},track:k,u:b,ul:{li:1},"var":b,video:a({source:1,track:1},
c),wbr:k,acronym:b,applet:a({param:1},c),basefont:k,big:b,center:c,dialog:k,dir:{li:1},font:b,isindex:k,noframes:c,strike:b,tt:b};a(e,{$block:a({audio:1,dd:1,dt:1,figcaption:1,li:1,video:1},d,h),$blockLimit:{article:1,aside:1,audio:1,body:1,caption:1,details:1,dir:1,div:1,dl:1,fieldset:1,figcaption:1,figure:1,footer:1,form:1,header:1,hgroup:1,main:1,menu:1,nav:1,ol:1,section:1,table:1,td:1,th:1,tr:1,ul:1,video:1},$cdata:{script:1,style:1},$editable:{address:1,article:1,aside:1,blockquote:1,body:1,
details:1,div:1,fieldset:1,figcaption:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,main:1,nav:1,p:1,pre:1,section:1},$empty:{area:1,base:1,basefont:1,br:1,col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1},$inline:b,$list:{dl:1,ol:1,ul:1},$listItem:{dd:1,dt:1,li:1},$nonBodyContent:a({body:1,head:1,html:1},e.head),$nonEditable:{applet:1,audio:1,button:1,embed:1,iframe:1,map:1,object:1,option:1,param:1,script:1,textarea:1,
video:1},$object:{applet:1,audio:1,button:1,hr:1,iframe:1,img:1,input:1,object:1,select:1,table:1,textarea:1,video:1},$removeEmpty:{abbr:1,acronym:1,b:1,bdi:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,mark:1,meter:1,output:1,q:1,ruby:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,time:1,tt:1,u:1,"var":1},$tabIndex:{a:1,area:1,button:1,input:1,object:1,select:1,textarea:1},$tableContent:{caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1},$transparent:{a:1,
audio:1,canvas:1,del:1,ins:1,map:1,noscript:1,object:1,video:1},$intermediate:{caption:1,colgroup:1,dd:1,dt:1,figcaption:1,legend:1,li:1,optgroup:1,option:1,rp:1,rt:1,summary:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1}});return e}(),CKEDITOR.dom.event=function(a){this.$=a},CKEDITOR.dom.event.prototype={getKey:function(){return this.$.keyCode||this.$.which},getKeystroke:function(){var a=this.getKey();if(this.$.ctrlKey||this.$.metaKey)a+=CKEDITOR.CTRL;this.$.shiftKey&&(a+=CKEDITOR.SHIFT);this.$.altKey&&
(a+=CKEDITOR.ALT);return a},preventDefault:function(a){var e=this.$;e.preventDefault?e.preventDefault():e.returnValue=!1;a&&this.stopPropagation()},stopPropagation:function(){var a=this.$;a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},getTarget:function(){var a=this.$.target||this.$.srcElement;return a?new CKEDITOR.dom.node(a):null},getPhase:function(){return this.$.eventPhase||2},getPageOffset:function(){var a=this.getTarget().getDocument().$;return{x:this.$.pageX||this.$.clientX+(a.documentElement.scrollLeft||
a.body.scrollLeft),y:this.$.pageY||this.$.clientY+(a.documentElement.scrollTop||a.body.scrollTop)}}},CKEDITOR.CTRL=1114112,CKEDITOR.SHIFT=2228224,CKEDITOR.ALT=4456448,CKEDITOR.EVENT_PHASE_CAPTURING=1,CKEDITOR.EVENT_PHASE_AT_TARGET=2,CKEDITOR.EVENT_PHASE_BUBBLING=3,CKEDITOR.dom.domObject=function(a){a&&(this.$=a)},CKEDITOR.dom.domObject.prototype=function(){var a=function(a,b){return function(c){"undefined"!=typeof CKEDITOR&&a.fire(b,new CKEDITOR.dom.event(c))}};return{getPrivate:function(){var a;
(a=this.getCustomData("_"))||this.setCustomData("_",a={});return a},on:function(e){var b=this.getCustomData("_cke_nativeListeners");b||(b={},this.setCustomData("_cke_nativeListeners",b));b[e]||(b=b[e]=a(this,e),this.$.addEventListener?this.$.addEventListener(e,b,!!CKEDITOR.event.useCapture):this.$.attachEvent&&this.$.attachEvent("on"+e,b));return CKEDITOR.event.prototype.on.apply(this,arguments)},removeListener:function(a){CKEDITOR.event.prototype.removeListener.apply(this,arguments);if(!this.hasListeners(a)){var b=
this.getCustomData("_cke_nativeListeners"),c=b&&b[a];c&&(this.$.removeEventListener?this.$.removeEventListener(a,c,!1):this.$.detachEvent&&this.$.detachEvent("on"+a,c),delete b[a])}},removeAllListeners:function(){var a=this.getCustomData("_cke_nativeListeners"),b;for(b in a){var c=a[b];this.$.detachEvent?this.$.detachEvent("on"+b,c):this.$.removeEventListener&&this.$.removeEventListener(b,c,!1);delete a[b]}CKEDITOR.event.prototype.removeAllListeners.call(this)}}}(),function(a){var e={};CKEDITOR.on("reset",
function(){e={}});a.equals=function(a){try{return a&&a.$===this.$}catch(c){return!1}};a.setCustomData=function(a,c){var d=this.getUniqueId();(e[d]||(e[d]={}))[a]=c;return this};a.getCustomData=function(a){var c=this.$["data-cke-expando"];return(c=c&&e[c])&&a in c?c[a]:null};a.removeCustomData=function(a){var c=this.$["data-cke-expando"],c=c&&e[c],d,l;c&&(d=c[a],l=a in c,delete c[a]);return l?d:null};a.clearCustomData=function(){this.removeAllListeners();var a=this.$["data-cke-expando"];a&&delete e[a]};
a.getUniqueId=function(){return this.$["data-cke-expando"]||(this.$["data-cke-expando"]=CKEDITOR.tools.getNextNumber())};CKEDITOR.event.implementOn(a)}(CKEDITOR.dom.domObject.prototype),CKEDITOR.dom.node=function(a){return a?new CKEDITOR.dom[a.nodeType==CKEDITOR.NODE_DOCUMENT?"document":a.nodeType==CKEDITOR.NODE_ELEMENT?"element":a.nodeType==CKEDITOR.NODE_TEXT?"text":a.nodeType==CKEDITOR.NODE_COMMENT?"comment":a.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT?"documentFragment":"domObject"](a):this},CKEDITOR.dom.node.prototype=
new CKEDITOR.dom.domObject,CKEDITOR.NODE_ELEMENT=1,CKEDITOR.NODE_DOCUMENT=9,CKEDITOR.NODE_TEXT=3,CKEDITOR.NODE_COMMENT=8,CKEDITOR.NODE_DOCUMENT_FRAGMENT=11,CKEDITOR.POSITION_IDENTICAL=0,CKEDITOR.POSITION_DISCONNECTED=1,CKEDITOR.POSITION_FOLLOWING=2,CKEDITOR.POSITION_PRECEDING=4,CKEDITOR.POSITION_IS_CONTAINED=8,CKEDITOR.POSITION_CONTAINS=16,CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype,{appendTo:function(a,e){a.append(this,e);return a},clone:function(a,e){function b(c){c["data-cke-expando"]&&(c["data-cke-expando"]=
!1);if(c.nodeType==CKEDITOR.NODE_ELEMENT||c.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT)if(e||c.nodeType!=CKEDITOR.NODE_ELEMENT||c.removeAttribute("id",!1),a){c=c.childNodes;for(var d=0;d<c.length;d++)b(c[d])}}function c(b){if(b.type==CKEDITOR.NODE_ELEMENT||b.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT){if(b.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var d=b.getName();":"==d[0]&&b.renameNode(d.substring(1))}if(a)for(d=0;d<b.getChildCount();d++)c(b.getChild(d))}}var d=this.$.cloneNode(a);b(d);d=new CKEDITOR.dom.node(d);
CKEDITOR.env.ie&&9>CKEDITOR.env.version&&(this.type==CKEDITOR.NODE_ELEMENT||this.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)&&c(d);return d},hasPrevious:function(){return!!this.$.previousSibling},hasNext:function(){return!!this.$.nextSibling},insertAfter:function(a){a.$.parentNode.insertBefore(this.$,a.$.nextSibling);return a},insertBefore:function(a){a.$.parentNode.insertBefore(this.$,a.$);return a},insertBeforeMe:function(a){this.$.parentNode.insertBefore(a.$,this.$);return a},getAddress:function(a){for(var e=
[],b=this.getDocument().$.documentElement,c=this.$;c&&c!=b;){var d=c.parentNode;d&&e.unshift(this.getIndex.call({$:c},a));c=d}return e},getDocument:function(){return new CKEDITOR.dom.document(this.$.ownerDocument||this.$.parentNode.ownerDocument)},getIndex:function(a){function e(a,g){var h=g?a.nextSibling:a.previousSibling;return h&&h.nodeType==CKEDITOR.NODE_TEXT?b(h)?e(h,g):h:null}function b(a){return!a.nodeValue||a.nodeValue==CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE}var c=this.$,d=-1,l;if(!this.$.parentNode||
a&&c.nodeType==CKEDITOR.NODE_TEXT&&b(c)&&!e(c)&&!e(c,!0))return-1;do a&&c!=this.$&&c.nodeType==CKEDITOR.NODE_TEXT&&(l||b(c))||(d++,l=c.nodeType==CKEDITOR.NODE_TEXT);while(c=c.previousSibling);return d},getNextSourceNode:function(a,e,b){if(b&&!b.call){var c=b;b=function(a){return!a.equals(c)}}a=!a&&this.getFirst&&this.getFirst();var d;if(!a){if(this.type==CKEDITOR.NODE_ELEMENT&&b&&!1===b(this,!0))return null;a=this.getNext()}for(;!a&&(d=(d||this).getParent());){if(b&&!1===b(d,!0))return null;a=d.getNext()}return!a||
b&&!1===b(a)?null:e&&e!=a.type?a.getNextSourceNode(!1,e,b):a},getPreviousSourceNode:function(a,e,b){if(b&&!b.call){var c=b;b=function(a){return!a.equals(c)}}a=!a&&this.getLast&&this.getLast();var d;if(!a){if(this.type==CKEDITOR.NODE_ELEMENT&&b&&!1===b(this,!0))return null;a=this.getPrevious()}for(;!a&&(d=(d||this).getParent());){if(b&&!1===b(d,!0))return null;a=d.getPrevious()}return!a||b&&!1===b(a)?null:e&&a.type!=e?a.getPreviousSourceNode(!1,e,b):a},getPrevious:function(a){var e=this.$,b;do b=(e=
e.previousSibling)&&10!=e.nodeType&&new CKEDITOR.dom.node(e);while(b&&a&&!a(b));return b},getNext:function(a){var e=this.$,b;do b=(e=e.nextSibling)&&new CKEDITOR.dom.node(e);while(b&&a&&!a(b));return b},getParent:function(a){var e=this.$.parentNode;return e&&(e.nodeType==CKEDITOR.NODE_ELEMENT||a&&e.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT)?new CKEDITOR.dom.node(e):null},getParents:function(a){var e=this,b=[];do b[a?"push":"unshift"](e);while(e=e.getParent());return b},getCommonAncestor:function(a){if(a.equals(this))return this;
if(a.contains&&a.contains(this))return a;var e=this.contains?this:this.getParent();do if(e.contains(a))return e;while(e=e.getParent());return null},getPosition:function(a){var e=this.$,b=a.$;if(e.compareDocumentPosition)return e.compareDocumentPosition(b);if(e==b)return CKEDITOR.POSITION_IDENTICAL;if(this.type==CKEDITOR.NODE_ELEMENT&&a.type==CKEDITOR.NODE_ELEMENT){if(e.contains){if(e.contains(b))return CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING;if(b.contains(e))return CKEDITOR.POSITION_IS_CONTAINED+
CKEDITOR.POSITION_FOLLOWING}if("sourceIndex"in e)return 0>e.sourceIndex||0>b.sourceIndex?CKEDITOR.POSITION_DISCONNECTED:e.sourceIndex<b.sourceIndex?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING}e=this.getAddress();a=a.getAddress();for(var b=Math.min(e.length,a.length),c=0;c<b;c++)if(e[c]!=a[c])return e[c]<a[c]?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING;return e.length<a.length?CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING},
getAscendant:function(a,e){var b=this.$,c,d;e||(b=b.parentNode);"function"==typeof a?(d=!0,c=a):(d=!1,c=function(b){b="string"==typeof b.nodeName?b.nodeName.toLowerCase():"";return"string"==typeof a?b==a:b in a});for(;b;){if(c(d?new CKEDITOR.dom.node(b):b))return new CKEDITOR.dom.node(b);try{b=b.parentNode}catch(l){b=null}}return null},hasAscendant:function(a,e){var b=this.$;e||(b=b.parentNode);for(;b;){if(b.nodeName&&b.nodeName.toLowerCase()==a)return!0;b=b.parentNode}return!1},move:function(a,e){a.append(this.remove(),
e)},remove:function(a){var e=this.$,b=e.parentNode;if(b){if(a)for(;a=e.firstChild;)b.insertBefore(e.removeChild(a),e);b.removeChild(e)}return this},replace:function(a){this.insertBefore(a);a.remove()},trim:function(){this.ltrim();this.rtrim()},ltrim:function(){for(var a;this.getFirst&&(a=this.getFirst());){if(a.type==CKEDITOR.NODE_TEXT){var e=CKEDITOR.tools.ltrim(a.getText()),b=a.getLength();if(e)e.length<b&&(a.split(b-e.length),this.$.removeChild(this.$.firstChild));else{a.remove();continue}}break}},
rtrim:function(){for(var a;this.getLast&&(a=this.getLast());){if(a.type==CKEDITOR.NODE_TEXT){var e=CKEDITOR.tools.rtrim(a.getText()),b=a.getLength();if(e)e.length<b&&(a.split(e.length),this.$.lastChild.parentNode.removeChild(this.$.lastChild));else{a.remove();continue}}break}CKEDITOR.env.needsBrFiller&&(a=this.$.lastChild)&&1==a.type&&"br"==a.nodeName.toLowerCase()&&a.parentNode.removeChild(a)},isReadOnly:function(a){var e=this;this.type!=CKEDITOR.NODE_ELEMENT&&(e=this.getParent());CKEDITOR.env.edge&&
e&&e.is("textarea","input")&&(a=!0);if(!a&&e&&"undefined"!=typeof e.$.isContentEditable)return!(e.$.isContentEditable||e.data("cke-editable"));for(;e;){if(e.data("cke-editable"))return!1;if(e.hasAttribute("contenteditable"))return"false"==e.getAttribute("contenteditable");e=e.getParent()}return!0}}),CKEDITOR.dom.window=function(a){CKEDITOR.dom.domObject.call(this,a)},CKEDITOR.dom.window.prototype=new CKEDITOR.dom.domObject,CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype,{focus:function(){this.$.focus()},
getViewPaneSize:function(){var a=this.$.document,e="CSS1Compat"==a.compatMode;return{width:(e?a.documentElement.clientWidth:a.body.clientWidth)||0,height:(e?a.documentElement.clientHeight:a.body.clientHeight)||0}},getScrollPosition:function(){var a=this.$;if("pageXOffset"in a)return{x:a.pageXOffset||0,y:a.pageYOffset||0};a=a.document;return{x:a.documentElement.scrollLeft||a.body.scrollLeft||0,y:a.documentElement.scrollTop||a.body.scrollTop||0}},getFrame:function(){var a=this.$.frameElement;return a?
new CKEDITOR.dom.element.get(a):null}}),CKEDITOR.dom.document=function(a){CKEDITOR.dom.domObject.call(this,a)},CKEDITOR.dom.document.prototype=new CKEDITOR.dom.domObject,CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype,{type:CKEDITOR.NODE_DOCUMENT,appendStyleSheet:function(a){if(this.$.createStyleSheet)this.$.createStyleSheet(a);else{var e=new CKEDITOR.dom.element("link");e.setAttributes({rel:"stylesheet",type:"text/css",href:a});this.getHead().append(e)}},appendStyleText:function(a){if(this.$.createStyleSheet){var e=
this.$.createStyleSheet("");e.cssText=a}else{var b=new CKEDITOR.dom.element("style",this);b.append(new CKEDITOR.dom.text(a,this));this.getHead().append(b)}return e||b.$.sheet},createElement:function(a,e){var b=new CKEDITOR.dom.element(a,this);e&&(e.attributes&&b.setAttributes(e.attributes),e.styles&&b.setStyles(e.styles));return b},createText:function(a){return new CKEDITOR.dom.text(a,this)},focus:function(){this.getWindow().focus()},getActive:function(){var a;try{a=this.$.activeElement}catch(e){return null}return new CKEDITOR.dom.element(a)},
getById:function(a){return(a=this.$.getElementById(a))?new CKEDITOR.dom.element(a):null},getByAddress:function(a,e){for(var b=this.$.documentElement,c=0;b&&c<a.length;c++){var d=a[c];if(e)for(var l=-1,k=0;k<b.childNodes.length;k++){var g=b.childNodes[k];if(!0!==e||3!=g.nodeType||!g.previousSibling||3!=g.previousSibling.nodeType)if(l++,l==d){b=g;break}}else b=b.childNodes[d]}return b?new CKEDITOR.dom.node(b):null},getElementsByTag:function(a,e){CKEDITOR.env.ie&&8>=document.documentMode||!e||(a=e+":"+
a);return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a))},getHead:function(){var a=this.$.getElementsByTagName("head")[0];return a=a?new CKEDITOR.dom.element(a):this.getDocumentElement().append(new CKEDITOR.dom.element("head"),!0)},getBody:function(){return new CKEDITOR.dom.element(this.$.body)},getDocumentElement:function(){return new CKEDITOR.dom.element(this.$.documentElement)},getWindow:function(){return new CKEDITOR.dom.window(this.$.parentWindow||this.$.defaultView)},write:function(a){this.$.open("text/html",
"replace");CKEDITOR.env.ie&&(a=a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i,'$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e('+CKEDITOR.tools.fixDomain+")();\x3c/script\x3e"));this.$.write(a);this.$.close()},find:function(a){return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a))},findOne:function(a){return(a=this.$.querySelector(a))?new CKEDITOR.dom.element(a):null},_getHtml5ShivFrag:function(){var a=this.getCustomData("html5ShivFrag");a||(a=this.$.createDocumentFragment(),CKEDITOR.tools.enableHtml5Elements(a,
!0),this.setCustomData("html5ShivFrag",a));return a}}),CKEDITOR.dom.nodeList=function(a){this.$=a},CKEDITOR.dom.nodeList.prototype={count:function(){return this.$.length},getItem:function(a){return 0>a||a>=this.$.length?null:(a=this.$[a])?new CKEDITOR.dom.node(a):null},toArray:function(){return CKEDITOR.tools.array.map(this.$,function(a){return new CKEDITOR.dom.node(a)})}},CKEDITOR.dom.element=function(a,e){"string"==typeof a&&(a=(e?e.$:document).createElement(a));CKEDITOR.dom.domObject.call(this,
a)},CKEDITOR.dom.element.get=function(a){return(a="string"==typeof a?document.getElementById(a)||document.getElementsByName(a)[0]:a)&&(a.$?a:new CKEDITOR.dom.element(a))},CKEDITOR.dom.element.prototype=new CKEDITOR.dom.node,CKEDITOR.dom.element.createFromHtml=function(a,e){var b=new CKEDITOR.dom.element("div",e);b.setHtml(a);return b.getFirst().remove()},CKEDITOR.dom.element.setMarker=function(a,e,b,c){var d=e.getCustomData("list_marker_id")||e.setCustomData("list_marker_id",CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
l=e.getCustomData("list_marker_names")||e.setCustomData("list_marker_names",{}).getCustomData("list_marker_names");a[d]=e;l[b]=1;return e.setCustomData(b,c)},CKEDITOR.dom.element.clearAllMarkers=function(a){for(var e in a)CKEDITOR.dom.element.clearMarkers(a,a[e],1)},CKEDITOR.dom.element.clearMarkers=function(a,e,b){var c=e.getCustomData("list_marker_names"),d=e.getCustomData("list_marker_id"),l;for(l in c)e.removeCustomData(l);e.removeCustomData("list_marker_names");b&&(e.removeCustomData("list_marker_id"),
delete a[d])},function(){function a(a,b){return-1<(" "+a+" ").replace(l," ").indexOf(" "+b+" ")}function e(a){var b=!0;a.$.id||(a.$.id="cke_tmp_"+CKEDITOR.tools.getNextNumber(),b=!1);return function(){b||a.removeAttribute("id")}}function b(a,b){var c=CKEDITOR.tools.escapeCss(a.$.id);return"#"+c+" "+b.split(/,\s*/).join(", #"+c+" ")}function c(a){for(var b=0,c=0,f=k[a].length;c<f;c++)b+=parseFloat(this.getComputedStyle(k[a][c])||0,10)||0;return b}var d=document.createElement("_").classList,d="undefined"!==
typeof d&&null!==String(d.add).match(/\[Native code\]/gi),l=/[\n\t\r]/g;CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype,{type:CKEDITOR.NODE_ELEMENT,addClass:d?function(a){this.$.classList.add(a);return this}:function(b){var h=this.$.className;h&&(a(h,b)||(h+=" "+b));this.$.className=h||b;return this},removeClass:d?function(a){var b=this.$;b.classList.remove(a);b.className||b.removeAttribute("class");return this}:function(b){var h=this.getAttribute("class");h&&a(h,b)&&((h=h.replace(new RegExp("(?:^|\\s+)"+
b+"(?\x3d\\s|$)"),"").replace(/^\s+/,""))?this.setAttribute("class",h):this.removeAttribute("class"));return this},hasClass:function(b){return a(this.$.className,b)},append:function(a,b){"string"==typeof a&&(a=this.getDocument().createElement(a));b?this.$.insertBefore(a.$,this.$.firstChild):this.$.appendChild(a.$);return a},appendHtml:function(a){if(this.$.childNodes.length){var b=new CKEDITOR.dom.element("div",this.getDocument());b.setHtml(a);b.moveChildren(this)}else this.setHtml(a)},appendText:function(a){null!=
this.$.text&&CKEDITOR.env.ie&&9>CKEDITOR.env.version?this.$.text+=a:this.append(new CKEDITOR.dom.text(a))},appendBogus:function(a){if(a||CKEDITOR.env.needsBrFiller){for(a=this.getLast();a&&a.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.rtrim(a.getText());)a=a.getPrevious();a&&a.is&&a.is("br")||(a=this.getDocument().createElement("br"),CKEDITOR.env.gecko&&a.setAttribute("type","_moz"),this.append(a))}},breakParent:function(a,b){var c=new CKEDITOR.dom.range(this.getDocument());c.setStartAfter(this);c.setEndAfter(a);
var f=c.extractContents(!1,b||!1),d;c.insertNode(this.remove());if(CKEDITOR.env.ie&&!CKEDITOR.env.edge){for(c=new CKEDITOR.dom.element("div");d=f.getFirst();)d.$.style.backgroundColor&&(d.$.style.backgroundColor=d.$.style.backgroundColor),c.append(d);c.insertAfter(this);c.remove(!0)}else f.insertAfterNode(this)},contains:document.compareDocumentPosition?function(a){return!!(this.$.compareDocumentPosition(a.$)&16)}:function(a){var b=this.$;return a.type!=CKEDITOR.NODE_ELEMENT?b.contains(a.getParent().$):
b!=a.$&&b.contains(a.$)},focus:function(){function a(){try{this.$.focus()}catch(b){}}return function(b){b?CKEDITOR.tools.setTimeout(a,100,this):a.call(this)}}(),getHtml:function(){var a=this.$.innerHTML;return CKEDITOR.env.ie?a.replace(/<\?[^>]*>/g,""):a},getOuterHtml:function(){if(this.$.outerHTML)return this.$.outerHTML.replace(/<\?[^>]*>/,"");var a=this.$.ownerDocument.createElement("div");a.appendChild(this.$.cloneNode(!0));return a.innerHTML},getClientRect:function(){var a=CKEDITOR.tools.extend({},
this.$.getBoundingClientRect());!a.width&&(a.width=a.right-a.left);!a.height&&(a.height=a.bottom-a.top);return a},setHtml:CKEDITOR.env.ie&&9>CKEDITOR.env.version?function(a){try{var b=this.$;if(this.getParent())return b.innerHTML=a;var c=this.getDocument()._getHtml5ShivFrag();c.appendChild(b);b.innerHTML=a;c.removeChild(b);return a}catch(f){this.$.innerHTML="";b=new CKEDITOR.dom.element("body",this.getDocument());b.$.innerHTML=a;for(b=b.getChildren();b.count();)this.append(b.getItem(0));return a}}:
function(a){return this.$.innerHTML=a},setText:function(){var a=document.createElement("p");a.innerHTML="x";a=a.textContent;return function(b){this.$[a?"textContent":"innerText"]=b}}(),getAttribute:function(){var a=function(a){return this.$.getAttribute(a,2)};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(a){switch(a){case "class":a="className";break;case "http-equiv":a="httpEquiv";break;case "name":return this.$.name;case "tabindex":return a=this.$.getAttribute(a,
2),0!==a&&0===this.$.tabIndex&&(a=null),a;case "checked":return a=this.$.attributes.getNamedItem(a),(a.specified?a.nodeValue:this.$.checked)?"checked":null;case "hspace":case "value":return this.$[a];case "style":return this.$.style.cssText;case "contenteditable":case "contentEditable":return this.$.attributes.getNamedItem("contentEditable").specified?this.$.getAttribute("contentEditable"):null}return this.$.getAttribute(a,2)}:a}(),getAttributes:function(a){var b={},c=this.$.attributes,f;a=CKEDITOR.tools.isArray(a)?
a:[];for(f=0;f<c.length;f++)-1===CKEDITOR.tools.indexOf(a,c[f].name)&&(b[c[f].name]=c[f].value);return b},getChildren:function(){return new CKEDITOR.dom.nodeList(this.$.childNodes)},getComputedStyle:document.defaultView&&document.defaultView.getComputedStyle?function(a){var b=this.getWindow().$.getComputedStyle(this.$,null);return b?b.getPropertyValue(a):""}:function(a){return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]},getDtd:function(){var a=CKEDITOR.dtd[this.getName()];this.getDtd=
function(){return a};return a},getElementsByTag:CKEDITOR.dom.document.prototype.getElementsByTag,getTabIndex:function(){var a=this.$.tabIndex;return 0!==a||CKEDITOR.dtd.$tabIndex[this.getName()]||0===parseInt(this.getAttribute("tabindex"),10)?a:-1},getText:function(){return this.$.textContent||this.$.innerText||""},getWindow:function(){return this.getDocument().getWindow()},getId:function(){return this.$.id||null},getNameAtt:function(){return this.$.name||null},getName:function(){var a=this.$.nodeName.toLowerCase();
if(CKEDITOR.env.ie&&8>=document.documentMode){var b=this.$.scopeName;"HTML"!=b&&(a=b.toLowerCase()+":"+a)}this.getName=function(){return a};return this.getName()},getValue:function(){return this.$.value},getFirst:function(a){var b=this.$.firstChild;(b=b&&new CKEDITOR.dom.node(b))&&a&&!a(b)&&(b=b.getNext(a));return b},getLast:function(a){var b=this.$.lastChild;(b=b&&new CKEDITOR.dom.node(b))&&a&&!a(b)&&(b=b.getPrevious(a));return b},getStyle:function(a){return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]},
is:function(){var a=this.getName();if("object"==typeof arguments[0])return!!arguments[0][a];for(var b=0;b<arguments.length;b++)if(arguments[b]==a)return!0;return!1},isEditable:function(a){var b=this.getName();return this.isReadOnly()||"none"==this.getComputedStyle("display")||"hidden"==this.getComputedStyle("visibility")||CKEDITOR.dtd.$nonEditable[b]||CKEDITOR.dtd.$empty[b]||this.is("a")&&(this.data("cke-saved-name")||this.hasAttribute("name"))&&!this.getChildCount()?!1:!1!==a?(a=CKEDITOR.dtd[b]||
CKEDITOR.dtd.span,!(!a||!a["#"])):!0},isIdentical:function(a){var b=this.clone(0,1);a=a.clone(0,1);b.removeAttributes(["_moz_dirty","data-cke-expando","data-cke-saved-href","data-cke-saved-name"]);a.removeAttributes(["_moz_dirty","data-cke-expando","data-cke-saved-href","data-cke-saved-name"]);if(b.$.isEqualNode)return b.$.style.cssText=CKEDITOR.tools.normalizeCssText(b.$.style.cssText),a.$.style.cssText=CKEDITOR.tools.normalizeCssText(a.$.style.cssText),b.$.isEqualNode(a.$);b=b.getOuterHtml();a=
a.getOuterHtml();if(CKEDITOR.env.ie&&9>CKEDITOR.env.version&&this.is("a")){var c=this.getParent();c.type==CKEDITOR.NODE_ELEMENT&&(c=c.clone(),c.setHtml(b),b=c.getHtml(),c.setHtml(a),a=c.getHtml())}return b==a},isVisible:function(){var a=(this.$.offsetHeight||this.$.offsetWidth)&&"hidden"!=this.getComputedStyle("visibility"),b,c;a&&CKEDITOR.env.webkit&&(b=this.getWindow(),!b.equals(CKEDITOR.document.getWindow())&&(c=b.$.frameElement)&&(a=(new CKEDITOR.dom.element(c)).isVisible()));return!!a},isEmptyInlineRemoveable:function(){if(!CKEDITOR.dtd.$removeEmpty[this.getName()])return!1;
for(var a=this.getChildren(),b=0,c=a.count();b<c;b++){var f=a.getItem(b);if(f.type!=CKEDITOR.NODE_ELEMENT||!f.data("cke-bookmark"))if(f.type==CKEDITOR.NODE_ELEMENT&&!f.isEmptyInlineRemoveable()||f.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(f.getText()))return!1}return!0},hasAttributes:CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(){for(var a=this.$.attributes,b=0;b<a.length;b++){var c=a[b];switch(c.nodeName){case "class":if(this.getAttribute("class"))return!0;case "data-cke-expando":continue;
default:if(c.specified)return!0}}return!1}:function(){var a=this.$.attributes,b=a.length,c={"data-cke-expando":1,_moz_dirty:1};return 0<b&&(2<b||!c[a[0].nodeName]||2==b&&!c[a[1].nodeName])},hasAttribute:function(){function a(b){var c=this.$.attributes.getNamedItem(b);if("input"==this.getName())switch(b){case "class":return 0<this.$.className.length;case "checked":return!!this.$.checked;case "value":return b=this.getAttribute("type"),"checkbox"==b||"radio"==b?"on"!=this.$.value:!!this.$.value}return c?
c.specified:!1}return CKEDITOR.env.ie?8>CKEDITOR.env.version?function(b){return"name"==b?!!this.$.name:a.call(this,b)}:a:function(a){return!!this.$.attributes.getNamedItem(a)}}(),hide:function(){this.setStyle("display","none")},moveChildren:function(a,b){var c=this.$;a=a.$;if(c!=a){var f;if(b)for(;f=c.lastChild;)a.insertBefore(c.removeChild(f),a.firstChild);else for(;f=c.firstChild;)a.appendChild(c.removeChild(f))}},mergeSiblings:function(){function a(b,c,f){if(c&&c.type==CKEDITOR.NODE_ELEMENT){for(var g=
[];c.data("cke-bookmark")||c.isEmptyInlineRemoveable();)if(g.push(c),c=f?c.getNext():c.getPrevious(),!c||c.type!=CKEDITOR.NODE_ELEMENT)return;if(b.isIdentical(c)){for(var d=f?b.getLast():b.getFirst();g.length;)g.shift().move(b,!f);c.moveChildren(b,!f);c.remove();d&&d.type==CKEDITOR.NODE_ELEMENT&&d.mergeSiblings()}}}return function(b){if(!1===b||CKEDITOR.dtd.$removeEmpty[this.getName()]||this.is("a"))a(this,this.getNext(),!0),a(this,this.getPrevious())}}(),show:function(){this.setStyles({display:"",
visibility:""})},setAttribute:function(){var a=function(a,b){this.$.setAttribute(a,b);return this};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(b,c){"class"==b?this.$.className=c:"style"==b?this.$.style.cssText=c:"tabindex"==b?this.$.tabIndex=c:"checked"==b?this.$.checked=c:"contenteditable"==b?a.call(this,"contentEditable",c):a.apply(this,arguments);return this}:CKEDITOR.env.ie8Compat&&CKEDITOR.env.secure?function(b,c){if("src"==b&&c.match(/^http:\/\//))try{a.apply(this,
arguments)}catch(f){}else a.apply(this,arguments);return this}:a}(),setAttributes:function(a){for(var b in a)this.setAttribute(b,a[b]);return this},setValue:function(a){this.$.value=a;return this},removeAttribute:function(){var a=function(a){this.$.removeAttribute(a)};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(a){"class"==a?a="className":"tabindex"==a?a="tabIndex":"contenteditable"==a&&(a="contentEditable");this.$.removeAttribute(a)}:a}(),removeAttributes:function(a){if(CKEDITOR.tools.isArray(a))for(var b=
0;b<a.length;b++)this.removeAttribute(a[b]);else for(b in a=a||this.getAttributes(),a)a.hasOwnProperty(b)&&this.removeAttribute(b)},removeStyle:function(a){var b=this.$.style;if(b.removeProperty||"border"!=a&&"margin"!=a&&"padding"!=a)b.removeProperty?b.removeProperty(a):b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)),this.$.style.cssText||this.removeAttribute("style");else{var c=["top","left","right","bottom"],f;"border"==a&&(f=["color","style","width"]);for(var b=[],d=0;d<c.length;d++)if(f)for(var e=
0;e<f.length;e++)b.push([a,c[d],f[e]].join("-"));else b.push([a,c[d]].join("-"));for(a=0;a<b.length;a++)this.removeStyle(b[a])}},setStyle:function(a,b){this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]=b;return this},setStyles:function(a){for(var b in a)this.setStyle(b,a[b]);return this},setOpacity:function(a){CKEDITOR.env.ie&&9>CKEDITOR.env.version?(a=Math.round(100*a),this.setStyle("filter",100<=a?"":"progid:DXImageTransform.Microsoft.Alpha(opacity\x3d"+a+")")):this.setStyle("opacity",a)},unselectable:function(){this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
"none"));if(CKEDITOR.env.ie){this.setAttribute("unselectable","on");for(var a,b=this.getElementsByTag("*"),c=0,f=b.count();c<f;c++)a=b.getItem(c),a.setAttribute("unselectable","on")}},getPositionedAncestor:function(){for(var a=this;"html"!=a.getName();){if("static"!=a.getComputedStyle("position"))return a;a=a.getParent()}return null},getDocumentPosition:function(a){var b=0,c=0,f=this.getDocument(),d=f.getBody(),e="BackCompat"==f.$.compatMode;if(document.documentElement.getBoundingClientRect&&(CKEDITOR.env.ie?
8!==CKEDITOR.env.version:1)){var l=this.$.getBoundingClientRect(),k=f.$.documentElement,x=k.clientTop||d.$.clientTop||0,q=k.clientLeft||d.$.clientLeft||0,t=!0;CKEDITOR.env.ie&&(t=f.getDocumentElement().contains(this),f=f.getBody().contains(this),t=e&&f||!e&&t);t&&(CKEDITOR.env.webkit||CKEDITOR.env.ie&&12<=CKEDITOR.env.version?(b=d.$.scrollLeft||k.scrollLeft,c=d.$.scrollTop||k.scrollTop):(c=e?d.$:k,b=c.scrollLeft,c=c.scrollTop),b=l.left+b-q,c=l.top+c-x)}else for(x=this,q=null;x&&"body"!=x.getName()&&
"html"!=x.getName();){b+=x.$.offsetLeft-x.$.scrollLeft;c+=x.$.offsetTop-x.$.scrollTop;x.equals(this)||(b+=x.$.clientLeft||0,c+=x.$.clientTop||0);for(;q&&!q.equals(x);)b-=q.$.scrollLeft,c-=q.$.scrollTop,q=q.getParent();q=x;x=(l=x.$.offsetParent)?new CKEDITOR.dom.element(l):null}a&&(l=this.getWindow(),x=a.getWindow(),!l.equals(x)&&l.$.frameElement&&(a=(new CKEDITOR.dom.element(l.$.frameElement)).getDocumentPosition(a),b+=a.x,c+=a.y));document.documentElement.getBoundingClientRect||!CKEDITOR.env.gecko||
e||(b+=this.$.clientLeft?1:0,c+=this.$.clientTop?1:0);return{x:b,y:c}},scrollIntoView:function(a){var b=this.getParent();if(b){do if((b.$.clientWidth&&b.$.clientWidth<b.$.scrollWidth||b.$.clientHeight&&b.$.clientHeight<b.$.scrollHeight)&&!b.is("body")&&this.scrollIntoParent(b,a,1),b.is("html")){var c=b.getWindow();try{var f=c.$.frameElement;f&&(b=new CKEDITOR.dom.element(f))}catch(d){}}while(b=b.getParent())}},scrollIntoParent:function(a,b,c){var f,d,e,l;function k(b,f){/body|html/.test(a.getName())?
a.getWindow().$.scrollBy(b,f):(a.$.scrollLeft+=b,a.$.scrollTop+=f)}function x(a,b){var f={x:0,y:0};if(!a.is(t?"body":"html")){var c=a.$.getBoundingClientRect();f.x=c.left;f.y=c.top}c=a.getWindow();c.equals(b)||(c=x(CKEDITOR.dom.element.get(c.$.frameElement),b),f.x+=c.x,f.y+=c.y);return f}function q(a,b){return parseInt(a.getComputedStyle("margin-"+b)||0,10)||0}!a&&(a=this.getWindow());e=a.getDocument();var t="BackCompat"==e.$.compatMode;a instanceof CKEDITOR.dom.window&&(a=t?e.getBody():e.getDocumentElement());
CKEDITOR.env.webkit&&(e=this.getEditor(!1))&&(e._.previousScrollTop=null);e=a.getWindow();d=x(this,e);var u=x(a,e),A=this.$.offsetHeight;f=this.$.offsetWidth;var z=a.$.clientHeight,w=a.$.clientWidth;e=d.x-q(this,"left")-u.x||0;l=d.y-q(this,"top")-u.y||0;f=d.x+f+q(this,"right")-(u.x+w)||0;d=d.y+A+q(this,"bottom")-(u.y+z)||0;(0>l||0<d)&&k(0,!0===b?l:!1===b?d:0>l?l:d);c&&(0>e||0<f)&&k(0>e?e:f,0)},setState:function(a,b,c){b=b||"cke";switch(a){case CKEDITOR.TRISTATE_ON:this.addClass(b+"_on");this.removeClass(b+
"_off");this.removeClass(b+"_disabled");c&&this.setAttribute("aria-pressed",!0);c&&this.removeAttribute("aria-disabled");break;case CKEDITOR.TRISTATE_DISABLED:this.addClass(b+"_disabled");this.removeClass(b+"_off");this.removeClass(b+"_on");c&&this.setAttribute("aria-disabled",!0);c&&this.removeAttribute("aria-pressed");break;default:this.addClass(b+"_off"),this.removeClass(b+"_on"),this.removeClass(b+"_disabled"),c&&this.removeAttribute("aria-pressed"),c&&this.removeAttribute("aria-disabled")}},
getFrameDocument:function(){var a=this.$;try{a.contentWindow.document}catch(b){a.src=a.src}return a&&new CKEDITOR.dom.document(a.contentWindow.document)},copyAttributes:function(a,b){var c=this.$.attributes;b=b||{};for(var f=0;f<c.length;f++){var d=c[f],e=d.nodeName.toLowerCase(),l;if(!(e in b))if("checked"==e&&(l=this.getAttribute(e)))a.setAttribute(e,l);else if(!CKEDITOR.env.ie||this.hasAttribute(e))l=this.getAttribute(e),null===l&&(l=d.nodeValue),a.setAttribute(e,l)}""!==this.$.style.cssText&&
(a.$.style.cssText=this.$.style.cssText)},renameNode:function(a){if(this.getName()!=a){var b=this.getDocument();a=new CKEDITOR.dom.element(a,b);this.copyAttributes(a);this.moveChildren(a);this.getParent(!0)&&this.$.parentNode.replaceChild(a.$,this.$);a.$["data-cke-expando"]=this.$["data-cke-expando"];this.$=a.$;delete this.getName}},getChild:function(){function a(b,c){var f=b.childNodes;if(0<=c&&c<f.length)return f[c]}return function(b){var c=this.$;if(b.slice)for(b=b.slice();0<b.length&&c;)c=a(c,
b.shift());else c=a(c,b);return c?new CKEDITOR.dom.node(c):null}}(),getChildCount:function(){return this.$.childNodes.length},disableContextMenu:function(){function a(b){return b.type==CKEDITOR.NODE_ELEMENT&&b.hasClass("cke_enable_context_menu")}this.on("contextmenu",function(b){b.data.getTarget().getAscendant(a,!0)||b.data.preventDefault()})},getDirection:function(a){return a?this.getComputedStyle("direction")||this.getDirection()||this.getParent()&&this.getParent().getDirection(1)||this.getDocument().$.dir||
"ltr":this.getStyle("direction")||this.getAttribute("dir")},data:function(a,b){a="data-"+a;if(void 0===b)return this.getAttribute(a);!1===b?this.removeAttribute(a):this.setAttribute(a,b);return null},getEditor:function(a){var b=CKEDITOR.instances,c,f,d;a=a||void 0===a;for(c in b)if(f=b[c],f.element.equals(this)&&f.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO||!a&&(d=f.editable())&&(d.equals(this)||d.contains(this)))return f;return null},find:function(a){var c=e(this);a=new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this,
a)));c();return a},findOne:function(a){var c=e(this);a=this.$.querySelector(b(this,a));c();return a?new CKEDITOR.dom.element(a):null},forEach:function(a,b,c){if(!(c||b&&this.type!=b))var f=a(this);if(!1!==f){c=this.getChildren();for(var d=0;d<c.count();d++)f=c.getItem(d),f.type==CKEDITOR.NODE_ELEMENT?f.forEach(a,b):b&&f.type!=b||a(f)}}});var k={width:["border-left-width","border-right-width","padding-left","padding-right"],height:["border-top-width","border-bottom-width","padding-top","padding-bottom"]};
CKEDITOR.dom.element.prototype.setSize=function(a,b,d){"number"==typeof b&&(!d||CKEDITOR.env.ie&&CKEDITOR.env.quirks||(b-=c.call(this,a)),this.setStyle(a,b+"px"))};CKEDITOR.dom.element.prototype.getSize=function(a,b){var d=Math.max(this.$["offset"+CKEDITOR.tools.capitalize(a)],this.$["client"+CKEDITOR.tools.capitalize(a)])||0;b&&(d-=c.call(this,a));return d}}(),CKEDITOR.dom.documentFragment=function(a){a=a||CKEDITOR.document;this.$=a.type==CKEDITOR.NODE_DOCUMENT?a.$.createDocumentFragment():a},CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,
CKEDITOR.dom.element.prototype,{type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,insertAfterNode:function(a){a=a.$;a.parentNode.insertBefore(this.$,a.nextSibling)},getHtml:function(){var a=new CKEDITOR.dom.element("div");this.clone(1,1).appendTo(a);return a.getHtml().replace(/\s*data-cke-expando=".*?"/g,"")}},!0,{append:1,appendBogus:1,clone:1,getFirst:1,getHtml:1,getLast:1,getParent:1,getNext:1,getPrevious:1,appendTo:1,moveChildren:1,insertBefore:1,insertAfterNode:1,replace:1,trim:1,type:1,ltrim:1,rtrim:1,getDocument:1,
getChildCount:1,getChild:1,getChildren:1}),function(){function a(a,b){var f=this.range;if(this._.end)return null;if(!this._.start){this._.start=1;if(f.collapsed)return this.end(),null;f.optimize()}var c,d=f.startContainer;c=f.endContainer;var g=f.startOffset,h=f.endOffset,e,n=this.guard,m=this.type,l=a?"getPreviousSourceNode":"getNextSourceNode";if(!a&&!this._.guardLTR){var k=c.type==CKEDITOR.NODE_ELEMENT?c:c.getParent(),B=c.type==CKEDITOR.NODE_ELEMENT?c.getChild(h):c.getNext();this._.guardLTR=function(a,
b){return(!b||!k.equals(a))&&(!B||!a.equals(B))&&(a.type!=CKEDITOR.NODE_ELEMENT||!b||!a.equals(f.root))}}if(a&&!this._.guardRTL){var G=d.type==CKEDITOR.NODE_ELEMENT?d:d.getParent(),E=d.type==CKEDITOR.NODE_ELEMENT?g?d.getChild(g-1):null:d.getPrevious();this._.guardRTL=function(a,b){return(!b||!G.equals(a))&&(!E||!a.equals(E))&&(a.type!=CKEDITOR.NODE_ELEMENT||!b||!a.equals(f.root))}}var F=a?this._.guardRTL:this._.guardLTR;e=n?function(a,b){return!1===F(a,b)?!1:n(a,b)}:F;this.current?c=this.current[l](!1,
m,e):(a?c.type==CKEDITOR.NODE_ELEMENT&&(c=0<h?c.getChild(h-1):!1===e(c,!0)?null:c.getPreviousSourceNode(!0,m,e)):(c=d,c.type==CKEDITOR.NODE_ELEMENT&&((c=c.getChild(g))||(c=!1===e(d,!0)?null:d.getNextSourceNode(!0,m,e)))),c&&!1===e(c)&&(c=null));for(;c&&!this._.end;){this.current=c;if(!this.evaluator||!1!==this.evaluator(c)){if(!b)return c}else if(b&&this.evaluator)return!1;c=c[l](!1,m,e)}this.end();return this.current=null}function e(b){for(var f,c=null;f=a.call(this,b);)c=f;return c}CKEDITOR.dom.walker=
CKEDITOR.tools.createClass({$:function(a){this.range=a;this._={}},proto:{end:function(){this._.end=1},next:function(){return a.call(this)},previous:function(){return a.call(this,1)},checkForward:function(){return!1!==a.call(this,0,1)},checkBackward:function(){return!1!==a.call(this,1,1)},lastForward:function(){return e.call(this)},lastBackward:function(){return e.call(this,1)},reset:function(){delete this.current;this._={}}}});var b={block:1,"list-item":1,table:1,"table-row-group":1,"table-header-group":1,
"table-footer-group":1,"table-row":1,"table-column-group":1,"table-column":1,"table-cell":1,"table-caption":1},c={absolute:1,fixed:1};CKEDITOR.dom.element.prototype.isBlockBoundary=function(a){return"none"!=this.getComputedStyle("float")||this.getComputedStyle("position")in c||!b[this.getComputedStyle("display")]?!!(this.is(CKEDITOR.dtd.$block)||a&&this.is(a)):!0};CKEDITOR.dom.walker.blockBoundary=function(a){return function(b){return!(b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary(a))}};CKEDITOR.dom.walker.listItemBoundary=
function(){return this.blockBoundary({br:1})};CKEDITOR.dom.walker.bookmark=function(a,b){function f(a){return a&&a.getName&&"span"==a.getName()&&a.data("cke-bookmark")}return function(c){var d,g;d=c&&c.type!=CKEDITOR.NODE_ELEMENT&&(g=c.getParent())&&f(g);d=a?d:d||f(c);return!!(b^d)}};CKEDITOR.dom.walker.whitespaces=function(a){return function(b){var f;b&&b.type==CKEDITOR.NODE_TEXT&&(f=!CKEDITOR.tools.trim(b.getText())||CKEDITOR.env.webkit&&b.getText()==CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);
return!!(a^f)}};CKEDITOR.dom.walker.invisible=function(a){var b=CKEDITOR.dom.walker.whitespaces(),f=CKEDITOR.env.webkit?1:0;return function(c){b(c)?c=1:(c.type==CKEDITOR.NODE_TEXT&&(c=c.getParent()),c=c.$.offsetWidth<=f);return!!(a^c)}};CKEDITOR.dom.walker.nodeType=function(a,b){return function(f){return!!(b^f.type==a)}};CKEDITOR.dom.walker.bogus=function(a){function b(a){return!l(a)&&!k(a)}return function(f){var c=CKEDITOR.env.needsBrFiller?f.is&&f.is("br"):f.getText&&d.test(f.getText());c&&(c=f.getParent(),
f=f.getNext(b),c=c.isBlockBoundary()&&(!f||f.type==CKEDITOR.NODE_ELEMENT&&f.isBlockBoundary()));return!!(a^c)}};CKEDITOR.dom.walker.temp=function(a){return function(b){b.type!=CKEDITOR.NODE_ELEMENT&&(b=b.getParent());b=b&&b.hasAttribute("data-cke-temp");return!!(a^b)}};var d=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,l=CKEDITOR.dom.walker.whitespaces(),k=CKEDITOR.dom.walker.bookmark(),g=CKEDITOR.dom.walker.temp(),h=function(a){return k(a)||l(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.is(CKEDITOR.dtd.$inline)&&!a.is(CKEDITOR.dtd.$empty)};
CKEDITOR.dom.walker.ignored=function(a){return function(b){b=l(b)||k(b)||g(b);return!!(a^b)}};var m=CKEDITOR.dom.walker.ignored();CKEDITOR.dom.walker.empty=function(a){return function(b){for(var f=0,c=b.getChildCount();f<c;++f)if(!m(b.getChild(f)))return!!a;return!a}};var f=CKEDITOR.dom.walker.empty(),n=CKEDITOR.dom.walker.validEmptyBlockContainers=CKEDITOR.tools.extend(function(a){var b={},f;for(f in a)CKEDITOR.dtd[f]["#"]&&(b[f]=1);return b}(CKEDITOR.dtd.$block),{caption:1,td:1,th:1});CKEDITOR.dom.walker.editable=
function(a){return function(b){b=m(b)?!1:b.type==CKEDITOR.NODE_TEXT||b.type==CKEDITOR.NODE_ELEMENT&&(b.is(CKEDITOR.dtd.$inline)||b.is("hr")||"false"==b.getAttribute("contenteditable")||!CKEDITOR.env.needsBrFiller&&b.is(n)&&f(b))?!0:!1;return!!(a^b)}};CKEDITOR.dom.element.prototype.getBogus=function(){var a=this;do a=a.getPreviousSourceNode();while(h(a));return a&&(CKEDITOR.env.needsBrFiller?a.is&&a.is("br"):a.getText&&d.test(a.getText()))?a:!1}}(),CKEDITOR.dom.range=function(a){this.endOffset=this.endContainer=
this.startOffset=this.startContainer=null;this.collapsed=!0;var e=a instanceof CKEDITOR.dom.document;this.document=e?a:a.getDocument();this.root=e?a.getBody():a},function(){function a(a){a.collapsed=a.startContainer&&a.endContainer&&a.startContainer.equals(a.endContainer)&&a.startOffset==a.endOffset}function e(a,b,c,d,g){function h(a,b,f,c){var d=f?a.getPrevious():a.getNext();if(c&&l)return d;z||c?b.append(a.clone(!0,g),f):(a.remove(),k&&b.append(a,f));return d}function e(){var a,b,f,c=Math.min(J.length,
D.length);for(a=0;a<c;a++)if(b=J[a],f=D[a],!b.equals(f))return a;return a-1}function m(){var b=R-1,c=F&&I&&!w.equals(C);b<N-1||b<S-1||c?(c?a.moveToPosition(C,CKEDITOR.POSITION_BEFORE_START):S==b+1&&E?a.moveToPosition(D[b],CKEDITOR.POSITION_BEFORE_END):a.moveToPosition(D[b+1],CKEDITOR.POSITION_BEFORE_START),d&&(b=J[b+1])&&b.type==CKEDITOR.NODE_ELEMENT&&(c=CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e',a.document),c.insertAfter(b),
b.mergeSiblings(!1),a.moveToBookmark({startNode:c}))):a.collapse(!0)}a.optimizeBookmark();var l=0===b,k=1==b,z=2==b;b=z||k;var w=a.startContainer,C=a.endContainer,y=a.startOffset,B=a.endOffset,G,E,F,I,H,K;if(z&&C.type==CKEDITOR.NODE_TEXT&&(w.equals(C)||w.type===CKEDITOR.NODE_ELEMENT&&w.getFirst().equals(C)))c.append(a.document.createText(C.substring(y,B)));else{C.type==CKEDITOR.NODE_TEXT?z?K=!0:C=C.split(B):0<C.getChildCount()?B>=C.getChildCount()?(C=C.getChild(B-1),E=!0):C=C.getChild(B):I=E=!0;w.type==
CKEDITOR.NODE_TEXT?z?H=!0:w.split(y):0<w.getChildCount()?0===y?(w=w.getChild(y),G=!0):w=w.getChild(y-1):F=G=!0;for(var J=w.getParents(),D=C.getParents(),R=e(),N=J.length-1,S=D.length-1,L=c,V,Z,X,da=-1,P=R;P<=N;P++){Z=J[P];X=Z.getNext();for(P!=N||Z.equals(D[P])&&N<S?b&&(V=L.append(Z.clone(0,g))):G?h(Z,L,!1,F):H&&L.append(a.document.createText(Z.substring(y)));X;){if(X.equals(D[P])){da=P;break}X=h(X,L)}L=V}L=c;for(P=R;P<=S;P++)if(c=D[P],X=c.getPrevious(),c.equals(J[P]))b&&(L=L.getChild(0));else{P!=
S||c.equals(J[P])&&S<N?b&&(V=L.append(c.clone(0,g))):E?h(c,L,!1,I):K&&L.append(a.document.createText(c.substring(0,B)));if(P>da)for(;X;)X=h(X,L,!0);L=V}z||m()}}function b(){var a=!1,b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.dom.walker.bookmark(!0),d=CKEDITOR.dom.walker.bogus();return function(g){return c(g)||b(g)?!0:d(g)&&!a?a=!0:g.type==CKEDITOR.NODE_TEXT&&(g.hasAscendant("pre")||CKEDITOR.tools.trim(g.getText()).length)||g.type==CKEDITOR.NODE_ELEMENT&&!g.is(l)?!1:!0}}function c(a){var b=CKEDITOR.dom.walker.whitespaces(),
c=CKEDITOR.dom.walker.bookmark(1);return function(d){return c(d)||b(d)?!0:!a&&k(d)||d.type==CKEDITOR.NODE_ELEMENT&&d.is(CKEDITOR.dtd.$removeEmpty)}}function d(a){return function(){var b;return this[a?"getPreviousNode":"getNextNode"](function(a){!b&&m(a)&&(b=a);return h(a)&&!(k(a)&&a.equals(b))})}}var l={abbr:1,acronym:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,"var":1},k=CKEDITOR.dom.walker.bogus(),
g=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,h=CKEDITOR.dom.walker.editable(),m=CKEDITOR.dom.walker.ignored(!0);CKEDITOR.dom.range.prototype={clone:function(){var a=new CKEDITOR.dom.range(this.root);a._setStartContainer(this.startContainer);a.startOffset=this.startOffset;a._setEndContainer(this.endContainer);a.endOffset=this.endOffset;a.collapsed=this.collapsed;return a},collapse:function(a){a?(this._setEndContainer(this.startContainer),this.endOffset=this.startOffset):(this._setStartContainer(this.endContainer),
this.startOffset=this.endOffset);this.collapsed=!0},cloneContents:function(a){var b=new CKEDITOR.dom.documentFragment(this.document);this.collapsed||e(this,2,b,!1,"undefined"==typeof a?!0:a);return b},deleteContents:function(a){this.collapsed||e(this,0,null,a)},extractContents:function(a,b){var c=new CKEDITOR.dom.documentFragment(this.document);this.collapsed||e(this,1,c,a,"undefined"==typeof b?!0:b);return c},createBookmark:function(a){var b,c,d,g,h=this.collapsed;b=this.document.createElement("span");
b.data("cke-bookmark",1);b.setStyle("display","none");b.setHtml("\x26nbsp;");a&&(d="cke_bm_"+CKEDITOR.tools.getNextNumber(),b.setAttribute("id",d+(h?"C":"S")));h||(c=b.clone(),c.setHtml("\x26nbsp;"),a&&c.setAttribute("id",d+"E"),g=this.clone(),g.collapse(),g.insertNode(c));g=this.clone();g.collapse(!0);g.insertNode(b);c?(this.setStartAfter(b),this.setEndBefore(c)):this.moveToPosition(b,CKEDITOR.POSITION_AFTER_END);return{startNode:a?d+(h?"C":"S"):b,endNode:a?d+"E":c,serializable:a,collapsed:h}},createBookmark2:function(){function a(b){var f=
b.container,d=b.offset,g;g=f;var h=d;g=g.type!=CKEDITOR.NODE_ELEMENT||0===h||h==g.getChildCount()?0:g.getChild(h-1).type==CKEDITOR.NODE_TEXT&&g.getChild(h).type==CKEDITOR.NODE_TEXT;g&&(f=f.getChild(d-1),d=f.getLength());if(f.type==CKEDITOR.NODE_ELEMENT&&0<d){a:{for(g=f;d--;)if(h=g.getChild(d).getIndex(!0),0<=h){d=h;break a}d=-1}d+=1}if(f.type==CKEDITOR.NODE_TEXT){g=f;for(h=0;(g=g.getPrevious())&&g.type==CKEDITOR.NODE_TEXT;)h+=g.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE,"").length;
g=h;f.getText()?d+=g:(h=f.getPrevious(c),g?(d=g,f=h?h.getNext():f.getParent().getFirst()):(f=f.getParent(),d=h?h.getIndex(!0)+1:0))}b.container=f;b.offset=d}function b(a,f){var c=f.getCustomData("cke-fillingChar");if(c){var d=a.container;c.equals(d)&&(a.offset-=CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length,0>=a.offset&&(a.offset=d.getIndex(),a.container=d.getParent()))}}var c=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT,!0);return function(c){var d=this.collapsed,g={container:this.startContainer,
offset:this.startOffset},h={container:this.endContainer,offset:this.endOffset};c&&(a(g),b(g,this.root),d||(a(h),b(h,this.root)));return{start:g.container.getAddress(c),end:d?null:h.container.getAddress(c),startOffset:g.offset,endOffset:h.offset,normalized:c,collapsed:d,is2:!0}}}(),moveToBookmark:function(a){if(a.is2){var b=this.document.getByAddress(a.start,a.normalized),c=a.startOffset,d=a.end&&this.document.getByAddress(a.end,a.normalized);a=a.endOffset;this.setStart(b,c);d?this.setEnd(d,a):this.collapse(!0)}else b=
(c=a.serializable)?this.document.getById(a.startNode):a.startNode,a=c?this.document.getById(a.endNode):a.endNode,this.setStartBefore(b),b.remove(),a?(this.setEndBefore(a),a.remove()):this.collapse(!0)},getBoundaryNodes:function(){var a=this.startContainer,b=this.endContainer,c=this.startOffset,d=this.endOffset,g;if(a.type==CKEDITOR.NODE_ELEMENT)if(g=a.getChildCount(),g>c)a=a.getChild(c);else if(1>g)a=a.getPreviousSourceNode();else{for(a=a.$;a.lastChild;)a=a.lastChild;a=new CKEDITOR.dom.node(a);a=
a.getNextSourceNode()||a}if(b.type==CKEDITOR.NODE_ELEMENT)if(g=b.getChildCount(),g>d)b=b.getChild(d).getPreviousSourceNode(!0);else if(1>g)b=b.getPreviousSourceNode();else{for(b=b.$;b.lastChild;)b=b.lastChild;b=new CKEDITOR.dom.node(b)}a.getPosition(b)&CKEDITOR.POSITION_FOLLOWING&&(a=b);return{startNode:a,endNode:b}},getCommonAncestor:function(a,b){var c=this.startContainer,d=this.endContainer,c=c.equals(d)?a&&c.type==CKEDITOR.NODE_ELEMENT&&this.startOffset==this.endOffset-1?c.getChild(this.startOffset):
c:c.getCommonAncestor(d);return b&&!c.is?c.getParent():c},optimize:function(){var a=this.startContainer,b=this.startOffset;a.type!=CKEDITOR.NODE_ELEMENT&&(b?b>=a.getLength()&&this.setStartAfter(a):this.setStartBefore(a));a=this.endContainer;b=this.endOffset;a.type!=CKEDITOR.NODE_ELEMENT&&(b?b>=a.getLength()&&this.setEndAfter(a):this.setEndBefore(a))},optimizeBookmark:function(){var a=this.startContainer,b=this.endContainer;a.is&&a.is("span")&&a.data("cke-bookmark")&&this.setStartAt(a,CKEDITOR.POSITION_BEFORE_START);
b&&b.is&&b.is("span")&&b.data("cke-bookmark")&&this.setEndAt(b,CKEDITOR.POSITION_AFTER_END)},trim:function(a,b){var c=this.startContainer,d=this.startOffset,g=this.collapsed;if((!a||g)&&c&&c.type==CKEDITOR.NODE_TEXT){if(d)if(d>=c.getLength())d=c.getIndex()+1,c=c.getParent();else{var h=c.split(d),d=c.getIndex()+1,c=c.getParent();this.startContainer.equals(this.endContainer)?this.setEnd(h,this.endOffset-this.startOffset):c.equals(this.endContainer)&&(this.endOffset+=1)}else d=c.getIndex(),c=c.getParent();
this.setStart(c,d);if(g){this.collapse(!0);return}}c=this.endContainer;d=this.endOffset;b||g||!c||c.type!=CKEDITOR.NODE_TEXT||(d?(d>=c.getLength()||c.split(d),d=c.getIndex()+1):d=c.getIndex(),c=c.getParent(),this.setEnd(c,d))},enlarge:function(a,b){function c(a){return a&&a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("contenteditable")?null:a}var d=new RegExp(/[^\s\ufeff]/);switch(a){case CKEDITOR.ENLARGE_INLINE:var g=1;case CKEDITOR.ENLARGE_ELEMENT:var h=function(a,b){var f=new CKEDITOR.dom.range(m);
f.setStart(a,b);f.setEndAt(m,CKEDITOR.POSITION_BEFORE_END);var f=new CKEDITOR.dom.walker(f),c;for(f.guard=function(a){return!(a.type==CKEDITOR.NODE_ELEMENT&&a.isBlockBoundary())};c=f.next();){if(c.type!=CKEDITOR.NODE_TEXT)return!1;G=c!=a?c.getText():c.substring(b);if(d.test(G))return!1}return!0};if(this.collapsed)break;var e=this.getCommonAncestor(),m=this.root,l,k,z,w,C,y=!1,B,G;B=this.startContainer;var E=this.startOffset;B.type==CKEDITOR.NODE_TEXT?(E&&(B=!CKEDITOR.tools.trim(B.substring(0,E)).length&&
B,y=!!B),B&&((w=B.getPrevious())||(z=B.getParent()))):(E&&(w=B.getChild(E-1)||B.getLast()),w||(z=B));for(z=c(z);z||w;){if(z&&!w){!C&&z.equals(e)&&(C=!0);if(g?z.isBlockBoundary():!m.contains(z))break;y&&"inline"==z.getComputedStyle("display")||(y=!1,C?l=z:this.setStartBefore(z));w=z.getPrevious()}for(;w;)if(B=!1,w.type==CKEDITOR.NODE_COMMENT)w=w.getPrevious();else{if(w.type==CKEDITOR.NODE_TEXT)G=w.getText(),d.test(G)&&(w=null),B=/[\s\ufeff]$/.test(G);else if((w.$.offsetWidth>(CKEDITOR.env.webkit?1:
0)||b&&w.is("br"))&&!w.data("cke-bookmark"))if(y&&CKEDITOR.dtd.$removeEmpty[w.getName()]){G=w.getText();if(d.test(G))w=null;else for(var E=w.$.getElementsByTagName("*"),F=0,I;I=E[F++];)if(!CKEDITOR.dtd.$removeEmpty[I.nodeName.toLowerCase()]){w=null;break}w&&(B=!!G.length)}else w=null;B&&(y?C?l=z:z&&this.setStartBefore(z):y=!0);if(w){B=w.getPrevious();if(!z&&!B){z=w;w=null;break}w=B}else z=null}z&&(z=c(z.getParent()))}B=this.endContainer;E=this.endOffset;z=w=null;C=y=!1;B.type==CKEDITOR.NODE_TEXT?
CKEDITOR.tools.trim(B.substring(E)).length?y=!0:(y=!B.getLength(),E==B.getLength()?(w=B.getNext())||(z=B.getParent()):h(B,E)&&(z=B.getParent())):(w=B.getChild(E))||(z=B);for(;z||w;){if(z&&!w){!C&&z.equals(e)&&(C=!0);if(g?z.isBlockBoundary():!m.contains(z))break;y&&"inline"==z.getComputedStyle("display")||(y=!1,C?k=z:z&&this.setEndAfter(z));w=z.getNext()}for(;w;){B=!1;if(w.type==CKEDITOR.NODE_TEXT)G=w.getText(),h(w,0)||(w=null),B=/^[\s\ufeff]/.test(G);else if(w.type==CKEDITOR.NODE_ELEMENT){if((0<w.$.offsetWidth||
b&&w.is("br"))&&!w.data("cke-bookmark"))if(y&&CKEDITOR.dtd.$removeEmpty[w.getName()]){G=w.getText();if(d.test(G))w=null;else for(E=w.$.getElementsByTagName("*"),F=0;I=E[F++];)if(!CKEDITOR.dtd.$removeEmpty[I.nodeName.toLowerCase()]){w=null;break}w&&(B=!!G.length)}else w=null}else B=1;B&&y&&(C?k=z:this.setEndAfter(z));if(w){B=w.getNext();if(!z&&!B){z=w;w=null;break}w=B}else z=null}z&&(z=c(z.getParent()))}l&&k&&(e=l.contains(k)?k:l,this.setStartBefore(e),this.setEndAfter(e));break;case CKEDITOR.ENLARGE_BLOCK_CONTENTS:case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:z=
new CKEDITOR.dom.range(this.root);m=this.root;z.setStartAt(m,CKEDITOR.POSITION_AFTER_START);z.setEnd(this.startContainer,this.startOffset);z=new CKEDITOR.dom.walker(z);var H,K,J=CKEDITOR.dom.walker.blockBoundary(a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?{br:1}:null),D=null,R=function(a){if(a.type==CKEDITOR.NODE_ELEMENT&&"false"==a.getAttribute("contenteditable"))if(D){if(D.equals(a)){D=null;return}}else D=a;else if(D)return;var b=J(a);b||(H=a);return b},g=function(a){var b=R(a);!b&&a.is&&a.is("br")&&
(K=a);return b};z.guard=R;z=z.lastBackward();H=H||m;this.setStartAt(H,!H.is("br")&&(!z&&this.checkStartOfBlock()||z&&H.contains(z))?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_AFTER_END);if(a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS){z=this.clone();z=new CKEDITOR.dom.walker(z);var N=CKEDITOR.dom.walker.whitespaces(),S=CKEDITOR.dom.walker.bookmark();z.evaluator=function(a){return!N(a)&&!S(a)};if((z=z.previous())&&z.type==CKEDITOR.NODE_ELEMENT&&z.is("br"))break}z=this.clone();z.collapse();z.setEndAt(m,
CKEDITOR.POSITION_BEFORE_END);z=new CKEDITOR.dom.walker(z);z.guard=a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?g:R;H=D=K=null;z=z.lastForward();H=H||m;this.setEndAt(H,!z&&this.checkEndOfBlock()||z&&H.contains(z)?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_BEFORE_START);K&&this.setEndAfter(K)}},shrink:function(a,b,c){var d="boolean"===typeof c?c:c&&"boolean"===typeof c.shrinkOnBlockBoundary?c.shrinkOnBlockBoundary:!0,g=c&&c.skipBogus;if(!this.collapsed){a=a||CKEDITOR.SHRINK_TEXT;var h=this.clone(),e=
this.startContainer,m=this.endContainer,l=this.startOffset,k=this.endOffset,z=c=1;e&&e.type==CKEDITOR.NODE_TEXT&&(l?l>=e.getLength()?h.setStartAfter(e):(h.setStartBefore(e),c=0):h.setStartBefore(e));m&&m.type==CKEDITOR.NODE_TEXT&&(k?k>=m.getLength()?h.setEndAfter(m):(h.setEndAfter(m),z=0):h.setEndBefore(m));var h=new CKEDITOR.dom.walker(h),w=CKEDITOR.dom.walker.bookmark(),C=CKEDITOR.dom.walker.bogus();h.evaluator=function(b){return b.type==(a==CKEDITOR.SHRINK_ELEMENT?CKEDITOR.NODE_ELEMENT:CKEDITOR.NODE_TEXT)};
var y;h.guard=function(b,c){if(g&&C(b)||w(b))return!0;if(a==CKEDITOR.SHRINK_ELEMENT&&b.type==CKEDITOR.NODE_TEXT||c&&b.equals(y)||!1===d&&b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary()||b.type==CKEDITOR.NODE_ELEMENT&&b.hasAttribute("contenteditable"))return!1;c||b.type!=CKEDITOR.NODE_ELEMENT||(y=b);return!0};c&&(e=h[a==CKEDITOR.SHRINK_ELEMENT?"lastForward":"next"]())&&this.setStartAt(e,b?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_START);z&&(h.reset(),(h=h[a==CKEDITOR.SHRINK_ELEMENT?
"lastBackward":"previous"]())&&this.setEndAt(h,b?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_END));return!(!c&&!z)}},insertNode:function(a){this.optimizeBookmark();this.trim(!1,!0);var b=this.startContainer,c=b.getChild(this.startOffset);c?a.insertBefore(c):b.append(a);a.getParent()&&a.getParent().equals(this.endContainer)&&this.endOffset++;this.setStartBefore(a)},moveToPosition:function(a,b){this.setStartAt(a,b);this.collapse(!0)},moveToRange:function(a){this.setStart(a.startContainer,a.startOffset);
this.setEnd(a.endContainer,a.endOffset)},selectNodeContents:function(a){this.setStart(a,0);this.setEnd(a,a.type==CKEDITOR.NODE_TEXT?a.getLength():a.getChildCount())},setStart:function(b,c){b.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[b.getName()]&&(c=b.getIndex(),b=b.getParent());this._setStartContainer(b);this.startOffset=c;this.endContainer||(this._setEndContainer(b),this.endOffset=c);a(this)},setEnd:function(b,c){b.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[b.getName()]&&(c=b.getIndex()+
1,b=b.getParent());this._setEndContainer(b);this.endOffset=c;this.startContainer||(this._setStartContainer(b),this.startOffset=c);a(this)},setStartAfter:function(a){this.setStart(a.getParent(),a.getIndex()+1)},setStartBefore:function(a){this.setStart(a.getParent(),a.getIndex())},setEndAfter:function(a){this.setEnd(a.getParent(),a.getIndex()+1)},setEndBefore:function(a){this.setEnd(a.getParent(),a.getIndex())},setStartAt:function(b,c){switch(c){case CKEDITOR.POSITION_AFTER_START:this.setStart(b,0);
break;case CKEDITOR.POSITION_BEFORE_END:b.type==CKEDITOR.NODE_TEXT?this.setStart(b,b.getLength()):this.setStart(b,b.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setStartBefore(b);break;case CKEDITOR.POSITION_AFTER_END:this.setStartAfter(b)}a(this)},setEndAt:function(b,c){switch(c){case CKEDITOR.POSITION_AFTER_START:this.setEnd(b,0);break;case CKEDITOR.POSITION_BEFORE_END:b.type==CKEDITOR.NODE_TEXT?this.setEnd(b,b.getLength()):this.setEnd(b,b.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setEndBefore(b);
break;case CKEDITOR.POSITION_AFTER_END:this.setEndAfter(b)}a(this)},fixBlock:function(a,b){var c=this.createBookmark(),d=this.document.createElement(b);this.collapse(a);this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);this.extractContents().appendTo(d);d.trim();this.insertNode(d);var g=d.getBogus();g&&g.remove();d.appendBogus();this.moveToBookmark(c);return d},splitBlock:function(a,b){var c=new CKEDITOR.dom.elementPath(this.startContainer,this.root),d=new CKEDITOR.dom.elementPath(this.endContainer,this.root),
g=c.block,h=d.block,e=null;if(!c.blockLimit.equals(d.blockLimit))return null;"br"!=a&&(g||(g=this.fixBlock(!0,a),h=(new CKEDITOR.dom.elementPath(this.endContainer,this.root)).block),h||(h=this.fixBlock(!1,a)));c=g&&this.checkStartOfBlock();d=h&&this.checkEndOfBlock();this.deleteContents();g&&g.equals(h)&&(d?(e=new CKEDITOR.dom.elementPath(this.startContainer,this.root),this.moveToPosition(h,CKEDITOR.POSITION_AFTER_END),h=null):c?(e=new CKEDITOR.dom.elementPath(this.startContainer,this.root),this.moveToPosition(g,
CKEDITOR.POSITION_BEFORE_START),g=null):(h=this.splitElement(g,b||!1),g.is("ul","ol")||g.appendBogus()));return{previousBlock:g,nextBlock:h,wasStartOfBlock:c,wasEndOfBlock:d,elementPath:e}},splitElement:function(a,b){if(!this.collapsed)return null;this.setEndAt(a,CKEDITOR.POSITION_BEFORE_END);var c=this.extractContents(!1,b||!1),d=a.clone(!1,b||!1);c.appendTo(d);d.insertAfter(a);this.moveToPosition(a,CKEDITOR.POSITION_AFTER_END);return d},removeEmptyBlocksAtEnd:function(){function a(f){return function(a){return b(a)||
c(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.isEmptyInlineRemoveable()||f.is("table")&&a.is("caption")?!1:!0}}var b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.dom.walker.bookmark(!1);return function(b){for(var c=this.createBookmark(),d=this[b?"endPath":"startPath"](),g=d.block||d.blockLimit,h;g&&!g.equals(d.root)&&!g.getFirst(a(g));)h=g.getParent(),this[b?"setEndAt":"setStartAt"](g,CKEDITOR.POSITION_AFTER_END),g.remove(1),g=h;this.moveToBookmark(c)}}(),startPath:function(){return new CKEDITOR.dom.elementPath(this.startContainer,
this.root)},endPath:function(){return new CKEDITOR.dom.elementPath(this.endContainer,this.root)},checkBoundaryOfElement:function(a,b){var d=b==CKEDITOR.START,g=this.clone();g.collapse(d);g[d?"setStartAt":"setEndAt"](a,d?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END);g=new CKEDITOR.dom.walker(g);g.evaluator=c(d);return g[d?"checkBackward":"checkForward"]()},checkStartOfBlock:function(){var a=this.startContainer,c=this.startOffset;CKEDITOR.env.ie&&c&&a.type==CKEDITOR.NODE_TEXT&&(a=CKEDITOR.tools.ltrim(a.substring(0,
c)),g.test(a)&&this.trim(0,1));this.trim();a=new CKEDITOR.dom.elementPath(this.startContainer,this.root);c=this.clone();c.collapse(!0);c.setStartAt(a.block||a.blockLimit,CKEDITOR.POSITION_AFTER_START);a=new CKEDITOR.dom.walker(c);a.evaluator=b();return a.checkBackward()},checkEndOfBlock:function(){var a=this.endContainer,c=this.endOffset;CKEDITOR.env.ie&&a.type==CKEDITOR.NODE_TEXT&&(a=CKEDITOR.tools.rtrim(a.substring(c)),g.test(a)&&this.trim(1,0));this.trim();a=new CKEDITOR.dom.elementPath(this.endContainer,
this.root);c=this.clone();c.collapse(!1);c.setEndAt(a.block||a.blockLimit,CKEDITOR.POSITION_BEFORE_END);a=new CKEDITOR.dom.walker(c);a.evaluator=b();return a.checkForward()},getPreviousNode:function(a,b,c){var d=this.clone();d.collapse(1);d.setStartAt(c||this.root,CKEDITOR.POSITION_AFTER_START);c=new CKEDITOR.dom.walker(d);c.evaluator=a;c.guard=b;return c.previous()},getNextNode:function(a,b,c){var d=this.clone();d.collapse();d.setEndAt(c||this.root,CKEDITOR.POSITION_BEFORE_END);c=new CKEDITOR.dom.walker(d);
c.evaluator=a;c.guard=b;return c.next()},checkReadOnly:function(){function a(b,c){for(;b;){if(b.type==CKEDITOR.NODE_ELEMENT){if("false"==b.getAttribute("contentEditable")&&!b.data("cke-editable"))return 0;if(b.is("html")||"true"==b.getAttribute("contentEditable")&&(b.contains(c)||b.equals(c)))break}b=b.getParent()}return 1}return function(){var b=this.startContainer,c=this.endContainer;return!(a(b,c)&&a(c,b))}}(),moveToElementEditablePosition:function(a,b){if(a.type==CKEDITOR.NODE_ELEMENT&&!a.isEditable(!1))return this.moveToPosition(a,
b?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START),!0;for(var c=0;a;){if(a.type==CKEDITOR.NODE_TEXT){b&&this.endContainer&&this.checkEndOfBlock()&&g.test(a.getText())?this.moveToPosition(a,CKEDITOR.POSITION_BEFORE_START):this.moveToPosition(a,b?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START);c=1;break}if(a.type==CKEDITOR.NODE_ELEMENT)if(a.isEditable())this.moveToPosition(a,b?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_START),c=1;else if(b&&a.is("br")&&this.endContainer&&
this.checkEndOfBlock())this.moveToPosition(a,CKEDITOR.POSITION_BEFORE_START);else if("false"==a.getAttribute("contenteditable")&&a.is(CKEDITOR.dtd.$block))return this.setStartBefore(a),this.setEndAfter(a),!0;var d=a,h=c,e=void 0;d.type==CKEDITOR.NODE_ELEMENT&&d.isEditable(!1)&&(e=d[b?"getLast":"getFirst"](m));h||e||(e=d[b?"getPrevious":"getNext"](m));a=e}return!!c},moveToClosestEditablePosition:function(a,b){var c,d=0,g,h,e=[CKEDITOR.POSITION_AFTER_END,CKEDITOR.POSITION_BEFORE_START];a?(c=new CKEDITOR.dom.range(this.root),
c.moveToPosition(a,e[b?0:1])):c=this.clone();if(a&&!a.is(CKEDITOR.dtd.$block))d=1;else if(g=c[b?"getNextEditableNode":"getPreviousEditableNode"]())d=1,(h=g.type==CKEDITOR.NODE_ELEMENT)&&g.is(CKEDITOR.dtd.$block)&&"false"==g.getAttribute("contenteditable")?(c.setStartAt(g,CKEDITOR.POSITION_BEFORE_START),c.setEndAt(g,CKEDITOR.POSITION_AFTER_END)):!CKEDITOR.env.needsBrFiller&&h&&g.is(CKEDITOR.dom.walker.validEmptyBlockContainers)?(c.setEnd(g,0),c.collapse()):c.moveToPosition(g,e[b?1:0]);d&&this.moveToRange(c);
return!!d},moveToElementEditStart:function(a){return this.moveToElementEditablePosition(a)},moveToElementEditEnd:function(a){return this.moveToElementEditablePosition(a,!0)},getEnclosedNode:function(){var a=this.clone();a.optimize();if(a.startContainer.type!=CKEDITOR.NODE_ELEMENT||a.endContainer.type!=CKEDITOR.NODE_ELEMENT)return null;var a=new CKEDITOR.dom.walker(a),b=CKEDITOR.dom.walker.bookmark(!1,!0),c=CKEDITOR.dom.walker.whitespaces(!0);a.evaluator=function(a){return c(a)&&b(a)};var d=a.next();
a.reset();return d&&d.equals(a.previous())?d:null},getTouchedStartNode:function(){var a=this.startContainer;return this.collapsed||a.type!=CKEDITOR.NODE_ELEMENT?a:a.getChild(this.startOffset)||a},getTouchedEndNode:function(){var a=this.endContainer;return this.collapsed||a.type!=CKEDITOR.NODE_ELEMENT?a:a.getChild(this.endOffset-1)||a},getNextEditableNode:d(),getPreviousEditableNode:d(1),_getTableElement:function(a){a=a||{td:1,th:1,tr:1,tbody:1,thead:1,tfoot:1,table:1};var b=this.startContainer,c=
this.endContainer,d=b.getAscendant("table",!0),g=c.getAscendant("table",!0);return CKEDITOR.env.safari&&d&&c.equals(this.root)?b.getAscendant(a,!0):this.getEnclosedNode()?this.getEnclosedNode().getAscendant(a,!0):d&&g&&(d.equals(g)||d.contains(g)||g.contains(d))?b.getAscendant(a,!0):null},scrollIntoView:function(){var a=new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e",this.document),b,c,d,g=this.clone();g.optimize();(d=g.startContainer.type==CKEDITOR.NODE_TEXT)?(c=g.startContainer.getText(),
b=g.startContainer.split(g.startOffset),a.insertAfter(g.startContainer)):g.insertNode(a);a.scrollIntoView();d&&(g.startContainer.setText(c),b.remove());a.remove()},_setStartContainer:function(a){this.startContainer=a},_setEndContainer:function(a){this.endContainer=a},_find:function(a,b){var c=this.getCommonAncestor(),d=this.getBoundaryNodes(),g=[],h,e,m,l;if(c&&c.find)for(e=c.find(a),h=0;h<e.count();h++)if(c=e.getItem(h),b||!c.isReadOnly())m=c.getPosition(d.startNode)&CKEDITOR.POSITION_FOLLOWING||
d.startNode.equals(c),l=c.getPosition(d.endNode)&CKEDITOR.POSITION_PRECEDING+CKEDITOR.POSITION_IS_CONTAINED||d.endNode.equals(c),m&&l&&g.push(c);return g}};CKEDITOR.dom.range.mergeRanges=function(a){return CKEDITOR.tools.array.reduce(a,function(a,b){var c=a[a.length-1],f=!1;b=b.clone();b.enlarge(CKEDITOR.ENLARGE_ELEMENT);if(c){var d=new CKEDITOR.dom.range(b.root),f=new CKEDITOR.dom.walker(d),g=CKEDITOR.dom.walker.whitespaces();d.setStart(c.endContainer,c.endOffset);d.setEnd(b.startContainer,b.startOffset);
for(d=f.next();g(d)||b.endContainer.equals(d);)d=f.next();f=!d}f?c.setEnd(b.endContainer,b.endOffset):a.push(b);return a},[])}}(),CKEDITOR.POSITION_AFTER_START=1,CKEDITOR.POSITION_BEFORE_END=2,CKEDITOR.POSITION_BEFORE_START=3,CKEDITOR.POSITION_AFTER_END=4,CKEDITOR.ENLARGE_ELEMENT=1,CKEDITOR.ENLARGE_BLOCK_CONTENTS=2,CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS=3,CKEDITOR.ENLARGE_INLINE=4,CKEDITOR.START=1,CKEDITOR.END=2,CKEDITOR.SHRINK_ELEMENT=1,CKEDITOR.SHRINK_TEXT=2,"use strict",function(){function a(a){1>
arguments.length||(this.range=a,this.forceBrBreak=0,this.enlargeBr=1,this.enforceRealBlocks=0,this._||(this._={}))}function e(a){var b=[];a.forEach(function(a){if("true"==a.getAttribute("contenteditable"))return b.push(a),!1},CKEDITOR.NODE_ELEMENT,!0);return b}function b(a,c,d,g){a:{null==g&&(g=e(d));for(var h;h=g.shift();)if(h.getDtd().p){g={element:h,remaining:g};break a}g=null}if(!g)return 0;if((h=CKEDITOR.filter.instances[g.element.data("cke-filter")])&&!h.check(c))return b(a,c,d,g.remaining);
c=new CKEDITOR.dom.range(g.element);c.selectNodeContents(g.element);c=c.createIterator();c.enlargeBr=a.enlargeBr;c.enforceRealBlocks=a.enforceRealBlocks;c.activeFilter=c.filter=h;a._.nestedEditable={element:g.element,container:d,remaining:g.remaining,iterator:c};return 1}function c(a,b,c){if(!b)return!1;a=a.clone();a.collapse(!c);return a.checkBoundaryOfElement(b,c?CKEDITOR.START:CKEDITOR.END)}var d=/^[\r\n\t ]+$/,l=CKEDITOR.dom.walker.bookmark(!1,!0),k=CKEDITOR.dom.walker.whitespaces(!0),g=function(a){return l(a)&&
k(a)},h={dd:1,dt:1,li:1};a.prototype={getNextParagraph:function(a){var f,e,k,r,v;a=a||"p";if(this._.nestedEditable){if(f=this._.nestedEditable.iterator.getNextParagraph(a))return this.activeFilter=this._.nestedEditable.iterator.activeFilter,f;this.activeFilter=this.filter;if(b(this,a,this._.nestedEditable.container,this._.nestedEditable.remaining))return this.activeFilter=this._.nestedEditable.iterator.activeFilter,this._.nestedEditable.iterator.getNextParagraph(a);this._.nestedEditable=null}if(!this.range.root.getDtd()[a])return null;
if(!this._.started){var x=this.range.clone();e=x.startPath();var q=x.endPath(),t=!x.collapsed&&c(x,e.block),u=!x.collapsed&&c(x,q.block,1);x.shrink(CKEDITOR.SHRINK_ELEMENT,!0);t&&x.setStartAt(e.block,CKEDITOR.POSITION_BEFORE_END);u&&x.setEndAt(q.block,CKEDITOR.POSITION_AFTER_START);e=x.endContainer.hasAscendant("pre",!0)||x.startContainer.hasAscendant("pre",!0);x.enlarge(this.forceBrBreak&&!e||!this.enlargeBr?CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:CKEDITOR.ENLARGE_BLOCK_CONTENTS);x.collapsed||(e=new CKEDITOR.dom.walker(x.clone()),
q=CKEDITOR.dom.walker.bookmark(!0,!0),e.evaluator=q,this._.nextNode=e.next(),e=new CKEDITOR.dom.walker(x.clone()),e.evaluator=q,e=e.previous(),this._.lastNode=e.getNextSourceNode(!0,null,x.root),this._.lastNode&&this._.lastNode.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(this._.lastNode.getText())&&this._.lastNode.getParent().isBlockBoundary()&&(q=this.range.clone(),q.moveToPosition(this._.lastNode,CKEDITOR.POSITION_AFTER_END),q.checkEndOfBlock()&&(q=new CKEDITOR.dom.elementPath(q.endContainer,
q.root),this._.lastNode=(q.block||q.blockLimit).getNextSourceNode(!0))),this._.lastNode&&x.root.contains(this._.lastNode)||(this._.lastNode=this._.docEndMarker=x.document.createText(""),this._.lastNode.insertAfter(e)),x=null);this._.started=1;e=x}q=this._.nextNode;x=this._.lastNode;for(this._.nextNode=null;q;){var t=0,u=q.hasAscendant("pre"),A=q.type!=CKEDITOR.NODE_ELEMENT,z=0;if(A)q.type==CKEDITOR.NODE_TEXT&&d.test(q.getText())&&(A=0);else{var w=q.getName();if(CKEDITOR.dtd.$block[w]&&"false"==q.getAttribute("contenteditable")){f=
q;b(this,a,f);break}else if(q.isBlockBoundary(this.forceBrBreak&&!u&&{br:1})){if("br"==w)A=1;else if(!e&&!q.getChildCount()&&"hr"!=w){f=q;k=q.equals(x);break}e&&(e.setEndAt(q,CKEDITOR.POSITION_BEFORE_START),"br"!=w&&(this._.nextNode=q));t=1}else{if(q.getFirst()){e||(e=this.range.clone(),e.setStartAt(q,CKEDITOR.POSITION_BEFORE_START));q=q.getFirst();continue}A=1}}A&&!e&&(e=this.range.clone(),e.setStartAt(q,CKEDITOR.POSITION_BEFORE_START));k=(!t||A)&&q.equals(x);if(e&&!t)for(;!q.getNext(g)&&!k;){w=
q.getParent();if(w.isBlockBoundary(this.forceBrBreak&&!u&&{br:1})){t=1;A=0;k||w.equals(x);e.setEndAt(w,CKEDITOR.POSITION_BEFORE_END);break}q=w;A=1;k=q.equals(x);z=1}A&&e.setEndAt(q,CKEDITOR.POSITION_AFTER_END);q=this._getNextSourceNode(q,z,x);if((k=!q)||t&&e)break}if(!f){if(!e)return this._.docEndMarker&&this._.docEndMarker.remove(),this._.nextNode=null;f=new CKEDITOR.dom.elementPath(e.startContainer,e.root);q=f.blockLimit;t={div:1,th:1,td:1};f=f.block;!f&&q&&!this.enforceRealBlocks&&t[q.getName()]&&
e.checkStartOfBlock()&&e.checkEndOfBlock()&&!q.equals(e.root)?f=q:!f||this.enforceRealBlocks&&f.is(h)?(f=this.range.document.createElement(a),e.extractContents().appendTo(f),f.trim(),e.insertNode(f),r=v=!0):"li"!=f.getName()?e.checkStartOfBlock()&&e.checkEndOfBlock()||(f=f.clone(!1),e.extractContents().appendTo(f),f.trim(),v=e.splitBlock(),r=!v.wasStartOfBlock,v=!v.wasEndOfBlock,e.insertNode(f)):k||(this._.nextNode=f.equals(x)?null:this._getNextSourceNode(e.getBoundaryNodes().endNode,1,x))}r&&(r=
f.getPrevious())&&r.type==CKEDITOR.NODE_ELEMENT&&("br"==r.getName()?r.remove():r.getLast()&&"br"==r.getLast().$.nodeName.toLowerCase()&&r.getLast().remove());v&&(r=f.getLast())&&r.type==CKEDITOR.NODE_ELEMENT&&"br"==r.getName()&&(!CKEDITOR.env.needsBrFiller||r.getPrevious(l)||r.getNext(l))&&r.remove();this._.nextNode||(this._.nextNode=k||f.equals(x)||!x?null:this._getNextSourceNode(f,1,x));return f},_getNextSourceNode:function(a,b,c){function d(a){return!(a.equals(c)||a.equals(g))}var g=this.range.root;
for(a=a.getNextSourceNode(b,null,d);!l(a);)a=a.getNextSourceNode(b,null,d);return a}};CKEDITOR.dom.range.prototype.createIterator=function(){return new a(this)}}(),CKEDITOR.command=function(a,e){this.uiItems=[];this.exec=function(b){if(this.state==CKEDITOR.TRISTATE_DISABLED||!this.checkAllowed())return!1;this.editorFocus&&a.focus();return!1===this.fire("exec")?!0:!1!==e.exec.call(this,a,b)};this.refresh=function(a,b){if(!this.readOnly&&a.readOnly)return!0;if(this.context&&!b.isContextFor(this.context)||
!this.checkAllowed(!0))return this.disable(),!0;this.startDisabled||this.enable();this.modes&&!this.modes[a.mode]&&this.disable();return!1===this.fire("refresh",{editor:a,path:b})?!0:e.refresh&&!1!==e.refresh.apply(this,arguments)};var b;this.checkAllowed=function(c){return c||"boolean"!=typeof b?b=a.activeFilter.checkFeature(this):b};CKEDITOR.tools.extend(this,e,{modes:{wysiwyg:1},editorFocus:1,contextSensitive:!!e.context,state:CKEDITOR.TRISTATE_DISABLED});CKEDITOR.event.call(this)},CKEDITOR.command.prototype=
{enable:function(){this.state==CKEDITOR.TRISTATE_DISABLED&&this.checkAllowed()&&this.setState(this.preserveState&&"undefined"!=typeof this.previousState?this.previousState:CKEDITOR.TRISTATE_OFF)},disable:function(){this.setState(CKEDITOR.TRISTATE_DISABLED)},setState:function(a){if(this.state==a||a!=CKEDITOR.TRISTATE_DISABLED&&!this.checkAllowed())return!1;this.previousState=this.state;this.state=a;this.fire("state");return!0},toggleState:function(){this.state==CKEDITOR.TRISTATE_OFF?this.setState(CKEDITOR.TRISTATE_ON):
this.state==CKEDITOR.TRISTATE_ON&&this.setState(CKEDITOR.TRISTATE_OFF)}},CKEDITOR.event.implementOn(CKEDITOR.command.prototype),CKEDITOR.ENTER_P=1,CKEDITOR.ENTER_BR=2,CKEDITOR.ENTER_DIV=3,CKEDITOR.config={customConfig:"config.js",autoUpdateElement:!0,language:"",defaultLanguage:"en",contentsLangDirection:"",enterMode:CKEDITOR.ENTER_P,forceEnterMode:!1,shiftEnterMode:CKEDITOR.ENTER_BR,docType:"\x3c!DOCTYPE html\x3e",bodyId:"",bodyClass:"",fullPage:!1,height:200,contentsCss:CKEDITOR.getUrl("contents.css"),
extraPlugins:"",removePlugins:"",protectedSource:[],tabIndex:0,width:"",baseFloatZIndex:1E4,blockedKeystrokes:[CKEDITOR.CTRL+66,CKEDITOR.CTRL+73,CKEDITOR.CTRL+85]},function(){function a(a,b,c,f,d){var g,h;a=[];for(g in b){h=b[g];h="boolean"==typeof h?{}:"function"==typeof h?{match:h}:F(h);"$"!=g.charAt(0)&&(h.elements=g);c&&(h.featureName=c.toLowerCase());var e=h;e.elements=k(e.elements,/\s+/)||null;e.propertiesOnly=e.propertiesOnly||!0===e.elements;var m=/\s*,\s*/,l=void 0;for(l in K){e[l]=k(e[l],
m)||null;var n=e,q=J[l],w=k(e[J[l]],m),D=e[l],z=[],N=!0,y=void 0;w?N=!1:w={};for(y in D)"!"==y.charAt(0)&&(y=y.slice(1),z.push(y),w[y]=!0,N=!1);for(;y=z.pop();)D[y]=D["!"+y],delete D["!"+y];n[q]=(N?!1:w)||null}e.match=e.match||null;f.push(h);a.push(h)}b=d.elements;d=d.generic;var p;c=0;for(f=a.length;c<f;++c){g=F(a[c]);h=!0===g.classes||!0===g.styles||!0===g.attributes;e=g;l=q=m=void 0;for(m in K)e[m]=t(e[m]);n=!0;for(l in J){m=J[l];q=e[m];w=[];D=void 0;for(D in q)-1<D.indexOf("*")?w.push(new RegExp("^"+
D.replace(/\*/g,".*")+"$")):w.push(D);q=w;q.length&&(e[m]=q,n=!1)}e.nothingRequired=n;e.noProperties=!(e.attributes||e.classes||e.styles);if(!0===g.elements||null===g.elements)d[h?"unshift":"push"](g);else for(p in e=g.elements,delete g.elements,e)if(b[p])b[p][h?"unshift":"push"](g);else b[p]=[g]}}function e(a,c,f,d){if(!a.match||a.match(c))if(d||g(a,c))if(a.propertiesOnly||(f.valid=!0),f.allAttributes||(f.allAttributes=b(a.attributes,c.attributes,f.validAttributes)),f.allStyles||(f.allStyles=b(a.styles,
c.styles,f.validStyles)),!f.allClasses){a=a.classes;c=c.classes;d=f.validClasses;if(a)if(!0===a)a=!0;else{for(var h=0,e=c.length,m;h<e;++h)m=c[h],d[m]||(d[m]=a(m));a=!1}else a=!1;f.allClasses=a}}function b(a,b,c){if(!a)return!1;if(!0===a)return!0;for(var f in b)c[f]||(c[f]=a(f));return!1}function c(a,b,c){if(!a.match||a.match(b)){if(a.noProperties)return!1;c.hadInvalidAttribute=d(a.attributes,b.attributes)||c.hadInvalidAttribute;c.hadInvalidStyle=d(a.styles,b.styles)||c.hadInvalidStyle;a=a.classes;
b=b.classes;if(a){for(var f=!1,g=!0===a,h=b.length;h--;)if(g||a(b[h]))b.splice(h,1),f=!0;a=f}else a=!1;c.hadInvalidClass=a||c.hadInvalidClass}}function d(a,b){if(!a)return!1;var c=!1,f=!0===a,d;for(d in b)if(f||a(d))delete b[d],c=!0;return c}function l(a,b,c){if(a.disabled||a.customConfig&&!c||!b)return!1;a._.cachedChecks={};return!0}function k(a,b){if(!a)return!1;if(!0===a)return a;if("string"==typeof a)return a=I(a),"*"==a?!0:CKEDITOR.tools.convertArrayToObject(a.split(b));if(CKEDITOR.tools.isArray(a))return a.length?
CKEDITOR.tools.convertArrayToObject(a):!1;var c={},f=0,d;for(d in a)c[d]=a[d],f++;return f?c:!1}function g(a,b){if(a.nothingRequired)return!0;var c,f,d,g;if(d=a.requiredClasses)for(g=b.classes,c=0;c<d.length;++c)if(f=d[c],"string"==typeof f){if(-1==CKEDITOR.tools.indexOf(g,f))return!1}else if(!CKEDITOR.tools.checkIfAnyArrayItemMatches(g,f))return!1;return h(b.styles,a.requiredStyles)&&h(b.attributes,a.requiredAttributes)}function h(a,b){if(!b)return!0;for(var c=0,f;c<b.length;++c)if(f=b[c],"string"==
typeof f){if(!(f in a))return!1}else if(!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a,f))return!1;return!0}function m(a){if(!a)return{};a=a.split(/\s*,\s*/).sort();for(var b={};a.length;)b[a.shift()]="cke-test";return b}function f(a){var b,c,f,d,g={},h=1;for(a=I(a);b=a.match(D);)(c=b[2])?(f=n(c,"styles"),d=n(c,"attrs"),c=n(c,"classes")):f=d=c=null,g["$"+h++]={elements:b[1],classes:c,styles:f,attributes:d},a=a.slice(b[0].length);return g}function n(a,b){var c=a.match(R[b]);return c?I(c[1]):null}
function p(a){var b=a.styleBackup=a.attributes.style,c=a.classBackup=a.attributes["class"];a.styles||(a.styles=CKEDITOR.tools.parseCssText(b||"",1));a.classes||(a.classes=c?c.split(/\s+/):[])}function r(a,b,f,d){var g=0,h;d.toHtml&&(b.name=b.name.replace(N,"$1"));if(d.doCallbacks&&a.elementCallbacks){a:{h=a.elementCallbacks;for(var m=0,l=h.length,k;m<l;++m)if(k=h[m](b)){h=k;break a}h=void 0}if(h)return h}if(d.doTransform&&(h=a._.transformations[b.name])){p(b);for(m=0;m<h.length;++m)w(a,b,h[m]);x(b)}if(d.doFilter){a:{m=
b.name;l=a._;a=l.allowedRules.elements[m];h=l.allowedRules.generic;m=l.disallowedRules.elements[m];l=l.disallowedRules.generic;k=d.skipRequired;var n={valid:!1,validAttributes:{},validClasses:{},validStyles:{},allAttributes:!1,allClasses:!1,allStyles:!1,hadInvalidAttribute:!1,hadInvalidClass:!1,hadInvalidStyle:!1},D,z;if(a||h){p(b);if(m)for(D=0,z=m.length;D<z;++D)if(!1===c(m[D],b,n)){a=null;break a}if(l)for(D=0,z=l.length;D<z;++D)c(l[D],b,n);if(a)for(D=0,z=a.length;D<z;++D)e(a[D],b,n,k);if(h)for(D=
0,z=h.length;D<z;++D)e(h[D],b,n,k);a=n}else a=null}if(!a||!a.valid)return f.push(b),1;z=a.validAttributes;var J=a.validStyles;h=a.validClasses;var m=b.attributes,t=b.styles,l=b.classes;k=b.classBackup;var y=b.styleBackup,u,E,C=[],n=[],B=/^data-cke-/;D=!1;delete m.style;delete m["class"];delete b.classBackup;delete b.styleBackup;if(!a.allAttributes)for(u in m)z[u]||(B.test(u)?u==(E=u.replace(/^data-cke-saved-/,""))||z[E]||(delete m[u],D=!0):(delete m[u],D=!0));if(!a.allStyles||a.hadInvalidStyle){for(u in t)a.allStyles||
J[u]?C.push(u+":"+t[u]):D=!0;C.length&&(m.style=C.sort().join("; "))}else y&&(m.style=y);if(!a.allClasses||a.hadInvalidClass){for(u=0;u<l.length;++u)(a.allClasses||h[l[u]])&&n.push(l[u]);n.length&&(m["class"]=n.sort().join(" "));k&&n.length<k.split(/\s+/).length&&(D=!0)}else k&&(m["class"]=k);D&&(g=1);if(!d.skipFinalValidation&&!q(b))return f.push(b),1}d.toHtml&&(b.name=b.name.replace(S,"cke:$1"));return g}function v(a){var b=[],c;for(c in a)-1<c.indexOf("*")&&b.push(c.replace(/\*/g,".*"));return b.length?
new RegExp("^(?:"+b.join("|")+")$"):null}function x(a){var b=a.attributes,c;delete b.style;delete b["class"];if(c=CKEDITOR.tools.writeCssText(a.styles,!0))b.style=c;a.classes.length&&(b["class"]=a.classes.sort().join(" "))}function q(a){switch(a.name){case "a":if(!(a.children.length||a.attributes.name||a.attributes.id))return!1;break;case "img":if(!a.attributes.src)return!1}return!0}function t(a){if(!a)return!1;if(!0===a)return!0;var b=v(a);return function(c){return c in a||b&&c.match(b)}}function u(){return new CKEDITOR.htmlParser.element("br")}
function A(a){return a.type==CKEDITOR.NODE_ELEMENT&&("br"==a.name||E.$block[a.name])}function z(a,b,c){var f=a.name;if(E.$empty[f]||!a.children.length)"hr"==f&&"br"==b?a.replaceWith(u()):(a.parent&&c.push({check:"it",el:a.parent}),a.remove());else if(E.$block[f]||"tr"==f)if("br"==b)a.previous&&!A(a.previous)&&(b=u(),b.insertBefore(a)),a.next&&!A(a.next)&&(b=u(),b.insertAfter(a)),a.replaceWithChildren();else{var f=a.children,d;b:{d=E[b];for(var g=0,h=f.length,e;g<h;++g)if(e=f[g],e.type==CKEDITOR.NODE_ELEMENT&&
!d[e.name]){d=!1;break b}d=!0}if(d)a.name=b,a.attributes={},c.push({check:"parent-down",el:a});else{d=a.parent;for(var g=d.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||"body"==d.name,m,l,h=f.length;0<h;)e=f[--h],g&&(e.type==CKEDITOR.NODE_TEXT||e.type==CKEDITOR.NODE_ELEMENT&&E.$inline[e.name])?(m||(m=new CKEDITOR.htmlParser.element(b),m.insertAfter(a),c.push({check:"parent-down",el:m})),m.add(e,0)):(m=null,l=E[d.name]||E.span,e.insertAfter(a),d.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||e.type!=CKEDITOR.NODE_ELEMENT||
l[e.name]||c.push({check:"el-up",el:e}));a.remove()}}else f in{style:1,script:1}?a.remove():(a.parent&&c.push({check:"it",el:a.parent}),a.replaceWithChildren())}function w(a,b,c){var f,d;for(f=0;f<c.length;++f)if(d=c[f],!(d.check&&!a.check(d.check,!1)||d.left&&!d.left(b))){d.right(b,L);break}}function C(a,b){var c=b.getDefinition(),f=c.attributes,d=c.styles,g,h,e,m;if(a.name!=c.element)return!1;for(g in f)if("class"==g)for(c=f[g].split(/\s+/),e=a.classes.join("|");m=c.pop();){if(-1==e.indexOf(m))return!1}else if(a.attributes[g]!=
f[g])return!1;for(h in d)if(a.styles[h]!=d[h])return!1;return!0}function y(a,b){var c,f;"string"==typeof a?c=a:a instanceof CKEDITOR.style?f=a:(c=a[0],f=a[1]);return[{element:c,left:f,right:function(a,c){c.transform(a,b)}}]}function B(a){return function(b){return C(b,a)}}function G(a){return function(b,c){c[a](b)}}var E=CKEDITOR.dtd,F=CKEDITOR.tools.copy,I=CKEDITOR.tools.trim,H=["","p","br","div"];CKEDITOR.FILTER_SKIP_TREE=2;CKEDITOR.filter=function(a){this.allowedContent=[];this.disallowedContent=
[];this.elementCallbacks=null;this.disabled=!1;this.editor=null;this.id=CKEDITOR.tools.getNextNumber();this._={allowedRules:{elements:{},generic:[]},disallowedRules:{elements:{},generic:[]},transformations:{},cachedTests:{},cachedChecks:{}};CKEDITOR.filter.instances[this.id]=this;if(a instanceof CKEDITOR.editor){a=this.editor=a;this.customConfig=!0;var b=a.config.allowedContent;!0===b?this.disabled=!0:(b||(this.customConfig=!1),this.allow(b,"config",1),this.allow(a.config.extraAllowedContent,"extra",
1),this.allow(H[a.enterMode]+" "+H[a.shiftEnterMode],"default",1),this.disallow(a.config.disallowedContent))}else this.customConfig=!1,this.allow(a,"default",1)};CKEDITOR.filter.instances={};CKEDITOR.filter.prototype={allow:function(b,c,d){if(!l(this,b,d))return!1;var g,h;if("string"==typeof b)b=f(b);else if(b instanceof CKEDITOR.style){if(b.toAllowedContentRules)return this.allow(b.toAllowedContentRules(this.editor),c,d);g=b.getDefinition();b={};d=g.attributes;b[g.element]=g={styles:g.styles,requiredStyles:g.styles&&
CKEDITOR.tools.objectKeys(g.styles)};d&&(d=F(d),g.classes=d["class"]?d["class"].split(/\s+/):null,g.requiredClasses=g.classes,delete d["class"],g.attributes=d,g.requiredAttributes=d&&CKEDITOR.tools.objectKeys(d))}else if(CKEDITOR.tools.isArray(b)){for(g=0;g<b.length;++g)h=this.allow(b[g],c,d);return h}a(this,b,c,this.allowedContent,this._.allowedRules);return!0},applyTo:function(a,b,c,f){if(this.disabled)return!1;var d=this,g=[],h=this.editor&&this.editor.config.protectedSource,e,m=!1,l={doFilter:!c,
doTransform:!0,doCallbacks:!0,toHtml:b};a.forEach(function(a){if(a.type==CKEDITOR.NODE_ELEMENT){if("off"==a.attributes["data-cke-filter"])return!1;if(!b||"span"!=a.name||!~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))if(e=r(d,a,g,l),e&1)m=!0;else if(e&2)return!1}else if(a.type==CKEDITOR.NODE_COMMENT&&a.value.match(/^\{cke_protected\}(?!\{C\})/)){var c;a:{var f=decodeURIComponent(a.value.replace(/^\{cke_protected\}/,""));c=[];var k,n,q;if(h)for(n=0;n<h.length;++n)if((q=f.match(h[n]))&&
q[0].length==f.length){c=!0;break a}f=CKEDITOR.htmlParser.fragment.fromHtml(f);1==f.children.length&&(k=f.children[0]).type==CKEDITOR.NODE_ELEMENT&&r(d,k,c,l);c=!c.length}c||g.push(a)}},null,!0);g.length&&(m=!0);var k;a=[];f=H[f||(this.editor?this.editor.enterMode:CKEDITOR.ENTER_P)];for(var n;c=g.pop();)c.type==CKEDITOR.NODE_ELEMENT?z(c,f,a):c.remove();for(;k=a.pop();)if(c=k.el,c.parent)switch(n=E[c.parent.name]||E.span,k.check){case "it":E.$removeEmpty[c.name]&&!c.children.length?z(c,f,a):q(c)||
z(c,f,a);break;case "el-up":c.parent.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||n[c.name]||z(c,f,a);break;case "parent-down":c.parent.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||n[c.name]||z(c.parent,f,a)}return m},checkFeature:function(a){if(this.disabled||!a)return!0;a.toFeature&&(a=a.toFeature(this.editor));return!a.requiredContent||this.check(a.requiredContent)},disable:function(){this.disabled=!0},disallow:function(b){if(!l(this,b,!0))return!1;"string"==typeof b&&(b=f(b));a(this,b,null,this.disallowedContent,
this._.disallowedRules);return!0},addContentForms:function(a){if(!this.disabled&&a){var b,c,f=[],d;for(b=0;b<a.length&&!d;++b)c=a[b],("string"==typeof c||c instanceof CKEDITOR.style)&&this.check(c)&&(d=c);if(d){for(b=0;b<a.length;++b)f.push(y(a[b],d));this.addTransformations(f)}}},addElementCallback:function(a){this.elementCallbacks||(this.elementCallbacks=[]);this.elementCallbacks.push(a)},addFeature:function(a){if(this.disabled||!a)return!0;a.toFeature&&(a=a.toFeature(this.editor));this.allow(a.allowedContent,
a.name);this.addTransformations(a.contentTransformations);this.addContentForms(a.contentForms);return a.requiredContent&&(this.customConfig||this.disallowedContent.length)?this.check(a.requiredContent):!0},addTransformations:function(a){var b,c;if(!this.disabled&&a){var f=this._.transformations,d;for(d=0;d<a.length;++d){b=a[d];var g=void 0,h=void 0,e=void 0,m=void 0,l=void 0,k=void 0;c=[];for(h=0;h<b.length;++h)e=b[h],"string"==typeof e?(e=e.split(/\s*:\s*/),m=e[0],l=null,k=e[1]):(m=e.check,l=e.left,
k=e.right),g||(g=e,g=g.element?g.element:m?m.match(/^([a-z0-9]+)/i)[0]:g.left.getDefinition().element),l instanceof CKEDITOR.style&&(l=B(l)),c.push({check:m==g?null:m,left:l,right:"string"==typeof k?G(k):k});b=g;f[b]||(f[b]=[]);f[b].push(c)}}},check:function(a,b,c){if(this.disabled)return!0;if(CKEDITOR.tools.isArray(a)){for(var d=a.length;d--;)if(this.check(a[d],b,c))return!0;return!1}var g,h;if("string"==typeof a){h=a+"\x3c"+(!1===b?"0":"1")+(c?"1":"0")+"\x3e";if(h in this._.cachedChecks)return this._.cachedChecks[h];
d=f(a).$1;g=d.styles;var e=d.classes;d.name=d.elements;d.classes=e=e?e.split(/\s*,\s*/):[];d.styles=m(g);d.attributes=m(d.attributes);d.children=[];e.length&&(d.attributes["class"]=e.join(" "));g&&(d.attributes.style=CKEDITOR.tools.writeCssText(d.styles));g=d}else d=a.getDefinition(),g=d.styles,e=d.attributes||{},g&&!CKEDITOR.tools.isEmpty(g)?(g=F(g),e.style=CKEDITOR.tools.writeCssText(g,!0)):g={},g={name:d.element,attributes:e,classes:e["class"]?e["class"].split(/\s+/):[],styles:g,children:[]};var e=
CKEDITOR.tools.clone(g),l=[],k;if(!1!==b&&(k=this._.transformations[g.name])){for(d=0;d<k.length;++d)w(this,g,k[d]);x(g)}r(this,e,l,{doFilter:!0,doTransform:!1!==b,skipRequired:!c,skipFinalValidation:!c});b=0<l.length?!1:CKEDITOR.tools.objectCompare(g.attributes,e.attributes,!0)?!0:!1;"string"==typeof a&&(this._.cachedChecks[h]=b);return b},getAllowedEnterMode:function(){var a=["p","div","br"],b={p:CKEDITOR.ENTER_P,div:CKEDITOR.ENTER_DIV,br:CKEDITOR.ENTER_BR};return function(c,f){var d=a.slice(),
g;if(this.check(H[c]))return c;for(f||(d=d.reverse());g=d.pop();)if(this.check(g))return b[g];return CKEDITOR.ENTER_BR}}(),clone:function(){var a=new CKEDITOR.filter,b=CKEDITOR.tools.clone;a.allowedContent=b(this.allowedContent);a._.allowedRules=b(this._.allowedRules);a.disallowedContent=b(this.disallowedContent);a._.disallowedRules=b(this._.disallowedRules);a._.transformations=b(this._.transformations);a.disabled=this.disabled;a.editor=this.editor;return a},destroy:function(){delete CKEDITOR.filter.instances[this.id];
delete this._;delete this.allowedContent;delete this.disallowedContent}};var K={styles:1,attributes:1,classes:1},J={styles:"requiredStyles",attributes:"requiredAttributes",classes:"requiredClasses"},D=/^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,R={styles:/{([^}]+)}/,attrs:/\[([^\]]+)\]/,classes:/\(([^\)]+)\)/},N=/^cke:(object|embed|param)$/,S=/^(object|embed|param)$/,L;L=CKEDITOR.filter.transformationsTools={sizeToStyle:function(a){this.lengthToStyle(a,
"width");this.lengthToStyle(a,"height")},sizeToAttribute:function(a){this.lengthToAttribute(a,"width");this.lengthToAttribute(a,"height")},lengthToStyle:function(a,b,c){c=c||b;if(!(c in a.styles)){var f=a.attributes[b];f&&(/^\d+$/.test(f)&&(f+="px"),a.styles[c]=f)}delete a.attributes[b]},lengthToAttribute:function(a,b,c){c=c||b;if(!(c in a.attributes)){var f=a.styles[b],d=f&&f.match(/^(\d+)(?:\.\d*)?px$/);d?a.attributes[c]=d[1]:"cke-test"==f&&(a.attributes[c]="cke-test")}delete a.styles[b]},alignmentToStyle:function(a){if(!("float"in
a.styles)){var b=a.attributes.align;if("left"==b||"right"==b)a.styles["float"]=b}delete a.attributes.align},alignmentToAttribute:function(a){if(!("align"in a.attributes)){var b=a.styles["float"];if("left"==b||"right"==b)a.attributes.align=b}delete a.styles["float"]},splitBorderShorthand:function(a){if(a.styles.border){var b=CKEDITOR.tools.style.parse.border(a.styles.border);b.color&&(a.styles["border-color"]=b.color);b.style&&(a.styles["border-style"]=b.style);b.width&&(a.styles["border-width"]=b.width);
delete a.styles.border}},listTypeToStyle:function(a){if(a.attributes.type)switch(a.attributes.type){case "a":a.styles["list-style-type"]="lower-alpha";break;case "A":a.styles["list-style-type"]="upper-alpha";break;case "i":a.styles["list-style-type"]="lower-roman";break;case "I":a.styles["list-style-type"]="upper-roman";break;case "1":a.styles["list-style-type"]="decimal";break;default:a.styles["list-style-type"]=a.attributes.type}},splitMarginShorthand:function(a){function b(f){a.styles["margin-top"]=
c[f[0]];a.styles["margin-right"]=c[f[1]];a.styles["margin-bottom"]=c[f[2]];a.styles["margin-left"]=c[f[3]]}if(a.styles.margin){var c=a.styles.margin.match(/(\-?[\.\d]+\w+)/g)||["0px"];switch(c.length){case 1:b([0,0,0,0]);break;case 2:b([0,1,0,1]);break;case 3:b([0,1,2,1]);break;case 4:b([0,1,2,3])}delete a.styles.margin}},matchesStyle:C,transform:function(a,b){if("string"==typeof b)a.name=b;else{var c=b.getDefinition(),f=c.styles,d=c.attributes,g,h,e,m;a.name=c.element;for(g in d)if("class"==g)for(c=
a.classes.join("|"),e=d[g].split(/\s+/);m=e.pop();)-1==c.indexOf(m)&&a.classes.push(m);else a.attributes[g]=d[g];for(h in f)a.styles[h]=f[h]}}}}(),function(){CKEDITOR.focusManager=function(a){if(a.focusManager)return a.focusManager;this.hasFocus=!1;this.currentActive=null;this._={editor:a};return this};CKEDITOR.focusManager._={blurDelay:200};CKEDITOR.focusManager.prototype={focus:function(a){this._.timer&&clearTimeout(this._.timer);a&&(this.currentActive=a);this.hasFocus||this._.locked||((a=CKEDITOR.currentInstance)&&
a.focusManager.blur(1),this.hasFocus=!0,(a=this._.editor.container)&&a.addClass("cke_focus"),this._.editor.fire("focus"))},lock:function(){this._.locked=1},unlock:function(){delete this._.locked},blur:function(a){function e(){if(this.hasFocus){this.hasFocus=!1;var a=this._.editor.container;a&&a.removeClass("cke_focus");this._.editor.fire("blur")}}if(!this._.locked){this._.timer&&clearTimeout(this._.timer);var b=CKEDITOR.focusManager._.blurDelay;a||!b?e.call(this):this._.timer=CKEDITOR.tools.setTimeout(function(){delete this._.timer;
e.call(this)},b,this)}},add:function(a,e){var b=a.getCustomData("focusmanager");if(!b||b!=this){b&&b.remove(a);var b="focus",c="blur";e&&(CKEDITOR.env.ie?(b="focusin",c="focusout"):CKEDITOR.event.useCapture=1);var d={blur:function(){a.equals(this.currentActive)&&this.blur()},focus:function(){this.focus(a)}};a.on(b,d.focus,this);a.on(c,d.blur,this);e&&(CKEDITOR.event.useCapture=0);a.setCustomData("focusmanager",this);a.setCustomData("focusmanager_handlers",d)}},remove:function(a){a.removeCustomData("focusmanager");
var e=a.removeCustomData("focusmanager_handlers");a.removeListener("blur",e.blur);a.removeListener("focus",e.focus)}}}(),CKEDITOR.keystrokeHandler=function(a){if(a.keystrokeHandler)return a.keystrokeHandler;this.keystrokes={};this.blockedKeystrokes={};this._={editor:a};return this},function(){var a,e=function(b){b=b.data;var d=b.getKeystroke(),e=this.keystrokes[d],k=this._.editor;a=!1===k.fire("key",{keyCode:d,domEvent:b});a||(e&&(a=!1!==k.execCommand(e,{from:"keystrokeHandler"})),a||(a=!!this.blockedKeystrokes[d]));
a&&b.preventDefault(!0);return!a},b=function(b){a&&(a=!1,b.data.preventDefault(!0))};CKEDITOR.keystrokeHandler.prototype={attach:function(a){a.on("keydown",e,this);if(CKEDITOR.env.gecko&&CKEDITOR.env.mac)a.on("keypress",b,this)}}}(),function(){CKEDITOR.lang={languages:{af:1,ar:1,az:1,bg:1,bn:1,bs:1,ca:1,cs:1,cy:1,da:1,de:1,"de-ch":1,el:1,"en-au":1,"en-ca":1,"en-gb":1,en:1,eo:1,es:1,"es-mx":1,et:1,eu:1,fa:1,fi:1,fo:1,"fr-ca":1,fr:1,gl:1,gu:1,he:1,hi:1,hr:1,hu:1,id:1,is:1,it:1,ja:1,ka:1,km:1,ko:1,ku:1,
lt:1,lv:1,mk:1,mn:1,ms:1,nb:1,nl:1,no:1,oc:1,pl:1,"pt-br":1,pt:1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,"sr-latn":1,sr:1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,"zh-cn":1,zh:1},rtl:{ar:1,fa:1,he:1,ku:1,ug:1},load:function(a,e,b){a&&CKEDITOR.lang.languages[a]||(a=this.detect(e,a));var c=this;e=function(){c[a].dir=c.rtl[a]?"rtl":"ltr";b(a,c[a])};this[a]?e():CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/"+a+".js"),e,this)},detect:function(a,e){var b=this.languages;e=e||navigator.userLanguage||navigator.language||
a;var c=e.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),d=c[1],c=c[2];b[d+"-"+c]?d=d+"-"+c:b[d]||(d=null);CKEDITOR.lang.detect=d?function(){return d}:function(a){return a};return d||a}}}(),CKEDITOR.scriptLoader=function(){var a={},e={};return{load:function(b,c,d,l){var k="string"==typeof b;k&&(b=[b]);d||(d=CKEDITOR);var g=b.length,h=[],m=[],f=function(a){c&&(k?c.call(d,a):c.call(d,h,m))};if(0===g)f(!0);else{var n=function(a,b){(b?h:m).push(a);0>=--g&&(l&&CKEDITOR.document.getDocumentElement().removeStyle("cursor"),
f(b))},p=function(b,c){a[b]=1;var f=e[b];delete e[b];for(var d=0;d<f.length;d++)f[d](b,c)},r=function(b){if(a[b])n(b,!0);else{var f=e[b]||(e[b]=[]);f.push(n);if(!(1<f.length)){var d=new CKEDITOR.dom.element("script");d.setAttributes({type:"text/javascript",src:b});c&&(CKEDITOR.env.ie&&(8>=CKEDITOR.env.version||CKEDITOR.env.ie9Compat)?d.$.onreadystatechange=function(){if("loaded"==d.$.readyState||"complete"==d.$.readyState)d.$.onreadystatechange=null,p(b,!0)}:(d.$.onload=function(){setTimeout(function(){p(b,
!0)},0)},d.$.onerror=function(){p(b,!1)}));d.appendTo(CKEDITOR.document.getHead())}}};l&&CKEDITOR.document.getDocumentElement().setStyle("cursor","wait");for(var v=0;v<g;v++)r(b[v])}},queue:function(){function a(){var b;(b=c[0])&&this.load(b.scriptUrl,b.callback,CKEDITOR,0)}var c=[];return function(d,e){var k=this;c.push({scriptUrl:d,callback:function(){e&&e.apply(this,arguments);c.shift();a.call(k)}});1==c.length&&a.call(this)}}()}}(),CKEDITOR.resourceManager=function(a,e){this.basePath=a;this.fileName=
e;this.registered={};this.loaded={};this.externals={};this._={waitingList:{}}},CKEDITOR.resourceManager.prototype={add:function(a,e){if(this.registered[a])throw Error('[CKEDITOR.resourceManager.add] The resource name "'+a+'" is already registered.');var b=this.registered[a]=e||{};b.name=a;b.path=this.getPath(a);CKEDITOR.fire(a+CKEDITOR.tools.capitalize(this.fileName)+"Ready",b);return this.get(a)},get:function(a){return this.registered[a]||null},getPath:function(a){var e=this.externals[a];return CKEDITOR.getUrl(e&&
e.dir||this.basePath+a+"/")},getFilePath:function(a){var e=this.externals[a];return CKEDITOR.getUrl(this.getPath(a)+(e?e.file:this.fileName+".js"))},addExternal:function(a,e,b){a=a.split(",");for(var c=0;c<a.length;c++){var d=a[c];b||(e=e.replace(/[^\/]+$/,function(a){b=a;return""}));this.externals[d]={dir:e,file:b||this.fileName+".js"}}},load:function(a,e,b){CKEDITOR.tools.isArray(a)||(a=a?[a]:[]);for(var c=this.loaded,d=this.registered,l=[],k={},g={},h=0;h<a.length;h++){var m=a[h];if(m)if(c[m]||
d[m])g[m]=this.get(m);else{var f=this.getFilePath(m);l.push(f);f in k||(k[f]=[]);k[f].push(m)}}CKEDITOR.scriptLoader.load(l,function(a,f){if(f.length)throw Error('[CKEDITOR.resourceManager.load] Resource name "'+k[f[0]].join(",")+'" was not found at "'+f[0]+'".');for(var d=0;d<a.length;d++)for(var h=k[a[d]],m=0;m<h.length;m++){var l=h[m];g[l]=this.get(l);c[l]=1}e.call(b,g)},this)}},CKEDITOR.plugins=new CKEDITOR.resourceManager("plugins/","plugin"),CKEDITOR.plugins.load=CKEDITOR.tools.override(CKEDITOR.plugins.load,
function(a){var e={};return function(b,c,d){var l={},k=function(b){a.call(this,b,function(a){CKEDITOR.tools.extend(l,a);var b=[],f;for(f in a){var g=a[f],p=g&&g.requires;if(!e[f]){if(g.icons)for(var r=g.icons.split(","),v=r.length;v--;)CKEDITOR.skin.addIcon(r[v],g.path+"icons/"+(CKEDITOR.env.hidpi&&g.hidpi?"hidpi/":"")+r[v]+".png");e[f]=1}if(p)for(p.split&&(p=p.split(",")),g=0;g<p.length;g++)l[p[g]]||b.push(p[g])}if(b.length)k.call(this,b);else{for(f in l)g=l[f],g.onLoad&&!g.onLoad._called&&(!1===
g.onLoad()&&delete l[f],g.onLoad._called=1);c&&c.call(d||window,l)}},this)};k.call(this,b)}}),CKEDITOR.plugins.setLang=function(a,e,b){var c=this.get(a);a=c.langEntries||(c.langEntries={});c=c.lang||(c.lang=[]);c.split&&(c=c.split(","));-1==CKEDITOR.tools.indexOf(c,e)&&c.push(e);a[e]=b},CKEDITOR.ui=function(a){if(a.ui)return a.ui;this.items={};this.instances={};this.editor=a;this._={handlers:{}};return this},CKEDITOR.ui.prototype={add:function(a,e,b){b.name=a.toLowerCase();var c=this.items[a]={type:e,
command:b.command||null,args:Array.prototype.slice.call(arguments,2)};CKEDITOR.tools.extend(c,b)},get:function(a){return this.instances[a]},create:function(a){var e=this.items[a],b=e&&this._.handlers[e.type],c=e&&e.command&&this.editor.getCommand(e.command),b=b&&b.create.apply(this,e.args);this.instances[a]=b;c&&c.uiItems.push(b);b&&!b.type&&(b.type=e.type);return b},addHandler:function(a,e){this._.handlers[a]=e},space:function(a){return CKEDITOR.document.getById(this.spaceId(a))},spaceId:function(a){return this.editor.id+
"_"+a}},CKEDITOR.event.implementOn(CKEDITOR.ui),function(){function a(a,f,d){CKEDITOR.event.call(this);a=a&&CKEDITOR.tools.clone(a);if(void 0!==f){if(!(f instanceof CKEDITOR.dom.element))throw Error("Expect element of type CKEDITOR.dom.element.");if(!d)throw Error("One of the element modes must be specified.");if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&d==CKEDITOR.ELEMENT_MODE_INLINE)throw Error("Inline element mode is not supported on IE quirks.");if(!b(f,d))throw Error('The specified element mode is not supported on element: "'+
f.getName()+'".');this.element=f;this.elementMode=d;this.name=this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO&&(f.getId()||f.getNameAtt())}else this.elementMode=CKEDITOR.ELEMENT_MODE_NONE;this._={};this.commands={};this.templates={};this.name=this.name||e();this.id=CKEDITOR.tools.getNextId();this.status="unloaded";this.config=CKEDITOR.tools.prototypedCopy(CKEDITOR.config);this.ui=new CKEDITOR.ui(this);this.focusManager=new CKEDITOR.focusManager(this);this.keystrokeHandler=new CKEDITOR.keystrokeHandler(this);
this.on("readOnly",c);this.on("selectionChange",function(a){l(this,a.data.path)});this.on("activeFilterChange",function(){l(this,this.elementPath(),!0)});this.on("mode",c);this.on("instanceReady",function(){if(this.config.startupFocus){if("end"===this.config.startupFocus){var a=this.createRange();a.selectNodeContents(this.editable());a.shrink(CKEDITOR.SHRINK_ELEMENT,!0);a.collapse();this.getSelection().selectRanges([a])}this.focus()}});CKEDITOR.fire("instanceCreated",null,this);CKEDITOR.add(this);
CKEDITOR.tools.setTimeout(function(){"destroyed"!==this.status?g(this,a):CKEDITOR.warn("editor-incorrect-destroy")},0,this)}function e(){do var a="editor"+ ++v;while(CKEDITOR.instances[a]);return a}function b(a,b){return b==CKEDITOR.ELEMENT_MODE_INLINE?a.is(CKEDITOR.dtd.$editable)||a.is("textarea"):b==CKEDITOR.ELEMENT_MODE_REPLACE?!a.is(CKEDITOR.dtd.$nonBodyContent):1}function c(){var a=this.commands,b;for(b in a)d(this,a[b])}function d(a,b){b[b.startDisabled?"disable":a.readOnly&&!b.readOnly?"disable":
b.modes[a.mode]?"enable":"disable"]()}function l(a,b,c){if(b){var f,d,g=a.commands;for(d in g)f=g[d],(c||f.contextSensitive)&&f.refresh(a,b)}}function k(a){var b=a.config.customConfig;if(!b)return!1;var b=CKEDITOR.getUrl(b),c=x[b]||(x[b]={});c.fn?(c.fn.call(a,a.config),CKEDITOR.getUrl(a.config.customConfig)!=b&&k(a)||a.fireOnce("customConfigLoaded")):CKEDITOR.scriptLoader.queue(b,function(){c.fn=CKEDITOR.editorConfig?CKEDITOR.editorConfig:function(){};k(a)});return!0}function g(a,b){a.on("customConfigLoaded",
function(){if(b){if(b.on)for(var c in b.on)a.on(c,b.on[c]);CKEDITOR.tools.extend(a.config,b,!0);delete a.config.on}c=a.config;a.readOnly=c.readOnly?!0:a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.element.is("textarea")?a.element.hasAttribute("disabled")||a.element.hasAttribute("readonly"):a.element.isReadOnly():a.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?a.element.hasAttribute("disabled")||a.element.hasAttribute("readonly"):!1;a.blockless=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?!(a.element.is("textarea")||
CKEDITOR.dtd[a.element.getName()].p):!1;a.tabIndex=c.tabIndex||a.element&&a.element.getAttribute("tabindex")||0;a.activeEnterMode=a.enterMode=a.blockless?CKEDITOR.ENTER_BR:c.enterMode;a.activeShiftEnterMode=a.shiftEnterMode=a.blockless?CKEDITOR.ENTER_BR:c.shiftEnterMode;c.skin&&(CKEDITOR.skinName=c.skin);a.fireOnce("configLoaded");a.dataProcessor=new CKEDITOR.htmlDataProcessor(a);a.filter=a.activeFilter=new CKEDITOR.filter(a);h(a)});b&&null!=b.customConfig&&(a.config.customConfig=b.customConfig);
k(a)||a.fireOnce("customConfigLoaded")}function h(a){CKEDITOR.skin.loadPart("editor",function(){m(a)})}function m(a){CKEDITOR.lang.load(a.config.language,a.config.defaultLanguage,function(b,c){var d=a.config.title;a.langCode=b;a.lang=CKEDITOR.tools.prototypedCopy(c);a.title="string"==typeof d||!1===d?d:[a.lang.editor,a.name].join(", ");a.config.contentsLangDirection||(a.config.contentsLangDirection=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.element.getDirection(1):a.lang.dir);a.fire("langLoaded");
f(a)})}function f(a){a.getStylesSet(function(b){a.once("loaded",function(){a.fire("stylesSet",{styles:b})},null,null,1);n(a)})}function n(a){var b=a.config,c=b.plugins,f=b.extraPlugins,d=b.removePlugins;if(f)var g=new RegExp("(?:^|,)(?:"+f.replace(/\s*,\s*/g,"|")+")(?\x3d,|$)","g"),c=c.replace(g,""),c=c+(","+f);if(d)var h=new RegExp("(?:^|,)(?:"+d.replace(/\s*,\s*/g,"|")+")(?\x3d,|$)","g"),c=c.replace(h,"");CKEDITOR.env.air&&(c+=",adobeair");CKEDITOR.plugins.load(c.split(","),function(c){var f=[],
d=[],g=[];a.plugins=c;for(var e in c){var m=c[e],l=m.lang,k=null,n=m.requires,D;CKEDITOR.tools.isArray(n)&&(n=n.join(","));if(n&&(D=n.match(h)))for(;n=D.pop();)CKEDITOR.error("editor-plugin-required",{plugin:n.replace(",",""),requiredBy:e});l&&!a.lang[e]&&(l.split&&(l=l.split(",")),0<=CKEDITOR.tools.indexOf(l,a.langCode)?k=a.langCode:(k=a.langCode.replace(/-.*/,""),k=k!=a.langCode&&0<=CKEDITOR.tools.indexOf(l,k)?k:0<=CKEDITOR.tools.indexOf(l,"en")?"en":l[0]),m.langEntries&&m.langEntries[k]?(a.lang[e]=
m.langEntries[k],k=null):g.push(CKEDITOR.getUrl(m.path+"lang/"+k+".js")));d.push(k);f.push(m)}CKEDITOR.scriptLoader.load(g,function(){for(var c=["beforeInit","init","afterInit"],g=0;g<c.length;g++)for(var h=0;h<f.length;h++){var e=f[h];0===g&&d[h]&&e.lang&&e.langEntries&&(a.lang[e.name]=e.langEntries[d[h]]);if(e[c[g]])e[c[g]](a)}a.fireOnce("pluginsLoaded");b.keystrokes&&a.setKeystroke(a.config.keystrokes);for(h=0;h<a.config.blockedKeystrokes.length;h++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[h]]=
1;a.status="loaded";a.fireOnce("loaded");CKEDITOR.fire("instanceLoaded",null,a)})})}function p(){var a=this.element;if(a&&this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO){var b=this.getData();this.config.htmlEncodeOutput&&(b=CKEDITOR.tools.htmlEncode(b));a.is("textarea")?a.setValue(b):a.setHtml(b);return!0}return!1}function r(a,b){function c(a){var b=a.startContainer,f=a.endContainer;return b.is&&(b.is("tr")||b.is("td")&&b.equals(f)&&a.endOffset===b.getChildCount())?!0:!1}function f(a){var b=a.startContainer;
return b.is("tr")?a.cloneContents():b.clone(!0)}for(var d=new CKEDITOR.dom.documentFragment,g,h,e,m=0;m<a.length;m++){var l=a[m],k=l.startContainer.getAscendant("tr",!0);c(l)?(g||(g=k.getAscendant("table").clone(),g.append(k.getAscendant({thead:1,tbody:1,tfoot:1}).clone()),d.append(g),g=g.findOne("thead, tbody, tfoot")),h&&h.equals(k)||(h=k,e=k.clone(),g.append(e)),e.append(f(l))):d.append(l.cloneContents())}return g?d:b.getHtmlFromRange(a[0])}a.prototype=CKEDITOR.editor.prototype;CKEDITOR.editor=
a;var v=0,x={};CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{addCommand:function(a,b){b.name=a.toLowerCase();var c=new CKEDITOR.command(this,b);this.mode&&d(this,c);return this.commands[a]=c},_attachToForm:function(){function a(b){c.updateElement();c._.required&&!f.getValue()&&!1===c.fire("required")&&b.data.preventDefault()}function b(a){return!!(a&&a.call&&a.apply)}var c=this,f=c.element,d=new CKEDITOR.dom.element(f.$.form);f.is("textarea")&&d&&(d.on("submit",a),b(d.$.submit)&&(d.$.submit=CKEDITOR.tools.override(d.$.submit,
function(b){return function(){a();b.apply?b.apply(this):b()}})),c.on("destroy",function(){d.removeListener("submit",a)}))},destroy:function(a){this.fire("beforeDestroy");!a&&p.call(this);this.editable(null);this.filter&&(this.filter.destroy(),delete this.filter);delete this.activeFilter;this.status="destroyed";this.fire("destroy");this.removeAllListeners();CKEDITOR.remove(this);CKEDITOR.fire("instanceDestroyed",null,this)},elementPath:function(a){if(!a){a=this.getSelection();if(!a)return null;a=a.getStartElement()}return a?
new CKEDITOR.dom.elementPath(a,this.editable()):null},createRange:function(){var a=this.editable();return a?new CKEDITOR.dom.range(a):null},execCommand:function(a,b){var c=this.getCommand(a),f={name:a,commandData:b||{},command:c};return c&&c.state!=CKEDITOR.TRISTATE_DISABLED&&!1!==this.fire("beforeCommandExec",f)&&(f.returnValue=c.exec(f.commandData),!c.async&&!1!==this.fire("afterCommandExec",f))?f.returnValue:!1},getCommand:function(a){return this.commands[a]},getData:function(a){!a&&this.fire("beforeGetData");
var b=this._.data;"string"!=typeof b&&(b=(b=this.element)&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?b.is("textarea")?b.getValue():b.getHtml():"");b={dataValue:b};!a&&this.fire("getData",b);return b.dataValue},getSnapshot:function(){var a=this.fire("getSnapshot");"string"!=typeof a&&(a=(a=this.element)&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?a.is("textarea")?a.getValue():a.getHtml():"");return a},loadSnapshot:function(a){this.fire("loadSnapshot",a)},setData:function(a,b,c){var f=!0,
d=b;b&&"object"==typeof b&&(c=b.internal,d=b.callback,f=!b.noSnapshot);!c&&f&&this.fire("saveSnapshot");if(d||!c)this.once("dataReady",function(a){!c&&f&&this.fire("saveSnapshot");d&&d.call(a.editor)});a={dataValue:a};!c&&this.fire("setData",a);this._.data=a.dataValue;!c&&this.fire("afterSetData",a)},setReadOnly:function(a){a=null==a||a;this.readOnly!=a&&(this.readOnly=a,this.keystrokeHandler.blockedKeystrokes[8]=+a,this.editable().setReadOnly(a),this.fire("readOnly"))},insertHtml:function(a,b,c){this.fire("insertHtml",
{dataValue:a,mode:b,range:c})},insertText:function(a){this.fire("insertText",a)},insertElement:function(a){this.fire("insertElement",a)},getSelectedHtml:function(a){var b=this.editable(),c=this.getSelection(),c=c&&c.getRanges();if(!b||!c||0===c.length)return null;b=r(c,b);return a?b.getHtml():b},extractSelectedHtml:function(a,b){var c=this.editable(),f=this.getSelection().getRanges(),d=new CKEDITOR.dom.documentFragment,g;if(!c||0===f.length)return null;for(g=0;g<f.length;g++)d.append(c.extractHtmlFromRange(f[g],
b));b||this.getSelection().selectRanges([f[0]]);return a?d.getHtml():d},focus:function(){this.fire("beforeFocus")},checkDirty:function(){return"ready"==this.status&&this._.previousValue!==this.getSnapshot()},resetDirty:function(){this._.previousValue=this.getSnapshot()},updateElement:function(){return p.call(this)},setKeystroke:function(){for(var a=this.keystrokeHandler.keystrokes,b=CKEDITOR.tools.isArray(arguments[0])?arguments[0]:[[].slice.call(arguments,0)],c,f,d=b.length;d--;)c=b[d],f=0,CKEDITOR.tools.isArray(c)&&
(f=c[1],c=c[0]),f?a[c]=f:delete a[c]},getCommandKeystroke:function(a){if(a="string"===typeof a?this.getCommand(a):a){var b=CKEDITOR.tools.object.findKey(this.commands,a),c=this.keystrokeHandler.keystrokes,f;if(a.fakeKeystroke)return a.fakeKeystroke;for(f in c)if(c.hasOwnProperty(f)&&c[f]==b)return f}return null},addFeature:function(a){return this.filter.addFeature(a)},setActiveFilter:function(a){a||(a=this.filter);this.activeFilter!==a&&(this.activeFilter=a,this.fire("activeFilterChange"),a===this.filter?
this.setActiveEnterMode(null,null):this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode),a.getAllowedEnterMode(this.shiftEnterMode,!0)))},setActiveEnterMode:function(a,b){a=a?this.blockless?CKEDITOR.ENTER_BR:a:this.enterMode;b=b?this.blockless?CKEDITOR.ENTER_BR:b:this.shiftEnterMode;if(this.activeEnterMode!=a||this.activeShiftEnterMode!=b)this.activeEnterMode=a,this.activeShiftEnterMode=b,this.fire("activeEnterModeChange")},showNotification:function(a){alert(a)}})}(),CKEDITOR.ELEMENT_MODE_NONE=
0,CKEDITOR.ELEMENT_MODE_REPLACE=1,CKEDITOR.ELEMENT_MODE_APPENDTO=2,CKEDITOR.ELEMENT_MODE_INLINE=3,CKEDITOR.htmlParser=function(){this._={htmlPartsRegex:/<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g}},function(){var a=/([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,e={checked:1,compact:1,declare:1,defer:1,disabled:1,ismap:1,multiple:1,nohref:1,noresize:1,noshade:1,
nowrap:1,readonly:1,selected:1};CKEDITOR.htmlParser.prototype={onTagOpen:function(){},onTagClose:function(){},onText:function(){},onCDATA:function(){},onComment:function(){},parse:function(b){for(var c,d,l=0,k;c=this._.htmlPartsRegex.exec(b);){d=c.index;if(d>l)if(l=b.substring(l,d),k)k.push(l);else this.onText(l);l=this._.htmlPartsRegex.lastIndex;if(d=c[1])if(d=d.toLowerCase(),k&&CKEDITOR.dtd.$cdata[d]&&(this.onCDATA(k.join("")),k=null),!k){this.onTagClose(d);continue}if(k)k.push(c[0]);else if(d=
c[3]){if(d=d.toLowerCase(),!/="/.test(d)){var g={},h,m=c[4];c=!!c[5];if(m)for(;h=a.exec(m);){var f=h[1].toLowerCase();h=h[2]||h[3]||h[4]||"";g[f]=!h&&e[f]?f:CKEDITOR.tools.htmlDecodeAttr(h)}this.onTagOpen(d,g,c);!k&&CKEDITOR.dtd.$cdata[d]&&(k=[])}}else if(d=c[2])this.onComment(d)}if(b.length>l)this.onText(b.substring(l,b.length))}}}(),CKEDITOR.htmlParser.basicWriter=CKEDITOR.tools.createClass({$:function(){this._={output:[]}},proto:{openTag:function(a){this._.output.push("\x3c",a)},openTagClose:function(a,
e){e?this._.output.push(" /\x3e"):this._.output.push("\x3e")},attribute:function(a,e){"string"==typeof e&&(e=CKEDITOR.tools.htmlEncodeAttr(e));this._.output.push(" ",a,'\x3d"',e,'"')},closeTag:function(a){this._.output.push("\x3c/",a,"\x3e")},text:function(a){this._.output.push(a)},comment:function(a){this._.output.push("\x3c!--",a,"--\x3e")},write:function(a){this._.output.push(a)},reset:function(){this._.output=[];this._.indent=!1},getHtml:function(a){var e=this._.output.join("");a&&this.reset();
return e}}}),"use strict",function(){CKEDITOR.htmlParser.node=function(){};CKEDITOR.htmlParser.node.prototype={remove:function(){var a=this.parent.children,e=CKEDITOR.tools.indexOf(a,this),b=this.previous,c=this.next;b&&(b.next=c);c&&(c.previous=b);a.splice(e,1);this.parent=null},replaceWith:function(a){var e=this.parent.children,b=CKEDITOR.tools.indexOf(e,this),c=a.previous=this.previous,d=a.next=this.next;c&&(c.next=a);d&&(d.previous=a);e[b]=a;a.parent=this.parent;this.parent=null},insertAfter:function(a){var e=
a.parent.children,b=CKEDITOR.tools.indexOf(e,a),c=a.next;e.splice(b+1,0,this);this.next=a.next;this.previous=a;a.next=this;c&&(c.previous=this);this.parent=a.parent},insertBefore:function(a){var e=a.parent.children,b=CKEDITOR.tools.indexOf(e,a);e.splice(b,0,this);this.next=a;(this.previous=a.previous)&&(a.previous.next=this);a.previous=this;this.parent=a.parent},getAscendant:function(a){var e="function"==typeof a?a:"string"==typeof a?function(b){return b.name==a}:function(b){return b.name in a},b=
this.parent;for(;b&&b.type==CKEDITOR.NODE_ELEMENT;){if(e(b))return b;b=b.parent}return null},wrapWith:function(a){this.replaceWith(a);a.add(this);return a},getIndex:function(){return CKEDITOR.tools.indexOf(this.parent.children,this)},getFilterContext:function(a){return a||{}}}}(),"use strict",CKEDITOR.htmlParser.comment=function(a){this.value=a;this._={isBlockLike:!1}},CKEDITOR.htmlParser.comment.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_COMMENT,filter:function(a,
e){var b=this.value;if(!(b=a.onComment(e,b,this)))return this.remove(),!1;if("string"!=typeof b)return this.replaceWith(b),!1;this.value=b;return!0},writeHtml:function(a,e){e&&this.filter(e);a.comment(this.value)}}),"use strict",function(){CKEDITOR.htmlParser.text=function(a){this.value=a;this._={isBlockLike:!1}};CKEDITOR.htmlParser.text.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_TEXT,filter:function(a,e){if(!(this.value=a.onText(e,this.value,this)))return this.remove(),
!1},writeHtml:function(a,e){e&&this.filter(e);a.text(this.value)}})}(),"use strict",function(){CKEDITOR.htmlParser.cdata=function(a){this.value=a};CKEDITOR.htmlParser.cdata.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_TEXT,filter:function(){},writeHtml:function(a){a.write(this.value)}})}(),"use strict",CKEDITOR.htmlParser.fragment=function(){this.children=[];this.parent=null;this._={isBlockLike:!0,hasInlineStarted:!1}},function(){function a(a){return a.attributes["data-cke-survive"]?
!1:"a"==a.name&&a.attributes.href||CKEDITOR.dtd.$removeEmpty[a.name]}var e=CKEDITOR.tools.extend({table:1,ul:1,ol:1,dl:1},CKEDITOR.dtd.table,CKEDITOR.dtd.ul,CKEDITOR.dtd.ol,CKEDITOR.dtd.dl),b={ol:1,ul:1},c=CKEDITOR.tools.extend({},{html:1},CKEDITOR.dtd.html,CKEDITOR.dtd.body,CKEDITOR.dtd.head,{style:1,script:1}),d={ul:"li",ol:"li",dl:"dd",table:"tbody",tbody:"tr",thead:"tr",tfoot:"tr",tr:"td"};CKEDITOR.htmlParser.fragment.fromHtml=function(l,k,g){function h(a){var b;if(0<q.length)for(var c=0;c<q.length;c++){var f=
q[c],d=f.name,g=CKEDITOR.dtd[d],h=u.name&&CKEDITOR.dtd[u.name];h&&!h[d]||a&&g&&!g[a]&&CKEDITOR.dtd[a]?d==u.name&&(n(u,u.parent,1),c--):(b||(m(),b=1),f=f.clone(),f.parent=u,u=f,q.splice(c,1),c--)}}function m(){for(;t.length;)n(t.shift(),u)}function f(a){if(a._.isBlockLike&&"pre"!=a.name&&"textarea"!=a.name){var b=a.children.length,c=a.children[b-1],f;c&&c.type==CKEDITOR.NODE_TEXT&&((f=CKEDITOR.tools.rtrim(c.value))?c.value=f:a.children.length=b-1)}}function n(b,c,d){c=c||u||x;var h=u;void 0===b.previous&&
(p(c,b)&&(u=c,v.onTagOpen(g,{}),b.returnPoint=c=u),f(b),a(b)&&!b.children.length||c.add(b),"pre"==b.name&&(z=!1),"textarea"==b.name&&(A=!1));b.returnPoint?(u=b.returnPoint,delete b.returnPoint):u=d?c:h}function p(a,b){if((a==x||"body"==a.name)&&g&&(!a.name||CKEDITOR.dtd[a.name][g])){var c,f;return(c=b.attributes&&(f=b.attributes["data-cke-real-element-type"])?f:b.name)&&c in CKEDITOR.dtd.$inline&&!(c in CKEDITOR.dtd.head)&&!b.isOrphan||b.type==CKEDITOR.NODE_TEXT}}function r(a,b){return a in CKEDITOR.dtd.$listItem||
a in CKEDITOR.dtd.$tableContent?a==b||"dt"==a&&"dd"==b||"dd"==a&&"dt"==b:!1}var v=new CKEDITOR.htmlParser,x=k instanceof CKEDITOR.htmlParser.element?k:"string"==typeof k?new CKEDITOR.htmlParser.element(k):new CKEDITOR.htmlParser.fragment,q=[],t=[],u=x,A="textarea"==x.name,z="pre"==x.name;v.onTagOpen=function(f,d,g,l){d=new CKEDITOR.htmlParser.element(f,d);d.isUnknown&&g&&(d.isEmpty=!0);d.isOptionalClose=l;if(a(d))q.push(d);else{if("pre"==f)z=!0;else{if("br"==f&&z){u.add(new CKEDITOR.htmlParser.text("\n"));
return}"textarea"==f&&(A=!0)}if("br"==f)t.push(d);else{for(;!(l=(g=u.name)?CKEDITOR.dtd[g]||(u._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):c,d.isUnknown||u.isUnknown||l[f]);)if(u.isOptionalClose)v.onTagClose(g);else if(f in b&&g in b)g=u.children,(g=g[g.length-1])&&"li"==g.name||n(g=new CKEDITOR.htmlParser.element("li"),u),!d.returnPoint&&(d.returnPoint=u),u=g;else if(f in CKEDITOR.dtd.$listItem&&!r(f,g))v.onTagOpen("li"==f?"ul":"dl",{},0,1);else if(g in e&&!r(f,g))!d.returnPoint&&(d.returnPoint=
u),u=u.parent;else if(g in CKEDITOR.dtd.$inline&&q.unshift(u),u.parent)n(u,u.parent,1);else{d.isOrphan=1;break}h(f);m();d.parent=u;d.isEmpty?n(d):u=d}}};v.onTagClose=function(a){for(var b=q.length-1;0<=b;b--)if(a==q[b].name){q.splice(b,1);return}for(var c=[],f=[],d=u;d!=x&&d.name!=a;)d._.isBlockLike||f.unshift(d),c.push(d),d=d.returnPoint||d.parent;if(d!=x){for(b=0;b<c.length;b++){var h=c[b];n(h,h.parent)}u=d;d._.isBlockLike&&m();n(d,d.parent);d==u&&(u=u.parent);q=q.concat(f)}"body"==a&&(g=!1)};v.onText=
function(a){if(!(u._.hasInlineStarted&&!t.length||z||A)&&(a=CKEDITOR.tools.ltrim(a),0===a.length))return;var b=u.name,f=b?CKEDITOR.dtd[b]||(u._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):c;if(!A&&!f["#"]&&b in e)v.onTagOpen(d[b]||""),v.onText(a);else{m();h();z||A||(a=a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g," "));a=new CKEDITOR.htmlParser.text(a);if(p(u,a))this.onTagOpen(g,{},0,1);u.add(a)}};v.onCDATA=function(a){u.add(new CKEDITOR.htmlParser.cdata(a))};v.onComment=function(a){m();h();u.add(new CKEDITOR.htmlParser.comment(a))};
v.parse(l);for(m();u!=x;)n(u,u.parent,1);f(x);return x};CKEDITOR.htmlParser.fragment.prototype={type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,add:function(a,b){isNaN(b)&&(b=this.children.length);var c=0<b?this.children[b-1]:null;if(c){if(a._.isBlockLike&&c.type==CKEDITOR.NODE_TEXT&&(c.value=CKEDITOR.tools.rtrim(c.value),0===c.value.length)){this.children.pop();this.add(a);return}c.next=a}a.previous=c;a.parent=this;this.children.splice(b,0,a);this._.hasInlineStarted||(this._.hasInlineStarted=a.type==CKEDITOR.NODE_TEXT||
a.type==CKEDITOR.NODE_ELEMENT&&!a._.isBlockLike)},filter:function(a,b){b=this.getFilterContext(b);a.onRoot(b,this);this.filterChildren(a,!1,b)},filterChildren:function(a,b,c){if(this.childrenFilteredBy!=a.id){c=this.getFilterContext(c);if(b&&!this.parent)a.onRoot(c,this);this.childrenFilteredBy=a.id;for(b=0;b<this.children.length;b++)!1===this.children[b].filter(a,c)&&b--}},writeHtml:function(a,b){b&&this.filter(b);this.writeChildrenHtml(a)},writeChildrenHtml:function(a,b,c){var d=this.getFilterContext();
if(c&&!this.parent&&b)b.onRoot(d,this);b&&this.filterChildren(b,!1,d);b=0;c=this.children;for(d=c.length;b<d;b++)c[b].writeHtml(a)},forEach:function(a,b,c){if(!(c||b&&this.type!=b))var d=a(this);if(!1!==d){c=this.children;for(var e=0;e<c.length;e++)d=c[e],d.type==CKEDITOR.NODE_ELEMENT?d.forEach(a,b):b&&d.type!=b||a(d)}},getFilterContext:function(a){return a||{}}}}(),"use strict",function(){function a(){this.rules=[]}function e(b,c,d,e){var k,g;for(k in c)(g=b[k])||(g=b[k]=new a),g.add(c[k],d,e)}CKEDITOR.htmlParser.filter=
CKEDITOR.tools.createClass({$:function(b){this.id=CKEDITOR.tools.getNextNumber();this.elementNameRules=new a;this.attributeNameRules=new a;this.elementsRules={};this.attributesRules={};this.textRules=new a;this.commentRules=new a;this.rootRules=new a;b&&this.addRules(b,10)},proto:{addRules:function(a,c){var d;"number"==typeof c?d=c:c&&"priority"in c&&(d=c.priority);"number"!=typeof d&&(d=10);"object"!=typeof c&&(c={});a.elementNames&&this.elementNameRules.addMany(a.elementNames,d,c);a.attributeNames&&
this.attributeNameRules.addMany(a.attributeNames,d,c);a.elements&&e(this.elementsRules,a.elements,d,c);a.attributes&&e(this.attributesRules,a.attributes,d,c);a.text&&this.textRules.add(a.text,d,c);a.comment&&this.commentRules.add(a.comment,d,c);a.root&&this.rootRules.add(a.root,d,c)},applyTo:function(a){a.filter(this)},onElementName:function(a,c){return this.elementNameRules.execOnName(a,c)},onAttributeName:function(a,c){return this.attributeNameRules.execOnName(a,c)},onText:function(a,c,d){return this.textRules.exec(a,
c,d)},onComment:function(a,c,d){return this.commentRules.exec(a,c,d)},onRoot:function(a,c){return this.rootRules.exec(a,c)},onElement:function(a,c){for(var d=[this.elementsRules["^"],this.elementsRules[c.name],this.elementsRules.$],e,k=0;3>k;k++)if(e=d[k]){e=e.exec(a,c,this);if(!1===e)return null;if(e&&e!=c)return this.onNode(a,e);if(c.parent&&!c.name)break}return c},onNode:function(a,c){var d=c.type;return d==CKEDITOR.NODE_ELEMENT?this.onElement(a,c):d==CKEDITOR.NODE_TEXT?new CKEDITOR.htmlParser.text(this.onText(a,
c.value)):d==CKEDITOR.NODE_COMMENT?new CKEDITOR.htmlParser.comment(this.onComment(a,c.value)):null},onAttribute:function(a,c,d,e){return(d=this.attributesRules[d])?d.exec(a,e,c,this):e}}});CKEDITOR.htmlParser.filterRulesGroup=a;a.prototype={add:function(a,c,d){this.rules.splice(this.findIndex(c),0,{value:a,priority:c,options:d})},addMany:function(a,c,d){for(var e=[this.findIndex(c),0],k=0,g=a.length;k<g;k++)e.push({value:a[k],priority:c,options:d});this.rules.splice.apply(this.rules,e)},findIndex:function(a){for(var c=
this.rules,d=c.length-1;0<=d&&a<c[d].priority;)d--;return d+1},exec:function(a,c){var d=c instanceof CKEDITOR.htmlParser.node||c instanceof CKEDITOR.htmlParser.fragment,e=Array.prototype.slice.call(arguments,1),k=this.rules,g=k.length,h,m,f,n;for(n=0;n<g;n++)if(d&&(h=c.type,m=c.name),f=k[n],!(a.nonEditable&&!f.options.applyToAll||a.nestedEditable&&f.options.excludeNestedEditable)){f=f.value.apply(null,e);if(!1===f||d&&f&&(f.name!=m||f.type!=h))return f;null!=f&&(e[0]=c=f)}return c},execOnName:function(a,
c){for(var d=0,e=this.rules,k=e.length,g;c&&d<k;d++)g=e[d],a.nonEditable&&!g.options.applyToAll||a.nestedEditable&&g.options.excludeNestedEditable||(c=c.replace(g.value[0],g.value[1]));return c}}}(),function(){function a(a,f){function g(a){return a||CKEDITOR.env.needsNbspFiller?new CKEDITOR.htmlParser.text(" "):new CKEDITOR.htmlParser.element("br",{"data-cke-bogus":1})}function e(a,f){return function(d){if(d.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var e=[],m=b(d),k,D;if(m)for(h(m,1)&&e.push(m);m;)l(m)&&
(k=c(m))&&h(k)&&((D=c(k))&&!l(D)?e.push(k):(g(n).insertAfter(k),k.remove())),m=m.previous;for(m=0;m<e.length;m++)e[m].remove();if(e=!a||!1!==("function"==typeof f?f(d):f))n||CKEDITOR.env.needsBrFiller||d.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT?n||CKEDITOR.env.needsBrFiller||!(7<document.documentMode||d.name in CKEDITOR.dtd.tr||d.name in CKEDITOR.dtd.$listItem)?(e=b(d),e=!e||"form"==d.name&&"input"==e.name):e=!1:e=!1;e&&d.add(g(a))}}}function h(a,b){if((!n||CKEDITOR.env.needsBrFiller)&&a.type==CKEDITOR.NODE_ELEMENT&&
"br"==a.name&&!a.attributes["data-cke-eol"])return!0;var c;return a.type==CKEDITOR.NODE_TEXT&&(c=a.value.match(q))&&(c.index&&((new CKEDITOR.htmlParser.text(a.value.substring(0,c.index))).insertBefore(a),a.value=c[0]),!CKEDITOR.env.needsBrFiller&&n&&(!b||a.parent.name in D)||!n&&((c=a.previous)&&"br"==c.name||!c||l(c)))?!0:!1}var m={elements:{}},n="html"==f,D=CKEDITOR.tools.extend({},z),J;for(J in D)"#"in u[J]||delete D[J];for(J in D)m.elements[J]=e(n,a.config.fillEmptyBlocks);m.root=e(n,!1);m.elements.br=
function(a){return function(b){if(b.parent.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var f=b.attributes;if("data-cke-bogus"in f||"data-cke-eol"in f)delete f["data-cke-bogus"];else{for(f=b.next;f&&d(f);)f=f.next;var e=c(b);!f&&l(b.parent)?k(b.parent,g(a)):l(f)&&e&&!l(e)&&g(a).insertBefore(f)}}}}(n);return m}function e(a,b){return a!=CKEDITOR.ENTER_BR&&!1!==b?a==CKEDITOR.ENTER_DIV?"div":"p":!1}function b(a){for(a=a.children[a.children.length-1];a&&d(a);)a=a.previous;return a}function c(a){for(a=a.previous;a&&
d(a);)a=a.previous;return a}function d(a){return a.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(a.value)||a.type==CKEDITOR.NODE_ELEMENT&&a.attributes["data-cke-bookmark"]}function l(a){return a&&(a.type==CKEDITOR.NODE_ELEMENT&&a.name in z||a.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)}function k(a,b){var c=a.children[a.children.length-1];a.children.push(b);b.parent=a;c&&(c.next=b,b.previous=c)}function g(a){a=a.attributes;"false"!=a.contenteditable&&(a["data-cke-editable"]=a.contenteditable?"true":1);
a.contenteditable="false"}function h(a){a=a.attributes;switch(a["data-cke-editable"]){case "true":a.contenteditable="true";break;case "1":delete a.contenteditable}}function m(a){return a.replace(G,function(a,b,c){return"\x3c"+b+c.replace(E,function(a,b){return F.test(b)&&-1==c.indexOf("data-cke-saved-"+b)?" data-cke-saved-"+a+" data-cke-"+CKEDITOR.rnd+"-"+a:a})+"\x3e"})}function f(a,b){return a.replace(b,function(a,b,c){0===a.indexOf("\x3ctextarea")&&(a=b+r(c).replace(/</g,"\x26lt;").replace(/>/g,
"\x26gt;")+"\x3c/textarea\x3e");return"\x3ccke:encoded\x3e"+encodeURIComponent(a)+"\x3c/cke:encoded\x3e"})}function n(a){return a.replace(K,function(a,b){return decodeURIComponent(b)})}function p(a){return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,function(a){return"\x3c!--"+t+"{C}"+encodeURIComponent(a).replace(/--/g,"%2D%2D")+"--\x3e"})}function r(a){return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g,function(a,b){return decodeURIComponent(b)})}function v(a,b){var c=b._.dataStore;
return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g,function(a,b){return decodeURIComponent(b)}).replace(/\{cke_protected_(\d+)\}/g,function(a,b){return c&&c[b]||""})}function x(a,b){var c=[],f=b.config.protectedSource,d=b._.dataStore||(b._.dataStore={id:1}),g=/<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g,f=[/<script[\s\S]*?(<\/script>|$)/gi,/<noscript[\s\S]*?<\/noscript>/gi,/<meta[\s\S]*?\/?>/gi].concat(f);a=a.replace(/\x3c!--[\s\S]*?--\x3e/g,function(a){return"\x3c!--{cke_tempcomment}"+(c.push(a)-
1)+"--\x3e"});for(var e=0;e<f.length;e++)a=a.replace(f[e],function(a){a=a.replace(g,function(a,b,f){return c[f]});return/cke_temp(comment)?/.test(a)?a:"\x3c!--{cke_temp}"+(c.push(a)-1)+"--\x3e"});a=a.replace(g,function(a,b,f){return"\x3c!--"+t+(b?"{C}":"")+encodeURIComponent(c[f]).replace(/--/g,"%2D%2D")+"--\x3e"});a=a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g,function(a){return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g,function(a,b){d[d.id]=
decodeURIComponent(b);return"{cke_protected_"+d.id++ +"}"})});return a=a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g,function(a,c,f,d){return"\x3c"+c+f+"\x3e"+v(r(d),b)+"\x3c/"+c+"\x3e"})}CKEDITOR.htmlDataProcessor=function(b){var c,d,g=this;this.editor=b;this.dataFilter=c=new CKEDITOR.htmlParser.filter;this.htmlFilter=d=new CKEDITOR.htmlParser.filter;this.writer=new CKEDITOR.htmlParser.basicWriter;c.addRules(w);c.addRules(C,{applyToAll:!0});c.addRules(a(b,"data"),{applyToAll:!0});
d.addRules(y);d.addRules(B,{applyToAll:!0});d.addRules(a(b,"html"),{applyToAll:!0});b.on("toHtml",function(a){a=a.data;var c=a.dataValue,d,c=x(c,b),c=f(c,H),c=m(c),c=f(c,I),c=c.replace(J,"$1cke:$2"),c=c.replace(R,"\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),c=c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g,"$1$2$2"),c=c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi,"$1data-cke-"+CKEDITOR.rnd+"-$2");d=a.context||b.editable().getName();var g;CKEDITOR.env.ie&&9>CKEDITOR.env.version&&"pre"==d&&(d="div",c="\x3cpre\x3e"+c+"\x3c/pre\x3e",
g=1);d=b.document.createElement(d);d.setHtml("a"+c);c=d.getHtml().substr(1);c=c.replace(new RegExp("data-cke-"+CKEDITOR.rnd+"-","ig"),"");g&&(c=c.replace(/^<pre>|<\/pre>$/gi,""));c=c.replace(D,"$1$2");c=n(c);c=r(c);d=!1===a.fixForBody?!1:e(a.enterMode,b.config.autoParagraph);c=CKEDITOR.htmlParser.fragment.fromHtml(c,a.context,d);d&&(g=c,!g.children.length&&CKEDITOR.dtd[g.name][d]&&(d=new CKEDITOR.htmlParser.element(d),g.add(d)));a.dataValue=c},null,null,5);b.on("toHtml",function(a){a.data.filter.applyTo(a.data.dataValue,
!0,a.data.dontFilter,a.data.enterMode)&&b.fire("dataFiltered")},null,null,6);b.on("toHtml",function(a){a.data.dataValue.filterChildren(g.dataFilter,!0)},null,null,10);b.on("toHtml",function(a){a=a.data;var b=a.dataValue,c=new CKEDITOR.htmlParser.basicWriter;b.writeChildrenHtml(c);b=c.getHtml(!0);a.dataValue=p(b)},null,null,15);b.on("toDataFormat",function(a){var c=a.data.dataValue;a.data.enterMode!=CKEDITOR.ENTER_BR&&(c=c.replace(/^<br *\/?>/i,""));a.data.dataValue=CKEDITOR.htmlParser.fragment.fromHtml(c,
a.data.context,e(a.data.enterMode,b.config.autoParagraph))},null,null,5);b.on("toDataFormat",function(a){a.data.dataValue.filterChildren(g.htmlFilter,!0)},null,null,10);b.on("toDataFormat",function(a){a.data.filter.applyTo(a.data.dataValue,!1,!0)},null,null,11);b.on("toDataFormat",function(a){var c=a.data.dataValue,d=g.writer;d.reset();c.writeChildrenHtml(d);c=d.getHtml(!0);c=r(c);c=v(c,b);a.data.dataValue=c},null,null,15)};CKEDITOR.htmlDataProcessor.prototype={toHtml:function(a,b,c,d){var f=this.editor,
g,e,h,m;b&&"object"==typeof b?(g=b.context,c=b.fixForBody,d=b.dontFilter,e=b.filter,h=b.enterMode,m=b.protectedWhitespaces):g=b;g||null===g||(g=f.editable().getName());return f.fire("toHtml",{dataValue:a,context:g,fixForBody:c,dontFilter:d,filter:e||f.filter,enterMode:h||f.enterMode,protectedWhitespaces:m}).dataValue},toDataFormat:function(a,b){var c,d,f;b&&(c=b.context,d=b.filter,f=b.enterMode);c||null===c||(c=this.editor.editable().getName());return this.editor.fire("toDataFormat",{dataValue:a,
filter:d||this.editor.filter,context:c,enterMode:f||this.editor.enterMode}).dataValue}};var q=/(?:&nbsp;|\xa0)$/,t="{cke_protected}",u=CKEDITOR.dtd,A="caption colgroup col thead tfoot tbody".split(" "),z=CKEDITOR.tools.extend({},u.$blockLimit,u.$block),w={elements:{input:g,textarea:g}},C={attributeNames:[[/^on/,"data-cke-pa-on"],[/^srcdoc/,"data-cke-pa-srcdoc"],[/^data-cke-expando$/,""]],elements:{iframe:function(a){if(a.attributes&&a.attributes.src){var b=a.attributes.src.toLowerCase().replace(/[^a-z]/gi,
"");if(0===b.indexOf("javascript")||0===b.indexOf("data"))a.attributes["data-cke-pa-src"]=a.attributes.src,delete a.attributes.src}}}},y={elements:{embed:function(a){var b=a.parent;if(b&&"object"==b.name){var c=b.attributes.width,b=b.attributes.height;c&&(a.attributes.width=c);b&&(a.attributes.height=b)}},a:function(a){var b=a.attributes;if(!(a.children.length||b.name||b.id||a.attributes["data-cke-saved-name"]))return!1}}},B={elementNames:[[/^cke:/,""],[/^\?xml:namespace$/,""]],attributeNames:[[/^data-cke-(saved|pa)-/,
""],[/^data-cke-.*/,""],["hidefocus",""]],elements:{$:function(a){var b=a.attributes;if(b){if(b["data-cke-temp"])return!1;for(var c=["name","href","src"],d,f=0;f<c.length;f++)d="data-cke-saved-"+c[f],d in b&&delete b[c[f]]}return a},table:function(a){a.children.slice(0).sort(function(a,b){var c,d;a.type==CKEDITOR.NODE_ELEMENT&&b.type==a.type&&(c=CKEDITOR.tools.indexOf(A,a.name),d=CKEDITOR.tools.indexOf(A,b.name));-1<c&&-1<d&&c!=d||(c=a.parent?a.getIndex():-1,d=b.parent?b.getIndex():-1);return c>d?
1:-1})},param:function(a){a.children=[];a.isEmpty=!0;return a},span:function(a){"Apple-style-span"==a.attributes["class"]&&delete a.name},html:function(a){delete a.attributes.contenteditable;delete a.attributes["class"]},body:function(a){delete a.attributes.spellcheck;delete a.attributes.contenteditable},style:function(a){var b=a.children[0];b&&b.value&&(b.value=CKEDITOR.tools.trim(b.value));a.attributes.type||(a.attributes.type="text/css")},title:function(a){var b=a.children[0];!b&&k(a,b=new CKEDITOR.htmlParser.text);
b.value=a.attributes["data-cke-title"]||""},input:h,textarea:h},attributes:{"class":function(a){return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g,""))||!1}}};CKEDITOR.env.ie&&(B.attributes.style=function(a){return a.replace(/(^|;)([^\:]+)/g,function(a){return a.toLowerCase()})});var G=/<(a|area|img|input|source)\b([^>]*)>/gi,E=/([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,F=/^(href|src|name)$/i,I=/(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
H=/(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,K=/<cke:encoded>([^<]*)<\/cke:encoded>/gi,J=/(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,D=/(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,R=/<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi}(),"use strict",CKEDITOR.htmlParser.element=function(a,e){this.name=a;this.attributes=e||{};this.children=[];var b=a||"",c=b.match(/^cke:(.*)/);c&&(b=c[1]);b=!!(CKEDITOR.dtd.$nonBodyContent[b]||CKEDITOR.dtd.$block[b]||CKEDITOR.dtd.$listItem[b]||
CKEDITOR.dtd.$tableContent[b]||CKEDITOR.dtd.$nonEditable[b]||"br"==b);this.isEmpty=!!CKEDITOR.dtd.$empty[a];this.isUnknown=!CKEDITOR.dtd[a];this._={isBlockLike:b,hasInlineStarted:this.isEmpty||!b}},CKEDITOR.htmlParser.cssStyle=function(a){var e={};((a instanceof CKEDITOR.htmlParser.element?a.attributes.style:a)||"").replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(a,c,d){"font-family"==c&&(d=d.replace(/["']/g,""));e[c.toLowerCase()]=d});return{rules:e,populate:function(a){var c=
this.toString();c&&(a instanceof CKEDITOR.dom.element?a.setAttribute("style",c):a instanceof CKEDITOR.htmlParser.element?a.attributes.style=c:a.style=c)},toString:function(){var a=[],c;for(c in e)e[c]&&a.push(c,":",e[c],";");return a.join("")}}},function(){function a(a){return function(b){return b.type==CKEDITOR.NODE_ELEMENT&&("string"==typeof a?b.name==a:b.name in a)}}var e=function(a,b){a=a[0];b=b[0];return a<b?-1:a>b?1:0},b=CKEDITOR.htmlParser.fragment.prototype;CKEDITOR.htmlParser.element.prototype=
CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_ELEMENT,add:b.add,clone:function(){return new CKEDITOR.htmlParser.element(this.name,this.attributes)},filter:function(a,b){var e=this,k,g;b=e.getFilterContext(b);if(b.off)return!0;if(!e.parent)a.onRoot(b,e);for(;;){k=e.name;if(!(g=a.onElementName(b,k)))return this.remove(),!1;e.name=g;if(!(e=a.onElement(b,e)))return this.remove(),!1;if(e!==this)return this.replaceWith(e),!1;if(e.name==k)break;if(e.type!=CKEDITOR.NODE_ELEMENT)return this.replaceWith(e),
!1;if(!e.name)return this.replaceWithChildren(),!1}k=e.attributes;var h,m;for(h in k){for(g=k[h];;)if(m=a.onAttributeName(b,h))if(m!=h)delete k[h],h=m;else break;else{delete k[h];break}m&&(!1===(g=a.onAttribute(b,e,m,g))?delete k[m]:k[m]=g)}e.isEmpty||this.filterChildren(a,!1,b);return!0},filterChildren:b.filterChildren,writeHtml:function(a,b){b&&this.filter(b);var l=this.name,k=[],g=this.attributes,h,m;a.openTag(l,g);for(h in g)k.push([h,g[h]]);a.sortAttributes&&k.sort(e);h=0;for(m=k.length;h<m;h++)g=
k[h],a.attribute(g[0],g[1]);a.openTagClose(l,this.isEmpty);this.writeChildrenHtml(a);this.isEmpty||a.closeTag(l)},writeChildrenHtml:b.writeChildrenHtml,replaceWithChildren:function(){for(var a=this.children,b=a.length;b;)a[--b].insertAfter(this);this.remove()},forEach:b.forEach,getFirst:function(b){if(!b)return this.children.length?this.children[0]:null;"function"!=typeof b&&(b=a(b));for(var d=0,e=this.children.length;d<e;++d)if(b(this.children[d]))return this.children[d];return null},getHtml:function(){var a=
new CKEDITOR.htmlParser.basicWriter;this.writeChildrenHtml(a);return a.getHtml()},setHtml:function(a){a=this.children=CKEDITOR.htmlParser.fragment.fromHtml(a).children;for(var b=0,e=a.length;b<e;++b)a[b].parent=this},getOuterHtml:function(){var a=new CKEDITOR.htmlParser.basicWriter;this.writeHtml(a);return a.getHtml()},split:function(a){for(var b=this.children.splice(a,this.children.length-a),e=this.clone(),k=0;k<b.length;++k)b[k].parent=e;e.children=b;b[0]&&(b[0].previous=null);0<a&&(this.children[a-
1].next=null);this.parent.add(e,this.getIndex()+1);return e},find:function(a,b){void 0===b&&(b=!1);var e=[],k;for(k=0;k<this.children.length;k++){var g=this.children[k];"function"==typeof a&&a(g)?e.push(g):"string"==typeof a&&g.name===a&&e.push(g);b&&g.find&&(e=e.concat(g.find(a,b)))}return e},addClass:function(a){if(!this.hasClass(a)){var b=this.attributes["class"]||"";this.attributes["class"]=b+(b?" ":"")+a}},removeClass:function(a){var b=this.attributes["class"];b&&((b=CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)"+
a+"(?:\\s+|$)")," ")))?this.attributes["class"]=b:delete this.attributes["class"])},hasClass:function(a){var b=this.attributes["class"];return b?(new RegExp("(?:^|\\s)"+a+"(?\x3d\\s|$)")).test(b):!1},getFilterContext:function(a){var b=[];a||(a={off:!1,nonEditable:!1,nestedEditable:!1});a.off||"off"!=this.attributes["data-cke-processor"]||b.push("off",!0);a.nonEditable||"false"!=this.attributes.contenteditable?a.nonEditable&&!a.nestedEditable&&"true"==this.attributes.contenteditable&&b.push("nestedEditable",
!0):b.push("nonEditable",!0);if(b.length){a=CKEDITOR.tools.copy(a);for(var e=0;e<b.length;e+=2)a[b[e]]=b[e+1]}return a}},!0)}(),function(){var a=/{([^}]+)}/g;CKEDITOR.template=function(a){this.source=String(a)};CKEDITOR.template.prototype.output=function(e,b){var c=this.source.replace(a,function(a,b){return void 0!==e[b]?e[b]:a});return b?b.push(c):c}}(),delete CKEDITOR.loadFullCore,CKEDITOR.instances={},CKEDITOR.document=new CKEDITOR.dom.document(document),CKEDITOR.add=function(a){CKEDITOR.instances[a.name]=
a;a.on("focus",function(){CKEDITOR.currentInstance!=a&&(CKEDITOR.currentInstance=a,CKEDITOR.fire("currentInstance"))});a.on("blur",function(){CKEDITOR.currentInstance==a&&(CKEDITOR.currentInstance=null,CKEDITOR.fire("currentInstance"))});CKEDITOR.fire("instance",null,a)},CKEDITOR.remove=function(a){delete CKEDITOR.instances[a.name]},function(){var a={};CKEDITOR.addTemplate=function(e,b){var c=a[e];if(c)return c;c={name:e,source:b};CKEDITOR.fire("template",c);return a[e]=new CKEDITOR.template(c.source)};
CKEDITOR.getTemplate=function(e){return a[e]}}(),function(){var a=[];CKEDITOR.addCss=function(e){a.push(e)};CKEDITOR.getCss=function(){return a.join("\n")}}(),CKEDITOR.on("instanceDestroyed",function(){CKEDITOR.tools.isEmpty(this.instances)&&CKEDITOR.fire("reset")}),CKEDITOR.TRISTATE_ON=1,CKEDITOR.TRISTATE_OFF=2,CKEDITOR.TRISTATE_DISABLED=0,function(){CKEDITOR.inline=function(a,e){if(!CKEDITOR.env.isCompatible)return null;a=CKEDITOR.dom.element.get(a);if(a.getEditor())throw'The editor instance "'+
a.getEditor().name+'" is already attached to the provided element.';var b=new CKEDITOR.editor(e,a,CKEDITOR.ELEMENT_MODE_INLINE),c=a.is("textarea")?a:null;c?(b.setData(c.getValue(),null,!0),a=CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"'+!!b.readOnly+'" class\x3d"cke_textarea_inline"\x3e'+c.getValue()+"\x3c/div\x3e",CKEDITOR.document),a.insertAfter(c),c.hide(),c.$.form&&b._attachToForm()):b.setData(a.getHtml(),null,!0);b.on("loaded",function(){b.fire("uiReady");b.editable(a);b.container=
a;b.ui.contentsElement=a;b.setData(b.getData(1));b.resetDirty();b.fire("contentDom");b.mode="wysiwyg";b.fire("mode");b.status="ready";b.fireOnce("instanceReady");CKEDITOR.fire("instanceReady",null,b)},null,null,1E4);b.on("destroy",function(){c&&(b.container.clearCustomData(),b.container.remove(),c.show());b.element.clearCustomData();delete b.element});return b};CKEDITOR.inlineAll=function(){var a,e,b;for(b in CKEDITOR.dtd.$editable)for(var c=CKEDITOR.document.getElementsByTag(b),d=0,l=c.count();d<
l;d++)a=c.getItem(d),"true"==a.getAttribute("contenteditable")&&(e={element:a,config:{}},!1!==CKEDITOR.fire("inline",e)&&CKEDITOR.inline(a,e.config))};CKEDITOR.domReady(function(){!CKEDITOR.disableAutoInline&&CKEDITOR.inlineAll()})}(),CKEDITOR.replaceClass="ckeditor",function(){function a(a,d,l,k){if(!CKEDITOR.env.isCompatible)return null;a=CKEDITOR.dom.element.get(a);if(a.getEditor())throw'The editor instance "'+a.getEditor().name+'" is already attached to the provided element.';var g=new CKEDITOR.editor(d,
a,k);k==CKEDITOR.ELEMENT_MODE_REPLACE&&(a.setStyle("visibility","hidden"),g._.required=a.hasAttribute("required"),a.removeAttribute("required"));l&&g.setData(l,null,!0);g.on("loaded",function(){b(g);k==CKEDITOR.ELEMENT_MODE_REPLACE&&g.config.autoUpdateElement&&a.$.form&&g._attachToForm();g.setMode(g.config.startupMode,function(){g.resetDirty();g.status="ready";g.fireOnce("instanceReady");CKEDITOR.fire("instanceReady",null,g)})});g.on("destroy",e);return g}function e(){var a=this.container,b=this.element;
a&&(a.clearCustomData(),a.remove());b&&(b.clearCustomData(),this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE&&(b.show(),this._.required&&b.setAttribute("required","required")),delete this.element)}function b(a){var b=a.name,e=a.element,k=a.elementMode,g=a.fire("uiSpace",{space:"top",html:""}).html,h=a.fire("uiSpace",{space:"bottom",html:""}).html,m=new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} '+CKEDITOR.env.cssClass+
'"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"'+(a.title?' aria-labelledby\x3d"cke_{name}_arialbl"':"")+"\x3e"+(a.title?'\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e':"")+'\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),b=CKEDITOR.dom.element.createFromHtml(m.output({id:a.id,
name:b,langDir:a.lang.dir,langCode:a.langCode,voiceLabel:a.title,topHtml:g?'\x3cspan id\x3d"'+a.ui.spaceId("top")+'" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e'+g+"\x3c/span\x3e":"",contentId:a.ui.spaceId("contents"),bottomHtml:h?'\x3cspan id\x3d"'+a.ui.spaceId("bottom")+'" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e'+h+"\x3c/span\x3e":"",outerEl:CKEDITOR.env.ie?"span":"div"}));k==CKEDITOR.ELEMENT_MODE_REPLACE?(e.hide(),b.insertAfter(e)):
e.append(b);a.container=b;a.ui.contentsElement=a.ui.space("contents");g&&a.ui.space("top").unselectable();h&&a.ui.space("bottom").unselectable();e=a.config.width;k=a.config.height;e&&b.setStyle("width",CKEDITOR.tools.cssLength(e));k&&a.ui.space("contents").setStyle("height",CKEDITOR.tools.cssLength(k));b.disableContextMenu();CKEDITOR.env.webkit&&b.on("focus",function(){a.focus()});a.fireOnce("uiReady")}CKEDITOR.replace=function(b,d){return a(b,d,null,CKEDITOR.ELEMENT_MODE_REPLACE)};CKEDITOR.appendTo=
function(b,d,e){return a(b,d,e,CKEDITOR.ELEMENT_MODE_APPENDTO)};CKEDITOR.replaceAll=function(){for(var a=document.getElementsByTagName("textarea"),b=0;b<a.length;b++){var e=null,k=a[b];if(k.name||k.id){if("string"==typeof arguments[0]){if(!(new RegExp("(?:^|\\s)"+arguments[0]+"(?:$|\\s)")).test(k.className))continue}else if("function"==typeof arguments[0]&&(e={},!1===arguments[0](k,e)))continue;this.replace(k,e)}}};CKEDITOR.editor.prototype.addMode=function(a,b){(this._.modes||(this._.modes={}))[a]=
b};CKEDITOR.editor.prototype.setMode=function(a,b){var e=this,k=this._.modes;if(a!=e.mode&&k&&k[a]){e.fire("beforeSetMode",a);if(e.mode){var g=e.checkDirty(),k=e._.previousModeData,h,m=0;e.fire("beforeModeUnload");e.editable(0);e._.previousMode=e.mode;e._.previousModeData=h=e.getData(1);"source"==e.mode&&k==h&&(e.fire("lockSnapshot",{forceUpdate:!0}),m=1);e.ui.space("contents").setHtml("");e.mode=""}else e._.previousModeData=e.getData(1);this._.modes[a](function(){e.mode=a;void 0!==g&&!g&&e.resetDirty();
m?e.fire("unlockSnapshot"):"wysiwyg"==a&&e.fire("saveSnapshot");setTimeout(function(){e.fire("mode");b&&b.call(e)},0)})}};CKEDITOR.editor.prototype.resize=function(a,b,e,k){var g=this.container,h=this.ui.space("contents"),m=CKEDITOR.env.webkit&&this.document&&this.document.getWindow().$.frameElement;k=k?this.container.getFirst(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass("cke_inner")}):g;k.setSize("width",a,!0);m&&(m.style.width="1%");var f=(k.$.offsetHeight||0)-(h.$.clientHeight||
0),g=Math.max(b-(e?0:f),0);b=e?b+f:b;h.setStyle("height",g+"px");m&&(m.style.width="100%");this.fire("resize",{outerHeight:b,contentsHeight:g,outerWidth:a||k.getSize("width")})};CKEDITOR.editor.prototype.getResizable=function(a){return a?this.ui.space("contents"):this.container};CKEDITOR.domReady(function(){CKEDITOR.replaceClass&&CKEDITOR.replaceAll(CKEDITOR.replaceClass)})}(),CKEDITOR.config.startupMode="wysiwyg",function(){function a(a){var b=a.editor,f=a.data.path,d=f.blockLimit,g=a.data.selection,
h=g.getRanges()[0],m;if(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller)if(g=e(g,f))g.appendBogus(),m=CKEDITOR.env.ie;k(b,f.block,d)&&h.collapsed&&!h.getCommonAncestor().isReadOnly()&&(f=h.clone(),f.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS),d=new CKEDITOR.dom.walker(f),d.guard=function(a){return!c(a)||a.type==CKEDITOR.NODE_COMMENT||a.isReadOnly()},!d.checkForward()||f.checkStartOfBlock()&&f.checkEndOfBlock())&&(b=h.fixBlock(!0,b.activeEnterMode==CKEDITOR.ENTER_DIV?"div":"p"),CKEDITOR.env.needsBrFiller||
(b=b.getFirst(c))&&b.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/)&&b.remove(),m=1,a.cancel());m&&h.select()}function e(a,b){if(a.isFake)return 0;var f=b.block||b.blockLimit,d=f&&f.getLast(c);if(!(!f||!f.isBlockBoundary()||d&&d.type==CKEDITOR.NODE_ELEMENT&&d.isBlockBoundary()||f.is("pre")||f.getBogus()))return f}function b(a){var b=a.data.getTarget();b.is("input")&&(b=b.getAttribute("type"),"submit"!=b&&"reset"!=b||a.data.preventDefault())}function c(a){return f(a)&&
n(a)}function d(a,b){return function(c){var f=c.data.$.toElement||c.data.$.fromElement||c.data.$.relatedTarget;(f=f&&f.nodeType==CKEDITOR.NODE_ELEMENT?new CKEDITOR.dom.element(f):null)&&(b.equals(f)||b.contains(f))||a.call(this,c)}}function l(a){function b(a){return function(b,d){d&&b.type==CKEDITOR.NODE_ELEMENT&&b.is(g)&&(f=b);if(!(d||!c(b)||a&&r(b)))return!1}}var f,d=a.getRanges()[0];a=a.root;var g={table:1,ul:1,ol:1,dl:1};if(d.startPath().contains(g)){var e=d.clone();e.collapse(1);e.setStartAt(a,
CKEDITOR.POSITION_AFTER_START);a=new CKEDITOR.dom.walker(e);a.guard=b();a.checkBackward();if(f)return e=d.clone(),e.collapse(),e.setEndAt(f,CKEDITOR.POSITION_AFTER_END),a=new CKEDITOR.dom.walker(e),a.guard=b(!0),f=!1,a.checkForward(),f}return null}function k(a,b,c){return!1!==a.config.autoParagraph&&a.activeEnterMode!=CKEDITOR.ENTER_BR&&(a.editable().equals(c)&&!b||b&&"true"==b.getAttribute("contenteditable"))}function g(a){return a.activeEnterMode!=CKEDITOR.ENTER_BR&&!1!==a.config.autoParagraph?
a.activeEnterMode==CKEDITOR.ENTER_DIV?"div":"p":!1}function h(a){var b=a.editor;b.getSelection().scrollIntoView();setTimeout(function(){b.fire("saveSnapshot")},0)}function m(a,b,c){var f=a.getCommonAncestor(b);for(b=a=c?b:a;(a=a.getParent())&&!f.equals(a)&&1==a.getChildCount();)b=a;b.remove()}var f,n,p,r,v,x,q,t,u,A;CKEDITOR.editable=CKEDITOR.tools.createClass({base:CKEDITOR.dom.element,$:function(a,b){this.base(b.$||b);this.editor=a;this.status="unloaded";this.hasFocus=!1;this.setup()},proto:{focus:function(){var a;
if(CKEDITOR.env.webkit&&!this.hasFocus&&(a=this.editor._.previousActive||this.getDocument().getActive(),this.contains(a))){a.focus();return}CKEDITOR.env.edge&&14<CKEDITOR.env.version&&!this.hasFocus&&this.getDocument().equals(CKEDITOR.document)&&(this.editor._.previousScrollTop=this.$.scrollTop);try{if(!CKEDITOR.env.ie||CKEDITOR.env.edge&&14<CKEDITOR.env.version||!this.getDocument().equals(CKEDITOR.document))if(CKEDITOR.env.chrome){var b=this.$.scrollTop;this.$.focus();this.$.scrollTop=b}else this.$.focus();
else this.$.setActive()}catch(c){if(!CKEDITOR.env.ie)throw c;}CKEDITOR.env.safari&&!this.isInline()&&(a=CKEDITOR.document.getActive(),a.equals(this.getWindow().getFrame())||this.getWindow().focus())},on:function(a,b){var c=Array.prototype.slice.call(arguments,0);CKEDITOR.env.ie&&/^focus|blur$/.exec(a)&&(a="focus"==a?"focusin":"focusout",b=d(b,this),c[0]=a,c[1]=b);return CKEDITOR.dom.element.prototype.on.apply(this,c)},attachListener:function(a){!this._.listeners&&(this._.listeners=[]);var b=Array.prototype.slice.call(arguments,
1),b=a.on.apply(a,b);this._.listeners.push(b);return b},clearListeners:function(){var a=this._.listeners;try{for(;a.length;)a.pop().removeListener()}catch(b){}},restoreAttrs:function(){var a=this._.attrChanges,b,c;for(c in a)a.hasOwnProperty(c)&&(b=a[c],null!==b?this.setAttribute(c,b):this.removeAttribute(c))},attachClass:function(a){var b=this.getCustomData("classes");this.hasClass(a)||(!b&&(b=[]),b.push(a),this.setCustomData("classes",b),this.addClass(a))},changeAttr:function(a,b){var c=this.getAttribute(a);
b!==c&&(!this._.attrChanges&&(this._.attrChanges={}),a in this._.attrChanges||(this._.attrChanges[a]=c),this.setAttribute(a,b))},insertText:function(a){this.editor.focus();this.insertHtml(this.transformPlainTextToHtml(a),"text")},transformPlainTextToHtml:function(a){var b=this.editor.getSelection().getStartElement().hasAscendant("pre",!0)?CKEDITOR.ENTER_BR:this.editor.activeEnterMode;return CKEDITOR.tools.transformPlainTextToHtml(a,b)},insertHtml:function(a,b,c){var f=this.editor;f.focus();f.fire("saveSnapshot");
c||(c=f.getSelection().getRanges()[0]);x(this,b||"html",a,c);c.select();h(this);this.editor.fire("afterInsertHtml",{})},insertHtmlIntoRange:function(a,b,c){x(this,c||"html",a,b);this.editor.fire("afterInsertHtml",{intoRange:b})},insertElement:function(a,b){var f=this.editor;f.focus();f.fire("saveSnapshot");var d=f.activeEnterMode,f=f.getSelection(),g=a.getName(),g=CKEDITOR.dtd.$block[g];b||(b=f.getRanges()[0]);this.insertElementIntoRange(a,b)&&(b.moveToPosition(a,CKEDITOR.POSITION_AFTER_END),g&&((g=
a.getNext(function(a){return c(a)&&!r(a)}))&&g.type==CKEDITOR.NODE_ELEMENT&&g.is(CKEDITOR.dtd.$block)?g.getDtd()["#"]?b.moveToElementEditStart(g):b.moveToElementEditEnd(a):g||d==CKEDITOR.ENTER_BR||(g=b.fixBlock(!0,d==CKEDITOR.ENTER_DIV?"div":"p"),b.moveToElementEditStart(g))));f.selectRanges([b]);h(this)},insertElementIntoSelection:function(a){this.insertElement(a)},insertElementIntoRange:function(a,b){var c=this.editor,f=c.config.enterMode,d=a.getName(),g=CKEDITOR.dtd.$block[d];if(b.checkReadOnly())return!1;
b.deleteContents(1);b.startContainer.type==CKEDITOR.NODE_ELEMENT&&(b.startContainer.is({tr:1,table:1,tbody:1,thead:1,tfoot:1})?q(b):b.startContainer.is(CKEDITOR.dtd.$list)&&t(b));var e,h;if(g)for(;(e=b.getCommonAncestor(0,1))&&(h=CKEDITOR.dtd[e.getName()])&&(!h||!h[d]);)e.getName()in CKEDITOR.dtd.span?b.splitElement(e):b.checkStartOfBlock()&&b.checkEndOfBlock()?(b.setStartBefore(e),b.collapse(!0),e.remove()):b.splitBlock(f==CKEDITOR.ENTER_DIV?"div":"p",c.editable());b.insertNode(a);return!0},setData:function(a,
b){b||(a=this.editor.dataProcessor.toHtml(a));this.setHtml(a);this.fixInitialSelection();"unloaded"==this.status&&(this.status="ready");this.editor.fire("dataReady")},getData:function(a){var b=this.getHtml();a||(b=this.editor.dataProcessor.toDataFormat(b));return b},setReadOnly:function(a){this.setAttribute("contenteditable",!a)},detach:function(){this.removeClass("cke_editable");this.status="detached";var a=this.editor;this._.detach();delete a.document;delete a.window},isInline:function(){return this.getDocument().equals(CKEDITOR.document)},
fixInitialSelection:function(){function a(){var b=c.getDocument().$,f=b.getSelection(),d;a:if(f.anchorNode&&f.anchorNode==c.$)d=!0;else{if(CKEDITOR.env.webkit&&(d=c.getDocument().getActive())&&d.equals(c)&&!f.anchorNode){d=!0;break a}d=void 0}d&&(d=new CKEDITOR.dom.range(c),d.moveToElementEditStart(c),b=b.createRange(),b.setStart(d.startContainer.$,d.startOffset),b.collapse(!0),f.removeAllRanges(),f.addRange(b))}function b(){var a=c.getDocument().$,f=a.selection,d=c.getDocument().getActive();"None"==
f.type&&d.equals(c)&&(f=new CKEDITOR.dom.range(c),a=a.body.createTextRange(),f.moveToElementEditStart(c),f=f.startContainer,f.type!=CKEDITOR.NODE_ELEMENT&&(f=f.getParent()),a.moveToElementText(f.$),a.collapse(!0),a.select())}var c=this;if(CKEDITOR.env.ie&&(9>CKEDITOR.env.version||CKEDITOR.env.quirks))this.hasFocus&&(this.focus(),b());else if(this.hasFocus)this.focus(),a();else this.once("focus",function(){a()},null,null,-999)},getHtmlFromRange:function(a){if(a.collapsed)return new CKEDITOR.dom.documentFragment(a.document);
a={doc:this.getDocument(),range:a.clone()};u.eol.detect(a,this);u.bogus.exclude(a);u.cell.shrink(a);a.fragment=a.range.cloneContents();u.tree.rebuild(a,this);u.eol.fix(a,this);return new CKEDITOR.dom.documentFragment(a.fragment.$)},extractHtmlFromRange:function(a,b){var c=A,f={range:a,doc:a.document},d=this.getHtmlFromRange(a);if(a.collapsed)return a.optimize(),d;a.enlarge(CKEDITOR.ENLARGE_INLINE,1);c.table.detectPurge(f);f.bookmark=a.createBookmark();delete f.range;var g=this.editor.createRange();
g.moveToPosition(f.bookmark.startNode,CKEDITOR.POSITION_BEFORE_START);f.targetBookmark=g.createBookmark();c.list.detectMerge(f,this);c.table.detectRanges(f,this);c.block.detectMerge(f,this);f.tableContentsRanges?(c.table.deleteRanges(f),a.moveToBookmark(f.bookmark),f.range=a):(a.moveToBookmark(f.bookmark),f.range=a,a.extractContents(c.detectExtractMerge(f)));a.moveToBookmark(f.targetBookmark);a.optimize();c.fixUneditableRangePosition(a);c.list.merge(f,this);c.table.purge(f,this);c.block.merge(f,this);
if(b){c=a.startPath();if(f=a.checkStartOfBlock()&&a.checkEndOfBlock()&&c.block&&!a.root.equals(c.block)){a:{var f=c.block.getElementsByTag("span"),g=0,e;if(f)for(;e=f.getItem(g++);)if(!n(e)){f=!0;break a}f=!1}f=!f}f&&(a.moveToPosition(c.block,CKEDITOR.POSITION_BEFORE_START),c.block.remove())}else c.autoParagraph(this.editor,a),p(a.startContainer)&&a.startContainer.appendBogus();a.startContainer.mergeSiblings();return d},setup:function(){var a=this.editor;this.attachListener(a,"beforeGetData",function(){var b=
this.getData();this.is("textarea")||!1!==a.config.ignoreEmptyParagraph&&(b=b.replace(v,function(a,b){return b}));a.setData(b,null,1)},this);this.attachListener(a,"getSnapshot",function(a){a.data=this.getData(1)},this);this.attachListener(a,"afterSetData",function(){this.setData(a.getData(1))},this);this.attachListener(a,"loadSnapshot",function(a){this.setData(a.data,1)},this);this.attachListener(a,"beforeFocus",function(){var b=a.getSelection();(b=b&&b.getNative())&&"Control"==b.type||this.focus()},
this);this.attachListener(a,"insertHtml",function(a){this.insertHtml(a.data.dataValue,a.data.mode,a.data.range)},this);this.attachListener(a,"insertElement",function(a){this.insertElement(a.data)},this);this.attachListener(a,"insertText",function(a){this.insertText(a.data)},this);this.setReadOnly(a.readOnly);this.attachClass("cke_editable");a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?this.attachClass("cke_editable_inline"):a.elementMode!=CKEDITOR.ELEMENT_MODE_REPLACE&&a.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO||
this.attachClass("cke_editable_themed");this.attachClass("cke_contents_"+a.config.contentsLangDirection);a.keystrokeHandler.blockedKeystrokes[8]=+a.readOnly;a.keystrokeHandler.attach(this);this.on("blur",function(){this.hasFocus=!1},null,null,-1);this.on("focus",function(){this.hasFocus=!0},null,null,-1);if(CKEDITOR.env.webkit)this.on("scroll",function(){a._.previousScrollTop=a.editable().$.scrollTop},null,null,-1);if(CKEDITOR.env.edge&&14<CKEDITOR.env.version){var d=function(){var b=a.editable();
null!=a._.previousScrollTop&&b.getDocument().equals(CKEDITOR.document)&&(b.$.scrollTop=a._.previousScrollTop,a._.previousScrollTop=null,this.removeListener("scroll",d))};this.on("scroll",d)}a.focusManager.add(this);this.equals(CKEDITOR.document.getActive())&&(this.hasFocus=!0,a.once("contentDom",function(){a.focusManager.focus(this)},this));this.isInline()&&this.changeAttr("tabindex",a.tabIndex);if(!this.is("textarea")){a.document=this.getDocument();a.window=this.getWindow();var g=a.document;this.changeAttr("spellcheck",
!a.config.disableNativeSpellChecker);var e=a.config.contentsLangDirection;this.getDirection(1)!=e&&this.changeAttr("dir",e);var h=CKEDITOR.getCss();if(h){var e=g.getHead(),k=e.getCustomData("stylesheet");k?h!=k.getText()&&(CKEDITOR.env.ie&&9>CKEDITOR.env.version?k.$.styleSheet.cssText=h:k.setText(h)):(h=g.appendStyleText(h),h=new CKEDITOR.dom.element(h.ownerNode||h.owningElement),e.setCustomData("stylesheet",h),h.data("cke-temp",1))}e=g.getCustomData("stylesheet_ref")||0;g.setCustomData("stylesheet_ref",
e+1);this.setCustomData("cke_includeReadonly",!a.config.disableReadonlyStyling);this.attachListener(this,"click",function(a){a=a.data;var b=(new CKEDITOR.dom.elementPath(a.getTarget(),this)).contains("a");b&&2!=a.$.button&&b.isReadOnly()&&a.preventDefault()});var n={8:1,46:1};this.attachListener(a,"key",function(b){if(a.readOnly)return!0;var c=b.data.domEvent.getKey(),d;b=a.getSelection();if(0!==b.getRanges().length){if(c in n){var g,e=b.getRanges()[0],h=e.startPath(),m,k,p,c=8==c;CKEDITOR.env.ie&&
11>CKEDITOR.env.version&&(g=b.getSelectedElement())||(g=l(b))?(a.fire("saveSnapshot"),e.moveToPosition(g,CKEDITOR.POSITION_BEFORE_START),g.remove(),e.select(),a.fire("saveSnapshot"),d=1):e.collapsed&&((m=h.block)&&(p=m[c?"getPrevious":"getNext"](f))&&p.type==CKEDITOR.NODE_ELEMENT&&p.is("table")&&e[c?"checkStartOfBlock":"checkEndOfBlock"]()?(a.fire("saveSnapshot"),e[c?"checkEndOfBlock":"checkStartOfBlock"]()&&m.remove(),e["moveToElementEdit"+(c?"End":"Start")](p),e.select(),a.fire("saveSnapshot"),
d=1):h.blockLimit&&h.blockLimit.is("td")&&(k=h.blockLimit.getAscendant("table"))&&e.checkBoundaryOfElement(k,c?CKEDITOR.START:CKEDITOR.END)&&(p=k[c?"getPrevious":"getNext"](f))?(a.fire("saveSnapshot"),e["moveToElementEdit"+(c?"End":"Start")](p),e.checkStartOfBlock()&&e.checkEndOfBlock()?p.remove():e.select(),a.fire("saveSnapshot"),d=1):(k=h.contains(["td","th","caption"]))&&e.checkBoundaryOfElement(k,c?CKEDITOR.START:CKEDITOR.END)&&(d=1))}return!d}});a.blockless&&CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller&&
this.attachListener(this,"keyup",function(b){b.data.getKeystroke()in n&&!this.getFirst(c)&&(this.appendBogus(),b=a.createRange(),b.moveToPosition(this,CKEDITOR.POSITION_AFTER_START),b.select())});this.attachListener(this,"dblclick",function(b){if(a.readOnly)return!1;b={element:b.data.getTarget()};a.fire("doubleclick",b)});CKEDITOR.env.ie&&this.attachListener(this,"click",b);CKEDITOR.env.ie&&!CKEDITOR.env.edge||this.attachListener(this,"mousedown",function(b){var c=b.data.getTarget();c.is("img","hr",
"input","textarea","select")&&!c.isReadOnly()&&(a.getSelection().selectElement(c),c.is("input","textarea","select")&&b.data.preventDefault())});CKEDITOR.env.edge&&this.attachListener(this,"mouseup",function(b){(b=b.data.getTarget())&&b.is("img")&&a.getSelection().selectElement(b)});CKEDITOR.env.gecko&&this.attachListener(this,"mouseup",function(b){if(2==b.data.$.button&&(b=b.data.getTarget(),!b.getOuterHtml().replace(v,""))){var c=a.createRange();c.moveToElementEditStart(b);c.select(!0)}});CKEDITOR.env.webkit&&
(this.attachListener(this,"click",function(a){a.data.getTarget().is("input","select")&&a.data.preventDefault()}),this.attachListener(this,"mouseup",function(a){a.data.getTarget().is("input","textarea")&&a.data.preventDefault()}));CKEDITOR.env.webkit&&this.attachListener(a,"key",function(b){if(a.readOnly)return!0;var c=b.data.domEvent.getKey();if(c in n&&(b=a.getSelection(),0!==b.getRanges().length)){var c=8==c,f=b.getRanges()[0];b=f.startPath();if(f.collapsed)a:{var d=b.block;if(d&&f[c?"checkStartOfBlock":
"checkEndOfBlock"]()&&f.moveToClosestEditablePosition(d,!c)&&f.collapsed){if(f.startContainer.type==CKEDITOR.NODE_ELEMENT){var g=f.startContainer.getChild(f.startOffset-(c?1:0));if(g&&g.type==CKEDITOR.NODE_ELEMENT&&g.is("hr")){a.fire("saveSnapshot");g.remove();b=!0;break a}}f=f.startPath().block;if(!f||f&&f.contains(d))b=void 0;else{a.fire("saveSnapshot");var e;(e=(c?f:d).getBogus())&&e.remove();e=a.getSelection();g=e.createBookmarks();(c?d:f).moveChildren(c?f:d,!1);b.lastElement.mergeSiblings();
m(d,f,!c);e.selectBookmarks(g);b=!0}}else b=!1}else c=f,e=b.block,f=c.endPath().block,e&&f&&!e.equals(f)?(a.fire("saveSnapshot"),(d=e.getBogus())&&d.remove(),c.enlarge(CKEDITOR.ENLARGE_INLINE),c.deleteContents(),f.getParent()&&(f.moveChildren(e,!1),b.lastElement.mergeSiblings(),m(e,f,!0)),c=a.getSelection().getRanges()[0],c.collapse(1),c.optimize(),""===c.startContainer.getHtml()&&c.startContainer.appendBogus(),c.select(),b=!0):b=!1;if(!b)return;a.getSelection().scrollIntoView();a.fire("saveSnapshot");
return!1}},this,null,100)}}},_:{detach:function(){this.editor.setData(this.editor.getData(),0,1);this.clearListeners();this.restoreAttrs();var a;if(a=this.removeCustomData("classes"))for(;a.length;)this.removeClass(a.pop());if(!this.is("textarea")){a=this.getDocument();var b=a.getHead();if(b.getCustomData("stylesheet")){var c=a.getCustomData("stylesheet_ref");--c?a.setCustomData("stylesheet_ref",c):(a.removeCustomData("stylesheet_ref"),b.removeCustomData("stylesheet").remove())}}this.editor.fire("contentDomUnload");
delete this.editor}}});CKEDITOR.editor.prototype.editable=function(a){var b=this._.editable;if(b&&a)return 0;arguments.length&&(b=this._.editable=a?a instanceof CKEDITOR.editable?a:new CKEDITOR.editable(this,a):(b&&b.detach(),null));return b};CKEDITOR.on("instanceLoaded",function(b){var c=b.editor;c.on("insertElement",function(a){a=a.data;a.type==CKEDITOR.NODE_ELEMENT&&(a.is("input")||a.is("textarea"))&&("false"!=a.getAttribute("contentEditable")&&a.data("cke-editable",a.hasAttribute("contenteditable")?
"true":"1"),a.setAttribute("contentEditable",!1))});c.on("selectionChange",function(b){if(!c.readOnly){var f=c.getSelection();f&&!f.isLocked&&(f=c.checkDirty(),c.fire("lockSnapshot"),a(b),c.fire("unlockSnapshot"),!f&&c.resetDirty())}})});CKEDITOR.on("instanceCreated",function(a){var b=a.editor;b.on("mode",function(){var a=b.editable();if(a&&a.isInline()){var c=b.title;a.changeAttr("role","textbox");a.changeAttr("aria-label",c);c&&a.changeAttr("title",c);var f=b.fire("ariaEditorHelpLabel",{}).label;
if(f&&(c=this.ui.space(this.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?"top":"contents"))){var d=CKEDITOR.tools.getNextId(),f=CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"'+d+'" class\x3d"cke_voice_label"\x3e'+f+"\x3c/span\x3e");c.append(f);a.changeAttr("aria-describedby",d)}}})});CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");f=CKEDITOR.dom.walker.whitespaces(!0);n=CKEDITOR.dom.walker.bookmark(!1,!0);p=CKEDITOR.dom.walker.empty();
r=CKEDITOR.dom.walker.bogus();v=/(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi;x=function(){function a(b){return b.type==CKEDITOR.NODE_ELEMENT}function b(c,f){var d,g,e,h,m=[],k=f.range.startContainer;d=f.range.startPath();for(var k=l[k.getName()],n=0,p=c.getChildren(),q=p.count(),t=-1,u=-1,E=0,v=d.contains(l.$list);n<q;++n)d=p.getItem(n),a(d)?(e=d.getName(),v&&e in CKEDITOR.dtd.$list?m=m.concat(b(d,f)):(h=!!k[e],
"br"!=e||!d.data("cke-eol")||n&&n!=q-1||(E=(g=n?m[n-1].node:p.getItem(n+1))&&(!a(g)||!g.is("br")),g=g&&a(g)&&l.$block[g.getName()]),-1!=t||h||(t=n),h||(u=n),m.push({isElement:1,isLineBreak:E,isBlock:d.isBlockBoundary(),hasBlockSibling:g,node:d,name:e,allowed:h}),g=E=0)):m.push({isElement:0,node:d,allowed:1});-1<t&&(m[t].firstNotAllowed=1);-1<u&&(m[u].lastNotAllowed=1);return m}function f(b,c){var d=[],g=b.getChildren(),e=g.count(),h,m=0,k=l[c],n=!b.is(l.$inline)||b.is("br");for(n&&d.push(" ");m<e;m++)h=
g.getItem(m),a(h)&&!h.is(k)?d=d.concat(f(h,c)):d.push(h);n&&d.push(" ");return d}function d(b){return a(b.startContainer)&&b.startContainer.getChild(b.startOffset-1)}function e(b){return b&&a(b)&&(b.is(l.$removeEmpty)||b.is("a")&&!b.isBlockBoundary())}function h(b,c,f,d){var g=b.clone(),e,m;g.setEndAt(c,CKEDITOR.POSITION_BEFORE_END);(e=(new CKEDITOR.dom.walker(g)).next())&&a(e)&&n[e.getName()]&&(m=e.getPrevious())&&a(m)&&!m.getParent().equals(b.startContainer)&&f.contains(m)&&d.contains(e)&&e.isIdentical(m)&&
(e.moveChildren(m),e.remove(),h(b,c,f,d))}function m(b,c){function f(b,c){if(c.isBlock&&c.isElement&&!c.node.is("br")&&a(b)&&b.is("br"))return b.remove(),1}var d=c.endContainer.getChild(c.endOffset),g=c.endContainer.getChild(c.endOffset-1);d&&f(d,b[b.length-1]);g&&f(g,b[0])&&(c.setEnd(c.endContainer,c.endOffset-1),c.collapse())}var l=CKEDITOR.dtd,n={p:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,ul:1,ol:1,li:1,pre:1,dl:1,blockquote:1},p={p:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},q=CKEDITOR.tools.extend({},
l.$inline);delete q.br;return function(n,D,t,u){var v=n.editor,x=!1;"unfiltered_html"==D&&(D="html",x=!0);if(!u.checkReadOnly()){var r=(new CKEDITOR.dom.elementPath(u.startContainer,u.root)).blockLimit||u.root;n={type:D,dontFilter:x,editable:n,editor:v,range:u,blockLimit:r,mergeCandidates:[],zombies:[]};D=n.range;u=n.mergeCandidates;var I,A;"text"==n.type&&D.shrink(CKEDITOR.SHRINK_ELEMENT,!0,!1)&&(I=CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e",D.document),D.insertNode(I),
D.setStartAfter(I));x=new CKEDITOR.dom.elementPath(D.startContainer);n.endPath=r=new CKEDITOR.dom.elementPath(D.endContainer);if(!D.collapsed){var v=r.block||r.blockLimit,da=D.getCommonAncestor();v&&!v.equals(da)&&!v.contains(da)&&D.checkEndOfBlock()&&n.zombies.push(v);D.deleteContents()}for(;(A=d(D))&&a(A)&&A.isBlockBoundary()&&x.contains(A);)D.moveToPosition(A,CKEDITOR.POSITION_BEFORE_END);h(D,n.blockLimit,x,r);I&&(D.setEndBefore(I),D.collapse(),I.remove());I=D.startPath();if(v=I.contains(e,!1,
1))D.splitElement(v),n.inlineStylesRoot=v,n.inlineStylesPeak=I.lastElement;I=D.createBookmark();(v=I.startNode.getPrevious(c))&&a(v)&&e(v)&&u.push(v);(v=I.startNode.getNext(c))&&a(v)&&e(v)&&u.push(v);for(v=I.startNode;(v=v.getParent())&&e(v);)u.push(v);D.moveToBookmark(I);if(I=t){I=n.range;if("text"==n.type&&n.inlineStylesRoot){A=n.inlineStylesPeak;D=A.getDocument().createText("{cke-peak}");for(u=n.inlineStylesRoot.getParent();!A.equals(u);)D=D.appendTo(A.clone()),A=A.getParent();t=D.getOuterHtml().split("{cke-peak}").join(t)}A=
n.blockLimit.getName();if(/^\s+|\s+$/.test(t)&&"span"in CKEDITOR.dtd[A]){var P='\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e';t=P+t+P}t=n.editor.dataProcessor.toHtml(t,{context:null,fixForBody:!1,protectedWhitespaces:!!P,dontFilter:n.dontFilter,filter:n.editor.activeFilter,enterMode:n.editor.activeEnterMode});A=I.document.createElement("body");A.setHtml(t);P&&(A.getFirst().remove(),A.getLast().remove());if((P=I.startPath().block)&&(1!=P.getChildCount()||!P.getBogus()))a:{var Q;if(1==
A.getChildCount()&&a(Q=A.getFirst())&&Q.is(p)&&!Q.hasAttribute("contenteditable")){P=Q.getElementsByTag("*");I=0;for(u=P.count();I<u;I++)if(D=P.getItem(I),!D.is(q))break a;Q.moveChildren(Q.getParent(1));Q.remove()}}n.dataWrapper=A;I=t}if(I){Q=n.range;I=Q.document;var M;A=n.blockLimit;u=0;var U,P=[],T,O;t=v=0;var W,aa;D=Q.startContainer;var x=n.endPath.elements[0],ba,r=x.getPosition(D),da=!!x.getCommonAncestor(D)&&r!=CKEDITOR.POSITION_IDENTICAL&&!(r&CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED);
D=b(n.dataWrapper,n);for(m(D,Q);u<D.length;u++){r=D[u];if(M=r.isLineBreak){M=Q;W=A;var Y=void 0,ca=void 0;r.hasBlockSibling?M=1:(Y=M.startContainer.getAscendant(l.$block,1))&&Y.is({div:1,p:1})?(ca=Y.getPosition(W),ca==CKEDITOR.POSITION_IDENTICAL||ca==CKEDITOR.POSITION_CONTAINS?M=0:(W=M.splitElement(Y),M.moveToPosition(W,CKEDITOR.POSITION_AFTER_START),M=1)):M=0}if(M)t=0<u;else{M=Q.startPath();!r.isBlock&&k(n.editor,M.block,M.blockLimit)&&(O=g(n.editor))&&(O=I.createElement(O),O.appendBogus(),Q.insertNode(O),
CKEDITOR.env.needsBrFiller&&(U=O.getBogus())&&U.remove(),Q.moveToPosition(O,CKEDITOR.POSITION_BEFORE_END));if((M=Q.startPath().block)&&!M.equals(T)){if(U=M.getBogus())U.remove(),P.push(M);T=M}r.firstNotAllowed&&(v=1);if(v&&r.isElement){M=Q.startContainer;for(W=null;M&&!l[M.getName()][r.name];){if(M.equals(A)){M=null;break}W=M;M=M.getParent()}if(M)W&&(aa=Q.splitElement(W),n.zombies.push(aa),n.zombies.push(W));else{W=A.getName();ba=!u;M=u==D.length-1;W=f(r.node,W);for(var Y=[],ca=W.length,ea=0,ia=void 0,
ja=0,fa=-1;ea<ca;ea++)ia=W[ea]," "==ia?(ja||ba&&!ea||(Y.push(new CKEDITOR.dom.text(" ")),fa=Y.length),ja=1):(Y.push(ia),ja=0);M&&fa==Y.length&&Y.pop();ba=Y}}if(ba){for(;M=ba.pop();)Q.insertNode(M);ba=0}else Q.insertNode(r.node);r.lastNotAllowed&&u<D.length-1&&((aa=da?x:aa)&&Q.setEndAt(aa,CKEDITOR.POSITION_AFTER_START),v=0);Q.collapse()}}1!=D.length?U=!1:(U=D[0],U=U.isElement&&"false"==U.node.getAttribute("contenteditable"));U&&(t=!0,M=D[0].node,Q.setStartAt(M,CKEDITOR.POSITION_BEFORE_START),Q.setEndAt(M,
CKEDITOR.POSITION_AFTER_END));n.dontMoveCaret=t;n.bogusNeededBlocks=P}U=n.range;var ga;aa=n.bogusNeededBlocks;for(ba=U.createBookmark();T=n.zombies.pop();)T.getParent()&&(O=U.clone(),O.moveToElementEditStart(T),O.removeEmptyBlocksAtEnd());if(aa)for(;T=aa.pop();)CKEDITOR.env.needsBrFiller?T.appendBogus():T.append(U.document.createText(" "));for(;T=n.mergeCandidates.pop();)T.mergeSiblings();U.moveToBookmark(ba);if(!n.dontMoveCaret){for(T=d(U);T&&a(T)&&!T.is(l.$empty);){if(T.isBlockBoundary())U.moveToPosition(T,
CKEDITOR.POSITION_BEFORE_END);else{if(e(T)&&T.getHtml().match(/(\s|&nbsp;)$/g)){ga=null;break}ga=U.clone();ga.moveToPosition(T,CKEDITOR.POSITION_BEFORE_END)}T=T.getLast(c)}ga&&U.moveToRange(ga)}}}}();q=function(){function a(b){b=new CKEDITOR.dom.walker(b);b.guard=function(a,b){if(b)return!1;if(a.type==CKEDITOR.NODE_ELEMENT)return a.is(CKEDITOR.dtd.$tableContent)};b.evaluator=function(a){return a.type==CKEDITOR.NODE_ELEMENT};return b}function b(a,c,f){c=a.getDocument().createElement(c);a.append(c,
f);return c}function c(a){var b=a.count(),f;for(b;0<b--;)f=a.getItem(b),CKEDITOR.tools.trim(f.getHtml())||(f.appendBogus(),CKEDITOR.env.ie&&9>CKEDITOR.env.version&&f.getChildCount()&&f.getFirst().remove())}return function(f){var d=f.startContainer,g=d.getAscendant("table",1),e=!1;c(g.getElementsByTag("td"));c(g.getElementsByTag("th"));g=f.clone();g.setStart(d,0);g=a(g).lastBackward();g||(g=f.clone(),g.setEndAt(d,CKEDITOR.POSITION_BEFORE_END),g=a(g).lastForward(),e=!0);g||(g=d);g.is("table")?(f.setStartAt(g,
CKEDITOR.POSITION_BEFORE_START),f.collapse(!0),g.remove()):(g.is({tbody:1,thead:1,tfoot:1})&&(g=b(g,"tr",e)),g.is("tr")&&(g=b(g,g.getParent().is("thead")?"th":"td",e)),(d=g.getBogus())&&d.remove(),f.moveToPosition(g,e?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END))}}();t=function(){function a(b){b=new CKEDITOR.dom.walker(b);b.guard=function(a,b){if(b)return!1;if(a.type==CKEDITOR.NODE_ELEMENT)return a.is(CKEDITOR.dtd.$list)||a.is(CKEDITOR.dtd.$listItem)};b.evaluator=function(a){return a.type==
CKEDITOR.NODE_ELEMENT&&a.is(CKEDITOR.dtd.$listItem)};return b}return function(b){var c=b.startContainer,f=!1,d;d=b.clone();d.setStart(c,0);d=a(d).lastBackward();d||(d=b.clone(),d.setEndAt(c,CKEDITOR.POSITION_BEFORE_END),d=a(d).lastForward(),f=!0);d||(d=c);d.is(CKEDITOR.dtd.$list)?(b.setStartAt(d,CKEDITOR.POSITION_BEFORE_START),b.collapse(!0),d.remove()):((c=d.getBogus())&&c.remove(),b.moveToPosition(d,f?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END),b.select())}}();u={eol:{detect:function(a,
b){var c=a.range,f=c.clone(),d=c.clone(),g=new CKEDITOR.dom.elementPath(c.startContainer,b),e=new CKEDITOR.dom.elementPath(c.endContainer,b);f.collapse(1);d.collapse();g.block&&f.checkBoundaryOfElement(g.block,CKEDITOR.END)&&(c.setStartAfter(g.block),a.prependEolBr=1);e.block&&d.checkBoundaryOfElement(e.block,CKEDITOR.START)&&(c.setEndBefore(e.block),a.appendEolBr=1)},fix:function(a,b){var c=b.getDocument(),f;a.appendEolBr&&(f=this.createEolBr(c),a.fragment.append(f));!a.prependEolBr||f&&!f.getPrevious()||
a.fragment.append(this.createEolBr(c),1)},createEolBr:function(a){return a.createElement("br",{attributes:{"data-cke-eol":1}})}},bogus:{exclude:function(a){var b=a.range.getBoundaryNodes(),c=b.startNode,b=b.endNode;!b||!r(b)||c&&c.equals(b)||a.range.setEndBefore(b)}},tree:{rebuild:function(a,b){var c=a.range,f=c.getCommonAncestor(),d=new CKEDITOR.dom.elementPath(f,b),g=new CKEDITOR.dom.elementPath(c.startContainer,b),c=new CKEDITOR.dom.elementPath(c.endContainer,b),e;f.type==CKEDITOR.NODE_TEXT&&(f=
f.getParent());if(d.blockLimit.is({tr:1,table:1})){var h=d.contains("table").getParent();e=function(a){return!a.equals(h)}}else if(d.block&&d.block.is(CKEDITOR.dtd.$listItem)&&(g=g.contains(CKEDITOR.dtd.$list),c=c.contains(CKEDITOR.dtd.$list),!g.equals(c))){var m=d.contains(CKEDITOR.dtd.$list).getParent();e=function(a){return!a.equals(m)}}e||(e=function(a){return!a.equals(d.block)&&!a.equals(d.blockLimit)});this.rebuildFragment(a,b,f,e)},rebuildFragment:function(a,b,c,f){for(var d;c&&!c.equals(b)&&
f(c);)d=c.clone(0,1),a.fragment.appendTo(d),a.fragment=d,c=c.getParent()}},cell:{shrink:function(a){a=a.range;var b=a.startContainer,c=a.endContainer,f=a.startOffset,d=a.endOffset;b.type==CKEDITOR.NODE_ELEMENT&&b.equals(c)&&b.is("tr")&&++f==d&&a.shrink(CKEDITOR.SHRINK_TEXT)}}};A=function(){function a(b,c){var f=b.getParent();if(f.is(CKEDITOR.dtd.$inline))b[c?"insertBefore":"insertAfter"](f)}function b(c,f,d){a(f);a(d,1);for(var g;g=d.getNext();)g.insertAfter(f),f=g;p(c)&&c.remove()}function c(a,b){var f=
new CKEDITOR.dom.range(a);f.setStartAfter(b.startNode);f.setEndBefore(b.endNode);return f}return{list:{detectMerge:function(a,b){var f=c(b,a.bookmark),d=f.startPath(),g=f.endPath(),e=d.contains(CKEDITOR.dtd.$list),h=g.contains(CKEDITOR.dtd.$list);a.mergeList=e&&h&&e.getParent().equals(h.getParent())&&!e.equals(h);a.mergeListItems=d.block&&g.block&&d.block.is(CKEDITOR.dtd.$listItem)&&g.block.is(CKEDITOR.dtd.$listItem);if(a.mergeList||a.mergeListItems)f=f.clone(),f.setStartBefore(a.bookmark.startNode),
f.setEndAfter(a.bookmark.endNode),a.mergeListBookmark=f.createBookmark()},merge:function(a,c){if(a.mergeListBookmark){var f=a.mergeListBookmark.startNode,d=a.mergeListBookmark.endNode,g=new CKEDITOR.dom.elementPath(f,c),e=new CKEDITOR.dom.elementPath(d,c);if(a.mergeList){var h=g.contains(CKEDITOR.dtd.$list),m=e.contains(CKEDITOR.dtd.$list);h.equals(m)||(m.moveChildren(h),m.remove())}a.mergeListItems&&(g=g.contains(CKEDITOR.dtd.$listItem),e=e.contains(CKEDITOR.dtd.$listItem),g.equals(e)||b(e,f,d));
f.remove();d.remove()}}},block:{detectMerge:function(a,b){if(!a.tableContentsRanges&&!a.mergeListBookmark){var c=new CKEDITOR.dom.range(b);c.setStartBefore(a.bookmark.startNode);c.setEndAfter(a.bookmark.endNode);a.mergeBlockBookmark=c.createBookmark()}},merge:function(a,c){if(a.mergeBlockBookmark&&!a.purgeTableBookmark){var f=a.mergeBlockBookmark.startNode,d=a.mergeBlockBookmark.endNode,g=new CKEDITOR.dom.elementPath(f,c),e=new CKEDITOR.dom.elementPath(d,c),g=g.block,e=e.block;g&&e&&!g.equals(e)&&
b(e,f,d);f.remove();d.remove()}}},table:function(){function a(c){var d=[],g,e=new CKEDITOR.dom.walker(c),h=c.startPath().contains(f),m=c.endPath().contains(f),k={};e.guard=function(a,e){if(a.type==CKEDITOR.NODE_ELEMENT){var n="visited_"+(e?"out":"in");if(a.getCustomData(n))return;CKEDITOR.dom.element.setMarker(k,a,n,1)}if(e&&h&&a.equals(h))g=c.clone(),g.setEndAt(h,CKEDITOR.POSITION_BEFORE_END),d.push(g);else if(!e&&m&&a.equals(m))g=c.clone(),g.setStartAt(m,CKEDITOR.POSITION_AFTER_START),d.push(g);
else{if(n=!e)n=a.type==CKEDITOR.NODE_ELEMENT&&a.is(f)&&(!h||b(a,h))&&(!m||b(a,m));if(!n&&(n=e))if(a.is(f))var n=h&&h.getAscendant("table",!0),l=m&&m.getAscendant("table",!0),p=a.getAscendant("table",!0),n=n&&n.contains(p)||l&&l.contains(p);else n=void 0;n&&(g=c.clone(),g.selectNodeContents(a),d.push(g))}};e.lastForward();CKEDITOR.dom.element.clearAllMarkers(k);return d}function b(a,c){var f=CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED,d=a.getPosition(c);return d===CKEDITOR.POSITION_IDENTICAL?
!1:0===(d&f)}var f={td:1,th:1,caption:1};return{detectPurge:function(a){var b=a.range,c=b.clone();c.enlarge(CKEDITOR.ENLARGE_ELEMENT);var c=new CKEDITOR.dom.walker(c),d=0;c.evaluator=function(a){a.type==CKEDITOR.NODE_ELEMENT&&a.is(f)&&++d};c.checkForward();if(1<d){var c=b.startPath().contains("table"),g=b.endPath().contains("table");c&&g&&b.checkBoundaryOfElement(c,CKEDITOR.START)&&b.checkBoundaryOfElement(g,CKEDITOR.END)&&(b=a.range.clone(),b.setStartBefore(c),b.setEndAfter(g),a.purgeTableBookmark=
b.createBookmark())}},detectRanges:function(d,g){var e=c(g,d.bookmark),h=e.clone(),m,k,n=e.getCommonAncestor();n.is(CKEDITOR.dtd.$tableContent)&&!n.is(f)&&(n=n.getAscendant("table",!0));k=n;n=new CKEDITOR.dom.elementPath(e.startContainer,k);k=new CKEDITOR.dom.elementPath(e.endContainer,k);n=n.contains("table");k=k.contains("table");if(n||k)n&&k&&b(n,k)?(d.tableSurroundingRange=h,h.setStartAt(n,CKEDITOR.POSITION_AFTER_END),h.setEndAt(k,CKEDITOR.POSITION_BEFORE_START),h=e.clone(),h.setEndAt(n,CKEDITOR.POSITION_AFTER_END),
m=e.clone(),m.setStartAt(k,CKEDITOR.POSITION_BEFORE_START),m=a(h).concat(a(m))):n?k||(d.tableSurroundingRange=h,h.setStartAt(n,CKEDITOR.POSITION_AFTER_END),e.setEndAt(n,CKEDITOR.POSITION_AFTER_END)):(d.tableSurroundingRange=h,h.setEndAt(k,CKEDITOR.POSITION_BEFORE_START),e.setStartAt(k,CKEDITOR.POSITION_AFTER_START)),d.tableContentsRanges=m?m:a(e)},deleteRanges:function(a){for(var b;b=a.tableContentsRanges.pop();)b.extractContents(),p(b.startContainer)&&b.startContainer.appendBogus();a.tableSurroundingRange&&
a.tableSurroundingRange.extractContents()},purge:function(a){if(a.purgeTableBookmark){var b=a.doc,c=a.range.clone(),b=b.createElement("p");b.insertBefore(a.purgeTableBookmark.startNode);c.moveToBookmark(a.purgeTableBookmark);c.deleteContents();a.range.moveToPosition(b,CKEDITOR.POSITION_AFTER_START)}}}}(),detectExtractMerge:function(a){return!(a.range.startPath().contains(CKEDITOR.dtd.$listItem)&&a.range.endPath().contains(CKEDITOR.dtd.$listItem))},fixUneditableRangePosition:function(a){a.startContainer.getDtd()["#"]||
a.moveToClosestEditablePosition(null,!0)},autoParagraph:function(a,b){var c=b.startPath(),f;k(a,c.block,c.blockLimit)&&(f=g(a))&&(f=b.document.createElement(f),f.appendBogus(),b.insertNode(f),b.moveToPosition(f,CKEDITOR.POSITION_AFTER_START))}}}()}(),function(){function a(a){return CKEDITOR.plugins.widget&&CKEDITOR.plugins.widget.isDomWidget(a)}function e(b,c){if(0===b.length||a(b[0].getEnclosedNode()))return!1;var f,d;if((f=!c&&1===b.length)&&!(f=b[0].collapsed)){var g=b[0];f=g.startContainer.getAscendant({td:1,
th:1},!0);var e=g.endContainer.getAscendant({td:1,th:1},!0);d=CKEDITOR.tools.trim;f&&f.equals(e)&&!f.findOne("td, th, tr, tbody, table")?(g=g.cloneContents(),f=g.getFirst()?d(g.getFirst().getText())!==d(f.getText()):!0):f=!1}if(f)return!1;for(d=0;d<b.length;d++)if(f=b[d]._getTableElement(),!f)return!1;return!0}function b(a){function b(a){a=a.find("td, th");var c=[],f;for(f=0;f<a.count();f++)c.push(a.getItem(f));return c}var c=[],f,d;for(d=0;d<a.length;d++)f=a[d]._getTableElement(),f.is&&f.is({td:1,
th:1})?c.push(f):c=c.concat(b(f));return c}function c(a){a=b(a);var c="",f=[],d,g;for(g=0;g<a.length;g++)d&&!d.equals(a[g].getAscendant("tr"))?(c+=f.join("\t")+"\n",d=a[g].getAscendant("tr"),f=[]):0===g&&(d=a[g].getAscendant("tr")),f.push(a[g].getText());return c+=f.join("\t")}function d(a){var b=this.root.editor,f=b.getSelection(1);this.reset();z=!0;f.root.once("selectionchange",function(a){a.cancel()},null,null,0);f.selectRanges([a[0]]);f=this._.cache;f.ranges=new CKEDITOR.dom.rangeList(a);f.type=
CKEDITOR.SELECTION_TEXT;f.selectedElement=a[0]._getTableElement();f.selectedText=c(a);f.nativeSel=null;this.isFake=1;this.rev=t++;b._.fakeSelection=this;z=!1;this.root.fire("selectionchange")}function l(){var b=this._.fakeSelection,c;if(b){c=this.getSelection(1);var f;if(!(f=!c)&&(f=!c.isHidden())){f=b;var d=c.getRanges(),g=f.getRanges(),h=d.length&&d[0]._getTableElement()&&d[0]._getTableElement().getAscendant("table",!0),m=g.length&&g[0]._getTableElement()&&g[0]._getTableElement().getAscendant("table",
!0),k=1===d.length&&d[0]._getTableElement()&&d[0]._getTableElement().is("table"),n=1===g.length&&g[0]._getTableElement()&&g[0]._getTableElement().is("table");if(a(f.getSelectedElement()))f=!1;else{var l=1===d.length&&d[0].collapsed,g=e(d,!!CKEDITOR.env.webkit)&&e(g);h=h&&m?h.equals(m)||m.contains(h):!1;h&&(l||g)?(k&&!n&&f.selectRanges(d),f=!0):f=!1}f=!f}f&&(b.reset(),b=0)}if(!b&&(b=c||this.getSelection(1),!b||b.getType()==CKEDITOR.SELECTION_NONE))return;this.fire("selectionCheck",b);c=this.elementPath();
c.compare(this._.selectionPreviousPath)||(f=this._.selectionPreviousPath&&this._.selectionPreviousPath.blockLimit.equals(c.blockLimit),CKEDITOR.env.webkit&&!f&&(this._.previousActive=this.document.getActive()),this._.selectionPreviousPath=c,this.fire("selectionChange",{selection:b,path:c}))}function k(){C=!0;w||(g.call(this),w=CKEDITOR.tools.setTimeout(g,200,this))}function g(){w=null;C&&(CKEDITOR.tools.setTimeout(l,0,this),C=!1)}function h(a){return y(a)||a.type==CKEDITOR.NODE_ELEMENT&&!a.is(CKEDITOR.dtd.$empty)?
!0:!1}function m(a){function b(c,f){return c&&c.type!=CKEDITOR.NODE_TEXT?a.clone()["moveToElementEdit"+(f?"End":"Start")](c):!1}if(!(a.root instanceof CKEDITOR.editable))return!1;var c=a.startContainer,f=a.getPreviousNode(h,null,c),d=a.getNextNode(h,null,c);return b(f)||b(d,1)||!(f||d||c.type==CKEDITOR.NODE_ELEMENT&&c.isBlockBoundary()&&c.getBogus())?!0:!1}function f(a){n(a,!1);var b=a.getDocument().createText(u);a.setCustomData("cke-fillingChar",b);return b}function n(a,b){var c=a&&a.removeCustomData("cke-fillingChar");
if(c){if(!1!==b){var f=a.getDocument().getSelection().getNative(),d=f&&"None"!=f.type&&f.getRangeAt(0),g=u.length;if(c.getLength()>g&&d&&d.intersectsNode(c.$)){var e=[{node:f.anchorNode,offset:f.anchorOffset},{node:f.focusNode,offset:f.focusOffset}];f.anchorNode==c.$&&f.anchorOffset>g&&(e[0].offset-=g);f.focusNode==c.$&&f.focusOffset>g&&(e[1].offset-=g)}}c.setText(p(c.getText(),1));e&&(c=a.getDocument().$,f=c.getSelection(),c=c.createRange(),c.setStart(e[0].node,e[0].offset),c.collapse(!0),f.removeAllRanges(),
f.addRange(c),f.extend(e[1].node,e[1].offset))}}function p(a,b){return b?a.replace(A,function(a,b){return b?" ":""}):a.replace(u,"")}function r(a,b){var c=b&&CKEDITOR.tools.htmlEncode(b)||"\x26nbsp;",c=CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"'+(CKEDITOR.env.ie&&14>CKEDITOR.env.version?"display:none":"position:fixed;top:0;left:-1000px")+'"\x3e'+c+"\x3c/div\x3e",a.document);a.fire("lockSnapshot");a.editable().append(c);var f=a.getSelection(1),
d=a.createRange(),g=f.root.on("selectionchange",function(a){a.cancel()},null,null,0);d.setStartAt(c,CKEDITOR.POSITION_AFTER_START);d.setEndAt(c,CKEDITOR.POSITION_BEFORE_END);f.selectRanges([d]);g.removeListener();a.fire("unlockSnapshot");a._.hiddenSelectionContainer=c}function v(a){var b={37:1,39:1,8:1,46:1};return function(c){var f=c.data.getKeystroke();if(b[f]){var d=a.getSelection().getRanges(),g=d[0];1==d.length&&g.collapsed&&(f=g[38>f?"getPreviousEditableNode":"getNextEditableNode"]())&&f.type==
CKEDITOR.NODE_ELEMENT&&"false"==f.getAttribute("contenteditable")&&(a.getSelection().fake(f),c.data.preventDefault(),c.cancel())}}}function x(a){for(var b=0;b<a.length;b++){var c=a[b];c.getCommonAncestor().isReadOnly()&&a.splice(b,1);if(!c.collapsed){if(c.startContainer.isReadOnly())for(var f=c.startContainer,d;f&&!((d=f.type==CKEDITOR.NODE_ELEMENT)&&f.is("body")||!f.isReadOnly());)d&&"false"==f.getAttribute("contentEditable")&&c.setStartAfter(f),f=f.getParent();f=c.startContainer;d=c.endContainer;
var g=c.startOffset,e=c.endOffset,h=c.clone();f&&f.type==CKEDITOR.NODE_TEXT&&(g>=f.getLength()?h.setStartAfter(f):h.setStartBefore(f));d&&d.type==CKEDITOR.NODE_TEXT&&(e?h.setEndAfter(d):h.setEndBefore(d));f=new CKEDITOR.dom.walker(h);f.evaluator=function(f){if(f.type==CKEDITOR.NODE_ELEMENT&&f.isReadOnly()){var d=c.clone();c.setEndBefore(f);c.collapsed&&a.splice(b--,1);f.getPosition(h.endContainer)&CKEDITOR.POSITION_CONTAINS||(d.setStartAfter(f),d.collapsed||a.splice(b+1,0,d));return!0}return!1};f.next()}}return a}
var q="function"!=typeof window.getSelection,t=1,u=CKEDITOR.tools.repeat("​",7),A=new RegExp(u+"( )?","g"),z,w,C,y=CKEDITOR.dom.walker.invisible(1),B=function(){function a(b){return function(a){var c=a.editor.createRange();c.moveToClosestEditablePosition(a.selected,b)&&a.editor.getSelection().selectRanges([c]);return!1}}function b(a){return function(b){var c=b.editor,f=c.createRange(),d;if(!c.readOnly)return(d=f.moveToClosestEditablePosition(b.selected,a))||(d=f.moveToClosestEditablePosition(b.selected,
!a)),d&&c.getSelection().selectRanges([f]),c.fire("saveSnapshot"),b.selected.remove(),d||(f.moveToElementEditablePosition(c.editable()),c.getSelection().selectRanges([f])),c.fire("saveSnapshot"),!1}}var c=a(),f=a(1);return{37:c,38:c,39:f,40:f,8:b(),46:b(1)}}();CKEDITOR.on("instanceCreated",function(a){function b(){var a=c.getSelection();a&&a.removeAllRanges()}var c=a.editor;c.on("contentDom",function(){function a(){t=new CKEDITOR.dom.selection(c.getSelection());t.lock()}function b(){g.removeListener("mouseup",
b);m.removeListener("mouseup",b);var a=CKEDITOR.document.$.selection,c=a.createRange();"None"!=a.type&&c.parentElement()&&c.parentElement().ownerDocument==d.$&&c.select()}function f(a){if(CKEDITOR.env.ie){var b=(a=a.getRanges()[0])?a.startContainer.getAscendant(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&("false"==a.getAttribute("contenteditable")||"true"==a.getAttribute("contenteditable"))},!0):null;return a&&"false"==b.getAttribute("contenteditable")&&b}}var d=c.document,g=CKEDITOR.document,
e=c.editable(),h=d.getBody(),m=d.getDocumentElement(),p=e.isInline(),u,t;CKEDITOR.env.gecko&&e.attachListener(e,"focus",function(a){a.removeListener();0!==u&&(a=c.getSelection().getNative())&&a.isCollapsed&&a.anchorNode==e.$&&(a=c.createRange(),a.moveToElementEditStart(e),a.select())},null,null,-2);e.attachListener(e,CKEDITOR.env.webkit?"DOMFocusIn":"focus",function(){u&&CKEDITOR.env.webkit&&(u=c._.previousActive&&c._.previousActive.equals(d.getActive()))&&null!=c._.previousScrollTop&&c._.previousScrollTop!=
e.$.scrollTop&&(e.$.scrollTop=c._.previousScrollTop);c.unlockSelection(u);u=0},null,null,-1);e.attachListener(e,"mousedown",function(){u=0});if(CKEDITOR.env.ie||p)q?e.attachListener(e,"beforedeactivate",a,null,null,-1):e.attachListener(c,"selectionCheck",a,null,null,-1),e.attachListener(e,CKEDITOR.env.webkit?"DOMFocusOut":"blur",function(){c.lockSelection(t);u=1},null,null,-1),e.attachListener(e,"mousedown",function(){u=0});if(CKEDITOR.env.ie&&!p){var w;e.attachListener(e,"mousedown",function(a){2==
a.data.$.button&&((a=c.document.getSelection())&&a.getType()!=CKEDITOR.SELECTION_NONE||(w=c.window.getScrollPosition()))});e.attachListener(e,"mouseup",function(a){2==a.data.$.button&&w&&(c.document.$.documentElement.scrollLeft=w.x,c.document.$.documentElement.scrollTop=w.y);w=null});if("BackCompat"!=d.$.compatMode){if(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat){var r,x;m.on("mousedown",function(a){function b(a){a=a.data.$;if(r){var c=h.$.createTextRange();try{c.moveToPoint(a.clientX,a.clientY)}catch(f){}r.setEndPoint(0>
x.compareEndPoints("StartToStart",c)?"EndToEnd":"StartToStart",c);r.select()}}function c(){m.removeListener("mousemove",b);g.removeListener("mouseup",c);m.removeListener("mouseup",c);r.select()}a=a.data;if(a.getTarget().is("html")&&a.$.y<m.$.clientHeight&&a.$.x<m.$.clientWidth){r=h.$.createTextRange();try{r.moveToPoint(a.$.clientX,a.$.clientY)}catch(f){}x=r.duplicate();m.on("mousemove",b);g.on("mouseup",c);m.on("mouseup",c)}})}if(7<CKEDITOR.env.version&&11>CKEDITOR.env.version)m.on("mousedown",function(a){a.data.getTarget().is("html")&&
(g.on("mouseup",b),m.on("mouseup",b))})}}e.attachListener(e,"selectionchange",l,c);e.attachListener(e,"keyup",k,c);e.attachListener(e,"keydown",function(a){var b=this.getSelection(1);f(b)&&(b.selectElement(f(b)),a.data.preventDefault())},c);e.attachListener(e,CKEDITOR.env.webkit?"DOMFocusIn":"focus",function(){c.forceNextSelectionCheck();c.selectionChange(1)});if(p&&(CKEDITOR.env.webkit||CKEDITOR.env.gecko)){var A;e.attachListener(e,"mousedown",function(){A=1});e.attachListener(d.getDocumentElement(),
"mouseup",function(){A&&k.call(c);A=0})}else e.attachListener(CKEDITOR.env.ie?e:d.getDocumentElement(),"mouseup",k,c);CKEDITOR.env.webkit&&e.attachListener(d,"keydown",function(a){switch(a.data.getKey()){case 13:case 33:case 34:case 35:case 36:case 37:case 39:case 8:case 45:case 46:e.hasFocus&&n(e)}},null,null,-1);e.attachListener(e,"keydown",v(c),null,null,-1)});c.on("setData",function(){c.unlockSelection();CKEDITOR.env.webkit&&b()});c.on("contentDomUnload",function(){c.unlockSelection()});if(CKEDITOR.env.ie9Compat)c.on("beforeDestroy",
b,null,null,9);c.on("dataReady",function(){delete c._.fakeSelection;delete c._.hiddenSelectionContainer;c.selectionChange(1)});c.on("loadSnapshot",function(){var a=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),b=c.editable().getLast(a);b&&b.hasAttribute("data-cke-hidden-sel")&&(b.remove(),CKEDITOR.env.gecko&&(a=c.editable().getFirst(a))&&a.is("br")&&a.getAttribute("_moz_editor_bogus_node")&&a.remove())},null,null,100);c.on("key",function(a){if("wysiwyg"==c.mode){var b=c.getSelection();if(b.isFake){var f=
B[a.data.keyCode];if(f)return f({editor:c,selected:b.getSelectedElement(),selection:b,keyEvent:a})}}})});if(CKEDITOR.env.webkit)CKEDITOR.on("instanceReady",function(a){var b=a.editor;b.on("selectionChange",function(){var a=b.editable(),c=a.getCustomData("cke-fillingChar");c&&(c.getCustomData("ready")?(n(a),a.editor.fire("selectionCheck")):c.setCustomData("ready",1))},null,null,-1);b.on("beforeSetMode",function(){n(b.editable())},null,null,-1);b.on("getSnapshot",function(a){a.data&&(a.data=p(a.data))},
b,null,20);b.on("toDataFormat",function(a){a.data.dataValue=p(a.data.dataValue)},null,null,0)});CKEDITOR.editor.prototype.selectionChange=function(a){(a?l:k).call(this)};CKEDITOR.editor.prototype.getSelection=function(a){return!this._.savedSelection&&!this._.fakeSelection||a?(a=this.editable())&&"wysiwyg"==this.mode?new CKEDITOR.dom.selection(a):null:this._.savedSelection||this._.fakeSelection};CKEDITOR.editor.prototype.lockSelection=function(a){a=a||this.getSelection(1);return a.getType()!=CKEDITOR.SELECTION_NONE?
(!a.isLocked&&a.lock(),this._.savedSelection=a,!0):!1};CKEDITOR.editor.prototype.unlockSelection=function(a){var b=this._.savedSelection;return b?(b.unlock(a),delete this._.savedSelection,!0):!1};CKEDITOR.editor.prototype.forceNextSelectionCheck=function(){delete this._.selectionPreviousPath};CKEDITOR.dom.document.prototype.getSelection=function(){return new CKEDITOR.dom.selection(this)};CKEDITOR.dom.range.prototype.select=function(){var a=this.root instanceof CKEDITOR.editable?this.root.editor.getSelection():
new CKEDITOR.dom.selection(this.root);a.selectRanges([this]);return a};CKEDITOR.SELECTION_NONE=1;CKEDITOR.SELECTION_TEXT=2;CKEDITOR.SELECTION_ELEMENT=3;CKEDITOR.dom.selection=function(a){if(a instanceof CKEDITOR.dom.selection){var b=a;a=a.root}var c=a instanceof CKEDITOR.dom.element;this.rev=b?b.rev:t++;this.document=a instanceof CKEDITOR.dom.document?a:a.getDocument();this.root=c?a:this.document.getBody();this.isLocked=0;this._={cache:{}};if(b)return CKEDITOR.tools.extend(this._.cache,b._.cache),
this.isFake=b.isFake,this.isLocked=b.isLocked,this;a=this.getNative();var f,d;if(a)if(a.getRangeAt)f=(d=a.rangeCount&&a.getRangeAt(0))&&new CKEDITOR.dom.node(d.commonAncestorContainer);else{try{d=a.createRange()}catch(g){}f=d&&CKEDITOR.dom.element.get(d.item&&d.item(0)||d.parentElement())}if(!f||f.type!=CKEDITOR.NODE_ELEMENT&&f.type!=CKEDITOR.NODE_TEXT||!this.root.equals(f)&&!this.root.contains(f))this._.cache.type=CKEDITOR.SELECTION_NONE,this._.cache.startElement=null,this._.cache.selectedElement=
null,this._.cache.selectedText="",this._.cache.ranges=new CKEDITOR.dom.rangeList;return this};var G={img:1,hr:1,li:1,table:1,tr:1,td:1,th:1,embed:1,object:1,ol:1,ul:1,a:1,input:1,form:1,select:1,textarea:1,button:1,fieldset:1,thead:1,tfoot:1};CKEDITOR.tools.extend(CKEDITOR.dom.selection,{_removeFillingCharSequenceString:p,_createFillingCharSequenceNode:f,FILLING_CHAR_SEQUENCE:u});CKEDITOR.dom.selection.prototype={getNative:function(){return void 0!==this._.cache.nativeSel?this._.cache.nativeSel:this._.cache.nativeSel=
q?this.document.$.selection:this.document.getWindow().$.getSelection()},getType:q?function(){var a=this._.cache;if(a.type)return a.type;var b=CKEDITOR.SELECTION_NONE;try{var c=this.getNative(),f=c.type;"Text"==f&&(b=CKEDITOR.SELECTION_TEXT);"Control"==f&&(b=CKEDITOR.SELECTION_ELEMENT);c.createRange().parentElement()&&(b=CKEDITOR.SELECTION_TEXT)}catch(d){}return a.type=b}:function(){var a=this._.cache;if(a.type)return a.type;var b=CKEDITOR.SELECTION_TEXT,c=this.getNative();if(!c||!c.rangeCount)b=CKEDITOR.SELECTION_NONE;
else if(1==c.rangeCount){var c=c.getRangeAt(0),f=c.startContainer;f==c.endContainer&&1==f.nodeType&&1==c.endOffset-c.startOffset&&G[f.childNodes[c.startOffset].nodeName.toLowerCase()]&&(b=CKEDITOR.SELECTION_ELEMENT)}return a.type=b},getRanges:function(){var a=q?function(){function a(b){return(new CKEDITOR.dom.node(b)).getIndex()}var b=function(b,c){b=b.duplicate();b.collapse(c);var f=b.parentElement();if(!f.hasChildNodes())return{container:f,offset:0};for(var d=f.children,g,e,h=b.duplicate(),m=0,
k=d.length-1,n=-1,l,p;m<=k;)if(n=Math.floor((m+k)/2),g=d[n],h.moveToElementText(g),l=h.compareEndPoints("StartToStart",b),0<l)k=n-1;else if(0>l)m=n+1;else return{container:f,offset:a(g)};if(-1==n||n==d.length-1&&0>l){h.moveToElementText(f);h.setEndPoint("StartToStart",b);h=h.text.replace(/(\r\n|\r)/g,"\n").length;d=f.childNodes;if(!h)return g=d[d.length-1],g.nodeType!=CKEDITOR.NODE_TEXT?{container:f,offset:d.length}:{container:g,offset:g.nodeValue.length};for(f=d.length;0<h&&0<f;)e=d[--f],e.nodeType==
CKEDITOR.NODE_TEXT&&(p=e,h-=e.nodeValue.length);return{container:p,offset:-h}}h.collapse(0<l?!0:!1);h.setEndPoint(0<l?"StartToStart":"EndToStart",b);h=h.text.replace(/(\r\n|\r)/g,"\n").length;if(!h)return{container:f,offset:a(g)+(0<l?0:1)};for(;0<h;)try{e=g[0<l?"previousSibling":"nextSibling"],e.nodeType==CKEDITOR.NODE_TEXT&&(h-=e.nodeValue.length,p=e),g=e}catch(q){return{container:f,offset:a(g)}}return{container:p,offset:0<l?-h:p.nodeValue.length+h}};return function(){var a=this.getNative(),c=a&&
a.createRange(),f=this.getType();if(!a)return[];if(f==CKEDITOR.SELECTION_TEXT)return a=new CKEDITOR.dom.range(this.root),f=b(c,!0),a.setStart(new CKEDITOR.dom.node(f.container),f.offset),f=b(c),a.setEnd(new CKEDITOR.dom.node(f.container),f.offset),a.endContainer.getPosition(a.startContainer)&CKEDITOR.POSITION_PRECEDING&&a.endOffset<=a.startContainer.getIndex()&&a.collapse(),[a];if(f==CKEDITOR.SELECTION_ELEMENT){for(var f=[],d=0;d<c.length;d++){for(var g=c.item(d),e=g.parentNode,h=0,a=new CKEDITOR.dom.range(this.root);h<
e.childNodes.length&&e.childNodes[h]!=g;h++);a.setStart(new CKEDITOR.dom.node(e),h);a.setEnd(new CKEDITOR.dom.node(e),h+1);f.push(a)}return f}return[]}}():function(){var a=[],b,c=this.getNative();if(!c)return a;for(var f=0;f<c.rangeCount;f++){var d=c.getRangeAt(f);b=new CKEDITOR.dom.range(this.root);b.setStart(new CKEDITOR.dom.node(d.startContainer),d.startOffset);b.setEnd(new CKEDITOR.dom.node(d.endContainer),d.endOffset);a.push(b)}return a};return function(b){var c=this._.cache,f=c.ranges;f||(c.ranges=
f=new CKEDITOR.dom.rangeList(a.call(this)));return b?x(new CKEDITOR.dom.rangeList(f.slice())):f}}(),getStartElement:function(){var a=this._.cache;if(void 0!==a.startElement)return a.startElement;var b;switch(this.getType()){case CKEDITOR.SELECTION_ELEMENT:return this.getSelectedElement();case CKEDITOR.SELECTION_TEXT:var c=this.getRanges()[0];if(c){if(c.collapsed)b=c.startContainer,b.type!=CKEDITOR.NODE_ELEMENT&&(b=b.getParent());else{for(c.optimize();b=c.startContainer,c.startOffset==(b.getChildCount?
b.getChildCount():b.getLength())&&!b.isBlockBoundary();)c.setStartAfter(b);b=c.startContainer;if(b.type!=CKEDITOR.NODE_ELEMENT)return b.getParent();if((b=b.getChild(c.startOffset))&&b.type==CKEDITOR.NODE_ELEMENT)for(c=b.getFirst();c&&c.type==CKEDITOR.NODE_ELEMENT;)b=c,c=c.getFirst();else b=c.startContainer}b=b.$}}return a.startElement=b?new CKEDITOR.dom.element(b):null},getSelectedElement:function(){var a=this._.cache;if(void 0!==a.selectedElement)return a.selectedElement;var b=this,c=CKEDITOR.tools.tryThese(function(){return b.getNative().createRange().item(0)},
function(){for(var a=b.getRanges()[0].clone(),c,f,d=2;d&&!((c=a.getEnclosedNode())&&c.type==CKEDITOR.NODE_ELEMENT&&G[c.getName()]&&(f=c));d--)a.shrink(CKEDITOR.SHRINK_ELEMENT);return f&&f.$});return a.selectedElement=c?new CKEDITOR.dom.element(c):null},getSelectedText:function(){var a=this._.cache;if(void 0!==a.selectedText)return a.selectedText;var b=this.getNative(),b=q?"Control"==b.type?"":b.createRange().text:b.toString();return a.selectedText=b},lock:function(){this.getRanges();this.getStartElement();
this.getSelectedElement();this.getSelectedText();this._.cache.nativeSel=null;this.isLocked=1},unlock:function(a){if(this.isLocked){if(a)var b=this.getSelectedElement(),c=this.getRanges(),f=this.isFake;this.isLocked=0;this.reset();a&&(a=b||c[0]&&c[0].getCommonAncestor())&&a.getAscendant("body",1)&&(e(c)?d.call(this,c):f?this.fake(b):b?this.selectElement(b):this.selectRanges(c))}},reset:function(){this._.cache={};this.isFake=0;var a=this.root.editor;if(a&&a._.fakeSelection)if(this.rev==a._.fakeSelection.rev){delete a._.fakeSelection;
var b=a._.hiddenSelectionContainer;if(b){var c=a.checkDirty();a.fire("lockSnapshot");b.remove();a.fire("unlockSnapshot");!c&&a.resetDirty()}delete a._.hiddenSelectionContainer}else CKEDITOR.warn("selection-fake-reset");this.rev=t++},selectElement:function(a){var b=new CKEDITOR.dom.range(this.root);b.setStartBefore(a);b.setEndAfter(a);this.selectRanges([b])},selectRanges:function(a){var b=this.root.editor,c=b&&b._.hiddenSelectionContainer;this.reset();if(c)for(var c=this.root,g,h=0;h<a.length;++h)g=
a[h],g.endContainer.equals(c)&&(g.endOffset=Math.min(g.endOffset,c.getChildCount()));if(a.length)if(this.isLocked){var k=CKEDITOR.document.getActive();this.unlock();this.selectRanges(a);this.lock();k&&!k.equals(this.root)&&k.focus()}else{var l;a:{var p,u;if(1==a.length&&!(u=a[0]).collapsed&&(l=u.getEnclosedNode())&&l.type==CKEDITOR.NODE_ELEMENT&&(u=u.clone(),u.shrink(CKEDITOR.SHRINK_ELEMENT,!0),(p=u.getEnclosedNode())&&p.type==CKEDITOR.NODE_ELEMENT&&(l=p),"false"==l.getAttribute("contenteditable")))break a;
l=void 0}if(l)this.fake(l);else if(b&&b.plugins.tableselection&&CKEDITOR.plugins.tableselection.isSupportedEnvironment&&e(a)&&!z)d.call(this,a);else{if(q){p=CKEDITOR.dom.walker.whitespaces(!0);l=/\ufeff|\u00a0/;u={table:1,tbody:1,tr:1};1<a.length&&(b=a[a.length-1],a[0].setEnd(b.endContainer,b.endOffset));b=a[0];a=b.collapsed;var t,v,w;if((c=b.getEnclosedNode())&&c.type==CKEDITOR.NODE_ELEMENT&&c.getName()in G&&(!c.is("a")||!c.getText()))try{w=c.$.createControlRange();w.addElement(c.$);w.select();return}catch(r){}if(b.startContainer.type==
CKEDITOR.NODE_ELEMENT&&b.startContainer.getName()in u||b.endContainer.type==CKEDITOR.NODE_ELEMENT&&b.endContainer.getName()in u)b.shrink(CKEDITOR.NODE_ELEMENT,!0),a=b.collapsed;w=b.createBookmark();u=w.startNode;a||(k=w.endNode);w=b.document.$.body.createTextRange();w.moveToElementText(u.$);w.moveStart("character",1);k?(l=b.document.$.body.createTextRange(),l.moveToElementText(k.$),w.setEndPoint("EndToEnd",l),w.moveEnd("character",-1)):(t=u.getNext(p),v=u.hasAscendant("pre"),t=!(t&&t.getText&&t.getText().match(l))&&
(v||!u.hasPrevious()||u.getPrevious().is&&u.getPrevious().is("br")),v=b.document.createElement("span"),v.setHtml("\x26#65279;"),v.insertBefore(u),t&&b.document.createText("﻿").insertBefore(u));b.setStartBefore(u);u.remove();a?(t?(w.moveStart("character",-1),w.select(),b.document.$.selection.clear()):w.select(),b.moveToPosition(v,CKEDITOR.POSITION_BEFORE_START),v.remove()):(b.setEndBefore(k),k.remove(),w.select())}else{k=this.getNative();if(!k)return;this.removeAllRanges();for(w=0;w<a.length;w++){if(w<
a.length-1&&(t=a[w],v=a[w+1],l=t.clone(),l.setStart(t.endContainer,t.endOffset),l.setEnd(v.startContainer,v.startOffset),!l.collapsed&&(l.shrink(CKEDITOR.NODE_ELEMENT,!0),b=l.getCommonAncestor(),l=l.getEnclosedNode(),b.isReadOnly()||l&&l.isReadOnly()))){v.setStart(t.startContainer,t.startOffset);a.splice(w--,1);continue}b=a[w];v=this.document.$.createRange();b.collapsed&&CKEDITOR.env.webkit&&m(b)&&(l=f(this.root),b.insertNode(l),(t=l.getNext())&&!l.getPrevious()&&t.type==CKEDITOR.NODE_ELEMENT&&"br"==
t.getName()?(n(this.root),b.moveToPosition(t,CKEDITOR.POSITION_BEFORE_START)):b.moveToPosition(l,CKEDITOR.POSITION_AFTER_END));v.setStart(b.startContainer.$,b.startOffset);try{v.setEnd(b.endContainer.$,b.endOffset)}catch(x){if(0<=x.toString().indexOf("NS_ERROR_ILLEGAL_VALUE"))b.collapse(1),v.setEnd(b.endContainer.$,b.endOffset);else throw x;}k.addRange(v)}}this.reset();this.root.fire("selectionchange")}}},fake:function(a,b){var c=this.root.editor;void 0===b&&a.hasAttribute("aria-label")&&(b=a.getAttribute("aria-label"));
this.reset();r(c,b);var f=this._.cache,d=new CKEDITOR.dom.range(this.root);d.setStartBefore(a);d.setEndAfter(a);f.ranges=new CKEDITOR.dom.rangeList(d);f.selectedElement=f.startElement=a;f.type=CKEDITOR.SELECTION_ELEMENT;f.selectedText=f.nativeSel=null;this.isFake=1;this.rev=t++;c._.fakeSelection=this;this.root.fire("selectionchange")},isHidden:function(){var a=this.getCommonAncestor();a&&a.type==CKEDITOR.NODE_TEXT&&(a=a.getParent());return!(!a||!a.data("cke-hidden-sel"))},isInTable:function(a){return e(this.getRanges(),
a)},isCollapsed:function(){var a=this.getRanges();return 1===a.length&&a[0].collapsed},createBookmarks:function(a){a=this.getRanges().createBookmarks(a);this.isFake&&(a.isFake=1);return a},createBookmarks2:function(a){a=this.getRanges().createBookmarks2(a);this.isFake&&(a.isFake=1);return a},selectBookmarks:function(a){for(var b=[],c,f=0;f<a.length;f++){var d=new CKEDITOR.dom.range(this.root);d.moveToBookmark(a[f]);b.push(d)}a.isFake&&(c=e(b)?b[0]._getTableElement():b[0].getEnclosedNode(),c&&c.type==
CKEDITOR.NODE_ELEMENT||(CKEDITOR.warn("selection-not-fake"),a.isFake=0));a.isFake&&!e(b)?this.fake(c):this.selectRanges(b);return this},getCommonAncestor:function(){var a=this.getRanges();return a.length?a[0].startContainer.getCommonAncestor(a[a.length-1].endContainer):null},scrollIntoView:function(){this.type!=CKEDITOR.SELECTION_NONE&&this.getRanges()[0].scrollIntoView()},removeAllRanges:function(){if(this.getType()!=CKEDITOR.SELECTION_NONE){var a=this.getNative();try{a&&a[q?"empty":"removeAllRanges"]()}catch(b){}this.reset()}}}}(),
"use strict",CKEDITOR.STYLE_BLOCK=1,CKEDITOR.STYLE_INLINE=2,CKEDITOR.STYLE_OBJECT=3,function(){function a(a,b){for(var c,f;(a=a.getParent())&&!a.equals(b);)if(a.getAttribute("data-nostyle"))c=a;else if(!f){var d=a.getAttribute("contentEditable");"false"==d?c=a:"true"==d&&(f=1)}return c}function e(a,b,c,f){return(a.getPosition(b)|f)==f&&(!c.childRule||c.childRule(a))}function b(c){var f=c.document;if(c.collapsed)f=t(this,f),c.insertNode(f),c.moveToPosition(f,CKEDITOR.POSITION_BEFORE_END);else{var g=
this.element,h=this._.definition,m,k=h.ignoreReadonly,n=k||h.includeReadonly;null==n&&(n=c.root.getCustomData("cke_includeReadonly"));var l=CKEDITOR.dtd[g];l||(m=!0,l=CKEDITOR.dtd.span);c.enlarge(CKEDITOR.ENLARGE_INLINE,1);c.trim();var p=c.createBookmark(),q=p.startNode,u=p.endNode,w=q,r;if(!k){var x=c.getCommonAncestor(),k=a(q,x),x=a(u,x);k&&(w=k.getNextSourceNode(!0));x&&(u=x)}for(w.getPosition(u)==CKEDITOR.POSITION_FOLLOWING&&(w=0);w;){k=!1;if(w.equals(u))w=null,k=!0;else{var A=w.type==CKEDITOR.NODE_ELEMENT?
w.getName():null,x=A&&"false"==w.getAttribute("contentEditable"),z=A&&w.getAttribute("data-nostyle");if(A&&w.data("cke-bookmark")){w=w.getNextSourceNode(!0);continue}if(x&&n&&CKEDITOR.dtd.$block[A])for(var y=w,B=d(y),C=void 0,G=B.length,ea=0,y=G&&new CKEDITOR.dom.range(y.getDocument());ea<G;++ea){var C=B[ea],E=CKEDITOR.filter.instances[C.data("cke-filter")];if(E?E.check(this):1)y.selectNodeContents(C),b.call(this,y)}B=A?!l[A]||z?0:x&&!n?0:e(w,u,h,K):1;if(B)if(C=w.getParent(),B=h,G=g,ea=m,!C||!(C.getDtd()||
CKEDITOR.dtd.span)[G]&&!ea||B.parentRule&&!B.parentRule(C))k=!0;else{if(r||A&&CKEDITOR.dtd.$removeEmpty[A]&&(w.getPosition(u)|K)!=K||(r=c.clone(),r.setStartBefore(w)),A=w.type,A==CKEDITOR.NODE_TEXT||x||A==CKEDITOR.NODE_ELEMENT&&!w.getChildCount()){for(var A=w,F;(k=!A.getNext(I))&&(F=A.getParent(),l[F.getName()])&&e(F,q,h,J);)A=F;r.setEndAfter(A)}}else k=!0;w=w.getNextSourceNode(z||x)}if(k&&r&&!r.collapsed){for(var k=t(this,f),x=k.hasAttributes(),z=r.getCommonAncestor(),A={},B={},C={},G={},fa,H,ha;k&&
z;){if(z.getName()==g){for(fa in h.attributes)!G[fa]&&(ha=z.getAttribute(H))&&(k.getAttribute(fa)==ha?B[fa]=1:G[fa]=1);for(H in h.styles)!C[H]&&(ha=z.getStyle(H))&&(k.getStyle(H)==ha?A[H]=1:C[H]=1)}z=z.getParent()}for(fa in B)k.removeAttribute(fa);for(H in A)k.removeStyle(H);x&&!k.hasAttributes()&&(k=null);k?(r.extractContents().appendTo(k),r.insertNode(k),v.call(this,k),k.mergeSiblings(),CKEDITOR.env.ie||k.$.normalize()):(k=new CKEDITOR.dom.element("span"),r.extractContents().appendTo(k),r.insertNode(k),
v.call(this,k),k.remove(!0));r=null}}c.moveToBookmark(p);c.shrink(CKEDITOR.SHRINK_TEXT);c.shrink(CKEDITOR.NODE_ELEMENT,!0)}}function c(a){function b(){for(var a=new CKEDITOR.dom.elementPath(f.getParent()),c=new CKEDITOR.dom.elementPath(n.getParent()),d=null,g=null,e=0;e<a.elements.length;e++){var h=a.elements[e];if(h==a.block||h==a.blockLimit)break;l.checkElementRemovable(h,!0)&&(d=h)}for(e=0;e<c.elements.length;e++){h=c.elements[e];if(h==c.block||h==c.blockLimit)break;l.checkElementRemovable(h,!0)&&
(g=h)}g&&n.breakParent(g);d&&f.breakParent(d)}a.enlarge(CKEDITOR.ENLARGE_INLINE,1);var c=a.createBookmark(),f=c.startNode,d=this._.definition.alwaysRemoveElement;if(a.collapsed){for(var g=new CKEDITOR.dom.elementPath(f.getParent(),a.root),e,h=0,m;h<g.elements.length&&(m=g.elements[h])&&m!=g.block&&m!=g.blockLimit;h++)if(this.checkElementRemovable(m)){var k;!d&&a.collapsed&&(a.checkBoundaryOfElement(m,CKEDITOR.END)||(k=a.checkBoundaryOfElement(m,CKEDITOR.START)))?(e=m,e.match=k?"start":"end"):(m.mergeSiblings(),
m.is(this.element)?r.call(this,m):x(m,z(this)[m.getName()]))}if(e){d=f;for(h=0;;h++){m=g.elements[h];if(m.equals(e))break;else if(m.match)continue;else m=m.clone();m.append(d);d=m}d["start"==e.match?"insertBefore":"insertAfter"](e)}}else{var n=c.endNode,l=this;b();for(g=f;!g.equals(n);)e=g.getNextSourceNode(),g.type==CKEDITOR.NODE_ELEMENT&&this.checkElementRemovable(g)&&(g.getName()==this.element?r.call(this,g):x(g,z(this)[g.getName()]),e.type==CKEDITOR.NODE_ELEMENT&&e.contains(f)&&(b(),e=f.getNext())),
g=e}a.moveToBookmark(c);a.shrink(CKEDITOR.NODE_ELEMENT,!0)}function d(a){var b=[];a.forEach(function(a){if("true"==a.getAttribute("contenteditable"))return b.push(a),!1},CKEDITOR.NODE_ELEMENT,!0);return b}function l(a){var b=a.getEnclosedNode()||a.getCommonAncestor(!1,!0);(a=(new CKEDITOR.dom.elementPath(b,a.root)).contains(this.element,1))&&!a.isReadOnly()&&u(a,this)}function k(a){var b=a.getCommonAncestor(!0,!0);if(a=(new CKEDITOR.dom.elementPath(b,a.root)).contains(this.element,1)){var b=this._.definition,
c=b.attributes;if(c)for(var f in c)a.removeAttribute(f,c[f]);if(b.styles)for(var d in b.styles)b.styles.hasOwnProperty(d)&&a.removeStyle(d)}}function g(a){var b=a.createBookmark(!0),c=a.createIterator();c.enforceRealBlocks=!0;this._.enterMode&&(c.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR);for(var f,d=a.document,g;f=c.getNextParagraph();)!f.isReadOnly()&&(c.activeFilter?c.activeFilter.check(this):1)&&(g=t(this,d,f),m(f,g));a.moveToBookmark(b)}function h(a){var b=a.createBookmark(1),c=a.createIterator();
c.enforceRealBlocks=!0;c.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR;for(var f,d;f=c.getNextParagraph();)this.checkElementRemovable(f)&&(f.is("pre")?((d=this._.enterMode==CKEDITOR.ENTER_BR?null:a.document.createElement(this._.enterMode==CKEDITOR.ENTER_P?"p":"div"))&&f.copyAttributes(d),m(f,d)):r.call(this,f));a.moveToBookmark(b)}function m(a,b){var c=!b;c&&(b=a.getDocument().createElement("div"),a.copyAttributes(b));var d=b&&b.is("pre"),g=a.is("pre"),e=!d&&g;if(d&&!g){g=b;(e=a.getBogus())&&e.remove();
e=a.getHtml();e=n(e,/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g,"");e=e.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi,"$1");e=e.replace(/([ \t\n\r]+|&nbsp;)/g," ");e=e.replace(/<br\b[^>]*>/gi,"\n");if(CKEDITOR.env.ie){var h=a.getDocument().createElement("div");h.append(g);g.$.outerHTML="\x3cpre\x3e"+e+"\x3c/pre\x3e";g.copyAttributes(h.getFirst());g=h.getFirst().remove()}else g.setHtml(e);b=g}else e?b=p(c?[a.getHtml()]:f(a),b):a.moveChildren(b);b.replace(a);if(d){var c=b,m;(m=c.getPrevious(H))&&m.type==CKEDITOR.NODE_ELEMENT&&
m.is("pre")&&(d=n(m.getHtml(),/\n$/,"")+"\n\n"+n(c.getHtml(),/^\n/,""),CKEDITOR.env.ie?c.$.outerHTML="\x3cpre\x3e"+d+"\x3c/pre\x3e":c.setHtml(d),m.remove())}else c&&q(b)}function f(a){var b=[];n(a.getOuterHtml(),/(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi,function(a,b,c){return b+"\x3c/pre\x3e"+c+"\x3cpre\x3e"}).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi,function(a,c){b.push(c)});return b}function n(a,b,c){var f="",d="";a=a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi,
function(a,b,c){b&&(f=b);c&&(d=c);return""});return f+a.replace(b,c)+d}function p(a,b){var c;1<a.length&&(c=new CKEDITOR.dom.documentFragment(b.getDocument()));for(var f=0;f<a.length;f++){var d=a[f],d=d.replace(/(\r\n|\r)/g,"\n"),d=n(d,/^[ \t]*\n/,""),d=n(d,/\n$/,""),d=n(d,/^[ \t]+|[ \t]+$/g,function(a,b){return 1==a.length?"\x26nbsp;":b?" "+CKEDITOR.tools.repeat("\x26nbsp;",a.length-1):CKEDITOR.tools.repeat("\x26nbsp;",a.length-1)+" "}),d=d.replace(/\n/g,"\x3cbr\x3e"),d=d.replace(/[ \t]{2,}/g,function(a){return CKEDITOR.tools.repeat("\x26nbsp;",
a.length-1)+" "});if(c){var g=b.clone();g.setHtml(d);c.append(g)}else b.setHtml(d)}return c||b}function r(a,b){var c=this._.definition,f=c.attributes,c=c.styles,d=z(this)[a.getName()],g=CKEDITOR.tools.isEmpty(f)&&CKEDITOR.tools.isEmpty(c),e;for(e in f)if("class"!=e&&!this._.definition.fullMatch||a.getAttribute(e)==w(e,f[e]))b&&"data-"==e.slice(0,5)||(g=a.hasAttribute(e),a.removeAttribute(e));for(var h in c)this._.definition.fullMatch&&a.getStyle(h)!=w(h,c[h],!0)||(g=g||!!a.getStyle(h),a.removeStyle(h));
x(a,d,B[a.getName()]);g&&(this._.definition.alwaysRemoveElement?q(a,1):!CKEDITOR.dtd.$block[a.getName()]||this._.enterMode==CKEDITOR.ENTER_BR&&!a.hasAttributes()?q(a):a.renameNode(this._.enterMode==CKEDITOR.ENTER_P?"p":"div"))}function v(a){for(var b=z(this),c=a.getElementsByTag(this.element),f,d=c.count();0<=--d;)f=c.getItem(d),f.isReadOnly()||r.call(this,f,!0);for(var g in b)if(g!=this.element)for(c=a.getElementsByTag(g),d=c.count()-1;0<=d;d--)f=c.getItem(d),f.isReadOnly()||x(f,b[g])}function x(a,
b,c){if(b=b&&b.attributes)for(var f=0;f<b.length;f++){var d=b[f][0],g;if(g=a.getAttribute(d)){var e=b[f][1];(null===e||e.test&&e.test(g)||"string"==typeof e&&g==e)&&a.removeAttribute(d)}}c||q(a)}function q(a,b){if(!a.hasAttributes()||b)if(CKEDITOR.dtd.$block[a.getName()]){var c=a.getPrevious(H),f=a.getNext(H);!c||c.type!=CKEDITOR.NODE_TEXT&&c.isBlockBoundary({br:1})||a.append("br",1);!f||f.type!=CKEDITOR.NODE_TEXT&&f.isBlockBoundary({br:1})||a.append("br");a.remove(!0)}else c=a.getFirst(),f=a.getLast(),
a.remove(!0),c&&(c.type==CKEDITOR.NODE_ELEMENT&&c.mergeSiblings(),f&&!c.equals(f)&&f.type==CKEDITOR.NODE_ELEMENT&&f.mergeSiblings())}function t(a,b,c){var f;f=a.element;"*"==f&&(f="span");f=new CKEDITOR.dom.element(f,b);c&&c.copyAttributes(f);f=u(f,a);b.getCustomData("doc_processing_style")&&f.hasAttribute("id")?f.removeAttribute("id"):b.setCustomData("doc_processing_style",1);return f}function u(a,b){var c=b._.definition,f=c.attributes,c=CKEDITOR.style.getStyleText(c);if(f)for(var d in f)a.setAttribute(d,
f[d]);c&&a.setAttribute("style",c);return a}function A(a,b){for(var c in a)a[c]=a[c].replace(F,function(a,c){return b[c]})}function z(a){if(a._.overrides)return a._.overrides;var b=a._.overrides={},c=a._.definition.overrides;if(c){CKEDITOR.tools.isArray(c)||(c=[c]);for(var f=0;f<c.length;f++){var d=c[f],g,e;"string"==typeof d?g=d.toLowerCase():(g=d.element?d.element.toLowerCase():a.element,e=d.attributes);d=b[g]||(b[g]={});if(e){var d=d.attributes=d.attributes||[],h;for(h in e)d.push([h.toLowerCase(),
e[h]])}}}return b}function w(a,b,c){var f=new CKEDITOR.dom.element("span");f[c?"setStyle":"setAttribute"](a,b);return f[c?"getStyle":"getAttribute"](a)}function C(a,b){function c(a,b){return"font-family"==b.toLowerCase()?a.replace(/["']/g,""):a}"string"==typeof a&&(a=CKEDITOR.tools.parseCssText(a));"string"==typeof b&&(b=CKEDITOR.tools.parseCssText(b,!0));for(var f in a)if(!(f in b)||c(b[f],f)!=c(a[f],f)&&"inherit"!=a[f]&&"inherit"!=b[f])return!1;return!0}function y(a,b,c){var f=a.document,d=a.getRanges();
b=b?this.removeFromRange:this.applyToRange;var g,e;if(a.isFake&&a.isInTable())for(g=[],e=0;e<d.length;e++)g.push(d[e].clone());for(var h=d.createIterator();e=h.getNextRange();)b.call(this,e,c);a.selectRanges(g||d);f.removeCustomData("doc_processing_style")}var B={address:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,p:1,pre:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,time:1,meter:1,menu:1,command:1,keygen:1,output:1,progress:1,details:1,datagrid:1,datalist:1},G={a:1,blockquote:1,
embed:1,hr:1,img:1,li:1,object:1,ol:1,table:1,td:1,tr:1,th:1,ul:1,dl:1,dt:1,dd:1,form:1,audio:1,video:1},E=/\s*(?:;\s*|$)/,F=/#\((.+?)\)/g,I=CKEDITOR.dom.walker.bookmark(0,1),H=CKEDITOR.dom.walker.whitespaces(1);CKEDITOR.style=function(a,b){if("string"==typeof a.type)return new CKEDITOR.style.customHandlers[a.type](a);var c=a.attributes;c&&c.style&&(a.styles=CKEDITOR.tools.extend({},a.styles,CKEDITOR.tools.parseCssText(c.style)),delete c.style);b&&(a=CKEDITOR.tools.clone(a),A(a.attributes,b),A(a.styles,
b));c=this.element=a.element?"string"==typeof a.element?a.element.toLowerCase():a.element:"*";this.type=a.type||(B[c]?CKEDITOR.STYLE_BLOCK:G[c]?CKEDITOR.STYLE_OBJECT:CKEDITOR.STYLE_INLINE);"object"==typeof this.element&&(this.type=CKEDITOR.STYLE_OBJECT);this._={definition:a}};CKEDITOR.style.prototype={apply:function(a){if(a instanceof CKEDITOR.dom.document)return y.call(this,a.getSelection());if(this.checkApplicable(a.elementPath(),a)){var b=this._.enterMode;b||(this._.enterMode=a.activeEnterMode);
y.call(this,a.getSelection(),0,a);this._.enterMode=b}},remove:function(a){if(a instanceof CKEDITOR.dom.document)return y.call(this,a.getSelection(),1);if(this.checkApplicable(a.elementPath(),a)){var b=this._.enterMode;b||(this._.enterMode=a.activeEnterMode);y.call(this,a.getSelection(),1,a);this._.enterMode=b}},applyToRange:function(a){this.applyToRange=this.type==CKEDITOR.STYLE_INLINE?b:this.type==CKEDITOR.STYLE_BLOCK?g:this.type==CKEDITOR.STYLE_OBJECT?l:null;return this.applyToRange(a)},removeFromRange:function(a){this.removeFromRange=
this.type==CKEDITOR.STYLE_INLINE?c:this.type==CKEDITOR.STYLE_BLOCK?h:this.type==CKEDITOR.STYLE_OBJECT?k:null;return this.removeFromRange(a)},applyToObject:function(a){u(a,this)},checkActive:function(a,b){switch(this.type){case CKEDITOR.STYLE_BLOCK:return this.checkElementRemovable(a.block||a.blockLimit,!0,b);case CKEDITOR.STYLE_OBJECT:case CKEDITOR.STYLE_INLINE:for(var c=a.elements,f=0,d;f<c.length;f++)if(d=c[f],this.type!=CKEDITOR.STYLE_INLINE||d!=a.block&&d!=a.blockLimit){if(this.type==CKEDITOR.STYLE_OBJECT){var g=
d.getName();if(!("string"==typeof this.element?g==this.element:g in this.element))continue}if(this.checkElementRemovable(d,!0,b))return!0}}return!1},checkApplicable:function(a,b,c){b&&b instanceof CKEDITOR.filter&&(c=b);if(c&&!c.check(this))return!1;switch(this.type){case CKEDITOR.STYLE_OBJECT:return!!a.contains(this.element);case CKEDITOR.STYLE_BLOCK:return!!a.blockLimit.getDtd()[this.element]}return!0},checkElementMatch:function(a,b){var c=this._.definition;if(!a||!c.ignoreReadonly&&a.isReadOnly())return!1;
var f=a.getName();if("string"==typeof this.element?f==this.element:f in this.element){if(!b&&!a.hasAttributes())return!0;if(f=c._AC)c=f;else{var f={},d=0,g=c.attributes;if(g)for(var e in g)d++,f[e]=g[e];if(e=CKEDITOR.style.getStyleText(c))f.style||d++,f.style=e;f._length=d;c=c._AC=f}if(c._length){for(var h in c)if("_length"!=h)if(f=a.getAttribute(h)||"","style"==h?C(c[h],f):c[h]==f){if(!b)return!0}else if(b)return!1;if(b)return!0}else return!0}return!1},checkElementRemovable:function(a,b,c){if(this.checkElementMatch(a,
b,c))return!0;if(b=z(this)[a.getName()]){var f;if(!(b=b.attributes))return!0;for(c=0;c<b.length;c++)if(f=b[c][0],f=a.getAttribute(f)){var d=b[c][1];if(null===d)return!0;if("string"==typeof d){if(f==d)return!0}else if(d.test(f))return!0}}return!1},buildPreview:function(a){var b=this._.definition,c=[],f=b.element;"bdo"==f&&(f="span");var c=["\x3c",f],d=b.attributes;if(d)for(var g in d)c.push(" ",g,'\x3d"',d[g],'"');(d=CKEDITOR.style.getStyleText(b))&&c.push(' style\x3d"',d,'"');c.push("\x3e",a||b.name,
"\x3c/",f,"\x3e");return c.join("")},getDefinition:function(){return this._.definition}};CKEDITOR.style.getStyleText=function(a){var b=a._ST;if(b)return b;var b=a.styles,c=a.attributes&&a.attributes.style||"",f="";c.length&&(c=c.replace(E,";"));for(var d in b){var g=b[d],e=(d+":"+g).replace(E,";");"inherit"==g?f+=e:c+=e}c.length&&(c=CKEDITOR.tools.normalizeCssText(c,!0));return a._ST=c+f};CKEDITOR.style.customHandlers={};CKEDITOR.style.addCustomHandler=function(a){var b=function(a){this._={definition:a};
this.setup&&this.setup(a)};b.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype),{assignedTo:CKEDITOR.STYLE_OBJECT},a,!0);return this.customHandlers[a.type]=b};var K=CKEDITOR.POSITION_PRECEDING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED,J=CKEDITOR.POSITION_FOLLOWING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED}(),CKEDITOR.styleCommand=function(a,e){this.requiredContent=this.allowedContent=this.style=a;CKEDITOR.tools.extend(this,e,!0)},
CKEDITOR.styleCommand.prototype.exec=function(a){a.focus();this.state==CKEDITOR.TRISTATE_OFF?a.applyStyle(this.style):this.state==CKEDITOR.TRISTATE_ON&&a.removeStyle(this.style)},CKEDITOR.stylesSet=new CKEDITOR.resourceManager("","stylesSet"),CKEDITOR.addStylesSet=CKEDITOR.tools.bind(CKEDITOR.stylesSet.add,CKEDITOR.stylesSet),CKEDITOR.loadStylesSet=function(a,e,b){CKEDITOR.stylesSet.addExternal(a,e,"");CKEDITOR.stylesSet.load(a,b)},CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{attachStyleStateChange:function(a,
e){var b=this._.styleStateChangeCallbacks;b||(b=this._.styleStateChangeCallbacks=[],this.on("selectionChange",function(a){for(var d=0;d<b.length;d++){var e=b[d],k=e.style.checkActive(a.data.path,this)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF;e.fn.call(this,k)}}));b.push({style:a,fn:e})},applyStyle:function(a){a.apply(this)},removeStyle:function(a){a.remove(this)},getStylesSet:function(a){if(this._.stylesDefinitions)a(this._.stylesDefinitions);else{var e=this,b=e.config.stylesCombo_stylesSet||e.config.stylesSet;
if(!1===b)a(null);else if(b instanceof Array)e._.stylesDefinitions=b,a(b);else{b||(b="default");var b=b.split(":"),c=b[0];CKEDITOR.stylesSet.addExternal(c,b[1]?b.slice(1).join(":"):CKEDITOR.getUrl("styles.js"),"");CKEDITOR.stylesSet.load(c,function(b){e._.stylesDefinitions=b[c];a(e._.stylesDefinitions)})}}}}),CKEDITOR.dom.comment=function(a,e){"string"==typeof a&&(a=(e?e.$:document).createComment(a));CKEDITOR.dom.domObject.call(this,a)},CKEDITOR.dom.comment.prototype=new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype,
{type:CKEDITOR.NODE_COMMENT,getOuterHtml:function(){return"\x3c!--"+this.$.nodeValue+"--\x3e"}}),"use strict",function(){var a={},e={},b;for(b in CKEDITOR.dtd.$blockLimit)b in CKEDITOR.dtd.$list||(a[b]=1);for(b in CKEDITOR.dtd.$block)b in CKEDITOR.dtd.$blockLimit||b in CKEDITOR.dtd.$empty||(e[b]=1);CKEDITOR.dom.elementPath=function(b,d){var l=null,k=null,g=[],h=b,m;d=d||b.getDocument().getBody();h||(h=d);do if(h.type==CKEDITOR.NODE_ELEMENT){g.push(h);if(!this.lastElement&&(this.lastElement=h,h.is(CKEDITOR.dtd.$object)||
"false"==h.getAttribute("contenteditable")))continue;if(h.equals(d))break;if(!k&&(m=h.getName(),"true"==h.getAttribute("contenteditable")?k=h:!l&&e[m]&&(l=h),a[m])){if(m=!l&&"div"==m){a:{m=h.getChildren();for(var f=0,n=m.count();f<n;f++){var p=m.getItem(f);if(p.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$block[p.getName()]){m=!0;break a}}m=!1}m=!m}m?l=h:k=h}}while(h=h.getParent());k||(k=d);this.block=l;this.blockLimit=k;this.root=d;this.elements=g}}(),CKEDITOR.dom.elementPath.prototype={compare:function(a){var e=
this.elements;a=a&&a.elements;if(!a||e.length!=a.length)return!1;for(var b=0;b<e.length;b++)if(!e[b].equals(a[b]))return!1;return!0},contains:function(a,e,b){var c=0,d;"string"==typeof a&&(d=function(b){return b.getName()==a});a instanceof CKEDITOR.dom.element?d=function(b){return b.equals(a)}:CKEDITOR.tools.isArray(a)?d=function(b){return-1<CKEDITOR.tools.indexOf(a,b.getName())}:"function"==typeof a?d=a:"object"==typeof a&&(d=function(b){return b.getName()in a});var l=this.elements,k=l.length;e&&
(b?c+=1:--k);b&&(l=Array.prototype.slice.call(l,0),l.reverse());for(;c<k;c++)if(d(l[c]))return l[c];return null},isContextFor:function(a){var e;return a in CKEDITOR.dtd.$block?(e=this.contains(CKEDITOR.dtd.$intermediate)||this.root.equals(this.block)&&this.block||this.blockLimit,!!e.getDtd()[a]):!0},direction:function(){return(this.block||this.blockLimit||this.root).getDirection(1)}},CKEDITOR.dom.text=function(a,e){"string"==typeof a&&(a=(e?e.$:document).createTextNode(a));this.$=a},CKEDITOR.dom.text.prototype=
new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype,{type:CKEDITOR.NODE_TEXT,getLength:function(){return this.$.nodeValue.length},getText:function(){return this.$.nodeValue},setText:function(a){this.$.nodeValue=a},split:function(a){var e=this.$.parentNode,b=e.childNodes.length,c=this.getLength(),d=this.getDocument(),l=new CKEDITOR.dom.text(this.$.splitText(a),d);e.childNodes.length==b&&(a>=c?(l=d.createText(""),l.insertAfter(this)):(a=d.createText(""),a.insertAfter(l),a.remove()));
return l},substring:function(a,e){return"number"!=typeof e?this.$.nodeValue.substr(a):this.$.nodeValue.substring(a,e)}}),function(){function a(a,c,d){var e=a.serializable,k=c[d?"endContainer":"startContainer"],g=d?"endOffset":"startOffset",h=e?c.document.getById(a.startNode):a.startNode;a=e?c.document.getById(a.endNode):a.endNode;k.equals(h.getPrevious())?(c.startOffset=c.startOffset-k.getLength()-a.getPrevious().getLength(),k=a.getNext()):k.equals(a.getPrevious())&&(c.startOffset-=k.getLength(),
k=a.getNext());k.equals(h.getParent())&&c[g]++;k.equals(a.getParent())&&c[g]++;c[d?"endContainer":"startContainer"]=k;return c}CKEDITOR.dom.rangeList=function(a){if(a instanceof CKEDITOR.dom.rangeList)return a;a?a instanceof CKEDITOR.dom.range&&(a=[a]):a=[];return CKEDITOR.tools.extend(a,e)};var e={createIterator:function(){var a=this,c=CKEDITOR.dom.walker.bookmark(),d=[],e;return{getNextRange:function(k){e=void 0===e?0:e+1;var g=a[e];if(g&&1<a.length){if(!e)for(var h=a.length-1;0<=h;h--)d.unshift(a[h].createBookmark(!0));
if(k)for(var m=0;a[e+m+1];){var f=g.document;k=0;h=f.getById(d[m].endNode);for(f=f.getById(d[m+1].startNode);;){h=h.getNextSourceNode(!1);if(f.equals(h))k=1;else if(c(h)||h.type==CKEDITOR.NODE_ELEMENT&&h.isBlockBoundary())continue;break}if(!k)break;m++}for(g.moveToBookmark(d.shift());m--;)h=a[++e],h.moveToBookmark(d.shift()),g.setEnd(h.endContainer,h.endOffset)}return g}}},createBookmarks:function(b){for(var c=[],d,e=0;e<this.length;e++){c.push(d=this[e].createBookmark(b,!0));for(var k=e+1;k<this.length;k++)this[k]=
a(d,this[k]),this[k]=a(d,this[k],!0)}return c},createBookmarks2:function(a){for(var c=[],d=0;d<this.length;d++)c.push(this[d].createBookmark2(a));return c},moveToBookmarks:function(a){for(var c=0;c<this.length;c++)this[c].moveToBookmark(a[c])}}}(),function(){function a(){return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1]||"skins/"+CKEDITOR.skinName.split(",")[0]+"/")}function e(b){var c=CKEDITOR.skin["ua_"+b],d=CKEDITOR.env;if(c)for(var c=c.split(",").sort(function(a,b){return a>b?-1:1}),g=0,
e;g<c.length;g++)if(e=c[g],d.ie&&(e.replace(/^ie/,"")==d.version||d.quirks&&"iequirks"==e)&&(e="ie"),d[e]){b+="_"+c[g];break}return CKEDITOR.getUrl(a()+b+".css")}function b(a,b){l[a]||(CKEDITOR.document.appendStyleSheet(e(a)),l[a]=1);b&&b()}function c(a){var b=a.getById(k);b||(b=a.getHead().append("style"),b.setAttribute("id",k),b.setAttribute("type","text/css"));return b}function d(a,b,c){var d,g,e;if(CKEDITOR.env.webkit)for(b=b.split("}").slice(0,-1),g=0;g<b.length;g++)b[g]=b[g].split("{");for(var h=
0;h<a.length;h++)if(CKEDITOR.env.webkit)for(g=0;g<b.length;g++){e=b[g][1];for(d=0;d<c.length;d++)e=e.replace(c[d][0],c[d][1]);a[h].$.sheet.addRule(b[g][0],e)}else{e=b;for(d=0;d<c.length;d++)e=e.replace(c[d][0],c[d][1]);CKEDITOR.env.ie&&11>CKEDITOR.env.version?a[h].$.styleSheet.cssText+=e:a[h].$.innerHTML+=e}}var l={};CKEDITOR.skin={path:a,loadPart:function(c,f){CKEDITOR.skin.name!=CKEDITOR.skinName.split(",")[0]?CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a()+"skin.js"),function(){b(c,f)}):b(c,f)},
getPath:function(a){return CKEDITOR.getUrl(e(a))},icons:{},addIcon:function(a,b,c,d){a=a.toLowerCase();this.icons[a]||(this.icons[a]={path:b,offset:c||0,bgsize:d||"16px"})},getIconStyle:function(a,b,c,d,g){var e;a&&(a=a.toLowerCase(),b&&(e=this.icons[a+"-rtl"]),e||(e=this.icons[a]));a=c||e&&e.path||"";d=d||e&&e.offset;g=g||e&&e.bgsize||"16px";a&&(a=a.replace(/'/g,"\\'"));return a&&"background-image:url('"+CKEDITOR.getUrl(a)+"');background-position:0 "+d+"px;background-size:"+g+";"}};CKEDITOR.tools.extend(CKEDITOR.editor.prototype,
{getUiColor:function(){return this.uiColor},setUiColor:function(a){var b=c(CKEDITOR.document);return(this.setUiColor=function(a){this.uiColor=a;var c=CKEDITOR.skin.chameleon,e="",m="";"function"==typeof c&&(e=c(this,"editor"),m=c(this,"panel"));a=[[h,a]];d([b],e,a);d(g,m,a)}).call(this,a)}});var k="cke_ui_color",g=[],h=/\$color/g;CKEDITOR.on("instanceLoaded",function(a){if(!CKEDITOR.env.ie||!CKEDITOR.env.quirks){var b=a.editor;a=function(a){a=(a.data[0]||a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
if(!a.getById("cke_ui_color")){a=c(a);g.push(a);var e=b.getUiColor();e&&d([a],CKEDITOR.skin.chameleon(b,"panel"),[[h,e]])}};b.on("panelShow",a);b.on("menuShow",a);b.config.uiColor&&b.setUiColor(b.config.uiColor)}})}(),function(){if(CKEDITOR.env.webkit)CKEDITOR.env.hc=!1;else{var a=CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e',CKEDITOR.document);a.appendTo(CKEDITOR.document.getHead());
try{var e=a.getComputedStyle("border-top-color"),b=a.getComputedStyle("border-right-color");CKEDITOR.env.hc=!(!e||e!=b)}catch(c){CKEDITOR.env.hc=!1}a.remove()}CKEDITOR.env.hc&&(CKEDITOR.env.cssClass+=" cke_hc");CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");CKEDITOR.status="loaded";CKEDITOR.fireOnce("loaded");if(a=CKEDITOR._.pending)for(delete CKEDITOR._.pending,e=0;e<a.length;e++)CKEDITOR.editor.prototype.constructor.apply(a[e][0],a[e][1]),CKEDITOR.add(a[e][0])}(),CKEDITOR.skin.name=
"moono-lisa",CKEDITOR.skin.ua_editor="ie,iequirks,ie8,gecko",CKEDITOR.skin.ua_dialog="ie,iequirks,ie8",CKEDITOR.skin.chameleon=function(){var a=function(){return function(a,c){for(var d=a.match(/[^#]./g),e=0;3>e;e++){var k=e,g;g=parseInt(d[e],16);g=("0"+(0>c?0|g*(1+c):0|g+(255-g)*c).toString(16)).slice(-2);d[k]=g}return"#"+d.join("")}}(),e={editor:new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "),
panel:new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")};
return function(b,c){var d=a(b.uiColor,.4),d={id:"."+b.id,defaultBorder:a(d,-.2),toolbarElementsBorder:a(d,-.25),defaultBackground:d,lightBackground:a(d,.8),darkBackground:a(d,-.15),ckeButtonOn:a(d,.4),ckeResizer:a(d,-.4),ckeColorauto:a(d,.8),dialogBody:a(d,.7),dialogTab:a(d,.65),dialogTabSelected:"#FFF",dialogTabSelectedBorder:"#FFF",elementsPathColor:a(d,-.6),menubuttonHover:a(d,.1),menubuttonIcon:a(d,.5),menubuttonIconHover:a(d,.3)};return e[c].output(d).replace(/\[/g,"{").replace(/\]/g,"}")}}(),
CKEDITOR.plugins.add("dialogui",{onLoad:function(){var a=function(a){this._||(this._={});this._["default"]=this._.initValue=a["default"]||"";this._.required=a.required||!1;for(var b=[this._],c=1;c<arguments.length;c++)b.push(arguments[c]);b.push(!0);CKEDITOR.tools.extend.apply(CKEDITOR.tools,b);return this._},e={build:function(a,b,c){return new CKEDITOR.ui.dialog.textInput(a,b,c)}},b={build:function(a,b,c){return new CKEDITOR.ui.dialog[b.type](a,b,c)}},c={isChanged:function(){return this.getValue()!=
this.getInitValue()},reset:function(a){this.setValue(this.getInitValue(),a)},setInitValue:function(){this._.initValue=this.getValue()},resetInitValue:function(){this._.initValue=this._["default"]},getInitValue:function(){return this._.initValue}},d=CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onChange:function(a,b){this._.domOnChangeRegistered||(a.on("load",function(){this.getInputElement().on("change",function(){a.parts.dialog.isVisible()&&this.fire("change",{value:this.getValue()})},
this)},this),this._.domOnChangeRegistered=!0);this.on("change",b)}},!0),l=/^on([A-Z]\w+)/,k=function(a){for(var b in a)(l.test(b)||"title"==b||"type"==b)&&delete a[b];return a},g=function(a){a=a.data.getKeystroke();a==CKEDITOR.SHIFT+CKEDITOR.ALT+36?this.setDirectionMarker("ltr"):a==CKEDITOR.SHIFT+CKEDITOR.ALT+35&&this.setDirectionMarker("rtl")};CKEDITOR.tools.extend(CKEDITOR.ui.dialog,{labeledElement:function(b,c,f,d){if(!(4>arguments.length)){var g=a.call(this,c);g.labelId=CKEDITOR.tools.getNextId()+
"_label";this._.children=[];var e={role:c.role||"presentation"};c.includeLabel&&(e["aria-labelledby"]=g.labelId);CKEDITOR.ui.dialog.uiElement.call(this,b,c,f,"div",null,e,function(){var a=[],f=c.required?" cke_required":"";"horizontal"!=c.labelLayout?a.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label'+f+'" ',' id\x3d"'+g.labelId+'"',g.inputId?' for\x3d"'+g.inputId+'"':"",(c.labelStyle?' style\x3d"'+c.labelStyle+'"':"")+"\x3e",c.label,"\x3c/label\x3e",'\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
c.controlStyle?' style\x3d"'+c.controlStyle+'"':"",' role\x3d"presentation"\x3e',d.call(this,b,c),"\x3c/div\x3e"):(f={type:"hbox",widths:c.widths,padding:0,children:[{type:"html",html:'\x3clabel class\x3d"cke_dialog_ui_labeled_label'+f+'" id\x3d"'+g.labelId+'" for\x3d"'+g.inputId+'"'+(c.labelStyle?' style\x3d"'+c.labelStyle+'"':"")+"\x3e"+CKEDITOR.tools.htmlEncode(c.label)+"\x3c/label\x3e"},{type:"html",html:'\x3cspan class\x3d"cke_dialog_ui_labeled_content"'+(c.controlStyle?' style\x3d"'+c.controlStyle+
'"':"")+"\x3e"+d.call(this,b,c)+"\x3c/span\x3e"}]},CKEDITOR.dialog._.uiElementBuilders.hbox.build(b,f,a));return a.join("")})}},textInput:function(b,c,f){if(!(3>arguments.length)){a.call(this,c);var d=this._.inputId=CKEDITOR.tools.getNextId()+"_textInput",e={"class":"cke_dialog_ui_input_"+c.type,id:d,type:c.type};c.validate&&(this.validate=c.validate);c.maxLength&&(e.maxlength=c.maxLength);c.size&&(e.size=c.size);c.inputStyle&&(e.style=c.inputStyle);var k=this,l=!1;b.on("load",function(){k.getInputElement().on("keydown",
function(a){13==a.data.getKeystroke()&&(l=!0)});k.getInputElement().on("keyup",function(a){13==a.data.getKeystroke()&&l&&(b.getButton("ok")&&setTimeout(function(){b.getButton("ok").click()},0),l=!1);k.bidi&&g.call(k,a)},null,null,1E3)});CKEDITOR.ui.dialog.labeledElement.call(this,b,c,f,function(){var a=['\x3cdiv class\x3d"cke_dialog_ui_input_',c.type,'" role\x3d"presentation"'];c.width&&a.push('style\x3d"width:'+c.width+'" ');a.push("\x3e\x3cinput ");e["aria-labelledby"]=this._.labelId;this._.required&&
(e["aria-required"]=this._.required);for(var b in e)a.push(b+'\x3d"'+e[b]+'" ');a.push(" /\x3e\x3c/div\x3e");return a.join("")})}},textarea:function(b,c,f){if(!(3>arguments.length)){a.call(this,c);var d=this,e=this._.inputId=CKEDITOR.tools.getNextId()+"_textarea",k={};c.validate&&(this.validate=c.validate);k.rows=c.rows||5;k.cols=c.cols||20;k["class"]="cke_dialog_ui_input_textarea "+(c["class"]||"");"undefined"!=typeof c.inputStyle&&(k.style=c.inputStyle);c.dir&&(k.dir=c.dir);if(d.bidi)b.on("load",
function(){d.getInputElement().on("keyup",g)},d);CKEDITOR.ui.dialog.labeledElement.call(this,b,c,f,function(){k["aria-labelledby"]=this._.labelId;this._.required&&(k["aria-required"]=this._.required);var a=['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"',e,'" '],b;for(b in k)a.push(b+'\x3d"'+CKEDITOR.tools.htmlEncode(k[b])+'" ');a.push("\x3e",CKEDITOR.tools.htmlEncode(d._["default"]),"\x3c/textarea\x3e\x3c/div\x3e");return a.join("")})}},checkbox:function(b,
c,f){if(!(3>arguments.length)){var d=a.call(this,c,{"default":!!c["default"]});c.validate&&(this.validate=c.validate);CKEDITOR.ui.dialog.uiElement.call(this,b,c,f,"span",null,null,function(){var a=CKEDITOR.tools.extend({},c,{id:c.id?c.id+"_checkbox":CKEDITOR.tools.getNextId()+"_checkbox"},!0),f=[],g=CKEDITOR.tools.getNextId()+"_label",e={"class":"cke_dialog_ui_checkbox_input",type:"checkbox","aria-labelledby":g};k(a);c["default"]&&(e.checked="checked");"undefined"!=typeof a.inputStyle&&(a.style=a.inputStyle);
d.checkbox=new CKEDITOR.ui.dialog.uiElement(b,a,f,"input",null,e);f.push(' \x3clabel id\x3d"',g,'" for\x3d"',e.id,'"'+(c.labelStyle?' style\x3d"'+c.labelStyle+'"':"")+"\x3e",CKEDITOR.tools.htmlEncode(c.label),"\x3c/label\x3e");return f.join("")})}},radio:function(b,c,f){if(!(3>arguments.length)){a.call(this,c);this._["default"]||(this._["default"]=this._.initValue=c.items[0][1]);c.validate&&(this.validate=c.validate);var d=[],g=this;c.role="radiogroup";c.includeLabel=!0;CKEDITOR.ui.dialog.labeledElement.call(this,
b,c,f,function(){for(var a=[],f=[],e=(c.id?c.id:CKEDITOR.tools.getNextId())+"_radio",l=0;l<c.items.length;l++){var t=c.items[l],u=void 0!==t[2]?t[2]:t[0],A=void 0!==t[1]?t[1]:t[0],z=CKEDITOR.tools.getNextId()+"_radio_input",w=z+"_label",z=CKEDITOR.tools.extend({},c,{id:z,title:null,type:null},!0),u=CKEDITOR.tools.extend({},z,{title:u},!0),C={type:"radio","class":"cke_dialog_ui_radio_input",name:e,value:A,"aria-labelledby":w},y=[];g._["default"]==A&&(C.checked="checked");k(z);k(u);"undefined"!=typeof z.inputStyle&&
(z.style=z.inputStyle);z.keyboardFocusable=!0;d.push(new CKEDITOR.ui.dialog.uiElement(b,z,y,"input",null,C));y.push(" ");new CKEDITOR.ui.dialog.uiElement(b,u,y,"label",null,{id:w,"for":C.id},t[0]);a.push(y.join(""))}new CKEDITOR.ui.dialog.hbox(b,d,a,f);return f.join("")});this._.children=d}},button:function(b,c,f){if(arguments.length){"function"==typeof c&&(c=c(b.getParentEditor()));a.call(this,c,{disabled:c.disabled||!1});CKEDITOR.event.implementOn(this);var d=this;b.on("load",function(){var a=this.getElement();
(function(){a.on("click",function(a){d.click();a.data.preventDefault()});a.on("keydown",function(a){a.data.getKeystroke()in{32:1}&&(d.click(),a.data.preventDefault())})})();a.unselectable()},this);var g=CKEDITOR.tools.extend({},c);delete g.style;var e=CKEDITOR.tools.getNextId()+"_label";CKEDITOR.ui.dialog.uiElement.call(this,b,g,f,"a",null,{style:c.style,href:"javascript:void(0)",title:c.label,hidefocus:"true","class":c["class"],role:"button","aria-labelledby":e},'\x3cspan id\x3d"'+e+'" class\x3d"cke_dialog_ui_button"\x3e'+
CKEDITOR.tools.htmlEncode(c.label)+"\x3c/span\x3e")}},select:function(b,c,f){if(!(3>arguments.length)){var d=a.call(this,c);c.validate&&(this.validate=c.validate);d.inputId=CKEDITOR.tools.getNextId()+"_select";CKEDITOR.ui.dialog.labeledElement.call(this,b,c,f,function(){var a=CKEDITOR.tools.extend({},c,{id:c.id?c.id+"_select":CKEDITOR.tools.getNextId()+"_select"},!0),f=[],g=[],e={id:d.inputId,"class":"cke_dialog_ui_input_select","aria-labelledby":this._.labelId};f.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
c.type,'" role\x3d"presentation"');c.width&&f.push('style\x3d"width:'+c.width+'" ');f.push("\x3e");void 0!==c.size&&(e.size=c.size);void 0!==c.multiple&&(e.multiple=c.multiple);k(a);for(var l=0,t;l<c.items.length&&(t=c.items[l]);l++)g.push('\x3coption value\x3d"',CKEDITOR.tools.htmlEncode(void 0!==t[1]?t[1]:t[0]).replace(/"/g,"\x26quot;"),'" /\x3e ',CKEDITOR.tools.htmlEncode(t[0]));"undefined"!=typeof a.inputStyle&&(a.style=a.inputStyle);d.select=new CKEDITOR.ui.dialog.uiElement(b,a,f,"select",null,
e,g.join(""));f.push("\x3c/div\x3e");return f.join("")})}},file:function(b,c,f){if(!(3>arguments.length)){void 0===c["default"]&&(c["default"]="");var d=CKEDITOR.tools.extend(a.call(this,c),{definition:c,buttons:[]});c.validate&&(this.validate=c.validate);b.on("load",function(){CKEDITOR.document.getById(d.frameId).getParent().addClass("cke_dialog_ui_input_file")});CKEDITOR.ui.dialog.labeledElement.call(this,b,c,f,function(){d.frameId=CKEDITOR.tools.getNextId()+"_fileInput";var a=['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
d.frameId,'" title\x3d"',c.label,'" src\x3d"javascript:void('];a.push(CKEDITOR.env.ie?"(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"})()":"0");a.push(')"\x3e\x3c/iframe\x3e');return a.join("")})}},fileButton:function(b,c,f){var d=this;if(!(3>arguments.length)){a.call(this,c);c.validate&&(this.validate=c.validate);var g=CKEDITOR.tools.extend({},c),e=g.onClick;g.className=(g.className?g.className+" ":"")+"cke_dialog_ui_button";g.onClick=function(a){var f=
c["for"];a=e?e.call(this,a):!1;!1!==a&&("xhr"!==a&&b.getContentElement(f[0],f[1]).submit(),this.disable())};b.on("load",function(){b.getContentElement(c["for"][0],c["for"][1])._.buttons.push(d)});CKEDITOR.ui.dialog.button.call(this,b,g,f)}},html:function(){var a=/^\s*<[\w:]+\s+([^>]*)?>/,b=/^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,c=/\/$/;return function(d,g,e){if(!(3>arguments.length)){var k=[],l=g.html;"\x3c"!=l.charAt(0)&&(l="\x3cspan\x3e"+l+"\x3c/span\x3e");var q=g.focus;if(q){var t=this.focus;
this.focus=function(){("function"==typeof q?q:t).call(this);this.fire("focus")};g.isFocusable&&(this.isFocusable=this.isFocusable);this.keyboardFocusable=!0}CKEDITOR.ui.dialog.uiElement.call(this,d,g,k,"span",null,null,"");k=k.join("").match(a);l=l.match(b)||["","",""];c.test(l[1])&&(l[1]=l[1].slice(0,-1),l[2]="/"+l[2]);e.push([l[1]," ",k[1]||"",l[2]].join(""))}}}(),fieldset:function(a,b,c,d,g){var e=g.label;this._={children:b};CKEDITOR.ui.dialog.uiElement.call(this,a,g,d,"fieldset",null,null,function(){var a=
[];e&&a.push("\x3clegend"+(g.labelStyle?' style\x3d"'+g.labelStyle+'"':"")+"\x3e"+e+"\x3c/legend\x3e");for(var b=0;b<c.length;b++)a.push(c[b]);return a.join("")})}},!0);CKEDITOR.ui.dialog.html.prototype=new CKEDITOR.ui.dialog.uiElement;CKEDITOR.ui.dialog.labeledElement.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{setLabel:function(a){var b=CKEDITOR.document.getById(this._.labelId);1>b.getChildCount()?(new CKEDITOR.dom.text(a,CKEDITOR.document)).appendTo(b):b.getChild(0).$.nodeValue=
a;return this},getLabel:function(){var a=CKEDITOR.document.getById(this._.labelId);return!a||1>a.getChildCount()?"":a.getChild(0).getText()},eventProcessors:d},!0);CKEDITOR.ui.dialog.button.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{click:function(){return this._.disabled?!1:this.fire("click",{dialog:this._.dialog})},enable:function(){this._.disabled=!1;var a=this.getElement();a&&a.removeClass("cke_disabled")},disable:function(){this._.disabled=!0;this.getElement().addClass("cke_disabled")},
isVisible:function(){return this.getElement().getFirst().isVisible()},isEnabled:function(){return!this._.disabled},eventProcessors:CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onClick:function(a,b){this.on("click",function(){b.apply(this,arguments)})}},!0),accessKeyUp:function(){this.click()},accessKeyDown:function(){this.focus()},keyboardFocusable:!0},!0);CKEDITOR.ui.dialog.textInput.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,{getInputElement:function(){return CKEDITOR.document.getById(this._.inputId)},
focus:function(){var a=this.selectParentTab();setTimeout(function(){var b=a.getInputElement();b&&b.$.focus()},0)},select:function(){var a=this.selectParentTab();setTimeout(function(){var b=a.getInputElement();b&&(b.$.focus(),b.$.select())},0)},accessKeyUp:function(){this.select()},setValue:function(a){if(this.bidi){var b=a&&a.charAt(0);(b="‪"==b?"ltr":"‫"==b?"rtl":null)&&(a=a.slice(1));this.setDirectionMarker(b)}a||(a="");return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this,arguments)},
getValue:function(){var a=CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);if(this.bidi&&a){var b=this.getDirectionMarker();b&&(a=("ltr"==b?"‪":"‫")+a)}return a},setDirectionMarker:function(a){var b=this.getInputElement();a?b.setAttributes({dir:a,"data-cke-dir-marker":a}):this.getDirectionMarker()&&b.removeAttributes(["dir","data-cke-dir-marker"])},getDirectionMarker:function(){return this.getInputElement().data("cke-dir-marker")},keyboardFocusable:!0},c,!0);CKEDITOR.ui.dialog.textarea.prototype=
new CKEDITOR.ui.dialog.textInput;CKEDITOR.ui.dialog.select.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,{getInputElement:function(){return this._.select.getElement()},add:function(a,b,c){var d=new CKEDITOR.dom.element("option",this.getDialog().getParentEditor().document),g=this.getInputElement().$;d.$.text=a;d.$.value=void 0===b||null===b?a:b;void 0===c||null===c?CKEDITOR.env.ie?g.add(d.$):g.add(d.$,null):g.add(d.$,c);return this},remove:function(a){this.getInputElement().$.remove(a);
return this},clear:function(){for(var a=this.getInputElement().$;0<a.length;)a.remove(0);return this},keyboardFocusable:!0},c,!0);CKEDITOR.ui.dialog.checkbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{getInputElement:function(){return this._.checkbox.getElement()},setValue:function(a,b){this.getInputElement().$.checked=a;!b&&this.fire("change",{value:a})},getValue:function(){return this.getInputElement().$.checked},accessKeyUp:function(){this.setValue(!this.getValue())},eventProcessors:{onChange:function(a,
b){if(!CKEDITOR.env.ie||8<CKEDITOR.env.version)return d.onChange.apply(this,arguments);a.on("load",function(){var a=this._.checkbox.getElement();a.on("propertychange",function(b){b=b.data.$;"checked"==b.propertyName&&this.fire("change",{value:a.$.checked})},this)},this);this.on("change",b);return null}},keyboardFocusable:!0},c,!0);CKEDITOR.ui.dialog.radio.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{setValue:function(a,b){for(var c=this._.children,d,g=0;g<c.length&&(d=c[g]);g++)d.getElement().$.checked=
d.getValue()==a;!b&&this.fire("change",{value:a})},getValue:function(){for(var a=this._.children,b=0;b<a.length;b++)if(a[b].getElement().$.checked)return a[b].getValue();return null},accessKeyUp:function(){var a=this._.children,b;for(b=0;b<a.length;b++)if(a[b].getElement().$.checked){a[b].getElement().focus();return}a[0].getElement().focus()},eventProcessors:{onChange:function(a,b){if(!CKEDITOR.env.ie||8<CKEDITOR.env.version)return d.onChange.apply(this,arguments);a.on("load",function(){for(var a=
this._.children,b=this,c=0;c<a.length;c++)a[c].getElement().on("propertychange",function(a){a=a.data.$;"checked"==a.propertyName&&this.$.checked&&b.fire("change",{value:this.getAttribute("value")})})},this);this.on("change",b);return null}}},c,!0);CKEDITOR.ui.dialog.file.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,c,{getInputElement:function(){var a=CKEDITOR.document.getById(this._.frameId).getFrameDocument();return 0<a.$.forms.length?new CKEDITOR.dom.element(a.$.forms[0].elements[0]):
this.getElement()},submit:function(){this.getInputElement().getParent().$.submit();return this},getAction:function(){return this.getInputElement().getParent().$.action},registerEvents:function(a){var b=/^on([A-Z]\w+)/,c,d=function(a,b,c,f){a.on("formLoaded",function(){a.getInputElement().on(c,f,a)})},g;for(g in a)if(c=g.match(b))this.eventProcessors[g]?this.eventProcessors[g].call(this,this._.dialog,a[g]):d(this,this._.dialog,c[1].toLowerCase(),a[g]);return this},reset:function(){function a(){c.$.open();
var h="";d.size&&(h=d.size-(CKEDITOR.env.ie?7:0));var u=b.frameId+"_input";c.$.write(['\x3chtml dir\x3d"'+l+'" lang\x3d"'+q+'"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e','\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"'+l+'" lang\x3d"'+q+'" action\x3d"',CKEDITOR.tools.htmlEncode(d.action),'"\x3e\x3clabel id\x3d"',b.labelId,'" for\x3d"',u,'" style\x3d"display:none"\x3e',CKEDITOR.tools.htmlEncode(d.label),
'\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"',u,'" aria-labelledby\x3d"',b.labelId,'" type\x3d"file" name\x3d"',CKEDITOR.tools.htmlEncode(d.id||"cke_upload"),'" size\x3d"',CKEDITOR.tools.htmlEncode(0<h?h:""),'" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e',CKEDITOR.env.ie?"("+CKEDITOR.tools.fixDomain+")();":"","window.parent.CKEDITOR.tools.callFunction("+e+");","window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction("+k+")}","\x3c/script\x3e"].join(""));
c.$.close();for(h=0;h<g.length;h++)g[h].enable()}var b=this._,c=CKEDITOR.document.getById(b.frameId).getFrameDocument(),d=b.definition,g=b.buttons,e=this.formLoadedNumber,k=this.formUnloadNumber,l=b.dialog._.editor.lang.dir,q=b.dialog._.editor.langCode;e||(e=this.formLoadedNumber=CKEDITOR.tools.addFunction(function(){this.fire("formLoaded")},this),k=this.formUnloadNumber=CKEDITOR.tools.addFunction(function(){this.getInputElement().clearCustomData()},this),this.getDialog()._.editor.on("destroy",function(){CKEDITOR.tools.removeFunction(e);
CKEDITOR.tools.removeFunction(k)}));CKEDITOR.env.gecko?setTimeout(a,500):a()},getValue:function(){return this.getInputElement().$.value||""},setInitValue:function(){this._.initValue=""},eventProcessors:{onChange:function(a,b){this._.domOnChangeRegistered||(this.on("formLoaded",function(){this.getInputElement().on("change",function(){this.fire("change",{value:this.getValue()})},this)},this),this._.domOnChangeRegistered=!0);this.on("change",b)}},keyboardFocusable:!0},!0);CKEDITOR.ui.dialog.fileButton.prototype=
new CKEDITOR.ui.dialog.button;CKEDITOR.ui.dialog.fieldset.prototype=CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);CKEDITOR.dialog.addUIElement("text",e);CKEDITOR.dialog.addUIElement("password",e);CKEDITOR.dialog.addUIElement("textarea",b);CKEDITOR.dialog.addUIElement("checkbox",b);CKEDITOR.dialog.addUIElement("radio",b);CKEDITOR.dialog.addUIElement("button",b);CKEDITOR.dialog.addUIElement("select",b);CKEDITOR.dialog.addUIElement("file",b);CKEDITOR.dialog.addUIElement("fileButton",b);CKEDITOR.dialog.addUIElement("html",
b);CKEDITOR.dialog.addUIElement("fieldset",{build:function(a,b,c){for(var d=b.children,g,e=[],k=[],l=0;l<d.length&&(g=d[l]);l++){var q=[];e.push(q);k.push(CKEDITOR.dialog._.uiElementBuilders[g.type].build(a,g,q))}return new CKEDITOR.ui.dialog[b.type](a,k,e,c,b)}})}}),CKEDITOR.DIALOG_RESIZE_NONE=0,CKEDITOR.DIALOG_RESIZE_WIDTH=1,CKEDITOR.DIALOG_RESIZE_HEIGHT=2,CKEDITOR.DIALOG_RESIZE_BOTH=3,CKEDITOR.DIALOG_STATE_IDLE=1,CKEDITOR.DIALOG_STATE_BUSY=2,function(){function a(){for(var a=this._.tabIdList.length,
b=CKEDITOR.tools.indexOf(this._.tabIdList,this._.currentTabId)+a,c=b-1;c>b-a;c--)if(this._.tabs[this._.tabIdList[c%a]][0].$.offsetHeight)return this._.tabIdList[c%a];return null}function e(){for(var a=this._.tabIdList.length,b=CKEDITOR.tools.indexOf(this._.tabIdList,this._.currentTabId),c=b+1;c<b+a;c++)if(this._.tabs[this._.tabIdList[c%a]][0].$.offsetHeight)return this._.tabIdList[c%a];return null}function b(a,b){for(var c=a.$.getElementsByTagName("input"),f=0,d=c.length;f<d;f++){var g=new CKEDITOR.dom.element(c[f]);
"text"==g.getAttribute("type").toLowerCase()&&(b?(g.setAttribute("value",g.getCustomData("fake_value")||""),g.removeCustomData("fake_value")):(g.setCustomData("fake_value",g.getAttribute("value")),g.setAttribute("value","")))}}function c(a,b){var c=this.getInputElement();c&&(a?c.removeAttribute("aria-invalid"):c.setAttribute("aria-invalid",!0));a||(this.select?this.select():this.focus());b&&alert(b);this.fire("validated",{valid:a,msg:b})}function d(){var a=this.getInputElement();a&&a.removeAttribute("aria-invalid")}
function l(a){var b=CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog",x).output({id:CKEDITOR.tools.getNextNumber(),editorId:a.id,langDir:a.lang.dir,langCode:a.langCode,editorDialogClass:"cke_editor_"+a.name.replace(/\./g,"\\.")+"_dialog",closeTitle:a.lang.common.close,hidpi:CKEDITOR.env.hidpi?"cke_hidpi":""})),c=b.getChild([0,0,0,0,0]),f=c.getChild(0),d=c.getChild(1);a.plugins.clipboard&&CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c);!CKEDITOR.env.ie||CKEDITOR.env.quirks||
CKEDITOR.env.edge||(a="javascript:void(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"}())",CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"'+a+'" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent()));f.unselectable();d.unselectable();return{element:b,parts:{dialog:b.getChild(0),title:f,close:d,tabs:c.getChild(2),contents:c.getChild([3,0,0,0]),footer:c.getChild([3,0,1,0])}}}function k(a,
b,c){this.element=b;this.focusIndex=c;this.tabIndex=0;this.isFocusable=function(){return!b.getAttribute("disabled")&&b.isVisible()};this.focus=function(){a._.currentFocusIndex=this.focusIndex;this.element.focus()};b.on("keydown",function(a){a.data.getKeystroke()in{32:1,13:1}&&this.fire("click")});b.on("focus",function(){this.fire("mouseover")});b.on("blur",function(){this.fire("mouseout")})}function g(a){function b(){a.layout()}var c=CKEDITOR.document.getWindow();c.on("resize",b);a.on("hide",function(){c.removeListener("resize",
b)})}function h(a,b){this._={dialog:a};CKEDITOR.tools.extend(this,b)}function m(a){function b(c){var k=a.getSize(),l=CKEDITOR.document.getWindow().getViewPaneSize(),m=c.data.$.screenX,n=c.data.$.screenY,q=m-f.x,u=n-f.y;f={x:m,y:n};d.x+=q;d.y+=u;a.move(d.x+h[3]<e?-h[3]:d.x-h[1]>l.width-k.width-e?l.width-k.width+("rtl"==g.lang.dir?0:h[1]):d.x,d.y+h[0]<e?-h[0]:d.y-h[2]>l.height-k.height-e?l.height-k.height+h[2]:d.y,1);c.data.preventDefault()}function c(){CKEDITOR.document.removeListener("mousemove",
b);CKEDITOR.document.removeListener("mouseup",c);if(CKEDITOR.env.ie6Compat){var a=y.getChild(0).getFrameDocument();a.removeListener("mousemove",b);a.removeListener("mouseup",c)}}var f=null,d=null,g=a.getParentEditor(),e=g.config.dialog_magnetDistance,h=CKEDITOR.skin.margins||[0,0,0,0];"undefined"==typeof e&&(e=20);a.parts.title.on("mousedown",function(g){f={x:g.data.$.screenX,y:g.data.$.screenY};CKEDITOR.document.on("mousemove",b);CKEDITOR.document.on("mouseup",c);d=a.getPosition();if(CKEDITOR.env.ie6Compat){var e=
y.getChild(0).getFrameDocument();e.on("mousemove",b);e.on("mouseup",c)}g.data.preventDefault()},a)}function f(a){function b(c){var n="rtl"==g.lang.dir,q=m.width,u=m.height,t=q+(c.data.$.screenX-l.x)*(n?-1:1)*(a._.moved?1:2),p=u+(c.data.$.screenY-l.y)*(a._.moved?1:2),w=a._.element.getFirst(),w=n&&w.getComputedStyle("right"),v=a.getPosition();v.y+p>k.height&&(p=k.height-v.y);(n?w:v.x)+t>k.width&&(t=k.width-(n?w:v.x));if(d==CKEDITOR.DIALOG_RESIZE_WIDTH||d==CKEDITOR.DIALOG_RESIZE_BOTH)q=Math.max(f.minWidth||
0,t-e);if(d==CKEDITOR.DIALOG_RESIZE_HEIGHT||d==CKEDITOR.DIALOG_RESIZE_BOTH)u=Math.max(f.minHeight||0,p-h);a.resize(q,u);a._.moved||a.layout();c.data.preventDefault()}function c(){CKEDITOR.document.removeListener("mouseup",c);CKEDITOR.document.removeListener("mousemove",b);n&&(n.remove(),n=null);if(CKEDITOR.env.ie6Compat){var a=y.getChild(0).getFrameDocument();a.removeListener("mouseup",c);a.removeListener("mousemove",b)}}var f=a.definition,d=f.resizable;if(d!=CKEDITOR.DIALOG_RESIZE_NONE){var g=a.getParentEditor(),
e,h,k,l,m,n,q=CKEDITOR.tools.addFunction(function(f){m=a.getSize();var d=a.parts.contents;d.$.getElementsByTagName("iframe").length&&(n=CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'),d.append(n));h=m.height-a.parts.contents.getSize("height",!(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.quirks));e=m.width-a.parts.contents.getSize("width",1);l={x:f.screenX,y:f.screenY};k=CKEDITOR.document.getWindow().getViewPaneSize();
CKEDITOR.document.on("mousemove",b);CKEDITOR.document.on("mouseup",c);CKEDITOR.env.ie6Compat&&(d=y.getChild(0).getFrameDocument(),d.on("mousemove",b),d.on("mouseup",c));f.preventDefault&&f.preventDefault()});a.on("load",function(){var b="";d==CKEDITOR.DIALOG_RESIZE_WIDTH?b=" cke_resizer_horizontal":d==CKEDITOR.DIALOG_RESIZE_HEIGHT&&(b=" cke_resizer_vertical");b=CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer'+b+" cke_resizer_"+g.lang.dir+'" title\x3d"'+CKEDITOR.tools.htmlEncode(g.lang.common.resize)+
'" onmousedown\x3d"CKEDITOR.tools.callFunction('+q+', event )"\x3e'+("ltr"==g.lang.dir?"◢":"◣")+"\x3c/div\x3e");a.parts.footer.append(b,1)});g.on("destroy",function(){CKEDITOR.tools.removeFunction(q)})}}function n(a){a.data.preventDefault(1)}function p(a){var b=CKEDITOR.document.getWindow(),c=a.config,f=CKEDITOR.skinName||a.config.skin,d=c.dialog_backgroundCoverColor||("moono-lisa"==f?"black":"white"),f=c.dialog_backgroundCoverOpacity,g=c.baseFloatZIndex,c=CKEDITOR.tools.genKey(d,f,g),e=C[c];e?e.show():
(g=['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ',CKEDITOR.env.ie6Compat?"absolute":"fixed","; z-index: ",g,"; top: 0px; left: 0px; ",CKEDITOR.env.ie6Compat?"":"background-color: "+d,'" class\x3d"cke_dialog_background_cover"\x3e'],CKEDITOR.env.ie6Compat&&(d="\x3chtml\x3e\x3cbody style\x3d\\'background-color:"+d+";\\'\x3e\x3c/body\x3e\x3c/html\x3e",g.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'),g.push("void((function(){"+encodeURIComponent("document.open();("+
CKEDITOR.tools.fixDomain+")();document.write( '"+d+"' );document.close();")+"})())"),g.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')),g.push("\x3c/div\x3e"),e=CKEDITOR.dom.element.createFromHtml(g.join("")),e.setOpacity(void 0!==f?f:.5),e.on("keydown",n),e.on("keypress",n),e.on("keyup",n),e.appendTo(CKEDITOR.document.getBody()),C[c]=e);a.focusManager.add(e);y=e;a=function(){var a=b.getViewPaneSize();
e.setStyles({width:a.width+"px",height:a.height+"px"})};var h=function(){var a=b.getScrollPosition(),c=CKEDITOR.dialog._.currentTop;e.setStyles({left:a.x+"px",top:a.y+"px"});if(c){do a=c.getPosition(),c.move(a.x,a.y);while(c=c._.parentDialog)}};w=a;b.on("resize",a);a();CKEDITOR.env.mac&&CKEDITOR.env.webkit||e.focus();if(CKEDITOR.env.ie6Compat){var k=function(){h();arguments.callee.prevScrollHandler.apply(this,arguments)};b.$.setTimeout(function(){k.prevScrollHandler=window.onscroll||function(){};
window.onscroll=k},0);h()}}function r(a){y&&(a.focusManager.remove(y),a=CKEDITOR.document.getWindow(),y.hide(),a.removeListener("resize",w),CKEDITOR.env.ie6Compat&&a.$.setTimeout(function(){window.onscroll=window.onscroll&&window.onscroll.prevScrollHandler||null},0),w=null)}var v=CKEDITOR.tools.cssLength,x='\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog '+
CKEDITOR.env.cssClass+' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
CKEDITOR.dialog=function(b,g){function h(){var a=B._.focusList;a.sort(function(a,b){return a.tabIndex!=b.tabIndex?b.tabIndex-a.tabIndex:a.focusIndex-b.focusIndex});for(var b=a.length,c=0;c<b;c++)a[c].focusIndex=c}function k(a){var b=B._.focusList;a=a||0;if(!(1>b.length)){var c=B._.currentFocusIndex;B._.tabBarMode&&0>a&&(c=0);try{b[c].getInputElement().$.blur()}catch(f){}var d=c,g=1<B._.pageCount;do{d+=a;if(g&&!B._.tabBarMode&&(d==b.length||-1==d)){B._.tabBarMode=!0;B._.tabs[B._.currentTabId][0].focus();
B._.currentFocusIndex=-1;return}d=(d+b.length)%b.length;if(d==c)break}while(a&&!b[d].isFocusable());b[d].focus();"text"==b[d].type&&b[d].select()}}function n(c){if(B==CKEDITOR.dialog._.currentTop){var f=c.data.getKeystroke(),d="rtl"==b.lang.dir,g=[37,38,39,40];y=r=0;if(9==f||f==CKEDITOR.SHIFT+9)k(f==CKEDITOR.SHIFT+9?-1:1),y=1;else if(f==CKEDITOR.ALT+121&&!B._.tabBarMode&&1<B.getPageCount())B._.tabBarMode=!0,B._.tabs[B._.currentTabId][0].focus(),B._.currentFocusIndex=-1,y=1;else if(-1!=CKEDITOR.tools.indexOf(g,
f)&&B._.tabBarMode)f=-1!=CKEDITOR.tools.indexOf([d?39:37,38],f)?a.call(B):e.call(B),B.selectPage(f),B._.tabs[f][0].focus(),y=1;else if(13!=f&&32!=f||!B._.tabBarMode)if(13==f)f=c.data.getTarget(),f.is("a","button","select","textarea")||f.is("input")&&"button"==f.$.type||((f=this.getButton("ok"))&&CKEDITOR.tools.setTimeout(f.click,0,f),y=1),r=1;else if(27==f)(f=this.getButton("cancel"))?CKEDITOR.tools.setTimeout(f.click,0,f):!1!==this.fire("cancel",{hide:!0}).hide&&this.hide(),r=1;else return;else this.selectPage(this._.currentTabId),
this._.tabBarMode=!1,this._.currentFocusIndex=-1,k(1),y=1;u(c)}}function u(a){y?a.data.preventDefault(1):r&&a.data.stopPropagation()}var t=CKEDITOR.dialog._.dialogDefinitions[g],p=CKEDITOR.tools.clone(q),w=b.config.dialog_buttonsOrder||"OS",v=b.lang.dir,A={},y,r;("OS"==w&&CKEDITOR.env.mac||"rtl"==w&&"ltr"==v||"ltr"==w&&"rtl"==v)&&p.buttons.reverse();t=CKEDITOR.tools.extend(t(b),p);t=CKEDITOR.tools.clone(t);t=new z(this,t);p=l(b);this._={editor:b,element:p.element,name:g,contentSize:{width:0,height:0},
size:{width:0,height:0},contents:{},buttons:{},accessKeyMap:{},tabs:{},tabIdList:[],currentTabId:null,currentTabIndex:null,pageCount:0,lastTab:null,tabBarMode:!1,focusList:[],currentFocusIndex:0,hasFocus:!1};this.parts=p.parts;CKEDITOR.tools.setTimeout(function(){b.fire("ariaWidget",this.parts.contents)},0,this);p={position:CKEDITOR.env.ie6Compat?"absolute":"fixed",top:0,visibility:"hidden"};p["rtl"==v?"right":"left"]=0;this.parts.dialog.setStyles(p);CKEDITOR.event.call(this);this.definition=t=CKEDITOR.fire("dialogDefinition",
{name:g,definition:t},b).definition;if(!("removeDialogTabs"in b._)&&b.config.removeDialogTabs){p=b.config.removeDialogTabs.split(";");for(v=0;v<p.length;v++)if(w=p[v].split(":"),2==w.length){var x=w[0];A[x]||(A[x]=[]);A[x].push(w[1])}b._.removeDialogTabs=A}if(b._.removeDialogTabs&&(A=b._.removeDialogTabs[g]))for(v=0;v<A.length;v++)t.removeContents(A[v]);if(t.onLoad)this.on("load",t.onLoad);if(t.onShow)this.on("show",t.onShow);if(t.onHide)this.on("hide",t.onHide);if(t.onOk)this.on("ok",function(a){b.fire("saveSnapshot");
setTimeout(function(){b.fire("saveSnapshot")},0);!1===t.onOk.call(this,a)&&(a.data.hide=!1)});this.state=CKEDITOR.DIALOG_STATE_IDLE;if(t.onCancel)this.on("cancel",function(a){!1===t.onCancel.call(this,a)&&(a.data.hide=!1)});var B=this,O=function(a){var b=B._.contents,c=!1,f;for(f in b)for(var d in b[f])if(c=a.call(this,b[f][d]))return};this.on("ok",function(a){O(function(b){if(b.validate){var f=b.validate(this),d="string"==typeof f||!1===f;d&&(a.data.hide=!1,a.stop());c.call(b,!d,"string"==typeof f?
f:void 0);return d}})},this,null,0);this.on("cancel",function(a){O(function(c){if(c.isChanged())return b.config.dialog_noConfirmCancel||confirm(b.lang.common.confirmCancel)||(a.data.hide=!1),!0})},this,null,0);this.parts.close.on("click",function(a){!1!==this.fire("cancel",{hide:!0}).hide&&this.hide();a.data.preventDefault()},this);this.changeFocus=k;var C=this._.element;b.focusManager.add(C,1);this.on("show",function(){C.on("keydown",n,this);if(CKEDITOR.env.gecko)C.on("keypress",u,this)});this.on("hide",
function(){C.removeListener("keydown",n);CKEDITOR.env.gecko&&C.removeListener("keypress",u);O(function(a){d.apply(a)})});this.on("iframeAdded",function(a){(new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown",n,this,null,0)});this.on("show",function(){h();var a=1<B._.pageCount;b.config.dialog_startupFocusTab&&a?(B._.tabBarMode=!0,B._.tabs[B._.currentTabId][0].focus(),B._.currentFocusIndex=-1):this._.hasFocus||(this._.currentFocusIndex=a?-1:this._.focusList.length-1,t.onFocus?
(a=t.onFocus.call(this))&&a.focus():k(1))},this,null,4294967295);if(CKEDITOR.env.ie6Compat)this.on("load",function(){var a=this.getElement(),b=a.getFirst();b.remove();b.appendTo(a)},this);m(this);f(this);(new CKEDITOR.dom.text(t.title,CKEDITOR.document)).appendTo(this.parts.title);for(v=0;v<t.contents.length;v++)(A=t.contents[v])&&this.addPage(A);this.parts.tabs.on("click",function(a){var b=a.data.getTarget();b.hasClass("cke_dialog_tab")&&(b=b.$.id,this.selectPage(b.substring(4,b.lastIndexOf("_"))),
this._.tabBarMode&&(this._.tabBarMode=!1,this._.currentFocusIndex=-1,k(1)),a.data.preventDefault())},this);v=[];A=CKEDITOR.dialog._.uiElementBuilders.hbox.build(this,{type:"hbox",className:"cke_dialog_footer_buttons",widths:[],children:t.buttons},v).getChild();this.parts.footer.setHtml(v.join(""));for(v=0;v<A.length;v++)this._.buttons[A[v].id]=A[v]};CKEDITOR.dialog.prototype={destroy:function(){this.hide();this._.element.remove()},resize:function(){return function(a,b){this._.contentSize&&this._.contentSize.width==
a&&this._.contentSize.height==b||(CKEDITOR.dialog.fire("resize",{dialog:this,width:a,height:b},this._.editor),this.fire("resize",{width:a,height:b},this._.editor),this.parts.contents.setStyles({width:a+"px",height:b+"px"}),"rtl"==this._.editor.lang.dir&&this._.position&&(this._.position.x=CKEDITOR.document.getWindow().getViewPaneSize().width-this._.contentSize.width-parseInt(this._.element.getFirst().getStyle("right"),10)),this._.contentSize={width:a,height:b})}}(),getSize:function(){var a=this._.element.getFirst();
return{width:a.$.offsetWidth||0,height:a.$.offsetHeight||0}},move:function(a,b,c){var f=this._.element.getFirst(),d="rtl"==this._.editor.lang.dir,g="fixed"==f.getComputedStyle("position");CKEDITOR.env.ie&&f.setStyle("zoom","100%");g&&this._.position&&this._.position.x==a&&this._.position.y==b||(this._.position={x:a,y:b},g||(g=CKEDITOR.document.getWindow().getScrollPosition(),a+=g.x,b+=g.y),d&&(g=this.getSize(),a=CKEDITOR.document.getWindow().getViewPaneSize().width-g.width-a),b={top:(0<b?b:0)+"px"},
b[d?"right":"left"]=(0<a?a:0)+"px",f.setStyles(b),c&&(this._.moved=1))},getPosition:function(){return CKEDITOR.tools.extend({},this._.position)},show:function(){var a=this._.element,b=this.definition;a.getParent()&&a.getParent().equals(CKEDITOR.document.getBody())?a.setStyle("display","block"):a.appendTo(CKEDITOR.document.getBody());this.resize(this._.contentSize&&this._.contentSize.width||b.width||b.minWidth,this._.contentSize&&this._.contentSize.height||b.height||b.minHeight);this.reset();null===
this._.currentTabId&&this.selectPage(this.definition.contents[0].id);null===CKEDITOR.dialog._.currentZIndex&&(CKEDITOR.dialog._.currentZIndex=this._.editor.config.baseFloatZIndex);this._.element.getFirst().setStyle("z-index",CKEDITOR.dialog._.currentZIndex+=10);null===CKEDITOR.dialog._.currentTop?(CKEDITOR.dialog._.currentTop=this,this._.parentDialog=null,p(this._.editor)):(this._.parentDialog=CKEDITOR.dialog._.currentTop,this._.parentDialog.getElement().getFirst().$.style.zIndex-=Math.floor(this._.editor.config.baseFloatZIndex/
2),CKEDITOR.dialog._.currentTop=this);a.on("keydown",G);a.on("keyup",E);this._.hasFocus=!1;for(var c in b.contents)if(b.contents[c]){var a=b.contents[c],f=this._.tabs[a.id],d=a.requiredContent,e=0;if(f){for(var h in this._.contents[a.id]){var k=this._.contents[a.id][h];"hbox"!=k.type&&"vbox"!=k.type&&k.getInputElement()&&(k.requiredContent&&!this._.editor.activeFilter.check(k.requiredContent)?k.disable():(k.enable(),e++))}!e||d&&!this._.editor.activeFilter.check(d)?f[0].addClass("cke_dialog_tab_disabled"):
f[0].removeClass("cke_dialog_tab_disabled")}}CKEDITOR.tools.setTimeout(function(){this.layout();g(this);this.parts.dialog.setStyle("visibility","");this.fireOnce("load",{});CKEDITOR.ui.fire("ready",this);this.fire("show",{});this._.editor.fire("dialogShow",this);this._.parentDialog||this._.editor.focusManager.lock();this.foreach(function(a){a.setInitValue&&a.setInitValue()})},100,this)},layout:function(){var a=this.parts.dialog,b=this.getSize(),c=CKEDITOR.document.getWindow().getViewPaneSize(),f=
(c.width-b.width)/2,d=(c.height-b.height)/2;CKEDITOR.env.ie6Compat||(b.height+(0<d?d:0)>c.height||b.width+(0<f?f:0)>c.width?a.setStyle("position","absolute"):a.setStyle("position","fixed"));this.move(this._.moved?this._.position.x:f,this._.moved?this._.position.y:d)},foreach:function(a){for(var b in this._.contents)for(var c in this._.contents[b])a.call(this,this._.contents[b][c]);return this},reset:function(){var a=function(a){a.reset&&a.reset(1)};return function(){this.foreach(a);return this}}(),
setupContent:function(){var a=arguments;this.foreach(function(b){b.setup&&b.setup.apply(b,a)})},commitContent:function(){var a=arguments;this.foreach(function(b){CKEDITOR.env.ie&&this._.currentFocusIndex==b.focusIndex&&b.getInputElement().$.blur();b.commit&&b.commit.apply(b,a)})},hide:function(){if(this.parts.dialog.isVisible()){this.fire("hide",{});this._.editor.fire("dialogHide",this);this.selectPage(this._.tabIdList[0]);var a=this._.element;a.setStyle("display","none");this.parts.dialog.setStyle("visibility",
"hidden");for(I(this);CKEDITOR.dialog._.currentTop!=this;)CKEDITOR.dialog._.currentTop.hide();if(this._.parentDialog){var b=this._.parentDialog.getElement().getFirst();b.setStyle("z-index",parseInt(b.$.style.zIndex,10)+Math.floor(this._.editor.config.baseFloatZIndex/2))}else r(this._.editor);if(CKEDITOR.dialog._.currentTop=this._.parentDialog)CKEDITOR.dialog._.currentZIndex-=10;else{CKEDITOR.dialog._.currentZIndex=null;a.removeListener("keydown",G);a.removeListener("keyup",E);var c=this._.editor;
c.focus();setTimeout(function(){c.focusManager.unlock();CKEDITOR.env.iOS&&c.window.focus()},0)}delete this._.parentDialog;this.foreach(function(a){a.resetInitValue&&a.resetInitValue()});this.setState(CKEDITOR.DIALOG_STATE_IDLE)}},addPage:function(a){if(!a.requiredContent||this._.editor.filter.check(a.requiredContent)){for(var b=[],c=a.label?' title\x3d"'+CKEDITOR.tools.htmlEncode(a.label)+'"':"",f=CKEDITOR.dialog._.uiElementBuilders.vbox.build(this,{type:"vbox",className:"cke_dialog_page_contents",
children:a.elements,expand:!!a.expand,padding:a.padding,style:a.style||"width: 100%;"},b),d=this._.contents[a.id]={},g=f.getChild(),e=0;f=g.shift();)f.notAllowed||"hbox"==f.type||"vbox"==f.type||e++,d[f.id]=f,"function"==typeof f.getChild&&g.push.apply(g,f.getChild());e||(a.hidden=!0);b=CKEDITOR.dom.element.createFromHtml(b.join(""));b.setAttribute("role","tabpanel");f=CKEDITOR.env;d="cke_"+a.id+"_"+CKEDITOR.tools.getNextNumber();c=CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"',
0<this._.pageCount?" cke_last":"cke_first",c,a.hidden?' style\x3d"display:none"':"",' id\x3d"',d,'"',f.gecko&&!f.hc?"":' href\x3d"javascript:void(0)"',' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e',a.label,"\x3c/a\x3e"].join(""));b.setAttribute("aria-labelledby",d);this._.tabs[a.id]=[c,b];this._.tabIdList.push(a.id);!a.hidden&&this._.pageCount++;this._.lastTab=c;this.updateStyle();b.setAttribute("name",a.id);b.appendTo(this.parts.contents);c.unselectable();this.parts.tabs.append(c);a.accessKey&&
(F(this,this,"CTRL+"+a.accessKey,K,H),this._.accessKeyMap["CTRL+"+a.accessKey]=a.id)}},selectPage:function(a){if(this._.currentTabId!=a&&!this._.tabs[a][0].hasClass("cke_dialog_tab_disabled")&&!1!==this.fire("selectPage",{page:a,currentPage:this._.currentTabId})){for(var c in this._.tabs){var f=this._.tabs[c][0],d=this._.tabs[c][1];c!=a&&(f.removeClass("cke_dialog_tab_selected"),d.hide());d.setAttribute("aria-hidden",c!=a)}var g=this._.tabs[a];g[0].addClass("cke_dialog_tab_selected");CKEDITOR.env.ie6Compat||
CKEDITOR.env.ie7Compat?(b(g[1]),g[1].show(),setTimeout(function(){b(g[1],1)},0)):g[1].show();this._.currentTabId=a;this._.currentTabIndex=CKEDITOR.tools.indexOf(this._.tabIdList,a)}},updateStyle:function(){this.parts.dialog[(1===this._.pageCount?"add":"remove")+"Class"]("cke_single_page")},hidePage:function(b){var c=this._.tabs[b]&&this._.tabs[b][0];c&&1!=this._.pageCount&&c.isVisible()&&(b==this._.currentTabId&&this.selectPage(a.call(this)),c.hide(),this._.pageCount--,this.updateStyle())},showPage:function(a){if(a=
this._.tabs[a]&&this._.tabs[a][0])a.show(),this._.pageCount++,this.updateStyle()},getElement:function(){return this._.element},getName:function(){return this._.name},getContentElement:function(a,b){var c=this._.contents[a];return c&&c[b]},getValueOf:function(a,b){return this.getContentElement(a,b).getValue()},setValueOf:function(a,b,c){return this.getContentElement(a,b).setValue(c)},getButton:function(a){return this._.buttons[a]},click:function(a){return this._.buttons[a].click()},disableButton:function(a){return this._.buttons[a].disable()},
enableButton:function(a){return this._.buttons[a].enable()},getPageCount:function(){return this._.pageCount},getParentEditor:function(){return this._.editor},getSelectedElement:function(){return this.getParentEditor().getSelection().getSelectedElement()},addFocusable:function(a,b){if("undefined"==typeof b)b=this._.focusList.length,this._.focusList.push(new k(this,a,b));else{this._.focusList.splice(b,0,new k(this,a,b));for(var c=b+1;c<this._.focusList.length;c++)this._.focusList[c].focusIndex++}},
setState:function(a){if(this.state!=a){this.state=a;if(a==CKEDITOR.DIALOG_STATE_BUSY){if(!this.parts.spinner){var b=this.getParentEditor().lang.dir,c={attributes:{"class":"cke_dialog_spinner"},styles:{"float":"rtl"==b?"right":"left"}};c.styles["margin-"+("rtl"==b?"left":"right")]="8px";this.parts.spinner=CKEDITOR.document.createElement("div",c);this.parts.spinner.setHtml("\x26#8987;");this.parts.spinner.appendTo(this.parts.title,1)}this.parts.spinner.show();this.getButton("ok").disable()}else a==
CKEDITOR.DIALOG_STATE_IDLE&&(this.parts.spinner&&this.parts.spinner.hide(),this.getButton("ok").enable());this.fire("state",a)}}};CKEDITOR.tools.extend(CKEDITOR.dialog,{add:function(a,b){this._.dialogDefinitions[a]&&"function"!=typeof b||(this._.dialogDefinitions[a]=b)},exists:function(a){return!!this._.dialogDefinitions[a]},getCurrent:function(){return CKEDITOR.dialog._.currentTop},isTabEnabled:function(a,b,c){a=a.config.removeDialogTabs;return!(a&&a.match(new RegExp("(?:^|;)"+b+":"+c+"(?:$|;)",
"i")))},okButton:function(){var a=function(a,b){b=b||{};return CKEDITOR.tools.extend({id:"ok",type:"button",label:a.lang.common.ok,"class":"cke_dialog_ui_button_ok",onClick:function(a){a=a.data.dialog;!1!==a.fire("ok",{hide:!0}).hide&&a.hide()}},b,!0)};a.type="button";a.override=function(b){return CKEDITOR.tools.extend(function(c){return a(c,b)},{type:"button"},!0)};return a}(),cancelButton:function(){var a=function(a,b){b=b||{};return CKEDITOR.tools.extend({id:"cancel",type:"button",label:a.lang.common.cancel,
"class":"cke_dialog_ui_button_cancel",onClick:function(a){a=a.data.dialog;!1!==a.fire("cancel",{hide:!0}).hide&&a.hide()}},b,!0)};a.type="button";a.override=function(b){return CKEDITOR.tools.extend(function(c){return a(c,b)},{type:"button"},!0)};return a}(),addUIElement:function(a,b){this._.uiElementBuilders[a]=b}});CKEDITOR.dialog._={uiElementBuilders:{},dialogDefinitions:{},currentTop:null,currentZIndex:null};CKEDITOR.event.implementOn(CKEDITOR.dialog);CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
var q={resizable:CKEDITOR.DIALOG_RESIZE_BOTH,minWidth:600,minHeight:400,buttons:[CKEDITOR.dialog.okButton,CKEDITOR.dialog.cancelButton]},t=function(a,b,c){for(var f=0,d;d=a[f];f++)if(d.id==b||c&&d[c]&&(d=t(d[c],b,c)))return d;return null},u=function(a,b,c,f,d){if(c){for(var g=0,e;e=a[g];g++){if(e.id==c)return a.splice(g,0,b),b;if(f&&e[f]&&(e=u(e[f],b,c,f,!0)))return e}if(d)return null}a.push(b);return b},A=function(a,b,c){for(var f=0,d;d=a[f];f++){if(d.id==b)return a.splice(f,1);if(c&&d[c]&&(d=A(d[c],
b,c)))return d}return null},z=function(a,b){this.dialog=a;for(var c=b.contents,f=0,d;d=c[f];f++)c[f]=d&&new h(a,d);CKEDITOR.tools.extend(this,b)};z.prototype={getContents:function(a){return t(this.contents,a)},getButton:function(a){return t(this.buttons,a)},addContents:function(a,b){return u(this.contents,a,b)},addButton:function(a,b){return u(this.buttons,a,b)},removeContents:function(a){A(this.contents,a)},removeButton:function(a){A(this.buttons,a)}};h.prototype={get:function(a){return t(this.elements,
a,"children")},add:function(a,b){return u(this.elements,a,b,"children")},remove:function(a){A(this.elements,a,"children")}};var w,C={},y,B={},G=function(a){var b=a.data.$.ctrlKey||a.data.$.metaKey,c=a.data.$.altKey,f=a.data.$.shiftKey,d=String.fromCharCode(a.data.$.keyCode);(b=B[(b?"CTRL+":"")+(c?"ALT+":"")+(f?"SHIFT+":"")+d])&&b.length&&(b=b[b.length-1],b.keydown&&b.keydown.call(b.uiElement,b.dialog,b.key),a.data.preventDefault())},E=function(a){var b=a.data.$.ctrlKey||a.data.$.metaKey,c=a.data.$.altKey,
f=a.data.$.shiftKey,d=String.fromCharCode(a.data.$.keyCode);(b=B[(b?"CTRL+":"")+(c?"ALT+":"")+(f?"SHIFT+":"")+d])&&b.length&&(b=b[b.length-1],b.keyup&&(b.keyup.call(b.uiElement,b.dialog,b.key),a.data.preventDefault()))},F=function(a,b,c,f,d){(B[c]||(B[c]=[])).push({uiElement:a,dialog:b,key:c,keyup:d||a.accessKeyUp,keydown:f||a.accessKeyDown})},I=function(a){for(var b in B){for(var c=B[b],f=c.length-1;0<=f;f--)c[f].dialog!=a&&c[f].uiElement!=a||c.splice(f,1);0===c.length&&delete B[b]}},H=function(a,
b){a._.accessKeyMap[b]&&a.selectPage(a._.accessKeyMap[b])},K=function(){};(function(){CKEDITOR.ui.dialog={uiElement:function(a,b,c,f,d,g,e){if(!(4>arguments.length)){var h=(f.call?f(b):f)||"div",k=["\x3c",h," "],l=(d&&d.call?d(b):d)||{},m=(g&&g.call?g(b):g)||{},n=(e&&e.call?e.call(this,a,b):e)||"",q=this.domId=m.id||CKEDITOR.tools.getNextId()+"_uiElement";b.requiredContent&&!a.getParentEditor().filter.check(b.requiredContent)&&(l.display="none",this.notAllowed=!0);m.id=q;var u={};b.type&&(u["cke_dialog_ui_"+
b.type]=1);b.className&&(u[b.className]=1);b.disabled&&(u.cke_disabled=1);for(var t=m["class"]&&m["class"].split?m["class"].split(" "):[],q=0;q<t.length;q++)t[q]&&(u[t[q]]=1);t=[];for(q in u)t.push(q);m["class"]=t.join(" ");b.title&&(m.title=b.title);u=(b.style||"").split(";");b.align&&(t=b.align,l["margin-left"]="left"==t?0:"auto",l["margin-right"]="right"==t?0:"auto");for(q in l)u.push(q+":"+l[q]);b.hidden&&u.push("display:none");for(q=u.length-1;0<=q;q--)""===u[q]&&u.splice(q,1);0<u.length&&(m.style=
(m.style?m.style+"; ":"")+u.join("; "));for(q in m)k.push(q+'\x3d"'+CKEDITOR.tools.htmlEncode(m[q])+'" ');k.push("\x3e",n,"\x3c/",h,"\x3e");c.push(k.join(""));(this._||(this._={})).dialog=a;"boolean"==typeof b.isChanged&&(this.isChanged=function(){return b.isChanged});"function"==typeof b.isChanged&&(this.isChanged=b.isChanged);"function"==typeof b.setValue&&(this.setValue=CKEDITOR.tools.override(this.setValue,function(a){return function(c){a.call(this,b.setValue.call(this,c))}}));"function"==typeof b.getValue&&
(this.getValue=CKEDITOR.tools.override(this.getValue,function(a){return function(){return b.getValue.call(this,a.call(this))}}));CKEDITOR.event.implementOn(this);this.registerEvents(b);this.accessKeyUp&&this.accessKeyDown&&b.accessKey&&F(this,a,"CTRL+"+b.accessKey);var p=this;a.on("load",function(){var b=p.getInputElement();if(b){var c=p.type in{checkbox:1,ratio:1}&&CKEDITOR.env.ie&&8>CKEDITOR.env.version?"cke_dialog_ui_focused":"";b.on("focus",function(){a._.tabBarMode=!1;a._.hasFocus=!0;p.fire("focus");
c&&this.addClass(c)});b.on("blur",function(){p.fire("blur");c&&this.removeClass(c)})}});CKEDITOR.tools.extend(this,b);this.keyboardFocusable&&(this.tabIndex=b.tabIndex||0,this.focusIndex=a._.focusList.push(this)-1,this.on("focus",function(){a._.currentFocusIndex=p.focusIndex}))}},hbox:function(a,b,c,f,d){if(!(4>arguments.length)){this._||(this._={});var g=this._.children=b,e=d&&d.widths||null,h=d&&d.height||null,k,l={role:"presentation"};d&&d.align&&(l.align=d.align);CKEDITOR.ui.dialog.uiElement.call(this,
a,d||{type:"hbox"},f,"table",{},l,function(){var a=['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e'];for(k=0;k<c.length;k++){var b="cke_dialog_ui_hbox_child",f=[];0===k&&(b="cke_dialog_ui_hbox_first");k==c.length-1&&(b="cke_dialog_ui_hbox_last");a.push('\x3ctd class\x3d"',b,'" role\x3d"presentation" ');e?e[k]&&f.push("width:"+v(e[k])):f.push("width:"+Math.floor(100/c.length)+"%");h&&f.push("height:"+v(h));d&&void 0!==d.padding&&f.push("padding:"+v(d.padding));CKEDITOR.env.ie&&CKEDITOR.env.quirks&&
g[k].align&&f.push("text-align:"+g[k].align);0<f.length&&a.push('style\x3d"'+f.join("; ")+'" ');a.push("\x3e",c[k],"\x3c/td\x3e")}a.push("\x3c/tr\x3e\x3c/tbody\x3e");return a.join("")})}},vbox:function(a,b,c,f,d){if(!(3>arguments.length)){this._||(this._={});var g=this._.children=b,e=d&&d.width||null,h=d&&d.heights||null;CKEDITOR.ui.dialog.uiElement.call(this,a,d||{type:"vbox"},f,"div",null,{role:"presentation"},function(){var b=['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];
b.push('style\x3d"');d&&d.expand&&b.push("height:100%;");b.push("width:"+v(e||"100%"),";");CKEDITOR.env.webkit&&b.push("float:none;");b.push('"');b.push('align\x3d"',CKEDITOR.tools.htmlEncode(d&&d.align||("ltr"==a.getParentEditor().lang.dir?"left":"right")),'" ');b.push("\x3e\x3ctbody\x3e");for(var f=0;f<c.length;f++){var k=[];b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" ');e&&k.push("width:"+v(e||"100%"));h?k.push("height:"+v(h[f])):d&&d.expand&&k.push("height:"+Math.floor(100/c.length)+"%");
d&&void 0!==d.padding&&k.push("padding:"+v(d.padding));CKEDITOR.env.ie&&CKEDITOR.env.quirks&&g[f].align&&k.push("text-align:"+g[f].align);0<k.length&&b.push('style\x3d"',k.join("; "),'" ');b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e',c[f],"\x3c/td\x3e\x3c/tr\x3e")}b.push("\x3c/tbody\x3e\x3c/table\x3e");return b.join("")})}}}})();CKEDITOR.ui.dialog.uiElement.prototype={getElement:function(){return CKEDITOR.document.getById(this.domId)},getInputElement:function(){return this.getElement()},getDialog:function(){return this._.dialog},
setValue:function(a,b){this.getInputElement().setValue(a);!b&&this.fire("change",{value:a});return this},getValue:function(){return this.getInputElement().getValue()},isChanged:function(){return!1},selectParentTab:function(){for(var a=this.getInputElement();(a=a.getParent())&&-1==a.$.className.search("cke_dialog_page_contents"););if(!a)return this;a=a.getAttribute("name");this._.dialog._.currentTabId!=a&&this._.dialog.selectPage(a);return this},focus:function(){this.selectParentTab().getInputElement().focus();
return this},registerEvents:function(a){var b=/^on([A-Z]\w+)/,c,f=function(a,b,c,f){b.on("load",function(){a.getInputElement().on(c,f,a)})},d;for(d in a)if(c=d.match(b))this.eventProcessors[d]?this.eventProcessors[d].call(this,this._.dialog,a[d]):f(this,this._.dialog,c[1].toLowerCase(),a[d]);return this},eventProcessors:{onLoad:function(a,b){a.on("load",b,this)},onShow:function(a,b){a.on("show",b,this)},onHide:function(a,b){a.on("hide",b,this)}},accessKeyDown:function(){this.focus()},accessKeyUp:function(){},
disable:function(){var a=this.getElement();this.getInputElement().setAttribute("disabled","true");a.addClass("cke_disabled")},enable:function(){var a=this.getElement();this.getInputElement().removeAttribute("disabled");a.removeClass("cke_disabled")},isEnabled:function(){return!this.getElement().hasClass("cke_disabled")},isVisible:function(){return this.getInputElement().isVisible()},isFocusable:function(){return this.isEnabled()&&this.isVisible()?!0:!1}};CKEDITOR.ui.dialog.hbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,
{getChild:function(a){if(1>arguments.length)return this._.children.concat();a.splice||(a=[a]);return 2>a.length?this._.children[a[0]]:this._.children[a[0]]&&this._.children[a[0]].getChild?this._.children[a[0]].getChild(a.slice(1,a.length)):null}},!0);CKEDITOR.ui.dialog.vbox.prototype=new CKEDITOR.ui.dialog.hbox;(function(){var a={build:function(a,b,c){for(var f=b.children,d,g=[],e=[],h=0;h<f.length&&(d=f[h]);h++){var k=[];g.push(k);e.push(CKEDITOR.dialog._.uiElementBuilders[d.type].build(a,d,k))}return new CKEDITOR.ui.dialog[b.type](a,
e,g,c,b)}};CKEDITOR.dialog.addUIElement("hbox",a);CKEDITOR.dialog.addUIElement("vbox",a)})();CKEDITOR.dialogCommand=function(a,b){this.dialogName=a;CKEDITOR.tools.extend(this,b,!0)};CKEDITOR.dialogCommand.prototype={exec:function(a){var b=this.tabId;a.openDialog(this.dialogName,function(a){b&&a.selectPage(b)})},canUndo:!1,editorFocus:1};(function(){var a=/^([a]|[^a])+$/,b=/^\d*$/,c=/^\d*(?:\.\d+)?$/,f=/^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,d=/^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
g=/^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;CKEDITOR.VALIDATE_OR=1;CKEDITOR.VALIDATE_AND=2;CKEDITOR.dialog.validate={functions:function(){var a=arguments;return function(){var b=this&&this.getValue?this.getValue():a[0],c,f=CKEDITOR.VALIDATE_AND,d=[],g;for(g=0;g<a.length;g++)if("function"==typeof a[g])d.push(a[g]);else break;g<a.length&&"string"==typeof a[g]&&(c=a[g],g++);g<a.length&&"number"==typeof a[g]&&(f=a[g]);var e=f==CKEDITOR.VALIDATE_AND?!0:!1;for(g=0;g<d.length;g++)e=f==CKEDITOR.VALIDATE_AND?e&&
d[g](b):e||d[g](b);return e?!0:c}},regex:function(a,b){return function(c){c=this&&this.getValue?this.getValue():c;return a.test(c)?!0:b}},notEmpty:function(b){return this.regex(a,b)},integer:function(a){return this.regex(b,a)},number:function(a){return this.regex(c,a)},cssLength:function(a){return this.functions(function(a){return d.test(CKEDITOR.tools.trim(a))},a)},htmlLength:function(a){return this.functions(function(a){return f.test(CKEDITOR.tools.trim(a))},a)},inlineStyle:function(a){return this.functions(function(a){return g.test(CKEDITOR.tools.trim(a))},
a)},equals:function(a,b){return this.functions(function(b){return b==a},b)},notEqual:function(a,b){return this.functions(function(b){return b!=a},b)}};CKEDITOR.on("instanceDestroyed",function(a){if(CKEDITOR.tools.isEmpty(CKEDITOR.instances)){for(var b;b=CKEDITOR.dialog._.currentTop;)b.hide();for(var c in C)C[c].remove();C={}}a=a.editor._.storedDialogs;for(var f in a)a[f].destroy()})})();CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{openDialog:function(a,b){var c=null,f=CKEDITOR.dialog._.dialogDefinitions[a];
null===CKEDITOR.dialog._.currentTop&&p(this);if("function"==typeof f)c=this._.storedDialogs||(this._.storedDialogs={}),c=c[a]||(c[a]=new CKEDITOR.dialog(this,a)),b&&b.call(c,c),c.show();else{if("failed"==f)throw r(this),Error('[CKEDITOR.dialog.openDialog] Dialog "'+a+'" failed when loading definition.');"string"==typeof f&&CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(f),function(){"function"!=typeof CKEDITOR.dialog._.dialogDefinitions[a]&&(CKEDITOR.dialog._.dialogDefinitions[a]="failed");this.openDialog(a,
b)},this,0,1)}CKEDITOR.skin.loadPart("dialog");return c}})}(),CKEDITOR.plugins.add("dialog",{requires:"dialogui",init:function(a){a.on("doubleclick",function(e){e.data.dialog&&a.openDialog(e.data.dialog)},null,null,999)}}),function(){CKEDITOR.plugins.add("a11yhelp",{requires:"dialog",availableLangs:{af:1,ar:1,az:1,bg:1,ca:1,cs:1,cy:1,da:1,de:1,"de-ch":1,el:1,en:1,"en-au":1,"en-gb":1,eo:1,es:1,"es-mx":1,et:1,eu:1,fa:1,fi:1,fo:1,fr:1,"fr-ca":1,gl:1,gu:1,he:1,hi:1,hr:1,hu:1,id:1,it:1,ja:1,km:1,ko:1,
ku:1,lt:1,lv:1,mk:1,mn:1,nb:1,nl:1,no:1,oc:1,pl:1,pt:1,"pt-br":1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,sr:1,"sr-latn":1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,zh:1,"zh-cn":1},init:function(a){var e=this;a.addCommand("a11yHelp",{exec:function(){var b=a.langCode,b=e.availableLangs[b]?b:e.availableLangs[b.replace(/-.*/,"")]?b.replace(/-.*/,""):"en";CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path+"dialogs/lang/"+b+".js"),function(){a.lang.a11yhelp=e.langEntries[b];a.openDialog("a11yHelp")})},modes:{wysiwyg:1,source:1},
readOnly:1,canUndo:!1});a.setKeystroke(CKEDITOR.ALT+48,"a11yHelp");CKEDITOR.dialog.add("a11yHelp",this.path+"dialogs/a11yhelp.js");a.on("ariaEditorHelpLabel",function(b){b.data.label=a.lang.common.editorHelp})}})}(),CKEDITOR.plugins.add("about",{requires:"dialog",init:function(a){var e=a.addCommand("about",new CKEDITOR.dialogCommand("about"));e.modes={wysiwyg:1,source:1};e.canUndo=!1;e.readOnly=1;a.ui.addButton&&a.ui.addButton("About",{label:a.lang.about.dlgTitle,command:"about",toolbar:"about"});
CKEDITOR.dialog.add("about",this.path+"dialogs/about.js")}}),CKEDITOR.plugins.add("basicstyles",{init:function(a){var e=0,b=function(b,d,h,l){if(l){l=new CKEDITOR.style(l);var f=c[h];f.unshift(l);a.attachStyleStateChange(l,function(b){!a.readOnly&&a.getCommand(h).setState(b)});a.addCommand(h,new CKEDITOR.styleCommand(l,{contentForms:f}));a.ui.addButton&&a.ui.addButton(b,{label:d,command:h,toolbar:"basicstyles,"+(e+=10)})}},c={bold:["strong","b",["span",function(a){a=a.styles["font-weight"];return"bold"==
a||700<=+a}]],italic:["em","i",["span",function(a){return"italic"==a.styles["font-style"]}]],underline:["u",["span",function(a){return"underline"==a.styles["text-decoration"]}]],strike:["s","strike",["span",function(a){return"line-through"==a.styles["text-decoration"]}]],subscript:["sub"],superscript:["sup"]},d=a.config,l=a.lang.basicstyles;b("Bold",l.bold,"bold",d.coreStyles_bold);b("Italic",l.italic,"italic",d.coreStyles_italic);b("Underline",l.underline,"underline",d.coreStyles_underline);b("Strike",
l.strike,"strike",d.coreStyles_strike);b("Subscript",l.subscript,"subscript",d.coreStyles_subscript);b("Superscript",l.superscript,"superscript",d.coreStyles_superscript);a.setKeystroke([[CKEDITOR.CTRL+66,"bold"],[CKEDITOR.CTRL+73,"italic"],[CKEDITOR.CTRL+85,"underline"]])}}),CKEDITOR.config.coreStyles_bold={element:"strong",overrides:"b"},CKEDITOR.config.coreStyles_italic={element:"em",overrides:"i"},CKEDITOR.config.coreStyles_underline={element:"u"},CKEDITOR.config.coreStyles_strike={element:"s",
overrides:"strike"},CKEDITOR.config.coreStyles_subscript={element:"sub"},CKEDITOR.config.coreStyles_superscript={element:"sup"},function(){var a={exec:function(a){var b=a.getCommand("blockquote").state,c=a.getSelection(),d=c&&c.getRanges()[0];if(d){var l=c.createBookmarks();if(CKEDITOR.env.ie){var k=l[0].startNode,g=l[0].endNode,h;if(k&&"blockquote"==k.getParent().getName())for(h=k;h=h.getNext();)if(h.type==CKEDITOR.NODE_ELEMENT&&h.isBlockBoundary()){k.move(h,!0);break}if(g&&"blockquote"==g.getParent().getName())for(h=
g;h=h.getPrevious();)if(h.type==CKEDITOR.NODE_ELEMENT&&h.isBlockBoundary()){g.move(h);break}}var m=d.createIterator();m.enlargeBr=a.config.enterMode!=CKEDITOR.ENTER_BR;if(b==CKEDITOR.TRISTATE_OFF){for(k=[];b=m.getNextParagraph();)k.push(b);1>k.length&&(b=a.document.createElement(a.config.enterMode==CKEDITOR.ENTER_P?"p":"div"),g=l.shift(),d.insertNode(b),b.append(new CKEDITOR.dom.text("﻿",a.document)),d.moveToBookmark(g),d.selectNodeContents(b),d.collapse(!0),g=d.createBookmark(),k.push(b),l.unshift(g));
h=k[0].getParent();d=[];for(g=0;g<k.length;g++)b=k[g],h=h.getCommonAncestor(b.getParent());for(b={table:1,tbody:1,tr:1,ol:1,ul:1};b[h.getName()];)h=h.getParent();for(g=null;0<k.length;){for(b=k.shift();!b.getParent().equals(h);)b=b.getParent();b.equals(g)||d.push(b);g=b}for(;0<d.length;)if(b=d.shift(),"blockquote"==b.getName()){for(g=new CKEDITOR.dom.documentFragment(a.document);b.getFirst();)g.append(b.getFirst().remove()),k.push(g.getLast());g.replace(b)}else k.push(b);d=a.document.createElement("blockquote");
for(d.insertBefore(k[0]);0<k.length;)b=k.shift(),d.append(b)}else if(b==CKEDITOR.TRISTATE_ON){g=[];for(h={};b=m.getNextParagraph();){for(k=d=null;b.getParent();){if("blockquote"==b.getParent().getName()){d=b.getParent();k=b;break}b=b.getParent()}d&&k&&!k.getCustomData("blockquote_moveout")&&(g.push(k),CKEDITOR.dom.element.setMarker(h,k,"blockquote_moveout",!0))}CKEDITOR.dom.element.clearAllMarkers(h);b=[];k=[];for(h={};0<g.length;)m=g.shift(),d=m.getParent(),m.getPrevious()?m.getNext()?(m.breakParent(m.getParent()),
k.push(m.getNext())):m.remove().insertAfter(d):m.remove().insertBefore(d),d.getCustomData("blockquote_processed")||(k.push(d),CKEDITOR.dom.element.setMarker(h,d,"blockquote_processed",!0)),b.push(m);CKEDITOR.dom.element.clearAllMarkers(h);for(g=k.length-1;0<=g;g--){d=k[g];a:{h=d;for(var m=0,f=h.getChildCount(),n=void 0;m<f&&(n=h.getChild(m));m++)if(n.type==CKEDITOR.NODE_ELEMENT&&n.isBlockBoundary()){h=!1;break a}h=!0}h&&d.remove()}if(a.config.enterMode==CKEDITOR.ENTER_BR)for(d=!0;b.length;)if(m=b.shift(),
"div"==m.getName()){g=new CKEDITOR.dom.documentFragment(a.document);!d||!m.getPrevious()||m.getPrevious().type==CKEDITOR.NODE_ELEMENT&&m.getPrevious().isBlockBoundary()||g.append(a.document.createElement("br"));for(d=m.getNext()&&!(m.getNext().type==CKEDITOR.NODE_ELEMENT&&m.getNext().isBlockBoundary());m.getFirst();)m.getFirst().remove().appendTo(g);d&&g.append(a.document.createElement("br"));g.replace(m);d=!1}}c.selectBookmarks(l);a.focus()}},refresh:function(a,b){this.setState(a.elementPath(b.block||
b.blockLimit).contains("blockquote",1)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF)},context:"blockquote",allowedContent:"blockquote",requiredContent:"blockquote"};CKEDITOR.plugins.add("blockquote",{init:function(e){e.blockless||(e.addCommand("blockquote",a),e.ui.addButton&&e.ui.addButton("Blockquote",{label:e.lang.blockquote.toolbar,command:"blockquote",toolbar:"blocks,10"}))}})}(),"use strict",function(){function a(a,c){CKEDITOR.tools.extend(this,c,{editor:a,id:"cke-"+CKEDITOR.tools.getUniqueId(),
area:a._.notificationArea});c.type||(this.type="info");this.element=this._createElement();a.plugins.clipboard&&CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element)}function e(a){var c=this;this.editor=a;this.notifications=[];this.element=this._createElement();this._uiBuffer=CKEDITOR.tools.eventsBuffer(10,this._layout,this);this._changeBuffer=CKEDITOR.tools.eventsBuffer(500,this._layout,this);a.on("destroy",function(){c._removeListeners();c.element.remove()})}CKEDITOR.plugins.add("notification",
{init:function(a){function c(a){var b=new CKEDITOR.dom.element("div");b.setStyles({position:"fixed","margin-left":"-9999px"});b.setAttributes({"aria-live":"assertive","aria-atomic":"true"});b.setText(a);CKEDITOR.document.getBody().append(b);setTimeout(function(){b.remove()},100)}a._.notificationArea=new e(a);a.showNotification=function(c,e,k){var g,h;"progress"==e?g=k:h=k;c=new CKEDITOR.plugins.notification(a,{message:c,type:e,progress:g,duration:h});c.show();return c};a.on("key",function(d){if(27==
d.data.keyCode){var e=a._.notificationArea.notifications;e.length&&(c(a.lang.notification.closed),e[e.length-1].hide(),d.cancel())}})}});a.prototype={show:function(){!1!==this.editor.fire("notificationShow",{notification:this})&&(this.area.add(this),this._hideAfterTimeout())},update:function(a){var c=!0;!1===this.editor.fire("notificationUpdate",{notification:this,options:a})&&(c=!1);var d=this.element,e=d.findOne(".cke_notification_message"),k=d.findOne(".cke_notification_progress"),g=a.type;d.removeAttribute("role");
a.progress&&"progress"!=this.type&&(g="progress");g&&(d.removeClass(this._getClass()),d.removeAttribute("aria-label"),this.type=g,d.addClass(this._getClass()),d.setAttribute("aria-label",this.type),"progress"!=this.type||k?"progress"!=this.type&&k&&k.remove():(k=this._createProgressElement(),k.insertBefore(e)));void 0!==a.message&&(this.message=a.message,e.setHtml(this.message));void 0!==a.progress&&(this.progress=a.progress,k&&k.setStyle("width",this._getPercentageProgress()));c&&a.important&&(d.setAttribute("role",
"alert"),this.isVisible()||this.area.add(this));this.duration=a.duration;this._hideAfterTimeout()},hide:function(){!1!==this.editor.fire("notificationHide",{notification:this})&&this.area.remove(this)},isVisible:function(){return 0<=CKEDITOR.tools.indexOf(this.area.notifications,this)},_createElement:function(){var a=this,c,d,e=this.editor.lang.common.close;c=new CKEDITOR.dom.element("div");c.addClass("cke_notification");c.addClass(this._getClass());c.setAttributes({id:this.id,role:"alert","aria-label":this.type});
"progress"==this.type&&c.append(this._createProgressElement());d=new CKEDITOR.dom.element("p");d.addClass("cke_notification_message");d.setHtml(this.message);c.append(d);d=CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"'+e+'" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e');c.append(d);d.on("click",function(){a.editor.focus();a.hide()});return c},_getClass:function(){return"progress"==
this.type?"cke_notification_info":"cke_notification_"+this.type},_createProgressElement:function(){var a=new CKEDITOR.dom.element("span");a.addClass("cke_notification_progress");a.setStyle("width",this._getPercentageProgress());return a},_getPercentageProgress:function(){return Math.round(100*(this.progress||0))+"%"},_hideAfterTimeout:function(){var a=this,c;this._hideTimeoutId&&clearTimeout(this._hideTimeoutId);if("number"==typeof this.duration)c=this.duration;else if("info"==this.type||"success"==
this.type)c="number"==typeof this.editor.config.notification_duration?this.editor.config.notification_duration:5E3;c&&(a._hideTimeoutId=setTimeout(function(){a.hide()},c))}};e.prototype={add:function(a){this.notifications.push(a);this.element.append(a.element);1==this.element.getChildCount()&&(CKEDITOR.document.getBody().append(this.element),this._attachListeners());this._layout()},remove:function(a){var c=CKEDITOR.tools.indexOf(this.notifications,a);0>c||(this.notifications.splice(c,1),a.element.remove(),
this.element.getChildCount()||(this._removeListeners(),this.element.remove()))},_createElement:function(){var a=this.editor,c=a.config,d=new CKEDITOR.dom.element("div");d.addClass("cke_notifications_area");d.setAttribute("id","cke_notifications_area_"+a.name);d.setStyle("z-index",c.baseFloatZIndex-2);return d},_attachListeners:function(){var a=CKEDITOR.document.getWindow(),c=this.editor;a.on("scroll",this._uiBuffer.input);a.on("resize",this._uiBuffer.input);c.on("change",this._changeBuffer.input);
c.on("floatingSpaceLayout",this._layout,this,null,20);c.on("blur",this._layout,this,null,20)},_removeListeners:function(){var a=CKEDITOR.document.getWindow(),c=this.editor;a.removeListener("scroll",this._uiBuffer.input);a.removeListener("resize",this._uiBuffer.input);c.removeListener("change",this._changeBuffer.input);c.removeListener("floatingSpaceLayout",this._layout);c.removeListener("blur",this._layout)},_layout:function(){function a(){c.setStyle("left",t(u+e.width-n-p))}var c=this.element,d=
this.editor,e=d.ui.contentsElement.getClientRect(),k=d.ui.contentsElement.getDocumentPosition(),g,h,m=c.getClientRect(),f,n=this._notificationWidth,p=this._notificationMargin;f=CKEDITOR.document.getWindow();var r=f.getScrollPosition(),v=f.getViewPaneSize(),x=CKEDITOR.document.getBody(),q=x.getDocumentPosition(),t=CKEDITOR.tools.cssLength;n&&p||(f=this.element.getChild(0),n=this._notificationWidth=f.getClientRect().width,p=this._notificationMargin=parseInt(f.getComputedStyle("margin-left"),10)+parseInt(f.getComputedStyle("margin-right"),
10));d.toolbar&&(g=d.ui.space("top"),h=g.getClientRect());g&&g.isVisible()&&h.bottom>e.top&&h.bottom<e.bottom-m.height?c.setStyles({position:"fixed",top:t(h.bottom)}):0<e.top?c.setStyles({position:"absolute",top:t(k.y)}):k.y+e.height-m.height>r.y?c.setStyles({position:"fixed",top:0}):c.setStyles({position:"absolute",top:t(k.y+e.height-m.height)});var u="fixed"==c.getStyle("position")?e.left:"static"!=x.getComputedStyle("position")?k.x-q.x:k.x;e.width<n+p?k.x+n+p>r.x+v.width?a():c.setStyle("left",
t(u)):k.x+n+p>r.x+v.width?c.setStyle("left",t(u)):k.x+e.width/2+n/2+p>r.x+v.width?c.setStyle("left",t(u-k.x+r.x+v.width-n-p)):0>e.left+e.width-n-p?a():0>e.left+e.width/2-n/2?c.setStyle("left",t(u-k.x+r.x)):c.setStyle("left",t(u+e.width/2-n/2-p/2))}};CKEDITOR.plugins.notification=a}(),function(){var a='\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"'+(CKEDITOR.env.gecko&&!CKEDITOR.env.hc?"":" href\x3d\"javascript:void('{titleJs}')\"")+' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"';
CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(a+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(a+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');var a=a+(' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" '+(CKEDITOR.env.ie?'onclick\x3d"return false;" onmouseup':"onclick")+'\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"'),
a=a+'\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e',e=CKEDITOR.addTemplate("buttonArrow",'\x3cspan class\x3d"cke_button_arrow"\x3e'+(CKEDITOR.env.hc?"\x26#9660;":"")+"\x3c/span\x3e"),b=CKEDITOR.addTemplate("button",a);CKEDITOR.plugins.add("button",{beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_BUTTON,
CKEDITOR.ui.button.handler)}});CKEDITOR.UI_BUTTON="button";CKEDITOR.ui.button=function(a){CKEDITOR.tools.extend(this,a,{title:a.label,click:a.click||function(b){b.execCommand(a.command)}});this._={}};CKEDITOR.ui.button.handler={create:function(a){return new CKEDITOR.ui.button(a)}};CKEDITOR.ui.button.prototype={render:function(a,d){function l(){var b=a.mode;b&&(b=this.modes[b]?void 0!==k[b]?k[b]:CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,b=a.readOnly&&!this.readOnly?CKEDITOR.TRISTATE_DISABLED:
b,this.setState(b),this.refresh&&this.refresh())}var k=null,g=CKEDITOR.env,h=this._.id=CKEDITOR.tools.getNextId(),m="",f=this.command,n,p,r;this._.editor=a;var v={id:h,button:this,editor:a,focus:function(){CKEDITOR.document.getById(h).focus()},execute:function(){this.button.click(a)},attach:function(a){this.button.attach(a)}},x=CKEDITOR.tools.addFunction(function(a){if(v.onkey)return a=new CKEDITOR.dom.event(a),!1!==v.onkey(v,a.getKeystroke())}),q=CKEDITOR.tools.addFunction(function(a){var b;v.onfocus&&
(b=!1!==v.onfocus(v,new CKEDITOR.dom.event(a)));return b}),t=0;v.clickFn=n=CKEDITOR.tools.addFunction(function(){t&&(a.unlockSelection(1),t=0);v.execute();g.iOS&&a.focus()});this.modes?(k={},a.on("beforeModeUnload",function(){a.mode&&this._.state!=CKEDITOR.TRISTATE_DISABLED&&(k[a.mode]=this._.state)},this),a.on("activeFilterChange",l,this),a.on("mode",l,this),!this.readOnly&&a.on("readOnly",l,this)):f&&(f=a.getCommand(f))&&(f.on("state",function(){this.setState(f.state)},this),m+=f.state==CKEDITOR.TRISTATE_ON?
"on":f.state==CKEDITOR.TRISTATE_DISABLED?"disabled":"off");var u;if(this.directional)a.on("contentDirChanged",function(b){var f=CKEDITOR.document.getById(this._.id),d=f.getFirst();b=b.data;b!=a.lang.dir?f.addClass("cke_"+b):f.removeClass("cke_ltr").removeClass("cke_rtl");d.setAttribute("style",CKEDITOR.skin.getIconStyle(u,"rtl"==b,this.icon,this.iconOffset))},this);f?(p=a.getCommandKeystroke(f))&&(r=CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard,p)):m+="off";p=this.name||this.command;var A=
null,z=this.icon;u=p;this.icon&&!/\./.test(this.icon)?(u=this.icon,z=null):(this.icon&&(A=this.icon),CKEDITOR.env.hidpi&&this.iconHiDpi&&(A=this.iconHiDpi));A?(CKEDITOR.skin.addIcon(A,A),z=null):A=u;m={id:h,name:p,iconName:u,label:this.label,cls:this.className||"",state:m,ariaDisabled:"disabled"==m?"true":"false",title:this.title+(r?" ("+r.display+")":""),ariaShortcut:r?a.lang.common.keyboardShortcut+" "+r.aria:"",titleJs:g.gecko&&!g.hc?"":(this.title||"").replace("'",""),hasArrow:this.hasArrow?"true":
"false",keydownFn:x,focusFn:q,clickFn:n,style:CKEDITOR.skin.getIconStyle(A,"rtl"==a.lang.dir,z,this.iconOffset),arrowHtml:this.hasArrow?e.output():""};b.output(m,d);if(this.onRender)this.onRender();return v},setState:function(a){if(this._.state==a)return!1;this._.state=a;var b=CKEDITOR.document.getById(this._.id);return b?(b.setState(a,"cke_button"),a==CKEDITOR.TRISTATE_DISABLED?b.setAttribute("aria-disabled",!0):b.removeAttribute("aria-disabled"),this.hasArrow?(a=a==CKEDITOR.TRISTATE_ON?this._.editor.lang.button.selectedLabel.replace(/%1/g,
this.label):this.label,CKEDITOR.document.getById(this._.id+"_label").setText(a)):a==CKEDITOR.TRISTATE_ON?b.setAttribute("aria-pressed",!0):b.removeAttribute("aria-pressed"),!0):!1},getState:function(){return this._.state},toFeature:function(a){if(this._.feature)return this._.feature;var b=this;this.allowedContent||this.requiredContent||!this.command||(b=a.getCommand(this.command)||b);return this._.feature=b}};CKEDITOR.ui.prototype.addButton=function(a,b){this.add(a,CKEDITOR.UI_BUTTON,b)}}(),function(){function a(a){function b(){for(var f=
c(),h=CKEDITOR.tools.clone(a.config.toolbarGroups)||e(a),m=0;m<h.length;m++){var l=h[m];if("/"!=l){"string"==typeof l&&(l=h[m]={name:l});var x,q=l.groups;if(q)for(var t=0;t<q.length;t++)x=q[t],(x=f[x])&&g(l,x);(x=f[l.name])&&g(l,x)}}return h}function c(){var b={},f,g,e;for(f in a.ui.items)g=a.ui.items[f],e=g.toolbar||"others",e=e.split(","),g=e[0],e=parseInt(e[1]||-1,10),b[g]||(b[g]=[]),b[g].push({name:f,order:e});for(g in b)b[g]=b[g].sort(function(a,b){return a.order==b.order?0:0>b.order?-1:0>a.order?
1:a.order<b.order?-1:1});return b}function g(b,c){if(c.length){b.items?b.items.push(a.ui.create("-")):b.items=[];for(var f;f=c.shift();)f="string"==typeof f?f:f.name,m&&-1!=CKEDITOR.tools.indexOf(m,f)||(f=a.ui.create(f))&&a.addFeature(f)&&b.items.push(f)}}function h(a){var b=[],c,f,d;for(c=0;c<a.length;++c)f=a[c],d={},"/"==f?b.push(f):CKEDITOR.tools.isArray(f)?(g(d,CKEDITOR.tools.clone(f)),b.push(d)):f.items&&(g(d,CKEDITOR.tools.clone(f.items)),d.name=f.name,b.push(d));return b}var m=a.config.removeButtons,
m=m&&m.split(","),f=a.config.toolbar;"string"==typeof f&&(f=a.config["toolbar_"+f]);return a.toolbar=f?h(f):b()}function e(a){return a._.toolbarGroups||(a._.toolbarGroups=[{name:"document",groups:["mode","document","doctools"]},{name:"clipboard",groups:["clipboard","undo"]},{name:"editing",groups:["find","selection","spellchecker"]},{name:"forms"},"/",{name:"basicstyles",groups:["basicstyles","cleanup"]},{name:"paragraph",groups:["list","indent","blocks","align","bidi"]},{name:"links"},{name:"insert"},
"/",{name:"styles"},{name:"colors"},{name:"tools"},{name:"others"},{name:"about"}])}var b=function(){this.toolbars=[];this.focusCommandExecuted=!1};b.prototype.focus=function(){for(var a=0,b;b=this.toolbars[a++];)for(var c=0,g;g=b.items[c++];)if(g.focus){g.focus();return}};var c={modes:{wysiwyg:1,source:1},readOnly:1,exec:function(a){a.toolbox&&(a.toolbox.focusCommandExecuted=!0,CKEDITOR.env.ie||CKEDITOR.env.air?setTimeout(function(){a.toolbox.focus()},100):a.toolbox.focus())}};CKEDITOR.plugins.add("toolbar",
{requires:"button",init:function(d){var e,k=function(a,b){var c,f="rtl"==d.lang.dir,n=d.config.toolbarGroupCycling,p=f?37:39,f=f?39:37,n=void 0===n||n;switch(b){case 9:case CKEDITOR.SHIFT+9:for(;!c||!c.items.length;)if(c=9==b?(c?c.next:a.toolbar.next)||d.toolbox.toolbars[0]:(c?c.previous:a.toolbar.previous)||d.toolbox.toolbars[d.toolbox.toolbars.length-1],c.items.length)for(a=c.items[e?c.items.length-1:0];a&&!a.focus;)(a=e?a.previous:a.next)||(c=0);a&&a.focus();return!1;case p:c=a;do c=c.next,!c&&
n&&(c=a.toolbar.items[0]);while(c&&!c.focus);c?c.focus():k(a,9);return!1;case 40:return a.button&&a.button.hasArrow?a.execute():k(a,40==b?p:f),!1;case f:case 38:c=a;do c=c.previous,!c&&n&&(c=a.toolbar.items[a.toolbar.items.length-1]);while(c&&!c.focus);c?c.focus():(e=1,k(a,CKEDITOR.SHIFT+9),e=0);return!1;case 27:return d.focus(),!1;case 13:case 32:return a.execute(),!1}return!0};d.on("uiSpace",function(c){if(c.data.space==d.config.toolbarLocation){c.removeListener();d.toolbox=new b;var e=CKEDITOR.tools.getNextId(),
l=['\x3cspan id\x3d"',e,'" class\x3d"cke_voice_label"\x3e',d.lang.toolbar.toolbars,"\x3c/span\x3e",'\x3cspan id\x3d"'+d.ui.spaceId("toolbox")+'" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"',e,'" onmousedown\x3d"return false;"\x3e'],e=!1!==d.config.toolbarStartupExpanded,f,n;d.config.toolbarCanCollapse&&d.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE&&l.push('\x3cspan class\x3d"cke_toolbox_main"'+(e?"\x3e":' style\x3d"display:none"\x3e'));for(var p=d.toolbox.toolbars,r=a(d),v=r.length,
x=0;x<v;x++){var q,t=0,u,A=r[x],z="/"!==A&&("/"===r[x+1]||x==v-1),w;if(A)if(f&&(l.push("\x3c/span\x3e"),n=f=0),"/"===A)l.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e');else{w=A.items||A;for(var C=0;C<w.length;C++){var y=w[C],B;if(y){var G=function(a){a=a.render(d,l);E=t.items.push(a)-1;0<E&&(a.previous=t.items[E-1],a.previous.next=a);a.toolbar=t;a.onkey=k;a.onfocus=function(){d.toolbox.focusCommandExecuted||d.focus()}};if(y.type==CKEDITOR.UI_SEPARATOR)n=f&&y;else{B=!1!==y.canGroup;
if(!t){q=CKEDITOR.tools.getNextId();t={id:q,items:[]};u=A.name&&(d.lang.toolbar.toolbarGroups[A.name]||A.name);l.push('\x3cspan id\x3d"',q,'" class\x3d"cke_toolbar'+(z?' cke_toolbar_last"':'"'),u?' aria-labelledby\x3d"'+q+'_label"':"",' role\x3d"toolbar"\x3e');u&&l.push('\x3cspan id\x3d"',q,'_label" class\x3d"cke_voice_label"\x3e',u,"\x3c/span\x3e");l.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e');var E=p.push(t)-1;0<E&&(t.previous=p[E-1],t.previous.next=t)}B?f||(l.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'),
f=1):f&&(l.push("\x3c/span\x3e"),f=0);n&&(G(n),n=0);G(y)}}}f&&(l.push("\x3c/span\x3e"),n=f=0);t&&l.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')}}d.config.toolbarCanCollapse&&l.push("\x3c/span\x3e");if(d.config.toolbarCanCollapse&&d.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){var F=CKEDITOR.tools.addFunction(function(){d.execCommand("toolbarCollapse")});d.on("destroy",function(){CKEDITOR.tools.removeFunction(F)});d.addCommand("toolbarCollapse",{readOnly:1,exec:function(a){var b=
a.ui.space("toolbar_collapser"),c=b.getPrevious(),f=a.ui.space("contents"),d=c.getParent(),g=parseInt(f.$.style.height,10),e=d.$.offsetHeight,h=b.hasClass("cke_toolbox_collapser_min");h?(c.show(),b.removeClass("cke_toolbox_collapser_min"),b.setAttribute("title",a.lang.toolbar.toolbarCollapse)):(c.hide(),b.addClass("cke_toolbox_collapser_min"),b.setAttribute("title",a.lang.toolbar.toolbarExpand));b.getFirst().setText(h?"▲":"◀");f.setStyle("height",g-(d.$.offsetHeight-e)+"px");a.fire("resize",{outerHeight:a.container.$.offsetHeight,
contentsHeight:f.$.offsetHeight,outerWidth:a.container.$.offsetWidth})},modes:{wysiwyg:1,source:1}});d.setKeystroke(CKEDITOR.ALT+(CKEDITOR.env.ie||CKEDITOR.env.webkit?189:109),"toolbarCollapse");l.push('\x3ca title\x3d"'+(e?d.lang.toolbar.toolbarCollapse:d.lang.toolbar.toolbarExpand)+'" id\x3d"'+d.ui.spaceId("toolbar_collapser")+'" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');e||l.push(" cke_toolbox_collapser_min");l.push('" onclick\x3d"CKEDITOR.tools.callFunction('+F+')"\x3e','\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e',
"\x3c/a\x3e")}l.push("\x3c/span\x3e");c.data.html+=l.join("")}});d.on("destroy",function(){if(this.toolbox){var a,b=0,c,f,d;for(a=this.toolbox.toolbars;b<a.length;b++)for(f=a[b].items,c=0;c<f.length;c++)d=f[c],d.clickFn&&CKEDITOR.tools.removeFunction(d.clickFn),d.keyDownFn&&CKEDITOR.tools.removeFunction(d.keyDownFn)}});d.on("uiReady",function(){var a=d.ui.space("toolbox");a&&d.focusManager.add(a,1)});d.addCommand("toolbarFocus",c);d.setKeystroke(CKEDITOR.ALT+121,"toolbarFocus");d.ui.add("-",CKEDITOR.UI_SEPARATOR,
{});d.ui.addHandler(CKEDITOR.UI_SEPARATOR,{create:function(){return{render:function(a,b){b.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e');return{}}}}})}});CKEDITOR.ui.prototype.addToolbarGroup=function(a,b,c){var g=e(this.editor),h=0===b,m={name:a};if(c){if(c=CKEDITOR.tools.search(g,function(a){return a.name==c})){!c.groups&&(c.groups=[]);if(b&&(b=CKEDITOR.tools.indexOf(c.groups,b),0<=b)){c.groups.splice(b+1,0,a);return}h?c.groups.splice(0,0,a):c.groups.push(a);
return}b=null}b&&(b=CKEDITOR.tools.indexOf(g,function(a){return a.name==b}));h?g.splice(0,0,a):"number"==typeof b?g.splice(b+1,0,m):g.push(a)}}(),CKEDITOR.UI_SEPARATOR="separator",CKEDITOR.config.toolbarLocation="top","use strict",function(){function a(a,b,c){b.type||(b.type="auto");if(c&&!1===a.fire("beforePaste",b)||!b.dataValue&&b.dataTransfer.isEmpty())return!1;b.dataValue||(b.dataValue="");if(CKEDITOR.env.gecko&&"drop"==b.method&&a.toolbox)a.once("afterPaste",function(){a.toolbox.focus()});return a.fire("paste",
b)}function e(b){function c(){var a=b.editable();if(CKEDITOR.plugins.clipboard.isCustomCopyCutSupported){var d=function(a){b.getSelection().isCollapsed()||(b.readOnly&&"cut"==a.name||B.initPasteDataTransfer(a,b),a.data.preventDefault())};a.on("copy",d);a.on("cut",d);a.on("cut",function(){b.readOnly||b.extractSelectedHtml()},null,null,999)}a.on(B.mainPasteEvent,function(a){"beforepaste"==B.mainPasteEvent&&G||w(a)});"beforepaste"==B.mainPasteEvent&&(a.on("paste",function(a){E||(e(),a.data.preventDefault(),
w(a),k("paste"))}),a.on("contextmenu",h,null,null,0),a.on("beforepaste",function(a){!a.data||a.data.$.ctrlKey||a.data.$.shiftKey||h()},null,null,0));a.on("beforecut",function(){!G&&l(b)});var g;a.attachListener(CKEDITOR.env.ie?a:b.document.getDocumentElement(),"mouseup",function(){g=setTimeout(function(){C()},0)});b.on("destroy",function(){clearTimeout(g)});a.on("keyup",C)}function d(a){return{type:a,canUndo:"cut"==a,startDisabled:!0,fakeKeystroke:"cut"==a?CKEDITOR.CTRL+88:CKEDITOR.CTRL+67,exec:function(){"cut"==
this.type&&l();var a;var c=this.type;if(CKEDITOR.env.ie)a=k(c);else try{a=b.document.$.execCommand(c,!1,null)}catch(d){a=!1}a||b.showNotification(b.lang.clipboard[this.type+"Error"]);return a}}}function g(){return{canUndo:!1,async:!0,fakeKeystroke:CKEDITOR.CTRL+86,exec:function(b,c){function f(c,e){e="undefined"!==typeof e?e:!0;c?(c.method="paste",c.dataTransfer||(c.dataTransfer=B.initPasteDataTransfer()),a(b,c,e)):g&&!b._.forcePasteDialog&&b.showNotification(k,"info",b.config.clipboard_notificationDuration);
b._.forcePasteDialog=!1;b.fire("afterCommandExec",{name:"paste",command:d,returnValue:!!c})}c="undefined"!==typeof c&&null!==c?c:{};var d=this,g="undefined"!==typeof c.notification?c.notification:!0,e=c.type,h=CKEDITOR.tools.keystrokeToString(b.lang.common.keyboard,b.getCommandKeystroke(this)),k="string"===typeof g?g:b.lang.clipboard.pasteNotification.replace(/%1/,'\x3ckbd aria-label\x3d"'+h.aria+'"\x3e'+h.display+"\x3c/kbd\x3e"),h="string"===typeof c?c:c.dataValue;e&&!0!==b.config.forcePasteAsPlainText&&
"allow-word"!==b.config.forcePasteAsPlainText?b._.nextPasteType=e:delete b._.nextPasteType;"string"===typeof h?f({dataValue:h}):b.getClipboardData(f)}}}function e(){E=1;setTimeout(function(){E=0},100)}function h(){G=1;setTimeout(function(){G=0},10)}function k(a){var c=b.document,d=c.getBody(),g=!1,e=function(){g=!0};d.on(a,e);7<CKEDITOR.env.version?c.$.execCommand(a):c.$.selection.createRange().execCommand(a);d.removeListener(a,e);return g}function l(){if(CKEDITOR.env.ie&&!CKEDITOR.env.quirks){var a=
b.getSelection(),c,d,g;a.getType()==CKEDITOR.SELECTION_ELEMENT&&(c=a.getSelectedElement())&&(d=a.getRanges()[0],g=b.document.createText(""),g.insertBefore(c),d.setStartBefore(g),d.setEndAfter(c),a.selectRanges([d]),setTimeout(function(){c.getParent()&&(g.remove(),a.selectElement(c))},0))}}function m(a,c){var d=b.document,g=b.editable(),e=function(a){a.cancel()},h;if(!d.getById("cke_pastebin")){var k=b.getSelection(),l=k.createBookmarks();CKEDITOR.env.ie&&k.root.fire("selectionchange");var n=new CKEDITOR.dom.element(!CKEDITOR.env.webkit&&
!g.is("body")||CKEDITOR.env.ie?"div":"body",d);n.setAttributes({id:"cke_pastebin","data-cke-temp":"1"});var q=0,d=d.getWindow();CKEDITOR.env.webkit?(g.append(n),n.addClass("cke_editable"),g.is("body")||(q="static"!=g.getComputedStyle("position")?g:CKEDITOR.dom.element.get(g.$.offsetParent),q=q.getDocumentPosition().y)):g.getAscendant(CKEDITOR.env.ie?"body":"html",1).append(n);n.setStyles({position:"absolute",top:d.getScrollPosition().y-q+10+"px",width:"1px",height:Math.max(1,d.getViewPaneSize().height-
20)+"px",overflow:"hidden",margin:0,padding:0});CKEDITOR.env.safari&&n.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select","text"));(q=n.getParent().isReadOnly())?(n.setOpacity(0),n.setAttribute("contenteditable",!0)):n.setStyle("ltr"==b.config.contentsLangDirection?"left":"right","-10000px");b.on("selectionChange",e,null,null,0);if(CKEDITOR.env.webkit||CKEDITOR.env.gecko)h=g.once("blur",e,null,null,-100);q&&n.focus();q=new CKEDITOR.dom.range(n);q.selectNodeContents(n);var u=q.select();CKEDITOR.env.ie&&
(h=g.once("blur",function(){b.lockSelection(u)}));var t=CKEDITOR.document.getWindow().getScrollPosition().y;setTimeout(function(){CKEDITOR.env.webkit&&(CKEDITOR.document.getBody().$.scrollTop=t);h&&h.removeListener();CKEDITOR.env.ie&&g.focus();k.selectBookmarks(l);n.remove();var a;CKEDITOR.env.webkit&&(a=n.getFirst())&&a.is&&a.hasClass("Apple-style-span")&&(n=a);b.removeListener("selectionChange",e);c(n.getHtml())},0)}}function A(){if("paste"==B.mainPasteEvent)return b.fire("beforePaste",{type:"auto",
method:"paste"}),!1;b.focus();e();var a=b.focusManager;a.lock();if(b.editable().fire(B.mainPasteEvent)&&!k("paste"))return a.unlock(),!1;a.unlock();return!0}function z(a){if("wysiwyg"==b.mode)switch(a.data.keyCode){case CKEDITOR.CTRL+86:case CKEDITOR.SHIFT+45:a=b.editable();e();"paste"==B.mainPasteEvent&&a.fire("beforepaste");break;case CKEDITOR.CTRL+88:case CKEDITOR.SHIFT+46:b.fire("saveSnapshot"),setTimeout(function(){b.fire("saveSnapshot")},50)}}function w(c){var d={type:"auto",method:"paste",
dataTransfer:B.initPasteDataTransfer(c)};d.dataTransfer.cacheData();var g=!1!==b.fire("beforePaste",d);g&&B.canClipboardApiBeTrusted(d.dataTransfer,b)?(c.data.preventDefault(),setTimeout(function(){a(b,d)},0)):m(c,function(c){d.dataValue=c.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig,"");g&&a(b,d)})}function C(){if("wysiwyg"==b.mode){var a=y("paste");b.getCommand("cut").setState(y("cut"));b.getCommand("copy").setState(y("copy"));b.getCommand("paste").setState(a);b.fire("pasteState",a)}}function y(a){if(F&&
a in{paste:1,cut:1})return CKEDITOR.TRISTATE_DISABLED;if("paste"==a)return CKEDITOR.TRISTATE_OFF;a=b.getSelection();var c=a.getRanges();return a.getType()==CKEDITOR.SELECTION_NONE||1==c.length&&c[0].collapsed?CKEDITOR.TRISTATE_DISABLED:CKEDITOR.TRISTATE_OFF}var B=CKEDITOR.plugins.clipboard,G=0,E=0,F=0;(function(){b.on("key",z);b.on("contentDom",c);b.on("selectionChange",function(a){F=a.data.selection.getRanges()[0].checkReadOnly();C()});if(b.contextMenu){b.contextMenu.addListener(function(a,b){F=
b.getRanges()[0].checkReadOnly();return{cut:y("cut"),copy:y("copy"),paste:y("paste")}});var a=null;b.on("menuShow",function(){a&&(a.removeListener(),a=null);var c=b.contextMenu.findItemByCommandName("paste");c&&c.element&&(a=c.element.on("touchend",function(){b._.forcePasteDialog=!0}))})}if(b.ui.addButton)b.once("instanceReady",function(){b._.pasteButtons&&CKEDITOR.tools.array.forEach(b._.pasteButtons,function(a){if(a=b.ui.get(a))CKEDITOR.document.getById(a._.id).on("touchend",function(){b._.forcePasteDialog=
!0})})})})();(function(){function a(c,d,g,e,h){var k=b.lang.clipboard[d];b.addCommand(d,g);b.ui.addButton&&b.ui.addButton(c,{label:k,command:d,toolbar:"clipboard,"+e});b.addMenuItems&&b.addMenuItem(d,{label:k,command:d,group:"clipboard",order:h})}a("Cut","cut",d("cut"),10,1);a("Copy","copy",d("copy"),20,4);a("Paste","paste",g(),30,8);b._.pasteButtons||(b._.pasteButtons=[]);b._.pasteButtons.push("Paste")})();b.getClipboardData=function(a,c){function d(a){a.removeListener();a.cancel();c(a.data)}function g(a){a.removeListener();
a.cancel();c({type:h,dataValue:a.data.dataValue,dataTransfer:a.data.dataTransfer,method:"paste"})}var e=!1,h="auto";c||(c=a,a=null);b.on("beforePaste",function(a){a.removeListener();e=!0;h=a.data.type},null,null,1E3);b.on("paste",d,null,null,0);!1===A()&&(b.removeListener("paste",d),b._.forcePasteDialog&&e&&b.fire("pasteDialog")?(b.on("pasteDialogCommit",g),b.on("dialogHide",function(a){a.removeListener();a.data.removeListener("pasteDialogCommit",g);a.data._.committed||c(null)})):c(null))}}function b(a){if(CKEDITOR.env.webkit){if(!a.match(/^[^<]*$/g)&&
!a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi))return"html"}else if(CKEDITOR.env.ie){if(!a.match(/^([^<]|<br( ?\/)?>)*$/gi)&&!a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi))return"html"}else if(CKEDITOR.env.gecko){if(!a.match(/^([^<]|<br( ?\/)?>)*$/gi))return"html"}else return"html";return"htmlifiedtext"}function c(a,b){function c(a){return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e",~~(a/2))+(1==a%2?"\x3cbr\x3e":"")}b=b.replace(/\s+/g," ").replace(/> +</g,"\x3e\x3c").replace(/<br ?\/>/gi,
"\x3cbr\x3e");b=b.replace(/<\/?[A-Z]+>/g,function(a){return a.toLowerCase()});if(b.match(/^[^<]$/))return b;CKEDITOR.env.webkit&&-1<b.indexOf("\x3cdiv\x3e")&&(b=b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g,"\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g,"\x3cdiv\x3e\x3c/div\x3e"),b.match(/<div>(<br>|)<\/div>/)&&(b="\x3cp\x3e"+b.replace(/(<div>(<br>|)<\/div>)+/g,function(a){return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length+1)})+"\x3c/p\x3e"),b=b.replace(/<\/div><div>/g,"\x3cbr\x3e"),
b=b.replace(/<\/?div>/g,""));CKEDITOR.env.gecko&&a.enterMode!=CKEDITOR.ENTER_BR&&(CKEDITOR.env.gecko&&(b=b.replace(/^<br><br>$/,"\x3cbr\x3e")),-1<b.indexOf("\x3cbr\x3e\x3cbr\x3e")&&(b="\x3cp\x3e"+b.replace(/(<br>){2,}/g,function(a){return c(a.length/4)})+"\x3c/p\x3e"));return k(a,b)}function d(){function a(){var b={},c;for(c in CKEDITOR.dtd)"$"!=c.charAt(0)&&"div"!=c&&"span"!=c&&(b[c]=1);return b}var b={};return{get:function(c){return"plain-text"==c?b.plainText||(b.plainText=new CKEDITOR.filter("br")):
"semantic-content"==c?((c=b.semanticContent)||(c=new CKEDITOR.filter,c.allow({$1:{elements:a(),attributes:!0,styles:!1,classes:!1}}),c=b.semanticContent=c),c):c?new CKEDITOR.filter(c):null}}}function l(a,b,c){b=CKEDITOR.htmlParser.fragment.fromHtml(b);var d=new CKEDITOR.htmlParser.basicWriter;c.applyTo(b,!0,!1,a.activeEnterMode);b.writeHtml(d);return d.getHtml()}function k(a,b){a.enterMode==CKEDITOR.ENTER_BR?b=b.replace(/(<\/p><p>)+/g,function(a){return CKEDITOR.tools.repeat("\x3cbr\x3e",a.length/
7*2)}).replace(/<\/?p>/g,""):a.enterMode==CKEDITOR.ENTER_DIV&&(b=b.replace(/<(\/)?p>/g,"\x3c$1div\x3e"));return b}function g(a){a.data.preventDefault();a.data.$.dataTransfer.dropEffect="none"}function h(b){var c=CKEDITOR.plugins.clipboard;b.on("contentDom",function(){function d(c,g,e){g.select();a(b,{dataTransfer:e,method:"drop"},1);e.sourceEditor.fire("saveSnapshot");e.sourceEditor.editable().extractHtmlFromRange(c);e.sourceEditor.getSelection().selectRanges([c]);e.sourceEditor.fire("saveSnapshot")}
function g(d,e){d.select();a(b,{dataTransfer:e,method:"drop"},1);c.resetDragDataTransfer()}function e(a,c,d){var g={$:a.data.$,target:a.data.getTarget()};c&&(g.dragRange=c);d&&(g.dropRange=d);!1===b.fire(a.name,g)&&a.data.preventDefault()}function h(a){a.type!=CKEDITOR.NODE_ELEMENT&&(a=a.getParent());return a.getChildCount()}var k=b.editable(),l=CKEDITOR.plugins.clipboard.getDropTarget(b),m=b.ui.space("top"),A=b.ui.space("bottom");c.preventDefaultDropOnElement(m);c.preventDefaultDropOnElement(A);
k.attachListener(l,"dragstart",e);k.attachListener(b,"dragstart",c.resetDragDataTransfer,c,null,1);k.attachListener(b,"dragstart",function(a){c.initDragDataTransfer(a,b)},null,null,2);k.attachListener(b,"dragstart",function(){var a=c.dragRange=b.getSelection().getRanges()[0];CKEDITOR.env.ie&&10>CKEDITOR.env.version&&(c.dragStartContainerChildCount=a?h(a.startContainer):null,c.dragEndContainerChildCount=a?h(a.endContainer):null)},null,null,100);k.attachListener(l,"dragend",e);k.attachListener(b,"dragend",
c.initDragDataTransfer,c,null,1);k.attachListener(b,"dragend",c.resetDragDataTransfer,c,null,100);k.attachListener(l,"dragover",function(a){if(CKEDITOR.env.edge)a.data.preventDefault();else{var b=a.data.getTarget();b&&b.is&&b.is("html")?a.data.preventDefault():CKEDITOR.env.ie&&CKEDITOR.plugins.clipboard.isFileApiSupported&&a.data.$.dataTransfer.types.contains("Files")&&a.data.preventDefault()}});k.attachListener(l,"drop",function(a){if(!a.data.$.defaultPrevented){a.data.preventDefault();var d=a.data.getTarget();
if(!d.isReadOnly()||d.type==CKEDITOR.NODE_ELEMENT&&d.is("html")){var d=c.getRangeAtDropPosition(a,b),g=c.dragRange;d&&e(a,g,d)}}},null,null,9999);k.attachListener(b,"drop",c.initDragDataTransfer,c,null,1);k.attachListener(b,"drop",function(a){if(a=a.data){var e=a.dropRange,h=a.dragRange,k=a.dataTransfer;k.getTransferType(b)==CKEDITOR.DATA_TRANSFER_INTERNAL?setTimeout(function(){c.internalDrop(h,e,k,b)},0):k.getTransferType(b)==CKEDITOR.DATA_TRANSFER_CROSS_EDITORS?d(h,e,k):g(e,k)}},null,null,9999)})}
var m;CKEDITOR.plugins.add("clipboard",{requires:"dialog,notification,toolbar",init:function(a){var g,k=d();a.config.forcePasteAsPlainText?g="plain-text":a.config.pasteFilter?g=a.config.pasteFilter:!CKEDITOR.env.webkit||"pasteFilter"in a.config||(g="semantic-content");a.pasteFilter=k.get(g);e(a);h(a);CKEDITOR.dialog.add("paste",CKEDITOR.getUrl(this.path+"dialogs/paste.js"));if(CKEDITOR.env.gecko){var m=["image/png","image/jpeg","image/gif"],v;a.on("paste",function(b){var c=b.data,d=c.dataTransfer;
if(!c.dataValue&&"paste"==c.method&&d&&1==d.getFilesCount()&&v!=d.id&&(d=d.getFile(0),-1!=CKEDITOR.tools.indexOf(m,d.type))){var g=new FileReader;g.addEventListener("load",function(){b.data.dataValue='\x3cimg src\x3d"'+g.result+'" /\x3e';a.fire("paste",b.data)},!1);g.addEventListener("abort",function(){a.fire("paste",b.data)},!1);g.addEventListener("error",function(){a.fire("paste",b.data)},!1);g.readAsDataURL(d);v=c.dataTransfer.id;b.stop()}},null,null,1)}a.on("paste",function(b){b.data.dataTransfer||
(b.data.dataTransfer=new CKEDITOR.plugins.clipboard.dataTransfer);if(!b.data.dataValue){var c=b.data.dataTransfer,d=c.getData("text/html");if(d)b.data.dataValue=d,b.data.type="html";else if(d=c.getData("text/plain"))b.data.dataValue=a.editable().transformPlainTextToHtml(d),b.data.type="text"}},null,null,1);a.on("paste",function(a){var b=a.data.dataValue,c=CKEDITOR.dtd.$block;-1<b.indexOf("Apple-")&&(b=b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi," "),"html"!=a.data.type&&(b=b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi,
function(a,b){return b.replace(/\t/g,"\x26nbsp;\x26nbsp; \x26nbsp;")})),-1<b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e')&&(a.data.startsWithEOL=1,a.data.preSniffing="html",b=b.replace(/<br class="Apple-interchange-newline">/,"")),b=b.replace(/(<[^>]+) class="Apple-[^"]*"/gi,"$1"));if(b.match(/^<[^<]+cke_(editable|contents)/i)){var d,f,g=new CKEDITOR.dom.element("div");for(g.setHtml(b);1==g.getChildCount()&&(d=g.getFirst())&&d.type==CKEDITOR.NODE_ELEMENT&&(d.hasClass("cke_editable")||
d.hasClass("cke_contents"));)g=f=d;f&&(b=f.getHtml().replace(/<br>$/i,""))}CKEDITOR.env.ie?b=b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g,function(b,d){return d.toLowerCase()in c?(a.data.preSniffing="html","\x3c"+d):b}):CKEDITOR.env.webkit?b=b.replace(/<\/(\w+)><div><br><\/div>$/,function(b,d){return d in c?(a.data.endsWithEOL=1,"\x3c/"+d+"\x3e"):b}):CKEDITOR.env.gecko&&(b=b.replace(/(\s)<br>$/,"$1"));a.data.dataValue=b},null,null,3);a.on("paste",function(d){d=d.data;var g=a._.nextPasteType||d.type,e=d.dataValue,
h,m=a.config.clipboard_defaultContentType||"html",n=d.dataTransfer.getTransferType(a);h="html"==g||"html"==d.preSniffing?"html":b(e);delete a._.nextPasteType;"htmlifiedtext"==h&&(e=c(a.config,e));"text"==g&&"html"==h?e=l(a,e,k.get("plain-text")):n==CKEDITOR.DATA_TRANSFER_EXTERNAL&&a.pasteFilter&&!d.dontFilter&&(e=l(a,e,a.pasteFilter));d.startsWithEOL&&(e='\x3cbr data-cke-eol\x3d"1"\x3e'+e);d.endsWithEOL&&(e+='\x3cbr data-cke-eol\x3d"1"\x3e');"auto"==g&&(g="html"==h||"html"==m?"html":"text");d.type=
g;d.dataValue=e;delete d.preSniffing;delete d.startsWithEOL;delete d.endsWithEOL},null,null,6);a.on("paste",function(b){b=b.data;b.dataValue&&(a.insertHtml(b.dataValue,b.type,b.range),setTimeout(function(){a.fire("afterPaste")},0))},null,null,1E3);a.on("pasteDialog",function(b){setTimeout(function(){a.openDialog("paste",b.data)},0)})}});CKEDITOR.plugins.clipboard={isCustomCopyCutSupported:(!CKEDITOR.env.ie||16<=CKEDITOR.env.version)&&!CKEDITOR.env.iOS,isCustomDataTypesSupported:!CKEDITOR.env.ie||
16<=CKEDITOR.env.version,isFileApiSupported:!CKEDITOR.env.ie||9<CKEDITOR.env.version,mainPasteEvent:CKEDITOR.env.ie&&!CKEDITOR.env.edge?"beforepaste":"paste",addPasteButton:function(a,b,c){a.ui.addButton&&(a.ui.addButton(b,c),a._.pasteButtons||(a._.pasteButtons=[]),a._.pasteButtons.push(b))},canClipboardApiBeTrusted:function(a,b){return a.getTransferType(b)!=CKEDITOR.DATA_TRANSFER_EXTERNAL||CKEDITOR.env.chrome&&!a.isEmpty()||CKEDITOR.env.gecko&&(a.getData("text/html")||a.getFilesCount())||CKEDITOR.env.safari&&
603<=CKEDITOR.env.version&&!CKEDITOR.env.iOS||CKEDITOR.env.edge&&16<=CKEDITOR.env.version?!0:!1},getDropTarget:function(a){var b=a.editable();return CKEDITOR.env.ie&&9>CKEDITOR.env.version||b.isInline()?b:a.document},fixSplitNodesAfterDrop:function(a,b,c,d){function g(a,c,d){var f=a;f.type==CKEDITOR.NODE_TEXT&&(f=a.getParent());if(f.equals(c)&&d!=c.getChildCount())return a=b.startContainer.getChild(b.startOffset-1),c=b.startContainer.getChild(b.startOffset),a&&a.type==CKEDITOR.NODE_TEXT&&c&&c.type==
CKEDITOR.NODE_TEXT&&(d=a.getLength(),a.setText(a.getText()+c.getText()),c.remove(),b.setStart(a,d),b.collapse(!0)),!0}var e=b.startContainer;"number"==typeof d&&"number"==typeof c&&e.type==CKEDITOR.NODE_ELEMENT&&(g(a.startContainer,e,c)||g(a.endContainer,e,d))},isDropRangeAffectedByDragRange:function(a,b){var c=b.startContainer,d=b.endOffset;return a.endContainer.equals(c)&&a.endOffset<=d||a.startContainer.getParent().equals(c)&&a.startContainer.getIndex()<d||a.endContainer.getParent().equals(c)&&
a.endContainer.getIndex()<d?!0:!1},internalDrop:function(b,c,d,g){var e=CKEDITOR.plugins.clipboard,h=g.editable(),k,l;g.fire("saveSnapshot");g.fire("lockSnapshot",{dontUpdate:1});CKEDITOR.env.ie&&10>CKEDITOR.env.version&&this.fixSplitNodesAfterDrop(b,c,e.dragStartContainerChildCount,e.dragEndContainerChildCount);(l=this.isDropRangeAffectedByDragRange(b,c))||(k=b.createBookmark(!1));e=c.clone().createBookmark(!1);l&&(k=b.createBookmark(!1));b=k.startNode;c=k.endNode;l=e.startNode;c&&b.getPosition(l)&
CKEDITOR.POSITION_PRECEDING&&c.getPosition(l)&CKEDITOR.POSITION_FOLLOWING&&l.insertBefore(b);b=g.createRange();b.moveToBookmark(k);h.extractHtmlFromRange(b,1);c=g.createRange();c.moveToBookmark(e);a(g,{dataTransfer:d,method:"drop",range:c},1);g.fire("unlockSnapshot")},getRangeAtDropPosition:function(a,b){var c=a.data.$,d=c.clientX,g=c.clientY,e=b.getSelection(!0).getRanges()[0],h=b.createRange();if(a.data.testRange)return a.data.testRange;if(document.caretRangeFromPoint&&b.document.$.caretRangeFromPoint(d,
g))c=b.document.$.caretRangeFromPoint(d,g),h.setStart(CKEDITOR.dom.node(c.startContainer),c.startOffset),h.collapse(!0);else if(c.rangeParent)h.setStart(CKEDITOR.dom.node(c.rangeParent),c.rangeOffset),h.collapse(!0);else{if(CKEDITOR.env.ie&&8<CKEDITOR.env.version&&e&&b.editable().hasFocus)return e;if(document.body.createTextRange){b.focus();c=b.document.getBody().$.createTextRange();try{for(var k=!1,l=0;20>l&&!k;l++){if(!k)try{c.moveToPoint(d,g-l),k=!0}catch(m){}if(!k)try{c.moveToPoint(d,g+l),k=!0}catch(z){}}if(k){var w=
"cke-temp-"+(new Date).getTime();c.pasteHTML('\x3cspan id\x3d"'+w+'"\x3e​\x3c/span\x3e');var C=b.document.getById(w);h.moveToPosition(C,CKEDITOR.POSITION_BEFORE_START);C.remove()}else{var y=b.document.$.elementFromPoint(d,g),B=new CKEDITOR.dom.element(y),G;if(B.equals(b.editable())||"html"==B.getName())return e&&e.startContainer&&!e.startContainer.equals(b.editable())?e:null;G=B.getClientRect();d<G.left?h.setStartAt(B,CKEDITOR.POSITION_AFTER_START):h.setStartAt(B,CKEDITOR.POSITION_BEFORE_END);h.collapse(!0)}}catch(E){return null}}else return null}return h},
initDragDataTransfer:function(a,b){var c=a.data.$?a.data.$.dataTransfer:null,d=new this.dataTransfer(c,b);"dragstart"===a.name&&d.storeId();c?this.dragData&&d.id==this.dragData.id?d=this.dragData:this.dragData=d:this.dragData?d=this.dragData:this.dragData=d;a.data.dataTransfer=d},resetDragDataTransfer:function(){this.dragData=null},initPasteDataTransfer:function(a,b){if(this.isCustomCopyCutSupported){if(a&&a.data&&a.data.$){var c=a.data.$.clipboardData,d=new this.dataTransfer(c,b);"copy"!==a.name&&
"cut"!==a.name||d.storeId();this.copyCutData&&d.id==this.copyCutData.id?(d=this.copyCutData,d.$=c):this.copyCutData=d;return d}return new this.dataTransfer(null,b)}return new this.dataTransfer(CKEDITOR.env.edge&&a&&a.data.$&&a.data.$.clipboardData||null,b)},preventDefaultDropOnElement:function(a){a&&a.on("dragover",g)}};m=CKEDITOR.plugins.clipboard.isCustomDataTypesSupported?"cke/id":"Text";CKEDITOR.plugins.clipboard.dataTransfer=function(a,b){a&&(this.$=a);this._={metaRegExp:/^<meta.*?>/i,bodyRegExp:/<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i,
fragmentRegExp:/\x3c!--(?:Start|End)Fragment--\x3e/g,data:{},files:[],nativeHtmlCache:"",normalizeType:function(a){a=a.toLowerCase();return"text"==a||"text/plain"==a?"Text":"url"==a?"URL":a}};this._.fallbackDataTransfer=new CKEDITOR.plugins.clipboard.fallbackDataTransfer(this);this.id=this.getData(m);this.id||(this.id="Text"==m?"":"cke-"+CKEDITOR.tools.getUniqueId());b&&(this.sourceEditor=b,this.setData("text/html",b.getSelectedHtml(1)),"Text"==m||this.getData("text/plain")||this.setData("text/plain",
b.getSelection().getSelectedText()))};CKEDITOR.DATA_TRANSFER_INTERNAL=1;CKEDITOR.DATA_TRANSFER_CROSS_EDITORS=2;CKEDITOR.DATA_TRANSFER_EXTERNAL=3;CKEDITOR.plugins.clipboard.dataTransfer.prototype={getData:function(a,b){a=this._.normalizeType(a);var c="text/html"==a&&b?this._.nativeHtmlCache:this._.data[a];if(void 0===c||null===c||""===c){if(this._.fallbackDataTransfer.isRequired())c=this._.fallbackDataTransfer.getData(a,b);else try{c=this.$.getData(a)||""}catch(d){c=""}"text/html"!=a||b||(c=this._stripHtml(c))}"Text"==
a&&CKEDITOR.env.gecko&&this.getFilesCount()&&"file://"==c.substring(0,7)&&(c="");if("string"===typeof c)var g=c.indexOf("\x3c/html\x3e"),c=-1!==g?c.substring(0,g+7):c;return c},setData:function(a,b){a=this._.normalizeType(a);"text/html"==a?(this._.data[a]=this._stripHtml(b),this._.nativeHtmlCache=b):this._.data[a]=b;if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported||"URL"==a||"Text"==a)if("Text"==m&&"Text"==a&&(this.id=b),this._.fallbackDataTransfer.isRequired())this._.fallbackDataTransfer.setData(a,
b);else try{this.$.setData(a,b)}catch(c){}},storeId:function(){"Text"!==m&&this.setData(m,this.id)},getTransferType:function(a){return this.sourceEditor?this.sourceEditor==a?CKEDITOR.DATA_TRANSFER_INTERNAL:CKEDITOR.DATA_TRANSFER_CROSS_EDITORS:CKEDITOR.DATA_TRANSFER_EXTERNAL},cacheData:function(){function a(c){c=b._.normalizeType(c);var d=b.getData(c);"text/html"==c&&(b._.nativeHtmlCache=b.getData(c,!0),d=b._stripHtml(d));d&&(b._.data[c]=d)}if(this.$){var b=this,c,d;if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){if(this.$.types)for(c=
0;c<this.$.types.length;c++)a(this.$.types[c])}else a("Text"),a("URL");d=this._getImageFromClipboard();if(this.$&&this.$.files||d){this._.files=[];if(this.$.files&&this.$.files.length)for(c=0;c<this.$.files.length;c++)this._.files.push(this.$.files[c]);0===this._.files.length&&d&&this._.files.push(d)}}},getFilesCount:function(){return this._.files.length?this._.files.length:this.$&&this.$.files&&this.$.files.length?this.$.files.length:this._getImageFromClipboard()?1:0},getFile:function(a){return this._.files.length?
this._.files[a]:this.$&&this.$.files&&this.$.files.length?this.$.files[a]:0===a?this._getImageFromClipboard():void 0},isEmpty:function(){var a={},b;if(this.getFilesCount())return!1;CKEDITOR.tools.array.forEach(CKEDITOR.tools.objectKeys(this._.data),function(b){a[b]=1});if(this.$)if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){if(this.$.types)for(var c=0;c<this.$.types.length;c++)a[this.$.types[c]]=1}else a.Text=1,a.URL=1;"Text"!=m&&(a[m]=0);for(b in a)if(a[b]&&""!==this.getData(b))return!1;
return!0},_getImageFromClipboard:function(){var a;if(this.$&&this.$.items&&this.$.items[0])try{if((a=this.$.items[0].getAsFile())&&a.type)return a}catch(b){}},_stripHtml:function(a){if(a&&a.length){a=a.replace(this._.metaRegExp,"");var b=this._.bodyRegExp.exec(a);b&&b.length&&(a=b[1],a=a.replace(this._.fragmentRegExp,""))}return a}};CKEDITOR.plugins.clipboard.fallbackDataTransfer=function(a){this._dataTransfer=a;this._customDataFallbackType="text/html"};CKEDITOR.plugins.clipboard.fallbackDataTransfer._isCustomMimeTypeSupported=
null;CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes=[];CKEDITOR.plugins.clipboard.fallbackDataTransfer.prototype={isRequired:function(){var a=CKEDITOR.plugins.clipboard.fallbackDataTransfer,b=this._dataTransfer.$;if(null===a._isCustomMimeTypeSupported)if(b){a._isCustomMimeTypeSupported=!1;try{b.setData("cke/mimetypetest","cke test value"),a._isCustomMimeTypeSupported="cke test value"===b.getData("cke/mimetypetest"),b.clearData("cke/mimetypetest")}catch(c){}}else return!1;return!a._isCustomMimeTypeSupported},
getData:function(a,b){var c=this._getData(this._customDataFallbackType,!0);if(b)return c;var c=this._extractDataComment(c),d=null,d=a===this._customDataFallbackType?c.content:c.data&&c.data[a]?c.data[a]:this._getData(a,!0);return null!==d?d:""},setData:function(a,b){var c=a===this._customDataFallbackType;c&&(b=this._applyDataComment(b,this._getFallbackTypeData()));var d=b,g=this._dataTransfer.$;try{g.setData(a,d),c&&(this._dataTransfer._.nativeHtmlCache=d)}catch(e){if(this._isUnsupportedMimeTypeError(e)){c=
CKEDITOR.plugins.clipboard.fallbackDataTransfer;-1===CKEDITOR.tools.indexOf(c._customTypes,a)&&c._customTypes.push(a);var c=this._getFallbackTypeContent(),h=this._getFallbackTypeData();h[a]=d;try{d=this._applyDataComment(c,h),g.setData(this._customDataFallbackType,d),this._dataTransfer._.nativeHtmlCache=d}catch(k){d=""}}}return d},_getData:function(a,b){var c=this._dataTransfer._.data;if(!b&&c[a])return c[a];try{return this._dataTransfer.$.getData(a)}catch(d){return null}},_getFallbackTypeContent:function(){var a=
this._dataTransfer._.data[this._customDataFallbackType];a||(a=this._extractDataComment(this._getData(this._customDataFallbackType,!0)).content);return a},_getFallbackTypeData:function(){var a=CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes,b=this._extractDataComment(this._getData(this._customDataFallbackType,!0)).data||{},c=this._dataTransfer._.data;CKEDITOR.tools.array.forEach(a,function(a){void 0!==c[a]?b[a]=c[a]:void 0!==b[a]&&(b[a]=b[a])},this);return b},_isUnsupportedMimeTypeError:function(a){return a.message&&
-1!==a.message.search(/element not found/gi)},_extractDataComment:function(a){var b={data:null,content:a||""};if(a&&16<a.length){var c;(c=/\x3c!--cke-data:(.*?)--\x3e/g.exec(a))&&c[1]&&(b.data=JSON.parse(decodeURIComponent(c[1])),b.content=a.replace(c[0],""))}return b},_applyDataComment:function(a,b){var c="";b&&CKEDITOR.tools.objectKeys(b).length&&(c="\x3c!--cke-data:"+encodeURIComponent(JSON.stringify(b))+"--\x3e");return c+(a&&a.length?a:"")}}}(),CKEDITOR.config.clipboard_notificationDuration=
1E4,function(){CKEDITOR.plugins.add("panel",{beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_PANEL,CKEDITOR.ui.panel.handler)}});CKEDITOR.UI_PANEL="panel";CKEDITOR.ui.panel=function(a,b){b&&CKEDITOR.tools.extend(this,b);CKEDITOR.tools.extend(this,{className:"",css:[]});this.id=CKEDITOR.tools.getNextId();this.document=a;this.isFramed=this.forceIFrame||this.css.length;this._={blocks:{}}};CKEDITOR.ui.panel.handler={create:function(a){return new CKEDITOR.ui.panel(a)}};var a=CKEDITOR.addTemplate("panel",
'\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'),e=CKEDITOR.addTemplate("panel-frame",'\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'),b=CKEDITOR.addTemplate("panel-frame-inner",'\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e');
CKEDITOR.ui.panel.prototype={render:function(c,d){this.getHolderElement=function(){var a=this._.holder;if(!a){if(this.isFramed){var a=this.document.getById(this.id+"_frame"),c=a.getParent(),a=a.getFrameDocument();CKEDITOR.env.iOS&&c.setStyles({overflow:"scroll","-webkit-overflow-scrolling":"touch"});c=CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function(){this.isLoaded=!0;if(this.onLoad)this.onLoad()},this));a.write(b.output(CKEDITOR.tools.extend({css:CKEDITOR.tools.buildStyleHtml(this.css),onload:"window.parent.CKEDITOR.tools.callFunction("+
c+");"},l)));a.getWindow().$.CKEDITOR=CKEDITOR;a.on("keydown",function(a){var b=a.data.getKeystroke(),c=this.document.getById(this.id).getAttribute("dir");this._.onKeyDown&&!1===this._.onKeyDown(b)?a.data.preventDefault():(27==b||b==("rtl"==c?39:37))&&this.onEscape&&!1===this.onEscape(b)&&a.data.preventDefault()},this);a=a.getBody();a.unselectable();CKEDITOR.env.air&&CKEDITOR.tools.callFunction(c)}else a=this.document.getById(this.id);this._.holder=a}return a};var l={editorId:c.id,id:this.id,langCode:c.langCode,
dir:c.lang.dir,cls:this.className,frame:"",env:CKEDITOR.env.cssClass,"z-index":c.config.baseFloatZIndex+1};if(this.isFramed){var k=CKEDITOR.env.air?"javascript:void(0)":CKEDITOR.env.ie?"javascript:void(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"}())":"";l.frame=e.output({id:this.id+"_frame",src:k})}k=a.output(l);d&&d.push(k);return k},addBlock:function(a,b){b=this._.blocks[a]=b instanceof CKEDITOR.ui.panel.block?b:new CKEDITOR.ui.panel.block(this.getHolderElement(),
b);this._.currentBlock||this.showBlock(a);return b},getBlock:function(a){return this._.blocks[a]},showBlock:function(a){a=this._.blocks[a];var b=this._.currentBlock,e=!this.forceIFrame||CKEDITOR.env.ie?this._.holder:this.document.getById(this.id+"_frame");b&&b.hide();this._.currentBlock=a;CKEDITOR.fire("ariaWidget",e);a._.focusIndex=-1;this._.onKeyDown=a.onKeyDown&&CKEDITOR.tools.bind(a.onKeyDown,a);a.show();return a},destroy:function(){this.element&&this.element.remove()}};CKEDITOR.ui.panel.block=
CKEDITOR.tools.createClass({$:function(a,b){this.element=a.append(a.getDocument().createElement("div",{attributes:{tabindex:-1,"class":"cke_panel_block"},styles:{display:"none"}}));b&&CKEDITOR.tools.extend(this,b);this.element.setAttributes({role:this.attributes.role||"presentation","aria-label":this.attributes["aria-label"],title:this.attributes.title||this.attributes["aria-label"]});this.keys={};this._.focusIndex=-1;this.element.disableContextMenu()},_:{markItem:function(a){-1!=a&&(a=this.element.getElementsByTag("a").getItem(this._.focusIndex=
a),CKEDITOR.env.webkit&&a.getDocument().getWindow().focus(),a.focus(),this.onMark&&this.onMark(a))},markFirstDisplayed:function(a){for(var b=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&"none"==a.getStyle("display")},e=this._.getItems(),k,g,h=e.count()-1;0<=h;h--)if(k=e.getItem(h),k.getAscendant(b)||(g=k,this._.focusIndex=h),"true"==k.getAttribute("aria-selected")){g=k;this._.focusIndex=h;break}g&&(a&&a(),CKEDITOR.env.webkit&&g.getDocument().getWindow().focus(),g.focus(),this.onMark&&this.onMark(g))},
getItems:function(){return this.element.getElementsByTag("a")}},proto:{show:function(){this.element.setStyle("display","")},hide:function(){this.onHide&&!0===this.onHide.call(this)||this.element.setStyle("display","none")},onKeyDown:function(a,b){var e=this.keys[a];switch(e){case "next":for(var k=this._.focusIndex,e=this.element.getElementsByTag("a"),g;g=e.getItem(++k);)if(g.getAttribute("_cke_focus")&&g.$.offsetWidth){this._.focusIndex=k;g.focus();break}return g||b?!1:(this._.focusIndex=-1,this.onKeyDown(a,
1));case "prev":k=this._.focusIndex;for(e=this.element.getElementsByTag("a");0<k&&(g=e.getItem(--k));){if(g.getAttribute("_cke_focus")&&g.$.offsetWidth){this._.focusIndex=k;g.focus();break}g=null}return g||b?!1:(this._.focusIndex=e.count(),this.onKeyDown(a,1));case "click":case "mouseup":return k=this._.focusIndex,(g=0<=k&&this.element.getElementsByTag("a").getItem(k))&&(g.$[e]?g.$[e]():g.$["on"+e]()),!1}return!0}}})}(),CKEDITOR.plugins.add("floatpanel",{requires:"panel"}),function(){function a(a,
c,d,l,k){k=CKEDITOR.tools.genKey(c.getUniqueId(),d.getUniqueId(),a.lang.dir,a.uiColor||"",l.css||"",k||"");var g=e[k];g||(g=e[k]=new CKEDITOR.ui.panel(c,l),g.element=d.append(CKEDITOR.dom.element.createFromHtml(g.render(a),c)),g.element.setStyles({display:"none",position:"absolute"}));return g}var e={};CKEDITOR.ui.floatPanel=CKEDITOR.tools.createClass({$:function(b,c,d,e){function k(){f.hide()}d.forceIFrame=1;d.toolbarRelated&&b.elementMode==CKEDITOR.ELEMENT_MODE_INLINE&&(c=CKEDITOR.document.getById("cke_"+
b.name));var g=c.getDocument();e=a(b,g,c,d,e||0);var h=e.element,m=h.getFirst(),f=this;h.disableContextMenu();this.element=h;this._={editor:b,panel:e,parentElement:c,definition:d,document:g,iframe:m,children:[],dir:b.lang.dir,showBlockParams:null};b.on("mode",k);b.on("resize",k);g.getWindow().on("resize",function(){this.reposition()},this)},proto:{addBlock:function(a,c){return this._.panel.addBlock(a,c)},addListBlock:function(a,c){return this._.panel.addListBlock(a,c)},getBlock:function(a){return this._.panel.getBlock(a)},
showBlock:function(a,c,d,e,k,g){var h=this._.panel,m=h.showBlock(a);this._.showBlockParams=[].slice.call(arguments);this.allowBlur(!1);var f=this._.editor.editable();this._.returnFocus=f.hasFocus?f:new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);this._.hideTimeout=0;var n=this.element,f=this._.iframe,f=CKEDITOR.env.ie&&!CKEDITOR.env.edge?f:new CKEDITOR.dom.window(f.$.contentWindow),p=n.getDocument(),r=this._.parentElement.getPositionedAncestor(),v=c.getDocumentPosition(p),p=r?r.getDocumentPosition(p):
{x:0,y:0},x="rtl"==this._.dir,q=v.x+(e||0)-p.x,t=v.y+(k||0)-p.y;!x||1!=d&&4!=d?x||2!=d&&3!=d||(q+=c.$.offsetWidth-1):q+=c.$.offsetWidth;if(3==d||4==d)t+=c.$.offsetHeight-1;this._.panel._.offsetParentId=c.getId();n.setStyles({top:t+"px",left:0,display:""});n.setOpacity(0);n.getFirst().removeStyle("width");this._.editor.focusManager.add(f);this._.blurSet||(CKEDITOR.event.useCapture=!0,f.on("blur",function(a){function b(){delete this._.returnFocus;this.hide()}this.allowBlur()&&a.data.getPhase()==CKEDITOR.EVENT_PHASE_AT_TARGET&&
this.visible&&!this._.activeChild&&(CKEDITOR.env.iOS?this._.hideTimeout||(this._.hideTimeout=CKEDITOR.tools.setTimeout(b,0,this)):b.call(this))},this),f.on("focus",function(){this._.focused=!0;this.hideChild();this.allowBlur(!0)},this),CKEDITOR.env.iOS&&(f.on("touchstart",function(){clearTimeout(this._.hideTimeout)},this),f.on("touchend",function(){this._.hideTimeout=0;this.focus()},this)),CKEDITOR.event.useCapture=!1,this._.blurSet=1);h.onEscape=CKEDITOR.tools.bind(function(a){if(this.onEscape&&
!1===this.onEscape(a))return!1},this);CKEDITOR.tools.setTimeout(function(){var a=CKEDITOR.tools.bind(function(){var a=n;a.removeStyle("width");if(m.autoSize){var b=m.element.getDocument(),b=(CKEDITOR.env.webkit||CKEDITOR.env.edge?m.element:b.getBody()).$.scrollWidth;CKEDITOR.env.ie&&CKEDITOR.env.quirks&&0<b&&(b+=(a.$.offsetWidth||0)-(a.$.clientWidth||0)+3);a.setStyle("width",b+10+"px");b=m.element.$.scrollHeight;CKEDITOR.env.ie&&CKEDITOR.env.quirks&&0<b&&(b+=(a.$.offsetHeight||0)-(a.$.clientHeight||
0)+3);a.setStyle("height",b+"px");h._.currentBlock.element.setStyle("display","none").removeStyle("display")}else a.removeStyle("height");x&&(q-=n.$.offsetWidth);n.setStyle("left",q+"px");var b=h.element.getWindow(),a=n.$.getBoundingClientRect(),b=b.getViewPaneSize(),c=a.width||a.right-a.left,d=a.height||a.bottom-a.top,f=x?a.right:b.width-a.left,e=x?b.width-a.right:a.left;x?f<c&&(q=e>c?q+c:b.width>c?q-a.left:q-a.right+b.width):f<c&&(q=e>c?q-c:b.width>c?q-a.right+b.width:q-a.left);c=a.top;b.height-
a.top<d&&(t=c>d?t-d:b.height>d?t-a.bottom+b.height:t-a.top);CKEDITOR.env.ie&&(b=a=new CKEDITOR.dom.element(n.$.offsetParent),"html"==b.getName()&&(b=b.getDocument().getBody()),"rtl"==b.getComputedStyle("direction")&&(q=CKEDITOR.env.ie8Compat?q-2*n.getDocument().getDocumentElement().$.scrollLeft:q-(a.$.scrollWidth-a.$.clientWidth)));var a=n.getFirst(),k;(k=a.getCustomData("activePanel"))&&k.onHide&&k.onHide.call(this,1);a.setCustomData("activePanel",this);n.setStyles({top:t+"px",left:q+"px"});n.setOpacity(1);
g&&g()},this);h.isLoaded?a():h.onLoad=a;CKEDITOR.tools.setTimeout(function(){var a=CKEDITOR.env.webkit&&CKEDITOR.document.getWindow().getScrollPosition().y;this.focus();m.element.focus();CKEDITOR.env.webkit&&(CKEDITOR.document.getBody().$.scrollTop=a);this.allowBlur(!0);CKEDITOR.env.ie?CKEDITOR.tools.setTimeout(function(){m.markFirstDisplayed?m.markFirstDisplayed():m._.markFirstDisplayed()},0):m.markFirstDisplayed?m.markFirstDisplayed():m._.markFirstDisplayed();this._.editor.fire("panelShow",this)},
0,this)},CKEDITOR.env.air?200:0,this);this.visible=1;this.onShow&&this.onShow.call(this)},reposition:function(){var a=this._.showBlockParams;this.visible&&this._.showBlockParams&&(this.hide(),this.showBlock.apply(this,a))},focus:function(){if(CKEDITOR.env.webkit){var a=CKEDITOR.document.getActive();a&&!a.equals(this._.iframe)&&a.$.blur()}(this._.lastFocused||this._.iframe.getFrameDocument().getWindow()).focus()},blur:function(){var a=this._.iframe.getFrameDocument().getActive();a&&a.is("a")&&(this._.lastFocused=
a)},hide:function(a){if(this.visible&&(!this.onHide||!0!==this.onHide.call(this))){this.hideChild();CKEDITOR.env.gecko&&this._.iframe.getFrameDocument().$.activeElement.blur();this.element.setStyle("display","none");this.visible=0;this.element.getFirst().removeCustomData("activePanel");if(a=a&&this._.returnFocus)CKEDITOR.env.webkit&&a.type&&a.getWindow().$.focus(),a.focus();delete this._.lastFocused;this._.showBlockParams=null;this._.editor.fire("panelHide",this)}},allowBlur:function(a){var c=this._.panel;
void 0!==a&&(c.allowBlur=a);return c.allowBlur},showAsChild:function(a,c,d,e,k,g){if(this._.activeChild!=a||a._.panel._.offsetParentId!=d.getId())this.hideChild(),a.onHide=CKEDITOR.tools.bind(function(){CKEDITOR.tools.setTimeout(function(){this._.focused||this.hide()},0,this)},this),this._.activeChild=a,this._.focused=!1,a.showBlock(c,d,e,k,g),this.blur(),(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat)&&setTimeout(function(){a.element.getChild(0).$.style.cssText+=""},100)},hideChild:function(a){var c=
this._.activeChild;c&&(delete c.onHide,delete this._.activeChild,c.hide(),a&&this.focus())}}});CKEDITOR.on("instanceDestroyed",function(){var a=CKEDITOR.tools.isEmpty(CKEDITOR.instances),c;for(c in e){var d=e[c];a?d.destroy():d.element.hide()}a&&(e={})})}(),CKEDITOR.plugins.add("menu",{requires:"floatpanel",beforeInit:function(a){for(var e=a.config.menu_groups.split(","),b=a._.menuGroups={},c=a._.menuItems={},d=0;d<e.length;d++)b[e[d]]=d+1;a.addMenuGroup=function(a,c){b[a]=c||100};a.addMenuItem=function(a,
d){b[d.group]&&(c[a]=new CKEDITOR.menuItem(this,a,d))};a.addMenuItems=function(a){for(var b in a)this.addMenuItem(b,a[b])};a.getMenuItem=function(a){return c[a]};a.removeMenuItem=function(a){delete c[a]}}}),function(){function a(a){a.sort(function(a,b){return a.group<b.group?-1:a.group>b.group?1:a.order<b.order?-1:a.order>b.order?1:0})}var e='\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{label}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"';
CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(e+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(e+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"');var e=e+(' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" '+(CKEDITOR.env.ie?'onclick\x3d"return false;" onmouseup':"onclick")+'\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e'),b=CKEDITOR.addTemplate("menuItem",
e+'\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e'),c=CKEDITOR.addTemplate("menuArrow",'\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'),
d=CKEDITOR.addTemplate("menuShortcut",'\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e');CKEDITOR.menu=CKEDITOR.tools.createClass({$:function(a,b){b=this._.definition=b||{};this.id=CKEDITOR.tools.getNextId();this.editor=a;this.items=[];this._.listeners=[];this._.level=b.level||1;var c=CKEDITOR.tools.extend({},b.panel,{css:[CKEDITOR.skin.getPath("editor")],level:this._.level-1,block:{}}),d=c.block.attributes=c.attributes||{};!d.role&&(d.role="menu");this._.panelDefinition=
c},_:{onShow:function(){var a=this.editor.getSelection(),b=a&&a.getStartElement(),c=this.editor.elementPath(),d=this._.listeners;this.removeAll();for(var e=0;e<d.length;e++){var f=d[e](b,a,c);if(f)for(var n in f){var p=this.editor.getMenuItem(n);!p||p.command&&!this.editor.getCommand(p.command).state||(p.state=f[n],this.add(p))}}},onClick:function(a){this.hide();if(a.onClick)a.onClick();else a.command&&this.editor.execCommand(a.command)},onEscape:function(a){var b=this.parent;b?b._.panel.hideChild(1):
27==a&&this.hide(1);return!1},onHide:function(){this.onHide&&this.onHide()},showSubMenu:function(a){var b=this._.subMenu,c=this.items[a];if(c=c.getItems&&c.getItems()){b?b.removeAll():(b=this._.subMenu=new CKEDITOR.menu(this.editor,CKEDITOR.tools.extend({},this._.definition,{level:this._.level+1},!0)),b.parent=this,b._.onClick=CKEDITOR.tools.bind(this._.onClick,this));for(var d in c){var e=this.editor.getMenuItem(d);e&&(e.state=c[d],b.add(e))}var f=this._.panel.getBlock(this.id).element.getDocument().getById(this.id+
String(a));setTimeout(function(){b.show(f,2)},0)}else this._.panel.hideChild(1)}},proto:{add:function(a){a.order||(a.order=this.items.length);this.items.push(a)},removeAll:function(){this.items=[]},show:function(b,c,d,e){if(!this.parent&&(this._.onShow(),!this.items.length))return;c=c||("rtl"==this.editor.lang.dir?2:1);var m=this.items,f=this.editor,n=this._.panel,p=this._.element;if(!n){n=this._.panel=new CKEDITOR.ui.floatPanel(this.editor,CKEDITOR.document.getBody(),this._.panelDefinition,this._.level);
n.onEscape=CKEDITOR.tools.bind(function(a){if(!1===this._.onEscape(a))return!1},this);n.onShow=function(){n._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all")};n.onHide=CKEDITOR.tools.bind(function(){this._.onHide&&this._.onHide()},this);p=n.addBlock(this.id,this._.panelDefinition.block);p.autoSize=!0;var r=p.keys;r[40]="next";r[9]="next";r[38]="prev";r[CKEDITOR.SHIFT+9]="prev";r["rtl"==f.lang.dir?37:39]=CKEDITOR.env.ie?"mouseup":"click";r[32]=CKEDITOR.env.ie?"mouseup":
"click";CKEDITOR.env.ie&&(r[13]="mouseup");p=this._.element=p.element;r=p.getDocument();r.getBody().setStyle("overflow","hidden");r.getElementsByTag("html").getItem(0).setStyle("overflow","hidden");this._.itemOverFn=CKEDITOR.tools.addFunction(function(a){clearTimeout(this._.showSubTimeout);this._.showSubTimeout=CKEDITOR.tools.setTimeout(this._.showSubMenu,f.config.menu_subMenuDelay||400,this,[a])},this);this._.itemOutFn=CKEDITOR.tools.addFunction(function(){clearTimeout(this._.showSubTimeout)},this);
this._.itemClickFn=CKEDITOR.tools.addFunction(function(a){var b=this.items[a];if(b.state==CKEDITOR.TRISTATE_DISABLED)this.hide(1);else if(b.getItems)this._.showSubMenu(a);else this._.onClick(b)},this)}a(m);for(var r=f.elementPath(),r=['\x3cdiv class\x3d"cke_menu'+(r&&r.direction()!=f.lang.dir?" cke_mixed_dir_content":"")+'" role\x3d"presentation"\x3e'],v=m.length,x=v&&m[0].group,q=0;q<v;q++){var t=m[q];x!=t.group&&(r.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'),
x=t.group);t.render(this,q,r)}r.push("\x3c/div\x3e");p.setHtml(r.join(""));CKEDITOR.ui.fire("ready",this);this.parent?this.parent._.panel.showAsChild(n,this.id,b,c,d,e):n.showBlock(this.id,b,c,d,e);f.fire("menuShow",[n])},addListener:function(a){this._.listeners.push(a)},hide:function(a){this._.onHide&&this._.onHide();this._.panel&&this._.panel.hide(a)},findItemByCommandName:function(a){var b=CKEDITOR.tools.array.filter(this.items,function(b){return a===b.command});return b.length?(b=b[0],{item:b,
element:this._.element.findOne("."+b.className)}):null}}});CKEDITOR.menuItem=CKEDITOR.tools.createClass({$:function(a,b,c){CKEDITOR.tools.extend(this,c,{order:0,className:"cke_menubutton__"+b});this.group=a._.menuGroups[this.group];this.editor=a;this.name=b},proto:{render:function(a,e,g){var h=a.id+String(e),m="undefined"==typeof this.state?CKEDITOR.TRISTATE_OFF:this.state,f="",n=this.editor,p,r,v=m==CKEDITOR.TRISTATE_ON?"on":m==CKEDITOR.TRISTATE_DISABLED?"disabled":"off";this.role in{menuitemcheckbox:1,
menuitemradio:1}&&(f=' aria-checked\x3d"'+(m==CKEDITOR.TRISTATE_ON?"true":"false")+'"');var x=this.getItems,q="\x26#"+("rtl"==this.editor.lang.dir?"9668":"9658")+";",t=this.name;this.icon&&!/\./.test(this.icon)&&(t=this.icon);this.command&&(p=n.getCommand(this.command),(p=n.getCommandKeystroke(p))&&(r=CKEDITOR.tools.keystrokeToString(n.lang.common.keyboard,p)));a={id:h,name:this.name,iconName:t,label:this.label,cls:this.className||"",state:v,hasPopup:x?"true":"false",disabled:m==CKEDITOR.TRISTATE_DISABLED,
title:this.label+(r?" ("+r.display+")":""),ariaShortcut:r?n.lang.common.keyboardShortcut+" "+r.aria:"",href:"javascript:void('"+(this.label||"").replace("'")+"')",hoverFn:a._.itemOverFn,moveOutFn:a._.itemOutFn,clickFn:a._.itemClickFn,index:e,iconStyle:CKEDITOR.skin.getIconStyle(t,"rtl"==this.editor.lang.dir,t==this.icon?null:this.icon,this.iconOffset),shortcutHtml:r?d.output({shortcut:r.display}):"",arrowHtml:x?c.output({label:q}):"",role:this.role?this.role:"menuitem",ariaChecked:f};b.output(a,g)}}})}(),
CKEDITOR.config.menu_groups="clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",CKEDITOR.plugins.add("contextmenu",{requires:"menu",onLoad:function(){CKEDITOR.plugins.contextMenu=CKEDITOR.tools.createClass({base:CKEDITOR.menu,$:function(a){this.base.call(this,a,{panel:{className:"cke_menu_panel",attributes:{"aria-label":a.lang.contextmenu.options}}})},proto:{addTarget:function(a,
e){a.on("contextmenu",function(a){a=a.data;var c=CKEDITOR.env.webkit?b:CKEDITOR.env.mac?a.$.metaKey:a.$.ctrlKey;if(!e||!c){a.preventDefault();if(CKEDITOR.env.mac&&CKEDITOR.env.webkit){var c=this.editor,k=(new CKEDITOR.dom.elementPath(a.getTarget(),c.editable())).contains(function(a){return a.hasAttribute("contenteditable")},!0);k&&"false"==k.getAttribute("contenteditable")&&c.getSelection().fake(k)}var k=a.getTarget().getDocument(),g=a.getTarget().getDocument().getDocumentElement(),c=!k.equals(CKEDITOR.document),
k=k.getWindow().getScrollPosition(),h=c?a.$.clientX:a.$.pageX||k.x+a.$.clientX,m=c?a.$.clientY:a.$.pageY||k.y+a.$.clientY;CKEDITOR.tools.setTimeout(function(){this.open(g,null,h,m)},CKEDITOR.env.ie?200:0,this)}},this);if(CKEDITOR.env.webkit){var b,c=function(){b=0};a.on("keydown",function(a){b=CKEDITOR.env.mac?a.data.$.metaKey:a.data.$.ctrlKey});a.on("keyup",c);a.on("contextmenu",c)}},open:function(a,e,b,c){!1!==this.editor.config.enableContextMenu&&(this.editor.focus(),a=a||CKEDITOR.document.getDocumentElement(),
this.editor.selectionChange(1),this.show(a,e,b,c))}}})},beforeInit:function(a){var e=a.contextMenu=new CKEDITOR.plugins.contextMenu(a);a.on("contentDom",function(){e.addTarget(a.editable(),!1!==a.config.browserContextMenuOnCtrl)});a.addCommand("contextMenu",{exec:function(){a.contextMenu.open(a.document.getBody())}});a.setKeystroke(CKEDITOR.SHIFT+121,"contextMenu");a.setKeystroke(CKEDITOR.CTRL+CKEDITOR.SHIFT+121,"contextMenu")}}),function(){function a(a,b){function k(b){b=f.list[b];var c;b.equals(a.editable())||
"true"==b.getAttribute("contenteditable")?(c=a.createRange(),c.selectNodeContents(b),c=c.select()):(c=a.getSelection(),c.selectElement(b));CKEDITOR.env.ie&&a.fire("selectionChange",{selection:c,path:new CKEDITOR.dom.elementPath(b)});a.focus()}function g(){m&&m.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');delete f.list}var h=a.ui.spaceId("path"),m,f=a._.elementsPath,n=f.idBase;b.html+='\x3cspan id\x3d"'+h+'_label" class\x3d"cke_voice_label"\x3e'+a.lang.elementspath.eleLabel+
'\x3c/span\x3e\x3cspan id\x3d"'+h+'" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"'+h+'_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e';a.on("uiReady",function(){var b=a.ui.space("path");b&&a.focusManager.add(b,1)});f.onClick=k;var p=CKEDITOR.tools.addFunction(k),r=CKEDITOR.tools.addFunction(function(b,c){var e=f.idBase,g;c=new CKEDITOR.dom.event(c);g="rtl"==a.lang.dir;switch(c.getKeystroke()){case g?39:37:case 9:return(g=CKEDITOR.document.getById(e+
(b+1)))||(g=CKEDITOR.document.getById(e+"0")),g.focus(),!1;case g?37:39:case CKEDITOR.SHIFT+9:return(g=CKEDITOR.document.getById(e+(b-1)))||(g=CKEDITOR.document.getById(e+(f.list.length-1))),g.focus(),!1;case 27:return a.focus(),!1;case 13:case 32:return k(b),!1}return!0});a.on("selectionChange",function(b){for(var e=[],g=f.list=[],k=[],l=f.filters,A=!0,z=b.data.path.elements,w=z.length;w--;){var C=z[w],y=0;b=C.data("cke-display-name")?C.data("cke-display-name"):C.data("cke-real-element-type")?C.data("cke-real-element-type"):
C.getName();(A=C.hasAttribute("contenteditable")?"true"==C.getAttribute("contenteditable"):A)||C.hasAttribute("contenteditable")||(y=1);for(var B=0;B<l.length;B++){var G=l[B](C,b);if(!1===G){y=1;break}b=G||b}y||(g.unshift(C),k.unshift(b))}g=g.length;for(l=0;l<g;l++)b=k[l],A=a.lang.elementspath.eleTitle.replace(/%1/,b),b=c.output({id:n+l,label:A,text:b,jsTitle:"javascript:void('"+b+"')",index:l,keyDownFn:r,clickFn:p}),e.unshift(b);m||(m=CKEDITOR.document.getById(h));k=m;k.setHtml(e.join("")+'\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
a.fire("elementsPathUpdate",{space:k})});a.on("readOnly",g);a.on("contentDomUnload",g);a.addCommand("elementsPathFocus",e.toolbarFocus);a.setKeystroke(CKEDITOR.ALT+122,"elementsPathFocus")}var e={toolbarFocus:{editorFocus:!1,readOnly:1,exec:function(a){(a=CKEDITOR.document.getById(a._.elementsPath.idBase+"0"))&&a.focus(CKEDITOR.env.ie||CKEDITOR.env.air)}}},b="";CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(b+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(b+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
var c=CKEDITOR.addTemplate("pathItem",'\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"'+b+' hidefocus\x3d"true"  onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e');CKEDITOR.plugins.add("elementspath",{init:function(b){b._.elementsPath={idBase:"cke_elementspath_"+CKEDITOR.tools.getNextNumber()+
"_",filters:[]};b.on("uiSpace",function(c){"bottom"==c.data.space&&a(b,c.data)})}})}(),function(){function a(a,d){var l,k;d.on("refresh",function(a){var c=[e],d;for(d in a.data.states)c.push(a.data.states[d]);this.setState(CKEDITOR.tools.search(c,b)?b:e)},d,null,100);d.on("exec",function(b){l=a.getSelection();k=l.createBookmarks(1);b.data||(b.data={});b.data.done=!1},d,null,0);d.on("exec",function(){a.forceNextSelectionCheck();l.selectBookmarks(k)},d,null,100)}var e=CKEDITOR.TRISTATE_DISABLED,b=CKEDITOR.TRISTATE_OFF;
CKEDITOR.plugins.add("indent",{init:function(b){var d=CKEDITOR.plugins.indent.genericDefinition;a(b,b.addCommand("indent",new d(!0)));a(b,b.addCommand("outdent",new d));b.ui.addButton&&(b.ui.addButton("Indent",{label:b.lang.indent.indent,command:"indent",directional:!0,toolbar:"indent,20"}),b.ui.addButton("Outdent",{label:b.lang.indent.outdent,command:"outdent",directional:!0,toolbar:"indent,10"}));b.on("dirChanged",function(a){var d=b.createRange(),e=a.data.node;d.setStartBefore(e);d.setEndAfter(e);
for(var h=new CKEDITOR.dom.walker(d),m;m=h.next();)if(m.type==CKEDITOR.NODE_ELEMENT)if(!m.equals(e)&&m.getDirection())d.setStartAfter(m),h=new CKEDITOR.dom.walker(d);else{var f=b.config.indentClasses;if(f)for(var n="ltr"==a.data.dir?["_rtl",""]:["","_rtl"],p=0;p<f.length;p++)m.hasClass(f[p]+n[0])&&(m.removeClass(f[p]+n[0]),m.addClass(f[p]+n[1]));f=m.getStyle("margin-right");n=m.getStyle("margin-left");f?m.setStyle("margin-left",f):m.removeStyle("margin-left");n?m.setStyle("margin-right",n):m.removeStyle("margin-right")}})}});
CKEDITOR.plugins.indent={genericDefinition:function(a){this.isIndent=!!a;this.startDisabled=!this.isIndent},specificDefinition:function(a,b,e){this.name=b;this.editor=a;this.jobs={};this.enterBr=a.config.enterMode==CKEDITOR.ENTER_BR;this.isIndent=!!e;this.relatedGlobal=e?"indent":"outdent";this.indentKey=e?9:CKEDITOR.SHIFT+9;this.database={}},registerCommands:function(a,b){a.on("pluginsLoaded",function(){for(var a in b)(function(a,b){var c=a.getCommand(b.relatedGlobal),d;for(d in b.jobs)c.on("exec",
function(c){c.data.done||(a.fire("lockSnapshot"),b.execJob(a,d)&&(c.data.done=!0),a.fire("unlockSnapshot"),CKEDITOR.dom.element.clearAllMarkers(b.database))},this,null,d),c.on("refresh",function(c){c.data.states||(c.data.states={});c.data.states[b.name+"@"+d]=b.refreshJob(a,d,c.data.path)},this,null,d);a.addFeature(b)})(this,b[a])})}};CKEDITOR.plugins.indent.genericDefinition.prototype={context:"p",exec:function(){}};CKEDITOR.plugins.indent.specificDefinition.prototype={execJob:function(a,b){var l=
this.jobs[b];if(l.state!=e)return l.exec.call(this,a)},refreshJob:function(a,b,l){b=this.jobs[b];a.activeFilter.checkFeature(this)?b.state=b.refresh.call(this,a,l):b.state=e;return b.state},getContext:function(a){return a.contains(this.context)}}}(),function(){function a(a){function c(e){for(var h=l.startContainer,u=l.endContainer;h&&!h.getParent().equals(e);)h=h.getParent();for(;u&&!u.getParent().equals(e);)u=u.getParent();if(!h||!u)return!1;for(var A=[],v=!1;!v;)h.equals(u)&&(v=!0),A.push(h),h=
h.getNext();if(1>A.length)return!1;h=e.getParents(!0);for(u=0;u<h.length;u++)if(h[u].getName&&k[h[u].getName()]){e=h[u];break}for(var h=d.isIndent?1:-1,u=A[0],A=A[A.length-1],v=CKEDITOR.plugins.list.listToArray(e,f),w=v[A.getCustomData("listarray_index")].indent,u=u.getCustomData("listarray_index");u<=A.getCustomData("listarray_index");u++)if(v[u].indent+=h,0<h){for(var x=v[u].parent,y=u-1;0<=y;y--)if(v[y].indent===h){x=v[y].parent;break}v[u].parent=new CKEDITOR.dom.element(x.getName(),x.getDocument())}for(u=
A.getCustomData("listarray_index")+1;u<v.length&&v[u].indent>w;u++)v[u].indent+=h;h=CKEDITOR.plugins.list.arrayToList(v,f,null,a.config.enterMode,e.getDirection());if(!d.isIndent){var B;if((B=e.getParent())&&B.is("li"))for(var A=h.listNode.getChildren(),r=[],E,u=A.count()-1;0<=u;u--)(E=A.getItem(u))&&E.is&&E.is("li")&&r.push(E)}h&&h.listNode.replace(e);if(r&&r.length)for(u=0;u<r.length;u++){for(E=e=r[u];(E=E.getNext())&&E.is&&E.getName()in k;)CKEDITOR.env.needsNbspFiller&&!e.getFirst(b)&&e.append(l.document.createText(" ")),
e.append(E);e.insertAfter(B)}h&&a.fire("contentDomInvalidated");return!0}for(var d=this,f=this.database,k=this.context,l,r=a.getSelection(),r=(r&&r.getRanges()).createIterator();l=r.getNextRange();){for(var v=l.getCommonAncestor();v&&(v.type!=CKEDITOR.NODE_ELEMENT||!k[v.getName()]);){if(a.editable().equals(v)){v=!1;break}v=v.getParent()}v||(v=l.startPath().contains(k))&&l.setEndAt(v,CKEDITOR.POSITION_BEFORE_END);if(!v){var x=l.getEnclosedNode();x&&x.type==CKEDITOR.NODE_ELEMENT&&x.getName()in k&&(l.setStartAt(x,
CKEDITOR.POSITION_AFTER_START),l.setEndAt(x,CKEDITOR.POSITION_BEFORE_END),v=x)}v&&l.startContainer.type==CKEDITOR.NODE_ELEMENT&&l.startContainer.getName()in k&&(x=new CKEDITOR.dom.walker(l),x.evaluator=e,l.startContainer=x.next());v&&l.endContainer.type==CKEDITOR.NODE_ELEMENT&&l.endContainer.getName()in k&&(x=new CKEDITOR.dom.walker(l),x.evaluator=e,l.endContainer=x.previous());if(v)return c(v)}return 0}function e(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.is("li")}function b(a){return c(a)&&d(a)}
var c=CKEDITOR.dom.walker.whitespaces(!0),d=CKEDITOR.dom.walker.bookmark(!1,!0),l=CKEDITOR.TRISTATE_DISABLED,k=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add("indentlist",{requires:"indent",init:function(b){function c(b){d.specificDefinition.apply(this,arguments);this.requiredContent=["ul","ol"];b.on("key",function(a){var c=b.elementPath();if("wysiwyg"==b.mode&&a.data.keyCode==this.indentKey&&c){var d=this.getContext(c);!d||this.isIndent&&CKEDITOR.plugins.indentList.firstItemInPath(this.context,c,d)||
(b.execCommand(this.relatedGlobal),a.cancel())}},this);this.jobs[this.isIndent?10:30]={refresh:this.isIndent?function(a,b){var c=this.getContext(b),d=CKEDITOR.plugins.indentList.firstItemInPath(this.context,b,c);return c&&this.isIndent&&!d?k:l}:function(a,b){return!this.getContext(b)||this.isIndent?l:k},exec:CKEDITOR.tools.bind(a,this)}}var d=CKEDITOR.plugins.indent;d.registerCommands(b,{indentlist:new c(b,"indentlist",!0),outdentlist:new c(b,"outdentlist")});CKEDITOR.tools.extend(c.prototype,d.specificDefinition.prototype,
{context:{ol:1,ul:1}})}});CKEDITOR.plugins.indentList={};CKEDITOR.plugins.indentList.firstItemInPath=function(a,b,c){var d=b.contains(e);c||(c=b.contains(a));return c&&d&&d.equals(c.getFirst(e))}}(),function(){function a(a,b,c){function d(c){if(!(!(l=k[c?"getFirst":"getLast"]())||l.is&&l.isBlockBoundary()||!(m=b.root[c?"getPrevious":"getNext"](CKEDITOR.dom.walker.invisible(!0)))||m.is&&m.isBlockBoundary({br:1})))a.document.createElement("br")[c?"insertBefore":"insertAfter"](l)}for(var f=CKEDITOR.plugins.list.listToArray(b.root,
c),e=[],g=0;g<b.contents.length;g++){var h=b.contents[g];(h=h.getAscendant("li",!0))&&!h.getCustomData("list_item_processed")&&(e.push(h),CKEDITOR.dom.element.setMarker(c,h,"list_item_processed",!0))}h=null;for(g=0;g<e.length;g++)h=e[g].getCustomData("listarray_index"),f[h].indent=-1;for(g=h+1;g<f.length;g++)if(f[g].indent>f[g-1].indent+1){e=f[g-1].indent+1-f[g].indent;for(h=f[g].indent;f[g]&&f[g].indent>=h;)f[g].indent+=e,g++;g--}var k=CKEDITOR.plugins.list.arrayToList(f,c,null,a.config.enterMode,
b.root.getAttribute("dir")).listNode,l,m;d(!0);d();k.replace(b.root);a.fire("contentDomInvalidated")}function e(a,b){this.name=a;this.context=this.type=b;this.allowedContent=b+" li";this.requiredContent=b}function b(a,b,c,d){for(var f,e;f=a[d?"getLast":"getFirst"](r);)(e=f.getDirection(1))!==b.getDirection(1)&&f.setAttribute("dir",e),f.remove(),c?f[d?"insertBefore":"insertAfter"](c):b.append(f,d)}function c(a){function c(d){var e=a[d?"getPrevious":"getNext"](f);e&&e.type==CKEDITOR.NODE_ELEMENT&&e.is(a.getName())&&
(b(a,e,null,!d),a.remove(),a=e)}c();c(1)}function d(a){return a.type==CKEDITOR.NODE_ELEMENT&&(a.getName()in CKEDITOR.dtd.$block||a.getName()in CKEDITOR.dtd.$listItem)&&CKEDITOR.dtd[a.getName()]["#"]}function l(a,d,e){a.fire("saveSnapshot");e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);var g=e.extractContents();d.trim(!1,!0);var h=d.createBookmark(),l=new CKEDITOR.dom.elementPath(d.startContainer),m=l.block,l=l.lastElement.getAscendant("li",1)||m,w=new CKEDITOR.dom.elementPath(e.startContainer),p=
w.contains(CKEDITOR.dtd.$listItem),w=w.contains(CKEDITOR.dtd.$list);m?(m=m.getBogus())&&m.remove():w&&(m=w.getPrevious(f))&&n(m)&&m.remove();(m=g.getLast())&&m.type==CKEDITOR.NODE_ELEMENT&&m.is("br")&&m.remove();(m=d.startContainer.getChild(d.startOffset))?g.insertBefore(m):d.startContainer.append(g);p&&(g=k(p))&&(l.contains(p)?(b(g,p.getParent(),p),g.remove()):l.append(g));for(;e.checkStartOfBlock()&&e.checkEndOfBlock();){w=e.startPath();g=w.block;if(!g)break;g.is("li")&&(l=g.getParent(),g.equals(l.getLast(f))&&
g.equals(l.getFirst(f))&&(g=l));e.moveToPosition(g,CKEDITOR.POSITION_BEFORE_START);g.remove()}e=e.clone();g=a.editable();e.setEndAt(g,CKEDITOR.POSITION_BEFORE_END);e=new CKEDITOR.dom.walker(e);e.evaluator=function(a){return f(a)&&!n(a)};(e=e.next())&&e.type==CKEDITOR.NODE_ELEMENT&&e.getName()in CKEDITOR.dtd.$list&&c(e);d.moveToBookmark(h);d.select();a.fire("saveSnapshot")}function k(a){return(a=a.getLast(f))&&a.type==CKEDITOR.NODE_ELEMENT&&a.getName()in g?a:null}var g={ol:1,ul:1},h=CKEDITOR.dom.walker.whitespaces(),
m=CKEDITOR.dom.walker.bookmark(),f=function(a){return!(h(a)||m(a))},n=CKEDITOR.dom.walker.bogus();CKEDITOR.plugins.list={listToArray:function(a,b,c,d,f){if(!g[a.getName()])return[];d||(d=0);c||(c=[]);for(var e=0,h=a.getChildCount();e<h;e++){var k=a.getChild(e);k.type==CKEDITOR.NODE_ELEMENT&&k.getName()in CKEDITOR.dtd.$list&&CKEDITOR.plugins.list.listToArray(k,b,c,d+1);if("li"==k.$.nodeName.toLowerCase()){var l={parent:a,indent:d,element:k,contents:[]};f?l.grandparent=f:(l.grandparent=a.getParent(),
l.grandparent&&"li"==l.grandparent.$.nodeName.toLowerCase()&&(l.grandparent=l.grandparent.getParent()));b&&CKEDITOR.dom.element.setMarker(b,k,"listarray_index",c.length);c.push(l);for(var m=0,n=k.getChildCount(),p;m<n;m++)p=k.getChild(m),p.type==CKEDITOR.NODE_ELEMENT&&g[p.getName()]?CKEDITOR.plugins.list.listToArray(p,b,c,d+1,l.grandparent):l.contents.push(p)}}return c},arrayToList:function(a,b,c,d,e){c||(c=0);if(!a||a.length<c+1)return null;for(var h,k=a[c].parent.getDocument(),l=new CKEDITOR.dom.documentFragment(k),
n=null,y=c,p=Math.max(a[c].indent,0),r=null,E,F,I=d==CKEDITOR.ENTER_P?"p":"div";;){var H=a[y];h=H.grandparent;E=H.element.getDirection(1);if(H.indent==p){n&&a[y].parent.getName()==n.getName()||(n=a[y].parent.clone(!1,1),e&&n.setAttribute("dir",e),l.append(n));r=n.append(H.element.clone(0,1));E!=n.getDirection(1)&&r.setAttribute("dir",E);for(h=0;h<H.contents.length;h++)r.append(H.contents[h].clone(1,1));y++}else if(H.indent==Math.max(p,0)+1)H=a[y-1].element.getDirection(1),y=CKEDITOR.plugins.list.arrayToList(a,
null,y,d,H!=E?E:null),!r.getChildCount()&&CKEDITOR.env.needsNbspFiller&&7>=k.$.documentMode&&r.append(k.createText(" ")),r.append(y.listNode),y=y.nextIndex;else if(-1==H.indent&&!c&&h){g[h.getName()]?(r=H.element.clone(!1,!0),E!=h.getDirection(1)&&r.setAttribute("dir",E)):r=new CKEDITOR.dom.documentFragment(k);var n=h.getDirection(1)!=E,K=H.element,J=K.getAttribute("class"),D=K.getAttribute("style"),R=r.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&(d!=CKEDITOR.ENTER_BR||n||D||J),N,S=H.contents.length,L;
for(h=0;h<S;h++)if(N=H.contents[h],m(N)&&1<S)R?L=N.clone(1,1):r.append(N.clone(1,1));else if(N.type==CKEDITOR.NODE_ELEMENT&&N.isBlockBoundary()){n&&!N.getDirection()&&N.setAttribute("dir",E);F=N;var V=K.getAttribute("style");V&&F.setAttribute("style",V.replace(/([^;])$/,"$1;")+(F.getAttribute("style")||""));J&&N.addClass(J);F=null;L&&(r.append(L),L=null);r.append(N.clone(1,1))}else R?(F||(F=k.createElement(I),r.append(F),n&&F.setAttribute("dir",E)),D&&F.setAttribute("style",D),J&&F.setAttribute("class",
J),L&&(F.append(L),L=null),F.append(N.clone(1,1))):r.append(N.clone(1,1));L&&((F||r).append(L),L=null);r.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&y!=a.length-1&&(CKEDITOR.env.needsBrFiller&&(E=r.getLast())&&E.type==CKEDITOR.NODE_ELEMENT&&E.is("br")&&E.remove(),(E=r.getLast(f))&&E.type==CKEDITOR.NODE_ELEMENT&&E.is(CKEDITOR.dtd.$block)||r.append(k.createElement("br")));E=r.$.nodeName.toLowerCase();"div"!=E&&"p"!=E||r.appendBogus();l.append(r);n=null;y++}else return null;F=null;if(a.length<=y||Math.max(a[y].indent,
0)<p)break}if(b)for(a=l.getFirst();a;){if(a.type==CKEDITOR.NODE_ELEMENT&&(CKEDITOR.dom.element.clearMarkers(b,a),a.getName()in CKEDITOR.dtd.$listItem&&(c=a,k=e=d=void 0,d=c.getDirection()))){for(e=c.getParent();e&&!(k=e.getDirection());)e=e.getParent();d==k&&c.removeAttribute("dir")}a=a.getNextSourceNode()}return{listNode:l,nextIndex:y}}};var p=/^h[1-6]$/,r=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);e.prototype={exec:function(b){this.refresh(b,b.elementPath());var d=b.config,e=b.getSelection(),
h=e&&e.getRanges();if(this.state==CKEDITOR.TRISTATE_OFF){var k=b.editable();if(k.getFirst(f)){var l=1==h.length&&h[0];(d=l&&l.getEnclosedNode())&&d.is&&this.type==d.getName()&&this.setState(CKEDITOR.TRISTATE_ON)}else d.enterMode==CKEDITOR.ENTER_BR?k.appendBogus():h[0].fixBlock(1,d.enterMode==CKEDITOR.ENTER_P?"p":"div"),e.selectRanges(h)}for(var d=e.createBookmarks(!0),k=[],m={},h=h.createIterator(),n=0;(l=h.getNextRange())&&++n;){var r=l.getBoundaryNodes(),y=r.startNode,B=r.endNode;y.type==CKEDITOR.NODE_ELEMENT&&
"td"==y.getName()&&l.setStartAt(r.startNode,CKEDITOR.POSITION_AFTER_START);B.type==CKEDITOR.NODE_ELEMENT&&"td"==B.getName()&&l.setEndAt(r.endNode,CKEDITOR.POSITION_BEFORE_END);l=l.createIterator();for(l.forceBrBreak=this.state==CKEDITOR.TRISTATE_OFF;r=l.getNextParagraph();)if(!r.getCustomData("list_block")){CKEDITOR.dom.element.setMarker(m,r,"list_block",1);for(var G=b.elementPath(r),y=G.elements,B=0,G=G.blockLimit,E,F=y.length-1;0<=F&&(E=y[F]);F--)if(g[E.getName()]&&G.contains(E)){G.removeCustomData("list_group_object_"+
n);(y=E.getCustomData("list_group_object"))?y.contents.push(r):(y={root:E,contents:[r]},k.push(y),CKEDITOR.dom.element.setMarker(m,E,"list_group_object",y));B=1;break}B||(B=G,B.getCustomData("list_group_object_"+n)?B.getCustomData("list_group_object_"+n).contents.push(r):(y={root:B,contents:[r]},CKEDITOR.dom.element.setMarker(m,B,"list_group_object_"+n,y),k.push(y)))}}for(E=[];0<k.length;)if(y=k.shift(),this.state==CKEDITOR.TRISTATE_OFF)if(g[y.root.getName()]){h=b;n=y;y=m;l=E;B=CKEDITOR.plugins.list.listToArray(n.root,
y);G=[];for(r=0;r<n.contents.length;r++)F=n.contents[r],(F=F.getAscendant("li",!0))&&!F.getCustomData("list_item_processed")&&(G.push(F),CKEDITOR.dom.element.setMarker(y,F,"list_item_processed",!0));for(var F=n.root.getDocument(),I=void 0,H=void 0,r=0;r<G.length;r++){var K=G[r].getCustomData("listarray_index"),I=B[K].parent;I.is(this.type)||(H=F.createElement(this.type),I.copyAttributes(H,{start:1,type:1}),H.removeStyle("list-style-type"),B[K].parent=H)}y=CKEDITOR.plugins.list.arrayToList(B,y,null,
h.config.enterMode);B=void 0;G=y.listNode.getChildCount();for(r=0;r<G&&(B=y.listNode.getChild(r));r++)B.getName()==this.type&&l.push(B);y.listNode.replace(n.root);h.fire("contentDomInvalidated")}else{B=b;l=y;r=E;G=l.contents;h=l.root.getDocument();n=[];1==G.length&&G[0].equals(l.root)&&(y=h.createElement("div"),G[0].moveChildren&&G[0].moveChildren(y),G[0].append(y),G[0]=y);l=l.contents[0].getParent();for(F=0;F<G.length;F++)l=l.getCommonAncestor(G[F].getParent());I=B.config.useComputedState;B=y=void 0;
I=void 0===I||I;for(F=0;F<G.length;F++)for(H=G[F];K=H.getParent();){if(K.equals(l)){n.push(H);!B&&H.getDirection()&&(B=1);H=H.getDirection(I);null!==y&&(y=y&&y!=H?null:H);break}H=K}if(!(1>n.length)){G=n[n.length-1].getNext();F=h.createElement(this.type);r.push(F);for(I=r=void 0;n.length;)r=n.shift(),I=h.createElement("li"),H=r,H.is("pre")||p.test(H.getName())||"false"==H.getAttribute("contenteditable")?r.appendTo(I):(r.copyAttributes(I),y&&r.getDirection()&&(I.removeStyle("direction"),I.removeAttribute("dir")),
r.moveChildren(I),r.remove()),I.appendTo(F);y&&B&&F.setAttribute("dir",y);G?F.insertBefore(G):F.appendTo(l)}}else this.state==CKEDITOR.TRISTATE_ON&&g[y.root.getName()]&&a.call(this,b,y,m);for(F=0;F<E.length;F++)c(E[F]);CKEDITOR.dom.element.clearAllMarkers(m);e.selectBookmarks(d);b.focus()},refresh:function(a,b){var c=b.contains(g,1),d=b.blockLimit||b.root;c&&d.contains(c)?this.setState(c.is(this.type)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF):this.setState(CKEDITOR.TRISTATE_OFF)}};CKEDITOR.plugins.add("list",
{requires:"indentlist",init:function(a){a.blockless||(a.addCommand("numberedlist",new e("numberedlist","ol")),a.addCommand("bulletedlist",new e("bulletedlist","ul")),a.ui.addButton&&(a.ui.addButton("NumberedList",{label:a.lang.list.numberedlist,command:"numberedlist",directional:!0,toolbar:"list,10"}),a.ui.addButton("BulletedList",{label:a.lang.list.bulletedlist,command:"bulletedlist",directional:!0,toolbar:"list,20"})),a.on("key",function(b){var c=b.data.domEvent.getKey(),e;if("wysiwyg"==a.mode&&
c in{8:1,46:1}){var h=a.getSelection().getRanges()[0],m=h&&h.startPath();if(h&&h.collapsed){var p=8==c,w=a.editable(),r=new CKEDITOR.dom.walker(h.clone());r.evaluator=function(a){return f(a)&&!n(a)};r.guard=function(a,b){return!(b&&a.type==CKEDITOR.NODE_ELEMENT&&a.is("table"))};c=h.clone();if(p){var y;(y=m.contains(g))&&h.checkBoundaryOfElement(y,CKEDITOR.START)&&(y=y.getParent())&&y.is("li")&&(y=k(y))?(e=y,y=y.getPrevious(f),c.moveToPosition(y&&n(y)?y:e,CKEDITOR.POSITION_BEFORE_START)):(r.range.setStartAt(w,
CKEDITOR.POSITION_AFTER_START),r.range.setEnd(h.startContainer,h.startOffset),(y=r.previous())&&y.type==CKEDITOR.NODE_ELEMENT&&(y.getName()in g||y.is("li"))&&(y.is("li")||(r.range.selectNodeContents(y),r.reset(),r.evaluator=d,y=r.previous()),e=y,c.moveToElementEditEnd(e),c.moveToPosition(c.endPath().block,CKEDITOR.POSITION_BEFORE_END)));if(e)l(a,c,h),b.cancel();else{var B=m.contains(g);B&&h.checkBoundaryOfElement(B,CKEDITOR.START)&&(e=B.getFirst(f),h.checkBoundaryOfElement(e,CKEDITOR.START)&&(y=B.getPrevious(f),
k(e)?y&&(h.moveToElementEditEnd(y),h.select()):a.execCommand("outdent"),b.cancel()))}}else if(e=m.contains("li")){if(r.range.setEndAt(w,CKEDITOR.POSITION_BEFORE_END),p=(w=e.getLast(f))&&d(w)?w:e,m=0,(y=r.next())&&y.type==CKEDITOR.NODE_ELEMENT&&y.getName()in g&&y.equals(w)?(m=1,y=r.next()):h.checkBoundaryOfElement(p,CKEDITOR.END)&&(m=2),m&&y){h=h.clone();h.moveToElementEditStart(y);if(1==m&&(c.optimize(),!c.startContainer.equals(e))){for(e=c.startContainer;e.is(CKEDITOR.dtd.$inline);)B=e,e=e.getParent();
B&&c.moveToPosition(B,CKEDITOR.POSITION_AFTER_END)}2==m&&(c.moveToPosition(c.endPath().block,CKEDITOR.POSITION_BEFORE_END),h.endPath().block&&h.moveToPosition(h.endPath().block,CKEDITOR.POSITION_AFTER_START));l(a,c,h);b.cancel()}}else r.range.setEndAt(w,CKEDITOR.POSITION_BEFORE_END),(y=r.next())&&y.type==CKEDITOR.NODE_ELEMENT&&y.is(g)&&(y=y.getFirst(f),m.block&&h.checkStartOfBlock()&&h.checkEndOfBlock()?(m.block.remove(),h.moveToElementEditStart(y),h.select()):k(y)?(h.moveToElementEditStart(y),h.select()):
(h=h.clone(),h.moveToElementEditStart(y),l(a,c,h)),b.cancel());setTimeout(function(){a.selectionChange(1)})}}}))}})}(),function(){function a(a,b,c){c=a.config.forceEnterMode||c;if("wysiwyg"==a.mode){b||(b=a.activeEnterMode);var d=a.elementPath();d&&!d.isContextFor("p")&&(b=CKEDITOR.ENTER_BR,c=1);a.fire("saveSnapshot");b==CKEDITOR.ENTER_BR?k(a,b,null,c):g(a,b,null,c);a.fire("saveSnapshot")}}function e(a){a=a.getSelection().getRanges(!0);for(var b=a.length-1;0<b;b--)a[b].deleteContents();return a[0]}
function b(a){var b=a.startContainer.getAscendant(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&"true"==a.getAttribute("contenteditable")},!0);if(a.root.equals(b))return a;b=new CKEDITOR.dom.range(b);b.moveToRange(a);return b}CKEDITOR.plugins.add("enterkey",{init:function(b){b.addCommand("enter",{modes:{wysiwyg:1},editorFocus:!1,exec:function(b){a(b)}});b.addCommand("shiftEnter",{modes:{wysiwyg:1},editorFocus:!1,exec:function(b){a(b,b.activeShiftEnterMode,1)}});b.setKeystroke([[13,"enter"],[CKEDITOR.SHIFT+
13,"shiftEnter"]])}});var c=CKEDITOR.dom.walker.whitespaces(),d=CKEDITOR.dom.walker.bookmark();CKEDITOR.plugins.enterkey={enterBlock:function(a,f,g,l){if(g=g||e(a)){g=b(g);var r=g.document,v=g.checkStartOfBlock(),x=g.checkEndOfBlock(),q=a.elementPath(g.startContainer),t=q.block,u=f==CKEDITOR.ENTER_DIV?"div":"p",A;if(v&&x){if(t&&(t.is("li")||t.getParent().is("li"))){t.is("li")||(t=t.getParent());g=t.getParent();A=g.getParent();l=!t.hasPrevious();var z=!t.hasNext(),u=a.getSelection(),w=u.createBookmarks(),
v=t.getDirection(1),x=t.getAttribute("class"),C=t.getAttribute("style"),y=A.getDirection(1)!=v;a=a.enterMode!=CKEDITOR.ENTER_BR||y||C||x;if(A.is("li"))l||z?(l&&z&&g.remove(),t[z?"insertAfter":"insertBefore"](A)):t.breakParent(A);else{if(a)if(q.block.is("li")?(A=r.createElement(f==CKEDITOR.ENTER_P?"p":"div"),y&&A.setAttribute("dir",v),C&&A.setAttribute("style",C),x&&A.setAttribute("class",x),t.moveChildren(A)):A=q.block,l||z)A[l?"insertBefore":"insertAfter"](g);else t.breakParent(g),A.insertAfter(g);
else if(t.appendBogus(!0),l||z)for(;r=t[l?"getFirst":"getLast"]();)r[l?"insertBefore":"insertAfter"](g);else for(t.breakParent(g);r=t.getLast();)r.insertAfter(g);t.remove()}u.selectBookmarks(w);return}if(t&&t.getParent().is("blockquote")){t.breakParent(t.getParent());t.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1))||t.getPrevious().remove();t.getNext().getFirst(CKEDITOR.dom.walker.invisible(1))||t.getNext().remove();g.moveToElementEditStart(t);g.select();return}}else if(t&&t.is("pre")&&
!x){k(a,f,g,l);return}if(v=g.splitBlock(u)){f=v.previousBlock;t=v.nextBlock;q=v.wasStartOfBlock;a=v.wasEndOfBlock;t?(w=t.getParent(),w.is("li")&&(t.breakParent(w),t.move(t.getNext(),1))):f&&(w=f.getParent())&&w.is("li")&&(f.breakParent(w),w=f.getNext(),g.moveToElementEditStart(w),f.move(f.getPrevious()));if(q||a){if(f){if(f.is("li")||!h.test(f.getName())&&!f.is("pre"))A=f.clone()}else t&&(A=t.clone());A?l&&!A.is("li")&&A.renameNode(u):w&&w.is("li")?A=w:(A=r.createElement(u),f&&(z=f.getDirection())&&
A.setAttribute("dir",z));if(r=v.elementPath)for(l=0,u=r.elements.length;l<u;l++){w=r.elements[l];if(w.equals(r.block)||w.equals(r.blockLimit))break;CKEDITOR.dtd.$removeEmpty[w.getName()]&&(w=w.clone(),A.moveChildren(w),A.append(w))}A.appendBogus();A.getParent()||g.insertNode(A);A.is("li")&&A.removeAttribute("value");!CKEDITOR.env.ie||!q||a&&f.getChildCount()||(g.moveToElementEditStart(a?f:A),g.select());g.moveToElementEditStart(q&&!a?t:A)}else t.is("li")&&(A=g.clone(),A.selectNodeContents(t),A=new CKEDITOR.dom.walker(A),
A.evaluator=function(a){return!(d(a)||c(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.getName()in CKEDITOR.dtd.$inline&&!(a.getName()in CKEDITOR.dtd.$empty))},(w=A.next())&&w.type==CKEDITOR.NODE_ELEMENT&&w.is("ul","ol")&&(CKEDITOR.env.needsBrFiller?r.createElement("br"):r.createText(" ")).insertBefore(w)),t&&g.moveToElementEditStart(t);g.select();g.scrollIntoView()}}},enterBr:function(a,b,c,d){if(c=c||e(a)){var k=c.document,l=c.checkEndOfBlock(),x=new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()),
q=x.block,t=q&&x.block.getName();d||"li"!=t?(!d&&l&&h.test(t)?(l=q.getDirection())?(k=k.createElement("div"),k.setAttribute("dir",l),k.insertAfter(q),c.setStart(k,0)):(k.createElement("br").insertAfter(q),CKEDITOR.env.gecko&&k.createText("").insertAfter(q),c.setStartAt(q.getNext(),CKEDITOR.env.ie?CKEDITOR.POSITION_BEFORE_START:CKEDITOR.POSITION_AFTER_START)):(a="pre"==t&&CKEDITOR.env.ie&&8>CKEDITOR.env.version?k.createText("\r"):k.createElement("br"),c.deleteContents(),c.insertNode(a),CKEDITOR.env.needsBrFiller?
(k.createText("﻿").insertAfter(a),l&&(q||x.blockLimit).appendBogus(),a.getNext().$.nodeValue="",c.setStartAt(a.getNext(),CKEDITOR.POSITION_AFTER_START)):c.setStartAt(a,CKEDITOR.POSITION_AFTER_END)),c.collapse(!0),c.select(),c.scrollIntoView()):g(a,b,c,d)}}};var l=CKEDITOR.plugins.enterkey,k=l.enterBr,g=l.enterBlock,h=/^h[1-6]$/}(),function(){function a(a,b){var c={},d=[],l={nbsp:" ",shy:"­",gt:"\x3e",lt:"\x3c",amp:"\x26",apos:"'",quot:'"'};a=a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g,function(a,
f){var e=b?"\x26"+f+";":l[f];c[e]=b?l[f]:"\x26"+f+";";d.push(e);return""});if(!b&&a){a=a.split(",");var k=document.createElement("div"),g;k.innerHTML="\x26"+a.join(";\x26")+";";g=k.innerHTML;k=null;for(k=0;k<g.length;k++){var h=g.charAt(k);c[h]="\x26"+a[k]+";";d.push(h)}}c.regex=d.join(b?"|":"");return c}CKEDITOR.plugins.add("entities",{afterInit:function(e){function b(a){return h[a]}function c(a){return"force"!=d.entities_processNumerical&&k[a]?k[a]:"\x26#"+a.charCodeAt(0)+";"}var d=e.config;if(e=
(e=e.dataProcessor)&&e.htmlFilter){var l=[];!1!==d.basicEntities&&l.push("nbsp,gt,lt,amp");d.entities&&(l.length&&l.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
d.entities_latin&&l.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"),d.entities_greek&&l.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
d.entities_additional&&l.push(d.entities_additional));var k=a(l.join(",")),g=k.regex?"["+k.regex+"]":"a^";delete k.regex;d.entities&&d.entities_processNumerical&&(g="[^ -~]|"+g);var g=new RegExp(g,"g"),h=a("nbsp,gt,lt,amp,shy",!0),m=new RegExp(h.regex,"g");e.addRules({text:function(a){return a.replace(m,b).replace(g,c)}},{applyToAll:!0,excludeNestedEditable:!0})}}})}(),CKEDITOR.config.basicEntities=!0,CKEDITOR.config.entities=!0,CKEDITOR.config.entities_latin=!0,CKEDITOR.config.entities_greek=!0,
CKEDITOR.config.entities_additional="#39",CKEDITOR.plugins.add("popup"),CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{popup:function(a,e,b,c){e=e||"80%";b=b||"70%";"string"==typeof e&&1<e.length&&"%"==e.substr(e.length-1,1)&&(e=parseInt(window.screen.width*parseInt(e,10)/100,10));"string"==typeof b&&1<b.length&&"%"==b.substr(b.length-1,1)&&(b=parseInt(window.screen.height*parseInt(b,10)/100,10));640>e&&(e=640);420>b&&(b=420);var d=parseInt((window.screen.height-b)/2,10),l=parseInt((window.screen.width-
e)/2,10);c=(c||"location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes")+",width\x3d"+e+",height\x3d"+b+",top\x3d"+d+",left\x3d"+l;var k=window.open("",null,c,!0);if(!k)return!1;try{-1==navigator.userAgent.toLowerCase().indexOf(" chrome/")&&(k.moveTo(l,d),k.resizeTo(e,b)),k.focus(),k.location.href=a}catch(g){window.open(a,null,c,!0)}return!0}}),"use strict",function(){function a(a){this.editor=a;this.loaders=
[]}function e(a,c,e){var g=a.config.fileTools_defaultFileName;this.editor=a;this.lang=a.lang;"string"===typeof c?(this.data=c,this.file=b(this.data),this.loaded=this.total=this.file.size):(this.data=null,this.file=c,this.total=this.file.size,this.loaded=0);e?this.fileName=e:this.file.name?this.fileName=this.file.name:(a=this.file.type.split("/"),g&&(a[0]=g),this.fileName=a.join("."));this.uploaded=0;this.responseData=this.uploadTotal=null;this.status="created";this.abort=function(){this.changeStatus("abort")}}
function b(a){var b=a.match(c)[1];a=a.replace(c,"");a=atob(a);var e=[],g,h,m,f;for(g=0;g<a.length;g+=512){h=a.slice(g,g+512);m=Array(h.length);for(f=0;f<h.length;f++)m[f]=h.charCodeAt(f);h=new Uint8Array(m);e.push(h)}return new Blob(e,{type:b})}CKEDITOR.plugins.add("filetools",{beforeInit:function(b){b.uploadRepository=new a(b);b.on("fileUploadRequest",function(a){var b=a.data.fileLoader;b.xhr.open("POST",b.uploadUrl,!0);a.data.requestData.upload={file:b.file,name:b.fileName}},null,null,5);b.on("fileUploadRequest",
function(a){var c=a.data.fileLoader,e=new FormData;a=a.data.requestData;var h=b.config.fileTools_requestHeaders,m,f;for(f in a){var n=a[f];"object"===typeof n&&n.file?e.append(f,n.file,n.name):e.append(f,n)}e.append("ckCsrfToken",CKEDITOR.tools.getCsrfToken());if(h)for(m in h)c.xhr.setRequestHeader(m,h[m]);c.xhr.send(e)},null,null,999);b.on("fileUploadResponse",function(a){var b=a.data.fileLoader,c=b.xhr,d=a.data;try{var e=JSON.parse(c.responseText);e.error&&e.error.message&&(d.message=e.error.message);
if(e.uploaded)for(var f in e)d[f]=e[f];else a.cancel()}catch(n){d.message=b.lang.filetools.responseError,CKEDITOR.warn("filetools-response-error",{responseText:c.responseText}),a.cancel()}},null,null,999)}});a.prototype={create:function(a,b,c){c=c||e;var g=this.loaders.length;a=new c(this.editor,a,b);a.id=g;this.loaders[g]=a;this.fire("instanceCreated",a);return a},isFinished:function(){for(var a=0;a<this.loaders.length;++a)if(!this.loaders[a].isFinished())return!1;return!0}};e.prototype={loadAndUpload:function(a,
b){var c=this;this.once("loaded",function(e){e.cancel();c.once("update",function(a){a.cancel()},null,null,0);c.upload(a,b)},null,null,0);this.load()},load:function(){var a=this,b=this.reader=new FileReader;a.changeStatus("loading");this.abort=function(){a.reader.abort()};b.onabort=function(){a.changeStatus("abort")};b.onerror=function(){a.message=a.lang.filetools.loadError;a.changeStatus("error")};b.onprogress=function(b){a.loaded=b.loaded;a.update()};b.onload=function(){a.loaded=a.total;a.data=b.result;
a.changeStatus("loaded")};b.readAsDataURL(this.file)},upload:function(a,b){var c=b||{};a?(this.uploadUrl=a,this.xhr=new XMLHttpRequest,this.attachRequestListeners(),this.editor.fire("fileUploadRequest",{fileLoader:this,requestData:c})&&this.changeStatus("uploading")):(this.message=this.lang.filetools.noUrlError,this.changeStatus("error"))},attachRequestListeners:function(){function a(){"error"!=c.status&&(c.message=c.lang.filetools.networkError,c.changeStatus("error"))}function b(){"abort"!=c.status&&
c.changeStatus("abort")}var c=this,e=this.xhr;c.abort=function(){e.abort();b()};e.onerror=a;e.onabort=b;e.upload?(e.upload.onprogress=function(a){a.lengthComputable&&(c.uploadTotal||(c.uploadTotal=a.total),c.uploaded=a.loaded,c.update())},e.upload.onerror=a,e.upload.onabort=b):(c.uploadTotal=c.total,c.update());e.onload=function(){c.update();if("abort"!=c.status)if(c.uploaded=c.uploadTotal,200>e.status||299<e.status)c.message=c.lang.filetools["httpError"+e.status],c.message||(c.message=c.lang.filetools.httpError.replace("%1",
e.status)),c.changeStatus("error");else{for(var a={fileLoader:c},b=["message","fileName","url"],d=c.editor.fire("fileUploadResponse",a),l=0;l<b.length;l++){var p=b[l];"string"===typeof a[p]&&(c[p]=a[p])}c.responseData=a;delete c.responseData.fileLoader;!1===d?c.changeStatus("error"):c.changeStatus("uploaded")}}},changeStatus:function(a){this.status=a;if("error"==a||"abort"==a||"loaded"==a||"uploaded"==a)this.abort=function(){};this.fire(a);this.update()},update:function(){this.fire("update")},isFinished:function(){return!!this.status.match(/^(?:loaded|uploaded|error|abort)$/)}};
CKEDITOR.event.implementOn(a.prototype);CKEDITOR.event.implementOn(e.prototype);var c=/^data:(\S*?);base64,/;CKEDITOR.fileTools||(CKEDITOR.fileTools={});CKEDITOR.tools.extend(CKEDITOR.fileTools,{uploadRepository:a,fileLoader:e,getUploadUrl:function(a,b){var c=CKEDITOR.tools.capitalize;return b&&a[b+"UploadUrl"]?a[b+"UploadUrl"]:a.uploadUrl?a.uploadUrl:b&&a["filebrowser"+c(b,1)+"UploadUrl"]?a["filebrowser"+c(b,1)+"UploadUrl"]+"\x26responseType\x3djson":a.filebrowserUploadUrl?a.filebrowserUploadUrl+
"\x26responseType\x3djson":null},isTypeSupported:function(a,b){return!!a.type.match(b)},isFileUploadSupported:"function"===typeof FileReader&&"function"===typeof(new FileReader).readAsDataURL&&"function"===typeof FormData&&"function"===typeof(new FormData).append&&"function"===typeof XMLHttpRequest&&"function"===typeof Blob})}(),function(){function a(a,b){var c=[];if(b)for(var d in b)c.push(d+"\x3d"+encodeURIComponent(b[d]));else return a;return a+(-1!=a.indexOf("?")?"\x26":"?")+c.join("\x26")}function e(b){return!b.match(/command=QuickUpload/)||
b.match(/(\?|&)responseType=json/)?b:a(b,{responseType:"json"})}function b(a){a+="";return a.charAt(0).toUpperCase()+a.substr(1)}function c(){var c=this.getDialog(),d=c.getParentEditor();d._.filebrowserSe=this;var e=d.config["filebrowser"+b(c.getName())+"WindowWidth"]||d.config.filebrowserWindowWidth||"80%",c=d.config["filebrowser"+b(c.getName())+"WindowHeight"]||d.config.filebrowserWindowHeight||"70%",f=this.filebrowser.params||{};f.CKEditor=d.name;f.CKEditorFuncNum=d._.filebrowserFn;f.langCode||
(f.langCode=d.langCode);f=a(this.filebrowser.url,f);d.popup(f,e,c,d.config.filebrowserWindowFeatures||d.config.fileBrowserWindowFeatures)}function d(a){var b=new CKEDITOR.dom.element(a.$.form);b&&((a=b.$.elements.ckCsrfToken)?a=new CKEDITOR.dom.element(a):(a=new CKEDITOR.dom.element("input"),a.setAttributes({name:"ckCsrfToken",type:"hidden"}),b.append(a)),a.setAttribute("value",CKEDITOR.tools.getCsrfToken()))}function l(){var a=this.getDialog();a.getParentEditor()._.filebrowserSe=this;return a.getContentElement(this["for"][0],
this["for"][1]).getInputElement().$.value&&a.getContentElement(this["for"][0],this["for"][1]).getAction()?!0:!1}function k(b,c,d){var e=d.params||{};e.CKEditor=b.name;e.CKEditorFuncNum=b._.filebrowserFn;e.langCode||(e.langCode=b.langCode);c.action=a(d.url,e);c.filebrowser=d}function g(a,m,r,v){if(v&&v.length)for(var x,q=v.length;q--;)if(x=v[q],"hbox"!=x.type&&"vbox"!=x.type&&"fieldset"!=x.type||g(a,m,r,x.children),x.filebrowser)if("string"==typeof x.filebrowser&&(x.filebrowser={action:"fileButton"==
x.type?"QuickUpload":"Browse",target:x.filebrowser}),"Browse"==x.filebrowser.action){var t=x.filebrowser.url;void 0===t&&(t=a.config["filebrowser"+b(m)+"BrowseUrl"],void 0===t&&(t=a.config.filebrowserBrowseUrl));t&&(x.onClick=c,x.filebrowser.url=t,x.hidden=!1)}else if("QuickUpload"==x.filebrowser.action&&x["for"]&&(t=x.filebrowser.url,void 0===t&&(t=a.config["filebrowser"+b(m)+"UploadUrl"],void 0===t&&(t=a.config.filebrowserUploadUrl)),t)){var u=x.onClick;x.onClick=function(b){var c=b.sender,g=c.getDialog().getContentElement(this["for"][0],
this["for"][1]).getInputElement(),k=CKEDITOR.fileTools&&CKEDITOR.fileTools.isFileUploadSupported;if(u&&!1===u.call(c,b))return!1;if(l.call(c,b)){if("form"!==a.config.filebrowserUploadMethod&&k)return b=a.uploadRepository.create(g.$.files[0]),b.on("uploaded",function(a){var b=a.sender.responseData;f.call(a.sender.editor,b.url,b.message)}),b.on("error",h.bind(this)),b.on("abort",h.bind(this)),b.loadAndUpload(e(t)),"xhr";d(g);return!0}return!1};x.filebrowser.url=t;x.hidden=!1;k(a,r.getContents(x["for"][0]).get(x["for"][1]),
x.filebrowser)}}function h(a){var b={};try{b=JSON.parse(a.sender.xhr.response)||{}}catch(c){}this.enable();alert(b.error?b.error.message:a.sender.message)}function m(a,b,c){if(-1!==c.indexOf(";")){c=c.split(";");for(var d=0;d<c.length;d++)if(m(a,b,c[d]))return!0;return!1}return(a=a.getContents(b).get(c).filebrowser)&&a.url}function f(a,b){var c=this._.filebrowserSe.getDialog(),d=this._.filebrowserSe["for"],e=this._.filebrowserSe.filebrowser.onSelect;d&&c.getContentElement(d[0],d[1]).reset();if("function"!=
typeof b||!1!==b.call(this._.filebrowserSe))if(!e||!1!==e.call(this._.filebrowserSe,a,b))if("string"==typeof b&&b&&alert(b),a&&(d=this._.filebrowserSe,c=d.getDialog(),d=d.filebrowser.target||null))if(d=d.split(":"),e=c.getContentElement(d[0],d[1]))e.setValue(a),c.selectPage(d[0])}CKEDITOR.plugins.add("filebrowser",{requires:"popup,filetools",init:function(a){a._.filebrowserFn=CKEDITOR.tools.addFunction(f,a);a.on("destroy",function(){CKEDITOR.tools.removeFunction(this._.filebrowserFn)})}});CKEDITOR.on("dialogDefinition",
function(a){if(a.editor.plugins.filebrowser)for(var b=a.data.definition,c,d=0;d<b.contents.length;++d)if(c=b.contents[d])g(a.editor,a.data.name,b,c.elements),c.hidden&&c.filebrowser&&(c.hidden=!m(b,c.id,c.filebrowser))})}(),function(){function a(a){var d=a.config,l=a.fire("uiSpace",{space:"top",html:""}).html,k=function(){function f(a,c,d){h.setStyle(c,b(d));h.setStyle("position",a)}function g(a){var b=m.getDocumentPosition();switch(a){case "top":f("absolute","top",b.y-u-w);break;case "pin":f("fixed",
"top",y);break;case "bottom":f("absolute","top",b.y+(q.height||q.bottom-q.top)+w)}l=a}var l,m,x,q,t,u,A,z=d.floatSpaceDockedOffsetX||0,w=d.floatSpaceDockedOffsetY||0,C=d.floatSpacePinnedOffsetX||0,y=d.floatSpacePinnedOffsetY||0;return function(f){if(m=a.editable()){var n=f&&"focus"==f.name;n&&h.show();a.fire("floatingSpaceLayout",{show:n});h.removeStyle("left");h.removeStyle("right");x=h.getClientRect();q=m.getClientRect();t=e.getViewPaneSize();u=x.height;A="pageXOffset"in e.$?e.$.pageXOffset:CKEDITOR.document.$.documentElement.scrollLeft;
l?(u+w<=q.top?g("top"):u+w>t.height-q.bottom?g("pin"):g("bottom"),f=t.width/2,f=d.floatSpacePreferRight?"right":0<q.left&&q.right<t.width&&q.width>x.width?"rtl"==d.contentsLangDirection?"right":"left":f-q.left>q.right-f?"left":"right",x.width>t.width?(f="left",n=0):(n="left"==f?0<q.left?q.left:0:q.right<t.width?t.width-q.right:0,n+x.width>t.width&&(f="left"==f?"right":"left",n=0)),h.setStyle(f,b(("pin"==l?C:z)+n+("pin"==l?0:"left"==f?A:-A)))):(l="pin",g("pin"),k(f))}}}();if(l){var g=new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} '+
CKEDITOR.env.cssClass+'" dir\x3d"{langDir}" title\x3d"'+(CKEDITOR.env.gecko?" ":"")+'" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"'+(a.title?' aria-labelledby\x3d"cke_{name}_arialbl"':" ")+"\x3e"+(a.title?'\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e':" ")+'\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'),h=CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(g.output({content:l,
id:a.id,langDir:a.lang.dir,langCode:a.langCode,name:a.name,style:"display:none;z-index:"+(d.baseFloatZIndex-1),topId:a.ui.spaceId("top"),voiceLabel:a.title}))),m=CKEDITOR.tools.eventsBuffer(500,k),f=CKEDITOR.tools.eventsBuffer(100,k);h.unselectable();h.on("mousedown",function(a){a=a.data;a.getTarget().hasAscendant("a",1)||a.preventDefault()});a.on("focus",function(b){k(b);a.on("change",m.input);e.on("scroll",f.input);e.on("resize",f.input)});a.on("blur",function(){h.hide();a.removeListener("change",
m.input);e.removeListener("scroll",f.input);e.removeListener("resize",f.input)});a.on("destroy",function(){e.removeListener("scroll",f.input);e.removeListener("resize",f.input);h.clearCustomData();h.remove()});a.focusManager.hasFocus&&h.show();a.focusManager.add(h,1)}}var e=CKEDITOR.document.getWindow(),b=CKEDITOR.tools.cssLength;CKEDITOR.plugins.add("floatingspace",{init:function(b){b.on("loaded",function(){a(this)},null,null,20)}})}(),CKEDITOR.plugins.add("listblock",{requires:"panel",onLoad:function(){var a=
CKEDITOR.addTemplate("panel-list",'\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'),e=CKEDITOR.addTemplate("panel-list-item",'\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" href\x3d"javascript:void(\'{val}\')"  {onclick}\x3d"CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),b=CKEDITOR.addTemplate("panel-list-group",
'\x3ch1 id\x3d"{id}" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'),c=/\'/g;CKEDITOR.ui.panel.prototype.addListBlock=function(a,b){return this.addBlock(a,new CKEDITOR.ui.listBlock(this.getHolderElement(),b))};CKEDITOR.ui.listBlock=CKEDITOR.tools.createClass({base:CKEDITOR.ui.panel.block,$:function(a,b){b=b||{};var c=b.attributes||(b.attributes={});(this.multiSelect=!!b.multiSelect)&&(c["aria-multiselectable"]=!0);!c.role&&(c.role="listbox");this.base.apply(this,arguments);
this.element.setAttribute("role",c.role);c=this.keys;c[40]="next";c[9]="next";c[38]="prev";c[CKEDITOR.SHIFT+9]="prev";c[32]=CKEDITOR.env.ie?"mouseup":"click";CKEDITOR.env.ie&&(c[13]="mouseup");this._.pendingHtml=[];this._.pendingList=[];this._.items={};this._.groups={}},_:{close:function(){if(this._.started){var b=a.output({items:this._.pendingList.join("")});this._.pendingList=[];this._.pendingHtml.push(b);delete this._.started}},getClick:function(){this._.click||(this._.click=CKEDITOR.tools.addFunction(function(a){var b=
this.toggle(a);if(this.onClick)this.onClick(a,b)},this));return this._.click}},proto:{add:function(a,b,k){var g=CKEDITOR.tools.getNextId();this._.started||(this._.started=1,this._.size=this._.size||0);this._.items[a]=g;var h;h=CKEDITOR.tools.htmlEncodeAttr(a).replace(c,"\\'");a={id:g,val:h,onclick:CKEDITOR.env.ie?'onclick\x3d"return false;" onmouseup':"onclick",clickFn:this._.getClick(),title:CKEDITOR.tools.htmlEncodeAttr(k||a),text:b||a};this._.pendingList.push(e.output(a))},startGroup:function(a){this._.close();
var c=CKEDITOR.tools.getNextId();this._.groups[a]=c;this._.pendingHtml.push(b.output({id:c,label:a}))},commit:function(){this._.close();this.element.appendHtml(this._.pendingHtml.join(""));delete this._.size;this._.pendingHtml=[]},toggle:function(a){var b=this.isMarked(a);b?this.unmark(a):this.mark(a);return!b},hideGroup:function(a){var b=(a=this.element.getDocument().getById(this._.groups[a]))&&a.getNext();a&&(a.setStyle("display","none"),b&&"ul"==b.getName()&&b.setStyle("display","none"))},hideItem:function(a){this.element.getDocument().getById(this._.items[a]).setStyle("display",
"none")},showAll:function(){var a=this._.items,b=this._.groups,c=this.element.getDocument(),e;for(e in a)c.getById(a[e]).setStyle("display","");for(var h in b)a=c.getById(b[h]),e=a.getNext(),a.setStyle("display",""),e&&"ul"==e.getName()&&e.setStyle("display","")},mark:function(a){this.multiSelect||this.unmarkAll();a=this._.items[a];var b=this.element.getDocument().getById(a);b.addClass("cke_selected");this.element.getDocument().getById(a+"_option").setAttribute("aria-selected",!0);this.onMark&&this.onMark(b)},
markFirstDisplayed:function(){var a=this;this._.markFirstDisplayed(function(){a.multiSelect||a.unmarkAll()})},unmark:function(a){var b=this.element.getDocument();a=this._.items[a];var c=b.getById(a);c.removeClass("cke_selected");b.getById(a+"_option").removeAttribute("aria-selected");this.onUnmark&&this.onUnmark(c)},unmarkAll:function(){var a=this._.items,b=this.element.getDocument(),c;for(c in a){var e=a[c];b.getById(e).removeClass("cke_selected");b.getById(e+"_option").removeAttribute("aria-selected")}this.onUnmark&&
this.onUnmark()},isMarked:function(a){return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected")},focus:function(a){this._.focusIndex=-1;var b=this.element.getElementsByTag("a"),c,e=-1;if(a)for(c=this.element.getDocument().getById(this._.items[a]).getFirst();a=b.getItem(++e);){if(a.equals(c)){this._.focusIndex=e;break}}else this.element.focus();c&&setTimeout(function(){c.focus()},0)}}})}}),CKEDITOR.plugins.add("richcombo",{requires:"floatpanel,listblock,button",beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_RICHCOMBO,
CKEDITOR.ui.richCombo.handler)}}),function(){var a='\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"'+(CKEDITOR.env.gecko&&!CKEDITOR.env.hc?"":" href\x3d\"javascript:void('{titleJs}')\"")+' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"true"';CKEDITOR.env.gecko&&CKEDITOR.env.mac&&
(a+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(a+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');var a=a+(' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" '+(CKEDITOR.env.ie?'onclick\x3d"return false;" onmouseup':"onclick")+'\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e'+
(CKEDITOR.env.hc?"\x26#9660;":CKEDITOR.env.air?"\x26nbsp;":"")+"\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"),e=CKEDITOR.addTemplate("combo",a);CKEDITOR.UI_RICHCOMBO="richcombo";CKEDITOR.ui.richCombo=CKEDITOR.tools.createClass({$:function(a){CKEDITOR.tools.extend(this,a,{canGroup:!1,title:a.label,modes:{wysiwyg:1},editorFocus:1});a=this.panel||{};delete this.panel;this.id=CKEDITOR.tools.getNextNumber();this.document=a.parent&&a.parent.getDocument()||CKEDITOR.document;a.className="cke_combopanel";
a.block={multiSelect:a.multiSelect,attributes:a.attributes};a.toolbarRelated=!0;this._={panelDefinition:a,items:{}}},proto:{renderHtml:function(a){var c=[];this.render(a,c);return c.join("")},render:function(a,c){function d(){if(this.getState()!=CKEDITOR.TRISTATE_ON){var c=this.modes[a.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED;a.readOnly&&!this.readOnly&&(c=CKEDITOR.TRISTATE_DISABLED);this.setState(c);this.setValue("");c!=CKEDITOR.TRISTATE_DISABLED&&this.refresh&&this.refresh()}}var l=
CKEDITOR.env,k="cke_"+this.id,g=CKEDITOR.tools.addFunction(function(c){p&&(a.unlockSelection(1),p=0);m.execute(c)},this),h=this,m={id:k,combo:this,focus:function(){CKEDITOR.document.getById(k).getChild(1).focus()},execute:function(c){var d=h._;if(d.state!=CKEDITOR.TRISTATE_DISABLED)if(h.createPanel(a),d.on)d.panel.hide();else{h.commit();var e=h.getValue();e?d.list.mark(e):d.list.unmarkAll();d.panel.showBlock(h.id,new CKEDITOR.dom.element(c),4)}},clickFn:g};a.on("activeFilterChange",d,this);a.on("mode",
d,this);a.on("selectionChange",d,this);!this.readOnly&&a.on("readOnly",d,this);var f=CKEDITOR.tools.addFunction(function(a,b){a=new CKEDITOR.dom.event(a);var c=a.getKeystroke();switch(c){case 13:case 32:case 40:CKEDITOR.tools.callFunction(g,b);break;default:m.onkey(m,c)}a.preventDefault()}),n=CKEDITOR.tools.addFunction(function(){m.onfocus&&m.onfocus()}),p=0;m.keyDownFn=f;l={id:k,name:this.name||this.command,label:this.label,title:this.title,cls:this.className||"",titleJs:l.gecko&&!l.hc?"":(this.title||
"").replace("'",""),keydownFn:f,focusFn:n,clickFn:g};e.output(l,c);if(this.onRender)this.onRender();return m},createPanel:function(a){if(!this._.panel){var c=this._.panelDefinition,d=this._.panelDefinition.block,e=c.parent||CKEDITOR.document.getBody(),k="cke_combopanel__"+this.name,g=new CKEDITOR.ui.floatPanel(a,e,c),c=g.addListBlock(this.id,d),h=this;g.onShow=function(){this.element.addClass(k);h.setState(CKEDITOR.TRISTATE_ON);h._.on=1;h.editorFocus&&!a.focusManager.hasFocus&&a.focus();if(h.onOpen)h.onOpen()};
g.onHide=function(c){this.element.removeClass(k);h.setState(h.modes&&h.modes[a.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);h._.on=0;if(!c&&h.onClose)h.onClose()};g.onEscape=function(){g.hide(1)};c.onClick=function(a,b){h.onClick&&h.onClick.call(h,a,b);g.hide()};this._.panel=g;this._.list=c;g.getBlock(this.id).onHide=function(){h._.on=0;h.setState(CKEDITOR.TRISTATE_OFF)};this.init&&this.init()}},setValue:function(a,c){this._.value=a;var d=this.document.getById("cke_"+this.id+"_text");d&&
(a||c?d.removeClass("cke_combo_inlinelabel"):(c=this.label,d.addClass("cke_combo_inlinelabel")),d.setText("undefined"!=typeof c?c:a))},getValue:function(){return this._.value||""},unmarkAll:function(){this._.list.unmarkAll()},mark:function(a){this._.list.mark(a)},hideItem:function(a){this._.list.hideItem(a)},hideGroup:function(a){this._.list.hideGroup(a)},showAll:function(){this._.list.showAll()},add:function(a,c,d){this._.items[a]=d||a;this._.list.add(a,c,d)},startGroup:function(a){this._.list.startGroup(a)},
commit:function(){this._.committed||(this._.list.commit(),this._.committed=1,CKEDITOR.ui.fire("ready",this));this._.committed=1},setState:function(a){if(this._.state!=a){var c=this.document.getById("cke_"+this.id);c.setState(a,"cke_combo");a==CKEDITOR.TRISTATE_DISABLED?c.setAttribute("aria-disabled",!0):c.removeAttribute("aria-disabled");this._.state=a}},getState:function(){return this._.state},enable:function(){this._.state==CKEDITOR.TRISTATE_DISABLED&&this.setState(this._.lastState)},disable:function(){this._.state!=
CKEDITOR.TRISTATE_DISABLED&&(this._.lastState=this._.state,this.setState(CKEDITOR.TRISTATE_DISABLED))}},statics:{handler:{create:function(a){return new CKEDITOR.ui.richCombo(a)}}}});CKEDITOR.ui.prototype.addRichCombo=function(a,c){this.add(a,CKEDITOR.UI_RICHCOMBO,c)}}(),CKEDITOR.plugins.add("format",{requires:"richcombo",init:function(a){if(!a.blockless){for(var e=a.config,b=a.lang.format,c=e.format_tags.split(";"),d={},l=0,k=[],g=0;g<c.length;g++){var h=c[g],m=new CKEDITOR.style(e["format_"+h]);
if(!a.filter.customConfig||a.filter.check(m))l++,d[h]=m,d[h]._.enterMode=a.config.enterMode,k.push(m)}0!==l&&a.ui.addRichCombo("Format",{label:b.label,title:b.panelTitle,toolbar:"styles,20",allowedContent:k,panel:{css:[CKEDITOR.skin.getPath("editor")].concat(e.contentsCss),multiSelect:!1,attributes:{"aria-label":b.panelTitle}},init:function(){this.startGroup(b.panelTitle);for(var a in d){var c=b["tag_"+a];this.add(a,d[a].buildPreview(c),c)}},onClick:function(b){a.focus();a.fire("saveSnapshot");b=
d[b];var c=a.elementPath();b.checkActive(c,a)||a.applyStyle(b);setTimeout(function(){a.fire("saveSnapshot")},0)},onRender:function(){a.on("selectionChange",function(b){var c=this.getValue();b=b.data.path;this.refresh();for(var e in d)if(d[e].checkActive(b,a)){e!=c&&this.setValue(e,a.lang.format["tag_"+e]);return}this.setValue("")},this)},onOpen:function(){this.showAll();for(var b in d)a.activeFilter.check(d[b])||this.hideItem(b)},refresh:function(){var b=a.elementPath();if(b){if(b.isContextFor("p"))for(var c in d)if(a.activeFilter.check(d[c]))return;
this.setState(CKEDITOR.TRISTATE_DISABLED)}}})}}}),CKEDITOR.config.format_tags="p;h1;h2;h3;h4;h5;h6;pre;address;div",CKEDITOR.config.format_p={element:"p"},CKEDITOR.config.format_div={element:"div"},CKEDITOR.config.format_pre={element:"pre"},CKEDITOR.config.format_address={element:"address"},CKEDITOR.config.format_h1={element:"h1"},CKEDITOR.config.format_h2={element:"h2"},CKEDITOR.config.format_h3={element:"h3"},CKEDITOR.config.format_h4={element:"h4"},CKEDITOR.config.format_h5={element:"h5"},CKEDITOR.config.format_h6=
{element:"h6"},function(){var a={canUndo:!1,exec:function(a){var b=a.document.createElement("hr");a.insertElement(b)},allowedContent:"hr",requiredContent:"hr"};CKEDITOR.plugins.add("horizontalrule",{init:function(e){e.blockless||(e.addCommand("horizontalrule",a),e.ui.addButton&&e.ui.addButton("HorizontalRule",{label:e.lang.horizontalrule.toolbar,command:"horizontalrule",toolbar:"insert,40"}))}})}(),CKEDITOR.plugins.add("htmlwriter",{init:function(a){var e=new CKEDITOR.htmlWriter;e.forceSimpleAmpersand=
a.config.forceSimpleAmpersand;e.indentationChars=a.config.dataIndentationChars||"\t";a.dataProcessor.writer=e}}),CKEDITOR.htmlWriter=CKEDITOR.tools.createClass({base:CKEDITOR.htmlParser.basicWriter,$:function(){this.base();this.indentationChars="\t";this.selfClosingEnd=" /\x3e";this.lineBreakChars="\n";this.sortAttributes=1;this._.indent=0;this._.indentation="";this._.inPre=0;this._.rules={};var a=CKEDITOR.dtd,e;for(e in CKEDITOR.tools.extend({},a.$nonBodyContent,a.$block,a.$listItem,a.$tableContent))this.setRules(e,
{indent:!a[e]["#"],breakBeforeOpen:1,breakBeforeClose:!a[e]["#"],breakAfterClose:1,needsSpace:e in a.$block&&!(e in{li:1,dt:1,dd:1})});this.setRules("br",{breakAfterOpen:1});this.setRules("title",{indent:0,breakAfterOpen:0});this.setRules("style",{indent:0,breakBeforeClose:1});this.setRules("pre",{breakAfterOpen:1,indent:0})},proto:{openTag:function(a){var e=this._.rules[a];this._.afterCloser&&e&&e.needsSpace&&this._.needsSpace&&this._.output.push("\n");this._.indent?this.indentation():e&&e.breakBeforeOpen&&
(this.lineBreak(),this.indentation());this._.output.push("\x3c",a);this._.afterCloser=0},openTagClose:function(a,e){var b=this._.rules[a];e?(this._.output.push(this.selfClosingEnd),b&&b.breakAfterClose&&(this._.needsSpace=b.needsSpace)):(this._.output.push("\x3e"),b&&b.indent&&(this._.indentation+=this.indentationChars));b&&b.breakAfterOpen&&this.lineBreak();"pre"==a&&(this._.inPre=1)},attribute:function(a,e){"string"==typeof e&&(this.forceSimpleAmpersand&&(e=e.replace(/&amp;/g,"\x26")),e=CKEDITOR.tools.htmlEncodeAttr(e));
this._.output.push(" ",a,'\x3d"',e,'"')},closeTag:function(a){var e=this._.rules[a];e&&e.indent&&(this._.indentation=this._.indentation.substr(this.indentationChars.length));this._.indent?this.indentation():e&&e.breakBeforeClose&&(this.lineBreak(),this.indentation());this._.output.push("\x3c/",a,"\x3e");"pre"==a&&(this._.inPre=0);e&&e.breakAfterClose&&(this.lineBreak(),this._.needsSpace=e.needsSpace);this._.afterCloser=1},text:function(a){this._.indent&&(this.indentation(),!this._.inPre&&(a=CKEDITOR.tools.ltrim(a)));
this._.output.push(a)},comment:function(a){this._.indent&&this.indentation();this._.output.push("\x3c!--",a,"--\x3e")},lineBreak:function(){!this._.inPre&&0<this._.output.length&&this._.output.push(this.lineBreakChars);this._.indent=1},indentation:function(){!this._.inPre&&this._.indentation&&this._.output.push(this._.indentation);this._.indent=0},reset:function(){this._.output=[];this._.indent=0;this._.indentation="";this._.afterCloser=0;this._.inPre=0;this._.needsSpace=0},setRules:function(a,e){var b=
this._.rules[a];b?CKEDITOR.tools.extend(b,e,!0):this._.rules[a]=e}}}),function(){function a(a,c){c||(c=a.getSelection().getSelectedElement());if(c&&c.is("img")&&!c.data("cke-realelement")&&!c.isReadOnly())return c}function e(a){var c=a.getStyle("float");if("inherit"==c||"none"==c)c=0;c||(c=a.getAttribute("align"));return c}CKEDITOR.plugins.add("image",{requires:"dialog",init:function(b){if(!b.plugins.image2){CKEDITOR.dialog.add("image",this.path+"dialogs/image.js");var c="img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
CKEDITOR.dialog.isTabEnabled(b,"image","advanced")&&(c="img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");b.addCommand("image",new CKEDITOR.dialogCommand("image",{allowedContent:c,requiredContent:"img[alt,src]",contentTransformations:[["img{width}: sizeToStyle","img[width]: sizeToAttribute"],["img{float}: alignmentToStyle","img[align]: alignmentToAttribute"]]}));b.ui.addButton&&b.ui.addButton("Image",{label:b.lang.common.image,command:"image",toolbar:"insert,10"});b.on("doubleclick",function(a){var b=
a.data.element;!b.is("img")||b.data("cke-realelement")||b.isReadOnly()||(a.data.dialog="image")});b.addMenuItems&&b.addMenuItems({image:{label:b.lang.image.menu,command:"image",group:"image"}});b.contextMenu&&b.contextMenu.addListener(function(c){if(a(b,c))return{image:CKEDITOR.TRISTATE_OFF}})}},afterInit:function(b){function c(c){var l=b.getCommand("justify"+c);if(l){if("left"==c||"right"==c)l.on("exec",function(k){var g=a(b),h;g&&(h=e(g),h==c?(g.removeStyle("float"),c==e(g)&&g.removeAttribute("align")):
g.setStyle("float",c),k.cancel())});l.on("refresh",function(k){var g=a(b);g&&(g=e(g),this.setState(g==c?CKEDITOR.TRISTATE_ON:"right"==c||"left"==c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED),k.cancel())})}}b.plugins.image2||(c("left"),c("right"),c("center"),c("block"))}})}(),CKEDITOR.config.image_removeLinkByEmptyURL=!0,function(){function a(a,b){var d=c.exec(a),e=c.exec(b);if(d){if(!d[2]&&"px"==e[2])return e[1];if("px"==d[2]&&!e[2])return e[1]+"px"}return b}var e=CKEDITOR.htmlParser.cssStyle,
b=CKEDITOR.tools.cssLength,c=/^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,d={elements:{$:function(b){var c=b.attributes;if((c=(c=(c=c&&c["data-cke-realelement"])&&new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(c)))&&c.children[0])&&b.attributes["data-cke-resizable"]){var d=(new e(b)).rules;b=c.attributes;var h=d.width,d=d.height;h&&(b.width=a(b.width,h));d&&(b.height=a(b.height,d))}return c}}};CKEDITOR.plugins.add("fakeobjects",{init:function(a){a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}",
"fakeobjects")},afterInit:function(a){(a=(a=a.dataProcessor)&&a.htmlFilter)&&a.addRules(d,{applyToAll:!0})}});CKEDITOR.editor.prototype.createFakeElement=function(a,c,d,h){var m=this.lang.fakeobjects,m=m[d]||m.unknown;c={"class":c,"data-cke-realelement":encodeURIComponent(a.getOuterHtml()),"data-cke-real-node-type":a.type,alt:m,title:m,align:a.getAttribute("align")||""};CKEDITOR.env.hc||(c.src=CKEDITOR.tools.transparentImageData);d&&(c["data-cke-real-element-type"]=d);h&&(c["data-cke-resizable"]=
h,d=new e,h=a.getAttribute("width"),a=a.getAttribute("height"),h&&(d.rules.width=b(h)),a&&(d.rules.height=b(a)),d.populate(c));return this.document.createElement("img",{attributes:c})};CKEDITOR.editor.prototype.createFakeParserElement=function(a,c,d,h){var m=this.lang.fakeobjects,m=m[d]||m.unknown,f;f=new CKEDITOR.htmlParser.basicWriter;a.writeHtml(f);f=f.getHtml();c={"class":c,"data-cke-realelement":encodeURIComponent(f),"data-cke-real-node-type":a.type,alt:m,title:m,align:a.attributes.align||""};
CKEDITOR.env.hc||(c.src=CKEDITOR.tools.transparentImageData);d&&(c["data-cke-real-element-type"]=d);h&&(c["data-cke-resizable"]=h,h=a.attributes,a=new e,d=h.width,h=h.height,void 0!==d&&(a.rules.width=b(d)),void 0!==h&&(a.rules.height=b(h)),a.populate(c));return new CKEDITOR.htmlParser.element("img",c)};CKEDITOR.editor.prototype.restoreRealElement=function(b){if(b.data("cke-real-node-type")!=CKEDITOR.NODE_ELEMENT)return null;var c=CKEDITOR.dom.element.createFromHtml(decodeURIComponent(b.data("cke-realelement")),
this.document);if(b.data("cke-resizable")){var d=b.getStyle("width");b=b.getStyle("height");d&&c.setAttribute("width",a(c.getAttribute("width"),d));b&&c.setAttribute("height",a(c.getAttribute("height"),b))}return c}}(),"use strict",function(){function a(a){return a.replace(/'/g,"\\$\x26")}function e(a){for(var b,c=a.length,d=[],e=0;e<c;e++)b=a.charCodeAt(e),d.push(b);return"String.fromCharCode("+d.join(",")+")"}function b(b,c){var d=b.plugins.link,e=d.compiledProtectionFunction.params,f,g;g=[d.compiledProtectionFunction.name,
"("];for(var h=0;h<e.length;h++)d=e[h].toLowerCase(),f=c[d],0<h&&g.push(","),g.push("'",f?a(encodeURIComponent(c[d])):"","'");g.push(")");return g.join("")}function c(a){a=a.config.emailProtection||"";var b;a&&"encode"!=a&&(b={},a.replace(/^([^(]+)\(([^)]+)\)$/,function(a,c,d){b.name=c;b.params=[];d.replace(/[^,\s]+/g,function(a){b.params.push(a)})}));return b}CKEDITOR.plugins.add("link",{requires:"dialog,fakeobjects",onLoad:function(){function a(b){return c.replace(/%1/g,"rtl"==b?"right":"left").replace(/%2/g,
"cke_contents_"+b)}var b="background:url("+CKEDITOR.getUrl(this.path+"images"+(CKEDITOR.env.hidpi?"/hidpi":"")+"/anchor.png")+") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",c=".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{"+b+"padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{"+b+"width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";CKEDITOR.addCss(a("ltr")+a("rtl"))},init:function(a){var b="a[!href]";
CKEDITOR.dialog.isTabEnabled(a,"link","advanced")&&(b=b.replace("]",",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)"));CKEDITOR.dialog.isTabEnabled(a,"link","target")&&(b=b.replace("]",",target,onclick]"));a.addCommand("link",new CKEDITOR.dialogCommand("link",{allowedContent:b,requiredContent:"a[href]"}));a.addCommand("anchor",new CKEDITOR.dialogCommand("anchor",{allowedContent:"a[!name,id]",requiredContent:"a[name]"}));a.addCommand("unlink",new CKEDITOR.unlinkCommand);
a.addCommand("removeAnchor",new CKEDITOR.removeAnchorCommand);a.setKeystroke(CKEDITOR.CTRL+76,"link");a.ui.addButton&&(a.ui.addButton("Link",{label:a.lang.link.toolbar,command:"link",toolbar:"links,10"}),a.ui.addButton("Unlink",{label:a.lang.link.unlink,command:"unlink",toolbar:"links,20"}),a.ui.addButton("Anchor",{label:a.lang.link.anchor.toolbar,command:"anchor",toolbar:"links,30"}));CKEDITOR.dialog.add("link",this.path+"dialogs/link.js");CKEDITOR.dialog.add("anchor",this.path+"dialogs/anchor.js");
a.on("doubleclick",function(b){var c=b.data.element.getAscendant({a:1,img:1},!0);c&&!c.isReadOnly()&&(c.is("a")?(b.data.dialog=!c.getAttribute("name")||c.getAttribute("href")&&c.getChildCount()?"link":"anchor",b.data.link=c):CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,c)&&(b.data.dialog="anchor"))},null,null,0);a.on("doubleclick",function(b){b.data.dialog in{link:1,anchor:1}&&b.data.link&&a.getSelection().selectElement(b.data.link)},null,null,20);a.addMenuItems&&a.addMenuItems({anchor:{label:a.lang.link.anchor.menu,
command:"anchor",group:"anchor",order:1},removeAnchor:{label:a.lang.link.anchor.remove,command:"removeAnchor",group:"anchor",order:5},link:{label:a.lang.link.menu,command:"link",group:"link",order:1},unlink:{label:a.lang.link.unlink,command:"unlink",group:"link",order:5}});a.contextMenu&&a.contextMenu.addListener(function(b){if(!b||b.isReadOnly())return null;b=CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,b);if(!b&&!(b=CKEDITOR.plugins.link.getSelectedLink(a)))return null;var c={};b.getAttribute("href")&&
b.getChildCount()&&(c={link:CKEDITOR.TRISTATE_OFF,unlink:CKEDITOR.TRISTATE_OFF});b&&b.hasAttribute("name")&&(c.anchor=c.removeAnchor=CKEDITOR.TRISTATE_OFF);return c});this.compiledProtectionFunction=c(a)},afterInit:function(a){a.dataProcessor.dataFilter.addRules({elements:{a:function(b){return b.attributes.name?b.children.length?null:a.createFakeParserElement(b,"cke_anchor","anchor"):null}}});var b=a._.elementsPath&&a._.elementsPath.filters;b&&b.push(function(b,c){if("a"==c&&(CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,
b)||b.getAttribute("name")&&(!b.getAttribute("href")||!b.getChildCount())))return"anchor"})}});var d=/^javascript:/,l=/^mailto:([^?]+)(?:\?(.+))?$/,k=/subject=([^;?:@&=$,\/]*)/i,g=/body=([^;?:@&=$,\/]*)/i,h=/^#(.*)$/,m=/^((?:http|https|ftp|news):\/\/)?(.*)$/,f=/^(_(?:self|top|parent|blank))$/,n=/^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,p=/^javascript:([^(]+)\(([^)]+)\)$/,r=/\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,
v=/(?:^|,)([^=]+)=(\d+|yes|no)/gi,x={id:"advId",dir:"advLangDir",accessKey:"advAccessKey",name:"advName",lang:"advLangCode",tabindex:"advTabIndex",title:"advTitle",type:"advContentType","class":"advCSSClasses",charset:"advCharset",style:"advStyles",rel:"advRel"};CKEDITOR.plugins.link={getSelectedLink:function(a,b){var c=a.getSelection(),d=c.getSelectedElement(),e=c.getRanges(),f=[],g;if(!b&&d&&d.is("a"))return d;for(d=0;d<e.length;d++)if(g=c.getRanges()[d],g.shrink(CKEDITOR.SHRINK_ELEMENT,!0,{skipBogus:!0}),
(g=a.elementPath(g.getCommonAncestor()).contains("a",1))&&b)f.push(g);else if(g)return g;return b?f:null},getEditorAnchors:function(a){for(var b=a.editable(),c=b.isInline()&&!a.plugins.divarea?a.document:b,b=c.getElementsByTag("a"),c=c.getElementsByTag("img"),d=[],e=0,f;f=b.getItem(e++);)(f.data("cke-saved-name")||f.hasAttribute("name"))&&d.push({name:f.data("cke-saved-name")||f.getAttribute("name"),id:f.getAttribute("id")});for(e=0;f=c.getItem(e++);)(f=this.tryRestoreFakeAnchor(a,f))&&d.push({name:f.getAttribute("name"),
id:f.getAttribute("id")});return d},fakeAnchor:!0,tryRestoreFakeAnchor:function(a,b){if(b&&b.data("cke-real-element-type")&&"anchor"==b.data("cke-real-element-type")){var c=a.restoreRealElement(b);if(c.data("cke-saved-name"))return c}},parseLinkAttributes:function(a,b){var c=b&&(b.data("cke-saved-href")||b.getAttribute("href"))||"",e=a.plugins.link.compiledProtectionFunction,z=a.config.emailProtection,w,C={};c.match(d)&&("encode"==z?c=c.replace(n,function(a,b,c){c=c||"";return"mailto:"+String.fromCharCode.apply(String,
b.split(","))+c.replace(/\\'/g,"'")}):z&&c.replace(p,function(a,b,c){if(b==e.name){C.type="email";a=C.email={};b=/(^')|('$)/g;c=c.match(/[^,\s]+/g);for(var d=c.length,f,g,h=0;h<d;h++)f=decodeURIComponent,g=c[h].replace(b,"").replace(/\\'/g,"'"),g=f(g),f=e.params[h].toLowerCase(),a[f]=g;a.address=[a.name,a.domain].join("@")}}));if(!C.type)if(z=c.match(h))C.type="anchor",C.anchor={},C.anchor.name=C.anchor.id=z[1];else if(z=c.match(l)){w=c.match(k);c=c.match(g);C.type="email";var y=C.email={};y.address=
z[1];w&&(y.subject=decodeURIComponent(w[1]));c&&(y.body=decodeURIComponent(c[1]))}else c&&(w=c.match(m))&&(C.type="url",C.url={},C.url.protocol=w[1],C.url.url=w[2]);if(b){if(c=b.getAttribute("target"))C.target={type:c.match(f)?c:"frame",name:c};else if(c=(c=b.data("cke-pa-onclick")||b.getAttribute("onclick"))&&c.match(r))for(C.target={type:"popup",name:c[1]};z=v.exec(c[2]);)"yes"!=z[2]&&"1"!=z[2]||z[1]in{height:1,width:1,top:1,left:1}?isFinite(z[2])&&(C.target[z[1]]=z[2]):C.target[z[1]]=!0;null!==
b.getAttribute("download")&&(C.download=!0);var c={},B;for(B in x)(z=b.getAttribute(B))&&(c[x[B]]=z);if(B=b.data("cke-saved-name")||c.advName)c.advName=B;CKEDITOR.tools.isEmpty(c)||(C.advanced=c)}return C},getLinkAttributes:function(c,d){var f=c.config.emailProtection||"",g={};switch(d.type){case "url":var f=d.url&&void 0!==d.url.protocol?d.url.protocol:"http://",h=d.url&&CKEDITOR.tools.trim(d.url.url)||"";g["data-cke-saved-href"]=0===h.indexOf("/")?h:f+h;break;case "anchor":f=d.anchor&&d.anchor.id;
g["data-cke-saved-href"]="#"+(d.anchor&&d.anchor.name||f||"");break;case "email":var k=d.email,h=k.address;switch(f){case "":case "encode":var m=encodeURIComponent(k.subject||""),l=encodeURIComponent(k.body||""),k=[];m&&k.push("subject\x3d"+m);l&&k.push("body\x3d"+l);k=k.length?"?"+k.join("\x26"):"";"encode"==f?(f=["javascript:void(location.href\x3d'mailto:'+",e(h)],k&&f.push("+'",a(k),"'"),f.push(")")):f=["mailto:",h,k];break;default:f=h.split("@",2),k.name=f[0],k.domain=f[1],f=["javascript:",b(c,
k)]}g["data-cke-saved-href"]=f.join("")}if(d.target)if("popup"==d.target.type){for(var f=["window.open(this.href, '",d.target.name||"","', '"],n="resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "),h=n.length,m=function(a){d.target[a]&&n.push(a+"\x3d"+d.target[a])},k=0;k<h;k++)n[k]+=d.target[n[k]]?"\x3dyes":"\x3dno";m("width");m("left");m("height");m("top");f.push(n.join(","),"'); return false;");g["data-cke-pa-onclick"]=f.join("")}else"notSet"!=d.target.type&&d.target.name&&
(g.target=d.target.name);d.download&&(g.download="");if(d.advanced){for(var p in x)(f=d.advanced[x[p]])&&(g[p]=f);g.name&&(g["data-cke-saved-name"]=g.name)}g["data-cke-saved-href"]&&(g.href=g["data-cke-saved-href"]);p={target:1,onclick:1,"data-cke-pa-onclick":1,"data-cke-saved-name":1,download:1};d.advanced&&CKEDITOR.tools.extend(p,x);for(var r in g)delete p[r];return{set:g,removed:CKEDITOR.tools.objectKeys(p)}},showDisplayTextForElement:function(a,b){var c={img:1,table:1,tbody:1,thead:1,tfoot:1,
input:1,select:1,textarea:1},d=b.getSelection();return b.widgets&&b.widgets.focused||d&&1<d.getRanges().length?!1:!a||!a.getName||!a.is(c)}};CKEDITOR.unlinkCommand=function(){};CKEDITOR.unlinkCommand.prototype={exec:function(a){if(CKEDITOR.env.ie){var b=a.getSelection().getRanges()[0],c=b.getPreviousEditableNode()&&b.getPreviousEditableNode().getAscendant("a",!0)||b.getNextEditableNode()&&b.getNextEditableNode().getAscendant("a",!0),d;b.collapsed&&c&&(d=b.createBookmark(),b.selectNodeContents(c),
b.select())}c=new CKEDITOR.style({element:"a",type:CKEDITOR.STYLE_INLINE,alwaysRemoveElement:1});a.removeStyle(c);d&&(b.moveToBookmark(d),b.select())},refresh:function(a,b){var c=b.lastElement&&b.lastElement.getAscendant("a",!0);c&&"a"==c.getName()&&c.getAttribute("href")&&c.getChildCount()?this.setState(CKEDITOR.TRISTATE_OFF):this.setState(CKEDITOR.TRISTATE_DISABLED)},contextSensitive:1,startDisabled:1,requiredContent:"a[href]",editorFocus:1};CKEDITOR.removeAnchorCommand=function(){};CKEDITOR.removeAnchorCommand.prototype=
{exec:function(a){var b=a.getSelection(),c=b.createBookmarks(),d;if(b&&(d=b.getSelectedElement())&&(d.getChildCount()?d.is("a"):CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,d)))d.remove(1);else if(d=CKEDITOR.plugins.link.getSelectedLink(a))d.hasAttribute("href")?(d.removeAttributes({name:1,"data-cke-saved-name":1}),d.removeClass("cke_anchor")):d.remove(1);b.selectBookmarks(c)},requiredContent:"a[name]"};CKEDITOR.tools.extend(CKEDITOR.config,{linkShowAdvancedTab:!0,linkShowTargetTab:!0})}(),"use strict",
function(){function a(a,b,c){return n(b)&&n(c)&&c.equals(b.getNext(function(a){return!(aa(a)||ba(a)||p(a))}))}function e(a){this.upper=a[0];this.lower=a[1];this.set.apply(this,a.slice(2))}function b(a){var b=a.element;if(b&&n(b)&&(b=b.getAscendant(a.triggers,!0))&&a.editable.contains(b)){var c=k(b);if("true"==c.getAttribute("contenteditable"))return b;if(c.is(a.triggers))return c}return null}function c(a,b,c){z(a,b);z(a,c);a=b.size.bottom;c=c.size.top;return a&&c?0|(a+c)/2:a||c}function d(a,b,c){return b=
b[c?"getPrevious":"getNext"](function(b){return b&&b.type==CKEDITOR.NODE_TEXT&&!aa(b)||n(b)&&!p(b)&&!f(a,b)})}function l(a,b,c){return a>b&&a<c}function k(a,b){if(a.data("cke-editable"))return null;for(b||(a=a.getParent());a&&!a.data("cke-editable");){if(a.hasAttribute("contenteditable"))return a;a=a.getParent()}return null}function g(a){var b=a.doc,c=E('\x3cspan contenteditable\x3d"false" data-cke-magic-line\x3d"1" style\x3d"'+U+"position:absolute;border-top:1px dashed "+a.boxColor+'"\x3e\x3c/span\x3e',
b),d=CKEDITOR.getUrl(this.path+"images/"+(F.hidpi?"hidpi/":"")+"icon"+(a.rtl?"-rtl":"")+".png");B(c,{attach:function(){this.wrap.getParent()||this.wrap.appendTo(a.editable,!0);return this},lineChildren:[B(E('\x3cspan title\x3d"'+a.editor.lang.magicline.title+'" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e',b),{base:U+"height:17px;width:17px;"+(a.rtl?"left":"right")+":17px;background:url("+d+") center no-repeat "+a.boxColor+";cursor:pointer;"+(F.hc?"font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;":
"")+(F.hidpi?"background-size: 9px 10px;":""),looks:["top:-8px; border-radius: 2px;","top:-17px; border-radius: 2px 2px 0px 0px;","top:-1px; border-radius: 0px 0px 2px 2px;"]}),B(E(O,b),{base:T+"left:0px;border-left-color:"+a.boxColor+";",looks:["border-width:8px 0 8px 8px;top:-8px","border-width:8px 0 0 8px;top:-8px","border-width:0 0 8px 8px;top:0px"]}),B(E(O,b),{base:T+"right:0px;border-right-color:"+a.boxColor+";",looks:["border-width:8px 8px 8px 0;top:-8px","border-width:8px 8px 0 0;top:-8px",
"border-width:0 8px 8px 0;top:0px"]})],detach:function(){this.wrap.getParent()&&this.wrap.remove();return this},mouseNear:function(){z(a,this);var b=a.holdDistance,c=this.size;return c&&l(a.mouse.y,c.top-b,c.bottom+b)&&l(a.mouse.x,c.left-b,c.right+b)?!0:!1},place:function(){var b=a.view,c=a.editable,d=a.trigger,e=d.upper,f=d.lower,g=e||f,h=g.getParent(),k={};this.trigger=d;e&&z(a,e,!0);f&&z(a,f,!0);z(a,h,!0);a.inInlineMode&&w(a,!0);h.equals(c)?(k.left=b.scroll.x,k.right=-b.scroll.x,k.width=""):(k.left=
g.size.left-g.size.margin.left+b.scroll.x-(a.inInlineMode?b.editable.left+b.editable.border.left:0),k.width=g.size.outerWidth+g.size.margin.left+g.size.margin.right+b.scroll.x,k.right="");e&&f?k.top=e.size.margin.bottom===f.size.margin.top?0|e.size.bottom+e.size.margin.bottom/2:e.size.margin.bottom<f.size.margin.top?e.size.bottom+e.size.margin.bottom:e.size.bottom+e.size.margin.bottom-f.size.margin.top:e?f||(k.top=e.size.bottom+e.size.margin.bottom):k.top=f.size.top-f.size.margin.top;d.is(S)||l(k.top,
b.scroll.y-15,b.scroll.y+5)?(k.top=a.inInlineMode?0:b.scroll.y,this.look(S)):d.is(L)||l(k.top,b.pane.bottom-5,b.pane.bottom+15)?(k.top=a.inInlineMode?b.editable.height+b.editable.padding.top+b.editable.padding.bottom:b.pane.bottom-1,this.look(L)):(a.inInlineMode&&(k.top-=b.editable.top+b.editable.border.top),this.look(V));a.inInlineMode&&(k.top--,k.top+=b.editable.scroll.top,k.left+=b.editable.scroll.left);for(var m in k)k[m]=CKEDITOR.tools.cssLength(k[m]);this.setStyles(k)},look:function(a){if(this.oldLook!=
a){for(var b=this.lineChildren.length,c;b--;)(c=this.lineChildren[b]).setAttribute("style",c.base+c.looks[0|a/2]);this.oldLook=a}},wrap:new G("span",a.doc)});for(b=c.lineChildren.length;b--;)c.lineChildren[b].appendTo(c);c.look(V);c.appendTo(c.wrap);c.unselectable();c.lineChildren[0].on("mouseup",function(b){c.detach();h(a,function(b){var c=a.line.trigger;b[c.is(J)?"insertBefore":"insertAfter"](c.is(J)?c.lower:c.upper)},!0);a.editor.focus();F.ie||a.enterMode==CKEDITOR.ENTER_BR||a.hotNode.scrollIntoView();
b.data.preventDefault(!0)});c.on("mousedown",function(a){a.data.preventDefault(!0)});a.line=c}function h(a,b,c){var d=new CKEDITOR.dom.range(a.doc),e=a.editor,f;F.ie&&a.enterMode==CKEDITOR.ENTER_BR?f=a.doc.createText(Z):(f=(f=k(a.element,!0))&&f.data("cke-enter-mode")||a.enterMode,f=new G(K[f],a.doc),f.is("br")||a.doc.createText(Z).appendTo(f));c&&e.fire("saveSnapshot");b(f);d.moveToPosition(f,CKEDITOR.POSITION_AFTER_START);e.getSelection().selectRanges([d]);a.hotNode=f;c&&e.fire("saveSnapshot")}
function m(a,c){return{canUndo:!0,modes:{wysiwyg:1},exec:function(){function e(b){var d=F.ie&&9>F.version?" ":Z,f=a.hotNode&&a.hotNode.getText()==d&&a.element.equals(a.hotNode)&&a.lastCmdDirection===!!c;h(a,function(d){f&&a.hotNode&&a.hotNode.remove();d[c?"insertAfter":"insertBefore"](b);d.setAttributes({"data-cke-magicline-hot":1,"data-cke-magicline-dir":!!c});a.lastCmdDirection=!!c});F.ie||a.enterMode==CKEDITOR.ENTER_BR||a.hotNode.scrollIntoView();a.line.detach()}return function(f){f=f.getSelection().getStartElement();
var g;f=f.getAscendant(Q,1);if(!x(a,f)&&f&&!f.equals(a.editable)&&!f.contains(a.editable)){(g=k(f))&&"false"==g.getAttribute("contenteditable")&&(f=g);a.element=f;g=d(a,f,!c);var h;n(g)&&g.is(a.triggers)&&g.is(P)&&(!d(a,g,!c)||(h=d(a,g,!c))&&n(h)&&h.is(a.triggers))?e(g):(h=b(a,f),n(h)&&(d(a,h,!c)?(f=d(a,h,!c))&&n(f)&&f.is(a.triggers)&&e(h):e(h)))}}}()}}function f(a,b){if(!b||b.type!=CKEDITOR.NODE_ELEMENT||!b.$)return!1;var c=a.line;return c.wrap.equals(b)||c.wrap.contains(b)}function n(a){return a&&
a.type==CKEDITOR.NODE_ELEMENT&&a.$}function p(a){if(!n(a))return!1;var b;(b=r(a))||(n(a)?(b={left:1,right:1,center:1},b=!(!b[a.getComputedStyle("float")]&&!b[a.getAttribute("align")])):b=!1);return b}function r(a){return!!{absolute:1,fixed:1}[a.getComputedStyle("position")]}function v(a,b){return n(b)?b.is(a.triggers):null}function x(a,b){if(!b)return!1;for(var c=b.getParents(1),d=c.length;d--;)for(var e=a.tabuList.length;e--;)if(c[d].hasAttribute(a.tabuList[e]))return!0;return!1}function q(a,b,c){b=
b[c?"getLast":"getFirst"](function(b){return a.isRelevant(b)&&!b.is(da)});if(!b)return!1;z(a,b);return c?b.size.top>a.mouse.y:b.size.bottom<a.mouse.y}function t(a){var b=a.editable,c=a.mouse,d=a.view,g=a.triggerOffset;w(a);var h=c.y>(a.inInlineMode?d.editable.top+d.editable.height/2:Math.min(d.editable.height,d.pane.height)/2),b=b[h?"getLast":"getFirst"](function(a){return!(aa(a)||ba(a))});if(!b)return null;f(a,b)&&(b=a.line.wrap[h?"getPrevious":"getNext"](function(a){return!(aa(a)||ba(a))}));if(!n(b)||
p(b)||!v(a,b))return null;z(a,b);return!h&&0<=b.size.top&&l(c.y,0,b.size.top+g)?(a=a.inInlineMode||0===d.scroll.y?S:V,new e([null,b,J,N,a])):h&&b.size.bottom<=d.pane.height&&l(c.y,b.size.bottom-g,d.pane.height)?(a=a.inInlineMode||l(b.size.bottom,d.pane.height-g,d.pane.height)?L:V,new e([b,null,D,N,a])):null}function u(a){var c=a.mouse,f=a.view,g=a.triggerOffset,h=b(a);if(!h)return null;z(a,h);var g=Math.min(g,0|h.size.outerHeight/2),k=[],m,O;if(l(c.y,h.size.top-1,h.size.top+g))O=!1;else if(l(c.y,
h.size.bottom-g,h.size.bottom+1))O=!0;else return null;if(p(h)||q(a,h,O)||h.getParent().is(X))return null;var y=d(a,h,!O);if(y){if(y&&y.type==CKEDITOR.NODE_TEXT)return null;if(n(y)){if(p(y)||!v(a,y)||y.getParent().is(X))return null;k=[y,h][O?"reverse":"concat"]().concat([R,N])}}else h.equals(a.editable[O?"getLast":"getFirst"](a.isRelevant))?(w(a),O&&l(c.y,h.size.bottom-g,f.pane.height)&&l(h.size.bottom,f.pane.height-g,f.pane.height)?m=L:l(c.y,0,h.size.top+g)&&(m=S)):m=V,k=[null,h][O?"reverse":"concat"]().concat([O?
D:J,N,m,h.equals(a.editable[O?"getLast":"getFirst"](a.isRelevant))?O?L:S:V]);return 0 in k?new e(k):null}function A(a,b,c,d){for(var e=b.getDocumentPosition(),f={},g={},h={},k={},m=ca.length;m--;)f[ca[m]]=parseInt(b.getComputedStyle.call(b,"border-"+ca[m]+"-width"),10)||0,h[ca[m]]=parseInt(b.getComputedStyle.call(b,"padding-"+ca[m]),10)||0,g[ca[m]]=parseInt(b.getComputedStyle.call(b,"margin-"+ca[m]),10)||0;c&&!d||C(a,d);k.top=e.y-(c?0:a.view.scroll.y);k.left=e.x-(c?0:a.view.scroll.x);k.outerWidth=
b.$.offsetWidth;k.outerHeight=b.$.offsetHeight;k.height=k.outerHeight-(h.top+h.bottom+f.top+f.bottom);k.width=k.outerWidth-(h.left+h.right+f.left+f.right);k.bottom=k.top+k.outerHeight;k.right=k.left+k.outerWidth;a.inInlineMode&&(k.scroll={top:b.$.scrollTop,left:b.$.scrollLeft});return B({border:f,padding:h,margin:g,ignoreScroll:c},k,!0)}function z(a,b,c){if(!n(b))return b.size=null;if(!b.size)b.size={};else if(b.size.ignoreScroll==c&&b.size.date>new Date-M)return null;return B(b.size,A(a,b,c),{date:+new Date},
!0)}function w(a,b){a.view.editable=A(a,a.editable,b,!0)}function C(a,b){a.view||(a.view={});var c=a.view;if(!(!b&&c&&c.date>new Date-M)){var d=a.win,c=d.getScrollPosition(),d=d.getViewPaneSize();B(a.view,{scroll:{x:c.x,y:c.y,width:a.doc.$.documentElement.scrollWidth-d.width,height:a.doc.$.documentElement.scrollHeight-d.height},pane:{width:d.width,height:d.height,bottom:d.height+c.y},date:+new Date},!0)}}function y(a,b,c,d){for(var f=d,g=d,h=0,k=!1,m=!1,l=a.view.pane.height,n=a.mouse;n.y+h<l&&0<n.y-
h;){k||(k=b(f,d));m||(m=b(g,d));!k&&0<n.y-h&&(f=c(a,{x:n.x,y:n.y-h}));!m&&n.y+h<l&&(g=c(a,{x:n.x,y:n.y+h}));if(k&&m)break;h+=2}return new e([f,g,null,null])}CKEDITOR.plugins.add("magicline",{init:function(a){var c=a.config,k=c.magicline_triggerOffset||30,l={editor:a,enterMode:c.enterMode,triggerOffset:k,holdDistance:0|k*(c.magicline_holdDistance||.5),boxColor:c.magicline_color||"#ff0000",rtl:"rtl"==c.contentsLangDirection,tabuList:["data-cke-hidden-sel"].concat(c.magicline_tabuList||[]),triggers:c.magicline_everywhere?
Q:{table:1,hr:1,div:1,ul:1,ol:1,dl:1,form:1,blockquote:1}},O,y,q;l.isRelevant=function(a){return n(a)&&!f(l,a)&&!p(a)};a.on("contentDom",function(){var k=a.editable(),n=a.document,p=a.window;B(l,{editable:k,inInlineMode:k.isInline(),doc:n,win:p,hotNode:null},!0);l.boundary=l.inInlineMode?l.editable:l.doc.getDocumentElement();k.is(H.$inline)||(l.inInlineMode&&!r(k)&&k.setStyles({position:"relative",top:null,left:null}),g.call(this,l),C(l),k.attachListener(a,"beforeUndoImage",function(){l.line.detach()}),
k.attachListener(a,"beforeGetData",function(){l.line.wrap.getParent()&&(l.line.detach(),a.once("getData",function(){l.line.attach()},null,null,1E3))},null,null,0),k.attachListener(l.inInlineMode?n:n.getWindow().getFrame(),"mouseout",function(b){if("wysiwyg"==a.mode)if(l.inInlineMode){var c=b.data.$.clientX;b=b.data.$.clientY;C(l);w(l,!0);var d=l.view.editable,e=l.view.scroll;c>d.left-e.x&&c<d.right-e.x&&b>d.top-e.y&&b<d.bottom-e.y||(clearTimeout(q),q=null,l.line.detach())}else clearTimeout(q),q=null,
l.line.detach()}),k.attachListener(k,"keyup",function(){l.hiddenMode=0}),k.attachListener(k,"keydown",function(b){if("wysiwyg"==a.mode)switch(b.data.getKeystroke()){case 2228240:case 16:l.hiddenMode=1,l.line.detach()}}),k.attachListener(l.inInlineMode?k:n,"mousemove",function(b){y=!0;if("wysiwyg"==a.mode&&!a.readOnly&&!q){var c={x:b.data.$.clientX,y:b.data.$.clientY};q=setTimeout(function(){l.mouse=c;q=l.trigger=null;C(l);y&&!l.hiddenMode&&a.focusManager.hasFocus&&!l.line.mouseNear()&&(l.element=
W(l,!0))&&((l.trigger=t(l)||u(l)||Y(l))&&!x(l,l.trigger.upper||l.trigger.lower)?l.line.attach().place():(l.trigger=null,l.line.detach()),y=!1)},30)}}),k.attachListener(p,"scroll",function(){"wysiwyg"==a.mode&&(l.line.detach(),F.webkit&&(l.hiddenMode=1,clearTimeout(O),O=setTimeout(function(){l.mouseDown||(l.hiddenMode=0)},50)))}),k.attachListener(I?n:p,"mousedown",function(){"wysiwyg"==a.mode&&(l.line.detach(),l.hiddenMode=1,l.mouseDown=1)}),k.attachListener(I?n:p,"mouseup",function(){l.hiddenMode=
0;l.mouseDown=0}),a.addCommand("accessPreviousSpace",m(l)),a.addCommand("accessNextSpace",m(l,!0)),a.setKeystroke([[c.magicline_keystrokePrevious,"accessPreviousSpace"],[c.magicline_keystrokeNext,"accessNextSpace"]]),a.on("loadSnapshot",function(){var b,c,d,e;for(e in{p:1,br:1,div:1})for(b=a.document.getElementsByTag(e),d=b.count();d--;)if((c=b.getItem(d)).data("cke-magicline-hot")){l.hotNode=c;l.lastCmdDirection="true"===c.data("cke-magicline-dir")?!0:!1;return}}),this.backdoor={accessFocusSpace:h,
boxTrigger:e,isLine:f,getAscendantTrigger:b,getNonEmptyNeighbour:d,getSize:A,that:l,triggerEdge:u,triggerEditable:t,triggerExpand:Y})},this)}});var B=CKEDITOR.tools.extend,G=CKEDITOR.dom.element,E=G.createFromHtml,F=CKEDITOR.env,I=CKEDITOR.env.ie&&9>CKEDITOR.env.version,H=CKEDITOR.dtd,K={},J=128,D=64,R=32,N=16,S=4,L=2,V=1,Z=" ",X=H.$listItem,da=H.$tableContent,P=B({},H.$nonEditable,H.$empty),Q=H.$block,M=100,U="width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",
T=U+"border-color:transparent;display:block;border-style:solid;",O="\x3cspan\x3e"+Z+"\x3c/span\x3e";K[CKEDITOR.ENTER_BR]="br";K[CKEDITOR.ENTER_P]="p";K[CKEDITOR.ENTER_DIV]="div";e.prototype={set:function(a,b,c){this.properties=a+b+(c||V);return this},is:function(a){return(this.properties&a)==a}};var W=function(){function a(b,c){var d=b.$.elementFromPoint(c.x,c.y);return d&&d.nodeType?new CKEDITOR.dom.element(d):null}return function(b,c,d){if(!b.mouse)return null;var e=b.doc,g=b.line.wrap;d=d||b.mouse;
var h=a(e,d);c&&f(b,h)&&(g.hide(),h=a(e,d),g.show());return!h||h.type!=CKEDITOR.NODE_ELEMENT||!h.$||F.ie&&9>F.version&&!b.boundary.equals(h)&&!b.boundary.contains(h)?null:h}}(),aa=CKEDITOR.dom.walker.whitespaces(),ba=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),Y=function(){function b(e){var f=e.element,g,h,k;if(!n(f)||f.contains(e.editable)||f.isReadOnly())return null;k=y(e,function(a,b){return!b.equals(a)},function(a,b){return W(a,!0,b)},f);g=k.upper;h=k.lower;if(a(e,g,h))return k.set(R,
8);if(g&&f.contains(g))for(;!g.getParent().equals(f);)g=g.getParent();else g=f.getFirst(function(a){return d(e,a)});if(h&&f.contains(h))for(;!h.getParent().equals(f);)h=h.getParent();else h=f.getLast(function(a){return d(e,a)});if(!g||!h)return null;z(e,g);z(e,h);if(!l(e.mouse.y,g.size.top,h.size.bottom))return null;for(var f=Number.MAX_VALUE,m,O,w,q;h&&!h.equals(g)&&(O=g.getNext(e.isRelevant));)m=Math.abs(c(e,g,O)-e.mouse.y),m<f&&(f=m,w=g,q=O),g=O,z(e,g);if(!w||!q||!l(e.mouse.y,w.size.top,q.size.bottom))return null;
k.upper=w;k.lower=q;return k.set(R,8)}function d(a,b){return!(b&&b.type==CKEDITOR.NODE_TEXT||ba(b)||p(b)||f(a,b)||b.type==CKEDITOR.NODE_ELEMENT&&b.$&&b.is("br"))}return function(c){var d=b(c),e;if(e=d){e=d.upper;var f=d.lower;e=!e||!f||p(f)||p(e)||f.equals(e)||e.equals(f)||f.contains(e)||e.contains(f)?!1:v(c,e)&&v(c,f)&&a(c,e,f)?!0:!1}return e?d:null}}(),ca=["top","left","right","bottom"]}(),CKEDITOR.config.magicline_keystrokePrevious=CKEDITOR.CTRL+CKEDITOR.SHIFT+51,CKEDITOR.config.magicline_keystrokeNext=
CKEDITOR.CTRL+CKEDITOR.SHIFT+52,function(){function a(a){if(!a||a.type!=CKEDITOR.NODE_ELEMENT||"form"!=a.getName())return[];for(var b=[],c=["style","className"],d=0;d<c.length;d++){var e=a.$.elements.namedItem(c[d]);e&&(e=new CKEDITOR.dom.element(e),b.push([e,e.nextSibling]),e.remove())}return b}function e(a,b){if(a&&a.type==CKEDITOR.NODE_ELEMENT&&"form"==a.getName()&&0<b.length)for(var c=b.length-1;0<=c;c--){var d=b[c][0],e=b[c][1];e?d.insertBefore(e):d.appendTo(a)}}function b(b,c){var d=a(b),h=
{},m=b.$;c||(h["class"]=m.className||"",m.className="");h.inline=m.style.cssText||"";c||(m.style.cssText="position: static; overflow: visible");e(d);return h}function c(b,c){var d=a(b),h=b.$;"class"in c&&(h.className=c["class"]);"inline"in c&&(h.style.cssText=c.inline);e(d)}function d(a){if(!a.editable().isInline()){var b=CKEDITOR.instances,c;for(c in b){var d=b[c];"wysiwyg"!=d.mode||d.readOnly||(d=d.document.getBody(),d.setAttribute("contentEditable",!1),d.setAttribute("contentEditable",!0))}a.editable().hasFocus&&
(a.toolbox.focus(),a.focus())}}CKEDITOR.plugins.add("maximize",{init:function(a){function e(){var b=m.getViewPaneSize();a.resize(b.width,b.height,null,!0)}if(a.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){var g=a.lang,h=CKEDITOR.document,m=h.getWindow(),f,n,p,r=CKEDITOR.TRISTATE_OFF;a.addCommand("maximize",{modes:{wysiwyg:!CKEDITOR.env.iOS,source:!CKEDITOR.env.iOS},readOnly:1,editorFocus:!1,exec:function(){var v=a.container.getFirst(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass("cke_inner")}),
x=a.ui.space("contents");if("wysiwyg"==a.mode){var q=a.getSelection();f=q&&q.getRanges();n=m.getScrollPosition()}else{var t=a.editable().$;f=!CKEDITOR.env.ie&&[t.selectionStart,t.selectionEnd];n=[t.scrollLeft,t.scrollTop]}if(this.state==CKEDITOR.TRISTATE_OFF){m.on("resize",e);p=m.getScrollPosition();for(q=a.container;q=q.getParent();)q.setCustomData("maximize_saved_styles",b(q)),q.setStyle("z-index",a.config.baseFloatZIndex-5);x.setCustomData("maximize_saved_styles",b(x,!0));v.setCustomData("maximize_saved_styles",
b(v,!0));x={overflow:CKEDITOR.env.webkit?"":"hidden",width:0,height:0};h.getDocumentElement().setStyles(x);!CKEDITOR.env.gecko&&h.getDocumentElement().setStyle("position","fixed");CKEDITOR.env.gecko&&CKEDITOR.env.quirks||h.getBody().setStyles(x);CKEDITOR.env.ie?setTimeout(function(){m.$.scrollTo(0,0)},0):m.$.scrollTo(0,0);v.setStyle("position",CKEDITOR.env.gecko&&CKEDITOR.env.quirks?"fixed":"absolute");v.$.offsetLeft;v.setStyles({"z-index":a.config.baseFloatZIndex-5,left:"0px",top:"0px"});v.addClass("cke_maximized");
e();x=v.getDocumentPosition();v.setStyles({left:-1*x.x+"px",top:-1*x.y+"px"});CKEDITOR.env.gecko&&d(a)}else if(this.state==CKEDITOR.TRISTATE_ON){m.removeListener("resize",e);for(var q=[x,v],u=0;u<q.length;u++)c(q[u],q[u].getCustomData("maximize_saved_styles")),q[u].removeCustomData("maximize_saved_styles");for(q=a.container;q=q.getParent();)c(q,q.getCustomData("maximize_saved_styles")),q.removeCustomData("maximize_saved_styles");CKEDITOR.env.ie?setTimeout(function(){m.$.scrollTo(p.x,p.y)},0):m.$.scrollTo(p.x,
p.y);v.removeClass("cke_maximized");CKEDITOR.env.webkit&&(v.setStyle("display","inline"),setTimeout(function(){v.setStyle("display","block")},0));a.fire("resize",{outerHeight:a.container.$.offsetHeight,contentsHeight:x.$.offsetHeight,outerWidth:a.container.$.offsetWidth})}this.toggleState();if(q=this.uiItems[0])x=this.state==CKEDITOR.TRISTATE_OFF?g.maximize.maximize:g.maximize.minimize,q=CKEDITOR.document.getById(q._.id),q.getChild(1).setHtml(x),q.setAttribute("title",x),q.setAttribute("href",'javascript:void("'+
x+'");');"wysiwyg"==a.mode?f?(CKEDITOR.env.gecko&&d(a),a.getSelection().selectRanges(f),(t=a.getSelection().getStartElement())&&t.scrollIntoView(!0)):m.$.scrollTo(n.x,n.y):(f&&(t.selectionStart=f[0],t.selectionEnd=f[1]),t.scrollLeft=n[0],t.scrollTop=n[1]);f=n=null;r=this.state;a.fire("maximize",this.state)},canUndo:!1});a.ui.addButton&&a.ui.addButton("Maximize",{label:g.maximize.maximize,command:"maximize",toolbar:"tools,10"});a.on("mode",function(){var b=a.getCommand("maximize");b.setState(b.state==
CKEDITOR.TRISTATE_DISABLED?CKEDITOR.TRISTATE_DISABLED:r)},null,null,100)}}})}(),function(){function a(a,b,c){var d=CKEDITOR.cleanWord;d?c():(a=CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile||b+"filter/default.js"),CKEDITOR.scriptLoader.load(a,c,null,!0));return!d}CKEDITOR.plugins.add("pastefromword",{requires:"clipboard",init:function(e){function b(a){var b=CKEDITOR.plugins.pastefromword&&CKEDITOR.plugins.pastefromword.images,c,d=[];if(b&&a.editor.filter.check("img[src]")&&(c=b.extractTagsFromHtml(a.data.dataValue),
0!==c.length&&(b=b.extractFromRtf(a.data.dataTransfer["text/rtf"]),0!==b.length&&(CKEDITOR.tools.array.forEach(b,function(a){d.push(a.type?"data:"+a.type+";base64,"+CKEDITOR.tools.convertBytesToBase64(CKEDITOR.tools.convertHexStringToBytes(a.hex)):null)},this),c.length===d.length))))for(b=0;b<c.length;b++)0===c[b].indexOf("file://")&&d[b]&&(a.data.dataValue=a.data.dataValue.replace(c[b],d[b]))}var c=0,d=this.path,l=void 0===e.config.pasteFromWord_inlineImages?!0:e.config.pasteFromWord_inlineImages;
e.addCommand("pastefromword",{canUndo:!1,async:!0,exec:function(a,b){c=1;a.execCommand("paste",{type:"html",notification:b&&"undefined"!==typeof b.notification?b.notification:!0})}});CKEDITOR.plugins.clipboard.addPasteButton(e,"PasteFromWord",{label:e.lang.pastefromword.toolbar,command:"pastefromword",toolbar:"clipboard,50"});e.on("paste",function(b){var g=b.data,h=CKEDITOR.plugins.clipboard.isCustomDataTypesSupported?g.dataTransfer.getData("text/html",!0):null,m=CKEDITOR.plugins.clipboard.isCustomDataTypesSupported?
g.dataTransfer.getData("text/rtf"):null,h=h||g.dataValue,f={dataValue:h,dataTransfer:{"text/rtf":m}},m=/(class=\"?Mso|style=(?:\"|\')[^\"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/,m=/<meta\s*name=(?:\"|\')?generator(?:\"|\')?\s*content=(?:\"|\')?microsoft/gi.test(h)||m.test(h);if(h&&(c||m)&&(!1!==e.fire("pasteFromWord",f)||c)){g.dontFilter=!0;var l=a(e,d,function(){if(l)e.fire("paste",g);else if(!e.config.pasteFromWordPromptCleanup||c||confirm(e.lang.pastefromword.confirmCleanup))f.dataValue=CKEDITOR.cleanWord(f.dataValue,
e),e.fire("afterPasteFromWord",f),g.dataValue=f.dataValue,!0===e.config.forcePasteAsPlainText?g.type="text":CKEDITOR.env.ie&&"allow-word"===e.config.forcePasteAsPlainText&&(g.type="html");c=0});l&&b.cancel()}},null,null,3);if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported&&l)e.on("afterPasteFromWord",b)}})}(),function(){var a={canUndo:!1,async:!0,exec:function(a,b){var c=a.lang,d=CKEDITOR.tools.keystrokeToString(c.common.keyboard,a.getCommandKeystroke(CKEDITOR.env.ie?a.commands.paste:this)),
l=b&&"undefined"!==typeof b.notification?b.notification:!b||!b.from||"keystrokeHandler"===b.from&&CKEDITOR.env.ie,c=l&&"string"===typeof l?l:c.pastetext.pasteNotification.replace(/%1/,'\x3ckbd aria-label\x3d"'+d.aria+'"\x3e'+d.display+"\x3c/kbd\x3e");a.execCommand("paste",{type:"text",notification:l?c:!1})}};CKEDITOR.plugins.add("pastetext",{requires:"clipboard",init:function(e){var b=CKEDITOR.env.safari?CKEDITOR.CTRL+CKEDITOR.ALT+CKEDITOR.SHIFT+86:CKEDITOR.CTRL+CKEDITOR.SHIFT+86;e.addCommand("pastetext",
a);e.setKeystroke(b,"pastetext");CKEDITOR.plugins.clipboard.addPasteButton(e,"PasteText",{label:e.lang.pastetext.button,command:"pastetext",toolbar:"clipboard,40"});if(e.config.forcePasteAsPlainText)e.on("beforePaste",function(a){"html"!=a.data.type&&(a.data.type="text")});e.on("pasteState",function(a){e.getCommand("pastetext").setState(a.data)})}})}(),CKEDITOR.plugins.add("removeformat",{init:function(a){a.addCommand("removeFormat",CKEDITOR.plugins.removeformat.commands.removeformat);a.ui.addButton&&
a.ui.addButton("RemoveFormat",{label:a.lang.removeformat.toolbar,command:"removeFormat",toolbar:"cleanup,10"})}}),CKEDITOR.plugins.removeformat={commands:{removeformat:{exec:function(a){for(var e=a._.removeFormatRegex||(a._.removeFormatRegex=new RegExp("^(?:"+a.config.removeFormatTags.replace(/,/g,"|")+")$","i")),b=a._.removeAttributes||(a._.removeAttributes=a.config.removeFormatAttributes.split(",")),c=CKEDITOR.plugins.removeformat.filter,d=a.getSelection().getRanges(),l=d.createIterator(),k=function(a){return a.type==
CKEDITOR.NODE_ELEMENT},g;g=l.getNextRange();){g.collapsed||g.enlarge(CKEDITOR.ENLARGE_ELEMENT);var h=g.createBookmark(),m=h.startNode,f=h.endNode,n=function(b){for(var d=a.elementPath(b),f=d.elements,g=1,h;(h=f[g])&&!h.equals(d.block)&&!h.equals(d.blockLimit);g++)e.test(h.getName())&&c(a,h)&&b.breakParent(h)};n(m);if(f)for(n(f),m=m.getNextSourceNode(!0,CKEDITOR.NODE_ELEMENT);m&&!m.equals(f);)if(m.isReadOnly()){if(m.getPosition(f)&CKEDITOR.POSITION_CONTAINS)break;m=m.getNext(k)}else n=m.getNextSourceNode(!1,
CKEDITOR.NODE_ELEMENT),"img"==m.getName()&&m.data("cke-realelement")||!c(a,m)||(e.test(m.getName())?m.remove(1):(m.removeAttributes(b),a.fire("removeFormatCleanup",m))),m=n;g.moveToBookmark(h)}a.forceNextSelectionCheck();a.getSelection().selectRanges(d)}}},filter:function(a,e){for(var b=a._.removeFormatFilters||[],c=0;c<b.length;c++)if(!1===b[c](e))return!1;return!0}},CKEDITOR.editor.prototype.addRemoveFormatFilter=function(a){this._.removeFormatFilters||(this._.removeFormatFilters=[]);this._.removeFormatFilters.push(a)},
CKEDITOR.config.removeFormatTags="b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var",CKEDITOR.config.removeFormatAttributes="class,style,lang,width,height,align,hspace,valign",CKEDITOR.plugins.add("resize",{init:function(a){function e(b){var d=h.width,e=h.height,k=d+(b.data.$.screenX-g.x)*("rtl"==l?-1:1);b=e+(b.data.$.screenY-g.y);m&&(d=Math.max(c.resize_minWidth,Math.min(k,c.resize_maxWidth)));f&&(e=Math.max(c.resize_minHeight,Math.min(b,c.resize_maxHeight)));
a.resize(m?d:null,e)}function b(){CKEDITOR.document.removeListener("mousemove",e);CKEDITOR.document.removeListener("mouseup",b);a.document&&(a.document.removeListener("mousemove",e),a.document.removeListener("mouseup",b))}var c=a.config,d=a.ui.spaceId("resizer"),l=a.element?a.element.getDirection(1):"ltr";!c.resize_dir&&(c.resize_dir="vertical");void 0===c.resize_maxWidth&&(c.resize_maxWidth=3E3);void 0===c.resize_maxHeight&&(c.resize_maxHeight=3E3);void 0===c.resize_minWidth&&(c.resize_minWidth=
750);void 0===c.resize_minHeight&&(c.resize_minHeight=250);if(!1!==c.resize_enabled){var k=null,g,h,m=("both"==c.resize_dir||"horizontal"==c.resize_dir)&&c.resize_minWidth!=c.resize_maxWidth,f=("both"==c.resize_dir||"vertical"==c.resize_dir)&&c.resize_minHeight!=c.resize_maxHeight,n=CKEDITOR.tools.addFunction(function(d){k||(k=a.getResizable());h={width:k.$.offsetWidth||0,height:k.$.offsetHeight||0};g={x:d.screenX,y:d.screenY};c.resize_minWidth>h.width&&(c.resize_minWidth=h.width);c.resize_minHeight>
h.height&&(c.resize_minHeight=h.height);CKEDITOR.document.on("mousemove",e);CKEDITOR.document.on("mouseup",b);a.document&&(a.document.on("mousemove",e),a.document.on("mouseup",b));d.preventDefault&&d.preventDefault()});a.on("destroy",function(){CKEDITOR.tools.removeFunction(n)});a.on("uiSpace",function(b){if("bottom"==b.data.space){var c="";m&&!f&&(c=" cke_resizer_horizontal");!m&&f&&(c=" cke_resizer_vertical");var e='\x3cspan id\x3d"'+d+'" class\x3d"cke_resizer'+c+" cke_resizer_"+l+'" title\x3d"'+
CKEDITOR.tools.htmlEncode(a.lang.common.resize)+'" onmousedown\x3d"CKEDITOR.tools.callFunction('+n+', event)"\x3e'+("ltr"==l?"◢":"◣")+"\x3c/span\x3e";"ltr"==l&&"ltr"==c?b.data.html+=e:b.data.html=e+b.data.html}},a,null,100);a.on("maximize",function(b){a.ui.space("resizer")[b.data==CKEDITOR.TRISTATE_ON?"hide":"show"]()})}}}),CKEDITOR.plugins.add("menubutton",{requires:"button,menu",onLoad:function(){var a=function(a){var b=this._,c=b.menu;b.state!==CKEDITOR.TRISTATE_DISABLED&&(b.on&&c?c.hide():(b.previousState=
b.state,c||(c=b.menu=new CKEDITOR.menu(a,{panel:{className:"cke_menu_panel",attributes:{"aria-label":a.lang.common.options}}}),c.onHide=CKEDITOR.tools.bind(function(){var c=this.command?a.getCommand(this.command).modes:this.modes;this.setState(!c||c[a.mode]?b.previousState:CKEDITOR.TRISTATE_DISABLED);b.on=0},this),this.onMenu&&c.addListener(this.onMenu)),this.setState(CKEDITOR.TRISTATE_ON),b.on=1,setTimeout(function(){c.show(CKEDITOR.document.getById(b.id),4)},0)))};CKEDITOR.ui.menuButton=CKEDITOR.tools.createClass({base:CKEDITOR.ui.button,
$:function(e){delete e.panel;this.base(e);this.hasArrow=!0;this.click=a},statics:{handler:{create:function(a){return new CKEDITOR.ui.menuButton(a)}}}})},beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_MENUBUTTON,CKEDITOR.ui.menuButton.handler)}}),CKEDITOR.UI_MENUBUTTON="menubutton","use strict",CKEDITOR.plugins.add("scayt",{requires:"menubutton,dialog",tabToOpen:null,dialogName:"scaytDialog",onLoad:function(a){CKEDITOR.plugins.scayt.onLoadTimestamp=(new Date).getTime();"moono-lisa"==(CKEDITOR.skinName||
a.config.skin)&&CKEDITOR.document.appendStyleSheet(this.path+"skins/"+CKEDITOR.skin.name+"/scayt.css");CKEDITOR.document.appendStyleSheet(this.path+"dialogs/dialog.css")},init:function(a){var e=this,b=CKEDITOR.plugins.scayt;this.bindEvents(a);this.parseConfig(a);this.addRule(a);CKEDITOR.dialog.add(this.dialogName,CKEDITOR.getUrl(this.path+"dialogs/options.js"));this.addMenuItems(a);var c=a.lang.scayt,d=CKEDITOR.env;a.ui.add("Scayt",CKEDITOR.UI_MENUBUTTON,{label:c.text_title,title:a.plugins.wsc?a.lang.wsc.title:
c.text_title,modes:{wysiwyg:!(d.ie&&(8>d.version||d.quirks))},toolbar:"spellchecker,20",refresh:function(){var c=a.ui.instances.Scayt.getState();a.scayt&&(c=b.state.scayt[a.name]?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);a.fire("scaytButtonState",c)},onRender:function(){var b=this;a.on("scaytButtonState",function(a){void 0!==typeof a.data&&b.setState(a.data)})},onMenu:function(){var c=a.scayt;a.getMenuItem("scaytToggle").label=a.lang.scayt[c&&b.state.scayt[a.name]?"btn_disable":"btn_enable"];var d=
{scaytToggle:CKEDITOR.TRISTATE_OFF,scaytOptions:c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytLangs:c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytDict:c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytAbout:c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,WSC:a.plugins.wsc?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED};a.config.scayt_uiTabs[0]||delete d.scaytOptions;a.config.scayt_uiTabs[1]||delete d.scaytLangs;a.config.scayt_uiTabs[2]||delete d.scaytDict;c&&!CKEDITOR.plugins.scayt.isNewUdSupported(c)&&
(delete d.scaytDict,a.config.scayt_uiTabs[2]=0,CKEDITOR.plugins.scayt.alarmCompatibilityMessage());return d}});a.contextMenu&&a.addMenuItems&&(a.contextMenu.addListener(function(b,c){var d=a.scayt,h,m;d&&(m=d.getSelectionNode())&&(h=e.menuGenerator(a,m),d.showBanner("."+a.contextMenu._.definition.panel.className.split(" ").join(" .")));return h}),a.contextMenu._.onHide=CKEDITOR.tools.override(a.contextMenu._.onHide,function(b){return function(){var c=a.scayt;c&&c.hideBanner();return b.apply(this)}}))},
addMenuItems:function(a){var e=this,b=CKEDITOR.plugins.scayt;a.addMenuGroup("scaytButton");for(var c=a.config.scayt_contextMenuItemsOrder.split("|"),d=0;d<c.length;d++)c[d]="scayt_"+c[d];if((c=["grayt_description","grayt_suggest","grayt_control"].concat(c))&&c.length)for(d=0;d<c.length;d++)a.addMenuGroup(c[d],d-10);a.addCommand("scaytToggle",{exec:function(a){var c=a.scayt;b.state.scayt[a.name]=!b.state.scayt[a.name];!0===b.state.scayt[a.name]?c||b.createScayt(a):c&&b.destroy(a)}});a.addCommand("scaytAbout",
{exec:function(a){a.scayt.tabToOpen="about";a.lockSelection();a.openDialog(e.dialogName)}});a.addCommand("scaytOptions",{exec:function(a){a.scayt.tabToOpen="options";a.lockSelection();a.openDialog(e.dialogName)}});a.addCommand("scaytLangs",{exec:function(a){a.scayt.tabToOpen="langs";a.lockSelection();a.openDialog(e.dialogName)}});a.addCommand("scaytDict",{exec:function(a){a.scayt.tabToOpen="dictionaries";a.lockSelection();a.openDialog(e.dialogName)}});c={scaytToggle:{label:a.lang.scayt.btn_enable,
group:"scaytButton",command:"scaytToggle"},scaytAbout:{label:a.lang.scayt.btn_about,group:"scaytButton",command:"scaytAbout"},scaytOptions:{label:a.lang.scayt.btn_options,group:"scaytButton",command:"scaytOptions"},scaytLangs:{label:a.lang.scayt.btn_langs,group:"scaytButton",command:"scaytLangs"},scaytDict:{label:a.lang.scayt.btn_dictionaries,group:"scaytButton",command:"scaytDict"}};a.plugins.wsc&&(c.WSC={label:a.lang.wsc.toolbar,group:"scaytButton",onClick:function(){var b=CKEDITOR.plugins.scayt,
c=a.scayt,d=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.container.getText():a.document.getBody().getText();(d=d.replace(/\s/g,""))?(c&&b.state.scayt[a.name]&&c.setMarkupPaused&&c.setMarkupPaused(!0),a.lockSelection(),a.execCommand("checkspell")):alert("Nothing to check!")}});a.addMenuItems(c)},bindEvents:function(a){var e=CKEDITOR.plugins.scayt,b=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE,c=function(){e.destroy(a)},d=function(){!e.state.scayt[a.name]||a.readOnly||a.scayt||e.createScayt(a)},l=function(){var c=
a.editable();c.attachListener(c,"focus",function(c){CKEDITOR.plugins.scayt&&!a.scayt&&setTimeout(d,0);c=CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[a.name]&&a.scayt;var e,f;if((b||c)&&a._.savedSelection){c=a._.savedSelection.getSelectedElement();c=!c&&a._.savedSelection.getRanges();for(var g=0;g<c.length;g++)f=c[g],"string"===typeof f.startContainer.$.nodeValue&&(e=f.startContainer.getText().length,(e<f.startOffset||e<f.endOffset)&&a.unlockSelection(!1))}},this,null,-10)},k=function(){b?
a.config.scayt_inlineModeImmediateMarkup?d():(a.on("blur",function(){setTimeout(c,0)}),a.on("focus",d),a.focusManager.hasFocus&&d()):d();l();var e=a.editable();e.attachListener(e,"mousedown",function(b){b=b.data.getTarget();var c=a.widgets&&a.widgets.getByElement(b);c&&(c.wrapper=b.getAscendant(function(a){return a.hasAttribute("data-cke-widget-wrapper")},!0))},this,null,-10)};a.on("contentDom",k);a.on("beforeCommandExec",function(b){var c=a.scayt,d=!1,f=!1,k=!0;b.data.name in e.options.disablingCommandExec&&
"wysiwyg"==a.mode?c&&(e.destroy(a),a.fire("scaytButtonState",CKEDITOR.TRISTATE_DISABLED)):"bold"!==b.data.name&&"italic"!==b.data.name&&"underline"!==b.data.name&&"strike"!==b.data.name&&"subscript"!==b.data.name&&"superscript"!==b.data.name&&"enter"!==b.data.name&&"cut"!==b.data.name&&"language"!==b.data.name||!c||("cut"===b.data.name&&(k=!1,f=!0),"language"===b.data.name&&(f=d=!0),a.fire("reloadMarkupScayt",{removeOptions:{removeInside:k,forceBookmark:f,language:d},timeout:0}))});a.on("beforeSetMode",
function(b){if("source"==b.data){if(b=a.scayt)e.destroy(a),a.fire("scaytButtonState",CKEDITOR.TRISTATE_DISABLED);a.document&&a.document.getBody().removeAttribute("_jquid")}});a.on("afterCommandExec",function(b){"wysiwyg"!=a.mode||"undo"!=b.data.name&&"redo"!=b.data.name||setTimeout(function(){e.reloadMarkup(a.scayt)},250)});a.on("readOnly",function(b){var c;b&&(c=a.scayt,!0===b.editor.readOnly?c&&c.fire("removeMarkupInDocument",{}):c?e.reloadMarkup(c):"wysiwyg"==b.editor.mode&&!0===e.state.scayt[b.editor.name]&&
(e.createScayt(a),b.editor.fire("scaytButtonState",CKEDITOR.TRISTATE_ON)))});a.on("beforeDestroy",c);a.on("setData",function(){c();(a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE||a.plugins.divarea)&&k()},this,null,50);a.on("reloadMarkupScayt",function(b){var c=b.data&&b.data.removeOptions,d=b.data&&b.data.timeout,f=b.data&&b.data.language,k=a.scayt;k&&setTimeout(function(){f&&(c.selectionNode=a.plugins.language.getCurrentLangElement(a),c.selectionNode=c.selectionNode&&c.selectionNode.$||null);k.removeMarkupInSelectionNode(c);
e.reloadMarkup(k)},d||0)});a.on("insertElement",function(){a.fire("reloadMarkupScayt",{removeOptions:{forceBookmark:!0}})},this,null,50);a.on("insertHtml",function(){a.scayt&&a.scayt.setFocused&&a.scayt.setFocused(!0);a.fire("reloadMarkupScayt")},this,null,50);a.on("insertText",function(){a.scayt&&a.scayt.setFocused&&a.scayt.setFocused(!0);a.fire("reloadMarkupScayt")},this,null,50);a.on("scaytDialogShown",function(b){b.data.selectPage(a.scayt.tabToOpen)})},parseConfig:function(a){var e=CKEDITOR.plugins.scayt;
e.replaceOldOptionsNames(a.config);"boolean"!==typeof a.config.scayt_autoStartup&&(a.config.scayt_autoStartup=!1);e.state.scayt[a.name]=a.config.scayt_autoStartup;"boolean"!==typeof a.config.grayt_autoStartup&&(a.config.grayt_autoStartup=!1);"boolean"!==typeof a.config.scayt_inlineModeImmediateMarkup&&(a.config.scayt_inlineModeImmediateMarkup=!1);e.state.grayt[a.name]=a.config.grayt_autoStartup;a.config.scayt_contextCommands||(a.config.scayt_contextCommands="ignoreall|add");a.config.scayt_contextMenuItemsOrder||
(a.config.scayt_contextMenuItemsOrder="suggest|moresuggest|control");a.config.scayt_sLang||(a.config.scayt_sLang="en_US");if(void 0===a.config.scayt_maxSuggestions||"number"!=typeof a.config.scayt_maxSuggestions||0>a.config.scayt_maxSuggestions)a.config.scayt_maxSuggestions=3;if(void 0===a.config.scayt_minWordLength||"number"!=typeof a.config.scayt_minWordLength||1>a.config.scayt_minWordLength)a.config.scayt_minWordLength=3;if(void 0===a.config.scayt_customDictionaryIds||"string"!==typeof a.config.scayt_customDictionaryIds)a.config.scayt_customDictionaryIds=
"";if(void 0===a.config.scayt_userDictionaryName||"string"!==typeof a.config.scayt_userDictionaryName)a.config.scayt_userDictionaryName=null;if("string"===typeof a.config.scayt_uiTabs&&3===a.config.scayt_uiTabs.split(",").length){var b=[],c=[];a.config.scayt_uiTabs=a.config.scayt_uiTabs.split(",");CKEDITOR.tools.search(a.config.scayt_uiTabs,function(a){1===Number(a)||0===Number(a)?(c.push(!0),b.push(Number(a))):c.push(!1)});null===CKEDITOR.tools.search(c,!1)?a.config.scayt_uiTabs=b:a.config.scayt_uiTabs=
[1,1,1]}else a.config.scayt_uiTabs=[1,1,1];"string"!=typeof a.config.scayt_serviceProtocol&&(a.config.scayt_serviceProtocol=null);"string"!=typeof a.config.scayt_serviceHost&&(a.config.scayt_serviceHost=null);"string"!=typeof a.config.scayt_servicePort&&(a.config.scayt_servicePort=null);"string"!=typeof a.config.scayt_servicePath&&(a.config.scayt_servicePath=null);a.config.scayt_moreSuggestions||(a.config.scayt_moreSuggestions="on");"string"!==typeof a.config.scayt_customerId&&(a.config.scayt_customerId=
"1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2");"string"!==typeof a.config.scayt_customPunctuation&&(a.config.scayt_customPunctuation="-");"string"!==typeof a.config.scayt_srcUrl&&(e=document.location.protocol,e=-1!=e.search(/https?:/)?e:"http:",a.config.scayt_srcUrl=e+"//svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/ckscayt.js");"boolean"!==typeof CKEDITOR.config.scayt_handleCheckDirty&&(CKEDITOR.config.scayt_handleCheckDirty=!0);"boolean"!==typeof CKEDITOR.config.scayt_handleUndoRedo&&
(CKEDITOR.config.scayt_handleUndoRedo=!0);CKEDITOR.config.scayt_handleUndoRedo=CKEDITOR.plugins.undo?CKEDITOR.config.scayt_handleUndoRedo:!1;"boolean"!==typeof a.config.scayt_multiLanguageMode&&(a.config.scayt_multiLanguageMode=!1);"object"!==typeof a.config.scayt_multiLanguageStyles&&(a.config.scayt_multiLanguageStyles={});a.config.scayt_ignoreAllCapsWords&&"boolean"!==typeof a.config.scayt_ignoreAllCapsWords&&(a.config.scayt_ignoreAllCapsWords=!1);a.config.scayt_ignoreDomainNames&&"boolean"!==typeof a.config.scayt_ignoreDomainNames&&
(a.config.scayt_ignoreDomainNames=!1);a.config.scayt_ignoreWordsWithMixedCases&&"boolean"!==typeof a.config.scayt_ignoreWordsWithMixedCases&&(a.config.scayt_ignoreWordsWithMixedCases=!1);a.config.scayt_ignoreWordsWithNumbers&&"boolean"!==typeof a.config.scayt_ignoreWordsWithNumbers&&(a.config.scayt_ignoreWordsWithNumbers=!1);if(a.config.scayt_disableOptionsStorage){var e=CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage)?a.config.scayt_disableOptionsStorage:"string"===typeof a.config.scayt_disableOptionsStorage?
[a.config.scayt_disableOptionsStorage]:void 0,d="all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "),l=["lang","ignore-all-caps-words","ignore-domain-names","ignore-words-with-mixed-cases","ignore-words-with-numbers"],k=CKEDITOR.tools.search,g=CKEDITOR.tools.indexOf;a.config.scayt_disableOptionsStorage=function(a){for(var b=[],c=0;c<a.length;c++){var e=a[c],p=!!k(a,"options");if(!k(d,e)||p&&k(l,function(a){if("lang"===a)return!1}))return;
k(l,e)&&l.splice(g(l,e),1);if("all"===e||p&&k(a,"lang"))return[];"options"===e&&(l=["lang"])}return b=b.concat(l)}(e)}},addRule:function(a){var e=CKEDITOR.plugins.scayt,b=a.dataProcessor,c=b&&b.htmlFilter,d=a._.elementsPath&&a._.elementsPath.filters,b=b&&b.dataFilter,l=a.addRemoveFormatFilter,k=function(b){if(a.scayt&&(b.hasAttribute(e.options.data_attribute_name)||b.hasAttribute(e.options.problem_grammar_data_attribute)))return!1},g=function(b){var c=!0;a.scayt&&(b.hasAttribute(e.options.data_attribute_name)||
b.hasAttribute(e.options.problem_grammar_data_attribute))&&(c=!1);return c};d&&d.push(k);b&&b.addRules({elements:{span:function(a){var b=a.hasClass(e.options.misspelled_word_class)&&a.attributes[e.options.data_attribute_name],c=a.hasClass(e.options.problem_grammar_class)&&a.attributes[e.options.problem_grammar_data_attribute];e&&(b||c)&&delete a.name;return a}}});c&&c.addRules({elements:{span:function(a){var b=a.hasClass(e.options.misspelled_word_class)&&a.attributes[e.options.data_attribute_name],
c=a.hasClass(e.options.problem_grammar_class)&&a.attributes[e.options.problem_grammar_data_attribute];e&&(b||c)&&delete a.name;return a}}});l&&l.call(a,g)},scaytMenuDefinition:function(a){var e=this;a=a.scayt;return{scayt:{scayt_ignore:{label:a.getLocal("btn_ignore"),group:"scayt_control",order:1,exec:function(a){a.scayt.ignoreWord()}},scayt_ignoreall:{label:a.getLocal("btn_ignoreAll"),group:"scayt_control",order:2,exec:function(a){a.scayt.ignoreAllWords()}},scayt_add:{label:a.getLocal("btn_addWord"),
group:"scayt_control",order:3,exec:function(a){var c=a.scayt;setTimeout(function(){c.addWordToUserDictionary()},10)}},scayt_option:{label:a.getLocal("btn_options"),group:"scayt_control",order:4,exec:function(a){a.scayt.tabToOpen="options";a.lockSelection();a.openDialog(e.dialogName)},verification:function(a){return 1==a.config.scayt_uiTabs[0]?!0:!1}},scayt_language:{label:a.getLocal("btn_langs"),group:"scayt_control",order:5,exec:function(a){a.scayt.tabToOpen="langs";a.lockSelection();a.openDialog(e.dialogName)},
verification:function(a){return 1==a.config.scayt_uiTabs[1]?!0:!1}},scayt_dictionary:{label:a.getLocal("btn_dictionaries"),group:"scayt_control",order:6,exec:function(a){a.scayt.tabToOpen="dictionaries";a.lockSelection();a.openDialog(e.dialogName)},verification:function(a){return 1==a.config.scayt_uiTabs[2]?!0:!1}},scayt_about:{label:a.getLocal("btn_about"),group:"scayt_control",order:7,exec:function(a){a.scayt.tabToOpen="about";a.lockSelection();a.openDialog(e.dialogName)}}},grayt:{grayt_problemdescription:{label:"Grammar problem description",
group:"grayt_description",order:1,state:CKEDITOR.TRISTATE_DISABLED,exec:function(a){}},grayt_ignore:{label:a.getLocal("btn_ignore"),group:"grayt_control",order:2,exec:function(a){a.scayt.ignorePhrase()}},grayt_ignoreall:{label:a.getLocal("btn_ignoreAll"),group:"grayt_control",order:3,exec:function(a){a.scayt.ignoreAllPhrases()}}}}},buildSuggestionMenuItems:function(a,e,b){var c={},d={},l=b?"word":"phrase",k=b?"startGrammarCheck":"startSpellCheck",g=a.scayt;if(0<e.length&&"no_any_suggestions"!==e[0])if(b)for(b=
0;b<e.length;b++){var h="scayt_suggest_"+CKEDITOR.plugins.scayt.suggestions[b].replace(" ","_");a.addCommand(h,this.createCommand(CKEDITOR.plugins.scayt.suggestions[b],l,k));b<a.config.scayt_maxSuggestions?(a.addMenuItem(h,{label:e[b],command:h,group:"scayt_suggest",order:b+1}),c[h]=CKEDITOR.TRISTATE_OFF):(a.addMenuItem(h,{label:e[b],command:h,group:"scayt_moresuggest",order:b+1}),d[h]=CKEDITOR.TRISTATE_OFF,"on"===a.config.scayt_moreSuggestions&&(a.addMenuItem("scayt_moresuggest",{label:g.getLocal("btn_moreSuggestions"),
group:"scayt_moresuggest",order:10,getItems:function(){return d}}),c.scayt_moresuggest=CKEDITOR.TRISTATE_OFF))}else for(b=0;b<e.length;b++)h="grayt_suggest_"+CKEDITOR.plugins.scayt.suggestions[b].replace(" ","_"),a.addCommand(h,this.createCommand(CKEDITOR.plugins.scayt.suggestions[b],l,k)),a.addMenuItem(h,{label:e[b],command:h,group:"grayt_suggest",order:b+1}),c[h]=CKEDITOR.TRISTATE_OFF;else c.no_scayt_suggest=CKEDITOR.TRISTATE_DISABLED,a.addCommand("no_scayt_suggest",{exec:function(){}}),a.addMenuItem("no_scayt_suggest",
{label:g.getLocal("btn_noSuggestions")||"no_scayt_suggest",command:"no_scayt_suggest",group:"scayt_suggest",order:0});return c},menuGenerator:function(a,e){var b=a.scayt,c=this.scaytMenuDefinition(a),d={},l=a.config.scayt_contextCommands.split("|"),k=e.getAttribute(b.getLangAttribute())||b.getLang(),g,h,m;g=b.isScaytNode(e);h=b.isGraytNode(e);g?(c=c.scayt,d=e.getAttribute(b.getScaytNodeAttributeName()),b.fire("getSuggestionsList",{lang:k,word:d}),d=this.buildSuggestionMenuItems(a,CKEDITOR.plugins.scayt.suggestions,
g)):h&&(c=c.grayt,d=e.getAttribute(b.getGraytNodeAttributeName()),m=b.getProblemDescriptionText(d,k),c.grayt_problemdescription&&m&&(c.grayt_problemdescription.label=m),b.fire("getGrammarSuggestionsList",{lang:k,phrase:d}),d=this.buildSuggestionMenuItems(a,CKEDITOR.plugins.scayt.suggestions,g));if(g&&"off"==a.config.scayt_contextCommands)return d;for(var f in c)g&&-1==CKEDITOR.tools.indexOf(l,f.replace("scayt_",""))&&"all"!=a.config.scayt_contextCommands||h&&"grayt_problemdescription"!==f&&-1==CKEDITOR.tools.indexOf(l,
f.replace("grayt_",""))&&"all"!=a.config.scayt_contextCommands||(d[f]="undefined"!=typeof c[f].state?c[f].state:CKEDITOR.TRISTATE_OFF,"function"!==typeof c[f].verification||c[f].verification(a)||delete d[f],a.addCommand(f,{exec:c[f].exec}),a.addMenuItem(f,{label:a.lang.scayt[c[f].label]||c[f].label,command:f,group:c[f].group,order:c[f].order}));return d},createCommand:function(a,e,b){return{exec:function(c){c=c.scayt;var d={};d[e]=a;c.replaceSelectionNode(d);"startGrammarCheck"===b&&c.removeMarkupInSelectionNode({grammarOnly:!0});
c.fire(b)}}}}),CKEDITOR.plugins.scayt={charsToObserve:[{charName:"cke-fillingChar",charCode:function(){var a=CKEDITOR.version.match(/^\d(\.\d*)*/),a=a&&a[0],e;if(a){e="4.5.7";var b,a=a.replace(/\./g,"");e=e.replace(/\./g,"");b=a.length-e.length;b=0<=b?b:0;e=parseInt(a)>=parseInt(e)*Math.pow(10,b)}return e?Array(7).join(String.fromCharCode(8203)):String.fromCharCode(8203)}()}],onLoadTimestamp:"",state:{scayt:{},grayt:{}},warningCounter:0,suggestions:[],options:{disablingCommandExec:{source:!0,newpage:!0,
templates:!0},data_attribute_name:"data-scayt-word",misspelled_word_class:"scayt-misspell-word",problem_grammar_data_attribute:"data-grayt-phrase",problem_grammar_class:"gramm-problem"},backCompatibilityMap:{scayt_service_protocol:"scayt_serviceProtocol",scayt_service_host:"scayt_serviceHost",scayt_service_port:"scayt_servicePort",scayt_service_path:"scayt_servicePath",scayt_customerid:"scayt_customerId"},alarmCompatibilityMessage:function(){5>this.warningCounter&&(console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."),
this.warningCounter+=1)},isNewUdSupported:function(a){return a.getUserDictionary?!0:!1},reloadMarkup:function(a){var e;a&&(e=a.getScaytLangList(),a.reloadMarkup?a.reloadMarkup():(this.alarmCompatibilityMessage(),e&&e.ltr&&e.rtl&&a.fire("startSpellCheck, startGrammarCheck")))},replaceOldOptionsNames:function(a){for(var e in a)e in this.backCompatibilityMap&&(a[this.backCompatibilityMap[e]]=a[e],delete a[e])},createScayt:function(a){var e=this,b=CKEDITOR.plugins.scayt;this.loadScaytLibrary(a,function(a){function d(a){return new SCAYT.CKSCAYT(a,
function(){},function(){})}var l=a.window&&a.window.getFrame()||a.editable();if(l){l={lang:a.config.scayt_sLang,container:l.$,customDictionary:a.config.scayt_customDictionaryIds,userDictionaryName:a.config.scayt_userDictionaryName,localization:a.langCode,customer_id:a.config.scayt_customerId,customPunctuation:a.config.scayt_customPunctuation,debug:a.config.scayt_debug,data_attribute_name:e.options.data_attribute_name,misspelled_word_class:e.options.misspelled_word_class,problem_grammar_data_attribute:e.options.problem_grammar_data_attribute,
problem_grammar_class:e.options.problem_grammar_class,"options-to-restore":a.config.scayt_disableOptionsStorage,focused:a.editable().hasFocus,ignoreElementsRegex:a.config.scayt_elementsToIgnore,ignoreGraytElementsRegex:a.config.grayt_elementsToIgnore,minWordLength:a.config.scayt_minWordLength,multiLanguageMode:a.config.scayt_multiLanguageMode,multiLanguageStyles:a.config.scayt_multiLanguageStyles,graytAutoStartup:a.config.grayt_autoStartup,charsToObserve:b.charsToObserve};a.config.scayt_serviceProtocol&&
(l.service_protocol=a.config.scayt_serviceProtocol);a.config.scayt_serviceHost&&(l.service_host=a.config.scayt_serviceHost);a.config.scayt_servicePort&&(l.service_port=a.config.scayt_servicePort);a.config.scayt_servicePath&&(l.service_path=a.config.scayt_servicePath);"boolean"===typeof a.config.scayt_ignoreAllCapsWords&&(l["ignore-all-caps-words"]=a.config.scayt_ignoreAllCapsWords);"boolean"===typeof a.config.scayt_ignoreDomainNames&&(l["ignore-domain-names"]=a.config.scayt_ignoreDomainNames);"boolean"===
typeof a.config.scayt_ignoreWordsWithMixedCases&&(l["ignore-words-with-mixed-cases"]=a.config.scayt_ignoreWordsWithMixedCases);"boolean"===typeof a.config.scayt_ignoreWordsWithNumbers&&(l["ignore-words-with-numbers"]=a.config.scayt_ignoreWordsWithNumbers);var k;try{k=d(l)}catch(g){e.alarmCompatibilityMessage(),delete l.charsToObserve,k=d(l)}k.subscribe("suggestionListSend",function(a){for(var b={},c=[],d=0;d<a.suggestionList.length;d++)b["word_"+a.suggestionList[d]]||(b["word_"+a.suggestionList[d]]=
a.suggestionList[d],c.push(a.suggestionList[d]));CKEDITOR.plugins.scayt.suggestions=c});k.subscribe("selectionIsChanged",function(b){a.getSelection().isLocked&&"restoreSelection"!==b.action&&a.lockSelection();"restoreSelection"===b.action&&a.selectionChange(!0)});k.subscribe("graytStateChanged",function(d){b.state.grayt[a.name]=d.state});k.addMarkupHandler&&k.addMarkupHandler(function(b){var d=a.editable(),e=d.getCustomData(b.charName);e&&(e.$=b.node,d.setCustomData(b.charName,e))});a.scayt=k;a.fire("scaytButtonState",
a.readOnly?CKEDITOR.TRISTATE_DISABLED:CKEDITOR.TRISTATE_ON)}else b.state.scayt[a.name]=!1})},destroy:function(a){a.scayt&&a.scayt.destroy();delete a.scayt;a.fire("scaytButtonState",CKEDITOR.TRISTATE_OFF)},loadScaytLibrary:function(a,e){var b,c=function(){CKEDITOR.fireOnce("scaytReady");a.scayt||"function"===typeof e&&e(a)};"undefined"===typeof window.SCAYT||"function"!==typeof window.SCAYT.CKSCAYT?(b=a.config.scayt_srcUrl+"?"+this.onLoadTimestamp,CKEDITOR.scriptLoader.load(b,function(a){a&&c()})):
window.SCAYT&&"function"===typeof window.SCAYT.CKSCAYT&&c()}},CKEDITOR.on("dialogDefinition",function(a){var e=a.data.name;a=a.data.definition.dialog;"scaytDialog"!==e&&"checkspell"!==e&&(a.on("show",function(a){a=a.sender&&a.sender.getParentEditor();var c=CKEDITOR.plugins.scayt,d=a.scayt;d&&c.state.scayt[a.name]&&d.setMarkupPaused&&d.setMarkupPaused(!0)}),a.on("hide",function(a){a=a.sender&&a.sender.getParentEditor();var c=CKEDITOR.plugins.scayt,d=a.scayt;d&&c.state.scayt[a.name]&&d.setMarkupPaused&&
d.setMarkupPaused(!1)}));if("scaytDialog"===e)a.on("cancel",function(a){return!1},this,null,-1);if("checkspell"===e)a.on("cancel",function(a){a=a.sender&&a.sender.getParentEditor();var c=CKEDITOR.plugins.scayt,d=a.scayt;d&&c.state.scayt[a.name]&&d.setMarkupPaused&&d.setMarkupPaused(!1);a.unlockSelection()},this,null,-2);if("link"===e)a.on("ok",function(a){var c=a.sender&&a.sender.getParentEditor();c&&setTimeout(function(){c.fire("reloadMarkupScayt",{removeOptions:{removeInside:!0,forceBookmark:!0},
timeout:0})},0)});if("replace"===e)a.on("hide",function(a){a=a.sender&&a.sender.getParentEditor();var c=CKEDITOR.plugins.scayt,d=a.scayt;a&&setTimeout(function(){d&&(d.fire("removeMarkupInDocument",{}),c.reloadMarkup(d))},0)})}),CKEDITOR.on("scaytReady",function(){if(!0===CKEDITOR.config.scayt_handleCheckDirty){var a=CKEDITOR.editor.prototype;a.checkDirty=CKEDITOR.tools.override(a.checkDirty,function(a){return function(){var c=null,d=this.scayt;if(CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[this.name]&&
this.scayt){if(c="ready"==this.status)var e=d.removeMarkupFromString(this.getSnapshot()),d=d.removeMarkupFromString(this._.previousValue),c=c&&d!==e}else c=a.call(this);return c}});a.resetDirty=CKEDITOR.tools.override(a.resetDirty,function(a){return function(){var c=this.scayt;CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[this.name]&&this.scayt?this._.previousValue=c.removeMarkupFromString(this.getSnapshot()):a.call(this)}})}if(!0===CKEDITOR.config.scayt_handleUndoRedo){var a=CKEDITOR.plugins.undo.Image.prototype,
e="function"==typeof a.equalsContent?"equalsContent":"equals";a[e]=CKEDITOR.tools.override(a[e],function(a){return function(c){var d=c.editor.scayt,e=this.contents,k=c.contents,g=null;CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[c.editor.name]&&c.editor.scayt&&(this.contents=d.removeMarkupFromString(e)||"",c.contents=d.removeMarkupFromString(k)||"");g=a.apply(this,arguments);this.contents=e;c.contents=k;return g}})}}),function(){var a={preserveState:!0,editorFocus:!1,readOnly:1,exec:function(a){this.toggleState();
this.refresh(a)},refresh:function(a){if(a.document){var b=this.state==CKEDITOR.TRISTATE_ON?"attachClass":"removeClass";a.editable()[b]("cke_show_borders")}}};CKEDITOR.plugins.add("showborders",{modes:{wysiwyg:1},onLoad:function(){var a;a=(CKEDITOR.env.ie6Compat?[".%1 table.%2,",".%1 table.%2 td, .%1 table.%2 th","{","border : #d3d3d3 1px dotted","}"]:".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
"cke_show_border").replace(/%1/g,"cke_show_borders ");CKEDITOR.addCss(a)},init:function(e){var b=e.addCommand("showborders",a);b.canUndo=!1;!1!==e.config.startupShowBorders&&b.setState(CKEDITOR.TRISTATE_ON);e.on("mode",function(){b.state!=CKEDITOR.TRISTATE_DISABLED&&b.refresh(e)},null,null,100);e.on("contentDom",function(){b.state!=CKEDITOR.TRISTATE_DISABLED&&b.refresh(e)});e.on("removeFormatCleanup",function(a){a=a.data;e.getCommand("showborders").state==CKEDITOR.TRISTATE_ON&&a.is("table")&&(!a.hasAttribute("border")||
0>=parseInt(a.getAttribute("border"),10))&&a.addClass("cke_show_border")})},afterInit:function(a){var b=a.dataProcessor;a=b&&b.dataFilter;b=b&&b.htmlFilter;a&&a.addRules({elements:{table:function(a){a=a.attributes;var b=a["class"],e=parseInt(a.border,10);e&&!(0>=e)||b&&-1!=b.indexOf("cke_show_border")||(a["class"]=(b||"")+" cke_show_border")}}});b&&b.addRules({elements:{table:function(a){a=a.attributes;var b=a["class"];b&&(a["class"]=b.replace("cke_show_border","").replace(/\s{2}/," ").replace(/^\s+|\s+$/,
""))}}})}});CKEDITOR.on("dialogDefinition",function(a){var b=a.data.name;if("table"==b||"tableProperties"==b)if(a=a.data.definition,b=a.getContents("info").get("txtBorder"),b.commit=CKEDITOR.tools.override(b.commit,function(a){return function(b,e){a.apply(this,arguments);var k=parseInt(this.getValue(),10);e[!k||0>=k?"addClass":"removeClass"]("cke_show_border")}}),a=(a=a.getContents("advanced"))&&a.get("advCSSClasses"))a.setup=CKEDITOR.tools.override(a.setup,function(a){return function(){a.apply(this,
arguments);this.setValue(this.getValue().replace(/cke_show_border/,""))}}),a.commit=CKEDITOR.tools.override(a.commit,function(a){return function(b,e){a.apply(this,arguments);parseInt(e.getAttribute("border"),10)||e.addClass("cke_show_border")}})})}(),function(){CKEDITOR.plugins.add("sourcearea",{init:function(e){function b(){var a=d&&this.equals(CKEDITOR.document.getActive());this.hide();this.setStyle("height",this.getParent().$.clientHeight+"px");this.setStyle("width",this.getParent().$.clientWidth+
"px");this.show();a&&this.focus()}if(e.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){var c=CKEDITOR.plugins.sourcearea;e.addMode("source",function(c){var d=e.ui.space("contents").getDocument().createElement("textarea");d.setStyles(CKEDITOR.tools.extend({width:CKEDITOR.env.ie7Compat?"99%":"100%",height:"100%",resize:"none",outline:"none","text-align":"left"},CKEDITOR.tools.cssVendorPrefix("tab-size",e.config.sourceAreaTabSize||4)));d.setAttribute("dir","ltr");d.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu");
e.ui.space("contents").append(d);d=e.editable(new a(e,d));d.setData(e.getData(1));CKEDITOR.env.ie&&(d.attachListener(e,"resize",b,d),d.attachListener(CKEDITOR.document.getWindow(),"resize",b,d),CKEDITOR.tools.setTimeout(b,0,d));e.fire("ariaWidget",this);c()});e.addCommand("source",c.commands.source);e.ui.addButton&&e.ui.addButton("Source",{label:e.lang.sourcearea.toolbar,command:"source",toolbar:"mode,10"});e.on("mode",function(){e.getCommand("source").setState("source"==e.mode?CKEDITOR.TRISTATE_ON:
CKEDITOR.TRISTATE_OFF)});var d=CKEDITOR.env.ie&&9==CKEDITOR.env.version}}});var a=CKEDITOR.tools.createClass({base:CKEDITOR.editable,proto:{setData:function(a){this.setValue(a);this.status="ready";this.editor.fire("dataReady")},getData:function(){return this.getValue()},insertHtml:function(){},insertElement:function(){},insertText:function(){},setReadOnly:function(a){this[(a?"set":"remove")+"Attribute"]("readOnly","readonly")},detach:function(){a.baseProto.detach.call(this);this.clearCustomData();
this.remove()}}})}(),CKEDITOR.plugins.sourcearea={commands:{source:{modes:{wysiwyg:1,source:1},editorFocus:!1,readOnly:1,exec:function(a){"wysiwyg"==a.mode&&a.fire("saveSnapshot");a.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);a.setMode("source"==a.mode?"wysiwyg":"source")},canUndo:!1}}},CKEDITOR.plugins.add("specialchar",{availableLangs:{af:1,ar:1,az:1,bg:1,ca:1,cs:1,cy:1,da:1,de:1,"de-ch":1,el:1,en:1,"en-au":1,"en-ca":1,"en-gb":1,eo:1,es:1,"es-mx":1,et:1,eu:1,fa:1,fi:1,fr:1,"fr-ca":1,
gl:1,he:1,hr:1,hu:1,id:1,it:1,ja:1,km:1,ko:1,ku:1,lt:1,lv:1,nb:1,nl:1,no:1,oc:1,pl:1,pt:1,"pt-br":1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,zh:1,"zh-cn":1},requires:"dialog",init:function(a){var e=this;CKEDITOR.dialog.add("specialchar",this.path+"dialogs/specialchar.js");a.addCommand("specialchar",{exec:function(){var b=a.langCode,b=e.availableLangs[b]?b:e.availableLangs[b.replace(/-.*/,"")]?b.replace(/-.*/,""):"en";CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path+"dialogs/lang/"+
b+".js"),function(){CKEDITOR.tools.extend(a.lang.specialchar,e.langEntries[b]);a.openDialog("specialchar")})},modes:{wysiwyg:1},canUndo:!1});a.ui.addButton&&a.ui.addButton("SpecialChar",{label:a.lang.specialchar.toolbar,command:"specialchar",toolbar:"insert,50"})}}),CKEDITOR.config.specialChars="! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" "),
function(){CKEDITOR.plugins.add("stylescombo",{requires:"richcombo",init:function(a){var e=a.config,b=a.lang.stylescombo,c={},d=[],l=[];a.on("stylesSet",function(b){if(b=b.data.styles){for(var g,h,m,f=0,n=b.length;f<n;f++)(g=b[f],a.blockless&&g.element in CKEDITOR.dtd.$block||"string"==typeof g.type&&!CKEDITOR.style.customHandlers[g.type]||(h=g.name,g=new CKEDITOR.style(g),a.filter.customConfig&&!a.filter.check(g)))||(g._name=h,g._.enterMode=e.enterMode,g._.type=m=g.assignedTo||g.type,g._.weight=
f+1E3*(m==CKEDITOR.STYLE_OBJECT?1:m==CKEDITOR.STYLE_BLOCK?2:3),c[h]=g,d.push(g),l.push(g));d.sort(function(a,b){return a._.weight-b._.weight})}});a.ui.addRichCombo("Styles",{label:b.label,title:b.panelTitle,toolbar:"styles,10",allowedContent:l,panel:{css:[CKEDITOR.skin.getPath("editor")].concat(e.contentsCss),multiSelect:!0,attributes:{"aria-label":b.panelTitle}},init:function(){var a,c,e,m,f,l;f=0;for(l=d.length;f<l;f++)a=d[f],c=a._name,m=a._.type,m!=e&&(this.startGroup(b["panelTitle"+String(m)]),
e=m),this.add(c,a.type==CKEDITOR.STYLE_OBJECT?c:a.buildPreview(),c);this.commit()},onClick:function(b){a.focus();a.fire("saveSnapshot");b=c[b];var d=a.elementPath();if(b.group&&b.removeStylesFromSameGroup(a))a.applyStyle(b);else a[b.checkActive(d,a)?"removeStyle":"applyStyle"](b);a.fire("saveSnapshot")},onRender:function(){a.on("selectionChange",function(b){var d=this.getValue();b=b.data.path.elements;for(var e=0,m=b.length,f;e<m;e++){f=b[e];for(var l in c)if(c[l].checkElementRemovable(f,!0,a)){l!=
d&&this.setValue(l);return}}this.setValue("")},this)},onOpen:function(){var d=a.getSelection(),d=d.getSelectedElement()||d.getStartElement()||a.editable(),d=a.elementPath(d),e=[0,0,0,0];this.showAll();this.unmarkAll();for(var h in c){var m=c[h],f=m._.type;m.checkApplicable(d,a,a.activeFilter)?e[f]++:this.hideItem(h);m.checkActive(d,a)&&this.mark(h)}e[CKEDITOR.STYLE_BLOCK]||this.hideGroup(b["panelTitle"+String(CKEDITOR.STYLE_BLOCK)]);e[CKEDITOR.STYLE_INLINE]||this.hideGroup(b["panelTitle"+String(CKEDITOR.STYLE_INLINE)]);
e[CKEDITOR.STYLE_OBJECT]||this.hideGroup(b["panelTitle"+String(CKEDITOR.STYLE_OBJECT)])},refresh:function(){var b=a.elementPath();if(b){for(var d in c)if(c[d].checkApplicable(b,a,a.activeFilter))return;this.setState(CKEDITOR.TRISTATE_DISABLED)}},reset:function(){c={};d=[]}})}})}(),function(){function a(a){return{editorFocus:!1,canUndo:!1,modes:{wysiwyg:1},exec:function(b){if(b.editable().hasFocus){var c=b.getSelection(),e;if(e=(new CKEDITOR.dom.elementPath(c.getCommonAncestor(),c.root)).contains({td:1,
th:1},1)){var c=b.createRange(),h=CKEDITOR.tools.tryThese(function(){var b=e.getParent().$.cells[e.$.cellIndex+(a?-1:1)];b.parentNode.parentNode;return b},function(){var b=e.getParent(),b=b.getAscendant("table").$.rows[b.$.rowIndex+(a?-1:1)];return b.cells[a?b.cells.length-1:0]});if(h||a)if(h)h=new CKEDITOR.dom.element(h),c.moveToElementEditStart(h),c.checkStartOfBlock()&&c.checkEndOfBlock()||c.selectNodeContents(h);else return!0;else{for(var m=e.getAscendant("table").$,h=e.getParent().$.cells,m=
new CKEDITOR.dom.element(m.insertRow(-1),b.document),f=0,n=h.length;f<n;f++)m.append((new CKEDITOR.dom.element(h[f],b.document)).clone(!1,!1)).appendBogus();c.moveToElementEditStart(m)}c.select(!0);return!0}}return!1}}}var e={editorFocus:!1,modes:{wysiwyg:1,source:1}},b={exec:function(a){a.container.focusNext(!0,a.tabIndex)}},c={exec:function(a){a.container.focusPrevious(!0,a.tabIndex)}};CKEDITOR.plugins.add("tab",{init:function(d){for(var l=!1!==d.config.enableTabKeyTools,k=d.config.tabSpaces||0,
g="";k--;)g+=" ";if(g)d.on("key",function(a){9==a.data.keyCode&&(d.insertText(g),a.cancel())});if(l)d.on("key",function(a){(9==a.data.keyCode&&d.execCommand("selectNextCell")||a.data.keyCode==CKEDITOR.SHIFT+9&&d.execCommand("selectPreviousCell"))&&a.cancel()});d.addCommand("blur",CKEDITOR.tools.extend(b,e));d.addCommand("blurBack",CKEDITOR.tools.extend(c,e));d.addCommand("selectNextCell",a());d.addCommand("selectPreviousCell",a(!0))}})}(),CKEDITOR.dom.element.prototype.focusNext=function(a,e){var b=
void 0===e?this.getTabIndex():e,c,d,l,k,g,h;if(0>=b)for(g=this.getNextSourceNode(a,CKEDITOR.NODE_ELEMENT);g;){if(g.isVisible()&&0===g.getTabIndex()){l=g;break}g=g.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT)}else for(g=this.getDocument().getBody().getFirst();g=g.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT);){if(!c)if(!d&&g.equals(this)){if(d=!0,a){if(!(g=g.getNextSourceNode(!0,CKEDITOR.NODE_ELEMENT)))break;c=1}}else d&&!this.contains(g)&&(c=1);if(g.isVisible()&&!(0>(h=g.getTabIndex()))){if(c&&h==b){l=
g;break}h>b&&(!l||!k||h<k)?(l=g,k=h):l||0!==h||(l=g,k=h)}}l&&l.focus()},CKEDITOR.dom.element.prototype.focusPrevious=function(a,e){for(var b=void 0===e?this.getTabIndex():e,c,d,l,k=0,g,h=this.getDocument().getBody().getLast();h=h.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT);){if(!c)if(!d&&h.equals(this)){if(d=!0,a){if(!(h=h.getPreviousSourceNode(!0,CKEDITOR.NODE_ELEMENT)))break;c=1}}else d&&!this.contains(h)&&(c=1);if(h.isVisible()&&!(0>(g=h.getTabIndex())))if(0>=b){if(c&&0===g){l=h;break}g>k&&
(l=h,k=g)}else{if(c&&g==b){l=h;break}g<b&&(!l||g>k)&&(l=h,k=g)}}l&&l.focus()},CKEDITOR.plugins.add("table",{requires:"dialog",init:function(a){function e(a){return CKEDITOR.tools.extend(a||{},{contextSensitive:1,refresh:function(a,b){this.setState(b.contains("table",1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)}})}if(!a.blockless){var b=a.lang.table;a.addCommand("table",new CKEDITOR.dialogCommand("table",{context:"table",allowedContent:"table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];"+
(a.plugins.dialogadvtab?"table"+a.plugins.dialogadvtab.allowedContent():""),requiredContent:"table",contentTransformations:[["table{width}: sizeToStyle","table[width]: sizeToAttribute"],["td: splitBorderShorthand"],[{element:"table",right:function(a){if(a.styles){var b;if(a.styles.border)b=CKEDITOR.tools.style.parse.border(a.styles.border);else if(CKEDITOR.env.ie&&8===CKEDITOR.env.version){var e=a.styles;e["border-left"]&&e["border-left"]===e["border-right"]&&e["border-right"]===e["border-top"]&&
e["border-top"]===e["border-bottom"]&&(b=CKEDITOR.tools.style.parse.border(e["border-top"]))}b&&b.style&&"solid"===b.style&&b.width&&0!==parseFloat(b.width)&&(a.attributes.border=1);"collapse"==a.styles["border-collapse"]&&(a.attributes.cellspacing=0)}}}]]}));a.addCommand("tableProperties",new CKEDITOR.dialogCommand("tableProperties",e()));a.addCommand("tableDelete",e({exec:function(a){var b=a.elementPath().contains("table",1);if(b){var e=b.getParent(),k=a.editable();1!=e.getChildCount()||e.is("td",
"th")||e.equals(k)||(b=e);a=a.createRange();a.moveToPosition(b,CKEDITOR.POSITION_BEFORE_START);b.remove();a.select()}}}));a.ui.addButton&&a.ui.addButton("Table",{label:b.toolbar,command:"table",toolbar:"insert,30"});CKEDITOR.dialog.add("table",this.path+"dialogs/table.js");CKEDITOR.dialog.add("tableProperties",this.path+"dialogs/table.js");a.addMenuItems&&a.addMenuItems({table:{label:b.menu,command:"tableProperties",group:"table",order:5},tabledelete:{label:b.deleteTable,command:"tableDelete",group:"table",
order:1}});a.on("doubleclick",function(a){a.data.element.is("table")&&(a.data.dialog="tableProperties")});a.contextMenu&&a.contextMenu.addListener(function(){return{tabledelete:CKEDITOR.TRISTATE_OFF,table:CKEDITOR.TRISTATE_OFF}})}}}),function(){function a(a,b){function c(a){return b?b.contains(a)&&a.getAscendant("table",!0).equals(b):!0}function d(a){0<e.length||a.type!=CKEDITOR.NODE_ELEMENT||!v.test(a.getName())||a.getCustomData("selected_cell")||(CKEDITOR.dom.element.setMarker(f,a,"selected_cell",
!0),e.push(a))}var e=[],f={};if(!a)return e;for(var g=a.getRanges(),h=0;h<g.length;h++){var k=g[h];if(k.collapsed)(k=k.getCommonAncestor().getAscendant({td:1,th:1},!0))&&c(k)&&e.push(k);else{var k=new CKEDITOR.dom.walker(k),m;for(k.guard=d;m=k.next();)m.type==CKEDITOR.NODE_ELEMENT&&m.is(CKEDITOR.dtd.table)||(m=m.getAscendant({td:1,th:1},!0))&&!m.getCustomData("selected_cell")&&c(m)&&(CKEDITOR.dom.element.setMarker(f,m,"selected_cell",!0),e.push(m))}}CKEDITOR.dom.element.clearAllMarkers(f);return e}
function e(b,c){for(var d=x(b)?b:a(b),e=d[0],f=e.getAscendant("table"),e=e.getDocument(),g=d[0].getParent(),h=g.$.rowIndex,d=d[d.length-1],k=d.getParent().$.rowIndex+d.$.rowSpan-1,d=new CKEDITOR.dom.element(f.$.rows[k]),h=c?h:k,g=c?g:d,d=CKEDITOR.tools.buildTableMap(f),f=d[h],h=c?d[h-1]:d[h+1],d=d[0].length,e=e.createElement("tr"),k=0;f[k]&&k<d;k++){var m;1<f[k].rowSpan&&h&&f[k]==h[k]?(m=f[k],m.rowSpan+=1):(m=(new CKEDITOR.dom.element(f[k])).clone(),m.removeAttribute("rowSpan"),m.appendBogus(),e.append(m),
m=m.$);k+=m.colSpan-1}c?e.insertBefore(g):e.insertAfter(g);return e}function b(c){if(c instanceof CKEDITOR.dom.selection){var d=c.getRanges(),e=a(c),f=e[0].getAscendant("table"),g=CKEDITOR.tools.buildTableMap(f),h=e[0].getParent().$.rowIndex,e=e[e.length-1],k=e.getParent().$.rowIndex+e.$.rowSpan-1,e=[];c.reset();for(c=h;c<=k;c++){for(var m=g[c],l=new CKEDITOR.dom.element(f.$.rows[c]),n=0;n<m.length;n++){var p=new CKEDITOR.dom.element(m[n]),r=p.getParent().$.rowIndex;1==p.$.rowSpan?p.remove():(--p.$.rowSpan,
r==c&&(r=g[c+1],r[n-1]?p.insertAfter(new CKEDITOR.dom.element(r[n-1])):(new CKEDITOR.dom.element(f.$.rows[c+1])).append(p,1)));n+=p.$.colSpan-1}e.push(l)}g=f.$.rows;d[0].moveToPosition(f,CKEDITOR.POSITION_BEFORE_START);h=new CKEDITOR.dom.element(g[k+1]||(0<h?g[h-1]:null)||f.$.parentNode);for(c=e.length;0<=c;c--)b(e[c]);return f.$.parentNode?h:(d[0].select(),null)}c instanceof CKEDITOR.dom.element&&(f=c.getAscendant("table"),1==f.$.rows.length?f.remove():c.remove());return null}function c(a){for(var b=
a.getParent().$.cells,c=0,d=0;d<b.length;d++){var e=b[d],c=c+e.colSpan;if(e==a.$)break}return c-1}function d(a,b){for(var d=b?Infinity:0,e=0;e<a.length;e++){var f=c(a[e]);if(b?f<d:f>d)d=f}return d}function l(b,c){for(var e=x(b)?b:a(b),f=e[0].getAscendant("table"),g=d(e,1),e=d(e),h=c?g:e,k=CKEDITOR.tools.buildTableMap(f),f=[],g=[],e=[],m=k.length,l=0;l<m;l++)f.push(k[l][h]),g.push(c?k[l][h-1]:k[l][h+1]);for(l=0;l<m;l++)f[l]&&(1<f[l].colSpan&&g[l]==f[l]?(k=f[l],k.colSpan+=1):(h=new CKEDITOR.dom.element(f[l]),
k=h.clone(),k.removeAttribute("colSpan"),k.appendBogus(),k[c?"insertBefore":"insertAfter"].call(k,h),e.push(k),k=k.$),l+=k.rowSpan-1);return e}function k(b){function c(a){var b,d,e;b=a.getRanges();if(1!==b.length)return a;b=b[0];if(b.collapsed||0!==b.endOffset)return a;d=b.endContainer;e=d.getName().toLowerCase();if("td"!==e&&"th"!==e)return a;for((e=d.getPrevious())||(e=d.getParent().getPrevious().getLast());e.type!==CKEDITOR.NODE_TEXT&&"br"!==e.getName().toLowerCase();)if(e=e.getLast(),!e)return a;
b.setEndAt(e,CKEDITOR.POSITION_BEFORE_END);return b.select()}CKEDITOR.env.webkit&&!b.isFake&&(b=c(b));var d=b.getRanges(),e=a(b),f=e[0],g=e[e.length-1],e=f.getAscendant("table"),h=CKEDITOR.tools.buildTableMap(e),k,m,l=[];b.reset();var n=0;for(b=h.length;n<b;n++)for(var p=0,r=h[n].length;p<r;p++)void 0===k&&h[n][p]==f.$&&(k=p),h[n][p]==g.$&&(m=p);for(n=k;n<=m;n++)for(p=0;p<h.length;p++)g=h[p],f=new CKEDITOR.dom.element(e.$.rows[p]),g=new CKEDITOR.dom.element(g[n]),g.$&&(1==g.$.colSpan?g.remove():--g.$.colSpan,
p+=g.$.rowSpan-1,f.$.cells.length||l.push(f));k=h[0].length-1>m?new CKEDITOR.dom.element(h[0][m+1]):k&&-1!==h[0][k-1].cellIndex?new CKEDITOR.dom.element(h[0][k-1]):new CKEDITOR.dom.element(e.$.parentNode);l.length==b&&(d[0].moveToPosition(e,CKEDITOR.POSITION_AFTER_END),d[0].select(),e.remove());return k}function g(a,b){var c=a.getStartElement().getAscendant({td:1,th:1},!0);if(c){var d=c.clone();d.appendBogus();b?d.insertBefore(c):d.insertAfter(c)}}function h(b){if(b instanceof CKEDITOR.dom.selection){var c=
b.getRanges(),d=a(b),e=d[0]&&d[0].getAscendant("table"),f;a:{var g=0;f=d.length-1;for(var k={},l,n;l=d[g++];)CKEDITOR.dom.element.setMarker(k,l,"delete_cell",!0);for(g=0;l=d[g++];)if((n=l.getPrevious())&&!n.getCustomData("delete_cell")||(n=l.getNext())&&!n.getCustomData("delete_cell")){CKEDITOR.dom.element.clearAllMarkers(k);f=n;break a}CKEDITOR.dom.element.clearAllMarkers(k);g=d[0].getParent();(g=g.getPrevious())?f=g.getLast():(g=d[f].getParent(),f=(g=g.getNext())?g.getChild(0):null)}b.reset();for(b=
d.length-1;0<=b;b--)h(d[b]);f?m(f,!0):e&&(c[0].moveToPosition(e,CKEDITOR.POSITION_BEFORE_START),c[0].select(),e.remove())}else b instanceof CKEDITOR.dom.element&&(c=b.getParent(),1==c.getChildCount()?c.remove():b.remove())}function m(a,b){var c=a.getDocument(),d=CKEDITOR.document;CKEDITOR.env.ie&&10==CKEDITOR.env.version&&(d.focus(),c.focus());c=new CKEDITOR.dom.range(c);c["moveToElementEdit"+(b?"End":"Start")](a)||(c.selectNodeContents(a),c.collapse(b?!1:!0));c.select(!0)}function f(a,b,c){a=a[b];
if("undefined"==typeof c)return a;for(b=0;a&&b<a.length;b++){if(c.is&&a[b]==c.$)return b;if(b==c)return new CKEDITOR.dom.element(a[b])}return c.is?-1:null}function n(b,c,d){var e=a(b),g;if((c?1!=e.length:2>e.length)||(g=b.getCommonAncestor())&&g.type==CKEDITOR.NODE_ELEMENT&&g.is("table"))return!1;var h;b=e[0];g=b.getAscendant("table");var k=CKEDITOR.tools.buildTableMap(g),m=k.length,l=k[0].length,n=b.getParent().$.rowIndex,p=f(k,n,b);if(c){var r;try{var v=parseInt(b.getAttribute("rowspan"),10)||1;
h=parseInt(b.getAttribute("colspan"),10)||1;r=k["up"==c?n-v:"down"==c?n+v:n]["left"==c?p-h:"right"==c?p+h:p]}catch(x){return!1}if(!r||b.$==r)return!1;e["up"==c||"left"==c?"unshift":"push"](new CKEDITOR.dom.element(r))}c=b.getDocument();var K=n,v=r=0,J=!d&&new CKEDITOR.dom.documentFragment(c),D=0;for(c=0;c<e.length;c++){h=e[c];var R=h.getParent(),N=h.getFirst(),S=h.$.colSpan,L=h.$.rowSpan,R=R.$.rowIndex,V=f(k,R,h),D=D+S*L,v=Math.max(v,V-p+S);r=Math.max(r,R-n+L);d||(S=h,(L=S.getBogus())&&L.remove(),
S.trim(),h.getChildren().count()&&(R==K||!N||N.isBlockBoundary&&N.isBlockBoundary({br:1})||(K=J.getLast(CKEDITOR.dom.walker.whitespaces(!0)),!K||K.is&&K.is("br")||J.append("br")),h.moveChildren(J)),c?h.remove():h.setHtml(""));K=R}if(d)return r*v==D;J.moveChildren(b);b.appendBogus();v>=l?b.removeAttribute("rowSpan"):b.$.rowSpan=r;r>=m?b.removeAttribute("colSpan"):b.$.colSpan=v;d=new CKEDITOR.dom.nodeList(g.$.rows);e=d.count();for(c=e-1;0<=c;c--)g=d.getItem(c),g.$.cells.length||(g.remove(),e++);return b}
function p(b,c){var d=a(b);if(1<d.length)return!1;if(c)return!0;var d=d[0],e=d.getParent(),g=e.getAscendant("table"),h=CKEDITOR.tools.buildTableMap(g),k=e.$.rowIndex,m=f(h,k,d),l=d.$.rowSpan,n;if(1<l){n=Math.ceil(l/2);for(var l=Math.floor(l/2),e=k+n,g=new CKEDITOR.dom.element(g.$.rows[e]),h=f(h,e),p,e=d.clone(),k=0;k<h.length;k++)if(p=h[k],p.parentNode==g.$&&k>m){e.insertBefore(new CKEDITOR.dom.element(p));break}else p=null;p||g.append(e)}else for(l=n=1,g=e.clone(),g.insertAfter(e),g.append(e=d.clone()),
p=f(h,k),m=0;m<p.length;m++)p[m].rowSpan++;e.appendBogus();d.$.rowSpan=n;e.$.rowSpan=l;1==n&&d.removeAttribute("rowSpan");1==l&&e.removeAttribute("rowSpan");return e}function r(b,c){var d=a(b);if(1<d.length)return!1;if(c)return!0;var d=d[0],e=d.getParent(),g=e.getAscendant("table"),g=CKEDITOR.tools.buildTableMap(g),h=f(g,e.$.rowIndex,d),k=d.$.colSpan;if(1<k)e=Math.ceil(k/2),k=Math.floor(k/2);else{for(var k=e=1,m=[],l=0;l<g.length;l++){var n=g[l];m.push(n[h]);1<n[h].rowSpan&&(l+=n[h].rowSpan-1)}for(g=
0;g<m.length;g++)m[g].colSpan++}g=d.clone();g.insertAfter(d);g.appendBogus();d.$.colSpan=e;g.$.colSpan=k;1==e&&d.removeAttribute("colSpan");1==k&&g.removeAttribute("colSpan");return g}var v=/^(?:td|th)$/,x=CKEDITOR.tools.isArray;CKEDITOR.plugins.tabletools={requires:"table,dialog,contextmenu",init:function(c){function d(a){return CKEDITOR.tools.extend(a||{},{contextSensitive:1,refresh:function(a,b){this.setState(b.contains({td:1,th:1},1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)}})}function f(a,
b){var d=c.addCommand(a,b);c.addFeature(d)}var v=c.lang.table,x=CKEDITOR.tools.style.parse;f("cellProperties",new CKEDITOR.dialogCommand("cellProperties",d({allowedContent:"td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",requiredContent:"table",contentTransformations:[[{element:"td",left:function(a){return a.styles.background&&x.background(a.styles.background).color},right:function(a){a.styles["background-color"]=x.background(a.styles.background).color}},
{element:"td",check:"td{vertical-align}",left:function(a){return a.attributes&&a.attributes.valign},right:function(a){a.styles["vertical-align"]=a.attributes.valign;delete a.attributes.valign}}],[{element:"tr",check:"td{height}",left:function(a){return a.styles&&a.styles.height},right:function(a){CKEDITOR.tools.array.forEach(a.children,function(b){b.name in{td:1,th:1}&&(b.attributes["cke-row-height"]=a.styles.height)});delete a.styles.height}}],[{element:"td",check:"td{height}",left:function(a){return(a=
a.attributes)&&a["cke-row-height"]},right:function(a){a.styles.height=a.attributes["cke-row-height"];delete a.attributes["cke-row-height"]}}]]})));CKEDITOR.dialog.add("cellProperties",this.path+"dialogs/tableCell.js");f("rowDelete",d({requiredContent:"table",exec:function(a){a=a.getSelection();(a=b(a))&&m(a)}}));f("rowInsertBefore",d({requiredContent:"table",exec:function(b){b=b.getSelection();b=a(b);e(b,!0)}}));f("rowInsertAfter",d({requiredContent:"table",exec:function(b){b=b.getSelection();b=a(b);
e(b)}}));f("columnDelete",d({requiredContent:"table",exec:function(a){a=a.getSelection();(a=k(a))&&m(a,!0)}}));f("columnInsertBefore",d({requiredContent:"table",exec:function(b){b=b.getSelection();b=a(b);l(b,!0)}}));f("columnInsertAfter",d({requiredContent:"table",exec:function(b){b=b.getSelection();b=a(b);l(b)}}));f("cellDelete",d({requiredContent:"table",exec:function(a){a=a.getSelection();h(a)}}));f("cellMerge",d({allowedContent:"td[colspan,rowspan]",requiredContent:"td[colspan,rowspan]",exec:function(a,
b){b.cell=n(a.getSelection());m(b.cell,!0)}}));f("cellMergeRight",d({allowedContent:"td[colspan]",requiredContent:"td[colspan]",exec:function(a,b){b.cell=n(a.getSelection(),"right");m(b.cell,!0)}}));f("cellMergeDown",d({allowedContent:"td[rowspan]",requiredContent:"td[rowspan]",exec:function(a,b){b.cell=n(a.getSelection(),"down");m(b.cell,!0)}}));f("cellVerticalSplit",d({allowedContent:"td[rowspan]",requiredContent:"td[rowspan]",exec:function(a){m(r(a.getSelection()))}}));f("cellHorizontalSplit",
d({allowedContent:"td[colspan]",requiredContent:"td[colspan]",exec:function(a){m(p(a.getSelection()))}}));f("cellInsertBefore",d({requiredContent:"table",exec:function(a){a=a.getSelection();g(a,!0)}}));f("cellInsertAfter",d({requiredContent:"table",exec:function(a){a=a.getSelection();g(a)}}));c.addMenuItems&&c.addMenuItems({tablecell:{label:v.cell.menu,group:"tablecell",order:1,getItems:function(){var b=c.getSelection(),d=a(b);return{tablecell_insertBefore:CKEDITOR.TRISTATE_OFF,tablecell_insertAfter:CKEDITOR.TRISTATE_OFF,
tablecell_delete:CKEDITOR.TRISTATE_OFF,tablecell_merge:n(b,null,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_merge_right:n(b,"right",!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_merge_down:n(b,"down",!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_split_vertical:r(b,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_split_horizontal:p(b,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_properties:0<d.length?CKEDITOR.TRISTATE_OFF:
CKEDITOR.TRISTATE_DISABLED}}},tablecell_insertBefore:{label:v.cell.insertBefore,group:"tablecell",command:"cellInsertBefore",order:5},tablecell_insertAfter:{label:v.cell.insertAfter,group:"tablecell",command:"cellInsertAfter",order:10},tablecell_delete:{label:v.cell.deleteCell,group:"tablecell",command:"cellDelete",order:15},tablecell_merge:{label:v.cell.merge,group:"tablecell",command:"cellMerge",order:16},tablecell_merge_right:{label:v.cell.mergeRight,group:"tablecell",command:"cellMergeRight",
order:17},tablecell_merge_down:{label:v.cell.mergeDown,group:"tablecell",command:"cellMergeDown",order:18},tablecell_split_horizontal:{label:v.cell.splitHorizontal,group:"tablecell",command:"cellHorizontalSplit",order:19},tablecell_split_vertical:{label:v.cell.splitVertical,group:"tablecell",command:"cellVerticalSplit",order:20},tablecell_properties:{label:v.cell.title,group:"tablecellproperties",command:"cellProperties",order:21},tablerow:{label:v.row.menu,group:"tablerow",order:1,getItems:function(){return{tablerow_insertBefore:CKEDITOR.TRISTATE_OFF,
tablerow_insertAfter:CKEDITOR.TRISTATE_OFF,tablerow_delete:CKEDITOR.TRISTATE_OFF}}},tablerow_insertBefore:{label:v.row.insertBefore,group:"tablerow",command:"rowInsertBefore",order:5},tablerow_insertAfter:{label:v.row.insertAfter,group:"tablerow",command:"rowInsertAfter",order:10},tablerow_delete:{label:v.row.deleteRow,group:"tablerow",command:"rowDelete",order:15},tablecolumn:{label:v.column.menu,group:"tablecolumn",order:1,getItems:function(){return{tablecolumn_insertBefore:CKEDITOR.TRISTATE_OFF,
tablecolumn_insertAfter:CKEDITOR.TRISTATE_OFF,tablecolumn_delete:CKEDITOR.TRISTATE_OFF}}},tablecolumn_insertBefore:{label:v.column.insertBefore,group:"tablecolumn",command:"columnInsertBefore",order:5},tablecolumn_insertAfter:{label:v.column.insertAfter,group:"tablecolumn",command:"columnInsertAfter",order:10},tablecolumn_delete:{label:v.column.deleteColumn,group:"tablecolumn",command:"columnDelete",order:15}});c.contextMenu&&c.contextMenu.addListener(function(a,b,c){return(a=c.contains({td:1,th:1},
1))&&!a.isReadOnly()?{tablecell:CKEDITOR.TRISTATE_OFF,tablerow:CKEDITOR.TRISTATE_OFF,tablecolumn:CKEDITOR.TRISTATE_OFF}:null})},getCellColIndex:c,insertRow:e,insertColumn:l,getSelectedCells:a};CKEDITOR.plugins.add("tabletools",CKEDITOR.plugins.tabletools)}(),CKEDITOR.tools.buildTableMap=function(a,e,b,c,d){a=a.$.rows;b=b||0;c="number"===typeof c?c:a.length-1;d="number"===typeof d?d:-1;var l=-1,k=[];for(e=e||0;e<=c;e++){l++;!k[l]&&(k[l]=[]);for(var g=-1,h=b;h<=(-1===d?a[e].cells.length-1:d);h++){var m=
a[e].cells[h];if(!m)break;for(g++;k[l][g];)g++;for(var f=isNaN(m.colSpan)?1:m.colSpan,m=isNaN(m.rowSpan)?1:m.rowSpan,n=0;n<m&&!(e+n>c);n++){k[l+n]||(k[l+n]=[]);for(var p=0;p<f;p++)k[l+n][g+p]=a[e].cells[h]}g+=f-1;if(-1!==d&&g>=d)break}}return k},function(){function a(a){return CKEDITOR.plugins.widget&&CKEDITOR.plugins.widget.isDomWidget(a)}function e(a,b){var c=a.getAscendant("table"),d=b.getAscendant("table"),e=CKEDITOR.tools.buildTableMap(c),f=m(a),g=m(b),h=[],k={},l,n;c.contains(d)&&(b=b.getAscendant({td:1,
th:1}),g=m(b));f>g&&(c=f,f=g,g=c,c=a,a=b,b=c);for(c=0;c<e[f].length;c++)if(a.$===e[f][c]){l=c;break}for(c=0;c<e[g].length;c++)if(b.$===e[g][c]){n=c;break}l>n&&(c=l,l=n,n=c);for(c=f;c<=g;c++)for(f=l;f<=n;f++)d=new CKEDITOR.dom.element(e[c][f]),d.$&&!d.getCustomData("selected_cell")&&(h.push(d),CKEDITOR.dom.element.setMarker(k,d,"selected_cell",!0));CKEDITOR.dom.element.clearAllMarkers(k);return h}function b(a){if(a)return a=a.clone(),a.enlarge(CKEDITOR.ENLARGE_ELEMENT),(a=a.getEnclosedNode())&&a.is&&
a.is(CKEDITOR.dtd.$tableContent)}function c(a){return(a=a.editable().findOne(".cke_table-faked-selection"))&&a.getAscendant("table")}function d(a,b){var c=a.editable().find(".cke_table-faked-selection"),d;a.fire("lockSnapshot");a.editable().removeClass("cke_table-faked-selection-editor");for(d=0;d<c.count();d++)c.getItem(d).removeClass("cke_table-faked-selection");0<c.count()&&c.getItem(0).getAscendant("table").data("cke-table-faked-selection-table",!1);a.fire("unlockSnapshot");b&&(q={active:!1},
a.getSelection().isInTable()&&a.getSelection().reset())}function l(a,b){var c=[],d,e;for(e=0;e<b.length;e++)d=a.createRange(),d.setStartBefore(b[e]),d.setEndAfter(b[e]),c.push(d);a.getSelection().selectRanges(c)}function k(a){var b=a.editable().find(".cke_table-faked-selection");1>b.count()||(b=e(b.getItem(0),b.getItem(b.count()-1)),l(a,b))}function g(b,c,f){var g=u(b.getSelection(!0));c=c.is("table")?null:c;var h;(h=q.active&&!q.first)&&!(h=c)&&(h=b.getSelection().getRanges(),h=1<g.length||h[0]&&
!h[0].collapsed?!0:!1);if(h)q.first=c||g[0],q.dirty=c?!1:1!==g.length;else if(q.active&&c&&q.first.getAscendant("table").equals(c.getAscendant("table"))){g=e(q.first,c);if(!q.dirty&&1===g.length&&!a(f.data.getTarget()))return d(b,"mouseup"===f.name);q.dirty=!0;q.last=c;l(b,g)}}function h(a){var b=(a=a.editor||a.sender.editor)&&a.getSelection(),c=b&&b.getRanges()||[],e;if(b&&(d(a),b.isInTable()&&b.isFake)){1===c.length&&c[0]._getTableElement()&&c[0]._getTableElement().is("table")&&(e=c[0]._getTableElement());
e=u(b,e);a.fire("lockSnapshot");for(b=0;b<e.length;b++)e[b].addClass("cke_table-faked-selection");0<e.length&&(a.editable().addClass("cke_table-faked-selection-editor"),e[0].getAscendant("table").data("cke-table-faked-selection-table",""));a.fire("unlockSnapshot")}}function m(a){return a.getAscendant("tr",!0).$.rowIndex}function f(b){function e(a,b){return a&&b?a.equals(b)||a.contains(b)||b.contains(a)||a.getCommonAncestor(b).is(t):!1}function h(a){return!a.getAscendant("table",!0)&&a.getDocument().equals(l.document)}
function m(a,b,c,d){return("mousedown"!==a.name||CKEDITOR.tools.getMouseButton(a)!==CKEDITOR.MOUSE_BUTTON_LEFT&&d)&&("mouseup"!==a.name||h(a.data.getTarget())||e(c,d))?!1:!0}if(b.data.getTarget().getName&&("mouseup"===b.name||!a(b.data.getTarget()))){var l=b.editor||b.listenerData.editor,n=l.getSelection(1),p=c(l),v=b.data.getTarget(),r=v&&v.getAscendant({td:1,th:1},!0),v=v&&v.getAscendant("table",!0),t={table:1,thead:1,tbody:1,tfoot:1,tr:1,td:1,th:1};m(b,n,p,v)&&d(l,!0);!q.active&&"mousedown"===
b.name&&CKEDITOR.tools.getMouseButton(b)===CKEDITOR.MOUSE_BUTTON_LEFT&&v&&(q={active:!0},CKEDITOR.document.on("mouseup",f,null,{editor:l}));(r||v)&&g(l,r||v,b);"mouseup"===b.name&&(CKEDITOR.tools.getMouseButton(b)===CKEDITOR.MOUSE_BUTTON_LEFT&&(h(b.data.getTarget())||e(p,v))&&k(l),q={active:!1},CKEDITOR.document.removeListener("mouseup",f))}}function n(a){var b=a.data.getTarget().getAscendant({td:1,th:1},!0);b&&!b.hasClass("cke_table-faked-selection")&&(a.cancel(),a.data.preventDefault())}function p(a,
b){function c(a){a.cancel()}var d=a.getSelection(),e=d.createBookmarks(),f=a.document,g=a.createRange(),h=f.getDocumentElement().$,k=CKEDITOR.env.ie&&9>CKEDITOR.env.version,m=a.blockless||CKEDITOR.env.ie?"span":"div",l,n,p,v;f.getById("cke_table_copybin")||(l=f.createElement(m),n=f.createElement(m),n.setAttributes({id:"cke_table_copybin","data-cke-temp":"1"}),l.setStyles({position:"absolute",width:"1px",height:"1px",overflow:"hidden"}),l.setStyle("ltr"==a.config.contentsLangDirection?"left":"right",
"-5000px"),l.setHtml(a.getSelectedHtml(!0)),a.fire("lockSnapshot"),n.append(l),a.editable().append(n),v=a.on("selectionChange",c,null,null,0),k&&(p=h.scrollTop),g.selectNodeContents(l),g.select(),k&&(h.scrollTop=p),setTimeout(function(){n.remove();d.selectBookmarks(e);v.removeListener();a.fire("unlockSnapshot");b&&(a.extractSelectedHtml(),a.fire("saveSnapshot"))},100))}function r(a){var b=a.editor||a.sender.editor;b.getSelection().isInTable()&&p(b,"cut"===a.name)}function v(a){this._reset();a&&this.setSelectedCells(a)}
function x(a,b,c){a.on("beforeCommandExec",function(c){-1!==CKEDITOR.tools.array.indexOf(b,c.data.name)&&(c.data.selectedCells=u(a.getSelection()))});a.on("afterCommandExec",function(d){-1!==CKEDITOR.tools.array.indexOf(b,d.data.name)&&c(a,d.data)})}var q={active:!1},t,u,A,z,w;v.prototype={};v.prototype._reset=function(){this.cells={first:null,last:null,all:[]};this.rows={first:null,last:null}};v.prototype.setSelectedCells=function(a){this._reset();a=a.slice(0);this._arraySortByDOMOrder(a);this.cells.all=
a;this.cells.first=a[0];this.cells.last=a[a.length-1];this.rows.first=a[0].getAscendant("tr");this.rows.last=this.cells.last.getAscendant("tr")};v.prototype.getTableMap=function(){var a=A(this.cells.first),b;a:{b=this.cells.last;var c=b.getAscendant("table"),d=m(b),c=CKEDITOR.tools.buildTableMap(c),e;for(e=0;e<c[d].length;e++)if((new CKEDITOR.dom.element(c[d][e])).equals(b)){b=e;break a}b=void 0}return CKEDITOR.tools.buildTableMap(this._getTable(),m(this.rows.first),a,m(this.rows.last),b)};v.prototype._getTable=
function(){return this.rows.first.getAscendant("table")};v.prototype.insertRow=function(a,b,c){if("undefined"===typeof a)a=1;else if(0>=a)return;for(var d=this.cells.first.$.cellIndex,e=this.cells.last.$.cellIndex,f=c?[]:this.cells.all,g,h=0;h<a;h++)g=z(c?this.cells.all:f,b),g=CKEDITOR.tools.array.filter(g.find("td, th").toArray(),function(a){return c?!0:a.$.cellIndex>=d&&a.$.cellIndex<=e}),f=b?g.concat(f):f.concat(g);this.setSelectedCells(f)};v.prototype.insertColumn=function(a){function b(a){a=
m(a);return a>=e&&a<=f}if("undefined"===typeof a)a=1;else if(0>=a)return;for(var c=this.cells,d=c.all,e=m(c.first),f=m(c.last),c=0;c<a;c++)d=d.concat(CKEDITOR.tools.array.filter(w(d),b));this.setSelectedCells(d)};v.prototype.emptyCells=function(a){a=a||this.cells.all;for(var b=0;b<a.length;b++)a[b].setHtml("")};v.prototype._arraySortByDOMOrder=function(a){a.sort(function(a,b){return a.getPosition(b)&CKEDITOR.POSITION_PRECEDING?-1:1})};var C={onPaste:function(a){function c(a){return Math.max.apply(null,
CKEDITOR.tools.array.map(a,function(a){return a.length},0))}function d(a){var b=f.createRange();b.selectNodeContents(a);b.select()}var f=a.editor,g=f.getSelection(),h=u(g),k=this.findTableInPastedContent(f,a.data.dataValue),m=g.isInTable(!0)&&this.isBoundarySelection(g),n,p;!h.length||1===h.length&&!b(g.getRanges()[0])&&!m||m&&!k||(h=h[0].getAscendant("table"),n=new v(u(g,h)),f.once("afterPaste",function(){var a;if(p){a=new CKEDITOR.dom.element(p[0][0]);var b=p[p.length-1];a=e(a,new CKEDITOR.dom.element(b[b.length-
1]))}else a=n.cells.all;l(f,a)}),k?(a.stop(),m?(n.insertRow(1,1===m,!0),g.selectElement(n.rows.first)):(n.emptyCells(),l(f,n.cells.all)),a=n.getTableMap(),p=CKEDITOR.tools.buildTableMap(k),n.insertRow(p.length-a.length),n.insertColumn(c(p)-c(a)),a=n.getTableMap(),this.pasteTable(n,a,p),f.fire("saveSnapshot"),setTimeout(function(){f.fire("afterPaste")},0)):(d(n.cells.first),f.once("afterPaste",function(){f.fire("lockSnapshot");n.emptyCells(n.cells.all.slice(1));l(f,n.cells.all);f.fire("unlockSnapshot")})))},
isBoundarySelection:function(a){a=a.getRanges()[0];var b=a.endContainer.getAscendant("tr",!0);if(b&&a.collapsed){if(a.checkBoundaryOfElement(b,CKEDITOR.START))return 1;if(a.checkBoundaryOfElement(b,CKEDITOR.END))return 2}return 0},findTableInPastedContent:function(a,b){var c=a.dataProcessor,d=new CKEDITOR.dom.element("body");c||(c=new CKEDITOR.htmlDataProcessor(a));d.setHtml(c.toHtml(b),{fixForBody:!1});return 1<d.getChildCount()?null:d.findOne("table")},pasteTable:function(a,b,c){var d,e=A(a.cells.first),
f=a._getTable(),g={},h,k,m,l;for(m=0;m<c.length;m++)for(h=new CKEDITOR.dom.element(f.$.rows[a.rows.first.$.rowIndex+m]),l=0;l<c[m].length;l++)if(k=new CKEDITOR.dom.element(c[m][l]),d=b[m]&&b[m][l]?new CKEDITOR.dom.element(b[m][l]):null,k&&!k.getCustomData("processed")){if(d&&d.getParent())k.replace(d);else if(0===l||c[m][l-1])(d=0!==l?new CKEDITOR.dom.element(c[m][l-1]):null)&&h.equals(d.getParent())?k.insertAfter(d):0<e?h.$.cells[e]?k.insertAfter(new CKEDITOR.dom.element(h.$.cells[e])):h.append(k):
h.append(k,!0);CKEDITOR.dom.element.setMarker(g,k,"processed",!0)}else k.getCustomData("processed")&&d&&d.remove();CKEDITOR.dom.element.clearAllMarkers(g)}};CKEDITOR.plugins.tableselection={getCellsBetween:e,keyboardIntegration:function(a){function b(a){var c=a.getEnclosedNode();c&&c.is({td:1,th:1})?a.getEnclosedNode().setText(""):a.deleteContents();CKEDITOR.tools.array.forEach(a._find("td"),function(a){a.appendBogus()})}var c=a.editable();c.attachListener(c,"keydown",function(a){function c(b,d){if(!d.length)return null;
var f=a.createRange(),g=CKEDITOR.dom.range.mergeRanges(d);CKEDITOR.tools.array.forEach(g,function(a){a.enlarge(CKEDITOR.ENLARGE_ELEMENT)});var h=g[0].getBoundaryNodes(),k=h.startNode,h=h.endNode;if(k&&k.is&&k.is(e)){for(var m=k.getAscendant("table",!0),l=k.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT,m),n=!1,p=function(a){return!k.contains(a)&&a.is&&a.is("td","th")};l&&!p(l);)l=l.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT,m);!l&&h&&h.is&&!h.is("table")&&h.getNext()&&(l=h.getNext().findOne("td, th"),
n=!0);if(l)f["moveToElementEdit"+(n?"Start":"End")](l);else f.setStartBefore(k.getAscendant("table",!0)),f.collapse(!0);g[0].deleteContents();return[f]}if(k)return f.moveToElementEditablePosition(k),[f]}var d={37:1,38:1,39:1,40:1,8:1,46:1},e=CKEDITOR.tools.extend({table:1},CKEDITOR.dtd.$tableContent);delete e.td;delete e.th;return function(e){var f=e.data.getKey(),g,h=37===f||38==f,k,m,l;if(d[f]&&(g=a.getSelection())&&g.isInTable()&&g.isFake)if(k=g.getRanges(),m=k[0]._getTableElement(),l=k[k.length-
1]._getTableElement(),e.data.preventDefault(),e.cancel(),8<f&&46>f)k[0].moveToElementEditablePosition(h?m:l,!h),g.selectRanges([k[0]]);else{for(e=0;e<k.length;e++)b(k[e]);(e=c(m,k))?k=e:k[0].moveToElementEditablePosition(m);g.selectRanges(k);a.fire("saveSnapshot")}}}(a),null,null,-1);c.attachListener(c,"keypress",function(c){var d=a.getSelection(),e=c.data.$.charCode||13===c.data.getKey(),f;if(d&&d.isInTable()&&d.isFake&&e&&!(c.data.getKeystroke()&CKEDITOR.CTRL)){c=d.getRanges();e=c[0].getEnclosedNode().getAscendant({td:1,
th:1},!0);for(f=0;f<c.length;f++)b(c[f]);e&&(c[0].moveToElementEditablePosition(e),d.selectRanges([c[0]]))}},null,null,-1)},isSupportedEnvironment:!(CKEDITOR.env.ie&&11>CKEDITOR.env.version)};CKEDITOR.plugins.add("tableselection",{requires:"clipboard,tabletools",onLoad:function(){t=CKEDITOR.plugins.tabletools;u=t.getSelectedCells;A=t.getCellColIndex;z=t.insertRow;w=t.insertColumn;CKEDITOR.document.appendStyleSheet(this.path+"styles/tableselection.css")},init:function(a){CKEDITOR.plugins.tableselection.isSupportedEnvironment&&
(a.addContentsCss&&a.addContentsCss(this.path+"styles/tableselection.css"),a.on("contentDom",function(){var b=a.editable(),c=b.isInline()?b:a.document,d={editor:a};b.attachListener(c,"mousedown",f,null,d);b.attachListener(c,"mousemove",f,null,d);b.attachListener(c,"mouseup",f,null,d);b.attachListener(b,"dragstart",n);b.attachListener(a,"selectionCheck",h);CKEDITOR.plugins.tableselection.keyboardIntegration(a);CKEDITOR.plugins.clipboard&&!CKEDITOR.plugins.clipboard.isCustomCopyCutSupported&&(b.attachListener(b,
"cut",r),b.attachListener(b,"copy",r))}),a.on("paste",C.onPaste,C),x(a,"rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "),function(a,b){l(a,b.selectedCells)}),x(a,["cellMerge","cellMergeRight","cellMergeDown"],function(a,b){l(a,[b.commandData.cell])}),x(a,["cellDelete"],function(a){d(a,!0)}))}})}(),"use strict",function(){var a=[CKEDITOR.CTRL+90,CKEDITOR.CTRL+89,CKEDITOR.CTRL+CKEDITOR.SHIFT+90],e={8:1,46:1};CKEDITOR.plugins.add("undo",
{init:function(c){function d(a){f.enabled&&!1!==a.data.command.canUndo&&f.save()}function e(){f.enabled=c.readOnly?!1:"wysiwyg"==c.mode;f.onChange()}var f=c.undoManager=new b(c),k=f.editingHandler=new l(f),p=c.addCommand("undo",{exec:function(){f.undo()&&(c.selectionChange(),this.fire("afterUndo"))},startDisabled:!0,canUndo:!1}),r=c.addCommand("redo",{exec:function(){f.redo()&&(c.selectionChange(),this.fire("afterRedo"))},startDisabled:!0,canUndo:!1});c.setKeystroke([[a[0],"undo"],[a[1],"redo"],[a[2],
"redo"]]);f.onChange=function(){p.setState(f.undoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);r.setState(f.redoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)};c.on("beforeCommandExec",d);c.on("afterCommandExec",d);c.on("saveSnapshot",function(a){f.save(a.data&&a.data.contentOnly)});c.on("contentDom",k.attachListeners,k);c.on("instanceReady",function(){c.fire("saveSnapshot")});c.on("beforeModeUnload",function(){"wysiwyg"==c.mode&&f.save(!0)});c.on("mode",e);c.on("readOnly",e);
c.ui.addButton&&(c.ui.addButton("Undo",{label:c.lang.undo.undo,command:"undo",toolbar:"undo,10"}),c.ui.addButton("Redo",{label:c.lang.undo.redo,command:"redo",toolbar:"undo,20"}));c.resetUndo=function(){f.reset();c.fire("saveSnapshot")};c.on("updateSnapshot",function(){f.currentImage&&f.update()});c.on("lockSnapshot",function(a){a=a.data;f.lock(a&&a.dontUpdate,a&&a.forceUpdate)});c.on("unlockSnapshot",f.unlock,f)}});CKEDITOR.plugins.undo={};var b=CKEDITOR.plugins.undo.UndoManager=function(a){this.strokesRecorded=
[0,0];this.locked=null;this.previousKeyGroup=-1;this.limit=a.config.undoStackSize||20;this.strokesLimit=25;this.editor=a;this.reset()};b.prototype={type:function(a,c){var d=b.getKeyGroup(a),e=this.strokesRecorded[d]+1;c=c||e>=this.strokesLimit;this.typing||(this.hasUndo=this.typing=!0,this.hasRedo=!1,this.onChange());c?(e=0,this.editor.fire("saveSnapshot")):this.editor.fire("change");this.strokesRecorded[d]=e;this.previousKeyGroup=d},keyGroupChanged:function(a){return b.getKeyGroup(a)!=this.previousKeyGroup},
reset:function(){this.snapshots=[];this.index=-1;this.currentImage=null;this.hasRedo=this.hasUndo=!1;this.locked=null;this.resetType()},resetType:function(){this.strokesRecorded=[0,0];this.typing=!1;this.previousKeyGroup=-1},refreshState:function(){this.hasUndo=!!this.getNextImage(!0);this.hasRedo=!!this.getNextImage(!1);this.resetType();this.onChange()},save:function(a,b,d){var e=this.editor;if(this.locked||"ready"!=e.status||"wysiwyg"!=e.mode)return!1;var k=e.editable();if(!k||"ready"!=k.status)return!1;
k=this.snapshots;b||(b=new c(e));if(!1===b.contents)return!1;if(this.currentImage)if(b.equalsContent(this.currentImage)){if(a||b.equalsSelection(this.currentImage))return!1}else!1!==d&&e.fire("change");k.splice(this.index+1,k.length-this.index-1);k.length==this.limit&&k.shift();this.index=k.push(b)-1;this.currentImage=b;!1!==d&&this.refreshState();return!0},restoreImage:function(a){var b=this.editor,c;a.bookmarks&&(b.focus(),c=b.getSelection());this.locked={level:999};this.editor.loadSnapshot(a.contents);
a.bookmarks?c.selectBookmarks(a.bookmarks):CKEDITOR.env.ie&&(c=this.editor.document.getBody().$.createTextRange(),c.collapse(!0),c.select());this.locked=null;this.index=a.index;this.currentImage=this.snapshots[this.index];this.update();this.refreshState();b.fire("change")},getNextImage:function(a){var b=this.snapshots,c=this.currentImage,d;if(c)if(a)for(d=this.index-1;0<=d;d--){if(a=b[d],!c.equalsContent(a))return a.index=d,a}else for(d=this.index+1;d<b.length;d++)if(a=b[d],!c.equalsContent(a))return a.index=
d,a;return null},redoable:function(){return this.enabled&&this.hasRedo},undoable:function(){return this.enabled&&this.hasUndo},undo:function(){if(this.undoable()){this.save(!0);var a=this.getNextImage(!0);if(a)return this.restoreImage(a),!0}return!1},redo:function(){if(this.redoable()&&(this.save(!0),this.redoable())){var a=this.getNextImage(!1);if(a)return this.restoreImage(a),!0}return!1},update:function(a){if(!this.locked){a||(a=new c(this.editor));for(var b=this.index,d=this.snapshots;0<b&&this.currentImage.equalsContent(d[b-
1]);)--b;d.splice(b,this.index-b+1,a);this.index=b;this.currentImage=a}},updateSelection:function(a){if(!this.snapshots.length)return!1;var b=this.snapshots,c=b[b.length-1];return c.equalsContent(a)&&!c.equalsSelection(a)?(this.currentImage=b[b.length-1]=a,!0):!1},lock:function(a,b){if(this.locked)this.locked.level++;else if(a)this.locked={level:1};else{var d=null;if(b)d=!0;else{var e=new c(this.editor,!0);this.currentImage&&this.currentImage.equalsContent(e)&&(d=e)}this.locked={update:d,level:1}}},
unlock:function(){if(this.locked&&!--this.locked.level){var a=this.locked.update;this.locked=null;if(!0===a)this.update();else if(a){var b=new c(this.editor,!0);a.equalsContent(b)||this.update()}}}};b.navigationKeyCodes={37:1,38:1,39:1,40:1,36:1,35:1,33:1,34:1};b.keyGroups={PRINTABLE:0,FUNCTIONAL:1};b.isNavigationKey=function(a){return!!b.navigationKeyCodes[a]};b.getKeyGroup=function(a){var c=b.keyGroups;return e[a]?c.FUNCTIONAL:c.PRINTABLE};b.getOppositeKeyGroup=function(a){var c=b.keyGroups;return a==
c.FUNCTIONAL?c.PRINTABLE:c.FUNCTIONAL};b.ieFunctionalKeysBug=function(a){return CKEDITOR.env.ie&&b.getKeyGroup(a)==b.keyGroups.FUNCTIONAL};var c=CKEDITOR.plugins.undo.Image=function(a,b){this.editor=a;a.fire("beforeUndoImage");var c=a.getSnapshot();CKEDITOR.env.ie&&c&&(c=c.replace(/\s+data-cke-expando=".*?"/g,""));this.contents=c;b||(this.bookmarks=(c=c&&a.getSelection())&&c.createBookmarks2(!0));a.fire("afterUndoImage")},d=/\b(?:href|src|name)="[^"]*?"/gi;c.prototype={equalsContent:function(a){var b=
this.contents;a=a.contents;CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)&&(b=b.replace(d,""),a=a.replace(d,""));return b!=a?!1:!0},equalsSelection:function(a){var b=this.bookmarks;a=a.bookmarks;if(b||a){if(!b||!a||b.length!=a.length)return!1;for(var c=0;c<b.length;c++){var d=b[c],e=a[c];if(d.startOffset!=e.startOffset||d.endOffset!=e.endOffset||!CKEDITOR.tools.arrayCompare(d.start,e.start)||!CKEDITOR.tools.arrayCompare(d.end,e.end))return!1}}return!0}};var l=CKEDITOR.plugins.undo.NativeEditingHandler=
function(a){this.undoManager=a;this.ignoreInputEvent=!1;this.keyEventsStack=new k;this.lastKeydownImage=null};l.prototype={onKeydown:function(d){var e=d.data.getKey();if(229!==e)if(-1<CKEDITOR.tools.indexOf(a,d.data.getKeystroke()))d.data.preventDefault();else if(this.keyEventsStack.cleanUp(d),d=this.undoManager,this.keyEventsStack.getLast(e)||this.keyEventsStack.push(e),this.lastKeydownImage=new c(d.editor),b.isNavigationKey(e)||this.undoManager.keyGroupChanged(e))if(d.strokesRecorded[0]||d.strokesRecorded[1])d.save(!1,
this.lastKeydownImage,!1),d.resetType()},onInput:function(){if(this.ignoreInputEvent)this.ignoreInputEvent=!1;else{var a=this.keyEventsStack.getLast();a||(a=this.keyEventsStack.push(0));this.keyEventsStack.increment(a.keyCode);this.keyEventsStack.getTotalInputs()>=this.undoManager.strokesLimit&&(this.undoManager.type(a.keyCode,!0),this.keyEventsStack.resetInputs())}},onKeyup:function(a){var d=this.undoManager;a=a.data.getKey();var e=this.keyEventsStack.getTotalInputs();this.keyEventsStack.remove(a);
if(!(b.ieFunctionalKeysBug(a)&&this.lastKeydownImage&&this.lastKeydownImage.equalsContent(new c(d.editor,!0))))if(0<e)d.type(a);else if(b.isNavigationKey(a))this.onNavigationKey(!0)},onNavigationKey:function(a){var b=this.undoManager;!a&&b.save(!0,null,!1)||b.updateSelection(new c(b.editor));b.resetType()},ignoreInputEventListener:function(){this.ignoreInputEvent=!0},activateInputEventListener:function(){this.ignoreInputEvent=!1},attachListeners:function(){var a=this.undoManager.editor,c=a.editable(),
d=this;c.attachListener(c,"keydown",function(a){d.onKeydown(a);if(b.ieFunctionalKeysBug(a.data.getKey()))d.onInput()},null,null,999);c.attachListener(c,CKEDITOR.env.ie?"keypress":"input",d.onInput,d,null,999);c.attachListener(c,"keyup",d.onKeyup,d,null,999);c.attachListener(c,"paste",d.ignoreInputEventListener,d,null,999);c.attachListener(c,"drop",d.ignoreInputEventListener,d,null,999);a.on("afterPaste",d.activateInputEventListener,d,null,999);c.attachListener(c.isInline()?c:a.document.getDocumentElement(),
"click",function(){d.onNavigationKey()},null,null,999);c.attachListener(this.undoManager.editor,"blur",function(){d.keyEventsStack.remove(9)},null,null,999)}};var k=CKEDITOR.plugins.undo.KeyEventsStack=function(){this.stack=[]};k.prototype={push:function(a){a=this.stack.push({keyCode:a,inputs:0});return this.stack[a-1]},getLastIndex:function(a){if("number"!=typeof a)return this.stack.length-1;for(var b=this.stack.length;b--;)if(this.stack[b].keyCode==a)return b;return-1},getLast:function(a){a=this.getLastIndex(a);
return-1!=a?this.stack[a]:null},increment:function(a){this.getLast(a).inputs++},remove:function(a){a=this.getLastIndex(a);-1!=a&&this.stack.splice(a,1)},resetInputs:function(a){if("number"==typeof a)this.getLast(a).inputs=0;else for(a=this.stack.length;a--;)this.stack[a].inputs=0},getTotalInputs:function(){for(var a=this.stack.length,b=0;a--;)b+=this.stack[a].inputs;return b},cleanUp:function(a){a=a.data.$;a.ctrlKey||a.metaKey||this.remove(17);a.shiftKey||this.remove(16);a.altKey||this.remove(18)}}}(),
"use strict",function(){function a(a,b){CKEDITOR.tools.extend(this,{editor:a,editable:a.editable(),doc:a.document,win:a.window},b,!0);this.inline=this.editable.isInline();this.inline||(this.frame=this.win.getFrame());this.target=this[this.inline?"editable":"doc"]}function e(a,b){CKEDITOR.tools.extend(this,b,{editor:a},!0)}function b(a,b){var c=a.editable();CKEDITOR.tools.extend(this,{editor:a,editable:c,inline:c.isInline(),doc:a.document,win:a.window,container:CKEDITOR.document.getBody(),winTop:CKEDITOR.document.getWindow()},
b,!0);this.hidden={};this.visible={};this.inline||(this.frame=this.win.getFrame());this.queryViewport();var e=CKEDITOR.tools.bind(this.queryViewport,this),g=CKEDITOR.tools.bind(this.hideVisible,this),k=CKEDITOR.tools.bind(this.removeAll,this);c.attachListener(this.winTop,"resize",e);c.attachListener(this.winTop,"scroll",e);c.attachListener(this.winTop,"resize",g);c.attachListener(this.win,"scroll",g);c.attachListener(this.inline?c:this.frame,"mouseout",function(a){var b=a.data.$.clientX;a=a.data.$.clientY;
this.queryViewport();(b<=this.rect.left||b>=this.rect.right||a<=this.rect.top||a>=this.rect.bottom)&&this.hideVisible();(0>=b||b>=this.winTopPane.width||0>=a||a>=this.winTopPane.height)&&this.hideVisible()},this);c.attachListener(a,"resize",e);c.attachListener(a,"mode",k);a.on("destroy",k);this.lineTpl=(new CKEDITOR.template('\x3cdiv data-cke-lineutils-line\x3d"1" class\x3d"cke_reset_all" style\x3d"{lineStyle}"\x3e\x3cspan style\x3d"{tipLeftStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3cspan style\x3d"{tipRightStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3c/div\x3e')).output({lineStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},
l,this.lineStyle,!0)),tipLeftStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},d,{left:"0px","border-left-color":"red","border-width":"6px 0 6px 6px"},this.tipCss,this.tipLeftStyle,!0)),tipRightStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},d,{right:"0px","border-right-color":"red","border-width":"6px 6px 6px 0"},this.tipCss,this.tipRightStyle,!0))})}function c(a){var b;if(b=a&&a.type==CKEDITOR.NODE_ELEMENT)b=!(k[a.getComputedStyle("float")]||k[a.getAttribute("align")]);return b&&
!g[a.getComputedStyle("position")]}CKEDITOR.plugins.add("lineutils");CKEDITOR.LINEUTILS_BEFORE=1;CKEDITOR.LINEUTILS_AFTER=2;CKEDITOR.LINEUTILS_INSIDE=4;a.prototype={start:function(a){var b=this,c=this.editor,d=this.doc,e,g,k,l,q=CKEDITOR.tools.eventsBuffer(50,function(){c.readOnly||"wysiwyg"!=c.mode||(b.relations={},(g=d.$.elementFromPoint(k,l))&&g.nodeType&&(e=new CKEDITOR.dom.element(g),b.traverseSearch(e),isNaN(k+l)||b.pixelSearch(e,k,l),a&&a(b.relations,k,l)))});this.listener=this.editable.attachListener(this.target,
"mousemove",function(a){k=a.data.$.clientX;l=a.data.$.clientY;q.input()});this.editable.attachListener(this.inline?this.editable:this.frame,"mouseout",function(){q.reset()})},stop:function(){this.listener&&this.listener.removeListener()},getRange:function(){var a={};a[CKEDITOR.LINEUTILS_BEFORE]=CKEDITOR.POSITION_BEFORE_START;a[CKEDITOR.LINEUTILS_AFTER]=CKEDITOR.POSITION_AFTER_END;a[CKEDITOR.LINEUTILS_INSIDE]=CKEDITOR.POSITION_AFTER_START;return function(b){var c=this.editor.createRange();c.moveToPosition(this.relations[b.uid].element,
a[b.type]);return c}}(),store:function(){function a(b,c,d){var e=b.getUniqueId();e in d?d[e].type|=c:d[e]={element:b,type:c}}return function(b,d){var e;d&CKEDITOR.LINEUTILS_AFTER&&c(e=b.getNext())&&e.isVisible()&&(a(e,CKEDITOR.LINEUTILS_BEFORE,this.relations),d^=CKEDITOR.LINEUTILS_AFTER);d&CKEDITOR.LINEUTILS_INSIDE&&c(e=b.getFirst())&&e.isVisible()&&(a(e,CKEDITOR.LINEUTILS_BEFORE,this.relations),d^=CKEDITOR.LINEUTILS_INSIDE);a(b,d,this.relations)}}(),traverseSearch:function(a){var b,d,e;do if(e=a.$["data-cke-expando"],
!(e&&e in this.relations)){if(a.equals(this.editable))break;if(c(a))for(b in this.lookups)(d=this.lookups[b](a))&&this.store(a,d)}while((!a||a.type!=CKEDITOR.NODE_ELEMENT||"true"!=a.getAttribute("contenteditable"))&&(a=a.getParent()))},pixelSearch:function(){function a(d,e,g,h,k){for(var l=0,q;k(g);){g+=h;if(25==++l)break;if(q=this.doc.$.elementFromPoint(e,g))if(q==d)l=0;else if(b(d,q)&&(l=0,c(q=new CKEDITOR.dom.element(q))))return q}}var b=CKEDITOR.env.ie||CKEDITOR.env.webkit?function(a,b){return a.contains(b)}:
function(a,b){return!!(a.compareDocumentPosition(b)&16)};return function(b,d,e){var g=this.win.getViewPaneSize().height,k=a.call(this,b.$,d,e,-1,function(a){return 0<a});d=a.call(this,b.$,d,e,1,function(a){return a<g});if(k)for(this.traverseSearch(k);!k.getParent().equals(b);)k=k.getParent();if(d)for(this.traverseSearch(d);!d.getParent().equals(b);)d=d.getParent();for(;k||d;){k&&(k=k.getNext(c));if(!k||k.equals(d))break;this.traverseSearch(k);d&&(d=d.getPrevious(c));if(!d||d.equals(k))break;this.traverseSearch(d)}}}(),
greedySearch:function(){this.relations={};for(var a=this.editable.getElementsByTag("*"),b=0,d,e,g;d=a.getItem(b++);)if(!d.equals(this.editable)&&d.type==CKEDITOR.NODE_ELEMENT&&(d.hasAttribute("contenteditable")||!d.isReadOnly())&&c(d)&&d.isVisible())for(g in this.lookups)(e=this.lookups[g](d))&&this.store(d,e);return this.relations}};e.prototype={locate:function(){function a(b,d){var e=b.element[d===CKEDITOR.LINEUTILS_BEFORE?"getPrevious":"getNext"]();return e&&c(e)?(b.siblingRect=e.getClientRect(),
d==CKEDITOR.LINEUTILS_BEFORE?(b.siblingRect.bottom+b.elementRect.top)/2:(b.elementRect.bottom+b.siblingRect.top)/2):d==CKEDITOR.LINEUTILS_BEFORE?b.elementRect.top:b.elementRect.bottom}return function(b){var c;this.locations={};for(var d in b)c=b[d],c.elementRect=c.element.getClientRect(),c.type&CKEDITOR.LINEUTILS_BEFORE&&this.store(d,CKEDITOR.LINEUTILS_BEFORE,a(c,CKEDITOR.LINEUTILS_BEFORE)),c.type&CKEDITOR.LINEUTILS_AFTER&&this.store(d,CKEDITOR.LINEUTILS_AFTER,a(c,CKEDITOR.LINEUTILS_AFTER)),c.type&
CKEDITOR.LINEUTILS_INSIDE&&this.store(d,CKEDITOR.LINEUTILS_INSIDE,(c.elementRect.top+c.elementRect.bottom)/2);return this.locations}}(),sort:function(){var a,b,c,d;return function(e,g){a=this.locations;b=[];for(var k in a)for(var l in a[k])if(c=Math.abs(e-a[k][l]),b.length){for(d=0;d<b.length;d++)if(c<b[d].dist){b.splice(d,0,{uid:+k,type:l,dist:c});break}d==b.length&&b.push({uid:+k,type:l,dist:c})}else b.push({uid:+k,type:l,dist:c});return"undefined"!=typeof g?b.slice(0,g):b}}(),store:function(a,
b,c){this.locations[a]||(this.locations[a]={});this.locations[a][b]=c}};var d={display:"block",width:"0px",height:"0px","border-color":"transparent","border-style":"solid",position:"absolute",top:"-6px"},l={height:"0px","border-top":"1px dashed red",position:"absolute","z-index":9999};b.prototype={removeAll:function(){for(var a in this.hidden)this.hidden[a].remove(),delete this.hidden[a];for(a in this.visible)this.visible[a].remove(),delete this.visible[a]},hideLine:function(a){var b=a.getUniqueId();
a.hide();this.hidden[b]=a;delete this.visible[b]},showLine:function(a){var b=a.getUniqueId();a.show();this.visible[b]=a;delete this.hidden[b]},hideVisible:function(){for(var a in this.visible)this.hideLine(this.visible[a])},placeLine:function(a,b){var c,d,e;if(c=this.getStyle(a.uid,a.type)){for(e in this.visible)if(this.visible[e].getCustomData("hash")!==this.hash){d=this.visible[e];break}if(!d)for(e in this.hidden)if(this.hidden[e].getCustomData("hash")!==this.hash){this.showLine(d=this.hidden[e]);
break}d||this.showLine(d=this.addLine());d.setCustomData("hash",this.hash);this.visible[d.getUniqueId()]=d;d.setStyles(c);b&&b(d)}},getStyle:function(a,b){var c=this.relations[a],d=this.locations[a][b],e={};e.width=c.siblingRect?Math.max(c.siblingRect.width,c.elementRect.width):c.elementRect.width;e.top=this.inline?d+this.winTopScroll.y-this.rect.relativeY:this.rect.top+this.winTopScroll.y+d;if(e.top-this.winTopScroll.y<this.rect.top||e.top-this.winTopScroll.y>this.rect.bottom)return!1;this.inline?
e.left=c.elementRect.left-this.rect.relativeX:(0<c.elementRect.left?e.left=this.rect.left+c.elementRect.left:(e.width+=c.elementRect.left,e.left=this.rect.left),0<(c=e.left+e.width-(this.rect.left+this.winPane.width))&&(e.width-=c));e.left+=this.winTopScroll.x;for(var g in e)e[g]=CKEDITOR.tools.cssLength(e[g]);return e},addLine:function(){var a=CKEDITOR.dom.element.createFromHtml(this.lineTpl);a.appendTo(this.container);return a},prepare:function(a,b){this.relations=a;this.locations=b;this.hash=Math.random()},
cleanup:function(){var a,b;for(b in this.visible)a=this.visible[b],a.getCustomData("hash")!==this.hash&&this.hideLine(a)},queryViewport:function(){this.winPane=this.win.getViewPaneSize();this.winTopScroll=this.winTop.getScrollPosition();this.winTopPane=this.winTop.getViewPaneSize();this.rect=this.getClientRect(this.inline?this.editable:this.frame)},getClientRect:function(a){a=a.getClientRect();var b=this.container.getDocumentPosition(),c=this.container.getComputedStyle("position");a.relativeX=a.relativeY=
0;"static"!=c&&(a.relativeY=b.y,a.relativeX=b.x,a.top-=a.relativeY,a.bottom-=a.relativeY,a.left-=a.relativeX,a.right-=a.relativeX);return a}};var k={left:1,right:1,center:1},g={absolute:1,fixed:1};CKEDITOR.plugins.lineutils={finder:a,locator:e,liner:b}}(),function(){function a(a){return a.getName&&!a.hasAttribute("data-cke-temp")}CKEDITOR.plugins.add("widgetselection",{init:function(a){if(CKEDITOR.env.webkit){var b=CKEDITOR.plugins.widgetselection;a.on("contentDom",function(a){a=a.editor;var d=a.document,
e=a.editable();e.attachListener(d,"keydown",function(a){a.data.getKeystroke()==CKEDITOR.CTRL+65&&CKEDITOR.tools.setTimeout(function(){b.addFillers(e)||b.removeFillers(e)},0)},null,null,-1);a.on("selectionCheck",function(a){b.removeFillers(a.editor.editable())});a.on("paste",function(a){a.data.dataValue=b.cleanPasteData(a.data.dataValue)});"selectall"in a.plugins&&b.addSelectAllIntegration(a)})}}});CKEDITOR.plugins.widgetselection={startFiller:null,endFiller:null,fillerAttribute:"data-cke-filler-webkit",
fillerContent:"\x26nbsp;",fillerTagName:"div",addFillers:function(e){var b=e.editor;if(!this.isWholeContentSelected(e)&&0<e.getChildCount()){var c=e.getFirst(a),d=e.getLast(a);c&&c.type==CKEDITOR.NODE_ELEMENT&&!c.isEditable()&&(this.startFiller=this.createFiller(),e.append(this.startFiller,1));d&&d.type==CKEDITOR.NODE_ELEMENT&&!d.isEditable()&&(this.endFiller=this.createFiller(!0),e.append(this.endFiller,0));if(this.hasFiller(e))return b=b.createRange(),b.selectNodeContents(e),b.select(),!0}return!1},
removeFillers:function(a){if(this.hasFiller(a)&&!this.isWholeContentSelected(a)){var b=a.findOne(this.fillerTagName+"["+this.fillerAttribute+"\x3dstart]"),c=a.findOne(this.fillerTagName+"["+this.fillerAttribute+"\x3dend]");this.startFiller&&b&&this.startFiller.equals(b)?this.removeFiller(this.startFiller,a):this.startFiller=b;this.endFiller&&c&&this.endFiller.equals(c)?this.removeFiller(this.endFiller,a):this.endFiller=c}},cleanPasteData:function(a){a&&a.length&&(a=a.replace(this.createFillerRegex(),
"").replace(this.createFillerRegex(!0),""));return a},isWholeContentSelected:function(a){var b=a.editor.getSelection().getRanges()[0];return!b||b&&b.collapsed?!1:(b=b.clone(),b.enlarge(CKEDITOR.ENLARGE_ELEMENT),!!(b&&a&&b.startContainer&&b.endContainer&&0===b.startOffset&&b.endOffset===a.getChildCount()&&b.startContainer.equals(a)&&b.endContainer.equals(a)))},hasFiller:function(a){return 0<a.find(this.fillerTagName+"["+this.fillerAttribute+"]").count()},createFiller:function(a){var b=new CKEDITOR.dom.element(this.fillerTagName);
b.setHtml(this.fillerContent);b.setAttribute(this.fillerAttribute,a?"end":"start");b.setAttribute("data-cke-temp",1);b.setStyles({display:"block",width:0,height:0,padding:0,border:0,margin:0,position:"absolute",top:0,left:"-9999px",opacity:0,overflow:"hidden"});return b},removeFiller:function(a,b){if(a){var c=b.editor,d=b.editor.getSelection().getRanges()[0].startPath(),l=c.createRange(),k,g;d.contains(a)&&(k=a.getHtml(),g=!0);d="start"==a.getAttribute(this.fillerAttribute);a.remove();k&&0<k.length&&
k!=this.fillerContent?(b.insertHtmlIntoRange(k,c.getSelection().getRanges()[0]),l.setStartAt(b.getChild(b.getChildCount()-1),CKEDITOR.POSITION_BEFORE_END),c.getSelection().selectRanges([l])):g&&(d?l.setStartAt(b.getFirst().getNext(),CKEDITOR.POSITION_AFTER_START):l.setEndAt(b.getLast().getPrevious(),CKEDITOR.POSITION_BEFORE_END),b.editor.getSelection().selectRanges([l]))}},createFillerRegex:function(a){var b=this.createFiller(a).getOuterHtml().replace(/style="[^"]*"/gi,'style\x3d"[^"]*"').replace(/>[^<]*</gi,
"\x3e[^\x3c]*\x3c");return new RegExp((a?"":"^")+b+(a?"$":""))},addSelectAllIntegration:function(a){var b=this;a.editable().attachListener(a,"beforeCommandExec",function(c){var d=a.editable();"selectAll"==c.data.name&&d&&b.addFillers(d)},null,null,9999)}}}(),"use strict",function(){function a(a){this.editor=a;this.registered={};this.instances={};this.selected=[];this.widgetHoldingFocusedEditable=this.focused=null;this._={nextId:0,upcasts:[],upcastCallbacks:[],filters:{}};G(this);B(this);this.on("checkWidgets",
k);this.editor.on("contentDomInvalidated",this.checkWidgets,this);y(this);z(this);w(this);A(this);C(this)}function e(a,b,c,d,f){var g=a.editor;CKEDITOR.tools.extend(this,d,{editor:g,id:b,inline:"span"==c.getParent().getName(),element:c,data:CKEDITOR.tools.extend({},"function"==typeof d.defaults?d.defaults():d.defaults),dataReady:!1,inited:!1,ready:!1,edit:e.prototype.edit,focusedEditable:null,definition:d,repository:a,draggable:!1!==d.draggable,_:{downcastFn:d.downcast&&"string"==typeof d.downcast?
d.downcasts[d.downcast]:d.downcast}},!0);a.fire("instanceCreated",this);da(this,d);this.init&&this.init();this.inited=!0;(a=this.element.data("cke-widget-data"))&&this.setData(JSON.parse(decodeURIComponent(a)));f&&this.setData(f);this.data.classes||this.setData("classes",this.getClasses());this.dataReady=!0;Q(this);this.fire("data",this.data);this.isInited()&&g.editable().contains(this.wrapper)&&(this.ready=!0,this.fire("ready"))}function b(a,b,c){CKEDITOR.dom.element.call(this,b.$);this.editor=a;
this._={};b=this.filter=c.filter;CKEDITOR.dtd[this.getName()].p?(this.enterMode=b?b.getAllowedEnterMode(a.enterMode):a.enterMode,this.shiftEnterMode=b?b.getAllowedEnterMode(a.shiftEnterMode,!0):a.shiftEnterMode):this.enterMode=this.shiftEnterMode=CKEDITOR.ENTER_BR}function c(a,b){a.addCommand(b.name,{exec:function(a,c){function d(){a.widgets.finalizeCreation(h)}var e=a.widgets.focused;if(e&&e.name==b.name)e.edit();else if(b.insert)b.insert();else if(b.template){var e="function"==typeof b.defaults?
b.defaults():b.defaults,e=CKEDITOR.dom.element.createFromHtml(b.template.output(e)),f,g=a.widgets.wrapElement(e,b.name),h=new CKEDITOR.dom.documentFragment(g.getDocument());h.append(g);(f=a.widgets.initOn(e,b,c&&c.startupData))?(e=f.once("edit",function(b){if(b.data.dialog)f.once("dialog",function(b){b=b.data;var c,e;c=b.once("ok",d,null,null,20);e=b.once("cancel",function(b){b.data&&!1===b.data.hide||a.widgets.destroy(f,!0)});b.once("hide",function(){c.removeListener();e.removeListener()})});else d()},
null,null,999),f.edit(),e.removeListener()):d()}},allowedContent:b.allowedContent,requiredContent:b.requiredContent,contentForms:b.contentForms,contentTransformations:b.contentTransformations})}function d(a,b){function c(a,d){var e=b.upcast.split(","),f,g;for(g=0;g<e.length;g++)if(f=e[g],f===a.name)return b.upcasts[f].call(this,a,d);return!1}function d(b,c,e){var f=CKEDITOR.tools.getIndex(a._.upcasts,function(a){return a[2]>e});0>f&&(f=a._.upcasts.length);a._.upcasts.splice(f,0,[CKEDITOR.tools.bind(b,
c),c.name,e])}var e=b.upcast,f=b.upcastPriority||10;e&&("string"==typeof e?d(c,b,f):d(e,b,f))}function l(a,b){a.focused=null;if(b.isInited()){var c=b.editor.checkDirty();a.fire("widgetBlurred",{widget:b});b.setFocused(!1);!c&&b.editor.resetDirty()}}function k(a){a=a.data;if("wysiwyg"==this.editor.mode){var b=this.editor.editable(),c=this.instances,d,f,g,h;if(b){for(d in c)c[d].isReady()&&!b.contains(c[d].wrapper)&&this.destroy(c[d],!0);if(a&&a.initOnlyNew)c=this.initOnAll();else{var k=b.find(".cke_widget_wrapper"),
c=[];d=0;for(f=k.count();d<f;d++){g=k.getItem(d);if(h=!this.getByElement(g,!0)){a:{h=x;for(var l=g;l=l.getParent();)if(h(l)){h=!0;break a}h=!1}h=!h}h&&b.contains(g)&&(g.addClass("cke_widget_new"),c.push(this.initOn(g.getFirst(e.isDomWidgetElement))))}}a&&a.focusInited&&1==c.length&&c[0].focus()}}}function g(a){if("undefined"!=typeof a.attributes&&a.attributes["data-widget"]){var b=h(a),c=m(a),d=!1;b&&b.value&&b.value.match(/^\s/g)&&(b.parent.attributes["data-cke-white-space-first"]=1,b.value=b.value.replace(/^\s/g,
"\x26nbsp;"),d=!0);c&&c.value&&c.value.match(/\s$/g)&&(c.parent.attributes["data-cke-white-space-last"]=1,c.value=c.value.replace(/\s$/g,"\x26nbsp;"),d=!0);d&&(a.attributes["data-cke-widget-white-space"]=1)}}function h(a){return a.find(function(a){return 3===a.type},!0).shift()}function m(a){return a.find(function(a){return 3===a.type},!0).pop()}function f(a,b,c){if(!c.allowedContent&&!c.disallowedContent)return null;var d=this._.filters[a];d||(this._.filters[a]=d={});a=d[b];a||(a=c.allowedContent?
new CKEDITOR.filter(c.allowedContent):this.editor.filter.clone(),d[b]=a,c.disallowedContent&&a.disallow(c.disallowedContent));return a}function n(a){var b=[],c=a._.upcasts,d=a._.upcastCallbacks;return{toBeWrapped:b,iterator:function(a){var f,g,h,k,l;if("data-cke-widget-wrapper"in a.attributes)return(a=a.getFirst(e.isParserWidgetElement))&&b.push([a]),!1;if("data-widget"in a.attributes)return b.push([a]),!1;if(l=c.length){if(a.attributes["data-cke-widget-upcasted"])return!1;k=0;for(f=d.length;k<f;++k)if(!1===
d[k](a))return;for(k=0;k<l;++k)if(f=c[k],h={},g=f[0](a,h))return g instanceof CKEDITOR.htmlParser.element&&(a=g),a.attributes["data-cke-widget-data"]=encodeURIComponent(JSON.stringify(h)),a.attributes["data-cke-widget-upcasted"]=1,b.push([a,f[1]]),!1}}}}function p(a,b){return{tabindex:-1,contenteditable:"false","data-cke-widget-wrapper":1,"data-cke-filter":"off","class":"cke_widget_wrapper cke_widget_new cke_widget_"+(a?"inline":"block")+(b?" cke_widget_"+b:"")}}function r(a,b,c){if(a.type==CKEDITOR.NODE_ELEMENT){var d=
CKEDITOR.dtd[a.name];if(d&&!d[c.name]){var d=a.split(b),e=a.parent;b=d.getIndex();a.children.length||(--b,a.remove());d.children.length||d.remove();return r(e,b,c)}}a.add(c,b)}function v(a,b){return"boolean"==typeof a.inline?a.inline:!!CKEDITOR.dtd.$inline[b]}function x(a){return a.hasAttribute("data-cke-temp")}function q(a,b,c,d){var e=a.editor;e.fire("lockSnapshot");c?(d=c.data("cke-widget-editable"),d=b.editables[d],a.widgetHoldingFocusedEditable=b,b.focusedEditable=d,c.addClass("cke_widget_editable_focused"),
d.filter&&e.setActiveFilter(d.filter),e.setActiveEnterMode(d.enterMode,d.shiftEnterMode)):(d||b.focusedEditable.removeClass("cke_widget_editable_focused"),b.focusedEditable=null,a.widgetHoldingFocusedEditable=null,e.setActiveFilter(null),e.setActiveEnterMode(null,null));e.fire("unlockSnapshot")}function t(a){a.contextMenu&&a.contextMenu.addListener(function(b){if(b=a.widgets.getByElement(b,!0))return b.fire("contextMenu",{})})}function u(a,b){return CKEDITOR.tools.trim(b)}function A(a){var b=a.editor,
c=CKEDITOR.plugins.lineutils;b.on("dragstart",function(c){var d=c.data.target;e.isDomDragHandler(d)&&(d=a.getByElement(d),c.data.dataTransfer.setData("cke/widget-id",d.id),b.focus(),d.focus())});b.on("drop",function(c){var d=c.data.dataTransfer,e=d.getData("cke/widget-id"),f=d.getTransferType(b),d=b.createRange();""!==e&&f===CKEDITOR.DATA_TRANSFER_CROSS_EDITORS?c.cancel():""!==e&&f==CKEDITOR.DATA_TRANSFER_INTERNAL&&(e=a.instances[e])&&(d.setStartBefore(e.wrapper),d.setEndAfter(e.wrapper),c.data.dragRange=
d,delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount,delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount,c.data.dataTransfer.setData("text/html",b.editable().getHtmlFromRange(d).getHtml()),b.widgets.destroy(e,!0))});b.on("contentDom",function(){var d=b.editable();CKEDITOR.tools.extend(a,{finder:new c.finder(b,{lookups:{"default":function(b){if(!b.is(CKEDITOR.dtd.$listItem)&&b.is(CKEDITOR.dtd.$block)&&!e.isDomNestedEditable(b)&&!a._.draggedWidget.wrapper.contains(b)){var c=e.getNestedEditable(d,
b);if(c){b=a._.draggedWidget;if(a.getByElement(c)==b)return;c=CKEDITOR.filter.instances[c.data("cke-filter")];b=b.requiredContent;if(c&&b&&!c.check(b))return}return CKEDITOR.LINEUTILS_BEFORE|CKEDITOR.LINEUTILS_AFTER}}}}),locator:new c.locator(b),liner:new c.liner(b,{lineStyle:{cursor:"move !important","border-top-color":"#666"},tipLeftStyle:{"border-left-color":"#666"},tipRightStyle:{"border-right-color":"#666"}})},!0)})}function z(a){var b=a.editor;b.on("contentDom",function(){var c=b.editable(),
d=c.isInline()?c:b.document,f,g;c.attachListener(d,"mousedown",function(c){var d=c.data.getTarget();f=d instanceof CKEDITOR.dom.element?a.getByElement(d):null;g=0;f&&(f.inline&&d.type==CKEDITOR.NODE_ELEMENT&&d.hasAttribute("data-cke-widget-drag-handler")?(g=1,a.focused!=f&&b.getSelection().removeAllRanges()):e.getNestedEditable(f.wrapper,d)?f=null:(c.data.preventDefault(),CKEDITOR.env.ie||f.focus()))});c.attachListener(d,"mouseup",function(){g&&f&&f.wrapper&&(g=0,f.focus())});CKEDITOR.env.ie&&c.attachListener(d,
"mouseup",function(){setTimeout(function(){f&&f.wrapper&&c.contains(f.wrapper)&&(f.focus(),f=null)})})});b.on("doubleclick",function(b){var c=a.getByElement(b.data.element);if(c&&!e.getNestedEditable(c.wrapper,b.data.element))return c.fire("doubleclick",{element:b.data.element})},null,null,1)}function w(a){a.editor.on("key",function(b){var c=a.focused,d=a.widgetHoldingFocusedEditable,e;c?e=c.fire("key",{keyCode:b.data.keyCode}):d&&(c=b.data.keyCode,b=d.focusedEditable,c==CKEDITOR.CTRL+65?(c=b.getBogus(),
d=d.editor.createRange(),d.selectNodeContents(b),c&&d.setEndAt(c,CKEDITOR.POSITION_BEFORE_START),d.select(),e=!1):8==c||46==c?(e=d.editor.getSelection().getRanges(),d=e[0],e=!(1==e.length&&d.collapsed&&d.checkBoundaryOfElement(b,CKEDITOR[8==c?"START":"END"]))):e=void 0);return e},null,null,1)}function C(a){function b(c){a.focused&&H(a.focused,"cut"==c.name)}var c=a.editor;c.on("contentDom",function(){var a=c.editable();a.attachListener(a,"copy",b);a.attachListener(a,"cut",b)})}function y(a){var b=
a.editor;b.on("selectionCheck",function(){a.fire("checkSelection")});a.on("checkSelection",a.checkSelection,a);b.on("selectionChange",function(c){var d=(c=e.getNestedEditable(b.editable(),c.data.selection.getStartElement()))&&a.getByElement(c),f=a.widgetHoldingFocusedEditable;f?f===d&&f.focusedEditable.equals(c)||(q(a,f,null),d&&c&&q(a,d,c)):d&&c&&q(a,d,c)});b.on("dataReady",function(){E(a).commit()});b.on("blur",function(){var b;(b=a.focused)&&l(a,b);(b=a.widgetHoldingFocusedEditable)&&q(a,b,null)})}
function B(a){var b=a.editor,c={};b.on("toDataFormat",function(b){var d=CKEDITOR.tools.getNextNumber(),f=[];b.data.downcastingSessionId=d;c[d]=f;b.data.dataValue.forEach(function(b){var c=b.attributes,d;if("data-cke-widget-white-space"in c){d=h(b);var g=m(b);d.parent.attributes["data-cke-white-space-first"]&&(d.value=d.value.replace(/^&nbsp;/g," "));g.parent.attributes["data-cke-white-space-last"]&&(g.value=g.value.replace(/&nbsp;$/g," "))}if("data-cke-widget-id"in c){if(c=a.instances[c["data-cke-widget-id"]])d=
b.getFirst(e.isParserWidgetElement),f.push({wrapper:b,element:d,widget:c,editables:{}}),"1"!=d.attributes["data-cke-widget-keep-attr"]&&delete d.attributes["data-widget"]}else if("data-cke-widget-editable"in c)return f[f.length-1].editables[c["data-cke-widget-editable"]]=b,!1},CKEDITOR.NODE_ELEMENT,!0)},null,null,8);b.on("toDataFormat",function(a){if(a.data.downcastingSessionId){a=c[a.data.downcastingSessionId];for(var b,d,e,f,g,h;b=a.shift();){d=b.widget;e=b.element;f=d._.downcastFn&&d._.downcastFn.call(d,
e);for(h in b.editables)g=b.editables[h],delete g.attributes.contenteditable,g.setHtml(d.editables[h].getData());f||(f=e);b.wrapper.replaceWith(f)}}},null,null,13);b.on("contentDomUnload",function(){a.destroyAll(!0)})}function G(a){var b=a.editor,c,d;b.on("toHtml",function(b){var d=n(a),f;for(b.data.dataValue.forEach(d.iterator,CKEDITOR.NODE_ELEMENT,!0);f=d.toBeWrapped.pop();){var g=f[0],h=g.parent;h.type==CKEDITOR.NODE_ELEMENT&&h.attributes["data-cke-widget-wrapper"]&&h.replaceWith(g);a.wrapElement(f[0],
f[1])}c=b.data.protectedWhitespaces?3==b.data.dataValue.children.length&&e.isParserWidgetWrapper(b.data.dataValue.children[1]):1==b.data.dataValue.children.length&&e.isParserWidgetWrapper(b.data.dataValue.children[0])},null,null,8);b.on("dataReady",function(){if(d)for(var c=b.editable().find(".cke_widget_wrapper"),f,g,h=0,k=c.count();h<k;++h)f=c.getItem(h),g=f.getFirst(e.isDomWidgetElement),g.type==CKEDITOR.NODE_ELEMENT&&g.data("widget")?(g.replace(f),a.wrapElement(g)):f.remove();d=0;a.destroyAll(!0);
a.initOnAll()});b.on("loadSnapshot",function(b){/data-cke-widget/.test(b.data)&&(d=1);a.destroyAll(!0)},null,null,9);b.on("paste",function(a){a=a.data;a.dataValue=a.dataValue.replace(U,u);a.range&&(a=e.getNestedEditable(b.editable(),a.range.startContainer))&&(a=CKEDITOR.filter.instances[a.data("cke-filter")])&&b.setActiveFilter(a)});b.on("afterInsertHtml",function(d){d.data.intoRange?a.checkWidgets({initOnlyNew:!0}):(b.fire("lockSnapshot"),a.checkWidgets({initOnlyNew:!0,focusInited:c}),b.fire("unlockSnapshot"))})}
function E(a){var b=a.selected,c=[],d=b.slice(0),e=null;return{select:function(a){0>CKEDITOR.tools.indexOf(b,a)&&c.push(a);a=CKEDITOR.tools.indexOf(d,a);0<=a&&d.splice(a,1);return this},focus:function(a){e=a;return this},commit:function(){var f=a.focused!==e,g,h;a.editor.fire("lockSnapshot");for(f&&(g=a.focused)&&l(a,g);g=d.pop();)b.splice(CKEDITOR.tools.indexOf(b,g),1),g.isInited()&&(h=g.editor.checkDirty(),g.setSelected(!1),!h&&g.editor.resetDirty());f&&e&&(h=a.editor.checkDirty(),a.focused=e,a.fire("widgetFocused",
{widget:e}),e.setFocused(!0),!h&&a.editor.resetDirty());for(;g=c.pop();)b.push(g),g.setSelected(!0);a.editor.fire("unlockSnapshot")}}}function F(a,b,c){var d=0;b=K(b);var e=a.data.classes||{},f;if(b){for(e=CKEDITOR.tools.clone(e);f=b.pop();)c?e[f]||(d=e[f]=1):e[f]&&(delete e[f],d=1);d&&a.setData("classes",e)}}function I(a){a.cancel()}function H(a,b){var c=a.editor,d=c.document,e=CKEDITOR.env.edge&&16<=CKEDITOR.env.version;if(!d.getById("cke_copybin")){var f=!c.blockless&&!CKEDITOR.env.ie||e?"div":
"span",e=d.createElement(f),g=d.createElement(f),f=CKEDITOR.env.ie&&9>CKEDITOR.env.version;g.setAttributes({id:"cke_copybin","data-cke-temp":"1"});e.setStyles({position:"absolute",width:"1px",height:"1px",overflow:"hidden"});e.setStyle("ltr"==c.config.contentsLangDirection?"left":"right","-5000px");var h=c.createRange();h.setStartBefore(a.wrapper);h.setEndAfter(a.wrapper);e.setHtml('\x3cspan data-cke-copybin-start\x3d"1"\x3e​\x3c/span\x3e'+c.editable().getHtmlFromRange(h).getHtml()+'\x3cspan data-cke-copybin-end\x3d"1"\x3e​\x3c/span\x3e');
c.fire("saveSnapshot");c.fire("lockSnapshot");g.append(e);c.editable().append(g);var k=c.on("selectionChange",I,null,null,0),l=a.repository.on("checkSelection",I,null,null,0);if(f)var m=d.getDocumentElement().$,n=m.scrollTop;h=c.createRange();h.selectNodeContents(e);h.select();f&&(m.scrollTop=n);setTimeout(function(){b||a.focus();g.remove();k.removeListener();l.removeListener();c.fire("unlockSnapshot");b&&!c.readOnly&&(a.repository.del(a),c.fire("saveSnapshot"))},100)}}function K(a){return(a=(a=a.getDefinition().attributes)&&
a["class"])?a.split(/\s+/):null}function J(){var a=CKEDITOR.document.getActive(),b=this.editor,c=b.editable();(c.isInline()?c:b.document.getWindow().getFrame()).equals(a)&&b.focusManager.focus(c)}function D(){CKEDITOR.env.gecko&&this.editor.unlockSelection();CKEDITOR.env.webkit||(this.editor.forceNextSelectionCheck(),this.editor.selectionChange(1))}function R(a){var b=null;a.on("data",function(){var a=this.data.classes,c;if(b!=a){for(c in b)a&&a[c]||this.removeClass(c);for(c in a)this.addClass(c);
b=a}})}function N(a){a.on("data",function(){if(a.wrapper){var b=this.getLabel?this.getLabel():this.editor.lang.widget.label.replace(/%1/,this.pathName||this.element.getName());a.wrapper.setAttribute("role","region");a.wrapper.setAttribute("aria-label",b)}},null,null,9999)}function S(a){if(a.draggable){var b=a.editor,c=a.wrapper.getLast(e.isDomDragHandlerContainer),d;c?d=c.findOne("img"):(c=new CKEDITOR.dom.element("span",b.document),c.setAttributes({"class":"cke_reset cke_widget_drag_handler_container",
style:"background:rgba(220,220,220,0.5);background-image:url("+b.plugins.widget.path+"images/handle.png)"}),d=new CKEDITOR.dom.element("img",b.document),d.setAttributes({"class":"cke_reset cke_widget_drag_handler","data-cke-widget-drag-handler":"1",src:CKEDITOR.tools.transparentImageData,width:15,title:b.lang.widget.move,height:15,role:"presentation"}),a.inline&&d.setAttribute("draggable","true"),c.append(d),a.wrapper.append(c));a.wrapper.on("dragover",function(a){a.data.preventDefault()});a.wrapper.on("mouseenter",
a.updateDragHandlerPosition,a);setTimeout(function(){a.on("data",a.updateDragHandlerPosition,a)},50);if(!a.inline&&(d.on("mousedown",L,a),CKEDITOR.env.ie&&9>CKEDITOR.env.version))d.on("dragstart",function(a){a.data.preventDefault(!0)});a.dragHandlerContainer=c}}function L(a){function b(){var c;for(p.reset();c=h.pop();)c.removeListener();var d=k;c=a.sender;var e=this.repository.finder,f=this.repository.liner,g=this.editor,l=this.editor.editable();CKEDITOR.tools.isEmpty(f.visible)||(d=e.getRange(d[0]),
this.focus(),g.fire("drop",{dropRange:d,target:d.startContainer}));l.removeClass("cke_widget_dragging");f.hideVisible();g.fire("dragend",{target:c})}if(CKEDITOR.tools.getMouseButton(a)===CKEDITOR.MOUSE_BUTTON_LEFT){var c=this.repository.finder,d=this.repository.locator,e=this.repository.liner,f=this.editor,g=f.editable(),h=[],k=[],l,m;this.repository._.draggedWidget=this;var n=c.greedySearch(),p=CKEDITOR.tools.eventsBuffer(50,function(){l=d.locate(n);k=d.sort(m,1);k.length&&(e.prepare(n,l),e.placeLine(k[0]),
e.cleanup())});g.addClass("cke_widget_dragging");h.push(g.on("mousemove",function(a){m=a.data.$.clientY;p.input()}));f.fire("dragstart",{target:a.sender});h.push(f.document.once("mouseup",b,this));g.isInline()||h.push(CKEDITOR.document.once("mouseup",b,this))}}function V(a){var b,c,d=a.editables;a.editables={};if(a.editables)for(b in d)c=d[b],a.initEditable(b,"string"==typeof c?{selector:c}:c)}function Z(a){if(a.mask){var b=a.wrapper.findOne(".cke_widget_mask");b||(b=new CKEDITOR.dom.element("img",
a.editor.document),b.setAttributes({src:CKEDITOR.tools.transparentImageData,"class":"cke_reset cke_widget_mask"}),a.wrapper.append(b));a.mask=b}}function X(a){if(a.parts){var b={},c,d;for(d in a.parts)c=a.wrapper.findOne(a.parts[d]),b[d]=c;a.parts=b}}function da(a,b){P(a);X(a);V(a);Z(a);S(a);R(a);N(a);if(CKEDITOR.env.ie&&9>CKEDITOR.env.version)a.wrapper.on("dragstart",function(b){var c=b.data.getTarget();e.getNestedEditable(a,c)||a.inline&&e.isDomDragHandler(c)||b.data.preventDefault()});a.wrapper.removeClass("cke_widget_new");
a.element.addClass("cke_widget_element");a.on("key",function(b){b=b.data.keyCode;if(13==b)a.edit();else{if(b==CKEDITOR.CTRL+67||b==CKEDITOR.CTRL+88){H(a,b==CKEDITOR.CTRL+88);return}if(b in T||CKEDITOR.CTRL&b||CKEDITOR.ALT&b)return}return!1},null,null,999);a.on("doubleclick",function(b){a.edit()&&b.cancel()});if(b.data)a.on("data",b.data);if(b.edit)a.on("edit",b.edit)}function P(a){(a.wrapper=a.element.getParent()).setAttribute("data-cke-widget-id",a.id)}function Q(a){a.element.data("cke-widget-data",
encodeURIComponent(JSON.stringify(a.data)))}function M(){function a(){}function b(a,c,d){return d&&this.checkElement(a)?(a=d.widgets.getByElement(a,!0))&&a.checkStyleActive(this):!1}var c={};CKEDITOR.style.addCustomHandler({type:"widget",setup:function(a){this.widget=a.widget;if(this.group="string"==typeof a.group?[a.group]:a.group){a=this.widget;var b;c[a]||(c[a]={});for(var d=0,e=this.group.length;d<e;d++)b=this.group[d],c[a][b]||(c[a][b]=[]),c[a][b].push(this)}},apply:function(a){var b;a instanceof
CKEDITOR.editor&&this.checkApplicable(a.elementPath(),a)&&(b=a.widgets.focused,this.group&&this.removeStylesFromSameGroup(a),b.applyStyle(this))},remove:function(a){a instanceof CKEDITOR.editor&&this.checkApplicable(a.elementPath(),a)&&a.widgets.focused.removeStyle(this)},removeStylesFromSameGroup:function(a){var b,d,e=!1;if(!(a instanceof CKEDITOR.editor))return!1;d=a.elementPath();if(this.checkApplicable(d,a))for(var f=0,g=this.group.length;f<g;f++){b=c[this.widget][this.group[f]];for(var h=0;h<
b.length;h++)b[h]!==this&&b[h].checkActive(d,a)&&(a.widgets.focused.removeStyle(b[h]),e=!0)}return e},checkActive:function(a,b){return this.checkElementMatch(a.lastElement,0,b)},checkApplicable:function(a,b){return b instanceof CKEDITOR.editor?this.checkElement(a.lastElement):!1},checkElementMatch:b,checkElementRemovable:b,checkElement:function(a){return e.isDomWidgetWrapper(a)?(a=a.getFirst(e.isDomWidgetElement))&&a.data("widget")==this.widget:!1},buildPreview:function(a){return a||this._.definition.name},
toAllowedContentRules:function(a){if(!a)return null;a=a.widgets.registered[this.widget];var b,c={};if(!a)return null;if(a.styleableElements){b=this.getClassesArray();if(!b)return null;c[a.styleableElements]={classes:b,propertiesOnly:!0};return c}return a.styleToAllowedContentRules?a.styleToAllowedContentRules(this):null},getClassesArray:function(){var a=this._.definition.attributes&&this._.definition.attributes["class"];return a?CKEDITOR.tools.trim(a).split(/\s+/):null},applyToRange:a,removeFromRange:a,
applyToObject:a})}CKEDITOR.plugins.add("widget",{requires:"lineutils,clipboard,widgetselection",onLoad:function(){void 0!==CKEDITOR.document.$.querySelectorAll&&(CKEDITOR.addCss(".cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover\x3e.cke_widget_element{outline:2px solid #ffd25c;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid #ffd25c}.cke_widget_wrapper.cke_widget_focused\x3e.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #47a4f5}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:15px;height:0;display:none;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover\x3e.cke_widget_drag_handler_container{height:15px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}img.cke_widget_drag_handler{cursor:move;width:15px;height:15px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}"),
M())},beforeInit:function(b){void 0!==CKEDITOR.document.$.querySelectorAll&&(b.widgets=new a(b))},afterInit:function(a){if(void 0!==CKEDITOR.document.$.querySelectorAll){var b=a.widgets.registered,c,d,e;for(d in b)c=b[d],(e=c.button)&&a.ui.addButton&&a.ui.addButton(CKEDITOR.tools.capitalize(c.name,!0),{label:e,command:c.name,toolbar:"insert,10"});t(a)}}});a.prototype={MIN_SELECTION_CHECK_INTERVAL:500,add:function(a,b){b=CKEDITOR.tools.prototypedCopy(b);b.name=a;b._=b._||{};this.editor.fire("widgetDefinition",
b);b.template&&(b.template=new CKEDITOR.template(b.template));c(this.editor,b);d(this,b);return this.registered[a]=b},addUpcastCallback:function(a){this._.upcastCallbacks.push(a)},checkSelection:function(){var a=this.editor.getSelection(),b=a.getSelectedElement(),c=E(this),d;if(b&&(d=this.getByElement(b,!0)))return c.focus(d).select(d).commit();a=a.getRanges()[0];if(!a||a.collapsed)return c.commit();a=new CKEDITOR.dom.walker(a);for(a.evaluator=e.isDomWidgetWrapper;b=a.next();)c.select(this.getByElement(b));
c.commit()},checkWidgets:function(a){this.fire("checkWidgets",CKEDITOR.tools.copy(a||{}))},del:function(a){if(this.focused===a){var b=a.editor,c=b.createRange(),d;(d=c.moveToClosestEditablePosition(a.wrapper,!0))||(d=c.moveToClosestEditablePosition(a.wrapper,!1));d&&b.getSelection().selectRanges([c])}a.wrapper.remove();this.destroy(a,!0)},destroy:function(a,b){this.widgetHoldingFocusedEditable===a&&q(this,a,null,b);a.destroy(b);delete this.instances[a.id];this.fire("instanceDestroyed",a)},destroyAll:function(a,
b){var c,d,e=this.instances;if(b&&!a){d=b.find(".cke_widget_wrapper");for(var e=d.count(),f=0;f<e;++f)(c=this.getByElement(d.getItem(f),!0))&&this.destroy(c)}else for(d in e)c=e[d],this.destroy(c,a)},finalizeCreation:function(a){(a=a.getFirst())&&e.isDomWidgetWrapper(a)&&(this.editor.insertElement(a),a=this.getByElement(a),a.ready=!0,a.fire("ready"),a.focus())},getByElement:function(){function a(c){return c.is(b)&&c.data("cke-widget-id")}var b={div:1,span:1};return function(b,c){if(!b)return null;
var d=a(b);if(!c&&!d){var e=this.editor.editable();do b=b.getParent();while(b&&!b.equals(e)&&!(d=a(b)))}return this.instances[d]||null}}(),initOn:function(a,b,c){b?"string"==typeof b&&(b=this.registered[b]):b=this.registered[a.data("widget")];if(!b)return null;var d=this.wrapElement(a,b.name);return d?d.hasClass("cke_widget_new")?(a=new e(this,this._.nextId++,a,b,c),a.isInited()?this.instances[a.id]=a:null):this.getByElement(a):null},initOnAll:function(a){a=(a||this.editor.editable()).find(".cke_widget_new");
for(var b=[],c,d=a.count();d--;)(c=this.initOn(a.getItem(d).getFirst(e.isDomWidgetElement)))&&b.push(c);return b},onWidget:function(a){var b=Array.prototype.slice.call(arguments);b.shift();for(var c in this.instances){var d=this.instances[c];d.name==a&&d.on.apply(d,b)}this.on("instanceCreated",function(c){c=c.data;c.name==a&&c.on.apply(c,b)})},parseElementClasses:function(a){if(!a)return null;a=CKEDITOR.tools.trim(a).split(/\s+/);for(var b,c={},d=0;b=a.pop();)-1==b.indexOf("cke_")&&(c[b]=d=1);return d?
c:null},wrapElement:function(a,b){var c=null,d,e;if(a instanceof CKEDITOR.dom.element){b=b||a.data("widget");d=this.registered[b];if(!d)return null;if((c=a.getParent())&&c.type==CKEDITOR.NODE_ELEMENT&&c.data("cke-widget-wrapper"))return c;a.hasAttribute("data-cke-widget-keep-attr")||a.data("cke-widget-keep-attr",a.data("widget")?1:0);a.data("widget",b);(e=v(d,a.getName()))&&g(a);c=new CKEDITOR.dom.element(e?"span":"div");c.setAttributes(p(e,b));c.data("cke-display-name",d.pathName?d.pathName:a.getName());
a.getParent(!0)&&c.replace(a);a.appendTo(c)}else if(a instanceof CKEDITOR.htmlParser.element){b=b||a.attributes["data-widget"];d=this.registered[b];if(!d)return null;if((c=a.parent)&&c.type==CKEDITOR.NODE_ELEMENT&&c.attributes["data-cke-widget-wrapper"])return c;"data-cke-widget-keep-attr"in a.attributes||(a.attributes["data-cke-widget-keep-attr"]=a.attributes["data-widget"]?1:0);b&&(a.attributes["data-widget"]=b);(e=v(d,a.name))&&g(a);c=new CKEDITOR.htmlParser.element(e?"span":"div",p(e,b));c.attributes["data-cke-display-name"]=
d.pathName?d.pathName:a.name;d=a.parent;var f;d&&(f=a.getIndex(),a.remove());c.add(a);d&&r(d,f,c)}return c},_tests_createEditableFilter:f};CKEDITOR.event.implementOn(a.prototype);e.prototype={addClass:function(a){this.element.addClass(a);this.wrapper.addClass(e.WRAPPER_CLASS_PREFIX+a)},applyStyle:function(a){F(this,a,1)},checkStyleActive:function(a){a=K(a);var b;if(!a)return!1;for(;b=a.pop();)if(!this.hasClass(b))return!1;return!0},destroy:function(a){this.fire("destroy");if(this.editables)for(var b in this.editables)this.destroyEditable(b,
a);a||("0"==this.element.data("cke-widget-keep-attr")&&this.element.removeAttribute("data-widget"),this.element.removeAttributes(["data-cke-widget-data","data-cke-widget-keep-attr"]),this.element.removeClass("cke_widget_element"),this.element.replace(this.wrapper));this.wrapper=null},destroyEditable:function(a,b){var c=this.editables[a];c.removeListener("focus",D);c.removeListener("blur",J);this.editor.focusManager.remove(c);b||(this.repository.destroyAll(!1,c),c.removeClass("cke_widget_editable"),
c.removeClass("cke_widget_editable_focused"),c.removeAttributes(["contenteditable","data-cke-widget-editable","data-cke-enter-mode"]));delete this.editables[a]},edit:function(){var a={dialog:this.dialog},b=this;if(!1===this.fire("edit",a)||!a.dialog)return!1;this.editor.openDialog(a.dialog,function(a){var c,d;!1!==b.fire("dialog",a)&&(c=a.on("show",function(){a.setupContent(b)}),d=a.on("ok",function(){var c,d=b.on("data",function(a){c=1;a.cancel()},null,null,0);b.editor.fire("saveSnapshot");a.commitContent(b);
d.removeListener();c&&(b.fire("data",b.data),b.editor.fire("saveSnapshot"))}),a.once("hide",function(){c.removeListener();d.removeListener()}))});return!0},getClasses:function(){return this.repository.parseElementClasses(this.element.getAttribute("class"))},hasClass:function(a){return this.element.hasClass(a)},initEditable:function(a,c){var d=this._findOneNotNested(c.selector);return d&&d.is(CKEDITOR.dtd.$editable)?(d=new b(this.editor,d,{filter:f.call(this.repository,this.name,a,c)}),this.editables[a]=
d,d.setAttributes({contenteditable:"true","data-cke-widget-editable":a,"data-cke-enter-mode":d.enterMode}),d.filter&&d.data("cke-filter",d.filter.id),d.addClass("cke_widget_editable"),d.removeClass("cke_widget_editable_focused"),c.pathName&&d.data("cke-display-name",c.pathName),this.editor.focusManager.add(d),d.on("focus",D,this),CKEDITOR.env.ie&&d.on("blur",J,this),d._.initialSetData=!0,d.setData(d.getHtml()),!0):!1},_findOneNotNested:function(a){a=this.wrapper.find(a);for(var b,c,d=0;d<a.count();d++)if(b=
a.getItem(d),c=b.getAscendant(e.isDomWidgetWrapper),this.wrapper.equals(c))return b;return null},isInited:function(){return!(!this.wrapper||!this.inited)},isReady:function(){return this.isInited()&&this.ready},focus:function(){var a=this.editor.getSelection();if(a){var b=this.editor.checkDirty();a.fake(this.wrapper);!b&&this.editor.resetDirty()}this.editor.focus()},removeClass:function(a){this.element.removeClass(a);this.wrapper.removeClass(e.WRAPPER_CLASS_PREFIX+a)},removeStyle:function(a){F(this,
a,0)},setData:function(a,b){var c=this.data,d=0;if("string"==typeof a)c[a]!==b&&(c[a]=b,d=1);else{var e=a;for(a in e)c[a]!==e[a]&&(d=1,c[a]=e[a])}d&&this.dataReady&&(Q(this),this.fire("data",c));return this},setFocused:function(a){this.wrapper[a?"addClass":"removeClass"]("cke_widget_focused");this.fire(a?"focus":"blur");return this},setSelected:function(a){this.wrapper[a?"addClass":"removeClass"]("cke_widget_selected");this.fire(a?"select":"deselect");return this},updateDragHandlerPosition:function(){var a=
this.editor,b=this.element.$,c=this._.dragHandlerOffset,b={x:b.offsetLeft,y:b.offsetTop-15};c&&b.x==c.x&&b.y==c.y||(c=a.checkDirty(),a.fire("lockSnapshot"),this.dragHandlerContainer.setStyles({top:b.y+"px",left:b.x+"px",display:"block"}),a.fire("unlockSnapshot"),!c&&a.resetDirty(),this._.dragHandlerOffset=b)}};CKEDITOR.event.implementOn(e.prototype);e.getNestedEditable=function(a,b){return!b||b.equals(a)?null:e.isDomNestedEditable(b)?b:e.getNestedEditable(a,b.getParent())};e.isDomDragHandler=function(a){return a.type==
CKEDITOR.NODE_ELEMENT&&a.hasAttribute("data-cke-widget-drag-handler")};e.isDomDragHandlerContainer=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass("cke_widget_drag_handler_container")};e.isDomNestedEditable=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("data-cke-widget-editable")};e.isDomWidgetElement=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("data-widget")};e.isDomWidgetWrapper=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("data-cke-widget-wrapper")};
e.isDomWidget=function(a){return a?this.isDomWidgetWrapper(a)||this.isDomWidgetElement(a):!1};e.isParserWidgetElement=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&!!a.attributes["data-widget"]};e.isParserWidgetWrapper=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&!!a.attributes["data-cke-widget-wrapper"]};e.WRAPPER_CLASS_PREFIX="cke_widget_wrapper_";b.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype),{setData:function(a){this._.initialSetData||
this.editor.widgets.destroyAll(!1,this);this._.initialSetData=!1;a=this.editor.dataProcessor.toHtml(a,{context:this.getName(),filter:this.filter,enterMode:this.enterMode});this.setHtml(a);this.editor.widgets.initOnAll(this)},getData:function(){return this.editor.dataProcessor.toDataFormat(this.getHtml(),{context:this.getName(),filter:this.filter,enterMode:this.enterMode})}});var U=/^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?<\/span>([\s\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?<\/span>(?:<\/(?:div|span)>)?(?:<\/(?:div|span)>)?$/i,
T={37:1,38:1,39:1,40:1,8:1,46:1};CKEDITOR.plugins.widget=e;e.repository=a;e.nestedEditable=b}(),function(){function a(a,c,d){this.editor=a;this.notification=null;this._message=new CKEDITOR.template(c);this._singularMessage=d?new CKEDITOR.template(d):null;this._tasks=[];this._doneTasks=this._doneWeights=this._totalWeights=0}function e(a){this._weight=a||1;this._doneWeight=0;this._isCanceled=!1}CKEDITOR.plugins.add("notificationaggregator",{requires:"notification"});a.prototype={createTask:function(a){a=
a||{};var c=!this.notification,d;c&&(this.notification=this._createNotification());d=this._addTask(a);d.on("updated",this._onTaskUpdate,this);d.on("done",this._onTaskDone,this);d.on("canceled",function(){this._removeTask(d)},this);this.update();c&&this.notification.show();return d},update:function(){this._updateNotification();this.isFinished()&&this.fire("finished")},getPercentage:function(){return 0===this.getTaskCount()?1:this._doneWeights/this._totalWeights},isFinished:function(){return this.getDoneTaskCount()===
this.getTaskCount()},getTaskCount:function(){return this._tasks.length},getDoneTaskCount:function(){return this._doneTasks},_updateNotification:function(){this.notification.update({message:this._getNotificationMessage(),progress:this.getPercentage()})},_getNotificationMessage:function(){var a=this.getTaskCount(),c={current:this.getDoneTaskCount(),max:a,percentage:Math.round(100*this.getPercentage())};return(1==a&&this._singularMessage?this._singularMessage:this._message).output(c)},_createNotification:function(){return new CKEDITOR.plugins.notification(this.editor,
{type:"progress"})},_addTask:function(a){a=new e(a.weight);this._tasks.push(a);this._totalWeights+=a._weight;return a},_removeTask:function(a){var c=CKEDITOR.tools.indexOf(this._tasks,a);-1!==c&&(a._doneWeight&&(this._doneWeights-=a._doneWeight),this._totalWeights-=a._weight,this._tasks.splice(c,1),this.update())},_onTaskUpdate:function(a){this._doneWeights+=a.data;this.update()},_onTaskDone:function(){this._doneTasks+=1;this.update()}};CKEDITOR.event.implementOn(a.prototype);e.prototype={done:function(){this.update(this._weight)},
update:function(a){if(!this.isDone()&&!this.isCanceled()){a=Math.min(this._weight,a);var c=a-this._doneWeight;this._doneWeight=a;this.fire("updated",c);this.isDone()&&this.fire("done")}},cancel:function(){this.isDone()||this.isCanceled()||(this._isCanceled=!0,this.fire("canceled"))},isDone:function(){return this._weight===this._doneWeight},isCanceled:function(){return this._isCanceled}};CKEDITOR.event.implementOn(e.prototype);CKEDITOR.plugins.notificationAggregator=a;CKEDITOR.plugins.notificationAggregator.task=
e}(),"use strict",function(){CKEDITOR.plugins.add("uploadwidget",{requires:"widget,clipboard,filetools,notificationaggregator",init:function(a){a.filter.allow("*[!data-widget,!data-cke-upload-id]")}});CKEDITOR.fileTools||(CKEDITOR.fileTools={});CKEDITOR.tools.extend(CKEDITOR.fileTools,{addUploadWidget:function(a,e,b){var c=CKEDITOR.fileTools,d=a.uploadRepository,l=b.supportedTypes?10:20;if(b.fileToElement)a.on("paste",function(b){b=b.data;var g=a.widgets.registered[e],h=b.dataTransfer,l=h.getFilesCount(),
f=g.loadMethod||"loadAndUpload",n,p;if(!b.dataValue&&l)for(p=0;p<l;p++)if(n=h.getFile(p),!g.supportedTypes||c.isTypeSupported(n,g.supportedTypes)){var r=g.fileToElement(n);n=d.create(n,void 0,g.loaderType);r&&(n[f](g.uploadUrl,g.additionalRequestParameters),CKEDITOR.fileTools.markElement(r,e,n.id),"loadAndUpload"!=f&&"upload"!=f||g.skipNotifications||CKEDITOR.fileTools.bindNotifications(a,n),b.dataValue+=r.getOuterHtml())}},null,null,l);CKEDITOR.tools.extend(b,{downcast:function(){return new CKEDITOR.htmlParser.text("")},
init:function(){var b=this,c=this.wrapper.findOne("[data-cke-upload-id]").data("cke-upload-id"),e=d.loaders[c],l=CKEDITOR.tools.capitalize,f,n;e.on("update",function(d){if(b.wrapper&&b.wrapper.getParent()){a.fire("lockSnapshot");d="on"+l(e.status);if("function"!==typeof b[d]||!1!==b[d](e))n="cke_upload_"+e.status,b.wrapper&&n!=f&&(f&&b.wrapper.removeClass(f),b.wrapper.addClass(n),f=n),"error"!=e.status&&"abort"!=e.status||a.widgets.del(b);a.fire("unlockSnapshot")}else a.editable().find('[data-cke-upload-id\x3d"'+
c+'"]').count()||e.abort(),d.removeListener()});e.update()},replaceWith:function(b,c){if(""===b.trim())a.widgets.del(this);else{var d=this==a.widgets.focused,e=a.editable(),f=a.createRange(),l,p;d||(p=a.getSelection().createBookmarks());f.setStartBefore(this.wrapper);f.setEndAfter(this.wrapper);d&&(l=f.createBookmark());e.insertHtmlIntoRange(b,f,c);a.widgets.checkWidgets({initOnlyNew:!0});a.widgets.destroy(this,!0);d?(f.moveToBookmark(l),f.select()):a.getSelection().selectBookmarks(p)}},_getLoader:function(){var a=
this.wrapper.findOne("[data-cke-upload-id]");return a?this.editor.uploadRepository.loaders[a.data("cke-upload-id")]:null}});a.widgets.add(e,b)},markElement:function(a,e,b){a.setAttributes({"data-cke-upload-id":b,"data-widget":e})},bindNotifications:function(a,e){function b(){c=a._.uploadWidgetNotificaionAggregator;if(!c||c.isFinished())c=a._.uploadWidgetNotificaionAggregator=new CKEDITOR.plugins.notificationAggregator(a,a.lang.uploadwidget.uploadMany,a.lang.uploadwidget.uploadOne),c.once("finished",
function(){var b=c.getTaskCount();0===b?c.notification.hide():c.notification.update({message:1==b?a.lang.uploadwidget.doneOne:a.lang.uploadwidget.doneMany.replace("%1",b),type:"success",important:1})})}var c,d=null;e.on("update",function(){!d&&e.uploadTotal&&(b(),d=c.createTask({weight:e.uploadTotal}));d&&"uploading"==e.status&&d.update(e.uploaded)});e.on("uploaded",function(){d&&d.done()});e.on("error",function(){d&&d.cancel();a.showNotification(e.message,"warning")});e.on("abort",function(){d&&
d.cancel();a.showNotification(a.lang.uploadwidget.abort,"info")})}})}(),"use strict",function(){function a(a){9>=a&&(a="0"+a);return String(a)}function e(c){var d=new Date,d=[d.getFullYear(),d.getMonth()+1,d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()];b+=1;return"image-"+CKEDITOR.tools.array.map(d,a).join("")+"-"+b+"."+c}var b=0;CKEDITOR.plugins.add("uploadimage",{requires:"uploadwidget",onLoad:function(){CKEDITOR.addCss(".cke_upload_uploading img{opacity: 0.3}")},init:function(a){if(CKEDITOR.plugins.clipboard.isFileApiSupported){var b=
CKEDITOR.fileTools,l=b.getUploadUrl(a.config,"image");l&&(b.addUploadWidget(a,"uploadimage",{supportedTypes:/image\/(jpeg|png|gif|bmp)/,uploadUrl:l,fileToElement:function(){var a=new CKEDITOR.dom.element("img");a.setAttribute("src","data:image/gif;base64,R0lGODlhDgAOAIAAAAAAAP///yH5BAAAAAAALAAAAAAOAA4AAAIMhI+py+0Po5y02qsKADs\x3d");return a},parts:{img:"img"},onUploading:function(a){this.parts.img.setAttribute("src",a.data)},onUploaded:function(a){var b=this.parts.img.$;this.replaceWith('\x3cimg src\x3d"'+
a.url+'" width\x3d"'+(a.responseData.width||b.naturalWidth)+'" height\x3d"'+(a.responseData.height||b.naturalHeight)+'"\x3e')}}),a.on("paste",function(k){if(k.data.dataValue.match(/<img[\s\S]+data:/i)){k=k.data;var g=document.implementation.createHTMLDocument(""),g=new CKEDITOR.dom.element(g.body),h,m,f;g.data("cke-editable",1);g.appendHtml(k.dataValue);h=g.find("img");for(f=0;f<h.count();f++){m=h.getItem(f);var n=m.getAttribute("src"),p=n&&"data:"==n.substring(0,5),r=null===m.data("cke-realelement");
p&&r&&!m.data("cke-upload-id")&&!m.isReadOnly(1)&&(p=(p=n.match(/image\/([a-z]+?);/i))&&p[1]||"jpg",n=a.uploadRepository.create(n,e(p)),n.upload(l),b.markElement(m,"uploadimage",n.id),b.bindNotifications(a,n))}k.dataValue=g.getHtml()}}))}}})}(),CKEDITOR.plugins.add("wsc",{requires:"dialog",parseApi:function(a){a.config.wsc_onFinish="function"===typeof a.config.wsc_onFinish?a.config.wsc_onFinish:function(){};a.config.wsc_onClose="function"===typeof a.config.wsc_onClose?a.config.wsc_onClose:function(){}},
parseConfig:function(a){a.config.wsc_customerId=a.config.wsc_customerId||CKEDITOR.config.wsc_customerId||"1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";a.config.wsc_customDictionaryIds=a.config.wsc_customDictionaryIds||CKEDITOR.config.wsc_customDictionaryIds||"";a.config.wsc_userDictionaryName=a.config.wsc_userDictionaryName||CKEDITOR.config.wsc_userDictionaryName||"";a.config.wsc_customLoaderScript=a.config.wsc_customLoaderScript||CKEDITOR.config.wsc_customLoaderScript;a.config.wsc_interfaceLang=
a.config.wsc_interfaceLang;CKEDITOR.config.wsc_cmd=a.config.wsc_cmd||CKEDITOR.config.wsc_cmd||"spell";CKEDITOR.config.wsc_version="v4.3.0-master-d769233";CKEDITOR.config.wsc_removeGlobalVariable=!0},onLoad:function(a){"moono-lisa"==(CKEDITOR.skinName||a.config.skin)&&CKEDITOR.document.appendStyleSheet(this.path+"skins/"+CKEDITOR.skin.name+"/wsc.css")},init:function(a){var e=CKEDITOR.env;this.parseConfig(a);this.parseApi(a);a.addCommand("checkspell",new CKEDITOR.dialogCommand("checkspell")).modes=
{wysiwyg:!CKEDITOR.env.opera&&!CKEDITOR.env.air&&document.domain==window.location.hostname&&!(e.ie&&(8>e.version||e.quirks))};"undefined"==typeof a.plugins.scayt&&a.ui.addButton&&a.ui.addButton("SpellChecker",{label:a.lang.wsc.toolbar,click:function(a){var c=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.container.getText():a.document.getBody().getText();(c=c.replace(/\s/g,""))?a.execCommand("checkspell"):alert("Nothing to check!")},toolbar:"spellchecker,10"});CKEDITOR.dialog.add("checkspell",this.path+
(CKEDITOR.env.ie&&7>=CKEDITOR.env.version?"dialogs/wsc_ie.js":window.postMessage?"dialogs/wsc.js":"dialogs/wsc_ie.js"))}}),function(){function a(a){function b(a){var c=!1;f.attachListener(f,"keydown",function(){var b=g.getBody().getElementsByTag(a);if(!c){for(var d=0;d<b.count();d++)b.getItem(d).setCustomData("retain",!0);c=!0}},null,null,1);f.attachListener(f,"keyup",function(){var b=g.getElementsByTag(a);c&&(1==b.count()&&!b.getItem(0).getCustomData("retain")&&CKEDITOR.tools.isEmpty(b.getItem(0).getAttributes())&&
b.getItem(0).remove(1),c=!1)})}var c=this.editor,g=a.document,h=g.body,m=g.getElementById("cke_actscrpt");m&&m.parentNode.removeChild(m);(m=g.getElementById("cke_shimscrpt"))&&m.parentNode.removeChild(m);(m=g.getElementById("cke_basetagscrpt"))&&m.parentNode.removeChild(m);h.contentEditable=!0;CKEDITOR.env.ie&&(h.hideFocus=!0,h.disabled=!0,h.removeAttribute("disabled"));delete this._.isLoadingData;this.$=h;g=new CKEDITOR.dom.document(g);this.setup();this.fixInitialSelection();var f=this;CKEDITOR.env.ie&&
!CKEDITOR.env.edge&&g.getDocumentElement().addClass(g.$.compatMode);CKEDITOR.env.ie&&!CKEDITOR.env.edge&&c.enterMode!=CKEDITOR.ENTER_P?b("p"):CKEDITOR.env.edge&&15>CKEDITOR.env.version&&c.enterMode!=CKEDITOR.ENTER_DIV&&b("div");if(CKEDITOR.env.webkit||CKEDITOR.env.ie&&10<CKEDITOR.env.version)g.getDocumentElement().on("mousedown",function(a){a.data.getTarget().is("html")&&setTimeout(function(){c.editable().focus()})});e(c);try{c.document.$.execCommand("2D-position",!1,!0)}catch(n){}(CKEDITOR.env.gecko||
CKEDITOR.env.ie&&"CSS1Compat"==c.document.$.compatMode)&&this.attachListener(this,"keydown",function(a){var b=a.data.getKeystroke();if(33==b||34==b)if(CKEDITOR.env.ie)setTimeout(function(){c.getSelection().scrollIntoView()},0);else if(c.window.$.innerHeight>this.$.offsetHeight){var d=c.createRange();d[33==b?"moveToElementEditStart":"moveToElementEditEnd"](this);d.select();a.data.preventDefault()}});CKEDITOR.env.ie&&this.attachListener(g,"blur",function(){try{g.$.selection.empty()}catch(a){}});CKEDITOR.env.iOS&&
this.attachListener(g,"touchend",function(){a.focus()});h=c.document.getElementsByTag("title").getItem(0);h.data("cke-title",h.getText());CKEDITOR.env.ie&&(c.document.$.title=this._.docTitle);CKEDITOR.tools.setTimeout(function(){"unloaded"==this.status&&(this.status="ready");c.fire("contentDom");this._.isPendingFocus&&(c.focus(),this._.isPendingFocus=!1);setTimeout(function(){c.fire("dataReady")},0)},0,this)}function e(a){function b(){var e;a.editable().attachListener(a,"selectionChange",function(){var b=
a.getSelection().getSelectedElement();b&&(e&&(e.detachEvent("onresizestart",c),e=null),b.$.attachEvent("onresizestart",c),e=b.$)})}function c(a){a.returnValue=!1}if(CKEDITOR.env.gecko)try{var e=a.document.$;e.execCommand("enableObjectResizing",!1,!a.config.disableObjectResizing);e.execCommand("enableInlineTableEditing",!1,!a.config.disableNativeTableHandles)}catch(h){}else CKEDITOR.env.ie&&11>CKEDITOR.env.version&&a.config.disableObjectResizing&&b(a)}function b(){var a=[];if(8<=CKEDITOR.document.$.documentMode){a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}");
var b=[],c;for(c in CKEDITOR.dtd.$removeEmpty)b.push("html.CSS1Compat "+c+"[contenteditable\x3dfalse]");a.push(b.join(",")+"{display:inline-block}")}else CKEDITOR.env.gecko&&(a.push("html{height:100% !important}"),a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));a.push("html{cursor:text;*cursor:auto}");a.push("img,input,textarea{cursor:default}");return a.join("\n")}var c;CKEDITOR.plugins.add("wysiwygarea",{init:function(a){a.config.fullPage&&a.addFeature({allowedContent:"html head title; style [media,type]; body (*)[id]; meta link [*]",
requiredContent:"body"});a.addMode("wysiwyg",function(b){function e(f){f&&f.removeListener();a.editable(new c(a,h.$.contentWindow.document.body));a.setData(a.getData(1),b)}var g="document.open();"+(CKEDITOR.env.ie?"("+CKEDITOR.tools.fixDomain+")();":"")+"document.close();",g=CKEDITOR.env.air?"javascript:void(0)":CKEDITOR.env.ie&&!CKEDITOR.env.edge?"javascript:void(function(){"+encodeURIComponent(g)+"}())":"",h=CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"'+g+'" frameBorder\x3d"0"\x3e\x3c/iframe\x3e');
h.setStyles({width:"100%",height:"100%"});h.addClass("cke_wysiwyg_frame").addClass("cke_reset");g=a.ui.space("contents");g.append(h);var m=CKEDITOR.env.ie&&!CKEDITOR.env.edge||CKEDITOR.env.gecko;if(m)h.on("load",e);var f=a.title,n=a.fire("ariaEditorHelpLabel",{}).label;f&&(CKEDITOR.env.ie&&n&&(f+=", "+n),h.setAttribute("title",f));if(n){var f=CKEDITOR.tools.getNextId(),p=CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"'+f+'" class\x3d"cke_voice_label"\x3e'+n+"\x3c/span\x3e");g.append(p,1);h.setAttribute("aria-describedby",
f)}a.on("beforeModeUnload",function(a){a.removeListener();p&&p.remove()});h.setAttributes({tabIndex:a.tabIndex,allowTransparency:"true"});!m&&e();a.fire("ariaWidget",h)})}});CKEDITOR.editor.prototype.addContentsCss=function(a){var b=this.config,c=b.contentsCss;CKEDITOR.tools.isArray(c)||(b.contentsCss=c?[c]:[]);b.contentsCss.push(a)};c=CKEDITOR.tools.createClass({$:function(){this.base.apply(this,arguments);this._.frameLoadedHandler=CKEDITOR.tools.addFunction(function(b){CKEDITOR.tools.setTimeout(a,
0,this,b)},this);this._.docTitle=this.getWindow().getFrame().getAttribute("title")},base:CKEDITOR.editable,proto:{setData:function(a,c){var e=this.editor;if(c)this.setHtml(a),this.fixInitialSelection(),e.fire("dataReady");else{this._.isLoadingData=!0;e._.dataStore={id:1};var g=e.config,h=g.fullPage,m=g.docType,f=CKEDITOR.tools.buildStyleHtml(b()).replace(/<style>/,'\x3cstyle data-cke-temp\x3d"1"\x3e');h||(f+=CKEDITOR.tools.buildStyleHtml(e.config.contentsCss));var n=g.baseHref?'\x3cbase href\x3d"'+
g.baseHref+'" data-cke-temp\x3d"1" /\x3e':"";h&&(a=a.replace(/<!DOCTYPE[^>]*>/i,function(a){e.docType=m=a;return""}).replace(/<\?xml\s[^\?]*\?>/i,function(a){e.xmlDeclaration=a;return""}));a=e.dataProcessor.toHtml(a);h?(/<body[\s|>]/.test(a)||(a="\x3cbody\x3e"+a),/<html[\s|>]/.test(a)||(a="\x3chtml\x3e"+a+"\x3c/html\x3e"),/<head[\s|>]/.test(a)?/<title[\s|>]/.test(a)||(a=a.replace(/<head[^>]*>/,"$\x26\x3ctitle\x3e\x3c/title\x3e")):a=a.replace(/<html[^>]*>/,"$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"),
n&&(a=a.replace(/<head[^>]*?>/,"$\x26"+n)),a=a.replace(/<\/head\s*>/,f+"$\x26"),a=m+a):a=g.docType+'\x3chtml dir\x3d"'+g.contentsLangDirection+'" lang\x3d"'+(g.contentsLanguage||e.langCode)+'"\x3e\x3chead\x3e\x3ctitle\x3e'+this._.docTitle+"\x3c/title\x3e"+n+f+"\x3c/head\x3e\x3cbody"+(g.bodyId?' id\x3d"'+g.bodyId+'"':"")+(g.bodyClass?' class\x3d"'+g.bodyClass+'"':"")+"\x3e"+a+"\x3c/body\x3e\x3c/html\x3e";CKEDITOR.env.gecko&&(a=a.replace(/<body/,'\x3cbody contenteditable\x3d"true" '),2E4>CKEDITOR.env.version&&
(a=a.replace(/<body[^>]*>/,"$\x26\x3c!-- cke-content-start --\x3e")));g='\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"'+(CKEDITOR.env.ie?' defer\x3d"defer" ':"")+"\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction("+this._.frameLoadedHandler+",window);wasLoaded\x3d1;}"+(CKEDITOR.env.ie?"onload();":'document.addEventListener("DOMContentLoaded", onload, false );')+"\x3c/script\x3e";CKEDITOR.env.ie&&9>CKEDITOR.env.version&&(g+='\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');
n&&CKEDITOR.env.ie&&10>CKEDITOR.env.version&&(g+='\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e');a=a.replace(/(?=\s*<\/(:?head)>)/,g);this.clearCustomData();this.clearListeners();e.fire("contentDomUnload");var p=this.getDocument();try{p.write(a)}catch(r){setTimeout(function(){p.write(a)},0)}}},getData:function(a){if(a)return this.getHtml();a=this.editor;var b=a.config,c=b.fullPage,e=c&&a.docType,h=c&&a.xmlDeclaration,
m=this.getDocument(),c=c?m.getDocumentElement().getOuterHtml():m.getBody().getHtml();CKEDITOR.env.gecko&&b.enterMode!=CKEDITOR.ENTER_BR&&(c=c.replace(/<br>(?=\s*(:?$|<\/body>))/,""));c=a.dataProcessor.toDataFormat(c);h&&(c=h+"\n"+c);e&&(c=e+"\n"+c);return c},focus:function(){this._.isLoadingData?this._.isPendingFocus=!0:c.baseProto.focus.call(this)},detach:function(){var a=this.editor,b=a.document,e;try{e=a.window.getFrame()}catch(g){}c.baseProto.detach.call(this);this.clearCustomData();b.getDocumentElement().clearCustomData();
CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);e&&e.getParent()?(e.clearCustomData(),(a=e.removeCustomData("onResize"))&&a.removeListener(),e.remove()):CKEDITOR.warn("editor-destroy-iframe")}}})}(),CKEDITOR.config.disableObjectResizing=!1,CKEDITOR.config.disableNativeTableHandles=!0,CKEDITOR.config.disableNativeSpellChecker=!0,CKEDITOR.config.plugins="dialogui,dialog,a11yhelp,about,basicstyles,blockquote,notification,button,toolbar,clipboard,panel,floatpanel,menu,contextmenu,elementspath,indent,indentlist,list,enterkey,entities,popup,filetools,filebrowser,floatingspace,listblock,richcombo,format,horizontalrule,htmlwriter,image,fakeobjects,link,magicline,maximize,pastefromword,pastetext,removeformat,resize,menubutton,scayt,showborders,sourcearea,specialchar,stylescombo,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wsc,wysiwygarea",
CKEDITOR.config.skin="moono-lisa",function(){var a=function(a,b){var c=CKEDITOR.getUrl("plugins/"+b);a=a.split(",");for(var d=0;d<a.length;d++)CKEDITOR.skin.icons[a[d]]={path:c,offset:-a[++d],bgsize:a[++d]}};CKEDITOR.env.hidpi?a("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,codesnippet,384,,bgcolor,408,,textcolor,432,,copyformatting,456,,creatediv,480,,docprops-rtl,504,,docprops,528,,easyimagealigncenter,552,,easyimagealignleft,576,,easyimagealignright,600,,easyimagealt,624,,easyimagefull,648,,easyimageside,672,,easyimageupload,696,,embed,720,,embedsemantic,744,,find-rtl,768,,find,792,,replace,816,,flash,840,,button,864,,checkbox,888,,form,912,,hiddenfield,936,,imagebutton,960,,radio,984,,select-rtl,1008,,select,1032,,textarea-rtl,1056,,textarea,1080,,textfield-rtl,1104,,textfield,1128,,horizontalrule,1152,,iframe,1176,,image,1200,,indent-rtl,1224,,indent,1248,,outdent-rtl,1272,,outdent,1296,,justifyblock,1320,,justifycenter,1344,,justifyleft,1368,,justifyright,1392,,language,1416,,anchor-rtl,1440,,anchor,1464,,link,1488,,unlink,1512,,bulletedlist-rtl,1536,,bulletedlist,1560,,numberedlist-rtl,1584,,numberedlist,1608,,mathjax,1632,,maximize,1656,,newpage-rtl,1680,,newpage,1704,,pagebreak-rtl,1728,,pagebreak,1752,,pastefromword-rtl,1776,,pastefromword,1800,,pastetext-rtl,1824,,pastetext,1848,,placeholder,1872,,preview-rtl,1896,,preview,1920,,print,1944,,removeformat,1968,,save,1992,,scayt,2016,,selectall,2040,,showblocks-rtl,2064,,showblocks,2088,,smiley,2112,,source-rtl,2136,,source,2160,,sourcedialog-rtl,2184,,sourcedialog,2208,,specialchar,2232,,table,2256,,templates-rtl,2280,,templates,2304,,uicolor,2328,,redo-rtl,2352,,redo,2376,,undo-rtl,2400,,undo,2424,,simplebox,4896,auto,spellchecker,2472,",
"icons_hidpi.png"):a("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,codesnippet,384,auto,bgcolor,408,auto,textcolor,432,auto,copyformatting,456,auto,creatediv,480,auto,docprops-rtl,504,auto,docprops,528,auto,easyimagealigncenter,552,auto,easyimagealignleft,576,auto,easyimagealignright,600,auto,easyimagealt,624,auto,easyimagefull,648,auto,easyimageside,672,auto,easyimageupload,696,auto,embed,720,auto,embedsemantic,744,auto,find-rtl,768,auto,find,792,auto,replace,816,auto,flash,840,auto,button,864,auto,checkbox,888,auto,form,912,auto,hiddenfield,936,auto,imagebutton,960,auto,radio,984,auto,select-rtl,1008,auto,select,1032,auto,textarea-rtl,1056,auto,textarea,1080,auto,textfield-rtl,1104,auto,textfield,1128,auto,horizontalrule,1152,auto,iframe,1176,auto,image,1200,auto,indent-rtl,1224,auto,indent,1248,auto,outdent-rtl,1272,auto,outdent,1296,auto,justifyblock,1320,auto,justifycenter,1344,auto,justifyleft,1368,auto,justifyright,1392,auto,language,1416,auto,anchor-rtl,1440,auto,anchor,1464,auto,link,1488,auto,unlink,1512,auto,bulletedlist-rtl,1536,auto,bulletedlist,1560,auto,numberedlist-rtl,1584,auto,numberedlist,1608,auto,mathjax,1632,auto,maximize,1656,auto,newpage-rtl,1680,auto,newpage,1704,auto,pagebreak-rtl,1728,auto,pagebreak,1752,auto,pastefromword-rtl,1776,auto,pastefromword,1800,auto,pastetext-rtl,1824,auto,pastetext,1848,auto,placeholder,1872,auto,preview-rtl,1896,auto,preview,1920,auto,print,1944,auto,removeformat,1968,auto,save,1992,auto,scayt,2016,auto,selectall,2040,auto,showblocks-rtl,2064,auto,showblocks,2088,auto,smiley,2112,auto,source-rtl,2136,auto,source,2160,auto,sourcedialog-rtl,2184,auto,sourcedialog,2208,auto,specialchar,2232,auto,table,2256,auto,templates-rtl,2280,auto,templates,2304,auto,uicolor,2328,auto,redo-rtl,2352,auto,redo,2376,auto,undo-rtl,2400,auto,undo,2424,auto,simplebox,2448,auto,spellchecker,2472,auto",
"icons.png")}())})();
},{}],3:[function(require,module,exports){
'use strict';

module.exports = require('./lib/franc');

},{"./lib/franc":6}],4:[function(require,module,exports){
module.exports={
  "Latin": {
    "spa": " de|os |de | la|la | y | a |es |ón |ión|rec|ere|der| co|e l|el |en |ien|cho|ent|ech|ció|aci|o a|a p| el|a l|al |as |e d| en|na |ona|s d|da |nte| to|ad |ene|con| pr| su|tod| se|ho |los| pe|per|ers| lo|o d| ti|cia|n d|cio| es|ida|res|a t|tie|ion|rso|te |do | in|son| re| li|to |dad|tad|e s|est|pro|que|men| po|a e|oda|nci| qu| un|ue |ne |n e|s y|lib|su | na|s e|nac|ia |e e|tra| pa|or |ado|a d|nes|ra |se |ual|a c|er |por|com|nal|rta|a s|ber| o |one|s p|dos|rá |sta|les|des|ibe|ser|era|ar |ert|ter| di|ale|l d|nto|hos|del|ica|a a|s n|n c|oci|imi|io |o e|re |y l|e c|ant|cci| as|las|par|ame| cu|ici|ara|enc|s t|ndi| so|o s|mie|tos|una|bre|dic|cla|s l|e a|l p|pre|ntr|o t|ial|y a|nid|n p|a y|man|omo|so |n l| al|ali|s a|no | ig|s s|e p|nta|uma|ten|gua|ade|y e|soc|mo | fu|igu|o p|n t|hum|d d|ran|ria|y d|ada|tiv|l e|cas| ca|vid|l t|s c|ido|das|dis|s i| hu|s o|nad|fun| ma|rac|nda|eli|sar|und| ac|uni|mbr|a u|die|e i|qui|a i| ha|lar| tr|odo|ca |tic|o y|cti|lid|ori|ndo|ari| me|ta |ind|esa|cua|un |ier|tal|esp|seg|ele|ons|ito|ont|iva|s h|d y|nos|ist|rse| le|cie|ide|edi|ecc|ios|l m|r e|med|tor|sti|n a|rim|uie|ple|tri|ibr|sus|lo |ect|pen|y c|an |e h|n s|ern|tar|l y|egu|gur|ura|int|ond|mat|l r|r a|isf|ote",
    "eng": " th|the| an|he |nd |and|ion| of|of |tio| to|to |on | in|al |ati|igh|ght|rig| ri|or |ent|as |ed |is |ll |in | be|e r|ne |one|ver|all|s t|eve|t t| fr|s a| ha| re|ty |ery| or|d t| pr|ht | co| ev|e h|e a|ng |ts |his|ing|be |yon| sh|ce |ree|fre|ryo|n t|her|men|nat|sha|pro|nal|y a|has|es |for| hi|hal|f t|n a|n o|nt | pe|s o| fo|d i|nce|er |ons|res|e s|ect|ity|ly |l b|ry |e e|ers|e i|an |e o| de|cti|dom|edo|eed|hts|ter|ona|re | no| wh| a | un|d f| as|ny |l a|e p|ere| en| na| wi|nit|nte|d a|any|ted| di|ns |sta|th |per|ith|e t|st |e c|y t|om |soc| ar|ch |t o|d o|nti|s e|equ|ve |oci|man| fu|ote|oth|ess| al| ac|wit|ial| ma|uni| se|rea| so| on|lit|int|r t|y o|enc|thi|ual|t a| eq|tat|qua|ive| st|ali|e w|l o|are|f h|con|te |led| is|und|cia|e f|le | la|y i|uma|by | by|hum|f a|ic | hu|ave|ge |r a| wo|o a|ms |com| me|eas|s d|tec| li|n e|en |rat|tit|ple|whe|ate|o t|s r|t f|rot| ch|cie|dis|age|ary|o o|anc|eli|no | fa| su|son|inc|at |nda|hou|wor|t i|nde|rom|oms| ot|g t|eme|tle|iti|gni|s w|itl|duc|d w|whi|act|hic|aw |law| he|ich|min|imi|ort|o s|se |e b|ntr|tra|edu|oun|tan|e d|nst|l p|d n|ld |nta|s i|ble|n p| pu|n s| at|ily|rth|tho|ful|ssi|der|o e|cat|uca|unt|ien| ed|o p|h a|era|ind|pen|sec|n w|omm|r s",
    "por": "os |de | de| a | e |o d|to |ão | di|ent|da |ito|em | co|eit|as |dir|es |ire|rei| se|ção|ade|a p|dad|e d|s d|men|nte|do |s e| pr| pe|dos| to| da|a a|o e| o |o a|ess|con|tod|que| qu|te |e a| do|al |res|ida|m d| in| ou|er |sso| na| re| po|a s| li|uma|cia|ar |pro|e e|a d| te|açã|a t| es| su|ou |ue |s p|tos|a e|des|ra |com|no |ame|ia |e p|tem|nto| pa|is |est|tra|ões|na |s o|oda|das|ser|soa|s n|pes|o p|s a|o s|e o| em| as| à |o o|ais|ber|ado|oa |o t|e s|man|sua|ua | no| os|a c|ter|çõe|erd|lib|rda|s s|nci|ibe|e n|ica|odo|so |nal|ntr|s t|hum|ura| ao|ona|ual| so|or |ma |sta|o c|a n|pre|ara|era|ons|e t|r a|par|o à| hu|ind|por|cio|ria|m a|s c| um|a l|gua|ran| en|ndi|o i|e c|raç|ion|nid|aci|ano|soc|e r|oci| ac|und|sen|nos|nsi|rec|ime|ali|int|um |per|nac| al|m o|r p| fu|ndo|ont|açõ| ig|igu|fun|nta| ma|uni|cçã|ere| ex|a i| me|ese|rio|l d|a o|s h|pel|ada|pri|ide|am |m p|pod|s f|ém |a f|io |ode|ca |ita|lid|tiv|e f|vid|r e|esp|nda|omo|e l|naç|o r|ant|a q|tad|lic|iva| fa|ver|s l|ial|cla|ngu|ing| ca|mo |der| vi|eli|ist|ta |se |ati|ios|ido|r o|eci|dis| un|e i|r d|ecç|o q|s i|qua|ênc|a m|seu|sti|nin|uer|rar|cas|aos|ens|gué|ias|sid|uém|tur|dam|sse|ao |ela|l e|for|tec|ote| pl|ena| tr|m c|tro| ni|ico|rot",
    "ind": "an |ang| da|ng | pe|ak | ke| me|ata| se|dan|kan| di| be|hak|ber|per|ran|nga|yan|eng| ya| ha|asa|gan|men|ara|nya|n p|n d|n k|a d|tan| at|at |ora|ala|san| ba|ap |erh|n b|rha|ya | ma|g b|a s|pen|eba|as |aan|uk |ntu| or|eti|tas|aka|tia|ban|set| un|n s|ter|n y| te|k m|tuk|bas|iap|lam|beb|am | de|k a|keb|n m|i d|unt|ama|dal|ah |ika|dak|ebe|p o|sa |pun|mem|n h|end|den|ra |ela|ri |nda| sa|di |ma |a m|n t|k d|n a|ngg|tau|man|gar|eri|asi| ti|un |al |ada|um |a p|lak|ari|au | ne|neg|a b|ngs|ta |ole|leh|ert|ers|ida|k h|ana|gsa|dar|uka|tid|bat|sia|era|eh |dap|ila|dil|h d|atu|sam|ia |i m| in|lan|aha|uan|tu |ai |t d|a a|g d|har|sem|na |apa|ser|ena|kat|uat|erb|erl|mas|rta|ega|ung|nan|emp|n u|kum|l d|g s| hu|ka |ent|pat|mba|aga|nta|adi| su|eni|uku|n i|huk|ind|ar |rga|i s|aku|ndi|sua|ni |rus|han|si |car|nny| la|in |u d|ik |ua |lah|rik|usi|emb|ann|mer|ian|gga|lai|min|a u|lua|ema|emu|arg|dun|dip|a t|mat|aya|rbu|aru|erk|rka|ini|eka|a k|rak|kes|yat|iba|nas|rma|ern|ese|s p|nus| pu|anu|ina| ta|mel|mua|kel|k s|us |ndu|nak|da |sya|das|pem|lin|ut |yar|ami|upu|seo|aik|eor|iny|aup|tak|ipe|ing|tin| an|dik|uar|ili|g t|rse|sar|ant|g p|a n|aks|ain| ja|t p| um|g m|dir|ksa|umu|kep|mum|i k|eca|rat|m p|h p|aba|ses|m m",
    "fra": " de|es |de |ion|nt |et |tio| et|ent| la|la |e d|on |ne |oit|e l|le | le|s d|e p|t d|ati|roi| dr|dro|it | à | co|té |ns |te |e s|men|re | to|con| l’|tou|que| qu|les| so|des|son| pe|ons| un|s l|s e| pr|ue | pa|e c|t l|ts |onn| au|e a|eme|e e| li|ont|ant|out|ute|t à|res|ers| sa|ce | a |tre|per|a d|cti|er |lib|ité| en|ux | re|en |rso|à l| ou| in|lle|un |nat|ou |nne|n d|une| d’| se|par|nte|us |ur |s s|ans|dan|a p|r l|pro|its|és |t p|ire|e t|s p|sa | dé|ond|é d|a l|nce|ert|aux|omm|nal|me | na| fo|iqu| ce|rté|ect|ale|ber|t a|s a| da|mme|ibe|san|e r| po|com|al |s c|qui|our|t e| ne|e n|ous|r d|ali|ter| di|fon|e o|au | ch|air|ui |ell| es|lit|s n|iss|éra|tes|soc|aut|oci|êtr|ien|int|du |est|été|tra|pou| pl|rat|ar |ran|rai|s o|ona|ain|cla|éga|anc|rs |eur|pri|n c|e m|s t|à u| do|ure|bre|ut | êt|age| ét|nsi|sur|ein|sen|ser|ndi|ens|ess|ntr|ir | ma|cia|n p|st |a c| du|l e| su|bli|ge |rés| ré|e q|ass|nda|peu|ée |l’a| te|a s|tat|il |tés|ais|u d|ine|ind|é e|qu’| ac|s i|n t|t c|n a|l’h|t q|soi|t s|cun|rit| ég|oir|’en|nta|hom| on|n e| mo|ie |ign|rel|nna|t i|l n| tr|ill|ple|s é|l’e|rec|a r|ote|sse|uni|idé|ive|s u|t ê|ins|act| fa|n s| vi|gal| as|lig|ssa|pré|leu|e f|lic|dis|ver| nu|ten|ssi|rot|tec|s m|abl",
    "deu": "en |er |der| un|nd |und|ein|ung|cht| de|ich|sch|ng | ge|ie |che|ech| di|die|rec|gen|ine|eit| re|ch | da|n d|ver|hen| zu|t d| au|ht | ha|lic|it |ten|rei| be|in | ve| in| ei|nde|auf|den|ede|zu |n s|uf |fre|ne |ter|es | je|jed|n u| an|sei|and| fr|run|at | se|e u|das|hei|s r|hte|hat|nsc|nge|r h|as |ens| al|ere|lle|t a| we|n g|rde|nte|ese|men| od|ode|ner|g d|all|t u|ers|te |nen| so|d d|n a|ben|lei| gr| vo|wer|e a|ege|ion| st|ige|le |cha| me|haf|aft|n j|ren| er|erk|ent|bei| si|eih|ihe|kei|erd|tig|n i|on |lun|r d|len|gem|ies|gru|tli|unt|chu|ern|ges|end|e s|ft |st |ist|tio|ati| gl|sta|gun|mit|sen|n n| na|n z|ite| wi|r g|eic|e e|ei |lie|r s|n w|gle|mei|de |uch|em |chl|nat|rch|t w|des|n e|hre|ale|spr|d f|ach|sse|r e| sc|urc|r m|nie|e f|fen|e g|e d| ni|dur|dar|int| du|geh|ied|t s| mi|alt|her|hab|f g|sic|ste|taa|aat|he |ang|ruc|hli|tz |eme|abe|h a|n v|nun|geg|arf|rf |ehe|pru| is|erf|e m|ans|ndl|e b|tun|n o|d g|n r|r v|wie|ber|r a|arb|bes|t i|h d|r w|r b| ih|d s|igk|gke|nsp|dig|ema|ell|eru|n f|ins|rbe|ffe|esc|igu|ger|str|ken|e v|gew|han|ind|rt | ar|ieß|n h|rn |man|r i|hut|utz|d a|ls |ebe|von|lte|r o|rli|etz|tra|aus|det|hul|e i|one|nne|isc|son|sel|et |ohn|t g|sam| fa|rst|rkl|ser|iem|g v|t z|err",
    "jav": "ng |an |ang| ka|ing|kan| sa|ak |lan| la|hak| ha| pa| ma|ngg|ara|sa |abe|ne | in|n k|ant| ng|tan|nin| an|nga|ata|en |ran| ba|man|ban|ane|hi |n u|ong|ra |nth|ake|ke |thi| da|won|uwo|ung|ngs| uw|asa|gsa|ben|sab|ana|aka|beb|a k|g p|nan|nda|adi|at |awa|san|ni |dan|g k|pan|eba| be|e k|g s|ani|bas| pr|dha|aya|gan|ya |wa |di |mar|n s| wa|ta |a s|g u| na|e h|arb|a n|a b|a l|n n| ut|yan|n p|asi|g d|han|ah |g n| tu| um|as |wen|dak|rbe|dar| di|ggo|sar|mat|k h|a a|iya| un|und|eni|kab|be |art|ka |uma|ora|n b|ala|n m|ngk|rta|i h| or|gar|yat|kar|al |a m|n i|na |g b|ega|pra|ina|kak|g a|a p|tum|nya|kal|ger|gge| ta|kat|i k|ena|oni|kas| pe|dad|aga|g m|duw|k k|uta|uwe| si| ne|adh|pa |n a|go |and|i l| ke|nun|nal|ngu|uju|apa|a d|t m|i p|min|iba|er | li|anu|sak|per|ama|gay|war|pad|ggu|ha |ind|taw|ras|n l|ali|eng|awi|a u| bi|we |bad|ndu|uwa|awe|bak|ase|eh | me|neg|pri| ku|ron|ih |g t|bis|iji|i t|e p| pi|aba|isa|mba|ini|a w|g l|ika|n t|ebu|ndh|ar |sin|lak|ur |mra|men|ku | we|e s|a i|liy| ik|ayo|rib|ngl|ami|arg|nas|yom|wae|ut |kon|ae |rap|aku| te|dil|tin|rga|jud|umu| as|rak|bed|k b|il |kap|h k|jin|k a| nd|e d|i s| lu|i w|eka|mum|um |uha|ate| mi|k p|gon|eda| ti|but|n d|r k|ona|uto|tow|wat|gka|si |umr|k l|oma",
    "vie": "ng |̣c |́c | qu| th|à |nh | ng|̣i | nh|và| va|̀n |uyê| ph| ca|quy|ền|yề|̀i | ch|̀nh| tr| cu|ngư|i n|gươ|ườ|́t |ời| gi|ác| co|̣t |ó |c t|ự |n t|cá|ông| kh|ượ|ợc| tư| đư|iệ|đươ|ìn|́i | ha|có|i đ|gia| đê|pha| mo|ọi|mọ|như|n n|củ| ba|̣n |̉a |ủa|n c|̀u |̃ng|ân |ều|ất| bi|tự|hôn| vi|g t| la|n đ|đề|nhâ| ti|t c| đô|ên |bả|hiê|u c| tô|do |hân| do|ch |́ q|̀ t| na|́n |ay | hi|àn|̣ d|ới|há| đi|hay|g n| mô|ốc|uố|n v|ội|hữ|thư|́p |quô| ho|̣p |nà|ào|̀ng|̉n |ị |́ch|ôn |̀o |khô|c h|i c|c đ| hô|i v|tro| đa|́ng|mộ|i t|ột|g v|ia |̣ng|ản|ướ|ữn|̉ng|h t|hư |ện|n b|ộc|ả |là|c c|g c| đo|̉ c|n h|hà|hộ| bâ|ã |̀y | vơ|̣ t|̉i |iế| cô|t t|g đ|ức|iên| vê|viê|vớ|h v|ớc|ực|ật|tha|̉m |ron|ong|áp|g b|hươ| sư|a c|sự|̉o |ảo|h c|ể |o v|uậ|a m|ế |iá|̀ c|cho|qua|hạ|ục| mi|̀ n|phâ|c q|côn|o c|á |i h|ại| hơ|̃ h| cư|n l|bị| lu|bấ|cả|ín|h đ| xa|độ|g h|c n|c p|thu|ải|ệ | hư|́ c|o n| nư|ốn|́o |áo|xã|oà|y t|hả|tộ|̣ c| tâ|thô| du|m v|mì|ho |hứ|ệc|́ t|hợ|án|n p|cũ|ũn|iể|ối|tiê|ề |hấ|ợp|hoa|y đ|chi|o h|ở |ày|̉ t|đó|c l|về|̀ đ|i b|kha|c b| đâ|luâ|ai |̉ n|đố|ết|hự|tri|p q|nươ|dụ|hí|g q|yên|họ|́nh| ta| bă|c g|n g|thê|o t|c v|am |c m|an ",
    "ita": " di|to | de|ion| in|la |e d|di |ne | e |zio|re |le |ni |ell|one|lla|rit|a d|o d|del|itt|iri|dir| co|ti |ess|ent| al|azi|tto|te |i d|i i|ere|tà | pr|ndi|e l|ale|o a|ind|e e|e i|gni|nte|con|i e|li |a s| un|men|ogn| ne|uo | og|idu|e a|ivi|duo|vid| es|tti| ha|div| li|a p|no |all|pro|za |ato|per|sse|ser| so|i s| la| su|e p| pe|ibe|na |a l| il|ber|e n|il |ali|lib|ha |che|in |o s|e s| qu|o e|ia |e c| ri|nza|ta |nto|he |oni|o i| o |sta|o c|nel| a |o p|naz|e o|so | po|o h|gli|i u|ond|i c|ers|ame|i p|lle|un |era|ri |ver|ro |el |una|a c| ch|ert|ua |i a|ssi|rtà|a e|ei |dis|ant| l |tat|a a|ona|ual| le|ità|are|ter| ad|nit| da|pri|dei|à e|cia| st| si|nal|est|tut|ist|com|uni| ed|ono| na|sua|al |si |anz| pa| re|raz|gua|ita|res|der|soc|man|o o|ad |i o|ese|que|enz|ed | se|io |ett|on | tu|dic|à d|sia|i r|rso|oci|rio|ari|qua|ial|pre|ich|rat|ien|tra|ani|uma|se |ll |eri|a n|o n| um|do |ara|a t|zza|er |tri|att|ico|pos|sci|i l|son|nda|par|e u|fon| fo|nti|uzi|str|utt|ati|sen|int|nes|iar| i |hia|n c|sti|chi|ann|ra | eg|egu|isp|bil|ont|a r| no|rop| me|opr|ost| ma|ues|ica|sso|tal|cie|sun|lit|ore|ina|ite|tan| ra|non|gio|d a|e r|dev|i m|l i|ezz|izi| cu|nno|rà |a i|tta|ria|lia|cos|ssu|dal|l p| as|ass|opo|ve |eve",
    "tur": " ve| ha|ve |ler|lar|ir |in |hak| he|her|bir|er |an |arı|eri|ya | bi|ak |r h|eti|ın |iye|yet| ka|ası|ını| ol|tle|eya|kkı|ara|akk|etl|sın|esi|na |de |ek | ta|nda|ini| bu|ile|rın|rin|vey|ne |kla|e h|ine|ır |ere|ama|dır|n h| sa|ına|sin|e k|le | ge|mas|ınd|nın|ı v| va|lan|lma|erk|rke|nma|tin|rle| te|nin|akl|a v|da | de|let|ill|e m|ard|en |riy|aya|nı | hü| şa|e b|k v|kın|k h| me|mil|san| il|si |rdı|e d|dan|hür|var|ana|e a|kes|et |mes|şah|dir| mi|ret|rri| se|ola|ürr|irl|bu |mak| ma|mek|n e|kı |n v|n i|lik|lle| ed| hi|n b|a h| ba|nsa| iş|eli|kar| iç|ı h|ala|li |ulu|rak|evl|e i|ni |re |r ş|eme|etm|e t|ik |e s|a b|iş |n k|hai|nde|aiz| eş|izd|un |olm|hiç|zdi|ar |unm|ma | gö|ilm|lme|im |n t|tir|dil|mal|e g|i v| ko|lun|e e|mel|ket|ık |n s|ele|la |el |r v|ede|şit|ili|eşi|yla|a i| an|anı| et|rı |ahs| ya|sı |edi|siy|t v|i b|se |içi|çin|bul|ame| da|miş|may|tim|a k|tme|r b|ins|yan|nla|mle| di|eye|ger|ye |uğu|erd|din|ser| mü|mem|vle| ke|nam|ind|len|eke|es | ki|n m|it | in| ku|rşı|a s|arş| ay|eml|lek|oru|rme|kor|rde|i m| so|tür|al |lam|eni|nun| uy|ken|hsı|i i|a d|ri |dev|ün |a m|r a|mey|cak|ıyl|maz|e v|ece|ade|iç |şma|mse|te |tün|ims|kim|e y|şı |end|k g|ndi|alı| ce|lem|öğr|ütü|k i|r t| öğ|büt|anl| bü",
    "pol": " pr|nie| i |ie |pra| po|ani|raw|ia |nia|wie|go | do|ch |ego|iek|owi| ni|ści|ci |a p|do |awo| cz|ośc|ych| ma|ek |rze| na|prz| w |wo |ej | za|noś|czł|zło|eni|wa | je|łow|i p|wol|oln| lu|rod| ka| wo|lno|wsz|y c|ma |ny |każ|ażd|o d|stw|owa|dy |żdy| wy|rzy|sta|ecz| sw|dzi|i w|e p|czn|twa|na |zys|ów |szy|ub |lub|a w|est|kie|k m|wan| sp|ają| ws|e w|pow|pos|nyc|rac|spo|ać |a i|cze|sze|neg|yst|jak| ja|o p|pod|acj|ne |ńst|aro|mi | z |i i|nar| ko|obo|awa| ro|i n|jąc|zec|zne|zan|dow| ró|iej|zy |zen|nic|ony|aw |i z|czy|no |nej|o s|rów|odn|cy |ówn|odz|o w|o z|jeg|edn|o o|aki|mie|ien|kol| in|zie|bez|ami|eńs|owo|dno| ob| or| st|a s|ni |orz|o u|ym |stę|tęp|łec|jed|i k| os|w c|lwi|ez |olw|ołe|poł|cji|y w|o n|wia| be|któ|a j|zna|zyn|owe|wob|ka |wyc|owy|ji | od|aln|inn|jes|icz|h p|i s|się|a o|ją |ost|kra|st |sza|swo|war|cza|roz|y s|raz|nik|ara|ora|lud|i o|a z|zes| kr|ran|ows|ech|w p|dów|ą p|pop|a n|tki|stk|gan|zon|raj|e o|iec|i l| si|że |eka| kt| de|em |tór|ię |wni|lni|ejs|ini|odo|dni|ełn|kow|peł|a d|ron|dek|pie|udz|bod|nan|h i|dst|ieg|taw|z p|z w|zeń|god|iu |ano|lar| to|y z|a k|ale|kla|trz|zaw|ich|e i|ier|iko|dzy|chn|w z|by |ków|adz|ekl|ywa|ju |och|kor|sob|ocz|oso|u p|du |tyc|tan|ędz| mi|e s| ta|ki ",
    "gax": "aa |an |uu | ka|ni |aan|umm|ii |mma|maa| wa|ti |nam| fi|ta |tti| na|saa|fi | mi|rga|i k|a n| qa|dha|iyy|oot|in |mir|irg|raa|qab|a i|a k|kan|akk|isa|chu|amu|a f|huu|aba|kka| ta|kam|a a| is|amn|ami|att|ach|mni|yaa| bi|yuu|yyu|ee |wal|miy|waa|ga |ata|aat|tii|oo |a e|moo| ni| ee|ba | ak|ota|a h|i q| ga| dh|daa|haa|a m|ama|yoo|a b|i a|ka |kaa| hi|sum|aas|arg|man| hu| uu|u n| yo| ar| ke| ha|ees| ba|uf |i i|taa|uuf|iin|ada|a w|i f|ani|rra|na |isu| ad|i w|a u|nya|irr|da |hun|hin|ess| ho| ma|i m|und|i b|bar|ana|een|mu |is |bu |f m| ir| sa|u a|add|aad| la|i d|n h|eeg|i h|sa |hoj|abu| ya|kee|al |udh|ook|goo|ala|ira|nda|itt|gac|as |n k|mum|see|rgo|uum|ra |n t|n i|ara|muu|ums|mat|nii|sii|ssa|a d|a q| da|haw|a g|yya|asu|eef|u h|tum|biy| mo|a t|ati|eny|gam|abs|awa|roo|uma|n b|n m|u y|a s|sat|baa|gar|n a|mmo|nis| qo|nna| ku|eer| to|kko|bil|ili|lis|bir|otu|tee|ya |msa|aaf|suu|n d|jii|n w|okk|rka|gaa|ald|un |rum| ye|ame| fu|mee|yer|ero|amm|era|kun|i y|oti|tok|ant|ali|nni| am|lda|lii|n u|lee|ura|lab|aal|tan|laa|i g|ila|ddu|aru|u m|oji|gum|han|ega| se|ffa|dar|faa|ark|n y|hii|qix|gal|ndi| qi|asa|art|ef |uud| bu|jir| ji|arb|n g|chi|tam|u b|dda|bat|di |kar|lam|a l| go|bsi|sad|oka|a j|egu|u t|bee|u f|uun",
    "swh": "a k|wa |na | ya| ku|ya | na| wa|a m| ha|i y|a h|a n|ana|ki |aki|kwa| kw|hak| ka| ma|la |a w|tu |li |a u|ni |i k|a a|ila| ki|ali|a y|ati|za |ili|ifa| mt|ke | an|kil|kat|mtu|ake|ote|te |ka |ika|ma |we |a s|yo |fa |i n|ata|e k|ama|zi |amb|u a|ia |u w| yo|azi|kut|ina|i z|asi| za|o y|uhu|yak|au |ish|mba|e a|u k|hur|ha |tik|wat| au|uru| bi|sha|mu |ara|u n| as|hi | hi|ru |aif|tai|cha|ayo|a b|hal| uh| ch|yot|i h| zi|awa|chi|atu|e n|ngi|u y|mat|shi|ani|eri| am|uli|ele|sa |ja |e y|a t|oja|o k|nch|i a|a j| nc|ima| sh|ami| ta|end|any|moj|i w|ari|ham|uta|ii |iki|ra |ada|wan|wak|nay|ye |uwa| la|ti |eza|o h|iri|iwa|kuw|iwe| wo|fan| sa|she|bu |kan|ao |jam|wen|lim|i m|her|uto|ria| ja| ni|kam|di | hu|zo |a l|da |kaz|ahi|amu|wot|o w|si |dha|bin|ing|adh|a z|bil|e w|nya|kup|har|ri |ang|aka|sta|aji|ne |kus|e m|zim|ini|ind|lin|kul|agu|kuf|ita|bar|o n|uu |iyo|u h|nad|maa|mwe|ine|gin|nye|nde|dam|ta | nd|ndi|rik|asa| ba|rif|uni|nga|hii|lez|bo |azo|uzi|mbo|sil|ush|tah|wam|ibu|uba|imu| ye|esh| ut|taa|aar|wez|i s|e b| si|ala|dhi|eng|aza|tak|hir|saw|izo|kos|tok|oka|yan|a c|wal|del|i b|pat| um|ndo|zwa|mam|a i|guz|ais|eli|mai|laz|ian|aba|man|ten|zin|ba |nda|oa |u m|uku|ufu| mw|liw|aha|ndw|kuh|ua |upa| el|umi|sia",
    "sun": "an |na |eun| ka|ng | sa|ana|ang| di|ak | ha|nga|hak|un |ung|keu|anu| ba| an|nu |a b| bo| je|a h|ata|asa|jeu|ina| ng|ara|nan|awa|gan|ah |sa |a k| na|n k|kan|aha|a p|a s|ga |ban| ma|a n|ing|oga|bog|sar| pa| ku|man|a a|ha |san|ae |bae|din|g s|aga|sah|ra |tan|n s| pe|ala| si|kat|ma |per| ti|aya|sin| at| pi| te|n a|aan|lah|pan|gar|n n|u d|ta |eu |ari|kum|ngs|a m|n b|n d|ran|a d|gsa|wa |taw|k h|ama|ku |ike|n p|eba|bas| ja|al |a t|ika|at |beb|kab|pik|asi|atu|nda|una|a j|nag|e b|n h|en |g k|oh |aba|ila|rta|aku|boh|ngg|abe|art|ar |n j|di |ima|um |ola|geu|usa|aca|sak|adi|k a|udu|teu|car|tin| me| ay|h k| po|eh |u s|aka|rim|ti |sac|k n|ngt|jen|awe|ent|u a|uma|teh|law|ur |h s|dan|bar|uku|gaw|aru|ate|iba|dil|pol|aja|ieu|ere|jal|nar| hu|n t|nya|pa |are|upa|mas|ake|ut |wan| ge|kal|nus| so|ngk|ya |yan|huk| du|tun| mi|mpa|isa|lan|ura|u m|uan|ern|ena|nte|rup|tay|n m| ke|ka |han|und|us |h b|kud|ula|tut| tu| ie|hna|kaw|u k|lak|gam|mna|umn|g d| nu|yun|ri |ayu|wat| wa|eri|g n|a u|i m|u p| ta|du |dit|umu|k k|ren|mba|rik|gta| be|ali|h p|h a|eus|u n|alm|il | da|sas|ami|min|lma|ngu|nas|yat|rak|amp|mer|k j|sab|mum| ra|rua|ame|ua |ter|sal|ksa|men|kas|nge|k d|ona| bi|bis|sio|ion|nal|taa| de|uh |gal|dip|we |bad",
    "ron": " de|și | și|re | în|are|te |de |ea |ul |rep|le |ept|dre|e d| dr|ie |în |e a|ate|ptu| sa|tul| pr|or |e p| pe|la |e s|ori| la| co|lor| or|ii |rea|ce |au |tat|ați| a | ca|ent| fi|ale|ă a|a s| ar|ers|per|ice| li|uri|a d|al | re|e c|ric|nă |i s|e o|ei |tur| să|lib|con|men|ibe|ber|rso|să |tăț|sau| ac|ilo|pri|ăți|i a|i l|car|l l|ter| in|ție|că |soa|oan|ții|lă |tea|ri |a p| al|ril|e ș|ană|in |nal|pre|i î|uni|ui |se |e f|ere|i d|e î|ita| un|ert|ile|tă |a o| se|i ș|pen|ia |ele|fie|i c|a l|ace|nte|ntr|eni| că|ală| ni|ire|ă d|pro|est|a c| cu| nu|n c|lui|eri|ona| as|sal|ând|naț|ecu|i p|rin|inț| su|ră |e n| om|ici|nu |i n|oat|ări|l d| to|tor| di| na|iun| po|oci|tre|ni |ste|soc|ega|i o|gal| so| tr|ă p|a a|n m|sta|va |ă î|fi |res|rec|ulu|nic|din|sa |cla|nd | mo| ce| au|ara|lit|int|i e|ces|uie|at |rar|rel|iei|ons|e e|leg|nit|ă f| îm|a î|act|e l|ru |u d|nta|a f|ial|ra |ă c| eg|ță | fa|i f|rtă|tru|tar|ți |ă ș|ion|ntu|dep|ame|i i|reb|ect|ali|l c|eme|nde|n a|ite|ebu|bui|ât |ili|toa|dec| o |pli|văț|nt |e r|u c|ța |t î|l ș|cu |rta|cia|ane|țio|ca |ită|poa|cți|împ|bil|r ș| st|omu|ăță|țiu|rie|uma|mân| ma|ani|nța|cur|era|u a|tra|oar| ex|t s|iil|ta |rit|rot|mod|tri|riv|od |lic|rii|eze|man|înv|ne |nvă|a ș|cti",
    "fuc": "de | e |e n|nde| ha|la |e e|akk| ka| nd|ina| wa|al |hak|na |ndi| in|kke|ɗo |di |ii |aad|ade|um |ko |i h|ala| mu|lla| ne| jo|mum|wal|ji | fo|all|eɗɗ|neɗ| le|kal|e h| ko|taa|re | ng|aaw|aa |e k|e w|ee |jog|ley|e m|laa|ke |ɗɗo|e l|eed|nnd|aag|ol | ta|kee|gu |o k|ogi|ond|le |eji|waa|am |dee|nga|a j|ti |gal|m e|awa|e d|ɗe | wo|ɓe |eej|gii|ede|gol| re|aan|i e| go|agu|e t|ann|eyd|fot|oti|ɗee|naa| de| po|pot|maa|oto|ydi|enn|i n| he|ni |een|taw|e j|goo|a k|to |dim|e f|a i|der| aa|ele| fa|o n|ngu|oot|dir| ba|er |a f|ndo|ima|ay | sa|ota|ka |oor|a n|won|ngo|i k|tee|a e| ja|e ɓ|o f|i w| to|wa |i f|ren|hay|and|a w|awi|ore|o t|eyɗ|ma |nan|yɗe|o e|kam|i m|too|fof|e y|hee|aak| do|eel|of |nka|ñaa|e g|e s|l e|ira| la|e i|tin|e r|aar|ani| ɓe| te|are|ral|a t| so|dii|e p| na|o w| ho|oo |ooj| ña|en |gaa|kaa| yi|so | mo|und|nng|faw|nge| ma|aam|woo|awo| ya|dow|u m|i l|e b| mb|ita|ude|o h|igg|ɗi |o i| li|nda|e a|lig| o | nj|baa|haa|tal|tuu|tii| tu|aaɗ|a h| no| di| fe|iiɗ|ama|inn|iin|iti|den|yan| da|go | hu|ank|guu|do |mii| ke|l n|a d|bel|imɓ|je |jey|yim|no |ugn|uug|ano|ine|non|nee|lit|lli|njo|edd| je|ŋde|aŋd|jaŋ|mɓe|ow | su|ent|wit|alt|i a|ago| ɗe|l h| ɗu|y g|gna|m t|nna|a a| ɓa|ɓam|amt|ind|ɗɗa|tde|aga|eɗe",
    "hau": "da | da|in |a k|ya |an |a d|a a| ya| ko| wa| a |sa |na | ha|a s|ta |kin|wan|wa | ta| ba|a y|a h|n d|n a|iya|ko |a t|ma |ar | na|yan|ba | sa|asa| za| ma|a w|hak|ata| ka|ama|akk|i d|a m| mu|su |owa|a z|iki|a b|nci| ƙa| ci| sh|ai |kow|anc|nsa|a ƙ|a c| su|shi|ka | ku| ga|ci |ne |ani|e d|uma|‘ya|cik|kum|uwa|ana| du| ‘y|ɗan|ali|i k| yi|ada|ƙas|aka|kki|utu|n y|a n|hi | ra|mut| do| ad|tar| ɗa|nda| ab|man|a g|nan|ars|and|cin|ane|i a|yi |n k|min|sam|ke |a i|ins|yin|ki |nin|aɗa|ann|ni |tum|za |e m|ami|dam|kan|yar|en |um |n h|oka|duk|mi | ja|ewa|abi|kam|i y|dai|mat|nna|waɗ|n s|ash|ga |kok|oki|re |am |ida|sar|awa|mas|abu|uni|n j|una|ra |i b| ƙu|dun|a ‘|cew|a r|aba|ƙun|ce |e s|a ɗ|san|she|ara|li |kko|ari|n w|m n|buw|aik|u d|kar| ai|niy| ne|hal|rin|bub|zam|omi| la|rsa|ubu|han|are|aya|a l|i m|zai|ban|o n|add|n m|i s| fa|bin|r d|ake|n ‘|uns|sas|tsa|dom| ce|ans| hu|me |kiy|ƙar| am|ɗin| an|ika|jam|i w|wat|n t|yya|ame|n ƙ|abb|bay|har|din|hen|dok|yak|n b|nce|ray|gan|fa |on | ki|aid| ts|rsu| al|aye| id|n r|u k|ili|nsu|bba|aur|kka|ayu|ant|aci|dan|ukk|ayi|tun|aga|fan|unc| lo|o d|lok|sha|un |lin|kac|aɗi|fi |gam|i i|yuw|sun|aif|aja| ir|yay|imi|war| iy|riy|ace|nta|uka|o a|bat|mar|bi |sak|n i| ak|tab|afi|sab",
    "bos": " pr| i |je |rav| na|pra|na |da |ma |ima| sv|a s|nje|a p| da| po|anj|a i|vo |va |ko |ja | u |ako|o i|no | za|e s|ju |avo| im|ti |sva|ava|i p|o n|li |ili|i s|van|ost| ko|vak|ih |ne |a u| sl|nja|koj| dr| ne|jed| bi|i d|ije|stv|u s|lob|im |slo| il|bod|obo| ra|sti|pri| je| su|vje|om |a d|se |e i| ob|a n|i i| se|dru|enj| os|voj|cij|e p|a b|su |o d|uje|u p|raz|i n|a o| od|lo |u o|ova|u i|edn|i u| nj|ovo|jen|lju|ni |oje|nos|a k|ran|dje|iti|o p|aci|žav|a j|i o|e o|pre|pro|bra|nih|ji | ka|e d|jeg|og |sta| tr|tre|bud|u n|drž|u z|rža|bit|svo|ija|elj|reb|e b|mij|jem|avn|pos| bu|ka |aju| iz|ba |ve |rod|de |aro|e u|iva|a z|em |šti|ilo|eni|lje|ći |red|bil|jel|jer| ni|odn|m i|du |tva|nar|gov| sa|oji| do|tu |vim|u d| st|o k|e n|a t|za |nim| dj| sm|ući|ičn|dna|i m|oda|vno|eba|ist|nac|e k|čno|nak|ave|tiv|eđu|nov|olj|sno|ani|aln|an |nom|i b|stu|nst|eno|oj |osn|a r|ovj|nap|smi|nog|čov|oja|nju|ara|nu |dno|ans|ovi|jan|edi|m s| kr|h p|tup| op| čo|iko|jek|tvo| vj| mi|tel|vu |obr|živ|tit|o o|una|odu| mo| ov|kri|ego|din|rug|nik|rad|pod|nji|sam|sto|lja|dst|rim|ite|riv| te|m n|vol|i v|e t|vni|akv|itu|g p| ta|ašt|zaš|svi|ao |te |o s|ak |mje|a č|odr|udu|kla|i t|avi|tno|nič| vr|nic|dni|u u|ina| de|oba|od |jih|st ",
    "hrv": " pr| i |je |rav|pra|ma | na|ima| sv|na |ti |a p|nje| po|a s|anj|a i|vo |ko |da |vat|va |no | za|i s|o i|ja |avo| u | im|sva|i p| bi|e s|ju |tko|o n|li |ili|van|ava| sl|ih |ne |ost| dr|ije| ne|jed|slo| ra|u s|lob|obo| os|bod| da| ko|ova|nja|koj|i d|atk|iti| il|stv|pri|om |im | je| ob| su| ka|i i|i n|e i|vje|i u|se |dru|bit|voj|ati|i o|ćen|a o|o p|a b|a n|ući| se|enj|sti|a u|edn|dje|lo |ćav| mo|raz|u p| od|ran|ni |rod|a k|su |aro|drć|svo|ako|u i|rća|a j|mij|ji |nih|eni|e n|e o| nj|pre|pos|ćiv|oje|eno|e p|nar|oda|nim|ovo|aju|ra |ći |og |nov|iva|a d|nos|bra|bil|i b|avn|a z|jen|e d|ve |ora|tva|jel|sta|mor|u o|cij|pro|ovi|za |jer|ka |sno|ilo|jem|red|em |lju|osn|oji| iz|aci| do|lje|i m| ni|odn|nom|jeg| dj|vno|vim|elj|u z|o d|rad|o o|m i|du |uje| sa|nit|e b| st|oj |tit|a ć|dno|e u|o s|u d|eću|ani|dna|nak|nst|stu| sm|e k|u u|an |gov|nju|juć|aln|m s|tu |a r|ćov|jan|u n|o k|ist|ću |te |tvo|ans|šti|nu |ara|nap|m p|nić|olj|bud| bu|edi|ovj|i v|pod|sam|obr|tel| mi|ina|zaš|e m|ašt| vj|ona|nji|jek| ta|duć|ija| ćo|tup|h p|oja|smi|ada| op|oso|una|sob|odu|dni|rug|udu|ao |di |avi|tno|jim|itu|itk|će |odr|ave|meć|nog|din|svi| ći|kak|kla|rim|akv|elo|štv|ite|vol|jet|opć|pot|tan|ak |nic|nac|uće| sk| me|ven",
    "nld": "en |de |an | de|van| va| en| he|ing|cht|der|ng |n d|n v|et |een| ge|ech|n e|ver|rec|nde| ee| re| be|ede|er |e v|gen|den|het|ten| te| in| op|n i| ve|lij| zi|ere|eli|zij|ijk|te |oor|ht |ens|n o|and|t o|ijn|ied|ke | on|eid|op | vo|jn |id |ond|in |sch| vr|aar|n z|aan| ie|rde|rij|men|ren|ord|hei|hte| we|eft|n g|ft |n w|or |n h|eef|vri|wor| me|hee|al |t r|of |le | of|ati|g v|e b|eni| aa|lle| wo|n a|e o|nd |r h|voo| al|ege|n t|erk| da| na|t h|sta|jke|at |nat|nge|e e|end| st|om |e g|tie|n b|ste|die|e r|erw|wel|e s|r d| om|ij |dig|t e|ige|ter|ie |gel|re |jhe|t d| za|e m|ers|ijh|nig|zal|nie|d v|ns |d e|e w|e n|est|ele|bes| do|g e|che|vol|ge |eze|e d|ig |gin|dat|hap|cha|eke| di|ona|e a|lke|nst|ard| gr|tel|min| to|waa|len|elk|lin|eme|jk |n s|del|str|han|eve|gro|ich|ven|doo| wa|t v|it |ove|rin|aat|n n|wet|uit|ijd|ze | zo|ion| ov|dez|gem|met|tio|bbe|ach| ni|hed|st |all|ies|per|heb|ebb|e i|toe|es |taa|n m|nte|ien|el |nin|ale|ben|daa|sti| ma|mee|kin|pen|e h|wer|ont|iet|tig|g o|s e| er|igd|ete|ang|lan|nsc|ema|man|t g|is |beg|her|esc|bij|d o|ron|tin|nal|eer|p v|edi|erm|ite|t w|t a| hu|rwi|wij|ijs|r e|weg|js |rmi|naa|t b|app|rwe| bi|t z|ker|ame|eri|ken| an|ar | la|tre|ger|rdi|tan|eit|gde|g i|d z|oep",
    "srp": " pr| i |rav|pra| na|na |ma | po|je | sv|da |a p|ima|ja |a i|vo |nje|va |ko |anj|ti |i p| u |ako|a s| da|avo|i s|ju |ost| za|sva|o i|vak| im|e s|o n|ava| sl|nja| ko|no |ne |li |om | ne|ili| dr|u s|slo|koj|a n|obo|ih |lob|bod|im |sti|stv|a o| bi| il| ra|pri|a u|og | je|jed|e p|enj|ni |van|u p|nos|a d|iti|a k|edn|i u|pro|o d|ova| su|ran|cij|i i|sta|se | os|e i|dru| ob|i o|rod|aju|ove| de|i n| ka|aci|e o| ni| od|ovo|i d|ve | se|eni|voj|ija|su |u i|žav|avn|uje| st|red|m i|dna|a b|odi|ara|drž|ji |nov|lju|e b|rža|tva|što|u o|oja| ov|a j|odn|u u|jan|poš|jen| nj|nim|ka |ošt|du |raz|a z| iz|sno|o p|vu |u n|u d|šti|osn|e d|pre|u z|de |ave|nih|bit|aro|oji|bez|tu |gov|lje|ičn| sa|lja|svo|lo |za |vno|e n|eđu| tr|nar| me|vim|čno|oda|ani|đen|nac|nak|an |to |tre|ašt| kr|stu|nog|o k|m s|tit|aln|nom|oj |pos|e u|reb| vr|olj|dno|iko|ku |me |nik| do|ika|e k|jeg|nst|tav|em |i m|sme|o s|dni|bra|nju|šen|ovi|tan|te |avi|vol| li|zaš|ilo|rug|var|kao|ao |riv|tup|st |živ|ans|eno|čov|štv|kla|vre|bud|ena| ve|ver|odu|međ|oju|ušt| bu|kom|kri|pod|ruš|m n|i b|ba |a t|ugi|edi| mo|la |u v|kak| sm|ego|akv|o j|rad|dst|jav|del|tvo| op|nu |por|vlj|avl|m p|od |jem|oje| čo|a r|sam|i v|ere|pot|o o|šte|rem|vek|svi| on|rot|e r",
    "ckb": " he| û |ên | bi| ma|in |na | di|maf|an |ku | de| ku| ji|xwe|her| xw|iya|ya |kes|kir|rin|iri| ne|ji |bi |yên|afê|e b|de |tin|e h|iyê|ke |es |ye | we|er |di |we |ê d|i b| be|erk|ina| na| an|î û|yê |eye|î y|kî |rke|nê |diy|ete|eke|ber|hem|hey| li| ci|wek|li |n d|fê | bê| te|ne |yî | se|net|rî |tew|yek|sti|af | ki|re |yan|n b|kar|hev|e k|aza|n û|wî | ew|i h|n k|û b|î b| mi| az|dan| wî|ekî|î a|a m|zad|e d|mir|bin|est|ara|iro|nav|ser|a w|adi|rov|n h|anê|tê |ewe|be |ewl|ev |mû | ya|tî |ta |emû| yê|ast|wle| tê|n m| bo|wey|s m|bo | tu|n j|ras| da| me|din|î d|ê h|n n|n w|ing|st | ke| ge|în |ar | pê|iye|îna|bat|r k|ema|cih|ê b|wed|û m|dî |û a|vak|ê t|ekh|par| ye|vî |civ|n e|ana|î h|ê k|khe|geh|nge|ûna|fên|ane|av |î m|bik|eyê|eyî|e û| re|man|erb|a x|vê |ê m|iva|e n|hî |bûn|kê | pa|erî|jî |end| ta|ela|nên|n x|a k|ika|f û|f h|î n|ari|mî |a s|e j|eza|tên|nek| ni|ra |ehî|tiy|n a|bes|rbe|û h|rwe|zan| a |erw|ov |inê|ama|ek |nîn|bê |ovî|ike|a n| ra|riy|i d|anî|û d|e e|etê|ê x|yet|aye|ê j|tem|e t|erd|i n|eta|ibe|a g|u d|xeb|atê|i m|tu | wi|dew|mal|let|nda|ewa| ên|awa|e m|a d|mam|han|u h|a b|pêş|ere| ba|lat|ist| za|bib|uke|tuk|are|asî|rti|arî|i a|hîn| hî|edi|nûn|anû|qan| qa| hi| şe|ine|n l|mên|ûn |e a",
    "yor": "ti | ní|ó̩ | è̩|ní | lá|̩n |o̩n|é̩ |wo̩|àn | e̩|kan|an |tí | tí|tó̩| kò|ò̩ |̩tó| àw| àt|è̩ |è̩t|e̩n|bí |àti|lát|áti| gb|lè̩|s̩e| ló| ó |àwo|gbo|̩nì|n l| a | tó|í è|ra | s̩|n t|ò̩k|sí |tó |̩ka|kò̩|ìyà|o̩ | sí|ílè|orí|ni |yàn|dè |̩‐è|ì k|̩ à|èdè| or|ún |ríl|è̩‐|í à|jé̩|‐èd|àbí|̩ò̩|ò̩ò|tàb|nì |í ó|n à| tà|̩ l|jo̩| ti|̩e |̩ t| wo|nìy|í ì|ó n| jé| sì|ló |kò |n è|wó̩| bá|n n|sì | fú|̩ s|í a|rè̩|fún| pé| òm|̩ni|gbà| kí| èn|ènì|in |òmì|ìí |ba |nir|pé |ira|mìn|ìni|n o|ràn|ìgb| ìg|bá |e̩ | rè|̩ n|kí |n e|un |gba|̩ p|í ò|nú | o̩|nín|gbé|yé | ka|ínú|a k|fi | fi|mo̩|bé̩|o̩d|dò̩|̩dò|ó s|i l|̩ o|̩ ì|wà |í i|i ì|hun|bò |i ò|dá |bo̩|o̩m|̩mo|̩wó|bo |áà |̩ k|ó j|ló̩|àgb|ohu| oh| bí| ò̩|bà |ara|yìí|ogb|írà|n s|ú ì| ìb|pò̩|í k| lè|bog|i t|à t|óò |yóò|kó̩|gé̩|à l|ó̩n|rú |lè | yó|̩ ò|̩ e|a w|̩ y|ò̩r|̩ f| wà|ò l|í t|ó b|i n|ó̩w|̩gb|yí |í w|ìké|̩ a|láà|wùj|àbò|i è|ùjo|fin|é̩n|n k|í e|i j|ú à| ìk|òfi| òf| ar|i s|mìí|ìír| mì| ir|rin|náà| ná|jú |̩ b| yì|ó t|̩é̩| i |̩ m|fé̩|kàn|rí |ú è|à n|wù |s̩é|é à| mú| èt|áyé|í g|̩kó|̩dá|è̩d|àwù|è̩k| ìd|irú|í o|i o|i à|láì|í n|ípa| kú|níp| ìm|a l|ké̩|bé |i g|de |ábé|ìn |báy|̩è̩|ígb|wò̩|níg|mú |láb| àà|n f|è̩s|̩ w|ùn |i a|ayé|èyí| èy|mó̩|á è| ni|n b| wó|je̩| ìj|gbá|ò̩n|ó̩g",
    "uzn": "lar|ish|an |ga |ar | va| bi|da |va |ir | hu|iga|sh |uqu|shi|bir|quq|huq|gan| bo| ha|ini|ng |a e|r b| ta|lis|ni |ing|lik|ida|oʻl|ili|ari|nin|on |ins| in|adi|nso|son|iy | oʻ|lan| ma|dir|hi |kin|har|i b|ash| yo|boʻ| mu|dan|uqi|ila|ega|qla|r i|qig|oʻz| eg|kla|a b|qil|erk|ki | er|oli|nli|at | ol|gad|lga|rki|oki|i h|a o| qa|yok|lig|osh|igi|ib |las|n b|atl|n m| ba|ara| qi|ri | sh|iya|ala|lat|in |ham|bil|a t|a y|bos|r h|siy|n o|yat|inl|ik |a q|cha|a h| et|eti|nis|a s|til|ani|h h|i v|mas|tla|osi|asi| qo|ʻli|ati|i m|rni|im |uql|arn|ris|qar|a i|gi | da|n h|ha |sha|i t|mla|rch| xa|i o|li |hun|bar|lin|ʻz |arc|rla| bu|a m|a a| as|mum| be| tu|aro|r v|ikl|lib|taʼ|h v|tga|tib|un |lla|mda| ke|shg| to|n q|sid|n e|mat|amd|shu|hga| te|tas|ali|umk|oya|hla|ola|aml|iro|ill|tis|iri|rga|mki|irl| ya|xal|dam| de|gin|eng|rda|tar|ush|rak|ayo| eʼ| so|ten|alq| sa|ur | is|imo|r t| ki|mil| mi|era|zar|hqa|aza|k b| si|nda|hda|kat|ak |oʻr|n v|a k|or |rat|ada|ʻlg|miy|tni|i q|shq|oda|shl|bu |dav|nid|y t|ch |asl|sos|ilg|aso|n t|atn|sin|am |ti |as |ana|rin|siz|yot|lim|uni|nga|lak|n i|a u|qon|i a|h k|vla|avl|ami|dek| ja|ema|a d|na | em|ekl|gʻi|si |i e|ino| ka|uch|bor|ker| ch|lma|liy|a v|ʼti|lli|aka|muh|rig|ech|i y|uri|ror",
    "ibo": "a n|e n|ke | na|na | ọ | bụ| n |nwe|ere|ọ b|re |nye| nk|ya |la | nw| ik| ma|ye |e ọ|ike|a o|nke|a m|ụ n| ya|a ọ|ma |bụl|ụla| on| a |e i|kik|iki|ka |ony|ta |bụ |kwa| nd|a i|i n|di |a a|wa |wer|do | mm|dụ |e a|ha | ga|any| ob|ndi| ok|he |e m|e o|a e|ọ n|ite|rụ |hi |mma|ga‐|wu |ara| dị|aka|che|oke|we |o n| ih|n o|adụ|mad|obo|bod|a g|odo| ka| ez|te |hị |be |ụta|dị | an|zi | oh|a‐e|akw|gba|i m|me | ak|u n|nya|ihe|ala|ohe|ghi|ri | ọz|her|ra |weg| nt| iw| mb|ba |pụt| si|ro |oro|iwu|chi|a‐a|rị |ụ i|ụ ọ| eb|iri|ebe|ụrụ|zọ | in|a y|ezi|e ị|kpa|le |ile|ịrị|n e|kpe|mba| ha|bi |sit|e e|inw|nil|asị| en|mak|a u| ni|apụ|chị|i i|ghị|i ọ|i o|si | e |ide|o i|e y|ụ m|a s|u o|kwu|ozu|yer|ru |enw|ụ o|ọzọ|gid|hụ |n a|ahụ|nkw|sor|egh|edo|a ụ|tar|n i|toz|ị o|pa |i a| me|ime|uru|kwe| mk|tu |ama|eny|uso|de | im|ọ d|osi|hed|a d| kw|mkp|wet| ọr| ọn|obi|ọrụ| ịk| to|gas| ch|ịch|nha|ọnọ|nọd| nc| al|n ụ|ị m| us|nọ |u ọ|nch| o |eta|n u| ot|otu|sir|sịr| nh|a k|ali|o m| ag| gb|e s|ọta|nwa|ị n|lit|ega|ji |ọdụ|e k|ban|e g|ị k|esi|agb|eme|hu |ikp|zu |pe |nta|na‐|chọ|u a|a b|uch|n ọ|onw|ram|kwụ|ekọ|i e| nọ| ug|ọch|u m|gwu|a h|zụz|ugw|meg|ị e|nat|e h|dịg|o y|kpu|pụr|cha|zụ |hịc|ich| ng|ach| og|wap|wan|ịgh|uwa| di| nn|i ị",
    "ceb": "sa | sa|ng |ang| ka|an | pa|ga | ma|nga|pag| ng|a p|on |kat|a k|ug |od | ug|g m| an|ana|n s|ay |ung|ata|ngo|a m|atu|ala|san|ag |tun|g s|g k|god|d s|a s|ong|mga| mg|g p|n u|yon|a a|pan|ing|usa|tan|tag|una|aga|mat|ali|g u|han|nan| us|man|y k|ina|non|kin| na|syo|lan|a b|asa|nay|n n|a i|awa| ta|taw|gaw|nsa|a n|nas| o |ban|agp|isa|dun|was|iya| gi|asy|adu|ini|bis| ad|ili|o s| bi|g a|nah|nag|a t| ki|lin|lay|ahi|sam|al |wal| di|nal|asu| ba|ano|agt| wa|ama|yan|a u| iy|kan|him|n k|gan|ags|n a|kag| un|ya |kas|gpa|g t| su|aha|wha|agk|awh|gka|a g|kal|l n|gla|gsa|sud|gal|imo|ud |d u|ran|uka|ig |aka|aba|ika|g d|ara|ipo|ngl|g n|uns|n o|kau|i s|y s|og |uta|d n|li | si|gik|g i|mta|ot |iin| la| og|o a|ayo|ok |awo|aki|kab|aho|n m|hat|o p|gpi|a w|apa|lip|ip | hu| ga|a h|uba|na | ti|bal|gon|la |ati|wo |ad |hin|sal|gba|buh| bu| ub|uha|agb|hon|ma |nin|uga|t n|ihi| pi|may| pu|mak|ni | ni|d a|pin|abu|agh|ahu|uma|as |dil|say| in|at |ins|lak|hun|ila|mo |s s|sak|amt|o u|pod|ngp|tin|a d|but|ura|lam|aod|t s|bah|ami|aug|mal|sos|os |k s| il|tra| at|gta|bat|aan|ulo|iha|ha |n p| al|g b|lih|kar|lao|agi|amb|mah|ho |sya|ona|aya|ngb|in |inu|a l| hi|mag|iko|it |agl|mbo|oon|tar|o n|til|ghi|rab|y p| re|yal|aw |nab|osy|dan",
    "tgl": "ng |ang| pa|an |sa | sa|at | ka| ng| ma|ala|g p|apa| na|ata|pag|pan| an| at|ay |ara|ga |a p|tan|g m|mga| mg|n n|pat| ba|n a|aya|na |ama|g k|awa|kar|a k|lan|rap|gka|nga|n s|g n|aha|g b|a a| ta|agk|gan|tao|asa|aka|yan|ao |a m|may|man|kal|ing|a s|nan|aga| la|ban|ali|g a|ana|y m|kat|san|kan|g i|ong|pam|mag|a n|o a|baw|isa|wat| y |lay|g s|y k|in |ila|t t| ay|aan|o y|kas|ina|t n|ag |t p|wal|una|yon| o | it|nag|lal|tay|pin|ili|ans|ito|nsa|lah|kak|any|a i|nta|nya|to |hay|gal|mam|aba|ran|ant|agt|on |t s|agp| wa| ga|gaw|han|kap|o m|lip|ya |as |g t|hat|y n|ngk|ung|no |g l|gpa|wa |lag|gta|t m|kai|yaa|sal|ari|lin|a l|pap|ahi| is| di|ita| pi|pun|agi|ipi|mak|a b|y s|bat|yag|ags|o n|aki|tat|pah|la |gay|hin| si|di |i n|sas|iti|a t|t k|mal|ais|s n|t a|al |ipu|ika|lit|gin| ip|ano|gsa|alo|nin|uma|hal|ira|ap |ani|od |i a|gga|y p|par|tas|ig |sap|ihi|nah|ini| bu|ngi|syo|o s|nap|o p|a g| ha|uka|a h|aru|a o|mah|iba|asy|li |usa|g e|uha|ipa|mba|lam|kin|kil|duk|n o|iga| da|dai|aig|igd|gdi|pil|dig|pak| tu|d n|sam|nas|nak|ba |ad |lim|sin|buh|ri |lab|it |tag|g g|lun|ain|and|nda|pas|kab|aho|lig|nar|ula| ed|edu| ib|git|ma |mas|agb|ami|agg|gi |sar|i m|siy|g w|api|pul|iya|amb|nil|agl|sta|uli|ino|abu|aun|ayu| al|iyo",
    "hun": " sz| a |en | va|és | és|min|ek | mi| jo|jog|ind|an |nek|sze|ság| az|gy |sza|nde|ala|az |den|a v|val|ele| el|oga|mél|egy| eg|n a|ga |zab| me|zem|emé|aba|int|van|bad|tel|tet| te|ak |tás|ény|t a| ne|gye|ély|tt |n s|ben|ség|zet|lam|meg|nak|ni | se|ete|sen|agy|let|lyn|s a|yne|ra |z e|et | al|mel|kin|k j|eté|ok |tek| ki|vag|re |n m|oz |hoz|ez |s s|ett|gok|ogy| kö|mbe|es |em |nem|ely| le|ell|emb|hog|k a|atá|köz|nt | ho|yen|hez|el |z a|len|dsá|ásá|tés|ads|k m| ál| em|a s|nte|a m|szt|a t|áll|ás |y a|ogo|sem|a h|enk|nye|ese|nki|ágo|t s|lap|ame|ber|ló |k é|nyi|ban|mén|s e|i m|t m| vé|lla|ly |ébe|lat|ág |ami|on |mze|n v|emz|fel|a n|lő |a a|eki|eri|yes| cs|lle|tat|elő|nd |i é|ég |ésé|lis|yil|vet|át |kül|ért| ke|éte|rés|l a|het|szo|art|alá| ny|tar|koz| am|a j|ész|enl|elé|ól |s k|tár|s é|éle|s t|lem|sít|ges|ott| fe|n k|tko|zás|t é|kel|ja | ha|aló|zés|nlő|ése|ot |ri |lek|más|tő |vel|i j|se |ehe|tes|eve|ssá|tot|t k|olg|eze|i v|áza|leh|n e|ül |tte|os |ti |atk|zto|e a|tos|ány|ána|zte|fej|del|árs|k k|kor|ége|szá|t n| bi|zat|véd|nev|elm|éde|zer|téb|biz|rra|ife|izt|ere|at |ll |k e|ny |sel| né|ába|lt |ai |sül|ház|kif|t e| ar|leg|d a|is |i e|arr|t t|áso|it |ető|al | má|t v| bá|bár|a é|esü|lye|m l| es|nyo",
    "azj": " və|və |ər |lar| hə|in |ir | ol| hü| bi|hüq|üqu|quq|na |lər|də |hər| şə|bir|an |lik| tə|r b|mal|lma|ası|ini|r h|əxs|şəx|ən |arı|qla|a m|dir|aq |uqu|ali| ma|una|ilə|ın |yət| ya|ara|ikd|əri|ar |əsi|əti|r ş|rin|yyə|n h| az|dən|nin|ərə|tin|iyy|mək|zad| mü|sin| mə|ni |nda|ət |ndə|aza|rın|ün |ını|ə a|i v|nın|olu|qun| qa| et|ilm|lıq|ə y|ək |lmə|lə |kdi|ind|ına|olm|lun|mas|xs |sın|ə b| in|n m|q v|nə |əmi|n t|ya |da | bə|tmə|dlı|adl|bər| on|əya|ə h|sı |nun|maq|dan|inə|etm|un |ə v|rlə|n b|si |raq| va|ə m|n a|ınd|rı |anı| öz|əra|nma|n i|ama|a b|irl|ala|li |ins|bil|ik | al| di|ığı|ə d|lət|il |ələ|ə i|ıq |nı |nla|dil|müd|n v|ə e|unm|alı| sə|xsi|ə o|uq |uql|nsa|ətl| də|ili|üda|asi| he|ola|san|əni|məs| da|lan| bu|tər|həm|dır|kil|iş |u v| ki|min|eyn|mi |yin| ha|sos|heç|bu |eç | ed|kim|lığ|alq|xal| as|sia|osi|r v|q h|rə |yan|i s| əs|daf|afi| iş|ı h|fiə| ta|ə q|ıql|a q|yar|sas|lı |ill|mil|əsa|liy|tlə|siy|a h|məz|tün|ə t| is|ist|iyi| so|n ə|al |ifa|ina|lıd|ı o|ıdı|əmə|ır |ədə|ial| mi|əyi|miy|çün|n e|iya|edi| cə| bü|büt|ütü|xil|üçü|mən|adə|t v|a v|axi|dax|r a|onu| üç|seç| nə| se|man|ril|sil|əz |iə |öz |ılı|aya|qan|i t|şər|təm|ulm|rəf|məh| xa|ğın| dö| ni|sti|ild|amə|qu |nam|n o|n d|var|ad |zam|tam|təh",
    "ces": " pr| a |ní | ne|prá|ráv|ost| sv| po|na |ch |ho | na|nos|o n| ro|ání|ti |vo |neb|ávo|má |bo |ebo| má|kaž| ka|ou |ažd| za| je|dý |svo|ždý| př|a s| st|sti|á p| v |obo|vob| sp|bod| zá|ých|pro|rod|ván|ení|né |ý m|ého| by| ná|spo|ně |o p|mi |í a|ter|roz|ová|to | ja| li|áro|nár|by |jak|a p|a z|ny | vš|kte|i a|lid|ím |o v|í p|u p|mu |at | vy|odn| so| ma|a v| kt|í n|zák|li |oli|ví |kla|tní|pod|stá|en |do |t s|mí |je |em |áva| do|byl| se|být|í s|rov| k |čin| ve|ýt |í b|it |dní|vše|pol|o s| bý|tví|nýc|stn|nou|ejn|sou|ran|ci |vol|se |nes|a n|pří|eho|ným|tát|va |ním|mez|ají|i s|stv|ké |ích|ečn|žen|e s|vé |ova|své|ým |kol|du |u s|jeh|kon|ave|ech|eré|nu | ze|i v|o d|í v|hra|ids|m p|ému|ole|y s| i |maj|o z| to|aby|sta| ab|m a|pra| ta|chn| ni|že |ovn|ako|néh|len|dsk|rac|lad|chr| že|vat| os|sob|aké|i p|smí|esm|st |i n|m n|a m|lně|lní|při|bez|dy |áln|ens|zem|t v|čen|leč|kdo|ými| ji|oci|i k| s |í m|jí | či|áv |ste|och| oc|vou|ákl| vz|rav|odu|nez|inn|ský|nit|ivo|a j|u k|iál| me|ezi|ské|ven|stu|u a|tej|oln|slu|zen|í z|y b|oko|zac|níc|jin|ky |a o|řís|obe|u v|tak|věd|oje| vý|ikd|h n| od|čno|oso|ciá|h p| de|a t|ům |soc|jíc|odů|něn|adn|tup|dů |děl|jno|kéh|por|ože|hov|aci|nem|é v|rok|i j|u o|od |ího|vin|odi",
    "plt": "ny |na |ana| ny|y f|a n|sy |aha|ra |a a| fa|n n|y n|a m|an | fi|tra|any| ma|han|nan|ara|y a| am|ka |in |y m|ami|olo| ts|lon|min| mi| sy| na|a t| ol|fan| ha|a i|man|iza| iz|ina|ona|y h|aka|o a|ian|a h|reh|etr|a s|het|on |a f|ire|fah|tsy|mba| ar| hi|zan|ay |ndr|y o|ira|y t| an|ehe|o h|afa|y i|ren|ran| zo|ena|amb|dia|ala|amp|zo |ika| di|tan|y s|y z| az|ia |m p|rin|jo |n j| jo| dr|zy |ry |a d|ao |and|dre|haf|nen|mpi|rah| ka|eo |n d| ir|ho |am |rai|fa |elo|ene|oan|omb| ta| pi| ho|ava|azo|dra|itr|iny|ant|tsi|zon|asa|tsa| to|ari|ha |a k|van|n i|fia|ray| fo|mbe|ony|sa |isy|azy|o f|lal|ly |ova|lom| vo|nat|fir|sam|oto|zay|mis|ham|bel| ra|a r|ban|kan|iha|nin|a e|ary|ito| he| re| no|ita|voa|nam|fit|iar| ko|tok|isa|fot|no |otr|mah|aly|har|y v|y r| sa|o n|ain|kam|aza|n o|oka|ial|ila|ano|atr|oa | la|y l|eri|y d|ata|hev|sia|pia|its|reo| ao|pan|anj|aro|tov|nja|o s|fam|pir| as|ty |nto|oko|y k|sir|air|tin|hia|ais|mit|ba | it| eo|o t|mpa|kon|a z|a v|ity|ton|rak|era|ani|ive|mik|ati|tot|vy |hit|hoa|aho|ank|ame|ver|vah|tao|o m|ino|dy |dri|oni|ori| mo|hah|nao|koa|ato|end|n t| za|eha|nga|jak|bar|lah|mia|lna|aln|va | mb|lan| pa|aov|ama|eve|za |dro|ria|to |nar|izy|ifa|adi|via|aja| va|ind|n k|idi|fiv|rov|vel",
    "mad": "an |eng|ban|ng | sa| ka|dha| ba|ren|ak |ang| se| ha|hak| dh|na | pa|se |adh|a s|aba|n s|ara|ngg|are|ha |aga|sa | or|ore|asa|sar|ana| ma|aan|a k|ale|gi | ag|gad|a b|n o|n k|eba|ala|ra |gan| ke|dhu|ota|aja|bas|n b|ka |man|tab|dhi|beb|sab|ama|ako|abb|at |ggu|nga| ta|pan|wi |huw|uwi|eka|ata|a d|san| ot|agi|lak|hal|ba |bba|i h|ong|em |kab|g a|lem|a o| pe| na|ane|par|ngs|nge|gar|a a|tan|gsa|a p|ran|i s|k h|n p|uy |guy|ken|n a|al |ada| ga|apa|pon|e d| e |nek| an|g s|ta |kaa|on |kal|a m|ssa|ona|abe|kat| la|a e|e e|sal|ate|jan|ri |nan|lab|asi|sad|i p|e a|lan|aka|a h|ari| bi|ena|si |daj| ng|ton|e k|har|oss|gen|i k|g k|car|ase|ano|era|kon| be|nya|n d|nag|bad|ar |epo| da|mas| kl| al|n t|mat|nos|n n|ela|g e|a n|k k|uwa|adi|pad|ggi|uan|i d|ne | so|hi |sae|oan|wan|as |le |gap|ter|yat|om |kla|k a|e b|ina|ah |k s|koa|i a|ega|neg|n h|m p|aha| as| ja|abi|ma |kas|bi | mo|aon| di|one| ep|per|aya|e s|nto|te |bat|epa|nda|n e| ca|int|pam|di |ann| ra|aen|k d|amp|a t|nta|and|e p|rga|pen|yar|mpo|ste|dra|ok |oko|ila|g p|k b|i b|set|to |isa|nao|nna|n m|ett| a |bis|hid|bin|i m|nas| ho|kar|t s| po|dil| to|aju|ika|kom|arg|ant|raj|a l|das|tto|ost|mos|lae|ga |rek|idh|tad|hig|en |rny|arn|ndh|eta|adu| dr|jat|jua|gam",
    "nya": "ndi|ali|a k|a m| ku| nd|wa |na |nth| mu| al|yen|thu|se |ra |nse|hu |di |a n|la | pa|mun| wa|nga|unt| la|a u|u a|e a|ons|za | ma| lo|iye|ace|ce |a l|idw|ang| ka|kha|liy|ens|li |ala|ira|ene|pa |i n|we |e m|ana|dwa|era|hal|ulu|lo |ko |dzi| ci|yo |o w|iko|ga |a p|chi| mo|lu |o l|o m|oyo|ufu| um|moy|zik| an|ner|and|umo|ena| uf|dan|iri|ful|a a|ka |to |hit|nch| nc|a c|ito|fun|dwe| da|kuk|wac| dz|e l|a z|ape|kap|u w|e k|ere|ti |lir| za|pen|tha|aye|kut|mu |ro |ofu|ing|lid| zo|amu|o c|i m|mal|kwa|mwa|o a|eza|i p|o n|so |i d|lin|nso| mw|iro|zo | a |ati| li|i l|a d|ri |edw|kul|una|uti|lan|a b|iki|i c|alo|i k| ca|lam|o k|dza|ung|o z|mul|ulo|uni|gan|ant|nzi| na|nkh|e n|san|oli|wir|tsa|u k|ome|ca |gwi|unz|lon|dip|ipo|yan|gwe|pon|akh|uli|aku|mer|ngw|cit| po| ko|kir|mba|ukh|tsi|bun|iya|ope|kup|bvo|han| bu|pan|ame|vom|ama| ya|siy| am|rez|u n|zid|men|osa|ao |pez|i a| kw| on|u o|lac|ezo|aka|nda|hun|u d|ank|diz|ina|its|adz| kh|ne |nik|e p|o o|ku |phu|eka| un|eze|mol|ma | ad|pat|oma|ets|wez|kwe|kho|ya |izo|sa |o p|kus|oci|khu|okh|ans|awi|izi|zi |ndu|iza|no |say| si|i u|aik|jir|ats|ogw|du |mak|ukw|nji|mai|ja |sam|ika|aph|sid|isa|amb|ula|osi|haw|u m| zi|oye|lok|win|lal|ani| ba|si | yo|e o|opa|ha |map|emb",
    "qug": "una|ta | ka|na |ka |ash|cha|a k|ari|ish|kun|kta|ana|pak|hka|shk|apa|mi |ach|hay|akt|shp|man|ak | ch| ha|rin|ata|tak|lla|ita|ami|ama|aku|har| pa|pas|ayñ|yñi|ina| ma| ru|uku|sh |hpa|run|all|kuy|aka|an | tu|tuk|yta|chi|chu|a c|ñit|in |nak|a h|nka|ris|tap|kan| ki|ayt|pi | sh|pa |i k|a p|nap|kam|kaw|pay|nam|ayp|aws|iri|wsa|a s|ank|nta|uy |a t|hin|a m|ay | li|ant|lia|kay|nat|a r|shi|iak|lak|uya| wa|yuy|say|kis|y r|ypa|hun|a a| yu|n t|tam| ti|yay|n k| ya|a w|hpi|lli| al|api|yku|un |ipa|a i|iku|ayk|shu| sa|ush|pir|ich|kat|hu |huk| il|ill|kas|a y|rik|yac|a l| ku|kac|hik|tan|wan|ypi|ink|ika| ni|ila|ima|i c|yll|ayl| wi|mac|nis| ta|i y|kus|tin|n s|i p|yan|llu|la |iks|tik|kpi| pi|awa|may|lan|li | ri|kll|yas|kin|kak|aya|ksi|k h|aym|war|ura| ay|lat|ukt|i t|iya|ull|mas|sha|kir|uch|h k|nch|akp|uma|pip|han|kik|iki|riy|aki| ii|i s|n p|h m|kar|nal|y h|tac| su|nac|mak|n m|nki|k a|mam|iwa|k t|k k|i m|yma| ña|wil|asi|nmi|kap|pal|sam|pam|k i|k l|i i|pan|sum|i w| hu|his| mu|iia|mun|k m|u t|pik|was|ik |ma |hat|k r|akl|huc| im|mal|uyk|imi|n y|anc|y k|a n|iñi| iñ|wak|unk|yka| mi|iña|a u|has|ywa| ak|llp|ian|ha |tar|rmi|i a|arm|las|ati|pur|sak|ayw|hap|yar|uti|si |iyt|uri|kim| ar|san|h p|akk|iy |wat|wpa|y i|u k",
    "kin": "ra | ku| mu|se |a k|ntu|nga|tu |umu|ye |li | um|mun|unt|a n|ira| n |ere|wa |we | gu|mu |ko |a b|e n|o k|e a|a u|a a|u b|e k|ose|uli|aba|ro | ab|gom|e b|ba |ugu| ag|omb|ang| ib|eng|mba|o a|gu | ub|ama| by| bu|za |ihu|ga |e u|o b| ba|kwi|hug|ash|ren|yo |ndi|e i| ka| ak| cy|iye| bi|ora|re |gih|igi|ban|ubu| nt| kw|di |gan|a g|a m|aka|nta|aga| am|a i|ku |iro|i m|ta |ka |ago|byo|ali|and|ibi|na |uba|ili| bw|sha|cya|u m|yan|o n| ig|ese|no |obo|ana|ish|kan|sho| we|era|ya |aci|wes|ura|i a|uko|e m|n a|o i|kub|uru|hob|ber|ran|bor| im|ure|u w|wo |cir|gac|ani|bur|u a|o m|ush| no|e y| y |rwa|eke|nge|ara|wiy|uga|zo |ne |ho |bwa|yos|anz|aha|ind|mwe|teg|ege|are|ze |n i|rag|ane|u n|ge |mo |u k|bul| uk|bwo|bye|iza|age|ngo|u g|gir|ger|zir|kug|ite|bah| al| ki|uha|go |mul|ugo|n u|tan|guh|y i| ry|gar|bih|iki|atu|ha |mbe|bat|o g|akw|iby|imi|kim|ate|abo|e c|aho|o u|eye|tur|kir| ni|je |bo |ata|u u| ng|shy|a s|gek| ru|iko| bo|bos|i i| gi|nir|i n|gus|eza|nzi|i b|kur| ya|o r|ung|rez|ugi|ngi|nya| se|mat|eko|o y| in|uki| as|any|bis|ako|gaz|imw|rer|bak|ige|mug|ing|byi|kor|eme|nu | at|bit| ik|hin|ire|kar|shi|yem|yam| yi|gen|tse|ets|ihe|hak|ubi|key|rek|icy| na|bag|yer| ic|eze|awe|but|irw| ur|fit|ruk|ubw|rya|uka|afi",
    "zul": "nge|oku|lo | ng|a n|ung|nga|le |lun| no|elo|wa |la |e n|ele|ntu|gel|tu |we |ngo| um|e u|thi|uth|ke |hi |lek|ni |ezi| ku|ma |nom|o n|pha|gok|nke|onk|a u|nel|ulu|oma|o e|o l|kwe|unt|ang|lul|kul| uk|a k|eni|uku|hla| ne| wo|mun| lo|kel|ama|ath|umu|ho |ela|lwa|won|zwe|ban|elw|ule|a i| un|ana|une|lok|ing|elu|wen|aka|tho|aba| kw|gan|ko |ala|enz|o y|khe|akh|thu|u u|na |enk|kho|a e|zin|gen|i n|kun|alu|mal|lel|e k|nku|e a|eko| na|kat|lan|he |hak| ez|o a|kwa|o o|ayo|okw|kut|kub|lwe| em|yo |nzi|ane|obu| ok|eth|het|ise|so |ile|nok| ba|ben|eki|nye|ike|i k|isi| is|aph|esi|nhl|mph| ab|fan|e i|isa| ye|nen|ini|ga |zi |fut| fu|uba|ukh|ka |ant|uhl|hol|ba |and|do |kuk|abe|za |nda| ya|e w|kil|the| im|eke|a a|olo|sa |olu|ith|kuh|o u|ye |nis| in|ekh|e e| ak|i w|any|khu|eng|eli|yok|ne |no |ume|ndl|iph|amb|emp| ko|i i| le|isw|zo |a o|emi|uny|mel|eka|mth|uph|ndo|vik| yo|hlo|alo|kuf|yen|enh|o w|nay|lin|hul|ezw|ind|eze|ebe|kan|kuz|phe|kug|nez|ake|nya|wez|wam|seb|ufa|bo |din|ahl|azw|fun|yez|und|a l|li |bus|ale|ula|kuq|ola|izi|ink|i e|da |nan|ase|phi|ano|nem|hel|a y|hut|kis|kup|swa|han|ili|mbi|kuv|o k|kek|omp|pho|kol|i u|oko|izw|lon|e l| el|uke|kus|kom|ulo|zis|hun|nje|lak|u n|huk|sek|ham| ol|ani|o i|ubu|mba| am",
    "swe": " oc|och|ch |er |ing|för|tt |ar |en |ätt|nde| fö|rät|ill|et |and| rä| en| ti| de|til|het|ll |de |om |var|lig|gen| fr|ell|ska|nin|ng |ter| ha|as | in|ka |att|lle|der|sam| i |und|lla|ghe|fri|all|ens|ete|na |ler| at|ör |den| el|av | av| so|igh|r h|nva|ga |r r|env|la |tig|nsk|iga|har|t a|som|tti| ut|ion|t t|a s|nge|ns |a f|r s|män|a o| sk| si|rna|isk|an | st|är |ra | vi| al|t f| sa|a r|ati| är| me| be|n s| an|tio|nna|lan|ern|t e|med| va|ig |äns| åt|sta|ta |nat| un|kli|ten| gr|vis|äll| la|one|han|änd|t s|stä|t i|ner|ans|gru| ge|ver| må| li|lik|ihe|ers|rih|r a| re|må |sni|n f|t o| mä| na|r e|ri |ad |ent|kla|det| vä|run|rkl|da |h r|upp|dra|rin|igt|dig|n e|erk|kap|tta|ed |d f|ran|e s|tan|uta|nom|lar|gt |s f| på| om|kte|lin|r u|vid|g o|änn|erv|ika|ari|a i|lag|rvi|id |r o|s s|vil|r m|örk|ot |ndl|str|els|ro |a m|mot| mo|i o|på |r d|on |del|isn|sky|e m|ras| hä|r f|i s|a n|nad|n o|gan|tni|era|ärd|a d|täl|ber|nga|r i|enn|nd |n a| up|sin|dd |örs|je |itt|kal|n m|amt|n i|kil|lse|ski|nas|end|s e| så|inn|tat|per|t v|arj|e f|l a|rel|t b|int|tet|g a|öra|l v|kyd|ydd|rje| fa|bet|se |t l|lit|sa |när|häl|l s|ndr|nis|yck|h a|llm|lke|h f|arb|lmä|nda|bar|ckl|v s|rän|gar|tra|re |ege|r g|ara|ess|d e|vär|mt |ap ",
    "lin": "na | na| ya|ya |a m| mo|a b|to | ko| bo|li |o n| li|i n| pe|i y|a y|a n|ngo|ki | ba| ma|kok|pe |la |a l|zal|oki|ali|nso|oto|ala|ons|so |mot|a k|nyo|eng|kol|go |nge| ny|yon|o e|ang|eko|te |o y|oko|olo|ma |iko|a e|e m|e b|lik|ko |o a|ako|ong| ye|mak|ye |isa| ek|si |lo |aza|sal|ama| te|bat|o p|oyo|e n| az|a p|ani|sen|o m|ela|ta |amb|i k|ban|ni | es|yo |mi |mba|osa| oy|aka|lis|i p|eli|a t|mok|i m|ba |mbo| to| mi|isi|bok|lon|ato|ing|o b| nd|ota|bot| ez|ge |nga|eza|o t|nde|ka |bo |gel|kan|e k|lam|sa |ese|koz| po|den|ga |oba|omb|oli|yan|kop|bon|mos|e e|kob|oka|kos|bik|lin|po |e a| lo| bi|kot|‘te|ngi|sam| ‘t|omi|e y|ti |i b| el|elo|som|lok|esa|gom|ate|kam|i t|ika|a s|ata|kat|ati|wa |ope|oza|iki|i e| ka|bom|tal|o l|bek|zwa|oke|pes| se|bos|o o|ola|bak|lak|mis|omo|oso|nza| at|nda|bal|ndi|mu |mob|osu|e t|asi|bis|ase|i l|ele|sus|usu|su |ozw|and|mol|tel|lib|mbi|ami| nz|ne |ene|kel|aye|emb|yeb|nis|gi |obo|le |kum|mal|wan|a ‘|pon| ep|baz|tan|sem|nya|e l| ta|gis|opo|ana|ina|tin|obe| ti|san| ak|mab|bol|oku|u y|mat|oti|bas|ote|mib|ebi|a o|da |bi | mb|lel|tey|ibe|eta|boy|umb|e p|eni|za |be |mbe|bwa|ike|se | et|ibo|eba|ale|yok|kom| en|i a|mik|ben|i o| so|gob|bu |son|sol|sik|ime|eso|abo| as|kon|eya|mel",
    "som": " ka|ay |ka |an |uu |oo |da |yo |aha| iy|ada|aan|iyo|a i| wa| in|sha| ah| u |a a| qo|ama| la|hay|ga |ma |aad| dh| xa|ah |qof|in | da|a d|aa |iya|a s|a w| si| oo|isa|yah|eey|xaq|ku | le|lee| ku|u l|la |taa| ma|q u|dha|y i|ta |aq |eya|sta|ast|a k|of |ha |u x|kas|wux| wu|doo|sa |ara|wax|uxu| am|xuu|inu|nuu|a x|iis|ala|a q|ro |maa|o a| qa|nay|o i| sh| aa|kal|loo| lo|le |a u| xo| xu|o x|f k| ba|ana|o d| uu|iga|a l|yad|dii|yaa|si |a m|gu |ale|u d|ash|ima|adk|do |aas| ca|o m|lag|san|dka|xor|adi|add| so|o k| is|lo | mi|aqa|na | fa|soo|baa| he|kar|mid|dad|rka|had|iin|a o|aro|ado|aar|u k|qaa| ha|ad |nta|o h|har|axa|quu| sa|n k| ay|mad|u s| ga|eed|aga|dda|hii|aal|haa|n l|daa|xuq|o q|o s|uqu|uuq|aya|i k|hel|id |n i| ee|nka| ho|ina|waa|dan|nim|elo|agu|ihi|naa|mar|ark|saa|riy|rri|qda|uqd| bu|ax |a h|o w|ya |ays|gga|ee |ank| no|n s|oon|u h|n a|ab |haq|iri|o l| gu|uur|lka|laa|u a|ida|int|lad|aam|ood|ofk|dhi|dah|orr|eli| xi|ysa|arc|rci|to |yih|ool|kii|h q|a f| ug|ayn|asa| ge|sho|n x|siy|ido|a g|gel|ami|hoo|i a|jee|n q|agg|al | di| ta|e u|o u| ji|goo|a c|sag|alk|aba|sig| mu|caa|aqo|u q|ooc|oob|bar|ii |ra |a b|ago|xir|aaq| ci|dal|oba|mo |iir|hor|fal|qan| du|dar|ari|uma|d k|ban|y d|qar|ugu| ya|xay|a j",
    "hms": "ang|gd |ngd|ib | na|nan|ex |id | ji|ad |eb |nl |b n|d n| li|ud |jid| le|leb| ga|ot |anl|aot|d g|l l|b l| me|ob |x n|gs |ngs|mex|nd |d d| ne|jan|ul | ni|nja| nj| gu| zh|lib|l n|ong| gh|gao|b j|b g|nb |l g|end|gan| ad| je|jex|ngb|gb |han|el | sh| da|ub |d j|d l|t n| nh|nha|b m|is |d z|x g| ya|oul|l j| wu|she|il |nex| ch|b y|d s|gue|gho|uel|wud|d y| gi|d b|hob|nis|s g| zi| yo|lie|es |nx |it |aob|gia|ies| de|eib|you| ba| hu|ian|zib|d m|s j|oud|b d|chu|ol |ut | do|t j|nen|hud|at |s n|hen|iad|ab |enl| go|dao| mi|t g|zha|b z|enb|x j| ze|eit|hei|d c|nt |b s| se|al | xi|inl|hao| re| fa|d h|gua|yad|ren| ho|anb|gx |ngx|ix |nib|x z|and|b h|b w|fal| xa|d x|t l|x m|don|gou|bao|ant|s z|had|d p|yan|anx|l d|zhe|hib| pu|ox | du|hui|sen|uib|uan|lil|dan|s m| di| we|gha|xin|b x|od |zhi|pud| ju| ng|oub|xan| ge|t z|hub|t h|hol|t m|jil|hea|x l| ma|eud|jul|enx|l z|l s|b a| lo| he|nga|d r|zen| yi|did|hon|zho|gt |heb|ngt|os |d a|s l|aos| si|dei|dud|b b|geu|wei|d w|x c|x b|d k|dou|l h|lou| bi|x a|x d|b c| sa|s a| bo|eut|blo| bl|nia|lol|t w|bad|aod| qi|ax |deb| ja|eab| nd|x s|can|pao| pa|gl |ngl|che|sat|s y|l m|t s|b f|heu|s w| to|lia| ca|aox|unb|ghu|ux | cu|d f|inb|iel| pi|jib|t p|x x|zei|eul|l t|l y|min|dad",
    "ilo": "ti |iti|an |nga|ga | ng| pa| it|en | ka| ke| ma|ana| a | ti|pan|ken|agi|ang|a n|a k|aya|gan|n a|int|lin|ali|n t|a m|dag|git|a a|i p|teg|a p| na|nte|man|awa|kal|da |ng |ega|ada|way|nag|n i| da|na |i k|sa |n k|ysa|n n|no |a i|al |add|aba| me|i a|eys|nna|dda|ngg|mey| sa|pag|ann|ya |gal| ba|mai| tu|gga|kad|i s|yan|ung|nak|tun|wen|aan|nan|aka| ad|enn| ag|asa| we|yaw|i n|wan|nno|ata| ta|l m|i t|ami|a t| si|ong|apa|kas|li |i m|ina| an|aki|ay |n d|ala|gpa|a s|g k|ara|et |n p|at |ili|eng|mak|ika|ama|dad|nai|g i|ipa|in | aw|toy|oy |ao |yon|ag |on |aen|ta |ani|ily|bab|tao|ket|lya|sin|aik| ki|bal|oma|agp|ngi|a d|y n|iwa|o k|kin|naa|uma|daa|o t|gil|bae|i i|g a|mil| am| um|aga|kab|pad|ram|ags|syo|ar |ida|yto|i b|gim|sab|ino|n w| wa| de|a b|nia|dey|n m|o n|min|nom|asi|tan|aar|eg |agt|san|pap|eyt|iam|i e|saa|sal|pam|bag|nat|ak |sap|ed |gsa|lak|t n|ari|i u| gi|o p|nay|kan|t k|sia|aw |g n|day|i l|kit|uka|lan|i d|aib|pak|imo|y a|ias|mon|ma | li|den|i g|to |dum|sta|apu|o i|ubo|ged|lub|agb|pul|bia|i w|ita|asy|mid|umi|abi|akd|kar|kap|kai| ar|gin|kni| id|ban|bas|ad |bon|agk|nib|o m|ibi|ing|ran|kda|din|abs|iba|akn|nnu|t i|isu|o a|aip|as |inn|sar| la|maa|nto|amm|idi|g t|ulo|lal|bsa|waw|kip|w k|ura|d n|y i",
    "uig": "ish| he|ini|ing|nin|gha|ng |ili| we|we |sh |in | bo|quq|oqu|ni |hoq| ho|ush|shi|lik|qil|bol|shq|en |lis|qa |hqa|n b|hem| qi|ki |dem|iy | ad|ade|igh|e a|em |han|liq|et |ge |uq |nda|din| te| bi|idi|let|qan|nli|ige|ash|tin|ha |kin|iki|her|de | er| ba|and|iti|olu|an | dö|döl|aq |luq| ya|me |lus|öle|mme|emm| qa|daq|rki|lgh|erq|erk|shk|esh|rqa|iq |uqi|ile|rim|i w|er |ik |yak|aki|ara|a h| be|men| ar|du |shu|uql|hri|hi |qlu|q h|inl|lar|da |i b|ime| as|ler|etl|nis| öz|ehr|lin|e q|ar |ila| mu|len| me|qi |asi|beh|a b|ayd|q a|bir|bil| sh|che|rli|ke |bar|hke|yet|éli|shl|tni|u h|ek |may|e b| ké|h h| ig|ydu|isi|ali|hli|k h| qo|iri|emd|ari|e h|ida|e t|tle|rni| al|siy|lid|olm|iye|anl| tu|iqi|lma|ip |mde|e e|tur|a i|uru|i k|raw|hu |mus|kil| is|i a|ir |éti|r b|özi|ris|asa|i h|sas| je|he | ch|qig|bas|n q|alg|ett|les| xi|tid| él|tes|ti |awa|ima|nun|a a| xe| bu|hil|n h| xa|adi|dig|anu|uni|mni| sa|arl|rek|ére| hö|kér| ji|min|i q|tis|rqi| iy|elq|xel|p q| qe|y i|i s|lig| ma|iya|i y|siz|ani| ki|qti| de|q w|emn|met|jin|niy|i i|tim|irl| ti|rin|éri|i d|ati|si |tew|i t|tli|eli|e m|rus|oli|ami|gen|ide|ina|chi|dil|nay|ken|ern|n w| to|ayi| ij|elg|she|tti|arq|hek|e i|n a|zin|r a|ijt|g b|atn|qar|his|uch|lim|hki|dik",
    "hat": "ou |an | li|on |wa |yon| po|li |pou|te | yo|oun| mo|un |mou|ak | na|en |n p|nan|tou|syo| dw| to|yo | fè|dwa| ak| ki|ki | pa| sa|out| la| ko| ge|ut |n s|gen| de|se |asy|èt |i p|n d| a | so|n l|a a|fè |n k| se|pa |e d|u l| re|ite|sa | ch|kon|n n|e l|t p|ni |cha|a p|nn |ans|pi |t m| ka| an|nm |fèt|i s|son|man| me|n m|n a|e p|swa|sou|e k|hak|òt |n y|men|i l|epi| pe|ote|san| ep|i k| si|yen|eyi|a l| ap|i a|yi |pey|je |n t|e a|k m|e s| ni|lib|e n|i t|lit|ran|lè |enn|al |a s| pr|a f|ns | lò|ap |lòt|enm|k l|n e|t l|kla|anm|e y|a k| ma|e t|ay |i m|ali| lè|è a|ye |a y|ant| os| ba|i g| tè|aso|u t|a n| pw|ras| pè|n f|nas|ka |n g|osw| ta|dek|i d|pwo|e m| di| vi|la |i n|u s|sos|bli| te|o t| tr|lwa|ète|a t|le |u y|i f|tan|a c|lar|a m|ete|ara|t k| pi|ibè|bèt|re |osy|de |ati|ke |res|tis|i y|tè |nen| fa|ekl|ze |nal|ons|ksy|ini|che| le|e r|a d| en|aye|he |o p|alw| kò|lal| no|esp|a g|ava|kou|las|way|u f|isy| za| ok|oke|kal|ken|sye|ta |onn|k k|nje|pra|van|esi|pès|kot|ret|sya|n v|lek|jan|ik |a b|eks|wot|è n|di |òl |tra|u k|i r|nou| as|k a|u d|ist|èso|ib | ne|iti|ti |is |y a|des|è l|a r|ont| ke|nsa|pat|rit|sit|pòt|ona|ab |è s| sw|ond|ide| ja|rav|t a|ri |bon|viv| sè|pre|vay|k p|l l|kòm|i o| ra|era|fan|dev",
    "aka": "a n| wɔ| no|no | dɛ|dɛ |na |dzi|mu | a |nyi|ra |a ɔ|wɔ |ara|a a| ny|yɛ | mu| na|bia|iar|a w|an |ndz|ma | bi|ho |dze|e n| ho| nd|oa |noa|man|ino|zi | ob|yi |zin|obi| ne|ne |a d|u n|a m|yim|ana|ama|tse|n n|o n|ze | an|ɔ n| mb| am| hɔ|ɛ ɔ|ɔn | ɔy|ɔyɛ|ɛ o|n a|aa |nya|ɔma|yin|bi | as| n |hɔn|naa|ɛ n|a o|ɛ w|ye |o a|mpa|i n|o m| on|do |ina|imp|bɔ | ma|ɛ a| do|e a|tsi|pa |nny|se |a h| ɔm|i a|ua |i m|ɔwɔ|aho|o b|ase|n e|i d|ɔ d|nye| ba|edz|eny|o d|u a| wo|uw |kuw| ad|ɛm |kwa|wan|abɔ|ɔdz|ets| ɔw|m n|mba|uma| nk| ed|ya |sen|nam|odz|mbr|o h| fa|adz| kw|o k| yi|a b|am | en|dwu|wum| ɔn|ɛ m|o w|gye|asa| ts|ɛ d|ba |nko|ia |hyɛ|w n| dz|ena|som|onn| so| da|kor| nh|fo |amb|w a|so |ɔts|bra|sua|i h|hod|ɔ a| ab|fa |o e|sa |m a|wɔm|set| ku|om |fah|ban|wɔa|a k|sia|yam|ee |er |any|e m|a e|ayɛ| gy|ow |o o|ɛɛ | bɔ|fi | nw|nhy|r n|sɛm|ony|ada| ns|nwo|oma|ɛ b| pɛ| nt| aw| yɛ|wom|en |ber| be| nn|yɛɛ|rɛ |mam|dɛm|n b|u k|ɔ h|e b|n m|das|a f|n d|u b|e d|or |pɛ |i w|u o|ɔna|hwe| ah|m d|aso|a y|ea | mp|hwɛ| ɔd|wur|hye|yeh|adɛ|nts|aad|ehy|ɔfa|gyi|iyi|kã |amu|dwe| ɔt|otu| ak|i b|mbo|r a|edw|pɛr|e f|asu|mas|ar | ɔs|wɔw|awu|daw| fi|bu |wɔd|ata|ɛ h|yer|asɛ|ɔ m|tum|in |nsa| ɔf| ky|da |gua|row|eyi|yie|oro|rbɔ|imn|urb|mny",
    "hil": "nga|ang| ka|ga |ng | sa|an |sa | ng| pa| ma|ag |on |san|pag| an|ung|kag|a p|n s|a k|n n|a m|ata|kat| ta|gan|g p|ay |tar|g k|ags|run|ala|aru|gsa|tag|a s|g m| mg|mga|n k|a t|od |kon|g s|a n|ing|a i|man|g t|agp|tan| si|n a|y k|mag|gpa|may|hil|pan|ya |ahi|la |g a|sin|gin|ina|aya|ana|ili| pu|han|g i|yon|nan| in|way|uko|gka| gi|aha| uk|ilw|lwa|asa|apa|kas|syo|at |ban|lin|iya|kah|n p| na|o n|lan|a a|in |ngk|g n|ini|aba|pat|pun|a g|ali|o s| iy|yan|agt|tao|ngs|gba|kab|wal|ngo|al |nag|agk|o m|ni |i s|aga|ano| wa|isa|abu|kal|a h|dap|ong|a d|mat| tu|gso|no |aho|aki|sod|agb| da|asy|ila|d k|pas| hi|agh|d s|n m|na |lal|yo |di |til| la|o k|s n|non|gay|sal|a b|god|ao |ati|aan|uha| is|ka |aka|asu|ngb|o a|ama|ato|atu|uga|paa|but|una|n u|bah|uan|iba| di| ba|pah|bat| du|ulo|os |y s|nah| ko|aag|agi|sil|gi |i m|hay|yag|gon|y n|sta|n d|ot |oha|tun|ida| pr| su|a l|uta|m s| al|do |uli|sug|n t|as |lon|sul|og |pam|pro|him|gua|alo|lig| bi|bis|asi|ula|ton|ksy|gtu|a e|k s| ib|n b|maa|ugu|ko |lib|ron|i a|hi |hin|tek|lab|abi|ika|mak|bot|aoh|ok | hu|ghi|ind|ote|tok|i n|t n|g e|eks|dal|uma|ubo|tum|hat|to |ado|kin| ed|rot|ho |ndi|inu|ibu|y a|nta|ad |gko|lah|duk|abo|iko|nda|aro|gal|mo |g o| bu|int| o |n o|aay|da |gsu",
    "sna": "wa |a k|ana|ro |na | ku| mu|nhu|dze|hu |a m| zv|mun|oku|chi|a n|aka|dzi|ka |zer|ero| ch|che|se |unh|odz|rwa|ra |kod|zvi| ne| pa|kan| we| dz| no|ika|va |iri| an|kut|nyi|o y|yik|van|nek|ese|eko|zva|idz|e a| ka|ane|ano|ngu|eku|cha|ung| yo|ri |ake|ke |ach|udz|iro|a z|u w| va|ira|wes|ang|ech|nge|i p|eng|yok|nok|edz|o i|irw|ani|ino|uva|ich|nga|ti |zir|anh|rir|ko |dza|o n|wan|wo |tan|sun|ipi|dzw|eny|asi|hen|zve|kur|vak|a p|sha|unu|zwa|ita|kwa|e k|rud|nun|uru|guk|a c|a d| ya|a y|bat|pas|ezv|ta |e n|uti| kw|o k|o c|o m|ara| ma|si |ga |uko|ata|ose|ema|dzo|uch|hip|kuv|no |rus|hec|omu|i z|wak|o r|kus|kwe|ere|re | rw| po|o a|mwe|yak|mo |usu|isi|za |sa |e z|uta|gar| in|hin|nem|pac|kuc|we |ete| ye|twa|pos|o d|a i|hur|get|ari|ong|pan|erw|uka|rwo|vo | ak|tem|zo |emu|emo|oru| ha|uit|wen|uye|kui| uy|vin|hak|kub|i m|a a|kud| se| ko|yo |and|da |nor|sin|uba|a s|a u| ic|zvo|mut|mat|nez|e m|a w|adz|ura|eva|ava|pi |a r|era|ute|oko|vis| iy|ha |u a|han|cho|aru|asa|fan|aan|pir|ina|guv|ush|ton| hu|uny|enz|ran|yor|ted|ait|hek| ny|uri|hok|nen|osh| ac|ngi|muk|ngo|o z|azv|kun|nid|uma|i h|vem|a h|mir|usa|o p|i n|a v|i k|amb|zan|nza|kuz|zi |kak|ing|u v|ngw|mum|mba|nir|sar|ewo|e p|uwa|vic|i i|gwa|aga|ama|go |yew|pam",
    "xho": "lo |lun|oku|nge|elo|ntu|tu |e n|ele| ku|nye|ye |nga|ung|la | ng|lek|a n|o n|yo |o l|e u|nel|gel|a k|ko |ho |ulu|ke | ne| na|lul|we |le |wa |ngo| kw|ule|kub| no|a u|onk| um|nke|o e| lo|ela|kun|ama|any|unt|ang|eko|uba|elu|ezi|mnt| wo|a i|eyo|alu|lel|umn|lwa|kwe|olu|ba | uk|kuk|won|ukh|une|uku|gok|nok|enz| un|khu| ok|the|e k|zwe|kan|eki|aph|ane|uny|ile|o z|aku|ley|lok| ez|het|eth|ath|oka|pha|sel|ala|o y|kul|akh|kil|enk| in|esi|o k| yo|use|hul|u u|tho|obu|wen|ana|nku|khe|o o|e a|na |kho|ban|a e|ise|ent|gan|uth|ni |kel| zo|he |izw|o w|hi |elw|nam|ing|eli|fun|za |lwe|eng|ya |kwa|fan|isa|o a|ndl|ntl|ayo|eni|gen|hus|uhl|iph|tha|nzi|isw|sa |phi|aba|ben|und|ume|thi|ha |alo|ka |ink|hla|lal|wan|i k| lw|i n|bel| ba|o u|azi|e o|swa|ngu|bal|pho| ab|man|kut|emf|e i|mfa|a a|e e|een|int|uph|eka|ebe|seb|lan|nee|zi |o i|mal|sha|sek|dle|ziz|mth|nen|zel| se|okw|tya|ike|lin|tla|ene|sis|ima|ase|yal|ubu| ak|ant|sen|olo|wak| ko|a o|mfu|ezo|sid|nay|oko| ub|ulo|zo |do |isi|wez|iso|han|nte| ph|zim| ya|ga |li | le|iba|ham|ube|kup|aza|jik| ul| en|eem|phu| ol|and|imf| es|o s| im|kuf|u k|kwi|nak|ma |nan|ety|kuh|kus|yol| am|hel|idi| so|lis| nj|nje|jen|tsh|aka|zin|kuz|‐ji|no |ufu|ale|ong| el|bo |a y|e l|men|yen|lum",
    "min": "an |ak |ang| ma| da| ka| sa|ara| ha|yo |nyo|hak| ba|ran|dan|man|nan|ng | pa| di|kan|ura| na|ata|asa|ok |nda|ala| pu|pun|uak|ntu|n d|k m| ti|ah |o h|n s|k u|n k| ur| un|tua|n b|and|unt| ta|uny|n p|tio|iok|ama|pan|ek |ban|jo |n m|k h|k d|ado|nga|aan|g p|tan|aka|ind|at |dak|dap|o p|tau|pek|uan| at|amo|mar|ape|au |kat|mo |sas|ari|asi|di |o s|ia |ngg|bas|ika|sam|am |lia|o d|san|gan|sia|tar|n n| jo| su|anu|lam|gar|o t| in|par|sua|dek|sar|k s|ri |o m|ana|bat|asu|ko |ai | la|ant|dal|lak|aga|alu|iah|o u|n a|tu |k a|adi|rad|i m|mal|dok|usi|aku|i d|k k|al |aro|eka|neg|ega|ato|to | ne|mam|o b|eba|ian|beb|n u|um |si |aba|rat|uah|ro |mas|ila|a d|ali|uka|ard|kam|ti |atu|nus|dar|ami|n t|sa |in |amp|kal|car|lan|aha|kab|so |rde|un |i k|gsa|das|ngs|aca|yar|ka |ati|ar | an|uku|ras| ko|sya|mat|k n|aya|nta|lo |any|sur|kaa|dil|kar|o a|u d|k t|pam|dia|ra |iba|lai|i t|lah| bu|mpa|kum|abe|n h|ili|nny| as|u p|aki|amb|sac|as |k b|h d|uli|ajo|a n|raj|n i|dua|ndu|k p|i p|itu|lin|han|huk|o k|rik|a b| li|ik |ggu|jam|bai|a a|i a|nia| ad|i j| hu|gam|sal|aso|ngk|sad|apa|ann| mu|ony|dik|bad|ain|did|min|l d|ada|bul|rga|tin|ga |ani|alo| de|arg|ahn|sio|hny|n l|sti|awa|uju|per|bak| pe|tik|ans| pi|a s| um|bag|ndi|anj|mba",
    "afr": "ie |die|en | di| en|an |ing|ng |van| va|te |e v|reg| re|n d| ge|ens|et |e r|e e| te| be|le |ver|een| in|ke | ve| he|eg |het|lke|lik|n h|de |nie|aan|t d|id |men| vr|nde|eid|e o| aa|in |of |der|hei|om |g v| op| ni|e b| el|al |and|elk|er | me|ord|e w|g t| to| of|ers| we| sa| vo|ot |erk|n v|vry|ge |kee|asi|tot| wa|sie|ere| om|aar|sal|dig|wor|egt|gte|rdi|rd |at |nd |e s|ede|ige| de| ’n|n a|eni| wo|e g| on|n s|’n |e t|erd|ns |oor|bes|ond|se |ska|aak|nig|lle|yhe|ryh|is |eli|esk|ien|sta|vol|ele|e m| vi|ik |r d|vir|edi|kap|g e|ir |es |sy |ang|din| st|ewe|gem|gel|g o| is|el |e i|op |ker|ak |uit|ike|nse|hie|ur |eur| al|e a|nas|e n|nge|ier|n o|wer|e d|ap | hu|ale|rin| hi|eme|deu|min|wat|n e|s o| as| so|as |e h|del|d v|ter|ten|gin|end|kin|it | da| sy|per|re |n w|ges|wet|ger|e k|oed|s v|nte|s e|ona|nal|waa|d t|ees|soo| ma|d s|ies|tel|ema|d e|red|ite| na|ske|ely|lyk|ren|nsk|d o|oon|t e|eke|esi|ese|eri|hul| gr|ig |sio|man|rde|ion|n b|n g|voo|hed|ind|tee| pe|rso|t v|s d|all|n t|rse|n i|eem|d w|ort|ndi|daa|maa|t g|erm|ont|ent|ans|ame|yke|ari|n m|lan|voe|n ’|nli|rkl|r m|sia|ods|ard|iem|g s|wee|r e|l g|taa|sek|bar|gti|n n|lin|sen|t o|t a|raa|ene|opv|pvo|ete| ty|arb| sl|igh|dee|g a|str|nsl|sel|ern|ste",
    "lua": "ne |wa | ne|a m| ku|a k| mu|di | bu|a b| di|e b|tu |nga|bwa|ntu| bw|udi|a d|e m|i b| ba| ma|shi|adi|u b|a n|la |ons|mun|i n|ung|nsu|ga |yi |ya |na |unt| dy|idi|e k|buk|mu |ika|esh|su |u m|ku |nde|any| bi|lu |nyi|end|yon|dik|ba | ci| ka|ang|u n|u y| mw|ka |i m| yo|we |oke|tun|de |kes|hi |kok|mwa| kw|e n|ban|dya|sha|u d|ken|kwa|ji |ha |wen|dit| ud|a a| an|mwe|itu| pa|le | a | wa|nji|kan|kum|ibw|bwe|a c|ant|ena|yen|mba|did|e d|ala|u u|ish|mak|bul|i a|nda|enj|u a|ila|pa |ako|ans|uke|ana|nso|amb|hin|umw|kal|uko|i k|bad|aka|ela|ele|u w|u k|du |ja |bu | mi|ind|ndu|kwi| ns|mbu|atu|bud|dil|ile|sun|eng|ula|enz|nan|nsh|kad|alu| cy|bis|kud|lon|u c|gan|dib|da |dye|bid| by|ukw|i d|aa |ngu|a p|sam|isa| aa|ilu| na|aba|lel|ye |dim|cya|kub|so |ond|kus|mat|nge|e c| bo|aku|bak|mus|ta |umb|ulo|elu|man|iki|mon|ngi|abu|mud|kuk|omb| mo|und|diy|kwe|umu|mal| ke|ush|gil|uba|imu|dis|wil|wu |san|gad|uka|bon|ma |aci|mik|wik| me|pan|iku|nza|ben|ulu|ifu|iba|kak|ata|som|ong|e a|apa| tu|o b|umo|bya|utu|uja|yan| be|ke |akw|ale|ilo|uku|cil|tup|kul|cik|kup|upe|bel|amw|ona| um|iko|awu|and|za |ike|a u|ima|muk| ya|mum|me |map|ita|iye|ole|lum|wab|ane| lu|nu |kis|mbe|kab|ine|bum|lam|pet| ad|fun|ama| mb|isu|upa|ame|u p|ubi",
    "fin": "en |ise|ja |ist| ja|on |ta |sta|an |n j|ais|sen|n o|keu|ike|oik|lis| va|ell|lla|n t|uks| on|ksi| oi|n k| ka|aan|een|la |lli|kai|a j| ta|sa |in |mis| jo|a o|ään|än |sel|n s|kse|a t|a k|tai|us |tta|ans|ssa|kun|den|tä |eus|nen|kan|nsa|apa|all|est| se|eis|ill|ien|see|taa| yh|jok|n y|vap|a v|ttä|oka|n v|ai |itt|aa |aik|ett|tuk|ti |ust| ku|isi|stä|ses| tä| tu|lai|n p|sti|ast|n e|n m|tää|sia|unn|ä j|ude|ä o|ste|si |tei|ine|per|a s|ia |kä |äne| mi|maa| pe|a p|ess|a m|ain|ämä|tam|yht| ju|jul|yks|hän|ä t| hä|utt|ide|et |llä|val|sek|stu|n a|lä |ami|hmi| ke|ikk|lle|iin|sä |euk|täm|ihm|tee| ih|lta|pau| sa|isk|mää|ois|un |tav|ten|dis|hte|n h|iss|ssä|a h|ava| ma|a y| ei| te| si| ol|ekä|sty|alt|toi|att|oll|tet| jä| ra|vat| mu|iel| to|mai|sal|isu|a a|kki|at |suu|n l|väl|ää |uli|tun|tie|eru| yk|etu|vaa|rus|muk| he|ei |a e|kie|sku|eid|iit| su|nna|sil|oma|min| yl|lin|aut|uut|sko| ko|tti|le |sie|kaa|a r| ri|sii|nno|eli|tur|saa|aat|lei|oli|na | la|oon|urv|lma|rva|ite|mie|vas|ä m| ed|tus|iaa|itä|ä v|uol|yle| al|lit|suo|ama|joi|unt|ute|i o|tyk|n r|ali|lii|nee|paa|avi|omi|oit|jen|kää|voi|yhd|ä k| ki|eet|eks| sy|ity|ilö|ilm|oim|ole|sit|ita|uom|vai|usk|ala|hen|ope| pu|auk|pet|oja|i s|rii|uud|hdi|äli|va | om",
    "run": "ra |we |wa | mu|e a|se | n |a k|ira|ntu|tu | ku| um|ko |a i|mu |iri|mun|hir|ye |unt|ing|ash|ere|shi|a n|umu|zwa| bi|gu |ege|a a|za |teg|ama|e k|go |uba|aba|ngo|ora|o a|ish| ba| ar|ung|a m| we|e n|na |sho|ese|nga| ab|e m|mwe|ugu| kw|ndi| gu|ate|kwi|wes|riz|ger|u w| at|di |gih|iza|n u|ngi|ban|yo |ka |e b|a b| am| ca|ara|e i|obo|hob|ri |u b|can|nke|ro |bor| in|bah|ahi|ezw|a u|gir|ke |igi|iki|iwe|rez|ihu|hug|aku|ari|ang|a g|ank|ose|u n|o n|rwa|kan| ak|nta|and|ngu| vy|aka|n i|ran| nt| ub|kun|ata|i n|kur|ana|e u| ko|gin|nye|re | ka|any|ta |uko|amw|iye| zi|ga |ite| ib|aha| ng|era|o b|ako|o i| bu|o k|o u|o z| ig|o m|ho |mak|sha| as| iv|ivy|n a|i b|izw|o y| uk|ubu|aga|ba |kir|vyi|aho| is|nya|gan|uri| it| im|u m|kub|rik|hin|guk|ene|bat|nge|jwe|imi| y |vyo|imw|ani|kug|u a|ina|gek|ham|i i|e c|ze |ush|e y|uru|bur|amb|ibi|agi|uza|zi |eye|u g|gus|i a| nk|no |abi|ha |rah|ber|eme|ras|ura|kiz|ne |tun|ron| zu|ma |gen|wo |zub|w i|kor|zin|wub|ind| gi|y i|ugi|je |iro|mbe| mw|bak| ma|ryo|eka|mat| ic|onk|a z| bo|ika|eko|ihe|ukw|wir|bwa| ry| ha|bwo| ag|umw|yiw|tse| ya|he |eng| ki|nka|bir|ant|aro|gis|ury|twa| yo|bik|rek|ni | ah| bw|uro|mw |tan|i y|nde|ejw| no|zam|puz|ku |y a|a c|bih|ya |mur|utu|eny|uki|bos",
    "slk": " pr| a |prá|ráv| po|ie |ch |ost| ro|ho | na|vo |ani|na | ne|nos|ažd|kto|kaž| ka|má |né |ávo|om | má|ebo|ti | v | al|ale|leb|bo | je| za|ých|o n|ždý|dý |ia | sl|mi |ova|sti|nie|van|to |eni|ne |áva|lob|ého|slo|rod|tor|rov| sp| zá|á p|o v|a p| kt|ý m| sv|voj|bod|obo|nia| ná| vy|ej |je |ať |o p|a v|a s|áro|a z| sa| ma|a n|e a|e s|mu |mie|kla|nár|svo|spo| by|ovn|by |roz|sa |ľud|iť |odn| vš|ov |i a|néh|vše|o s|va |o a| ľu|oci|pre|nu |a m|u a|ený|e v|ný |nes|a k|zák|pod|ným| do|u p| k |u s|áci|ajú|byť|yť |nýc|eho|ran|pol|tát|stn|jeh|a r|šet|ými|lad|čin|ému|a o|edz|ť s|kon|stv|oré| sú| ni|e z|pri|och|ny |štá|sť |oje|vna|tre|u k| či|ko |é p|maj|smi|a a|etk|nak|ým |med|dov|prí| ob|iu |uds|osť|esm|e b|m a|hra|i s|rác|bez|vať|chr|e p| ab|jú | št|žen| ho|čen| de|i p|ť v| vo|dsk|pro|nom| in|ou |du |že |aby|est| bo|ré |bol| so|nú |olo|kej|áln| oc|obe|ky |dzi|dom|áv |por|lne|rav|aké|ens|pra|ok | že|tné| ta|ako|res| vz|i k|ami| tr| ak|ní |len|o d|del|ský|cho|ach|ivo|h p|ože|iál|inn|slu|kra|loč|očn|ju | os|anu|oju|voľ|ákl|str|é s|ené| ži|niu|sta| st|ved|tvo| me|dno|m p|de |ké |kým|ikt|stu|é v|i v|vyh| to|v a|odu|hoc|a t|ím |ly |hov|y s|soc|júc|ú p|odi|vod|liv|aní|ciá| ve|rej|ku |ci |ske|sob|čno|oso",
    "tuk": "lar| we|we | bi|yň |ary|ada|da | he| ha|an |yny|kla|dam|de | ad|yna|er |na | ýa|ir |dyr|iň |bir|r b|ydy|ler|ara|am |yr |ini|lan|r a|kly|lyd| öz|mag|nyň|öz |her|gyn|aga|en |ryn|akl|ala|dan|hak|eri|ne |uku|ar |r h|ga |ny |huk| de|ili|ygy|li |kuk|a h|nda|asy|len| ed|bil|atl|ine|edi|niň|lyg| hu| ga|e h|nde|dil|ryň|aza|zat|a g|‐da|a‐d|eti|ukl| gö|ly | bo|tly|gin| az|lma|ama|hem|dir|ykl|‐de|e d|ile|ýan|a d|ýet|ýa‐|ynd|lyk|aýy|e a|ünd|ge | go|egi|ilm|sy |ni |etm|em‐|lme|m‐d|aly|any| be|tle|syn|rin|y b|let|mak|a w|a ý|den|äge|ra | äh|mäg| du|n e|bol|meg|ele|ň h| et|igi|ň w|im |iýa| ýe| di|r e|ek | ba|ak |esi|ril|a b|in |p b|deň|etl|agy| bu| je|bu |e ö|y d| hi|mez| es|ard| sa|ähl|e b|yly| ka|esa|mek| gu|n a|e t|lik| do|e g|sas|ill|nma|ň a|ram|ola|hal|y w|ýar| ar|anm|mel|iri|siý|ndi|ede|gal|end|mil|rla|göz| ma|n b|e ý|öňü|ňün|n h| tu|hiç|yýe| ge|my |iç | öň|n ý|tla|ň ý|lin|rda|al |lig|gar| mi|i g|dal|rle|mal|kan|gat|tme|sin|and|ň g|gor| ta|öwl|ýle|y g|e w|ora|tiň|ekl| yn|alk|döw| dö|ere|m h| me|dur| er|asi|tut|at |çin|irl|umy|eli|erk|nme|wle|gur|a ö|aýa| çä|nun| ki|ras|aml|up |ýaş|tyn| aý|ry |ň d|baş|ip |gi |z h|kin|z ö|n w|ter|inm|eýl|i ý|kim|nam|eň |beý|dol| se| te|r d|utu|gyý|ez |umu|mum",
    "dan": "er |og | og|der| de|for|en |et |til| fo| ti|ing|de |nde|ret| re|hed|il |lig| ha|lle|den| en|ed |ver|els|und|ar | fr| me|se |lse|and|har|gen|ede|ge |ell|ng |at | af|nne|le |nge|e f|ghe|e o|igh|es |af |enn| at|ler| i |ske|hve|e e|r h|ne |enh|t t|ige|esk| el| be|ig |tig|fri|or |ska|nin|e s|ion| er|nhv|re |men|r o|e a| st|ati| sk| in|l a|tio| på|ett|ens|al |tti|med|r f|om |end|r e|del|g f|ke | so|på |eli|g o| an|r r|ns | al|nat|han| ve|r s|r a| un| he|t f|lin| si|r d|ter|ere|nes|det|e r| ud|ale|sam|ihe|lan|tte|rin|rih|ent|ndl|e m|isk|erk|ans|t s|kal| na|som|hol|lde|ind|e n|ren|n s|ner|kel|old|dig|te |ors|e i| hv|sni|sky|ene|vær| li| sa|s f|d d|ers|ste|nte|mme|ove|e h|nal|ona|ger| gr|age|g a|vil|all|e d|fre|tel|s o|g h|t o|t d|r i|e t| om|arb|d e|ern|r u| væ|d o|res|g t|klæ|øre|n f| vi| må|ven|sk | la|gte|kab|str|n m|rel|e b|run|rbe|bej|t i|ejd|kke|t e|g d|rkl|ilk|gru|ved|bes| da|nd | fu|lær|æri|rdi|ærd|ld |t m|dli|fun|sig| mo|sta|nst|rt |od | ar| op|vis|igt|ære|tet|t a|emm|g e|mod|rho|ie |g u|ker|rem| no|n h| fa|rsk|orm|e u|s s|em |d h| ge|ets|e g|g s|per| et|lem| tr|i s|da |dre|n a|des|dt |kyt|rde|ytt|eri|hen|erv|l e|rvi|ffe|off|isn|r t| of|ken|l h|rke|g i|tal|må |r k|lke|gt |t v|t b",
    "als": "të | të|dhe|he | dh|në |ë d|e t| e |et |ë t|imi|për|ejt|dre|rej| pë| dr| në|it |gji|sht|ve |jit|ë p| gj|ith| sh| i | li|het|e p| nj|t t|ër |ë n|in | ve|me |jtë|e n| ka|ara|e d|ush|n e|tet| pa|jer|hku|a t|re |ën |ë s|sh | ku|së |t d|ë m|kus|mit|lir|ka |ë k|jë |se | si| që| ba|etë|që |ë b|si |ë g|eri|thk|nje|eve|e k|e s|jet|ose|bas|ohe| os|ra | mb|iri|h k|min|shk|ash|rim|ndë| nd|një|jta|e m| me|eti|do | du|es |rë |e l|mi |anë|tar|t n| as|dër|hte|end|tën|vet|uar|und|ësi|kom|tje|duh|ndi|at |ave| ko|ri |ta |ë v|shm| de|ar |omb|i d| kë|i p|jes| ng|uhe|nga|i n|en |ë e|ga | ar|e a|ës |hme|bar| pe|htë|ë l|ur |ë i|isë|ime|sim|ris|tës|art|ëm |cil|tim|tyr|ësh| ma|shë|or |t a|kët|gje| ci|r n|e v|par|nuk|ëta|rgj|i i|ish|uk | nu|ë r|are| je|ë c| pu|atë|lim|lli| ës|ë a|i t|mar|ore| së|tit|lar|per|t p|rat|ite|inë|t s|riu|ke |ërg|a n|edh| pr|esi|irë|ërk| po|hë |ë j|i s|a e|ht |mba|roh|im |ari|e b|lit|ti |asn|tav|snj|t e|ik |tij|k d|qër|hëm|ras|res|otë|nal|mun| an|kla|ven|e q|tat|t i| fa|ij | tj|igj|te |ali|bro| di|roj| ti|uri|ojë|ë q|çdo|det|n p| pl|ekl|ind|erë|vep|dek|nim|ive|ror|sho|hoq|oqë|ëri|pri|r d|shp|esë|le |a d|shi| mu|dis|r t|ete| t |ë f|ëzo|zim| çd|mbr| re|e f|jen|i m|iut|n k|tha|s s|lot",
    "nob": "er | og|og |en | de|for|til|ing|ett| ti|et | ha| fo| re|ret|il |het|lle|ver|tt |ar |nne| en|om |ell|ng |har| me|enn|ter|de |lig| fr| so|r h|ler|av |le |den|and| i | er|som| å |hve|or |t t|ne | el|els|re | av|se |esk|enh|nge|ska|nde|e o|ete|gen|ke |lse|ghe|ten|men| st|r s|fri|igh|ig | be|e e|nhv|r r|tte|ske|te | på| ut| sk|al | in|sjo|på |der|e s|ner|rin|jon|t o|unn|e f|han|asj|tig|ed |es |g f|sam|ent|tti|ene|nes|med|ge | al|r o|ens|r e|eli|isk|lin| ve|nin|g o| sa| an|t f|itt|lik|end|kal|r f|t s|rih|ihe|nas|nte|e r|ns | si|lan|g s|mme|ige|l å|erk|dig| gr|n s|ren|r a|all| na|kte|erd|ere|e m|und|r u|res|tel|ste|gru|inn|lær|ers| un|det|t e|arb|ale|del|ekt|ven|t i|g e|bei|eid|e a|n m|e d| ar|rbe|e g| bl|ans|klæ| li| he|g t|æri|sky|run|rkl| la|sta|sni|kke|m e|rt |mot| mo|e n|tat|at |e h|e b|ove|e t|jen|t d|str| må|r m|n e|ors|rel|ker| et|n a|bes|one| vi|nn |g r|e i|kap|sk |ot |ndi|nnl|i s| da|s o| no|id |ger|g h|vis|n o|bar|s f|ndl|t m|g a|opp|t a|dis|nal|r d|per|dre|ona|ære|rdi|da |ute|nse|bli|ore|tet|rit| op|kra|eri|hol|old| kr|ytt|kyt|ffe|emm|g d|l f| om|isn| gj|å d|ser|r b| di| fa|n t|r k|lt |set| sl|dom|rvi|me |l e|gre|å s|må | tr|nd |m s|g i|ikk|n h| at|tes|vil|dli|g b|d d| hv|rav",
    "suk": "na | mu| bu| na|a b|ya |hu |a n|we | gu|nhu|a g| ba|a m|ili|wa | ya|li |unh| bo|mun|ali|bul|han|bo |i m|ilw|uli|ang|lil|la |i b|e n|ga | wi|kil|mu | al| se|u a|ge |kge|ekg|sek|lwe|ose|le |lo |bi |ulu|e y|kwe|ila|and|e b|i n|yo |ng’|a s|nga| ns|si |abi|nsi|ina|lin|aki|se |ban| ly| gw|dak|lu |ngi|gil|a w|o g|akw|u b|ile|anh|ka |ilo|a l|ubi|e g| nu|o n|ja |gan| ng| ma|lya|nul|g’w|ani|ndi|u m|iya|wiy| ji|jo | ka|yab|lwa|ada|o b|e k| ad|gwi|ho |gub| ku|ing|o a|o l|ula|ika|a i|u n|dik|iha|shi|ayo|gun| ja|ha |biz|o j|lag|ma |wen| sh|ele|ung|o s|gi |gul|mo |lan|iwa|a k|ala|iki|jil|ola|ji |a a|yak| li|nil|iza|agi|aha|man|bos|iga|kuj| ha|ana| lu| gi|iti| mh|uga|uyo|win| ga|za |a y|ki | nd|oma|ene|o w|a u|mah|yos|sol|hay| mi|iko|ong|aga|iku|gwa|i a|ndu|pan|u g|e i| ab|ujo|ida|nya|ibi|duh|but|i y|u w|iji|nhy| we|nik|aya|uhu|nda| il|je |abo|aji|lel|ubu|nay|ba |lug|lon|ale|mil|da |a j|dul|o m|mha|aka|e u|g’h|udu|lyo|e m|e a|gik|bus|bal|sha|wit|twa|ngh|nek|wig| um|okw|any|uma|ima|uso|bud|’we| ij|hil|bil|a h|imo|ita|no | ih|gut|nha|ne |iso|ulo|uno|yom|’ha|u l|elo|eki|wel|hya|ngu|omb|som|mbi|i g|o i|u i|bak| is|ugu| yi|utu|eni|tum|umo|u s|tog|inh|’wi|lit|waj|e j|ule|jiw|u u|kub|kul|lik|uto| uy|upa",
    "sag": "tî | tî|na | na| ng|a n|ngb|gö |ngö|nga|nî | lo|lo |zo |bi |la |gbi|ang| sô|sô |î l|gan|ö t| zo|o n| wa|a t|îng|i t|ngü|gü | al|lîn| nd|a l|ê t| kû|äng|î n| te|wal|ala|alî|î k|ë t|î m|â t|î â|ô a|î b| mb|ûê |gâ |örö|ngâ|kûê| lê|o k|a â|e n|ko |î s| kö|ter|dör|köd|ödö|ï n|a k|lêg|gë |ôko|ëpë|mû |pëp| pë|o a|êgë|eke|yek|ke |ü t|î t| ay|o t|bên|ê n|rê |pëe|ra |ëe |erê|rö |tï |kua|aye| nî| ôk|ua |a z|ä t| âl|â n|ïng|î d|ö n|âng|ênî| am|î z|ten|âla| yâ|ê a|mbê|a m|û n|a y|ne |ene|rä |î g|a s|bê | ku|arä|ndi|ga |diä|ëng|iä | du| ân|amû|dut|öng|yâ |utï|ro |önî|lï |a p| gï|oro|lë |î a| âm|ndo| sê|ngô|do |i n|o s|ndö|âra|e t| bê|gba|ûng| mä|sâr| sï|î p| gb|ö k|e a|yê |a a| âk|dö |ara|ba |ï t| tö|a w|zar|tön|î w|war|ndâ|a g|ana|në |ênd| të|ta |ban| lë|zön|î f|nzö| sâ|sï |tën|o w| nz|sên| âz| da| za|îrî| në|nën|ate|ä s|bâ | at|o l|ënë|o ô|fa | kp| ma|o p| mû|kân|a b|bat|ata|ô n|se | kâ|alë| ko|ông|da |ë s|üng|ë n|ibê|rös|mbë|bët|ëtï|âmb|mbâ|ïgî|mba|gî |tän| po|bûn|gï |amb|ü n|gbï|ôi |gôi| af|rë |erë|lê | as|afa|âzo|i p|sor| ad|i s| ba|gïg|ä n|bät|dë |ö â|kûe|ûe |kpä|päl|älë|e z|ätä|ö w|ngi| yê|köt|ötä|tä |ê s|kod| hï|hal|hïn|lëz|ëzo|ngä|gän|odë|ö m|mar|sär|pä |ärä|îan|rän|bîa|a h|gi |bor|du ",
    "nno": " og|og | de| ha|er |en |ar |til| ti|lle|ett|il |ret|om |et | re|le |har|enn| me| al|all| fr|ne |tt |re | å | i |nne|and|ing|ska| sk|men| fo|det|den|ver|for|ell|t t|dom| so|de |e s| ve| ei|ere| på|al |an |e o|e h|fri|sam| sa|l å|på |leg| el|ler|som|ein|ei |nde|av | st|dei|or |ten|esk|kal|gje|n s|tte|je |ske|rid|r r|i s|te |nes| gj|eg |ido|med|e f|r s|st |ke |jon| in|r f|sjo|asj|nas|ter|unn|ed |kje|han|ona| er|t o|t e|g f|ski|e m|ast|ane|e t| av| gr|lan|ste|tan|å f| na|der| sl|t s|seg|n o|r k|nga|ge | an|g o|at |na |ern|nte|ng | ut|lik|e a|bei|gru|e i|arb|kil|g s|lag|eid|r a|e d|g d| si| få|ame|a s|e r|rbe|jen|n m|r d|n e|nn |e n|erd| tr| må| bl| mo|ren|run|nin|bli|kra| kr| at|ege|n i|me |nsk|ins|år |frå|in |lov|v p|end|mot|ale|e v|å a|få |rav|int|nal| ar|sta|e k|t f|ome| la|ot |t a|sla| ik|nle|itt| li| kv|id |kkj|ikk| lo|nad|å v|tta| fa| se|gen|ld |å s|kan|g t| ka|r l|god|n a|lin|jel|ild|dig|ha |l d|kap|ve |ndr|g i|g a|inn|var|rna|r m|r g|a o|dre|d a|n t|ag |kår|mål|ig |va |i d|t m|e e|n d|tyr| om|g e|eve|då |e u| då|und| no|ir |gar|g g|l h|se |ga |d d|l f|ker|r o|å d|eld|ige|t d|t i|t h|oko|nnl|rel|nok|rt |lt |åse|jer|ta |ik |ial|eig|r p|i e|olk|bar|osi|kte|sos|lir|opp| un|ad | be",
    "mos": " n |ẽn| a | se|a t|sẽ|̃n | ne|a s| ye|e n| ta| tɩ|n t| pa|tɩ | la| so|nin| ni| b | fã|fãa|ãa |ng |a n| bu| tõ|la |ẽ | te|tõe|ne |ye |a a|or | ya| to|ed |ned|pa |e t|õe |tar|em |tẽ|g n|ã n|n m|aan| ma|sor|buu|n y|maa|uud|a y|r n|ins|n p|ud |ra |paa|ɩ n|a b| wa|d f| na|me |n d|ara|n b|sã |taa|n w|bã |an |yel|eng|aal|ɩ b|n n|gẽ|̃ng|og | ka| bɩ|bɩ | tʊ|gã | yɩ|na |am |e b|ame|wa |g a|d b|aam|ab |mb | bã|ãmb| ba|m n|wã |aab|a m|aa |saa|ga |nsa|yaa| wã|a l|tog|ore|n s|nd |ʊʊm| sõ| sã|ãng|seg|egd|d s|el |tʊʊ|ngã|ba | tũ| da|ã t| me|b s|re |dat|l s|d n|ɩ y|ã y|dɩ |aoo|g t| kã|m t|ing|r s|a p|b y|b n|gdɩ|men|dã |vɩɩ| vɩ|lg |oor|ã s|n k|al |rã |nga|ar | le|gr |d a|neb|̃nd|ɩɩm|ĩnd|yɩ |lem| pʊ| bʊ|pʊg|nge|to |b t|ɩ s|g s| mi| ke|a k|bãm| we|kao|ilg|wil| zĩ| no|kẽ| ra|m b|ʊge|b k| bũ|oog|ã p|bũm|ngr|at | wi|gam| ko|eb |g b|sõn|ãad|ã f|õng|ɩm |m s| yi|ũmb| yã|ʊm |oy |wẽ|noy|ʊmd|da |ren|a z|ya | gã|le |b p|ɩ t|n g| f |ni |soa|oab|i t| sɩ|lag| ti|te |o a|s n|oga|go |tũ |gem|age|a w|̃ n|in | yõ|a g|b b|aor|ka |ẽe|tũu|aas|a r|e y|ag |eg |r t|e a|ã k|iid|e p|neg|o t|ate|oa |e s|ũ n|mã |ms |ell|eem|ẽm|b w|̃ms|too|ik | zã|zĩn|kog|bao|r b|s a|bui|uii|ogl|aba|alo|loa|kãa|od |l b|ll |nda|kat|aka",
    "cat": " de| i |es |de |la | la| a | pe|per|ió |ent|tat| se|nt |ret|ts |dre|at | el|ls | dr|men|aci|a p|ció|ona| co|a l|al |na |s d|que|en |el | to|s i| qu| en|e l|ns |tot|et |t a|ers| pr|t d|ons|er | ll|ion|a s|ta |a t|con|els|s e| l’|rso|res|als|son| un|est|cio| re|pro|ita|cia| in|les| o |ue |del|lli|té | té|ia |ame|é d|sev|ota|nac|i l| al|s p|a d|ar |a i|ual|nal|a c|ant|nci| le|ert|sta|rta|ser|t i|i a|l d| no|va |ats| d’|s n|re |s a|e c|eva| na|rà | ca|ues|com|lib|és | so|ibe| es|ets|ber|da |r a|no |una|l’e|s l|ter|sen|ran|ure|des|man|i e|l p|t e|n d|e d|e e|om | di|cci|igu|a a|s t| pa|i d|tra|s o|aqu|tre|vol|ect|a u|l i|gua|ide|s s|ada|ene|ial|nta|ntr|ens|soc|cte|ra |oci|hum|uma|cla|ali|lit|erà|cti| aq| hu|ici|pre|era|ess|uni|nte| fo| ni|ble|sse|tes|alt|eme|ass|ica|seg|o s|ote|rac| ig| po|ans| és|a e|un |us |mit| ma|r s|se |ssi|s h|a m|r l|nit|l t|ènc|ó d|ten| te|ir |i p|tal|eta|dic|i i|hom|t q|par|egu|s f| as|n l|ria| mi| ac|lic|int| tr|act|eix|n e|s c|ont|nse|ecc|t t|ltr|amb|qua|l’a|eli|ura|an |ist|e t|ó a|one|nam|ing|lar|o p|esp|rec|lig|a f| ha|iva| am|lle|t s|rot|mat|liu|tiu|iur|n a|fon|ots|inc|ndi|e p|seu|olu|gur|i c|més|der|rna|ina|for|igi|cie|bli|ic |mb |in |art|ol |rom|nin|omp",
    "sot": " le|le |ng |ho | mo| ho| bo|a h| e |lo |ya |ba |e m|a l| ya| ts| ba|na |ong| ka|a b|tho|e t|sa |elo|olo|a m|ets| di|o e|la |mon|oth|tsa|o y|ka |eng|a k|oke|kel|a t|g l|tok|ang|o t|tla|mot| se|o l|e b| na| ha|lok|wa |e h| tl| a |aba|o b|tse|ha | o |hab|e k|tjh|a d|tso|jha| to|se |so |oko|e e|tsh|dit|pa |apa|o n|e l|loh|kol| ma|o m|a e|ela|ele|ana|a s|let|bol|ohi|a a|tsw|kap| ke|hi |g o|ohl|eo |ke |ona|set|o k|o s|di | kg|e d|aha|lan|bot|bo |ito|o h| mm|hle|eth|ena|i b|ala|ats|moh|swa|lwa|g k|atl|abe|g m|ola|phe|bat|ane|a n|mel| me|o a| ph|ebe|ell|hlo|tlo|etj|mat| sa|g t| th|g y|lat|mol|g b|g h| en|she|the|seb|nan|lek|boh|hae|kgo|hel|e s|edi|wan|me |kga|ae |to |a f|ath|lao| hl|han|ile|nah|we |ume|kan|otl|len|aka|efe|ire|bel|bet|rel|swe|mme|sen|a p| ko|g e|atj|lel|its|bon|oho|eha|shi|man|ano|nts|he |lal|eka| fu|o f|heo|got|all|ao |het|hat|get|ban|hal|kge| wa|a y|lla|fum|mmo|kar|alo| ef|thu|e y|wal|tha|san|hon|tlh| he|e n|ben|hla|ing|uma|pha|o o|si | tu|tum|llo|lle| ta|pan|hen|mo |nen|hir| lo|son|ots|tab|ama|ato|din|lap|hil| eo|dis|oka|elw|tsi|llw|i m|hol|pel|iso|no |e a|fet|lwe|adi| fe|fen|hwa|opa|kop|are|amo|ret|emo|i k|isa|o p|o d|i l|gat|dik|i t| nt| la|ame|shw|hah| am|nya|ita|mab",
    "bcl": "an | sa|in | na|ng |sa | pa|na |nin|ang| ka| ni| ma| an|pag| as|sin|asi|n s|ion|n n|cio|a m|on |ban| de|n a|ga |kan| mg|a p|mga|a n|os |rec|ere|der|cho|ech|n p|aci|aro|n m|man|a s| la|n d|o n|asa|n k|g s|kat|sar|ata|ay |o s|al |ong|n l| o |a a|ho |a k|igw|tal|gwa|amb|kas|sai|mba|wa |ara| ig|agk|o a|lam|ro |o i|gka|ali|apa|nac|san|aba|g p|ina|a d|iya|yan|ing|lin|may|ink|aiy|nka| ba|aka|a i|yo | in|ag |abo| da|aha|ini| ga|tan|s n|nta|ano|agt|s a|kai|ad |hay|ida|hos|o m|og |ia |iba|ent|han| ta|par|n i| hu|at |ron|a b|g n|ant|g m|nal|ayo|a g|dap|mag|no |sta|aya|iri| pr|nga|ran|cia|g k|es |pat|li | co|dad|l n|y n|bos| si|mak|pro|ala|men|gan|aki|nte|lan|o k|con|t n|gab|a l|g d|ona|n b|ta |do |nda|aan|as |uha|agp|a c|uli|awo|taw|pan|n o| so|hul|i n|ter|ado|ags|g a|tra|min|anw|tay|kam|nwa|waa|g o|a o|kap|ain|bal|bil|ami|g i|d a|res|ra |nag|gta|ton|n e|ba |nan| mi|kab|en |bas|gpa|nes|o p| di|pin|ika|l a|n g|ind|isa|cci|ili|ial|ecc|tec|nci|ios|bah| es|one|pak|om |imi|agi|ico| re|ana| bi|a e|nid|rim|rar| se|rab|s s|hal|i a|buh|sab|cri|ubo|bo |gi |wo |rin|int|agh|ipa|sii|ibo|ani|to |sad|hon| le|iis|a t|ast|say|lar|n c|aag|ote|rot|n t|y m|ici|paa|ley|ey |yag|aen|dan|ni | pu|atu|lab|sal|ica| gi",
    "glg": " de|os |de | e |ión| a |da |to |ció|ere|ón |der|ito|en |a p| co|ent|eit|n d| se|rei|ade|as |aci|dad|s d| pe|per|o d|s e|e a|e d|men| da|nte|ers| pr| te|do |al |rso|ida|es |ten|soa|oa |que| to| po| o |a t| in|a e| li| do|cia|te |tod|res|o a|pro| re|tos|est|ra | es| ou|dos|lib|con|a d|nci|o e| na|e e|a a|a s|ber| á |oda| pa|e o| qu|e c|ue |ar |nac| en| sú|tra|s p| un|súa|com|ou |ia |nto|ser|a c|er |ns |a o|se |des|is |ter|s n| ca|ado|or |óns|sta|úa | no|rda|s s|ibe|rá |erd|era|no |nal| as|ica|e p|eme|erá|pre|sen|das|e n| ni|e s|por|ais|par|ant|ara|ame|cci|ona|io |o p|n p| di|cto|s t| so|o t|o á|nin| me| os|cio|enc|unh|n e|n c|nha|ha |ntr|ion|n s|á s|n t|s o|ese|nta|ect|e i|o s|e l|so |nid|oci|soc|ont|dic|ici|e t|tad| ac|tiv|ndi|ali|gua|l e|rec|a l| ig|omo|cas|o m|re | ma|ing|na |igu|vid|eli|ngu|und|s i|rac|a n|cla|cti|seu|ria|on |ase|o n|lic|s c|man|lid|a u|uni|ta | ó |ual|ido|ori| fu|ind|nda|ste|s a|tes| tr|act|ial|fun|dis|ecc|o ó|cal|mo |un |e r|iva|n o|ca |n a|o c|esp|ome|o o|seg|sti|r a|tor|r d|egu|ada|lo |nde|r o|uma|ote| el|alq|lqu|uer|spe|a i|tar|bre|tri|hum|olo|cie|ren|ena|ari|mat| fa|med|ura|lar|edi|ver|ixi|á p|ibr|gur|int|pen|rot|a f|cac|s f|ili|rio|ma |a v| vi|rim|len|ita",
    "lit": "as |ir | ir|eis|tei| te|s t|os |uri|ti |us |is |iek| pa|ai | vi|vie|tur| ki|ri |žmo| tu| žm|ien|ės |ių |ali|ais|mog|vis| ka|lai| la|ini|i t|s i|s ž|sę | į |isę|ena| ne| pr| bū| jo|pri|kie| ta|kvi|nas| su|ekv|mas|gus|būt|tin|isv|s s|ogu|isi|mą |mo |ant| ar|s k|ama|kai|ūti|s a|s v|aci| ti|s n| sa|s p|oki|cij|inė|ar |val|ms |tai|jo |i b| na|gal|sav|kur|aus|men|rin| ap|imą|ma |sta|ę į|ina|i p|imo|nim|i k| nu|ima|oti|mis| ku|jos|lyg|dar|išk|je | at|tas|kad|r t|tų |ad |tik|i i|nės|arb|i v|ijo|eik|aut|s b| įs| re|iam|sin|suo| be|isu| va|li |sty|asi|tie|ara|lin|isė|i s|ą i|jų | ly| ga|vo |si |r p|tuo|aik|rie| mo|din|pas|mok|ip |i n|rei|ybė|mos|aip|r l|ntu|įst|į t|gyv| iš|nti|tyb|ų i|pag|kia|kit|es |uot| sk|jim|tis| or|aud|yve|ven|mų |als|ų t|nac|avo|dam|ą k|i a|s j|oje|agr|kla|gau|neg|nių|o k|ega|iki|aug|ek |tat|ieš|tar|ia | ši|ios|ška|sva| to|tau|int|sau|uti| as|io |oga|san|mon|omi|kin|ito|s g|ome|r j| ve|aty|kim|nt |iai|lst| da|ją |min|r k|o t|nuo|tu |ver|kal|am |usi|o n|o a|ymo|tym|vę |ati| ji|o p|tim|ų n|paž|ter|s š| vy|alt|ksl|ing|ų s|oma|šal|ran|e t| ni| ša|ava|avi|nie|uom|irt|elg|jam|ipa|kių|tok|eka|tos|oja|kio|eny|nam|s d|ndi|amo|yti|gri|svę| gy|lie|ėmi|ats|ygi|soc|sie|oci|pat|cia",
    "umb": "kwe|oku|a o| ok|nda| kw| om|da |wen|e o|a k|la |ko | ly|end|nu |ka |o l|oko|mun|omu|unu|kwa|wa | ko|a v|o y|omo|mok|ali| vy|eka|olo|i o|osi| yo|lyo|mwe|si |okw|we |lo |iwa|o k|i k|le |te |a e|ete|gi |kut|sok|ong|iso| ya|vo |ang| ey|wet|ata|a y|o o|yok|ofe|fek|kuk|ela|a l|ilo| wo|owi|nga|iñg|kul|oka|vyo|uli|u e| va|li |ñgi|kal|wat|ta |u o|eci|ngi|ovo|ye |so | li|oci|yo |wiñ|nde|ga |ing| nd|ili|nge|ci |eye|ala|vya|e k|kol|isa|a a|lom|lon|go |avo|ako|ovi|pan| ol|uka|ngo|lya|ti |o v|akw|yal|olw|uti|imw|eli|alo|ge |ung| ku|a u|lis| al|onj|ati|wal|ale|e l|sa |i v|and| ov| yi|ika|ukw|ele|lil|yos|he | oc|yov|iha|ikw|omb|val|lin|lim|ahe|apo| ka| ye|yom| vo|lik|i l|kok|wav|aka|cih|o e|tiw| ke|yi |i w|ama|e y|lof|yow|yol| ek|kov|ole|vak|vik|tav|omw|a c|upa| el|ila| lo|aso|su |e v|lyu|ava|ñgo|lwa| wa|gis|gol| ce|tis|ave| on| es|po |wil|va |eso|kup|co | la|yam| ak|wam|iyo|ekw|e e|i c|tat|i a|a n|yah|eko|lwi|ita|lit| ec|kwi|upi|i y|epa|kan|kiy|nja|dec|asi|e u|yav|asu|mak|lap|yim|tya|vos|kas|cit| ha|lel|u c|a w|emb|u y|ola|yon| os|win|lye| ca|eyo| uk| ci| ow| yu|ayi|vel|liw|has|iti|sil| et|yuk|o w|umb|ulu|ya |wi |anj|kat|ngu|wom|o a|uva|esu|usu|mbo| co| of|mat|o c|ca |cel|vi |u l|ba |kon|mbe|wiw",
    "tsn": " le|le |go | mo|ng | ts| go|lo | bo|ya |we | di|gwe| ya|ong|ngw|sa |olo|elo|a b|tsa|tsh| e |tlh|a l|o t|e t|a g|e m|wa |a t|o y|eng|na |e l| kg|wan|kgo|mo |o n|tse|a k| tl|ets|ane| ba|dit|mon|ele|hwa|shw|la |ka |a m|nel| na| ka|e d|o l| o |o m|ba |se |e g|e e|bot|a d| a |di | ga|ots|tla|otl| se|lol|o b|tho|so |lho|tso|o g|ang|got|e b|ga |lel|seg|o e|its|gol|ose|ho |oth|let|e o|lha|ego|aba|hab|e k|ano|los|a n| nn| ma|eka|g l|šha|tšh|kan|alo|ola|lhe|ela|aka|sen|gat|tsw|kga| nt|mol|o a|nng|o o|o k|aga|atl|o s|bat|tlo|agi|yo |len|g y|edi|e y| th|g m|dik|to |tir|e n| ja|a a|mel|o d|ana|ire|g k|rel|swe| yo|bon|gag|lek|e s|mot|kwa|i l| te|a s|he |agw|ats|iwa|i k|itš|ona|no |a e|mai|any|lao|ikg|she|ntl|lwa|dir|g t|lon|ale| sa|ao |hel|shi|tle| wa|ume|log|jwa|itl|pe |hir| jw|non|iti|a y|set|hok|ira| ti|odi| me|gi |e j|tek|etl|a p|ko |ath|ala|hol|bod|tet|mog|han|nya| mm|g g|nag|i t|adi| lo|oag|i b|nna| ko|the|lan|re |thu|wen|hot|nyo|hut|o i| ne|pol|me |tum|ope|ame|gan|emo|ore|wel|nts|oko|okg|iro|ro |tha|elw|amo|gor|ing|jal|isi|nan|ogo| it|jaa|si |oga|heo|gon|diw|pa |opa| kw|lat|are|bo |o j| ke|ke |ile|gis|o f|rag| ph|bok|aak|kar|rwa|nye|g a|atš|mok|ago|okw|hag|ate|ato|uto|gwa|mme| fa|fa | op",
    "nso": "go | le|le | go|a g|lo |ba | di|ka |o y|ya | ka| ya|ng | ma|a m| mo| tš|elo|etš|e g|a l|o l| bo|a k|a b|e t|na |o t|tok|wa |e m|a t| ga|la |ang| a | ba| se|man|tše|oke|o k|ša |kel|dit|tša|tho|we |ele|a d|o g|o a|a s|o b|gwe|e d|ho |o m|ego|e l| na|tšh| to|šo |še |oko|ga |di | o |olo| e |let|ong|gob| ye|oba|ago| tl|tšw|mo |e b|re |g l|ngw|aba|tšo|swa|šha|ane|tla|hab|o n|ona|ito|ela| kg|ogo| th|oth|wan|eo |e k| sw|lok|kgo|log|ye |o d|a n|ola|g o|e s|set|hlo|kol|se | wa|lel|ao |eng|o s|šwa|mol| ts|eth|net|ano| bj|a y|o e| ke|thu|hut|šwe|ge |itš|leg|rel|alo|to |ohl| ge|mog|kan|e e|ire|nag|ke |eba|aka|pha|gag|bot|o w|aga|a a|mot|are|mok| yo|gor|oka|ko |gon|no |ore|ana|agw| wo|bon|bat|lwa|tse|bja| ph|din|yo |e r|šeg|e y|ath|nya|get|lao|sa |wo | re|wag|odi| sa|seb| me|utš|oph|mel|iti|kge|ato|kar|o o|šom| la|o f|phe|edi|hir|ala|pol|lat|ušo|i g|a p|g y|the| fi|ume|wel|bop|hel|emo| du|ile|gwa|bo |ale|tle|lwe|lek|ban|ta | lo|lon|o š|dir|mae| mm|tlh|god|pel|a w|weg|eka|elw|atš|išo|aem|šhi| ko|gam|rwa|mmo|boi|e n|ntl|pan|amm|i l|i b|hle|hla|leb| am|šon|jo |len|i s|kop|ret|gel|ing|opa|yeo|dum|sen|e a|ape|ase|kwa|lef|mal|amo|oge|bjo|oik|mon|kga|okg|a f|tsh|boh|uto|ika|ahl|ja |adi|iša|gab|hom|abo",
    "ban": "ng |an |ang| sa|ing|san| ma| pa|ane|rin|ne |ak |hak| ha| ka|n s| ri| ke|nga| ng|man|in |lan|a s|ara|ma | ja|n p|n k| pe|g s|g p|pun|asa|uwe|gan|n m|nin|sal|pan| la|alu|iri|sa |lui|jan|adi|a m|adu|uir|ra |yan|mad|kan|wan|duw|ur |tan|g j|anm|we | tu|nma|ika|awi|nge|ah |tur|ih |ban|ka |e h| ne|n n|en |nte|un |ngs|eng|anu|beb|aya|ani|ana|ian|a p|ala|bas|nan|gsa|ngg|uta| da|gar|aka|eba|da |apa|asi|ama|lih|aha| wa|ten| ut| ta|a n|ebe|are| wi|han|aje|keb|oni|nik|ent|aki|uni|ata|wia|iad|g n| pu|jer|ero|ron|aan|k h|saj|din|sak|a t|nus|dan|n w|pen|usa| ba|ngk| pi|ant|sam|e p|taw|n r|ate|wi |nen|i m|ega|neg|iwa|pat|atu|e s|ami|ipu|g k|ina|mar|kat|kal|aga|sar|ran|kin|per|g r|ndi|arg|ar |ksa|e m|ren|nya|al |tat|ida|ela|h p|aks|ntu|ngu|ado|lak| ny|oli|at |wen|ep |i k| se|dos|h s|n l|dad|gka|eka|a k|rep|eda|n h|par|upa|ena|swa| sw| in|nay|ewa|ung|era|ali|a u| mu|eh |nip|r p|e k|n t|k p|ras|i n|uku|n i|wah|eri|g m|pak|n b|r n|ayo|nda|mal|mi |um |dik|os |osa| mi|yom|na |teh|awe|k r|lar|car|tah|sia|g h|ti | hu|ut |huk|kum|sti|ewe|tuk| me|rga|pin|h m| su|gi |ari|n d|a w|ta |uan|gaw|gen|h r|on |war|tut|lah|pag|gay|r m|n u|ada|ira|a b|ngi|end|kew|g t|min|ggi|gda|jag|as |rap|agu| an|e n|ngd|s k|ila|eta",
    "bug": "na |eng|ng | na| ri|ang|nge|nna|ngn|gng|ge |sen|a r| ma| pa| si| ta| ha|ri |hak|app|tau|ak |au |ddi|a t|ase|edd|ale|a n|nap|gen|len|ass|pa |e n|ai |ria|enn|ega| ru|upa|rup|ias|a a|ing|inn|a s|pun|ngi|nin|e p|ini|nai|ga |lal|gi |sin|ppu|are|ae |ye | ye|ana|g n|sed|ada|le | as|i h|a p|ama|g r|i r|man| se|una|ara|ra |di |ssa|ren|a m|pad|e r|ila|ban|asa| ke|san|din|e a|ura| la|ane| de|nas|e s|i a|ipa|pan|u n|ann|i l| ad|da |ala|aji|ole|att| pu| e |ong|i s| ba|pur|aga|lai|i p|lan|g a|ngs|sal|ola|gsa|g s|a b|i n|ppa|rip| we|a k|g m|asi|wed|akk|mas|i m|ril|u r|reg|g p| pe|ung|gar|neg|sse| po|e m|k h| ar|pas| ne|map|ian| te|nar|pol|ett|ran| ja|bas|eba|jam|beb|ena|par| al|sib|ebe|ngk|uru|keb| sa|ain|ttu| mo|aka|unn|add|iba|sa |gan|gka|nen|bbi|i t| at|atu|kan|nan|uan|leb|rus|de |e d|ton|ata|tu |ssi|ro |e y|cen|kun|awa|ell| wa|k r|mak|wa |uwe|ire|ebb|gag|apa|sae| tu| ia|tte|mat|sim| to|a d|o r|ta |nat|ece|tur|la |ie |dec|ko |kel| di| hu|nca|caj|pak|rel|ma |lu |g t|bol|uku|e e|ter|jaj|tta|we |bir|deg|huk|e h|dan|ure|baw|kol|rit|kko|ele|arg|rga|llu|oe |lin|use|ari|auw|pat|mul|elo|ula|iti|gau|an |u p|nga|g y|a h|ekk|sil|ka |e w|ade|anc|iga|sip|ten|a y|e t| me|nre|aja|ji |rek|a w|dde|per|iko|sik",
    "knc": " a |ro |be |nzə|ye |a a| ha| kə|abe|akk| ka|zə |adə|a n|a k|kki|hak|mbe| la| ad|ndu| nd|wa |ben|en |ma |də | ya|o a|əbe|ə a|ga |e a|əga|lan|əna|lar|aye|aro|kin|inz|rdə|ard|ana|yay| ga|əla|kəl|ji |awa| mb|bej|eji|kən| ba|an |uro|du | na| ku|anz|dəg|nəm|kal| nə|e m|na |gan| du| sh|shi|amb|n k| su|ara|u y| ta|so |a d|kam|wo | ye| sa|e h|a s|sur|aso|au | au|iwa|nyi|kur|a l| da|kar| as|dəb|iya|kiw|o k|obe|e s|ada|ama|and|u a|aa |ta |ima|n n|la |əwa|nga| ci|ba | ab| nz|əgə| fa|ənd|ata|ndo|ya |tə |nza|ə n|ndi|a g|in |nam| fu|ə k|aya|a t|tən|a b|təg|ru |uru|inb|am |e k|al |ida|mga|aar|a h|baa|ə s|nab|dəw|dun|asa|nya|owu|gad|taw|o w|gən|a y|kat|dam| sə|o h|əra|e n|awo|ade|əmk| wa| wo|amg|dən| tə|a f|ala|i a|zəg|o n|uny|iga|zən|əli|wur|u k|o s|wan|za |din|utu|e l|san|i k|uwu|wu |awu|n a|on |de |da |nba|mka|yi |gay|tam| ng|laa|gin|azə|bem|gai|taa|ibe|rad|adi|fut| mə|wow|wak|ali|kun| an|mər|o t|yab|nad|aim|əgi|i n| aw|liw|cid|u s|edə|atə|any|do |apt|lka|alk|dar|rta|bed|tu |ela|ndə|uwo|gal|yir|wum|n y|ayi|n d|mma|zəb| yi|nan|ltə|lmu|ilm|mar|bel|raj| il|ero|m a|utə|enz|iro|alw|uma|umm| um|e g|how|kka|o f| ny| ho|fuw|ə h|ang|tin|zəl|o g|ema|ən |no |a i|a m|wal|əny|iwo|lil|ədə|ə f|rtə|hi |diy|mu ",
    "ibb": "ke | nd| mm|me | ke|e u|ndi|o e| em|mme|de |en |e n|owo| en| ow|wo |i e|mi |ye |emi|nye| un|e e|edi|ene| ek|yen|eny| ed|e m|nen|une|ana|n e|e o|e i| ye| uk|et |n n|eke|na |e k| mb|em |ne | id| es|un |kpu|ede|iet|ndo| nk|o k|di |kpo|ukp|did|am |an |kie|nam|kem|esi|o u| nt|idu|eme|o n|t e|no |yun|mo | uf|ho |mmo|nyu| in|o m|kpe|o o|sie|oho| kp|do |din|ie |ono|kpa|m e|ri |nkp|dib|on |e a|uke| ki|boh|a k| et|po |ida|dut|m u|ked|ded| ub| of|ond|ru |uru|pur|in |ut |du |eko|a u|ina| ot|mbe|n o|bet|iny|man| ak|op |idi|ikp|i o|edu|kon|ade|om | us|uan|wem|a m|uwe| uw|puk|ak |ode|ro |t m|a e|oro|a n|n k|u o|to |te |bo |akp|ufo|ok |dik|pan|mbo|bio|i m|ide|ini|fur|uri|ban|ofu|ubo|n i|o i|uto|iso|dom|omo|ema|diy|fen| nw|dis| ny| is|ni |usu|n m|u u|fin|tom|eto|pem|ed |m m|ibo|oto|o a|sua|wed|nwe|m n| ut|mde|dud| eb|ara| as|i n|oki| ob|nte|mok| ik| an|kar|m k|o y|t k| on|i u|nwa|n y|asa|ama|re |ufi|uka|io |nek|i k| or|pon|top|sun|ion|se |aha|t o|k n|e y|ere| ef|mba|mad|isu| mi|kor|ra |ian|i a|ka |a a|k m|ko |da |t i|ena|obi| ey|ha |dia|ti |aba|uk |u m|d e|dem|san|a o| se|pa | ab|tod|n u|p m|ude|fok|k u|efe|uku|nti|nka|ibi|son|he |pe |nto|dak|a y| od|nde|eye|anw|ndu|mbu|so |ebi|bie|nda|sin|med|tu ",
    "lug": "a o| ok| mu|oku|mu |wa |nga| ob|ga |tu |ntu|a e|na |bwa|a a|ang|ra |aba| n |ba |a m|wan|a n| ng| ab|li |obu|unt|a k|era|ibw|dde|oba|a b|u n|za |la |mun|ban|ali|ka |emb|iri|bul|ate|mbe|i m| ek|tee|eek|uli| bu|u a|edd|sa | ku|ant|ana|eki|u b|be |dem| eb|ama|n o| om|ira|omu| ki| ed|ye |ala|amu| am|e o|gwa|nna| er|kuk|y o|kwa| en|okw|eer| ly|inz|ula|kus|kir|u e| ba| em|eri| ky|any|onn| wa| ye|ggw|ina|kol|n e|awa| bw|uyi|u k|eka|yo |bwe|ola|o e|usa|o o|kwe|mus|yin|bal|i e|u m|ngi|e m|bir|riz|ere|ri |ebi|kul|aga|nza|kub|ekw| eg|ko |a y|u o|we |kut|mat|e l|e e|a l|aan|ger|no |kan|sin|nka|gir|uso| at|a g|iza|gan|nyi|zes|uku|wo |nge|zib|isa|izi|ya |egg|ufu|rir|lin|wam|wal|eby|a w|i o|bee|oze|esa|eta|iko|ebw| ma|ako|bon|tuu|kin|uki|de |zi |kug|yen|ino|e b|obo|aka|ulu| te|ne |lwa|ma |y e|lye|kuy|nsi|i y|gi |utu|ly |imu|e n|taa|asa|enk|ku |o n|o b|sob|si |una|bun|usi|san|e k| ag|uka|uga|ata| ol|rwa|wen|ing|wat|kik|o k| by|nya|ong|kye|by |kyo| bo|ewa|yam|bye|ubi|ngo|kis|ani|boz|kit|i n| aw|ky | al|sib|muk|awo|uko|umu|ibi|uma|afu|olw|eky|tab|ung|buy|ini|uum|saa|y a|lal|mag|ro |end|add|enn|kib|ens|ole|ni |mbi|o a|i k|gat| og|maw|and|kuu|a z|wet|igi|yig|emu| ne| gw|a t|nzi|n a|gya|amb|uwa|ulw| ey",
    "ace": "ng |an |eun|ang| ha|peu|oe |ak |on |nya| ny|yan| ta|ngo|ung|gon|na |ah | pe|reu| ng| ba| ke|hak|meu|keu| me|eut|at |ure| na|ban|ee | di|teu|roe|ata| ur|ara| be|seu|han|a h| sa|am |dro|eur|um |n n|tie|iep| ma| la|ala|nan|g n|ut |ong|a n|ep |tan| te|tap|jeu| ti|eul|eub|eu |eug| da|eum|eh |euk|ra |ih |n p|uga|ai |n b|a t|e n|lam|eba| se|beb|n t|awa|om |a b| ka|asa| at|eus|and|nyo|oh |ta |ka |h t|n k|p u|man|e t|n d|n h|ana|dan| pi|ape|a s|neu|nda| si|t n|bah|ula|yoe|a k|h n|dum|euh|g d|e p|eng|e b| le| pa|ngs|sia|ran|ma |g k|un | wa|ndu|lan|una|heu|ura|n m|lah|sa |n a| ra|aba|g s|a p|ia |und| je|wa |kat|bak|k n|anj| dr|asi| bu|nga|beu|uny|yar|sya|hai|k m|k t|k a|ama|aan|ek |a m|ok |g h|aka|sab|g p|i n|uta|khe|h p|ue |uka|har|ari|di |e d| su| um|t t|a l|ya |san|e s|gan|uko|gsa|e u| li|kan|bat|lee|aro|ot |n s|leu|ina|h d|lak|oih|yat|n u|kom|pat|ate| ne|ngg|nje|taw|mas|uma|sid|anu|umu|aja|si |uh |h m|rat|aya|sal|et |soe|t b|n l|aga|taa|usi| ja|ute|m p|en |dek|ila|a d|ube|dip|gam|any|lin|tam|don|ika|usa| ji|rak|idr|h b|nus|adi| as|dar|ame|n j|ngk|m n|eup|h h|bue|k h|huk|euj|g b|gar|eka|gah|upa|ile|sam| bi|h s| de| in|mum|‐ti|t h| hu|k k|pho|dil|ep‐|nta| ge|geu|h l|hat|ie |tha|use|ieh|sas",
    "bam": " ka|ni |a k|ka |an | ni|kan| bɛ|n k| la|i k|ya |la |ye |ɔgɔ|na | ye|bɛɛ|ɛɛ |en |li |sir|ɛ k|ama| ma|ira|a d|ra |ali|’a | da|man|a n|a b| i |ma | kɛ| wa|gɔ |wal|mɔg|ana|n n| ba| ja|ɔrɔ| mi| kɔ| k’| mɔ| jo| si|min|iya|dan|len|i m|’i |in |kɔn|ko |aw |den| sa| o | n’|ara|bɛ |i n|jam|ɔnɔ| na|ɛrɛ|a s|i j|ani|n b|a m|i d| fɛ| tɛ| an|osi|jos|a y|kɛ |a l|iri| ko| di|ɛ b|ada|ila|ɛ m|i t| fa|nɔ | de| ha|asi|tɛ |ari|a j|raw|a t|ɛ s|ale|a f|tig|ɛn |aya|dam|a i|i b|sar|si |riy|ɲa |n y|nu |inn|e k|ɔn |rɔ |ang|a w|o j|w n|nnu|k’i|nti|nɲa|ade|abi|bil|ala|hɔr|kal|had|igɛ|i s|a a|mad| a |aga|u k|kab|a ɲ|aba| ti|olo| hɔ|o b|ɛ j|i f| ta|ɔ k|aar|baa|ɛ n|n’a|kun|ugu|iɲɛ|diɲ|n j|k’a|a h|rɛ |ati|ɔ m| se| cɛ|ɲɔg|bɔ | tɔ|i y|lan|i h| ɲɔ|tɔn|don|nɛ |inɛ|ga |i l|ɲɛ |ile| fo|o k|ɛ l|nna|ili|un |gɔn|maa|fɛn|n d|ant|n i|aay|go |da | jɛ|u b|ri |rɔn|aka|lak|ɔnɲ|e m|ɔ b|nin|nw |cɛ |w k|yɔr|n o|o f|nga|jo |o m|nen|n’i|on |ɛ t| ku|o l|igi|ɲɛn|anb|fɛ |ɔ s| bɔ|n m|e b|afa|nka|n f|nma| fi|’u |ɔ n| ɲɛ|fan|i ɲ|ti |a o|dil|ɛ d|uya| sɔ|ago|ɛ y|e f|ɛmɛ|mɛn|aju|e d|bɛn| jɔ| fu|til|bag|fur|n t|uru|kar|atɔ|be | d’| du|d’a|oma|lom| u | do|riw|taa|w l|mɛ |gɛ |imɛ|n w|iir|nni|iim|amu|so |bal| ɲa| b’|gu |ɛɛr|’o |iwa|n s|wol|ele|ɲan",
    "kmb": "a k| ku|ya |la |ala| mu| ki|a m| o |u k|ni |o k| ni|kal| ky|mu | ya|lu |dya| dy|a o|ang|kya|a n|tok|i k|oso|so |kwa|nge|xi |na |elu|nga| kw|wa | wa|a d|hu |kut|thu|uka|oka|mut| ka|a i|mba|uth|ka |gel|ba |u m|u y|ku |ene|u n|ga |kuk|ban|ixi|i m|e k|wal|oke| mb|kik|kel|ne |u w|ela|uto|i y|ana| ng|iji|a y|kit|ma | ji|nda|ngu|yos|kum|ulu|ji |i d|isa|und| it|and|ong| mw|u i|iba|ika|wen| di|ten|ilu|ila|ndu|ye |sa |kub|aka|ena|amb|ung|olo|a w|ngo|kil|oxi|lo |muk|ke |sok|du |mox|ate|o w|kus|wat|ta | wo|gu | ph|u d|ito|ita|e m|alu|a j|kis|tun|uma|wos|luk|o m|san|mwe|a a|di |imo|ula|wan|nji|jix|i j|a t|kij|idi|kan|uku|gan|kul|e o|kye|adi|ato|o i| ja| ix|da |nu |o n|uta|kud| yo|i n|udi|ki |su |tal|a u|lun|e y|u u| ye|jin|iki|pha|hal|wij|we |a s|lak|ikw|go |tes|fol|itu|eng| ke| uf|yen|ing|yat|ele|utu|kyo|o y|kwe|kwi|uba| en|kib|ite| we|dal|i o|yan|ge |eny|tan|uki| ik|dib| im|esu|lon|kat|atu|e n|ja |i u|jya|vwa|kam|i w|ute|ini|uke|lel|esa| se|xil| ut|fun|unj|ufo|mbo| a |uso|kim|mun|u p|nen|ukw|u o|i i|umu|han|gon| il|lan|ata|te |i a| ko|jil|o a|nde|nyo|eka| at|o d|exi|ijy|tu |usa|tul|kuz|ilo|dis| un|u j|dit|ufu|ote| ib|ivw|mwi| bh| ha|se |bul|ubu|win| os|imb|bha|ama| to|axi|inu| uk|sak|kos|bot",
    "lun": "la | mu|ng | ku|a k|tu |ntu|chi| ch|a n|aku|di |mun|ma |unt|a m|g a| a | na|ela|ndi|aka| we|ima|jim|shi|eji|u w|i k| ni|ind|wu |i m|a w| in|a i|u m|hi |awu|na |kul|wej|lon|cha| ja|sha| kw|a c|i n|nak|ala|mu |wa |ing|ka |ung|kum|a h|ulo|him|mbi|muk|u c| wa|hak|iku|nsh|yi | ha|bi |amu|imb|ewa|wen|kwa|ang|adi|idi|kut|esh|ana|g o|ila|ha |tun|u j|ong|nik|kuk|tel|ovu| ov|u n|han| an|ate|vu |a a|kal|ula|kwi|jak|u a| ya|a y|ilu|u k| he|ham|and|uch|kus|ond|eka|hel|kew|zat|del|hin|uku|nde|i j|enk|i a|uka|eng|ach|lu |nat|nji|ona|mon|awa|nke|umo|ins| yi|a d|ama|udi|wak|i h|ati|i c|wan|ta |bul|mwi|ata|ayi| ak|uma|i y|ina|ich|itu|uza|kuz|nin| mw|ku |kin|wun|sak|naw|nyi|ni |ant|muc|wal|ish|u y|mul|kud|waw|uke|wes|uki|i i|kam|yid|wit|da |akw|kad|yan| di|ken|uta|ika|imu|iya|nda| ns|mbu|ya |ule|dil|iha|kuy| ko|hik|eni|ahi|kuh|si |kun|ush|umu|atw|g e|his|dik|ji |any|li | ye|dim|kos|osi|hih|wat|eyi|ney| ne|amb|twe|til|wil|nu |kwe|u h|etu|tiy|ja |nan|ash|mwe|win|was|hit|iti| wu|iwa|wah|lem|g i|tam|din|hu |haw|nga|kay| ka|hid|yin|isa|iki| ma|jaw|jil|che|mpe|omp|eta|tan|jin|hiw|usa|umb|eme|inj| hi|ulu|ubu|nam|wik|mpi| da|ale|ite|tal|twa|ahu|end|nka|mba| at|ga |mes|dic|iwu|yej|kan|kuc|iyi|sem|emb|lun|una",
    "tzm": "en |an | ye| d | n |ad |ur | ad|n i| s |agh|ḥe|n t| i |dan| ta| lh|lḥ|d y| gh|ell|n a|ra |̣eq|i t|eqq|s l|mda|ett|n d|d t|akk|la | ti|qq |hur|di | di| am|gh |ghu| is|t i|r s|in |nag| na|a y|is | te|a d|n n|yet|n g|ll |ara|ghe|ma | we| ar| wa|n s|l a|n l|sen|edd| ak|it |li | le|dd |ull|lla| id|d a| ur|rfa|erf|kul| yi| ku|as | se| ma|zer|amd|a n|lli|lel|men|t a|kw | de|t t|nt |kkw| im|fan|a i|a t|eg |n w|i d|q a|rt |ar |gar| ag|es | tl|ize|emd|i w|i l|deg| as|ken| dd|n u|lan|d i|a a|wak|tta| tm|d u|er | tu|wem|at |ddu|tle|w d|n y|t n|sse|r a|mur|s t|tam|gi | tt|yes|wan|r i|tim|na |wen|twa|d l|ttu|kke|wa |nen| iz|iḥ| u |win|d n|ame|s d|ent|ḍe|hel|a l|hed|ess|t d|mga|arw|i n|ḥu|mi |mad|agi|i g|der|udd|s n|rwa|̣en|awa|i i|ya |h d|iya|s y|msa|uḥ|idd|urt|un |n m|ane|em |sef|lsa|ili|q i|qan|leq|siy| ik|el |err| in|yed| la|ant|den|tag|man|g w|mma|yen|len|tmu|i u|aw |taw|r y|wad|edm|ṣe|hla|t l|̣er|ala|asi|ef |u a|tte|ddi|ttw| lâ|imi|l n|til|al | ne|am |̣ud| lq|iḍ| ya|dda|̣ṛ|med|ren| ss|gra|m a|ghl| il|chu|tem| ll|khe|way|eln|lna|ana|ukl|duk|gha|lt |ni |all|i a|tal|ray|nes|s k|tes|naw|ert|ila|awi|lqa|kra|anu|nun| kr|ikh|ezm|n k|iwe|iwi|ima|net|ser|s u|ir |yeh| an|aya|ehw|hwa|esk|dde",
    "war": "an |ga |nga| ka| ng| pa| ha|han|pag|in |ata| hi| an|mga| mg| ma|kat|hin|a m|ay |a p|ya |ung|a k|gan|on |n h|n n|ug |n p|n k| ug|n m|da |a h|n i|ha |iya|adu|dun|tad|a n| ta|ada|sa | iy|ara| na| di| o |pan|may|a t|ang|ud |ana|n a|o h|o n|taw|n u|ags|yon|y k|al |tag|asa|kad|o p|man| ba|awo|gsa|wo |ag |gad| in|a a|a u|ina|syo|a i|a s|od |ing|agp|ala|asy|ngo|n b|ali|nas|san|aka|a d|ra |g a|was|g h|aha|gpa|agt|to |ad |n t|tun|ng |usa| wa| tu|ini|iri|tan|ahi|kan|ray|nal|war|dir|i h|gka| us|god|g p|ri |a b|nan|ida|o a|i n|bal|y h|kas|uga|hat|tal|nah|awa|ni |pin|uha|buh|o m| bu|gud|aba|at |no | pi|bah|g m|ili|him|aya|atu|d h|agi| su|agk|lwa|mo |d a|alw|sya|uma|ano|int|kal|upa|mag|yo |o u|agb|n d|asu|lin|a o| ko|ona|did|hiy| bi|as | ki|l n|sud|iba|hi |o k|kon|ira| la|gba|pam|amo|g i|ton|gin|n o|uro|ho |os |la |g k|gtu|d m|aud|aag|t h|gi | gu| ig| ir|n g|abu|aho|ami| sa|ati|par|kau|ern|ban|tra|gar|ama|ras|yan|adt|tum| un|ka |aga|aso|api|dto|kin|tik|mil|iko|rin|sal|ika|a g|ila|mah|lip|rab|non|agu|ak |dad|lau|d n|ko |it |pak|n e| ti|una|i m|lig|s h|bay|ro |sug|mak|n w|naa|g n| so| ag|yal|nte|lal|ba |aup|lan|ihi|y b|kah|tub|bye| am|ari|yer|uka|ani|uyo|oha|ito|n s|upo|ent| pu|sam|iin|til|mat|ato",
    "wol": " ci|ci | sa|am |sañ|añ | na| ak|ak |lu |it | mb| am|aa |na |al |ñ s|ñu |ne |mu |te |pp | ne| ko|m n|i a| ku| ñu| te| mu|baa|u n|ko |u a|mba|a s|e a|ay | wa| lu| do|ar | ni|u m|nit|oo |épp| ta|oom|gu |t k|i b|ku |u k| it|éew|rée| ré|u y|xal| aa|kk |i d| bu|doo|i w| bi|war|u c| yi|aay|llu| li|fee|loo| xe| xa| ya|taa| di|yi |ama|on |u j|yu |eex|ew | yo|boo|xee| bo| wà|àll|wàl|mi |o c|ir |mën| më|yoo|ul | gu|nn |en |oot| du| so|oon|e m|dam|een|u d|i n|uy |eet|i m|ara| ba|bu |a a|ata|okk|aad| lé| ay|ju |ada| nj|nam|und|axa|dun|m a|enn|r n|aar|ex |taw|ala| jà| pa|et |di |ën |ana|ral|ota|k s|awf|naa|wfe| gi|u l|igg|aju| dë|ma | aj|ti |u t| se|ax |gée|mbo| ja|ool|bii|li |a m| ke|see|m c| ye|i l| ng|yam|ngu| yu|w m|an |ken|n w| lo|i s| me| de|m m|i t|om |u x|n t| an| mi|jaa|laa|ee |bok|lig|p l|n m|t y|ggé|k l|a l|lép|àpp|jàp|aam| jë|aax|ekk|nd |góo|ewa|ndi|tax|a d| da|amu|éey|gi | su|k c|n n|l b|o n|k t|p n|jàn|àng|gir| jo|a c|n a|n c|ñoo|i ñ|a n|kaa|ba |m g|le |une|kan|e b|la |nda|lee|i j|ang|aat|k n|ey |ant|iir|a y|l a|e n|nan|añu|men|j a|ok |k i|nee|l x|omi|i c|oxa|aw |g m|dox|nte|opp|u w|ngi| mo|omu|y d|are|i k|aan|em |du |a b|njà|ñ ñ| ti|m r|kun|ddu|ali| së| la|eg | ma|ëra|ng |xam|mul",
    "nds": "en |un |at |n d| da| de| un|een|dat|de |t d|sch|cht| ee| he|n s| wa|n e| vu|vun|ech|rec|ht |er |ten| to|tt | si| re|ver| ge|nne|t w|n w|ett|n h|n v|k u|n u| el|gen|elk|lk |t u|ien|to |ch | ve|wat|sie|war|het|it | an|n f|ner| mi| in|ann|rn | fö|ör |r d| fr|t r|hte|orr|ich|för| sc|rie|eit| or|den|nsc|ege|fri|rer| st|t g| up|aar|t a|nd | is|ll |rre|is |up |t e|chu|rt |se |ins|daa|lt |on |t h|oon|che|all|n g| ma|rrn|min| se|ell|hei| na|t s|n i|n a|nn |len| sü|in |rd |nen| we| bi|n m|e s|ven|ken|doo|sse|ren|aat|e m|ers|n t|s d|n b|lle|ünn|t t|n o|ik |kee|e g|t v|n k|hen|arr| dr|heb|lie|ebb|e v| al|e a|llt| ke|hn |he | wi|cho|ehe|ok |ard|sta|men|ill|gel|tsc| ok| do|an |düs|ene|erk| gr| dü|weg|ie |ede|ieh|r s|sün|üss|und|raa| dö|röf|drö|t m|ats|öff|e f|ünd|e w|dör|ens| gl|rch|sik|ig |kt |örc|ere|gru| ün|ff |ahn|nre|mit|st |al |aal|hon|ert|kan|nat|der|dee|enn|run| so|eih|lic|ehr|upp|iht|nwe| fa|pp |eke|e r|unw|t n|taa|hup| ka| be|bbt| wo|p s|el |as |t f|bt |e e|nee|maa|huu|eve|nst|ste|mee| ni|inn|n n|ern|iet| me|hör|dde|ent|n r|t o|öve|are|arb|ite|ter|l d|ach|nic|bei| as|lan|t b|d d|t i|ang|ame|rbe|utt| ut|pen| eh|uul|iek|hr | ar|r t|ul |e d|art|n ü|one|eer|na |nte|mut|ete|üd | mu|üüd|lüü",
    "vmw": "tth|la |thu|a e|na |hu |kha|a m|we |ana| mu|a o|awe|ela|ni |ala|hal|edi|to | ed|ire|dir|eit|ito|rei|ya |a n|wa |mut|a w| wa| ni|akh|aan|u o| on|o y|okh|utt|a a|haa| n’|wak|nla| wi|ari| yo| si| ok| ot|iwa|ka |iya| sa|ne |apo|lap|ale|le | oh|oth|att|the|mul|aka|oha|kun| el|aku|oni|mwa|ha |e s|unl|tha|ott|ele|ett|e m|o s| va|ene|e n|e o| ya|oot|hav|ade|ihi|iha|ihe|de |o o|e a|eli|hen|amu|e w| aw|hel|dad|ra | at|po |i m|lel|wi |o n|owa|e e|ula| en|ta |o a|i a|moo|waw|ina| ak|ota| mo|sa |a s| so|han|ara|var| kh|a i|ri |aya|itt|anl|row| mw| et|i o|ika|’we|nro|i e|n’a|her|lan|nak|sin|lo |elo|vo |u e|eri|n’e|oli|thi|u a|a’w|ida| ah|a v|liw|kan|him|lib|yar|riy|ona|onr|erd|wal|hiy|aa |ibe|rda|wan|ber|era|avi|hiw|nna|i v|hwa|lei|mih|vih| ep|khw|ntt| na|ko |ia |sik|aha|iwe|e k|hun|una|mu |avo|ikh|laa|riw| ma| an|e y|kel|’el|huk|u y|phe|kho|pon|i s|nid|upa|ath|ila|yot|eko|ali|tek| es| it|o e|uku|wih|nan|tte| a |mur|’at|i w|ani|ulu|nih|wel|lik|ira|ane|a y|nkh|saa|ro |n’h|wir|i n|ile|som|u s|hop|inn|ei |ont|kum|yaw|saw|iri| eh|tel|tti|ola|aki|mak|ret|uth|nnu|a k|nuw|ahi|enk| il| nn|ena|va |yok|ute|soo| pi|lal|ohi|hik|mpa|uwi|lih|har|kin|aph|ma |ope|man|ole|uma| oo|mpw| v’|nal|ehi|nin|uni| ek|khu",
    "ewe": "me |ame|e a|le |wo |kpɔ| am|ɖe |ƒe | si| me| wo|be |si | le|sia|esi|la | la|e d| ɖe| kp|pɔ |aɖe|e l| be|e w| ƒe|e e|dzi|na |nye|a a| du|ye | ŋu| na|duk| dz|ukɔ|e s|ome| mɔ|e n| aɖ|kpl|nya|gbe|e b|e m|ple|ɔkp|ɔ a|pɔk|woa|ɔ m|kɔ |evi|nɔ |ŋu |ke | nu|ɔ l|mes|awo| o |iwo|ɔnu|e ɖ| ab|ya |ekp|e k|ɔwɔ|u a| al|nu |ia |ɖek|e ŋ|kpe|ɔme|o a|iny|zi |dze| ny|o k|eme|eƒe|o n|iam|egb|mɔn|blɔ|i n|wɔ |a m| eƒ|o d|alo|siw|ɔɖe|lo |o m|eke|e g| bu|eny|ubu|ŋut|ɔ s|bub|lɔɖ|enɔ|meg|akp|abl| ha|e t| ta| go|mek|eɖo|ukp|li |nɔn|to |any|a l|etɔ|ɔ ƒ| ey|e h|nuk|gom|ɔ ɖ|ɔe |bɔ |ɖo |i s| to|anɔ|a k|ɔnɔ|e x|awɔ|e ƒ|tɔ | ƒo|mev| es| ɖo|ɖes| xe|i w|tso| wò|wɔw|mɔ |iaɖ|i l| ag| li|ã |o ƒ|odz|a s|agb|yen| ts|bu | he|bet| gb|o e|ewo|a e|ɔna|i d|ti |ele|dɔw| ka|i a|uti|peɖ|ta | an|afi|a ŋ|a ƒ| ad|ƒom|se |ɔwo|xex|exe|oma| ma|vin| dɔ|o l|wɔn|eye|a n|i t|vi |ɔ b|so |edz|gbɔ|ɖev|ado| se|ɔ n|oto|ene|eɖe|xɔ |nan|ɖod| af|ben|zin|ee |de |ɖok|dzɔ|gɔm|adz|ɔ k|wom| gɔ|uwo|i ɖ|a d| vo|a t|o g|i b| xɔ|oɖo|i m|e v|ats|o ŋ|sɔ |ovo|i e| at|vov|ne |ɔ e|kat|o s| ne| aw|da |wòa|eŋu| as|asi| el|o t|yi | sɔ|men|a b|ze |mee|uny|te |dom| ak|man|ẽ |i o|ie |ana|ata|ui |axɔ|u k|ɖoɖ|tsi|ema|rɔ̃|ded|ɔ g|ena| en|kɔm|met|u s| eɖ|oku|kui|mew|xem",
    "slv": " pr|in | in|rav|pra|do |anj|ti |avi|je |nje|no |vic| do|ih | po|li |o d| za| vs|ost|a p|ega|o i|ne | dr| na| v |ga | sv|ja |van|svo|ako|pri|co |ico|i s|e s|o p| ka|ali|stv|sti|vsa| ne| im|sak|ima|jo |dru|nos|kdo|i d|akd|i p|nja|o s|nih| al|o v|ma |i i| de|e n|pre|vo |i v|ni |red|obo|vob|avn|neg| bi|ova| iz|ove|iti|lov|ki |jan|a v|na | so|em | nj|a i|se | te|tva|oli|bod|ruž|e i| ra| sk|ati|e p|aro|i k| ob|a d| čl|eva|rža|drž| sp|ko |i n| se| ki|ena|sto|e v|žen|nak|kak|i z|var|ter|žav| mo|di |gov|imi|va |kol|n s| z |mi |ovo|rod|voj| en|nar|ve | je|pos|a s|ego|vlj|jeg| st|h p|er |kat|člo|ate|a z|enj|n p|del|i o|lja|pol|čin|a n|ed |sme|jen|eni| ta|odn| ve| ni|e b|en | me|jem|kon|nan|elj|sam|da |lje|zak|ovi|šči|raz|ans|ju |bit|ic | sm|ji |nsk|v s| s |n v|tvo|ene|a k|me |vat|ora|krš|nim|sta|živ|ebn|ev |ri |eko|o k|n n|so |za |ičn|ski|e d| va|o z|aci|cij|eja|elo|dej|si |nju|vol|kih|i m|nst|kup|kov|uži|la |mor|vih| da|h i|lju|otr|med|o a|sku|rug|odo|ijo|dst|spo|tak|zna|edn|vne|ara|ršn|itv|odi|u s|čen|boš|nik|avl|akr|e o|vek|dno|oln|o o|ošč|e m|ta |vič|bi |pno|čno|mel|eme|olj|ode|rst|rem|ov |ars| bo|n d|ere|dov|ajo|kla|ice|vez|vni| ko|ose|tev|bno|užb|ava|ver|e z|ljn|mu |a b|vi |dol|ker|r s",
    "ayr": "apa|nak|aka| ja| ma|ata|ana|aña|asi|aqe|cha|aki|ñap|jha|mar|aw |kan|ark| ch|una|aru|paw|ti |jh |pat|jaq|rka| ta|a j| ar|hat|ama|tak| wa|ach|iw |a a|ani|a m|spa|na |kap|ki |taq|pa |jan|sa | uk|qe |kis|kas|ha |ina|niw|may| kh| am|at |ati|pan|i j| ya| mu|iti|ka |ayn|t a|as |amp|ch |a u|an |pjh|yni|mun|iña|uka|ajh|ru |w k|hit|ñan|h a|is |isp|qen|khi|isi|has|ejh|e m|sis|atä|oqa|nch|rus|kam|siñ|han|mpi|kañ|qha|sin|asp| in|ham| uñ|ñat|hañ|qat| sa|yas|yat|ita|äña|ska|tap|asa|kha|sit|täñ|tha|arj|ma |a t|ta |tas|nka|sti|iri|sna| ji|a y|ara|pas| as|ñja|rjh| ku| ut|hap|tat|kat|tis|pi |apj|jam|noq|aya|i t|i u|ukh|ura| ka| ju|ans|qas|uñj|asn|a c|nin|aqa|kaj|nañ|sip|i a|us |i m|kun|w u|anc|api|ino|ili|uya|pac|tan|jil|ña |lir|utj|w j|s a|ipa|chi|kiw|w m|kak|muy|pis|rak|hac|isa|njh| lu|mas|amu|ena|nsa|w t|nan|ali|s j|ink|tay| a |upa|wak|a k|way|wa |in | ay|tañ|s m|jas|mp |lur|ank|khu|rañ|h j|t m|iru|eqa|ayt|yt |heq|che|anq|en |lan|rin|ipj|i c|mat|qpa|aqh|tja|awa|uki|k a|qej|anj|sap|pam|usk|yaq|kar|nip|llu|wal|run|yll| aj|lin|a w|ayl|n m|jac|isk|naq|ast|h u|ni |ath|a i|ayk|jhe|aqp|h k|uch|inc|hus|sar|s u|s w| pa|nap|ap | un|ak |n j|tir| ak|ns |s c|ust|arm|ask|war|ri |man|pit|qer|juc|sir|n w|hik|ika",
    "bem": " uk|la |uku|wa |a i|a u| mu|kwa|ali|ya |shi|a n|amb| na|sam| pa|ula|ta |nsa|fya| no|nga| ya|mbu|bu |ata| in| ku|a m|lo |se |nse| ba|ntu|kul|ons|ala|ang|ins|aku|li |wat|mo |tu |alo|a a|ngu|ili|nok|ika|na |nan|a p|ing|a k| al|mu |gu |o n|sha| ca|ila|oku|e a|ikw|yak|ka |lik| um|ana|lin|yal|ga | ci|aba|lwa|ku |ish| fy|uli|a b|u u|unt|i n| on|kal|lil|u y|ba |hi |ukw|amo|po |ulu|kan| sh|kup|ko |we |and|a c|aka|le |u n|cal|o u|ha |ile|ama|umu|bal|kus|akw|u m|mul| if|o a|kut|nsh|o b|ung|apo|e n|kub|mun|uci|yo |mbi|nka|cit|bul| ab|any| bu|pa |ne |u c|u b| ka|abu|ndu| fi|e u|a f|ton| ne|ant|no |i u|u a|ban|o i|cil|cin|ify| ng|pan|tun|gan|nda|kuc|kwe| ns|o c|ngw|o f|ans|fwa|a l|pam|tan|ti | am|kum|kuk|lan|u s| is|wil|du |nya|und| ic|e k|wal|aya|bi |bil|ubu|ush|fwi|int|nta|utu|twa|wab|afw|ela|o m|uko|ako| ta|lam|ale|gwa|win|u k|apa|ma |onk|way|kap|i k|imi|a o|upo| im|iwa|mba|o y|ngi|ici|pak|lul|ind| ma|e p|de |nde|gil|e b|iti|uti|ilw|a s|imb|da | li|uka|hiw|umo|pat|afu|kat|ine|eng|fyo|bun| af|uma|kuf|alw|til|ita|eka|afy|mas|e y|tul|but|nto|usa|kwi|mut|i i| ak| ap|bom|umw|sa |ont| wa|ilo|u f|baf|fik|ina|kab|ano|pal|ute|nab|kon|ash|bwa|ifi| bo| bw|lya|atu|ubi|bik|min|aik|cak|nak|men|ubo|ye |hil",
    "emk": " ka|a k|ka | la| a |la |an |kan| ma|a l|ni |ya |na |ama|a a|lu |n k| di|ɛɛ |di |a m|ma | bɛ| ja|ana|a b|aka|bɛɛ|man|iya|a d|ara|dɔ |jam|alu|en |a s| si| sa| mɔ|mɔɔ|ani| ye| dɔ| tɛ|ye |i s|i a|den| ba|riy|tɛ |sar|ɔɔ |da | al| kɛ| ni|ari|ila|a j| i |a t|n d|ɛn |ɲa |kak|ra |ada|ɛ k|i k|i d|len|u d|ele|nna|sil|n n|n m|olo| se| bo|ade|aar|ɔdɔ|ɛ d| kɔ|ɔ a|ank|ɔn | fa|fan|a ɲ|se |lak|lo | da| na|bol|kel|e k| wo|i m|aya| ke|ko | ad| mi|nu |baa| sɔ|dam|nda|ɔnɔ|mɛn| ko|a f|and|ala|ɛ y|ɔ b|ɛ s|le |ɛ m|i l|i b| wa|n s|a i| de|ina|li |ɔya|mad| mɛ|aba| le|n a| ha|a n|ɔ s|u l|nɲa|han|n b|sɔd|dɔn|kɔn|kɛ |ata|nɔ |kar|dan|in |u k|ɔ m|kɛd|ɛda|i j| su|nnu|a w|ɔ k|nka|lat| gb|ɲɔɔ|aji| an|a h|nin|olu|u m|kun|a g|on |asa| ku|ibi|jib|don| lɔ|i t|waj|bɛn|ɛnn|ban|ɔrɔ|wo |ran|si |ɛ b|ɛnɛ|ɛ l|mak|suu|e m|ii |i f| ɲi|e a|o m|ɲin|enn|usu|ba |ɛdɛ|yan|taa|nan|u b|u t| ɲa|nal|nba|ɲɛ | ɲɔ|law|ati|nad|rɔy|hɔr|a y|iri|sii| hɔ|mir|ti |enɲ|bɔ |u s|n t|u y|ini| te|ta |kol|enb|awa|bat| fu|nki|kil|ili| du|bar|ɛ j|fɛn|fɛ | do| dɛ|gbɛ|su |uus|aam| ta|afɛ|may|lɔ |nni|ɔnn|lɔn|maf|o a|e d| bɔ|din|sab| fɛ|ɔ j|o y|i w|tan|ɔɔy|dɛɛ|bɛd|kad|min|ɔlu|dal|ɔɔl| tɔ|ɔɔn|e f|biy|ali|e b|kɔd|te |wol|bi |e w| mu|ida|du |ant|nɛn|dɛ |ɛ a|dah",
    "bci": "an |be | be| ɔ |un | i |ran|sra|wla| sr|kwl|in |la | kɛ|n b|kɛ |n s|n k| kw| ng|n n|lɛ |a b|n m|le | nu|a k|nun|i s| a |man|n i|ɛn |e k|ɛ n|kun|n ɔ|mun| ni| ti| mu|nin|nga|ti | n |ɛ ɔ|e n|ɔ n| su|ga |ɔ f| fa| ku| li|e s|su |a n|a s|a ɔ|ɛ b|i n|e a| sɔ|wa |sɔ |i k| ma| le|ɛ i|tin|ɔ k|di | at|ata|ta |ɔ l|fat| mɔ|ati|mɔ |lik|akw|ɛ m| sɛ|lak|e w| sa|dɛ |ndɛ|mɛn|i b| mm| yo|iɛ |ba | nd|nvl| nv| kl|vle|sɛ |a a| mɛ| fi|ke |und| wu|ɛ s|n a|mml|liɛ|mla| ka|ike|yo |ɔ t|ngb|i a|e b|a m| an|ɔ ɔ| di| yɛ| si| bo|e t|ndi|bo | ye|o n|n t|e m|fin|e y|n f|sa |ɔ b| fɔ|dan|n y|fa |i i|uma|yɛ | ju| ny|ɔ i|nan| na|kan|ɔun| tr|wun| b | o |n l| aw|a y|b a| wa|fɔu|i f|ɛ a|ing|ge |uɛ |i w|a w|nge|klu|ka |gba|e i|awa|o m|jum|ɔ y|ɛ k|wie|a i|ie | fl|e f| wl|tra| ba|lo |lun| ak|ang|ye | wi|e l| kp|uan|i m| uf|uwa|n w|sie|flɛ|kpa|alɛ|luw|flu|o i|kle|ua | da|nyi|nzɛ|wuk|ɔ s|wo |e ɔ|ika| wo|wan|bɔ |ian| bl|wlɛ| bu|anz|o ɔ| af|aci|u b|bu | ya|ɛ w|ufl|bɔb|te |zɛ |ɔ d|a t|elɛ|i t|ci |nua|fuɛ|ɔbɔ|u i|anm|i l| w |w a| bɔ|o b|lu |se |u m|ilɛ|iɛn| ja|a j|afi|i ɔ|n u| se|unm|nda|yek|bɛn|gbɛ|eku|ɛ l|nma|kac|u s|san|ko |o y|o s|a l|u n|si |anu|aka|any|ɛ d| ko|n j|ɔ w|u a|fi | yi|anw|i j|uka|fiɛ|a d|o a|lel| kɔ|ɔlɛ|ɔn |a f",
    "epo": "aj | la|la |kaj| ka|oj | de|on |de |raj| ra|iu |ajt|as |o k| ĉi|e l|j k| li| pr|eco|aŭ |ĉiu|jn |ia |jto|est| es| al|an | ki|pro|io | ko|en |n k|kon| ti|co |j p|o d| po|ibe| aŭ|ro |tas|lib|ber|aci|toj| en|a p| ne|cio|ere|ta | in|to |do |o e|j l|n a|j d| se|a k|j r|ala|j e|taj| re|rec|iuj|kiu| pe|o a|ita|ajn|ado|n d|sta|nac|a a|nta|lia|ekt|eni|iaj|ter|uj |per|ton|int| si|cia| ha|stu|a l|je | je|al |o ĉ|n p|jta|tu | ri|vas|sen|hav|hom| di| ho|nte|a e|ali|ent| so|nec|tra|a s|ava|por|a r| na|igi|tiu|sia|o p|n l|ega|or | aj|soc|j ĉ|s l|oci|no | pl|j n|kto|evi|s r|j s|ojn|laj|u a|re | eg|j a|gal|ers|ke |pre|igo|er |lan|n j|pri| ku|era|ian|rim| fa|e s| ju|e a|ika|ata|ntr|el |is |u h|li |ioj|don|ont|tat|ons| el| su|go |un | ke|ebl|bla|n s|oma|ĉi |raŭ|kla|u r|ne |ili|iĝo|o t|s e|tek|men|nen|j i|nda|con|a d|ena|cev|moj|ice|ric|ple|son|art|a h|o r|res| un|u s|coj|e p|ĝi |for|ato|ren|ara|ame|tan| pu|ote|rot| ma|vi |j f|len|dis|ive|ant|n r| vi|ami|iĝi|sti|ĝo |r l|n ĉ|u l| ag|erv|u e|unu|gno| ce| me|niu|iel|duk|ern| ŝt|laŭ|o n|lab|olo|abo|tio|bor|ŝta|imi| ed|lo |kun|edu|kom|dev|enc|ndo|lig|e e|a f|tig|i e| kr| pa|na |n i|kad|and|e d|mal|ono|dek|pol|oro|eri|edo|e k|rso|ti |rac|ion|loj|j h|pli|j m",
    "pam": "ng |ing|ang| ka|an | pa|g k| at|ala|g p|at |apa| ma|kar|lan| ki|ata|kin|pam|g m|ara|tan|pan|yan| a |pat| in| ba|aya|n a|g a|ung|rap|ama|man|g b| ni| di|nin|din|n k|a a|tin|rin|a k|ami| la|tun|n i|ari|asa|nga|iya|ban|ati| me|nan| da| sa| na|t k|gan|g s|bal|etu|mag|a i|met|sa |la |ant|kal| iy|kap|a n| mi|in |ya |aka|tau| o |san|n d|au |lay|ana|mak|yun|na |ika|a m|ipa|ran|atu| al|n n| ta|ti |ila|g l|ali|kay|nsa|aga|a p|iti|g t|par|u m|ans|nu |al |g i|t p|iwa|a d|syu|t m|sab|anu|un |uli|mip|ra |aki|aba|u a|mal|as |mil| it|una|bla|abl|ita|awa|kat|t a|ili|kas|g n|lag|da |tas|i a|wa |n l|lal|dap|mas|bat| pr|abi|ap |a b| e |mik|ani|sal|li |ad | an|ral|ira|gal|a r|lin|g d|nte| li|ale|kab|e p|ula|wal|lit|nti|s a|lip|nta|pro|te |ie |wan|ag |tu |upa| ya|g e|tek|usa|g g|bie|o p|it |pun|ian| bi|lat|aku|be |n p|sas|iba|yat|alu|tul|e m|kan|l a|nap|t i|lir|u k|isa|pag|abe|len|e k|rot|en |bil|mam|ksy|ngg|lam|p a|ily|liw|eks|ote|n o|gga|u i|eng|ipu| tu|lya| ri|aul|pas|dan|uri|ema|lab|ta |lak|are| ar|ail|tam|o a| ke|ril| pe|sar| ra|ina|asi|ka |art|pak|sak|mit|rel|i k|gaw| ul| re|inu|i i|mun|abu|asy|mba| pi|ags|obr|gpa|a o|am |n m|mem|o k|isi| mu| nu|mis|nun|era|ndi|ga |agp|aun|mab|anm|lub|gla|e a|nme",
    "tiv": "an | u | sh| na|nan|en | a |ha |sha|shi| i |er |a i| er|or | ma|ar |gh |n i|n u|a m| ve| ci|n s|han|u n| ke|lu |man| lu|n m|yô |a u|u a|n a|r n|a k|mba|in |ii | ha|kwa|ken|n k|na |hin| mb|a a| kw|n n| ga|ga |cii|agh|a n|aa |wag|ve |a s| yô|nge|ba |r u|u i| gb|ana| or|a t|mao|r i|ity|ma |aor|anm|nma|gen|oo | ta|ir |ren| kp|i n|ang|r m|e u|gba| ng|r s| ia|ere|ugh| it|ian|doo|ese|uma|kpa| la|u k|n g|ngu|gu |om |oug|on |ol |a h|ior| ts| he| ne|tar|h u| ka|la |n t|se |e n|r a|a v|hen| ku|aha|mac|yol|i u|ace|ge |ce | de|ish|u t| io| do|tom|hi |a e|u u|o u|i m|iyo|i d|bar|ave|ua |u s| te|igh|a l|e a|m u|a w|un |n c|n e|ne |ev |r k|ind|ene|sen| is|ndi|ker|era| to|a o|ima|u v|a g|paa|n h| wo|di |yar|tya|ase|e s|de |n y|ee |end|him|tes| mk|u m|ka |tyô| mz|won|u e| um|u h| wa| mi|yan|tin|ran|ie |hie|a c|hir|i a|e k|i v|mak| in| za|r c|nen|e l| ig|i k|kur|nah|tse| ik|ves|eng|rum|mzo|men|zou|i l|e i|a d|i e|i i| ya| vo|mlu|ô i|inj|nja| as|vou|ura|ron|gbe| iy|r t|ôro|a y|oru|e e| zu| ti|ra |n l|ci |u l|ver|kpe| fa|was| ml|e m|em |io |mi |da |civ|môm|ant|see|ivi|wan|vir|nda| ij|soo|zua|lun|ea |vea|wa |ôm |av |hio|ake|a f|igb|l i|u z|r l|zan|nta|e g|hem|h s| mt|ded|iky|o s|r g|do |ndo|iji| hi|e h",
    "tpi": "ng |ong|lon| lo|im | ol| na|la | ma|pel|ela|ri |at | bi|ait|na | yu|ol |gat| ra|bil| ka|ilo|man|rai|t l|it |eri|mer| o |wan| i |mi |umi| wa|ing|yum|ta |t r|tin|eta|get|lge|olg|iga| ig| sa|ara|em |rap|i o|ap |nme|anm|in |ain|an |a m|ant|ape|nar|m o|i n| no|g o|g k|i i|as |ini|mas| me|n o|sim|tri|kan|kai|ntr| ga| st|a s| pa|gut| ha| wo|g y|yu |a l|g s|ama|m n|ok |g w|wok|spe|a k|i b|i m|g l|i l|sin|sam|pim|m l|kam| gu|l n|amt|tpe|g n| in|ts |a i|mti|utp|isp|kim|its| la|isi|aim|api|lo |o m|g b|tai| di|a o|dis|a t|p l|en |map|t w|s b| lu|luk|sem|no |tim|lai| ko| ki|ave|ols|nog|m k|lse|sav|nem|ve |a p| fr| em|nim|tu |i y|nka|et |m y| ti|g t|nap|g p|sta|tap|aun|a n| tu|un |asi|fri|pas|n m|m g|l i|aut|ane| sk|kau|t n|nta|sen|n s|oga|i g|g g|m i|kis|o i| ba|tok|os |usi|m s|ngt|anp|a w|s n|a h|s i|iki|i s|sai|l m|npe|ari|o l|o b|g r|ik |uti|iti|gti|aik|ut | to|a g|ili|a y| pi| ta|kin|ni |n b|lim| ye|yet| we|k b|ina|g m|uka|str|ins|rid|a b|anw|nsa|nwa|m w|m m|dom|ot |hap|ido|aus|i w| ne| si|n i|t o|dau|ese|rau|ank|sap|o k|m b|nin|pos|o n|am |go |s o|s l|u y|pik|vim|ivi|es | go|n n|kot|ron|ple|g d|a r|kul|ali|sku|apo|om |g h|l l|s s|ti |les|t m|gav|eki|nai|mek|kom| as|ind|nda|ip |liv|ul |ati",
    "ssw": "nge|eku|a n|ntf| le|e n| ng|tfu|lo |la |nga| ku|fu | ne|o l|khe|tsi|nkh|le |he |unt|elo| lo|si |ele|a l|ni |ung|mun|ma |lun|lel|wa |lek|nom| um|eni|oma| no|kut|hla|onk|a k|e l|ent|e k|gel|ela|ko |eli| ba| la|pha|ats| em|o n|ang|ema|eti|nel|nye|ban|ulu|uts|hul| na|aka|tfo|e u|lan|oku|lok|won|khu|esi|lul|a e|ule|ala|umu|tse|akh|ye |ve |i l|nek|ana|ane|lil|kwe|aph|na |we |ke |aba| wo|nti|ndl|ale|i n| ye|ba |ilu|gek|gan|lab|any|hat| li|tin|wen|gen|kel|len|ndz|fo |and|let|eko|e b|lwa| ka|te |set|nem| kw|mal|ka |ant|alu|ne |phi|ing| un|u u| ek|ise|une|e e|kul|nal|lal|mph|o y|uhl|fan|‐ke|ile|i k|kub|ukh|ben|kan|ako|a b|kat|eke|ive| ti|sek|nak|sit|seb|u l|alo|yel|kho|wo |kha|les|o e|ngu|kus|lom|ini|ikh|elw|isa|sa |fun|e w|ebe|o k|jen|iph|eng|kwa|ahl|uph|emb|be |tis|lwe| si|etf|isw|uma| se|ene|ta |nan| im|i e|enk|e a|abe|kun|ume|hak|nen|dle|ase|sen|kuv|tel|ebu|omu| in|lin|sel|tfw|nhl|a i|e i|kuk|uba|ti |kuf|mhl|bon|ula|sin|int|fut|dza|lak| wa|ind|ave|ali|yen|ete|to |ngo|use|kuh|hol|ze |a‐k|ona|a a|se |nje|und|swa|lon|eki|ike|i a|lis|tsa|gab|sim|i w|its|fol|e t|o m|hi |ndv|phe| ya|ma‐|utf|sik|liv|bun|cal|nta|ata|gal|mel|ute|wem|gap|han|uny|oba|alw|ili|a w|mbi| bu|gob| at|awo|ekw|dze|u n|emp",
    "nyn": "omu| om|ntu|tu | ku|a o|ra | ob|wa |obu|ari|a k|mun|a n|unt|mu |uri|nga| mu|aba|ri |a e| na|e o|gye|rik|ho |a a|han|ang|re |ga |iri|bwa|oku|aha|bur| bu|na |eki|ka |iku|ire|uga|ndi|ush|ban|ain|ere|ira|we |kur|sho| ek| ab|ne |ine|a b|and| ni|u a|e k|sa |u b|iha|i m|e n|kir|be |aho|bug|ibw| eb| ba|ing|ura|gir|u n|kut|ung|ant|abe| ah|ye |e b|i n| bw|kwe|ebi|era|iki|ba |ro | kw| ok|uba|gab| no|zi |bir|i k|u o|o o|rwa|o e|kub|end|ama|mer|eka|kug|ate|tee|di |rir|bus|kuk|rin|ish|sha|i b|wah|ha |u m|bwe|ngi| ai|ara|kwa|kan|o g|za |ngo|kuh|ana|i a|eme|eek|i o|baa| ka|go | gw|nib|zib|ash| or|iro|she|o k|u k|iin|o b|iba|oon|gan|agi|ngy|hem|mwe|ona|oro|bwo| ar|ya |i e|uru|nar|eir|uta|tar|kwi| ti|egy| n |hi |bar|isa|ute|o a|shi|ora|e e| en| ki| nk|riz|nda|da |ja |si |nsi|wen|yes|tek|yen|aga| am|o n|rei|rag|ki |obw|mur| ha|ris|wee|amb|aab|bya|kus|ugi|a y|ind|ata| ne|bas| ky|ija|hob|ikw|mus|gar|a g|eky|dii|bor|aar|ibi| we|aka|ham|emi|ekw|rer|ini|har|gi | bi|naa|kor| er|gwa|n o|iza| by|eih|yam|iho|rih|i y|ete|o m|eby|but|a r|ika|mag|ozi| em|ong|iik|iko|uka|nik| yo|sib|eri|utu|tuu|amu|uko|irw|nka|ani|yaa|u e|mut|roz|mub|ens|aij|nis|uku|kye|nde|der|e a|nok|nko|asa|aas|hab|obo|ent|ahu|rye|oba|kih|yob",
    "yao": "chi|ndu| wa|du | ch|a m|aku|akw|ni |kwe|und| mu|wak|wan|mun| ku|la |e m|wa |ulu|amb| ak|kut|u w|ali|mbo|lu |we | ma|le |ufu|ful|ila|a k|bo |a n| ga| ni|amu|kwa|se | na|ose|hil|nga|go |aka|and|ang|na | uf| pa|ete|uti|jwa|kul| jw|son|ngo|lam|e u|ne |kam|oni| so|u j|e a|ele|a c|ana|wal|ti |isy|cha| yi|gan|te |ya |mwa|lij|wet|che|ga |yak|ili|pa |e n| ya|o s|nda|i m|ula|jos|i a|ile|ijo|li |e k|o c|a u| mw|ich|mul|uch|o m|asa|ala|kas| ka|i w|ela|u a|ach|his|nam|lan|yin|i k|ind|ani|sye|yo |si |pe |gal|iwa|man|sya|aga|a w|o a|ule|ikw|asi|kus|ope|ma |gak|e w|jil|kap|hak|ika|ite|aji|mba|u g|ase|mbi|kum|uli|any|ape|a y|ekw|mal|imb|ja | al|end| ng| ja|mas|usi|kup|e c|pen|ye |anj|ka |a j|a p|lem|o n|ama|him|ago|sen|eng|ane|ako|mch|ola|och|oso|ena| kw|sop|lek|pel|gwa|hel|ine|gam|u y| mc|i y|awo|ons| mp|ole| li|wo |i u|hik|kol|auf|mka|tam|syo|e y|mpe|ten|ati|mau|nji|wam|muc|ong|i g|kan|uma|je |iku|nag|kwi|da | ul|cho|ngw|ene|iga|ano|esy|ion|upi|pag|o k|eka|wu |uwa|kuw|sa | un|a l|bom|iya|uni|jo |ale| ji|apa|yil|lil|uku|i n|o g|a a|o w|waj|mus|ipa|pan|pak|one|i c|ujo|duj|emw|nya|tio|jak|oma|nja|hiw|dan|apo|e j|poc| wo|lic|alo|eje|ing| mi|e p|lo |lig|a s| yo|ung|no | m |upa|ata| bo|nde|he |i j|was",
    "lav": "as |ība| un|un |tie|ies|bas|ai | ti|esī|sīb|ien| vi|bu |vie|ir | ir|ību|iem| va| pa|em | ne|s u|am |m i|šan|u u|r t|pie| ci| sa|ās | uz|vai| ka| pi|brī| iz|rīv| br|uz |cij|dzī|ena| ar|ar |isk|s p|es | at|āci| ap|ot |nam|viņ|inā|ikv|kvi| no|s v| ie|vis| ik|i i|pār|u a|ju |nu | pr|edr|vīb|īvī|iju|drī|u p|dar| st|lvē|cil|ilv|s t| la|iņa|ana|s i|n i|īdz|s s|kā |tīb|i a|ija|bai|ībā|ied|s n|arb|val|līd|s b|aiz|tu |iec|cie|ām |gu |vēk|īgu|īgi|ka |jas|umu|mu |t p| jā|u v|zīb|ska|lst|als|kum|gi |s l| tā|jot|stā|st |n v|vēr|a p|arī|aut|n p|ama|kas|u k| da| ta|nīg|izs|ojo|anu|ņa |u n|sta|s a|ba | ai| so|s d|a u|ā a|stī|cīb|m u|i u|son|not|mat|sav|iev|ā v|jum| kā|u t|ned|ajā|s k|u i|i v|līt|ēro| pe| dz|i n|per|u d|īks|kat|nāt|līb|nāc|rdz|nīb|pil|rīk|kst|a s|cit|pam| pā|ekl|tau|u s|bie|jā | re|i p|kur|a a|t v| li|evi|tis|evē|bā |ma |rīb|a v|os |ras|abi|nev|iku|skā| ve|lik| lī|nas|t k|ant|uma|roš|kād|zsa|sar|ciā|mie|ais|eci|oci|oša| je|jeb|būt|atr|n b|ieš|rso|ers|soc|enā|a t|t s|īša| be|bez|āda|ebk| ku|glī|isp|tot|spā|roj|lie|pre|ret|aul|na |tra|iet|du |zgl|āt |ard|kt |ier|izg|ikt|paš|iāl|nod|ts |eja|ā u|sab|eno|ēt |ta |tik|tīt|ecī| de|īga|tar|arp|r j|īst|tās|ja |enī|atv|vu |ārē|rēj|rie|oši|dro",
    "quz": "una|an | ka|nan|cha|ana|as |apa|pas|man|lla|aq |sqa|ta | ru|run|kun|ach|qa | ll|pa |paq|na |nta|chi|npa| ma|nch|aku|anp| ch|in |a r|ant|hay|mi |taq|ay |ama|asq|qan|tin|kuy|chu|lap|a k|yta|a a|ima|wan|ata|spa|all| wa|n k| ja|ipa| ya|nin|ina|aqm|his|qmi|a m| ju|pi |anc|nap|iku|aus|usa|kau|pan|nak|kan| mu|naq|aqt| pa|kam|aqa|kay|i k|kus|un |ank|isq|nku|may|yku|ayn|a j|a l|ayt|qta|ati|a p| pi| ri|aci|lli|lin|ayk|uku| al| at|n r|yac|ion|pip|han|inc|n j|ayp|yni|qpa|nac|say|asp|uy |mac|s m|cio|awa|a c|laq|tap| yu| im|a y|yoq|n m|asi|mun| de|has|n a| as|n c|int|uch|nma|s k|oq |ari|q k|hu | na|ypa| tu|tuk|tun|atu|rim|q r| sa|jat|yan| ji|nat|anm|jin|a s|api|hik|uya|nti|pac|tan|ash|mas|n p|n l|k a|ura| su|a q|yuy|n y|ech|q j|unt|yay|ypi|is |lan| qa|usp|kas| an|a w|s w|inp|sin| ta|ma |a t|shw|q a|hwa|uyt|nmi|sim|ere|rec|der|uma|s t|isp|n t|ña | ni| ay|upa|nam|hur|war|waw|imi|nka|sap|kaq|s j|was|y r|usq|kin| un|inm|qas| si|ani|tiy|t a|sta|pay|pis|maq|hin|ha |arm|npi|rmi|ink|aqp|q c|la |i p|nis|yma|nk | ku|aym|nal|hak|rik| ti|unc|niy|y s|iyo|juc| qh|ist|pap| aj|s y|cho|onq| re|ayo|iqp|n s|s p|os |i m|t i|ras|ita|piq|qsi|ku |yqa|mik|q y|eqs|pat|tak| pu|lak|i r|ipi|iya|ywa|muc|a n| qe|san|jun|y l",
    "rmy": " sh|ri | a |shi|hi |i s|ti |ea |ari|i a| ca|rea|tsi|i c| s |a a|ndr|tu |câ |dre|i n|ept|ptu|rep|li | nd| di| un|a s|are|i u|ats|la | la|i l|ear| li|lje|di |ati|lui|ui |a l| tu|tat|â s|ei |sea| ti| câ|un |jei|or |caf|afi| lu|â t| ar|ali|i t|fi |ilj|a c|bâ |râ |car|ibâ|lor| cu|nâ |icâ|a n|i d|s h|hib|tâ | hi|â a|si |u c|eas|tur|tul|ber|â c| in| co|lib|u a|n a|cu |ibe|u s|tea|lu |tsâ|ul |tse|int|a p|i i| pr|u p|i p|url|i m|lji|min|sti|alâ| al| pi|sht|nal|â n| si|ji |â p|rar|ert|sii|ii |nat|til|u l|sâ |lâ |â l|sta| nu| ic|i f|nu |ist|mlu|ili|a t|ots|uni|rta|a d|its|â d|pri| ts|oml|i e| de| na|sia| po|gur|tut| st| at| ân|ura|al |ita|anâ| ma|ips|can|oat|tsl| su| as| so|ând|nts| ap| ea|sh |nit| mi|ent|a i|ate| ac|poa|ilo|sot|ina|ash|ona| lj|âts|rli|lip|â i|unâ|t c|iti|bli| u |nji| fa|zea|tât|ril| om|urâ|con|i b|sig|igu|ntr|pur|par|ntu|let|com|iil| ni|eal|ind|r s|hti|at |ucr|art|adz|arâ|itâ|rtâ|inj|uri| eg| sc|atâ|sin|ral|pse|asi| ba|r a|apu|âlj|ia |chi| va|sun|ter|rlo|ica| pu|luc|unt|i v|ise|ini|est|ast|gal|ega|act|nda|ead|uts|a u|imi|ma |ra |pis|s l|ets|a o|va |pi |lit|scâ|asc|ial|sa | ta|rim|tar|alt|idi|tlu| gh|era|ant|eri|aes|a m| nâ| ae|oar|nea|pro|apt|ana|ta |atl|lic|l s|iun|nte|mil",
    "src": " de|de |e s|os | sa|tzi|tu | su|one| a |sa |ne | e | in|ent|ion|der|su |zio|ere|as |e d|a s|u d|ret|es | cu|ess| pr| so|s d|men|ale|ade|atz| s |re |e c|sos|in |s i|chi| un|nte|ten|etu|er | pe|et |e e|ida| te|le | is| ch|ene|are| es|a p| si|u s|a d|pro|hi |dad|te |sse|tad|zi |e t| on|e i|s e|nt |nzi|u a|sso|onz| co|ame|cun|tos|e a|sas|a c|ntu|net|na |e p|at |nes|du | li|t d|n s|son|s a| o |ber|ro |pes|u e|int|zia|nat|i p|ia |res|nu |un | re|sta|s p|ter|era| po| di|per|s c|t s|rar|ser| at|e o|s s|ibe|lib|si |tra|ust|u c|rta|unu|cus|ntz|adu| to|da |nal| na|ant|egu|eto|und|ine|i s|a e|otu|u p|t a|ert|est| da|a a| fa|ist|ona|pod|s o|pre|iss|ra | ma|ica|tot|les|ntr|una|sua|con|dae|ae |s n|man|sia|ndi|nid|ada|a l|nta|o s|a i|ua |ide| ne|otz|min|rat|iat| pa|nde|ode|dis|ren|ali|a u|ta |u o|sot|u t|ime|ssi| as|o a|pet|e u|nsi|fun|lid|epe|eru|unt|st |t e|end|us | fu| ca|ner|dos|s f|ass|nda|uni|das|iu |ind|a t|ial|a f|ghe|gua| eg|a n| se|ont|etz|s m|s ò|sti|t p|ual|nen| me|sen|com|ura|a b|lic|a o|pen|ado|nos|inn|des|seg|e f|din|òmi|ire|a m| òm|e l|dep|ènt|for|ena|par| tr|u i|ara|cra|sid| no|s u|u r|suo|e n|pri|ina| fi|ria|gur|art|det|s t| bo|tar|emo|run|ama|icu|isp|dam|e r|itu|cum|tut|eli| bi",
    "sco": " th|the|he |nd | an|and| o |al | in|ae |in |es |ion|cht| ta|tio|or |t t|ric| ri|ich|tae|on |s a|is |e a| aw| be|s t| he|ati|ent|ht |ts |e r| co|er | na| fr|bod|ody|his|dy |hes| fo|e t|o t|for|it |ng |ty |n t| or|be |fre|ree| hi|l a|ing|awb|wbo| sh|s o|ter| on|sha|nat|r t|nal|an |n a| as|hal|e o|y a|d t|tit| pe|l b| re|y h|aw | ma|nt |men|air|ce | pr| a | ti|hts|e f|e c|le |eed|edo|dom|n o|e s|ons|d a|res|e w|man| wi|d f|ed |sta|ar |t o|ona| it|ity|at |as |her|ers|t i| de|con|til|il | st|nti|e p|e i|e g|nce|ny | so| di|nte|ony|ns |und|ith|thi| fu|ie |ir |oun|ont|e e| un|pro|oci|nae|y i|lit|soc|com|nin|en |ic |ne |r a| me|ly | wa|ear|ual| en|ame|uni|r i|e h|hum| is|ane|uma|ess|inc| fa|equ| hu|ver| eq|e m|hei|o h|ms |d o| ha|wi |t n|s f| no|t a|int|cla|rit|qua|d i|iti| se|rsa|y s|ial| le| te|e d|r o|ive|r h| la|nit|om |ite|s r|cie|s i|ali|cti|cia|re |aim|rat|ld |tat|hat|rt |per|s h|n f|dis|tha| pu| we|g a|oms|eil|ntr|fai|tri|ist|ild|e u|r s|dec|lea|e b|hau|imi|mai|s n| ac|elt|lt |l t|omm|d p| ga|din|war|law|eme|y t|era|eir|art|ds |s e|ral|nor|tel|ge |g o|eik|eli|rie|rou|nda| gr|lan|mei|ate| ge|n i|ten|id |s d|ors|iou|bei|sam|nta|sec|mmo|lar| tr|ful|ul |mon|s w|anc|l o|gar|ern|ara|d s",
    "tso": " ku|ku |ni |a k|hi | ni|a n| a |i k|ka |i n|wa | ya| ma|la |ya |na |a m| ti| hi|fan| sv|nel|hu |a t|ane|ela| ka|iwa|u n| na|svi|lo |nhu|a l|a h|ele|le |ndz|u k|va | xi|a w|vi |mbe| à |elo|wu | wu|eli| mu|u y|mun|i l| le|nga|umb|lan|nfa| va|u l|be |u h|li |kum|tik|ihi|iku|aka|unh| wa|a s|liw|isa|i m| fa|ma |anu|nu |u t|han| la| ng| wi|wih| ha|a x|yel|a a|lel| nf|i h|ta |ana|o y|e k| nt|u a|i a|eni| li|ndl|ga |any| ko| kh|van|u w|u v|amb|a y|ti |sa |pfu|i t|i w|in |lek|e y|ang|and|ati|yi | è |irh|sva|mat|ani|i s| nd|a v|mel|yen|hla|isi|hin| ye|eke|n k| lo|ulu|kwe|hul|thl| kw|nth|tin|mah|wan|ava| mi|ko |khu|u s|à n|dle|lul|ule|tir|o l|i y|aha|aye|kwa|inf|à k|è k|rhu|mba| th|fum|end|anh|xi |dzi|kel|a f|u f| lè|we |may|eka|nye|gan|dze|vu |ham|xim|mis|thx|aku|tà |xa |hlo| tà|eyi|ima|nti|eki|ngo| si|u p|vak|ngu|lak|ume|oko|lon|a è|o n|lok| ta|zis|hak|u m|i à|ke |i x|u x|rhi|ha |awu|dza|u à|za | là|n w|ung|e n|a à|i f|esv|les|vik|siw| y |à m|to |mha|ola|sav|ond|nya|kot|kol|uma|e h|mbi|e s|naw|ths| dj|fun|mu |a u|xiw| ts| hl|u d| lw|nyi|ki |ong|sun|lwe|ike|ind|nis|xih|e a|èli|imu|sel|sek|iph|zen|lum| pf| xa|sin|umu|sim|ave|kar|ala|wey|sik|o t|avu|wav|oni|ile|wak| yi|ali| hà|gul|e l|ba |i v",
    "men": " ng|a n|i n|ɔɔ |ti | ti|i l| i | ma| nu| gb|ngi|a k|aa |gi | kɔ|ia |ɛɛ |ei | na| a |ma |hu | ye| ta|kɔɔ|a t|na | hu|a m| kɛ| nd|gbi|ya |bi |i y| lɔ|a h|ɛ n|ii |ɔny|u g|i h|nya|uu |lɔn| kp|i m|ngɔ|nga|la |i t|kɛɛ|lɔ |i k|ɔ t|mia| mi|a y|nge| ji|ee |gaa|a a|ɔ n|ɔ i|gɔ |ind|tao|ao | hi|num| le| yɛ|umu|mu |ung|nda|hin|ye |i g|hou|hug|e n|ugb|ni |a l|sia|ndɔ|nuu|a i|maa| ya|ahu|gba|u k|mah|oun|ɔma|le |da |i w|ɔlɔ|i j| va| ɔɔ|eng|i i|va |yei|dɔl|li |lei| sa|yɛ |kpɛ|yil|isi| la|bat|a w|u n|e t|ta |ahi| ki| wo|ɔ k|e a|ɛlɛ|saw| lo|o k|ji |gbɔ|pɛl|uvu|ili| ho|vuu| gu|nde|aho|gbu|ɛ t|ale|ila|nah|kɛ |ɛi |ndu|kpa| wa|nuv|ge |e m| ny|e k|atɛ|wei|awe|a g| ii|bua|ie |awa|wot|yek|kɔl|ulɔ|ing|ga |gul|tɛ |ɔle|u t|gbɛ|ɔ y|nun|wa |hei|ani|ɛ k| tɔ|bɔm|ɛ g|ein|taa| ha|ang|uni|u i|ekp|ɔ g|lɛɛ|kpɔ|a v|kpe|ote|i b|te |u m|tii|ɔ s| we|ɛ h|baa|pe |ɛ y| ɛɛ|i ɛ| ba|fa |a j|bu |ifa|kia|jif|u l|eke|ama|gen|u w|lee|lɛ | lɛ|ɛmb|a b|e y|aah|hii|ngo|bɛm|lek| wi|ui | yi|u y|bɛɛ| he|u a|e h|ɔ m|uah|o g|yen|yan|nyi|aal|hi |wu |yee|maj|ajɔ|jɔɔ|nye|mbo|e g|u ɔ|ong|ka |oi |lon|dun|uny|ɛng| sɔ|lɔl|nyɛ|lii|a p|oyi|iti| bɛ|lɔm|akp|e i|ɛ i| ka|jis|oko|i p|ɔla| wɛ|a s|ewɔ|iye|dɔɔ|lok|gua|ɛ b| li|u h|nin|wee|lah|ula| ga| du|i v",
    "fon": "na | na| e | ɖo|ɔn |ɖo |kpo| kp|nu |o n| ɔ | nu| mɛ| gb|mɛ |po |do |yi |tɔn| é | si|gbɛ|e n|in | to| lɛ|lɛ | tɔ|nyi| al|wɛ | do|bo |ɛtɔ| ny|tɔ |e ɖ|ɖe | bo|okp|lo |ee |ɖok|to |ɔ e|bɛt| wɛ| ac|a n|sin|acɛ|o t|o a|ɛn |i ɖ|o e|bɔ |ɔ ɖ| bɔ|cɛ |ɛ b| ɖe|a ɖ|ɔ n|ɛ ɔ|n b|an |nɔ |odo|ɛ ɖ|o ɔ|ɛ n|ɛ e|ɖɔ |ji | ɖɔ|lin|n n| en|bi |o ɖ|mɔ |n e|pod| bi|lɔ | mɔ|n a|nɛ |ɛ k|i n|un |ɔ m|i e|mɛɖ| hw| ji| ye|ɛɖe|enɛ| ǎ |alo|o s|kpl|u e|a d|ɔ b| nɔ|alɔ|ɔ é|ɔ g|ɖee|si |n m|gbɔ|a t|n k| yi|sɛn|jɛ |e k| wa|o m|e m|é ɖ| jl|hɛn|e e| hɛ| sɛ|nnu|nun|wa |n ɖ| ee|é n|kpa|unɔ|bɔn|ɔ t|a s|ɛ é|u k|ɔ w|inu|e s|i t|zɔn|o l|a y|o g|bɛ |ma |n t|e j|ɔ s|ɔ a|o b|a z| zɔ|jlo|i k|nuk|ɔ k|a e|ɔ l|u t|kɔn|xu |e ɔ| lo|hwɛ| ka|eɖe|o y|e w|jij|sis|n l|ixu|six| su|ali|isi|ukɔ|ɛ a| ay|ayi|su |n g|u a|a b|n d|dan|nmɛ| ta|n ɔ|etɔ|e g|o j| we|onu|wem|ba |ema|ɛ g|o h|ɛ s|ɛ t|i s|u w|n s| sɔ|bǐ | bǐ|hwe|a m|sɔ |lɔn|o d|u m|ple| ma|ɛ l|azɔ| az|tog|ye |i l|hun| jɛ|o w|ogu|o k|u g|kan|oɖo|elɔ|gbe| le| el|wu |ka |ɛ w|n w| li|sun|esu| hu| i |ɖó | ɖó|plɔ|ɖi |ɖè |ɛnn|pan|i m|yet|xo |iin|tii| ti| fi|e b|zan|i w|poɖ|ɖes|a j|ann|a g|gun| ɖi| tu|gan|ɛ m| wu|u s|ɔ y|a l| da|u n|u l|ɔnu|obo|ɔ h|vi |lee|ijɛ|ta |e a|ya |nuɖ|ɔ d|wen| tɛ| ga| ɛ | xo",
    "nhn": "aj |tla| tl| ti|ej |li |j t|i t| ma|an |a t|kaj|tij|uan|sej|eki| no|chi|ij | ua|ma | to| te|j m| ki|noj|ika| se|lis|j u|aka|laj|tle|pa |pan|j k|ka | mo|amp|ali|ech|uaj|iua|j n|man|oj |och|tek|tli|kua|ili|a k|se | pa|ano|ise|ual|mpa|tec|n t|en |len|iaj|is | ue|a m|jto|ajt|pia| am|uel|eli| ni|ya |oua|j i|ni |hi |tok|kin|noc|one|lal|ani|nek|jki|ipa|kit|oli|ati|amo|j s|kam|aua|ia |tim|mo | ku|ant|stl| ik| ke|opa|ase|nij|ama|i m|imo|ijp|ist|tl |ijk|tis|mej|itl|tik|mon|ok |lak|par|n n|ara|ra |tit|kej|jpi|a s|ojk|ki | o |alt|nop|maj|jya| ka|iti|cht|ijt|uam|a n|kiu|lat|leu|o t|ita|lau| ip|tep|kia|jka|n m|ana|lam|kij|nka|tou|epa|n s|til|i n|i u|e t| ak|s t|k t|lti|nem|lan|eyi|mat|nau|ose|emi|j a|ntl|uat|uey|jtl|nit|nti|kip|oka|onk| on|eui|i k|kat|j p|ini|toj|kem|ale|ajy|ame|ats|pal|iki|ema|uik|n k|eua|ach|e a|ijn| sa|mpo|tot|otl|oyo|mil|hiu|eka|tol|ajk|uak|ite|san|pam|atl|yek|tia|ate|ino|jua|a i|ipi|j o|tsa|oke|its|uil|o o|jne|oju|tos|kui|oui|a a|yi |kol|ote|a u|i i|n a|ken|chp|iko|as | ne|tin| me|ank|jti| ye|kon|ojt|aui|xtl|ine|tsi|kii|you|ko |ejk|o k|uas|poy|tst|ejy|nok|las| ya|yol|hti|pou|siu| in|nel|yok|mac|ak |hik|sij| si|sto|htl|jke|nko|jch|sek|mot|i a|ela|ui |kis|mel|axt| ax|ijc|nan",
    "dip": " ku|en |ic |ku | bi|bi | yi| ke|an |yic|aan|raa| ci| th|n e| ka| eb| ra|c k|c b|n a|ci |in |th |kua|ny |ka |i k|ŋ y|i l|ben|k e|ebe| ek| e |höm|nhö|öm | al|ai |kem| ye| nh|eme|m k|men|i y|t k|n k| la|c e|ith| er|lɛ̈|thi|alɛ|ua |t e|ek |ɛ̈ŋ| lo|ɔc |n t|ŋ k| ep|u l|it |yen|kɔc|̈ŋ |de |k k|pin|a l|i r|n y|epi|n b|lau|at |iny|aci|aai|u t|ken|au |ok | te|a c|ath| pi|ke | ac|e y|cin|u k|oŋ | lu| ti|a t|uat|baa|ik |tho|yit|ui |hii|u n|h k|e r|n c|te |kek| lö|l k|h e| lɛ|hin|thö|m e|ɛŋ |n r|n l| et| mi|ëk |i b|ekɔ|era|eŋ |e w|i t|el |ak |nhi|iic|a k|i e|pio| ny|ŋ e| aa|nde|u b|e k|kak|eba|ök |k a| ba| en|ye |lɛŋ| pa|iim|im |köu|e c|rot|e l| le|öŋ |ot |ioc|c t|i m|r e| kö| kɔ|eth|y k|oc |ŋ n|loo|la |iit| el| we| ey|i p|uny| ro|ut | tu|oi |e t|enh|thɛ|m b|hok|pan|k t|ëŋ | wi|yii|tha|wic|pir| li|u e|bik|u c|ën |ynh|y e|lui|eu |ir |y b|nyn|uc |n w|mit| ec|öun|any| aw|ɛt |ɛ̈ɛ| dh| ak|and|loi|wen|l e|höŋ|e e|thë|aku|̈ɛ̈|kut|am |eny|u m|i d|iek|k c| ko|tic|leu| ya|u y|tii| tö| ma|nyo|tö | ew|hök|den|t t|hëë|i n|k y|i c|cit|h t| ed|uee|bai|ɛ̈n|öt |eri|ɛ̈k|awu|rin|a p|cɛ̈|hai|kic|t a| të|tue|cii|hoŋ| bɛ|ooŋ|n p| cɛ|̈k |c l|u p|uk |c y|löi|i a|eke|dhi|wel|thk|eeŋ|öi |elo|n m|r k|ien|om |hom| wa|nho",
    "kde": "na | na| va| wa|la |nu |a k| ku|a w|ila|wa |a v|chi| mu|unu|e n|mun|van|a m|a n|ya |le |ele|sa | ch|asa|amb|ana|was|lam|mbo|ohe|ave| vi|ne |bo |aka|e v|a u|u a| n’|u v|e m|ke |anu| li|ve |vel|ake|ala|hil|ile| pa| av|ng’|a l|he |ing|ene|ela|ili|ika|vil|ngo|vak|ali| di|uku|wun|any|lan|a i|mbe|a a|uni|e a|ama| ma|go |nda|bel|emb|wak|kuw|nya| mw|ola|a d|den|lem|a c| il|ulu|kol|g’a|o v|nji|kan|ji |au |ma | au|lil|mbi|uwu|lik|ye |’an|kuk|din|ula|no |and|umi|kum|eng|ane|dya|ong|o l|ach|mwa|e w| ak|an’|a p|kal|nil|lew|mad|n’n|voh|ilo|wen|aya|apa| vy|kut|ale|va | al|ang|ava|kul|hin|o m|hel|e k|ond|hi | la|lin| lu|idy|dye|u l|da |ole|ka |ani|ndo|ton| in|ewa|lov|o c|dan|u m|cho|uva|ia |pan|kam|we |ove|nan|uko|bi |kav| ya|lim| um|eli|u n|nga|uli|lia|mil|o n|’ch| kw|li | an|aha|dil|ata| dy|e l|n’t|i v|tuk|hoh|u i|hev|ni |niw|und| ul|ade|lel|kay|lon|e u|ino|i n|nje|uwa|she|yik| ly|hum|ako|i w|uma|vya|kwa|ba |’ma|val|kil|mwe|mba|mu |pal|umb|wav|hih|ulo| ka|e c|nde|wal|ima|’ni|lun|ihu|a y|vin|yoh|e i|vyo|inj|u c|kup|kuv| ki| m’|a s|e p|dol|lek|awa|o u|n’c|iwa|imu|anj|mal|yen|u w|yac|bil|oja|o a|ha |utu|ech|i d|uka|taw|n’m|ita|awu|ina|m’m|i a|itu|hon|lu |atu|mak|iku|lya|lit|jel|evo| vo|i l|mah|hap",
    "snn": " ba|ye |bai| ye|ai |e b| ca|ai̱|ia |ji | ne| si|i̱ | go|goa|sia|i n|e c|a y|i y|̱ b| ja|se |aye|i j|a b|jë |iye|e g|re |oa |hua|yë |quë| gu|hue|e̱ |u̱i|gu̱|ne | ma|̱i |je̱|eo |e s| hu| ña|bay|o y|ñe |ja |ajë|to |aij|deo| ñe|a i|ayë|ba | ji|beo|cat| de| be|e j|i s|mai|e e|bi |a ñ| co| e |ato|uë |ña |i g|e ñ|i b| iy|cha|ë b|eba|coa|na | ts|e y|̱je|reb| i | ti|i t|ja̱|ach|ue |e i|i c|ni |oac|e t|a ë| re|je |aiy|oji|eoj|a̱j|oye| ë |ë t|cay|ija|ico|ihu| sa|i d|ere|a c| qu|ahu|iji|ca |ua | yë| to|a h|ase|ues|ë s|aca| se|uai|e d|ese|asi|caj| ai| tu|tut|utu|ë c|yeq|equ| na|cai| i̱|ti |mac|e m|ë g|ebi|a a|ani|tu |e n|yeb|eje|oya|toy|co̱|a m|̱ t|ije|sic|eso|eoy|a t| a | te|haj|cah|oas|are|i m|a s|ehu|añe| da|o b| do|i i|i r|e r|neñ|yer|huë|ë y| o |jai|a j|aje|a g|ibë|ëay|aña|aja|a o|coc|bëa|oca|sos|doi|oi |aco|eñe| jë|ë d|ë j|cas|ëca|hay|ea |̱ g|ari|tsi|yij|sai|̱ c|osi|teo|o h|co |̱re|nej|ëhu|o s|ose|jab|̱ni| me|rib|ñes|si |yaj|jëa|uaj|ë m|dar| yi|oe |e o|nes|i̱r|ma |nij|i h|oja|uëc|ama|ë i|i̱h|o̱u|̱uë|̱hu|aqu|ëco|e a|a̱ |ëja|̱ñe|o̱a|go̱| ëj|ñe̱|tia|abë|sih| bi|tsë|sëc| je| cu|̱ a|ned|cab|a d|ore|me | oi| ro|jay|tso|ë r|eye|ta |bë |ñaj|soe|̱ca|o̱c|año|o c|ire|ohu|uej|ñej|i a|ñas|ë q| ju|ban",
    "kbp": "aa | pa| se|se |na |nɛ | nɛ| yɔ| wa|yʊ | ɛy|ɛ p|ɖɛ |aɖɛ|a ɛ|a w|ɛwɛ|ɛna|yɛ |ala|ɛ ɛ|ɛ s|ɔɔ |yɔɔ|ɩ ɛ| ɛ |paa|e ɛ|e p|ɛyʊ|aɣ | pɩ| ɛw|a p|waɖ|ʊʊ |a n| ta|yɔ |yaa|yɩ |wɛn|la |taa|ʊ w| tɔ|a a|ɔ p|ɛya| kɩ| ɩ |ɩyɛ|a t|ʊ ɛ|a k|wɛɛ|tɔm|ɔm |ɛ t|wal|ʊ n| wɛ| ŋg| tɩ|ɛ n|ɛ k|kpe|ɛ ɖ|maɣ|zɩ | an|ʊ t|ɛ y| pʊ|nɩ | tʊ|ɛyɩ|ɩɣ |ɩ t| we|ɩ y|anɩ| pɔ|a s|gbɛ| pɛ| ɛs|pa |kpa|ɛɛ |wɛ | nɔ|daa|nɔɔ|ʊ y|ama|ya | kʊ|tʊ |pal|mɩy|ayɩ|ɩ p|ɩna|tɩ | ɖɩ|ʊ p|ɔ ɛ| ɛl| mb|ɔ s|ŋgb|a y|ɩma|ɖɩ |ʊ k|ɔɖɔ|ɩ n|bʊ |mbʊ| ɛk| kp|ɛja| ɛj|tʊm|jaɖ|paɣ|kɛ | ye|ɛyɛ|alɩ| na|i ɛ| ke| ya| ɖɔ|ɩ ɖ|ɔɔy|nda|ɖɔ |fɛy|ɣ ɛ|ɩ s|jɛy|yi |ɖɔɖ|ɛla|lɩ |kɩm|kɩ |aŋ |bɛy|pee| ñɩ|lab|ɩzɩ|pe |eyi|ŋ p|ɩ ɩ|ɛzɩ| fa|ɔyʊ|aʊ |ʊmɩ|ʊyʊ|ʊma|a l|sɔɔ|a ɩ|ekp|ʊ s| aj|ajɛ| ɛt|iya|wey|ɩ k|ʊ ŋ|ma |kan|ɩsɩ|laa|ɔyɔ|ɩm |li | kɛ| lɛ|and|sam| sa|ɣtʊ|ɔ k|day|ɔɔl|ɣ p|sɩ |ɔŋ |ɩfɛ|akp|pak|sɩn|pɩf|naa|ndʊ|kul| ha|aɣt|ɔ y|uli| ɖe| kɔ|eek| pe| sɔ|m n|ŋga|ee |ga |ɖʊ |maʊ|m t|e e|ɣna|ɣ s|ŋgʊ|abɩ|akɩ|a ñ|yaɣ|pɩz|eki| ɖo|maŋ| la|yee|ana|tɩŋ|ɣ t|pad|ñɩm| ca|ɛ a|a ɖ|pɩs|ina|dʊʊ|ɖe | ɖa|a m|lɛ |ked| ɛɖ|lak|aka|gʊ |asɩ|ʊ ɖ| ɛd|dʊ |nʊm| nʊ|ñɩn|ba |ɛpɩ|pʊ |ada|ɛhɛ|hal| a |le |zɩɣ|ɛɛn|ɛsɩ| le|aɣz|uu |nɖɩ|e t|ŋ n|ɛda|lɩm|e w|ɔ w|ɩ a| ɛp| nɖ|ɛkɛ|i p|ɣzɩ|alʊ|zaɣ|bɩ |ɛ l|ɩkɛ|ɔ t|e y|ɖam|aaa|pɛw",
    "tem": "yi | yi| ka|a ʌ| tə|uni|ni |wun| ɔ | aŋ| wu|ka | kə| kʌ| ʌŋ|nɛ |kə |tək| ʌm|əkə|ɔŋ |mar| ɔw|a k|ma |i k| a |wa | mʌ|i t|ri |ɔwa|thɔ| th| ma|ari|i m|a a|ʌma|aŋ | o | ba|tha|ba | kɔ|a y|ŋ k|ɔm |‐e | rʌ|lɔm|kɔ |i ɔ|kom|o w|ʌnɛ|te |mʌ | ŋa|i o|əm |hɔf|ɔf |alɔ|om |a m|ɔ b|ɔ y|aŋf|fəm|hal|kəp| mə|ŋfə|ʌth| tʌ|a t|a r|ŋ y|ŋth|ŋa | ʌt|ɔ k|e ɔ|ɛ t| ro|wan|ema| gb|ank| ye|th |yem|nko| mɔ|ʌwa| sɔ|kʌm|m a|kət|ʌmʌ|anɛ|rʌw|ɔ t|ʌme|ʌŋt|me |ʌte| bɛ|hɔ |a ɔ|ki |ʌŋ |m ʌ|m k|ar |ŋ ɔ|yɛ |əth|ɛ ʌ| ta|i a|ta | ʌk|ə k|thi|et |pet|pa |ŋɔŋ| te|ŋe |i ʌ|ra |i r|əpe| ŋɔ|ɛ k|ʌ k| yɔ| rə|kʌt|rʌ | yɛ|bɛ |e a|e t|ro |ɔ ʌ|akə|thə|ɔ m|a‐e|əpa|a w|kəl|ə b|yɔ |ə t|mɔ |bot|ŋ t|e y|əŋ |mʌs|gba|e m|m r| bo|ʌŋe| ak|ɛ a|nʌn|ləŋ|ələ|sɔŋ|ŋ b|təm|wop|ʌ a|ə y|kəs|sek|ə s|tʌt|li |ot | ko|ɛ ŋ|ŋ a|ekr| ra|ɔth|sɔt|ʌse|ath|ru |t k|ɛ m|e k|ɛth|ma‐|po | po| wo|ʌrʌ|i y|m t|m ŋ|tʌŋ|tɔŋ|e w|gbʌ|tə |nth|ʌyi|ʌlə|hən|ʌ ʌ|op |iki|ʌkə|rʌr|ʌru|ŋgb|sɔ |əyi|rʌn|gbə|ɔ a|ər |ɔkɔ| pə| ʌr|ənʌ|ləs|nka|ith|əli|ʌy |bəl|mʌy|ran|o ɔ|ɛ r|ant|f ʌ|mə |ti |f t| tɔ|əs |r k|hi |yik|ɔ ɔ|rək|kar|ʌ t|mʌt|lɔk|ayi|krʌ|pan|na |kʌr|mət|tət|tho|pi |mʌl| to|to | wa|ʌgb|thɛ|ə g|bas|eŋ |aŋk|ɔ r|thʌ|o t|ɛŋ |i‐e|kʌ |kʌs|mɔŋ|o d|kɔŋ|din|ɔ g|kəw|di |ŋ w|əma|ɛr |ʌ y|ək |ŋko",
    "toi": " ku|a k|wa | mu|a m|la |ali|ya |tu |i a|e k|a a|aku|ula|ntu|ang| al|lim|lwa|kwa|aan|mun|mwi|de |ulu|ngu|wi |imw|luk|gul|na |ele| ak|kub|ons|unt|kul|oon|se |ant|nse| oo|zyi|gwa|si | ba|ba | lw|zya|uli|ela|a b| ci| ka| zy|waa|and| an| kw|ili|uki|eel|uba|nyi|ala|kut|ide| ma|kid|isi|uny|i m|kun|cis| ya|li |i k|nga|a l|yin|kuk|ka | ul|kus|ina|laa|nte|ila|tel|mul|wab|wee|nda|izy|ede| am|led|amb|ban|we |da |ana|kwe|e a|lil| bu|o k|bwa|aka|ukw|o a|ati|uko|awo|yan|ko |uci|ilw|bil|bo |a c|wo |amu|law|mbu|i b|bul|umi|ale|abi|kak|e m|u b|akw|u o|ti |sal|kuy|ung|bel|wak| bw|o l|ga |kal|asy|e u|lan| mb|lo |usa|ika|asi|aam|a n|ule|bi |cit|bun|kup|egw|muk|igw|u k|u a|mbi|wii|kum|a z|aci|ku |yi | mi|yo |le |mas|yig|ubu|kka|i c| ab|ene|ne |no |a y| wa|abo|ndi|uta|syo|aya|aba|len|kuc|eya|o y|mal|ind|lem| lu|ukk|mo |eka|mil|mbo|ita|uka|ama|lik|u z|ndu|mu |nzy|zum|bal|abu|upe|bam|syi|u m|liz|int|ta |yak|ley|e b|nzi|lii|kab|uti|ube|uum|i n|cik|ezy|iib|iba|ani|iko|iin|ile|was| ca|zye|alw| aa|sya|uku|twa|min|tal|muc|umu| nk|du |azy|onz|lek|kon|buk|o m|yik|i z|lwe|u u|oba|kwi|imo|gan|zil|del|usu| we|peg|yee|ngw|sum|imb|ump|mpu|nde|end|i o|yoo|o n| nc|a u|mi |ano|uya|o c|di |mba|yil|yal|ako|a o|isy|izu|omb",
    "est": "sel|ja | ja|le |se |ust|ste|use|ise|õig|mis| va|gus|ele|te |igu|us |st |dus| õi| võ| on|on |e j| in|ini|nim|ma |el |a v|iga|ist|ime|al |või|da | te|lik| ig|adu|mes|ami|end|e k|e v|l o| ka|est| ra| se|õi |iku| ko|vab|aba|tus|ud |a k|ese| ku|l i|gal|tsi|lt |es |ema|ida|ks |a i|n õ|lis|atu|rah|tam|ast|sta|e t|s s| mi|ta |ole|stu|bad|ga |val|ine| ta|ne | pe|nda|ell|a t|ali|ava|ada|a p|ik |kus|e s|ioo|tes|ahe|ing|lus| ol|a a|is |vah|a s|ei | ei|kon|vas|tud|ahv|t k|as |a r|s t|e e|i v|eks|oon|t v|oni|kõi|s k|sio|sus|e a|gi |mat|min| pi|s v|oma|kul|dad| ni|e p| om|igi|tel|a j|e o|ndu|dse|lle|ees|tse|uta|vus|aal|aja|i t|dam|ats|ni |ete|pid|pea|e õ|its|lma|lev|nis|dis|ühi|sli|i s|nen|iel|des|de |t i|et |nin|eva|teg|usl|elt|ili|i m|ng | ee|tem|ses|ilm|sek|ab | põ|ait| ne|õrd|sed|võr|ul | üh| ki|abi| kõ|ega|rds| vä|ots| et| ri|põh|ed |töö|si |ad |i k| tä|ata| ab| su|eli| sa|s o|s j|sil|nni|ari|asu|nna| al|nud|uma|sik|hvu|onn|eab|emi|rid|ara|set|e m| ke|a e|täi|d k|s p|i e|imi|eis|e r|na | ül|a ü|koh|a o|aks|s e|e n| so|õik|saa|and|isi|nde|tum|hel|lii|kin|äär|sea|isk|een|ead|dum| kä|rii|rat|lem|umi|kor|sa |idu|mus|rit|har| si|vad|ita|ale|kai|teo| mõ|ade|üks|mas|lse|als|iaa|sia|sot|jal|iig|ite",
    "snk": "an | a | na|na |a n|ga | ga|en | su|re |a k| ka|su |a a|a s| ta|un | se|ta |ma | i |ama|do |e s|ere|ser|aan| do|nan|nta| ra|n s| ma| ki| ja|jam| da|taq|ne |a g|a d| ya|n d|ni | ku|ren|ri | si|ana|u k|n ŋ|ŋa | nt|e k|maa| ŋa|ndi|wa |aqu|ane| ba|ra |a r| sa|oro|n t|raa|tan| ke|oxo| xa|i s|di |a f|and|ti |a b| be|i k|gan|aax|aaw| go|iri|kit|awa|axu|sir|a i| du|a t|me |ara|ya |ini|xo |tta|i a|oll|ran|on |gol|e d|n g|a j|nde|aar|e m|be |a m|ari|u n|lli|ron| fa|qu | ti|n n|aad|axa| ña|o a| so|ke |nu | ko|din|lle|dan|a y|man|i g|sor|u r|i t| no|are|xar|kuu| wa|enm|ada|baa|de |qun|o k|yi |xun|i n|i x| an| ha|kan|fo |att|ang|n k|o s|dam|haa|da |n y|kat|e t|li | fo|i d| mo|nme|u b|i m|aba| fe|len| re|pa |ant|ayi|yan|e n|a x|e y|n b| di|ppa|app|kap|xa |u t|o g|mox|ure| xo|ond|i i|a ñ|n x|taa|du |ell| me|iti|xu |u d|udo|ind|uud|anu|nga|o b|nun|nox|n f|ku |aga|anŋ|dun|itt|eye|ye | bo|ore|ite|u a|oor| yi| ro|sar|saa|ill|e b| wu|le |riy|nma|ro |ken|edd|fed|bur| mu|mun|o n|iin|tey|sel| tu|u m|lla|la |ono|ñaa|den|faa|a w|te |inm|ka |aay| te|ina|xoo|o d|ira|u s|o t|nmu|nen|ban|ene| ni|ña |o i|uur|una|o m|xon|n w|kaf|gu |e g|a h|kil|yu |und|aqi|een| bi|bag|i j|n ñ|laa|i r|no |sig|igi|kor| o |i b|bat",
    "cjk": " ku|a k|yi |nyi| ny|la | mu|wa | ci|a c|a n| ha|we |a m|nga|ga |i k|kul|uli|sa |esw|ana|ela|a h|ung|ha |tel|swe|ze |ya |a u| ka| wa|uci| ya|ate|ci |mwe|kwa|ma |mbu|ji |kut|han|u m| ul|ang| mw|nat|ca | ca|e m|mu |uth|ali|i n|mut|thu|i m|e k|lit|hu |ina|ka |kup|na | ma|asa|aku|e n|a i|pwa|nji|wes|li | mb|e a|ifu|fuc|kan|bun|ize|ing|a y|anj|mba|uta|ita|i u| kw|muk|ite|kus|amb|lin|awa|imb|cip|lim|ong|esa|i c|nge| ak|ngu| ce| an|ili|ulu| na|naw|kuh|ama|upw|emu|lem|ila| un|a a|ula|ukw|aka|cif|ule|wo |has|kun|kha| xi|o n|tam| es|usa|ala|te |u c| ng|iku|cik|lya|wil|e c|ta |xim|wik| li|muc| ly|ikh|no |o m| in|i a|utu|e w|akw|mo |imo|mil| mi|i y|ba |ko |ngi|ufu|ku |lij|uka|iji|a w|umi|o w|tan|o y|e y|imw|ulw|uha|nal|so |o k| ye|i l|e u|umw|bu |aci|lwi|aha|ciz|mwi|kat|lon|u k|yes|ipw|ulo|aze|uni|wak|lo |ema|o c|aco| iz|kum|ika|e i|cim|isa|eny|umu|pem|yum|kwo| ik|kwe|e h|ngw|wam|cin|i h|a e|wan|ge |a x|was|le |kuk|uze|lik|gul|nin|pwe|o u|mah|ata|uma| up|sak|zan| uf|fun|go |wen|mbi|uso|ges|co |ngo|iki|hal|gik|ile|nda|kol|kal|kuz|ne | ja|oze|yoz|ikw|ipe|ces|swa|cis|man|i i|iso|ele|aso|waz|mi |upu| if|ise|umb|uvu|kil| it|i w|sok|o l|oko|nyo|una|bi |tum|iko|ene|hak|sem|a l|da |vul|nyu| ut| uk|eka",
    "ada": "mi |nɛ | nɔ| nɛ| e | he|he |nɔ | a |ɔ n|kɛ | kɛ|i k| ng|a n|i n|aa |e n|blɔ| bl|ɛ n|ɛ e|gɛ |ngɛ|e b|lɔ | ma| mi|ɛ h| ts| ko|hi |ɛ a| ɔ |ko |e h|ɛɛ |tsu| ni|ɔ k|a m|a k|i h|ma | ny|emi|a h|ami| be|be |i a|ya | si|e m|e j| ka|si |ɛ m|ɔ f| kp|nya| je|ni |oo |loo|o n| hi| fɛ|fɛɛ|a t|laa|a b|je |e k| pe|pee| ye|mɛ |umi|ɔ m| ha|a a|ɔmi|omi|kpa| wo|ɔ e|i t|ɛ ɔ|e s|i b|ɔ h| lo|ɛ k|ke |ha |bɔ |maa|mla|i m|ɔ t|ɔ́ |e p|kaa|ahi| sa|lɔh|ɔhi|sum|ɔ a|nɔ́|o e| na| gb|ee |e ɔ| ji|e a|i s| ml|ɛ s|sa | hɛ|ɔɔ |yem|u n|alo| jɔ| ku| lɛ| bɔ| to|a s|ɛ b|i l|lɛ |sua|o k|uaa|a j| su|ɛmi| ad|ɛ y|imi|ade| fa| al|jɔm|des|esa|eɔ |ihi|ji |ne |ɛ t|a e|ɛ j|ake|e e|kak|ngɔ|o a|eem|i j|e y|wo | bu|him|e w|́ k|ɔ y|tom|suɔ|ia |ane|mah| ya|o b| ke|e g|wom|gba|ue |ba | bi| gu|uo |e t|san|uu |pa |hia| tu| hu|suo| we|tsɔ|ɔ s|e f|kuu|gɔ |o m|a p| ja|ɛ p|fa |ɔ b|ɛ g|hɛɛ| ab|a l|hu |ye |na |tue|i ɔ|isi| sɔ|sɔs|jam|gu |ti |ɛ w|sis|o h|uɔ |li |a w| ba|sɔɔ|abɔ| ju| hl|ɔsɔ|hla|ɔ l|a y|sɛ | ɔm|ɔmɛ|i w|ɛti|pɛt|kpɛ|to | yi|asa| kɔ|nyu|akp|pak|kpe|sɔɛ|ɔɛ |u ɔ|yɛm|o s|uɛ | nu|pe |se | sɛ|o j|a g|ɔ w| wa|sem| pu|su |e l| mɛ|u k|hɛ |nih|kas| fɔ|kon|onɛ|bim|lam|imɛ|nyɛ| fi|hiɔ|usu|i p|bi | ní|yo |eeɔ|uam|bum|níh|íhi|o l|ula|kul|guɛ|naa",
    "bin": "e o|ne | ne|be |an |en |vbe| o |wan|mwa|n n|e e|emw|evb|mwe|in |na |e n| na| em|omw|e a|n e|e i| vb|re | ke|gha|gbe|wen| gh|ie |wee| om|e u| kh|bo |hia| ir|ha |o k|nmw|tin|n o|vbo|he |eti|ia |kev| ev| we| et|win|ke |ee |o n| hi|a n|a r|o r|gie|ran| ya|ira|mwi|a m| mw|a g|ghe|ogh| a | re| uh|eke| og|n k| no|ro |ye |khe| ye|hek|rri|nog|een|unm|a k|ogi|egb|ya |ere|wun|hun|mwu| mi|mie|de | rr|a e| ar|a o|n y|e v|o g|un |ra | ot| gb|uhu| ok|n i|ien|a v|rhi|e k|n a|i n|a y| ru|khi|n m|hie| eg|oto|arr|ba |ovb|u a|e y|ru |ian|hi |kpa| ra|o m|nde|yan|e w|and|to |o e|o h| ni| rh|e r|n g| er|n h|ugb|we |hae|on | iy|dom|rue|u e| or| ik|ren|a i|aro|iko|o y|n w|ben|ene|rio|se |i k|uem|ehe| ov|otu|okp|kug|oba|iob| uw|aen| do|iru|ae |tu |ue | iw| ma|wu |rro|o o|rie|n v| ug|a u|nna| al|ugh|agb|pa | ay|o w|ze |uwu|ma | eb|iye|aya|ugi|inn|gho|rre|nii|aku|gba|khu| se|yi |onm|ho |a w|ii |iwi| uy|uyi|e d| i |hin|obo|u o| ak|beh|ebe|uhi|bie|ai |da |i r|gbo|o v|won|mwo|umw| ag|ode| ek| la| um|aan| eh|egh|yin|anm|mo | kp| bi|kom|irr|i e|a a|kha|oda|bon|a d| ow|owa|ghi|n u|o a|yen|eem|ieg| az|aze|hoe| yi|oe |e g|ele|le |lug| ka|aa | as|yaa|gue|a h|mu |nre| od|n r|ero|ese| ku|enr|lel|vbi|wa |u i|a b|oro|bi ",
    "gaa": "mɔ | ni|ni |kɛ |ɛ a| ak|lɛ |i a| he|ɛ m|akɛ| lɛ| ko|gbɛ|ɔ n|ɛɛ | mɔ| kɛ|yɛ |li |ɛ e|ko |ɔ k|i e|aa | yɛ|bɛ | ml|shi|ɛ h|egb| gb|ɔɔ |mli| fɛ|fɛɛ|heg|nɔ |a a|i n|aŋ |oo | nɔ|i k|he |ɛ n| es| am|ɛ k|ɔ y| sh| ma|esa|loo|ji |maŋ|amɛ|emɔ|ɔ f|fee| ek| al|ɛi |ii |ɔ m|ɔ a|bɔ |e n|ɔ l|amɔ| eh|alo|hi |naa|ee |ɔmɔ|oni| en|o n|kon|aji|i y|i m|sa |o a|eli|umɔ| bɔ| hu|yel|hu |eem|nɛɛ|tsu| ah| nɛ|sum|tsɔ| an|nii|o e|baa| as|mɛi|yɔɔ|gbɔ|aaa|na |i h|eye|ɛ g|eɔ |ɛji| at|ana|eko|ena|o h|ŋ n|kom| ts|ɔ e|maj|i s|i l|efe|ome| kp|a l|kwɛ|ku |ehe|toi|a n|saa|bɔm|ha |a m|kɛj|kpa|hew| ku| sa| na|hiɛ| hi|ane|gba|e e|i f| mɛ|ɛ t|bɛi|ash|ŋ k|e k| ej|hey|aka|ats|ne |its|e a|san| ay|ye | je| kr| ey|mla|eŋm|nit|a h|ɔ b|ɛ s|anɔ|ŋmɔ|a e|ɛ b|jeŋ|ɛ y|aan|kro| ab| af|any|iaŋ|ɔ g|a k| yɔ|uɔ |shw|ets|ekɛ|usu|ŋŋ |ŋma|esh|u l| ba| et|iɔ |i j|o k|suɔ|oko| yi|e s| ag|afe|agb|oi |ŋ a|rok|o s| aw|ai | ji|ɛ j|aye|ŋ h|ish|nyɛ|la | ad|o m| ef|tsɛ|sɛ |wɔ |ewɔ|mɔɔ|ehi|aŋm|hwe| bɛ| to|ɔ h|jɛ |aha| ja|paŋ|alɛ|awo|sɔ |ŋts|ɛŋt|iɛŋ|bii|diɛ| di|mɛb|eni|his| ny|e b|hik|u k|ate|i b|ŋmɛ|akw|o y|eŋ |ahe| lo|me |ade|ɔ j|kɛn|teŋ|yeɔ|ɔ s|des| su|wal|nyɔ| eb| eg|ŋ m|mef|saŋ|ɛ l|o l|u n|asa|sem|jia|wɛ | em|o b|gbe|hil|ihi|hih|ɔŋ |nak|e h|sus|e g",
    "kng": " ya|na |ya |a k| na|a y|a m| ku|a n|a b| ba|u y|and|ka | mu|yin|wan|tu | lu|aka| mp|ve | yi|la |ntu| ki|mpe|pe |nda|a l|si |yan|ana|so | ke|e n|ons|nso|di |da |ndi|i y|u n|lu |mun|alu|unt|ina|e y|nza|luv|ala|uve| ma|u m|ke |za |ayi|sal|o m|ban|ndu|ta |isa|kan|ulu|i m|amb|ma |kim|u k|fwa| ny|nyo|yon|ama|ti |ang|anz|du |kus|o y| me|i n|to |ins|nsi|wa |usa| mo|kon|uta|end|i k|uka| bi|a d| ko|mbu|mos|sa | ve|ika|mu |osi|e k|uti|kuz|imp|a v|e m|und|ind| fw|ila| to|pwa|mpw|ngu|bal|adi|ba | sa|len|sam|sik|mab|tin|vwa|mba|kuk| di|yay|a t|yi | le|ant| ka|ata|isi|olo|kis|mut|ula|lo |bu |su | bu| at|amu|o n|dya|kut|dil| nz|ngi|abu|usu|but| nt|ni |bak|kul|e b|nga|e l|inz|imv|gu |wu | dy|lus|awu| ti|lak|bay|bun|kat|ngo|tal|i b|utu|kak|o k|bim|uzi|uza|mvu| ng|nak|iku|baw|esa|kin|ken|yak|mpa|luz|umu|nu |nta|dis|dik|vuk|u f|tan|sad|ati|nka|ank|luk|mak|ong| mb|ani|i l|lwa|aba|luy|uya|yal|ing|zwa|kuv|idi|ku |ga |zit|bis|uvw|uzw| ni|swa| nk|iti|mef|fun|ibu|nsa|aku|ufu|kub|lam|met|i a|mus|eta|a a|u t|twa|atu|tuk|fum|uko|iki|don|kol|kun|bam|eng|uku|ndo| ns|a s|ela|usi|pam|mvw|u b|i t|zo |anu|tis|uke|sul|te |gid|dib|yam|ilw| mf|ola|umb|uso|kam|gi |mbi|oko|nzi|i s| nd|mfu|luf|dus|bum|lut|mam|ded|wil|tad",
    "ndo": "na |oku|wa | na|a o|a n|ka |ntu| uu|tu |uth| om|e o|mba|ong|omu|ba | ok|uut| ne|he |the|ang|hem|emb|unt|o o|a u| wo|nge| iy|ehe|kal| no|a w|o n|no |nga|e n|ko |mun|oka|lo |o i|lon|we |ulu|a m|ala| ke|la |a k|u n|han|ku |gwa|osh|shi|ana|ngu|ilo|ano|ngo|keh| mo|ga |nen|man|ho |luk|tha|ge |gul|u k|eng|ha |a y|elo|uko|a e|ye |hil|uka|li |go |wan|ath|wo |thi|dhi|uun| pa|kwa| ta|a p|ya | sh| ko|nka|lwa| os|mwe|oma|ta |ema|sho| ka|e m| yo|sha|wok|ika|po |o w|onk|e p|pan|ith|a i|opa|gel|hik|iya|hi |aan|una|o g|kuk|alo|o e|nok|ndj|le |a a|men|yom|a s|i n| li|and| po|pam|lat|kan|ash|waa|aka|ame|gam|umb|a t|ond|yuu|o k|olo|ane|ing|igw|aa |ele|kul|mon| gw|ilw|gan|o y|iil|iyo| el|kut|nin|oko|ike|o m| ku|adh| ye|amw|ome|yeh|aye| ga| on| yi|a g|lyo|ne | ng|mbo|opo|kug|eko|yok|wom| oy|non|iye| go|ulo|e e| we| e |ina|ant|omo|ene| a |i k|mok|him| dh|und|ndu| me|eho|wen|nek| op|alu|e g|ima|kat|ota|oye|ila|ngw|yop|wat|ela|o u|a l| ii| ay| nd| th|o l|yon|ili|oon|okw|yaa|taa|lwe|omb| ni|aku|i m|mo |ula|ekw|enw|iyu|pok|epa|uki|ke | wu| mb|meh|e t|uni|nom|dho|pau|eta|yi | ly|o a|ono|lun|lak|ola|yo |lol|ank|bo |i o|awa|nwa|a h|naw|hok|nem|kom|ndo|o s|u t|vet|mbu|ani|uga|ndi|ukw|udh|lok|e k|alw|kwe|kun| ya",
    "quy": "chi|nch|hik|una| ka|anc|kun|man|ana|aq |cha|aku|pas|as |sqa|paq|nan|qa |apa|kan|ikp|ik |ech|spa| de|pa |cho|ere|der|rec|am | ru|an | ma| ch|kpa|asq|ta |na |nam|nak|taq|a k|qan|ina|run|lli|ach|nap|pi |mi | ll|yoq|asp|ima|hay|hin|aqa|nku|ant|ayn|oyo| hi| im|hoy|cio|nta|nas|q k|api|iw |wan|kuy|kay|liw|aci|ion|ipa|lla|oq |npa|ay |kas|a m|nac| na|inc|all|ama|ari|anp| ya|chu| hu|nin|pip|i k|qmi|hon|w r|ata|awa|a c|ota|in |yku|yna| wa|a h|has|a d|iku|a l| li|pan|ich|may| pi| ha|onc|a r|onk| ot|ku | qa|ank|aqm|mun|anm|hu |a p|nma| mu|qta|n h|pap|isq|yni|ikm|ma |wsa|aws|kaw|ibr|bre|lib|ayk|usp|nqa|e k| al|lin|n k|re |ara|nat|yac|kma|war|huk|uwa|yta|hwa|chw| sa|was|kus|yan|m d|kpi|q m|a i|q l|kin|tap|a a|kta|ikt|i c|a s|uy | ca|qaw|uku| tu| re|aqt|ask|qsi|sak|uch|q h|cas|tin|pak|ris|ski|sic|q d|nmi|s l|naq|tuk|mpa|a y|k c|uma|ien|ypi| am|qaq|qap|eqs|ayp|req|qpa|aqp|law|ayt|q c|pun| ni|a q|ruw|i h|haw|n c| pa|amp|par|k h| le|yma|ñun|ern|huñ|nni|n r|anq|map|aya|tar|s m|uñu|ten|val|ura|ita|arm|isu|s c|onn|igu| ri|qku|naw|k l|u l|his|ley|say|s y|rim|aru|rma|sun|ier|s o|qar|n p|a f|a t|esq|n a|oqm|s i|awk| va|w n|hap|lap|kup|i r|kam|uyk|sap| qe|ual|m p|ran|nya|gua| pe| go|gob|maq|sum|ast| su| ig",
    "rmn": "aj |en | te|te | sa| le|aka|pen| si| e |el |ipe|si |kaj|sar| th|and| o |sav|qe |les| ma|es | ha|j t|hak|ja |ar |ave| an|a s|ta |i l|ia |nas| aj|ne | so|imn|mna|sqe|esq|nd |tha|haj|e s|e t|e a|enq|asq|man| ja|kan|e m| i | ta|the|mes|cia|bar|as |isa|utn|qo |hem|o s|s s| me|vel|ark|i t| na|kas|est| ba|s h|avo| di|ard| bi| pe|rka|lo | ak|ika|e r|a a| pr|e k|qi |mat|ima|e p|a t| av|e d|r s|n s|anu|nuś|o t|avi|orr|o a| ka| re|n a|re |aja|e o|sqo|sti| ov|õl |l p|nqe|ere|d o|vor|so |no |dik|rel|ove|n t|ve |e b|res|tim|ren| de|àci|o m|i a|but|len|ali|ari|rre|de | pa|ver| va|sqi|ara|ana|vip|rak|ang|vi | ra|or |ker|i s|eme|e z|ata|e l|a e|rip|rim|akh|la |o p|kar|e h|a p|na |ane|rin|ste|j b|er |ind|ni |tne| ph|nip|r t| ke|ti |are|ndo| je|l a|uśi|e n|khi| bu|kon|lim|al |tar|ekh|jek|àlo|o k| ko|rde|rab|aba| zi|ri |aća|ćar|śik|dõl|dor|on |ano|ven| ni|śaj| śa|khe|ća |ast|j s|uti|uni|tni|naś|i d|mut| po|i p|a m| pu|a l|l s|som|n n|ikh|nik|del|ala|ris|pes|pe |j m|enć|e e|nća|ndi|rdõ|kri|erd|śka|emu|men|alo|nis|aśt|śti|amu|kh |tis|uj |j p|do |ani|ate|nda|o b|nge|o z|soc|a d|muj|o j|da |pri|rdo| as|cie|l t|ro |i r|kla|ing|a j| ze|zen|j e|ziv|hin|aśk| st|maś|ran|pal|khl|mam|i b|oci|rea|l o|nqo| vi|n e"
  },
  "Cyrillic": {
    "rus": " пр| и |рав|ств| на|пра|го |ени|ове|во | ка|ани|ть | в | по| об|ия |сво| св|лов|на | че|ело|о н| со|ост|чел|ие |ого|ет |ния|ест|аво|ый |ажд| им|ние|век| не|льн|ли |ова|име|ать|при|т п|и п|каж|или|обо| ра|ых |жды| до|дый|воб|ек |бод|ва |й ч|его|ся |и с|ии |аци|еет|но |мее|и и|лен|ой |тва|ных|то | ил|к и|енн| бы|ию | за|ми |тво|и н|о п|ван|о с|сто|аль| вс|ом |о в|ьно|их |ног|и в|нов|ако|про|ий |сти|и о|пол|олж|дол|ое |бра|я в| ос|ным|жен|раз|ти |нос|я и| во|тор|все| ег|ей |тел|не |и р|ред|ель|тве|оди| ко|общ|о и| де|има|а и|чес|ним|сно|как| ли|щес|вле|ься|нны|аст|тьс|нно|осу|е д| от|пре|шен|а с|бще|осн|одн|быт|сов|ыть|лжн|ран|нию|иче|ак |ым |ват|что|сту|чен|е в| ст|рес|оль| ни|ном|род|ля |нар|вен|ду |оже|ны |е и| то|вер|а о|зов|м и|нац|ден|рин|туп|ежд|стр| чт|я п|она|дос|х и|й и|тоя|есп|лич|бес|обр|ото|о б|ьны|ь в|нии|е м|ую | мо|ем | ме|аро| ре|ава|кот|ав | вы|ам |жно|ста|ая |под|и к|ное| к | та| го|гос|суд|еоб|я н|ен |и д|мож|еск|ели|авн|ве |ече|уще|печ|дно|о д|ход|ка | дл|для|ово|ате|льс|ю и|в к|нен|ции|ной|уда|вов| бе|оро|нст|ами|циа|кон|сем|е о|вно| эт|азо|х п|ни |жде|м п|ког|от |дст|вны|сть|ые |о о|пос|сре|тра|ейс|так|и б|дов|му |я к|нал|дру| др|кой|тер|ь п|арс|изн|соц|еди|олн",
    "ukr": "на | пр| і |пра|рав| на|ня |ння| за|ого| по|ти |го |люд| лю|во | ко| ма|льн|юди|их |о н| не|аво|анн|дин| св|сво|ожн|кож|енн|пов|жна| до|ати|ина|ає |а л| бу|аці|не |ува|обо| ос| як|має| ви|них|аль|або|є п| та|ні |ть |ови|бо | ві| аб|ере|і п|а м|вин|без|при|іль|ног|о п|ми |та |ом |ою |бод|ста|воб| бе|до |ва |ті | об|о в|ост| в | що|ий |ся |і с| сп|инн|від|ств|и п|ван|нов|нан|кон| у |ват|она|ії |но |дно|ій |езп|пер| де|ути|ьно|ист|під|сті|бут| мо|и і|ідн|ако|нні|ід |тис|що |род|і в|а з|ава| пе|му |і н|а п|соб|ої |а в|спр|ів |ний|яко|ду |вно|і д|ну |аро|и с| ін|ля |рів|у в| рі|и д|нар|нен|ова|ому|лен|нац|ним|ися|чи |ав |і р|ном| ро|нос|ві |вни|овн| її|ові|мож|віл|у п| пі| су|її |одн| вс|ово|ють|іст|сть|і з| ст|буд| ра|чен|про|роз|івн|оду|а о|ьни|ни |о с|сно|зна|рац|им |о д|ими|я і|ції|х п|дер|чин| со|а с|ерж|и з|и в|е п|ди |заб|осо|у с|е б|сі |тер|ніх|я н|і б|кла|спі|в і| ні|о з|ржа|сту|їх |а н|нна|так|я п|зпе| од|абе|для|ту |і м|печ| дл|же |ки |віт|ніс|гал|ага|е м|ами|зах|рим|ї о|тан|ког|рес|удь| ре|то |ков|тор|ара|сві|тва|а б|оже|соц|оці|ціа|осн|роб|дь‐|ь‐я|‐як|і і|заг|ахи|хис|піл|цій|х в|лив|осв|іал|руч|ь п|інш|в я|ги |аги| ді|ком|ини|а і|оди|нал|тво|кої|всі|я в|ною|об |о у|о о|і о",
    "bos": " пр| и |рав| на|пра|на |да |ма |има| св|а с|а п| да|а и| по|је |во |ко |ва | у |ако|но |о и|е с| за| им|аво|ти |ава|сва|и п|ли |о н|или|и с|их |вак| ко|ост|а у| сл|не |вањ| др|ње | не|кој|ња | би|ије|и д|им |ств|у с|јед|бод|сло|лоб|обо| ил|при| је|ање| ра|а д| об| су|е и|вје|се |ом |и и|сти| се|ју |дру|а б| ос|циј|вој|е п|а н|раз|су |у п|ања|о д|ује|а о|у и| од|и у|ло |ова|дје|жав|оје|а к|ни |ово|едн|ити|аци|у о|о п|нос|и о|бра| ка|шти|а ј|них|е о|пре|про|ржа| бу|буд|тре| тр|ог |држ|бит|е д|у з|ја |ста|авн|ија|е б|миј|и н|реб|сво|ђи |а з|ве |бил|ред|род|аро|ило|ива|ту |пос| ње| из|е у|ају|ба |ка |ем |ени|де |јер|у д|одн|њег|ду |гов|вим|јел|тва|за | до|еђу|ним| са|нар|а т| ни|о к|оји|м и| см| ст|еба|ода|ран|у н|дна|ичн|уђи|ист|вно|алн|и м| дј|нак|нац|сно|нст|тив|ани|ено|е к|е н|аве|ан |чно|и б|ном|сту|нов|ови|чов|нап|ног|м с|ој |ну |а р|еди|овј|оја|сми|осн|анс|ара|дно|х п|под|сам|обр|о о|руг|тво|ји | мо|его|тит|ашт|заш| кр|тељ|ико|уна|ник|рад|оду|туп|жив| ми|јек|кри| ов| вј| чо|ву |г п| оп|међ|њу |рив|нич|ина|одр|е т|уду| те|мје|ење|сви|а ч|у у|ниц|дни| та|и т|тно|ите|и в|дст|акв|те |ао | вр|ра |вољ|рим|ак |иту|ави|кла|вни|амо| он|ада|ере|ена|сто|кон|ст |она|иво|оби|оба|едс|как|љу ",
    "srp": " пр| и |рав|пра| на|на | по|ма | св|да |има|а п|а и|во |ко |ва |ти |и п| у |ако| да|а с|аво|и с|ост| за|о и|сва| им|вак|ава|је |е с| сл| ко|о н|ња |но |не | не|ом |ли | др|или|у с|сло|обо|кој|их |лоб|бод|им |а н|ју | ил|ств| би|сти|а о|при|а у| ра|јед|ог | је|е п|ње |ни |у п|а д|едн|ити|а к|нос|и у|о д|про| су|ање|ова|е и|вањ|и и|циј| ос|се |дру|ста|ају|ања|и о| об|род|ове| ка| де|е о|аци|ја |ово| ни| од|и д| се|ве |ује|ени|ија|авн|жав| ст|у и|м и|дна|су |ред|и н|оја|е б|ара|што|нов|ржа|вој|држ|тва|оди|у о|а б|одн|пош|ошт|ним|а ј|ка |ран|у у| ов|аро|е д|сно|ења|у з|раз| из|осн|а з|о п|аве|пре|де |бит|них|шти|ву |у д|ду |ту | тр|нар| са|гов|за |без|оји|у н|вно|ичн|еђу|ло |ан |чно|ји |нак|ода| ме|вим|то |сво|ани|нац| ње|ник|њег|тит|ој |ме |ном|м с|е у|о к|ку | до|ика|ико|е к|пос|ашт|тре|алн|ног| вр|реб|нст| кр|сту|дно|ем |вар|е н|рив|туп|жив|те |чов|ст |ови|дни|ао |сме|бра|ави| ли|као|вољ|ило|о с|штв|и м|заш|њу |руг|тав|анс|ено|пор|кри|и б|оду|а р|ла | чо|а т|руш|ушт| бу|буд|ављ|уги|м п|ком|оје|вер| ве|под|и в|међ|его|вре|акв|еди|тво| см|од |дел|ена|рад|ба | мо|ну |о ј|дст|кла| оп|как|сам|ере|рим|вич|ива|о о| он|вни|тер|збе|х п|ниц|еба|е р|у в|ист|век|рем|сви|бил|ште|езб|јућ|њен|гла",
    "uzn": "лар|ан |га |ар | ва| би|да |ва |ир | ҳу|ига|уқу|бир|ҳуқ|қуқ|ган| ҳа|ини|нг |р б|иш | та|ни |инг|лик|а э|ида|или|лиш|нин|ари|иши| ин|ади|он |инс|нсо|сон|ий |лан|дир| ма|кин|и б|ши |ҳар| бў|бўл| му|дан|уқи|ила|қла|р и|қиг|эга| эг| ўз|ки |эрк|қил|а б|оли|кла| эр|гад|лга|нли| ол|рки|и ҳ| ёк|ёки| қа|иб |иги|лиг|н б|н м| қи| ба|ара|атл|ри | бо|лат|бил|ин |ҳам|а т|лаш|р ҳ|ала| эт|инл|ик |бош|ниш|ш ҳ|мас|и в|эти|тил|тла|а ҳ|и м|а қ|уқл|қар|ани|арн|рни|им |ат |оси|ўли|ги | да|а и|н ҳ|риш|и т|мла|ли | ха|а м|ият| бу|рла|а а|рча|бар|аси|ўз |арч|ати|лин|ча |либ|мум| ас|аро|а о|ун |таъ| бе| ту|икл|р в|тга|тиб| ке|н э|ш в|мда|амд|али|н қ|мат|шга| те|сид|лла|иро| шу| қо|дам|а ш|ирл|илл|хал|рга| де|ири|тиш|умк|ола|амл|мки|тен|гин|ур |а ў|рак|а ё|имо| эъ|алқ| са|енг|тар|рда|ода| ша|шқа|ўлг|кат|сий|ак |н о|зар|и қ|ор | ми|нда|н в| си|аза|ера|а к|тни|р т|мил| ки|к б|ана|ам |ошқ|рин|сос|ас | со|сиз|асо|нид|асл|н ў|н т|илг|бу |й т|ти |син|дав|шла|на |лим|қон|и а|лак|эма|муҳ|ъти|си |бор|аш |и э|ака|нга|а в|дек|уни|екл|ино|ами| жа|риг|а д| эм|вла|лма|кер| то|лли|авл| ка|ят |н и|аъл|чун|анл|учу| уч|и с|аёт| иш|а у|тда|мия|а с|ра |ўзи|оий|ай |диг|эът|сла|ага|ник|р д|ция| ни|и ў|ада|рор|лад|сит|кда|икд|ким",
    "azj": " вә|вә |әр |лар| һә|ин |ир | ол| һү| би|һүг|үгу|гуг|на |ләр|дә |һәр| шә|бир|ан | тә|лик|р б|мал|лма|асы|ини|р һ|шәх|ән |әхс|ары|гла|дир|а м|али|угу|аг | ма|ын |илә|уна|јәт| ја|икд|ара|ар |әри|әси|рин|әти|р ш|нин|дән|јјә|н һ| аз|ни |әрә| мә|зад|мәк|ијј| мү|син|тин|үн |олу|и в|ндә|гун|рын|аза|нда|ә а|әт |ыны|нын|лыг|илм| га| ет|ә ј|кди|әк |лә |лмә|олм|ына|инд|лун| ин|мас|хс |сын|ә б|г в|н м|адл|ја |тмә|н т|әми|нә |длы|да | бә|нун|бәр|сы | он|әја|ә һ|маг|дан|ун |етм|инә|н а|рлә|си | ва|ә в|раг|н б|ә м|ама|ры |н и|әра|нма|ынд|инс| өз|аны|ала| ал|ик |ә д|ләт|ирл|ил | ди|бил|ығы|ли |а б|әлә|дил|ә е|унм|алы|мүд| сә|ны |ә и|н в|ыг |нла|үда|аси|или| дә|нса|сан|угл|уг |әтл|ә о|хси| һе|ола|кил|ејн|тәр|јин| бу|ми |мәс|дыр|һәм| да|мин|иш | һа| ки|у в|лан|әни| ас|хал|бу |лығ|р в| ед|јан|рә |һеч|алг| та|еч |и с|ы һ|сиа|оси|сос|фиә|г һ|афи|ким|даф| әс|ә г| иш|н ә|ији|ыгл|әмә|ы о|әдә|әса| со|а г|лыд|илл|мил|а һ|ыды|сас|лы |ист| ис|ифа|мәз|ыр |јар|тлә|лиј|түн|ина|ә т|сиј|ал |рил| бү|иә |бүт| үч|үтү|өз |ону| ми|ија| нә|адә|ман|үчү|чүн|сеч|ылы|т в| се|иал|дах|сил|еди|н е|әји|ахи|хил| ҹә|миј|мән|р а|әз |а в|илд|и һ|тәһ|әһс|ы в|һси|вар|шәр|абә|гу |раб|аја|з һ|амә|там|ғын|ад |уғу|н д|мәһ|тәм| ни|и т| ха",
    "bel": " і | пр|пра|ава| на|на | па|рав|ны |ць |або| аб|ва |ацы|аве|ае | ча|ння|анн|льн| ма| св|сва|ала|не |чал|лав|ня |ай |ых | як|га |век|е п| ад|а н| не|пры|ага| ко|а п| за|кож|ожн|ы ч|бод|дна|жны|ваб|цца|ца | ў |а а|ек |мае|і п|нне|ных|асц|а с|пав|бо |ам |ста| са| вы|ван|ьна| да|ара|дзе|одн|го |наг|він|аць|оўн|цыя|мі |то | ра|і а|тва| ас|ств|лен|аві|ад |і с|енн|і н|аль|най|аво|рац|аро|ці |сці|пад|ама| бы| яг|яго|к м|іх |рым|ым |энн|што|і і|род| та|нан| дз|ні |я а|гэт|нас|ана| гэ|інн|а б|ыць|да |ыі |оў |чын| шт|а ў|цыі|які|дзя|а і|агу|я п|ным|нац| у | ўс|ыя |ьны|оль|нар|ўна|х п|і д|ў і| гр|амі|ымі|ах | ус|адз| ні|эта|ля |воў|ыма|рад|ы п|зна|чэн|нен|аба| ка|ўле|іна|быц|ход| ін|о п| ст|ера|уль|аў |асн|сам|рам|ры | су|нал|ду |ь с|чы |кла|аны|жна|і р|пер|і з|ь у|маю|ако|ыцц|яко|для|ую |гра|ука|е і|нае|адс|і ў|кац|ўны|а з| дл|яўл|а р|аюч|ючы|оду| пе| ро|ы і|вы |і м|аса|е м|аду|х н|ода|адн|нні|кі | шл|але|раз|ада|х і|авя|нав|алі|раб|ы ў|нна|мад|роў|кан|зе |дст|жыц|ані|нст|зяр|ржа|зак|дзі|люб|аюц|бар|ім |ены|бес|тан|м п|дук|е а|гул|я ў| дэ|ве |жав|ацц|ахо|заб|а в|авы|ган|о н|ваг|я і|чна|я я|сац|так|од |ярж|соб|м н|се |чац|ніч|ыял|яль|цця|ь п|о с|вол|дэк| бе|ну |ога| рэ|рас|буд|а т|асо|сно|ейн",
    "bul": " на|на | пр|то | и |рав|да |пра| да|а с|ств|ва |та |а п|ите|но |во |ени|а н|е н| за|о и|ото|ван|не | вс|те |ки | не|о н|ове| по|а и|ава|чов|ни |ане|ия | чо|аво|ие | св|е п|а д| об|век|ест|сво| им|има|ост|и д|и ч|ани|или|все|ли |тво|и с|ние|вот|а в|ват|ма | ра|и п|и н| в |ек |сек|еки|а о| ил|е и|при| се|ова|ето|ата|воб|обо|бод|аци|ат |пре|оди|к и| бъ| съ|раз| ос|ред| ка|а б|о д|се | ко|бъд|лно|ния|о п| от|ъде|о в|за |ята| е | тр|и и|о с|тел|и в|нит|е с|ран| де|от |общ|де |ка |бра|ен |ява|ция|про|алн|и о|ият|ст |нов| до|его|как|ато| из|нег|а т|ден|а к|щес|а р|тря|а ч|ряб|о о|вен|ябв|бва|дър|гов|нац|ено|тве|ърж|е д|нос|ржа|а з|вит|зи |акв|лен| та|ежд|и з|род|е о|обр|нот| ни| с |т с|нар|о т|она|ез |йст|кат|иче| бе|жав|е т|е в|тва|зак|аро|кой|осн| ли|ува|авн|ейс|сно|рес|пол|нен|вни|без|ри |стр| ст|сто|под|чки|вид|ган|си |ди |и к|нст| те|а е|вси|еоб| дъ|сич|ичк|едв|жен|ник|ода|т н|о р|ака|ели|одн|елн|лич| че|чес|бще| ре|и м| ср|сре|и р|са |лни| си|дви|ичн|жда| къ|оет|ира|я н|дей| ме|еди|дру|ход|еме|кри|че |дос|ста|гра| то|ой |тъп|въз|ико|и у|нет| со|ави|той|елс|меж|чит|ита|що |ъм |азо|зов|нич|нал|дно| мо|ине|а у|тно|таз|кон|лит|ан |клю|люч|пос|тви|а м|й н|т и|изв|рез|ази|ра |оят|нео|чре",
    "kaz": "ен |не | құ|тар|ұқы| ба| қа|ға |ада|дам|құқ|ық | бо| ад|ықт|қта|ына|ар | жә|ың |ылы|әне|жән| не|мен|лық|на |р а|де | жа|ін |а қ|ары|ан | әр|қыл|ара|ала| ме|н қ|еме|уға|ның| де|асы|ам |іне|тан|лы |нды|да |әр |ығы|ста|еке| өз|ын |ған|анд|мес| бі| қо|ды |ің |бас|бол|етт|ып |н б|ілі|қық|нде|ері|е қ|алы|нем|се |бір|лар|есе|ы б|тын|а ж| ке|тиі|ост|ге |бар| ти|е б| ар|дық|сы |інд|е а|аты| та| бе|ы т|ік |олы|нда|ғын|ры |иіс|ғы | те|бос|луы|алу|сын|рын|еті|іс |рде|қығ|е ж|рін|дар|іні|н ж|тті|қар|н к|ім | ер|егі|ыры|ыны| са|рға|ген|ынд|аны|уын|ы м|лға|ана|нің|тер|уы |ей |тік|ке |сқа|қа |мыс|тық|м б|ард| от|е н|е т|мны|өзі|нан|гіз|еге| на|ы ә|аза|ң қ|лан|нег|асқ|кін|амн|кет|рал|айд|луғ|аса|ті |рды|і б|а б|ру | же|р м|ді |тта|мет|лік|тыр|ама|жас|н н|лып| мү|дай|өз |ігі| ал|ауд|дей|зін|бер|р б|уда|кел|біл|і т|қор|тең|лге| жү|ден|ы а|елі|дер|ы ж|а т|рқы|рлы|арқ| тү|қам|еле|а о|е ө|тін|ір |ең |уге|е м|лде|ау |ауы|ркі|н а|ы е|оны|н т|рыл|түр|ция|гін| то| ха|жағ|оға|осы|зде| ос|ікт|кті|а д|ұлт|лтт|тты|лім|ғда| ау| да|хал|тте|лма| ұл|амд|құр|ірі|қат|тал|орғ|зі |елг|сіз|ағы| ел|ң б|ыс | ас|імд|оты| әл|н е|ағд|қты|шін|ерк|е д|ек |ені|кім|ылм|шіл|аға|сты|лер|гі |атт|кен| кө|ым‐| кұ|кұқ|ра |рік|н ә| еш",
    "tat": " һә|лар|әм |һәм| ке| хо|кук|оку|хок|еше| бе|ләр|кеш|га |әр |рга|ан |кла| бу|ар |ең |нең|гә | то| ба|да |ргә| ти|ырг|һәр|ене|бер|ән |ен |р к|бул|укл|дә |а т|ары|тор|ире| үз|на |ган|ара| ка| ал|ә т|нә | ит| дә|ы б| ир|рын|ше |ын |енә|тие|лык|екл|ына|н т|иеш|бар|еле|ка |елә|а х|н б|кы |рек|ала|кар| та|ә к|нда|еш |лән|бел|укы|лан|ите|тә |шен|ле |лы |ез |ерг|н и|ә б|а к|клә|үз |тел|лыр|не |әрг|ы һ|е б| га| ха|алы|рне|м и|тен|әрн|а б|ның|ынд|ың |ләт|дан|сә | як|лга|улы|ел |а а| яи|яис|асы|ш т|а һ| са|рлә|лек|иге|ә х|гез|орм|ем |аны|р б|м а|р һ|рмы|мыш|сын|шка|ә һ|исә|тәр|үлә|әт |мәт|сен|сез|чен| ни|ә и|н м|илл|ять|ны |ылы|үзе| ки| эш| ту|алу|акы|ып |уга|ль |тан|н к|лу |бу |мас|рен|кә | тү| тә|түг|зен| җә|тын|ди |баш|кле|гән|ть | би|әре|штә|гын|әүл|ер |мил| ми|клы|гел|ыш |лер|ерл|әве|рдә|а я|р а| мә| рә|лем|хал| ан|ң т| аш|ык |ция|е х|стә|ә д|аль|рак|ек | де|рәв|тот|кән|улг|орг|веш|ешт|ни |итә|кка|м т|үге|шел|а и|ндә| да|рел|кер| кы|ерә|та |н я|еге|ый |а д|аци|р о|шла|тлә|әтл|н д|айл|ллә|ард|рда|кта|шкә| за|ге |ләш|ш б|әсе|кон|шыр|циа|нин|лау|уры|ры |оты|әне| тө|инд|нди| җи|оци|соц|лә |арт|якл|зак|тиг|рке| ди| со|ыкл|кем| ко|р и|ң б|әте|гыя|чар|үгә|ин |иле| сә| ил|мгы| ае|н а|аер|ыны|л һ",
    "tuk": " би|лар| ве|ве |да |ада|ары| хе|ир | ад|бир|дам|кла|ер |р б|ың | ха|ара|га |ен |лан|ыны|или|дыр|ам |ала| бо|хер|р а|ыр |лы |лер|ан |бил|иң |ыды|р х|акл|нда| өз|клы|ны |хук|ери| ху|уку|ага|не |лыд|ине|ына|лен|на |хак|де |‐да|ин |рын|атл| эд|маг|өз | де|асы|лыг|кук|е а|ынд|алы|лма|бол|дан|ини|а х| я‐|е х|ге |иле|я‐д|ар |ама|ли |ыгы|ети| ба| га|гын|ере|укл|лиг|ның|зат|лык|тлы|нде|ни |лик|ден|мак|сын|дил|ры |аны|кин|әге|п б|а г|хем|иги|эрк|аза|а д|мек| эр|мал|ыкл|мәг|сас| эс|екл| ма|рин|эса|ола|ы б|айы|н э|эди| гө| хи|сы | аз|баш|ы д|йда|шга|ашг|а в| до|ыет|ы в|дак|ниң|рки|гал|чин|гда|ак | җе|а б| эт|этм|кы |лет|йән| та|гин|ян |тме|хич|ич |мез| гу|хал|ылы|үнд|илм|дай|ягд| яг|и в|им |акы|ы г|ән |а а|рың|ги |тле|н м| го|ип |ал |еси| се|лме| ка|м х|дең|ң х|е д|дир|илл|рил| ал|кан|е г|лин|ра |дол| бе| ми|мил|ң д|н х|ели|н а|е м| ге|ы х| дө|ик | со|ң а|чил|дөв|е б| са|гар|е в|ең |н б|рма| ме|кли|үчи| дә| үч|ция|н в| дү|и б|айд|кле|сер|а я|соц|гор|оци|дал|мы |олм|циа|уң | он|уп |кда|дәл|ири| ди|еле|лип|алк|лим|гур|үни|нме| әх|н г| иш|ы ө|ң э|нун|еги|тин|ы а|рле|аци|ыз |з х|сыз|аха|м э|олы|рам| ту| ни|ып |ерт|алм|ора|и х|хли|әхл|к э|өвл|вле|тмә|ет |нли|ахс|гөз|гы |етл|ы ү|нуң|ону|сиз|емм|ек ",
    "tgk": "ар | ба| ҳа| да|ад | ва|он |ва | та|дар|ти | ин|ба | бо| ки|аро| до|ои |дор|ард|ки |бар|д ҳ|уқу| як|ин |ҳар|и о| на| ма|и м|ора| ҳу|як |ни |нсо|инс|и ҳ|аи |и б|сон|рад| му|ҳои|р я|ҳуқ|қуқ|ҳақ|ии |к и| ша|и д| аз|и и| оз|нд |яд |қ д|озо|аз |зод|анд|д б|ояд| ка|ият|она|да |амо|ақ |а б|ди | ё |гар|ат |дан|ҳам|оди|рда|моя| он|уда|қи | ху|бо |и т|дон|ст |нам|н ҳ|ода|и с|ан |н б|мил|и х|бош|они|оша|худ|ава|боя|аст|и а|ро | ме|а ҳ|имо|ила|оми|оба|ида|кар|н д|лат|д в|а ш|ҳо | ас|таҳ|рои|и н|д к|яти| ди|шад|ӣ в|ри |рдо|шав| ми|е к|роб|тар|та |кор| бе|о д|вад|мон|иҳо|ли |уд |оси|ошт|ми |р м|ати|т б| со|ӣ ё|нҳо|мин|шар|ара|таъ|ани|а в|иро|а д|дав|ят |даа| са|ама|дош|раф|шуд|лӣ |д а|оти|а м| фа|ист|ор |р ҳ|на |и к|р к|д т|и ҷ|и ш| эъ| су|н м|н в|и ӯ|фи |вар|диҳ|ига|зар| шу|ари|а т| иҷ| ақ| ҳи|асо|р б|т ҳ|а а|одо|мум|р в|а о| ӯ |рон|наз|диг| ни|бот| ҷа|авр| қа|яи |р д|уқи|лал|кас|шта|уна|еҷ |ино|тҳо|уни|або|сти| во|авл|и қ|вла|ун |у о|ӣ б| ҳе|дӣ |қу |чун|н и|сар|ояи|тав|маҳ|онҳ|қар|атҳ|тир|оҳ |ахс| қо|уқ |оли| ис|д д|и з| ко|аза|ори|фар|сос|ран|н к|р а|ҷти|ону|сӣ |ири|рра|рӣ |ҳеҷ| за|ид |ҳти|рии|ами|қон|уди|н н| од|иҷт|мия|ъло|лом|ию |наи|али|нда|оӣ |оят|янд| зи|оян|ӣ ҳ|и п|офи|киш|ҳим|рат|тим",
    "kir": " жа|на |ана|жан| би|уу |уку|га |бир| ук|ар |ен |луу|тар|кук|укт| ка| ад|ын |ада|ууг|дам| ме|уга|ык | ар|ене|мен|нен|ан |ары|олу| бо|ин |ам |ган|ир |бол| ал|ара|нда|н к|туу|р б|н ж| ба|анд| же|р а|кта|ына|ард|кту|эрк|үн |да |н б|н э| эр|нди|а т| ко|рды|н а|дык|рки|инд|а ж|кин|ала|а а|лар|аны|үү | өз|а к|тер|алу| та|а у|алы|а э|же |ук |ийи| ти|иш |тий| ма|гө |кыл|йиш|улу|нын|ке |н т|кар|бар|или|у м| кы|иги|рын|а б|үгө|рга|е а|ун |етт|дик| ту|дар|тта|баш|у а|н у| ээ|дын|им |рүү|гин|лык|ушу|нды|тур| са| эл| эм| мү|гон|лга|алд|икт|үүг| бе|ры |өз |нан|он | ан|кте|ул |дай|ерд|диг|р м|ери|үчү| не|атт|лды|еке|еги|үнө|лук|амд|у б|ынд|үнү|рди|тук|ка |кан|к ж| ки|м а|күн|не |ине|мда|рин|ого|кет| со|кам|дин|к м| эч| то|сыз|ылу|өзү| де|н м|ция|ээ |чүн|гиз|уп |нег|эч |руу|ыз |мес|эме| иш|лут|ы м|шка|ыкт|мам|ашк|лде| ке|лго| тү|ө ж|олг|ес |к т|кор|ге |бил|түү|угу|рал|алг|тын|кен| ул|лим|утт|ыгы|орг|н н|у ж|рде|нуу|тал|ч к|рго|мак| те| уш|уну|ктө|ди |акт|нүн| ди|зүн|иле| кө|кат|аци|мсы| эс|тык|е к|ей |тан|е э|ай |ер |соц|оци|циа|аты| жо|к к|амс|лан|а м|ири|ске|айд|ирд| мы|ылы|зги|ыны|ага|ген|е б|шул|тол|өнү|дыг|е ж|ү ү|з к|айы|раб|енд|абы|жал|ү ж|оо |уна|к а|кал|лек|ект|рма|дей| үч|тоо|мат|у э|бер",
    "mkd": " на|на | пр| и |во | се|то |ите|те |рав|та |а с|пра|ува|да | да| не|ва |а п|а н|и с|ата|о н|еко|а и| по|но |ој |кој| со| за| во|ств|ја |ње |ање|аво|ни | им|от |е п|е н|ма |ат |вањ|ост|а д|о с|е и|се |ова|ија|и п| сл|а о|има|сек|сло|ото|ли |о д|ава|обо|о и| ил|или| би|бод|и н|лоб| од|бид|ред|ен |при|вот|иде|а в|ста| об|и и|и д|пре|нос|ст |е с| ни| ќе|ове|аат|аци|ќе |со |ови|про|ј и|тво| ра|ест|што| де|т и|акв| ко|раз|гов|его|нег|ани|едн|ако|циј|бра|од |а з|е б|и о|а б|о п|ват| е | др|ето|ваа|как|ди |т с| ка| чо|ени|алн|одн|ено| си|чов| шт|а г|а е|вен|нит| ја|де |оди|е о|ран|и з|сно|нот| ед|тит|лно|ви |јат|ден|т н|нац| оп| до| ос|и в|осн|кон|дна|е д| ст|век|о о|род|сто|сит|еме|ара|дно|обр|ј н|пшт|еди|опш|за |ние|аро|нов|а к|вни|дру| ов|тве|жив|ште|д н|ие | ме|ед |иот|и м|о в|ќи |дат|шти|јќи|без|бед|ки |ков|ко |а р|нар|чно|дни| вр|ели|нак|ашт|ичн|ка |ема|цел|зем|еду|чув|тес|држ|ник|т п|луч|аа |деј|нст|не |а ч|руг|ода|ивн| це|нив|дин|авн| зе|нио|пор|а м|заш|лас|вит|дек|го |ине|ело|нет|ез |тен| ре| из|под|раб|або|бот|дув|нув| бе|ење|еде|он |њет|зов|иту|ван|н и|аѓа|е в|еѓу|рем|дел|о к|кот|им | жи|дос|вре|меѓ|олн|нап| го|емј|кри|уна|нем|оја| су|ита|азо|лит|тор|инс|ора|огл|ипа|пот|слу|кви",
    "khk": " эр|эрх| хү|ний|н б|эн |тэй|ийг|х э|эй | бо|хүн| бү|йн |ан |ах | ба|ийн|бол|ий | ха|бай|уул|рх |оло|й х|йг |гаа|эх |бүр|гүй|үн | бу|он |аар|рхт|үнд|хтэ|үр |лэх|ар | за|н х|лах|эр | хэ|й б|өлө|н э|лөө|эл | үн|аа | ул|ын |хий|үй | ор| ту|улс|ула|үлэ| чө|чөл|н т|үүл| ху|сэн| ни|ндэ|лон|гээ|р х|өөр|сан| нэ|ны | ёс|нь |эд | гэ| нь| ч | тө| тэ|лаг|оро|дэс|лс |г х|ох |үни|ээр|хам|х ё| ша|д х|р э|лго|лд | дэ|н а|бую|уюу|гуу|төр|ай |юу |тай|ээ |ж б|эг |лий|хан|ыг | эд| то|х б|дсэ|й э|рга| ал|хар|арг|ад |лга|рэг| зо|айг|ага| тү|л х|ал | хө|өөт| са|н н|йгэ|дэл|нд |гий|н з|ол |ава|лла| өө|рол|өтэ|гэр|г б|л б|бус|нэг|н д|аг |аал|н ү|алд|рла| үз|гэм|й а|н у| ол|хуу|х ч|эрэ|мга|олг|эс |хүү|той| ар|үү |лал| эн| мө|йх |ин |өрө|х т|луу|рий|сон| га|хэн|айх|эни| ам|гла|өр |аса|ана|амг| би|ард| ял|йгм|ой |лын|үрэ|эгт| ав|эдэ|оо |мий|х н|аан|үйл|арл|нха|тгэ|дээ|с о|рхи|лов|д н|тэг|өг |өн |хэр|лэн|өөг|үүн|вср|га |р т| хи|хүр|рон|ч б| хо|гөө| мэ|бие|н г|ура|бүх|ори|али| аж| үй| яв|өх |хээ|г н|ата| та|гш |г ү|эгш|вах|лох|эгд|длэ|х ү|гох|үх |энэ|лж |олц| шү|л т| да|дал|эж |д б|лан|й т|айл|л н|х а|агл|тоо| со|өри|йгу|гми|дил|ээн|дар|н ш|шүү|овс| ад|а х|р ч|ади|ааг|лаа|айд|амь|гтэ|н с|д т|ийт|лэл|х ш|н ч|унх"
  },
  "Arabic": {
    "arb": " ال|ية | في|الح|في | وا|وال| أو|ة ا|أو |الم|الت|لحق|حق |لى |كل |ان |ة و|الأ| لك|لكل|ن ا|ها |ق ف|ات |مة |ون |أن |ما |اء |ته |و ا|الع|ي ا|شخص|ي أ| أن|الإ|م ا|حري| عل|ة ل|من |الا|حقو|على|قوق|ت ا|أي |رد | شخ| لل| أي|ق ا|لا |فرد|رية| ول| من|د ا| كا| إل|خص |وق |ا ا|ة أ|ا ي|ل ف|ه ا|نسا|جتم|ن ي|امة|كان|دة | حق|ام |الق|ة م| فر|اية|سان|ل ش|ين |ن ت|إنس|ا ل| لا|ذا |هذا|ن أ|لة |ي ح| دو|ه ل|لك |ترا|لتع|اً |له |إلى| عن|ى ا|ه و|ع ا|ماع|د أ|اسي| حر|ة ع|مع |الد|نون| با|لحر|لعا|ن و|، و|يات|ي ت|الج| هذ|ير |بال|دول|لإن|عية|الف|ص ا| وي|الو|لأس| إن|أسا|ساس|ماي|حما|رام|سية|انو|مل |ي و|عام|ا و|تما| مت|ة ت|علي|ع ب|ك ا| له|ة ف|قان|ى أ|ول |هم |الب|ة ب|ساو|لقا|الر|لجم|ا ك|تمت|ليه|لتم|لمت|انت| قد|اد |ه أ| يج|ريا|ق و|ل ا|ا ب|ال |يه |اعي|لدو|ل و|لإع|لمي|لمج|لأم|تع |دم |تسا|عمل|اته|لاد|رة |اة |غير|قدم|وز |جوز|يجو|عال|لان|متع|مان|فيه|اجت|م و|يد |تعل|ن ل|ر ا| يع| كل|مم |مجت|تمع|دون| مع|تمي|ذلك|كرا|يها| مس|ميع|إعل|علا| تم| عا|ملا|اعا|لاج|ني |ليم|متس|ييز|يم |اعت|الش| تع|ميي|عن |تنا| بح|لما|ي ي|يز |ود |أمم|لات|أسر|شتر|تي | جم|ه ع|ر و|ي إ|تحد|حدة| أس|عة |ي م|ة، |معي|ن م|لمس|م ب|اق |جمي|لي |مية|الض|الس|لضم|ضما|لفر| وس|لحم|امل|ق م|را |ا ح|نت | تن|يته| أم|إلي|واج|د و|لتي| مر|مرا|متح| ذل| وأ| تح|ا ف| به| وم| بم|وية|ولي|لزو",
    "urd": "ور | او|اور| کی|کے | کے|یں | کا|کی | حق|ے ک|ایٔ|کا |یٔے| کو|یا |نے |سے | اس|ٔے |میں|کو | ہے| می|ے ا| ان|وں | کر| ہو|اس |ی ا|ر ا|شخص| شخ|حق | سے| جا|خص |ہر |ام |ے م|ں ک|ہیں| یا|سی |ادی|آزا| آز|زاد|ص ک|ہ ا|ہے |جای|ا ح|ر ش|ت ک|کہ |م ک| پر|ی ک|ان |پر |۔ہر|دی |یٔی|س ک|ا ج|ر م|ہے۔|ق ہ|ں ا|ی ح|و ا|ار |ن ک|قوق|کسی|حقو|ری |وق |ے گ| ہی|ی ج| مع|سان| نہ| مل| حا|ٔی | جو|نی |کرن| لی|تی |ی ت|نسا|ل ک| کہ|جو |انس|اپن|ے ب|نہ | اپ|یت |ا ا|ہ ک| کس|ر ک|رے |ے ہ| ای|می |ل ہ|۔ ا|ے ل|ی ش|رنے|وہ |حاص|ی م|معا|اصل|صل |یں۔|ویٔ|نہی|ملک|ایس|انہ|ات |ی ب|د ک|ی ہ| تع|کیا|ق ک|ر ہ|ا م|دہ | من| بن| قو|ے ج|یہ |ں م|اشر|مل | دو|عاش|قوم|ر ب|انی|وام|قوا|اقو|لیٔ|دار| وہ| و | عا|ی س|بر |علا|اد |ہ م|و ت|ر ن| جس|ے۔ہ|ے، |انو| دی|گی |لیم|یوں| قا| یہ|دوس|ے۔ |ا ہ|تعل|یم |ر پ|جس |ریق|ے ح| اق|نیا|لک | گی|ین |یاد| مس|لاق|، ا|ی ن|پنے|وری|م ا| با|علی|یر |ی، |انے|ون |ن ا|ر ع| بر|ی آ|ر ح| رک|ے پ|کر |گا۔| پی|سب | گا|نا | پو|یسے|رای| مر|اری|قان|نون| مم|ندگ| اع|دگی|ہ و| ہر|ر س| چا|خلا|ا پ|ق ح| بھ|س م| شا|ہوگ|ے خ|وسر|رتی|ومی| بی|رکھ| مت|کوی|ر آ|پور|اف | مح|ے س|ہوں|نکہ|ونک|ت ا| طر|ے ع|یٔد|د ا|ال |ں۔ |م م|اں | مق|غیر|پنی| ام|ں، |من |ہو |ریع|و ک|ذری| ذر|عام|، م|دان|ادا|اعل|مام|تما| عل|دیو|بھی|ھی |بنی|ے ی|ا ک|اوی|ل م| زن|یاس|لان|عمل| عم|ت م| بچ",
    "skr": "تے |اں | تے|دے |دی |وں | دا| حق| کو|ے ا|کوں| دے|دا | دی|یاں| کی|ے ۔|یں |ہر | ۔ |کیت|ہے | وچ| ہے|وچ | ان| شخ|شخص|ادی|ال | حا|اصل|حق |حاص|ے م|خص |صل |ں د| نا|یا | ای|اتے|ق ح|ل ہ|ے و|ں ک| ات|ہیں|سی | مل|نال|زاد|ازا|ی ت| از|قوق|ار |ا ح|حقو| او|ص ک| ۔ہ|۔ہر|ر ش|دیا|ے ج|وق |ندے| کر|یند| یا|نہ | جو|کہی|ئے |ی د|سان|نسا|وند|ی ا|یتے|انس|ا ا|ملک|ے ح|و ڄ|ے ک|ڻ د| وی|یسی|ے ب|ا و| ہو|ں ا|ئی |ندی|تی |آپڻ|وڻ |ر ک|ن ۔| نہ|انہ|جو | کن| آپ| جی|اون|ویس|ی ن| تھ| کہ|ان |ری |ڻے | ڄئ| ہر|ے ن|دہ |ام |ں م|ے ہ|تھی|ں و|۔ ا|ں ت|ی ۔|کنو|ی ح|ی ک|نوں|رے |ہاں| بچ|ون |ے ت|کو | من|ی ہ|اری|ور |نہا|ہکو|یتا|نی |یاد|ت د|ن د| ون|وام|ی م|قوا|تا |ڄئے|پڻے| ہک|می | قو|ق ت|ے د|لے |اف |ل ک|ل ت| تع|چ ا|ین |خلا|اے |علا| سا|جیا|ئو |کرڻ|ی و|انی|ہو |دار| و |ی ج| اق|ن ا|یت |ارے|ے س|لک |ق د|ہوو| ڋو|ر ت| اے|ے خ| چا| خل|لاف|قنو|نون|پور|ڻ ک| پو|ایہ|بچئ|چئو|ات |الا|ونڄ|وری|این| وس| لو|و ا|ہ د| رک|یب |سیب|وسی|یر |ا ک|قوم|ریا|ں آ| جا|رکھ|مل |کاں|رڻ |اد |او |عزت| قن|ب د|وئی|ے ع| عز| ۔ک| مع|اقو|ایں|م م|زت |ڻی |یوڻ|ر ہ| سم|ں س|لوک| جھ| سی|جھی|ت ت|ل ا|اوڻ|کوئ|ں ج|ہی |حدہ|تعل|ے ذ|وے |تحد|متح|لا |ا ت|کار| اع|ے ر| مت|ر ا|ا م|ھین|ھیو|یہو| مط| سڱ|ی س|ڄے |نڄے|سڱد|لیم|علی|ے ق| ذر|م ت| کھ|ن ک| کم|ہ ا|سار|ائد|ائی|د ا| ہن|ہن |ی، |و ک|ں ب|ھیا|ذری|ں پ|لی ",
    "uig": " ئا| ھە|ىنى|ە ئ|نىڭ|ىلى| ۋە|ىڭ |ۋە | ئى| بو|ھوق|وقۇ| ھو|قۇق|نى |بول| ئە|لىك|قىل|ىن |لىش|شقا|قا |ەن | قى|ن ب|ھەم|ى ئ|ئاد|ىشى|دەم|ادە|كى |لىق|غان|ىي |ىغا|گە | بى|دىن|ىدى|ەت |كىن|ىكى|ندا|ۇق | تە|نلى|تىن|ەم |لەت|قان|ىگە|ىتى|ىش |ھەر|ئەر| با|ولۇ|دۆل|غا |اند| دۆ|اق |مە |لۇش|دە |لۇق| ئۆ|ان | يا|ەرق|ۆلە|ركى| قا|ەرك|ەمم|ا ئ|ممە|ۇقى|ىق | بە|رقا|داق|ارا|ىلە|رىم|ىشق|ى ۋ|لغا|مەن|اكى|ەر |ا ھ|دۇ |ياك|ۇقل|ئار|ق ئ|ىنل|لار| ئې|ى ب|لىن|ڭ ئ|ئۆز|ق ھ|شى |ىمە|قلۇ|ن ئ|لەر|ەتل|نىش|ىك |ەھر| مە|ھرى|لەن|ىلا|ار |بەھ| ئۇ|ە ق|ئىي|اسى| مۇ|رلى| ئو|بىر|، ئ|بىل|ش ھ|بار|ى، |ۇ ھ|ايد|ۇشق|شكە|ە ب|يەت|ا ب|رنى|كە |ىسى| كې|ېلى|الى|ەك |م ئ|ماي|ولم|تنى|ىدا|ارى|يدۇ|لىد| قو|ەشك|تلە|ك ھ|انل|ەمد|مائ|ئال|ر ئ|مدە|ىيە|ش ئ|ە ھ|لما|ائى|ئىگ|دا |ي ئ|ۇشى|راۋ|ا، |سىي| تۇ|كىل|ە ت|ىقى|قى |ۆزى|ېتى|ىرى|ىر |ىپ |ى ك|ن، |ر ب|لەش|اسا|اۋا|ى ھ|شلى|ساس|ادى|تى |اشق|ەتت|قىغ|ىما|انى| خى|ۇرۇ| خە|ن ق|منى| خا|چە |ى ق| جە|رقى|تىد| ھۆ|باش|ارل|ئىش|تۇر| جى|مۇش|نۇن|شۇ |انۇ|ۇش |رەك|ېرە|كېر| سا|الغ|ۇنى|ئېل|ىشل|تەش|خەل|مەت|اش |دىغ|كەن|ەلق|تىش|مىن|ايى|سىز|ق ۋ|نىي|جىن|رىش|پ ق| كى|ېرى|ئاس|ەلى| ما|تتى|ىرل|ولى| دە|ارق|سىت|ە م| قە|شىل| تى|ەرن|كىش|ن ھ|ەلگ|ەمن|ك ئ| تو|ى ي|قتى|ئاش|تىم|تەۋ|ناي|ىدە|ىنا| بۇ|ىيا|زىن|امى|قار|شكى|ىز | ئۈ|ەۋە|ۆرم|ە خ|شىش|ىيى|جتى|ىجت|ئىج|نام|تەر",
    "pes": " و | حق| با|که |ند | که| در|در |رد | دا|دار|از | از|هر | هر|یت |ر ک|حق |د ه|ای |د و|ان | را|ین |ود |یا | یا|را |ارد|ی و|کس | کس| بر| آز|باش|ه ب|آزا|د ک| خو|ه ا|د ب|زاد| اس|ار | آن|ق د|شد |حقو|قوق|ی ب|وق |ده |ه د|ید |ی ک|و ا|ور |ر م|رای|اشد|خود|ادی|تما|ری | اج|ام |دی |اید|س ح|است|ر ا|و م| ان|د ا|نه | بی|با | هم| نم|مای| تا|د، |ی ا|انه|ات |ون |ایت|ا ب|ست | کن|برا|انو| بش| مو|این| مر|اسا| مل|وان|ر ب|جتم| شو| اع|ن ا|ورد| می| ای|آن | به|و آ|ملل|ا م|ماع|نی |ت ا|، ا|ت و|ئی |عی |ائی|اجت|و ب|های|ن م|ی ی|بشر|کند|شود| من| زن|ن و|ی، |بای|ی ر| مس|مل |مور|ز آ|توا|دان|اری|علا|گرد|یگر|کار| گر| بد|ن ب|ت ب|ت م|ی م| مق|د آ|شور|یه |اعی| عم|ر خ|ن ح| کش|رند|مین| اح|ن ت|ی د| مت|ه م|د ش| حم|و د|دیگ|لام|کشو|هٔ |ه و|انی|لی |ت ک| مج|ق م|میت| کا| شد|اه |نون| آم|اد |ادا|اعل|د م|ق و|ا ک|می |ی ح|لل |نجا| مح|ساس|یده| قا|بعی|قان|ر ش|مقا|ا د|هد |وی |نوا|گی |ساو|ر ت|بر |اً |نمی|اسی|اده|او | او| دی| هی|هیچ|ه‌ا|‌ها|یر |خوا|د ت|همه|ا ه|تی |حما|دگی|بین|ع ا|سان|ر و|شده|ومی| عق| بع|ز ح|شر |مند| شر|ٔمی|أم|تأ|انت|اند|اوی|مسا|ردد|بهر| بم|ارن|یتو|ل م|ران|و ه|ر د|م م|رار|عقی|سی |و ت|زش | بو|ا ا|ی ن|موم|جا |عمو|رفت|عیت| فر|ندگ|واه|زند|م و|نما|ه ح|ا ر|دیه|جام|مرد|ت، |د ر|مام| تم|ملی|نند|الم|طور|ی ت|تخا|ا ت|امی|امل|دد | شخ|شخص"
  },
  "Devanagari": {
    "hin": "के |प्र|और | और| के|ों | का|कार| प्|का | को|या |ं क|ति |ार |को | है|िका|ने |है |्रत|धिक| अध|अधि|की |ा क| कि| की| सम|ें |व्य|्ति|क्त|से | व्|ा अ|्यक|में|मान|ि क| स्| मे|सी |न्त| हो|े क|ता |यक्|क्ष|ै ।|िक |त्य| कर|्य | या|भी | वि|रत्|र स|ी स| जा|स्व|रों|्ये|ेक |येक|त्र|िया|ा ज|क व|र ह|ित |्रा|किस| अन|ा स|िसी|ा ह|ना | से| पर|र क| सा|देश|गा | । | अप|्त्|े स|समा|ान |ी क|्त |वार| ।प|ा प| रा|षा |न क|।प्|ष्ट|था |अन्| मा|्षा|्वा|ारो|तन्|वतन|ट्र|्वत|प्त|ाप्|्ट्|राष|ाष्| इस|े अ| उस| सं|राप|कि |त ह|हो |ं औ|ार्|ा ।|किय|े प| दे| भी|करन|री |जाए|ी प| न |र अ|क स|अपन|े व|ाओं|्तर|ओं | नि|सभी|रा | तथ|तथा|िवा|यों|पर | ऐस|रता|ारा|्री|सम्| द्|ीय |िए |व क|सके|द्व|होग| सभ|ं म|माज|रने|िक्|्या|ा व|र प| जि|ो स|र उ|रक्|े म|पूर| लि|ाएग| भा|इस |त क|ाव |स्थ|पने|ा औ|द्ध|श्य|र्व| घो|घोष|रूप|भाव|ाने|कृत|ो प|े ल|लिए|शिक|ूर्| उन|। इ|ं स|य क|्ध |दी |ी र|र्य|णा |एगा|न्य|रीय|ेश |रति|े ब| रू|ूप |परा|्र |तर्| पा| सु|जिस|तिक|सार|जो |ेशो| शि|ानव|ी अ|चित|े औ| पू|ियो|ा उ|म क|ी भ|शों| बु|म्म|स्त|िश्|्रो|्म |ो क| यह|र द|नव |चार|दिय|े य|र्ण|राध|ोगा|ले |नून|ानू|ोषण|षणा|विश| जन|ारी|परि|गी |वाह|साम|ाना|रका| जो|ाज |ी ज|ध क|बन्|ताओ|ंकि|ूंक|ास |कर |चूं|ी व|य ह|ा ग|य स|न स|त र|कोई|ुक्|ोई | ।क|ं न|हित|निय|याद|ादी|्मा|्था|ामा|ाह |ी म|े ज",
    "mar": "्या|या |त्य|याच|चा | व |ण्य|प्र|कार|ाचा| प्|धिक|िका| अध|अधि|च्य|ार |आहे| आह|ा अ|हे | स्|्रत|्ये|ा क|स्व| कर|्वा|ता |ास |ा स|ा व|त्र| त्|वा |ांच|यां|िक |मान| या|्य | का| अस|रत्|ष्ट|र्य|येक|ल्य|र आ|ाहि|क्ष| को|ामा|कोण| सं|ाच्|ात |ा न| रा|ंत्|ून |ेका| सा|राष|ाष्|चे |्ट्|ट्र|तंत| मा|ने |किं| कि|व्य|वात|े स|करण|ंवा|िंव|ये |क्त| सम|ा प|ना | मि|कास|ातं|्र्|र्व|समा|मिळ| जा|े प|व स|यास|ोणत|रण्|काम|ीय |ा आ| दे|े क|ांन|हि |रां| व्|्यक|ा म|िळण|ही | पा|्षण|ार्|ान |े अ| आप| वि|ळण्|ाही|ची |े व|्रा|मा |ली |ंच्|ारा|ा द| आण| नि|णे |द्ध| नय|ला |ा ह|नये| सर|सर्|्री|बंध|ी प|आपल|ले |ील |माज| हो|्त |त क|ाचे|्व |षण |ंना|लेल|ी अ|देश|आणि|णि |ध्य| शि|ी स|े ज|शिक|रीय|ानव|पाह|हिज|िजे|जे |क स|यक्|न क|व त|ा ज|यात|पल्|न्य|वी |स्थ|ज्य| ज्|े आ|रक्|त स|िक्|ंबं|संब| के|क व|केल|असल|य अ|य क|त व|ीत |णत्|त्व|ाने| उप|्वत|भाव|े त|करत|याह|रता|िष्|व म|कां|साम|रति|सार|ंचा|र व|क आ|याय|ासा|साठ|ाठी|्ती|ठी |ेण्|र्थ|ीने|े य|जाह|ोणा|संर|ायद|च्छ|स स|ंरक|तील|ी व|त आ|ी आ|ंधा|ेशा|ित | अश|हीर| हक|हक्|क्क|य व|शा |व आ|तीन|ण म|ूर्|ेल्|द्य|ेले|ांत|ा य|ा ब|ी म|ंचे|याव|देण|कृत|ारण|ेत |िवा|वस्|स्त|ाची|नवी| अर|थवा|अथव|ा त| अथ|अर्|ती |पूर|इतर|र्ण|ी क|यत्| इत| शा|रका|तिष|ण स|तिक|्रक|्ध |रणा| आल|ेल |ाजि| न्|धात|रून|श्र|असे|ष्ठ|ुक्|ेश |तो |जिक|े म",
    "mai": "ाक | आ |प्र|कार|िका|धिक|ार |्रत|ेँ |क अ|्यक|िक |्ति| अध|व्य|अधि|क स| प्|क्त| व्|केँ|यक्|तिक|न्त| स्|हि |क व|मे |बाक|मान| सम|त्य|क्ष| छै|छैक|ेक |स्व|त्र|रत्|्ये|ष्ट| अप|येक|र छ|सँ |वा | एह|ैक।|ित | वि| जा|ति |्त्|ट्र|िके|राष|ाष्| हो|्ट्| रा|्य | सा| अन| कर|अपन|।प्|कोन|अछि|वतन|्वत|तन्|क आ| अछ|ताक|था | पर| वा| को|ार्|एहि|पन |ा आ|नहि|नो |समा| मा|्री|रता| नि| का|देश| नह|्षा|क प| दे| कए|रक | सं|ोनो|ि क|न्य|आ स|छि |्त |ल ज|्वा|ारक|ा स|तथा|ान्| तथ|्या|आ अ|ना |ँ क|ान | जे|जाए|वार|ता |ीय |र आ|क ह|करब|िवा|ामा|र्व| आओ|्रस|परि|त क|स्थ|ा प|ानव|रीय|धार|्तर|अन्|घोष|साम|माज|आओर|ारण| एक|कएल|ँ अ|ओर |एबा|स्त|द्ध|्रा|ँ स|रण | सभ|ोषण|क।प|ाहि|रबा|क ज|ा अ|चित|यक |कर |पूर|रक्|नक | घो|षा |िक्|सम्|एहन| उप|र प| अव|एल |ूर्|षणा| हे|त अ|शिक|तु |ाधि|ेतु|हेत|हन |िमे|र अ|वक |ँ ए|जाह| शि|आ प|भाव|े स|्ध |क क|ि ज|प्त|रूप|निर|िर्| सक|च्छ|होए|रति|अनु|सभ |हो |ेल |त आ|चार|ण स|रा |त ह|जिक|ाजि|र्ण|्रक|एत।|ि आ|र्य|सभक|ैक |क उ| जन|त स|ाप्|न प|श्य|न अ|कृत|हु |रसं|री |राप|ा व|जे |क ब|ि घ| भा|उद्|ाएत|्ण |विव| उद|वाध|िसँ|आ व|ि स|न व|ारा|ोएत| ओ |य आ|कान|िश्|न क| दो|णाक| द्|हिम| अथ|अथव|ामे|द्व|ेश |ओ व|ि अ|क ए|वास| पू|षाक|त्त|य प| बी|यता|धक |ए स|थवा|ि द|पर | भे|जेँ| कि|कि |क ल| रू|विश|न स| ले|सार|ाके|िष्|रिव|क र|ास |ेओ |्थि|केओ|राज",
    "bho": " के|के |ार |े क|य्व|कार|िका|धिक|ओर | आओ|आओर|अधि| अध|े स|ा क|वे |े अ| सं| हो|में|ें | मे|िक |र स| कर|्रा|्वे|र ह|ा स|र क| से| सम|मान|रा |न क|से |े ब|क्ष|नो | चा|ता |ष्ट| रा|चाह|्टघ|प्र| का|ाष्| सा|राष|टघ्|े आ| प्| सक| मा| स्| य्|ि क|ति |ोय्|त क|ौनो|कौन| जा|्वा|पन | बा|होय|करे|था | कौ|िर | आप|ला |तथा|्त |ेला|आपन| ओक|रे |ाति|कर | हव|हवे| तथ|सबह|र आ|ही |जा | और| ह।|वे।|े ओ|हे |त्र|र म|ना |तिर|बहि|सके|केल| पर|वात|ान |।सब|े म|े च|ा आ|न स|ावे|र ब| लो|ाहे|षा |ओकर|ी क|्षा|माज|ल ज| सब|संग|े ज|्वत|घ् |ं क|ित |मिल|े ह|हिं|िं |रक्|ंत्|स्व|ाज |ा प|और | जे|ो स|कान|करा|क्त|क स|लोग|्ीय|घ्ी|े। |समा|हु |नइय|इय्|ला।| नइ|ानव|िया|े व|वतं|तंत|ी स|े न|स्थ| ओ |े उ|नून|ानू|ाही|ाम |पर |्वल|साम|व्य|्य |ून |े त|या |वल |केह| आद| सु|े य| दे|ीय |र अ| वि|। स|भे |सभे|प्त|दी |बा।|ा म|ा।स|योग| मि| नि|े द|चार| या| इ |हि |ल ह|् क|ले |री |ाधि|र न|ा ह|र प| पा| ही|ादी| बि|राप|ाप्|नवा|ए क|ु क|यता|आदि| दो|तिक|ेहु|दिम|ोग |मी |पूर|े भ|्या|ाजि|म क|ि म| जर|िमी|े प|्तर| अप| उप|जे |जाद|ेकर| सभ|देश|ुक्|क आ| सह|षण |ाव |जिक|शिक|िक्|न ह|ंगठ|गठन|ठन | अं|े ल|सब |पयो|उपय| शा|र व|दोस|न म| व्|ास |।के| शि|न आ|िल |ज क| आज|य क|आजा| ले| जी|ेश |ी ब| पू|रो | भी|्म |ा। |साथ| घो|घोष|ने |वाध|े र| उच|निय|चित|बा |ामा|रात|संर|ाता|्षण|ंरक|हो |होए|ेल ",
    "nep": "को | र |कार|प्र|ार |ने |िका|क्त|धिक|्यक| गर|व्य|्रत| प्|अधि|्ति| अध| व्|यक्|मा |िक |त्य|ाई |लाई|न्त|मान| सम|त्र|गर्|र्न|क व| वा|्ने|वा | स्|रत्|र स|्ये|तिल|येक|ेक |छ ।|ो स|ा स|हरू| वि|क्ष|्त्|िला| । |स्व|हुन|ति | हु|ले | रा| मा|ष्ट|समा|वतन|तन्| छ |र छ| सं|्ट्|ट्र|ाष्|ो अ|राष|्वत|ुने|नेछ|हरु|ान |ता |े अ|्र | का|िने|ाको|गरि|े छ|ना | अन| नि|रता|नै | सा|ित |तिक|क स|र र|रू |ा अ|था |स्त|कुन|ा र|ुनै| छै|्त |छैन|ा प|ार्|वार|ा व| पर|तथा| तथ|का |्या|एको|रु |्षा|माज|रक्|परि|द्ध|। प| ला|सको|ामा| यस|ाहर|ेछ |धार|्रा|ो प|नि |देश|भाव|िवा|्य |र ह|र व|र म|सबै|न अ|े र|न स|रको|अन्|ताक|ंरक|संर|्वा| त्|सम्|री |ो व|ा भ|रहर| कु|्रि|त र|रिन|श्य|पनि|ै व|यस्|ारा|ानव| शि|ा त|लाग|रा |शिक| सब|ाउन|िक्|्न |ारक|ा न|रिय|्यस|द्व|रति|चार| सह|्षण| सु|ारम|ुक्|ुद्|साम|षा |ैन | अप| भए|बाट|ुन | उप|ान्|ो आ|्तर|िय |कान|ि र|रूक|द्द|र प|ाव |ो ल|तो | पन|ैन।| आव|ा ग|।प्|बै |ूर्|िएक|र त|निज|त्प| भे|जिक|ेछ।|िको|्तो|वाह|त स|ाट | अर|ाजि|्ध | उस|रमा|ात्|र्य|नको|ाय |जको|ित्|ागि| अभ|न ग|गि |ा म| आध|स्थ| पा|ारह|घोष|त्व|यता|ा क|र्द| मत|विध| सक|सार|परा|युक|राध| घो|णको|अपर|े स|ारी|।कु| दि| जन|भेद|रिव|उसक|क र|र अ|ि स|ानु|ो ह|रुद| छ।|ूको|रका|नमा| भन|र्म|हित|पूर|न्य|क अ|ा ब|ो भ|राज|अनु|ोषण|षणा|य र| मन| बि|्धा| दे|निर|ताह|र उ|यस |उने|रण |विक",
    "mag": "के | के|ार | हई|कार|िका|धिक|हई।|े अ| और|और | अध|अधि|ा क|े स|र ह|े क|सब |ें |में| मे| कर|्रा|था | सम|से |तथा| से| हो|िक | तथ|र क|र स| सब| सं|क्ष|मान|प्र|ना | सा|ा स|ब क|कर |रा | भी|ति | प्|ई। |भी | अप|त क| का|अपन|या |क ह| को|ट्र|पन | मा| रा| पर| या|ता | स्|ी क|ष्ट|ान |य्व|्त |करे|ही | ओक|्ट्| सक|ओकर|न क|त्र|।सब|राष|ाष्|हई |रे |ेल |े ब| जा|ई।स| ही|े म|रक्| ले|ंत्|सक |नो |ाम |दी |ा प|होए|व्य|र म|क्त|स्व| ना|तंत|पर |माज|र औ|षा |े उ|्य |ित |ोग |ी स|्वत|वतं| शा|ानव|ादी| इ |ल ज|े भ|वे |ा म|ावे|न स|्ति| दे|करा| एक|्षा|लेल|कान|े ल|म क| वि|प्त|साथ|ाथ |ला |र अ|ई।क|्र |क स|य क|नून|ानू|ेकर|्वा|े ह|ोए |ा ह| जे|कोई|वार| य्|राप|जा |ोई |े प|ून |। स|बे |ाप्| चा|रो |ि क|साम|समा| व्|मिल|े य|चाह|रात|कोन|योग|र प|ोनो|र व|े व|स्त|काम|ए क|एल |ाता|्म | पा|नवा|ाधि|ो स|े ओ| दो|व क| नि| सु|्रत|चार|संर|ल ह|पूर| सह|े च|ो क|एक |ाजि|्यक|ास | उप|।के|ं स|न ह|सम्|ंरक|ई क|्तर|ुक्|ीय |ामा|जिक|होब|परि|े आ|षण |तिक|न औ| लो|ा द|स्थ| घो|घोष|्मा|म्म| उच|वाध|री |ा त|केक|र आ|ा औ|ा ब|दोस|निय|ाही|न प| आद|मी |ब अ|देश|ेश |य स|े त|यक्|रीय|ाति|रति|्री|वा |रिव|पयो|उपय|कि |ि म|ी ह|म स|भाव|ढ़ा|बढ़|शिक|िक्| बढ|ौनो|त र|ो भ|व ह|ाव |ग क|न द|युक|ंयु| भा|ारा|संय| कए|कएल|र्म|दमी|करो|कौन|वन |आदम|िया|ोसर| आज|इ स|आजा|लोग|जाद|उचि|चित|े न|त स|ाज "
  },
  "Ethiopic": {
    "amh": "፡መብ|ሰው፡|ት፡አ|ብት፡|መብት|፡ሰው|፡አለ|፡ወይ|ወይም|ይም፡|ነት፡|ንዱ፡|አለው|ለው።|ዳንዱ|ያንዳ|ንዳን|እያን|ዱ፡ሰ|ት፡መ|፡እን|፡የመ|።እያ|እንዲ|፡ነጻ|፡የተ|ም፡በ|ው፡የ|ም፡የ|፡የሚ|ና፡በ|ን፡የ|፡የማ|፡አይ|ነጻነ|ና፡የ|ው፡በ|ቶች፡|ው።፡|ሆነ፡|ት፡የ|፡በሚ|፡መን|ው።እ|ትና፡|ኀብረ|ትን፡|ውም፡|ንኛው|እኩል|ብቻ፡|ኛውም|ንም፡|፡ለመ|፡ያለ|ም፡ሰ|ማንኛ|መብቶ|፡አገ|ት፡በ|ራዊ፡|፡እኩ|፡ለማ|ለት፡|በት፡|ሆን፡|መንግ|፡በተ|ረት፡|ብቶች|ጋብቻ|ዎች፡|ህንነ|ጻነት|ም፡እ|ወንጀ|፡ልዩ|ሰብ፡|ማንም|ጠበቅ|ኩል፡|ደህን|።ማን|ነጻ፡|ግኘት|ማግኘ|።፡እ|፡የሆ|፡ሁሉ|ች፡በ|፡በመ|ሥራ፡|፡ደህ|ፈጸም|ል፡መ|ተግባ|፡ድር|ት፡ወ|ው።ማ|ፍርድ|ርድ፡|፡በሆ|ር፡ወ|በትም|ትም፡|ይነት|ቸው፡|ብ፡የ|ነትና|ቱን፡|ሕግ፡|ንና፡|፡ሥራ|የማግ|፡መሠ|ኘት፡|፡ጊዜ|ጻነቶ|ነቶች|በር፡|በኀብ|ዩነት|ልዩነ|፡በኀ|፡ዓይ|ዓይነ|ችና፡|ግባር|ባር፡|፡ደረ|ነው።|፡ነው|ደረጃ|ም።እ|ም፡መ|፡ወን|ይማኖ|ማኀበ|ሃይማ|፡ኑሮ|መሠረ|ሁሉ፡|ነቱ፡|ሌሎች|ንግሥ|በቅ፡|የሆነ|፡ይህ|ንዲጠ|ገር፡|ተባበ|ትክክ|ጸም፡|ር፡የ|ዲጠበ|ትም።|ው፡ከ|፡እያ|ሩት፡|ድርጅ|፡ብቻ|ና፡ለ|ይገባ|የመኖ|፡ማን|ንነት|ቤተሰ|ርጅት|ት፡ድ|፡መሰ|እንደ|፡አላ|ብሔራ|ት፡ለ|ሔራዊ|ርት፡|ህርት|ውን፡|የሚያ|ል።እ|ሆኑ፡|ምህር|ትምህ|በት።|ለበት|አለበ|፡አስ|ሎች፡|ች፡የ|፡በሕ|ብረ፡|፡ከሚ|ን፡አ|ት፡እ|ን፡ወ|ረግ፡|በሆነ|የኀብ|፡የኀ|መሆን|፡መሆ|ን፡መ|፡ውሳ|ንጀል|ፈላጊ|ህም፡|ረታዊ|ክለኛ|ክክለ|ታዊ፡|ጀል፡|ኑሮ፡|።፡ይ|ዓዊ፡|ዜግነ|ንዲሁ|ዲሁም|፡ማኀ|ገሩ፡|ር፡በ|ብዓዊ|አገሩ|ሁም፡|ና፡ነ|ሰብዓ|የተባ|ጅት፡|ማኖት|ር፡አ|ንግስ|ኖት፡|በሕግ|መኖር|ው፡ያ|መጠበ|ረጃ፡|፡በማ|ነትን|ብነት|ገብነ|፡ገብ|መፈጸ|፡ሁኔ|ሁኔታ|ን፡ለ|ው፡ለ|፡ተግ|፡የአ|፡ይገ|፡በአ|ችን፡|፡ትም|ነቱን|፡ቢሆ|ቢሆን|ጊዜ፡|ረ፡ሰ|ት፡ጊ|ሰቡ፡|ምበት|ላቸው|አላቸ|በነጻ|፡በነ|አንድ|ቅ፡መ|፡መጠ|ት፡ይ|መሰረ|ጥ፡የ|ስጥ፡|ፈጸመ|ውስጥ|ንድ፡|፡ውስ|፡በግ|፡ሆኖ|ሉ፡በ|፡ጋብ|ንስ፡|ንነቱ|መው፡|የሚፈ|አይፈ|ብረሰ|ነ፡መ|፡የሃ|ም፡ከ|ች፡እ|ስት፡|ሙሉ፡|አገር|ሆኖ፡|ደረግ|ኢንተ|ንተር|ተርና|ርናሽ|ናሽና|ሽናል",
    "tir": " መሰ| ሰብ|ሰብ | ኦለ|ትን |ኦለዎ|ናይ | ናይ| ኦብ|ዎ፡፡|ለዎ፡|ሕድሕ|ኦብ |ድሕድ|ሕድ |መሰል|ውን |ሰል |ድ ሰ|ይ ም|ል ኦ|ካብ |፡ሕድ|፡፡ሕ| ወይ|ወይ | መን| ነፃ|ን መ|ዝኾነ|፡፡ |ታት |ብ ዝ|ነት |ን ነ| ካብ|መሰላ|ነፃነ| እዚ|ብ መ|ኦዊ |ታትን|መንግ|ዊ መ| እን|ብ ብ|ንግስ|ት ኦ|ሰላት|ን ም|ኾነ |እዚ |ብኦዊ|ሰብኦ|ን ኦ|ን፡፡| ንክ| ዝኾ|ን ን| ምር|ኹን |ይኹን| ይኹ|ምርካ|ርካብ| ኦይ| ሃገ|ሕጊ |ራት |ሎም | ብሕ|ነ ይ| ከም|ማዕሪ|ይ ብ| ንም| ዝተ|ርን |ን ብ|ራዊ | ፣ |ብ ሕ|ላትን|ብ ኦ|ማሕበ|ነታት| ኦድ|ዕሪ | ማዕ|ስታት|ግስታ|’ውን|ት መ|ን ዝ|ታዊ |፣ ብ| ማሕ|ነትን|ንጋገ|ድንጋ| ስለ| ድን|ስራሕ|ኩሎም|ሕበራ|ኦት |ን ሰ|ዓለም|ፃነታ| ብም|ት ወ|መሰሪ| ስራ|ፃነት|ተሰብ|ካልኦ|ልኦት|ን ሓ|ዓት |ዋን |ቡራት|ሕቡራ| ሕቡ|ብሕጊ|ድብ |ውድብ| ውድ|ብን |ትምህ|ነቱ |ዚ ድ|፣ ኦ|ሃገራ| ኩሎ|ለዎም|ምህር|ም፡፡|ም መ| ብዝ|ምኡ’|ኡ’ው|እንት| ዓለ| ብዘ|በራዊ| ሓለ|ሓለዋ|ዎም፡|ቱ ን|ት ብ|ጋገ |ነፃ | ምዃ|ን ዘ| ገበ|ት፣ | ትም|ኸውን|ራሕ | ዘይ|ህርቲ|ርቲ |ከምኡ|ሃይማ| ምስ|ነ፣ |እንተ| ስር|ስርዓ|ርዓት|ባት |ይማኖ|ሰሪታ|ን ና| ክብ|ልን | ብማ|ገሩ | ህዝ|ላት |ት ና|ይ ኦ|ዕሊ |ለዝኾ|ስለዝ|ሪተሰ|ብሪተ|ሕብሪ| ሕብ|ን ተ|ኾነ፣|በን |ሃገሩ|ገ እ|ኻዊ | ሃይ|እን |ሪጋገ| ምሕ|ን እ|ለኻዊ|ር፣ | ብሓ| ብሃ| ክኸ|ክኸው|ብ ዘ|ዃኑ |ዊ ክ|ምን |ሓደ |ምዃኑ|ም ን|ት እ|ዊ ወ|ታውን| ሕድ|ብዘይ| ሕጊ|ት ን| ልዕ| ካል|ን ካ|ሰባት|ን ስ|ናን |ቤተሰ|ሕን |ለምለ|ት ስ|ምለኻ|፣ ከ|ተደን|ባል |ኦድላ|እዋን| እዋ|ደቂ | ደቂ| ሰባ|ፃን |ነፃን|ግስቲ|፣ ን|ዚ ብ|ስቲ | ቤተ|ምጥሓ| ክሳ| ነዚ|ን ክ|ነቲ | ነቲ|ነዚ | ምእ|ብነፃ| ምዕ|ምዕባ|ዕባለ|ክሳብ| ብነ|ል እ|ዚ መ|ልዕሊ|ክብሩ|ብማዕ|ሳብ |ህይወ|ኦቶም|ምስ |ንገገ|እምነ| እም|ድ ኦ|ቶም |ቲ ክ|ፍትሓ|ለም | ፍት|ብ ን|ን ዓ|ራውን|ሓፈሻ|ደንገ|ም ብ|ትዮን| ዝሰ|ዝተደ|ሉ መ|ብ ና|ጊ ካ|ልዎ |ኦባል| ኦባ|ድልዎ|ን ድ|ኦድል|ዜግነ|ላውን| ድሕ"
  },
  "Hebrew": {
    "heb": "ות |ים |כל |ת ה| כל|דם |אדם|יות| של| זכ|ל א| אד|של |ל ה|אי |ויו|כאי|ת ו|י ל|זכא| ול|לא | וה|רות|זכו|ית |ירו|ין | או|ם ז| לא| הח|או | הא| וב| המ|חיר|ת ל|יים|ם ל|את |ת ב|ת ש|רה |ון | לה|נה |כוי|ותי|ה ש|ו ל|ו ב| הו|ת א|ם ב|ם ו|תו | את|לה |ני |אומ| במ|דה |א י|ה ה|ה ב|על |ם ה| על|הוא|וך |ה א|בוד|וד |ואי|נות|ה ו|ת כ|י ה|יה |ם ש|ו ו| שה|ם א|ו כ|ינו|ן ה| שו|שוו|החי|כות|לאו|בות|דות|ה ל|לית|ה מ| בי|וה |וא | הי| לפ|ור | לב|ל ב|בחי|הכר|לו |ת מ|ן ש|החו|ה כ| בכ|ומי|בין|ן ו|ן ל|רוי|פלי|ולה|ליה| הז|חינ| לע| בנ|יבו|חוק| אח|חבר| יה| חי|מי |ירה| חו|האד|ווה|חופ|ופש|וק |נו |יו |ל מ|מדי|כבו| הע|נוך| הד|י א|י ו| הכ|בני|עה |ו א|רצו|דינ|בזכ|מות|יפו| אל|סוד|לם |איש|רך | אי|הגנ|הם |פי |ם כ|חות|ל ו|איל|ילי|תיה|כלל|אלי|יסו|האו|זש | בא|ר א|ו ה|זו |אחר| הפ| בע| בז|משפ| בה| לח|דרך|ומו| בח| דר| מע|ל י|תוך|מנו| בש|לל |רבו| למ|פני| לק|תם |שה |שית|ללא|לפי|היה|מעש|דו |שות|להג|וצי|שוא|אין|וי |תי |ונו|ליל| לו|חיי|ל ז| זו|היא|יא |נתו|ה פ|לת |ובי| לכ|ך ה|יל |י ש|שיו|ן ב|עול|המד|ודה|ולם| ומ|א ה|ולא| בת|הכל| סו| מש| עב|סוצ|ארצ| אר|ציא|ד א|לחי|הן |יחס| יח|יאל|הזכ|ם נ| שר|בו |עבו|היס| לי|ת ז|פול|יהי|גבל|תיו|המא|שהי|א ל|מאו| יו|ותו|ישי|גנה|פשי|וחד|יהם|חרו|לכל|ידה|עות|ונה|ום |חה |עם |שרי|ם י|שר |והח| אש| הג|ק ב|הפל|נשו|הגב|ד ו",
    "ydd": " פֿ|ון |ער |ן א| אַ|דער|ט א| או|און|אַר|ען |פֿו| אױ| אי|ן פ|ֿון|רעכ| דע| רע|עכט|פֿא|ן ד|כט | די|די |אַ |אױף|ױף |ֿאַ| זײ| גע|אַל|אָס| אָ|ונג| הא|האָ|זײַ| מע|אָל|נג |װאָ|ַן |אַנ|רײַ| װא|ָס |באַ| יע|יעד|ניט|ן ז|ר א|יט |אָט|אָר|עדע|מען|זאָ|ָט |פֿר|ײַן| בא|טן |אין|ן ג|ין |ן װ|נאַ|ֿרײ|ר ה| זא|לעכ|ע א|אָד|ַ ר|ענט|אַצ|ַצי|אָנ| צו| װע|יז |מענ|ָדע|איז|ן מ|ַלע|בן |ר מ|טער| מי| פּ|מיט|טלע|ָל |עכע|ײט |ַנד|ע פ|לע |געז|לאַ|אַפ|עזע|ראַ| ני|ַפֿ|רן |ײַנ|נען|טיק|כע |פֿע|יע |הײט|ַהײ|נטש|ײַה|ט ד|ן ב|לן |ן נ|פֿט|שאַ|רונ| זי| װי|ט פ| דא|טאָ|דיק|קן |ר פ|ר ג|יקן|אָב|ף א|אַק|קער|ערע|כער|י פ|ות |ַרב|פּר|קט |עם |יאָ|ציע|ציא|יט־|צו |ישע| קײ|ן ק|סער| גל|דאָ|ונט|גן |ַרא|יקע| טא|ענע|לײַ|שן |ַנע|יק |טאַ|ס א|עט |נגע|ט־א|ָנא|־אי|יקט|נטע|ײנע|־ני|ָר |װער|י א|ן י|יך |זיך|ער־|ערן|אױס|ָבן|נדע|ָסע|װי |ֿעל|ר־נ|ן ה| גר|גלײ| צי|ראָ|זעל|עלק|נד |לקע|אָפ| כּ|ט װ|ג א| נא|ט צ|ר ד|עס |דור|גען|קע |ג פ|ֿט |ן ל|שע |ר ז|רע |ײטן|פּע|קלא|קײט|יטע|ים |ס ז|ײַ | דו|אַט| לא|ר װ|קײנ|עלש|י ד|לשא|יות|נט |ַרז|ע ר|ל ז|אַמ|ן ש| שו|אינ|נטל| הי|בעט|ָפּ|ף פ|ײַכ|בער|ן צ|מאָ| שט| לע|גער|ורך|רך |נעם|גרו|פֿן|לער|װעל|ע מ|ום |שפּ|ך א|יונ|רבע|עפֿ|טעט|ן כ|רעס|ערצ|ז א|עמע|ם א|שטע|כן |רט |י ג|סן |נער|ליט|ט ז|נעמ|ּרא|היו|אַש|ת װ|אומ|ק א|יבע|ֿן |ץ א|פֿי|ײן |ם ט"
  }
}
},{}],5:[function(require,module,exports){
module.exports = {
  cmn: /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FCC\uF900-\uFA6D\uFA70-\uFAD9]|[\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]/g,
  Latin: /[A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A]/g,
  Cyrillic: /[\u0400-\u0484\u0487-\u052F\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69D\uA69F]/g,
  Arabic: /[\u0600-\u0604\u0606-\u060B\u060D-\u061A\u061E\u0620-\u063F\u0641-\u064A\u0656-\u065F\u066A-\u066F\u0671-\u06DC\u06DE-\u06FF\u0750-\u077F\u08A0-\u08B2\u08E4-\u08FF\uFB50-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFD\uFE70-\uFE74\uFE76-\uFEFC]|\uD803[\uDE60-\uDE7E]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB\uDEF0\uDEF1]/g,
  ben: /[\u0980-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FB]/g,
  Devanagari: /[\u0900-\u0950\u0953-\u0963\u0966-\u097F\uA8E0-\uA8FB]/g,
  jpn: /[\u3041-\u3096\u309D-\u309F]|\uD82C\uDC01|\uD83C\uDE00|[\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D]|\uD82C\uDC00/g,
  kor: /[\u1100-\u11FF\u302E\u302F\u3131-\u318E\u3200-\u321E\u3260-\u327E\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/g,
  tel: /[\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7F]/g,
  tam: /[\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BFA]/g,
  guj: /[\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AF1]/g,
  mal: /[\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D75\u0D79-\u0D7F]/g,
  kan: /[\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2]/g,
  mya: /[\u1000-\u109F\uA9E0-\uA9FE\uAA60-\uAA7F]/g,
  ori: /[\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B77]/g,
  pan: /[\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75]/g,
  Ethiopic: /[\u1200-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u137C\u1380-\u1399\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]/g,
  tha: /[\u0E01-\u0E3A\u0E40-\u0E5B]/g,
  sin: /[\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4]|\uD804[\uDDE1-\uDDF4]/g,
  ell: /[\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65]|\uD800[\uDD40-\uDD8C\uDDA0]|\uD834[\uDE00-\uDE45]/g,
  khm: /[\u1780-\u17DD\u17E0-\u17E9\u17F0-\u17F9\u19E0-\u19FF]/g,
  hye: /[\u0531-\u0556\u0559-\u055F\u0561-\u0587\u058A\u058D-\u058F\uFB13-\uFB17]/g,
  sat: /[\u1C50-\u1C7F]/g,
  bod: /[\u0F00-\u0F47\u0F49-\u0F6C\u0F71-\u0F97\u0F99-\u0FBC\u0FBE-\u0FCC\u0FCE-\u0FD4\u0FD9\u0FDA]/g,
  Hebrew: /[\u0591-\u05C7\u05D0-\u05EA\u05F0-\u05F4\uFB1D-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFB4F]/g,
  kat: /[\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u10FF\u2D00-\u2D25\u2D27\u2D2D]/g,
  lao: /[\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF]/g,
  iii: /[\uA000-\uA48C\uA490-\uA4C6]/g,
  aii: /[\u0700-\u070D\u070F-\u074A\u074D-\u074F]/g
};

},{}],6:[function(require,module,exports){
'use strict';

/*
 * Load `trigram-utils`.
 */

var utilities = require('trigram-utils');

/*
 * Load `expressions` (regular expressions matching
 * scripts).
 */

var expressions = require('./expressions.js');

/*
 * Load `data` (trigram information per language,
 * per script).
 */

var data = require('./data.json');

/*
 * Construct trigram dictionaries.
 */

(function () {
    var languages;
    var name;
    var trigrams;
    var model;
    var script;
    var weight;

    for (script in data) {
        languages = data[script];

        for (name in languages) {
            model = languages[name].split('|');

            weight = model.length;

            trigrams = {};

            while (weight--) {
                trigrams[model[weight]] = weight;
            }

            languages[name] = trigrams;
        }
    }
})();

/*
 * Maximum sample length.
 */

var MAX_LENGTH = 2048;

/*
 * Minimum sample length.
 */

var MIN_LENGTH = 10;

/*
 * The maximum distance to add when a given trigram does
 * not exist in a trigram dictionary.
 */

var MAX_DIFFERENCE = 300;

/**
 * Deep regular sort on the number at `1` in both objects.
 *
 * @example
 *   > [[0, 20], [0, 1], [0, 5]].sort(sort);
 *   // [[0, 1], [0, 5], [0, 20]]
 *
 * @param {Object} a
 * @param {Object} b
 */
function sort(a, b) {
    return a[1] - b[1];
}

/**
 * Filter `languages` by removing languages in
 * `blacklist`, or including languages in `whitelist`.
 *
 * @param {Object.<string, Object>} languages - Languages
 *   to filter
 * @param {Array.<string>} whitelist - Whitelisted
 *   languages; if non-empty, only included languages
 *   are kept.
 * @param {Array.<string>} blacklist - Blacklisted
 *   languages; included languages are ignored.
 * @return {Object.<string, Object>} - Filtered array of
 *   languages.
 */
function filterLanguages(languages, whitelist, blacklist) {
    var filteredLanguages;
    var language;

    if (whitelist.length === 0 && blacklist.length === 0) {
        return languages;
    }

    filteredLanguages = {};

    for (language in languages) {
        if (
            (
                whitelist.length === 0 ||
                whitelist.indexOf(language) !== -1
            ) &&
            blacklist.indexOf(language) === -1
        ) {
            filteredLanguages[language] = languages[language];
        }
    }

    return filteredLanguages;
}

/**
 * Get the distance between an array of trigram--count
 * tuples, and a language dictionary.
 *
 * @param {Array.<Array.<string, number>>} trigrams - An
 *   array containing trigram--count tuples.
 * @param {Object.<string, number>} model - Object
 *   containing weighted trigrams.
 * @return {number} - The distance between the two.
 */
function getDistance(trigrams, model) {
    var distance = 0;
    var index = -1;
    var length = trigrams.length;
    var trigram;
    var difference;

    while (++index < length) {
        trigram = trigrams[index];

        if (trigram[0] in model) {
            difference = trigram[1] - model[trigram[0]] - 1;

            if (difference < 0) {
                difference = -difference;
            }
        } else {
            difference = MAX_DIFFERENCE;
        }

        distance += difference;
    }

    return distance;
}

/**
 * Create a single tuple as a list of tuples from a given
 * language code.
 *
 * @param {string} language - A single language.
 * @return {Array.<Array.<string, number>>} An array
 *   containing a single language--distance.
 */
function singleLanguageTuples(language) {
    return [[language, 1]];
}

/**
 * Create a single `und` tuple.
 *
 * @return {Array.<Array.<string, number>>} An array
 *   containing a single language--distance.
 */
function und() {
    return singleLanguageTuples('und');
}

/**
 * Get the distance between an array of trigram--count
 * tuples, and multiple trigram dictionaries.
 *
 * @param {Array.<Array.<string, number>>} trigrams - An
 *   array containing trigram--count tuples.
 * @param {Object.<string, Object>} languages - multiple
 *   trigrams to test against.
 * @return {Array.<Array.<string, number>>} An array
 *   containing language--distance tuples.
 */
function getDistances(trigrams, languages, options) {
    var distances = [];
    var whitelist = options.whitelist || [];
    var blacklist = options.blacklist || [];
    var language;

    languages = filterLanguages(languages, whitelist, blacklist);

    for (language in languages) {
        distances.push([
            language,
            getDistance(trigrams, languages[language])
        ]);
    }

    return distances.length ? distances.sort(sort) : und();
}

/**
 * Get the occurrence ratio of `expression` for `value`.
 *
 * @param {string} value
 * @param {RegExp} expression
 * @return {number} Float between 0 and 1.
 */
function getOccurrence(value, expression) {
    var count = value.match(expression);

    return (count ? count.length : 0) / value.length || 0;
}

/**
 * From `scripts`, get the most occurring expression for
 * `value`.
 *
 * @param {string} value
 * @param {Object.<string, RegExp>} scripts
 * @return {Array} Top script and its
 *   occurrence percentage.
 */
function getTopScript(value, scripts) {
    var topCount = -1;
    var topScript;
    var script;
    var count;

    for (script in scripts) {
        count = getOccurrence(value, scripts[script]);

        if (count > topCount) {
            topCount = count;
            topScript = script;
        }
    }

    return [topScript, topCount];
}

/**
 * Normalize the difference for each tuple in
 * `distances`.
 *
 * @param {string} value
 * @param {Array.<Array.<string, number>>} distances
 * @return {Array.<Array.<string, number>>} - Normalized
 *   distances.
 */
function normalize(value, distances) {
    var min = distances[0][1];
    var max = (value.length * MAX_DIFFERENCE) - min;
    var index = -1;
    var length = distances.length;

    while (++index < length) {
        distances[index][1] = 1 - ((distances[index][1] - min) / max) || 0;
    }

    return distances;
}

/**
 * Get a list of probable languages the given value is
 * written in.
 *
 * @param {string} value - The value to test.
 * @return {Array.<Array.<string, number>>} An array
 *   containing language--distance tuples.
 */
function detectAll(value, options) {
    var settings = options || {};
    var minLength = MIN_LENGTH;
    var script;

    if (settings.minLength !== null && settings.minLength !== undefined) {
        minLength = settings.minLength;
    }

    if (!value || value.length < minLength) {
        return und();
    }

    value = value.substr(0, MAX_LENGTH);

    /*
     * Get the script which characters occur the most
     * in `value`.
     */

    script = getTopScript(value, expressions);

    /*
     * One languages exists for the most-used script.
     *
     * If no matches occured, such as a digit only string,
     * exit with `und`.
     */

    if (!(script[0] in data)) {
        return script[1] === 0 ? und() : singleLanguageTuples(script[0]);
    }

    /*
     * Get all distances for a given script, and
     * normalize the distance values.
     */

    return normalize(value, getDistances(
        utilities.asTuples(value), data[script[0]], settings
    ));
}

/**
 * Get the most probable language for the given value.
 *
 * @param {string} value - The value to test.
 * @return {string} The most probable language.
 */
function detect(value, options) {
    return detectAll(value, options)[0][0];
}

/*
 * Expose `detectAll` on `detect`.
 */

detect.all = detectAll;

/*
 * Expose `detect`.
 */

module.exports = detect;

},{"./data.json":4,"./expressions.js":5,"trigram-utils":78}],7:[function(require,module,exports){
/*!
 * money.js / fx() v0.2
 * Copyright 2014 Open Exchange Rates
 *
 * JavaScript library for realtime currency conversion and exchange rate calculation.
 *
 * Freely distributable under the MIT license.
 * Portions of money.js are inspired by or borrowed from underscore.js
 *
 * For details, examples and documentation:
 * http://openexchangerates.github.io/money.js/
 */
(function(root, undefined) {

	// Create a safe reference to the money.js object for use below.
	var fx = function(obj) {
		return new fxWrapper(obj);
	};

	// Current version.
	fx.version = '0.2';


	/* --- Setup --- */

	// fxSetup can be defined before loading money.js, to set the exchange rates and the base
	// (and default from/to) currencies - or the rates can be loaded in later if needed.
	var fxSetup = root.fxSetup || {
		rates : {},
		base : ""
	};

	// Object containing exchange rates relative to the fx.base currency, eg { "GBP" : "0.64" }
	fx.rates = fxSetup.rates;

	// Default exchange rate base currency (eg "USD"), which all the exchange rates are relative to
	fx.base = fxSetup.base;

	// Default from / to currencies for conversion via fx.convert():
	fx.settings = {
		from : fxSetup.from || fx.base,
		to : fxSetup.to || fx.base
	};


	/* --- Conversion --- */

	// The base function of the library: converts a value from one currency to another
	var convert = fx.convert = function(val, opts) {
		// Convert arrays recursively
		if (typeof val === 'object' && val.length) {
			for (var i = 0; i< val.length; i++ ) {
				val[i] = convert(val[i], opts);
			}
			return val;
		}

		// Make sure we gots some opts
		opts = opts || {};

		// We need to know the `from` and `to` currencies
		if( !opts.from ) opts.from = fx.settings.from;
		if( !opts.to ) opts.to = fx.settings.to;

		// Multiple the value by the exchange rate
		return val * getRate( opts.to, opts.from );
	};

	// Returns the exchange rate to `target` currency from `base` currency
	var getRate = function(to, from) {
		// Save bytes in minified version
		var rates = fx.rates;

		// Make sure the base rate is in the rates object:
		rates[fx.base] = 1;

		// Throw an error if either rate isn't in the rates array
		if ( !rates[to] || !rates[from] ) throw "fx error";

		// If `from` currency === fx.base, return the basic exchange rate for the `to` currency
		if ( from === fx.base ) {
			return rates[to];
		}

		// If `to` currency === fx.base, return the basic inverse rate of the `from` currency
		if ( to === fx.base ) {
			return 1 / rates[from];
		}

		// Otherwise, return the `to` rate multipled by the inverse of the `from` rate to get the
		// relative exchange rate between the two currencies
		return rates[to] * (1 / rates[from]);
	};


	/* --- OOP wrapper and chaining --- */

	// If fx(val) is called as a function, it returns a wrapped object that can be used OO-style
	var fxWrapper = function(val) {
		// Experimental: parse strings to pull out currency code and value:
		if ( typeof	val === "string" ) {
			this._v = parseFloat(val.replace(/[^0-9-.]/g, ""));
			this._fx = val.replace(/([^A-Za-z])/g, "");
		} else {
			this._v = val;
		}
	};

	// Expose `wrapper.prototype` as `fx.prototype`
	var fxProto = fx.prototype = fxWrapper.prototype;

	// fx(val).convert(opts) does the same thing as fx.convert(val, opts)
	fxProto.convert = function() {
		var args = Array.prototype.slice.call(arguments);
		args.unshift(this._v);
		return convert.apply(fx, args);
	};

	// fx(val).from(currency) returns a wrapped `fx` where the value has been converted from
	// `currency` to the `fx.base` currency. Should be followed by `.to(otherCurrency)`
	fxProto.from = function(currency) {
		var wrapped = fx(convert(this._v, {from: currency, to: fx.base}));
		wrapped._fx = fx.base;
		return wrapped;
	};

	// fx(val).to(currency) returns the value, converted from `fx.base` to `currency`
	fxProto.to = function(currency) {
		return convert(this._v, {from: this._fx ? this._fx : fx.settings.from, to: currency});
	};


	/* --- Module Definition --- */

	// Export the fx object for CommonJS. If being loaded as an AMD module, define it as such.
	// Otherwise, just add `fx` to the global object
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = fx;
		}
		exports.fx = fx;
	} else if (typeof define === 'function' && define.amd) {
		// Return the library as an AMD module:
		define([], function() {
			return fx;
		});
	} else {
		// Use fx.noConflict to restore `fx` back to its original value before money.js loaded.
		// Returns a reference to the library's `fx` object; e.g. `var money = fx.noConflict();`
		fx.noConflict = (function(previousFx) {
			return function() {
				// Reset the value of the root's `fx` variable:
				root.fx = previousFx;
				// Delete the noConflict function:
				fx.noConflict = undefined;
				// Return reference to the library to re-assign it:
				return fx;
			};
		})(root.fx);

		// Declare `fx` on the root (global/window) object:
		root['fx'] = fx;
	}

	// Root will be `window` in browser or `global` on the server:
}(this));

},{}],8:[function(require,module,exports){
'use strict';

/**
 * A factory returning a function that converts a given string to n-grams.
 *
 * @example
 *   nGram(2) // [Function]
 *
 * @example
 *   nGram(4) // [Function]
 *
 *
 * @param {number} n - The `n` in n-gram.
 * @throws {Error} When `n` is not a number (incl. NaN), Infinity, or lt 1.
 * @return {Function} A function creating n-grams from a given value.
 */
function nGram(n) {
    if (
        typeof n !== 'number' ||
        n < 1 ||
        n !== n ||
        n === Infinity
    ) {
        throw new Error(
            'Type error: `' + n + '` is not a valid argument for n-gram'
        );
    }

    /*
     * Create n-grams from a given value.
     *
     * @example
     *   nGram(4)('n-gram')
     *   // ['n-gr', '-gra', 'gram']
     *
     * @param {*} value - The value to stringify and convert into n-grams.
     * @return {Array.<string>} n-grams
     */

    return function (value) {
        var nGrams,
            index;

        nGrams = [];

        if (value === null || value === undefined) {
            return nGrams;
        }

        value = String(value);

        index = value.length - n + 1;

        if (index < 1) {
            return nGrams;
        }

        while (index--) {
            nGrams[index] = value.substr(index, n);
        }

        return nGrams;
    };
}

/*
 * Export `n-gram`.
 */

module.exports = nGram;

/*
 * Create bigrams from a given value.
 *
 * @example
 *   bigram('n-gram')
 *   // ["n-", "-g", "gr", "ra", "am"]
 *
 * @param {*} value - The value to stringify and convert into bigrams.
 * @return {Array.<string>} bigrams
 */

nGram.bigram = nGram(2);

/*
 * Create trigrams from a given value.
 *
 * @example
 *   trigram('n-gram')
 *   // ["n-g", "-gr", "gra", "ram"]
 *
 * @param {*} value - The value to stringify and convert into trigrams.
 * @return {Array.<string>} trigrams
 */

nGram.trigram = nGram(3);

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _trim = require('lodash/trim');

var _trim2 = _interopRequireDefault(_trim);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _franc = require('franc');

var _franc2 = _interopRequireDefault(_franc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpeakTTS = function (window) {
  var CONF = {
    'lang': null,
    'volume': 1,
    'rate': 1,
    'pitch': 1,
    'voice': null,
    'onVoicesLoaded': function onVoicesLoaded(data) {}

    //Fallback cache voices for ios
    // iOS 8
  };var iOS8voices = [{ name: "pt-BR", voiceURI: "pt-BR", lang: "pt-BR", localService: true, default: true }, { name: "fr-CA", voiceURI: "fr-CA", lang: "fr-CA", localService: true, default: true }, { name: "sk-SK", voiceURI: "sk-SK", lang: "sk-SK", localService: true, default: true }, { name: "th-TH", voiceURI: "th-TH", lang: "th-TH", localService: true, default: true }, { name: "ro-RO", voiceURI: "ro-RO", lang: "ro-RO", localService: true, default: true }, { name: "no-NO", voiceURI: "no-NO", lang: "no-NO", localService: true, default: true }, { name: "fi-FI", voiceURI: "fi-FI", lang: "fi-FI", localService: true, default: true }, { name: "pl-PL", voiceURI: "pl-PL", lang: "pl-PL", localService: true, default: true }, { name: "de-DE", voiceURI: "de-DE", lang: "de-DE", localService: true, default: true }, { name: "nl-NL", voiceURI: "nl-NL", lang: "nl-NL", localService: true, default: true }, { name: "id-ID", voiceURI: "id-ID", lang: "id-ID", localService: true, default: true }, { name: "tr-TR", voiceURI: "tr-TR", lang: "tr-TR", localService: true, default: true }, { name: "it-IT", voiceURI: "it-IT", lang: "it-IT", localService: true, default: true }, { name: "pt-PT", voiceURI: "pt-PT", lang: "pt-PT", localService: true, default: true }, { name: "fr-FR", voiceURI: "fr-FR", lang: "fr-FR", localService: true, default: true }, { name: "ru-RU", voiceURI: "ru-RU", lang: "ru-RU", localService: true, default: true }, { name: "es-MX", voiceURI: "es-MX", lang: "es-MX", localService: true, default: true }, { name: "zh-HK", voiceURI: "zh-HK", lang: "zh-HK", localService: true, default: true }, { name: "sv-SE", voiceURI: "sv-SE", lang: "sv-SE", localService: true, default: true }, { name: "hu-HU", voiceURI: "hu-HU", lang: "hu-HU", localService: true, default: true }, { name: "zh-TW", voiceURI: "zh-TW", lang: "zh-TW", localService: true, default: true }, { name: "es-ES", voiceURI: "es-ES", lang: "es-ES", localService: true, default: true }, { name: "zh-CN", voiceURI: "zh-CN", lang: "zh-CN", localService: true, default: true }, { name: "nl-BE", voiceURI: "nl-BE", lang: "nl-BE", localService: true, default: true }, { name: "en-GB", voiceURI: "en-GB", lang: "en-GB", localService: true, default: true }, { name: "ar-SA", voiceURI: "ar-SA", lang: "ar-SA", localService: true, default: true }, { name: "ko-KR", voiceURI: "ko-KR", lang: "ko-KR", localService: true, default: true }, { name: "cs-CZ", voiceURI: "cs-CZ", lang: "cs-CZ", localService: true, default: true }, { name: "en-ZA", voiceURI: "en-ZA", lang: "en-ZA", localService: true, default: true }, { name: "en-AU", voiceURI: "en-AU", lang: "en-AU", localService: true, default: true }, { name: "da-DK", voiceURI: "da-DK", lang: "da-DK", localService: true, default: true }, { name: "en-US", voiceURI: "en-US", lang: "en-US", localService: true, default: true }, { name: "en-IE", voiceURI: "en-IE", lang: "en-IE", localService: true, default: true }, { name: "he-IL", voiceURI: "he-IL", lang: "he-IL", localService: true, default: true }, { name: "hi-IN", voiceURI: "hi-IN", lang: "hi-IN", localService: true, default: true }, { name: "el-GR", voiceURI: "el-GR", lang: "el-GR", localService: true, default: true }, { name: "ja-JP", voiceURI: "ja-JP", lang: "ja-JP", localService: true, default: true }];

  // IOS9
  var iOS9voices = [{ name: "Maged", voiceURI: "com.apple.ttsbundle.Maged-compact", lang: "ar-SA", localService: true, "default": true }, { name: "Zuzana", voiceURI: "com.apple.ttsbundle.Zuzana-compact", lang: "cs-CZ", localService: true, "default": true }, { name: "Sara", voiceURI: "com.apple.ttsbundle.Sara-compact", lang: "da-DK", localService: true, "default": true }, { name: "Anna", voiceURI: "com.apple.ttsbundle.Anna-compact", lang: "de-DE", localService: true, "default": true }, { name: "Melina", voiceURI: "com.apple.ttsbundle.Melina-compact", lang: "el-GR", localService: true, "default": true }, { name: "Karen", voiceURI: "com.apple.ttsbundle.Karen-compact", lang: "en-AU", localService: true, "default": true }, { name: "Daniel", voiceURI: "com.apple.ttsbundle.Daniel-compact", lang: "en-GB", localService: true, "default": true }, { name: "Moira", voiceURI: "com.apple.ttsbundle.Moira-compact", lang: "en-IE", localService: true, "default": true }, { name: "Samantha (Enhanced)", voiceURI: "com.apple.ttsbundle.Samantha-premium", lang: "en-US", localService: true, "default": true }, { name: "Samantha", voiceURI: "com.apple.ttsbundle.Samantha-compact", lang: "en-US", localService: true, "default": true }, { name: "Tessa", voiceURI: "com.apple.ttsbundle.Tessa-compact", lang: "en-ZA", localService: true, "default": true }, { name: "Monica", voiceURI: "com.apple.ttsbundle.Monica-compact", lang: "es-ES", localService: true, "default": true }, { name: "Paulina", voiceURI: "com.apple.ttsbundle.Paulina-compact", lang: "es-MX", localService: true, "default": true }, { name: "Satu", voiceURI: "com.apple.ttsbundle.Satu-compact", lang: "fi-FI", localService: true, "default": true }, { name: "Amelie", voiceURI: "com.apple.ttsbundle.Amelie-compact", lang: "fr-CA", localService: true, "default": true }, { name: "Thomas", voiceURI: "com.apple.ttsbundle.Thomas-compact", lang: "fr-FR", localService: true, "default": true }, { name: "Carmit", voiceURI: "com.apple.ttsbundle.Carmit-compact", lang: "he-IL", localService: true, "default": true }, { name: "Lekha", voiceURI: "com.apple.ttsbundle.Lekha-compact", lang: "hi-IN", localService: true, "default": true }, { name: "Mariska", voiceURI: "com.apple.ttsbundle.Mariska-compact", lang: "hu-HU", localService: true, "default": true }, { name: "Damayanti", voiceURI: "com.apple.ttsbundle.Damayanti-compact", lang: "id-ID", localService: true, "default": true }, { name: "Alice", voiceURI: "com.apple.ttsbundle.Alice-compact", lang: "it-IT", localService: true, "default": true }, { name: "Kyoko", voiceURI: "com.apple.ttsbundle.Kyoko-compact", lang: "ja-JP", localService: true, "default": true }, { name: "Yuna", voiceURI: "com.apple.ttsbundle.Yuna-compact", lang: "ko-KR", localService: true, "default": true }, { name: "Ellen", voiceURI: "com.apple.ttsbundle.Ellen-compact", lang: "nl-BE", localService: true, "default": true }, { name: "Xander", voiceURI: "com.apple.ttsbundle.Xander-compact", lang: "nl-NL", localService: true, "default": true }, { name: "Nora", voiceURI: "com.apple.ttsbundle.Nora-compact", lang: "no-NO", localService: true, "default": true }, { name: "Zosia", voiceURI: "com.apple.ttsbundle.Zosia-compact", lang: "pl-PL", localService: true, "default": true }, { name: "Luciana", voiceURI: "com.apple.ttsbundle.Luciana-compact", lang: "pt-BR", localService: true, "default": true }, { name: "Joana", voiceURI: "com.apple.ttsbundle.Joana-compact", lang: "pt-PT", localService: true, "default": true }, { name: "Ioana", voiceURI: "com.apple.ttsbundle.Ioana-compact", lang: "ro-RO", localService: true, "default": true }, { name: "Milena", voiceURI: "com.apple.ttsbundle.Milena-compact", lang: "ru-RU", localService: true, "default": true }, { name: "Laura", voiceURI: "com.apple.ttsbundle.Laura-compact", lang: "sk-SK", localService: true, "default": true }, { name: "Alva", voiceURI: "com.apple.ttsbundle.Alva-compact", lang: "sv-SE", localService: true, "default": true }, { name: "Kanya", voiceURI: "com.apple.ttsbundle.Kanya-compact", lang: "th-TH", localService: true, "default": true }, { name: "Yelda", voiceURI: "com.apple.ttsbundle.Yelda-compact", lang: "tr-TR", localService: true, "default": true }, { name: "Ting-Ting", voiceURI: "com.apple.ttsbundle.Ting-Ting-compact", lang: "zh-CN", localService: true, "default": true }, { name: "Sin-Ji", voiceURI: "com.apple.ttsbundle.Sin-Ji-compact", lang: "zh-HK", localService: true, "default": true }, { name: "Mei-Jia", voiceURI: "com.apple.ttsbundle.Mei-Jia-compact", lang: "zh-TW", localService: true, "default": true }];

  // Because chrome triggers voicechanged too often
  var currentVoices = [];

  var _iOSversion = function _iOSversion() {
    if (/(iPhone|iPad|iPod)/.test(navigator.platform)) {
      var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
      return parseInt(v[1], 10);
    }
    return false;
  };

  var _splitSentences = function _splitSentences(text) {
    return text.replace(/\.+/g, '.|').replace(/\?/g, '?|').replace(/\!/g, '!|').split("|").map(function (sentence) {
      return (0, _trim2.default)(sentence);
    });
  };

  var init = function init(conf) {
    // Import conf
    if (conf) CONF = _extends({}, CONF, conf);

    // Polyfill
    if (!browserSupport()) {
      return false;
    } else {
      // On Chrome, voices are loaded asynchronously
      if ('onvoiceschanged' in window.speechSynthesis) {
        speechSynthesis.onvoiceschanged = (0, _debounce2.default)(function () {
          if (currentVoices.length !== window.speechSynthesis.getVoices().length) {
            currentVoices = window.speechSynthesis.getVoices();
            if (CONF.onVoicesLoaded) CONF.onVoicesLoaded({
              voices: window.speechSynthesis.getVoices()
            });
          }
        }, 300);
      } else {
        var iosVersion = _iOSversion();
        if (iosVersion) {
          _initIOS(iosVersion);
        }
      }
    }
  };

  var _initIOS = function _initIOS(version) {
    // Sometimes IOS has no voice (bug), so we try to handle it
    if (version >= 9) {
      if (window.speechSynthesis.getVoices().length === 0) {
        delete window.speechSynthesis.getVoices;
        window.speechSynthesis.getVoices = function () {
          return iOS9voices;
        }; // use cached voices
      }
      if (CONF.onVoicesLoaded) CONF.onVoicesLoaded({
        voices: window.speechSynthesis.getVoices()
      });
    } else if (version >= 8) {
      // Try with a timeout
      setTimeout(function () {
        if (window.speechSynthesis.getVoices().length === 0) {
          delete window.speechSynthesis.getVoices;
          window.speechSynthesis.getVoices = function () {
            return iOS8voices;
          }; // use cached voices
        }
        if (CONF.onVoicesLoaded) CONF.onVoicesLoaded({
          voices: window.speechSynthesis.getVoices()
        });
      }, 100);
    }
    // if not 8 or 7, not worth trying anything
  };

  var browserSupport = function browserSupport() {
    return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  };

  var stop = function stop() {
    window.speechSynthesis.cancel();
  };

  var setLanguage = function setLanguage(lang) {
    if (lang) CONF.lang = lang;
  };

  var setVoice = function setVoice(voice) {
    var voices = window.speechSynthesis.getVoices();
    // set voice by ID/index
    if (typeof voice === 'number') {
      voice = voices[i];
    }
    // set voice by name
    if (typeof voice === 'string') {
      voice = voices.find(function (v) {
        return v.name === voice;
      });
    }
    // Set the voice in conf if found
    if ((typeof voice === 'undefined' ? 'undefined' : _typeof(voice)) === 'object') {
      CONF.voice = voice;
    }
  };

  var speak = function speak(data) {
    var text = data.text,
        onEnd = data.onEnd,
        onError = data.onError;

    var msg = (0, _trim2.default)(text);

    if (!msg || msg === '.') return; // when click on empty space value is '.' for some weird reason
    var lang = function () {
      if (CONF.lang) return CONF.lang;
      var flang = (0, _franc2.default)(msg);
      switch (flang) {
        case 'arb':
          return "ar-SA"; // arabic
        case 'ces':
          return "cs-CZ"; // czech
        case 'dan':
          return "da-DK"; // danish
        case 'ger':
          return "de-DE"; // german
        case 'ell':
          return "el-GR"; // greek
        case 'eng':
          return "en-GB"; // english
        case 'spa':
          return "es-ES"; // spanish
        case 'fin':
          return "fi-FI"; // finish
        case 'fra':
          return "fr-FR"; // french
        case 'heb':
          return "he-IL"; // hebrew
        case 'hin':
          return "hi-IN"; // hindi
        case 'hun':
          return "hu-HU"; // hungarian
        case 'ind':
          return "id-ID"; // indonesian
        case 'ita':
          return "it-IT"; // italian
        case 'jpn':
          return "ja-JP"; // japanese
        case 'kor':
          return "ko-KR"; // korean
        case 'nld':
          return "nl-NL"; // dutch
        case 'nno':
          return "no-NO"; // norwegian
        case 'pol':
          return "pl-PL"; // polish
        case 'por':
          return "pt-PT"; // portuguese
        case 'ron':
          return "ro-RO"; // romanian
        case 'rus':
          return "ru-RU"; // russian
        case 'slk':
          return "sk-SK"; // slovak
        case 'swe':
          return "sv-SE"; // swedish
        case 'tha':
          return "th-TH"; // thai
        case 'tuk':
          return "tr-TR"; // turkish
        case 'cmn':
          return "zh-CN"; // chinese (S)
        default:
          return 'en-US';
      }
    }();

    // Get configured voice, or first for current language
    var voice = function (lang) {
      if (CONF.voice) return CONF.voice;
      return window.speechSynthesis.getVoices().find(function (voice) {
        return voice.lang.replace('_', '-') === lang; // handle android specificites
      });
    }(lang);

    // Stop current speech
    stop();

    // Split into sentances (for better result and bug with some versions of chrome)
    var sentences = _splitSentences(msg);
    sentences.forEach(function (sentence, index) {
      var isLast = index === sentences.length - 1;
      var utterance = new window.SpeechSynthesisUtterance();
      utterance.lang = lang;
      utterance.volume = parseFloat(CONF.volume); // 0 to 1
      utterance.rate = parseFloat(CONF.rate); // 0.1 to 10
      utterance.pitch = parseFloat(CONF.pitch); //0 to 2
      utterance.text = sentence;
      utterance.voice = voice;

      if (!voice) {
        if (onError) onError({ msg: 'no voice available' });
        return;
      }

      utterance.onerror = function (e) {
        if (onError) onError(e);
      };

      utterance.onend = function (e) {
        if (onEnd && isLast) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  return {
    init: init,
    browserSupport: browserSupport,
    speak: speak,
    stop: stop,
    setLanguage: setLanguage,
    setVoice: setVoice
  };
}(window);

exports.default = SpeakTTS;
},{"franc":3,"lodash/debounce":65,"lodash/get":67,"lodash/trim":77}],10:[function(require,module,exports){
var hashClear = require('./_hashClear'),
    hashDelete = require('./_hashDelete'),
    hashGet = require('./_hashGet'),
    hashHas = require('./_hashHas'),
    hashSet = require('./_hashSet');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

},{"./_hashClear":37,"./_hashDelete":38,"./_hashGet":39,"./_hashHas":40,"./_hashSet":41}],11:[function(require,module,exports){
var listCacheClear = require('./_listCacheClear'),
    listCacheDelete = require('./_listCacheDelete'),
    listCacheGet = require('./_listCacheGet'),
    listCacheHas = require('./_listCacheHas'),
    listCacheSet = require('./_listCacheSet');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

},{"./_listCacheClear":45,"./_listCacheDelete":46,"./_listCacheGet":47,"./_listCacheHas":48,"./_listCacheSet":49}],12:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":33,"./_root":58}],13:[function(require,module,exports){
var mapCacheClear = require('./_mapCacheClear'),
    mapCacheDelete = require('./_mapCacheDelete'),
    mapCacheGet = require('./_mapCacheGet'),
    mapCacheHas = require('./_mapCacheHas'),
    mapCacheSet = require('./_mapCacheSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

},{"./_mapCacheClear":50,"./_mapCacheDelete":51,"./_mapCacheGet":52,"./_mapCacheHas":53,"./_mapCacheSet":54}],14:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":58}],15:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],16:[function(require,module,exports){
/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;

},{}],17:[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":66}],18:[function(require,module,exports){
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],19:[function(require,module,exports){
var castPath = require('./_castPath'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./_castPath":26,"./_toKey":62}],20:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":14,"./_getRawTag":34,"./_objectToString":57}],21:[function(require,module,exports){
var baseFindIndex = require('./_baseFindIndex'),
    baseIsNaN = require('./_baseIsNaN'),
    strictIndexOf = require('./_strictIndexOf');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;

},{"./_baseFindIndex":18,"./_baseIsNaN":22,"./_strictIndexOf":59}],22:[function(require,module,exports){
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;

},{}],23:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isMasked":44,"./_toSource":63,"./isFunction":69,"./isObject":70}],24:[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],25:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    arrayMap = require('./_arrayMap'),
    isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;

},{"./_Symbol":14,"./_arrayMap":15,"./isArray":68,"./isSymbol":72}],26:[function(require,module,exports){
var isArray = require('./isArray'),
    isKey = require('./_isKey'),
    stringToPath = require('./_stringToPath'),
    toString = require('./toString');

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;

},{"./_isKey":42,"./_stringToPath":61,"./isArray":68,"./toString":76}],27:[function(require,module,exports){
var baseSlice = require('./_baseSlice');

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

module.exports = castSlice;

},{"./_baseSlice":24}],28:[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf');

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the last unmatched string symbol.
 */
function charsEndIndex(strSymbols, chrSymbols) {
  var index = strSymbols.length;

  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

module.exports = charsEndIndex;

},{"./_baseIndexOf":21}],29:[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf');

/**
 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */
function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1,
      length = strSymbols.length;

  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

module.exports = charsStartIndex;

},{"./_baseIndexOf":21}],30:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":58}],31:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],32:[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;

},{"./_isKeyable":43}],33:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":23,"./_getValue":35}],34:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":14}],35:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],36:[function(require,module,exports){
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;

},{}],37:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

},{"./_nativeCreate":56}],38:[function(require,module,exports){
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

},{}],39:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":56}],40:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

},{"./_nativeCreate":56}],41:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

},{"./_nativeCreate":56}],42:[function(require,module,exports){
var isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;

},{"./isArray":68,"./isSymbol":72}],43:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;

},{}],44:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":30}],45:[function(require,module,exports){
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

},{}],46:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

},{"./_assocIndexOf":17}],47:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

},{"./_assocIndexOf":17}],48:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

},{"./_assocIndexOf":17}],49:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

},{"./_assocIndexOf":17}],50:[function(require,module,exports){
var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;

},{"./_Hash":10,"./_ListCache":11,"./_Map":12}],51:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

},{"./_getMapData":32}],52:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

},{"./_getMapData":32}],53:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

},{"./_getMapData":32}],54:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

},{"./_getMapData":32}],55:[function(require,module,exports){
var memoize = require('./memoize');

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;

},{"./memoize":73}],56:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":33}],57:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],58:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":31}],59:[function(require,module,exports){
/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;

},{}],60:[function(require,module,exports){
var asciiToArray = require('./_asciiToArray'),
    hasUnicode = require('./_hasUnicode'),
    unicodeToArray = require('./_unicodeToArray');

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;

},{"./_asciiToArray":16,"./_hasUnicode":36,"./_unicodeToArray":64}],61:[function(require,module,exports){
var memoizeCapped = require('./_memoizeCapped');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;

},{"./_memoizeCapped":55}],62:[function(require,module,exports){
var isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;

},{"./isSymbol":72}],63:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],64:[function(require,module,exports){
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;

},{}],65:[function(require,module,exports){
var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

},{"./isObject":70,"./now":74,"./toNumber":75}],66:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],67:[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{"./_baseGet":19}],68:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],69:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObject = require('./isObject');

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./_baseGetTag":20,"./isObject":70}],70:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],71:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],72:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":20,"./isObjectLike":71}],73:[function(require,module,exports){
var MapCache = require('./_MapCache');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;

},{"./_MapCache":13}],74:[function(require,module,exports){
var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

},{"./_root":58}],75:[function(require,module,exports){
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":70,"./isSymbol":72}],76:[function(require,module,exports){
var baseToString = require('./_baseToString');

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

},{"./_baseToString":25}],77:[function(require,module,exports){
var baseToString = require('./_baseToString'),
    castSlice = require('./_castSlice'),
    charsEndIndex = require('./_charsEndIndex'),
    charsStartIndex = require('./_charsStartIndex'),
    stringToArray = require('./_stringToArray'),
    toString = require('./toString');

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  abc  ');
 * // => 'abc'
 *
 * _.trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * _.map(['  foo  ', '  bar  '], _.trim);
 * // => ['foo', 'bar']
 */
function trim(string, chars, guard) {
  string = toString(string);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrim, '');
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  var strSymbols = stringToArray(string),
      chrSymbols = stringToArray(chars),
      start = charsStartIndex(strSymbols, chrSymbols),
      end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}

module.exports = trim;

},{"./_baseToString":25,"./_castSlice":27,"./_charsEndIndex":28,"./_charsStartIndex":29,"./_stringToArray":60,"./toString":76}],78:[function(require,module,exports){
'use strict';

var getTrigrams,
    EXPRESSION_SYMBOLS,
    has;

/**
 * Dependencies.
 */

getTrigrams = require('n-gram').trigram;

/**
 * Cache.
 */

has = Object.prototype.hasOwnProperty;

/**
 * An expression matching general non-important (as in, for
 * language detection) punctuation marks, symbols, and numbers.
 *
 * | Unicode | Character | Name               |
 * | ------: | :-------: | :----------------- |
 * |  \u0021 |     !     | EXCLAMATION MARK   |
 * |  \u0022 |     "     | QUOTATION MARK     |
 * |  \u0023 |     #     | NUMBER SIGN        |
 * |  \u0024 |     $     | DOLLAR SIGN        |
 * |  \u0025 |     %     | PERCENT SIGN       |
 * |  \u0026 |     &     | AMPERSAND          |
 * |  \u0027 |     '     | APOSTROPHE         |
 * |  \u0028 |     (     | LEFT PARENTHESIS   |
 * |  \u0029 |     )     | RIGHT PARENTHESIS  |
 * |  \u002A |     *     | ASTERISK           |
 * |  \u002B |     +     | PLUS SIGN          |
 * |  \u002C |     ,     | COMMA              |
 * |  \u002D |     -     | HYPHEN-MINUS       |
 * |  \u002E |     .     | FULL STOP          |
 * |  \u002F |     /     | SOLIDUS            |
 * |  \u0030 |     0     | DIGIT ZERO         |
 * |  \u0031 |     1     | DIGIT ONE          |
 * |  \u0032 |     2     | DIGIT TWO          |
 * |  \u0033 |     3     | DIGIT THREE        |
 * |  \u0034 |     4     | DIGIT FOUR         |
 * |  \u0035 |     5     | DIGIT FIVE         |
 * |  \u0036 |     6     | DIGIT SIX          |
 * |  \u0037 |     7     | DIGIT SEVEN        |
 * |  \u0038 |     8     | DIGIT EIGHT        |
 * |  \u0039 |     9     | DIGIT NINE         |
 * |  \u003A |     :     | COLON              |
 * |  \u003B |     ;     | SEMICOLON          |
 * |  \u003C |     <     | LESS-THAN SIGN     |
 * |  \u003D |     =     | EQUALS SIGN        |
 * |  \u003E |     >     | GREATER-THAN SIGN  |
 * |  \u003F |     ?     | QUESTION MARK      |
 * |  \u0040 |     @     | COMMERCIAL AT      |
 */

EXPRESSION_SYMBOLS = /[\u0021-\u0040]+/g;

/**
 * Clean `value`.
 *
 * @example
 *   > clean('Some dirty  text.')
 *   // 'some dirty text'
 *
 * @param {string} value
 * @return {string}
 */

function clean(value) {
    if (value === null || value === undefined) {
        value = '';
    }

    return String(value)
        .replace(EXPRESSION_SYMBOLS, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

/**
 * Deep regular sort on item at `1` in both `Object`s.
 *
 * @example
 *   > [[0, 20], [0, 1], [0, 5]].sort(sort);
 *   // [[0, 1], [0, 5], [0, 20]]
 *
 * @param {{1: number}} a
 * @param {{1: number}} b
 */

function sort(a, b) {
    return a[1] - b[1];
}

/**
 * Get clean, padded, trigrams.
 *
 * @param {string} value
 * @return {Array.<string>}
 */

function getCleanTrigrams(value) {
    return getTrigrams(' ' + clean(value) + ' ');
}

/**
 * Get an `Object` with trigrams as its attributes, and
 * their occurence count as their values
 *
 * @param {string} value
 * @return {Object.<string, number>} - `Object` containing
 *   weighted trigrams.
 */

function getCleanTrigramsAsDictionary(value) {
    var trigrams,
        dictionary,
        index,
        trigram;

    trigrams = getCleanTrigrams(value);
    dictionary = {};
    index = trigrams.length;

    while (index--) {
        trigram = trigrams[index];

        if (has.call(dictionary, trigram)) {
            dictionary[trigram]++;
        } else {
            dictionary[trigram] = 1;
        }
    }

    return dictionary;
}

/**
 * Get an `Array` containing trigram--count tuples from a
 * given value.
 *
 * @param {string} value
 * @return {Array.<Array.<string, number>>} `Array`
 *   containing trigram--count tupples, sorted by
 *   count (low to high).
 */

function getCleanTrigramsAsTuples(value) {
    var dictionary,
        tuples,
        trigram;

    dictionary = getCleanTrigramsAsDictionary(value);
    tuples = [];

    for (trigram in dictionary) {
        tuples.push([trigram, dictionary[trigram]]);
    }

    tuples.sort(sort);

    return tuples;
}

/**
 * Get an `Array` containing trigram--count tuples from a
 * given value.
 *
 * @param {Array.<Array.<string, number>>} tuples - Tuples
 *   to transform into a dictionary.
 * @return {Object.<string, number>}
 */

function getCleanTrigramTuplesAsDictionary(tuples) {
    var dictionary,
        index,
        tuple;

    dictionary = {};
    index = tuples.length;

    while (index--) {
        tuple = tuples[index];
        dictionary[tuple[0]] = tuple[1];
    }

    return dictionary;
}

/**
 * Expose utilities.
 */

module.exports = {
    'clean': clean,
    'trigrams': getCleanTrigrams,
    'asDictionary': getCleanTrigramsAsDictionary,
    'asTuples': getCleanTrigramsAsTuples,
    'tuplesAsDictionary': getCleanTrigramTuplesAsDictionary
};

},{"n-gram":8}]},{},[1])