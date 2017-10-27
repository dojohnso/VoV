<html>
<head>
	<title>Victory or Valhalla: A Viking's Survival</title>

	<script src="https://use.fontawesome.com/f92517f67c.js"></script>

	<script
	  src="https://code.jquery.com/jquery-3.2.1.min.js"
	  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
	  crossorigin="anonymous"></script>
	<script src="js/jquery-ui-1.12.1/jquery-ui.min.js"></script>

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
