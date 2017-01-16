function get_info(attack_id)
{
	var info = new Array();
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "/game.php?village="+game_data.village.id+"&screen=info_command&id="+attack_id+"&type=own", false);
	xhr.onreadystatechange = function() 
	{
		if (xhr.readyState == 4 && xhr.status == 200)
		{
			requested = document.createElement("test");
			requested.innerHTML = xhr.responseText;

			var base = requested.getElementsByClassName("main")[4].outerText;
			var tmp = base.substring(base.search("£up: ")+5);
			var resources = tmp.substring (0, tmp.search("  | ")).split("  ");
			
			info['wood'] = parseInt(resources[0]);
			info['clay'] = parseInt(resources[1]);
			info['iron'] = parseInt(resources[2]);
		}
	}
	xhr.send(null);
	return info;
}

String.prototype.filename=function(extension){
    var s= this.replace(/\\/g, '/');
    s= s.substring(s.lastIndexOf('/')+ 1);
    return extension? s.replace(/[?#].+$/, ''): s.split('.')[0];
}

var global_wood = 0,
	global_clay = 0,
	global_iron = 0,
	current_index = 0,
	should_be_updated = true,
	last_value = 0,
	updater_id;

function check_commands(commands)
{
	setTimeout(function() {
		var info = get_info(commands [current_index]);
		global_wood += info.wood ? info.wood : 0;
		global_clay += info.clay ? info.clay : 0;
		global_iron += info.iron ? info.iron : 0;

		current_index ++;
		if (current_index >= commands.length) should_be_updated = false;
		if (should_be_updated) check_commands(commands);
	}, 225);
}

function calculate()
{
	var images = document.getElementsByTagName("img");

	var commands = [];
	for (var i = 0; i < images.length; i++)
	{
		if (images[i].src.filename() == "return_farm") 
			commands.push (images[i].parentNode.attributes[3].value);
	}

	check_commands(commands);
	updater_id = setInterval(updater, 500);

	var t = document.getElementById("leftcolumn");
	t.innerHTML = '<div id="show_incoming_res" class="vis moveable widget "> <h4 class="head"><img class="widget-button" onclick="return VillageOverview.toggleWidget( \'show_incoming_res\', this );" src="graphic/minus.png"> Nadchodz¹ce surowce (trwa liczenie...)</h4> <div class="widget_content" style="display: block;"> <table class="vis" style="width: 100%"> <tbody> <tr> <td><span class="icon header wood"></span> Drewno</td><td id="wood-value">0</td></tr><tr> <td><span class="icon header stone"> </span> Glina</td><td id="clay-value">0</td></tr><tr> <td><span class="icon header iron"> </span> ¯elazo</td><td id="iron-value">0</td></tr></tbody> </table> </div></div>' + t.innerHTML;
}

function updater()
{
	if (last_value == (global_wood + global_clay + global_iron) && last_value != 0)
	{
		clearInterval(updater_id);
		document.getElementById("show_incoming_res").childNodes[1].innerText = "Nadchodz¹ce surowce";
		return;
	}

	document.getElementById("wood-value").innerText = global_wood;
	document.getElementById("clay-value").innerText = global_clay;
	document.getElementById("iron-value").innerText = global_iron;
	last_value = global_wood + global_clay + global_iron;
}

calculate();