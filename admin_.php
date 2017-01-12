<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">

	<script src="jquery-3.1.1.min.js"></script>
	
<!--	 Latest compiled and minified CSS-->
<!--	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" -->
<!--	integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" -->
<!--	crossorigin="anonymous">-->
<!---->
<!--	-->
<!--	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" -->
<!--	integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" -->
<!--	crossorigin="anonymous">-->
<!---->
<!--	-->
<!--	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" -->
<!--	integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" -->
<!--	crossorigin="anonymous"></script>-->
<!---->

    <link rel="stylesheet" href="bootstrap.min.css">
    <link rel="stylesheet" href="myStyle.css">
<!--    <script type="text/javascript" src="myFlow.json"></script>-->
    <script src="bootstrap.min.js"></script>
    <script src="tajul.js"></script>


</head>
<body >

<svg id="cvs" width="100%" height="700"  viewBox="0 0 1290 860" preserveAspectRatio="xMidYMin meet">
	<defs>
		<marker id="arrow" markerWidth="10" markerHeight="10" refx="8" refy="3" orient="auto" markerUnits="strokeWidth">
		  <path d="M0,0 L0,6 L9,3 z" fill="#000" />
		</marker>
	</defs>
	<line x1="1" y1="1" x2="1280" y2="1" style="stroke:DarkGray;stroke-width:2" />
	
	<line x1="1"     y1="1" 	x2="1" 		y2="850" style="stroke:DarkGray;stroke-width:2" />
	<line x1="250"   y1="1" 	x2="250" 	y2="850" style="stroke:DarkGray;stroke-width:2" />
	<line x1="680" 	 y1="1" 	x2="680" 	y2="850" style="stroke:DarkGray;stroke-width:2" />
	<line x1="880" 	 y1="1" 	x2="880" 	y2="850" style="stroke:DarkGray;stroke-width:2" />
	<line x1="1080"  y1="1" 	x2="1080" 	y2="850" style="stroke:DarkGray;stroke-width:2" />
	<line x1="1280"  y1="1" 	x2="1280" 	y2="850" style="stroke:DarkGray;stroke-width:2" />
	<line x1="1" 	 y1="850"   x2="1280" 	y2="850" style="stroke:DarkGray;stroke-width:2" />
	
	<rect id="origin" x="0" y="0" width="250" height="40" fill="SlateGray" stroke="DarkSlateGray" />
	<text class="noselect" x="125" y="20" font-family="Verdana" font-size="1em" text-anchor="middle" fill="white"> Experimental Design </text>
	
	<rect x="250" y="0" width="430" height="40" fill="SlateGray" stroke="DarkSlateGray" />
	<text class="noselect" x="465" y="20" font-family="Verdana" font-size="1em" text-anchor="middle" fill="white"> Instrument </text>
	
	<rect x="680" y="0" width="200" height="40" fill="SlateGray" stroke="DarkSlateGray" />
	<text class="noselect" x="780" y="20" font-family="Verdana" font-size="1em" text-anchor="middle" fill="white"> Output Data </text>
	
	<rect x="880" y="0" width="200" height="40" fill="SlateGray" stroke="DarkSlateGray" />
	<text class="noselect" x="980" y="20" font-family="Verdana" font-size="1em" text-anchor="middle" fill="white"> Data Analysis </text>
	
	<rect x="1080" y="0" width="200" height="40" fill="SlateGray" stroke="DarkSlateGray" />
	<text class="noselect" x="1180" y="20" font-family="Verdana" font-size="1em" text-anchor="middle" fill="white"> Final Data </text>

</svg>

<input type="button" id="save-processes" value="Save"/>
</body>
</html>