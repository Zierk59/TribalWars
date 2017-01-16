var village_min_score = 200,	// Default : Minimalna iloœc punktów
	village_max_score = 1500,	// Default : Maksymalna iloœc punktów
	village_max_dist = 5,		// Default : Maksymalna odleg³oœc w polach
	max_villages = 150; 		// Default : Maksymalna iloœc wiosek

function GetVillages()
{
	var get_size = getOption("max-distance") * 2;
	var e = [],
		i, c, a, d;

	for (i = 0; i < get_size; i++)
	{
		for(c = 0; c < get_size; c++)
		{
			if (e.length >= getOption("max-villages")) return e;
			d = TWMap.map.coordByPixel(TWMap.map.pos[0] + TWMap.tileSize[0] * c, TWMap.map.pos[1] + TWMap.tileSize[1] * i);
			a = TWMap.villages[d.join("")];
			if (a)
			{
				if ("0" === a.owner)
				{
					a = Number(a.points.replace(".", ""));
					if (a >= getOption("min-score") && a <= getOption("max-score"))
						e.push(d.join("|"));
				}
			}
		}
	}
	return e;
}

function getOption(option)
{
	var d = document.getElementById(option);
	return parseInt(d.value);
}

function Update()
{
	var d = document.getElementById("export-result");
	d.value = GetVillages();
}

function Show()
{
	if (game_data.screen != "map") return UI.ErrorMessage("WejdŸ w mapê.", 1000);
	village_export_window = '<h2 align="center">Eksport wiosek</h2><hr><table class="vis" style="width: 100%;"> <thead> <tr> <th>Opcja</th> <th>Wartoœc</th> </tr></thead> <tbody> <tr> <td>Minimalna iloœc punktów</td><td><input type="number" id="min-score" min="26" max="12154" value="' + village_min_score + '"></input> pkt</td></tr><tr> <td>Maksymalna iloœc punktów</td><td><input type="number" id="max-score" min="26" max="12154" value="' + village_max_score + '"></input> pkt</td></tr><tr> <td>Maksymalna odleg³oœc</td><td><input type="number" id="max-distance" value="' + village_max_dist + '"></input> pól</td></tr><tr> <td>Maksymalna iloœc wiosek</td><td><input type="number" id="max-villages" value="' + max_villages + '"></input> wiosek</td></tr></tbody></table><hr><textarea style="width:94%;height:100px;resize:none;" id="export-result" readonly>Brak wyników</textarea><br><button class="btn" id="export-btn" onclick="return Update();" style="float:right;">Eksportuj</button>';
	Dialog.show("village_export", village_export_window);
	Update();
}

Show();