<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/10/21
 * Time: 下午8:57
 */
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'models/SortModel.php';
class SortService
{
    public function getSortList($pid=0, $count=8){
        $sort = new SortModel();

        return $sort->allList($pid, $count);
    }
}