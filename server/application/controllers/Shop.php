<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/11/12
 * Time: 下午10:38
 */
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'business/ShopService.php';

class Shop extends CI_Controller
{
    public function listUid($uid) {
        $service = new ShopService();

        $this->json([
            'code' => 0,
            'data' => $service->getByUid($uid)
        ]);
    }

    public function delUid($token, $id) {
        $service = new ShopService();

        $this->json([
            'code' => 0,
            'count' => $service->delByUid($token, $id)
        ]);
    }

    public function insertShop($token, $productId, $size, $num=1){
        $service = new ShopService();

        $this->json([
            'code' => 0,
            'shopId' => $service->insertShop($productId, $token, $size, $num)
        ]);
    }

    public function  updateNum($id, $num){
        $service = new ShopService();

        $this->json([
            'code' => 0,
            'count' => $service->updateNum($id, $num)
        ]);
    }

    public function count($token){
        $service = new ShopService();

        $this->json([
            'code' => 0,
            'data' => $service->count($token)
        ]);
    }

    public function getShopDetail($token){
        $service = new ShopService();

        $this->json([
            'code' => 0,
            'data' => $service->getShopDetail($token)
        ]);
    }

    public function address($token){
        $service = new ShopService();

        $this->json([
            'code' => 0,
            'data' => $service->getAddress($token)
        ]);
    }

    public function updateAddress($token, $name, $mobile, $local, $address){
        $service = new ShopService();

        $this->json([
            'code' => 0,
            'count' => $service->updateAddress($token, $name, $mobile, $local, $address)
        ]);
    }
}