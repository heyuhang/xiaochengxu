<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/10/21
 * Time: 下午9:23
 */
require APPPATH.'business/SortService.php';

class Sort extends CI_Controller
{
    public function sortList($pid=0, $count=8) {
        $service = new SortService();

        $this->json([
            'code' => 0,
            'data' => $service->getSortList($pid, $count)
        ]);
    }
}