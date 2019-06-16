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

class CommentModel extends CI_Model
{

    public static function getByUid($productionid, $lastid=0, $count=1){
        $res = DB::select('homedepot_comment', ['*'], 'productionid='.$productionid.' and id>'.$lastid.' and state=1', '', 'order by addtime desc limit '.$count);
        return CommentModel::transformEntity($res);
    }

    public static function getByHot($productionid, $count=1){
        $res = DB::select('homedepot_comment', ['*'], 'productionid='.$productionid.' and state=1', '', 'order by approve_num desc limit '.$count);
        return CommentModel::transformEntity($res);
    }

    public static function removeById($id){
        $state = 0;
        $res = DB::update('homedepot_comment', compact("state"), 'id='.$id, '', '');
        return CommentModel::transformEntity($res);
    }

    public static function getHotTag($productionid, $count=5){
        $res = DB::select('homedepot_comment', ['tag', 'count(0) as size'], 'productionid='.$productionid.' and state=1', '', 'group by tag order by size desc limit '.$count);
        return $res;
    }

    public static function countByTid($productionid){
        $res = DB::select('homedepot_comment', ['count(0) as size'], 'productionid='.$productionid.' and state=1', '', '');
        return $res[0]->size;
    }

    public static function addOne($comment){
        $res = DB::insert('homedepot_comment', $comment);
        return $res;
    }

    public static function getProduct($id){
        $res = DB::row('homedepot_production', ['*'], 'id='.$id.' and state=1', '', '');
        if($res->pics != '') {
            $picArr = explode(',', $res->pics);
            $res->pics = $picArr;
        }
        return $res;
    }

    public static function getUserById($token){
        $res = DB::row('homedepot_user', ['*'], 'token="'.$token.'"', '', '');
        return $res;
    }

    public static function updateOrderState($id, $state){
        $res = DB::update('homedepot_order', compact("state"), 'id='.$id, '', '');
        return $res;
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