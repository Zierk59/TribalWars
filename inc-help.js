function gup(url, name) {
	if (!url) url = location.href;
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
}

function start()
{
	var id = gup(location.href, "id");
	if (!id || id == null || id == "" || id == undefined || game_data.screen != "info_village")
	{
		UI.ErrorMessage("B³¹d, wejdz w informacje o wiosce.");
		return;
	}

	var xhr = new XMLHttpRequest();
	var table = "";

	xhr.open('GET', "/game.php?village="+id+"&screen=place&mode=call", false);
	xhr.onreadystatechange = function() 
	{
		if (xhr.readyState == 4 && xhr.status == 200)
		{
			requested = document.createElement("test");
			requested.innerHTML = xhr.responseText;
			table = requested.getElementsByClassName("overview_table");
		}
		else 
		{
			UI.ErrorMessage("B³¹d, spróbuj ponownie.");
			return;
		}
	}
	xhr.send(null);
	if (!table[0] || table[0] == null || table[0] == "" || table[0] == undefined)
	{
		UI.ErrorMessage("B³¹d, spróbuj ponownie.");
		return;
	}

	document.getElementById("commands_incomings").innerHTML += "<br><strong>Przybywaj¹ce</strong><br>" + table[0].outerHTML;
}

start();