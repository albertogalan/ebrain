<?php

//API控制台申请得到的ak（此处ak值仅供验证参考使用）
$ak = 'tjMRoKIF4TtmCnlzkPKaiqfN0yzR57G5';

//应用类型为for server, 请求校验方式为sn校验方式时，系统会自动生成sk，可以在应用配置-设置中选择Security Key显示进行查看（此处sk值仅供验证参考使用）
$sk = 'iPUdWyt51qDFdrQNQLcdhw1tuY9NZSRT';

//以Geocoding服务为例，地理编码的请求url，参数待填
$url = "http://api.map.baidu.com/geocoder/v2/?address=%s&output=%s&ak=%s&sn=%s";

//get请求uri前缀
$uri = '/geocoder/v2/';

//地理编码的请求中address参数
$address = '百度大厦';

//地理编码的请求output参数
$output = 'json';

//构造请求串数组
$querystring_arrays = array (
	'address' => $address,
	'output' => $output,
	'ak' => $ak
);

//调用sn计算函数，默认get请求
$sn = caculateAKSN($ak, $sk, $uri, $querystring_arrays);

//请求参数中有中文、特殊字符等需要进行urlencode，确保请求串与sn对应
$target = sprintf($url, urlencode($address), $output, $ak, $sn);

//输出计算得到的sn
echo "sn: $sn \n";

//输出完整请求的url（仅供参考验证，故不能正常访问服务）
echo "url: $target \n";

function caculateAKSN($ak, $sk, $url, $querystring_arrays, $method = 'GET')
{  
    if ($method === 'POST'){  
        ksort($querystring_arrays);  
    }  
    $querystring = http_build_query($querystring_arrays);  
    return md5(urlencode($url.'?'.$querystring.$sk));  
}

?>
</syntaxhighlight>
<div class="separate-title">其中，caculateAKSN的定义如下：</div>

<syntaxhighlight lang="null">
