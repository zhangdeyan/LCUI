function AvSettingPage(params, srcModule) {
    var self = this;
    // constructor
    console.log("AvSettingPage constructed.");
    // Constructed end

    var languageEng = {
        avs: "AV  Setting",
        scrRa: "Screen Ratio",
        aspRa: "Aspect Ratio",
        audFm: "Audio format",
        volCt: "Volume Control",
        vieMd: "Video Mode",
        auto: "Auto",
        Pan_scan: "Pan&Scan",
        comb: "Combined",
        sigle: "Single",
        gob: "Global",
        move: "Move",
        select: "Select",
        prev: "Prev"
    };

    this.dlgParam = [
        {
            uiType: LcUI.UIFrame, id: "AvSettingPage", focusStop: true, onFocus: false, focusMove: true,
            cssAttr: {
                'left': '0',
                'top': '0',
                'height': '720px',
                'width': '1280px',
                'position': 'absolute',
                'background-image': 'url(./img/new_background_tip.png)'
            }
        },
        {
            uiType: LcUI.UIImg,
            id: "AvSettingPage_UIImg_informationIcon",
            focusStop: false,
            onFocus: false,
            marquee: false,
            cssAttr: {
                'position': 'absolute',
                'left': '75px',
                'top': '60px',
                'width': '80px',
                'overflow': 'hidden',
            },
            src: './img/new_informationIcon.png',
        },
        {
            uiType: LcUI.UILabel,
            id: "AvSettingPage_UILabel_AvSetting",
            focusStop: false,
            onFocus: false,
            marquee: false,
            cssAttr: {
                'position': 'absolute',
                'left': '180px',
                'top': '90px',
                'width': '200px'
            },
            cssClass: 'font_title',
            value: languageEng.avs,
        },
        {
            uiType: LcUI.UILabel,
            id: "AvSettingPage_UILabel_ScreenRatio",
            focusStop: false,
            onFocus: false,
            marquee: false,
            cssAttr: {
                'top': '170px'
            },
            cssClass: 'selectTxt',
            value: languageEng.scrRa,
        },
        {
            uiType: LcUI.UILabel,
            id: "AvSettingPage_UILabel_AspectRatio",
            focusStop: false,
            onFocus: false,
            marquee: false,
            cssAttr: {
                'top': '250px'
            },
            cssClass: 'selectTxt',
            value: languageEng.aspRa,
        },
        {
            uiType: LcUI.UILabel,
            id: "AvSettingPage_UILabel_AudioFormat",
            focusStop: false,
            onFocus: false,
            marquee: false,
            cssAttr: {
                'top': '330px'
            },
            cssClass: 'selectTxt',
            value: languageEng.audFm,
        },
        {
            uiType: LcUI.UILabel,
            id: "AvSettingPage_UILabel_VolumeControl",
            focusStop: false,
            onFocus: false,
            marquee: false,
            cssAttr: {
                'top': '410px'
            },
            cssClass: 'selectTxt',
            value: languageEng.volCt,
        },
        {
            uiType: LcUI.UILabel,
            id: "AvSettingPage_UILabel_VideoMode",
            focusStop: false,
            onFocus: false,
            marquee: false,
            cssAttr: {
                'top': '490px'
            },
            cssClass: 'selectTxt',
            value: languageEng.vieMd,
        },
        {
            uiType: LcUI.UISelect,
            id: "AvSettingPage_UISelect_ScreenRatio",
            focusStop: true,
            onFocus: true,
            cssAttr: {
                'top': '155px'
            },
            cssClass: 'select ',
            styleClass: {
                focus: {
                    'background-image': "url('./img/select_onfocus.png')",
                    'color': '#6798FF'
                },
                normal: {
                    'background-image': "url('./img/select_normal.png')",
                    'color': 'white'
                }
            },
            index: 1,
            value: ["Auto", "4:3", "16:9"]
        },
        {
            uiType: LcUI.UISelect,
            id: "AvSettingPage_UISelect_AspectRatio",
            focusStop: true,
            onFocus: false,
            cssAttr: {
                'top': '235px'
            },
            cssClass: 'select',
            styleClass: {
                focus: {
                    'background-image': "url('./img/select_onfocus.png')",
                    'color': '#6798FF'
                },
                normal: {
                    'background-image': "url('./img/select_normal.png')",
                    'color': 'white'
                }
            },
            index: 1,
            value: ["Combined", "Pan&Scan"]
        },
        {
            uiType: LcUI.UISelect,
            id: "AvSettingPage_UISelect_AudioFormat",
            focusStop: true,
            onFocus: false,
            cssAttr: {
                'top': '315px'
            },
            cssClass: 'select',
            styleClass: {
                focus: {
                    'background-image': "url('./img/select_onfocus.png')",
                    'color': '#6798FF'
                },
                normal: {
                    'background-image': "url('./img/select_normal.png')",
                    'color': 'white'
                }
            },
            index: 1,
            value: ["MPEG2", "MPEG2"]
        },
        {
            uiType: LcUI.UISelect,
            id: "AvSettingPage_UISelect_VolumeControl",
            focusStop: true,
            onFocus: false,
            cssAttr: {
                'top': '395px'
            },
            cssClass: 'select',
            styleClass: {
                focus: {
                    'background-image': "url('./img/select_onfocus.png')",
                    'color': '#6798FF'
                },
                normal: {
                    'background-image': "url('./img/select_normal.png')",
                    'color': 'white'
                }
            },
            index: 1,
            value: ["Global", "Single"]
        },
        {
            uiType: LcUI.UISelect,
            id: "AvSettingPage_UISelect_VideoMode",
            focusStop: true,
            onFocus: false,
            cssAttr: {
                'top': '475px'
            },
            cssClass: 'select',
            styleClass: {
                focus: {
                    'background-image': "url('./img/select_onfocus.png')",
                    'color': '#6798FF'
                },
                normal: {
                    'background-image': "url('./img/select_normal.png')",
                    'color': 'white'
                }
            },
            index: 1,
            value: ["1080P@50", "480P@60", "576P@50", "720P@50", "720P@60", "1080I@50", "1080I@50"]
        },
        {
            uiType: LcUI.UIImg,
            id: "AvSettingPage_UIImg_move",
            focusStop: false,
            onFocus: false,
            marquee: false,
            src: './img/new_move.png',
            cssAttr: {
                'position': 'absolute',
                'left': '75px',
                'top': '630px',
                'width': '40px',
                'height': '40px',
                'overflow': 'hidden'
            },
        },
        {
            uiType: LcUI.UILabel,
            id: "AvSettingPage_UILabel_Move",
            focusStop: false,
            onFocus: false,
            marquee: false,
            cssAttr: {
                'position': 'absolute',
                'left': '125px',
                'top': '635px',
                'width': '200px',
            },
            cssClass: 'font_content',
            value: [languageEng.move],
        },
        {
            uiType: LcUI.UIImg,
            id: "AvSettingPage_UIImg_select",
            focusStop: false,
            onFocus: false,
            marquee: false,
            src: './img/new_select.png',
            cssAttr: {
                'position': 'absolute',
                'left': '270px',
                'top': '630px',
                'width': '40px',
                'height': '40px',
                'overflow': 'hidden'
            },
        },
        {
            uiType: LcUI.UILabel,
            id: "AvSettingPage_UILabel_select",
            focusStop: false,
            onFocus: false,
            marquee: false,
            cssAttr: {
                'position': 'absolute',
                'left': '320px',
                'top': '635px',
                'width': '200px',
            },
            cssClass: 'font_content',
            value: languageEng.select,
        },
        {
            uiType: LcUI.UIImg,
            id: "AvSettingPage_UIImg_prev",
            focusStop: false,
            onFocus: false,
            marquee: false,
            src: './img/new_prev.png',
            cssAttr: {
                'position': 'absolute',
                'left': '470px',
                'top': '630px',
                'width': '40px',
                'height': '40px',
                'overflow': 'hidden'
            },
        },
        {
            uiType: LcUI.UILabel,
            id: "AvSettingPage_UILabel_Prev",
            focusStop: false,
            onFocus: false,
            marquee: false,
            cssAttr: {
                'position': 'absolute',
                'left': '520px',
                'top': '635px',
                'width': '200px',
            },
            cssClass: 'font_content',
            value: languageEng.prev,
        }
    ];


    this.start = function () {
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

    this.onkey = function (e) {
        if (e.keyCode == 8) {
            self.go(srcModule);
        }
    };

}

AvSettingPage.prototype = new LcUI.UIModule();