<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/html">
<head>
<title>workflow</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="css/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css" />
    <meta charset="utf-8">

    <script src="jquery-3.1.1.min.js"></script>

    <link rel="stylesheet" href="bootstrap.min.css">
    <link rel="stylesheet" href="myStyle.css">
    <!--    <script type="text/javascript" src="myFlow.json"></script>-->
    <script src="bootstrap.min.js"></script>
    <script src="tajul.js"></script>
</head>
<body>
<div class="main">
  <div class="header">
    <div class="header_resize">
      <div class="menu_nav">
        <ul>
        </ul>
      </div>
      <div class="logo">
        <h1><a href="#">Work<span>Flow</span> <small>Engine</small></a></h1>
      </div>
    </div>
  </div>

  <div class="content">
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

      <div class="row" style="margin:0 auto;margin-left: 400px;">
          <div class="col-md-4">
              <button style="width:50%" name="additem" id="additem" class="form-control btn btn-success" data-toggle="modal" data-target="#myModal">Add Item</button>
              <!-- Modal -->
              <div id="myModal" class="modal fade" role="dialog">
                  <div class="modal-dialog">

                      <!-- Modal content-->
                      <div class="modal-content">
                          <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal">&times;</button>
                              <h4 class="modal-title">Adding WorkFlow Element</h4>
                          </div>
                          <div class="modal-body">
                              <div class="form-group">
                                  <label for="process-name" class="form-control">Name</label>
                                  <input type="text" id="process-name" class="form-control"/>
                              </div>
                              <div class="form-group">
                                  <label for="process-category" class="form-control">Category</label>
                                  <select id="process-category" class="form-control">
                                      <option value="1">Experimental Design</option>
                                      <option value="2">Instrument</option>
                                      <option value="3">Output Data</option>
                                      <option value="4">Data Analysis</option>
                                      <option value="5">Final Data</option>
                                  </select>
                              </div>
                              <div class="form-group">
                                  <label for="process-status" class="form-control">Status</label>
                                  <select id="process-status" class="form-control">
                                      <option value="on_deck">Pending</option>
                                      <option value="in_progress">In Progress</option>
                                      <option value="done">Done</option>
                                      <option value="on_deck">No Input</option>
                                      <option value="on_deck">Error</option>
                                  </select>
                              </div>
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                              <button type="button" id="add-process-confirm" class="btn btn-default">Confirm</button>
                          </div>
                      </div>

                  </div>
              </div>
          </div>

          <div class="col-md-4">
              <input style="width:50%" class="form-control btn btn-success" type="button" id="save-processes" value="Save"/>
          </div>
      </div>
  </div>

  <div class="footer">
    <div class="footer_resize">
      <p class="lf">Copyright &copy; <a href="#">Domain Name</a>. All Rights Reserved</p>
      <p class="rf">Design by <a target="_blank" href="http://www.dreamtemplate.com/">DreamTemplate</a></p>
      <div style="clear:both;"></div>
    </div>
  </div>
</div>
</body>
<!-- Modal -->
<!-- Modal -->
<div id="settingmodal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Modal Header</h4>
            </div>
            <div class="modal-body">
                <p>Some text in the modal.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>
</html>
