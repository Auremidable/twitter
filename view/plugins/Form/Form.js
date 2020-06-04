$.fn.Form = function (props)
{
	const EMPTY = "undefined";
	let my_form = $("<form></form>");
	my_form.attr("method", props.form.method);
	my_form.attr("action", props.form.action);
	my_form.attr("class", "pure-u-1-2 pure-u-lg-1-3 pure-form pure-form-aligned form_" + clear_str(props.title.toLowerCase()));
	my_form.css("margin", "0 auto");
	let my_title = $("<h3>" + props.title + "</h3>");
	my_form.append(my_title);
	if(typeof props.fieldset != EMPTY)
	{
		for(var j in props.fieldset)
		{
			let my_fieldset  = $("<fieldset></fieldset>");
			let my_legend = $("<legend>" + props.fieldset[j].legend + "</legend>");
			my_fieldset.append(my_legend);
			for(var i in props.fieldset[j].input)
			{
				my_fieldset.append(create_field(props.fieldset[j].input[i]));
			}	
			my_form.append(my_fieldset);	
		}
	}
	for(var i in props.input)
	{
		my_form.append(create_field(props.input[i]));
	}

	$(this).append(my_form);

	function create_field(input)
	{
		let is_label = false;
		let my_field = $("<div></div>");
		my_field.css(
		{
			display: "flex",
			flexDirection: "column"
		});
		let my_input;
		if(typeof input.label != EMPTY)
		{
			is_label = true;
			let my_label = $("<label>" + input.label.value + "</label>");
			my_label.attr("for", input.label.for);
			my_field.append(my_label);
		}
		if(input.type == "textarea")
		{
			my_input = $("<textarea>" + input.value + "</textarea>");
			my_input.attr("name", input.name);
			my_input.attr("placeholder", input.placeholder);
			my_input.attr("rows", "10");
			my_input.attr("class", "pure-input-1");
		}
		else
		{
			my_input = $("<input/>");
			my_input.attr("type", input.type);
			my_input.attr("name", input.name);
			my_input.attr("class", "pure-input-1");
			my_input.css(
			{
				margin: "5px 0px"
			});
			if(input.type == "submit")
			{
				my_input.css("margin-top", "10px");
				my_input.attr("class", "pure-button pure-button-primary pure-input-1-3");
			}
			else if(input.type == "button")
			{
				my_input.css(
				{
					margin: "10px 0px",
					background: "#37C82B",
					color: "white"
				});
				my_input.attr("class", "pure-button pure-input-1-3");
			}

			my_input.val(input.value);
			my_input.attr("placeholder", input.placeholder);	
		}
		if(is_label)
			my_input.attr("id", input.label.for);
		my_field.append(my_input);

		if(input.controlBox)
		{
			let my_control_box = $("<span></span>");
			my_control_box.attr("class", "controlBox");
			if(typeof input.confirmField == EMPTY)
			{
				my_control_box.text(verif_field(my_input).message);
				my_field.append(my_control_box);

				$(my_input).keyup(function ()
				{
					my_control_box.text(verif_field(my_input).message);
				});
			}
			else
			{
				my_control_box.text(verif_field(my_input, input.confirmField).message);
				my_field.append(my_control_box);

				$(my_input).keyup(function ()
				{
					my_control_box.text(verif_field(my_input, input.confirmField).message);
				});
			}
		}
		return my_field;
	}

	function verif_field(input, confirm = null)
	{
		let output = {
			error: true,
			message: null
		};
		switch($(input).attr("type"))
		{
			case "email":
			if($(input).val().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
			{
				output.error = false;
				output.message = null;	
			}
			else
			{
				output.error = true;
				output.message = "Please fill with a correct email.";
			}
			break;
			case "tel":
			if($(input).val().match(/^([0-9]{2,}( |-)?){4,}[0-9]{2,}$/))
			{
				output.error = false;
				output.message = null;	
			}
			else
			{
				output.error = true;
				output.message = "Please fill with a correct phone number.";
			}
			break;
			case "text":
			if($(input).val().length < 1)
			{
				output.error = true;
				output.message = "Please fill with at least 1 character";
			}
			else
			{
				output.error = false;
				output.message = null;
			}
			break;
			case "password":
			if(confirm == null)
			{
				if($(input).val().length < 6 || $(input).val().length > 12)
				{
					output.error = true;
					output.message = "The password expect between 6 and 12 characters.";
				}
				else
				{
					output.error = false;
					output.message = null;
				}
			}
			else
			{
				if($(input).val() != $("input[name='" + confirm + "'").val())
				{
					output.error = true;
					output.message = "Both values differs.";
				}
				else
				{
					output.error = false;
					output.message = null;
				}
			}
			break;
		}

		return output;
	}

	function clear_str(str)
	{
		new_str = str.split(" ");
		new_str = new_str.join("_");
		new_str = new_str.split("'");
		return new_str.join("_");
	}
}