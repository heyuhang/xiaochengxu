<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Auth\LoginService as LoginService;
//use QCloud_WeApp_SDK\Helper\Util as Util;
use QCloud_WeApp_SDK\Constants as Constants;

require APPPATH . 'business/UserService.php';

class User extends CI_Controller
{

    public function index()
    {
        $result = LoginService::check();

        if ($result['loginState'] === Constants::S_AUTH) {
            $res = $result['userinfo'];
            $this->json([
                'code' => 0,
                'data' => $res
            ]);
        } else {
            $this->json([
                'code' => -1,
                'data' => []
            ]);
        }
    }

    public function info($token)
    {
        $service = new UserService();
        $user = $service->getUserByToken($token);
        if ($user != null) {
            $this->json([
                'code' => 0,
                'data' => $user
            ]);
        } else {
            $this->json([
                'code' => -1,
                'data' => []
            ]);
        }
    }

    public function getAddr($token)
    {
        $service = new UserService();
        $user = $service->getUserByToken($token);
        if ($user != null) {
            $this->json([
                'code' => 0,
                'data' => $user . address
            ]);
        } else {
            $this->json([
                'code' => -1,
                'data' => []
            ]);
        }
    }

    public function address($openId = '', $name = '', $mobile = '', $localNum, $local = '', $detail)
    {
        $service = new UserService();
//        $result = LoginService::check();

//        if ($result['loginState'] === Constants::S_AUTH) {
        if ($openId != '') {
//            $res = $result['userinfo'];
//            $userinfo = $res['userinfo'];
            $locals = str_replace("-", ",", $localNum);
//            $locals = explode("-", $localNum);
            $token = $openId;
            if ($name != '' && $mobile != '' && $local != '' && $detail != '') {
                $address = array('name' => urldecode($name), 'mobile' => $mobile, 'local' => urldecode($local), 'locals' => $locals, 'detail' => urldecode($detail));
                $service->updateAddr($token, json_encode($address));
                $this->json([
                    'code' => 0
                ]);
            } else {
                $this->json([
                    'code' => 1,
                ]);
            }
        } else {
            $this->json([
                'code' => 3
            ]);
        }
    }
}
