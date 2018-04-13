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
			
			var el = {};
				el.tabRow = wrapper.querySelector(".tab-row");
				el.tabs = wrapper.querySelectorAll(".tab-row .tab");
				el.tabContent = wrapper.querySelector(".tab-content");
				el.contents = wrapper.querySelectorAll(".tab-target");
			
			if ( el.tabRow && el.tabs && el.tabContent && el.contents ){
				
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