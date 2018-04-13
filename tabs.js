//self contained function stops leak into global context
(function(){
	/*==================================================
	LIBRARY FUNCTIONS 
	These would typically be included as a generic script
	file to save repetition on other pages
	==================================================*/

	/*------------------------
	RUN CODE ON PAGE READY
	(reusing some homebrew vanilla JS)
	------------------------*/
	function Page_Ready(callback){
		var activated = false;
		if (document.readyState == "loaded" || document.readyState == "interactive" || document.readyState == "complete"){
			activated = true;
			callback();
		}else{
			document.addEventListener("readystatechange", function(){
				if (( document.readyState == "loaded" || document.readyState == "interactive" || document.readyState == "complete" ) && !activated){
					activated = true;
					callback();
				}
			});
		}
	}
	
	/*------------------------
	ADD CLASS
	------------------------*/
	var Add_Class = function(targetElement, className){
		Remove_Class(targetElement, className);
		var prefixedSpace = "";
		if (targetElement.className.length > 0){
			prefixedSpace = " ";
		}
		targetElement.className += prefixedSpace + className;
	}

	/*------------------------
	REMOVE CLASS
	------------------------*/
	var Remove_Class = function(targetElement, className){
		// Make a regex that matches the classname with or without the space
		// ^(className)\s*|\s+(className)\b
		var regex = new RegExp( "^(" + className + ")\\s*|\\s+(" + className + ")\\b", "g" );
		targetElement.className = targetElement.className.replace( regex, "");
	}
	
	/*------------------------
	HAS CLASS
	------------------------*/
	var Has_Class = function(targetElement, className){
		if (targetElement){
			var regex = new RegExp( "^(" + className + ")\\s*|\\s+(" + className + ")\\b", "g" );
			if ( targetElement.className.match(regex) ){
				return true;
			}
		}
		return false;
	}
	
	
	/*------------------------
	CREATE TAB FUNCTIONALITY
	------------------------*/
	function Create_Tab_Functionality(){
		//find all instances of our tab functionality
		var tabWrappers = document.getElementsByClassName("tab-wrapper");
		//loop through them, applying functionality
		for ( var wrappers = 0; wrappers < tabWrappers.length; wrappers++ ){
			//make it easier to work with
			var wrapper = tabWrappers[wrappers];
			
			//list elements under one object for clarity
			var el = {};
				el.tabRow = wrapper.querySelector(".tab-row");
				el.tabs = wrapper.querySelectorAll(".tab-row .tab-button");
				el.contents = wrapper.querySelectorAll(".tab-target");
			
			//make sure all items are found before continuing
			if ( el.tabRow && el.tabs && el.contents ){
				
				//check there are equal numbers of tabs and contents
				if ( el.tabs.length == el.contents.length ){
					
					//close all open tabs
					function Unselect_All_Tabs( tabWrapper ){
						//re-find the tabs and contents based on which tabWrapper is
						//being accessed.
						el.tabs = tabWrapper.querySelectorAll(".tab-button");
						el.contents = tabWrapper.querySelectorAll(".tab-target");
						//loop through both tab wrappers, setting them as deactive
						for ( var i = 0; i < el.tabs.length; i++ ){
							var tab = el.tabs[i];
							Remove_Class( tab, "tab-active" );
							var content = el.contents[i];
							Remove_Class( content, "tab-target-active" );
						}
					}
					//open specific tab
					function Select_Tab( tab_element ){
						Add_Class( tab_element, "tab-active" );
						var contentSelector = tab_element.getAttribute("data-tab-target");
						var content = document.querySelector( contentSelector );
						Add_Class( content, "tab-target-active" );
					}
					
					//attach listener to the wrapper element and look for 
					//target of event, this reduces lag as the project scales
					el.tabRow.addEventListener("click", function(e){
						var targetTab;
						if ( e.target.tagName == "H1" ){
							//the h1 was clicked
							targetTab = e.target.parentNode;
						}else if ( Has_Class( e.target, "tab-button" ) ){
							//tab clicked directly
							targetTab = e.target;
						}else{
							//no tab clicked, just the row. Escape
							return;
						}
						
						Unselect_All_Tabs( this.parentNode );
						
						Select_Tab( targetTab );
					});
					
				}else{
					console.warn("Create_Tab_Functionality: There are an unequal number of tabs and tab contents.");
				}
			}else{
				console.warn("Create_Tab_Functionality: Something missing from structure of HTML, script failed gracefully.");
			}
		}
	}
	
	//call tab functionality when the page is loaded
	Page_Ready( function(){
		Create_Tab_Functionality();
	});
	
	
	
	
})();