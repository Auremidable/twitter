$.fn.recommand = function()
{
	function my_content(name, pseudo, image, Ucolor, id_member)
	{
		let content = $("<div class='recommandation pure-u-1'></div>");
		content.css(
		{
			boxSizing: "border-box",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			padding: "10px",
			margin: "5px 0px",
			backgroundColor: "#F4F4F4"
		});

		let picture = $("<img class='picture' height='70' width='70' src='image/" + image +"'/>");
		picture.css(
		{
			borderRadius : "50%",
			height : "70px",
			width : "70px",
			overflow:"hidden"
		});

		let userName = $("<div></div>");
		let p_name = $("<p>" + name + "</p>");
		p_name.css("margin", "0");
		let p_pseudo = $("<a href='profile.html?user=" + pseudo + "'>@" + pseudo + "</a>");
		p_pseudo.css(
		{
			fontWeight: "bold",
			color: "black"
		});
		userName.append(p_name, p_pseudo);

		let subscribe = $("<input type='submit' name='subscribe' class='sub' value='Suivre'>");
		subscribe.css(
		{
			height : "30px",
			width : "100px",
			border: "1px solid",
			borderColor: Ucolor,
			color: Ucolor,
			backgroundColor: "transparent",
			borderRadius: "10px"
		});

		subscribe.hover(function ()
		{
			$(this).css(
			{
				color: "#F4F4F4",
				backgroundColor: Ucolor,
				fontWeight: "bold"

			});
		}, function ()
		{
			$(this).css(
			{
				color: Ucolor,
				backgroundColor: "transparent",
				fontWeight: "normal"
			});
		});

		subscribe.click(function()
		{
			$.post("../controller/followMember.php",{id_member:id_member},successfollow,"text")

			function successfollow(data2)
			{
				console.log(data2);
				getReco();
			}
		});

		content.append(picture, userName, subscribe);

		return content;
	}

	elem = this;

	getReco();

	function getReco()
	{
		$(elem).html("");
		$.post("../controller/displayRecommand.php","",success,"json");

		function success(data)
		{
			for(i in data.result)
			{
				$(elem).append(my_content(data.result[i].name, data.result
					[i].pseudo, data.result[i].profil_image, data.color, data.result[i].id_member));
			}
		}

		return false;
	}
}