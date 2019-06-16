<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/5/6
 * Time: 下午12:24
 */
defined('BASEPATH') OR exit('No direct script access allowed');

require BASEPATH.'core/Model.php';
use \QCloud_WeApp_SDK\Mysql\Mysql as DB;

class AdModel extends CI_Model
{

    public static function adList($count=3){
        $res = DB::select('homedepot_ad', ['*'], 'state=1', '', 'limit '.$count);
        return $res;
    }

}