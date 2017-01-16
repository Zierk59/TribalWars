function set_unit(unit_id, count, cells)
{
	return cells[unit_id + 1].innerHTML = count;
}

function set_dealers(free, sum, cells)
{
	return cells[14].innerHTML = free + "/" + sum;
}

function calc_units(table)
{
	var units = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var element = table.childNodes[1];

	for (var i = 1; i < element.childElementCount - 1; i++) 
	{
		for (var c = 0; c < 13; c++)
		{
			units[c] += Number(element.children[i].cells[8 + c].innerText);
		}
	}
	return units;
}

function calc_dealers(table)
{
	var dealers = [0, 0];
	var element = table.childNodes[1];
	for (var i = 1; i < element.childElementCount - 1; i++)
	{
		var r = element.children[i].cells[21].innerText.split("/");
		dealers[0] += Number(r[0]);
		dealers[1] += Number(r[1]);
	}
	return dealers;
}

function start()
{
	var table = document.getElementById("combined_table");
	var row = table.insertRow(-1);

	var cells = [];
	for (var i = 0; i < 15; i++) 
	{
		cells.push ( row.insertCell(i) );
	}
	cells[0].colSpan = "8";
	cells[0].innerHTML = "Suma jednostek:";

	var units = calc_units(table);
	var dealers = calc_dealers(table);
	for (var c = 0; c < 13; c++)
	{
		set_unit(c, units[c], cells);
	}
	set_dealers(dealers[0], dealers[1], cells);
}

start();