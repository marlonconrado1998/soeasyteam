<?php

	require '../repositories/repository_easyTeam.php';
	
	$Template = new Repository_easyTeam();

	$email = $_GET['email'];

	$sql = $Template->CambiarEstadoUser($email);

	header('Location: http://127.0.0.1/soEasyTeam/#!/Inicio');

	exit();
?>