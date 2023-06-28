<?php
require __DIR__ . '/inc/OpenID.php';

// Замените эту ссылку на актуальный адрес вашего скрипта steam_auth.php
define('STEAM_REDIRECT', 'https://example.com/steam_auth.php');

try {
    $openid = new LightOpenID(STEAM_REDIRECT);
    if (!$openid->mode) {
        $openid->identity = 'http://steamcommunity.com/openid/?l=russian';
        header('Location: '.$openid->authUrl());
    } elseif ($openid->mode == 'cancel') {
        header('Location: /');
    } elseif ($openid->validate()) {
        $id = $openid->identity;
        $sid64 = intval(preg_replace('/[^0-9]/', '', $id));
        
        // Авторизация прошла успешно, сохраняем SteamID64 в сессии или базе данных
        session_start();
        $_SESSION['steamid'] = $sid64;
        
        header('Location: /'); // Редирект на главную страницу
    } else {
        header('Location: /');
    }
} catch (ErrorException $e) {
    header('Location: /');
}
