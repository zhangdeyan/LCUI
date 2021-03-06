function TestPage1(params, srcModule) {
    var self = this;
    this.dlgParam = [
        {
            uiType: UIFrame, id: "TestPage1", focusStop: true, onFocus: false, focusMove: true,
            cssAttr: {
                'left': '0',
                'top': '0',
                'height': '720px',
                'width': '1280px',
                'background': 'grey',
                'background-image': 'url(./img/mainblack.png)'
            }
        },
        {
            uiType:UIImg, id:"MenuPage_UIImg_0", focusStop: false, onFocus: false,
            cssAttr:{
                'left': '-140px',
                'top': '200px',
                'height': '90px',
                'width': '90px'
            }
        },
        {
            uiType:UIImg, id:"MenuPage_UIImg_1", focusStop: false, onFocus: false,
            cssAttr:{
                'left': '40px',
                'top': '200px',
                'height': '90px',
                'width': '90px'
            }
        },
        {
            uiType:UIImg, id:"MenuPage_UIImg_2", focusStop: false, onFocus: false,
            cssAttr:{
                'left': '300px',
                'top': '200px',
                'height': '90px',
                'width': '90px'
            }
        },
        {
            uiType:UIImg, id:"MenuPage_UIImg_3", focusStop: false, onFocus: false,
            cssAttr:{
                'left': '540px',
                'top': '170px',
                'height': '140px',
                'width': '140px'
            }
        },
        {
            uiType:UIImg, id:"MenuPage_UIImg_4", focusStop: false, onFocus: false,
            cssAttr:{
                'left': '870px',
                'top': '200px',
                'height': '90px',
                'width': '90px'
            }
        },
        {
            uiType:UIImg, id:"MenuPage_UIImg_5", focusStop: false, onFocus: false,
            cssAttr:{
                'left': '1170px',
                'top': '200px',
                'height': '90px',
                'width': '90px'
            }
        },
        {
            uiType:UIImg, id:"MenuPage_UIImg_6", focusStop: false, onFocus: false,
            cssAttr:{
                'left': '1380px',
                'top': '200px',
                'height': '90px',
                'width': '90px'
            }
        }
    ];


    this.start = function () {

        this.imgSrc = ["main_application_normal.png",
                        "main_channel_normal.png",
                        "main_infomation_normal.png",
                        "main_installtions_normal.png",
                        "main_usb_normal.png",
                        "main_usersetup_normal.png"];
        this.imgWin = [];

        for(var i = 0;i < 7;i++)
        {
            this.imgWin[i] = self.win.getChild("MenuPage_UIImg_"+i);
        }

        for(var i = 0; i < 6; i++)
        {
            this.imgWin[i].setSrc("./img/"+this.imgSrc[i]);
        }
        this.imgWin[6].setSrc("./img/"+this.imgSrc[0]);

        console.log("" + this.win.id + " start!");
    };


    this.open = function () {
        this.defOpen();
        console.log("" + this.win.id + " open!");
    };


    this.stop = function () {
        console.log("" + this.win.id + " stop!");
    };

    this.pause = function () {
        console.log("" + this.win.id + " pause!");
    };

    this.resume = function () {
        console.log("" + this.win.id + " resume!");
    };

    this.close = function () {
        this.defClose();
        console.log("" + this.win.id + " close!");
    };

    this.isAnimate = false;

    this.ImgMove = function(cb,d){
        for(var i = 0; i < 6 && d > 0; i++)
        {
            if(i == 5){
                self.imgWin[i].startAnimate({left:"+=250px"},100,cb);
            }
            else{
                self.imgWin[i].startAnimate({left:"+=250px"},100,null);
            }
        }

        for(var i = 1; i < 7 && d < 0; i++)
        {
            if(i == 6){
                self.imgWin[i].startAnimate({left:"-=250px"},100,cb);
            }
            else{
                self.imgWin[i].startAnimate({left:"-=250px"},100,null);
            }
        }
    };

    this.ImgNarrow = function(cb){
        if(self.isAnimate)
        {
            return;
        }else
        {
            self.isAnimate = true;
        }

        self.imgWin[3].startAnimate({
            top : "+=30px",
            left:"+=30px",
            height:"-=60px",
            width:"-=60px"
        },100,cb);
    };


    this.ImgEnlarge = function(cb){
        this.imgWin[3].startAnimate({
            top : "-=30px",
            left:"-=30px",
            height:"+=60px",
            width:"+=60px"
        },100,cb);
    };

    this.ImgExchange = function(d){
        if(d > 0)
        {
            self.imgWin[6].setSrc(self.imgWin[5].getSrc());

            self.imgWin[6].getElement().css("left","-140px");

            var temp = self.imgWin[6];

            self.imgWin.pop();

            self.imgWin.splice(0, 0, temp);
        }
        else
        {
            self.imgWin[0].setSrc(self.imgWin[1].getSrc());

            self.imgWin[0].getElement().css("left","1380px");

            var temp = self.imgWin[0];

            self.imgWin.splice(0,1);

            self.imgWin.push(temp);
        }
    };

    this.onkey = function (e) {
        if (e.keyCode == 51) {
            this.go(TestPage, TestPage1, null, null);
        }
        else if(e.keyCode == 69)
        {
            self.ImgNarrow(function(){
                self.ImgMove(function(){
                    self.ImgExchange(1);
                    self.ImgEnlarge(function(){
                        self.isAnimate = false;
                    });
                },1);
            });
        }
        else if(e.keyCode == 81)
        {
            self.ImgNarrow(function(){
                self.ImgMove(function(){
                    self.ImgExchange(-1);
                    self.ImgEnlarge(function(){
                        self.isAnimate = false;
                    });
                },-1);
            });
        }
        else if(e.keyCode == 189)
        {
            var table = self.win.getChild("TestPage1_UITable_testTable");
            table.stopAnimate(true,false);
        }
        return false;
    };

}

TestPage1.prototype = new UIModule();