<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2019/5/12
 * Time: 下午8:39
 */
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'models/OrderModel.php';
require APPPATH.'models/ProductionModel.php';
class OrderService
{
    public function insertOrder($token, $content, $address){
        $model = new OrderModel();
        return $model->insertOrder($token, $content, $address);
    }

    public function orderCount($token){
        $model = new OrderModel();
        $unPayCount = $model->countByState($token, 1);
        $unSendCount = $model->countByState($token, 2);
        $receiveCount = $model->countByState($token, 3);
        $commentCount = $model->countByState($token, 4);
        $serviceCount = $model->countByState($token, 5);
        $countInfo = array();
        $countInfo['unPayCount'] = $unPayCount;
        $countInfo['unSendCount'] = $unSendCount;
        $countInfo['receiveCount'] = $receiveCount;
        $countInfo['commentCount'] = $commentCount;
        $countInfo['serviceCount'] = $serviceCount;

        return $countInfo;
    }

    public function orderList($token, $state){
        $model = new OrderModel();
        $proModel = new ProductionModel();
        $orderList = $model->getOrderList($token, $state);
        $list = array();
        foreach ($orderList as $entity){
            $proIds = explode(',', $entity->content);
            $proList = array();
            foreach($proIds as $proId){
                $production = $proModel->get($proId);
                array_push($proList, $production);
            }
            $entity->proList = $proList;
            array_push($list, $entity);
        }

        return $list;
    }

    public function __construct()
    {
    }
}