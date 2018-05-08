<?php

class Configuration_Manager{
  
  public $file_path  = "dev".".web.config.xml";

  public function getSetting($config){

    //Value for default
    $result = 'NOT_FOUND';

    //Load XML
    $web_config = simplexml_load_file($this->file_path);

    //Foreach all atributes
    foreach ($web_config as $setting):
      $key=$setting->key;
      $value=$setting->value;

      //Validate key
      if($key == $config){
        $result = $value;
      }
    endforeach;

    return  $result;
  }

}

?>
