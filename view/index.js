$("document").ready(function ()
{
	
	$.post(
		"../controller/signin_signup.php",
		{
			action: "is_cookie"
		},
		is_cookie,
		"json");
	function is_cookie(data)
	{
		if(data.result)
		{
			window.location.href = "news.html";
		}
	}
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
	let wrapper_form_connexion = $("<div class='form_connexion_block'></div>");
	wrapper_form_connexion.attr("class", "pure-g");
	let wrapper_form_inscription = $("<div class='form_inscription_block'></div>");
	wrapper_form_inscription.attr("class", "pure-g");

	$(".app").append(messageBox, wrapper_form_connexion, wrapper_form_inscription);
	wrapper_form_connexion.Form({
		title: "Connexion",
		form:
		{
			action: "traitement.php",
			method: "post"
		},
		input: [
		{
			type: "text",
			name: "pseudo",
			placeholder: "Votre pseudo",
			controlBox: true
		},
		{
			type: "password",
			name: "signin_password",
			placeholder: "Votre mot de passe",
			controlBox: true
		},
		{
			type: "submit",
			name: "connexion",
			value: "Envoyer"
		}
		]
	});
	$(".form_connexion").append("<a href='#' class='switchToInscription'>Pas encore inscrit ? Incrivez-vous.</a>");

	wrapper_form_inscription.Form({
		title: "Inscription",
		form:
		{
			action: "traitement.php",
			method: "post"
		},
		fieldset: [
		{
			legend: "Étape 1",
			input: [
			{
				type: "text",
				name: "name",
				placeholder: "Votre nom",
				controlBox: true
			},
			{
				type: "text",
				name: "pseudo",
				placeholder: "Votre @identifiant",
				controlBox: true
			},
			{
				type: "button",
				name: "next",
				value: "Suivant"
			}
			]	
		},
		{
			legend: "Étape 2",
			input: [
			{
				type: "button",
				name: "prev",
				value: "Précédent"
			},
			{
				type: "email",
				name: "email",
				placeholder: "Votre email",
				controlBox: true
			},
			{
				type: "tel",
				name: "phone",
				placeholder: "Votre numéro de téléphone",
				controlBox: true
			},
			{
				type: "password",
				name: "password",
				placeholder: "Votre mot de passe",
				controlBox: true
			},
			{
				type: "password",
				name: "password_confirm",
				placeholder: "Confirmez votre mot de passe",
				controlBox: true,
				confirmField: "password"
			},
			{
				type: "submit",
				name: "inscription",
				value: "Envoyer"
			}
			]	
		}
		]
	});
	$(".form_inscription").append("<a href='#' class='switchToConnexion'>Déjà un compte ? Connectez-vous.</a>");

	wrapper_form_inscription.hide();
	$(".switchToInscription").click(function (event)
	{
		event.preventDefault();
		wrapper_form_connexion.hide();
		wrapper_form_inscription.show();
	});
	$(".switchToConnexion").click(function (event)
	{
		event.preventDefault();
		wrapper_form_connexion.show();
		wrapper_form_inscription.hide();
	});

	wrapper_form_connexion.submit(function(event)
	{
		event.preventDefault();
		let is_ok = true;
		$(this).find("input").each(function ()
		{
			if($(this).attr("type") != "submit")
				if(verif_field(this).error)
					is_ok = false;
			});

		if(is_ok)
		{
			$.post(
				"../controller/signin_signup.php",
				{
					action: "signin",
					data: 
					{
						pseudo: $(".form_connexion input[name='pseudo']").val(),
						password: $(".form_connexion input[name='signin_password']").val()
					}
				},
				signin,
				"json");
			function signin(data)
			{
				infoBox.text(data.result);
				messageBox.fadeIn().delay(3000).fadeOut();
				if(!data.error)
				{
					 window.location.href = "news.html";
				}
			}
		}
		else
		{
			infoBox.text("Please fill inputs correctly.");
			messageBox.fadeIn().delay(3000).fadeOut();
		}
	});

	wrapper_form_inscription.submit(function(event)
	{
		event.preventDefault();
	});

	let all_fieldset = $(wrapper_form_inscription).find("fieldset");
	$(all_fieldset[1]).hide();
	$(all_fieldset[0]).show();
	$("input[name='next']").click(function ()
	{
		let is_ok = true;
		$(all_fieldset[0]).find("input").each(function ()
		{
			if($(this).attr("type") != "button")
				if(verif_field(this).error)
					is_ok = false;
			});

		if(is_ok)
		{
			$.post(
				"../controller/signin_signup.php",
				{
					action: "check_pseudo",
					data: 
					{
						name: $(".form_inscription input[name='name']").val(),
						pseudo: $(".form_inscription input[name='pseudo']").val()
					}
				},
				check_pseudo,
				"json");
			function check_pseudo(data)
			{
				if(data.error)
				{
					infoBox.text(data.result);
					messageBox.fadeIn().delay(3000).fadeOut();
				}
				else
				{
					if(data.result == 0)
					{
						$(all_fieldset[1]).show();
						$(all_fieldset[0]).hide();
						infoBox.text("Your pseudo is available");
						messageBox.fadeIn().delay(3000).fadeOut();
					}
					else
					{
						infoBox.text("This pseudo is already used by an another user. Please chose an other one.");
						messageBox.fadeIn().delay(3000).fadeOut();
					}
				}
			}
		}
		else
		{
			infoBox.text("Please fill inputs correctly.");
			messageBox.fadeIn().delay(3000).fadeOut();
		}
	});
	$("input[name='prev']").click(function ()
	{
		$(all_fieldset[1]).hide();
		$(all_fieldset[0]).show();
	});

	$("input[name='inscription']").click(function ()
	{
		let is_ok = true;
		$(all_fieldset[1]).find("input").each(function ()
		{
			if($(this).attr("type") != "submit" && $(this).attr("type") != "button" &&  $(this).attr("name") != "password_confirm")
				if(verif_field(this).error)
					is_ok = false;
				else if($(this).attr("name") == "password_confirm")
					if(verif_field(this, "password").error)
						is_ok = false;
				});

		if(is_ok)
		{
			$.post(
				"../controller/signin_signup.php",
				{
					action: "signup",
					data: 
					{
						name: $(".form_inscription input[name='name']").val(),
						pseudo: $(".form_inscription input[name='pseudo']").val(),
						email: $(".form_inscription input[name='email']").val(),
						phone: $(".form_inscription input[name='phone']").val(),
						password: $(".form_inscription input[name='password']").val(),
						password_confirm: $(".form_inscription input[name='password_confirm']").val()
					}
				},
				signup,
				"json");
			function signup(data)
			{
				infoBox.text(data.result);
				messageBox.fadeIn().delay(3000).fadeOut();
				if(!data.error)
				{
					wrapper_form_inscription.hide();
					wrapper_form_inscription.find("form")[0].reset();
					$(all_fieldset[1]).hide();
					$(all_fieldset[0]).show();
					wrapper_form_connexion.show();
				}
			}
		}
		else
		{
			infoBox.text("Please fill inputs correctly.");
			messageBox.fadeIn().delay(3000).fadeOut();
		}
	});

	function verif_field(input, confirm_field = null)
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
			if(confirm_field == null)
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
				if($(input).val() != $("input[name='" + confirm_field + "'").val())
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
});