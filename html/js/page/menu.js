function MenuPage(params, srcModule) {
    var self = this;

    this.menuIndex = 0;
    this.subIndex = 0;

    self.imgSrc = ["main_infomation_normal.png",
        "main_usb_normal.png",
        "main_application_normal.png",
        "main_installtions_normal.png",
        "main_channel_normal.png",
        "main_usersetup_normal.png",];

    var mits = [
        {
            "name": "Installation",
            "items": [
                {"name": "Auto Scan", "target": null, "param": "Auto"},
                {"name": "Manual Scan", "target": null, "param": "Manual"},
                {"name": "Software Upgrade", "target": null}
            ]
        },
        {
            "name": "Channel Manage",
            "items": [
                {"name": "Channel Edit", "target": null},
                {"name": "Channel Information", "target": null},
                //{"name":Scge, "target":""}
            ]
        },
        {
            "name": "User Setup",
            "items": [
                {"name": "Meun Setting", "target": null},
                {"name": "AV Setting", "target": AvSettingPage},
                {"name": "Language Setting", "target": null},
                {"name": "Factory Default", "target": null},
                {"name": "System Lock", "target": null}
            ]
        },
        {
            "name": "Information",
            "items": [
                {"name": "CA Information", "target": null},
                {"name": "System Information", "target": null},
            ]
        },
        {
            "name": "USB",
            "items": [
                {"name": "File Browser", "target": FileBrowserPage},
                {"name": "Media Player", "target": null},
                {"name": "e-Album", "target": null},
                {"name": "User Manager", "target": null},
                {"name": "PVR", "target": null}
            ]
        },
        {
            "name": "Application",
            "items": [
                {"name": "Web Application", "target": null},
                {"name": "Native Application", "target": null},
                {"name": "Cloud UI", "target": null}
            ]
        }
    ];

    this.dlgParam = [
        {
            uiType: LcUI.UIFrame, id: "MenuPage", focusStop: true, onFocus: false, focusMove: true,
            cssAttr: {
                'position': 'absolute',
                'left': '0',
                'top': '0',
                'height': '720px',
                'width': '1280px',
                'overflow': 'hidden',
                'background-image': 'url(./img/mainblack.png)'
            }
        },
        {
            uiType: LcUI.UIImg, id: "MenuPage_UIImg_0", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '-95px',
                'top': '180px',
                'height': '90px',
                'width': '90px',
                'position': 'absolute'
            }
        },
        {
            uiType: LcUI.UIImg, id: "MenuPage_UIImg_1", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '135px',
                'top': '180px',
                'height': '90px',
                'width': '90px',
                'position': 'absolute'
            }
        },
        {
            uiType: LcUI.UIImg, id: "MenuPage_UIImg_2", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '365px',
                'top': '180px',
                'height': '90px',
                'width': '90px',
                'position': 'absolute'
            }
        },
        {
            uiType: LcUI.UIImg, id: "MenuPage_UIImg_3", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '570px',
                'top': '150px',
                'height': '140px',
                'width': '140px',
                'position': 'absolute',
            }
        },
        {
            uiType: LcUI.UIImg, id: "MenuPage_UIImg_4", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '825px',
                'top': '180px',
                'height': '90px',
                'width': '90px',
                'position': 'absolute'
            }
        },
        {
            uiType: LcUI.UIImg, id: "MenuPage_UIImg_5", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '1055px',
                'top': '180px',
                'height': '90px',
                'width': '90px',
                'position': 'absolute'
            }
        },

        //第六张图片，隐藏图片
        {
            uiType: LcUI.UIImg, id: "MenuPage_UIImg_6", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '1285px',
                'top': '180px',
                'height': '90px',
                'width': '90px',
                'position': 'absolute'
            }
        },
        {
            uiType: LcUI.UIImg, id: "MenuPage_UIImg_subblack", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '318px',
                'top': '380px',
                'height': '226px',
                'width': '644px',
                'position': 'absolute',
            },
            src: './img/main_subblack.png'
        },

        //第三项
        {
            uiType: LcUI.UILabel, id: "MenuPage_UILabel_subName0", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '465px',
                'top': '300px',
                'position': 'absolute',
                'height': '70px',
                'width': '350px',
                'line-height': '70px',
                'text-align': 'center',
                'font-size': '30px',
                'color': '#fed600'
            },
        },
        {
            uiType: LcUI.UILabel, id: "MenuPage_UILabel_subName1", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '720px',
                'top': '280px',
                'position': 'absolute',
                'height': '40px',
                'width': '300px',
                'line-height': '40px',
                'text-align': 'center',
                'font-size': '25px',
                'color': 'white'
            },
        },
        {
            uiType: LcUI.UILabel, id: "MenuPage_UILabel_subName2", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '950px',
                'top': '280px',
                'position': 'absolute',
                'height': '40px',
                'width': '300px',
                'line-height': '40px',
                'text-align': 'center',
                'font-size': '25px',
                'color': 'white'
            },
        },

        //第六项，隐藏项
        {
            uiType: LcUI.UILabel, id: "MenuPage_UILabel_subName3", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '1180px',
                'top': '280px',
                'position': 'absolute',
                'height': '40px',
                'width': '300px',
                'line-height': '40px',
                'text-align': 'center',
                'font-size': '25px',
                'color': 'white',
                'display': 'none'
            },
        },

        //第一项
        {
            uiType: LcUI.UILabel, id: "MenuPage_UILabel_subName4", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '30px',
                'top': '280px',
                'position': 'absolute',
                'height': '40px',
                'width': '300px',
                'line-height': '40px',
                'text-align': 'center',
                'font-size': '25px',
                'color': 'white'
            },
        },
        {
            uiType: LcUI.UILabel, id: "MenuPage_UILabel_subName5", focusStop: false, onFocus: false,
            cssAttr: {
                'left': '260px',
                'top': '280px',
                'position': 'absolute',
                'height': '40px',
                'width': '300px',
                'line-height': '40px',
                'text-align': 'center',
                'font-size': '25px',
                'color': 'white'
            },
        }
    ];


    this.start = function () {
        self.imgWin = [];
        self.subNameWin = [];
        self.subBoxWin = LcUI.UI.createGroup(this.subBoxParams, this.win, null);

        for (var i = 0; i < 7; i++) {
            self.imgWin[i] = self.win.getChild("MenuPage_UIImg_" + i);
        }
        for (var i = 0; i < 6; i++) {
            self.imgWin[i].setSrc("./img/" + self.imgSrc[i]);
        }
        self.imgWin[6].setSrc("./img/" + self.imgSrc[0]);

        for (var i = 0; i < 6; i++) {
            self.subNameWin[i] = self.win.getChild("MenuPage_UILabel_subName" + i);
        }

        self.addSubName();
        self.addSub();

        console.log("" + self.win.id + " start!");
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

    this.ImgMove = function (cb, d) {
        for (var i = 0; i < 6 && d > 0; i++) {
            if (i == 5) {
                self.imgWin[i].startAnimate({left: "+=230px"}, 100, cb);
            }
            else {
                self.imgWin[i].startAnimate({left: "+=230px"}, 100, null);
            }
        }

        for (var i = 1; i < 7 && d < 0; i++) {
            if (i == 6) {
                self.imgWin[i].startAnimate({left: "-=230px"}, 100, cb);
            }
            else {
                self.imgWin[i].startAnimate({left: "-=230px"}, 100, null);
            }
        }


    };

    this.ImgNarrow = function (cb) {
        if (self.isAnimate) {
            return;
        } else {
            self.isAnimate = true;
        }

        self.imgWin[3].startAnimate({
            top: "+=30px",
            left: "+=30px",
            height: "-=50px",
            width: "-=50px"
        }, 100, cb);
    };


    this.ImgEnlarge = function (cb) {
        this.imgWin[3].startAnimate({
            top: "-=30px",
            left: "-=30px",
            height: "+=50px",
            width: "+=50px"
        }, 100, cb);
    };

    this.ImgExchange = function (d) {
        if (d > 0) {
            self.imgWin[6].setSrc(self.imgWin[5].getSrc());

            self.imgWin[6].getElement().css("left", "-95px");

            var temp = self.imgWin[6];

            self.imgWin.pop();

            self.imgWin.splice(0, 0, temp);
        }
        else {
            self.imgWin[0].setSrc(self.imgWin[1].getSrc());

            self.imgWin[0].getElement().css("left", "1285px");

            var temp = self.imgWin[0];

            self.imgWin.splice(0, 1);

            self.imgWin.push(temp);
        }
    };

    this.addSubName = function () {
        var j = self.menuIndex;
        for (var i = 0; i < 6; i++, j++) {
            if (j >= 6) {
                j = 0;
            }
            self.subNameWin[i].setValue(mits[j].name);
        }
    }


    this.subBoxParams = [
        {
            uiType: LcUI.UIFrame, id: "SubDialogBox", focusStop: false, onFocus: false, focusMove: true,
            cssAttr: {
                'position': 'absolute',
                'left': '318px',
                'top': '380px',
                'height': '226px',
                'width': '644px'
            }
        }
    ];

    this.delSub = function () {
        //check
        if (self.subWin) {
            self.subWin.destroy();
            self.subWin = null;
        }
    };

    this.addSub = function () {
        //check
        if (self.subWin) {
            self.subWin.destroy();
            self.subWin = null;
        }

        this.subParams = [
            {
                uiType: LcUI.UIFrame, id: "SubDialog", focusStop: false, onFocus: false, focusMove: true,
                cssAttr: {
                    'position': 'relative',
                    'top': '50%',
                    'transform': 'translateY(-50%)',
                    'over-flow': 'hidden',
                    'margin': '0px auto',
                }
            }
        ];

        for (var i = 0; i < mits[self.menuIndex].items.length; i++) {
            var label = {
                uiType: LcUI.UILabel,
                id: "MenuPage_UILabel_sub" + i,
                focusStop: true,
                onFocus: false,
                cssAttr: {
                    'position': 'relative',
                    'height': '71px',
                    'width': '349px',
                    'line-height': '71px',
                    'text-align': 'center',
                    'font-size': '21px',
                    'margin': '-30px auto'
                },
                styleClass: {
                    focus: "subfocus",
                    normal: "subnormal"
                },
                value: mits[self.menuIndex].items[i].name,
                proc: self.subOnkey
            };

            if (i == 0) {
                label.cssAttr.margin = "0px auto";
                label.onFocus = true;
            }

            if ((i + 1) < mits[self.menuIndex].items.length) {
                label.nextFocusDown = "MenuPage_UILabel_sub" + (i + 1);
            }
            else {
                label.nextFocusDown = "MenuPage_UILabel_sub" + (0);
            }


            if (i > 0) {
                label.nextFocusUp = "MenuPage_UILabel_sub" + (i - 1);
            }
            else {
                label.nextFocusUp = "MenuPage_UILabel_sub" + (mits[self.menuIndex].items[i].length - 1);
            }

            this.subParams.push(label);
        }

        self.subWin = LcUI.UI.createGroup(this.subParams, self.subBoxWin, null);

    }

    this.subOnkey = function (e) {
        var ret = false;
        switch (e.keyCode) {
            case LcUI.UI.KEY.LEFT:
                self.ImgNarrow(function () {
                    self.subExchange(1);
                    //self.delSub();
                    self.addSub();
                    self.ImgMove(function () {
                        self.addSubName();
                        self.ImgExchange(1);
                        self.ImgEnlarge(function () {
                            self.isAnimate = false;
                        });
                    }, 1);
                });
                ret = true;
                break;
            case LcUI.UI.KEY.RIGHT:
                self.ImgNarrow(function () {
                    self.subExchange(-1);
                    //self.delSub();
                    self.addSub();
                    self.ImgMove(function () {
                        self.addSubName();
                        self.ImgExchange(-1);
                        self.ImgEnlarge(function () {
                            self.isAnimate = false;
                        });
                    }, -1);
                });
                ret = true;
                break;
            case LcUI.UI.KEY.ENTER:
                self.subIndex = self.win.getFocusWin().id;
                self.subIndex = self.subIndex.charAt(self.subIndex.length - 1);
                if (mits[self.menuIndex].items[self.subIndex].target) {
                    self.go(mits[self.menuIndex].items[self.subIndex].target, MenuPage, null, "hide");
                }
                ret = true;
                break;
        }
        return ret;
    };

    this.subExchange = function (d) {
        if (d > 0) {
            if (self.menuIndex > 0) {
                self.menuIndex--;
            }
            else {
                self.menuIndex = mits.length - 1;
            }
        }
        else {
            if (self.menuIndex < (mits.length - 1)) {
                self.menuIndex++;
            }
            else {
                self.menuIndex = 0;
            }
        }
    }

    this.onkey = function (e) {
        if (e.keyCode == 51) {
            this.go(TestPage, TestPage1, null, "hide");
        }
        else if (e.keyCode == 189) {
            var table = self.win.getChild("TestPage1_UITable_testTable");
            table.stopAnimate(true, false);
        }
        return false;
    };

}

MenuPage.prototype = new LcUI.UIModule();