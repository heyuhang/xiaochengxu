<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/10/28
 * Time: 下午7:40
 */
require BASEPATH.'core/Model.php';
use \QCloud_WeApp_SDK\Mysql\Mysql as DB;

class ShopModel extends CI_Model
{
    public static function getListByUid($token){
        $res = DB::select('homedepot_shop', ['*'], 'token="'.$token.'" and state = 1', '', 'order by addtime desc');
        return ShopModel::transformEntity($res);
    }

    public static function delByUid($token, $id){
        $count = DB::delete('homedepot_shop', 'id='.$id.' and token="'.$token.'"', '');
        return $count;
    }

    public static function getUserById($token){
        $res = DB::row('homedepot_user', ['*'], 'token="'.$token.'"', '', '');
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

    public static function insertShop($shop, $size, $productId){
        $product = ShopModel::getProduct($productId);
        $specifications = $product->specifications;
        $sizeStr = explode(",", $specifications)[$size];
        $shop['size'] =  explode(":", $sizeStr)[0];
        $res = DB::insert('homedepot_shop', $shop);
        return $res;
    }

    public static function insertOrder($order){
        $res = DB::insert('homedepot_order', $order);
        return $res;
    }

    public static function updateShop($shop, $id){
        $res = DB::update('homedepot_shop', $shop, 'id='.$id, '', '');
        return $res;
    }

    public static function updateShopState($id){
        $state = 2;
        $res = DB::update('homedepot_shop', compact("state"), 'id='.$id, '', '');
        return $res;
    }

    public static function updateAddress($token, $address){
        $res = DB::update('homedepot_user', $address, 'token="'.$token.'"', '', '');
        return $res;
    }

    public static function getById($id){
        $res = DB::row('homedepot_shop', ['*'], 'id='.$id, '', '');
        return $res;
    }

    public static function transformEntity($entityList){
        $list = array();
        foreach ($entityList as $entity){
            $productId = $entity->product_id;
            $product = ShopModel::getProduct($productId);
            $entity->pics = $product->pics;
            $entity->title = $product->title;
            $entity->price = $product->price;
            $entity->productId = $productId;
            array_push($list, $entity);
        }

        return $list;
    }

    public static function countByState($token, $state){
        $res = DB::select('homedepot_order', ['count(0) as num'], ' token="'.$token.'" and state='.$state, '', '');
        return $res;
    }

    public static function getOrderList($token, $state){
        if($state > 0) {
            $res = DB::select('homedepot_order', ['*'], ' token="' . $token . '" and state=' . $state, '', '');
            return $res;
        }else{
            $res = DB::select('homedepot_order', ['*'], ' token="' . $token . '" and state>0', '', '');
            return $res;
        }
    }

    public static function getOrderDetail($token, $id){
        $res = DB::row('homedepot_order', ['*'], 'id='.$id.' and token="'.$token.'"', '', '');
        return $res;
    }

    public static function delOrder($token, $id){
        $state = 0;
        $count = DB::update('homedepot_order', compact("state"), 'id='.$id.' and token="'.$token.'"', '', '');
        return $count;
    }

    public static function get($id){
        $res = DB::row('homedepot_production', ['*'], 'id='.$id.' and state=1', '', '');
        $picArr = explode(',', $res->pics);
        $res->pics = $picArr;
        return $res;
    }
}