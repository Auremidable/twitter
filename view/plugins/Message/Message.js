$.fn.Message = function ()
{
	let elem = this;
	function homeDisplay()
	{
		let app = $(elem);
		let wrapper = $("<div></div>"); 
		wrapper.attr("id", "layout");
		wrapper.attr("class", "pure-g");
		let header = $("<header></header>");
		header.attr("class", "pure-u-1");
		header.css("text-align", "center");
		let container = $("<div></div>");
		container.attr("id", "list");
		container.attr("class", "pure-u-1");
		container.css("text-align", "center");
		let titleMessagerie = "Messagerie";
		let title = $("<h1>" + titleMessagerie + "</h1>");
		let buttonAddMsg = $("<button>Ajouter un message</button>");
		buttonAddMsg.attr("id", "addMsg");
		buttonAddMsg.attr("class", "primary-button pure-button ");
		buttonAddMsg.css(
			{
				"color" : "white",
				"background-color" : "#1b98f8",
				"margin-bottom" : "16px" 
			}
		);
		let listMsg = $("<div></div>");
		listMsg.attr("id", "msgList");
		let convo = $("<div></div>");
		convo.attr("id", "wholeConvo");
		convo.attr("class", "pure-u-2-3 pure-u-lg-1-2");
		convo.css({
			"text-align" : "center",
			"margin" : "0 auto"
		});
		let containerMembers = $("<div></div>");
		containerMembers.attr("id", "listMembersWrapper");
		containerMembers.attr("class", "pure-u-1");
		containerMembers .css("text-align", "center");

		app.append(wrapper);
		wrapper.append(header, container);
		header.append(title);
		container.append(buttonAddMsg, listMsg);
		wrapper.append(convo);
		wrapper.append(containerMembers);
	}

	function memberDisplay(id, username, firstname, container) {
		let div = $("<div></div>");
		div.attr("class", "memberConvoLink conv-item pure-u-g");
		div.attr("id", id);
		div.css({
			"padding" : "0.9em 1em",
			"border-bottom" : "1px solid #ddd",
			"border-left" : "12px solid #1b98f8",
			"padding" : "4px 0px",
			"margin" : "0px auto",
			"display" : "block"
		});
		$(div).hover(function(){
		  $(this).css(
		  	{
		  		"cursor" : "pointer",
		  		"border-left" : "12px solid gray",
				"background-color" : "#F5F5F5"
		  	});
		  }, function(){
		  $(this).css(
		  	{
		  		"border-left" : "12px solid #1b98f8",
		  		"background-color" : " white"
		  	});
		});
		let userName = $("<h3>@" + username + "<h3>");
		userName.css({
			"color" : "#778899"
		});
		let firstName = $("<p>" + firstname + "</p>");
		firstName.css({
			"text-transform" : "uppercase"
		});

		div.append(userName, firstName);
		$(container).append(div);
	}

	function convoDisplay(currentMemberId, username, id, messages, container) {
		let titleZone = $("<div></div>");
		titleZone.attr("class", "titleZone");
		let titleConvo = $("<h2></h2>");
		let linkMember = $("<a></a>"); 
		linkMember.css({
			"text-decoration" : "none",
			"color" : "#778899"
		});
		linkMember.text("@" + username);
		linkMember.attr("id", id);
		linkMember.attr("href", "profile.html?user=" + username);
		let convoWrapper = $("<div><div>");
		convoWrapper.attr("id", "convoWrapper");
		let convo2 = $("<div></div>");
		convo2.css({
			"clear" : "both"
		});
		let formContainer = $("<div></div>");
		formContainer.attr("id", "formAddMsg");
		formContainer.attr("class", "pure-u-1");

		container.append(titleZone, convoWrapper, convo2);
		$.each(messages, function(index, value){
			p = $("<p>" + value.content + "</p>");
			p2 = $("<p>" + value.date_message + "</p>");
			p2.attr("class", "left pure-u-2-3");
			if (value.id_sender != currentMemberId) 
			{
				p.attr("class", "left pure-u-2-3");
				p.css({
					"float" : "left",
					"background-color" : "#F5F5F5",
					"margin-bottom" : "2px",
					"margin-top" : "4px",
					"border-radius" : "6px",
					"padding" : "12px 6px"
				});
				p2.css({
					"float" : "left",
					"margin-bottom" : "12px",
					"margin-top" : "0px",
					"color" : "grey"
				});
			}
			else
			{
				p.attr("class", "right pure-u-2-3");
				p.css({
					"float" : "right",
					"background-color" : "#1b98f8",
					"margin-bottom" : "2px",
					"margin-top" : "2px",
					"border-radius" : "6px",
					"padding" : "12px 6px"
				});
				p2.css({
					"float" : "right",
					"margin-bottom" : "12px",
					"margin-top" : "0px",
					"color" : "grey"
				});
			}
			convoWrapper.append(p, p2);
		});

		formContainer.Form({
			title: "",
			form:
			{
				action: "add_message.php",
				method: "post"
			},
			input: [
			{
				type: "text",
				name: "content",
				placeholder: "Ajouter un message",
				controlBox: true
			},
			{
				type: "hidden",
				name: "id_sender",
				value: currentMemberId,
				controlBox: false
			},
			{
				type: "hidden",
				name: "id_receiver",
				value: id,
				controlBox: false
			},
			{
				type: "submit",
				name: "addMsg",
				value: "Envoyer"
			}
			]
		});
		$('html,body').animate({scrollTop: $(formContainer).offset().top}, 'slow');

		container.append(formContainer);
		titleZone.append(titleConvo);
		titleConvo.append(linkMember);

	}

	function listMembersDisplay(container) {
		let listMembers = $("<div></div>");
		listMembers.attr("id", "listMembers");
		listMembers.attr("class", "pure-u-1");
		listMembers.css("text-align", "center");

		let back = $("<button>Retour aux conversations</button>");
		back.attr("id", "backButton");
	
		back.attr("class", "secondary-button pure-button");

		container.append(back, listMembers);
	}

	function infoMemberBdd(fn) {
		$.post(
		"../controller/show_member.php",
		"", 
		result,
		"json"
		);

		function result(currentMember) {
			if (currentMember.error == false){
				if (currentMember.result == false)
				{
					$("#list").html("<p>Le membre n'existe pas</p>");
					fn(false);
				}
				fn(currentMember.result);
			}
			else
			{
				$("#list").html("<p>" + currentMember.result + "</p>");
				fn(false);
			}
		} 

	}

	function listMessageMember(infoMember) {
		if (infoMember == false) {
			return false;
		}

		$.post(
		"../controller/messagerie.php",
		{id : infoMember.id_member},
		messagesListBdd,
		"json"
		);


		$("#addMsg").click(function(){
			$("#wholeConvo").html("");
			$("#msgList").html("");
			$("#addMsg").hide();
			$("#listMembersWrapper").show();
			listMembersDisplay($("#listMembersWrapper"));

			$("#backButton").click(function(){
				$("#addMsg").show();
				$("#listMembersWrapper").html("");
				$.post(
				"../controller/messagerie.php",
				{id : infoMember.id_member},
				messagesListBdd,
				"json"
				);
			});

			$.post(
			"../controller/members_list.php",
			{id : infoMember.id_member}, 
			membersList,
			"json"
			);

			function membersList(all_members) 
			{
				if (all_members.members.length == 0) 
				{
					$("#listMembers").html("<p>Il semblerait que vous soyez seul sur ce site! Vous ne pouvez pas envoyer de message pour l'instant.</p>");
					return false;
				}

				$("#listMembers").html("<h3>Veuillez choisir un membre</h3>");

				let sort_members = all_members["members"].sort(function (a, b) {
					return (a.pseudo > b.pseudo) ? 1 : -1;
				});

				$.each(sort_members, function(index, value)
				{
					memberDisplay(value.id_member, value.pseudo, value.name, $("#listMembers"));
				});

				$(".memberConvoLink").click(function () {
					$("#listMembersWrapper").hide();
					messagesFromMember = [];
					let idOtherMember = $(this).attr("id");

					$.post(
					"../controller/messagerie.php",
					{id : infoMember.id_member},
					messagesListUpdated2,
					"json"
					);

					function messagesListUpdated2(update)
					{
						$.each(update.messages, function (index2, value2) 
						{
							if (infoMember.id_member == value2["id_receiver"] && value2["id_sender"] == idOtherMember || infoMember.id_member == value2["id_sender"] && value2["id_receiver"] == idOtherMember)
							{
								messagesFromMember.push(value2);
							}
						});

						let backButton2 = $("<button>Retour à la liste</button>");
						backButton2 .attr("id", "back_button");
						$(backButton2).click(function(){
							$("#listMembersWrapper").show();
							$("#wholeConvo").html("");
						});
						backButton2.attr("class", "secondary-button pure-button");
						$("#wholeConvo").append(backButton2);

						$.each(sort_members, function (index, value) 
						{
							if (value.id_member == idOtherMember)
							{
								convoDisplay(infoMember.id_member, value.pseudo, value.id_member, messagesFromMember, $("#wholeConvo"));
							}
						});
						$("input[name='addMsg']").parent().css(
						{
							flexDirection: "row",
							justifyContent: "center"
						});
						$("form").submit(function (event) {
							event.preventDefault();
							let content_message = $(this).serializeArray();
							if(content_message[0].value != "")
							{
								$.post(
								"../controller/add_message.php",
								content_message,
								add_message,
								"json"
								);	

								function add_message(retour)
								{
									let addMessage = $("<p>" + retour["messages"] + "</p>");
									addMessage.attr("class", "right pure-u-2-3");
									addMessage.css({
										"float" : "right",
										"background-color" : "#1b98f8",
										"margin-bottom" : "8px",
										"margin-top" : "2px",
										"border-radius" : "6px",
										"padding" : "12px 6px"
									});
									$("#convoWrapper").append(addMessage);
									$('form').trigger("reset");
								}		
							}
						});
					}

				});
			}

		});

		function messagesListBdd(listMessage) {
			if (listMessage.messages.length == 0)
			{
				$("#msgList").html("<p>Vous n'avez pas encore de messages :'(</p>");
				return false;
			}

			if (listMessage.members.length != 0) 
			{
				let unique_member = listMessage.members.sort(function (a, b) {
					return (a.pseudo > b.pseudo) ? 1 : -1;
				});
				$.each(unique_member, function (index, value) 
				{
					memberDisplay(value.id_member, value.pseudo, value.name, $("#msgList"));
				});

				$(".memberConvoLink").click(function () {
					$("#list").hide();
					messagesFromMember = [];
					let idOtherMember = $(this).attr("id");

					$.post(
					"../controller/messagerie.php",
					{id : infoMember.id_member},
					messagesListUpdated,
					"json"
					);

					function messagesListUpdated(update)
					{
						$.each(update.messages, function (index2, value2) 
						{
							if (infoMember.id_member == value2["id_receiver"] && value2["id_sender"] == idOtherMember || infoMember.id_member == value2["id_sender"] && value2["id_receiver"] == idOtherMember)
							{
								messagesFromMember.push(value2);
							}
						});

						let backButton = $("<button>Retour</button>");
						backButton.attr("id", "back-button");
						$(backButton).click(function(){
							$("#list").show();
							$("#wholeConvo").html("");
						});
						backButton .attr("class", "secondary-button pure-button");
						$("#wholeConvo").append(backButton);

						$.each(unique_member, function (index, value) 
						{
							if (value.id_member == idOtherMember)
							{
								convoDisplay(infoMember.id_member, value.pseudo, value.id_member, messagesFromMember, $("#wholeConvo"));
							}
						});
						$("input[name='addMsg']").parent().css(
						{
							flexDirection: "row",
							justifyContent: "center"
						});
						$("form").submit(function (event) {
							event.preventDefault();
							let content_message = $(this).serializeArray();
							if(content_message[0].value != "")
							{
								$.post(
								"../controller/add_message.php",
								content_message,
								add_message,
								"json"
								);	

								function add_message(retour)
								{
									let addMessage = $("<p>" + retour["messages"] + "</p>");
									addMessage.attr("class", "right pure-u-2-3");
									addMessage.css({
										"float" : "right",
										"background-color" : "#1b98f8",
										"margin-bottom" : "8px",
										"margin-top" : "2px",
										"border-radius" : "6px",
										"padding" : "12px 6px"
									});
									$("#convoWrapper").append(addMessage);
									$('form').trigger("reset");
								}		
							}
						});
					}

				});
			}
		}
	}

	homeDisplay();
	infoMemberBdd(function (memberInfo) {
		listMessageMember(memberInfo);
		$("#wholeConvo").html("");
		$("#listMembersWrapper").html("");
	});

}