var selectedElement = null;
var selectedConnector = null;
var selectChildEditor = null;
var selectParentEditor = null;
var startDragArrow = false;
var arrowEdit = null;
var origin = 0;
var prevElement = null;
var currentX = 0;
var currentY = 0;
var jsonData;
var svgns = "http://www.w3.org/2000/svg";
var experimentBorder  = 250;
var instrumentBorder  = 680;
var outputDataBorder = 880;
var dataAnalysisBorder = 1080;
var rectGroupContextMenu;
var rectContextMenu;
var settingContextMenu;
var max_id;
function createContextMenu()
{
	rectGroupContextMenu = document.createElementNS(svgns, 'g');
	rectGroupContextMenu.setAttributeNS(null, 'id', 'groupContextMenu');
	document.getElementById('cvs').appendChild(rectGroupContextMenu);
	
	rectContextMenu = document.createElementNS(svgns, 'rect');
	rectContextMenu.setAttributeNS(null, 'x', '100');
	rectContextMenu.setAttributeNS(null, 'y', '0');
	rectContextMenu.setAttributeNS(null, 'id', 'connector');
	rectContextMenu.setAttributeNS(null, 'height', '20');
	rectContextMenu.setAttributeNS(null, 'width', '10');
	rectContextMenu.setAttributeNS(null, 'isdraggable', 'false');
	rectContextMenu.setAttributeNS(null, 'fill', 'DimGray');
	rectContextMenu.setAttributeNS(null, 'stroke', 'WhiteSmoke');
	rectContextMenu.setAttributeNS(null, 'onmouseover', 'evt.target.setAttributeNS(null,\'display\',\'block\')');
	rectContextMenu.setAttributeNS(null, 'onmouseout', 'disableContextMenu()');

    settingContextMenu = document.createElementNS(svgns, 'circle');
    settingContextMenu.setAttributeNS(null, 'cx', '100');
    settingContextMenu.setAttributeNS(null, 'cy', '0');
    settingContextMenu.setAttributeNS(null, 'id', 'setting');
    settingContextMenu.setAttributeNS(null, 'r', '10');
    settingContextMenu.setAttributeNS(null, 'fill', 'blue');
    settingContextMenu.setAttributeNS(null, 'stroke', 'WhiteSmoke');
    settingContextMenu.setAttributeNS(null, 'onmouseover', 'evt.target.setAttributeNS(null,\'display\',\'block\')');
    settingContextMenu.setAttributeNS(null, 'onmouseout', 'disableContextMenu()');
    settingContextMenu.addEventListener("click",popupSetting);

    document.getElementById('groupContextMenu').appendChild(rectContextMenu);
    document.getElementById('groupContextMenu').appendChild(settingContextMenu);

	rectContextMenu.setAttributeNS(null,'display','none');
	
	arrowEdit = document.createElementNS(svgns, 'polyline');
	arrowEdit.setAttributeNS(null, 'style', "fill:none;stroke:black;stroke-width:2");
	arrowEdit.setAttributeNS(null, 'id', 'arrowEdit');
	document.getElementById('groupContextMenu').appendChild(arrowEdit);
	arrowEdit.setAttributeNS(null,'display','none');
}
function displayContextMenu(clickedID) {
	//alert("You right-clicked inside the div!  " + clickedID);
	//right click menu
	rectContextMenu.setAttributeNS(null,'display','block');
	rectContextMenu.setAttributeNS(null, 'id','connector-'+clickedID);
	rectContextMenu.setAttributeNS(null, 'x', parseInt(document.getElementById(clickedID).getAttribute("x"))+150);
	rectContextMenu.setAttributeNS(null, 'y', parseInt(document.getElementById(clickedID).getAttribute("y"))+25-10);
	
	arrowEdit.setAttributeNS(null,'display','block');

    settingContextMenu.setAttributeNS(null,'display','block');
    settingContextMenu.setAttributeNS(null, 'id','setting-'+clickedID);
    settingContextMenu.setAttributeNS(null, 'cx', parseInt(document.getElementById(clickedID).getAttribute("x"))+160);
    settingContextMenu.setAttributeNS(null, 'cy', parseInt(document.getElementById(clickedID).getAttribute("y"))+25-20);

	document.getElementById('cvs').appendChild(rectGroupContextMenu);
}
function disableContextMenu()
{
	rectContextMenu.setAttributeNS(null,'display','none');
	settingContextMenu.setAttributeNS(null,'display','none');
}
function rectMouseHover(clickedID)
{
	if(startDragArrow)
	{
		selectChildEditor = document.getElementById(clickedID);
		selectChildEditor.setAttribute("stroke","blue");
	}
	else
	{
		displayContextMenu(clickedID);
	}

}

function rectMouseOut(rectID)
{
	if(startDragArrow)
	{
		selectChildEditor.setAttribute("stroke","DarkGray");
		selectChildEditor = null;
	}
	else
	{
		disableContextMenu();
	}
		
}




function createFlow() {
    $.ajax({
		url: "myFlow.json",
		//url: "../../wfdesigner/myFlow.json",
		//force to handle it as text
		dataType: "text",
		success: function(data) {
			
			//data = JSON.stringify(data);
			jsonData = JSON.parse(data);
			//$('#results').html('Plugin name: ' + json.name + '<br />Author: ' + json.author.name);
			
			for(var i = 0; i<jsonData.process.length; i++)
			{
				var rectGroup = document.createElementNS(svgns, 'g');
				rectGroup.setAttributeNS(null, 'id', 'rectGroup'+jsonData.process[i].id);
				document.getElementById('cvs').appendChild(rectGroup);
				
				var rect = document.createElementNS(svgns, 'rect');
				rect.setAttributeNS(null, 'x', jsonData.process[i].posx);
				rect.setAttributeNS(null, 'y', jsonData.process[i].posy);
				rect.setAttributeNS(null, 'id', jsonData.process[i].id);
				rect.setAttributeNS(null, 'height', '50');
				rect.setAttributeNS(null, 'width', '150');
				rect.setAttributeNS(null, 'isdraggable', 'true');
				rect.setAttributeNS(null, 'fill', 'Lavender');
				rect.setAttributeNS(null, 'stroke', 'DarkGray');
				rect.setAttributeNS(null, 'pool', jsonData.process[i].pool);
				rect.setAttributeNS(null, 'onmouseover', 'rectMouseHover('+jsonData.process[i].id+')');
				rect.setAttributeNS(null, 'onmouseout', 'rectMouseOut('+jsonData.process[i].id+')');
				document.getElementById('rectGroup'+jsonData.process[i].id).appendChild(rect);
				
				var rectStatus = document.createElementNS(svgns, 'circle');
				rectStatus.setAttributeNS(null, 'cx', parseInt(jsonData.process[i].posx) - 10);
				rectStatus.setAttributeNS(null, 'cy', parseInt(jsonData.process[i].posy) + 10);
				rectStatus.setAttributeNS(null, 'r', '7');
				rectStatus.setAttributeNS(null, 'id', 'rectCircle'+jsonData.process[i].id);
				rectStatus.setAttributeNS(null, 'stroke', 'black');
				rectStatus.setAttributeNS(null, 'stroke-width', '0.5');
				if(jsonData.process[i].processStatus == 'on_deck')
					rectStatus.setAttributeNS(null, 'fill', 'red');
				if(jsonData.process[i].processStatus == 'in_progress')
					rectStatus.setAttributeNS(null, 'fill', 'orange');
				if(jsonData.process[i].processStatus == 'done')
					rectStatus.setAttributeNS(null, 'fill', 'green');
				document.getElementById('rectGroup'+jsonData.process[i].id).appendChild(rectStatus);
				
				var rectText = document.createElementNS(svgns, 'text');
				rectText.setAttributeNS(null, 'x', parseInt(jsonData.process[i].posx)+75);
				rectText.setAttributeNS(null, 'y', parseInt(jsonData.process[i].posy)+25);
				rectText.setAttributeNS(null, 'font-family', 'Verdana');
				rectText.setAttributeNS(null, 'font-size', '.95em');
				rectText.setAttributeNS(null, 'fill', 'black');
				rectText.setAttributeNS(null, 'text-anchor', 'middle');
				rectText.setAttributeNS(null, 'id', 'rectText'+jsonData.process[i].id);
				rectText.setAttributeNS(null, 'class', 'noselect');
				rectText.setAttributeNS(null, 'pointer-events', 'none');
				var textNode = document.createTextNode(jsonData.process[i].processName);
				//var textNode = document.createTextNode(jsonData.process[i].processName+"-"+jsonData.process[i].id);
				rectText.appendChild(textNode);
				document.getElementById('rectGroup'+jsonData.process[i].id).appendChild(rectText);
                max_id = i;
				//$("#rectText"+jsonData.process[i].id).text("new-value");
				
			}
			
			for(var i = 0; i<jsonData.process.length; i++)
			{
				if(jsonData.process[i].childID != "none" )
				{
					for(var j=0; j<jsonData.process[i].childID.length; j++)
					{
						var polyline = document.createElementNS(svgns, 'polyline');
						var childID = jsonData.process[i].childID[j];
						polyline.setAttributeNS(null, 'style', "fill:none;stroke:black;stroke-width:2");
						polyline.setAttributeNS(null, 'id', jsonData.process[i].id+"-"+childID);
						//console.log(jsonData.process[i].id+"-"+childID);
						document.getElementById('cvs').appendChild(polyline);
					}
				}
				
			}
			
			for(var i = 0; i<jsonData.process.length; i++)
			{
				manageArrows(document.getElementById(jsonData.process[i].id));
			}
		}
	});
	
};

function manageArrows(itemSelected)
{	
	if(jsonData.process[itemSelected.id].childID != "none")
	{
		for(var i=0; i<jsonData.process[itemSelected.id].childID.length; i++)
		{
			var childID = jsonData.process[itemSelected.id].childID[i];
			var myPolylineChild = document.getElementById(itemSelected.id+"-"+childID);
			var myChild = document.getElementById(childID);
			
			if(jsonData.process[childID].type == "sideway")
			{
				var topConnectX = parseInt(itemSelected.getAttribute("x")) + parseInt(jsonData.process[itemSelected.id].rightConnectX);
				var topConnectY = parseInt(itemSelected.getAttribute("y")) + parseInt(jsonData.process[itemSelected.id].rightConnectY);
				
				var myConnectX = parseInt(myChild.getAttribute("x")) + parseInt(jsonData.process[childID].leftConnectX);
				var myConnectY = parseInt(myChild.getAttribute("y")) + parseInt(jsonData.process[childID].leftConnectY);
				
				var Bx = Math.abs(topConnectX + myConnectX)/2;
				var By = topConnectY;
				var Ax = Math.abs(topConnectX + myConnectX)/2;
				var Ay = myConnectY;
				myPolylineChild.setAttribute('points',topConnectX+','+topConnectY+' '+Bx+','+By+' '+Ax+','+Ay+' '+myConnectX+','+myConnectY);
			
			}
			else
			{
				var topConnectX = parseInt(itemSelected.getAttribute("x")) + parseInt(jsonData.process[itemSelected.id].bottomConnectX);
				var topConnectY = parseInt(itemSelected.getAttribute("y")) + parseInt(jsonData.process[itemSelected.id].bottomConnectY);
				var myConnectX = parseInt(myChild.getAttribute("x")) + parseInt(jsonData.process[childID].topConnectX);
				var myConnectY = parseInt(myChild.getAttribute("y")) + parseInt(jsonData.process[childID].topConnectY);
				
				if(myConnectY >= topConnectY)
				{
					var Ax = topConnectX;
					var Ay = Math.abs(topConnectY + myConnectY)/2;
					var By = Math.abs(topConnectY + myConnectY)/2;
					var Bx = myConnectX;
					myPolylineChild.setAttribute('points',topConnectX+','+topConnectY+' '+Ax+','+Ay+' '+Bx+','+By+' '+myConnectX+','+myConnectY);
				}
				else
				{
					var Ax = topConnectX;
					var Ay = topConnectY + 25;
					var Bx = (myConnectX+topConnectX)/2;
					var By = topConnectY + 25;
					var Cx = (myConnectX+topConnectX)/2;
					var Cy = myConnectY - 25;
					var Dx = myConnectX;
					var Dy = myConnectY - 25;
					myPolylineChild.setAttribute('points',topConnectX+','+topConnectY+' '+Ax+','+Ay+' '+Bx+','+By+' '+Cx+','+Cy+' '+Dx+','+Dy+' '+myConnectX+','+myConnectY);
				}
			}
			myPolylineChild.setAttribute('marker-end', "url(#arrow)");
		}
	}
	if(jsonData.process[itemSelected.id].parentID != "none")
	{
		for(var i=0; i<jsonData.process[itemSelected.id].parentID.length; i++)
		{
			var parentID = jsonData.process[itemSelected.id].parentID[i];
			var myParent = document.getElementById(parentID);
			var myPolyline = document.getElementById(parentID+"-"+itemSelected.id);
			
			if(jsonData.process[itemSelected.id].type == "sideway")
			{
				var topConnectX = parseInt(myParent.getAttribute("x")) + parseInt(jsonData.process[parentID].rightConnectX);
				var topConnectY = parseInt(myParent.getAttribute("y")) + parseInt(jsonData.process[parentID].rightConnectY);
				
				var myConnectX = parseInt(itemSelected.getAttribute("x")) + parseInt(jsonData.process[itemSelected.id].leftConnectX);
				var myConnectY = parseInt(itemSelected.getAttribute("y")) + parseInt(jsonData.process[itemSelected.id].leftConnectY);
				
				var Bx = Math.abs(topConnectX + myConnectX)/2;
				var By = topConnectY;
				var Ax = Math.abs(topConnectX + myConnectX)/2;
				var Ay = myConnectY;
				myPolyline.setAttribute('points',topConnectX+','+topConnectY+' '+Bx+','+By+' '+Ax+','+Ay+' '+myConnectX+','+myConnectY);
			
			}
			else
			{
				var topConnectX = parseInt(myParent.getAttribute("x")) + parseInt(jsonData.process[parentID].bottomConnectX);
				var topConnectY = parseInt(myParent.getAttribute("y")) + parseInt(jsonData.process[parentID].bottomConnectY);
				
				var myConnectX = parseInt(itemSelected.getAttribute("x")) + parseInt(jsonData.process[itemSelected.id].topConnectX);
				var myConnectY = parseInt(itemSelected.getAttribute("y")) + parseInt(jsonData.process[itemSelected.id].topConnectY);
				
				if(myConnectY >= topConnectY)
				{
					var Bx = topConnectX;
					var By = Math.abs(topConnectY + myConnectY)/2;
					var Ax = myConnectX;
					var Ay = Math.abs(topConnectY + myConnectY)/2;
					myPolyline.setAttribute('points',topConnectX+','+topConnectY+' '+Bx+','+By+' '+Ax+','+Ay+' '+myConnectX+','+myConnectY);
				}
				else
				{
					var Ax = topConnectX;
					var Ay = topConnectY + 25;
					var Bx = (topConnectX+myConnectX)/2;
					var By = topConnectY + 25;
					var Cx = (topConnectX+myConnectX)/2;
					var Cy = myConnectY - 25;
					var Dx = myConnectX;
					var Dy = myConnectY - 25;
					myPolyline.setAttribute('points',topConnectX+','+topConnectY+' '+Ax+','+Ay+' '+Bx+','+By+' '+Cx+','+Cy+' '+Dx+','+Dy+' '+myConnectX+','+myConnectY);
				}
			}
			myPolyline.setAttribute('marker-end', "url(#arrow)");
		}
	}
    document.getElementById('rectText'+itemSelected.id).setAttribute("x", parseInt(itemSelected.getAttribute("x"))+75);
    document.getElementById('rectText'+itemSelected.id).setAttribute("y", parseInt(itemSelected.getAttribute("y"))+25);
    document.getElementById('rectCircle'+itemSelected.id).setAttribute("cx", parseInt(itemSelected.getAttribute("x"))-10);
    document.getElementById('rectCircle'+itemSelected.id).setAttribute("cy", parseInt(itemSelected.getAttribute("y"))+10);

}

function saveProcess(){
    var elements = $("g[id*='rectGroup']"), elementArray = [],id,pool,type,processName,processStatus,parentID,childID,width,height,topConnectX,topConnectY,bottomConnectX,bottomConnectY,
        leftConnectX,leftConnectY,rightConnectX,rightConnectY,posX,posY;

    elements.each(function(index, element){
        id = $(element).find("rect").attr("id");
        pool = 0; // TODO

        elementArray[index] = {
            id: id,
            pool: pool
        };
        //"id": "2",
        //    "pool": "0",
        //    "type": "descending",
        //    "processName": "Library Prep",
        //    "processStatus": "on_deck",
        //    "parentID": ["1"],
        //    "childID": ["3","10"],
        //    "width": "150",
        //    "height": "50",
        //    "topConnectX": "75",
        //    "topConnectY": "0",
        //    "bottomConnectX":"75",
        //    "bottomConnectY": "50",
        //    "leftConnectX": "none",
        //    "leftConnectY": "none",
        //    "rightConnectX": "150",
        //    "rightConnectY": "25",
        //    "posx": "50",
        //    "posy": "350"

    });

    $.ajax({
        url: "save.php",
        type: "POST",
        data:{
            data: JSON.stringify(elementArray)
        },
        success: function(data){
            alert(data);
        }
    });
}

function addProcess(){

    var elements = $("g[id*='rectGroup']"), id=max_id+1,pool,type,parentID,childID,width,height,topConnectX,topConnectY,bottomConnectX,bottomConnectY,
        leftConnectX,leftConnectY,rightConnectX,rightConnectY,posX,posY=70;

    var processName = $("#process-name").val();
    var processStatus = $("#process-status").val();
    var process_category = $("#process-category").val();
    switch (process_category){
        case "1":
            posX = 50;
            break;
        case "2":
            posX = 300;
            break;
        case "3":
            posX = 700;
            break;
        case "4":
            posX = 900;
            break;
        case "5":
            posX = 1100;
            break;
    }
    var rectGroup = document.createElementNS(svgns, 'g');
    rectGroup.setAttributeNS(null, 'id', 'rectGroup'+id);
    document.getElementById('cvs').appendChild(rectGroup);

    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', posX);
    rect.setAttributeNS(null, 'y', posY);
    rect.setAttributeNS(null, 'id', id);
    rect.setAttributeNS(null, 'height', '50');
    rect.setAttributeNS(null, 'width', '150');
    rect.setAttributeNS(null, 'isdraggable', 'true');
    rect.setAttributeNS(null, 'fill', 'Lavender');
    rect.setAttributeNS(null, 'stroke', 'DarkGray');
    rect.setAttributeNS(null, 'pool', parseInt(process_category) - 1);
    rect.setAttributeNS(null, 'onmouseover', 'rectMouseHover('+id+')');
    rect.setAttributeNS(null, 'onmouseout', 'rectMouseOut('+id+')');
    document.getElementById('rectGroup'+id).appendChild(rect);

    var rectStatus = document.createElementNS(svgns, 'circle');
    rectStatus.setAttributeNS(null, 'cx', parseInt(posX) - 10);
    rectStatus.setAttributeNS(null, 'cy', parseInt(posY) + 10);
    rectStatus.setAttributeNS(null, 'r', '7');
    rectStatus.setAttributeNS(null, 'id', 'rectCircle'+id);
    rectStatus.setAttributeNS(null, 'stroke', 'black');
    rectStatus.setAttributeNS(null, 'stroke-width', '0.5');
    if(processStatus == 'on_deck')
        rectStatus.setAttributeNS(null, 'fill', 'red');
    if(processStatus == 'in_progress')
        rectStatus.setAttributeNS(null, 'fill', 'orange');
    if(processStatus == 'done')
        rectStatus.setAttributeNS(null, 'fill', 'green');
    document.getElementById('rectGroup'+id).appendChild(rectStatus);

    var rectText = document.createElementNS(svgns, 'text');
    rectText.setAttributeNS(null, 'x', parseInt(posX)+75);
    rectText.setAttributeNS(null, 'y', parseInt(posY)+25);
    rectText.setAttributeNS(null, 'font-family', 'Verdana');
    rectText.setAttributeNS(null, 'font-size', '.95em');
    rectText.setAttributeNS(null, 'fill', 'black');
    rectText.setAttributeNS(null, 'text-anchor', 'middle');
    rectText.setAttributeNS(null, 'id', 'rectText'+id);
    rectText.setAttributeNS(null, 'class', 'noselect');
    rectText.setAttributeNS(null, 'pointer-events', 'none');
    var textNode = document.createTextNode(processName);
    //var textNode = document.createTextNode(jsonData.process[i].processName+"-"+jsonData.process[i].id);
    rectText.appendChild(textNode);

    max_id++;
    jsonData.process[max_id] = {childID:"none",parentID:"none"};
    document.getElementById('rectGroup'+id).appendChild(rectText);
    //document.removeEventListener('mousedown',mousedownfunction,false);
    //document.removeEventListener('mousemove',mousemovefunction,false);
    //document.removeEventListener('mouseup',mouseupfunction,false);
    document.addEventListener('mousedown',mousedownfunction,false);

    $(".modal").modal("hide");
}

function popupSetting(event){
    console.log(event.target);
    $('#settingmodal').modal();
}

$(document).ready(function() {
    
	createFlow();
	createContextMenu();
	document.addEventListener('mousedown',mousedownfunction,false);
	
    $("#save-processes").on("click",saveProcess);
    $("#add-process-confirm").on("click",addProcess);


	///----------------------------------------------------------------
	
});
function mousedownfunction(event)
{
    var res = event.target.id.split("-");
    if(res[0] != 'connector' && event.target.hasAttribute('isdraggable')){
        currentX = event.clientX;
        currentY = event.clientY;
        selectedElement = event.target;
        document.addEventListener('mousemove',mousemovefunction,false);
        document.addEventListener('mouseup',mouseupfunction,false);
    }
    if(res[0] == 'connector' && event.target.hasAttribute('isdraggable'))
    {
        currentX = event.clientX;
        currentY = event.clientY;
        origin = document.getElementById("origin").getBoundingClientRect();

        selectedConnector = event.target;
        selectParentEditor = document.getElementById(res[1]);
        selectParentEditor.setAttribute("stroke","DarkRed");
        document.addEventListener('mousemove',mousemovefunction,false);
        document.addEventListener('mouseup',mouseupfunction,false);
        startDragArrow = true;
    }
}

function mousemovefunction(event)
{
    console.log(selectedElement.getAttribute("pool"));
    if(selectedConnector)
    {
        mX = event.pageX -  origin.left- window.pageXOffset;
        mY = event.pageY - origin.top - window.pageYOffset;
        arrowEdit.setAttribute('points',selectedConnector.getAttribute("x")+','+(parseInt(selectedConnector.getAttribute("y"))+10)+' '+mX+','+mY);
        arrowEdit.setAttribute('marker-end', "url(#arrow)");
    }
    if (selectedElement) {
        rectContextMenu.setAttributeNS(null,'display','none');
        settingContextMenu.setAttributeNS(null,'display','none');
        var dx = parseInt(selectedElement.getAttribute("x")) + event.clientX - currentX;
        var dy = parseInt(selectedElement.getAttribute("y")) + event.clientY - currentY;
        currentX = event.clientX;
        currentY = event.clientY;

        if(dy < 45 || dy > 795 ) //limit top & bottom
            return;

        if(dx < experimentBorder-150 && dx > 1 && selectedElement.getAttribute("pool")=="0")
        {
            selectedElement.setAttribute("x", dx);
            selectedElement.setAttribute("y", dy);
            selectedElement.style.opacity = '0.7';

            manageArrows(selectedElement);
        }

        if(dx > experimentBorder && dx < instrumentBorder-150 && selectedElement.getAttribute("pool")=="1")
        {
            selectedElement.setAttribute("x", dx);
            selectedElement.setAttribute("y", dy);
            selectedElement.style.opacity = '0.7';

            manageArrows(selectedElement);
        }

        if(dx > instrumentBorder && dx < outputDataBorder-150 && selectedElement.getAttribute("pool")=="2")
        {
            selectedElement.setAttribute("x", dx);
            selectedElement.setAttribute("y", dy);
            selectedElement.style.opacity = '0.7';

            manageArrows(selectedElement);
        }

        if(dx > outputDataBorder && dx < dataAnalysisBorder-150 && selectedElement.getAttribute("pool")=="3")
        {
            selectedElement.setAttribute("x", dx);
            selectedElement.setAttribute("y", dy);
            selectedElement.style.opacity = '0.7';

            manageArrows(selectedElement);
        }
    }
}

function mouseupfunction(event){
    if(selectedConnector)
    {
        selectedConnector = null;
        selectParentEditor.setAttribute("stroke","DarkGray");
        selectParentEditor = null;
        selectChildEditor.setAttribute("stroke","DarkGray");
        selectChildEditor = null;
        startDragArrow = false;
        document.removeEventListener('mousemove',mousemovefunction,false);
        document.removeEventListener('mouseup',mouseupfunction,false);
    }

    if (selectedElement) {
        document.removeEventListener('mousemove',mousemovefunction,false);
        document.removeEventListener('mouseup',mouseupfunction,false);
        selectedElement.style.opacity = '1.0';
        selectedElement = null;
    }

}
