$("document").ready(function()
{
	$(".app").Header();
	let messageBox = $("<div class='pure-g' ></div>");
	messageBox.hide();
	messageBox.css(
	{
		position: "fixed",
		top: "0",
		left: "0",
		right: "0"
	});
	let infoBox = $("<span class='messageBox pure-u-1-3'></span>");
	infoBox.css(
	{
		margin: "0 auto",
		padding: "10px 15px",
		boxShadow: "0px 5px 5px -5px black",
		borderRadius: "5px",
		textAlign: "center",
		color: "white",
		backgroundColor: "#24B1E1"
	});
	messageBox.append(infoBox);
	$(".app").append(messageBox);
	let all_collumns = $("<div class='pure-u-1'></div>");
	let left_collumn = $("<div class='pure-u-xl-1-5 pure-u-sm-1-3'></div>");
	let center_collumn = $("<div class='pure-u-xl-3-5 pure-u-sm-2-3'></div>");
	let right_collumn = $("<div class='pure-u-xl-1-5 pure-u-sm-1-3'></div>");
	all_collumns.append(left_collumn, center_collumn, right_collumn);
	$(".app").append(all_collumns);
	right_collumn.recommand();
	left_collumn.smallprofile();
	let write_tweet = $("<div></div>");
	$(write_tweet).Form({title: "Nouveau Tweet",form:{method: "post",action: "action.php"},input:[{type: "text",name: "newTweet",placeholder: "Quoi de neuf ?"}]});
	center_collumn.append(write_tweet);
	center_collumn.css(
	{
		boxSizing: "border-box",
		padding: "0px 50px"
	});
	$(".form_nouveau_tweet").attr("class", "pure-u-1 pure-form pure-form-aligned form_nouveau_tweet");
	$(".form_nouveau_tweet").submit(function (event)
	{
		event.preventDefault();
	});
	$(".form_nouveau_tweet").find("input[type='text']").CreateTweet();
	center_collumn.ShowTweets();
});