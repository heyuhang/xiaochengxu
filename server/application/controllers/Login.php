<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;
require APPPATH.'business/UserService.php';

class Login extends CI_Controller {
    public function index() {
        $result = LoginService::login();

        if ($result['loginState'] === Constants::S_AUTH) {
            $res = $result['userinfo'];
            $user = $res['userinfo'];
            $token = $user->openId;
            $service = new UserService();

            if($service->getUserByToken($token) == NULL) {
                $service->createUser($user->nickName, $user->avatarUrl, $user->openId);
            }
            $this->json([
                'code' => 0,
                'data' => $res
            ]);
        } else {
            $this->json([
                'code' => -1,
                'error' => $result['error']
            ]);
        }
    }

    public function userInfo(){
        $service = new UserService();
        $token = $_GET['openId'];
        $nickName = $_GET['nickName'];
        $avatarUrl = $_GET['avatarUrl'];
        if($service->getUserByToken($token) == NULL) {
            $service->createUser($nickName, $avatarUrl, $token);
        }else{
            $service->updateUser($nickName, $avatarUrl, $token);
        }
        $this->json([
            'code' => 0,
            'data' => $token
        ]);
    }

    public function openId($code){
        $apiUrl = "https://api.weixin.qq.com/sns/jscode2session?appid=wx43fa64a653149f22&secret=12d5065b8be83757c88321677095c744&js_code=".$code."&grant_type=authorization_code";

        $curl = curl_init(); // 启动一个CURL会话
        curl_setopt($curl, CURLOPT_URL, $apiUrl);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);  // 从证书中检查SSL加密算法是否存在
        $tmpInfo = curl_exec($curl);     //返回api的json对象
        //关闭URL请求
        curl_close($curl);

        $userInfo = json_decode($tmpInfo,TRUE);
        return $this->json([
            'code' => 0,
            'msg' => $apiUrl,
            'data' => $userInfo
        ]);
    }
}
