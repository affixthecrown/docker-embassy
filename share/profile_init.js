//this script sets up some stuff so that the browser request that the prfiel be rendered


function test() {
}

function f_filterResults(n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function dude() {
	return f_filterResults (
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);

}


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



		








var triumphPicTid;
var triumphPicCount;
var commentCallback;

function callTriumphPic(tid,pid) {

	commentCallback = function() { callTriumphPic(tid,pid); };

        var url = contentPath + "pic" + pid + ".jpg";
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
	triumphPicCount = pid;
	
}

function callShout(id) {

        commentCallback = function(){  callShout(id); };

        var url = weburl + 'shout?id=' + id;
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


        var url = weburl + 'note?id=' + id;
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


        var url = weburl + 'link?id=' + id;
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
	var f = document.getElementById("feed");
	//should I clean out f right here?
	f.innerHTML = '';
	alert("Hey!  Our full forum is not yet finished :(   But we're working on it!");
	
}

function callReply(rid) {

        var url = weburl + 'reply?rid=' + rid;
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

function promptTriumph(eid) {

	var p = document.getElementById("feed");

	var e = new oblTriumphPrompt({
		"thePar":p,
		"eid":eid
	});



}

function callPromptTriumph(jid) {
	var request = newRequest();

        var url = weburl + "prompt_triumph?jid=" + jid;

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

	globalSoFar = 0;
	 if ( document.getElementById('trayDiv') ) {
                document.body.removeChild(document.getElementById('trayDiv'));
        }




        var request = newRequest();

        var url = weburl + "structure_feed";

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

function showMyPosts() {

	var e = new oblPostsAdmin();

}


function coopt(eid) {


	//confirm that the user really wants to do a co-opt.

	var backing = oblC("d");
        backing.innerHTML = "Are you sure you want co-opt this user for this journey?";
	var d = new oblDialog({
		"title":"Sure?",
		"content":backing
	});
	var sendCoopt = function() {
		d.hide();
		var request = newRequest();
	        var url = weburl + "coopt?eid=" + eid;
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
					var e = oblC("d");
			                e.innerHTML = request.responseText;
					var d = new oblDialog({
						"title":"Co-opted",
						"content":e
					});
					d.show();
	                        }
	                }
	        };
	        request.send(null);
	};
        var sendCooptButtons = ([
         {text:"Yes",handler: sendCoopt, isDefault: true},
         {text:"No", handler: d.hide, isDefault: false}
        ]);
	d.changeButtons(sendCooptButtons);
	d.show();

}



function searchKeys(e) {
	if(e.keyCode == 13 )
		displaySearch();
}	

var commentKeys = function(e,divId) {
	if(e.keyCode == 13 )
		submitComment(divId);


	
};

var globalAlertDialog;
var callAlerts = function() {
	var request = newRequest();
        var url = weburl + "render_alert_list";
        request.open("GET",url,true);
        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
				var img = document.getElementById('TheBlockIsHot');
				img.style.visibility = 'hidden';
				var e = oblC("d");
				e.innerHTML = request.responseText;
				globalAlertDialog = new oblDialog({
					"title":"Alerts",
					"content":e
				});
				globalAlertDialog.show();
			
                        }

                }
        };
        request.send(null);
};


var checkAlerts = function() {


	var request = newRequest();
        var url = weburl + "check_alerts";

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
        var searchUrl = weburl + 'search';

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

        var url = weburl + "structure_feed";

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
	var e = document.getElementById('itow');
	var itow = e.value;

	var p = new oblEmbarkmentProposition({
		itow:itow,
		thePar:document.getElementById("feed")
	});
	
	
}


function __addNewItow() {
	var backing = oblC("d");	
	var d = new oblDialog({
		"title":"What list should this go on?",
		"content":backing
	});

	var sendItow = function(category) {
		var request = newRequest();
       	 	var sendUrl = weburl + 'add_itow';
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
			var backing = oblC("d");
			backing.innerHTML=request.responseText;
			var d = new oblDialog({
				"title":"Journey added!",
				content:backing
			});
			d.show();
			callBucketlist();
		};

	
        	standardPost(sendUrl,values,replyCallback);
	};
	
	var sendSoon = function() {
                sendItow('soo');
		 var i = document.getElementById('itow');
                i.value = '';
		d.hide();
        };

        var sendSomeday = function() {
                sendItow('som');
                this.cancel();
		var i = document.getElementById('itow');
		d.hide();

        };

        var sendIniti = function() {
                sendItow('ini');
		d.hide();
		var i = document.getElementById('itow');
                i.value = '';
        };
        var sendPrivate = function() {
                sendItow('pri');
		d.hide();
		var i = document.getElementById('itow');
		i.value = '';
        };


        //first throw up a window and ask them what category this should be in.
        var categoryButtons = ([
         {text:"Soon",handler: sendSoon, isDefault: false},
         {text:"Someday", handler: sendSomeday, isDefault: false},
         {text:"Initiatives",handler: sendIniti, isDefault: false},
         {text:"Private",handler: sendPrivate, isDefault: false}
        ]);
	d.changeButtons(categoryButtons);
	var req = oblC("d");
	req.innerHTML = "Please choose which list this item should go on.";
	backing.appendChild(req);
	backing.appendChild(giveSpace(12));
	var ex = oblC("d");
	ex.className = "explanation";
	ex.innerHTML = "Initiatives are items that require lots of coordination to accomplish. <br>Like raising money for charities, or overthrowing governments :)";
	backing.appendChild(ex);
	
	
	d.show();
}



function decideInvite(eid) {
	
	var backing = oblC("d");
	var d = new oblDialog({
		"title":"Accept invite?",
		"content":backing
	});

	var add = function() {
		addExistingJourney(eid);
		d.hide();
		
	};

	var cancel = function() {d.hide();};

	var acceptButtons = ([
         {text:"Yes",handler: add, isDefault: true},
         {text:"No thanks", handler: cancel, isDefault: false}
        ]);

	d.changeButtons(acceptButtons);


	var itowRequest = newRequest();
        var url = weburl + "get_familiar_itow?eid=" + eid;
        itowRequest.open("GET",url,true);
        itowRequest.onreadystatechange = function() {
                if( itowRequest.readyState == 4 ) {
                        if( itowRequest.status == 200 ) {
				backing.innerHTML = 'You have been invited to add <b>' + itowRequest.responseText +'</b> <br><br>Would you like to add this to your bucketlist?';

				d.show();
                        }
                }
        };
        //now send.  we'll be waiting...
        itowRequest.send(null);


}

  
function addExistingJourney(eid) {   //"embark id"

	var _justAdd = function() {	
		/*
		var backing = oblC("d"); //backing is populated with content down below...
		var d = new oblDialog({
			"title":"Add Journey",
			"content":backing
		});
		var sendAddExisting = function(category) {
	
	        	var request = newRequest();
		        var sendUrl = weburl + 'add_journey?eid=' + eid + '&category=' + category;
	
		        request.open("GET",sendUrl,true);
	
						var back = oblC("d");
		                                var dialog = new oblDialog({
							"title":"Add Journey",
							"content":back
						});
			
	
		        request.onreadystatechange = function() {
		                if( request.readyState == 4 ) {
		                        if( request.status == 200 ) {
		                                back.innerHTML = request.responseText;
						callBucketlist();	
						d.hide();	
						dialog.show();
		                        }
		                }
		        };
		       //now send.  we'll be waiting...
		        request.send(null);
		};
		var sendSoon = function() {
			sendAddExisting('soo');
			d.hide();
		};
		var sendSomeday = function() {
			sendAddExisting('som');
			d.hide();
		};
		var sendIniti = function() {
			sendAddExisting('ini');
			d.hide();
		};
		var sendPrivate = function() {
			sendAddExisting('pri');
			d.hide();
		};
	
		 //first throw up a window and ask them what category this should be in.
	        var categoryButtons = ([
		         {text:"Soon",handler: sendSoon, isDefault: false},
		         {text:"Someday", handler: sendSomeday, isDefault: false},
		         {text:"Initiatives",handler: sendIniti, isDefault: false},
		         {text:"Private",handler: sendPrivate, isDefault: false}
	        ]);
	        var req = oblC("d");
	        req.innerHTML = "Please choose which list this item should go on.";
	        backing.appendChild(req);
		backing.appendChild(giveSpace(12));
	        var ex = oblC("d");
	        ex.className = "explanation";
	        ex.innerHTML = "Initiatives are items that require lots of coordination to accomplish. <br>Like raising money for charities, or overthrowing governments :)";
	        backing.appendChild(ex);
		d.changeButtons(categoryButtons);
		d.show();
		*/

		var e = new oblEmbarkmentProposition({
			"eid":eid
		});
	};

        if( globalBearings.isLoggedIn() ) {
		/*simply add the journey*/
		_justAdd();
        }else{
                /*if you are not logged in - are you booked?*/
                if( globalBearings.isBooked() ) {
                        /*que up the petition siging*/
                        var q = new oblPersistentQue({
                                "action":"add_journey",
                                "id":id
                        });
                        /*and prompt them to sign in_______________*/
                }else{
                        /*this user must be fresh*/

                        var q = new oblPersistentQue({
                                "action":"add_journey",
                                "id":eid
                        });
                        var p = new oblAccountPrompt({
                                "guidance":"Please create a quick account prior to adding this item."
                        });
                }
        }


}
 
var globalSoFar;
function callOurBucketlist() {


	//this may well take some arguemtns int eh future
        var request = newRequest();

	var latest = document.createElement("div");
	var curId = "next" + globalSoFar;
	latest.id = curId;
        var  d = document.getElementById("feed");
	d.appendChild(latest);

        var url = weburl + "our_bucketlist?ic=" + globalSoFar;

        request.open("GET",url,true);

	var callAgain = function() {
		callOurBucketlist();
	};

		


	var it = document.getElementById("feed");
	var cm = document.getElementById("SeeMoreDiv");
	if( cm ) 
		it.removeChild(cm);
	var clickme = document.createElement("div");
	clickme.className = "seemore";
	clickme.id = "SeeMoreDiv";
	clickme.align = "center";
	clickme.innerHTML = "<br>See More";
	addListener("click",clickme,callAgain);
	var hoverc = function() { this.className = "seemore_hover"; };
	var outc = function() { this.className = "seemore"; };
	addListener("mouseover",clickme,hoverc);
	addListener("mouseout",clickme,outc);
	
	
	it.appendChild(clickme);

	

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
				globalSoFar = globalSoFar + 20;
				var d = document.getElementById(curId);
                                d.innerHTML = request.responseText;

				

				

                        }
                }
        };

        //now send.  we'll be waiting...
        request.send(null);



}

function dropTriumph(iid) {

	var backing = oblC("d");
	var d = new oblDialog({
		"title":"Sure?",
		"content":backing
	});

	var _dropTriumph  = function() {
		var request = newRequest();
	        var url = weburl + 'drop_triumph?iid=' + iid;
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
					callTriumphs();
					d.hide();
	                        }
	                }
	        };
	        //now send.  we'll be waiting...
	        request.send(null);
	};

	var _cancel = function() {
		d.hide();
	};

	var buttons = ( [ 
	{ text:"Yes", handler:_dropTriumph, isDefault:false} ,
         {text:"No",handler: _cancel, isDefault: true}
	]);

	d.changeButtons(buttons);
	backing.innerHTML = "Are you sure you want to delete this triumph?<br>This cannot be un-done.";

	d.show();

}



	
	



function callSignOut() {

	var request = newRequest();
	var soUrl = weburl + 'sign_out';
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
        var url = weburl + 'picture?pid=' + pid;
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

function oblGuidePost(parentId) {


	function sendGPViewed(gid) {


		var sendUrl = weburl + 'guidepost_viewed';
		values = {};
		values['gid'] = gid;
		var replyCallBack = function() {
			whackNode("feed","GuidePost");
		};
		
		standardPost(sendUrl,values,replyCallBack);
	}
		
	//create the div which will serve as the guidepost block in the newsfeed
	var gpDiv = document.createElement("div");
	gpDiv.className = "guidepost_div";
	gpDiv.id = "GuidePost";

	var x = document.createElement("a");
	x.innerHTML = "X";
	x.style.color = "gray";
	x.style.position = "relative";
	x.style.left = "690px";
	gpDiv.appendChild(x);

	


	

	//create the div which will contain the guidepost title
	var titleDiv = document.createElement("div");
	titleDiv.className = "guidepost_title";

	//create the div which will contain the guidepost message
	var messageDiv = document.createElement("div");
	messageDiv.className = "guidepost_message";

	gpDiv.appendChild(titleDiv);
	gpDiv.appendChild(messageDiv);

	var data;


	var request = newRequest();
        var url = weburl + 'read_guidepost';
        request.open("GET",url,true);
        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
				data = eval('(' + request.responseText + ')');


				//get out of here if there is no guidepost to be viewed.
				if( data.gid == null) {
					return;
				}
				titleDiv.innerHTML = data.title;
				messageDiv.innerHTML = data.message;
				/*Create a listener.  when fired this function should
				send a message to the server that current user has 
				seen the guidepost */
				var _seenGP = function() {
					sendGPViewed(data.gid);
				};
				addListener("click",x,_seenGP);
		
				//now insert this to the proper location in the DOM
				var par = document.getElementById(parentId);
				var ele = par.getElementsByTagName("*")[0];
				par.insertBefore(gpDiv,ele);

				
				
                        }
                }
        };
        //now send.  we'll be waiting...
        request.send(null);

	


}

function callPetitions() {
	var e = new oblPetitionList(); //a petition list will attach itself to the feed.
}



function callMyQuestions() {
        var request = newRequest();
        var url = weburl + 'render_my_questions';
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
                        url = weburl + "get_username?uid=" + uid;
                }else{
                        url = weburl + "get_username";
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
                        url = weburl + "get_embarked_count?category=" + category + ";uid=" + uid;
                }else{
                        url = weburl + "get_embarked_count?category=" + category;
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
	/*
	var soo;
	var may;
	var som;

	var ownership = 0;
	if( !uid ) {
		uid = globalBearings.getUid();
		ownership = 1;
		
	}
	if( uid == globalBearings.getUid() ) {
		ownership = 1;
	}



	function callBListTab(cat,season) {
		var e = new oblBucketlist({
			"thePar":document.getElementById(cat),
			"category":cat,
			"season":season,
			"uid":uid,
			"ownership":ownership
		});
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

	
	var tabsExist = document.getElementById("som");
	if( !(tabsExist) ) {
		//make a tabview with the right tabs
		var tabs = new YAHOO.widget.TabView('bucketlist',{activeIndex: 0} );

		tabs.addTab( new YAHOO.widget.Tab({
			label: 'This Spring',
			content: '<div id="sea"></div>',
			active: true
		}));
		
	
		
		
		tabs.addTab( new YAHOO.widget.Tab({
			label: 'Someday',
			content: '<div id="som"></div>',
			active: false 
		}));
	
		tabs.addTab( new YAHOO.widget.Tab({
			label: 'Initiatives',
			content: '<div id="ini"></div>',
			active: false 
		}));
			if(ownership) {
				tabs.addTab( new YAHOO.widget.Tab({
		                        label: 'Private',
		                        content: '<div id="pri"></div>',
		                        active: false
                		}));
			}
	


	
	}
	
	
	callBListTab("sea","this");
	callBListTab("som");
	callBListTab("ini");
	if(ownership)
		callBListTab("pri");
	*/

	if(!uid)
		uid = globalBearings.getUid();

	var e = new oblTimeline({
		thePar:document.getElementById("bucketlist"),
		"uid":uid
	});
	

}


//function to request that bucketlist be rendered.
function _callBucketlist(uid) {
        //render the profile page.
        var request = newRequest();
	var url;
	if( uid ) {
		url = weburl + "render_bucketlist?uid=" + uid;
	}else{
        	url = weburl + "render_bucketlist?dir=my";
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

        var url = weburl + "render_embarked_panel?jid=" + jid;

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

	var backing = oblC("d");
	var d = new oblDialog({
		"title":"Sure?",
		"content":backing
	});
	var sendDropRequest = function() {
		var request = newRequest();
	

	        var url = weburl + "drop_" + type + "?iid=" + iid;
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
					d.hide();
					commentCallback();
	
	                        }
	                }
	        };
	        request.send(null);
	};

	backing.innerHTML = "Are you sure you want to remove this?";
	var cancel = function() {d.hide(); };
	var deleteCheckButtons = ([
         {text:"Yes",handler: sendDropRequest, isDefault: false},
         {text:"No", handler: cancel, isDefault: true}
	]);
	d.changeButtons(deleteCheckButtons);

	d.show();

	
}

	

var jFeedInput;
var jFeedJid;

function showDrop(e,id) {

	var div;
	var hide;
         if( e.srcElement ) {
                div = e.srcElement;
        }else{
                div = e.currentTarget;
        }



	var link = document.getElementById(id);	
	if( link ) {
		hide = function() {
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

//call a timeline
function callTimeline(id) {

	if(!id)
		id = globalBearings.getUid();

	var feed = document.getElementById("feed");
	feed.innerHTML = '';

	var un = document.getElementById('user_nav');
	un.innerHTML = '';
	var ads = document.getElementById("ad_content");
	ads.innerHTML = '';

	var t = new oblTimeline({
		"thePar":feed,
		"uid":id
	});	


}


function callJourneyConcourse(jid) {
        var mainContent = document.getElementById("main_content");
        var e = new oblJourneyConcourse({
                thePar:mainContent,
                jid:jid
        });
}

//function to render a newsfeed in the feed div
function callJourneyFeed(jid) {
	callEmbarkedPanel(jid);

	//since comments are implemented via JS conversation obkefts I think this is obseoltete_
	commentCallback = function(){ callJourneyFeed(jid); };
	jFeedJid = jid;

	//create a div for the post widget.
	var feed = document.getElementById('feed');
	feed.innerHTML = '';

	//create a div for the title / journey ID
	var feedTitleDiv = document.createElement('div');
	feedTitleDiv.id = "PostDiv";
	feedTitleDiv.style.position = "relative";
	feedTitleDiv.style.width = "455px";
	feedTitleDiv.style.left = "50px";
	feed.innerHTML = '<h2>Item Newsfeed:</h2>&nbsp&nbsp&nbsp<span class="jtitle" style="position:relative;bottom:11px" id="jtitle"></span><br>';
	feed.style.marginLeft = "10px";

	/*this span is for the leadership display*/
	var leader = oblC("s");
	leader.id = "leaderSpan";
	feed.appendChild(leader);
	feed.appendChild(feedTitleDiv);

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
	jFeedInput.style.width = '440px';
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
        postDiv.style.left = "385px";  //this should push it all the way right
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
	postButton.on('click',submitJFeedPost);

	
	/*this is for the actualy feed itself*/
	jFeed = document.createElement('div');
        jFeed.id = 'jfeed';
        feed.appendChild(jFeed);
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
	descriptionI.style.width = "440px";
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
	sDiv.style.width = "440px";
	sDiv.align = "center";
	//genereate the image of the camera and the input box for the file upload.
	var cameraPicture = document.createElement("img");
	cameraPicture.src = "http://184.106.81.119/images/camera.png";
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
	bDiv.style.left = "385px";  //this should push it all the way right
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
	

	//once attached to DOM - convert button to YUI button.
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
        jFeedInput.style.width = '440px';
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
        postDiv.style.left = "385px";  //this should push it all the way right
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


	




	/*-------------------------------------------------*/

	var itowRequest = newRequest();
        var url = weburl + "get_familiar_itow?jid=" + jid;
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

	
	//ths OO way
	//use a feed object to attach a feed to the jfeed div.
	var jsJFeed = new oblFeed(jid,"jfeed");

	

}

var vidKeys = function(e) {
        if( e.keyCode == 13)
                submitVidPost();
}





function showMyConnex() {

	var feed = document.getElementById("feed");
		var l = new oblConnexList({
		"thePar":feed
	});


}

//function to request that bucketlist be rendered.
function callProfileUserNav(uid) {

        //render the profile user navigation section

        var request = newRequest();
	if( uid ) {
		url = weburl + "render_profile_nav?uid=" + uid;
	}else{
        	url = weburl + "render_profile_nav?dir=my";
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

	var url = weburl + 'messaging?uid=' + uid;
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

        var url = weburl + "structure_feed";

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

function callEditTriumph(tid) {
	var f = document.getElementById("feed");
	f.innerHTML = '';

	var e = new oblTriumphEditor({
		tid:tid,
		thePar:f
	});
			

}


function displayMessage(mid) {

	var backing = oblC("d");
	var d = new oblDialog({
		"title":"Message",
		"content":backing
	});


	var promptUrl = weburl + 'message?mid=' + mid;

	var messageSubmit = function() {
		var request = newRequest();
		var addUrl = weburl + 'send_message';

		var formId = 'MessageForm';

                var e = document.getElementById(formId);

                var values = {};
		for( var i=0; i < document.forms[formId].elements.length; i++ ) {
                        values[document.forms[formId].elements[i].name] = document.forms[formId].elements[i].value;
                }


		standardPost(addUrl,values,function() {});
		d.hide();
	};


	var messageButtons = ( [ { text:"Reply",
	        handler:messageSubmit, isDefault:true } ]);

	d.changeButtons(messageButtons);
        var request = newRequest();


        request.open("GET",promptUrl,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
				backing.innerHTML = request.responseText;
				d.show();
                        }
		}
	};
	request.send(null);
}

function displaySendMessage(uid) {
	var backing = oblC("d");
	var d = new oblDialog({
		"title":"Send Message",
		"content":backing
	});

	var messageSubmit = function() {
                var request = newRequest();
                var sendUrl = weburl + 'send_message';
                var values = {};
		var formId = 'MessageForm';
		var e = document.getElementById(formId);
		for( var i=0; i < document.forms[formId].elements.length; i++ ) {
                        values[document.forms[formId].elements[i].name] = document.forms[formId].elements[i].value;
                }

	
                standardPost(sendUrl,values,function() {});
		d.hide();
        };

	var promptUrl = weburl + 'prompt_message?uid=' + uid;
        var messageButtons = ( [ { text:"Send",
                handler:messageSubmit, isDefault:true } ]);
        
	d.changeButtons(messageButtons);
        var request = newRequest();
                        

        request.open("GET",promptUrl,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
				backing.innerHTML = request.responseText;
				d.show();
                        }
                }
        };
        request.send(null);
}

var forumKeys = function(e,id) {
	if( e.keyCode == 13)
		forumSubmitReply(id);
}

function hoverRate(e,dir) {

	var thing = (e.currentTarget) ? e.currentTarget : e.srcElement;

	if(dir == "up") {

		var _handler = function() {
			thing.src = 'http://184.106.81.119/images/rate_arrow_u.png';	
		};
		thing.src = 'http://184.106.81.119/images/rate_high_u.png';
		addListener('mouseout',thing,_handler);
	}else{
		var _handler = function() {
                        thing.src = 'http://184.106.81.119/images/rate_arrow_d.png'; 
                };

		thing.src = 'http://184.106.81.119/images/rate_high_d.png';
		addListener('mouseout',thing,_handler);
	}

}

function rateReply(qid,rid,arg) {
	var values = [];

	var sendUrl = weburl + "rate_reply";
		
	values['iid'] = rid;
	values['dir'] = arg;


	var replyCallback = function() {
		callForum(qid);
	};

       standardPost(sendUrl,values,replyCallback);

	
	

}

function forumSubmitReply(id) {

	var fid = id;
	var request = newRequest();
                var sendUrl = weburl + 'add_forum_post';


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

        var url = weburl + "prompt_triumph_pics?jid=" + jid;

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
        var url = weburl + "drop_journey?jid=" + jid;
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

        var url = weburl + "structure_feed";

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

function sendInvite() {

	

		var backing = oblC("d");
		var d = new oblDialog({
			"title":"Invite(s) sent",
			"content":backing
		});
                var request = newRequest();
                var sendUrl = weburl + 'send_invite';
                var e = document.getElementById('InviteDiv');
                var values = {};
                for( var i=0; i < e.childNodes.length; i++ ) {
                        if( e.childNodes[i].value) {
                                values[e.childNodes[i].name] = e.childNodes[i].value;
                        }
                }
                var replyCallback = function(request) {


			backing.innerHTML = "<br>Invites have been sent!<br>";
			d.show();
			
                };

                standardPost(sendUrl,values,replyCallback);

}

function displayInvite(text,id) {
	if(text == "via Twitter") {
		promptTwitterInvite(id);
	}else{
		promptInvite(id);
	}
}

function promptTwitterInvite(eid) {
	var p = new oblTwitterPrompt({
		"type":"invite",
		"eid":eid
	});
}

function promptInvite(eid) {
	 var backing = oblC("d");
         var d = new oblDialog({
                        "title":"Who to invite?",
                        "content":backing
         });


	var _sendInvite = function() { 
		sendInvite();
		d.hide();
	};
		
	
	var buttons = ( [ { text:"Invite!",
        handler:_sendInvite, isDefault:true } ]);


	d.changeButtons(buttons);
	var inviteDiv = document.createElement("div");
	inviteDiv.id = "InviteDiv";


	var inviteesI = document.createElement("input");
	inviteesI.name = "invitees";
	inviteesI.style.width = "400px";
	inviteesI.value = "List here. (e.g. john@yahoo.com, RyGuy, ...)";
	inviteesI.style.color = "gray";

	var eidI = document.createElement("input");
	//set the eid for this journey.
	eidI.style.visibility = "hidden";
	eidI.name = "eid";
	eidI.value = eid;
	
	//set the title of this window.

	
	var ins = document.createElement("span");
	ins.innerHTML = "List the people you wish to invite.  Separate names with commas.<br>  You may list ourbucketlist <b>usernames</b> or <b>emails</b>.";
	var littleSpan = document.createElement("span");
	littleSpan.className = "explanation";
	littleSpan.innerHTML = "Separate with commas.";

	var clearText = function() {
		inviteesI.value = '';
		inviteesI.style.color = 'black';
	};

	addListener("click",inviteesI,clearText);

	



	inviteDiv.appendChild(ins);
	inviteDiv.appendChild(document.createElement("br"));
	inviteDiv.appendChild(eidI);
	inviteDiv.appendChild(document.createElement("br"));
	inviteDiv.appendChild(inviteesI);
	inviteDiv.appendChild(document.createElement("br"));
	inviteDiv.appendChild(littleSpan);


	backing.appendChild(inviteDiv);


	d.show();


}

	

var insertTPicTray = function(tid) {
	if( navigator.appName == 'Microsoft Internet Explorer') 
		return;
	


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
		trayDiv.style.background = 'rgba(85, 85, 85, 0.839844)';
	}

	body.appendChild(trayDiv);
	var request = newRequest();
        var url = weburl + "triumph_tray?tid=" + tid;

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
                var sendUrl = weburl + 'add_triumph';


                var values = {};
		values['jid'] = jid;
		values['bestpart'] = bestpart;

		var callBack = function() { callProfile(); };
		 standardPost(sendUrl,values,callBack);
}




function submitNote() {
		var request = newRequest();
                var sendUrl = weburl + 'add_note';
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
                var sendUrl = weburl + 'add_comment';
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
	var url = weburl + 'modify_profile_settings?uid=' + id;
	 var formId = 'SettingsForm';
                var values = {};
                for( var i=0; i < document.forms[formId].elements.length; i++ ) {
                        values[document.forms[formId].elements[i].name] = document.forms[formId].elements[i].value;
                }
                var submitCallback = function() { callProfile(id); };
                standardPost(url,values,submitCallback);
}

function dropQuestion(id) {
	var url = weburl + 'drop_question?qid=' + id;
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

        var url = weburl + "prompt_add_picture_comment?pid=" + newPid;

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
	 var promptUrl = weburl + "prompt_profile_pic";

	 var request = newRequest();

	var backing = oblC("d");
	var d = new oblDialog({
		"title":"Change Profile Picture",
		"content":backing
	});
	var changePicSubmit = function() {


                        document.forms['ProfilePicForm'].submit();
			d.hide();
        };

        var profilePicButtons = ( [ { text:"Change",
        handler:changePicSubmit, isDefault:true } ]);

	d.changeButtons(profilePicButtons);


        request.open("GET",promptUrl,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                backing.innerHTML = request.responseText;
				d.show();
			

                        }
                }
        };

        //now send.  we'll be waiting...
        request.send(null);


}



function displayAttach(directive,uid,jid) {
	/*this uid business is old.  lets just pull from the global user object, 
	and even taht is questionable*/
	var uid = globalBearings.getUid();

	if( directive == "Petition" ) {
		navDefIniti(jid);
		return;
	}

	var promptUrl;
	var addUrl;


	switch( directive ) {
                case 'Link':
                        promptUrl = weburl + "prompt_link?uid=" + uid + ";jid=" + jid;
			addUrl = weburl + "add_link";
                        break;
                case 'Picture':
                        promptUrl = weburl + "prompt_picture?uid=" + uid + ";jid=" + jid;
			addUrl = weburl + "add_picture";
                        break;
                case 'Note':
                        promptUrl = weburl + "prompt_note?uid=" + uid + ";jid=" + jid;
			addUrl = weburl + "add_note";
                        break;
                case 'Question':
                        promptUrl = weburl + "prompt_question?uid=" + uid + ";jid=" + jid;
			addUrl = weburl + "add_question";
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




 	var request = newRequest();

	
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


		var structUrl = weburl + 'structure_feed';	
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
					var e = oblC("d");
					e.innerHTML = request.responseText;
					var d = new oblDialog({
						"title":"Attach",
						"content":e
					});
					d.changeButtons(attachButtons);
					d.show();
	                        }
	
	                }
	        };
		//and send the request...
		request.send(null);
	}
}

var checkMention = function(e) {
	//what is this?___	
	//alert(this.value);



};

function callUserNav() {

        //render the profile user navigation section

        var request = newRequest();

        var url = weburl + "render_user_nav?dir=my";

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



function callSignPetition(id) {
	/*If you are logged in, sign this thing.  inform, and head home*/


	if( globalBearings.isLoggedIn() ) {
		var p = new oblIniti({
			"type":"petition",
			"id":id
		});
		p.sign();
	}else{
		/*if you are not logged in - are you booked?*/
		if( globalBearings.isBooked() ) {
			/*que up the petition siging*/
			var q = new oblPersistentQue({
				"action":"sign_petition",
				"id":id
			});
			/*and prompt them to sign in_______________*/
		}else{
			/*this user must be fresh*/
		
			var q = new oblPersistentQue({
				"action":"sign_petition",
				"id":id
			});
			var p = new oblAccountPrompt({
				"guidance":"Please create a quick account prior to signing this petition."
			});
		}
	}
}



//function to request that bucketlist be rendered.
function callAds() {

	
        var request = newRequest();
	 var url = weburl + "render_ads";


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

var navTimeline = function() {
	var state = "timeline";
	YAHOO.util.History.navigate('nav',state);
};
var navJourneyFeed = function(id) {
	var state = "jfeed" + 'A' + id;
	YAHOO.util.History.navigate('nav',state);
};

var navConcourse = function(id) {
	var state = "concourse" + 'A' + id;
	YAHOO.util.History.navigate('nav',state);
};

var navPage = function(id) {
	var state = "page" + 'A' + id;
	YAHOO.util.History.navigate('nav',state);
};

var navPromptBanner = function() {
	var state = "prompt_banner";
	YAHOO.util.History.navigate("nav",state);
};

var navProfile= function(id) {
	if(id == 0) //this is for private postings/.
		return;
        var state = "profile" + 'A' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navMyConnex = function() {
	var state = "connex";
	YAHOO.util.History.navigate("nav",state);
};

var navQuestions = function() {
        var state = "questions";
        YAHOO.util.History.navigate('nav',state);
};

var navPicture= function(id) {
        var state = "picture" + 'A' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navShout = function(id) {
        var state = "shout" + 'A' + id;
        YAHOO.util.History.navigate('nav',state);
};


var navNote= function(id) {
        var state = "note" + 'A' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navLink= function(id) {
        var state = "link" + 'A' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navQuestion= function(id) {
        var state = "question" + 'A' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navTriumph = function(id) {
        var state = "triumph" + 'A' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navMessaging = function(id) {
        var state = "mail";
        YAHOO.util.History.navigate('nav',state);
};


var navTriumphPic = function(id,pid) {
	var state = "tri_pic" + 'A' + id + 'A' + pid;
	YAHOO.util.History.navigate('nav',state);
};

var navForum = function(id) {
	var state = "forum" + 'A' + id;
	YAHOO.util.History.navigate('nav',state);
};

var navReply = function(id) {
        var state = "reply" + 'A' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navTriumphs = function(id) {
        var state = "triumphs" + 'A' + id;
        YAHOO.util.History.navigate('nav',state);
};

var navProfileSettings = function(id) {
        var state = "settings";
        YAHOO.util.History.navigate('nav',state);
};

var navDefIniti = function(id) {
	var state = "definiti" + 'A' + id;
	YAHOO.util.History.navigate('nav',state);
};

var navHome = function() {
	var state = "home";
	YAHOO.util.History.navigate('nav',state);
};

var navPetition = function(id) {
	var state = "petition" + 'A' + id;
	YAHOO.util.History.navigate("nav",state);
};

var navPetitions = function() {
        var state = "petitions";
        YAHOO.util.History.navigate("nav",state);
};

var navLeadershipVote = function(id) {
	var state = "lv" + 'A' + id;
	YAHOO.util.History.navigate("nav",state);
};










//this handler should call teh various functions depending on the hash for the nav bar ...
var navStateHandler = function(state,msg) {
	/*Scroll to top of page.  At this point, all nav features
	should begin at the top of the page.  this may change
	in the future_*/
	scroll(0,0);

	/*get rid of timeline base if it is there*/
	var base = document.getElementById("timeline_base");
	if(base){
		base.parentNode.removeChild(base);
	}

	//from the state string, split out the section and iid.	
	var components = [];

	components = state.split('A');

	var section = components[0];
	var iid = components[1];
	var  pid = components[2]; //if we're caling a tri pic...
	
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
		case "concourse":
			callJourneyConcourse(iid);
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
			if( !(globalBearings.isInGarden()) ) {
				/*if we aren't in the garden, do something about it*/
				var e = new oblVapor({
					"state":state
				});
				return;
			}
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
                        callTriumphPic(iid,pid);
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
		case "definiti":
			callDefIniti(iid);
			break;
		case "page":
			callPage(iid);
			break;
		case "fund":
			callFund(iid);
			break;
		case "petition":
			callPetition(iid);
			break;
		case "petitions":
			callPetitions();
			break;
		case "sp":
			callSignPetition(iid);
			break;
		case "add_ej":
			addExistingJourney(iid);
			break;
		case "connex":
			showMyConnex();
			break;
		case "timeline":
			callTimeline(iid);
			break;
		case "prompt_banner":
			promptBanner();
			break;
		case "lv": //leadership vote
			promptLeadershipVote(iid);
			break;
		case "fl":
			displayBadCred();
			break;
		case "test":
			break;
	}
};

function showGuidance(msg) {
        /*THIS IS UNFINSIHED______
        this was meant to be a messageing system used to immediately pop up and alert.
        it was meant to be used to inform a user that they had succesfully created an 
        Amazon recipient account after returning from the CBUI. Also, it could be used
        in the future to do other alerting.
        */

	

		//first call the guidance message
		//var it = new oblGuidanceMsg(msg);
		//then "reset" it.  (so the guidance message is only seen once)
		//YAHOO.util.History.navigate("msg","none");
}
function callPetition(id) {
        document.getElementById("feed").innerHTML = '';
        var e = new oblIniti({
                "type":"petition",
                "id":id
        });
}


function callFund(id) {
	document.getElementById("feed").innerHTML = '';
	var e = new oblIniti({
		"type":"funding",
		"id":id
	});
}



function callPage(id) {

	document.getElementById("feed").innerHTML = '';
	var e = new oblPage(id);
}
	


function callDefIniti(jid) {


	document.getElementById("feed").innerHTML = '';
	//currently, this thing will create its own FocusDiv and implement itself there.	
	var e = new oblInitiativeDefinition(jid);

	
}



var globalBearings = new oblBearings();

	


function idAndLand() {


}

function goInFromLanding(state) {
	/*the difference between this an goIn() is it already assumes that the YAHOO history manager has been started*/
	
	var request = newRequest();
        /*set body inner HTML to this*/
        var url = baseurl + "backdrop.html";
        request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        document.getElementsByTagName("body")[0].innerHTML = request.responseText;
                                        setFeed();
					globalBearings.setGarden(1);
                                        if(state) {
						YAHOO.util.History.navigate("nav",state);
                                        }

                                }
                        }
        };
        //now send.  we'll be waiting...
        request.send(null);
}


function goIn(state) {
	var request = newRequest();
	/*set body inner HTML to this*/
	var url = baseurl + "backdrop.html";
	request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {	
					globalBearings.setGarden(1);
					document.getElementsByTagName("body")[0].innerHTML = request.responseText;
					setFeed();
					if(state) {
						startHistoryManager(state);
					}
	
                                }
                        }
        };
        //now send.  we'll be waiting...
        request.send(null);
}

function goLanding(state) {
	var request = newRequest();
        /*set body inner HTML to this*/
        var url = baseurl + "landing.html";
        request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
					globalBearings.setGarden(0);
                                        document.getElementsByTagName("body")[0].innerHTML = request.responseText;

				  if( navigator.appName == 'Microsoft Internet Explorer') {

                var bg = document.getElementById("BackgroundDiv");
                bg.style.bottom = "16px";

                var tt = document.getElementById("TriumphTape");
                tt.style.bottom = "24px";


                var sui = document.getElementById("SignUpImg");
                sui.style.top = "31px";

                var spacer = document.getElementById("BSpacerDiv");
                spacer.style.height = "80px";

                var search = document.getElementById("Search");
                search.style.top = "70px";

                var username = document.getElementById("Username");
                username.style.top = "33px";

                var password = document.getElementById("Password");
                password.style.top = "33px";


        }

			

		        callTriumphTape();
		        setInputs();

	var facebookHandler = function(response) {
		if( response.status == "connected" ) {
			document.location = anonurl + "facebook?sesh=" + response.authResponse.accessToken + ";fbid=" + response.authResponse.userID;
		}else{
		}
	};
	var fb = oblC("d");
	fb.id = "fb-root";
	var _fbinit = function(){
		 FB.init({
              appId      : '196376493752391', // App ID
              channelUrl : '//184.106.81.119/channel.html', // Channel File
              status     : true, // check login status
              cookie     : true, // enable cookies to allow the server to access the session
              xfbml      : true  // parse XFBML
        });
	
		FB.Event.subscribe('auth.authResponseChange',facebookHandler);
	};
	document.getElementsByTagName("body")[0].appendChild(fb);
		 (function(d){
	     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement('script'); js.id = id; //js.async = true;
	     js.src = "http://connect.facebook.net/en_US/all.js";
		addListener("load",js,_fbinit);
	     ref.parentNode.insertBefore(js, ref);
  		   }(document));

	



				
	
		
		                                        startHistoryManager("landing");
							if(globalBearings.lastLoginFailed() )
								YAHOO.util.History.navigate("nav","fl");
								
		                                }
		                        }
		        };
        //now send.  we'll be waiting...
        request.send(null);
}

	
function setFeed() {
	var table = new oblTable(1,2);
	/* What is all this white_out business?
	table.setRowClass(0,"white_out");
	table.setClassName("white_out");
	table.setCellClass(0,0,"white_out");
	table.setCellClass(0,1,"white_out");
	*/
	var feed = oblC("d");
	feed.id = "feed";
	feed.style.width = "715px";

	var itab = new oblTable(1,2);
	var vertLine = oblC("i","http://184.106.81.119/images/gray_vert_sep_715.gif");
	table.addContent(0,0,feed);
	itab.addContent(0,0,vertLine);

		
	var innerTable = itab.getTable();
	innerTable.getElementsByTagName("td")[0].id = "ad_content";

	var userNav = oblC("d");
	userNav.id = "user_nav";
	table.addContent(0,1,userNav);

	table.addContent(0,1,innerTable);

	var main = document.getElementById("main_content");
	main.innerHTML = '';
	main.appendChild(table.getTable());
		
}
		
function runOnLoad() {

		
	/*determine if this is an Obl user*/
	if(globalBearings.isLoggedIn() ) {
		goIn("home");

	}else{
		if( 1 ) {
			goLanding();
		}else{
			idAndLand();
		}
	}


		
	/*get the UID for this user*/


	//create a new request object
	/*
	var request = newRequest();
	request.open("GET",url,true);

	request.onreadystatechange = function() {
		if( request.readyState == 4 ) {
			if( request.status == 200 ) {
				var d = document.getElementById("main_content");
				d.innerHTML = request.responseText;
				callAds();	
				callUserNav();
				startHistoryManager();

			}
	
		}
	};

	//now send.  we'll be waiting...
	request.send(null);
	*/

	var two = newRequest();
        var url = weburl + "check_confirmed";
        two.open("GET",url,true);

        two.onreadystatechange = function() {
                if( two.readyState == 4 ) {
                        if( two.status == 200 ) {
				requestConfirm(two.responseText);
                        }
                }
        };
        //now send.  we'll be waiting...
        two.send(null);


		

}

function startHistoryManager(arg) {
	 /*YUI Histroy manager*/
        var bookmarkedState = YAHOO.util.History.getBookmarkedState("nav");
	/*
	var msgState = YAHOO.util.History.getBookmarkedState("msg");
	*/

        //var querySection = YAHOO.util.History.getQueryStringParameter("section");
        var initialState = bookmarkedState || arg;
	/*
	var initialMsg = msgState || "none";
	*/

        YAHOO.util.History.register("nav", initialState, function(section) {

                navStateHandler(section)
        });
	/*
	YAHOO.util.History.register("msg", initialMsg, function(msg) {
		showGuidance(msg);
	});
	*/

        YAHOO.util.History.onReady(function () {
		navStateHandler(initialState);
		/*
		showGuidance(initialMsg);
		*/
        });
        YAHOO.util.History.initialize("yui-history-field", "yui-history-iframe");
	


}

function requestConfirm(result) {

		if(result == 1) {
			return;
		}else{    //we are not yet confirmed
			var bar = new messageBar();
			bar.setMessage('We have sent you an email. Please click the link in it to confirm your accout. (If you cannot find the email, check your "spam" folder.)');
			bar.show();
		}
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

function promptBanner() {
	var f = document.getElementById("feed");	
	f.innerHTML = '';


	var pic = oblC("i","/image_content/pic176_profile.jpg");
	f.appendChild(pic);	
	var dd1 = new YAHOO.util.DD(pic);
	var start;
	var finish;
	dd1.on("mouseUpEvent",function(ev) {
		finish = ev.e.pageY;
		var distance = finish - start;
	},dd1,true);

	 dd1.on("mouseDownEvent",function(e) {
		start = e.pageY;
        },dd1,true);
}

function callProfile(uid) {

	if( document.getElementById("concourse_left") )
		setFeed();
	globalInProfile = true;

	 if ( document.getElementById('trayDiv') ) {
                document.body.removeChild(document.getElementById('trayDiv'));
        }

		if( !uid ) 
		uid = globalBearings.getUid();
	

	var feed = document.getElementById("feed");
	if(feed)
		feed.innerHTML = '';
	var ads = document.getElementById("ad_content");
	if(ads) ads.innerHTML = '';
	var unav = document.getElementById("user_nav");
	if(unav) unav.innerHTML = '';
	var container = oblC("d");
	
	feed.appendChild(container);
	var tl = oblC("d");
	tl.id = "bucketlist"; //legacy
	feed.appendChild(tl);
	
	var e = new oblProfileHead({
		"uid":uid,
		thePar:container
	});

	var f = new oblTimeline({
		"uid":uid,
		thePar:tl
	});
}


//call the home news feed
function callHomeFeed() {

	checkAlerts();
	
	
	commentCallback = function(){ callHomeFeed(); };

	var a = new oblPersistentQue();
	var ind = a.perform();
	if( ind )
		return;

	

	var curFeed = new oblDeprecatedFeed(0,document.getElementById("feed"));
	


}

function displayAddPictureComment(pid) {


	//alert('we are in displayAddPictureComment');
	var url = weburl + 'prompt_add_picture_comment?pid=' + pid;

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
	var url = weburl + "prompt_profile_settings";
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

        var url = weburl + "structure_feed";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;

                                //called here b/c rendering home lays out a strucure where these then fit in
                                callJourneyFeed(jid);
                                callUserNav();
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}

function promptLeadershipVote(id) {
	if( globalBearings.isLoggedIn() ) {
		/*if the user is logged in, just do it like nike*/
		var e = new oblLeadershipVotePrompt({
			"id":id
		});
	}else{ 
		/*if they are not logged in, store in PQ and prompt
		them to sign in.  Note that in this case, we assume
		that this cannot be a fresh user.*/
		
		/*if they are not logged in, store in PQ and prompt
		them to sign in.  Note that in this case, we assume
		that this cannot be a fresh user.*/
                var q = new oblPersistentQue({
                        "action":"vote_leadership",
                        "id":id
                });
		/*now prompt to login____*/
	}

		
}


function callTriumphs(uid) {

	/*call triumph is an opengarden function
	so let us see if the user is logged in - 
	and act appropriately*/
	if( !uid ) {
		uid = "my"
	}
	var 	url =  weburl + 'triumphs?uid=' + uid;


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
        var url = weburl + "structure_feed";
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

	 /*call triumph is an opengarden function
        so let us see if the user is logged in -
        and act appropriately*/
        var url;
        if(globalBearings.isLoggedIn() ) {
                url =  weburl + 'triumph?tid=' + tid;
        }else{
		url = anonurl + 'triumph?tid=' + tid;
        }


	commentCallback = function(){ callTriumph(tid); };

        var request = newRequest();
        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;
				//insertTPicTray(tid);
				var t = new oblConversation("triumph",tid,d,null);

				if( !(globalBearings.isLoggedIn() ) ) {
					/*If the user is not logged in, then display an
					invitation to join ourbucketlist.*/
					var invite = new oblSidePanelInvite();
				}
						
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

        var url = weburl + "structure_feed";

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

        var url = weburl + "structure_feed";

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

        var url = weburl + "structure_feed";

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

        var url = weburl + "structure_feed";

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

        var url = weburl + "structure_feed";

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
	var sendUrl = weburl + 'add_picture_comment';


	var formId = 'PictureCommentForm';
	var values = {};
	for( var i=0; i < document.forms[formId].elements.length; i++ ) {
		values[document.forms[formId].elements[i].name] = document.forms[formId].elements[i].value;
	}
	var replyCallback = function() { callProfile(); };
	standardPost(sendUrl,values,replyCallback);


}

function tourButton(our_jefe) {

	this.jefe = our_jefe;
	
	
	var s = document.createElement("span");
	s.style.display = "inline-block";
	s.style.width = "10px";

	this.jefe.appendChild(s);


	this.e = document.createElement("span");
	this.e.style.display = "inline-block";
	this.e.style.position = "relative";
	this.e.style.bottom = "12px";   //change this for IE
		
	this.e.className = "tour_guide";
	
	var _handler = function(e) {
		var c = document.getElementById("TheClickedTourButton");
		if( c )
			c.style.backgroundColor = 'gray';

		if( navigator.appName == 'Microsoft Internet Explorer')	{
			e.srcElement.style.backgroundColor = '#61a9cb';
			e.srcElement.style.backgroundColor = '#61a9cb';
		}else{

			this.style.backgroundColor = '#61a9cb';
			this.id = "TheClickedTourButton";
		}
	};
	
	addListener("click",this.e,_handler);

	
	this.jefe.appendChild(this.e);
	
	this.setAction = function(action) {
		this.action = action;

		this.a = document.createElement("a");
		this.a.style.height = "39px";
		this.a.style.width = "29px";

		var ts = document.createElement("span");
		ts.style.position = "relative";	
		ts.style.top = "8px";
		ts.style.color = "white";
		ts.style.fontSize= "18px";
		ts.innerHTML = this.text;
		this.a.appendChild(ts);
		addListener("click",this.e,this.action);
		this.e.appendChild(this.a);
	};

	this.setText = function(text) {
		this.text = text;
	};

	
	

}

function messageBar() {

	var bar;
	bar = document.createElement("div");
	bar.style.width = "100%";
	bar.style.height = "56px";
        bar.style.position = "relative";
        bar.style.bottom = "8px";
        bar.align = "center";
        bar.id = "MessageBar";
        bar.style.background = "url('http://184.106.81.119/images/box_bg.png')";

	this.bar = bar;


	this.setMessage = function(msg) {
		this.message = msg;

		this.span = document.createElement("span");
		this.span.className =   "message_bar";

		this.span.innerHTML = this.message;

		this.bar.appendChild(this.span);
		
	};

	this.show = function() {
		 var body = document.getElementById("body");
	        var firstDiv = document.getElementsByTagName("div")[0];
	
	        body.insertBefore(this.bar,firstDiv);
	};


}



function tour() {


	scroll(0,0); //scroll window to top.

	//define the various actions that each tour point should consist of.


	//layout a bar

	var bar = document.createElement("div");
	bar.style.width = "100%";
	bar.style.height = "56px";
	bar.style.position = "relative";
	bar.style.bottom = "8px";
	bar.align = "center";
	bar.id = "MessageBar";
	bar.style.background = "url('http://184.106.81.119/images/box_bg.png')";

	
	//give the bar a decorative image.
	var blipImg = document.createElement("img");
	blipImg.src = "http://184.106.81.119/images/blip.png";
	blipImg.style.position = "relative";
	blipImg.style.top = "8px";
	bar.appendChild(blipImg);

	//fill out the tour guide buttons and set their actions.



	var one = new tourButton(bar);
	one.setText("1");
	one.setAction(function(){
		displayTour("home");

		
	});


	var two = new tourButton(bar);
	two.setText("2");
	two.setAction(function(){
                displayTour("home_inside");
	});

	var three = new tourButton(bar);
	three.setText("3");
	three.setAction(function(){
		displayTour("profile");
	});

	 var four = new tourButton(bar);
        four.setText("4");
        four.setAction(function(){
                displayTour("profile_inside");
        });

	 var five = new tourButton(bar);
        five.setText("5");
        five.setAction(function(){
		YAHOO.util.History.navigate('nav','profile');
                displayTour("triumph");
        });

	 var six = new tourButton(bar);
        six.setText("6");
        six.setAction(function(){
                displayTour("ourbucketlist");
		 YAHOO.util.History.navigate('nav','ourbucketlist');
        });

	
	  var seven = new tourButton(bar);
        seven.setText("7");
        seven.setAction(function(){
                displayTour("ourbucketlist_inside");
        });

	  var eight = new tourButton(bar);
        eight.setText("8");
        eight.setAction(function(){
                displayTour("jfeed");
        });

	  var nine = new tourButton(bar);
        nine.setText("9");
        nine.setAction(function(){
                displayTour("jfeed_attach");
        });



	

	//give the bar an "exit tour" button
	var _exit = function() {

		globalKillShades();

		 var temp = document.getElementById("SheetDiv");
                        if( temp )
                                whackNode("body","SheetDiv");


		whackNode("body","MessageBar");
		var dropImg = document.getElementById("TourImg");
                        if( dropImg )
                                whackNode("CenterDiv","TourImg");

	};
		
        var exit = document.createElement("a");
	var exitImg = document.createElement("img");
        exitImg.src = "http://184.106.81.119/images/exit_tour.png";
        exitImg.style.position = "relative";
        exitImg.style.top = "10px";
        exitImg.style.left = "10px";
	exit.appendChild(exitImg);
	addListener("click",exit,_exit);
        bar.appendChild(exit);	



	//add the "leave tour button"
	
	
	
	var space1 = document.createElement("canvas");
	space1.style.width = "5px";



	
	


	var body = document.getElementById("body");
	var firstDiv = document.getElementsByTagName("div")[0];
	
	body.insertBefore(bar,firstDiv);

	displayTour("start");
	

}

function getWindowWidth() {

	var w;

	if( navigator.appName == 'Microsoft Internet Explorer') { 
		w = document.documentElement.offsetWidth;
	}else{
		w = window.innerWidth;
	}

	return w;
}







function shadeExplanation() {

	scroll(0,0);	

	this.setTitle = function(title) {
		this.title = title;
	};


	this.setX = function(x) {
		this.x = x;
	};
	
	this.setY = function(y) {
		this.y = y;
	};
	
	this.setWidth = function(width) {
		this.width = width;
	};
		
	this.setHeight = function(height) {
		this.height = height;
	};

	this.setMessage = function(m) {
		this.message = m;
	};
	
	this.render = function() {

		

		//get the ture coordinates.
		var windowWidth = getWindowWidth();
		var xOffset = (windowWidth - 944)/2

		this.trueX = this.x + xOffset;

		this.one = document.createElement("div");
		this.one.style.position = "absolute";
		this.one.style.width = this.trueX + "px";
		this.one.style.height = "100%";
		this.one.style.left="0px";
		this.one.style.backgroundColor = "black";
		this.one.style.zIndex = "5";
		this.one.style.opacity = "0.75";
		this.one.style.filter = "alpha(opacity=75)";

		this.two = document.createElement("div");
                this.two.style.position = "absolute";
		this.two.style.top = "0px";
                this.two.style.height = this.y;
                this.two.style.left= this.trueX + "px";
		this.two.style.width = this.width;
                this.two.style.backgroundColor = "black";
                this.two.style.zIndex = "5";
                this.two.style.opacity = "0.75";
                this.two.style.filter = "alpha(opacity=75)";

		this.three = document.createElement("div");
                this.three.style.position = "absolute";
                this.three.style.top = "0px";
                this.three.style.height = "100%";
		var threeWidth = this.trueX + this.width;
                this.three.style.left = threeWidth + "px";
		this.three.style.right = "0px";
                this.three.style.backgroundColor = "black";
                this.three.style.zIndex = "5";
                this.three.style.opacity = "0.75";
                this.three.style.filter = "alpha(opacity=75)";

	
		this.four = document.createElement("div");
                this.four.style.position = "absolute";
		var fourHeight = this.y + this.height;
                this.four.style.top = fourHeight + "px";
		this.four.style.width = this.width;
                this.four.style.bottom = "0px";
		this.four.style.left = this.trueX + "px";
                this.four.style.backgroundColor = "black";
                this.four.style.zIndex = "5";
                this.four.style.opacity = "0.75";
                this.four.style.filter = "alpha(opacity=75)";


		//create the message dive.
		var messageDiv = document.createElement("div");
		messageDiv.className = "messageCloud";
		messageDiv.style.zIndex = '10';
		var title  = document.createElement("span");
		title.style.fontSize = "18px";
		title.innerHTML = this.title;
		messageDiv.appendChild(title);
		var messageSpan = document.createElement("span");
		messageSpan.innerHTML = this.message;
		var theP = document.createElement("p");
		theP.appendChild(messageSpan);
		messageDiv.appendChild(theP);
		
		
		messageDiv.style.position = "absolute";
		messageDiv.style.width = "200px";
		var mTop = this.y + this.height + 15;
		messageDiv.style.top = mTop;
		messageDiv.style.left = this.trueX;
		this.messageDiv = messageDiv;
		
		//this pointer image adds a "pointing" effect to the message div.
                var p = document.createElement("img");
                p.src = "http://184.106.81.119/images/pointer_up.png";
                p.style.position = "absolute";
		var pLeft = this.trueX + 15;
		var pTop = this.y  + this.height + 6;
		p.style.top = pTop;
		var pLeft = this.trueX + 15;	
                p.style.left = pLeft + "px";
		p.style.zIndex = "11";
		this.p = p;
	
		
	

		

	};

	this.show = function() {


		var cont = document.createElement("div");
		cont.id = "TourOverlay";

		cont.style.position = "absolute";
		cont.style.top= "55px";
		cont.style.width = "100%";
		cont.style.height = "100%";
		cont.style.zIndex = '100';

		cont.appendChild(this.one);
		cont.appendChild(this.two);
		cont.appendChild(this.three);
		cont.appendChild(this.four);
		cont.appendChild(this.messageDiv);
		cont.appendChild(this.p);
		var b = document.getElementById("body");
		var d = document.getElementsByTagName("div")[1];
		b.insertBefore(cont,d);
	};


	




}
	
function globalKillShades() {

		var t  = document.getElementById("TourOverlay");
		if(t)
		whackNode("body","TourOverlay");
}



function setInputs() {

        var username = document.getElementById("Username");
        var _s = function() {
                var e = document.getElementById("Search");

                e.value = '';
                e.style.color = '#333333';
        };
        var _u = function() {
                var e = document.getElementById("Username");
                e.value = '';
                e.style.color = '#333333';
        };

         var _p = function() {
                 var e = document.getElementById("Password");

                e.value = '';
                e.style.color = '#333333';
                if( navigator.appName == 'Microsoft Internet Explorer') {
                        var newInput = document.createElement("input");
                         newInput.style.color = e.style.color;  //style it
                        newInput.style.position = e.style.position;  //style it
                        newInput.style.top = e.style.top;  //style it
                        newInput.style.left = e.style.left;  //style it
                        newInput.style.width = e.style.width;  //style it
                        newInput.style.height = e.style.height;  //style it
                        newInput.style.background = e.style.background;  //style it
                        newInput.style.border = e.style.border;  //style it
                        newInput.className = e.className;  //style it
                        newInput.id = e.id;
                        newInput.name = e.name;
                        newInput.type = "password";
                        e.parentNode.replaceChild(newInput,e);
                        setTimeout(function() { newInput.focus(); }, 10);


                }else{

                        e.type = 'password';
                }

        };



        var _f = function() {
                 var e = document.getElementById("FullName0");

                e.value = '';
                e.style.color = '#333333';
        };

         var _e = function() {
                 var e = document.getElementById("Email0");

                e.value = '';
                e.style.color = '#333333';
        };


         var _se = function() {
                 var e = document.getElementById("SetPassword0");

                e.value = '';
                e.style.color = '#333333';

                if( navigator.appName == 'Microsoft Internet Explorer') {
                        var newInput = document.createElement("input");

                        newInput.style.color = e.style.color;  //style it
                        newInput.id = e.id;
                        newInput.style.position = e.style.position;  //style it
                        newInput.style.top = e.style.top;  //style it
                        newInput.style.left = e.style.left;  //style it
                        newInput.style.width = e.style.width;  //style it
                        newInput.style.height = e.style.height;  //style it
                        newInput.className = e.className;  //style it
                        newInput.type = "password";
                        e.parentNode.replaceChild(newInput,e);
                        setTimeout(function() { newInput.focus(); }, 10);


                }else{

                        e.type = 'password';
                }
        };

       var uExp = new oblInputExp();
        uExp.setElement(username);
        uExp.setExp("username");

        var pExp = new oblInputExp();
        pExp.setElementId("Password");
        pExp.setPassword();
        pExp.setExp("password");

        var fullName = document.getElementById("FullName0");
        var fExp = new oblInputExp();
        fExp.setElement(fullName);
        fExp.setExp("Full Name");

        var email = document.getElementById("Email0");
        var eExp = new oblInputExp();
        eExp.setElement(email);
        eExp.setExp("Email");

        var setPassword = document.getElementById("SetPassword0");
        var p2Exp = new oblInputExp();
        p2Exp.setElement(setPassword);
        p2Exp.setPassword();
        p2Exp.setExp("Password");

        var search = document.getElementById("Search");
        var sExp = new oblInputExp();
        sExp.setElement(search);
}




function displayTour(code) {

	



	globalKillShades();
	switch( code ) {
		case "home":
			var temp = document.getElementById("SheetDiv");
			if( temp )
				whackNode("body","SheetDiv");

			var dropImg = document.getElementById("TourImg");
			if( dropImg )
				whackNode("CenterDiv","TourImg");

			var sheet = document.createElement("div");
			sheet.className = "tintSheet";
			sheet.style.top = "56px";
			sheet.id = "SheetDiv";
			var body = document.getElementById("body");
			body.appendChild(sheet);

			
			//create a new img and abolustely position it over whats current shown.
			var t = document.createElement("img");
			t.src = 'http://184.106.81.119/images/s1.png';
			t.style.position = "absolute";
			t.style.top = "56px";
			t.style.zIndex = "10";
			t.id = "TourImg";
	
		
			var cd = document.getElementById("CenterDiv");
			cd.appendChild(t);

			
			break;
		case "home_inside":
			 var temp = document.getElementById("SheetDiv");
                        if( temp ) 
                                whackNode("body","SheetDiv");

                        var dropImg = document.getElementById("TourImg");
                        if( dropImg ) 
                                whackNode("CenterDiv","TourImg");

                        var sheet = document.createElement("div");
                        sheet.className = "tintSheet";
                        sheet.style.top = "56px";
                        sheet.id = "SheetDiv";
                        var body = document.getElementById("body");
                        body.appendChild(sheet);


                        //create a new img and abolustely position it over whats current shown.
                        var t = document.createElement("img");
                        t.src = 'http://184.106.81.119/images/s2.png';
                        t.style.position = "absolute";
                        t.style.top = "56px";
                        t.style.zIndex = "10";
                        t.id = "TourImg";


                        var cd = document.getElementById("CenterDiv");
                        cd.appendChild(t);


                        break;


		break;

		case "profile":

			 var temp = document.getElementById("SheetDiv");
                        if( temp ) 
                                whackNode("body","SheetDiv");

                        var dropImg = document.getElementById("TourImg");
                        if( dropImg ) 
                                whackNode("CenterDiv","TourImg");

                        var sheet = document.createElement("div");
                        sheet.className = "tintSheet";
                        sheet.style.top = "56px";
                        sheet.id = "SheetDiv";
                        var body = document.getElementById("body");
                        body.appendChild(sheet);


                        //create a new img and abolustely position it over whats current shown.
                        var t = document.createElement("img");
                        t.src = 'http://184.106.81.119/images/s3.png';
                        t.style.position = "absolute";
                        t.style.top = "56px";
                        t.style.zIndex = "10";
                        t.id = "TourImg";


                        var cd = document.getElementById("CenterDiv");
                        cd.appendChild(t);




                break;

		case "profile_inside":
			 var temp = document.getElementById("SheetDiv");
                        if( temp ) 
                                whackNode("body","SheetDiv");

                        var dropImg = document.getElementById("TourImg");
                        if( dropImg ) 
                                whackNode("CenterDiv","TourImg");

                        var sheet = document.createElement("div");
                        sheet.className = "tintSheet";
                        sheet.style.top = "56px";
                        sheet.id = "SheetDiv";
                        var body = document.getElementById("body");
                        body.appendChild(sheet);


                        //create a new img and abolustely position it over whats current shown.
                        var t = document.createElement("img");
                        t.src = 'http://184.106.81.119/images/s4.png';
                        t.style.position = "absolute";
                        t.style.top = "56px";
                        t.style.zIndex = "10";
                        t.id = "TourImg";


                        var cd = document.getElementById("CenterDiv");
                        cd.appendChild(t);


                        break;


		case "triumph":

			 var temp = document.getElementById("SheetDiv");
                        if( temp ) 
                                whackNode("body","SheetDiv");

                        var dropImg = document.getElementById("TourImg");
                        if( dropImg ) 
                                whackNode("CenterDiv","TourImg");

                        var sheet = document.createElement("div");
                        sheet.className = "tintSheet";
                        sheet.style.top = "56px";
                        sheet.id = "SheetDiv";
                        var body = document.getElementById("body");
                        body.appendChild(sheet);


                        //create a new img and abolustely position it over whats current shown.
                        var t = document.createElement("img");
                        t.src = 'http://184.106.81.119/images/s5.png';
                        t.style.position = "absolute";
                        t.style.top = "56px";
                        t.style.zIndex = "10";
                        t.id = "TourImg";


                        var cd = document.getElementById("CenterDiv");
                        cd.appendChild(t);


                        break;





			case "ourbucketlist":

			 var temp = document.getElementById("SheetDiv");
                        if( temp ) 
                                whackNode("body","SheetDiv");

                        var dropImg = document.getElementById("TourImg");
                        if( dropImg ) 
                                whackNode("CenterDiv","TourImg");

                        var sheet = document.createElement("div");
                        sheet.className = "tintSheet";
                        sheet.style.top = "56px";
                        sheet.id = "SheetDiv";
                        var body = document.getElementById("body");
                        body.appendChild(sheet);


                        //create a new img and abolustely position it over whats current shown.
                        var t = document.createElement("img");
                        t.src = 'http://184.106.81.119/images/s6.png';
                        t.style.position = "absolute";
                        t.style.top = "56px";
                        t.style.zIndex = "10";
                        t.id = "TourImg";


                        var cd = document.getElementById("CenterDiv");
                        cd.appendChild(t);


                        break;



                break;

		


		case "ourbucketlist_inside":

			 var temp = document.getElementById("SheetDiv");
                        if( temp ) 
                                whackNode("body","SheetDiv");

                        var dropImg = document.getElementById("TourImg");
                        if( dropImg ) 
                                whackNode("CenterDiv","TourImg");

                        var sheet = document.createElement("div");
                        sheet.className = "tintSheet";
                        sheet.style.top = "56px";
                        sheet.id = "SheetDiv";
                        var body = document.getElementById("body");
                        body.appendChild(sheet);


                        //create a new img and abolustely position it over whats current shown.
                        var t = document.createElement("img");
                        t.src = 'http://184.106.81.119/images/s7.png';
                        t.style.position = "absolute";
                        t.style.top = "56px";
                        t.style.zIndex = "10";
                        t.id = "TourImg";


                        var cd = document.getElementById("CenterDiv");
                        cd.appendChild(t);


                        break;


                case "jfeed":

		 var temp = document.getElementById("SheetDiv");
                        if( temp ) 
                                whackNode("body","SheetDiv");

                        var dropImg = document.getElementById("TourImg");
                        if( dropImg ) 
                                whackNode("CenterDiv","TourImg");

                        var sheet = document.createElement("div");
                        sheet.className = "tintSheet";
                        sheet.style.top = "56px";
                        sheet.id = "SheetDiv";
                        var body = document.getElementById("body");
                        body.appendChild(sheet);


                        //create a new img and abolustely position it over whats current shown.
                        var t = document.createElement("img");
                        t.src = 'http://184.106.81.119/images/s8.png';
                        t.style.position = "absolute";
                        t.style.top = "56px";
                        t.style.zIndex = "10";
                        t.id = "TourImg";


                        var cd = document.getElementById("CenterDiv");
                        cd.appendChild(t);


                        break;



		



		case "jfeed_attach":

			 var temp = document.getElementById("SheetDiv");
                        if( temp ) 
                                whackNode("body","SheetDiv");

                        var dropImg = document.getElementById("TourImg");
                        if( dropImg ) 
                                whackNode("CenterDiv","TourImg");

                        var sheet = document.createElement("div");
                        sheet.className = "tintSheet";
                        sheet.style.top = "56px";
                        sheet.id = "SheetDiv";
                        var body = document.getElementById("body");
                        body.appendChild(sheet);


                        //create a new img and abolustely position it over whats current shown.
                        var t = document.createElement("img");
                        t.src = 'http://184.106.81.119/images/s9.png';
                        t.style.position = "absolute";
                        t.style.top = "56px";
                        t.style.zIndex = "10";
                        t.id = "TourImg";


                        var cd = document.getElementById("CenterDiv");
                        cd.appendChild(t);



                break;

		case "start":
		var e = new shadeExplanation();
                e.setX(210);
                e.setY(0);
                e.setWidth(0);
                e.setHeight(0);
                e.setTitle("What is Ourbucketlist?");
                e.setMessage("Ourbucketlist is a place to connect with others who share your aspirations.  Instead of listing your friends, you list things you want to do and Ourbucketlist will instantly connect you with everyone else who has matching items on their lists.  Share and learn from each other.  Find others who have been there and done it.  <br><br>Please click the buttons above, starting with <b>1</b>, to get a quick overview of how things work!");
                e.render();
                e.show();
                break;
	

		

        }



}




//register a window onload event to call to render profile.
if( window.addEventListener ) 
        window.addEventListener("load",runOnLoad, false);
else if (window.attachEvent) window.attachEvent("onload", runOnLoad);
else window.onload = runOnLoad;



