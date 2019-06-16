<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2018/5/6
 * Time: 下午12:27
 */
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'models/CommentModel.php';

class CommentService
{

    public function getListByProductId($productionid, $lastid = 0, $count = 1)
    {
        $comment = new CommentModel();

        return $comment->getByUid($productionid, $lastid, $count);
    }

    public function getHotListByProductId($productionid, $count = 1)
    {
        $comment = new CommentModel();
        $commentList = $comment->getByHot($productionid, $count);

        return $commentList;
    }

    public function getCountByTid($productionid)
    {
        $comment = new CommentModel();

        return $comment->countByTid($productionid);
    }

    public function getTagListByProductId($productionid, $count = 1)
    {
        $comment = new CommentModel();

        return $comment->getHotTag($productionid, $count);
    }

    public function addComment($content, $token, $pics, $proId, $size, $orderId)
    {
        $comment = new CommentModel();

        $info = array();
        $info['content'] = $content;
        $info['token'] = $token;
        $user = $comment->getUserById($token);
        $info['productionid'] = $proId;
        $info['pics'] = $pics;
        $info['tag'] = "";
        $info['rep_cont'] = $user->nickName;
        $info['pro_size'] = $size;
        $info['approve_num'] = 0;
        $info['state'] = 1;
        $count = $comment->addOne($info);
        if($count > 0){
            $comment->updateOrderState($orderId, 5);
        }
        return $count;

    }
}