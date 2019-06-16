<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'business/AdService.php';

class Ad extends CI_Controller {
    public function adlist() {
        $service = new AdService();

        $this->json([
            'code' => 0,
            'data' => $service->getAdList(3)
        ]);
    }
}
