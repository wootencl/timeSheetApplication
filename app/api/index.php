<?php

require_once __DIR__.'/vendor/autoload.php';

$app = new Silex\Application();

//Boolean for debugging
$app['debug'] = true;

//Establishing connection to DB
$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver' => 'pdo_mysql',
        'dbhost' => 'localhost',
        'dbname' => 'timeSheetApplication',
        'user' => 'root',
        'password' => 'root',
    ),
));
$app->register(new Silex\Provider\SessionServiceProvider());

$app['security.encoder.digest'] = $app->share(function ($app) {
    return new MessageDigestPasswordEncoder('sha1', false, 1);
});

$var = $app['security.encoder.digest']->encodePassword('password', '');
$var1 = 3;
//$app->post('/login', 'login');
//
//function login() {
//    $email = $_POST['email'];
//    $password = $_POST['password'];
//    echo $email . $password;
//}

$app->run();

?>