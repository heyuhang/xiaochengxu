<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'business/ProductionService.php';

class Production extends CI_Controller {

    public function index() {
        $service = new ProductionService();

        $this->json([
            'code' => 0,
            'data' => $service->indexlist(0, 10)
        ]);
    }

    public function plist($lastid=0, $sort=1) {
        $service = new ProductionService();

        $proList = null;
        if($sort == 8){
            $proList = $service->sortAlllist($lastid, 10);
        }else{
            $proList = $service->sortlist($lastid, 10, $sort);
        }
        $this->json([
            'code' => 0,
            'data' => $proList
        ]);
    }

    public function detail($id=1) {
        $service = new ProductionService();
        $this->json([
            'code' => 0,
            'data' => $service->getProduction($id)
        ]);
    }

    public function plike($cont="") {
        $service = new ProductionService();
        $this->json([
            'code' => 0,
            'data' => $service->getLike($cont)
        ]);
    }
}
