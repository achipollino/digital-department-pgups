<?php
use PHPMailer\PHPMailer\PHPMailer;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

$name = $_POST['name'];
$university = $_POST['university'];
$direction = $_POST['direction'];
$program = $_POST['program'];
$phone = $_POST['phone'];
$email = $_POST['email'];

$mail = new PHPMailer();
$mail->SMTPDebug = 0;  // Режим отладки

$mail->isSMTP();   // Включаем мейлер в режим SMTP
$mail->SMTPAuth = true; // Включаем SMTP аутентификацию
$mail->CharSet = 'utf-8';

// Настройки вашей почты (взять у провайдера)
$mail->Host = 'my.pgups.ru';  // SMTP сервер
$mail->Username = 'info@my.pgups.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'Ffdw43^5Ma8?4z5t'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = null;  // Протокол шифрования SSL или TLS
$mail->SMTPAutoTLS = false;
$mail->Port = 25; // TCP порт для подключения

// Получатель письма
$mail->setFrom('info@my.pgups.ru'); // От кого будет уходить письмо?
$mail->addAddress('digital@pgups.ru'); // Кому будет уходить письмо
$mail->Subject = 'Заявка на обучение в проекте "Цифровая кафедра"';                         // тема письма

$body = "<b>ФИО: </b>" . $name . "<br>";
$body .= "<b>ВУЗ: </b>" .  $university . "<br>";
$body .= "<b>Текущее направление обучения: </b>" . $direction . "<br>";
$body .= "<b>Выбранная программа: </b>" . $program . "<br>";
$body .= "<b>Телефон: </b>" . $phone . "<br>";
$body .= "<b>Email: </b>" . $email . "<br>";

$mail->isHTML(true);  // Задаём формат письма (HTML)

$mail->Body = $body;
// Отправляем
if ($mail->send()) {
    echo 'Письмо отправлено!';
} else {
    echo 'Ошибка: ' . $mail->ErrorInfo;
}