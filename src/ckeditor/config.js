/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {
    // Define changes to default configuration here.
    // For complete reference see:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config

    // The toolbar groups arrangement, optimized for a single toolbar row.
    config.toolbarGroups = [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
        { name: 'forms' },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
        { name: 'links' },
        { name: 'insert' },
        { name: 'styles' },
        { name: 'colors' },
        { name: 'tools' },
        { name: 'others' }
    ];

    config.format_tags = 'p;h1;h2;h3;h4;h5;h6;div';

    // The default plugins included in the basic setup define some buttons that
    // are not needed in a basic editor. They are removed here.
    config.removeButtons = 'Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';
    config.extraPlugins = 'inlinesave,sourcearea,sourcedialog,video,inserthtml,image,format,wysiwygarea,balloonpanel,a11ychecker,html5audio,table,lineutils,widget,codesnippet,find,templates,mathjax,clipboard';
    // config.uploadUrl = '/uploader/upload.php';
    // removed plugins easykeymap,
    // Dialog windows are also simplified.
    config.removeDialogTabs = 'link:advanced';
    // config.extraAllowedContent: 'video[*]{*};source[*]{*}';

    config.codeSnippet_languages = {
        javascript: 'JavaScript',
        php: 'PHP',
        css: "css",
        // apache: 'Apache',
        bash: 'Bash',
        // coffeescript: 'CoffeeScript',
        css: 'CSS',
        html: 'HTML',
        json: 'JSON',
        markdown: 'Markdown',
        python: 'Python',
        sql: 'SQL'
    };

    config.codeSnippet_theme = 'pojoaque';
    config.timestamp = 'ABCE';
    config.disallowedContent = 'strong em i cite';
    embeded = 'iframe[width,height,src,frameborder,allow,allowfullscreen,scrolling];'
    // config.allowedContent = embeded     + 'script[type,src];table;td;tr;del[datetime, title];span(!math-tex);a[!href];h1; h2; h3; h4; h5; p(content); br;code {*};pre;section; div[data-tiny](ieconomics_share,path,savetofile,chinese,marco,marco_desc,img_desc,section_desc,tabs,tab,content);label[for];ul;ol;li;img[!src]{width,height,alt};audio[!src,controls];video[controls,onclick,width,id];source[!src,type];mark;details;summary;em';
    https://docs.ckeditor.com/ckeditor4/latest/guide/dev_allowed_content_rules.html
    config.allowedContent = embeded + ' \
    script[type,src];table; \
    strong; \
    td[rowspan,colspan,width];tr;th; \
    del[datetime, title]; \
    span[*](math-tex,original,translate,cost,information,jieba);a[!href];h1; h2; h3; h4; h5; \
    b; \
    a[id]; br;code {*};pre;section; \
    p div [value] (original,translate,videolink,jieba,ieconomics_share,path,savetofile,chinese,marco,marco_desc,img_desc,section_desc,tabs,tab,content,middle);\
    label[for];ul;ol;li;img[!src]{width,height,alt};audio[!src,controls];video[*]{*};source[*]{*};mark;details;summary;em';

// PENDENT TO DO DOOOOOOO
    // config.allowedContent = {
    //     'iframe': {

    //         attributes: ['width', 'height', 'src', 'frameborder', 'allow', 'allowfullscreen', 'scrolling']
    //     },

    //     'script': {
    //         attributes: ['type', 'src']
    //     },
    //     table: true,
    //     strong: true,
    //     td: {
    //         attributes: ['rowspan', 'colspan', 'width']
    //     },
    //     tr: true,
    //     th: true,
    //     del: {
    //         attributes: ['datetime', 'title']
    //     },
    //     span: {
    //         classes: ['math-tex', 'original', 'translate', 'cost', 'information'],
    //     },
    //             span: {
    //         styles: 'background'
    //     },
    //     a: {
    //         attributes: '!href'
    //     },
    //     h1: true,
    //     h2: true,
    //     h3: true,
    //     h4: true,
    //     h5: true,
    //     b: true,
    //     a:{
    //         attributes:'id'
    //     },
    //     br:true,
    //     code:true, **
    //     pre:true,
    //     section:true,
    //     'p div':   { attributes: 'value'},
    //     'p div':   {classes:'original','translate','videolink','jieba','ieconomics_share','path','savetofile','chinese','marco','marco_desc','img_desc','section_desc','tabs','tab','content','middle'},


    // }





    // chinese : chinese text classes
    // savetofile : content to save where path classes dictate
    // path  : tell where to save content only pure text from the class "savetofile"
    //  config.disallowedContent = 'span';
    config.enterMode = CKEDITOR.ENTER_P;
    config.forceEnterMode = true; //force to create a <p> inside of a div

    config.mathJaxLib = "/js/MathJax-master/MathJax.js?config=TeX-AMS-MML_HTMLorMML";

    config.inlinesave = {
        postUrl: '/inc/save.php',
        postData: { test: true },
        onSave: function(editor) { console.log('clicked save ', editor); return true; },
        onSuccess: function(editor, data) {
            console.log('saved', editor, data);
            window.alert("Sucess!");
        },
        onFailure: function(editor, status, request) {
            window.alert("Failed!");
            console.log('save failed', editor, status, request);
        },
        useJSON: false,
        useColorIcon: false
    };

    // https://github.com/xiidea/ckeditor-easykeymap-plugin
    // search online keycode
    // http://asquare.net/javascript/tests/KeyCode.html


    // $(document).keyup(function(e){
    //   alert(e.keyCode);
    //   //or
    //   alert(e.which);
    // })

    //http://docs.ckeditor.com/#!/guide/dev_disallowed_content

    // config.allowedContent = 'h1 h2 h3 p br';
    // config.allowedContent = {
    //     $1: {
    //         // Use the ability to specify elements as an object.
    //         elements: CKEDITOR.dtd,
    //         attributes: true,
    //         styles: true,
    //         classes: true
    //     }
    // };

    // http://docs.ckeditor.com/#!/guide/dev_acf
    //http://docs.ckeditor.com/#!/guide/dev_allowed_content_rules


    //
    // config.easykeymaps = {
    //  // 4456530 : 'String.fromCharCode(174)',   //ALT + R
    //
    //          4456530 : '<h1>Title 1</h1>',   //ALT + R
    //
    //         4456515 : String.fromCharCode(169)   //ALT + C
    //     };

};