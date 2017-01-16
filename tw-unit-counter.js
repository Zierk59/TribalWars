var update_interval;
var cell;

const static_units = [
      [0, "spear", "pikinierów"],
      [0, "sword", "mieczników"],
      [0, "axe", "toporników"],
      [0, "archer", "³uczników"],

      [1, "spy", "zwiadowców"],
      [1, "light", "lekkich kawalerzystów"],
      [1, "marcher", "³uczników konnych"],
      [1, "heavy", "ciêzkich kawalerzystów"],

      [2, "ram", "taranów"],
      [2, "catapult", "katapult"]
];

function get_current_screen()
{
	switch (window.game_data.screen)
	{
		case "barracks":
			return 0;
		case "stable":
			return 1;
		case "garage":
			return 2;
		default: 
			return -1;
	}
}

function update()
{
	var units_string;
	var units = new Array();
	for (var i = 0; i < static_units.length; i++)
	{
		if (get_current_screen() == static_units[i][0])
		{
			units[static_units[i][1]] = 0;
			units[static_units[i][1]] += get_unit_count(static_units[i][1]);
			if (units[static_units[i][1]] > 0)
				units_string += "<b>" + units[static_units[i][1]] + "</b> " + static_units[i][2] + "<br />";
		}
	}
	delete units;

	cell.innerHTML = "<b>Suma jednostek w kolejce rekrutacji:</b><br />" + units_string.replace("undefined", "");
}

function get_unit_count(unit) 
{
	var q = document.getElementsByClassName("unit_sprite unit_sprite_smaller " + unit);
	var count = 0;
	for (var i = 0; i < q.length; i++) 
	{
		count += Number(q[i].parentNode.innerText.split(" ")[1]);
	}
	return count;
}

function start() 
{
	if (get_current_screen() == -1)
	{
		UI.ErrorMessage("Z³y budynek!", 1000);
		return;
	}
	var table = document.getElementsByClassName("vis")[8];
	var row = table.insertRow(-1);

	cell = row.insertCell(0);
	cell.colSpan = "4";
	update();

	update_interval = setInterval(update, 1000);
}

start();


/////////



var update_interval,cell;const static_units=[[0,"spear","pikinierów"],[0,"sword","mieczników"],[0,"axe","toporników"],[0,"archer","³uczników"],[1,"spy","zwiadowców"],[1,"light","lekkich kawalerzystów"],[1,"marcher","³uczników konnych"],[1,"heavy","ciêzkich kawalerzystów"],[2,"ram","taranów"],[2,"catapult","katapult"]];function get_current_screen(){switch(window.game_data.screen){case"barracks":return 0;case"stable":return 1;case"garage":return 2;default:return-1}}function update(){for(var t,e=new Array,n=0;n<static_units.length;n++)get_current_screen()==static_units[n][0]&&(e[static_units[n][1]]=0,e[static_units[n][1]]+=get_unit_count(static_units[n][1]),e[static_units[n][1]]>0&&(t+="<b>"+e[static_units[n][1]]+"</b> "+static_units[n][2]+"<br />"));delete e,cell.innerHTML="<b>Suma jednostek w kolejce rekrutacji:</b><br />"+t.replace("undefined","")}function get_unit_count(t){for(var e=document.getElementsByClassName("unit_sprite unit_sprite_smaller "+t),n=0,r=0;r<e.length;r++)n+=Number(e[r].parentNode.innerText.split(" ")[1]);return n}function start(){if(-1==get_current_screen())return void UI.ErrorMessage("Z³y budynek!",1e3);var t=document.getElementsByClassName("vis")[8],e=t.insertRow(-1);cell=e.insertCell(0),cell.colSpan="4",update(),update_interval=setInterval(update,1e3)}start();