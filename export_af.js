var pages = "";
var fa_export_window = '';

function select_all(srch_index, controller)
{
	var a = document.getElementsByTagName("input");
	for (var i = 0; i < a.length; i++)
	{
		if (a[i].id.indexOf(srch_index) != -1)
		{
			a[i].checked = document.getElementById(controller).checked;
		}
	}
}

String.prototype.filename=function(extension){
    var s= this.replace(/\\/g, '/');
    s= s.substring(s.lastIndexOf('/')+ 1);
    return extension? s.replace(/[?#].+$/, ''): s.split('.')[0];
}

function process_export()
{
	var p = new Array();
	var s = new Array();
	var o = new Array();
	var count = 0;

	var a = document.getElementsByTagName("input");
	for (var i = 0; i < a.length; i++)
	{
		if (a[i].id.indexOf("page") != -1 && a[i].checked) p.push (a[i].id.replace("page_", ""));
		else if (a[i].id.indexOf("loss") != -1 && a[i].checked) s.push (a[i].id.replace("loss_", ""));
	}

	for (var i = 0; i < p.length; i++)
	{
		var xhr = new XMLHttpRequest();
		var link = "/game.php?village="+game_data.village.id+"&screen=am_farm&Farm_page="+(parseInt (p[i]) - 1);
		xhr.open('GET', link, false);
		xhr.onreadystatechange = function() 
		{
			if (xhr.readyState == 4 && xhr.status == 200)
			{
				requestedBody = document.createElement("body");
				requestedBody.innerHTML = xhr.responseText;
				console.dir(requestedBody);

				var images = requestedBody.getElementsByTagName("img");
				var coords = new Array();

				for (var c = 0; c < images.length; c++)
				{
					for (var d = 0; d < s.length; d++)
					{
						if (images[c].src.filename() == s[d])
					   	{
					   		var b = images[c].parentNode.parentNode.cells[3].innerText.split(" ");
					   		coords.push( b[1].replace("(", "").replace(")", "") );
					   	}
					}
				}
				o += coords;
				count += coords.length;
			}
		}
		xhr.send(null);
	}
	if (o.length == 0) o[0] = "Brak rezultatów";
	document.getElementsByClassName("popup_box_content")[0].innerHTML = '<a class="popup_box_close tooltip-delayed" href="#">&nbsp;</a><h2 align="center">Eksport wiosek</h2><hr><textarea style="width:240px;resize:none;" readonly>'+o+'</textarea><br><p>Wyeksportowano '+count+' wiosek</p><button class="btn" id="go-back" onclick="return go_back();" style="float:right;">Powrót</button><button class="btn" id="exit" onclick="return Dialog.close();" style="float:right;">Gotowe</button>';
	return false;
}

function go_back()
{
	document.getElementsByClassName("popup_box_content")[0].innerHTML = ('<a class="popup_box_close tooltip-delayed" href="#">&nbsp;</a>' + fa_export_window);
}

function get_max_page()
{
	var p = document.getElementsByClassName("paged-nav-item");
	p = p[p.length - 1].innerText;
	return Number(p.substr(1, 1));
}

function start()
{
	if (game_data.screen != "am_farm")
	{
		UI.ErrorMessage("WejdŸ w przegl¹d Asystenta Farmera.", 1000);
	}
	else
	{
		for (var i = 1; i <= get_max_page(); i++)
		{
			pages += '<tr><td>Strona ' + i + '</td><td><input type="checkbox" checked="true" id="page_' + i + '"></td></tr>';
		}
		fa_export_window = '<h2 align="center">Eksport wiosek</h2><hr><table class="vis" style="width: 100%;"> <tbody> <tr> <th>Strona</th> <th>Eksportuj</th> </tr>'+ pages +' <tr> <th>zaznacz wszystkie</th> <th> <input type="checkbox" checked="true" id="select_all_input" onclick="return select_all(\'page\', \'select_all_input\');"> </th> </tr></tbody></table><h3 align="center">Filtr</h3><table class="vis" style="width: 100%;"> <tbody> <tr> <th>Straty</th> <th>Wybierz</th> </tr><tr> <td><img src="https://dspl.innogamescdn.com/8.65/31598/graphic/dots/green.png"> Brak strat</td><td><input type="checkbox" checked="true" id="loss_green"></td></tr><tr> <td><img src="https://dspl.innogamescdn.com/8.65/31598/graphic/dots/yellow.png"> Czêœciowe straty</td><td><input type="checkbox" checked="true" id="loss_yellow"></td></tr><tr> <td><img src="https://dspl.innogamescdn.com/8.65/31598/graphic/dots/red.png"> Pe³ne straty</td><td><input type="checkbox" checked="true" id="loss_red"></td></tr><tr> <th>zaznacz wszystkie</th> <th> <input type="checkbox" checked="true" id="select_all_filters" onclick="return select_all(\'loss\', \'select_all_filters\');"> </th> </tr></tbody></table><input type="submit" class="btn" style="margin:5px;float:right;" onclick="return process_export();" value="Eksport">';
		Dialog.show("fa_export", fa_export_window);
	}
}
start();