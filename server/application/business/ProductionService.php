<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/5/6
 * Time: 下午12:27
 */
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'models/ProductionModel.php';

class ProductionService {

    public function indexlist($lastid=0, $count=10){
        $ad = new ProductionModel();

        return $ad->indexlist($lastid, $count);
    }

    public function sortlist($lastid=0, $count=10, $sort=1){
        $ad = new ProductionModel();

        return $ad->sortlist($lastid, $count, $sort);
    }

    public function sortAlllist($lastid=0, $count=10){
        $ad = new ProductionModel();

        return $ad->sortAlllist($lastid, $count);
    }

    public function getProduction($id){
        $ad = new ProductionModel();

        return $ad->get($id);
    }

    public function getLike($cont=""){
        $ad = new ProductionModel();

        return $ad->getLike($cont);
    }
}