const template = "b";
const delay_between_clicks = 450; // ms

var light_to_send = Number(document.getElementsByName("light")[1].value);

var attackSenderInterval;
var currentIndex = 1;
var all;

if ($(document).ready)
{
	send_attacks();
}

function send_attacks()
{
	all = document.getElementsByClassName("farm_icon_" + template);
	attackSenderInterval = setInterval(send_attacks_update, delay_between_clicks);
}

function send_attacks_update()
{
	if (light_to_send > GetCurrentLight()) {clearInterval(attackSenderInterval); UI.ErrorMessage("Not enough Light Cavalery."); return;}

	all[currentIndex].click();
	currentIndex++;
	if (currentIndex >= all.length - 1) {clearInterval(attackSenderInterval); UI.Success("All attacks has been sent."); return;}
}

function GetCurrentLight()
{
	return Number(document.getElementById("light").innerText);
}
