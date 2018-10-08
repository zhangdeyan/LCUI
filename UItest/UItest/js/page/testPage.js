function TestPage(params,srcModule){
	this.dlgParam = [
		{
			uiType:UIFrame,
			id:"TestPage",
			focusStop:true,
			onFocus:false,
			attr:{
				'left':'0',
				'top' : '0',
				'height':'720px',
				'width':'1280px',
				'background':'black'
			}
		},
		{
			uiType:UILabel,
			id:"TestPage_UILabel_text1",
			focusStop:true,
			onFocus:false,
			nextFocusRight:"text2",
			attr:{
					'display':'block',
					'left':'50px',
					'top' : '100px',
					'height':'200px',
					'width':'300px',
					'background':'green',
					'line-height':'80px',
					'text-align':'center',
					'font-size':'50px'
				},
			styleClass:{
				focus:{
					'border' : '2px solid yellow' 
				},
				normal:{
					'border' :'2px solid blue'
				}
			},
			proc :function(e){
				
					console.log("on key Label1");
					return false;
				},
			value : "111111 11111",
		},
		{
			uiType:UILabel,
			id:"text2",
			focusStop:true,
			onFocus:true,
			nextFocusLeft:"text1",
			attr:{
					'display':'block',
					'left':'400px',
					'top' : '100px',
					'height':'200px',
					'width':'300px',
					'background':'green',
					'line-height':'80px',
					'text-align':'center',
					'font-size':'50px'
				},
			styleClass:{
				focus:{
					'border' : '2px solid yellow' 
				},
				normal:{
					'border' :'2px solid blue'
				}
			},
			proc :function(e){
				
					console.log("on key Label2");
					return false;
				},
			value : "22222 22222 ssssss",
		}
	];


	this.start = function(){
		console.log("id:"+this.win.id+" fid:"+this.win.getFocusWin().id);
	};


	this.open = function(){
		this.defOpen();
	};


	this.stop = function(){
	
	};


	this.close = function(){
		this.defClose();
	};

	this.onkey = function(e){
		console.log("okey in :"+this.win.id);
		if(e.keyCode == 49)
		{
			this.win.getChild("text2").hide();
		}
		else if(e.keyCode == 50)
		{
			this.win.getChild("text2").show();
		}
		else if(e.keyCode == 51)
		{
			this.go(TestPage1);
		}
		return false;
	};
}
TestPage.prototype = new UIModule();