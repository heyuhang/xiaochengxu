<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/11/12
 * Time: 下午10:38
 */
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'business/ShopService.php';

class Order extends CI_Controller
{
    public function insertShop($token, $productId, $size, $num=1){
        $service = new ShopService();

        $this->json([
            'code' => 0,
            'shopId' => $service->insertShop($productId, $token, $size, $num)
        ]);
    }

    public function orderCount($token){
        $service = new ShopService();
        $countInfo = $service->orderCount($token);

        $this->json([
            'code' => 0,
            'data' => $countInfo
        ]);
    }

    public function orderList($token, $state){
        $service = new ShopService();
        $countInfo = $service->orderList($token, $state);

        $this->json([
            'code' => 0,
            'data' => $countInfo
        ]);
    }

    public function orderDetail($token, $id){
        $service = new ShopService();
        $countInfo = $service->orderDetail($token, $id);

        $this->json([
            'code' => 0,
            'data' => $countInfo
        ]);
    }

    public function del($token, $id){
        $service = new ShopService();
        $count = $service->delOrder($token, $id);

        $this->json([
            'code' => 0,
            'data' => $count
        ]);
    }

    public function sumbit($token, $content, $price){
        $service = new ShopService();
        $count = $service->insertOrder($token, $content, $price);
        $this->json([
            'code' => 0,
            'data' => $count
        ]);
    }
}