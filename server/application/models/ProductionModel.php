<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/5/6
 * Time: 下午3:52
 */
defined('BASEPATH') OR exit('No direct script access allowed');

require BASEPATH.'core/Model.php';
use \QCloud_WeApp_SDK\Mysql\Mysql as DB;

class ProductionModel extends CI_Model
{

    public static function indexlist($lastid=0, $count=10){
        $res = DB::select('homedepot_production', ['*'], 'id>'.$lastid.' and state=1', '', 'order by addtime desc limit '.$count);
        return ProductionModel::transformEntity($res);
    }

    public static function sortlist($lastid=0, $count=10, $sort=1){
        $res = DB::select('homedepot_production', ['*'], ' id>'.$lastid.' and state=1 and sort='.$sort, '', 'order by addtime desc limit '.$count);
        return ProductionModel::transformEntity($res);
    }

    public static function sortAlllist($lastid=0, $count=10){
        $res = DB::select('homedepot_production', ['*'], ' id>'.$lastid.' and state=1', '', 'order by addtime desc limit '.$count);
        return ProductionModel::transformEntity($res);
    }


    public static function get($id){
        $res = DB::row('homedepot_production', ['*'], 'id='.$id.' and state=1', '', '');
        $picArr = explode(',', $res->pics);
        $res->pics = $picArr;
        return $res;
    }

    public static function getLike($cont){
        $res = DB::select('homedepot_production', ['*'], 'title like "%'.$cont.'%" and state=1', '', '');
        return ProductionModel::transformEntity($res);
    }

    public static function transformEntity($entityList){
        $list = array();
        foreach ($entityList as $entity){
            $picArr = explode(',', $entity->pics);
            $entity->pics = $picArr;
            array_push($list, $entity);
        }

        return $list;
    }

}