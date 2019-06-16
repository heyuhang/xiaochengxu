<?php
/**
 * Created by PhpStorm.
 * User: yuhanghe
 * Date: 2019/6/2
 * Time: 下午2:07
 */
use Qiniu\Storage\UploadManager;
use Qiniu\Auth;

class Image extends CI_Controller
{
    public function index() {
        $upManager = new UploadManager();
        $auth = new Auth("_Kyh4xy70rTs5xvBhpe7EirqF7SPFyl8rpyGpEZO", "nX8dQ8S9InunQVU6KOrXX6tEy9qGh23KwOan7TaD");
        $token = $auth->uploadToken("tripguitarpu");

        // 处理文件上传
        $file = $_FILES['uploadfile_ant']; // 去除 field 值为 file 的文件

        ini_set('upload_max_filesize', '10M');
        ini_set('post_max_size', '10M');

        // 限制文件格式，支持图片上传
        if ($file['type'] !== 'image/jpeg' && $file['type'] !== 'image/png' && $file['type'] !== 'image/jpg') {
            $this->json([
                'code' => 1,
                'data' => '不支持的上传图片类型：' . $file['type']
            ]);
            return;
        }

        // 限制文件大小：5M 以内
        if ($file['size'] > 5 * 1024 * 1024) {
            $this->json([
                'code' => 1,
                'data' => '上传图片过大，仅支持 5M 以内的图片上传'
            ]);
            return;
        }
        $fileKey = md5(mt_rand()) . '-' . $file['name'];
        list($ret, $error) = $upManager->put($token, $fileKey, file_get_contents($file['tmp_name']));

        if($error != null){
            $this->json([
                'code' => 1,
                'data' => $ret
            ]);
        }else{
            $this->json([
                'code' => 0,
                'data' => $ret
            ]);
        }
    }
}