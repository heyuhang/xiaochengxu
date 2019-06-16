<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/11/12
 * Time: 下午10:35
 */
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . 'models/ShopModel.php';

class ShopService
{

    public function getByUid($token)
    {
        $model = new ShopModel();

        return $model->getListByUid($token);
    }

    public function count($token)
    {
        $model = new ShopModel();
        $list = $model->getListByUid($token);
        return count($list);
    }

    public function delByUid($token, $productId)
    {
        $model = new ShopModel();

        return $model->delByUid($token, $productId);
    }

    public function insertShop($productId, $token, $size, $num)
    {
        $model = new ShopModel();
        $shop = array();
        $shop['product_id'] = $productId;
        $shop['num'] = $num;
        $shop['id'] = base_convert(uniqid(), 16, 10);;
        $shop['token'] = $token;
        if($model->insertShop($shop, $size, $productId) > 0){
            return $shop['id'];
        }
        return 0;
    }

    public function insertOrder($token, $content, $price)
    {
        $model = new ShopModel();
        $user = $model->getUserById($token);
        $shopIds = explode("-", $content);
        $shopCont = "";
        foreach ($shopIds as $shopId) {
            $model->updateShopState($shopId);
            $shopCont .= $shopId . ",";
        }
        $order = array();
        $order['token'] = $token;
        $order['content'] = substr($shopCont, 0, strlen($shopCont) - 1);
        $order['address'] = $user->address;
        $order['price'] = $price;
        $order['state'] = 1;
        $count = $model->insertOrder($order);
        return $count;
    }

    public function updateNum($id, $num)
    {
        $model = new ShopModel();
        $shopArr = array();
        $shopArr['num'] = $num;
        return $model->updateShop($shopArr, $id);
    }

    public function getAddress($token)
    {
        $model = new ShopModel();
        $user = $model->getUserById($token);
        $shopArr = array();
        if ($user->address && $user->address != '') {
            $address = json_decode($user->address);
            $local = explode(",", $address->locals);
            $shopArr['name'] = $address->name;
            $shopArr['local'] = $local;
            $shopArr['phone'] = $address->mobile;
            $shopArr['address'] = $address->detail;
        } else {
            $shopArr['name'] = "";
            $shopArr['local'] = array(26, 0, 11);
            $shopArr['phone'] = "";
            $shopArr['address'] = "";
        }
        // 内蒙古，呼和浩特，新城区
        return $shopArr;
    }

    public function updateAddress($token, $name, $mobile, $local, $detail)
    {
        $model = new ShopModel();
        $local = str_replace("，", "-", $local);
        $addressArr = array();
        $addressArr['local'] = $local;
        $addressArr['name'] = $name;
        $addressArr['mobile'] = $mobile;
        $addressArr['detail'] = $detail;
        $address = array();
        $address['address'] = json_encode($addressArr);
        return $model->updateAddress($token, $address);
    }

    public function getShopDetail($token)
    {
        $model = new ShopModel();
        $shopList = $model->getListByUid($token);
        $user = $model->getUserById($token);
        $shopArr = array();
        $detail = array();
        $totlePrice = 0;
        foreach ($shopList as $itemShop) {
            $productObj = array();
            $product = $model->getProduct($itemShop->product_id);
            $productObj['shopId'] = $itemShop->id;
            $productObj['id'] = $itemShop->product_id;
            $productObj['title'] = $product->title;
            $productObj['count'] = $itemShop->num;
            $totlePrice += $itemShop->num * $product->price;
            array_push($detail, $productObj);
        }
        $shopArr['detail'] = $detail;
        $shopArr['totlePrice'] = $totlePrice;
        $shopArr['token'] = $token;
        $address = json_decode($user->address);
        $shopArr['name'] = $address->name;
        $shopArr['local'] = $address->local;
        $shopArr['phone'] = $address->mobile;
        $shopArr['address'] = $address->detail;
        return $shopArr;
    }

    public function getShopDetailById($token, $shopId)
    {
        $model = new ShopModel();
        $itemShop = $model->getById($shopId);
        $user = $model->getUserById($token);
        $shopArr = array();
        $detail = array();
        $totlePrice = 0;

        $productObj = array();
        $product = $model->getProduct($itemShop->product_id);
        $productObj['shopId'] = $itemShop->id;
        $productObj['id'] = $itemShop->product_id;
        $productObj['title'] = $product->title;
        $productObj['count'] = $itemShop->num;
        $totlePrice += $itemShop->num * $product->price;
        array_push($detail, $productObj);

        $shopArr['detail'] = $detail;
        $shopArr['totlePrice'] = $totlePrice;
        $shopArr['token'] = $token;
        $address = json_decode($user->address);
        $shopArr['name'] = $address->name;
        $shopArr['local'] = $address->local;
        $shopArr['phone'] = $address->mobile;
        $shopArr['address'] = $address->detail;
        return $shopArr;
    }

    public function orderCount($token)
    {
        $model = new ShopModel();
        $unPayCount = $model->countByState($token, 1);
        $unSendCount = $model->countByState($token, 2);
        $receiveCount = $model->countByState($token, 3);
        $commentCount = $model->countByState($token, 4);
        $serviceCount = $model->countByState($token, 5);
        $countInfo = array();
        $countInfo['unPayCount'] = $unPayCount[0]->num;
        $countInfo['unSendCount'] = $unSendCount[0]->num;
        $countInfo['receiveCount'] = $receiveCount[0]->num;
        $countInfo['commentCount'] = $commentCount[0]->num;
        $countInfo['serviceCount'] = $serviceCount[0]->num;

        return $countInfo;
    }

    public function orderList($token, $state)
    {
        $model = new ShopModel();
        $orderList = $model->getOrderList($token, $state);
        $list = array();
        foreach ($orderList as $entity) {
            if ($entity->address && $entity->address != '') {
                $address = json_decode($entity->address);
                //$local = explode(",", $address->locals);
                $entity->address = str_replace("-", "", $address->detail);
            } else {
                $entity->address = "";
            }
            $proIds = explode(',', $entity->content);
            $proList = array();
            foreach ($proIds as $proId) {
                $shop = $model->getById($proId);
                $production = $model->getProduct($shop->product_id);
                $production->size = $shop->size;
                $production->num = $shop->num;
                array_push($proList, $production);
            }
            $entity->proList = $proList;
            array_push($list, $entity);
        }

        return $list;
    }

    public function delOrder($token, $id)
    {
        $model = new ShopModel();
        $count = $model->delOrder($token, $id);
        return $count;
    }

    public function orderDetail($token, $id)
    {
        $model = new ShopModel();
        $entity = $model->getOrderDetail($token, $id);
        if ($entity->address && $entity->address != '') {
            $address = json_decode($entity->address);
            //$local = explode(",", $address->locals);
            $entity->address = str_replace("-", "", $address->detail);
        } else {
            $entity->address = "";
        }
        $proIds = explode(',', $entity->content);
        $proList = array();
        foreach ($proIds as $proId) {
            $shop = $model->getById($proId);
            $production = $model->getProduct($shop->product_id);
            $production->size = $shop->size;
            $production->num = $shop->num;
            array_push($proList, $production);
        }
        $entity->proList = $proList;

        return $entity;
    }
}