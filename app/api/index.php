<?php

session_start();
require 'Slim/slim.php';

$app = new Slim();

$app->post('/login', 'login');

function login() {
  if(!empty($_POST['email']) && !empty($_POST['password'])) {
    if ($_POST['email'] == 'admin' && $_POST['password'] == 'admin') {
      $user = array("email"=>"admin", "firstName"=>"Carter", "lastname"=>"Wooten", "role"=>"user");
      $_SESSION['user'] = $user;
      echo json_encode($user);
    }
    else {
      $error = array("error"=> array("text"=>"Not a user"));
      echo jscon_encode($error);
    }
  }
  else {
    $error = array("error"=>array("text"=>"Username and password required"));
    echo json_encode($error);
  }
}

function authorize($role = "user") {
  $app = Slim::getInstance();
  if(!empty($_SESSION['user'])) {
    if($_SESSION['user']['role'] == $role || $_SESSION['user']['role'] == 'admin') {
      return true;
    }
    else {
      $app->halt(403, "Not authorized");
    }
  }
  else {
    $app->halt(401, "Not logged in");
  }
}
?>