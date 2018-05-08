<?php

class Response{
  
  public function error($message){
      return array(  "code"    =>'ERROR'
                    ,"message" =>$message
                    ,"data"    =>null); 
  }

  public function ok($message, $data){
      return array(  "code"    =>'OK'
                    ,"message" =>$message
                    ,"data"    =>$data);  
  }  

}

?>