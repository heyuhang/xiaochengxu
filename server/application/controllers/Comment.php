<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/10/27
 * Time: 下午10:16
 */
require APPPATH.'business/CommentService.php';

class Comment extends CI_Controller {

    public function plist($productId, $lastid=0, $count=1) {
        $service = new CommentService();

        $this->json([
            'code' => 0,
            'data' => $service->getListByProductId($productId, $lastid, $count)
        ]);
    }

    public function top($productId, $count=1) {
        $service = new CommentService();
        $commentList = $service->getHotListByProductId($productId, $count);

        $this->json([
            'code' => 0,
            'data' => $commentList,
            'count' => $service->getCountByTid($productId)
        ]);
    }

    public function count($productId) {
        $service = new CommentService();

        $this->json([
            'code' => 0,
            'data' => $service->getCountByTid($productId)
        ]);
    }

    public function tag($productId, $count=1) {
        $service = new CommentService();

        $this->json([
            'code' => 0,
            'data' => $service->getTagListByProductId($productId, $count)
        ]);
    }

    public function add(){
        $token = $_POST['token'];
        $content = $_POST['content'];
        $pics = $_POST['pics'];
        $proId = $_POST['proId'];
        $size = $_POST['size'];
        $orderId = $_POST['orderId'];
        $service = new CommentService();

        $this->json([
            'code' => 0,
            'data' => $service->addComment($content, $token, $pics, $proId, $size, $orderId)
        ]);
    }

}