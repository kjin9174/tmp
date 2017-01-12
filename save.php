<?php
$json = "{'process':".$_POST['data']."}";

$fp = fopen("myFlowWriteTest.json","wb");
fwrite($fp,$json);
fclose($fp);

echo "success";
