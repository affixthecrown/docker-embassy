

		


function addListener(eventType,thing,_handler) {
        //for internet explorer and firefox and chrome and safari.

        var IEet = "on" + eventType;

         if( !thing.addEventListener ) {
                thing.attachEvent(IEet,_handler);
        }else{

                thing.addEventListener(eventType,_handler, false);
        }
}
function callPromptAccount(values) {




        var newAcctUrl = anonUrl + 'prompt_account';
        var request = newRequest();
        request.open("GET",newAcctUrl,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("StarterDiv");
                                d.innerHTML = request.responseText;
                                /*
                                if( firstLoginEid ) { //if we have a first time Eid to add, put a hidden input thing in here giving instruction.
                                        var eidInput = document.createElement('input');
                                        eidInput.name = 'firstLoginEid';
                                        eidInput.value = firstLoginEid;
                                        eidInput.style.visibility = 'hidden';

                                        var accountForm = document.getElementById('NewAccount');
                                        accountForm.appendChild(eidInput);
                                }       
                                */
                                /*if( arrivalMessage ) {
                                        var elm = document.getElementById("PromptAccountMsgDiv");
                                        elm.innerHTML = arrivalMessage;
                                }*/
                                if(values) {
                                        var f = document.getElementById("FullName");
                                        f.value = values['fullName'];
                                        var p = document.getElementById("SetPassword");
                                        p.value = values['password'];
                                        var e = document.getElementById("Email");
                                        e.value = values['email'];
                                }
                                validateInit();


                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}

function callTriumphTape() {


        var request = newRequest();
        var url = anonurl + "triumph_tape";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("TriumphTape");
                                if(d)
                                d.innerHTML = request.responseText;
                        }
                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}


function createKeys(e) {
        if( e.keyCode == 13 )
                landToPromptAccount();
}

function displayBadCred() {
	var request = newRequest();
        /*set body inner HTML to this*/
        var url = baseurl + "backdrop_slate.html";
        request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
					document.getElementsByTagName("body")[0].innerHTML = request.responseText;	
					var e = new oblNoAuth("main_content");
					e.setTitle("Oops!  Your password was wrong or your session has expired:(");
                                }
                        }
        };
        //now send.  we'll be waiting...
        request.send(null);
}

function displayFocusDiv(background,elementId) {
        //if this exists then kill it.  otherwise we'll have double tinting.
        if ( document.getElementById('StarterDiv') )
                document.body.removeChild(document.getElementById('StarterDiv'));


        //hide the flash (it seems to have an infinite z-index)
        //var flash = document.getElementById('TheFlash');
        //if( flash )
        //      flash.style.visibility = 'hidden';


        var body = document.getElementById('body');
        var tintDiv = document.createElement('div');
        var startDiv = document.createElement('div');

        tintDiv.id = "TintDiv";
        tintDiv.align = "center";
        if( navigator.appName == 'Microsoft Internet Explorer') {
                tintDiv.className = 'tintDivIE';
                startDiv.className = 'startDivIE';
        }else{
                tintDiv.className = 'tintDiv';
                tintDiv.style.background = 'rgba(10, 10, 10, 0.839844)';

        }

        startDiv.id = "StarterDiv";
	if( elementId )
		startDiv.id = elementId;
        startDiv.style.filter = "alpha(opacity=99)";
        startDiv.align = 'left';
        startDiv.style.position = 'relative';
        startDiv.style.top = '80px';
        startDiv.style.width = '944px';
        startDiv.className = 'starterList';
        startDiv.style.zIndex = '1001';
        startDiv.style.bottom = '';
        if( background ) {
                startDiv.style.background = background;
        }

         if( navigator.appName == 'Microsoft Internet Explorer') {

                var otherDiv = document.createElement('div');
                otherDiv.align = "center";
                otherDiv.id = "OtherDiv";
                otherDiv.appendChild(startDiv);
                otherDiv.style.position = "absolute";
                otherDiv.style.top = "0px";
                otherDiv.style.zIndex = '1010';
                otherDiv.style.width = "100%";
                body.appendChild(tintDiv);
                body.appendChild(otherDiv);


        }else{
                tintDiv.appendChild(startDiv);
                body.appendChild(tintDiv);
        }


}
	



function giveSpace(height) {

	var e = document.createElement("div");
	e.style.height = height + "px";

	return e;

}
var weburl = "http://preveoh.com:3080/z/";
var anonurl = "http://preveoh.com:3080/a/";
var signOutUrl = "http://preveoh.com:3080/";
var baseurl = "http://preveoh.com:3080/";

//define and variables that will be used thorughout
var contentPath = "/image_content/";
var imagesPath = "http://184.106.81.119/images/";


//this variable here is a global var used to designate if the profile was last called.
//it is helpful for nav functions.  if globalInProfile is true, then nav functions will call their display 
//variables in order to structure a feed and call profileusernav and ads.  If, however, globalInProfile is false, that
//indicates that the user out of the profile - so call functions can be used to save resources and time (not i
//re-call profile user nav or ads, etc)

var globalInProfile = false;

function underline_link(x) {
        var y = document.getElementById(x);
        y.className = "nav_link_hili";
}

/*The following two functions are depracated ways of underline and undecorating
 * lines of text, or any element for that matter.  As of Arpil 2013, some
 * of the old stuff under modules/Render/ depends on these.*/
function underlineLink(x) {
	var y = document.getElementById(x);
	y.style.textDecoration = "underline";
}

function undecorateLink(x) {
	var y = document.getElementById(x);
	y.style.textDecoration = "none";
}





/*landToPromptAccount nad callPromptAccount should be changed into obects....._*/
function landToPromptAccount() {
	


        //get values from hte form.
        var f = document.getElementById("FullName0");
        var p = document.getElementById("SetPassword0");
        var e = document.getElementById("Email0");

        var values = {};
        values['email'] = e.value;
        values['password'] = p.value;
        values['fullName'] = f.value;
	var w = new oblAccountPrompt({
		"guidance":"Join ourbucketlist.",
		"values":values
	});

        /*callPromptAccount(values);*/

}

function loginKeys(e) {
        if( e.keyCode == 13) {
                document.forms['LoginForm'].submit();
        }
}
//create the dialog
//var myDialog = new YAHOO.widget.Dialog("myQuestions");
/*





myDialog.cfg.queueProperty("postmethod", "form");

var handleSubmit = function() {
	this.submit(); };

var myButtons = ( [ { text:"Submit",
	handler:handleSubmit, isDefault:true } ]);

myDialog.cfg.queueProperty("buttons", myButtons);


*/




function oblAbout(code) {

	var curObj = this;
	curObj.stuff = oblC("d");

	var path = {};
	path['about_us']= baseurl + "about_us.html";
	path['advertising']= baseurl + "advertising.html";
	path['contact']= baseurl + "contact_us.html";
	path['careers']= baseurl + "careers.html";
	path['terms']= baseurl + "terms.html";
	path['privacy']= baseurl + "privacy.html";
	path['help']= baseurl + "about_us.html";

	this.show  = function() {

		var e = new oblFocusDiv({
			setclass:"yt_focusdiv"
		});
		e.getDiv().style.padding = "8px 8px 8px 8px";
		e.getDiv().appendChild(curObj.stuff);
		e.attach();
	};

	this.fetch = function() {
		  var request = newRequest();
                var url = path[code];//what was passed in as argument

                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
				curObj.stuff.innerHTML = request.responseText;
				curObj.show();

                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);
	};
	this.fetch();

}


function oblAccountPrompt(args) {
	/*this thing will present a candidate with a set of inputs to create a new account*/

	var curObj = this;

	var guidance = args.guidance;
	var values = args.values;

	var backing = oblC("d");

	var topSpan = oblC("s");
	topSpan.innerHTML = guidance;
	topSpan.className = "headingI";

	backing.appendChild(topSpan);
	backing.appendChild(giveSpace(25));

	var form = document.createElement("form");
	form.id = "NewAccount";
	form.enctype = "multipart/form-data";
	form.method = "post";
	form.action = "/a/create_account";

	var fn = new oblInput({
		"name":"full_name",
		"exp":"Full Name",
		"width":300,
		"thePar":form,
		"id":"FullName",
		"requirement":/\S/
	});
	form.appendChild(giveSpace(15));
	var un = new oblInput({
                "name":"username",
                "exp":"Choose a username",
                "width":300,
                "thePar":form,
		"id":"Username",
		"requirement":/^[A-Za-z0-9]{1,20}$/
        });
	this.ind = oblC("d");
	this.ind.style.color = "red";
	form.appendChild(curObj.ind);
	
	
	this.theInput = un.getInput();
	this.reportUsername = function(data) {
		if( data.available == 1 ) {
			curObj.usernameOk=1;
			curObj.ind.innerHTML = '';
		}else{
			curObj.usernameOk=0;
			un.setNotOk();
			curObj.ind.innerHTML = 'This username is not available';
		}
		
			

	


	};

	this.checkUsername = function() {
		var name = curObj.theInput.value;
		var request = newRequest();
	        var url = anonurl + "check_username_next?username=" + name;
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
					data = eval('(' + request.responseText + ')');
					curObj.reportUsername(data);

	                        }
	
	                }
	        };
	
	        //now send.  we'll be waiting...
	        request.send(null);
	};

			

	addListener("blur",curObj.theInput,curObj.checkUsername);
		

	form.appendChild(document.createElement("br"));
	var pw = new oblInput({
                "name":"password",
		"isPassword":1,
                "exp":"Password",
                "width":300,
                "thePar":form,
		"id":"SetPassword",
		"requirement":/\S/
        });
	form.appendChild(giveSpace(15));
	var em = new oblInput({
                "name":"email",
                "exp":"Email",
                "width":300,
                "thePar":form,
		"id":"Email",
		"requirement":/^[A-Za-z0-9\._\-\+]+@[A-Za-z0-9\-]+\.\w+\s*$/
        });
	form.appendChild(giveSpace(25));

	

	var bdaySel = oblC("d");
	
	form.appendChild(bdaySel);	
	


	var table = new oblTable(1,2);

	table.setRowClass = "gray_out";
	table.setCellClass = "gray_out";
	table.setClassName = "gray_out";

	table.addContent(0,0,form);
	/*a button to submit this*/

	var _handler = function() { 
		/*check each element (somehow)*/
		if( fn.contentCheck() == 0 ) {
			alert('There seems to be a problem with your Name');
			return;
		}
                if( un.contentCheck() == 0 ) {
                        alert('There seems to be a problem with your Username');
                        return;
                }
                if( pw.contentCheck() == 0 ) {
                        alert('There seems to be a problem with your Password');
                        return;
                }
                if( em.contentCheck() == 0 ) {
                        alert('There seems to be a problem with your Email address');
                        return;
                }
		if( curObj.usernameOk == 1 ) {
			form.submit();
		}
		
	};

	this.setValues = function() {
		fn.setValue(values['fullName']);
		em.setValue(values['email']);
		pw.setValue(values['password']);
		
		
	};
	
	var b = document.createElement("button");
	table.addContent(0,1,giveSpace(280));
	table.addContent(0,1,b);
	var B = new YAHOO.widget.Button(b);
	B.on("click",_handler);
	B.set("label",">> Next >>");

	backing.style.padding = "0px 0px 0px 25px";
	backing.appendChild(table.getTable());
	
	
	
	
	
	var it = new oblFocusDiv({
		"setclass":"yt_focusdiv"
	});
	it.getDiv().appendChild(backing);

	var request = newRequest();
        var url = anonurl + 'render_bday_select';
        request.open("GET",url,true);
        request.onreadystatechange = function() {
                       if( request.readyState == 4 ) {
                             if( request.status == 200 ) {
				bdaySel.innerHTML = request.responseText;
				it.attach();

                              }
                        }
                };
                //now send.  we'll be waiting...
        request.send(null);

	if (values )
		this.setValues();



	



}
function oblAgreement(args) {
	var curObj = this;
	this.thePar = args.thePar;
	var data;
	
	

	this.push = function(data) {
		curObj.thePar.innerHTML = data.agreement;
	};

	this.get = function() {
		var request = newRequest();
                var url = anonurl + 'get_agreement?title=' + args.title;
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        data = eval('(' + request.responseText + ')');
                                        curObj.push(data);

                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);
	};

	this.get();
}



function oblAppend(args) {
        var thePar = args[0];
        for(i=1;i<args.length;i++){
                thePar.appendChild(args[i]);
        }
}
	
			
			

function oblBearings(args) {
	var curObj  = this;
	var data = {};

	var request = newRequest();
        var url = weburl + "bearings";
        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                               data = eval('(' + request.responseText + ')');
                        }

                }
        };

	this.setGarden = function(pos) {
		curObj.inGarden = pos;
	};
	
	this.isInGarden = function() {
		return curObj.inGarden;
	};

	
		
		

        //now send.  we'll be waiting...
        request.send(null);


	var info = parseCookie();

	this.candy = info['Obl_candy'];
	this.secure = info['Obl_secure'];
	if(curObj.secure == "youho") {//this is set in Obl::Auth
		curObj.secure = 0;
		curObj.failed = 1;
	}
	this.lastLoginFailed = function() {
		return curObj.failed;
	};
	this.isUser = function() {
		if(curObj.candy == undefined) {
			return 0;
		}else{
			return 1;
		}
	};


	this.isBooked = function() {
		if( curObj.candy == "booked" )
			return 1;
		return 0;
	};
	
	this.isLoggedIn = function() {
		if( curObj.secure ) 
			return 1;
		return 0;
	};	
		
		
	this.isRegistered = function() {
		if( curObj.secure )   {
			return 1;
		}else{
			return 0;
		}
	};
	this.getUid = function() {
		return data.uid;
	};

	this.isTwitterRegistered = function() {
		return data.twitter_id;
	};
	this.getUsername = function() {
		return curObj.username;
	};
	this.getCandy = function() {
		return curObj.candy;
	};

	if( this.isUser ) {
		/*NOT SURE WHATS GOING ON HERE*/

		
	}


	/*return an array of season strings (e.g. "fallA12",...)*/
	this.getSeasonStrings = function() {
		return data.seasonStrings;
	};

	/*return an array of season dates going forward, in UNIX time*/
	/*the first data in this array is the end of the curent season
	we are in.  the next season follows, and so on.*/
	this.getSeasonDates = function() {
		return data.seasonDates;
	};

	this.alwaysP2fb = function() {
		if( data.always_p2fb == 1 ) {
			return 1;
		}else{
			return 0;
		}
	
	};
		

}


function oblBucketlist(args) {
	var curObj = this;
		
	var thePar = args.thePar;
	/*Clear out the parent if there is something there*/
	thePar.innerHTML = '';
	var data;
	var ownership = args.ownership;
	
	this.showEmpty = function() {
		var base = oblC("d");
		var head = document.createElement("h3");
		head.innerHTML = "No items have been added to this list!";
		
		var sug = oblC("s");
		sug.innerHTML = "Please use <b>Add New Journey</b> above to embark on a new journey.";
		base.appendChild(head);
		base.appendChild(sug);
		thePar.appendChild(base);
	};


	this.assemble = function(data) {

		if( data.jids.length == 0 ) {
			curObj.showEmpty();
			return;
		}
			

		for(i=0;i<data.jids.length;i++) {
			/*the listing is the main div for the item*/
			var listing = oblC("d");
			thePar.appendChild(listing);
			/*add an onhover listener for the listing.*/

			/*create a span to enclose any of the links which are to show only on hover*/
			var settingsRow = oblC("s");
	                settingsRow.className = "bucketlist_hover_menu";
			if(args.category == "ini") 
				settingsRow.className = "bucketlist_hover_menu_ini";
	
			//create the drop link (hover menu)


			
	                var settingsLink = document.createElement("a");
			settingsRow.appendChild(settingsLink);
	                var xImg = document.createElement("img");
			xImg.style.position = "relative";
			xImg.style.top = "3px";
	                xImg.src = imagesPath + "sprocket_small.png";
	                var dropText = document.createTextNode(" Change");
	                settingsLink.appendChild(xImg);
	                settingsLink.appendChild(dropText);
	                 //add listener to current drop link to get it to drop current item
			addListener("mouseover",listing,(function(c) {
				return function(blah) {
					c.style.visibility = "visible";
				};
			})(settingsRow));
			addListener("mouseout",listing,(function(c) {
                                return function(blah) {
                                        c.style.visibility = "hidden";
                                };
                        })(settingsRow));
			addListener("click",settingsLink,(function(c) {
                                return function(blah) {
					/*prompt to change this*/
					var e = new oblEmbarkmentProposition({
						update:true,
						eid:c
					});
                                };
                        })(data.eids[i]));

			/*if this is an initiatives blist, lets add an option
			for the user to declare themselves a leader*/
			if(args.category == "ini") {
				var limg = oblC("i",imagesPath + "leader_star.png");
				limg.style.position = "relative";
				limg.style.top = "4px";
				var llink = oblC("a");
				llink.style.position = "relative";
				llink.style.left = "15px";
				llink.appendChild(limg);
				var ltext = document.createTextNode(" Declare Leadership");
				llink.appendChild(ltext);
				addListener("click",llink,(function(c) {
					return function(blah) {
						var e = new oblLeaderChallenge({
							"uid":args.uid,
							"jid":c
						});
					};
				})(data.jids[i]));
				settingsRow.appendChild(llink);
			}
			
			


			var itow = document.createElement("h3");
			itow.innerHTML = "I want to " + data.itows[i];
			var iLink = oblC("a");
			iLink.appendChild(itow);
			addListener("click",iLink,(function(c) {
				return function(blah){
					navConcourse(c);	
				};
			})(data.jids[i]));
			listing.appendChild(iLink);
			var bCont = oblC("s");
			listing.appendChild(bCont);

			/*The Attach menu*/
			var aMenuItemClick = (function(c) {
				 return function(p_sType,p_Args,p_oItem) {
                                        var sText = p_oItem.cfg.getProperty("text");
				/*this should be changed to a method of the bucketlist class*/
				/*this method should instantiate another object, a Attach object__*/
						displayAttach(sText,0,c);
				};
			})(data.jids[i]);
			var aMenuItemData;
			if(data.category == "ini") {
				aMenuItemData = [
				{text: "Question",value: data.jids[i], onclick: { fn: aMenuItemClick } },
				{text: "Picture",value: data.jids[i], onclick: { fn: aMenuItemClick } },
				{text: "Link",value: data.jids[i], onclick: { fn: aMenuItemClick } },
				{text: "Note",value: data.jids[i], onclick: { fn: aMenuItemClick } },
				 {text: "Petition",value: data.jids[i], onclick: { fn: aMenuItemClick } }

			];
			}else{
				 aMenuItemData = [
                                {text: "Question",value: data.jids[i], onclick: { fn: aMenuItemClick } },
                                {text: "Picture",value: data.jids[i], onclick: { fn: aMenuItemClick } },
                                {text: "Link",value: data.jids[i], onclick: { fn: aMenuItemClick } },
                                {text: "Note",value: data.jids[i], onclick: { fn: aMenuItemClick } }
                        ];
	



			}
			var aMenuButton = new YAHOO.widget.Button({
				type:"menu",
				label:"Attach",
				menu: aMenuItemData,
				container:bCont
			});
			 /*The Conclude menu*/
			if( ownership ) {
	                        var cMenuItemClick = (function(c) {
					return function(p_sType,p_Args,p_oItem) {
	                                	var sText = p_oItem.cfg.getProperty("text");
		                                /*this should be changed to a method of the bucketlist class*/
		                                /*this method should instantiate another object, a Attach object__*/
							if( sText == "Triumph!" ) {
								/*CHANGE THIS TO OO WAY*/
								callPromptTriumph(c);
							}else{
								callDropJourney(c);
							}
						};
				})(data.jids[i]);
	
	                        var cMenuItemData = [
	                                {text: "Triumph!",value: data.jids[i], onclick: { fn: cMenuItemClick } },
	                                {text: "Drop",value: data.jids[i], onclick: { fn: cMenuItemClick } },
	                        ];
	                        var cMenuButton = new YAHOO.widget.Button({
	                                type:"menu",
	                                label:"Conclude",
	                                menu: cMenuItemData,
	                                container:bCont
	                        });
			}
		
			 /*The Inivte menu*/
                        var iMenuItemClick = (function(c,iteration) {
				 return function(p_sType,p_Args,p_oItem) {
	                                var sText = p_oItem.cfg.getProperty("text");
					/*make this a method of this class__*/
					if( sText == "via Email") {
						displayInvite(sText,c);
					}else{
						curObj.tweetInvite(iteration);
					}
				};
			})(data.eids[i],i);


                        var iMenuItemData = [
                                {text: "via Twitter",value: data.jids[i], onclick: { fn: iMenuItemClick } },
                                {text: "via Email",value: data.jids[i], onclick: { fn: iMenuItemClick } },
                        ];
                        var iMenuButton = new YAHOO.widget.Button({
                                type:"menu",
                                label:"Invite",
                                menu: iMenuItemData,
                                container:bCont
                        });

			/*click to go to the JFeed*/
			addListener("click",itow,(function(c) {
                                return function(blah) {
                                        navConcourse(c);
                                };
                        })(data.jids[i]));

			/*how many users are on said item*/
			var narrative = oblC("s");
			
			var nar = oblC("s");
			narrative.className = "journey_count_narrative";
			if(args.category == "ini")
				narrative.className = "journey_count_narrative_ini"; 
			if( data.counts[i] > 1 ) {
				nar.innerHTML = "There are ";
			}else{
				nar.innerHTML = "There is ";
			}
			var theC = oblC("s");
			theC.className = "journey_count";
			theC.innerHTML = data.counts[i];
			narrative.appendChild(nar);
			narrative.appendChild(theC);
			var end = oblC("s");
			if(data.counts[i] > 1) {
				end.innerHTML = " users on this journey.";
			}else{
				end.innerHTML = " user on this journey.";
			}
			narrative.appendChild(end);
			/*add the settings link element to the listing*/
			listing.appendChild(settingsRow);
			/*add the user count to the listing*/
			listing.appendChild(narrative);
			
			var sep = oblC("i",imagesPath + "gray_separator.gif");
			sep.style.padding = "10px 0px 10px 0px";
			listing.appendChild(sep);
			
			
		}

		


	};


	this.tweetInvite = function(i) {

		var msg = "I want to " + data.itow[i] + " Join me at " + anonurl + "i?id=" + data.eid[i] + " !";
		var t = new oblTwitterPrompt({
			tweet:msg
		});
			
	
	};
		
	this.fetch = function() {
		var request = newRequest();
                var id = globalBearings.getUid();
		var url;
		if( args.season ) {
               	 	url = weburl + "get_bucketlist?uid=" + args.uid + ";sea=" + args.season;
		}else{
			url = weburl + "get_bucketlist?uid=" + args.uid + ";cat=" + args.category;
		}
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        data = eval('(' + request.responseText + ')');
                                        curObj.assemble(data);

                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);
	};


	this.fetch();
}


function oblCenterFooter(parE) { //this is an area in which all elements will be centered.  useful for footers containing buttons

	var curObj = this;

	var a = document.createElement("div");
	a.align = "center";

	this.addContent = function(c) {
		a.appendChild(c);
	};

	parE.appendChild(a);
}

function oblC(parameter,option) {
	var e;
	switch( parameter ) {
		case "a":
			e = document.createElement("a");
			break;
		case "d":
			e = document.createElement("div");
			if( option ) e.className = option;
			break;
		case "s":
			e = document.createElement("span");
			if( option ) e.className = option;
			break;
		case "i":
			e = document.createElement("img");
			if(option)	
				e.src = option;
			break;
		default:
			/*allow us to create text node*/
			e = document.createTextNode(parameter);
			break;
	}

	return e;
}

function oblConnexList(args) {
        var curObj = this;
        var id = args.id;
        var thePar = args.thePar;
	thePar.innerHTML = '';
	var data;
	var localData;



	var tabs = new YAHOO.widget.TabView(thePar,{activeIndex: 0} );

	tabs.addTab( new YAHOO.widget.Tab({
                        label: 'All',
                        content: '<div id="connexTab"></div>',
                        active: true
                }));

	 tabs.addTab( new YAHOO.widget.Tab({
                        label: 'In my area',
                        content: '<div id="localTab"></div>',
                        active: false
                }));

	this.promptPostal = function() {
		var e = oblC("d");
		e.style.position = "relative";
		e.left = "50px";
	
		var promptS = oblC("s");
		promptS.innerHTML =  "We don't know where you are. <br>  Please add your zip code in order to see who is near by you!";
		e.appendChild(giveSpace(50));
		e.appendChild(promptS);
		e.appendChild(giveSpace(25));
		
		var zipI = new oblInput({
			"name":"value",
			"thePar":e,
			"requirement":/\d/
		});
	

		var net = new oblInputNet([zipI]);
		net.setPostUrl("update_profile");
		net.addPair("dir","postal");
		var _callback = function() {
			curObj.refresh();
		};
		net.setCallback(_callback);

		var bDiv = oblC("d");
		e.appendChild(giveSpace(25));
		e.appendChild(bDiv);
		var but = new YAHOO.widget.Button(bDiv);
		but.set("label","Add my zip!");
		but.on("click",net.post);

		var t = document.getElementById("localTab");
		t.appendChild(e);
		
		
		

	};



	
	
	this.assembleLocal = function(localData) {
		if( !localData.postal ) {
			curObj.promptPostal();
			return;
		}
		for(var i=0;i<localData.uids.length;i++) {
                        var lilTable = new oblTable(1,2);
                        var picLink = oblC("a");
                        addListener("click",picLink,(function(c) {
                                return function(blah) {
                                        navProfile(c);
                                };
                        })(localData.uids[i]));
                        var picture = document.createElement("img");
                        picLink.appendChild(picture);
                        picture.src = contentPath + "user" + localData.uids[i] + "_thumb.jpg";
                        lilTable.addContent(0,0,picLink);
                        var nameS = document.createElement("span");
                        nameS.className = "name";
                        nameS.innerHTML = localData.names[i];
                        lilTable.addContent(0,1,nameS);
                        var usernameS = document.createElement("span");
                        var unL = oblC("a");
                        addListener("click",unL,(function(c) {
                                return function(blah) {
                                        navProfile(c);
                                };
                        })(localData.uids[i]));
                        unL.appendChild(usernameS);
                        usernameS.className = "profile_username";
                        usernameS.innerHTML = "@" + localData.usernames[i];
                        lilTable.addContent(0,1,document.createElement("br"));
                        lilTable.addContent(0,1,unL);
                        var locationS = document.createElement("span");
                        locationS.className = "location";
                        locationS.innerHTML = localData.locations[i];
                        lilTable.addContent(0,1,document.createElement("br"));
                        lilTable.addContent(0,1,locationS);
                        var listingT = lilTable.getTable();
                        listingT.style.display = "inline";
                        document.getElementById("localTab").appendChild(listingT);
                }



	};

        this.assemble = function(data) {
                for(var i=0;i<data.uids.length;i++) {
                        var lilTable = new oblTable(1,2);
                        var picLink = oblC("a");
                        addListener("click",picLink,(function(c) {
                                return function(blah) {
                                        navProfile(c);
                                };
                        })(data.uids[i]));
                        var picture = document.createElement("img");
                        picLink.appendChild(picture);
                        picture.src = contentPath + "user" + data.uids[i] + "_thumb.jpg";
                        lilTable.addContent(0,0,picLink);
                        var nameS = document.createElement("span");
                        nameS.className = "name";
                        nameS.innerHTML = data.names[i];
                        lilTable.addContent(0,1,nameS);
                        var usernameS = document.createElement("span");
                        var unL = oblC("a");
                        addListener("click",unL,(function(c) {
                                return function(blah) {
                                        navProfile(c);
                                };
                        })(data.uids[i]));
                        unL.appendChild(usernameS);
                        usernameS.className = "profile_username";
                        usernameS.innerHTML = "@" + data.usernames[i];
                        lilTable.addContent(0,1,document.createElement("br"));
                        lilTable.addContent(0,1,unL);
                        var locationS = document.createElement("span");
                        locationS.className = "location";
                        locationS.innerHTML = data.locations[i];
                        lilTable.addContent(0,1,document.createElement("br"));
                        lilTable.addContent(0,1,locationS);
			var listingT = lilTable.getTable();
			listingT.style.display = "inline";
			document.getElementById("connexTab").appendChild(listingT);
                }
        };
	

	this.fetch = function() {
                 var request = newRequest();
		var id = globalBearings.getUid();
                var url = weburl + 'get_connex_list?uid=' + id;
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        data = eval('(' + request.responseText + ')');
                                        curObj.assemble(data);

                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);


        };

	this.fetchLocal = function() {
                 var request = newRequest();
                var id = globalBearings.getUid();
                var url = weburl + 'get_connex_list?uid=' + id + ";dir=local";
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        localData = eval('(' + request.responseText + ')');
                                        curObj.assembleLocal(localData);

                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);


        };

        this.refresh = function() {
		document.getElementById("connexTab").innerHTML = '';
		document.getElementById("localTab").innerHTML = '';
		curObj.fetch();
		curObj.fetchLocal();
        };

        this.fetch();
	this.fetchLocal();
}




//ourbucketlist UI objects

function oblConspicuousInput(name) {
        var inp = document.createElement("input");
        inp.name = name;
        inp.type = "text";
	inp.className = "conspicuous_input";

        this.getInput = function() {
                return inp;
        };
}

function oblConversation(type,iid,domPar,parentObject) {
	var curObj = this;
	var data;
	var pd;

	
	this.submitComment = function() {
		var values = {};
		values['comment'] = curObj.cInput.value;
		values['type'] = type;
		values['iid'] = iid;

		var _func = function(){
			curObj.reload();
		};

		var addUrl = weburl + "add_comment";
		standardPost(addUrl,values,_func);
	};
	function commentKeys(e) {
		if( e.keyCode == 13 ) 
			curObj.submitComment();
	}
	
			
		

	this.assemble = function() {
	
		pd = document.createElement("div");
		pd.className = "conversation_div";

		
	
		/*If the current user has liked this, change the state of the parent object such that 
		an "unlike" option is immediately available. */
		if( data.likes.usernames[0] == "You" ) {
			if( parentObject ) //for some instances, there is no parentObject (outisde a feed)
				parentObject.isLiked();
		}
		
	

		//create the upper portion - where likes are shown.
		//the likes are in the data.

		var topDiv = document.createElement("div");
		topDiv.className = "comment_block_top";
		var likesSpan = document.createElement("span");

		switch( data.likes.uids.length ) {
			case 0:
				break;
			case 1:

				/*If the first user to like it is you, the conjugation of the word like
				must be changed. */
				var verbage = " likes this.";
				if( data.likes.usernames[0] == "You" ) 
					verbage = " like this.";
				
	
                		var likeImage = document.createElement("img");
		                likeImage.src = imagesPath + "thumb_up.png";
				likeImage.className = "thumbs_up_image";
				topDiv.appendChild(likeImage);
				var firstLikerLink = document.createElement("a");
				setUnderline(firstLikerLink);

				addListener("click",firstLikerLink,(function() {
					
					navProfile(data.likes.uids[0]);
				}));
				firstLikerLink.innerHTML = data.likes.usernames[0];
				topDiv.appendChild(firstLikerLink);	
				topDiv.appendChild(document.createTextNode(verbage));
				pd.appendChild(topDiv);
				break;
			case 2:

				var likeImage = document.createElement("img");
				likeImage.className = "thumbs_up_image";
                                likeImage.src = imagesPath + "thumb_up.png";
                                topDiv.appendChild(likeImage);

				var firstLikerLink = document.createElement("a");
				setUnderline(firstLikerLink);
                                addListener("click",firstLikerLink,(function() {
                                        navProfile(data.likes.uids[0]);
                                }));
                                firstLikerLink.innerHTML = data.likes.usernames[0];
                                topDiv.appendChild(firstLikerLink);
	
				topDiv.appendChild(document.createTextNode(" and "));
				var secondLikerLink = document.createElement("a");
				setUnderline(secondLikerLink);
				addListener("click",secondLikerLink,(function() {
                                        navProfile(data.likes.uids[1]);
                                }));
                                secondLikerLink.innerHTML = data.likes.usernames[1];
                                topDiv.appendChild(secondLikerLink);	
				topDiv.appendChild(document.createTextNode(" like this."));

				
				pd.appendChild(topDiv);
                                break;
			default:
				 var likeImage = document.createElement("img");
				likeImage.className = "thumbs_up_image";
                                likeImage.src = imagesPath + "thumb_up.png";
                                topDiv.appendChild(likeImage);

				var firstLikerLink = document.createElement("a");
				setUnderline(firstLikerLink);
                                addListener("click",firstLikerLink,(function() {
                                        navProfile(data.likes.uids[0]);
                                }));
                                firstLikerLink.innerHTML = data.likes.usernames[0];
                                topDiv.appendChild(firstLikerLink);

                                topDiv.appendChild(document.createTextNode(" and "));
                                var secondLikerLink = document.createElement("a");
				setUnderline(secondLikerLink);
                                addListener("click",secondLikerLink,(function() {
                                        navProfile(data.likes.uids[1]);
                                }));
                                secondLikerLink.innerHTML = data.likes.usernames[1];
                                topDiv.appendChild(secondLikerLink);
				var num = data.likes.uids.length - 2;
                                topDiv.appendChild(document.createTextNode(" and " + num + " others like this."));
				pd.appendChild(topDiv);

				
				
				break;
		}

		var topSpace = document.createElement("div");
		topSpace.style.height = "2px";
		topSpace.style.overflow = "hidden";
		pd.appendChild(topSpace);

			

		for(var i=0;i<data.conversation.length;i++) {
			
			//create a div with the right background
	
			var blockDiv = document.createElement("div");
			blockDiv.className = "comment_block";
			//create a table
			var cTable = new oblTable(1,3);
			cTable.setRowClass(0,"conversation_table");
			cTable.setCellClass(0,1,"conversation_table_column_2");
	
			var ownerPicLink = document.createElement("a");
			addListener("click",ownerPicLink,(function(c) {
	                        return function(blah) {
	                                navProfile(c);
	                        };
	                })(data.owners[i]));
			var ownerPic = document.createElement("img");
			ownerPic.src = "/image_content/micro" + data.owners[i] + ".jpg";
			ownerPicLink.appendChild(ownerPic);
			
			cTable.addContent(0,0,ownerPicLink);
			var unt = document.createElement("a");
			setUnderline(unt);
			addListener("click",unt,(function(c) {
	                        return function(blah) {
	                                navProfile(c);
	                        };
	                })(data.owners[i]));
		
			unt.className = "comment_username_text";
			unt.innerHTML = data.owner_names[i];
			var text = document.createElement("span");
			text.innerHTML = ' ' + data.conversation[i];
			var ts = document.createElement("span");
			ts.className  = "time_stamp";
			ts.innerHTML = data.time_stamps[i];
	
			cTable.addContent(0,1,unt);
			cTable.addContent(0,1,text);
			cTable.addContent(0,1,document.createElement("br"));
			cTable.addContent(0,1,ts);
			var dropLink = document.createElement("a");
			dropLink.className = "post_menu";
			dropLink.innerHTML = "X";
			
			addListener("mouseover",blockDiv,(function(dropLink) {
	                        return function(blah) {
	                                dropLink.style.visibility = "visible";
	                        };
	                })(dropLink));
	                addListener("mouseout",blockDiv,(function(dropLink) {
	                        return function(blah) {
	                                dropLink.style.visibility = "hidden";
	                        };
	                })(dropLink));
	                //add listener to current drop link to get it to drop current item
	                addListener("click",dropLink,(function(c) {
	                        return function(blah) {
	                                dropItem("comment",c);
	                        };
	                })(data.cids[i]));
	
			cTable.addContent(0,2,dropLink);
	
		
			blockDiv.appendChild(cTable.getTable());
			var sp = document.createElement("div");
			sp.style.height = "2px";
			sp.style.overflow = "hidden";
			pd.appendChild(blockDiv);
			pd.appendChild(sp);
	
			//add the like stuff	
		}

		/*Now add an input to allow for adding a comment*/
		var addCommentDiv = document.createElement("div");
		addCommentDiv.className = "comment_block_bottom";
		curObj.cInput = document.createElement("input");
		var cInput = curObj.cInput;
		cInput.className = "comment";
		addListener("keydown",cInput,(function(e) {
			commentKeys(e);
		}));
		
		addCommentDiv.appendChild(cInput);
		pd.appendChild(addCommentDiv);
		domPar.appendChild(pd);
	};

	this.load = function() {
		var request = newRequest();
	        var url = weburl + 'get_conversation?type=' + type + ';iid=' + iid;
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
	                                data = eval('(' + request.responseText + ')');
	                                curObj.assemble(data);
	
	                        }
	                }
	        };
	        //now send.  we'll be waiting...
	        request.send(null);
	};

	this.reload = function() {
		//firt remove stuf from the dom.  is there a better way to do this?_
		domPar.removeChild(pd);
		//then load.
		curObj.load();
	};

	

	this.load();

	


}

function oblDeprecatedConversation(type,iid,domPar,parentObject) {
	var curObj = this;
	var data;
	var pd;

	
	this.submitComment = function() {
		var values = {};
		values['comment'] = curObj.cInput.value;
		values['type'] = type;
		values['iid'] = iid;

		var _func = function(){
			curObj.reload();
		};

		var addUrl = weburl + "add_comment";
		standardPost(addUrl,values,_func);
	};
	function commentKeys(e) {
		if( e.keyCode == 13 ) 
			curObj.submitComment();
	}
	
			
		

	this.assemble = function() {
	
		pd = document.createElement("div");
		pd.className = "conversation_div";
		pd.style.left = "120px";

		
	
		/*If the current user has liked this, change the state of the parent object such that 
		an "unlike" option is immediately available. */
		if( data.likes.usernames[0] == "You" ) {
			if( parentObject ) //for some instances, there is no parentObject (outisde a feed)
				parentObject.isLiked();
		}
		
	

		//create the upper portion - where likes are shown.
		//the likes are in the data.

		var topDiv = document.createElement("div");
		topDiv.className = "comment_block_top";
		var likesSpan = document.createElement("span");

		switch( data.likes.uids.length ) {
			case 0:
				break;
			case 1:

				/*If the first user to like it is you, the conjugation of the word like
				must be changed. */
				var verbage = " likes this.";
				if( data.likes.usernames[0] == "You" ) 
					verbage = " like this.";
				
	
                		var likeImage = document.createElement("img");
		                likeImage.src = imagesPath + "thumb_up.png";
				likeImage.className = "thumbs_up_image";
				topDiv.appendChild(likeImage);
				var firstLikerLink = document.createElement("a");
				setUnderline(firstLikerLink);

				addListener("click",firstLikerLink,(function() {
					
					navProfile(data.likes.uids[0]);
				}));
				firstLikerLink.innerHTML = data.likes.usernames[0];
				topDiv.appendChild(firstLikerLink);	
				topDiv.appendChild(document.createTextNode(verbage));
				pd.appendChild(topDiv);
				break;
			case 2:

				var likeImage = document.createElement("img");
				likeImage.className = "thumbs_up_image";
                                likeImage.src = imagesPath + "thumb_up.png";
                                topDiv.appendChild(likeImage);

				var firstLikerLink = document.createElement("a");
				setUnderline(firstLikerLink);
                                addListener("click",firstLikerLink,(function() {
                                        navProfile(data.likes.uids[0]);
                                }));
                                firstLikerLink.innerHTML = data.likes.usernames[0];
                                topDiv.appendChild(firstLikerLink);
	
				topDiv.appendChild(document.createTextNode(" and "));
				var secondLikerLink = document.createElement("a");
				setUnderline(secondLikerLink);
				addListener("click",secondLikerLink,(function() {
                                        navProfile(data.likes.uids[1]);
                                }));
                                secondLikerLink.innerHTML = data.likes.usernames[1];
                                topDiv.appendChild(secondLikerLink);	
				topDiv.appendChild(document.createTextNode(" like this."));

				
				pd.appendChild(topDiv);
                                break;
			default:
				 var likeImage = document.createElement("img");
				likeImage.className = "thumbs_up_image";
                                likeImage.src = imagesPath + "thumb_up.png";
                                topDiv.appendChild(likeImage);

				var firstLikerLink = document.createElement("a");
				setUnderline(firstLikerLink);
                                addListener("click",firstLikerLink,(function() {
                                        navProfile(data.likes.uids[0]);
                                }));
                                firstLikerLink.innerHTML = data.likes.usernames[0];
                                topDiv.appendChild(firstLikerLink);

                                topDiv.appendChild(document.createTextNode(" and "));
                                var secondLikerLink = document.createElement("a");
				setUnderline(secondLikerLink);
                                addListener("click",secondLikerLink,(function() {
                                        navProfile(data.likes.uids[1]);
                                }));
                                secondLikerLink.innerHTML = data.likes.usernames[1];
                                topDiv.appendChild(secondLikerLink);
				var num = data.likes.uids.length - 2;
                                topDiv.appendChild(document.createTextNode(" and " + num + " others like this."));
				pd.appendChild(topDiv);

				
				
				break;
		}

		var topSpace = document.createElement("div");
		topSpace.style.height = "2px";
		topSpace.style.overflow = "hidden";
		pd.appendChild(topSpace);

			

		for(var i=0;i<data.conversation.length;i++) {
			
			//create a div with the right background
	
			var blockDiv = document.createElement("div");
			blockDiv.className = "comment_block";
			//create a table
			var cTable = new oblTable(1,3);
			cTable.setRowClass(0,"conversation_table");
			cTable.setCellClass(0,1,"conversation_table_column_2");
	
			var ownerPicLink = document.createElement("a");
			addListener("click",ownerPicLink,(function(c) {
	                        return function(blah) {
	                                navProfile(c);
	                        };
	                })(data.owners[i]));
			var ownerPic = document.createElement("img");
			ownerPic.src = "/image_content/micro" + data.owners[i] + ".jpg";
			ownerPicLink.appendChild(ownerPic);
			
			cTable.addContent(0,0,ownerPicLink);
			var unt = document.createElement("a");
			setUnderline(unt);
			addListener("click",unt,(function(c) {
	                        return function(blah) {
	                                navProfile(c);
	                        };
	                })(data.owners[i]));
		
			unt.className = "comment_username_text";
			unt.innerHTML = data.owner_names[i];
			var text = document.createElement("span");
			text.innerHTML = ' ' + data.conversation[i];
			var ts = document.createElement("span");
			ts.className  = "time_stamp";
			ts.innerHTML = data.time_stamps[i];
	
			cTable.addContent(0,1,unt);
			cTable.addContent(0,1,text);
			cTable.addContent(0,1,document.createElement("br"));
			cTable.addContent(0,1,ts);
			var dropLink = document.createElement("a");
			dropLink.className = "post_menu";
			dropLink.innerHTML = "X";
			
			addListener("mouseover",blockDiv,(function(dropLink) {
	                        return function(blah) {
	                                dropLink.style.visibility = "visible";
	                        };
	                })(dropLink));
	                addListener("mouseout",blockDiv,(function(dropLink) {
	                        return function(blah) {
	                                dropLink.style.visibility = "hidden";
	                        };
	                })(dropLink));
	                //add listener to current drop link to get it to drop current item
	                addListener("click",dropLink,(function(c) {
	                        return function(blah) {
	                                dropItem("comment",c);
	                        };
	                })(data.cids[i]));
	
			cTable.addContent(0,2,dropLink);
	
		
			blockDiv.appendChild(cTable.getTable());
			var sp = document.createElement("div");
			sp.style.height = "2px";
			sp.style.overflow = "hidden";
			pd.appendChild(blockDiv);
			pd.appendChild(sp);
	
			//add the like stuff	
		}

		/*Now add an input to allow for adding a comment*/
		var addCommentDiv = document.createElement("div");
		addCommentDiv.className = "comment_block_bottom";
		curObj.cInput = document.createElement("input");
		var cInput = curObj.cInput;
		cInput.className = "comment";
		addListener("keydown",cInput,(function(e) {
			commentKeys(e);
		}));
		
		addCommentDiv.appendChild(cInput);
		pd.appendChild(addCommentDiv);
		domPar.appendChild(pd);
	};

	this.load = function() {
		var request = newRequest();
	        var url = weburl + 'get_conversation?type=' + type + ';iid=' + iid;
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
	                                data = eval('(' + request.responseText + ')');
	                                curObj.assemble(data);
	
	                        }
	                }
	        };
	        //now send.  we'll be waiting...
	        request.send(null);
	};

	this.reload = function() {
		//firt remove stuf from the dom.  is there a better way to do this?_
		domPar.removeChild(pd);
		//then load.
		curObj.load();
	};

	

	this.load();

	


}

function oblDeprecatedFeed(jid,thePar) {


	/*For now, all LeaderDisplays will show themselves in this particualr span, 
	with this particular ID. This is a hack to adapt the LeaderDisplay to 
	the old, non-OO way of displaying JFeeds.*/
		
	
	var curObj = this;

	//If jid is 0 this is considered to be a Home feed.
	var isHome = 0;
	if( jid == 0 )
		isHome = 1;


	this.showEmpty = function() {

		/*What is shown if the user has no action in their newsfeed */
		var feed = document.getElementById("feed");

		var title = document.createElement("span");
		title.style.fontSize = "20px";
		title.innerHTML = "How to use Ourbucketlist:";

		var i1 = document.createElement("img");
		i1.style.padding = "0px 5px 0px 0px";
		i1.src = imagesPath + "pointer_out.gif";

		var first = document.createElement("span");
		first.style.fontSize = "20px";
		first.innerHTML = "there nothing in your Blist bruh <br>  FIX THIS LAME EMPY NOTICATION TO SOMETHING GANGSTER  .";
		var firstE = document.createElement("span");
		
		
		
		var second = document.createElement("span");
		second.style.fontSize = "20px";
		second.innerHTML  = "Post questions or content to a item.";
		var secondE = document.createElement("span");

		var third = document.createElement("span");	
		third.style.fontSize = "20px";
		
	
		var thirdE = document.createElement("span");

		

		var i2 = document.createElement("img");
		i2.style.padding = "0px 5px 0px 0px";
	                i2.src = imagesPath + "pointer_out.gif";

		var i3 = document.createElement("img");
		i3.style.padding = "0px 5px 0px 0px";
                i3.src = imagesPath + "pointer_out.gif";

		var jefe = document.createElement("div");
		jefe.appendChild(document.createElement("br"));
		jefe.className = "empty_feed_clue_backing";

		jefe.appendChild(title);
		jefe.appendChild(document.createElement("br"));
		jefe.appendChild(document.createElement("br"));
		
		jefe.appendChild(i1);
		jefe.appendChild(first);
		jefe.appendChild(firstE);
		jefe.appendChild(document.createElement("br"));
		jefe.appendChild(document.createElement("br"));
		jefe.appendChild(i2);
		jefe.appendChild(second);
		jefe.appendChild(secondE);
		jefe.appendChild(document.createElement("br"));
		jefe.appendChild(document.createElement("br"));
		jefe.appendChild(i3);
		jefe.appendChild(third);
		jefe.appendChild(thirdE);
	

		feed.appendChild(jefe);
	};



	//first, get the feed data from the server
	var jefe = document.createElement("div");

	this.showLeader = function() {
		 /*This is to dispaly leader information
                (show a oblLeaderDisplay)*/
		if( data.leaderId )
                        var disp = new oblLeaderDisplay({
                                uid:data.leaderId,
                                username:data.leaderUsername
                        });
	};

	var _assemble = function(data) {
		var feed = thePar; //this is "feed" unless changed.
		feed.innerHTML = '';
		/*try to display leader info if this is a JFeed*/
		if( jid != 0 )
			curObj.showLeader();


		/*if the data we got is emtpy, presumably the user has not embarked on any journeys.
		so, run showEmpty to explain to this (presumably) new user how to get around the site.*/
		
		if( data.types.length == 0 )
			curObj.showEmpty();
			/*using data.types as a measurement of array length. 
			could have used any of the arrays under data*/
	        for(var i=0;i<data.types.length;i++) {
	
			/*This loop should go though the data of posts and create post objects as needed
			These objects each are aware of their parent and attach themselves to the DOM*/

			/*if this is a reply skip it for now_*/		
			if( data.types[i] == "reply" )
				continue;

			var isLeader;	
			if(data.uids[i] == data.leaderId)
				isLeader = true;
			
			var post = new oblDeprecatedPost({
				"username" : data.owners[i],
				"uid":	data.uids[i],
				"type": data.types[i],
				"iid": data.iids[i],
				"jid": data.jids[i],
				"itow": data.itowHash[data.jids[i]],
				"collateral": data.collateralli[i],
				"timestamp" : data.timestamps[i],
				"preview": data.previews[i],
				"parent": jefe,
				"isHome": isHome,
				"question":data.questions[i],
				triPicCount:data.triPicCounts[i],
				byLeader:isLeader
				
			});
		}


	feed.appendChild(jefe);
	
	};


	var request = newRequest();
	var url;
	if( isHome ) {
	        url = weburl + 'get_home';
	}else{
	        url = weburl + 'get_journey_feed?jid=' + jid;
	}
        request.open("GET",url,true);
        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                data = eval('(' + request.responseText + ')');
				_assemble(data);
				
			}
                }
        };
        //now send.  we'll be waiting...
        request.send(null);
}
function oblDeprecatedPost(args) {
		var curObj = this;
		//this indicates if this post belongs to a Home feed or a not (then a jFeed).
		var isHome = args.isHome;

		this.byLeader = args.byLeader;



		this.isLiked = function() {
			ll.innerHTML = "Unlike";
                        //first remove the current event listener.  this is (apparently done by using null)
                        removeListener("click",ll,_like);
                        //then add an unlike method
                        addListener("click",ll,_unlike);
		};
		
		this.isNotLiked = function() {
			ll.innerHTML = "Like";
                        //first remove the current event listener.  this is (apparently done by using null)
                        removeListener("click",ll,_unlike);
                        //then add an unlike method
                        addListener("click",ll,_like);
		};


			

		//method to like the current post.		
		this.like = function() {

			
			var replyCallBack = function() {
				curObj.isLiked();
				curObj.convo.reload();
			};
			var likeUrl = weburl + "like";
			var values = {};
			values['type'] = args.type;
			values['iid'] = args.iid;
	
			standardPost(likeUrl,values,replyCallBack);
		};
		
		 //method to like the current post.              
                this.unlike = function() {

                        var replyCallBack = function() {
				curObj.isNotLiked();
				curObj.convo.reload();
                        };
                        var unlikeUrl = weburl + "unlike";
                        var values = {};
                        values['type'] = args.type;
                        values['iid'] = args.iid;

                        standardPost(unlikeUrl,values,replyCallBack);
                };

		var _like = function() { curObj.like(); };
		var _unlike = function() { curObj.unlike(); };

		


		

		//Create the parent div for the post.  All elements are children of this div
 		var pd = document.createElement("div");

		//create the drop link (hover menu)
                var dropLink = document.createElement("a");
                dropLink.className = "post_hover_menu";
                var xImg = document.createElement("img");
                xImg.src = imagesPath + "delete_logo.png";
                var dropText = document.createTextNode(" Remove");
                dropLink.appendChild(xImg);
                dropLink.appendChild(dropText);
		 //add listener to current drop link to get it to drop current item
                addListener("click",dropLink,(function(c) {
                                dropItem(args.type,args.iid);
                }));
		addListener("mouseover",pd,(function() {
                                dropLink.style.visibility = "visible";
                }));
                addListener("mouseout",pd,(function() {
                                dropLink.style.visibility = "hidden";
                }));


        	//this in effect is just a gray line to separate the post from the above post.        
                var sep1 = document.createElement("div");
		sep1.className = "separator_one";

                //the user's picture.  onclick should go to their profile.
                var picLink = document.createElement("a");
                addListener("click",picLink,(function() {
                                navProfile(args.uid);
                }));
                var picture = document.createElement("img");
                var pic_url = contentPath + "user" + args.uid + "_thumb.jpg";
                picture.src = pic_url;
                picLink.appendChild(picture);

		/*The emblem of a leader.  Show this
		only if the poster is the leader*/
		var leaderEmblem;
		if( curObj.byLeader ) {
			leaderEmblem = oblC("i",imagesPath + "leader_star.png");
			leaderEmblem.className = "feed_leader_emblem";
		}

		//the username text. (unt).  onclick should go to their profile.
                var unt = document.createElement("a");
                unt.className = "username";
		setUnderline(unt);
                unt.innerHTML = args.username;
                addListener("click",unt,(function() {
                                navProfile(args.uid);
                }));
		
		//the "story".  Text which explains what they have done.  "has posted a"
                var story = document.createElement("span");
                story.innerHTML = " has posted a ";
                
		//the post type.  onclick should go to the post itself.
		var pt = document.createElement("a");
		pt.className = "post_type";
		setUnderline(pt);
                pt.innerHTML = args.type;
		addListener("click",pt,(function() {
                        switch( args.type ) {
                                case 'picture':
                                        navPicture(args.iid);
                                        break;
                                case 'question':
                                        navForum(args.iid);
                                        break;
                                case 'note':
                                        navNote(args.iid);
                                        break;
                                case 'link':
                                        navLink(args.iid);
                                        break;
				case 'triumph':
					navTriumph(args.iid);
					break;
				case 'petition':
					navPetition(args.iid);
					break;
                                case 'shout':
                                        break;
                                default:
                                        alert('something went wrong :(  we are working on it');
                                        break;
                        }

                }));

		//the collateral.  a summary of what was posted (text)
                var collateral = document.createElement("span");
                collateral.className = "collateral";
		if( args.type == "shout" ) {
	                collateral.innerHTML = args.collateral;
		}else{
	                collateral.innerHTML = '"' + args.collateral + '..."';
		}

		/*the word "For".  to explain which journey this post is for.
		also The "Familiar Itow".  The way in which this user described the 
		journey when they added it.  onclick should go to JFeed. these are only 
		needed if this is a Home feeds' post. */
		if( isHome ) {
	                var theFor = document.createElement("span");
	                theFor.innerHTML = "&nbsp&nbsp&nbsp For";
	                theFor.className = "the_for";
		

	                var fi = document.createElement("a");
	                fi.className = "itow";
			setUnderline(fi);
			fi.innerHTML = "I want to " + args.itow;
	                addListener("click",fi,(function() {
	                                navConcourse(args.jid);
	                }));
		}

             
                
                

		//the like button / link
                this.ll = document.createElement("a");
		var ll = this.ll;
		addListener("click",ll,_like);
                ll.className = "like";
		ll.innerHTML = "Like";
		setUnderline(ll);

		//a separating "dot" between the like and the timestamp.
		var dot = document.createElement("span");
		dot.innerHTML = ".";
		dot.style.fontSize = "20px";
		dot.style.color = "#9d9d9d";
		dot.style.position = "relative";
		dot.style.bottom = "3px";
		dot.style.left = "2px";


		//the time stamp
                var ts = document.createElement("span");
                ts.className = "time_stamp";
                ts.innerHTML = args.timestamp;
	
		/*
		a div meant to assist with layout.  Not being used currently
                var ss = document.createElement("div");
                ss.className = "separator_sub";
		*/

                var spacer = document.createElement("div");
                spacer.style.height = "25px";

		//The preview div is created here and inserted.  
		//if this post does have a preview, that content
		//of that preview should be inserted into this div.
		this.prevDiv = document.createElement("div");
		this.prevDiv.className = "preview_div";


                var scd = document.createElement("div");
                scd.className = "feed_center_div";
		if( curObj.byLeader ) 
			scd.appendChild(leaderEmblem);
		scd.appendChild(unt);
                if(args.type != "shout") {
                        scd.appendChild(story);
                        scd.appendChild(pt);
                }
                scd.appendChild(collateral);
                scd.appendChild(document.createElement("br"));
		if( isHome ) {
	                scd.appendChild(theFor);
	                scd.appendChild(fi);
		}
		scd.appendChild(this.prevDiv);
		
                scd.appendChild(document.createElement("br"));
                scd.appendChild(ll);
		scd.appendChild(dot);
                scd.appendChild(ts);
                scd.appendChild(dropLink);



                

                //the table
	        var pTable = new oblTable(1,2);
                pTable.setClassName("gray_out");
                pTable.setRowClass(0,"gray_out");
                pTable.setCellClass(0,0,"feed_left_cell");
                pTable.addContent(0,0,picLink);
                pTable.addContent(0,1,scd);

               	


                pd.appendChild(sep1);
                pd.appendChild(pTable.getTable());


		/*Link Previewing*/

		//look into the previews objet in the data.
		//find the right stuff and display appropriately.
		//probably follow the same paradigm - create a div, 
		//create the right stuff, append it all to the div.
		//postiion it appropriately.
		//tack it to the right parent and you should be good.

	this.linkPreview = function() {
		if( !args.preview ) return;

		if( !args.preview.youtubeStatus ) {
			var prevTable = new oblTable(1,2);
			prevTable.setClassName("preview_table");
	                prevTable.setRowClass(0,"gray_out");
			
			var mediaImg = document.createElement("img");
			//mediaImg.src = args.preview.media_url;
			prevTable.addContent(0,0,mediaImg);
	
			
			//the destination page's title
			var title = document.createElement("a");
			title.className = "link_title";
			addListener("click",title,(function() {
				window.open(args.preview.link);
			}));
			title.innerHTML = args.preview.title;
			setUnderline(title);
	
			//show the URL
			var urlDiv = document.createElement("div");
			urlDiv.className = "explanation";
			urlDiv.innerHTML = args.preview.link;
	
			//the text preview
			var textDiv = document.createElement("div");
			textDiv.className = "link_preview_text";
			textDiv.innerHTML = args.preview.preview;
	
			prevTable.addContent(0,1,title);
			prevTable.addContent(0,1,urlDiv);
			prevTable.addContent(0,1,textDiv);
	
			this.prevDiv.appendChild(prevTable.getTable());

		}else{
			/*Show the youtube vid in the feed*/

			var eIframe = '<iframe width="400" height="330" src="http://www.youtube.com/embed/' + args.preview.youtubeID + '" frameborder="0" allowfullscreen></iframe>';
			var ytDiv = document.createElement("div");
			ytDiv.className = "youtube_preview_div";
			ytDiv.innerHTML = eIframe;

			this.prevDiv.appendChild(ytDiv);
		}
		
	
	};
	 /*if we have a Q&A, we will show the question at the top.  we will use
                ths same div that link peviews use*/
        this.showQuestion = function() {
               /*show the question*/
                var qDiv = oblC("d");
                qDiv.className = "question";
                qDiv.innerHTML = args.question;

                this.prevDiv.appendChild(qDiv);

        };


	this.prevTriumph = function() {
		var e = new oblPictureStory({
			type:"triumph",
			id:args.iid,
			thePar:curObj.prevDiv,
			triPicCount:args.triPicCount
		});
	};

	this.prevPicture = function() {
		var e = new oblPictureStory({
			type:"picture",
			id:args.iid,
			thePar:curObj.prevDiv
		});
	};
			
	
	
	/*if this is a picture of a triumph, show picture story*/
	if( args.type == "triumph" ) 
		curObj.prevTriumph();

	if( args.type == "picture" ) 
		curObj.prevPicture();

	/*A post is previewed if it a link, 
	and a form us show in place of a conversation
	if its a question.*/
	
	if( args.type == "question" ) {
		/*display a forum instead of a conversation*/
		this.convo = new oblForum({
			"iid":args.iid,
			"domPar":pd,
			"parentObject":curObj
		});
		curObj.showQuestion();
	}else{

		this.convo = new oblDeprecatedConversation(args.type,args.iid,pd,curObj);
	}

		              
                
	args.parent.appendChild(pd);

	if( args.type == "link" ) {
		curObj.linkPreview();
	}	




}



function oblDialog(args) {
	var curObj = this;


	var div1 = document.createElement("div");
        var div2 = document.createElement("div");
        div2.className = "bd";
        div1.appendChild(div2);

	var body;
	if(args.thePar) {
		body = args.thePar;
		body.appendChild(div1);
	}else{
		
		body = document.getElementById("body");
        	body.insertBefore(div1,document.getElementsByTagName("div")[0]);
	}

        var dialog = new YAHOO.widget.Dialog(div1);
        div2.appendChild(args.content);
        dialog.setHeader(args.title);

        dialog.cfg.queueProperty("x",400);
	dialog.cfg.queueProperty("y",window.pageYOffset+200);

	this.show = function() {
		dialog.render();
		dialog.show();
	};
	this.hide = function() {
		dialog.cancel();
	};
	var buttons = ([
            {text:"Ok",handler: curObj.hide, isDefault: true},
        ]);
        dialog.cfg.queueProperty("buttons",buttons);

	this.changeButtons = function(args) {
		dialog.cfg.queueProperty("buttons",args);
	};
		


}
function oblEmbarkmentOverlay(overlay) {
	return;
    var curObj = this;
    // Collected Values
    var hnic = {
        "season" : "Spring",
        "year" : false,
        "someday" : false,
        "intv" : false,
        "private" : false,
    };

    if(overlay.update)	curObj.update = true;


    function update () {
        var checkedVal = "yui-button yui-radio-button yui-button-checked yui-radio-button-checked";
        var uncheckedVal = "yui-button yui-radio-button";
        var btnGroup = $(this).attr('name');
        if (!btnGroup) {
            btnGroup = this.get("name");
            // Clear all checked values
            $(".yui-button-checked").removeClass(checkedVal).addClass(uncheckedVal);
        }

        if (btnGroup === "someday") {
            hnic.someday = true;
            document.getElementById("btnSomeday").className = checkedVal;

            // set season_indicator pic and text
            sid.id = "someday";
            textBand.innerHTML = "Someday";
        }

        if (btnGroup === "season" || btnGroup === "year") {
            if (btnGroup === "season") hnic.season = this.get("value");
            if (btnGroup === "year") hnic.year = this.get("value");
            hnic.someday = false;

            // Highlight season and year buttons
            document.getElementById("btn" + hnic.season).className = checkedVal;
            document.getElementById("btn" + hnic.year).className = checkedVal;

            // Change season_indicator pic and text
            sid.id = hnic.season.toLowerCase();
            textBand.innerHTML = hnic.season + " " + hnic.year;
        }

        if(btnGroup === "intv" || btnGroup === "private") {
            if ($('[name='+btnGroup+']').attr("checked")) hnic[btnGroup] = true;
            else hnic[btnGroup] = false;
        }
        window.alert(hnic.season + ", "+ hnic.year + ", " + hnic.someday +", " + hnic.intv + ", " + hnic.private)
    }
		
	// The sending piece
	var replyCallback = function(request) {
		d.clear();
        var _backing = oblC("d");
        _backing.innerHTML=request.responseText;
        var e = new oblDialog({
            "title":"Item added!",
            content:_backing
        });
        e.show();
		document.getElementById("itow").value = '';
        callBucketlist();
    }

	// send the embarkment open ended, no completiion date, category='someday'
	sendSomeday = function() {
		var url = weburl + "add_itow";
        var values = {};
        values['category'] = "som";
		if(curObj.initiative)	values['category'] = "ini";
		if(curObj.private) values['category'] = "pri";
		values['itow'] = overlay.itow;
        standardPost(url,values,replyCallback);
	}
	
	// send (or update) the journey with a completiton date pegged to a season
	send = function() {
		if( hnic.someday ) {
			sendSomeday();
			return;
		}
        var url = weburl + "embark";
	    var values = {};
	    values['year'] = hnic.year;
	    values['season'] = hnic.season;
	    values['itow'] = overlay.itow;

	    if(hnic.intv) values['category'] = "ini";
        if(hnic.private) values['category'] = "pri";
	    if(hnic.someday) values['category'] = "som";
	    if(curObj.update) {
		    values['update'] = 1;
		    values['eid'] = overlay.eid;
		    values['itow'] = "unknown";
	    }
        else {
		    if( overlay.eid ) {
			    values['eid'] = overlay.eid;
			    values['itow'] = "unknown";
		    }
            else {
		        values['itow'] = overlay.itow;
	        }
	    }		
        standardPost(url,values,replyCallback);
	}

    // Base Div
    var cd = oblC("d");
    cd.className = "w_2013_content_div";
    overlay.appendChild(cd);

    // Top Bar
	var titleBar = oblC("d");
	titleBar.className = "embarkment_proposition_titlebar"

    // Top Bar - vertical divider
    var vd = oblC("d");
    vd.className = "w_2013_titlebar_divider1";

    // Top Bar horizontal divider
    var hd = oblC("d");
    hd.className = "w_2013_titlebar_divider2";
    titleBar.appendChild(vd);
    titleBar.appendChild(hd);
    overlay.appendChild(titleBar);

    // Upper Backing
    // This div holds the season/year/someday buttons
	var upperBacking = oblC("d");
	upperBacking.className = "embarkment_proposition_date_select";
	upperBacking.align = "center";

    // Main title
    var bySeason = oblC("d");
    bySeason.innerHTML = "When do you want to do this?";
    bySeason.className = "headingII";
    upperBacking.appendChild(bySeason);
    upperBacking.appendChild(giveSpace(10));

    // Season title
    var pickSeason = oblC("d");
    pickSeason.innerHTML = "Select a season:";
    pickSeason.className = "mention";
    upperBacking.appendChild(pickSeason);
    upperBacking.appendChild(giveSpace(4));

    // Season buttons
	var sButtons = oblC("d");
	sButtons.id = "season";
	sButtons.align = "center";
    upperBacking.appendChild(sButtons);

    var seasonButtons = new YAHOO.widget.ButtonGroup({ 
        id: "seasonButtons", 
        name: "season", 
        container:"season"
    });

    seasonButtons.addButtons([
        { label:"Spring", value:"Spring", id:"btnSpring", onclick:{fn:update} },
        { label:"Summer", value:"Summer", id:"btnSummer", onclick:{fn:update} }, 
        { label:"Fall"  , value:"Fall"  , id:"btnFall",   onclick:{fn:update} }, 
        { label:"Winter", value:"Winter", id:"btnWinter", onclick:{fn:update} }
    ]);

    // Year title
    upperBacking.appendChild(giveSpace(17));
    var pickYear = oblC("d");
    pickYear.className = "mention";
    pickYear.innerHTML = "Select a year:";
    upperBacking.appendChild(pickYear);
    upperBacking.appendChild(giveSpace(4));
	
    // Year buttons
    var curTime = new Date();
    year = curTime.getFullYear();
    hnic.year = year;
    var  yButtons = oblC("d");
	yButtons.id = "year";
	yButtons.align = "center";
    upperBacking.appendChild(yButtons);
    upperBacking.appendChild(giveSpace(10));

    var yearButtons = new YAHOO.widget.ButtonGroup({ 
        id: "yearButtons", 
        name: "year", 
        container: "year"
    });

    yearButtons.addButtons([
        { label:""+year+"", value:""+year+"", id:"btn"+year, onclick:{fn:update} },
        { label:""+(year+1)+"", value:""+(year+1)+"", id:"btn"+(year+1), onclick:{fn:update} }, 
        { label:""+(year+2)+"", value:""+(year+2)+"", id:"btn"+(year+2), onclick:{fn:update} }, 
        { label:""+(year+3)+"", value:""+(year+3)+"", id:"btn"+(year+3), onclick:{fn:update} }, 
        { label:""+(year+4)+"", value:""+(year+4)+"", id:"btn"+(year+4), onclick:{fn:update} } 
    ]);

    // Someday title
    var orWord = oblC("d");
    orWord.innerHTML = "-OR-";
    upperBacking.appendChild(orWord);
    upperBacking.appendChild(giveSpace(10));
    
    // Someday button
    var  sdButtons = oblC("d");
    sdButtons.id = "addsomeday";
    sdButtons.align = "center";
    upperBacking.appendChild(sdButtons);

    var somedayButtons = new YAHOO.widget.ButtonGroup({ 
        id: "somedayButton", 
        name: "someday", 
        container: "addsomeday"
    });

    somedayButtons.addButtons([
        { label:"Add as Someday (I'm not sure when)", value:"Someday", id:"btnSomeday", onclick:{fn:update} }
    ]);

    // overlay lower portion
    var lowerPortion = oblC("d");
    lowerPortion.className = "embarkment_proposition_lower_portion";

    // season indicator
    var sid = oblC("d");
    sid.className = "embarkment_proposition_season_indicator";
    sid.id = "seasonIndicator";
    lowerPortion.appendChild(sid);
    
    // season indicator - text band
    var textBand = oblC("d");
    textBand.className = "embarkment_proposition_text_band";
    textBand.id = "textBand";
    textBand.align = "center";
    lowerPortion.appendChild(textBand);
    
    // options base
    var s1 = oblC("d");
    s1.className = "embarkment_proposition_sep";
    lowerPortion.appendChild(s1);

    // add to bucketlist base
    var s2 = oblC("d");
    s2.className = "embarkment_proposition_sep";

    // An area which provides controls to select Initiative and/or Private
    var cs = oblC("s");
    var parametersDiv = oblC("d");
    parametersDiv.className = "embarkment_proposition_parameters_div";
    parametersDiv.id = "parametersDiv";
    lowerPortion.appendChild(parametersDiv);

    // Initiative/Private Banner
    var id = oblC("d");
    id.className = "mention_2013";
    id.innerHTML = "OPTIONS";
    id.style.margin = "0px 0px 6px 0px";
    parametersDiv.appendChild(id);
    
    // Add 'make initiative' image
    var lsi = oblC("i",imagesPath + "leader_star2013.png");
    lsi.className = "embarkment_proposition_leader_star";
    parametersDiv.appendChild(lsi);

    // Initiative button
    var iniC = document.createElement("input");
    iniC.type = "checkbox";
    iniC.className = "embarkment_proposition_checkbox";
    iniC.setAttribute("name", "intv");
    parametersDiv.appendChild(iniC);
    iniC.addEventListener("click", update);
    
    // Initiative text
    var it = document.createTextNode("Make Initiative");
    parametersDiv.appendChild(it);
    parametersDiv.appendChild(giveSpace(12));

    // Add 'make private' image
    var pi = oblC("i",imagesPath + "lock_icon.png");
    parametersDiv.appendChild(pi);
    
    // Private button
    var privC = document.createElement("input");
    privC.type = "checkbox";
    privC.className = "embarkment_proposition_checkbox";
    privC.setAttribute("name", "private");
    parametersDiv.appendChild(privC);
    privC.addEventListener("click", update);

    // Private text
    pi.className = "embarkment_proposition_lock_icon";
    var pt = document.createTextNode("Make Private");
    parametersDiv.appendChild(pt);
    lowerPortion.appendChild(s2);

    
    // Add to bucketlist div
    var fid = oblC("d");
    var addD = oblC("d");
    addD.className = "embarkment_proposition_add_div";
    lowerPortion.appendChild(addD);

    // Banner text
    fid.innerHTML = "ADD";
    fid.className = "mention_2013";
    addD.appendChild(fid);

    // Button div
    var bcon = oblC("d");
    bcon.className = "embarkment_proposition_button_div";
    bcon.id = "bcon";
    addD.appendChild(bcon);

    // Leading arrows
    var lead = oblC("s");
    lead.innerHTML = ">";
    lead.className = "embarkment_proposition_hl";
    bcon.appendChild(lead);

    // Add item to bucketlist button
    var sbs = document.createElement("button");
    bcon.appendChild(sbs);
    var sb = new YAHOO.widget.Button(sbs);
    sb.set("type","push");
    sb.set("label","Add New Item to Bucketlist!");
    //sb.on("click",send);
    //bcon.appendChild(sbs);

    // Trailing Arrows
    var follow = oblC("s");
    follow.innerHTML = "<";
    follow.className = "embarkment_proposition_hl";
    bcon.appendChild(follow);

    // append everything to the DOM
    overlay.appendChild(upperBacking);
    overlay.appendChild(lowerPortion);
}
function oblEmbarkmentProposition(args) {
	var curObj = this;
	if(args.update)	curObj.update = true;

	/*begin by assuming this is not an initiative*/
	this.initiative = false;
	
	/*begin by assuming that this is non-private*/
	this.private = false;

	this.clearYear = function() {
		for(var i=0;i<curObj.yb.length;i++){
			curObj.yb[i].set("checked",false);
		}
		curObj.year = '';
	}

	this.clearSeason = function() {
		for(var key in curObj.seasonRadio){
			curObj.seasonRadio[key].set("checked",false);
		}
		curObj.season = '';
	}

	this.clearSomeday = function() {
		curObj.someday = false;
		curObj.somedayButton.set("checked",false);
	}
		
	/*method to toggle intiative*/
	this.toggleInitiative = function() {
		if( curObj.initiative ) {
			curObj.initiative = false;
		}
    else{
			curObj.initiative = true;
		}
	}

	this.togglePrivate = function() {
		if( curObj.private ) {
      curObj.private = false;
    }
    else{
      curObj.private = true;
    }
	}

	this.someday = false;

	this.toggleSomeday = function() {
		curObj.clearYear();
		curObj.clearSeason();
    if( curObj.someday ) {
      curObj.someday = false;
    }
    else{
      curObj.someday = true;
    }
		curObj.indicateSeason();
  }

	/*The sending piece*/
	
	var replyCallback = function(request) {
		d.clear();
    var _backing = oblC("d");
    _backing.innerHTML=request.responseText;
    var e = new oblDialog({
      "title":"Item added!",
      content:_backing
    });
    e.show();
		document.getElementById("itow").value = '';
    callBucketlist();
  }

	/*send the embarkment open ended, no completiion date, category='someday'*/
	this.sendSomeday = function() {
		var url = weburl + "add_itow";
    var values = {};
    values['category'] = "som";
		if(curObj.initiative)	values['category'] = "ini";
		if(curObj.private) values['category'] = "pri";
		values['itow'] = args.itow;
    standardPost(url,values,replyCallback);
	}
	
	/*send (or update) the journey with a completiton date pegged to a season*/
	this.send = function() {
		if( curObj.someday ) {
			curObj.sendSomeday();
			return;
		}
    var url = weburl + "embark";
		var values = {};
		values['year'] = curObj.year;
		values['season'] = curObj.season;
		values['itow'] = args.itow;

		if(curObj.initiative) values['category'] = "ini";
    if(curObj.private) values['category'] = "pri";
		if(curObj.someday) values['category'] = "som";
		if(curObj.update) {
			values['update'] = 1;
			values['eid'] = args.eid;
			values['itow'] = "unknown";
		}
    else{
			if( args.eid ) {
				values['eid'] = args.eid;
				values['itow'] = "unknown";
			}
      else{
				values['itow'] = args.itow;
			}
		}		

    standardPost(url,values,replyCallback);
	}

	var upperBacking = oblC("d");
	upperBacking.className = "embarkment_proposition_date_select";
	upperBacking.align = "center";
	var backing = oblC("d");
	backing.appendChild(upperBacking);
	
	var sc = oblC("d");
	sc.className = "w_2013_shadow_caster";
	backing.appendChild(sc);

  var d = new oblWindow({
		setclass:"focus_div2013",
    title:"Add New Item",
		content:backing
  });

	var spring = document.createElement("button");
	var summer = document.createElement("button");
	var fall = document.createElement("button");
	var winter = document.createElement("button");

	/*Ask the user if they want to do this by season...*/
	var bySeason = oblC("d");
	
	bySeason.innerHTML = "When do you want to do this?";
	bySeason.className = "headingII";

	var pickSeason = oblC("d");
	pickSeason.innerHTML = "Select a season:";
	pickSeason.className = "mention";
	//bySeason.style.width = "215px";
	upperBacking.appendChild(bySeason);
	upperBacking.appendChild(giveSpace(10));
	upperBacking.appendChild(pickSeason);
	upperBacking.appendChild(giveSpace(4));
	
	upperBacking.appendChild(spring);
	upperBacking.appendChild(summer);
	upperBacking.appendChild(fall);
	upperBacking.appendChild(winter);

	/*	
	table.setClassName("gray_out");
        table.setRowClass(0,"gray_out");
        table.setCellClass(0,0,"gray_out");
	*/

	var back1 = oblC("d");	

	curObj.seasonRadio = {};
	var seasonRadio = curObj.seasonRadio;

	this.propSeason = function(evt,season) {
		curObj.clearSeason();
		curObj.season = season;
		seasonRadio[season].set("checked",true);
		curObj.indicateSeason();
	};

	this.propSetYear = function(evt,year){
		curObj.clearYear();
		curObj.year = curObj.years[year];
		yb[year].set("checked",true);
		curObj.indicateSeason();
		
	};

	seasonRadio['spring'] = new YAHOO.widget.Button(spring);
	seasonRadio['spring'].set("type","radio");
	seasonRadio['spring'].set("label","Spring");
	seasonRadio['spring'].on("click",curObj.propSeason,"spring");

	seasonRadio['summer'] = new YAHOO.widget.Button(summer);
  seasonRadio['summer'].set("type","radio");
  seasonRadio['summer'].set("label","Summer");
	seasonRadio['summer'].on("click",curObj.propSeason,"summer");

  seasonRadio['fall'] = new YAHOO.widget.Button(fall);
  seasonRadio['fall'].set("type","radio");
  seasonRadio['fall'].set("label","Fall");
	seasonRadio['fall'].on("click",curObj.propSeason,"fall");

  seasonRadio['winter'] = new YAHOO.widget.Button(winter);
  seasonRadio['winter'].set("type","radio");
  seasonRadio['winter'].set("label","Winter");
	seasonRadio['winter'].on("click",curObj.propSeason,"winter");

  var curTime = new Date();
  var year = curTime.getFullYear();
  curObj.years = [];
	curObj.years[0] = year;
	curObj.years[1] = year + 1;
	curObj.years[2] = year + 2;
	curObj.years[3] = year + 3;
  curObj.years[4] = year + 4;
	
	upperBacking.appendChild(giveSpace(17));
	var pickYear = oblC("d");
	pickYear.className = "mention";
	pickYear.innerHTML = "Select a year:";	
	upperBacking.appendChild(pickYear);
	upperBacking.appendChild(giveSpace(4));

	var fi = document.createElement("button");
	var se = document.createElement("button");
	var th = document.createElement("button");
	var fo = document.createElement("button");
	var fif = document.createElement("button");

	upperBacking.appendChild(fi);
  upperBacking.appendChild(se);
  upperBacking.appendChild(th);
  upperBacking.appendChild(fo);
  upperBacking.appendChild(fif);
	upperBacking.appendChild(giveSpace(10));
	
	/*break things up to separate the Someday selection from the season/year */
	upperBacking.appendChild(giveSpace(10));
	var orWord = oblC("d");
	orWord.innerHTML = "-OR-";
	upperBacking.appendChild(orWord);
	upperBacking.appendChild(giveSpace(10));	
	
	/*give them the option to add as "someday"*/
	var somedayB = document.createElement("button");
	upperBacking.appendChild(somedayB);
	var ysB = new YAHOO.widget.Button(somedayB);
	curObj.somedayButton = ysB;
	ysB.set("label","Add as Someday (I'm not sure when)");
	ysB.set("type","radio");
	ysB.on("click",curObj.toggleSomeday);

	curObj.yb = [];
	var yb = curObj.yb;

	yb[0] = new YAHOO.widget.Button(fi);
	yb[0].set("label",curObj.years[0].toString());
	yb[0].set("type","radio");
	yb[0].on("click",curObj.propSetYear, 0);
	
  yb[1] = new YAHOO.widget.Button(se);
  yb[1].set("label",curObj.years[1].toString());
  yb[1].set("type","radio");
  yb[1].on("click",curObj.propSetYear, 1);

  yb[2]  = new YAHOO.widget.Button(th);
  yb[2].set("label",curObj.years[2].toString());
  yb[2].set("type","radio");
  yb[2].on("click",curObj.propSetYear, 2);

  yb[3] = new YAHOO.widget.Button(fo);
  yb[3].set("label",curObj.years[3].toString());
  yb[3].set("type","radio");
  yb[3].on("click",curObj.propSetYear, 3);

  yb[4] = new YAHOO.widget.Button(fif);
  yb[4].set("label",curObj.years[4].toString());
  yb[4].set("type","radio");
  yb[4].on("click",curObj.propSetYear, 4);

	upperBacking.appendChild(giveSpace(28));

	/*create the lower portion of the Embarkment Proposition*/
	var lowerPortion = oblC("d");
	lowerPortion.className = "embarkment_proposition_lower_portion";		

	/*  ---table stuff---
	var lpt = new oblTable(1,5);
	backing.appendChild(lpt.getTable());
	lpt.getTable().className = "obl_table_test";
	lpt.getTable().cellspacing=0;
	lpt.getTable().cellpadding=0;
	lpt.setRowClass(0,"obl_table_test");
	lpt.setCellClass(0,0,"obl_table_test");
	---*/
	var sid = oblC("d");
	sid.className = "embarkment_proposition_season_indicator";
	backing.appendChild(lowerPortion);
	lowerPortion.appendChild(sid);
	
	var textBand = oblC("d");
	textBand.className = "embarkment_proposition_text_band";
	textBand.align = "center";
	sid.appendChild(textBand);
	var s1 = oblC("d");
	s1.className = "embarkment_proposition_sep";
	lowerPortion.appendChild(s1);
	/*
	lpt.addContent(0,1,s1);
	*/
	
	var s2 = oblC("d");
	s2.className = "embarkment_proposition_sep";
	
	curObj.season = "spring";
	curObj.year = curObj.years[0];
	this.indicateSeason = function() {
		if( !(curObj.season) ) curObj.season = "fall";
		if( curObj.someday ) {
			curObj.dateLine = "someday";
			sid.className = "embarkment_proposition_season_indicator";
		}
    else{
			curObj.dateLine = curObj.season + " " + curObj.year;
			sid.className = "embarkment_proposition";
      sid.id = curObj.season;
		}
		textBand.innerHTML = curObj.dateLine;
	}

	/*An area which provides controls to select Initiative and/or Private*/
	var cs = oblC("s");
	
	var parametersDiv = oblC("d");
	parametersDiv.className = "embarkment_proposition_parameters_div";
	lowerPortion.appendChild(parametersDiv);
	/*Identify this portion of the dialog*/
	var id = oblC("d");
	id.className = "mention_2013";
	id.innerHTML = "OPTIONS";
	id.style.margin = "0px 0px 6px 0px";
	parametersDiv.appendChild(id);

	/*Add 'make initiative' functionality*/
	var lsi = oblC("i", imagesPath + "leader_star2013.png");
	
	lsi.className = "embarkment_proposition_leader_star";
	parametersDiv.appendChild(lsi);
	var it = document.createTextNode("Make Initiative");
	var iniC = document.createElement("input");
	iniC.type = "checkbox";
	iniC.className = "embarkment_proposition_checkbox";
	parametersDiv.appendChild(iniC);
	parametersDiv.appendChild(it);
	addListener("click",iniC,curObj.toggleInitiative);
	parametersDiv.appendChild(giveSpace(12));
	
	
	/*add Private functionality*/
	var pt = document.createTextNode("Make Private");
	var pi = oblC("i", imagesPath + "lock_icon.png");
	var privC = document.createElement("input");
	privC.type = "checkbox";
	privC.className = "embarkment_proposition_checkbox";
	parametersDiv.appendChild(pi);
	parametersDiv.appendChild(privC);
	pi.className = "embarkment_proposition_lock_icon";
	parametersDiv.appendChild(pt);
	
	addListener("click",privC,curObj.togglePrivate);

	lowerPortion.appendChild(s2);	
	var fid = oblC("d");
	var addD = oblC("d");
	addD.className = "embarkment_proposition_add_div";
	lowerPortion.appendChild(addD);
	fid.innerHTML = "ADD";
	fid.className = "mention_2013";
	addD.appendChild(fid);
	
	var bcon = oblC("d");
	bcon.className = "embarkment_proposition_button_div";	
	addD.appendChild(bcon);
	var sbs = document.createElement("button");
	var lead = oblC("s");
	lead.innerHTML = ">";
	lead.className = "embarkment_proposition_hl";
	var follow = oblC("s");
	follow.innerHTML = "<";
	follow.className = "embarkment_proposition_hl";
	//lead.style.padding = "0px 0px 0px 20px";
	bcon.appendChild(lead);
	bcon.appendChild(sbs);
	bcon.appendChild(follow);
	
	var sb = new YAHOO.widget.Button(sbs);
	sb.set("type","push");
	sb.set("label","Add New Item to Bucketlist!");
	sb.on("click",curObj.send);
}


function oblFamiliarItow(args) {

	var curObj = this;

	/*give this object a parent object in which to insert the value.*/
	var thePar = args.thePar;
	/*We need the JID to fetch the itow*/
	var jid = args.jid;

	this.insertValue = function() {
		thePar.innerHTML = curObj.response;
	};





	/*set method to call. upon OK response... calls method to return*/

	this.getItow = function() {
		var request = newRequest();
	        var url = weburl + "get_familiar_itow?jid=" + jid;
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
					curObj.response = request.responseText;
					curObj.insertValue();
	                        }
	                }
	        };
	        //now send.  we'll be waiting...
	        request.send(null);
	};
	this.getItow();

}

function oblFBPermsRequest(args) {





	var curObj = this;

	var url = "http://www.facebook.com/dialog/oauth/?"
	+
	"client_id=196376493752391"
	+
	"&redirect_uri=http://preveoh.com/z/catch_facebook"
	+
	"&state=" + globalBearings.getUid()
	+
	"&scope=publish_stream";

	window.open(url,
	"We need to tell Facebook that its OK for us to write to your Timeline");
	
	


}

function oblFeed(args) {
	var curObj = this;
	var isHome = 0;
	var jid = args.jid;
	
	var feed = document.getElementById("feed_cont");

	this.showEmpty = function() {
		alert("ya b-list is empty bruh");
		return;

		/*What is shown if the user has no action in their newsfeed */
		var feed = document.getElementById("feed");

		var title = document.createElement("span");
		title.style.fontSize = "20px";
		title.innerHTML = "How to use Ourbucketlist:";

		var i1 = document.createElement("img");
		i1.style.padding = "0px 5px 0px 0px";
		i1.src = imagesPath + "pointer_out.gif";

		var first = document.createElement("span");
		first.style.fontSize = "20px";
		first.innerHTML = "there nothing in your Blist bruh <br>  FIX THIS LAME EMPY NOTICATION TO SOMETHING GANGSTER  .";
		var firstE = document.createElement("span");
		
		
		
		var second = document.createElement("span");
		second.style.fontSize = "20px";
		second.innerHTML  = "Post questions or content to a item.";
		var secondE = document.createElement("span");

		var third = document.createElement("span");	
		third.style.fontSize = "20px";
		
	
		var thirdE = document.createElement("span");

		

		var i2 = document.createElement("img");
		i2.style.padding = "0px 5px 0px 0px";
	                i2.src = imagesPath + "pointer_out.gif";

		var i3 = document.createElement("img");
		i3.style.padding = "0px 5px 0px 0px";
                i3.src = imagesPath + "pointer_out.gif";

		var jefe = document.createElement("div");
		jefe.appendChild(document.createElement("br"));
		jefe.className = "empty_feed_clue_backing";

		jefe.appendChild(title);
		jefe.appendChild(document.createElement("br"));
		jefe.appendChild(document.createElement("br"));
		
		jefe.appendChild(i1);
		jefe.appendChild(first);
		jefe.appendChild(firstE);
		jefe.appendChild(document.createElement("br"));
		jefe.appendChild(document.createElement("br"));
		jefe.appendChild(i2);
		jefe.appendChild(second);
		jefe.appendChild(secondE);
		jefe.appendChild(document.createElement("br"));
		jefe.appendChild(document.createElement("br"));
		jefe.appendChild(i3);
		jefe.appendChild(third);
		jefe.appendChild(thirdE);
	

		feed.appendChild(jefe);
	};



	var jefe = document.createElement("div");


	this.assemble = function(data) {
		jefe.innerHTML = '';
		feed.innerHTML = '';
		var backing = oblC("d","concourse_right_box");
		feed.appendChild(backing);
		backing.style.overflowX = "hidden";
		/*try to display leader info if this is a JFeed*/
		if( jid != 0 )
			curObj.showLeader();


		/*if the data we got is emtpy, presumably the user has not embarked on any journeys.
		so, run showEmpty to explain to this (presumably) new user how to get around the site.*/
		
		if( data.types.length == 0 )
			curObj.showEmpty();
			/*using data.types as a measurement of array length. 
			could have used any of the arrays under data*/
	        for(var i=0;i<data.types.length;i++) {
	
			/*This loop should go though the data of posts and create post objects as needed
			These objects each are aware of their parent and attach themselves to the DOM*/

			/*if this is a reply skip it for now_*/		
			if( data.types[i] == "reply" )
				continue;

			var isLeader;	
			if(data.uids[i] == data.leaderId)
				isLeader = true;
			
			var post = new oblPost({
				"username" : data.owners[i],
				"uid":	data.uids[i],
				"type": data.types[i],
				"iid": data.iids[i],
				"jid": data.jids[i],
				"itow": data.itowHash[data.jids[i]],
				"collateral": data.collateralli[i],
				"timestamp" : data.timestamps[i],
				"preview": data.previews[i],
				"parent": jefe,
				"isHome": isHome,
				"question":data.questions[i],
				triPicCount:data.triPicCounts[i],
				byLeader:isLeader
				
			});
		}


	backing.appendChild(jefe);
	
	};
	this.showLeader = function(){
	};

	this.fetch = function(){
		var request = newRequest();
		var url;
		if( isHome ) {
	  	      url = weburl + 'get_home';
		}else{
		      	  url = weburl + 'get_journey_feed?jid=' + jid;
		}
        	request.open("GET",url,true);
        	request.onreadystatechange = function() {
                	if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
       	                         data = eval('(' + request.responseText + ')');
					curObj.assemble(data);
					
				}
       	       		}
       		 };
       		 request.send(null);
	};
	this.reload = function(){
		curObj.fetch();
	};
	this.fetch();
}


//this is a lis of ZMLHttpRequet cerate factory fuincitnos totry 
var _factories = [
        function() { return new XMLHttpRequest(); },
        function() { return new ActiveXObject("Microsoft.XMLHTTP"); },
        function() { return new ActiveXObject("MSXML2.XMLHTTP.3.0"); },
        function() { return new ActiveXObject("MSXML2.XMLHTTP"); }
];
        //when we find a factory that works, sotre it here
var _factory = null;

        //Create and return a new XMLHttpRequest object.
        //      //The rifs timte we'r ecalled , try the list of faotry finctions until
        //we find one that returnms a non null value and does not throw an 
        //exception.  once we find a workign facory, remember it for later use.

function oblF_filterResults(n_win, n_docel, n_body) {
        var n_result = n_win ? n_win : 0;
        if (n_docel && (!n_result || (n_result > n_docel)))
                n_result = n_docel;
        return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function oblFindPosition(ele) {
	 var curLeft = curTop = 0;
                var obj = ele;
                if( obj.offsetParent) {
                        do {
                                curLeft += obj.offsetLeft;
                                curTop += obj.offsetTop;
                        } while (obj = obj.offsetParent);
                }
                return [curLeft,curTop];
}



function oblFocusDiv(args) {
	var curObj = this;
        var body = document.getElementById('body');
        var tintDiv = document.createElement('div');
	this.clear = function() {
		body.removeChild(tintDiv);
	};
        var contDiv = document.createElement('div');
	var topDiv = document.createElement("div");
	topDiv.style.height = "30px";
	contDiv.appendChild(topDiv);
	var link = document.createElement("a");
	var x = document.createElement("img");
	link.style.position = "relative";
	link.style.left = "470px";
	link.style.bottom = "23px";
	link.appendChild(x);
	addListener("click",x,curObj.clear);
	x.src = imagesPath + "close.png";
	topDiv.appendChild(link);
	var contentDiv = document.createElement("div");
	contDiv.appendChild(contentDiv);
	this.getDiv = function() {
		return contentDiv;
	};
        tintDiv.id = "TintDiv";
        tintDiv.align = "center";
        if( navigator.appName == 'Microsoft Internet Explorer') {
                tintDiv.className = 'tintDivIE';
                startDiv.className = 'startDivIE';
        }else{
                tintDiv.className = 'tintDiv';
                tintDiv.style.background = 'rgba(5, 5, 5, 0.5)';
                //tintDiv.style.background = 'rgba(1, 1, 1, 0.839844)';

        }

	if(args.setclass){
		contDiv.className = args.setclass;
	}else{
		conDiv.className = "default_focusdiv";
	}
        contDiv.style.filter = "alpha(opacity=99)";
        contDiv.align = 'left';
        contDiv.style.bottom = '';
	this.attach = function() {
	        if( navigator.appName == 'Microsoft Internet Explorer') {

	                var otherDiv = document.createElement('div');
        	        otherDiv.align = "center";
	                otherDiv.id = "OtherDiv";
	                otherDiv.appendChild(startDiv);
	                otherDiv.style.position = "absolute";
	                otherDiv.style.top = "0px";
	                otherDiv.style.zIndex = '1010';
	                otherDiv.style.width = "100%";
	                body.appendChild(tintDiv);
	                body.appendChild(otherDiv);
	        }else{
	                tintDiv.appendChild(contDiv);
	                body.appendChild(tintDiv);
	        }
	};
}


function oblForum(args) {
        var curObj = this;
	var id = args.iid;
	var domPar = args.domPar;
	var parentObject = args.parentObject;
        var data;
        var pd;
        this.submitReply = function() {
                var values = {};
                values['comment'] = curObj.cInput.value;
                values['type'] = type;
                values['iid'] = iid;

                var addUrl = weburl + "add_comment";
                var replyCallback = function() {
                        curObj.reload();
                };
                standardPost(addUrl,values,replyCallback);
        };
        function commentKeys(e) {
                if( e.keyCode == 13 )
                        curObj.submitReply();
	}
	this.rateReply = function(rid,arg) {
                var values = [];

                var sendUrl = weburl + "rate_reply";

                values['iid'] = rid;
                values['dir'] = arg;


                 var replyCallback = function() {
                        /*reload this forum*/
			curObj.reload();
                          
               };

               standardPost(sendUrl,values,replyCallback);
	};
	

        this.assemble = function() {

		/*create the backing div on which all else will be tacked*/
                pd = document.createElement("div");
                pd.className = "conversation_div";


                var topDiv = document.createElement("div");
                topDiv.className = "comment_block_top";
               
                var topSpace = document.createElement("div");
                topSpace.style.height = "2px";
                topSpace.style.overflow = "hidden";
                pd.appendChild(topSpace);

                for(var i=0;i<data.forum.length;i++) {
			/*if there is at least 1 vote, create the show votes div above*/
			if( data.voteData[i].uids.length > 0 ) {

				var vd = oblC("d");
	                        vd.className = "comment_block";
	
	
	                        var verbage;
	
	                        if( data.voteData[i].uids.length < 2 ) {
	                                verbage = " vote by ";
	                        }else{
	                                verbage = " votes by ";
	                        }
	
	                        var s = oblC("s");
				s.className = "voter_list";
	                        s.innerHTML = data.voteData[i].uids.length + verbage;
	                        for(j=0;j<data.voteData[i].usernames.length;j++) {
	                                if(j > 0) {
						s.appendChild(document.createTextNode(", "));
	                                }
					var what = oblC("a");
					
					what.innerHTML = data.voteData[i].usernames[j];
					addListener("click",what,(function(c) {
						return function(blah) {
							navProfile(c);
						};
					})(data.voteData[i].uids[j]));
					s.appendChild(what);
				
	                        }
	
	                        vd.appendChild(s);
	                        /*append it to the conversatino div, defined above*/
	                        pd.appendChild(vd);
				

			}
			
                        //create a div with the right background
                        var blockDiv = document.createElement("div");
                        blockDiv.className = "comment_block";
                        //create a table
                        var cTable = new oblTable(1,4);
                        cTable.setRowClass(0,"forum_table");
                        cTable.setCellClass(0,2,"forum_table_column_3");

                        var ownerPicLink = document.createElement("a");
                        addListener("click",ownerPicLink,(function(c) {
                                return function(blah) {
                                        navProfile(c);
                                };
                        })(data.owners[i]));
                        var ownerPic = document.createElement("img");
                        ownerPic.src = "/image_content/micro" + data.owners[i] + ".jpg";
                        ownerPicLink.appendChild(ownerPic);

			 var up = oblC("i");
                        up.src = imagesPath + "rate_arrow_u.png";
                        var upL = oblC("a");
                        upL.appendChild(up);
                        var _mo = function(e) {
                                hoverRate(e,'up');
                        };
                        addListener("click",upL,(function(c) {
                                return function(blah) {
                                         curObj.rateReply(c,"up");
                                };
                        })(data.rids[i]));

                        addListener("mouseover",up,_mo);

			var down = oblC("i");
			down.src = imagesPath + "rate_arrow_d.png";
			var downL = oblC("a");
			downL.appendChild(down);
			var _mod = function(e) {
				hoverRate(e,'down');
			};
			addListener("click",downL,(function(c) {
				return function(blah) {
					 curObj.rateReply(c,"down");
                                };
                        })(data.rids[i]));

			addListener("mouseover",down,_mod);

			cTable.addContent(0,0,upL);
			cTable.addContent(0,0,document.createElement("br"));
			cTable.addContent(0,0,downL);


                        cTable.addContent(0,1,ownerPicLink);
                        var unt = document.createElement("a");
                        setUnderline(unt);
                        addListener("click",unt,(function(c) {
                                return function(blah) {
                                        navProfile(c);
                                };
                        })(data.owners[i]));

                        unt.className = "comment_username_text";
                        unt.innerHTML = data.owner_names[i];
                        var text = document.createElement("span");
                        text.innerHTML = ' ' + data.forum[i];
                        var ts = document.createElement("span");
                        ts.className  = "time_stamp";
                        ts.innerHTML = data.time_stamps[i];

                        cTable.addContent(0,2,unt);
                        cTable.addContent(0,2,text);
                        cTable.addContent(0,2,document.createElement("br"));
                        cTable.addContent(0,2,ts);
                        var dropLink = document.createElement("a");
                        dropLink.className = "post_menu";
                        dropLink.innerHTML = "X";
 			addListener("mouseover",blockDiv,(function(dropLink) {
                                return function(blah) {
                                        dropLink.style.visibility = "visible";
                                };
                        })(dropLink));
                        addListener("mouseout",blockDiv,(function(dropLink) {
                                return function(blah) {
                                        dropLink.style.visibility = "hidden";
                                };
                        })(dropLink));
                        //add listener to current drop link to get it to drop current item
                        addListener("click",dropLink,(function(c) {
                                return function(blah) {
                                        dropItem("reply",c);
                                };
                        })(data.rids[i]));
                        cTable.addContent(0,3,dropLink);
                        blockDiv.appendChild(cTable.getTable());
                        var sp = document.createElement("div");
                        sp.style.height = "2px";
                        sp.style.overflow = "hidden";
                        pd.appendChild(blockDiv);
                        pd.appendChild(sp);
                        //add the like stuff    
                }
                /*Now add an input to allow for adding a reply*/
                var addReplyDiv = document.createElement("div");
                addReplyDiv.className = "comment_block_bottom";
                var inp = document.createElement("input");
		inp.className = "comment";
		curObj.input = inp;
		var exp = new oblInputExp();
		exp.setElement(inp);
		exp.setExp("  Got a response?  Post an answer...");
	
		

		


		//IS THIS NEEDE????_
                addListener("keydown",inp,(function(e) {
                        curObj.addReply(e);
                }));
		addReplyDiv.appendChild(inp);
                pd.appendChild(addReplyDiv);
                domPar.appendChild(pd);
        };

	this.addReply = function(e) {
		if( e.keyCode == 13 ) {

			var request = newRequest();
	                var sendUrl = weburl + 'add_forum_post';
	                var values = {};
			values['post'] = curObj.input.value;
			values['qid'] = data.qid;
	                standardPost(sendUrl,values,curObj.reload);
		}
	};
 	this.fetch = function() {
                var request = newRequest();
                var url = weburl + 'get_forum?qid=' + id;
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        data = eval('(' + request.responseText + ')');
                                        curObj.assemble(data);

                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);
        };
        this.reload = function() {
                //firt remove stuf from the dom.  is there a better way to do this?_
                domPar.removeChild(pd);
                //then fetch.
                curObj.fetch();
        };
        this.fetch();
}

function oblGetVerticalWindowPosition() {
        return oblF_filterResults (
                window.pageYOffset ? window.pageYOffset : 0,
                document.documentElement ? document.documentElement.scrollTop : 0,
                document.body ? document.body.scrollTop : 0
        );

}
	
		

function oblGuidanceMsg(msg) {

	/*THIS IS UNFINSIHED______
	this was meant to be a messageing system used to immediately pop up and alert.
	it was meant to be used to inform a user that they had succesfully created an 
	Amazon recipient account after returning from the CBUI. Also, it could be used
	in the future to do other alerting.
	*/
	
	var curObj = this;


	var theDiv = document.createElement("div");
	document.appendChild(theDiv);
	theDiv.innerHTML = "You now created a Recipient account with Amazon.  Funds raised as a result of this drive will accure there";

	var d = new YAHOO.widget.Dialog(theDiv);
	this.hide = function() {
		d.cancel();
	};
	var buttons = ([
            {text:"Ok",handler: curObj.hide, isDefault: true},
        ]);
        d.setHeader("Amazon Recipient Account Created");
        d.cfg.queueProperty("buttons",buttons);
        d.cfg.queueProperty("y",window.pageYOffset+200);

	
	this.show = function() {
		d.render();
		d.show();
	};	
	

	
	this.show();
}


function oblHiddenInput(name,value) {
	var inp = document.createElement("input");
	inp.visibility = "hidden";
	inp.style.height = "0px";
	inp.style.width = "0px";
	inp.style.border = "0px";
	inp.name = name;
	inp.type = "text";
	inp.value = value;
	
	this.getInput = function() {
		return inp;
	};
}


function oblInitiativeDefinition(jid) {
	var curObj = this;

	/*for now the only kind of intiative is a Petition. 
	Amazon has pulled the plug on Funds Drives*/
	//_


		

		

	var jefe = document.createElement("div");

	this.showFunding = function() {

		jefe.innerHTML = '';
                var petitionDiv = document.createElement("div");

                fundingRad.set("checked",false);

                var title = document.createElement("span");
                title.className = "page_title";
                title.innerHTML = "Submit your Funds Drive";
                petitionDiv.appendChild(giveSpace(20));
                petitionDiv.appendChild(title);
                petitionDiv.appendChild(giveSpace(35));

                var reqTitle = new oblTap(petitionDiv);
                reqTitle.t("Title");
                reqTitle.p("This is the project's title.");

                //declare the first input.  this is for the title.
                var ti = new oblInput({
                        "name":"title",
                        "thePar":petitionDiv,
                        "width":600,
                        "count":300
                });             
                ti.setReq(false);

		var youTube = new oblTap(petitionDiv);
		youTube.t("YouTube Video URL.");
		youTube.p("If you have a youtube video to help explain this project, please include its URL here.  This is optional.");

		var youInput = new oblInput({
			"name":"YouTubeURL",
			"thePar":petitionDiv,
			"width":600
		});
			
		

                var reqPet = new oblTap(petitionDiv);
                reqPet.t("Project Description.");
                reqPet.p("Please describe the project.  Be as clear and concise as possible. 5000 characters are allowed");
                //declare the second input.  for the petition text.     
                var pet = new oblInput({
                        "name":"petition_body",
                        "thePar":petitionDiv,
                        "width":600,
                        "count":5000,
                        "textarea":true
                });
                pet.setReq(false);
	
		//tell the user that they need to agree to terms of use.
		var termsTap = new oblTap(petitionDiv);
		termsTap.t("Please agree to the terms of use before initiating a Funds drive.");
		termsTap.p("");

		//create a DIV whcih will fetrch the right agreemtn and display it.
		var ad = document.createElement("div");
		ad.className = "agreement";
		petitionDiv.appendChild(ad);
		var whatever = new oblAgreement({
			"thePar":ad,
			"title":"test"
		});
		var check = new oblInput({
			"checkbox":1,
			"name":"termsCheck",
			"thePar":petitionDiv
		});
		check.setCheckboxDesc("I agree to the Terms of Use.");
		check.setReq(false);

		
	
                var net = new oblInputNet([ti,pet,youInput,check]);
                net.setPostUrl("add_initi");
                net.addPair("jid",jid);
                net.addPair("type","funding");
                var _callback = function() {
                        navProfile(globalBearings.getUid());
                };
                net.setCallback(_callback);

                var sb = document.createElement("button");
                var f = new oblCenterFooter(petitionDiv);
                f.addContent(sb);
                var SB = new YAHOO.widget.Button(sb);
                SB.on("click",net.post);
                SB.set("label","Submit");

                jefe.appendChild(petitionDiv);

	
	};
	this.showPetition = function() {
		jefe.innerHTML = '';
                var petitionDiv = document.createElement("div");

		/*the below was used to decheck the YUI checkbox system when 
		switching between Funding and Petition.
		this is currently not being used */
		//fundingRad.set("checked",false);

                var title = document.createElement("span");
                title.className = "page_title";
                title.innerHTML = "Submit a Petition";
		petitionDiv.appendChild(giveSpace(20));
		petitionDiv.appendChild(title);
		petitionDiv.appendChild(giveSpace(35));

		var reqTitle = new oblTap(petitionDiv);
		reqTitle.t("Title");
		reqTitle.p("This is the petition's title.");

		//declare the first input.  this is for the title.
		var ti = new oblInput({
			"name":"title",
			"thePar":petitionDiv,
			"width":600,
			"count":300,
			"requirement":/\S/
		});		

		var reqPet = new oblTap(petitionDiv);
		reqPet.t("Petition text");
		reqPet.p("This is the petition statement.  5000 characters are allowed");

		//declare the second input.  for the petition text.	
		var pet = new oblInput({
			"name":"petition_body",
			"thePar":petitionDiv,
			"width":600,
			"count":5000,
			"textarea":true,
			"requirement":/\S/
		});

		/*get the iid for which we will update when we post*/
		var iid = curObj.reservation.getIid();

	
		var net = new oblInputNet([ti,pet]);
		net.setPostUrl("add_initi");
		net.addPair("iid",iid);
		net.addPair("jid",jid);
		net.addPair("type","petition");
		var _callback = function() {
			navProfile(globalBearings.getUid());
		};
		net.setCallback(_callback);

		/*explain that this is for pictures...*/
		var pse = oblC("d");
		pse.innerHTML = "Optionally add a main picture and supporting pictures for this petition.";
		pse.className = "headingI";
		pse.style.padding = "15px 0px 5px 0px";
		petitionDiv.appendChild(pse);
		

		/*a picture strip*/
		var ps = new oblPicSet({
			"type":"initi",
			"iid":iid,
			"new":1
		});
		var picTable = new oblTable(1,2);
		picTable.addContent(0,0,ps.getPic(0));
		var backing = oblC("a");
		var one = ps.getPic(1);
		var two = ps.getPic(2);
		var three = ps.getPic(3);

	

		backing.appendChild(one);	
		backing.appendChild(two);	
		backing.appendChild(three);	

		picTable.addContent(0,1,backing);
		petitionDiv.appendChild(picTable.getTable());

			
	
		var sb = document.createElement("button");
		petitionDiv.appendChild(giveSpace(25));
		var f = new oblCenterFooter(petitionDiv);
		f.addContent(sb);
		var SB = new YAHOO.widget.Button(sb);
		SB.on("click",net.post);
		SB.set("label","Submit");

		jefe.appendChild(petitionDiv);
        };
	
	/*

	var rad1 = document.createElement("button");

        var rad2 = document.createElement("button");
	var topDiv = document.createElement("div");
	
	var hTitle = document.createElement("span");
	hTitle.innerHTML = "Declare an Initiative for ";
	hTitle.className = "main_title";
	topDiv.appendChild(hTitle);
	var itowSpan = document.createElement("span");
	itowSpan.className = "jtitle";
	itowSpan.style.position = "relative";
	itowSpan.style.left =   "350px";
	var famIObj = new oblFamiliarItow({
		"thePar":itowSpan,
		"jid":jid
	});
	topDiv.appendChild(itowSpan);
	topDiv.appendChild(giveSpace(20));
	var initiTap = new oblTap(topDiv);
	initiTap.t("Ourbucketlist initiatives are a way to unite others behind your goal or cause." );
	initiTap.p("A Funds Drive allow you to raise money for a project or cause.  Declare an amount of funds you need to raise and recruit backers.  Money is only transferred if your funding goal is met with enough backers.  A petiition cause allows you to declare a petition statement and recruit signers.");
		
	topDiv.appendChild(document.createElement("br"));
	itowSpan.style.position = "relative";
	itowSpan.style.left = "20px";

	var initiEx = new oblTap(topDiv);
	initiEx.t = "Initiatives are a way to recruit support from others for something you intent to accoplish.";
	initiEx.p = "There are two types of initiatives.  Funding Drives and Petitions.  A funding drive is i";
	
	topDiv.appendChild(rad1);
	topDiv.appendChild(rad2);

	var fundingRad = new YAHOO.widget.Button(rad1);
	fundingRad.set("type","radio");
	fundingRad.set("label","Funding Drive");
	petitionRad = new YAHOO.widget.Button(rad2);
	petitionRad.set("type","radio");
	petitionRad.set("label","Petition Initiative");
	
	fundingRad.on("click",curObj.showFunding);
	petitionRad.on("click",curObj.showPetition);
	
		
	
	

	document.getElementById("feed").appendChild(topTiv);
	*/


	document.getElementById("feed").appendChild(jefe);
	/*currently, a petition is the only kind of initiave*/
	this.reservation = new oblPostReservation({
		"type":"initi",
		"callback":curObj.showPetition
	});
	



}

		

function oblIniti(args) {
	var id = args.id;
	var type = args.type;
        var curObj = this;
	var data;


        /*initiatvie pages attach themselves to feed*/
        var f = document.getElementById("feed");
	this.showText = function() {
		/*spring up a focus div and show the petition text with title*/
		 var it = new oblFocusDiv({
                	"setclass":"yt_focusdiv"
		});
		var innerDiv = oblC("d");
        	it.getDiv().appendChild(innerDiv);

		var pet = new oblTap(innerDiv);
		pet.setPClass("show_petition_p");
		pet.t(data.title);
		pet.p(data.description);
		pet.append();
		it.attach();
		
	};

	this.sendInvites = function() {

		


	};

	this.petitionTweet = function() {

	}

	this.promptPetitionTweet = function() {
		var backing = oblC("d");
                var explan = oblC("s");
		var whatsup = new oblTap(backing);
		whatsup.t("This will be sent out to your followers:");
		whatsup.p('"Please consider signing this petition for a cause I care about! http://ourbucketlist.com/#nav=spA' + id + '"');
                explan.innerHTML = "Ok?";
		
                var net = new oblInputNet();
		net.addPair("status",'Please consider signing this petition for a cause I care about! http://ourbucketlist.com/#nav=spA' + id);
                net.setPostUrl("tweet_onbehalf");

                backing.appendChild(giveSpace(10));
                backing.appendChild(explan);

                var d = new oblDialog({
                        "title":"Send invite via Email",
                        "content":backing
                });

                var _handler = function() {
                        net.post();
                        d.hide();
                };

                var buttons = ([
                    {text:"Ok",handler: _handler, isDefault: true},
                ]);
                d.changeButtons(buttons);

                d.show();



	};

	this.showInvite = function() {

		var backing = oblC("d");
		var explan = oblC("s");
		explan.innerHTML = "Invite someone to sign this petition via email.<br>Type the person's email here, or type multiple emails separated by commas";
		var inp  = new oblInput({
			"thePar":backing,
			"width":300,
			"name":"invitees"
		});
		var net = new oblInputNet([inp]);
		net.addPair("type","petition");
		net.addPair("method","email");
		net.addPair("iid",id);
		net.setPostUrl("send_invites");
	
		backing.appendChild(giveSpace(10));
		backing.appendChild(explan);

		var d = new oblDialog({
			"title":"Send invite via Email",
			"content":backing
		});

		var _handler = function() {
			net.post();
			d.hide();
		};

		var buttons = ([
        	    {text:"Ok",handler: _handler, isDefault: true},
	        ]);
		d.changeButtons(buttons);

		d.show();

		


	};

	this.alertSigned = function() {
		/*"you have signed this petition"*/
		var contentDiv = document.createElement("div");
		contentDiv.innerHTML = "You have signed this petition.";
		var a = new oblDialog({
			title:"You have signed this petition.",
			content:contentDiv
		});
		a.show();
		curObj.refreshList();
	};

	this.sign = function() {
	
		var request = newRequest();
	        var url = weburl + 'sign_petition?iid=' + id;
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	               if( request.readyState == 4 ) {
	                     if( request.status == 200 ) {
					curObj.alertSigned();

                              }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);
	};
	this.refreshList; //this is mentioned here but defined below.  i dont undersnatr JS scoping well...

        this.assemble = function(data) {
		/*The top table*/
		var topTable = new oblTable(1,2);

		var set = new oblPicSet({
			type:"initi",
			iid:id
		});

		
	
			
		
		topTable.addContent(0,0,set.getPic(0));
		topTable.addContent(0,1,set.getPic(1));
		topTable.addContent(0,1,set.getPic(2));
		topTable.addContent(0,1,set.getPic(3));
		
		topTable.addContent(0,1,document.createElement("br"));
		
		



		var infoDiv = document.createElement("div");


		if( data.type == "petition") {
			/*take those actions which are approtrate for a petition*/
			var titleSpan = document.createElement("span");
			titleSpan.className = "petition_title";
			titleSpan.innerHTML = data.title;
			
			topTable.addContent(0,1,titleSpan);
		}else{
			var raisedSpan = document.createElement("span");
			var thresholdSpan = document.createElement("span");
			var whattttttSpan = document.createElement("span");

			raisedSpan.className = "raised";
			thresholdSpan.className = "threshold";

			var other = document.createElement("span");
			other.innerHTML = "raised of target";
			
			raisedSpan.innerHTML =  "$" + data.raised;
			thresholdSpan.innerHTML = data.funding_threshold;
			
			topTable.addContent(0,1,raisedSpan);
			topTable.addContent(0,1,other);
			topTable.addContent(0,1,document.createElement("br"));
			topTable.addContent(0,1,thresholdSpan);
		}

		f.appendChild(topTable.getTable());
		f.appendChild(infoDiv);

		/*If this is the owner, present them with tools to invite participants*/
		if( data.uid == globalBearings.getUid() ) {
			var jefe = document.createElement("div");
			var titleSpan = document.createElement("span");
			titleSpan.innerHTML = "Campaign.";
			titleSpan.className = "headingIII";
			jefe.appendChild(titleSpan);
			jefe.appendChild(document.createElement("br"));
			var explanSpan = document.createElement("span");
			explanSpan.innerHTML = "&nbsp Recruit others to sign this petition using Email or Twitter:";
			explanSpan.className = "itowII";
			var panel = document.createElement("div");
			oblPosition([panel,0,0,0,280]);
			jefe.appendChild(explanSpan);
			jefe.appendChild(giveSpace(20));
			var ib = document.createElement("button");
		        var img = document.createElement("img");
		        img.src = imagesPath + "mail.png";
		        ib.appendChild(img);
			ib.appendChild(document.createElement("br"));
			ib.appendChild(document.createTextNode("Email"));
		        panel.appendChild(ib);
			var bu = document.createElement("button");
                        var img = document.createElement("img");
                        img.src = imagesPath + "twitter.png";
                        bu.appendChild(img);
                        bu.appendChild(document.createElement("br"));
                        bu.appendChild(document.createTextNode("Twitter"));
                        panel.appendChild(bu);
			jefe.appendChild(panel);
		        var yb = new YAHOO.widget.Button(ib);
			yb.on("click",curObj.showInvite);
			var tb = new YAHOO.widget.Button(bu);
			tb.on("click",curObj.promptPetitionTweet);
			f.appendChild(jefe);
		}
		
		if( data.type == "petition") {
				var list = new oblSignatureList({
					"id":id,
					"thePar":f
				});

				curObj.refreshList = function() {
					list.refresh();
				};
		}


		
		
			



		if( type == "petition" ) {

			/*click to sign this petition*/
			var _sbutton = document.createElement("button");
                        topTable.addContent(0,1,giveSpace(20));
                        topTable.addContent(0,1,_sbutton);
                        var sbutton = new YAHOO.widget.Button(_sbutton);
                        sbutton.set('label','Sign This Petition');
                        sbutton.on("click",curObj.sign);

			
                        /*click to see petition statement*/
                        var _button = document.createElement("button");
			topTable.addContent(0,1,giveSpace(20));
                        topTable.addContent(0,1,_button);
                        var button = new YAHOO.widget.Button(_button);
                        button.set('label','Show Petition Text');
                        button.on("click",curObj.showText);


                }else{
                        /*show funding goals and graph*/
                }

				
        };

			

        this.fetch = function() {
                var request = newRequest();
                var url = weburl + 'get_initi?iid=' + id;
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        data = eval('(' + request.responseText + ')');
                                        curObj.assemble(data);

                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);
        };

        this.fetch();


}
			


function oblInputCount(refIn,refOut,count) { 
/*args:  a refIn  - ths is the ref to the input or textarea elemtn.  a refOut to an element in the dom.  in this ref the remaining count will be displayed.
the count is an integer which just defines the maximum count allowed in the input (Or textarea)*/
	var curObj = this;



	this.showCount = function() {
		var s = refIn.value;
		var remain = count - s.length;
		if( remain > 0 ) {
			refOut.className = "char_count_ok";
		}else{
			refOut.className = "char_count_exceeded";
		}
		refOut.innerHTML = remain;
	};

	var _showCount = function() { curObj.showCount(); };
		
	addListener("keyup",refIn,_showCount);

	//start out by showing the count
	this.showCount();
}


function oblInputExp() {
	var curObj = this;
        var type = "js";
        var elementId;
        var explanation = "Type here to input";
        var elementRef = {};
	var isPassword;

        this.setElementId = function(id) {
                type = "dom";
                elementId = id;
        };

	this.setPassword = function() {
		isPassword = 1;
	};


        this.setElement = function(ref) {
                elementRef = ref;
        };

	this.setText = function(m) {
		explanation = m;
	};

	this.swapType = function(newType) {
		 if( navigator.appName == 'Microsoft Internet Explorer') {

			var form = elementRef.parentNode;
			var signinImg = form.getElementsByTagName("a")[0];
			var newInput = elementRef.cloneNode(true);
			newInput.type = newType;

			//getrid of the current object
			form.removeChild(elementRef);
			form.insertBefore(newInput,signinImg);
			
			elementRef = newInput;	
			elementRef.focus();
			
			
		
			//insert into the proper place.

		}else{
			elementRef.type = newType;
		}

		

	};


        this.setExp = function(e) {

		if (e) explanation = e;
        if( type == "dom" ) 
			elementRef = document.getElementById(elementId);

                elementRef.style.color = "gray";
                elementRef.value = explanation;

                var _clearAndStandard = function() {
                        if( elementRef.value == explanation ) {
                                elementRef.value = '';
                                elementRef.style.color = "#333333";
				if( isPassword )
					curObj.swapType("password");
                        }
                };
                var _resetExp = function() {
                        if( elementRef.value == '' ) {
                                elementRef.value = explanation;
                                elementRef.style.color = "gray";
				if( isPassword )
					curObj.swapType("text");
                        }
                };

                addListener("focus",elementRef,_clearAndStandard);
                addListener("blur",elementRef,_resetExp);
        };
}

function oblInput(args) {

	var curObj = this;
	var contentCheck = 0;
	 if(args.requirement) {
                contentCheck = 1;
		curObj.contentReq=1;
                curObj.requirement = args.requirement;
        }


	this.explanation = args.exp;


	var isPassword =0;
	if(args.isPassword)
		isPassword=args.isPassword;

	this.name = args.name;
	this.width = args.width;
	this.count = args.count;
	this.thePar = args.thePar;
	this.textarea = args.textarea;
	this.ok = 0;
	var inp;
	var ccs = document.createElement("span");
	ccs.style.position = "relative";
	ccs.style.left = "5px";
	
	var img = document.createElement("img");
	img.style.position = "relative";
	img.style.top = "7px";
	ccs.appendChild(img);
	ccs.style.visibility = "hidden";
		
	/*checkboxes will need a description.  this method sets it*/	
	this.setCheckboxDesc = function(desc) {
		curObj.checkDescSpan.innerHTML = desc;
	};

		

	if( this.textarea ) {
		inp = document.createElement("textarea");
		inp.style.className = "conspicuous_input";
		inp.style.height = "500px";
		ccs.style.bottom = "485px";
		
	}else{
		inp = document.createElement("input");
		inp.className = "conspicuous_input";
	}
	inp.id = args.id;
	if( args.checkbox ) {
		inp.type = "checkbox";
		inp.style.width = "18px"; //chrome seems to want to make this wide.
		inp.value = 1;
		curObj.checkDescSpan = document.createElement("span");
	}
	this.contentCheck = function() {
		//create a span where an indicator image will be shown.
		//check the content

		if( inp.type == "checkbox" ) {  //if we havea checkbox we do things differently.

			if(inp.checked==1) {
				curObj.ok = 1;
			}else{
			}
			return curObj.ok;
		}
				
		if( inp.value.search(curObj.requirement) == -1 ) {
                        curObj.ok = 0;
                }else{
                        if( inp.value == curObj.exp ) {
                                curObj.ok = 0;
                        }else{
                                curObj.ok =1;
                        }
                }
	
		//show the right image.
		if( curObj.ok ) {
			img.src = imagesPath + "input_ok.png";
		}else{
			img.src = imagesPath + "input_trouble.png";
		}
		ccs.style.visibility = "visible";

		return curObj.ok;

	};
	this.setNotOk = function() {
		img.src = imagesPath + 'input_trouble.png';
		ccs.style.visibility = "visible";
		curObj.ok = 0;
	};
	this.getInput = function() {
		return inp;
	};
	 this.setValue = function(v) {
		if( isPassword )
			curObj.swapType("password");	
		inp.style.color = "#333333";
                inp.value = v;
        };

	this.swapType = function(newType) {
                 if( navigator.appName == 'Microsoft Internet Explorer') {

                        var form = inp.parentNode;
                        var signinImg = form.getElementsByTagName("a")[0];
                        var newInput = inp.cloneNode(true);
                        newInput.type = newType;

                        //getrid of the current object
                        form.removeChild(inp);
                        form.insertBefore(newInput,signinImg);

                        inp = newInput;
                        inp.focus();



                        //insert into the proper place.

                }else{
                        inp.type = newType;
                }



        };


	this.setExp = function() {

                inp.style.color = "gray";
                inp.value = curObj.explanation;

                var _clearAndStandard = function() {
                        if( inp.value == curObj.explanation) {
                                inp.value = '';
                                inp.style.color = "#333333";
                                if( isPassword )
                                        curObj.swapType("password");
                        }
                };
                var _resetExp = function() {
                        if( inp.value == '' ) {
                                inp.value = curObj.explanation;
                                inp.style.color = "gray";
                                if( isPassword )
                                        curObj.swapType("text");
                        }
                };

                addListener("focus",inp,_clearAndStandard);
                addListener("blur",inp,_resetExp);

	};

	inp.style.width = this.width + "px";

	//set the name of the input
	inp.name = this.name;

	this.on = function(action,handler) {
		addListener(action,inp,handler);
	};
		
	//set a content requirement
	
	this.setReq = function(req) {
		curObj.contentReq = 1; //signal that there is a content requirement.
		//set listener to check on blur		
		
		addListener("blur",inp,curObj.contentCheck);
		/*later need to define various requirements*/

	};
	if(args.requirement)
		this.setReq(curObj.requirement);
	
	
	
	if( inp.type == "checkbox" ) {
		/*attach the checkbox to the parent element*/
		curObj.thePar.appendChild(inp);
		curObj.thePar.appendChild(curObj.checkDescSpan);
	}else{
		
		if( this.count ) {
			var theSpan = document.createElement("span");
			var remExp = document.createElement("span");
			remExp.innerHTML = " characters remaining.";
			curObj.thePar.appendChild(theSpan);
			curObj.thePar.appendChild(remExp);
			curObj.thePar.appendChild(inp);
			curObj.thePar.appendChild(ccs);
			var c = new oblInputCount(inp,theSpan,curObj.count);
			curObj.thePar.appendChild(document.createElement("br"));
		}else{
			curObj.thePar.appendChild(inp);
			curObj.thePar.appendChild(ccs);
			curObj.thePar.appendChild(document.createElement("br"));
		}
	}
	
		
	
		

	this.getName = function() {
		return curObj.name;
	};

	this.getValue = function() {
		if( curObj.contentReq ) {
			curObj.contentCheck();
		}else{
			curObj.ok = 1; //we have to return this as good since the contentCheck wont check it out.
		}
		if( curObj.ok ) {
			return inp.value;
		}else{
			return "x1015US";
		}
	};

	if(curObj.explanation)
		this.setExp();
	
}

function oblInputNet(arrayRef) { 
/*This "net" is something that is thrown around a set of oblInputs.  it can collect their respective names and values.
it also has provision to add name/value pairs (the equivalent of what hidden input boxes used to do). 
finally, it submits the values key/values to the URL of choice.  */
	
	var curObj = this;
	var values = {};

	this.trouble = 0;

	this.addPair = function(k,v) {
		values[k] = v;
	};
		
		
	//this needs a return function.

	this.getValues = function() {

		if( !arrayRef ) 
			return;
		var value;
		var name;
		for( var i=0;i<arrayRef.length;i++) {
			var cur = arrayRef[i];

	
			name = cur.getName();
			value = cur.getValue();
			if( value == "x1015US" ) {
				curObj.trouble = 1;
			}
			values[name] = value;

		}
	};


	this.post = function() {
		trouble=0;
		curObj.getValues();
		if(curObj.trouble == 1){
			alert("Please complete the entire form.");
			curObj.trouble=0;//reset the trouble indicator.
			return;
		}




		var url = weburl + curObj.url;


		standardPost(url,values,curObj.callback);
	};

	this.setPostUrl = function(url) {
		curObj.url = url;
	};

	this.setCallback = function(c) {
		curObj.callback = c;
	};
		
}

function oblJourneyConcourse(args) {

 	var curObj = this;
        var data;
        /*arrange to display the concourse*/
        args.thePar.innerHTML = '';
        setConcourse();

        /*attach the container elements for the left panel*/
        var lp = document.getElementById("concourse_left");
        var d1 = oblC("d");
        d1.id = "leadership_cont";
        var d2 = oblC("d");
        d2.id = "media_cont";
        var d3 = oblC("d");
        d3.id = "people_cont";
        oblAppend([lp,d1,d2,d3]);

	/*attach the container elements for the right panel*/
	var rp = document.getElementById("concourse_right");
	var pd = oblC("d");
	pd.id = "post_cont";
	var fd = oblC("d");
	fd.id = "feed_cont";
	oblAppend([rp,pd,fd]);

	/*instantiate the various widgets for this panel*/
	this.assemble = function(){
		/*if a leader has been elected - then spawn a leadership panel*/
		if(data.leaderElected) var leadershipPanel = new oblLeadershipPanel();
		/*instantiate a users panel, which summarizes which users have added this item*/
		var peoplePanel = new oblPeoplePanel({
			jid:args.jid
		});
		/*instantiate a media panel*/
		var mediaPanel = new oblMediaPanel({
			jid:args.jid
		});
		/*instantiate the feed*/
		var feed = new oblFeed({
			jid:args.jid
		});
		/*instntiate the post widge*/
		var postWidget = new oblPostWidget({
			jid:args.jid,
			feedObj:feed
		});
		
	};

	this.fetch = function(){
		/*the concourse will request the Journey Docket, which is a 
 		summary containing high level information about the journey*/
		var request = newRequest();	
		var url = weburl + "get_journey_docket" + "?jid=" + args.jid;
		request.open("GET",url,true);
                request.onreadystatechange = function() {
                 	if( request.readyState == 4 ) {
                        	if( request.status == 200 ) {
                                	data = eval('(' + request.responseText + ')');
                                        curObj.assemble();

                                }
                        }
                 };
                 request.send(null);
        };         
	/*kick things off*/
	this.fetch();
}

function oblJourneyFeed(args) {
}
		
		
		


//THIS FUNC DOES NOT WORK.
function oblJsonReq(str) {  //this function will block until the request is received.
	var request = newRequest();
        var url = weburl + str;
        request.open("GET",url,true);
        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                data = eval('(' + request.responseText + ')');

                        }
                }
        };
        //now send.  we'll be waiting...
        request.send(null);

	while( request.readyState != 4 ) {
		while( request.status != 200 ) {
		}
	}
	return data;
}

function oblLeaderChallenge(args) {
	var curObj = this;
	var content = oblC("d");

	var data;
	this.checkAvail = function() {
		var request = newRequest();
                var url = weburl + 'check_leadership?jid=' + args.jid;
                request.open("GET",url,true);
                 request.onreadystatechange = function() {
                                if( request.readyState == 4 ) {
                                        if( request.status == 200 ) {
                                                data = eval('(' + request.responseText + ')');
                                                curObj.assemble(data);

                                        }
                                }
                 };
                 //now send.  we'll be waiting...
                 request.send(null);
	};
	
	this.notifySent = function() {
		/*Notify the user that the declaration has been sent and that it is now going for a vote*/
		var content = oblC("d");
		content.style.width = "400px";
		content.innerHTML = "Your declaration for leadership has been sent for this initiative.  This will now go to vote.  During the next four days, everyone who has listed this initiative will have the opportunity to vote on your leadership.";
		content.appendChild(giveSpace(40));
		var e = new oblDialog({
			"title":"Leadership declaration sent",
			"content":content
		});
		 var buttons = ([
                { text:"Ok",
                handler:e.hide, isDefault:true}
                ]);
                e.changeButtons(buttons);
		e.show();
	

	};
	
	this.send = function() {
		/*send this leadership declaration*/
		var request = newRequest();
                var url = weburl + 'declare_leadership?jid=' + args.jid;
                request.open("GET",url,true);
                 request.onreadystatechange = function() {
                                if( request.readyState == 4 ) {
                                        if( request.status == 200 ) {
                                                data = request.responseText; //its just a single word being return here.
						curObj.notifySent();

                                        }
                                }
                 };
                 //now send.  we'll be waiting...
                 request.send(null);


	};

	this.assembleChallenge = function() {
		/*it is assumed here that there is an existing leader*/

		var backing = oblC("d");
		var d = new oblDialog({
			"title":"Challange " + data.leaderUsername + "'s leadership?",
			"content":backing
		});
		backing.innerHTML = "Are you sure you want to challenge " + data.leaderUsername + "'s leadership for this initiative?";
		backing.appendChild(giveSpace(40));


		var _send = function() {
			curObj.send();
			d.hide();
		};

		var buttons = ([
		{ text:"Yes",
                handler:_send, isDefault:true},
                { text:"No",
                 handler:d.hide, isDefault:false}
                ]);
                d.changeButtons(buttons);

                d.show();



	};

	this.assemblePending = function() {
		var backing = oblC("d");
		backing.innerHTML = "Leadership for this initiative is currently being voted on.<br>  You may challenge leadership for this initiative once the voting is finished.";
		backing.appendChild(giveSpace(40));

		var d = new oblDialog({
                        "title":"Cannot declare leadership at this time",
                        "content":backing
                });
		var buttons = ([
                { text:"Ok",
                 handler:d.hide, isDefault:true}
                ]);
                d.changeButtons(buttons);

                d.show();
	};


	this.assemble = function() {
		/*assemble a UI.  if the journey is currently under challenge
		then say that it cannot be voted on.
		if its OK - just confirm that the user indeed
		wants to declare himself/herself a leader*/
		if(data.granted == "y") {
			curObj.assembleChallenge();
			return;
		}
		if(data.granted == "p") {
			curObj.assemblePending();
			return;
		}

		/*if we have got this far then its fresh, so just confirm*/
		var backing = oblC("d");
		backing.innerHTML = "Are you sure you want to declare your leadership for this initiative?";
		backing.appendChild(giveSpace(40));
		var d =  new oblDialog({
			"title":"Sure?",
			"content":backing
		});
		var _send = function(){
			d.hide();
			curObj.send();
		};
		 var buttons = ( [
                { text:"Yes",
                handler:_send, isDefault:true},
                { text:"No",
                 handler:d.hide, isDefault:false}
	        ]);
	        d.changeButtons(buttons);
	
	        d.show();

		
	};

	this.checkAvail();
	
	
		


}

function oblLeaderDisplay(args) {
	/*an oblLeaderDisplay is called from a feed.  the feeds data 
	should "know" if there is a leader, and if so, who it is.
	in the case that there is no leader, this shouldn't be instantiated.
	if there is, then the required data is passwed to the constructor and
	here we are.*/
	

	var backing = oblC("d");
	backing.style.position = "relative";
	backing.style.left="400px";
	backing.style.bottom = "4px";
	var pic = oblC("i",imagesPath + "leader_star.png");
	pic.style.position = "relative";
	pic.style.top = "4px";
	pic.style.padding = "0px 4px 0px 0px";
	backing.appendChild(pic);
	var un = oblC("a");
	un.innerHTML = args.username;
	addListener("click",un,function() {
		navProfile(args.uid);
	});
	var display = document.createTextNode(" is the leader for this initiative.");
	backing.appendChild(un);
	backing.appendChild(display);

	var thePar = document.getElementById("leaderSpan");
	thePar.appendChild(backing);
		

}

function oblLeadershipPanel(args) {
	/*Leadship Panel should attach itself to the right of the journey concourse
 * 	the panel provides the user a single pane interface into the leadership status of 
 * 	this item.*/
	var container = document.getElementById("leadership_cont");
	var box = oblC("d","concourse_panel_box");
	container.appendChild(box);
	alert("when I see you baby, I just don't want to let go");
	
	
	
	
 	
}

function oblLeadershipVotePrompt(args) {

	var curObj = this;
	var data;

	var backing = oblC("d");
	var d = new oblDialog({
		"title":"Vote on Leadership",
		"content":backing
	});

	this.sendNo = function() {
		 var request = newRequest();
	        var url = weburl + "vote_leadership?vote=no;id=" + args.id;
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
					d.hide();
					curObj.confirmVoted();
	                        }
	
	                }
	        };
	        request.send(null);
	};

	this.confirmVoted = function() {

		var hey = oblC("d");
		hey.innerHTML = "Your vote has been received.";
		var e = new oblDialog({
			"title":"Your vote has been received",
			"content":hey
		});
		var buttons = ([
                        {text:"Ok",handler: e.hide, isDefault: true}
                ]);

                e.changeButtons(buttons);
                e.show();

		


	};

	this.sendYes = function() {
                 var request = newRequest();
                var url = weburl + "vote_leadership?vote=yes;id=" + args.id;
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        d.hide();
					curObj.confirmVoted();
                                }

                        }
                };
                request.send(null);

	};


	this.assemble = function() {

		var span1 = oblC("d");
		span1.innerHTML = "Should " + data.leaderUsername + " be<br>  made the leader of this initiative?";
		var t = oblC('d');
		t.innerHTML = data.leaderUsername + " has declared leadership for the initiative <br>to <b>" + data.itow + "</b>";
		backing.appendChild(t);
		backing.appendChild(giveSpace(15));
		backing.appendChild(span1);
			
		
	
		 var buttons = ([
	            {text:"Vote Yes",handler: curObj.sendYes, isDefault: true},
			{text:"Vote No",handler: curObj.sendNo, isDefault: false}
	        ]);
	
		d.changeButtons(buttons);
		d.show();
	};

	this.check = function() {

		 var request = newRequest();
                var url = weburl + "check_leadership?checkById=1;id=" + args.id;
                request.open("GET",url,true);

                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                       data = eval('(' + request.responseText + ')');
					curObj.assemble();
                                }

                        }
                };


                 //now send.  we'll be waiting...
                request.send(null);
	};

	this.check();


}

function oblMediaPanel(args) {
	/*Media Panel should attach itself to th right of the journey concourse.
 * 	The panel provides the user with an interface for the media attached to this journey.*/

	
	var curObj = this;
	var data;
	
	var container = document.getElementById("media_cont");
	var box = oblC("d","concourse_panel_box");
	container.appendChild(box);
	var backing = oblC("d");
	box.appendChild(backing);
	this.assemble = function(){
		/*panel logo*/
		var logo = oblC("i",imagesPath + "media2013.png");
		logo.className = "panel_icon";
		var title = oblC("d","panel_heading");
		title.innerHTML = "Media";
		var picCont = oblC("d","media_panel_picture_container");
		oblAppend([backing,logo,title,picCont]);
		for(var i=0;i<data.thumbUrls.length;i++) {
			var pc = oblC("a");
			addListener("click",pc,function(){
				var e = new oblPicViewer({
					type:"journey",
					jid:args.jid,
					start:i
				});
			});
			var pic = oblC("i",data.thumbUrls[i]);
			pc.appendChild(pic);
			pic.className = "media_panel_picture";
			picCont.appendChild(pc);
		}	
	};

	this.fetch = function(){
		/*--------------------------*/
		var request = newRequest();
                var url = weburl + "get_media_set?type=journey;jid=" + args.jid;
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        data = eval('(' + request.responseText + ')');
                                        curObj.assemble();

                                }
                        }
                 };
                 request.send(null);
	};
	/*kick things off*/
	this.fetch();
}



standardPost = function(url, values, callback, errorHandler) {
	var request =  newRequest();



	request.onreadystatechange = function() {
		if( request.readyState == 4) {
			if( request.status == 200) {
				callback(request);
			}
			else {
				if (errorHandler) errorHandeler(request.status,
							request.statusText);
				else alert('Callback is being triggered:  No error handler');//else callback(null);
			}
		}
	};
	request.open("POST", url);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	

 	request.send(encodeFormData(values));
};

function oblNoAuth(p) {

	var widgetDiv = document.createElement("div");
	widgetDiv.style.padding = "50px";
	var par = document.getElementById(p);
	par.appendChild(widgetDiv);
	
	//create the elements for the title
	var titleS = document.createElement("span");
	titleS.style.fontSize = "15px";
	titleS.style.fontWeight = "bold";
	widgetDiv.appendChild(titleS);
	var explan = document.createElement("div");
	explan.style.padding = "10px";
	explan.innerHTML = "Please log in below:";
	widgetDiv.appendChild(explan);
	
	
	
	

	this.setTitle = function(title) {
		//set text for title
		titleS.innerHTML = title;
	};


        var table = new oblTable(1,2);
	table.setClassName("gray_out");
	table.setRowClass(0,"gray_out");
	table.setCellClass(0,0,"gray_out");

        var lf = document.createElement("form");
        lf.action = "/!login/";
        lf.method = "POST";
	
	var ui = new oblConspicuousInput("credential_0");
	
	var uiExp = new oblInputExp();
	uiExp.setElement(ui.getInput());
	uiExp.setExp("username");
	
	var pi = new oblConspicuousInput("credential_1");

	var hi = new oblHiddenInput("destination","/");
	
	var piExp = new oblInputExp();
	piExp.setPassword();
	piExp.setElement(pi.getInput());
	piExp.setExp("password");
	
	

	lf.appendChild(ui.getInput());
	var spacer1 = document.createElement("div");
	spacer1.style.height = "15px";
	lf.appendChild(spacer1);
	lf.appendChild(pi.getInput());
	lf.appendChild(hi.getInput());
	
	//here should be a suggestion to create an account?
        var suggest = document.createElement("div");


        table.addContent(0,0,lf);
	
	//create a submit form button.
	var button = document.createElement("button");
	button.id = "LoginButton";
	table.addContent(0,0,button);
	
	

	var _login = function() {
		lf.submit();
	};
        widgetDiv.appendChild(table.getTable());
	var yB = new YAHOO.widget.Button("LoginButton");
	yB.set('label','Sign In');
	yB.on("click",_login);

}

function oblP2fb(args) {
	var curObj = this;
	var thePar = args.thePar;
	var parObj = args.parObj;

	var backing = oblC("d");
	var t = new oblTable(1,3);
	var cb = document.createElement("input");
	cb.type = "checkbox";
	t.addContent(0,0,cb);

	var left = oblC("d");
	var pic = oblC("i",imagesPath + "facebook_small.png");
	left.appendChild(pic);
	
	
	var right = oblC("d");
	right.innerHTML = "Also post to Facebook?";
	cb.className = "p2fb_checkbox";
	right.className = "p2fb_right_div";
	t.addContent(0,0,left);
	t.addContent(0,1,cb);
	t.addContent(0,2,right);

	thePar.appendChild(t.getTable());

	this.setPost = function() {
		cb.checked = true;
		curObj.post = true;
		/*If this is the users' first time stating that they 
		want to post something to faebook, we need to get
		their permission*/
		if( !(globalBearings.alwaysP2fb()) )  {
			oblFBPermsRequest();
		}
	};

	this.unsetPost = function() {
		cb.checked = false;
		curObj.post = false;
	};

	addListener("click",cb,function() {
		if(cb.checked){
			curObj.setPost();
		}else{
			curObj.unsetPost();
		}
	});

	this.post2fb = function() {
		return curObj.post;
	};

	//this.unsetPost();	
	if( globalBearings.alwaysP2fb() ) {
		curObj.setPost();
	}

			

}	

function oblPage(id) {
	var curObj = this;

	/*pages attach themselves to feed*/
	var f = document.getElementById("feed");

	this.assemble = function(data) {
		

	};

	this.fetch = function() {
		var request = newRequest();
                var url = weburl + 'get_page?type=' + type + ';iid=' + iid;
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        data = eval('(' + request.responseText + ')');
                                        curObj.assemble(data);

                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);
	};

	this.fetch();


}


	
function oblPeoplePanel(args) {
	var curObj = this;
	var data;
	
	var container = document.getElementById("people_cont");
	var box = oblC("d","concourse_panel_box");
	container.appendChild(box);
	var backing = oblC("d");
	box.appendChild(backing);
	this.assemble = function(){
		/*panel logo*/
		var logo = oblC("i",imagesPath + "person2013.png");
		logo.className = "panel_icon";
		var title = oblC("d","panel_heading");
		title.innerHTML = "People";
		var picCont = oblC("d","media_panel_picture_container");
		var nd = oblC("d");
		nd.innerHTML = "There are " + data.count + " people on this item.";
		oblAppend([backing,logo,title,nd,picCont]);
		/*create a container for the pictures*/
		/*loop through the pictures and place*/
		for(var i=0;i<data.picUrls.length;i++){
			var a = oblC("a");
			picCont.appendChild(a);
			addListener("click",a,(function(c) {
                               return function(blah) {
					navProfile(c);
                               };
                        })(data.uids[i]));
			var picture = oblC("i",data.picUrls[i]);
			picture.className = "panel_picture";
			a.appendChild(picture);
			
		}
	};

	this.fetch = function(){
		/*--------------------------*/
		var request = newRequest();
                var url = weburl + "get_embarked_users" + "?jid=" + args.jid + ";limit=12";
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        data = eval('(' + request.responseText + ')');
                                        curObj.assemble();

                                }
                        }
                 };
                 request.send(null);
	};
	/*kick things off*/
	this.fetch();	
}




function oblPersistentQue(args) {

	var curObj = this;
	var todo = 0;
	this.perform = function() {

		var hash = {};

		/*parse the cookie into a hash*/
		hash = parseCookie();



		/*find the action*/
		if(hash['action']) {

			var stuff = hash['action'].split('+');

			switch( stuff[0] ) {
				case "sign_petition":
					todo = 1;
					var p = new oblIniti({
						"type":"petition",
						"id":stuff[1]
					});
					p.sign();
					document.cookie = "action=none";
					break;
				case "add_journey":
					todo=1;
					addExistingJourney(stuff[1]);
					callProfile();
					document.cookie = "action=none";
					break;
				case "tweet":
					todo=1;
					navHome();
					var t = new oblTwitterPrompt({
						"tweet":stuff[1]
					});
					document.cookie = "action=none";
					break;
				case "vote_leadership":
					todo=1;
					var v = new oblLeadershipVotePrompt({
						id:stuff[1]
					});
					document.cookie = "action=none";
					break;
				default:
					todo=0;
					break;
			}	
		}

		return todo;


	};
	if( args ) {
		var action = args.action;
		var id = args.id;
		var theString = args.theString;
	
		if(id)
			var newC = "action=" + action + "+" + id;
		if(theString)
			var newC = "action=" + action + "+" + theString;
	
		document.cookie = newC;
	}
		
	
		

}


function oblPetitionList() {
	var curObj = this;

	this.isEmpty = function() {

		var e = oblC("s");
		e.innerHTML = "You have not declared any petitions yet.";
		e.className = "headingIII";
		                var f = document.getElementById("feed");
                f.innerHTML = '';
                f.appendChild(e);


	};
	this.assemble = function(data) {

		if(data.iids.length == 0) {
			curObj.isEmpty();
			return;
		}

		var jefe = document.createElement("div");
		
		for(var i=0;i<data.iids.length;i++) {
			var table = new oblTable(1,2);
			table.setClassName("gray_out");
			table.setRowClass(0,"gray_out");
			var img = document.createElement("img");
			oblPosition([img,6,0,0,0]);
			img.src = imagesPath + "petition.png";
			var theTitle = document.createElement("span");
			theTitle.className = "headingI";
			
		
			var theItow = document.createElement("span");
			theItow.className = "itowII";
			oblPosition([theItow,0,0,0,10]);
			var countLine = document.createElement("span");
			countLine.className = "quant";

			/*a click on the picture, itow, title or count should take the user
			to the petition. */

			
			theTitle.innerHTML = data.titles[i];
			theItow.innerHTML = "For " + data.itows[i];
			countLine.innerHTML = data.signature_counts[i] + " people have signed.";

			table.addContent(0,0,img);	
			table.addContent(0,1,theTitle);
			table.addContent(0,1,document.createElement("br"));
			table.addContent(0,1,theItow);
			table.addContent(0,1,document.createElement("br"));
			table.addContent(0,1,countLine);
		
			var petLink = document.createElement("a");
			addListener("click",petLink,(function(c) {
                                return function(blah) {
                                        navPetition(c);
                                };
                        })(data.iids[i]));
			petLink.appendChild(table.getTable());
		


			
				


			jefe.appendChild(petLink);
			jefe.appendChild(giveSpace(25));
			


		}

		var f = document.getElementById("feed");
		f.innerHTML = '';
		f.appendChild(jefe);
		

		
			

	};

	this.fetch = function() {
                var request = newRequest();
                var url = weburl + 'get_petition_list';

                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        var data = eval('(' + request.responseText + ')');
                                        curObj.assemble(data);

                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);
	};

	this.fetch();
}


/*ideally, I'd like to have an oblPicSet be a set of
oblPics, and then have hover functionality as
something that oblPics just do*/
function oblPicHover(args) {

	var curObj = this;

	var img = args.img;

	
	var what = oblC("s");
	what.innerHTML = "test";
	what.style.color = "red";

	img.appendChild(what);	

}

function oblPic(args) {
	var curObj = this;
	var thePar = args.thePar;
	var url = args.url;
	var click = args.click;
	var link = oblC("a");
	var slot;
	var img = oblC("i",args.url);

	this.assembleSlotted = function() {
		slot = oblC("d");
		slot.style.width = args.width + "px";
		slot.style.height = args.height + "px";
		slot.style.overflow = "hidden";
		
		img.style.position = "relative";
		img.style.bottom = args.yOffset + "px";
		slot.appendChild(img);
		thePar.appendChild(slot);
	};

	this.assemble = function() {
		link.appendChild(img);
		args.thePar.appendChild(link);
	};

	if(args.slotted){
		curObj.assembleSlotted();
	}else{
		curObj.assemble();
	}
	
	if(click)	
		addListener("click",link,args.click);
	if(args.url)
		thePar.appendChild(link);

	

}


function hoverHelp(e,code) {
        //get the corderinates.  
        var x = e.clientX;
        var y = e.clientY + window.pageYOffset;
        //add to this as we want the help pop up to appear below the cursor.
        y = y + 25;
        var body = document.getElementById("body");
        var div = document.createElement("div");

        var hide = function() {
                div.style.visibility = 'hidden';
        };
        var element;
         if( e.srcElement ) {
                element = e.srcElement;
        }else{
                element = e.currentTarget;
        }

        if( !element.addEventListener ) {

                element.attachEvent("onmouseout",hide);
                element.attachEvent("onclick",hide);
        }else{
                element.addEventListener("click",hide, false);
                element.addEventListener("mouseout",hide, false);
        }
        var content;
        switch( code ) {
                case 'cpt':
                        content = 'Co-opting is a secret way to signal that you want to share this journey with them.  They are not alerted unless and until they also co-opt you!';
                        break;
                case 'add':
                        content = 'Click to add this journey to your bucketlist.';
                        break;
                case 'att':
                        content = 'Add a post for this journey';
                        break;
                case 'jfl':
                        content = 'Click to see posts other users have attached to this journey.';
                        break;
                case 'con':
                        content = 'Finish this journey or remove it from your list.';
                        break;
                case 'inv':
                        content = 'Invite others to join you on this journey!';
                        break;
		case 'chp':
			content = "Click to change this picture.";
			break;
                default:
                        break;
        }
	div.style.width = '200px';
        div.style.padding = '3px 3px 3px 3px';
        div.className = 'hover';
        if( navigator.appName == 'Microsoft Internet Explorer')
                div.style.backgroundColor = 'black';
        div.style.position = 'absolute';
        div.style.top = y + 'px';
        div.style.left = x + 'px';
        div.innerHTML = content;
        body.appendChild(div);
}



function oblPicSet(args) {
	var curObj = this;
	var data;
	curObj.iid = args.iid;

	var backing = oblC("d");

	var signal = 0;
	//this will be an array of image objects.	
	var images = [];
	this.promptAdd = function(thePar) {
		 /*prompt the user to change this picture*/
                var picForm = document.createElement("form");
                picForm.id = "PictureForm";
                picForm.method = "post";
                picForm.enctype = "multipart/form-data";
                picForm.action = weburl + "add_picture_a";
                picForm.target = "UploadTarget";
                var hi = new oblHiddenInput("type",args.type);
                picForm.appendChild(hi.getInput());
		var oi = new oblHiddenInput("iid",args.iid);
		picForm.appendChild(oi.getInput());
                /*if we already have a picture, then we are performing an update
                and not a new picture addtion.  in this case, the server needs
                a pid parameter, so it knows to change an existing pic, rather than
                create a unique PID and add a new file*/
		var num = "whatever";
                if( data.pids[num] ) {
                        var pidFlag = new oblHiddenInput("pid",data.pids[num]);
                        picForm.appendChild(pidFlag.getInput());
                }
                var fInput = document.createElement("input");
                fInput.type = "file";
                fInput.name = "datafile";
                picForm.appendChild(fInput);
                //create the iframe, the target of the form submission
                var uTarget = document.createElement("iframe");
                uTarget.id = "UploadTarget";
                uTarget.name = "UploadTarget";
                uTarget.style.width = "0px";
                uTarget.style.height = "0px";
                uTarget.style.border = "0px";
                addListener("load",uTarget,curObj.fetch);
                var backing = oblC("d");
                backing.appendChild(picForm);
                backing.appendChild(uTarget);
		if(args.type == "user" ) {
	                var d = new oblDialog({
	                        "title":"Add a profile picture:",
	                        "content":backing,
				"thePar":thePar
	                });
		}
		if(args.type == "triumph") {
			var d =  new oblDialog({
                                "title":"Add another triumph picture:",
                                "content":backing,
                                "thePar":thePar
                        });
		}
	

                var _submit = function() {
                        picForm.submit();
                        d.hide();
                };
                var buttons = ( [ { text:"Add",
                handler:_submit, isDefault:true } ]);

                d.changeButtons(buttons);
                d.show();

	};


	this.promptChange = function(num) {

		/*prompt the user to change this picture*/
		var picForm = document.createElement("form");
	        picForm.id = "PictureForm";
	        picForm.method = "post";
	        picForm.enctype = "multipart/form-data";
	        picForm.action = weburl + "add_picture_a";
	        picForm.target = "UploadTarget";
	        var hi = new oblHiddenInput("type",args.type);
        	picForm.appendChild(hi.getInput());
	        var hi = new oblHiddenInput("iid",args.iid);
        	picForm.appendChild(hi.getInput());
		/*if we already have a picture, then we are performing an update
		and not a new picture addtion.  in this case, the server needs 
		a pid parameter, so it knows to change an existing pic, rather than
		create a unique PID and add a new file*/
		if( data.pids[num] ) {
			var pidFlag = new oblHiddenInput("pid",data.pids[num]);
			picForm.appendChild(pidFlag.getInput());
		}
		var fInput = document.createElement("input");
		fInput.type = "file";
		fInput.name = "datafile";
		picForm.appendChild(fInput);
		//create the iframe, the target of the form submission
	        var uTarget = document.createElement("iframe");
	        uTarget.id = "UploadTarget";
	        uTarget.name = "UploadTarget";
	        uTarget.style.width = "0px";
	        uTarget.style.height = "0px";
	        uTarget.style.border = "0px";
		addListener("load",uTarget,curObj.fetch);
		var backing = oblC("d");
		backing.appendChild(picForm);
		backing.appendChild(uTarget);
		var d = new oblDialog({
			"title":"Change this picture:",
			"content":backing
		});
		var _submit = function() {
			picForm.submit();
			d.hide();
		};
		var buttons = ( [ { text:"Change",
        	handler:_submit, isDefault:true } ]);

		d.changeButtons(buttons);
		d.show();
	
	};

	this.promptSetDefault = function(n) {
		var backing = oblC("d");
		var d = new oblDialog({
			title:"Make this your default profile picture?",
			content:backing,
			 "thePar":args.parObj.getBacking()
		});

		var _handler = function() {
			 var request = newRequest();
	                        var url = weburl + "set_default_profile_pic" + "?pid=" + data.pids[n];
                        	request.open("GET",url,true);
                        request.onreadystatechange = function() {
                                if( request.readyState == 4 ) {
                                        if( request.status == 200 ) {
						d.hide();
                                        }
                                }
                        };
                        request.send(null);

			d.hide();

		};
			  var buttons = ([
	                    {text:"Yes",handler: _handler, isDefault: true},
	                    {text:"No",handler: d.hide, isDefault: true}
	                ]);
		d.changeButtons(buttons);

		d.show();
	
	};

	/*for some reason, for petitions wer know there are 4 pictures*/
	/*in other instnaeses we dont wnat to be 
	enforcing the length here*/
	var images = [];
	var widgets = [];


	this.promptDelete = function(n) {
		var backing = oblC("d");
		backing.color = "black";

		/*we grab the backing of the oblPicView to set as the parent to the 
		oblDialog.  the reason is:  if we don't, then the dialog 
		will appear below the oblFocusDiv*/
		if(args.type == "user") {
			var d = new oblDialog({
				title:"Are you sure you want to delete this picture?",
				content:backing,
				"thePar":args.parObj.getBacking()
			});
		}

		if(args.type == "triumph") {
			 var d = new oblDialog({
                                title:"Are you sure you want to delete this picture?",
                                content:backing
                        });
		}
		var _handler = function() {
	                var request = newRequest();
	                var url = weburl + "drop_picture" + "?iid=" + data.pids[n];
	                request.open("GET",url,true);
	                request.onreadystatechange = function() {
	                        if( request.readyState == 4 ) {
	                                if( request.status == 200 ) {
	                                        d.hide();
						curObj.fetch();
	                                }
	                        }
	                };
	                request.send(null);
		};

		var buttons = ([
                    {text:"Yes",handler: _handler, isDefault: true},
                    {text:"No",handler: d.hide, isDefault: true}
                ]);
		d.changeButtons(buttons);
		d.show();
	};

	

	this.createWidget = function(n) {
		widgets[n] = oblC("d");
		if(args.type == "user" )
			widgets[n].style.width = "250px";
		widgets[n].style.overflow = "hidden";
		var t = new oblTable(1,2);

		/*create a delete complex*/
		var dd = oblC("d");
		var ds = oblC("s");
		var dl = oblC("a");
		dl.style.fontWeight = "normal";
		dl.appendChild(ds);
		dd.appendChild(dl);
		if(args.type == "user" ) 
			dd.className = "picset_hover_option_profile";
		if(args.type == "triumph" ) 
			dd.className = "picset_hover_option_trithumb";
		
		ds.innerHTML = " delete ";

		ss = oblC("s");
		sl = oblC("a");
		sl.style.fontWeight = "normal";
		sl.appendChild(ss);
		ss.innerHTML = " make default ";
		
		var space = oblC("s");
		space.innerHTML = " | ";
		if(args.type=="user"){
			dd.appendChild(space);
			dd.appendChild(sl);
		}
		

		ds.style.color = "white";
		ss.style.color = "white";
		dd.style.visibility = "hidden";
		/*this is not done.  this only works for user picture sets*/
		if(args.type == "user") {
			if(args.iid == globalBearings.getUid()) {
				addListener("mouseover",t.getTable(),function(){
					dd.style.visibility = "visible";
				});
				addListener("mouseout",t.getTable(),function(){
					dd.style.visibility = "hidden";
				});
				addListener("click",dl,function(){
					curObj.promptDelete(n);
				});
	
	                        addListener("click",sl,function(){
	                                curObj.promptSetDefault(n);
	                        });

			}
		}
			
		if(args.type=="triumph"){
			addListener("mouseover",t.getTable(),function(){
                                        dd.style.visibility = "visible";
                                });
                                addListener("mouseout",t.getTable(),function(){
                                        dd.style.visibility = "hidden";
                                });
                                addListener("click",dl,function(){
                                        curObj.promptDelete(n);
                                });

                                addListener("click",sl,function(){
                                        curObj.promptSetDefault(n);
                                });
		}
	
		
			
		widgets[n].appendChild(t.getTable());
		t.addContent(0,0,images[n]);
	
		t.addContent(0,1,dd);			
	};
		
	this.getWidget = function(n){
		return widget[n];
	};
	this.getWidgets = function() {
		return widgets;
	};


	if(args.type == "petition") {		
		for(var i=0;i<4;i++) {
	                        images[i] = oblC("i");
		}

	
		for(var i=0;i<4;i++) {
	
				/*Add listerner for each pic to change it*/
		addListener("click",images[i],(function(c) {
		               return function(blah) {
						if(curObj.allowChange)
			                                curObj.promptChange(c);
		                      };
		         })(i));
		}
	}else{
		images[0] = oblC("i");
		images[0].src = "/image_content/pic840_profile.jpg";
		curObj.createWidget(0);
	}
	
	
		

	this.getPic = function(num) {  //start at 0
		return images[num];
	};

	this.getArray = function() {
		return images;
	};
	this.loadJourneySet = function() {
		for(var i=0;i<data.picUrls.length;i++) {
			widgets[i] = oblC("i",data.picUrls[i]);
		}
	};

	this.load = function() {
		if(args.type == "journey" ) {
			curObj.loadJourneySet();
			return;
		}
		if(args.type == "petition")
			curObj.loadPetitionSet();

		if(args.type == "triumph") {
			curObj.loadTriumphThumbs();
		}else{
			curObj.loadOther();
		}
	};

	this.loadTriumphThumbs = function() {

		for( var i=0;i<6;i++) {
			args.parents[i].innerHTML = '';
		}
		 for(var i=0;i<data.pids.length;i++) {
                        images[i] = oblC("i");
                        images[i].src = contentPath + "pic" + data.pids[i] + "_trithumb.jpg";
                }
                for(var i=0;i<data.pids.length;i++) {
                        curObj.createWidget(i);
			args.parents[i].appendChild(widgets[i]);
                }
	};
	
	this.loadOther = function() {
		for(var i=0;i<data.pids.length;i++) {
			images[i] = oblC("i");
			images[i].src = contentPath + "pic" + data.pids[i] + "_profile.jpg";
		}
		for(var i=0;i<data.pids.length;i++) {
			curObj.createWidget(i);
		}
	};
		
	this.loadPetitionSet = function() {
		for(var i = 0; i<4;i++) {
			if( data.pids[i] ) {
				if( i==0 ) { //set this to a profile sized picture.
					images[i].src = "/image_content/pic" + data.pids[i] + "_profile.jpg";
				}else{
					images[i].src = "/image_content/pic" + data.pids[i] + "_thumb.jpg";
				}
			}else{
				if( i == 0 ) {
					images[i].src = "/image_content/default_picture.png";
				}else{
					images[i].src = "/image_content/blank_picture.png";
				}
			}
		}
	};


	this.fetch = function() {
		var request = newRequest();
                var url = weburl + 'get_pic_set?iid=' + args.iid + ';type=' + args.type;
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        data = eval('(' + request.responseText + ')');
                                        curObj.load();
					if(args.parObj){
						args.parObj.attach();
					}
					if( globalBearings.getUid() == data.uid ) 
						curObj.allowChange = 1;
					if (args['new'] )
						curObj.allowChange = 1;
		

                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);
	
		
	};


	this.fetch();
}

function oblPictureStory(args) {
	var curObj = this;
	var backing = oblC("d");
	this.showTriPics = function() {
		var theDiv = oblC("d");
		var backing = oblC("d");
		backing.className = "picture_story_preview";
		backing.appendChild(theDiv);
		args.thePar.appendChild(backing);
		for(var i=1;i<=args.triPicCount;i++) {
			var url = contentPath + "tri_" + args.id + "_pic_" + i + "_thumb.jpg";
			var pic = oblC("i",url);
			pic.className = "feed_pic";
			/*add hover border color changing*/
			var _hl = (function(){ 
				return function() {
					pic.className = "highlight_feed_pic";
				};
			}());
			var _uhl = (function(){ 
				return function(){
					pic.className = "feed_pic";
				};
			}());
			addListener("mouseover",pic,_hl);
			addListener("mouseout",pic,_uhl);
			var link = oblC("a");
			addListener("click",link,function() {
				navTriumph(args.id);
			});
			link.appendChild(pic);
			theDiv.appendChild(link);
			var spacer = oblC("s");
			spacer.style.width="8px";
			spacer.style.display = "inline-block";
			theDiv.appendChild(spacer);
		}
	};


	 this.showPictures = function() {
                var theDiv = oblC("d");
                var backing = oblC("d");
                backing.className = "picture_story_preview";
                backing.appendChild(theDiv);
                args.thePar.appendChild(backing);
                var url = contentPath + "pic" + args.id + "_thumb.jpg";
                var pic = oblC("i",url);
                pic.className = "feed_pic";
                /*add hover border color changing*/
                var _hl = (function(){
                        return function() {
                                pic.className = "highlight_feed_pic";
                        };
               }());
                var _uhl = (function(){
                        return function(){
                                pic.className = "feed_pic";
                        };
                }());
                addListener("mouseover",pic,_hl);
                addListener("mouseout",pic,_uhl);
                var link = oblC("a");
                addListener("click",link,function() {
                        navPicture(args.id);
                });
                link.appendChild(pic);
                theDiv.appendChild(link);
                var spacer = oblC("s");
                spacer.style.width="8px";
                spacer.style.display = "inline-block";
                theDiv.appendChild(spacer);
        };	

	if( args.type == "triumph" ) 
		curObj.showTriPics();

	if( args.type == "picture" )
		curObj.showPictures();

	

}

function oblPicViewer(args) {
	var curObj = this;
	var data;

	var e = new oblFocusDiv({
		 "setclass":"yt_focusdiv"
	});
	e.attach();
	
	var set;

	if( args.profile ) {
		set = new oblPicSet({
			iid:args.uid,
			type:"user",
			parObj:curObj
		});
	}
		
	if( args.type == "journey" ) {
		set = new oblPicSet({
			iid:args.jid,
			type:"journey",
			parObj:curObj
		});
	}
	

	var backing = oblC("d");
	this.getBacking = function(){
		return backing;
	};
	e.getDiv().appendChild(backing);
	this.fetchProfilePics = function() {

	};

	var t = new oblTable(1,3);
	var llink = oblC("a");
	addListener("click",llink,function() {
		curObj.goPrev();
	});

	var rd = oblC("d");
	rd.style.height = "300px";
	rd.style.width = "110px";
	
	var ld = oblC("d");
	rd.style.height = "300px";
        rd.style.width = "110px";	

	var rlink = oblC("a");
	addListener("click",rlink,function() {
		curObj.goNext();
	});

	var la = oblC("i",imagesPath + "pic_arrow_l.png");
	la.style.paddingTop = "85px";
	var ra = oblC("i",imagesPath + "pic_arrow_r.png");
	ra.style.paddingTop = "85px";

	rd.appendChild(ra);
	ld.appendChild(la);

	var pictures = set.getWidgets();
	this.attach = function() {		
		t.clear(0,1);
		t.addContent(0,1,pictures[0]);
		backing.appendChild(t.getTable());
	};
	
		

	var curImg = 0;		

	rlink.appendChild(rd);
	llink.appendChild(ld);

	t.addContent(0,0,llink);
	t.addContent(0,2,rlink);	

	this.goPrev = function() {
		if( curImg == 0 ) 
			return;
		pictures[curImg].parentNode.removeChild(pictures[curImg]);
		curImg--;
		t.addContent(0,1,pictures[curImg]);
		
	
	};

	this.goNext = function() {
		if( curImg ==  (pictures.length-1))
			return;
		 pictures[curImg].parentNode.removeChild(pictures[curImg]);
			curImg++;

                t.addContent(0,1,pictures[curImg]);
	};
	
	var curPic = 0;
	this.assemble = function() {
		var pic = oblC("i");

	};
	t.getTable().style.position = "relative";
	t.getTable().style.left = "60px";

	if( args.uid == globalBearings.getUid() ) {
		var b = oblC("d");
		b.className = "pic_viewer_add_button";
		var _what = function() {
			set.promptAdd(backing);
		};
		backing.appendChild(b);
	
		
			 var menuClick = [
	                                {text: "from computer...",value: 0, onclick: { fn: _what} }
			];
		
		var yb = new YAHOO.widget.Button({
			type:"menu",	
			label:"Add Profile Pic",
			menu:menuClick,
			container:b
		});
	}
	/*
	if(args.profile) 
		this.assembleProfilePics();
	*/
}

function oblPosition(args) {
	var curObj = this;
	var e = args[0];
	var theTop = args[1];
	var right = args[2];
	var bottom = args[3];
	var left = args[4];

	e.style.position = "relative";
	e.style.left = left + "px";
	e.style.bottom = bottom + "px";
	e.style.right = right + "px";
	e.style.top = theTop  + "px";
}

function oblPost(args) {
		var curObj = this;
		//this indicates if this post belongs to a Home feed or a not (then a jFeed).
		var isHome = args.isHome;

		this.byLeader = args.byLeader;



		this.isLiked = function() {
			ll.innerHTML = "Unlike";
                        //first remove the current event listener.  this is (apparently done by using null)
                        removeListener("click",ll,_like);
                        //then add an unlike method
                        addListener("click",ll,_unlike);
		};
		
		this.isNotLiked = function() {
			ll.innerHTML = "Like";
                        //first remove the current event listener.  this is (apparently done by using null)
                        removeListener("click",ll,_unlike);
                        //then add an unlike method
                        addListener("click",ll,_like);
		};


			

		//method to like the current post.		
		this.like = function() {

			
			var replyCallBack = function() {
				curObj.isLiked();
				curObj.convo.reload();
			};
			var likeUrl = weburl + "like";
			var values = {};
			values['type'] = args.type;
			values['iid'] = args.iid;
	
			standardPost(likeUrl,values,replyCallBack);
		};
		
		 //method to like the current post.              
                this.unlike = function() {

                        var replyCallBack = function() {
				curObj.isNotLiked();
				curObj.convo.reload();
                        };
                        var unlikeUrl = weburl + "unlike";
                        var values = {};
                        values['type'] = args.type;
                        values['iid'] = args.iid;

                        standardPost(unlikeUrl,values,replyCallBack);
                };

		var _like = function() { curObj.like(); };
		var _unlike = function() { curObj.unlike(); };

		


		

		//Create the parent div for the post.  All elements are children of this div
 		var pd = document.createElement("div");

		//create the drop link (hover menu)
                var dropLink = document.createElement("a");
                dropLink.className = "post_hover_menu";
                var xImg = document.createElement("img");
                xImg.src = imagesPath + "delete_logo.png";
                var dropText = document.createTextNode(" Remove");
                dropLink.appendChild(xImg);
                dropLink.appendChild(dropText);
		 //add listener to current drop link to get it to drop current item
                addListener("click",dropLink,(function(c) {
                                dropItem(args.type,args.iid);
                }));
		addListener("mouseover",pd,(function() {
                                dropLink.style.visibility = "visible";
                }));
                addListener("mouseout",pd,(function() {
                                dropLink.style.visibility = "hidden";
                }));


        	//this in effect is just a gray line to separate the post from the above post.        
                var sep1 = document.createElement("div");
		sep1.className = "separator_one";

                //the user's picture.  onclick should go to their profile.
                var picLink = document.createElement("a");
                addListener("click",picLink,(function() {
                                navProfile(args.uid);
                }));
                var pic_url = contentPath + "micro" + args.uid + ".jpg";
		var picture = oblC("i",pic_url);
		picture.className = "feed_picture";
                picture.src = pic_url;
		
                picLink.appendChild(picture);

		/*The emblem of a leader.  Show this
		only if the poster is the leader*/
		var leaderEmblem;
		if( curObj.byLeader ) {
			leaderEmblem = oblC("i",imagesPath + "leader_star.png");
			leaderEmblem.className = "feed_leader_emblem";
		}

		//the username text. (unt).  onclick should go to their profile.
                var unt = document.createElement("a");
                unt.className = "username";
		setUnderline(unt);
                unt.innerHTML = args.username;
                addListener("click",unt,(function() {
                                navProfile(args.uid);
                }));
		
		//the "story".  Text which explains what they have done.  "has posted a"
                var story = document.createElement("span");
                story.innerHTML = " has posted a ";
                
		//the post type.  onclick should go to the post itself.
		var pt = document.createElement("a");
		pt.className = "post_type";
		setUnderline(pt);
                pt.innerHTML = args.type;
		addListener("click",pt,(function() {
                        switch( args.type ) {
                                case 'picture':
                                        navPicture(args.iid);
                                        break;
                                case 'question':
                                        navForum(args.iid);
                                        break;
                                case 'note':
                                        navNote(args.iid);
                                        break;
                                case 'link':
                                        navLink(args.iid);
                                        break;
				case 'triumph':
					navTriumph(args.iid);
					break;
				case 'petition':
					navPetition(args.iid);
					break;
                                case 'shout':
                                        break;
                                default:
                                        alert('something went wrong :(  we are working on it');
                                        break;
                        }

                }));

		//the collateral.  a summary of what was posted (text)
                var collateral = oblC("s");
                collateral.className = "collateral";
		if( args.type == "shout" ) {
	                collateral.innerHTML = args.collateral;
		}else{
	                collateral.innerHTML = '"' + args.collateral + '..."';
		}

		/*the word "For".  to explain which journey this post is for.
		also The "Familiar Itow".  The way in which this user described the 
		journey when they added it.  onclick should go to JFeed. these are only 
		needed if this is a Home feeds' post. */
		if( isHome ) {
	                var theFor = document.createElement("span");
	                theFor.innerHTML = "&nbsp&nbsp&nbsp For";
	                theFor.className = "the_for";
		

	                var fi = document.createElement("a");
	                fi.className = "itow";
			setUnderline(fi);
			fi.innerHTML = "I want to " + args.itow;
	                addListener("click",fi,(function() {
	                                navConcourse(args.jid);
	                }));
		}

             
                
                

		//the like button / link
                this.ll = document.createElement("a");
		var ll = this.ll;
		addListener("click",ll,_like);
                ll.className = "like";
		ll.innerHTML = "Like";
		setUnderline(ll);

		//a separating "dot" between the like and the timestamp.
		var dot = document.createElement("span");
		dot.innerHTML = ".";
		dot.style.fontSize = "20px";
		dot.style.color = "#9d9d9d";
		dot.style.position = "relative";
		dot.style.bottom = "3px";
		dot.style.left = "2px";


		//the time stamp
                var ts = document.createElement("span");
                ts.className = "time_stamp";
                ts.innerHTML = args.timestamp;
	
		/*
		a div meant to assist with layout.  Not being used currently
                var ss = document.createElement("div");
                ss.className = "separator_sub";
		*/

                var spacer = document.createElement("div");
                spacer.style.height = "25px";

		//The preview div is created here and inserted.  
		//if this post does have a preview, that content
		//of that preview should be inserted into this div.
		this.prevDiv = document.createElement("div");
		this.prevDiv.className = "preview_div";


                var scd = document.createElement("div");
                scd.className = "feed_center_div";
		if( curObj.byLeader ) 
			scd.appendChild(leaderEmblem);
		scd.appendChild(unt);
                if(args.type != "shout") {
                        scd.appendChild(story);
                        scd.appendChild(pt);
                }
                scd.appendChild(collateral);
                scd.appendChild(document.createElement("br"));
		if( isHome ) {
	                scd.appendChild(theFor);
	                scd.appendChild(fi);
		}
		scd.appendChild(this.prevDiv);
		
                scd.appendChild(document.createElement("br"));
                scd.appendChild(ll);
		scd.appendChild(dot);
                scd.appendChild(ts);
                scd.appendChild(dropLink);



                

                //the table
	        var pTable = new oblTable(1,2);
                pTable.setClassName("white_out");
                pTable.setRowClass(0,"white_out");
                pTable.setCellClass(0,0,"feed_left_cell");
                pTable.addContent(0,0,picLink);
                pTable.addContent(0,1,scd);

               	


                pd.appendChild(sep1);
                pd.appendChild(pTable.getTable());


		/*Link Previewing*/

		//look into the previews objet in the data.
		//find the right stuff and display appropriately.
		//probably follow the same paradigm - create a div, 
		//create the right stuff, append it all to the div.
		//postiion it appropriately.
		//tack it to the right parent and you should be good.

	this.linkPreview = function() {
		if( !args.preview ) return;

		if( !args.preview.youtubeStatus ) {
			var prevTable = new oblTable(1,2);
			prevTable.setClassName("preview_table");
	                prevTable.setRowClass(0,"gray_out");
			
			var mediaImg = document.createElement("img");
			//mediaImg.src = args.preview.media_url;
			prevTable.addContent(0,0,mediaImg);
	
			
			//the destination page's title
			var title = document.createElement("a");
			title.className = "link_title";
			addListener("click",title,(function() {
				window.open(args.preview.link);
			}));
			title.innerHTML = args.preview.title;
			setUnderline(title);
	
			//show the URL
			var urlDiv = document.createElement("div");
			urlDiv.className = "explanation";
			urlDiv.innerHTML = args.preview.link;
	
			//the text preview
			var textDiv = document.createElement("div");
			textDiv.className = "link_preview_text";
			textDiv.innerHTML = args.preview.preview;
	
			prevTable.addContent(0,1,title);
			prevTable.addContent(0,1,urlDiv);
			prevTable.addContent(0,1,textDiv);
	
			this.prevDiv.appendChild(prevTable.getTable());

		}else{
			/*Show the youtube vid in the feed*/

			var eIframe = '<iframe width="400" height="330" src="http://www.youtube.com/embed/' + args.preview.youtubeID + '" frameborder="0" allowfullscreen></iframe>';
			var ytDiv = document.createElement("div");
			ytDiv.className = "youtube_preview_div";
			ytDiv.innerHTML = eIframe;

			this.prevDiv.appendChild(ytDiv);
		}
		
	
	};
	 /*if we have a Q&A, we will show the question at the top.  we will use
                ths same div that link peviews use*/
        this.showQuestion = function() {
               /*show the question*/
                var qDiv = oblC("d");
                qDiv.className = "question";
                qDiv.innerHTML = args.question;

                this.prevDiv.appendChild(qDiv);

        };


	this.prevTriumph = function() {
		var e = new oblPictureStory({
			type:"triumph",
			id:args.iid,
			thePar:curObj.prevDiv,
			triPicCount:args.triPicCount
		});
	};

	this.prevPicture = function() {
		var e = new oblPictureStory({
			type:"picture",
			id:args.iid,
			thePar:curObj.prevDiv
		});
	};
			
	
	
	/*if this is a picture of a triumph, show picture story*/
	if( args.type == "triumph" ) 
		curObj.prevTriumph();

	if( args.type == "picture" ) 
		curObj.prevPicture();

	/*A post is previewed if it a link, 
	and a form us show in place of a conversation
	if its a question.*/
	
	if( args.type == "question" ) {
		/*display a forum instead of a conversation*/
		this.convo = new oblForum({
			"iid":args.iid,
			"domPar":pd,
			"parentObject":curObj
		});
		curObj.showQuestion();
	}else{

		this.convo = new oblConversation(args.type,args.iid,pd,curObj);
	}

		              
                
	args.parent.appendChild(pd);

	if( args.type == "link" ) {
		curObj.linkPreview();
	}	




}


function oblPostReservation(args) {
	var curObj = this;
	var _callback = args.callback;
	this.iid;

	this.getIid = function() {
		return curObj.iid;
	};
	this.fetch = function() {
		var request = newRequest();
                var url = weburl + 'reserve_post?type=' + args.type;
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
				curObj.iid = request.responseText;
					_callback();

                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);
	};
	this.fetch();
}
	

function oblPostsAdmin() {
	var curObj = this;
	/*create the look of the Post Admin tool*/
	var shell = document.createElement("div");
	shell.style.width = "400px";
	var jefe = document.createElement("div");
	jefe.className = "bd";
	var questions = document.createElement("div");
	var petitions = document.createElement("div");
	var pImg = document.createElement("img");
	pImg.src = imagesPath + "petition.png";
	var qImg = document.createElement("img");
	qImg.src = imagesPath + "question_mark.png";
	var qLink = document.createElement("a");
	var pLink = document.createElement("a");
	
	var pSpan = document.createElement("span");
	var qSpan = document.createElement("span");
	oblPosition([qSpan,0,0,10,18]);
	oblPosition([pSpan,0,0,10,30]);
	oblPosition([pImg,0,0,0,6]);
	qSpan.style.fontSize = "20px";
	pSpan.innerHTML = "My Petitions";
	pSpan.style.fontSize = "20px";
	qSpan.innerHTML = "My Questions";
	
	
	
	
	//the link contains the entire "row"
	pLink.appendChild(pImg);
	pLink.appendChild(pSpan);
	qLink.appendChild(qImg);
	qLink.appendChild(qSpan);

	jefe.appendChild(qLink);
	jefe.appendChild(document.createElement("br"));
	jefe.appendChild(pLink);
	
	var body = document.getElementById("body");
	shell.appendChild(jefe);
	body.insertBefore(shell,document.getElementsByTagName("div")[0]);

	var d = new YAHOO.widget.Dialog(shell);
	this.clear = function() {
		d.cancel();
	};
	var cooptButtons = ([
               {text:"Ok",handler: curObj.clear, isDefault: true},
              ]);
        d.setHeader("My Open Posts");
        d.cfg.queueProperty("buttons",cooptButtons);
	d.cfg.queueProperty("y",window.pageYOffset+200);
	d.cfg.queueProperty("x",400);
	//set out functions
	var _q = function() {
		navQuestions();
		curObj.clear();	
	};
	var _p = function() {
		navPetitions();
		curObj.clear();
	};
	addListener("click",qLink,_q);
	addListener("click",pLink,_p);

	//show what we have
	d.render();
	d.show();
	



}

function oblPostWidget(args) {
	/*the oblPostWidget is a widget that allows a user to post content
 * 	(pictures, questions, shouts, videos and so on) to an item feed. */
	var curObj = this;
	var data;

	
	var vidKeys = function(e) {
        	if( e.keyCode == 13)
                	submitVidPost();
	}
	var submitVidPost = function() {
        	 var request = newRequest();
       	 var addUrl;
     	   var values = {};
      	  var question = /\?$/;
       	 var link = /\.[a-zA-Z]{2}/;
	var input = document.getElementById("JFeedVideo");
	
	       	 if( input.value == '' )
                return;
        if( input.value.search(link) != -1 ) {
                addUrl = weburl + "add_link";
                var link = input.value;
                if( link.search(/^http/) == -1 ) { //if we dont find http at the beginning...
                        link = 'http://' + link;  //add it.
                }
                values['link'] = link;
        }else {
                if( input.value.search(question) != -1) {
                        //alert("we found a question");
                        addUrl = weburl + "add_question";
                        values['question'] = input.value;
                }else{
                        //consider it a shout.   its a shout :)
                        addUrl = weburl + "add_shout";
                        values['shout'] = input.value;
                }
        }
        values['jid'] = args.jid;
        var replyCallBack = function() {
                document.getElementById('JFeedInput').value = '';
                //call a new feed
                args.feedObj.reload();
		
        };
        standardPost(addUrl,values,replyCallBack);
};



	var jFeedKeys = function(e) {
       	 	if( e.keyCode == 13)
       		         curObj.post();
	}
		
	this.post = function(){

       		 var request = newRequest();


       		 var addUrl;
        	var values = {};


        	var question = /\?$/;
        	var link = /\.[a-zA-Z]{2}/;
        	var input = document.getElementById("JFeedInput");
        	if( input.value == '' )
              	  return;
        	if( input.value.search(link) != -1 ) {
              	  addUrl = weburl + "add_link";
               	 var link = input.value;
               	 if( link.search(/^http/) == -1 ) { //if we dont find http at the beginning...
                        link = 'http://' + link;  //add it.
                }
                values['link'] = link;
        	}else {
                	if( input.value.search(question) != -1) {
                       	 //alert("we found a question");
                       	 addUrl = weburl + "add_question";
                       	 values['question'] = input.value;
                	}else{
                       	 //consider it a shout.   its a shout :)
                        addUrl = weburl + "add_shout";
                        values['shout'] = input.value;
                	}
        	}


        	values['jid'] = args.jid;

        	var replyCallBack = function() {
               	 document.getElementById('JFeedInput').value = '';
                //call a new feed
                	args.feedObj.reload();	

        };

        standardPost(addUrl,values,replyCallBack);

	};

	var jid = args.jid;
	this.assemble = function(){
        //callEmbarkedPanel(jid);

        //since comments are implemented via JS conversation obkefts I think this is obseoltete_
        commentCallback = function(){ callJourneyFeed(jid); };

	var cont = document.getElementById("post_cont");
	var backing = oblC("d","concourse_right_box");
	cont.appendChild(backing);
        //create a div for the title / journey ID
        var postDivCont = document.createElement('div');
	var icon = oblC("i",imagesPath + "post2013.png");
	icon.className = "panel_icon";
	var title = oblC("d","panel_heading");
	title.innerHTML = "Post";
	oblAppend([backing,icon,title,postDivCont]);
        postDivCont.id = "PostDiv";
	postDivCont.className = "post_widget_tab_enclosure";
	 //make a tabview for the post widget
        var tabs = new YAHOO.widget.TabView('PostDiv',{activeIndex: 0} );

        var sharedDiv = oblC("d");
        sharedDiv.id = 'post';

        tabs.addTab(  new YAHOO.widget.Tab({
                label: 'Post',
                content: '<div id="post"></div>',
                active: true
        }));


        tabs.addTab( new YAHOO.widget.Tab({
                label: 'Post Picture',
                content: '<div id="picture"></div>',
                active: false
        }));

        tabs.addTab( new YAHOO.widget.Tab({
                label: "Post Video",
                content:'<div id="video"></div>',
                active: false
        }));



        var postWidget = document.createElement('div');
        var jFeedTable = new oblTable(2,1);


        var jFeedInput = document.createElement('input');
        jFeedInput.style.width = '490px';
        jFeedInput.id = 'JFeedInput';
        jFeedInput.className = "white_out";
        var jFeedExp = new oblInputExp();
        jFeedExp.setText("Post a comment, question or link...");
        jFeedExp.setElement(jFeedInput);
        jFeedExp.setExp();

        var postB = document.createElement("button");
        postB.id = "JFeedAttachButton";
        var postDiv = document.createElement("div");
        postDiv.style.position = "relative";
        postDiv.style.width = "80px";
        postDiv.style.left = "415px";  //this should push it all the way right
        postDiv.appendChild(postB);
        jFeedTable.addContent(1,0,postDiv);
        jFeedTable.setRowClass(0,"input_table");
        jFeedTable.setRowClass(1,"post_lower_row");

        jFeedTable.addContent(0,0,jFeedInput);

        addListener("keydown",jFeedInput,jFeedKeys);

        postWidget.appendChild(jFeedTable.getTable());
        var postDiv = document.getElementById("post");
        postDiv.appendChild(postWidget);
        postDiv.appendChild(giveSpace(17));


        var postButton = new YAHOO.widget.Button("JFeedAttachButton");
        postButton.set('label','Post');
        postButton.on('click',this.post);
 /*this is for the actualy feed itself*/
        jFeed = document.createElement('div');
        jFeed.id = 'jfeed';
        /*----------------------------------*/



        /*assemble the addPicture widget then attach to proper div in tab.
        widget should consist of a form, having a table inside.
        this table should contain the elements neccesary to facilitate posting.         
        there is also an iframe which is the target of the form submission - 
        this allows an AJAXy form submission - we won't have to reload the entire page */

        var picForm = document.createElement("form");
        picForm.id = "PictureForm";
        picForm.method = "post";
        picForm.enctype = "multipart/form-data";
        picForm.action = weburl + "add_picture_o";
        picForm.target = "UploadTarget";

        //create the iframe, the target of the form submission
        var uTarget = document.createElement("iframe");
        uTarget.id = "UploadTarget";
        uTarget.name = "UploadTarget";
        uTarget.style.width = "0px";
        uTarget.style.height = "0px";
        uTarget.style.border = "0px";


        //create the table
        var picTable = new oblTable(3,1);
	

//create the input to allow someone to describe the picture - and attach.
        var descriptionDiv = document.createElement("div");
        var descriptionI = document.createElement("textarea");
        descriptionI.name = "comment";
        descriptionI.className = "white_out";
        descriptionI.style.width = "490px";
        descriptionI.style.height = "30px";

        var exp = new oblInputExp();
        exp.setText("Say something about this picture...");
        exp.setElement(descriptionI);
        exp.setExp();
        descriptionDiv.appendChild(descriptionI);
        picTable.addContent(0,0,descriptionDiv);

        //create a hidden input which indicates the jid
        var hi = new oblHiddenInput("jid",jid);
        picForm.appendChild(hi.getInput());

        //create a div for the second row.  the camera picture and file imnput will go inside.
        var sDiv = document.createElement("div");
        sDiv.style.width = "490px";
        sDiv.align = "center";
        //genereate the image of the camera and the input box for the file upload.
        var cameraPicture = document.createElement("img");
        cameraPicture.src = imagesPath + "camera.png";
        cameraPicture.style.position = "relative";
        cameraPicture.style.top = "3px";
        cameraPicture.style.right = "2px";

        var picInput = document.createElement("input");
        picInput.style.position = "relative";
        picInput.style.bottom = "12px";
        picInput.style.left = "5px";
        picInput.name = "datafile";
        picInput.id = "datafile";
        picInput.type = "file";
        sDiv.appendChild(cameraPicture);
        sDiv.appendChild(picInput);
        picTable.addContent(1,0,sDiv);

        //create the post button
        var picB = document.createElement("button");
        picB.id = "PicButton";
        var bDiv = document.createElement("div");
        bDiv.style.position = "relative";
        bDiv.style.width = "80px";
        bDiv.style.left = "415px";  //this should push it all the way right
        bDiv.appendChild(picB);
        picTable.addContent(2,0,bDiv);
        picTable.setRowClass(0,"input_table");
        picTable.setRowClass(1,"input_table");
        picTable.setRowClass(2,"post_lower_row");

        //add the table to the form
        picForm.appendChild(picTable.getTable());

        /*the "pictureWidget" is the tab for picture posting.*/
        var pictureWidget = document.getElementById("picture");
        pictureWidget.appendChild(picForm);
        pictureWidget.appendChild(uTarget);


        var _submitPicture = function() {
                document.forms['PictureForm'].submit();
        };
        var picButton = new YAHOO.widget.Button("PicButton");
        picButton.set('label','Post');
        picButton.on('click',_submitPicture);


        /*add content to video tab for posting videos*/
        /*this is actually the same as the nomral post input / secion */
        var videoWidget = document.getElementById('video');
        var jFeedTable = new oblTable(2,1);

	var jFeedInput = document.createElement('input');
        jFeedInput.style.width = '490px';
        jFeedInput.id = 'JFeedVideo';
        jFeedInput.className = "white_out";
        var jFeedExp = new oblInputExp();
        jFeedExp.setText("Paste a Youtube link here...");
        jFeedExp.setElement(jFeedInput);
        jFeedExp.setExp();

        var vidB = document.createElement("button");
        var postDiv = document.createElement("div");
        postDiv.style.position = "relative";
        postDiv.style.width = "80px";
        postDiv.style.left = "415px";  //this should push it all the way right
        postDiv.appendChild(vidB);
        jFeedTable.addContent(1,0,postDiv);
        jFeedTable.setRowClass(0,"input_table");
        jFeedTable.setRowClass(1,"post_lower_row");

        jFeedTable.addContent(0,0,jFeedInput);

        addListener("keydown",jFeedInput,vidKeys);

        videoWidget.appendChild(jFeedTable.getTable());
        videoWidget.appendChild(giveSpace(17));


        var vidButton = new YAHOO.widget.Button(vidB);
        vidButton.set('label','Post');
        vidButton.on('click',submitVidPost);
	};

	this.assemble();
}

function oblProfileHead(args) {
    var curObj = this;
    var data;
    var topRight = oblC("d");

    args.thePar.innerHTML = '';
   
    this.fetch = function() {
        var request = newRequest();
        /*set body inner HTML to this*/
        var url = anonurl + "get_profile?uid=" + args.uid;
        request.open("GET",url,true);
        request.onreadystatechange = function() {
            if( request.readyState == 4 ) {
                if( request.status == 200 ) {
                    data = eval('(' + request.responseText + ')');
                    curObj.assemble();
                }
            }
        }
        //now send.  we'll be waiting...
        request.send(null);
    }

    this.assemble = function() {	
        var topTable = new oblTable(1,4);
        var pd = oblC("s");
        topTable.addContent(0,0,pd);
        var _showAllPics = function() {
            var e = new oblPicViewer({
		profile:1,	
		uid:data.uid
		});
	};
	var profilePic = new oblPic({
		thePar:pd,
		url:"/image_content/micro" + args.uid + ".jpg",
		click:_showAllPics
	});

	var name  = oblC("d");
	name.style.width = "100px";
	name.style.overflow = "hidden";
	name.className = "profile_head_username";
	name.innerHTML = data.username;
	topTable.addContent(0,1,name);

	var vspace = oblC("d");
	vspace.className = "profile_head_vert_sep";
	topTable.addContent(0,2,vspace);
	if(globalBearings.getUid() == args.uid)
    		curObj.ownership = 1;


    	topTable.addContent(0,3,topRight);
    	args.thePar.appendChild(topTable.getTable());
    	if( curObj.ownership ) {
       	 /*display an input to add new item*/
       	 curObj.showAddJourney();
    	}else{
        	curObj.showTriumphs();
    	}

	if(data.bannerId) {	
    		curObj.showBanner();
	}else{
    	if(curObj.ownership)
      	  curObj.suggestBanner();
	
	}

};

this.showAddJourney = function() {
    //call embarkment div    
    var _showEmbark = function() {
        var e = new oblEmbarkmentProposition({
            itow:inp.getValue()
        });
    };
    // create div for overlay
    var overlay = document.createElement('div');
    overlay.setAttribute('class', 'embarkment_overlay');
    overlay.setAttribute('id', 'embarkment_overlay');
    if($("#embarkment_overlay")) {
        oblEmbarkmentOverlay(overlay);
    }
    body.appendChild(overlay)

    // create table for clean format
    var sajT = new oblTable(1,3);
    topRight.className =  "profile_head_add_table";
    topRight.appendChild(sajT.getTable());
    
    // first cell div
    var expl = oblC("d");
    expl.innerHTML = "I want to:";
    expl.className = "profile_head_explanation";
    sajT.addContent(0,0,expl);

    // div with input field
    var something = oblC('d');
    something.className = "profile_head_input_container";
    sajT.addContent(0,1,something);	
    var inp = new oblInput({
    width:"400",
    thePar:something,
    name:"newItow",
    exp:"  Add new item..."
    });

    inp.getInput().id = "itow"; //legacy

    addListener("keyup",inp.getInput(),function(e) {
        addJourneyKeys(e);
    });

    // Add embarkment button 
    var div = oblC("d");
    var btn = document.createElement("button");
    btn.innerHTML = "Add";
	addListener("click",btn,_showEmbark);
    div.appendChild(btn);
    sajT.addContent(0,2,btn);

};

this.showAskAnything = function() {
    /*not sure about this one..._____*/
    var ask = new oblInput({
        width:"450",
        thePar:topRight,
        name:"ask"
    });
};

this.showTriumphs = function(){
    var sajT = new oblTable(1,4);
    var showNoTriumphs = function() {
        var s = oblC("d");
        s.style.position = "relative";
        s.style.top = "13px";
        s.style.fontWeight = "bold";
        s.innerHTML = data.username + "has not triumphed over any items yet!";
        sajT.addContent(0,1,s);
    };

    topRight.appendChild(sajT.getTable());
    /*state what this does*/
    var expl = oblC("d");
    expl.innerHTML = "Triumphs:";
    expl.style.position = "relative";
    expl.style.top = "13px";
    expl.style.width = "70px";
    sajT.addContent(0,0,expl);
    var direct = [];
    direct[0] = 1;
    direct[1] = 1;
    direct[2] = 2;
    direct[3] = 2;	
    var appendTriumphListing = function(n) {
        if(data.triumphs.tids[n]){
            var onel = oblC("a");
            addListener("click",onel,function(){
                navTriumph(data.triumphs.tids[n]);
            });
            var one = oblC("d");
            one.appendChild(onel);
            var onei = oblC("i",imagesPath + "small_checkmark.png");
            onei.style.position = "relative";
            onei.style.top = "4px";
            onel.appendChild(onei);
            onel.appendChild(document.createTextNode(data.triumphs.itows[n]));
            sajT.addContent(0,direct[n],one);
        }
    };
    if(data.triumphs.tids.length > 0) {
        appendTriumphListing(0);
        appendTriumphListing(1);
        appendTriumphListing(2);
        appendTriumphListing(3);
    }else{
        showNoTriumphs();
        return;
    }


    /*add a button*/
    var pb = document.createElement("button");
    var bcont = oblC("d");
    bcont.style.position = "relative";
    bcont.style.top = "5px";
    bcont.style.left = "4px";
    sajT.addContent(0,3,bcont);
    bcont.appendChild(pb);
    var yb = new YAHOO.widget.Button(pb);
    yb.set("label","See All Triumphs");
    var _handleit = function(){
        if(curObj.ownership) {	
            navTriumphs();
        }else{
            navTriumphs(args.uid);
        }
    }
    yb.on("click",_handleit);

};
curObj.slot = oblC("d");	
this.suggestBanner = function() {
    curObj.banner = {};
    var sug = document.createTextNode("Click to add a banner picture to your profile."); 
    args.thePar.appendChild(curObj.slot);
    var link = oblC("a");
    link.appendChild(sug);
    curObj.slot.appendChild(link);
    addListener("click",link,function(){
        curObj.promptNewBannerFromComputer();
    });
};

this.clearSlot = function() {
    /*we go to great lenghts to make sure that
      the browser "forgets" the URL of hte 
      original image*/
    if(curObj.banner) {
        if(curObj.banner.img) {
            curObj.banner.img.src = '';
        }
    }
    curObj.slot.innerHTML = '';
    acb.innerHTML = '';
};

var acb = oblC("d"); //adjustment complete button
this.showBanner = function() {
    curObj.banner = {};
    curObj.slot.className = "timeline_banner_slot";
    var purl = contentPath + "pic" + data.bannerId + "_banner.jpg"; 
    curObj.banner.img = oblC("i",purl);	
    curObj.slot.style.overflow = "hidden";
    curObj.slot.style.height = "208px";
    curObj.slot.style.width = "701px";
    curObj.banner.img.style.position = "relative";
    curObj.banner.img.style.bottom = data.bannerYOffset;
    var pbD = oblC("d");
    curObj.bannerOptionsButton = pbD;
    pbD.style.zIndex = "5";
    pbD.style.visibility = "hidden";
    pbD.style.width = "200px";
    /*also need to create a button which will appear
      when the user is adjusting the banner.  clicking this
      button will then cause the adjustment to complete*/
    /*here there will be a table which will contain the picture in one column, and 
      the buttonin another.  this way, we can add a listener to mousver the table
      as a whole, and that way mouseover the button won't be considered
      a mouseout*/
    var table = new oblTable(1,2);
    table.getTable().style.position = "relative";
    table.getTable().style.right = "3px";
    table.addContent(0,0,curObj.banner.img);
    table.addContent(0,1,pbD);
    table.addContent(0,1,acb);
    curObj.slot.appendChild(table.getTable());
    if( args.uid == globalBearings.getUid() ) {
        addListener("mouseover",table.getTable(),function() {
                pbD.style.visibility = "visible";
                });
        addListener("mouseout",table.getTable(),function(){
                pbD.style.visibility = "hidden";
                });
    }		
    pbD.style.position = "relative";
    pbD.style.right = "700px";
    pbD.style.top = "5px";

    acb.style.position = "relative";
    acb.style.right = "700px";
    acb.style.bottom = "8px";
    acb.style.visibility = "hidden";

    this.sendAdjustment = function() {
        total = total * -1;

        acb.style.visibility = "hidden";
        curObj.bannerOptionsButton.style.zIndex = 0;
        var request = newRequest();

        var url = weburl + "adjust_banner?yOffset=" + total;
        request.open("GET",url,true);
        request.onreadystatechange = function() {
            if( request.readyState == 4 ) {
                if( request.status == 200 ) {
                    /*note that this service will responed with
                      profile data after it does the change*/
                    data = {};
                    data = eval('(' + request.responseText + ')');
                    curObj.clearSlot();
                    curObj.showBanner();

                }
            }
        };
        //now send.  we'll be waiting...
        request.send(null);
    };


    args.thePar.appendChild(curObj.slot);		

    var menuclick = function(p_sType,p_Args,p_oItem) {
        var sText = p_oItem.cfg.getProperty("text");	
        var v = p_oItem.value;
        if(v == 0)
            curObj.promptNewBannerFromComputer();
	
            if(v==2)
                curObj.adjustBanner();

    };




    aMenuItemData = [
    {text: "Choose new picture file from computer",value: 0, onclick: { fn: menuclick} },						
        /*{text: "Choose new banner from existing pictures",value: 1, onclick: { fn: menuclick} },*/
    {text: "Adjust banner position",value: 2, onclick: { fn: menuclick} }


    ];

    var yb = new YAHOO.widget.Button({
type:"menu",
label:"Change...",
menu: aMenuItemData,
container:pbD
});
var cyb = new YAHOO.widget.Button({
type:"push",
label:"Done",
container:acb
});
cyb.on("click",curObj.sendAdjustment);










};

this.promptNewBannerFromComputer = function() {
    var picForm = document.createElement("form");
    picForm.id = "PictureForm";
    picForm.method = "post";
    picForm.enctype = "multipart/form-data";
    picForm.action = weburl + "add_banner";
    picForm.target = "UploadTarget";
    picForm.style.padding = "25px";

    //create the iframe, the target of the form submission
    var uTarget = document.createElement("iframe");
    uTarget.id = "UploadTarget";
    uTarget.name = "UploadTarget";
    uTarget.style.width = "0px";
    uTarget.style.height = "0px";
    uTarget.style.border = "0px";
    /*using an onload handler to recall the timeline after the new banner loads.
      but the thing about this is that that load event is fired when the uTarget is
      created an appended to the DOM.  so, we use this counter trick to avoid
      doing anthing until the second time the load is fired.  this should be
      a true upload, and not just the intial bang that the uTarget creation 
      fires off*/
    var c = 0;
    addListener("load",uTarget,function() {
            c++;
            if(c>1){
            var request = newRequest();
            var url = anonurl + "get_profile?uid=" + args.uid;
            request.open("GET",url,true);
            request.onreadystatechange = function() {
            if( request.readyState == 4 ) {
            if( request.status == 200 ) {
            data = {};
            data = eval('(' + request.responseText + ')');
            curObj.clearSlot();
            curObj.showBanner();

            }
            }
            };
            //now send.  we'll be waiting...
            request.send(null);
            }



    });


    var picInput = document.createElement("input");
    picInput.style.position = "relative";
    picInput.style.bottom = "12px";
    picInput.style.left = "5px";
    picInput.name = "datafile";
    picInput.id = "datafile";
    picInput.type = "file";

    picForm.appendChild(document.createTextNode("Please choose a picture file from your computer:"));
    picForm.appendChild(giveSpace(25));
    picForm.appendChild(picInput);

    var backing = oblC("d");

    backing.appendChild(picForm);
    backing.appendChild(uTarget);


    var d = new oblDialog({
title:"Change your banner picture",
content:backing
});

var _submit = function() {
    picForm.submit();
    d.hide();
};

var buttons = ( [ { text:"Change",
        handler:_submit, isDefault:true } ]);

d.changeButtons(buttons);




d.show();
};

var total;
this.adjustBanner = function() {
    total = 0;
    curObj.bannerOptionsButton.style.zIndex = -100;
    acb.style.visibility = "visible";

    var dd1 = new YAHOO.util.DD(curObj.banner.img);
    var start;
    var finish;
    dd1.on("mouseUpEvent",function(ev) {
            finish = ev.e.pageY;
            var distance = finish - start;
            total = total + distance;
            },dd1,true);

    dd1.on("mouseDownEvent",function(e) {
            start = e.pageY;
            },dd1,true);
};

	this.fetch();
}

function oblSidePanelInvite(args) {
	/*there are no args passed to the constuctor at this point*/

	/*this will use the panel having id of "user_nav" as its parent element*/
	var thePar = document.getElementById("user_nav");

	var backing = oblC("d");
	thePar.appendChild(backing);
	var plate = oblC("d");
	plate.className = "side_panel_invite_backing";
	backing.appendChild(plate);

	backing.className = "side_panel_invite_div";
	
	var description = oblC("d");
	description.className = "side_panel_invite_desc";
	description.innerHTML = "New to ourbucketlist?<br>Join us.";
	plate.appendChild(giveSpace(15));
	plate.appendChild(description);
	plate.appendChild(giveSpace(15));
	
	var one = new oblInput({
			exp:" Full Name",
                        "name":"name",
                        "thePar":plate,
                        "width":185,
			"id":"FullName0"
        });
	var two = new oblInput({
			exp:" Email",
                        "name":"email",
                        "thePar":plate,
                        "width":185,
                        "id":"Email0"
        });
	var three = new oblInput({
			exp:" Password",
                        "name":"password",
                        "thePar":plate,
                        "width":185,
                        "id":"SetPassword0",
			"isPassword":1
        });


	var link = oblC("a");
	link.className = "side_panel_invite_button_link";

	var img = oblC("i",imagesPath + "og_signup_button.png");
	link.appendChild(img);
	backing.appendChild(link);
	addListener("click",link,function(){
		landToPromptAccount();
	});



	

}

function oblSignatureList(args) {
	var curObj = this;
	var id = args.id;
	var thePar = args.thePar;

	var title = document.createElement("span");
	title.className = "headingI";
	title.innerHTML = "Signatures:";
	thePar.appendChild(title);
	thePar.appendChild(giveSpace(25));


	this.backing = document.createElement("div");

	this.assemble = function(data) {
		for(var i=0;i<data.uids.length;i++) {
			var lilTable = new oblTable(1,2);
			var picLink = oblC("a");
			addListener("click",picLink,(function(c) {
                                return function(blah) {
                                        navProfile(c);
                                };
                        })(data.uids[i]));
			var picture = document.createElement("img");	
			picLink.appendChild(picture);	
			picture.src = contentPath + "user" + data.uids[i] + "_thumb.jpg";
			lilTable.addContent(0,0,picLink);
			var nameS = document.createElement("span");
			nameS.className = "name";
			nameS.innerHTML = data.names[i];
			lilTable.addContent(0,1,nameS);
			var usernameS = document.createElement("span");
			var unL = oblC("a");
			addListener("click",unL,(function(c) {
                                return function(blah) {
                                        navProfile(c);
                                };
                        })(data.uids[i]));
			unL.appendChild(usernameS);
			usernameS.className = "profile_username";
			usernameS.innerHTML = "@" + data.usernames[i];
			lilTable.addContent(0,1,document.createElement("br"));
			lilTable.addContent(0,1,unL);
			var locationS = document.createElement("span");
			locationS.className = "location";
			locationS.innerHTML = data.locations[i];
			lilTable.addContent(0,1,document.createElement("br"));
			lilTable.addContent(0,1,locationS);
			var ttable = lilTable.getTable();
			ttable.style.display = "inline";
			curObj.backing.appendChild(ttable);
		}
		thePar.appendChild(curObj.backing);
	};
	
	this.fetch = function() {
		 var request = newRequest();
                var url = weburl + 'get_signature_list?iid=' + id;
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        data = eval('(' + request.responseText + ')');
                                        curObj.assemble(data);

                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);

		
	};
	this.refresh = function() {
		curObj.backing.innerHTML = '';
		curObj.fetch();
	};
	this.fetch();
}
/*This widget is a UI component whcih allows a user to suggest a step for any embarkment including (or perhaps
especially for) another user.  It also allows the owner to delete steps and allows anyone to use a drag and drop
feature to reorder the steps list.*/
	

function oblStepsWidget(args) {
		
	var curObj = this;
	curObj.virgin = true;
	var d = oblC("d");
	var W = new oblWindow({
		title:"Suggest a Step",
		setclass:"focus_div2013",
		content:d
	});	
	
	this.assemble = function(){	
		
		d.innerHTML = '';

		var thc = oblC("d");
		thc.align = "center";
		
		var topHeading = oblC("d","steps_widget_heading");
		topHeading.innerHTML = data.ownerName + " wants to " + data.itow;
		var sug = oblC("d","steps_widget_heading");
		sug.innerHTML = "Add to the plan by suggesting steps to take.";
		d.appendChild(giveSpace(25));
		thc.appendChild(topHeading);
		thc.appendChild(sug);
		d.appendChild(thc);
		var expl1 = oblC("d","steps_widget_expl");
		expl1.innerHTML = "Steps suggested for this item:<br>(drag and drop to re-arrange order.)";
		d.appendChild(expl1);

		/*look for some amount of steps,
		if this is a virgin list then account 
		for that fact.*/
		if( data.steps.length == 0 ) {
			alert("there are no steps yet and we need to prepare for this circumstance");
		}else{
			curObj.virgin = false;
		}

		var list = document.createElement("ul");
		list.id = "heyheyhey";
		list.style.listStyleType = "none";
		d.appendChild(list);
		for(var i=0;i<data.steps.length;i++){
			var e = document.createElement("li");
			e.id = data.ids[i];
			var kern = oblC("d","steps_widget_listing");
			var t = document.createTextNode(data.steps[i]);
			var img = oblC("i","/image_content/micro450.jpg");
			img.className = "steps_widget_listing_pic";
			var tbl = new oblTable(1,3);
			tbl.addContent(0,0,img);
			tbl.addContent(0,1,t);
			kern.appendChild(tbl.getTable());
			e.appendChild(kern);
			list.appendChild(e);
		}
		$("#heyheyhey").sortable();
		$("#heyheyhey").on("sortupdate",curObj.reorder);
		

		var lowerPortion = oblC("d","steps_widget_lower_portion");
		d.appendChild(lowerPortion);
		var inputDiv = oblC("d","steps_widget_input_div");
		var sep1 = oblC("d","steps_widget_sep");
		var buttonDiv = oblC("d","steps_widget_button_div");
		oblAppend([lowerPortion,inputDiv,sep1,buttonDiv]);
		/*Add help/explanation to explain the input*/
		var ed = oblC("d","mention_2013");
		ed.innerHTML = "Suggest a step";
		inputDiv.appendChild(ed);

		/*Add help/explanation to post div*/
		var ph = oblC("d","mention_2013");
		ph.innerHTML = "Add Step";
		buttonDiv.appendChild(ph);
	
		/*Create the input which will collect the step string*/	
		var ib = new oblInput({   
			width:350,
			name:"step",
			exp:" Suggest a step for " + data.ownerName + " to take...",
			thePar:inputDiv
		});

	
		var net = new oblInputNet([ib]);
		net.addPair("eid",args.eid);
		net.setPostUrl("suggest_step");
		var pb = document.createElement("button");
		var pbc = oblC("d","steps_widget_button_cont");
		pbc.appendChild(pb);
		buttonDiv.appendChild(pbc);
		var ypb = new YAHOO.widget.Button(pb);
		ypb.set("label","Add");
		net.setCallback(curObj.fetch);
		ypb.on("click",net.post);
		/*Functionality to allow pressing Enter key (return) to post*/
		var _keys = function(e){
			if( e.keyCode == 13 ) net.post();
		};
		addListener("keydown",ib.getInput(),_keys);

		
	};

	this.reorder= function(){	
		if(curObj.virgin) return;
		var request = newRequest();
		/*In order to convey the new..  ah...  order...  you will send an ordered array to the 
		srevice.*/
		var url = weburl + "reorder_steps?eid=" + args.eid;

		/*If we have gotten this far, we know that this is a non-virgin list, i.e. there is at least 1 step in the list*/
		var e = document.getElementById("heyheyhey");
		var it = e.getElementsByTagName("li");
	
		/*We will make a string of step IDs in the new order, then fire it off to the server so it knows what
		that new ordering is.  The id of each <li> element in this unordered list represents the ID of a correspopnding step.  
		So we go through these things and we build the string along the way.  This string takes the form of IDs separated by some separator,
		and I have arbitraily chosen a capital "A". The server will know how to sort this out and make sense of it.*/
			
		var numStr = it[0].id;
		for(var i=0;i<it.length;i++){
			if( i == 0 ) continue;
			numStr = numStr + "A";
			numStr = numStr + it[i].id;
		}
		
		var values = {};
		var url = weburl + "reorder_steps";
    	values['eid'] = args.eid;
        values['order_string'] = numStr;
    	standardPost(url,values,function(){/*do nothing*/});
		//__
		/*Note for now that there is no replyCallback. This is supposed to hit the reorder service
		and we are just counting on everything to work. 
		This may need to be changed in the future. */
	};

	this.fetch = function(){
		 var request = newRequest();
         var url = anonurl + 'get_steps?eid=' + args.eid;
		/*
		$.ajax(url).done(function(data){
			console.log(data);
			//curObj.assemble(data);
		}).fail(function(){
		})
		*/
        request.open("GET",url,true);
        request.onreadystatechange = function() {
              if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                              data = eval('(' + request.responseText + ')');
                               curObj.assemble(data);
                                }
                        }
                };
       request.send(null);	

	};

	this.fetch();
		
}

function oblTable(rows,columns) {

        var table = document.createElement("table");
        var tbody = document.createElement("tbody");
	tbody.style.className = "obl_table_test";
        this.getTable = function() {
                return table;
        };
        //somehow this has got to create a table.
        //perhaps just dont use var - just attach the creation directly.??
        for(i=0;i<rows;i++){


                var row = document.createElement("tr");

                for(j=0;j<columns;j++){
			var temp = document.createElement("td");	
                        row.appendChild(temp);
                }
                tbody.appendChild(row);
        }
        table.appendChild(tbody);

        this.getTable = function(){
                return table;
        };

	this.clear = function(r,c){
		//must start with 0
                table.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[r].getElementsByTagName("td")[c].innerHTML = '';
	};

        this.addContent = function(r,c,content){
                //must start with 0
                table.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[r].getElementsByTagName("td")[c].appendChild(content);

        };
        this.setCellClass = function(r,c,cn){
                //must start with 0
                table.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[r].getElementsByTagName("td")[c].className = cn;
        };
        this.setRowClass = function(row,cn){
                //numbering, again, startw with 0.
                table.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[row].className = cn;
        };

        this.getCell = function(r,c){
                return table.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[r].getElementsByTagName("td")[c];
        };

        //providing a method to set the CSS class name saves a bit of code later.
        this.setClassName = function(cn) {
                table.className = cn;
        };


}
	


	
	
	

	

function oblTap(thePar) { //A "tap" is a Title and Paragaph.  often, this is used to explain features of the site and is a recurrind elemet throughout.
	var curObj = this;
	this.title = "title";
	this.paragraph = "para";
	var  one = document.createElement("span");
	one.style.padding = "0px 3px 0px 3px";
        one.className = "section_title";
        var two = document.createElement("div");
	two.style.padding = "0px 3px 0px 3px";
        two.className = "headline_explanation";
	this.t = function(title) {
		curObj.title = title;
	};
	this.p = function(paragraph) {
		curObj.paragraph = paragraph;
		curObj.append();
	};

	this.setPClass = function(c) {
		two.className = c;
	};
	this.append = function() {
        	one.innerHTML = this.title;
	        two.innerHTML = this.paragraph;
		thePar.appendChild(one);
		thePar.appendChild(giveSpace(20));
		thePar.appendChild(two);
		thePar.appendChild(giveSpace(20));	
	};
	
}
/**************************************
 * Function: oblTimelineItem
 * Purpose:	constructs and displays a box listing on the timeline for a item  
 *	on user's bucketlist.  There will be one oblTimelineItem per item. 
 * ************************************/
    var eightball = 0;
    function oblTimelineItem(args) {
        eightball++;
        var curObj = this;
        var thePar = args.placement.backing;

        if( args.uid == globalBearings.getUid() ) {
            curObj.ownership = true;
        }
        else{
            curObj.ownership = false;
        }

        /*this is for the main "box"*/
        var d = oblC("d");
        this.d = d;

        this.triumph = function() {
            //this is not tied into our History Manager_____
            var e = new oblTriumphPrompt({
                thePar:document.getElementById("feed"),"eid":args.eid
            });
        };

    this.drop = function() {
        callDropJourney(args.jid);
    };	

    this.tweetInvite = function(i) {
        var msg = "I want to " + args.itow + " Join me at " + anonurl + "i?id=" + args.eid + " !";
        var t = new oblTwitterPrompt({tweet:msg });
    };

    this.inviteEmail = function() {
        displayInvite("",args.eid);//send a null text ofr legacy reasons
    };

    if( args.placement.left ) {
        var line = oblC("d");
        line.className = "timeline_connect_line";
        var white = oblC("d");
        white.className = "timeline_dot_enclosure";
        var dot = oblC("d");
        dot.className = "timeline_dot";
        var complex = oblC("d");
        complex.className = "timeline_connect_complex_left";
        complex.appendChild(line);
        white.appendChild(dot);
        complex.appendChild(white);

        thePar.appendChild(complex);
    }

    if( args.placement.right ) {
        var line = oblC("d");
        line.className = "timeline_connect_line";
        var white = oblC("d");
        white.className = "timeline_dot_enclosure";
        var dot = oblC("d");
        dot.className = "timeline_dot";
        var complex = oblC("d");
        complex.className = "timeline_connect_complex_right";
        white.appendChild(dot);
        complex.appendChild(white);
        complex.appendChild(line);

        thePar.appendChild(complex);
    }


    /*the invite/conclude menu
      (this is shown onmousein, hidden on mouseout)*/

    var invcon = oblC("d","timeline_box_hover");
    var il = oblC("a");
    var intxt = document.createTextNode("  Suggest a Step");
    var invi = oblC("i",imagesPath + "envelope_small.png");  //need to change this __
    invi.style.position = "relative";
    invi.style.top = "3px";

    invi.style.padding = "0px 0px 0px 5px";
    var coni = oblC("i",imagesPath + "small_checkmark.png");
    coni.style.position = "relative";
    coni.style.top = "2px";

    il.appendChild(invi);
    il.appendChild(intxt);


    invcon.appendChild(il);
    var invconSlot = oblC("d");
    invconSlot.className = "timeline_box_hover_slot";
    invconSlot.appendChild(invcon);
    thePar.appendChild(invconSlot);

    var icSlideUp = new YAHOO.util.Anim(invcon, 
        {top: {to:6}}, 
        0.2, 
        YAHOO.util.Easing.easeOut);

    var icSlideDown = new YAHOO.util.Anim(invcon, 
        {top: {to:31}}, 
        0.2, 
        YAHOO.util.Easing.easeOut);

    var _show = function() {
        icSlideUp.animate();
    };

    var _hide = function() {
        setTimeout(function() { icSlideDown.animate(); }, 3000);
    };

    addListener("mouseover",curObj.d,_show);
    //	addListener("mouseout",curObj.d,_hide);

    var mrt = oblC("d");
    mrt.style.height = "1px";
    mrt.style.width = "110px";
    mrt.style.zIndex = 5;
    mrt.style.position = "relative";
    mrt.style.left = "200px";

    thePar.appendChild(mrt);

    var hack = eightball + "whatever";
    /*eightball is a global variable which we tick each time
      in an effort to generate a unique string so that we can 
      pass that to the consturcotr here so that it creates a unique
      instance of the menu in each iteration of the loop which
      instantiates this obj.  YAHOO had a not so good idea there___*/
   	var _showM = function(){
		var e = new oblStepsWidget({
			eid:args.eid
		});
	};
	addListener("click",il,_showM);
    var hack2 = eightball + "endlessly";
    var _showConclude = function(){
        var oMenu = new YAHOO.widget.Menu(hack2,{
            position:"static",
            clicktohide:true,
            lazyload:true
        });
        var _triumph = function(){
            curObj.triumph();
            oMenu.hide();
        };
        var _drop = function(){
            curObj.drop();
            oMenu.hide();
        };

        oMenu.addItems([
            { text: "Triumph!", value: 0,onclick: { fn: _triumph} },
            { text: "Drop", value: 1, onclick: { fn: _drop}},
        ]);
        oMenu.render(mrt);
        oMenu.show();
    };

    d.className = "timeline_box";

    /*the journey (item) itow*/

    var itow = oblC("s");
    itow.className = "timeline_itow";
    itow.innerHTML = args.itow;
    var iLink = oblC("a");
    iLink.appendChild(itow);
    var _clickme = function() {
        navConcourse(args.jid);
    };
    addListener("click",iLink,_clickme);

    //if (category == "pri")
    //    d.appendChild(oblC("d", "private_item_indicator"));

    var t = new oblTable(1,3);
    var pic = oblC("i",imagesPath + "item_emblem.png");
    t.addContent(0,0,pic);
    t.addContent(0,1,iLink);
    var d2 = oblC("i",imagesPath + "attach_small.png");
    var d2l = oblC("a");
    d2l.appendChild(d2);
    var targ = oblC('d');
    targ.style.height = "1px";
    targ.style.position = "absolute";
    targ.style.zIndex = "10";

    t.addContent(0,2,d2l);
    t.addContent(0,2,targ);
    var tableE = t.getTable();
    tableE.getElementsByTagName("td")[1].style.width = "300px";

    /*add listener to attach (paper clip) for attaching items*/
    var hack3 = "lovingsound" + eightball;
    var _attach = function(){
        var oMenu = new YAHOO.widget.Menu(hack3,{
            position:"static",
            lazyload:true,
            clicktohide:true
        });
        var aMenuItemClick = function() {
            var sText = this.cfg.getProperty("text");
            displayAttach(sText,0,args.jid);
            oMenu.hide();
        };

        oMenu.addItems([
            { text: "Note", value: 0,onclick: { fn: aMenuItemClick} },
            { text: "Picture", value: 1, onclick: { fn: aMenuItemClick}},
            { text: "Question", value: 1, onclick: { fn: aMenuItemClick}},
            { text: "Link", value: 1, onclick: { fn: aMenuItemClick}}
        ]);
        oMenu.render(targ);
        oMenu.show();
    };

    addListener("click",d2l,_attach);

    /*on to the "There are X users on this item" line*/
    var nar = oblC("s");
    var end = oblC("s");

    if( args.count > 1 ) {
        nar.innerHTML = "There are ";
    }else{
        nar.innerHTML = "There is ";
    }

    if(args.count > 1) {
        end.innerHTML = " users on this item.";
    }else{
        end.innerHTML = " user on this item.";
    }

    var countV = oblC("s");
    countV.className = "timeline_count";
    var c = document.createTextNode(args.count);
    countV.appendChild(nar);
    countV.appendChild(c);
    countV.appendChild(end);
    d.appendChild(tableE);
    d.appendChild(countV);

    /*settings sprocket*/
    d.appendChild(giveSpace(1));
    var sa = oblC("a");
    sa.align = "right";
    sa.className = "timeline_sprocket";
    var si = oblC("i",imagesPath + "sprocket_small.png");
    sa.appendChild(si);
    addListener("click",sa,function(){
        var e = new oblEmbarkmentProposition({
            update:true,
            eid:args.eid
        });
    });
    d.appendChild(sa);
    d.appendChild(sa);

    this.showMorePics = function() {
        curObj.d.style.height = "235px";
        var t = new oblTable(1,2);
        var docT = t.getTable();
        docT.style.position = "relative";
        docT.style.bottom = "10px";
        docT.style.left = "10px";
        var bigC = oblC("d");
        bigC.className = "timeline_extra_pic";
        var topS = oblC("d");
        topS.className = "timeline_extra_pic";
        var midS = oblC("d");
        midS.className = "timeline_extra_pic";
        var botS = oblC("d");
        botS.className = "timeline_extra_pic";
        t.addContent(0,0,bigC);
        t.addContent(0,1,topS);
        t.addContent(0,1,midS);
        t.addContent(0,1,botS);
        d.appendChild(t.getTable());
        var _on = function() {
            navConcourse(args.jid);
        };
        var one = new oblPic({
            click:_on,
            url:args.picUrls[0],
            thePar:bigC
        });
        var two = new oblPic({
            click:_on,
            url:args.picUrls[1],
            thePar:topS
        });
        var three = new oblPic({
            click:_on,
            url:args.picUrls[2],
            thePar:midS
        });
        var four = new oblPic({
            click:_on,
            url:args.picUrls[3],
            thePar:botS
        });
    };
    /*if there are more pictures to be shown which pertain to
      this item, then show them, Obl style.*/
    if( args.picUrls.length > 1 ) {
        curObj.showMorePics();
    }
    thePar.appendChild(d);
}//end of oblTimelineItem



function oblTimeline(args) {

	var curObj = this;

	var called = [];

	var thePar = args.thePar;	
	var strings = globalBearings.getSeasonStrings();
	/*the following array will keep track of which seasons have been called
	this will be used when scrolling triggers a season to be called.
	if this is 0, its uncalled.  if its 1, its called.  its its HOT, its hot
	the various keys for this hash will season strings*/
		
	for(var i=0;i<strings.length;i++) {
		called[i] = 0;
	}
	

	this.wasCalled = function(sea) {
		var where;
		for(var i=0;i<strings.length;i++) {
			if(strings[i] == sea)
				where=i;
		}
		called[where] = 1;
		var j;
		for(j=called.length;j>=0;j--){
			if( called[j] == 1 ) 
				break;
		}
		var next = j+1;
		if( next > called.length ) {
			curObj.hot = document.getElementById("someday");
		}else{
			curObj.hot = document.getElementById(strings[next]);
		}
	};
		
		


	/*this should comepare the window's position to that
	of the "hot" season.  if the are near, it is time
	to call that hot season.*/
	this.callSeasonIfNeeded = function() {
		/*this is currently disabled___*/
		return;

		/*first get the position of the window*/
		var curVert = oblGetVerticalWindowPosition();
		
		
		/*then get the posotion of the hot div*/
		

		/*call the hot div if neccesary*/
		/*and rest the new hot div*/

		var findPosition = function() {
                	var curLeft = curTop = 0;
	                var obj = curObj.hot;
	                if( obj.offsetParent) {
	                        do {
	                                curLeft += obj.offsetLeft;
	                                curTop += obj.offsetTop;
	                        } while (obj = obj.offsetParent);
	                }
	                return [curLeft,curTop];
        	};
		var hPos = findPosition();
		var hotPos = hPos[0];
		if( (hotPos - curVert) < 50 ) { 
			curObj.wasCalled(curObj.hot.id);
			var e = new oblTimelineSeason({
				parObj:curObj,
				seasonString:curObj.hot.id,
				uid:args.uid
			});
		}
			
	};

	this.addScrollCheck = function() {
		addListener("scroll",window,curObj.callSeasonIfNeeded);
	};
	
	this.removeScrollCheck = function() {
		removeListener("scroll",window,curObj.callSeasonIfNeeded);
	};
	this.addScrollCheck();


		
	

	

	

	this.layoutDivs = function() {
		/*loop through each future season and create a div,
		then create a div for "someday"*/
		for(var i=0;i<strings.length;i++) {
			var d = oblC("d");
			d.id = strings[i].toString();
			thePar.appendChild(d);
		}
		var s = oblC("d");
		s.id = "someday";
		thePar.appendChild(s);
		var e = oblC("d");
		e.id = "the_end";
		thePar.appendChild(e);

	};

	this.layoutDivs();
	

	for(var i=0;i<strings.length;i++){	
		var e = new oblTimelineSeason({
				parObj:curObj,
				"uid":args.uid,
				"seasonString":strings[i],
				nextSeason:strings[i+1]
		});
		curObj.wasCalled(strings[i]);
	}
	var w = new oblTimelineSeason({
		parObj:curObj,
		uid:args.uid,
		seasonString:"someday"
	});

	/*get rid of timeline base if it is there*/
        var base = document.getElementById("timeline_base");
        if(base)
                base.parentNode.removeChild(base);

	var base = oblC("d");
	base.id = "timeline_base";
	base.className = "timeline_nav_container";
	

	var nav = oblC("d");
	nav.className = "timeline_nav";


	/*Add the navigation feature*/
	var ts = oblC("d");
	var tss = oblC("a");
	tss.className = "timeline_nav_year";
	var tsb = oblC("d");
	tsb.className = "timeline_nav_box";
	
	tss.innerHTML = "This Season";
	nav.appendChild(ts);
	var _callThisSeason = function() {
		var e = new oblTimelineSeason({
				parObj:curObj,
			"uid":args.uid,
			"seasonString":strings[0],
			scroll:1,
			nextSeason:strings[1]
		});
		curObj.wasCalled(strings[0]);
	};
			
	addListener("click",tss,_callThisSeason);	
	nav.appendChild(tsb);
	nav.appendChild(tss);

	/*use a for loop to make a clickable for each year*/
	var seasons = globalBearings.getSeasonStrings();
	var set = seasons[0].split('A');
	var nextSeasonUp = set[0];
	var year = set[1];

	/* the var tdc is used to quantify how many seasons there are to be added to a year's listing.
	The only time this is not four is for the first year.  (if this were spring, it owuld be 3.
	if this where fall, it would be 1.  capish?*/
	var tdcH = {};
	tdcH['winter'] = 4;
	tdcH['spring'] = 3;
	tdcH['summer'] = 2;
	tdcH['fall'] = 1;

	var tdc = tdcH[nextSeasonUp];
		

		

	var prevYear = year-1;
	var firstYear = year;

	/*Layout the nav feature*/
	this.navTree = {};
	for(i=0;i<seasons.length;i++) {

		var curYear = seasons[i].split('A')[1];
		if(curYear != prevYear ) {

			
		
			/*this element in the array represents the beginning of a new year*/
			var next = seasons[i].split('A');

			var year = next[1];	
			var a = oblC("a");
			a.className = "timeline_nav_year";
			var d = oblC("d");
			var outerBlock = oblC("d");
			outerBlock.className = "timeline_nav_box";
			d.appendChild(outerBlock);	
			d.appendChild(a);
			a.innerHTML = "20" + next[1]
		
			nav.appendChild(d);
			/*onclick this d should spawn divs below it for the seasons*/

			addListener("click",a,(function(c,d) {
				return function(blah) {
					if(curObj.navTree[c] == 1) 
						return;
					
					/*note that this year was expanded, so that it won't be expanded again*/
					curObj.navTree[c] = 1;



	
					if(!(c == firstYear && tdc<4) ){ 
						
						var one = oblC("a");
						one.className = "timeline_nav_listing";
						one.innerHTML = "Winter 20" + c;
						addListener("click",one,function() {
							/*we actually reassemble the season string here.
							a little odd, but whatever*/
							var seasonStr = "winter" + "A" + c;
							var e = new oblTimelineSeason({
								parObj:curObj,
								scroll:1,
								"seasonString":seasonStr,
								"uid":args.uid
							});
							curObj.wasCalled(seasonStr);
						});
					
						var ib1 = oblC("d");	
						ib1.className = "timeline_nav_indented_box";
						ib1.appendChild(one);
						var lc = oblC("d");
						lc.className = "timeline_nav_line";
						lc.appendChild(ib1);
						lc.appendChild(one);
						d.appendChild(lc);
					}
					
					if(!(c == firstYear && tdc<3) ){  //do this, unless this is the first year and 
						var two = oblC("a");
						two.className = "timeline_nav_listing";
						two.innerHTML = "Spring 20" + c;
						addListener("click",two,function() {
							/*we actually reassemble the season string here.
	                                                a little odd, but whatever*/
	                                                var seasonStr = "spring" + "A" + c;
	                                                var e = new oblTimelineSeason({
								parObj:curObj,
								scroll:1,
	                                                        "seasonString":seasonStr,
	                                                        "uid":args.uid
	                                                });
							curObj.wasCalled(seasonStr);
	
						});
						 var ib2 = oblC("d");
                                                ib2.className = "timeline_nav_indented_box";
                                                 var lc = oblC("d");
                                                lc.className = "timeline_nav_line";
                                                lc.appendChild(ib2);
                                                lc.appendChild(two);
                                                d.appendChild(lc);


					}
					if(!(c == firstYear && tdc<2) ){  //do this, unless this is the first year and 
						var three = oblC("a");
						three.className = "timeline_nav_listing";	
						three.innerHTML = "Summer 20" + c;
						addListener("click",three,function() {
							/*we actually reassemble the season string here.
	                                                a little odd, but whatever*/
	                                                var seasonStr = "summer" + "A" + c;
	                                                var e = new oblTimelineSeason({
								parObj:curObj,
								scroll:1,
	                                                        "seasonString":seasonStr,
	                                                        "uid":args.uid
	                                                });
							curObj.wasCalled(seasonStr);
	
						});
	                                        var ib3 = oblC("d");
	                                        ib3.className = "timeline_nav_indented_box";
						 var lc = oblC("d");
                                                lc.className = "timeline_nav_line";
                                                lc.appendChild(ib3);
                                                lc.appendChild(three);
                                                d.appendChild(lc);

					}
					if(!(c == firstYear && tdc<1) ){  //do this, unless this is the first year and 
						var four = oblC("a");
						four.className = "timeline_nav_listing";
						four.innerHTML = "Fall 20" + c;
						addListener("click",four,function() {
							/*we actually reassemble the season string here.
	                                                a little odd, but whatever*/
	                                                var seasonStr = "fall" + "A" + c;
	                                                var e = new oblTimelineSeason({
								parObj:curObj,
								scroll:1,
	                                                        "seasonString":seasonStr,
	                                                        "uid":args.uid
	                                                });
							curObj.wasCalled(seasonStr);
	
						});
	                                        var ib4 = oblC("d");
	                                        ib4.className = "timeline_nav_indented_box";
						var lc = oblC("d");
                                                lc.className = "timeline_nav_line";
                                                lc.appendChild(ib4);
                                                lc.appendChild(four);
                                                d.appendChild(lc);

					}
				};
			})(next[1],d));

			prevYear=curYear;
		
				
		


		
		

		}
	}
	var somd = oblC("d");
        var soms = oblC("a");
        soms.className = "timeline_nav_year";
        var somb = oblC("d");
        somb.className = "timeline_nav_box";

        soms.innerHTML = "Someday";
        nav.appendChild(soms);
        var _callSomeday= function() {
                var e = new oblTimelineSeason({
                                parObj:curObj,
                        uid:args.uid,
			scroll:1,
                        seasonString:"someday",
                        nextSeason:0
                });
                curObj.wasCalled("someday");
        };

        addListener("click",soms,_callSomeday);
        nav.appendChild(somb);
        nav.appendChild(soms);

	
		
	var body = document.getElementById("CenterDiv");
	body.appendChild(base);
	base.appendChild(nav);


	
	


}

function oblTimelineSeason(args) {
	/*the oblTimelineSeason should have two agruments:
	the season as a olb season string (e.g. fallA12), and
	the UID for whose bucketlist this belongs to
	Note that the season string will be the season div's ID
	in the timeline, so ther is no "thePar" passed in - the
	parent element is simply that element whose ID is equal
	to the season string*/
	var thePar = document.getElementById(args.seasonString);
	thePar.innerHTML = '';
	var curObj = this;
	var seasonString = args.seasonString;


	/*method to scroll the window to the current season*/
	this.scrollToSeason = function() {
		var where = curObj.findPosition();
		scroll(where[0],where[1]);
	};

	/*this function should find the position of the current season*/
	this.findPosition = function() {
		var curLeft = curTop = 0;
		var obj = thePar;
		if( obj.offsetParent) {
			do {
				curLeft += obj.offsetLeft;
				curTop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		return [curLeft,curTop];
	};
				
				
		

	/*we know what season this is, but what is the next season?*/
	var seasons = globalBearings.getSeasonStrings();
	var nextSeason;
	var theTop = seasons.length - 1;
	for(var i=0;i<seasons.length;i++) {
		if(seasonString == "someday")
			break;
			
		if( seasons[i] == seasonString ) {
			if(i==theTop) {
				nextSeason = "someday";
			}else{
				nextSeason = seasons[i+1];
			}
		}
	}

	/*Each season at heart will consist of a table having tree columns.
	A left div (ld) and a right div (rd) are created and attached to
	two columns in the table.  These will be the two possible
	places to append new oblTimelineItem objects. At any give time, 
	one of these divs will be poised to be the "nextBacking" for 
	the next oblTimelineItem object.  the method "swapBacking" 
	will perform the function of alternating between the two.
	the third column is there for drawing the line, and relative
	positioning will be used to move this line back to the center*/
	var seasonTable = new oblTable(1,3);
	var ld = oblC("d");
	var rd = oblC("d");
	var tl = oblC("d");
	tl.className = "timeline_vertical_line";
	seasonTable.addContent(0,0,ld);
	seasonTable.addContent(0,1,tl);
	seasonTable.addContent(0,2,rd);
	var theTable = seasonTable.getTable();
	theTable.getElementsByTagName("td")[1].className = "timeline_central_column";
	thePar.appendChild(theTable);

	/*add a button to call the next season*/
	if(nextSeason) {
		var ns = oblC("d");
		ns.align = "center";
		if(nextSeason == "someday" ) {
			ns.innerHTML = "someday";
		}else{
			var verbage = nextSeason.split('A');
			ns.innerHTML = verbage[0] + " 20" + verbage[1];
		}
		ns.className = "timeline_next_season";
		var nsl = oblC("a");
		nsl.appendChild(ns);
		thePar.appendChild(nsl);
		var _callNextSeason = function() {
			var e = new oblTimelineSeason({
				parObj:args.parObj,
				"seasonString":nextSeason,
				"uid":args.uid
				
			});
			args.parObj.wasCalled(nextSeason);
		};
		addListener("click",nsl,_callNextSeason);
	}
	


	

	curObj.placement = {};
	

	this.swapBacking = function() {
		if( curObj.nextBacking == ld ) {
			curObj.nextBacking = rd;
			curObj.placement.right = true;
			curObj.placement.left = false;
			curObj.placement.backing = rd;
		}else{
			curObj.nextBacking = ld;
			curObj.placement.left = true;
			curObj.placement.right = false;
			curObj.placement.backing = ld;
		}
	};



	var data;
	this.showEmpty = function() {
		
			curObj.swapBacking();
			var d =	 oblC("d");
			d.className = "timeline_box";
			var a = oblC("s");	

			a.className = "timeline_itow";
			if(seasonString != "someday") {
				var stuff = seasonString.split('A');
				a.innerHTML = "There are no items yet added to " + stuff[0] + " 20" + stuff[1];
			}else{
				a.innerHTML = "There are no items yet added to Someday";
			}

			d.appendChild(a);
			curObj.nextBacking.appendChild(d);
			curObj.setArrowLength();
	};

	this.label = function() {
                curObj.swapBacking();
                var d = oblC("d");
                d.className = "timeline_season_label";
		var g = oblC("d");
		g.style.padding = "10px";
		if(seasonString == "someday") {
			g.innerHTML = "someday";
		}else{
        	        var stuff = seasonString.split('A');
	
                	g.innerHTML = stuff[0] + " 20" + stuff[1];
		}
		d.appendChild(g);
                curObj.nextBacking.appendChild(d);
                curObj.setArrowLength();
        };


	this.setArrowLength = function() {
		var us = curObj.findPosition();
		var nextId;
		if(seasonString == "someday") {
			nextId = "the_end";
		}else{
			nextId = nextSeason;
		}
		var next = oblFindPosition(document.getElementById(nextId));
		var length = next[1] - us[1];
		var length = length - 30;
		tl.style.height = length + "px";
		
	};
	
		
	this.assemble = function() {
		/*label the season so the user knows what they are looking at.*/
		if(args.scroll) 
			curObj.scrollToSeason();
		curObj.label();
		if( data.jids.length == 0 ) {
			curObj.showEmpty();
			return;
		}
		/*call an item for each journey*/

		for(var i=0;i<data.jids.length;i++) {
			curObj.swapBacking();
			var e = new oblTimelineItem({
				/*dissect journey data*/
				"jid":data.jids[i],
				"itow":data.itows[i],
				"eid":data.eids[i],
				"count":data.counts[i],
				"picUrls":data.pictureSets[i].urls,
				"placement":curObj.placement,
				"uid":args.uid,
				"category":data.categories[i]
			});

		}
		curObj.setArrowLength();
		function test() {
			var hscroll = (document.all ? document.scrollLeft : window.pageXOffset);
			var vscroll = (document.all ? document.scrollTop : window.pageYOffset);
		}  
			
	};

	this.fetch = function() {
		var stuff = [];
		var request = newRequest();
		var url;
		if(seasonString != "someday") {
			stuff = seasonString.split('A');
	                url = weburl + 'get_bucketlist?uid=' + args.uid + ";sea=" + stuff[0] + ";year=" + stuff[1];
		}else{
			url = weburl + 'get_bucketlist?uid=' + args.uid + ";cat=som";
		}
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                                if( request.readyState == 4 ) {
                                        if( request.status == 200 ) {
                                                data = eval('(' + request.responseText + ')');
                                                curObj.assemble(data);

                                        }
                                }
                 };
                 //now send.  we'll be waiting...
                 request.send(null);


	};

	this.fetch();

	

}

function oblTriumphEditor(args) {
	var curObj = this;
	var data;
	this.fetch = function() {
		var url = anonurl + 'get_triumph?tid=' + args.tid;
		var request = newRequest();
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
					data = eval('(' + request.responseText + ')');
					curObj.assemble();
                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);
	}
	
	this.assemble = function() {
		var t = oblC("d");
		t.innerHTML = "&nbsp &nbsp     Edit this triumph:";
		t.className = "headingII";
		args.thePar.appendChild(giveSpace(25));
		args.thePar.appendChild(t);
		args.thePar.appendChild(giveSpace(25));
		var editor = document.createElement("textarea");
		curObj.editor = editor;
		editor.innerHTML = data.bestpart;
                args.thePar.appendChild(editor);
                curObj.Editor = new YAHOO.widget.Editor(editor, {
                                height:'420px',
                                width: '520px',
                                dompath: false,
                                animate: true,
                                toolbar: {
                                        titlebar: "Edit this triumph:",
                                        buttons: [
                                            { group: 'textstyle', label: 'Font Style',
                                                buttons: [
                                                    { type: 'push', label: 'Bold', value: 'bold' },
                                                    { type: 'push', label: 'Italic', value: 'italic' },
                                                    { type: 'push', label: 'Underline', value: 'underline' },
                                                    { type: 'separator' },
                                                    { type: 'select', label: 'Arial', value: 'fontname', disabled: true,
                                                        menu: [
                                                            { text: 'Arial', checked: true },
                                                            { text: 'Arial Black' },
                                                            { text: 'Comic Sans MS' },
                                                            { text: 'Courier New' },
                                                            { text: 'Lucida Console' },
                                                            { text: 'Tahoma' },
                                                            { text: 'Times New Roman' },
                                                            { text: 'Trebuchet MS' },
                                                            { text: 'Verdana' }
                                                        ]
                                                    },
                                                    { type: 'spin', label: '13', value: 'fontsize', range: [ 9, 75 ], disabled: true },
                                                    { type: 'separator' },
                                                    { type: 'color', label: 'Font Color', value: 'forecolor', disabled: true },
                                                    { type: 'color', label: 'Background Color', value: 'backcolor', disabled: true }
                                                ]
                                            }
                                        ]
                                }
                        });
                curObj.Editor.render();

		args.thePar.appendChild(giveSpace(25));	
		var ab = document.createElement("button");
		args.thePar.appendChild(ab);
		var parents = [];	
		var picT = new oblTable(2,3);
		args.thePar.appendChild(picT.getTable());
		for(var i=0;i<6;i++){
			parents[i] = oblC("s");
			if(i<3){
				picT.addContent(0,i,parents[i]);
			}else{
				picT.addContent(1,i-3,parents[i]);
			}
		}	
		
		/*button to add a new picture*/
		var set = new oblPicSet({
			type:"triumph",
			iid:args.tid,
			parents:parents
		});
		var _bythepound = function(){
			set.promptAdd();
		};	
		var AB = new YAHOO.widget.Button(ab,{
			type:"push",
			label:"Add New Picture"
		});
		AB.on("click",_bythepound);
		
		args.thePar.appendChild(giveSpace(25));

		var lt =  new oblTable(1,2);
		args.thePar.appendChild(lt.getTable());
		var w = oblC("d");
		w.style.width = "200px";
		lt.addContent(0,0,w);
		var b = document.createElement("button");
		var c = document.createElement("button");
		lt.addContent(0,1,b);
		lt.addContent(0,1,c);


		var B = new YAHOO.widget.Button(b);
		B.set("label","Save Changes");
		B.on("click",curObj.send);
		var C = new YAHOO.widget.Button(c);
		C.set("label","Cancel");
		C.on("click",curObj.cancel);		
	
	


		}
	this.cancel = function() {
		navProfile();
	};
	
	this.leave = function() {
		/*for now this is the equivalent of cancel
		change if neccesary*/
		curObj.cancel();
	};
	
	this.send = function() {
		/*collect the values*/
		curObj.Editor.saveHTML();

		
		var values = {};
		values['bestpart'] = curObj.Editor.get('element').value;
		values['tid'] = args.tid;
		var url = weburl + "edit_triumph";
		standardPost(url,values,curObj.leave);

		
		

	};
		
	this.fetch();


}

function oblTriumphPrompt(args) {

	var curObj = this;

	var thePar = args.thePar;
	var data;

	var facebookSend = 0;
	this.toggleFacebookSend = function() {
		if( facebookSend == 0 ) {
			facebookSend = 1;
		}else{
			facebookSend = 0;
		}
	};

		

	/*method to send the triumph*/
	this.send = function() {

	};

		

	this.assemble = function() {
		/*clear out the par*/
		thePar.innerHTML = '';
		scroll(0,0);

		/*display the header */

	
		var topD = oblC("d");
		var blast = oblC("d");
		var line1 = oblC("s");

		var header = oblC("s");
		header.innerHTML = "Declare a Triumph!";
		header.className = "headingIII";
		line1.className = "dotted_sep";
		line1.innerHTML = "..................................................";
		oblPosition([line1,0,0,10,5]);
		
	
	
		var line2 = oblC("s");
		line2.className = "dotted_sep";
		
		line2.innerHTML = ".......................................................................          &nbsp ..............";

		line2.style.position = "relative";
		line2.style.bottom = "25px";
		blast.className = "triumph_blast";
		var itow = oblC("s");
		itow.className = "post_triumph_itow";
		itow.innerHTML = data.itow;
		itow.style.padding = "300px 0px 0px 40px";
		var whatwas = oblC("s");
		whatwas.className = "headline_question";
		whatwas.style.padding = "0px 0px 0px 80px";
		whatwas.innerHTML = "What was the best part of this experience?";
		blast.appendChild(giveSpace(10));
		blast.appendChild(itow);
		blast.appendChild(giveSpace(10));
		blast.appendChild(whatwas);
		blast.appendChild(giveSpace(40));
		var line3 = oblC("s");

		topD.appendChild(header);		
		topD.appendChild(line1);
		topD.appendChild(blast);
		topD.appendChild(line2);

		thePar.appendChild(topD);

		/*the picture upload underlay*/
		var underlay = oblC("d");
		underlay.className = "triumph_underlay";
		var pointer = oblC("i",imagesPath + "pointer_out.gif");
		pointer.className = "triumph_pointer_out";

		underlay.appendChild(pointer);

		var tPicZone = oblC("d");
		tPicZone.className = "t_pic_zone";
		tPicZone.id = "t_pic_zone";
		underlay.appendChild(tPicZone);
	

		var editorDiv = oblC("d");
		editorDiv.className = "triumph_editor";

		var eD = oblC("d");
		eD.className = "triumph_editor";	
	

		var editor = document.createElement("textarea");
		eD.appendChild(editor);
		var Editor = new YAHOO.widget.Editor(editor, {
				height:'420px',
				width: '520px',
				dompath: false,
				animate: true,
				toolbar: {
					titlebar: "What was the best part of this experience?",
					buttons: [
			                    { group: 'textstyle', label: 'Font Style',
                        			buttons: [
			                            { type: 'push', label: 'Bold', value: 'bold' },
			                            { type: 'push', label: 'Italic', value: 'italic' },
			                            { type: 'push', label: 'Underline', value: 'underline' },
			                            { type: 'separator' },
			                            { type: 'select', label: 'Arial', value: 'fontname', disabled: true,
			                                menu: [
			                                    { text: 'Arial', checked: true },
			                                    { text: 'Arial Black' },
			                                    { text: 'Comic Sans MS' },
			                                    { text: 'Courier New' },
			                                    { text: 'Lucida Console' },
			                                    { text: 'Tahoma' },
			                                    { text: 'Times New Roman' },
			                                    { text: 'Trebuchet MS' },
			                                    { text: 'Verdana' }
			                                ]
			                            },
			                            { type: 'spin', label: '13', value: 'fontsize', range: [ 9, 75 ], disabled: true },
			                            { type: 'separator' },
			                            { type: 'color', label: 'Font Color', value: 'forecolor', disabled: true },
			                            { type: 'color', label: 'Background Color', value: 'backcolor', disabled: true }
			                        ]
			                    }
                			]
				}
			});
		Editor.render();


		/*attach to the parent element*/
		thePar.appendChild(topD);
		thePar.appendChild(underlay);
		thePar.appendChild(eD);
		 var uuSlideOut = new YAHOO.util.Anim(underlay, {
	                left: {
	                        to:342 
	                }
	        }, 0.2, YAHOO.util.Easing.easeOut);
	        
	        var uuSlideIn = new YAHOO.util.Anim(underlay, {
	                left: {
	                        to:25 
	                }
	        }, 0.2, YAHOO.util.Easing.easeOut);

		var slide = {};
	
	        var slideIn = function() {
	                uuSlideIn.animate();
	                pointer.src = imagesPath + 'pointer_out.gif';
			removeListener("click",pointer,slideIn);
			addListener("click",pointer,slide.slideOut);
	        };
	
	
	         slide.slideOut = function() { 
	                uuSlideOut.animate();
	                pointer.src = imagesPath + 'pointer_in.gif';
			addListener("click",pointer,slideIn);
	         };

	
		addListener("click",pointer,slide.slideOut);

		var footer = oblC("d");
		/*Create an element to contain the p2fb widget*/
		var p2fbPar = oblC("d");
		p2fbPar.style.padding = "0px 0px 10px 0px";
		footer.appendChild(p2fbPar);

		/*Add a p2fb widget*/
		var p2fb = new oblP2fb({
			thePar:p2fbPar,
			parObj:curObj
		});
		
		var t = document.createElement("button");
		t.style.padding = "0px 0px 0px 300px";
		var c = document.createElement("button");
		footer.appendChild(t);
		footer.appendChild(c);
		footer.style.position = "relative";
		footer.style.bottom = "430px";
		footer.style.left = "270px";
		var T = new YAHOO.widget.Button(t);
		var C = new YAHOO.widget.Button(c);
		T.set("label","Triumph!");
		C.set("label","Cancel");

		thePar.appendChild(footer);
		callAddTriumphPics(data.jid);

		function submitTriumph() {
	                /*
	                for this function, we cannot just loop through the elements in the TriumphForm and then send as
	                as a hash to standardPost.  there will be undefined elements in that hash which break
	                code (encodeFormValues).  so we grab only what we need - the jid and the 'bestpart' html.
	                */
	                var sendUrl = weburl + 'add_triumph';

	                var values = {};
			if( p2fb.post2fb() )
				values['p2fb'] = 1;

	
	                values['jid'] = data.jid;
	                values['bestpart'] = editor.value;
	
	                var callBack = function() { callProfile(); };

	                 standardPost(sendUrl,values,callBack);
		}




		var submit = function() {
			Editor.saveHTML();
			submitTriumph();
		}
		T.on("click",submit);
		var headTo = function() {
			callProfile();
		};
		C.on("click",headTo);

		
	};



	this.fetch = function() {
		var request = newRequest();
                var url = weburl + 'reserve_triumph?eid=' + args.eid;
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        data = eval('(' + request.responseText + ')');
                                        curObj.assemble(data);

                                }
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);

	};
	this.fetch();




}

function oblTwitterPrompt(args) { //object with its own UI, alowing user to send out tweets pertaiing to obl.
	var curObj = this;
	this.theStatus = args.theStatus;

	this.checkRegistration = function() {
		if( globalBearings.isTwitterRegistered() ) {
			return;
		}
	
		/*remember what we have to do, then send to Twitter to register*/
		
		var q = new oblPersistentQue({
			"action":"tweet",
			"theString":curObj.theStatus
		});

		/*send to twitter stuff*/
		document.location = weburl + 'twitter_auth';
	};

	this.showComplete = function() {

		var c = oblC("d");
		c.innerHTML = "Tweet has been sent.";
		var d = new oblDialog({
			"title":"Tweet sent!",
			"content":c
		});
		d.show();
	};

	this.tweet = function() {
		curObj.checkRegistration();
		var request = newRequest();
	        var url = weburl + "tweet_onbehalf?status=" + curObj.theStatus;
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
					curObj.showComplete();
	                        }
	                }
	        };
        	request.send(null);
	};
	
	this.promptOk = function() {
               var backing = oblC("d");
		backing.innerHTML = "We are about to tweet this out for you:<br><br><b>" + curObj.theStatus + "</b><br><br>Ok?";


		 var d = new oblDialog({
                        "title":"Ok to tweet?",
                        "content":backing
                });
                var lePic = document.createElement("img");
                lePic.src = imagesPath + 'tweety.gif';
                var _tweet = function() {
                        curObj.tweet();
                        d.hide();
                };
                 var buttons = ( [ { text:"Ok",
                handler:_tweet, isDefault:true } ]);

                d.changeButtons(buttons);
                d.show();


	};

         this.promptInvite = function() {


		var eid = args.eid;
                var backing = oblC("d");
		curObj.theStatus = 'Embark on a journey with me at http://ourbucketlist.com/a/i?id=' + eid + ' !';
		backing.innerHTML = "We are about to tweet this out for you:<br><br><b>" + curObj.theStatus + "</b><br><br>Ok?";
                 var d = new oblDialog({
			"title":"Ok to tweet?",
			"content":backing
                });
                var lePic = document.createElement("img");
                lePic.src = imagesPath + 'images/tweety.gif';
		var _tweet = function() {
			curObj.tweet();
			d.hide();
		};
		 var buttons = ( [ { text:"Ok",
                handler:_tweet, isDefault:true } ]);

                d.changeButtons(buttons);
		d.show();
        };


        /*eventually swap this to a switch statement*/
        if( args.type == "invite" )
                this.promptInvite();
		
	if( args.tweet ) {
		curObj.theStatus = args.tweet;
		curObj.promptOk();
	}
}







function oblVapor(args) {
	/*this is something which is instantiated, and used
	to determine which, if any, html backdrops should
	be called based on circumstances*/

	var curObj = this;

	this.setOpenGardenNav = function() {
		//get rid of the nav for people who are not yet logged in.
		var e = document.getElementById("nav_bar");
		e.innerHTML = '';	

	};

	this.tidyUp = function() {
		
		globalBearings.setGarden(1);
		setFeed();
		if( !(globalBearings.isLoggedIn()) ) 
			curObj.setOpenGardenNav();
		navStateHandler(args.state);

	};

	var request = newRequest();
        /*set body inner HTML to this*/
        var url = baseurl + "backdrop.html";
        request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
					 document.getElementsByTagName("body")[0].innerHTML = request.responseText;
					curObj.tidyUp();

                                }
                        }
        };
        //now send.  we'll be waiting...
        request.send(null);
}


function oblWindow(args) {
	var curObj = this;
        var body = document.getElementById('body');
        var tintDiv = document.createElement('div');
	this.clear = function() {
		body.removeChild(tintDiv);
	};

	var backing = oblC("d");
	/*the window title bar*/
	var titleBar = oblC("d");
	titleBar.className = "w_2013_titlebar";
	if( args.title ) {
		var e = document.createTextNode(args.title);
		titleBar.appendChild(e);
		
	}
		
	backing.appendChild(titleBar);
	
	var d1 = oblC("d");
	d1.className = "w_2013_titlebar_divider1";
	backing.appendChild(d1);	

	var closePic = oblC("i",imagesPath + "just_x.png");	
	closePic.className = "w_2013_close_x";
	
	var closeLink = oblC("a");
	closeLink.appendChild(closePic);
	addListener("click",closeLink,curObj.clear);
	backing.appendChild(closeLink);

	/*horizontal divider*/
	var hd = oblC("d");
	hd.className = "w_2013_titlebar_divider2";
	backing.appendChild(hd);
	
	var contentDiv = oblC("d");
	contentDiv.className = "w_2013_content_div";
	backing.appendChild(contentDiv);
	if( args.content ) contentDiv.appendChild( args.content );


	

	this.getBacking = function() {
		return backing;
	};
        tintDiv.id = "TintDiv";
        tintDiv.align = "center";
        if( navigator.appName == 'Microsoft Internet Explorer') {
                tintDiv.className = 'tintDivIE';
                startDiv.className = 'startDivIE';
        }else{
                tintDiv.className = 'tintDiv';
                tintDiv.style.background = 'rgba(5, 5, 5, 0.5)';
                //tintDiv.style.background = 'rgba(1, 1, 1, 0.839844)';

        }

	if(args.setclass){
		backing.className = args.setclass;
	}else{
		contentDiv.className = "default_focusdiv";
	}
        backing.style.filter = "alpha(opacity=99)";

        backing.align = 'left';
        backing.style.bottom = '';
	this.attach = function() {
	        if( navigator.appName == 'Microsoft Internet Explorer') {

	                var otherDiv = document.createElement('div');
        	        otherDiv.align = "center";
	                otherDiv.id = "OtherDiv";
	                otherDiv.appendChild(startDiv);
	                otherDiv.style.position = "absolute";
	                otherDiv.style.top = "0px";
	                otherDiv.style.zIndex = '1010';
	                otherDiv.style.width = "100%";
	                body.appendChild(tintDiv);
	                body.appendChild(otherDiv);
	        }else{
	                tintDiv.appendChild(backing);
	                body.appendChild(tintDiv);
	        }
	};
	this.attach();
}
//this script sets up some stuff so that the browser request that the prfiel be rendered


//define and variables that will be used thorughout
var anonUrl = "http://preveoh.com/a/";
var signOutUrl = "http://preveoh.com/";
var baseUrl = "http://preveoh.com/";


//this variable here is a global var used to designate if the profile was last called.
//it is helpful for nav functions.  if globalInProfile is true, then nav functions will call their display 
//variables in order to structure a feed and call profileusernav and ads.  If, however, globalInProfile is false, that
//indicates that the user out of the profile - so call functions can be used to save resources and time (not i
//re-call profile user nav or ads, etc)

var globalInProfile = false;


//this is a lis of ZMLHttpRequet cerate factory fuincitnos totry 
var _factories = [
        function() { return new XMLHttpRequest(); },
        function() { return new ActiveXObject("Microsoft.XMLHTTP"); },
        function() { return new ActiveXObject("MSXML2.XMLHTTP.3.0"); },
        function() { return new ActiveXObject("MSXML2.XMLHTTP"); }
];
        //when we find a factory that works, sotre it here
var _factory = null;

        //Create and return a new XMLHttpRequest object.
        //      //The rifs timte we'r ecalled , try the list of faotry finctions until
        //we find one that returnms a non null value and does not throw an 
        //exception.  once we find a workign facory, remember it for later use.

var newRequest = function() {
     if( _factory != null) return _factory();

      for(var i=0; i < _factories.length; i++ ) {
              try {
                      var factory = _factories[i];
                      var request = factory();
                      if( request != null ) {
                              _factory = factory;
                              return request;
                      }
              }
              catch(e) {
                      continue;
              }
      }

        //if we get here, none of the factory candidates succe3eded, 
        //so throw and exception now and for all future calls.
	_factory = function() {
	      throw new Error("XMLHTTPRequest not supported");
	}
	_factory();  //throw an error
};



standardPost = function(url, values, callback, errorHandler) {
	var request =  newRequest();



	request.onreadystatechange = function() {
		if( request.readyState == 4) {
			if( request.status == 200) {
				callback(request);
			}
			else {
				if (errorHandler) errorHandeler(request.status,
							request.statusText);
				else alert('Callback is being triggered:  No error handler');//else callback(null);
			}
		}
	};
	request.open("POST", url);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	

 	request.send(encodeFormData(values));
};




var triumphPicTid;
var triumphPicCount;
var commentCallback;

function callTriumphPic(tid,count) {

	commentCallback = function() { callTriumphPic(tid,count); };

        var url = anonUrl + 'picture?tid=' + tid + ';count=' + count;
        var request = newRequest();
        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);

	triumphPicTid = tid;
	triumphPicCount = count;
	
}

function callShout(id) {

        commentCallback = function(){  callShout(id); };

        var url = anonUrl + 'shout?id=' + id;
        var request = newRequest();
        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}


function callNote(id) {

	commentCallback = function(){  callNote(id); };


        var url = anonUrl + 'note?id=' + id;
        var request = newRequest();
        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}

function callLink(id) {

	commentCallback = function() { callLink(id); };


        var url = anonUrl + 'link?id=' + id;
        var request = newRequest();
        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}

function callForum(id) {


        var url = anonUrl + 'forum?id=' + id;
        var request = newRequest();
        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}

function callReply(rid) {

        var url = anonUrl + 'reply?rid=' + rid;
        var request = newRequest();
        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}



encodeFormData = function(data) {
	
	var pairs = [];
	var regexp = /%20/g; //a regexp to match an ecoded space

	for(var name in data) {
		var value = data[name].toString();
		//there are two ways of doing this.  can replace %20 with + or we cna leave %20.
		//var pair = encodeURIComponent(name).replace(regexp,"+") + '=' +
		//	encodeURIComponent(value).replace(regexp,"+");

		var pair = encodeURIComponent(name) + '=' + encodeURIComponent(value);
		pairs.push(pair);
	}

	//concatenate all the name/value pairs, separating them with &
	var joined = pairs.join('&');
	return joined;
};

function callPromptTriumph(jid) {
	var request = newRequest();

        var url = anonUrl + "prompt_triumph?jid=" + jid;

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
				callAddTriumphPics(jid);
	

                        }
                }
        };

        //now send.  we'll be waiting...
        request.send(null);



}


function displayOurBucketlist() {
	 if ( document.getElementById('trayDiv') ) {
                document.body.removeChild(document.getElementById('trayDiv'));
        }




        var request = newRequest();

        var url = anonUrl + "structure_feed";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                               var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;

                                //called here b/c rendering home lays out a strucure where these then fit in
				callOurBucketlist();
                                callUserNav();
                                callAds();
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}

function addJourneyKeys(e) {
	if(e.keyCode == 13 ) 
		addNewItow();
	
}


function coopt(eid) {


	//confirm that the user really wants to do a co-opt.
	var sendCoopt = function() {

		confirmDialog.cancel();
			
		var cancel = function() { alertDialog.cancel(); };

		var cooptButtons = ([
	         {text:"Ok",handler: cancel, isDefault: true},
	        ]);
	        alertDialog.cfg.queueProperty("buttons",cooptButtons);
		alertDialog.cfg.queueProperty("y",window.pageYOffset+200);


		var request = newRequest();
	
	        var url = anonUrl + "coopt?eid=" + eid;
	
	        request.open("GET",url,true);
	
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
					var d = document.getElementById('alert_inner');
			                d.innerHTML = request.responseText;
					alertDialog.cfg.queueProperty("y",window.pageYOffset+200);
			                alertDialog.render();
			                alertDialog.show();
	                        }
	
	                }
	        };
	
	        //now send.  we'll be waiting...
	        request.send(null);
	};

	var inner = document.getElementById("confirm_inner");
        inner.innerHTML = "Are you sure you want co-opt this user for this journey?";
        var cancel = function() { confirmDialog.cancel(); };
        var sendCooptButtons = ([
         {text:"Yes",handler: sendCoopt, isDefault: true},
         {text:"No", handler: cancel, isDefault: false}
        ]);
        confirmDialog.cfg.queueProperty("buttons",sendCooptButtons);
        confirmDialog.cfg.queueProperty("y",window.pageYOffset+200);

	confirmDialog.render();
	confirmDialog.show();


}



function searchKeys(e) {
	if(e.keyCode == 13 )
		displaySearch();
}	

var commentKeys = function(e,divId) {
	if(e.keyCode == 13 )
		submitComment(divId);


	
};

var callAlerts = function() {


	 var request = newRequest();
        var url = anonUrl + "render_alert_list";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
				var img = document.getElementById('TheBlockIsHot');
				img.style.visibility = 'hidden';

                            var e = document.getElementById('alert_inner');
				e.innerHTML = request.responseText;
				alertDialog.render();
				alertDialog.show();
			
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);




};


var checkAlerts = function() {


	var request = newRequest();
        var url = anonUrl + "check_alerts";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {

                                if(request.responseText == "1") {
					var e = document.getElementById('TheBlockIsHot');
					e.style.visibility = 'visible';
				}	
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);
};
	



function callSearch() {
        var searchUrl = anonUrl + 'search';

	var e = document.getElementById('SearchDiv');
        var values = {};
            for( var i=0; i < e.childNodes.length; i++ ) {
                    if( e.childNodes[i].type ) {
                            values[e.childNodes[i].name] = e.childNodes[i].value;
                    }
            }

	var searchCallback = function(request) {
		var d = document.getElementById("feed");
		d.innerHTML = request.responseText;
	};
        standardPost(searchUrl,values,searchCallback);
}

function displaySearch() {

        //create a new request object

        var request = newRequest();

        var url = anonUrl + "structure_feed";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;
				callSearch();
                                callUserNav();
                                callAds();
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}


function addNewItow() {

	var sendItow = function(category) {
		var request = newRequest();
       	 	var sendUrl = anonUrl + 'add_itow';
	        var e = document.getElementById('AddJourneyDiv');
	
	        var values = {};
	            for( var i=0; i < e.childNodes.length; i++ ) {
	                    if( e.childNodes[i].type ) {
	                            values[e.childNodes[i].name] = e.childNodes[i].value;
	                    }
	            }

		//in this case, add a key/value pair to indicate the category.
		values['category'] = category;
	
	
		var replyCallback = function(request) {		
			var d = document.getElementById('alert_inner');
	                d.innerHTML = request.responseText;
	                alertDialog.render();
	                alertDialog.show();
			callBucketlist();
		};
	
        	standardPost(sendUrl,values,replyCallback);
	};
	
	var sendSoon = function() {
                sendItow('soo');
		 var i = document.getElementById('itow');
                i.value = '';
                this.cancel();
        };

        var sendSomeday = function() {
                sendItow('som');
                this.cancel();
		var i = document.getElementById('itow');
                i.value = '';

        };

        var sendMaybe = function() {
                sendItow('may');
                this.cancel();
		var i = document.getElementById('itow');
                i.value = '';
        };
	/*
        var sendPrivate = function() {
                sendItow('pri');
                this.cancel();
		var i = document.getElementById('itow');
		i.value = '';
        };
	*/


        //first throw up a window and ask them what category this should be in.
        var categoryButtons = ([
         {text:"Soon",handler: sendSoon, isDefault: false},
         {text:"Someday", handler: sendSomeday, isDefault: false},
         {text:"Maybe",handler: sendMaybe, isDefault: false}
        // {text:"~Private~",handler: sendPrivate, isDefault: false}
        ]);
        var d = document.getElementById('confirm_inner');
        d.innerHTML = "Is this something you are commited to doing soon?<br>Something you want to do someday?<br>Or just an idea you are exploring?";
        confirmDialog.cfg.queueProperty("buttons",categoryButtons);
        confirmDialog.cfg.queueProperty("y",window.pageYOffset+200);
        confirmDialog.render();
	//confirmDialog.blurButtons();
        confirmDialog.show();


}

  
function addExistingJourney(eid) {   //"embark id"

	var sendAddExisting = function(category) {

        	var request = newRequest();
	        var sendUrl = anonUrl + 'add_journey?eid=' + eid + '&category=' + category;

	        request.open("GET",sendUrl,true);


	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
	                                var d = document.getElementById('alert_inner');
	                                d.innerHTML = request.responseText;
					alertDialog.cfg.queueProperty("y",window.pageYOffset+200);
	                                alertDialog.render();
	                                alertDialog.show();
	                        }
	                }
	        };
	       //now send.  we'll be waiting...
	        request.send(null);
	};

	var sendSoon = function() {
		sendAddExisting('soo');
		this.cancel();
	};
	
	var sendSomeday = function() {
		sendAddExisting('som');
		this.cancel();
	};

	var sendMaybe = function() {
		sendAddExisting('may');
		this.cancel();
	};

	
	/*
	var sendPrivate = function() {
		sendAddExisting('pri');
		this.cancel();
	};
	*/


	//first throw up a window and ask them what category this should be in.
	var categoryButtons = ([
         {text:"Soon",handler: sendSoon, isDefault: false},
         {text:"Someday", handler: sendSomeday, isDefault: false},
         {text:"Maybe",handler: sendMaybe, isDefault: false}
	 //{text:"~Private~",handler: sendPrivate, isDefault: false}
        ]);
	var d = document.getElementById('confirm_inner');
	d.innerHTML = "Is this something you are commited to doing soon?<br>Something you want to do someday?<br>Or just an idea you are exploring?";
	confirmDialog.cfg.queueProperty("buttons",categoryButtons);
        confirmDialog.cfg.queueProperty("y",window.pageYOffset+200);
	confirmDialog.render();
	confirmDialog.show();

}
 

function callOurBucketlist() {

	//this may well take some arguemtns int eh future
        var request = newRequest();

        var url = anonUrl + "our_bucketlist";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;

                        }
                }
        };

        //now send.  we'll be waiting...
        request.send(null);



}



function callSignOut() {

	var request = newRequest();
	var soUrl = anonUrl + 'sign_out';
	request.open("GET",url,true);
        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
				document.location=signOutUrl;
                        }
                }
        };
        //now send.  we'll be waiting...
        request.send(null);
}

function callPicture(pid) {  //note:  in all instances where a picture is called - feed is already structured.

	commentCallback = function(){ callPicture(pid); };

        var request = newRequest();
        var url = anonUrl + 'picture?pid=' + pid;
        request.open("GET",url,true);
        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
                        }
                }
        };
        //now send.  we'll be waiting...
        request.send(null);
}




function callMyQuestions() {
        var request = newRequest();
        var url = anonUrl + 'render_my_questions';
        request.open("GET",url,true);
        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");

                                d.innerHTML = request.responseText;
				/*old stuff below:
				questionsDialog.render();
				questionsDialog.show();
				*/
                        }
                }
        };
        //now send.  we'll be waiting...
        request.send(null);
}

function getUsername(uid,divId) {
	 var request = newRequest();
               var url;
                if( uid ) {
                        url = anonUrl + "get_username?uid=" + uid;
                }else{
                        url = anonUrl + "get_username";
                }
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        var d = document.getElementById(divId);
					d.innerHTML = "<h2>" + request.responseText + "'s Bucketlist:</h2>";
                                }

                                        //extract this response and insert it to the div (main_conten).
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);
}

function getEmbarkedCount(uid,category) {
         var request = newRequest();
               var url;
	
		var theCount;
                if( uid ) {
                        url = anonUrl + "get_embarked_count?category=" + category + ";uid=" + uid;
                }else{
                        url = anonUrl + "get_embarked_count?category=" + category;
                }
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
					theCount = request.responseText;//WHAT CAN BE DONE HERE TO GET THIS INTO MEMORY?  ETC.
                                }

                                        //extract this response and insert it to the div (main_conten).
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);


		
}


function callBucketlist(uid) {

	var soo;
	var may;
	var som;


	function callBListTab(cat) {

        	var request = newRequest();
	        var url;
	        if( uid ) {
	                url = anonUrl + "render_bucketlist?uid=" + uid + ";category=" + cat;
	        }else{
	                url = anonUrl + "render_bucketlist?dir=my;category=" + cat;
	        }
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
					var e = document.getElementById(cat); //change this to the car cat
					e.innerHTML = request.responseText;
	                        }
	
	                }
	        };
	        //now send.  we'll be waiting...
	        request.send(null);
	}

	var space = document.getElementById("bucketlist");

	var blistTitleDiv = document.getElementById("BlistTitleDiv");	
	
	if( !(blistTitleDiv) ) {
		blistTitleDiv = document.createElement('div');
	        blistTitleDiv.id = "BlistTitleDiv";
	        blistTitleDiv.innerHTML = "<h2>My Bucketlist:</h2>";
        	space.appendChild(blistTitleDiv);
	}

	
		
	

	
	if(uid) 
		getUsername(uid,"BlistTitleDiv");

	
	var tabsExist = document.getElementById("soo");
	if( !(tabsExist) ) {
		//make a tabview with three tabs
		var tabs = new YAHOO.widget.TabView('bucketlist',{activeIndex: 0} );

		tabs.addTab( new YAHOO.widget.Tab({
			label: 'Maybe',
			content: '<div id="may"></div>',
			active: true
		}));
		
	
		
		
		tabs.addTab( new YAHOO.widget.Tab({
			label: 'Someday',
			content: '<div id="som"></div>',
			active: false 
		}));
	
		tabs.addTab( new YAHOO.widget.Tab({
			label: 'Soon!',
			content: '<div id="soo"></div>',
			active: false 
		}));

	
	}
	
	
	callBListTab("soo");
	callBListTab("som");
	callBListTab("may");
	

}


//function to request that bucketlist be rendered.
function _callBucketlist(uid) {
        //render the profile page.
        var request = newRequest();
	var url;
	if( uid ) {
		url = anonUrl + "render_bucketlist?uid=" + uid;
	}else{
        	url = anonUrl + "render_bucketlist?dir=my";
	}
        request.open("GET",url,true);
        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("bucketlist");
                                d.innerHTML = request.responseText;
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };
        //now send.  we'll be waiting...
        request.send(null);
}

function callEmbarkedPanel(jid) {

        var request = newRequest();

        var url = anonUrl + "render_embarked_panel?jid=" + jid;

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("ad_content");
                                d.innerHTML = request.responseText;

                        }
                }
        };
        //now send.  we'll be waiting...
        request.send(null);
}

function dropItem(type,iid) {
	//define the function "sendDropRequest".  this is
	//what will be done if the user clicks 'Yes' in the pop up dialog.
	var sendDropRequest = function() {
		var request = newRequest();
	

	        var url = anonUrl + "drop_" + type + "?iid=" + iid;
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
					confirmDialog.cancel();
					commentCallback();
	
	                        }
	                }
	        };
	        request.send(null);
	};

	var inner = document.getElementById("confirm_inner");
	inner.innerHTML = "Are you sure you want to remove this?";
	var cancel = function() { confirmDialog.cancel(); };
	var deleteCheckButtons = ([
         {text:"Yes",handler: sendDropRequest, isDefault: false},
         {text:"No", handler: cancel, isDefault: true}
	]);
	confirmDialog.cfg.queueProperty("buttons",deleteCheckButtons);
	confirmDialog.cfg.queueProperty("y",window.pageYOffset+200);

	confirmDialog.render();
	confirmDialog.show();

	
}

	

var jFeedInput;
var jFeedJid;

function showDrop(id) {

	var link = document.getElementById(id);	
	var divId = "Div" + id;
	var div = document.getElementById(divId);
	if( link ) {
		var hide = function() {
			link.style.visibility = 'hidden';
		};
	}

	if( !div.addEventListener ) {
		div.attachEvent("onmouseout",hide);
	}else{
		div.addEventListener("mouseout",hide, false);
	}
	link.style.visibility = 'visible';

}

var highlightAlert = function(e) {
	
	var a = e.currentTarget;
	a.style.className = "alert_hover";


/*

        if( !a.addEventListener ) {
                a.attachEvent("onmouseout",function(){a.style.className="alert";});
        }else{
                a.addEventListener("mouseout",function(){a.style.className="alert";}, false);
        }
*/



};

var underlineElement = function(event) {


	var e = event.currentTarget;


	var normalize = function() {
		e.style.textDecoration = 'none';
	};

	 if( !e.addEventListener ) {
                e.attachEvent("onmouseout",normalize);
        }else{
                e.addEventListener("mouseout",normalize, false);
        }


	e.style.textDecoration = "underline";


};

//function to render a newsfeed in the feed div
function callJourneyFeed(jid) {

	
	callEmbarkedPanel(jid);

	commentCallback = function(){ callJourneyFeed(jid); };

	
	jFeedJid = jid;


	//create a div for the content addition widget.
	var feed = document.getElementById('feed');
	feed.innerHTML = '';
	

	//create a div for the title / journey ID
	var feedTitleDiv = document.createElement('div');
	feedTitleDiv.innerHTML = '<h2>Journey Newsfeed:</h2>&nbsp&nbsp&nbsp<span class="jtitle" id="jtitle"></span>';
	feed.appendChild(feedTitleDiv);

	var attachButton = document.createElement('button');
	attachButton.id = 'JFeedAttachButton';
	
	var jFeedWidget = document.createElement('div');
	jFeedInput = document.createElement('input');
	jFeedInput.style.width = '400px';
	jFeedInput.style.position = 'relative';
	jFeedInput.style.left = '150px';
	jFeedInput.style.top = '10px';
	jFeedInput.id = 'JFeedInput';
	jFeedInput.value = 'Add to feed here. Paste a link, post a comment or question...';

	var jFocus  = function() {
		var j = document.getElementById("JFeedInput");
                j.value = "";

	};

	/*
	var jBlur = function() {
		var j = document.getElementById("JFeedInput");
		j.value = "Add to feed here. Paste a link, post a comment or question...";
	};
	*/


	if( !jFeedInput.addEventListener ) {
		jFeedInput.attachEvent("onkeydown",jFeedKeys);
		jFeedInput.attachEvent("onfocus",jFocus);
		//jFeedInput.attachEvent("onblur",jBlur);
	}else{
		jFeedInput.addEventListener("keydown",jFeedKeys,false);
		jFeedInput.addEventListener("focus",jFocus,false);
		//jFeedInput.addEventListener("blur",jBlur,false);
	}
	

	var buttonContainingDiv = document.createElement('div');
	buttonContainingDiv.style.position = "relative";
	buttonContainingDiv.style.left = '487px';
	buttonContainingDiv.style.top = '10px';
	
	buttonContainingDiv.appendChild(attachButton);
	

	jFeedWidget.appendChild(jFeedInput);
	jFeedWidget.appendChild(buttonContainingDiv);

	feed.appendChild(jFeedWidget);
	jFeed = document.createElement('div');
	jFeed.id = 'jfeed';
	feed.appendChild(jFeed);

	var postButton = new YAHOO.widget.Button("JFeedAttachButton");	
	postButton.set('label','Attach');
	postButton.on('click',submitJFeedPost);




	var itowRequest = newRequest();
        var url = anonUrl + "get_familiar_itow?jid=" + jid;
        itowRequest.open("GET",url,true);
        itowRequest.onreadystatechange = function() {
                if( itowRequest.readyState == 4 ) {
                        if( itowRequest.status == 200 ) {

                                var d = document.getElementById("jtitle");
                                d.innerHTML = 'I want to ' + itowRequest.responseText;
                        }
                }
        };
        //now send.  we'll be waiting...
        itowRequest.send(null);

	



	//create the jfeed div so we can stuff what we get from the server into this
	
	var request = newRequest();

        var url = anonUrl + "render_journey_feed?jid=" + jid;

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("jfeed");
                                d.innerHTML = request.responseText;
                        }

                               
                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}

var jFeedKeys = function(e) {
        if( e.keyCode == 13)
                submitJFeedPost();
}

var submitJFeedPost = function() {

	var request = newRequest();


	var addUrl;
        var values = {};


	var question = /\?$/;
	var link = /\.[a-zA-Z]{2}/;
	var input = document.getElementById("JFeedInput");

	if( input.value == '' )
		return;

	if( input.value.search(link) != -1 ) {
                addUrl = anonUrl + "add_link";
		var link = input.value;
		if( link.search(/^http/) == -1 ) { //if we dont find http at the beginning...
			link = 'http://' + link;  //add it.
		}
	
		values['link'] = link;
		
	}else {
		if( input.value.search(question) != -1) {
			//alert("we found a question");
			addUrl = anonUrl + "add_question";
        		values['question'] = input.value;
		}else{
			//consider it a shout.   its a shout :)
			addUrl = anonUrl + "add_shout";
        		values['shout'] = input.value;
		}
	}

	
	values['jid'] = jFeedJid;

	var replyCallBack = function() {
		document.getElementById('JFeedInput').value = '';
		var request = newRequest();
	        var url = anonUrl + "render_journey_feed?jid=" + jFeedJid;
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
	                                var d = document.getElementById("jfeed");
	                                d.innerHTML = request.responseText;
	                        }
	                }
	        };
	        //now send.  we'll be waiting...
	        request.send(null);
	
	};

	standardPost(addUrl,values,replyCallBack);

};





//function to request that bucketlist be rendered.
function callProfileUserNav(uid) {

        //render the profile user navigation section

        var request = newRequest();
	if( uid ) {
		url = anonUrl + "render_profile_nav?uid=" + uid;
	}else{
        	url = anonUrl + "render_profile_nav?dir=my";
	}

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("user_nav");
                                d.innerHTML = request.responseText;
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}


function callMessaging(uid) {

	var url = anonUrl + 'messaging?uid=' + uid;
	var request = newRequest();
	request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}




function displayForum(qid) {

	


        //create a new request object

        var request = newRequest();

        var url = anonUrl + "structure_feed";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;

                                //called here b/c rendering home lays out a strucure where these then fit in
				callForum(qid);
				questionsDialog.cancel();
                                callUserNav();
                                callAds();
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}




function displayMessage(mid) {


	var promptUrl = anonUrl + 'message?mid=' + mid;

	var messageSubmit = function() {
		var request = newRequest();
		var addUrl = anonUrl + 'send_message';

		var formId = 'MessageForm';

                var e = document.getElementById(formId);

                var values = {};
		for( var i=0; i < document.forms[formId].elements.length; i++ ) {
                        values[document.forms[formId].elements[i].name] = document.forms[formId].elements[i].value;
                }

	standardPost(addUrl,values);
                this.cancel();
	};


	var messageButtons = ( [ { text:"Reply",
	        handler:messageSubmit, isDefault:true } ]);

        messageDialog.cfg.queueProperty("buttons", messageButtons);

        var request = newRequest();

        var title = "Message:";
        messageDialog.setHeader(title);

        request.open("GET",promptUrl,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("message_inner");
                                d.innerHTML = request.responseText;
                                messageDialog.render();
                                messageDialog.show();
                        }
		}
	};
	request.send(null);
}

function displaySendMessage(uid) {

	var messageSubmit = function() {
                var request = newRequest();
                var sendUrl = anonUrl + 'send_message';
                var values = {};
		var formId = 'MessageForm';
		var e = document.getElementById(formId);
		for( var i=0; i < document.forms[formId].elements.length; i++ ) {
                        values[document.forms[formId].elements[i].name] = document.forms[formId].elements[i].value;
                }

	
                standardPost(sendUrl,values);
                this.cancel();
        };

	var promptUrl = anonUrl + 'prompt_message?uid=' + uid;
        var messageButtons = ( [ { text:"Send",
                handler:messageSubmit, isDefault:true } ]);
        
        messageDialog.cfg.queueProperty("buttons", messageButtons);

        var request = newRequest();
                        
        var title = "Send Message";
        messageDialog.setHeader(title);

        request.open("GET",promptUrl,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("message_inner");
                                d.innerHTML = request.responseText;
                                messageDialog.render();
                                messageDialog.show();
                        }
                }
        };
        request.send(null);
}

var forumKeys = function(e,id) {
	if( e.keyCode == 13)
		forumSubmitReply(id);
}



function forumSubmitReply(id) {

	var fid = id;
	var request = newRequest();
                var sendUrl = anonUrl + 'add_forum_post';


                var formId = 'ForumForm';
                var values = {};
                for( var i=0; i < document.forms[formId].elements.length; i++ ) {
                        values[document.forms[formId].elements[i].name] = document.forms[formId].elements[i].value;
                }
		var replyCallback = function() { callForum(fid); };
                standardPost(sendUrl,values,replyCallback);
}

function callAddTriumphPics(jid) {

	 var request = newRequest();

        var url = anonUrl + "prompt_triumph_pics?jid=" + jid;

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                               var d = document.getElementById("t_pic_zone");
                                d.innerHTML = request.responseText;

                                //called here b/c rendering home lays out a strucure where these then fit in
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);


}

function callDropJourney(jid) {


        var request = newRequest();
        var url = anonUrl + "drop_journey?jid=" + jid;
        request.open("GET",url);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                callBucketlist();
                        }
                }
        };
        request.send(null);




}


	

function displayPromptTriumph(jid) {



        var request = newRequest();

        var url = anonUrl + "structure_feed";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                               var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;

                                //called here b/c rendering home lays out a strucure where these then fit in
				callPromptTriumph(jid);
                                callUserNav();
                                callAds();
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}

var insertTPicTray = function(tid) {

	if ( document.getElementById('trayDiv') ) {
                document.body.removeChild(document.getElementById('trayDiv'));
        }




	var body = document.getElementById('body');
	var trayDiv = document.createElement('div');	



	trayDiv.style.position = 'fixed';
	trayDiv.id = "trayDiv";
	trayDiv.style.width = '100%';
	trayDiv.style.height = '122';
	trayDiv.style.zIndex = '5';
	trayDiv.style.bottom = '0px';
	if( navigator.appName == 'Microsoft Internet Explorer') {
		trayDiv.style.background = 'gray';
	}else{
		trayDiv.style.background = 'rgba(85, 85, 10, 0.839844)';
	}

	body.appendChild(trayDiv);
	var request = newRequest();
        var url = anonUrl + "triumph_tray?tid=" + tid;

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                trayDiv.innerHTML = request.responseText;

                        }
                }
        };

        //now send.  we'll be waiting...
        request.send(null);

};

function submitTriumph(jid,bestpart) {
		/*
		for this function, we cannot just loop through the elements in the TriumphForm and then send as
		as a hash to standardPost.  there will be undefined elements in that hash which break
		code (encodeFormValues).  so we grab only what we need - the jid and the 'bestpart' html.
		*/
                var sendUrl = anonUrl + 'add_triumph';


                var values = {};
		values['jid'] = jid;
		values['bestpart'] = bestpart;

		var callBack = function() { callProfile(); };
		 standardPost(sendUrl,values,callBack);
}




function submitNote() {
		var request = newRequest();
                var sendUrl = anonUrl + 'add_note';
                var e = document.getElementById('NoteDiv');
                var values = {};
                for( var i=0; i < e.childNodes.length; i++ ) {
                        if( e.childNodes[i].value) {
                                values[e.childNodes[i].name] = e.childNodes[i].value;
                        }
                }

		/*for some reason - probably having to do with YUI RTF - the textarea is not a childNode, 
		or does not have a .vale property.  we have to get it maually. */

		values['note'] = document.getElementById('note').value;

		for(var name in values) {
		}

                var replyCallback = function() {
			callProfile();
                };
                standardPost(sendUrl,values,replyCallback);

}



function submitComment(divId) {
		var request = newRequest();
                var sendUrl = anonUrl + 'add_comment';
		var e = document.getElementById(divId);
                var values = {};
                for( var i=0; i < e.childNodes.length; i++ ) {
			if( e.childNodes[i].type ) {
				values[e.childNodes[i].name] = e.childNodes[i].value;
			}
                }


                standardPost(sendUrl,values,commentCallback);//this callback is set from other functions when called.
}

function profileSettingsSubmit(id) {
	var url = anonUrl + 'modify_profile_settings?uid=' + id;
	 var formId = 'SettingsForm';
                var values = {};
                for( var i=0; i < document.forms[formId].elements.length; i++ ) {
                        values[document.forms[formId].elements[i].name] = document.forms[formId].elements[i].value;
                }
                var submitCallback = function() { callProfile(id); };
                standardPost(url,values,submitCallback);
}

function dropQuestion(id) {
	var url = anonUrl + 'drop_question?qid=' + id;
	var request = newRequest();
	request.open("GET",url);
	request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
				callMyQuestions();
				
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}

	

	


function callPictureComment(newPid) {


        var request = newRequest();

        var url = anonUrl + "prompt_add_picture_comment?pid=" + newPid;

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
				
                        }
                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}



function promptProfilePic() {
	 var promptUrl = anonUrl + "prompt_profile_pic";

	 var request = newRequest();


        request.open("GET",promptUrl,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("profilePicInner");
                                d.innerHTML = request.responseText;
				profilePicDialog.render();
				profilePicDialog.show();
			

                        }
                }
        };

        //now send.  we'll be waiting...
        request.send(null);

	var changePicSubmit = function() {


                        document.forms['ProfilePicForm'].submit();
                        this.cancel();
        };

        var profilePicButtons = ( [ { text:"Change",
        handler:changePicSubmit, isDefault:true } ]);

           profilePicDialog.cfg.queueProperty("buttons", profilePicButtons);

}



function displayAttach(directive,uid,jid) {

	var promptUrl;
	var addUrl;

	attachDialog.cfg.queueProperty("y",window.pageYOffset+200);

	switch( directive ) {
                case 'Link':
                        promptUrl = anonUrl + "prompt_link?uid=" + uid + ";jid=" + jid;
			addUrl = anonUrl + "add_link";
                        break;
                case 'Picture':
                        promptUrl = anonUrl + "prompt_picture?uid=" + uid + ";jid=" + jid;
			addUrl = anonUrl + "add_picture";
                        break;
                case 'Note':
                        promptUrl = anonUrl + "prompt_note?uid=" + uid + ";jid=" + jid;
			addUrl = anonUrl + "add_note";
                        break;
                case 'Question':
                        promptUrl = anonUrl + "prompt_question?uid=" + uid + ";jid=" + jid;
			addUrl = anonUrl + "add_question";
                        break;
                default:
                        break;
        }

	var attachSubmit = function() { 

		var formId = directive + 'Form';
		var values = {}; 
		for( var i=0; i < document.forms[formId].elements.length; i++ ) {
			values[document.forms[formId].elements[i].name] = document.forms[formId].elements[i].value;
		}
		if(directive == 'Picture') {
			document.forms['PictureForm'].submit();
			this.cancel();
		}else{
			standardPost(addUrl,values);
			this.cancel();	
		}
	};

	var attachButtons = ( [ { text:"Attach",
        handler:attachSubmit, isDefault:true } ]);


	attachDialog.cfg.queueProperty("buttons", attachButtons);


 	var request = newRequest();

	var title = "Attach " + directive + ":";
	attachDialog.setHeader(title);
	
        request.open("GET",promptUrl,true);

	if( directive == 'Note' ) {

		//specify what happens when request is to happen when Note request is sent.
		request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        var d = document.getElementById("feed"); //for Note we render feed.
                                        d.innerHTML = request.responseText;
					//rendering in feed hence there will be no showing of dialog.
				}
			}
		};


		var structUrl = anonUrl + 'structure_feed';	
		var structRequest = newRequest();
		structRequest.open("GET",structUrl,true);
		structRequest.onreadystatechange = function() {
                        if( structRequest.readyState == 4 ) {
                                if( structRequest.status == 200 ) {
                                        var d = document.getElementById("main_content");
                                        d.innerHTML = structRequest.responseText;
					callUserNav();
					callAds();
					request.send(null);
                                }

                        }
                };
		structRequest.send(null);
	}else{
		//if its not a Note, we simply define our handdling of a succesful reply...
        	request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
	                                var d = document.getElementById("attach_inner");
	                                d.innerHTML = request.responseText;
					attachDialog.render();
					attachDialog.show();
	                        }
	
	                }
	        };
		//and send the request...
		request.send(null);
	}
}

var checkMention = function(e) {
	
	alert(this.value);



};

function callUserNav() {

        //render the profile user navigation section

        var request = newRequest();

        var url = anonUrl + "render_user_nav?dir=my";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("user_nav");
                                d.innerHTML = request.responseText;
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}

function callHelp(section) {

	


        var request = newRequest();
        var url = baseUrl + section + "_help.html";


        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("ad_content");
                                d.innerHTML = request.responseText;
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}



//function to request that bucketlist be rendered.
function callAds() {

	
        var request = newRequest();
	 var url = anonUrl + "render_ads";


        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("ad_content");
                                d.innerHTML = request.responseText;
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}

var navJourneyFeed = function(id) {
	var state = "jfeed" + '&' + id;
	YAHOO.util.History.navigate('nav',state);
};



var navProfile= function(id) {
        var state = "profile" + '&' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navQuestions = function() {
        var state = "questions";
        YAHOO.util.History.navigate('nav',state);
};

var navPicture= function(id) {
        var state = "picture" + '&' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navShout = function(id) {
        var state = "shout" + '&' + id;
        YAHOO.util.History.navigate('nav',state);
};


var navNote= function(id) {
        var state = "note" + '&' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navLink= function(id) {
        var state = "link" + '&' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navQuestion= function(id) {
        var state = "question" + '&' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navTriumph = function(id) {
        var state = "triumph" + '&' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navMessaging = function(id) {
        var state = "mail";
        YAHOO.util.History.navigate('nav',state);
};


var navTriumphPic = function(id,count) {
	var state = "tri_pic" + '&' + id + '&' + count;
	YAHOO.util.History.navigate('nav',state);
};

var navForum = function(id) {
	var state = "forum" + '&' + id;
	YAHOO.util.History.navigate('nav',state);
};

var navReply = function(id) {
        var state = "reply" + '&' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navTriumphs = function(id) {
        var state = "triumphs" + '&' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navProfileSettings = function(id) {
        var state = "settings";
        YAHOO.util.History.navigate('nav',state);
};






//this handler should call teh various functions depending on the hash for the nav bar ...
var navStateHandler = function(state) {

	//from the state string, split out the section and iid.	
	var components = [];

	components = state.split('&');

	var section = components[0];
	var iid = components[1];
	var count = components[2]; //if we're caling a tri pic...
	
	switch( section ) {
		case "home":
			displayHome();
			break;
		case "profile":
			callProfile(iid); 
			break;
		case "ourbucketlist":
			displayOurBucketlist();
			break;
		case "jfeed":
			if( globalInProfile ) {
				displayJourneyFeed(iid);
			}else{
				callJourneyFeed(iid);
			}
			break;
		case "questions":
			callMyQuestions();
			break;
                case "settings":
                        callProfileSettings();
                        break;
                case "picture":
                        callPicture(iid);
                        break;
                case "note":
                        callNote(iid);
                        break;
                case "link":
                        callLink(iid);
                        break;
                case "question":
                        callForum(iid);
                        break;
                case "triumph":
			if( globalInProfile ) {  //if the user is in a profile page, then use display variant
				displayTriumph(iid);
			}else{
                        	callTriumph(iid);  //if not we can use call variant
			}
                        break;
		case "triumphs":
			displayTriumphs(iid);
			break;
		case "shout":
			callShout(iid);
			break;
                case "tri_pic":
                        callTriumphPic(iid,count);
                        break;
                case "forum":
			if( globalInProfile ) {
				displayForum(iid);
			}else{
                        	callForum(iid);
			}
                        break;
		case "reply":
			callReply(iid);
			break;
		case "mail":
			displayMessaging();
			break;

	}

};
		
function runOnLoad() {

	
	/*WE STOP ALL THE YUI HISTORY STUFF FOR NOW.
	var bookmarkedState = YAHOO.util.History.getBookmarkedState("nav");
	//var querySection = YAHOO.util.History.getQueryStringParameter("section");
	var initialState = bookmarkedState || "home";
	YAHOO.util.History.register("nav", initialState, function(section) {
		
		navStateHandler(section)
	});

	YAHOO.util.History.onReady(function () { 
		//we dont do anything here.
	}); 

	YAHOO.util.History.initialize("yui-history-field", "yui-history-iframe");
	*/
	 var request = newRequest();
         var url = anonUrl + "structure_feed";


        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;
				callProfile(globalUid);
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);



}

function crimpDisplay(e) {

        var nWidth = 80;

        var img;

        if( e.srcElement ) {
                img = e.srcElement;
        }else{
                img = e.currentTarget;
        }



        var cWidth = img.clientWidth;
        var cHeight = img.clientHeight;


        var nHeight = (nWidth * cHeight) / cWidth;

        img.style.width = nWidth + "px";
        img.style.height = nHeight + "px";
        img.style.visibility = "visible";

}

function callProfile(uid) {


	globalInProfile = true;

	 if ( document.getElementById('trayDiv') ) {
                document.body.removeChild(document.getElementById('trayDiv'));
        }

	var request = newRequest();

	var url;

	if( uid ) {

		url = anonUrl + "profile?uid=" + uid;

		
	}else{
		url = anonUrl + "my_profile";

	}
        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;

                                //these are called here because inserting the html for profile lays out a structure where
                                //these will fit in.
                                callBucketlist(uid);
                                callProfileUserNav(uid);
				if( uid ) {
					callHelp("profile");	
				}else{
					callHelp("my_profile");
				}
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}


//call the home news feed
function callHomeFeed() {

	checkAlerts();
	
	commentCallback = function(){ callHomeFeed(); };



        var request = newRequest();

        var url = anonUrl + "render_home?dir=my";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
				callHelp("feed");
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);



}

function displayAddPictureComment(pid) {


	//alert('we are in displayAddPictureComment');
	var url = anonUrl + 'prompt_add_picture_comment?pid=' + pid;

	request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;

			}
		}
	};
	request.send(null);
}

function callProfileSettings() {

	var request = newRequest();
	var url = anonUrl + "prompt_profile_settings";
	request.open("GET",url);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;

                        }
                }
        };
        request.send(null);



	
	

}

function displayJourneyFeed(jid) {

        //create a new request object

        var request = newRequest();

        var url = anonUrl + "structure_feed";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;

                                //called here b/c rendering home lays out a strucure where these then fit in
                                callJourneyFeed(jid);
                                callUserNav();
				questionsDialog.cancel();
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}

function callTriumphs(uid) {

        var url = anonUrl + 'triumphs?uid=' + uid;
        var request = newRequest();
        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}


function displayTriumphs(uid) {
	

        //create a new request object
        var request = newRequest();
        var url = anonUrl + "structure_feed";
        request.open("GET",url,true);
        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;
				callTriumphs(uid);
                                callUserNav();
                                callAds();
                        }

                }
        };
        //now send.  we'll be waiting...
        request.send(null);
}


function callTriumph(tid) {

	commentCallback = function(){ callTriumph(tid); };

        var url = anonUrl + 'triumph?tid=' + tid;
        var request = newRequest();
        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
				insertTPicTray(tid);
                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}


function displayTriumph(tid) {


        //create a new request object

        var request = newRequest();

        var url = anonUrl + "structure_feed";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;
				callTriumph(tid);
                                callUserNav();
                                callAds();
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}



function displayProfileSettings() {
	

        //create a new request object

        var request = newRequest();

        var url = anonUrl + "structure_feed";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;

                                //called here b/c rendering home lays out a strucure where these then fit in
                                callProfileSettings();
                                callUserNav();
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}

	
function displayMessaging(uid) {


	//alert(' we are in displayMessaging with ' + uid);

        //create a new request object

        var request = newRequest();

        var url = anonUrl + "structure_feed";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;

                                //called here b/c structure_feed lays out a strucure where these then fit in
                                callMessaging(uid);
                                callUserNav();
                                callAds();
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);


}




function displayHome() {

	if ( document.getElementById('trayDiv') ) {
		document.body.removeChild(document.getElementById('trayDiv'));
	}
	
	

        //create a new request object

        var request = newRequest();

        var url = anonUrl + "structure_feed";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                               var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;

				//called here b/c rendering home lays out a strucure where these then fit in
                                callHomeFeed();
                                callUserNav();
                                callAds();
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}

function displayPictureComment(newPid) {



        //create a new request object

        var request = newRequest();

        var url = anonUrl + "structure_feed";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                               var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;

                                //called here b/c rendering home lays out a strucure where these then fit in
				callPictureComment(newPid);
                                callUserNav();
                                callAds();
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);


}


function pictureCommentSubmit() {

	var request = newRequest();
	var sendUrl = anonUrl + 'add_picture_comment';


	var formId = 'PictureCommentForm';
	var values = {};
	for( var i=0; i < document.forms[formId].elements.length; i++ ) {
		values[document.forms[formId].elements[i].name] = document.forms[formId].elements[i].value;
	}
	var replyCallback = function() { callProfile(); };
	standardPost(sendUrl,values,replyCallback);


}




//register a window onload event to call to render profile.

if( window.addEventListener ) 
        window.addEventListener("load",runOnLoad, false);
else if (window.attachEvent) window.attachEvent("onload", runOnLoad);
else window.onload = runOnLoad;



function parseCookie() {
	var hash = {};

	var a = document.cookie.split(";");


	for(var i=0;i<a.length;i++) {
		var b = a[i].split("=");
		var key = b[0].replace(/^\s*/, '');
		hash[key] = b[1];
	}

	return hash;
}

 // Update embarkment seasons and corresponding image
 // arg[0] = curObj - ?
 // arg[1] = season - string
 /*
  function propSeason(e, arg) {
    curObj = arg[0];
    curObj.clearSomeday();
    curObj.season = arg[1];
    for (var key in curObj.seasonRadio) {
      if(key != arg[1])
        curObj.seasonRadio[key].set("checked", false);
    }
    curObj.indicateSeason();
  }
*/
// Update embarkment proposition year
// arg[0] = curObj
// arg[1] = year - num
/*
function propSetYear(e, arg) {
  //curObj = arg[0];
  curObj = e;
//  window.alert("test - curObj = " + curObj.label);
  curObj.innerHTML = "Some Test";
  num = arg[1];
}
*/

function removeListener(eventType,thing,_handler) {

		var ieEvent = "on" + eventType;
            if( thing.removeEventListener ) {    // all browsers except IE before version 9
                thing.removeEventListener(eventType,_handler,false);
            }
            else {
                if( thing.detachEvent ) {        // IE before version 9
                    thing.detachEvent(ieEvent,_handler);
                }
            }
}


function setAnonPanel() {
	var e = document.getElementById("ad_content");
	e.innerHTML = "You are random dude";
}

function setConcourse() {
        /*clear out the main_content and set up columns to contain this panel*/
        var e = document.getElementById("main_content");
        e.innerHTML = '';
        var t = new oblTable(1,2);
        t.setCellClass(0,0,"panel_column_left");
        t.getCell(0,0).id = "concourse_left";
        t.getCell(0,1).id = "concourse_right";
        e.appendChild(t.getTable());
}

var _underlineElement = function(e) {
	var thing = (e.currentTarget) ? e.currentTarget : e.srcElement;
	thing.style.textDecoration = "underline";
};

var _normalize = function(e) {
        var thing = (e.currentTarget) ? e.currentTarget : e.srcElement;
        thing.style.textDecoration = "none";
};

function setUnderline(e) {
	
		addListener("mouseover",e,_underlineElement);
		addListener("mouseout",e,_normalize);
}
//alert("this is genius!");
/**
 * SWFObject v1.4.2: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2006 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * **SWFObject is the SWF embed script formerly known as FlashObject. The name was changed for
 *   legal reasons.
 */
if(typeof deconcept == "undefined") var deconcept = new Object();
if(typeof deconcept.util == "undefined") deconcept.util = new Object();
if(typeof deconcept.SWFObjectUtil == "undefined") deconcept.SWFObjectUtil = new Object();
deconcept.SWFObject = function(swf, id, w, h, ver, c, useExpressInstall, quality, xiRedirectUrl, redirectUrl, detectKey){
	if (!document.getElementById) { return; }
	this.DETECT_KEY = detectKey ? detectKey : 'detectflash';
	this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY);
	this.params = new Object();
	this.variables = new Object();
	this.attributes = new Array();
	if(swf) { this.setAttribute('swf', swf); }
	if(id) { this.setAttribute('id', id); }
	if(w) { this.setAttribute('width', w); }
	if(h) { this.setAttribute('height', h); }
	if(ver) { this.setAttribute('version', new deconcept.PlayerVersion(ver.toString().split("."))); }
	this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion();
	if(c) { this.addParam('bgcolor', c); }
	var q = quality ? quality : 'high';
	this.addParam('quality', q);
	this.setAttribute('useExpressInstall', useExpressInstall);
	this.setAttribute('doExpressInstall', false);
	var xir = (xiRedirectUrl) ? xiRedirectUrl : window.location;
	this.setAttribute('xiRedirectUrl', xir);
	this.setAttribute('redirectUrl', '');
	if(redirectUrl) { this.setAttribute('redirectUrl', redirectUrl); }
}
deconcept.SWFObject.prototype = {
	setAttribute: function(name, value){
		this.attributes[name] = value;
	},
	getAttribute: function(name){
		return this.attributes[name];
	},
	addParam: function(name, value){
		this.params[name] = value;
	},
	getParams: function(){
		return this.params;
	},
	addVariable: function(name, value){
		this.variables[name] = value;
	},
	getVariable: function(name){
		return this.variables[name];
	},
	getVariables: function(){
		return this.variables;
	},
	getVariablePairs: function(){
		var variablePairs = new Array();
		var key;
		var variables = this.getVariables();
		for(key in variables){
			variablePairs.push(key +"="+ variables[key]);
		}
		return variablePairs;
	},
	getSWFHTML: function() {
		var swfNode = "";
		if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) { // netscape plugin architecture
			if (this.getAttribute("doExpressInstall")) { this.addVariable("MMplayerType", "PlugIn"); }
			swfNode = '<embed type="application/x-shockwave-flash" src="'+ this.getAttribute('swf') +'" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'"';
			swfNode += ' id="'+ this.getAttribute('id') +'" name="'+ this.getAttribute('id') +'" ';
			var params = this.getParams();
			 for(var key in params){ swfNode += [key] +'="'+ params[key] +'" '; }
			var pairs = this.getVariablePairs().join("&");
			 if (pairs.length > 0){ swfNode += 'flashvars="'+ pairs +'"'; }
			swfNode += '/>';
		} else { // PC IE
			if (this.getAttribute("doExpressInstall")) { this.addVariable("MMplayerType", "ActiveX"); }
			swfNode = '<object id="'+ this.getAttribute('id') +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'">';
			swfNode += '<param name="movie" value="../'+ this.getAttribute('swf') +'" />';
			var params = this.getParams();
			for(var key in params) {
			 swfNode += '<param name="'+ key +'" value="'+ params[key] +'" />';
			}
			var pairs = this.getVariablePairs().join("&");
			if(pairs.length > 0) {swfNode += '<param name="flashvars" value="'+ pairs +'" />';}
			swfNode += "</object>";
		}
		return swfNode;
	},
	write: function(elementId){
		if(this.getAttribute('useExpressInstall')) {
			// check to see if we need to do an express install
			var expressInstallReqVer = new deconcept.PlayerVersion([6,0,65]);
			if (this.installedVer.versionIsValid(expressInstallReqVer) && !this.installedVer.versionIsValid(this.getAttribute('version'))) {
				this.setAttribute('doExpressInstall', true);
				this.addVariable("MMredirectURL", escape(this.getAttribute('xiRedirectUrl')));
				document.title = document.title.slice(0, 47) + " - Flash Player Installation";
				this.addVariable("MMdoctitle", document.title);
			}
		}
		if(this.skipDetect || this.getAttribute('doExpressInstall') || this.installedVer.versionIsValid(this.getAttribute('version'))){
			var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;
			n.innerHTML = this.getSWFHTML();
			return true;
		}else{
			if(this.getAttribute('redirectUrl') != "") {
				document.location.replace(this.getAttribute('redirectUrl'));
			}
		}
		return false;
	}
}

/* ---- detection functions ---- */
deconcept.SWFObjectUtil.getPlayerVersion = function(){
	var PlayerVersion = new deconcept.PlayerVersion([0,0,0]);
	if(navigator.plugins && navigator.mimeTypes.length){
		var x = navigator.plugins["Shockwave Flash"];
		if(x && x.description) {
			PlayerVersion = new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
		}
	}else{
		// do minor version lookup in IE, but avoid fp6 crashing issues
		// see http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
		try{
			var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		}catch(e){
			try {
				var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				PlayerVersion = new deconcept.PlayerVersion([6,0,21]);
				axo.AllowScriptAccess = "always"; // throws if player version < 6.0.47 (thanks to Michael Williams @ Adobe for this code)
			} catch(e) {
				if (PlayerVersion.major == 6) {
					return PlayerVersion;
				}
			}
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			} catch(e) {}
		}
		if (axo != null) {
			PlayerVersion = new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
		}
	}
	return PlayerVersion;
}
deconcept.PlayerVersion = function(arrVersion){
	this.major = arrVersion[0] != null ? parseInt(arrVersion[0]) : 0;
	this.minor = arrVersion[1] != null ? parseInt(arrVersion[1]) : 0;
	this.rev = arrVersion[2] != null ? parseInt(arrVersion[2]) : 0;
}
deconcept.PlayerVersion.prototype.versionIsValid = function(fv){
	if(this.major < fv.major) return false;
	if(this.major > fv.major) return true;
	if(this.minor < fv.minor) return false;
	if(this.minor > fv.minor) return true;
	if(this.rev < fv.rev) return false;
	return true;
}
/* ---- get value of query string param ---- */
deconcept.util = {
	getRequestParameter: function(param) {
		var q = document.location.search || document.location.hash;
		if(q) {
			var pairs = q.substring(1).split("&");
			for (var i=0; i < pairs.length; i++) {
				if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
					return pairs[i].substring((pairs[i].indexOf("=")+1));
				}
			}
		}
		return "";
	}
}
/* fix for video streaming bug */
deconcept.SWFObjectUtil.cleanupSWFs = function() {
	var objects = document.getElementsByTagName("OBJECT");
	for (var i=0; i < objects.length; i++) {
		objects[i].style.display = 'none';
		for (var x in objects[i]) {
			if (typeof objects[i][x] == 'function') {
				objects[i][x] = null;
			}
		}
	}
}
if (typeof window.onunload == 'function') {
	var oldunload = window.onunload;
		window.onunload = function() {
		deconcept.SWFObjectUtil.cleanupSWFs();
		oldunload();
	}
} else {
	window.onunload = deconcept.SWFObjectUtil.cleanupSWFs;
}
/* add Array.push if needed (ie5) */
if (Array.prototype.push == null) { Array.prototype.push = function(item) { this[this.length] = item; return this.length; }}

/* add some aliases for ease of use/backwards compatibility */
var getQueryParamValue = deconcept.util.getRequestParameter;
var FlashObject = deconcept.SWFObject; // for legacy support
var SWFObject = deconcept.SWFObject;
	//alert('dude wheres my car');



//a function that will alter the text-decoration CSS inline property to none for the given link, passed by ID when mouseoff
function undecorate_link(x) {
        var y = document.getElementById(x);
        y.className = "nav";
}

function whackNode(parent,child) {
        var p = document.getElementById(parent);
        var c = document.getElementById(child);

        p.removeChild(c);
}
