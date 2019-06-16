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

class UserModel extends CI_Model
{

    public static function getByToken($token){
        $res = DB::row('homedepot_user', ['*'], 'token='.$token.' and state=1', '', '');
        return $res;
    }

    public static function getByTokenStr($token){
        $res = DB::row('homedepot_user', ['*'], 'token="'.$token.'" and state=1', '', '');
        return $res;
    }

    public static function removeById($id){
        $state = 0;
        $res = DB::update('homedepot_user', compact("state"), 'id='.$id, '', '');
        return $res;
    }

    public static function getById($id){
        $state = 0;
        $res = DB::row('homedepot_user', compact("state"), 'id='.$id, '', '');
        return $res;
    }

    public static function insertUser($user){
        $res = DB::insert('homedepot_user', $user);
        return $res;
    }

    public static function updateAddr($token, $address){
        $res = DB::update('homedepot_user', compact('address'), compact('token'), '', '');
        return $res;
    }

    public static function updateUser($nickName, $avatarUrl, $token){
        $res = DB::update('homedepot_user', compact('nickName', 'avatarUrl'), compact('token'), '', '');
        return $res;
    }
}