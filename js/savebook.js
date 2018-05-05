
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}



html='';
$(".readerImg[src]").each(function( index ) { html=html+"<img id='"+index+"'' src=http://eproxy2.lib.tsinghua.edu.cn"+$(this).attr("src")+"style='width:400px' />"});
download('test.html', html);
// 