<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/5/6
 * Time: 下午12:27
 */
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'models/UserModel.php';

class UserService {

    public function createUser($username, $userhead, $token){
        $User = new UserModel();
        $userinfo = array();
        $userinfo['addtime'] = date("Y-m-d H:i:m");
        $userinfo['state'] = 1;
        $userinfo['id'] = base_convert(uniqid(), 8, 5);
        $userinfo['nickName'] = $username;
        $userinfo['avatarUrl'] = $userhead;
        $userinfo['token'] = $token;
        $User->insertUser($userinfo);
        return compact('userinfo');
    }

    public function getUserById($uid){
        $User = new UserModel();
        return $User->getById($uid);
    }

    public function getUserByToken($token){
        $User = new UserModel();
        return $User->getByTokenStr($token);
    }

    public function updateAddr($token, $address){
        $User = new UserModel();
        return $User->updateAddr($token, $address);
    }

    public function updateUser($nickName, $avatarUrl, $token){
        $User = new UserModel();
        return $User->updateUser($nickName, $avatarUrl, $token);
    }
}