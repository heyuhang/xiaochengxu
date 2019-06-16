<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/5/6
 * Time: 下午12:27
 */
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'models/AdModel.php';

class AdService {

    public function getAdList($count=3){
        $ad = new AdModel();

        return $ad->adlist($count);
    }
}