function LoadImage(where, divError, square = true, output = false)
{
	$(where).find("input[type='file']").attr("name", "user_picture");
	$(where).append("<input type='hidden' name='output' value='" + output + "' />");
	$(where).append("<input type='hidden' name='square' value='" + square + "' />");

	$.ajax({
		url: "../controller/functions/LoadImage.php",
		type: "POST",
		data:  new FormData(where),
		dataType: "json",
		contentType: false,
		cache: false,
		processData:false,
		success: imageLoaded
	});

	function imageLoaded(data)
	{
		$("input[name='output']").remove();
		$("input[name='square']").remove();
		$(divError).find("span").text(data.result);
		$(divError).fadeIn().delay(3000).fadeOut();

		if(typeof data.image != "undefined")
		{
			let my_figure = $("<figure class='pure-g'></figure>");
			my_figure.css(
			{
				position: "relative",
				margin: "0",
				width: "100px",
				height: "100px",
				overflow: "hidden"
			});
			let my_image = $("<img />", 
			{
				class: "pure-u-1",
				src: data.image
			});
			my_image.css(
			{
				cursor: "pointer"
			});
			my_image.click(function ()
			{
				if($(this).parent().css("height") == "100px")
				{
					$(this).parent().css(
					{
						width: "auto",
						height: "auto"
					});	
				}
				else
				{

					$(this).parent().css(
					{
						width: "100px",
						height: "100px"
					});
				}
			});
			let my_close = $("<div>X</div>");
			my_close.css(	
			{
				boxSizing: "border-box",
				position: "absolute",
				top: "2px",
				right: "2px",
				borderRadius: "50%",
				backgroundColor: "rgba(255, 0, 0, 0.8)",
				color: "white",
				zIndex: "2",
				width: "20px",
				height: "20px",
				display: "flex",
				paddingRight: "3px",
				paddingTop: "3px",
				justifyContent: "center",
				alignItems: "center"
			});
			var input_hidden = $("<input/>",
			{
				type: "hidden",
				value: data.image,
				name: "image_name"
			});
			my_close.click(function (event)
			{
				event.stopPropagation();
				$.post(
					"../controller/deleteImage.php",
					{image_name: data.image},
					is_deleted,
					"json");
				function is_deleted(response)
				{
					if(response.error)
					{
						$(".messageBox").text("La suppression de l'image à échouée");
						$(".messageBox").parent().fadeIn().delay(3000).fadeOut();
					}
					else
					{
						$(my_figure).remove();
						$(input_hidden).remove();		
					}
				}
			});
			my_figure.append(my_image, my_close, input_hidden);
			output.append(my_figure);
		}
	}
}