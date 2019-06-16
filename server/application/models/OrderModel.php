<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/10/28
 * Time: 下午7:51
 */
defined('BASEPATH') OR exit('No direct script access allowed');

require BASEPATH.'core/Model.php';
use \QCloud_WeApp_SDK\Mysql\Mysql as DB;

class OrderModel extends CI_Model
{
    public static function insertOrder($token, $content, $address){
        $order = array();
        $order['content'] = $content;
        $order['address'] = $address;
        $order['token'] = $token;
        $order['state'] = 1;
        $res = DB::insert('homedepot_order', $order);
        return $res;
    }

    public static function countByState($token, $state){
        $res = DB::select('homedepot_order', ['count(0)'], ' token="'.$token.'" and state='.$state, '', '');
        return $res;
    }

    public static function getOrderList($token, $state){
        $res = DB::select('homedepot_order', ['*'], ' token="'.$token.'" and state='.$state, '', '');
        return $res;
    }
}