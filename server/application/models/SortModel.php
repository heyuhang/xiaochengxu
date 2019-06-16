<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/10/21
 * Time: 下午7:47
 */
defined('BASEPATH') OR exit('No direct script access allowed');

require BASEPATH.'core/Model.php';
use \QCloud_WeApp_SDK\Mysql\Mysql as DB;

class SortModel extends CI_Model
{
    public static function allList($pid=0, $count=8){
        $res = DB::select('homedepot_sort', ['*'], 'state=1 and pid='.$pid, '', 'limit '.$count);
        return $res;
    }
}