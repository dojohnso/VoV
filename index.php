<html>
<head>
	<title>Victory or Valhalla: A Viking's Survival</title>

	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

	<script src="https://use.fontawesome.com/f92517f67c.js"></script>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js" integrity="sha256-lSjKY0/srUM9BE3dPm+c4fBo1dky2v27Gdjm2uoZaL0=" crossorigin="anonymous"></script>

	<script src="js/vov.js?<?= filemtime('js/vov.js');?>"></script>


	<link rel="stylesheet" href="css/vov.css?<?= filemtime('css/vov.css');?>"/>
</head>
<body>

	<div id="health"><div id="bar">&nbsp;</div></div>
	<div id="field">
	  <div id="character"></div>
	  <div id="character-light"></div>
	</div>

	<div id="controls">
		<div class="up dpad 38"><i class="fa fa-arrow-circle-up"></i></div>
		<div class="down dpad 40"><i class="fa fa-arrow-circle-down"></i></div>
		<div class="left dpad 37"><i class="fa fa-arrow-circle-left"></i></div>
		<div class="right dpad 39"><i class="fa fa-arrow-circle-right"></i></div>
	</div>

</body>
</html>
