$.fn.Header = function ()
{
	let elem = this;
	let header = $("<header class='pure-u-1'></header>");
	header.css(
	{
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		boxSizing: "border-box",
		padding: "10px"
	});
	let logo = $("<img id='logo' src='plugins/Header/logo.png' alt='Logo Twitter'>");
	logo.css(
	{
		justifyContent: "flex-start",
		marginLeft: "2px",
		height : "40px"
	});
	let searchForm = $("<form id='searchForm' action='search.html' method='get'></form>");
	searchForm.css(
	{
		marginLeft: "8px",
		marginRight: "4px",
		display: "flex"
	});
	let inputSearch = $("<input class='pure-input-1' type='text' name='f' placeholder='Recherche...'>");
	let submitSearch = $("<input class='pure-button' type='submit' name='searchValidation' value='Valider'>");


	let buttonContainer = $("<div id='butonContainer'></div>");
	let bt_deconnect = $("<a href='logout.php' class='pure-button'>Déconnexion</a>");
	bt_deconnect.css(
	{
		background: "#F55757",
		color: "white"
	});
	let bt_message = $("<a href='message.html' class='pure-button'>Messages</a>");
	bt_message.css(
	{
		background: "#6AA2F8",
		color: "white",
		margin: "0px 10px"
	});
	let bt_accueil = $("<a href='news.html' class='pure-button'>Accueil</a>");
	bt_accueil.css(
	{
		background: "#6AA2F8",
		color: "white",
		margin: "0px 10px"
	});

	buttonContainer.append(bt_accueil, bt_message ,bt_deconnect);
	searchForm.append(inputSearch, submitSearch);
	header.append(logo, searchForm, buttonContainer);

	$(this).append(header);

}