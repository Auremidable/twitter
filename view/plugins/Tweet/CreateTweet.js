$.fn.CreateTweet = function(action = "tweet")
{
	var initialInput = this;
	var Ucolor = null;
	var addOk = false;
	var my_form = null;
	var infoBox = $(".messageBox")[0];
	var messageBox = $(infoBox).parent();
	if(action == "tweet")
		my_form = $(this).parent().parent()[0];
	else
		my_form = $(this).parent()[0];
	$.post(
		"../controller/loadInfosMember.php",
		"",
		infosMember,
		"json");

	function infosMember(data)
	{
		Ucolor = data.color_theme;
	}

	$(this).click(function ()
	{
		let container = $("<div class='pure-u-1'></div>");
		let editContainer = $("<div></div>");
		let tweetZone = $("<textarea class='pure-u-1 tweet' ></textarea>");
		editContainer.css(
		{
			boxSizing: "border-box",
			fontFamily: "sans-serif",
			border: "1px solid #CCC",
			borderRadius: "4px",
			margin: "5px",
			padding: "5px",
			boxShadow: "0px 1px 3px inset #DDD"
		});
		tweetZone.focus(function()
		{
			$(this).css({
				border: "0",
				boxShadow: "0px 0px 0px black",
				backgroundColor: "transparent",
				outline: "0",
				minHeight: "100px",
				resize: "none"
			});
		});
		tweetZone.keyup(function (event)
		{
			$(".nb_char").text(140 - $(this).val().length);
			if($(this).val().length > 140)
			{
				event.preventDefault();
			}
		});
		let image_container = $("<div class='image_container pure-g'></div>");
		image_container.css(
		{
			justifyContent: "center"
		});
		editContainer.append(tweetZone, image_container);
		let editBar = $("<div class='pure-u-1'></div>");
		editBar.css(
		{
			boxSizing: "border-box",
			display: "flex",
			justifyContent: "flex-end"
		});
		//Button add Image
		let compt_char = $("<div class='nb_char'>140</div>");
		compt_char.css(
		{
			margin: "15px 5px"
		});
		let addImage = $("<div></div>");
		let my_fake_label = $("<button type='button'></button>");
		my_fake_label.css(
		{
			padding: "0px",
			margin: "5px",
			overflow: "hidden",
			border: "1px solid",
			borderColor: Ucolor,
			backgroundColor: "transparent",
			borderRadius: "15px"
		});
		my_fake_label.keyup(function(e)
		{
			if(e.key == "Enter")
				my_input_file.trigger("click");
		});
		let my_real_label = $("<label for='newImage'>Image</label>");
		my_real_label.css(
		{
			display: "block",
			boxSizing: "border-box",
			padding: "7px 30px",
			margin: "0px",
			color: Ucolor,
		});
		my_real_label.hover(function ()
		{
			$(this).css(
			{
				fontWeight: "bold",
				color: "white",
				backgroundColor : Ucolor
			});
		}, function ()
		{
			$(this).css(
			{
				fontWeight: "normal",
				color: Ucolor,
				backgroundColor : "transparent"
			});
		});
		let my_input_file = $("<input type='file' name='images' id='newImage' />");
		my_real_label.css("cursor", "pointer");
		my_input_file.css(
		{
			display: "none"
		});
		my_input_file.change(function ()
		{
			if($(image_container).find("figure").length <= 0 )
			{
				LoadImage(my_form, messageBox, false, image_container);
			}
			else
			{
				infoBox.text("Your tweet can't have more than one image.");
				messageBox.fadeIn().delay(3000).fadeOut();
			}
			tweetZone.focus();
		});
		my_fake_label.append(my_real_label);
		addImage.append(my_fake_label, my_input_file);
		// Button Send
		let my_submit_button = $("<input type='submit' value='Tweeter'>");
		my_submit_button.css(
		{
			boxSizing: "border-box",
			border: "1px solid white",
			borderRadius: "15px",
			padding: "7px 30px",
			margin: "5px",
			color: "white",
			backgroundColor: "#0094FF"
		});
		my_submit_button.hover(function ()
		{
			$(this).css(
			{
				border: "1px solid #0094FF",
				fontWeight: "bold",
				color: "#0094FF",
				backgroundColor : "white",
				marginLeft: "3px"
			});
		}, function ()
		{
			$(this).css(
			{
				border: "1px solid white",
				fontWeight: "normal",
				color: "white",
				backgroundColor : "#0094FF",
				marginLeft: "5px"
			});
		});
		editBar.append(compt_char, addImage, my_submit_button);
		container.append(editContainer, editBar);
		$(this).after(container);
		$(this).hide();
		tweetZone.focus();
		$(window).on('beforeunload', function (event)
		{
			if(!addOk)
				deleteImage();
			
		});

		function deleteImage()
		{
			if($(image_container).find("img").length > 0)
			{
				$.post(
					"../controller/deleteImage.php",
					{image_name: $(image_container).find("img").attr("src")},
					is_deleted,
					"json");
				function is_deleted(response)
				{
					if(!response.error)
					{
						$(image_container).find("figure").remove();
					}
				}
			}
		}

		$(my_form).submit(function (event)
		{
			event.preventDefault();
			if($(".tweet").val().length > 0 || $(image_container).find("img").length > 0)
			{
				if($(".tweet").val().length <= 140)
				{
					let my_tweet = $("<input/>", {
						type: "hidden",
						name: "tweet",
						value: $(".tweet").val()
					});
					$(this).append(my_tweet);
					let formData = $(this).serialize();
					if(action == "tweet")
					{
						$.post(
							"../controller/createTweet.php",
							formData,
							is_created,
							"text");
					}
					else
					{
						$.post(
							"../controller/createComment.php",
							formData,
							is_created,
							"text");
					}

					function is_created(data)
					{
						addOk = true;
						container.remove();
						$(initialInput).show();
					}
				}
				else
				{
					$(infoBox).text("You can't tweet with more than 140 character !");
					$(messageBox).fadeIn().delay(3000).fadeOut();
				}	
			}
			else
			{
				$(infoBox).text("Your tweet need at least 1 character.");
				$(messageBox).fadeIn().delay(3000).fadeOut();
			}
		});
	});
}
