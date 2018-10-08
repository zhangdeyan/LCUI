function FileBrowserPage(params, srcModule) {
    var self = this;
    // constructor
    console.log("FileBrowserPage constructed.");
    // Constructed end

    var languageEng = {
        fbro: "File Browser",
        no: "No.",
        type: "Type",
        name: "Name",
        move: "Move",
        select: "Select",
        prev: "Prev"
    };

    this.dlgParam = [
        {
            uiType: LcUI.UIFrame, id: "FileBrowserPage", focusStop: true, onFocus: false, focusMove: true,
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
            id: "FileBrowserPage_UIImg_new_filebroswerIcon",
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
            src: './img/new_filebroswerIcon.png',
        },
        {
            uiType: LcUI.UILabel,
            id: "FileBrowserPage_UILabel_fbro",
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
            value: languageEng.fbro,
        },
        {
            uiType: LcUI.UIImg,
            id: "FileBrowserPage_UIImg_TableBackground",
            focusStop: false,
            onFocus: false,
            marquee: false,
            cssAttr: {
                'position': 'absolute',
                'left': '85px',
                'top': '145px',
                'width': '1120px',
                'height': '460px',
                'overflow': 'hidden'
            },
            src: './img/dialog_bg.png',
        },
        {
            uiType: LcUI.UITable,
            onFocus: false,
            rowsOnePage: 1,
            cols: 4,
            rows: 1,
            curIndex: 0,
            marquee: false,
            isFocusMove: false,
            id: "FileBrowserPage_UITable_titleTable",
            cssAttr: {
                'position': 'absolute',
                'left': '100px',
                'top': '145px',
                'border-collapse': 'collapse',
                'border-radius': '10px'
            },
            tdWidth: ["170px", "170px", "170px", "570px"],
            styleClass: {
                tr: {},
                td: {
                    'display': 'inline-block',
                    'height': '55px',
                    'line-height': '55px',
                    'vertical-align': 'middle',
                    'text-align': 'left',
                    'overflow': 'hidden',
                    'font-size': '25px',
                    'color': '#1C86EE'
                },
            },
            value: [[languageEng.no, languageEng.type, languageEng.name, ""]]
        },
        {
            uiType: LcUI.UITable,
            onFocus: true,
            rowsOnePage: 7,
            cols: 6,
            rows: 0,
            curIndex: 0,
            marqueeCol: 2,
            marquee: true,
            isFocusMove: false,
            scrollId: "FileBrowserPage_UIScrollBar_fileTableScrollBar",
            id: "FileBrowserPage_UITable_fileTable",
            cssAttr: {
                'position': 'absolute',
                'left': '100px',
                'top': '200px',
                'background-color': '#104E8B',
                'background-size': '385px 1110px',
                'border-collapse': 'collapse'
            },
            tdWidth: ["170px", "170px", "170px", "170px", "170px", "170px"],
            styleClass: {
                tr: {},
                td: {
                    'display': 'inline-block',
                    'height': '55px',
                    'line-height': '55px',
                    'vertical-align': 'middle',
                    'text-align': 'left',
                    'overflow': 'hidden',
                    "border-right": "1px solid white",
                    "border-bottom": "1px solid white",
                    'font-size': '20px',
                    'color': 'white',
                    'max-width': '170px',
                },

                foucsTr: {
                    'background-color': "black",
                },
                normalTr: {
                    'background-color': "#104E8B",
                    'color': 'white'
                },
                focus: {
                    "border": "1px solid white",
                },
                normal: {
                    "border": "3px solid blue",
                }
            },
        },
        {
            uiType: LcUI.UIScrollBar,
            id: "FileBrowserPage_UIScrollBar_fileTableScrollBar",
            onFocus: false,
            scrollType: "V",
            curIndex: 0,
            totalNum: 100,
            onePageNum: 7,
            cssAttr: {
                'position': 'absolute',
                'left': '1180px',
                'top': '200px',
                'height': '395px',
                'width': '7px',
                'border-radius': '5px'
            },
            styleClass: {
                background: {
                    'margin': '2px',
                    'background-color': 'gray'
                },
                scroll: {
                    'border-radius': '5px',
                    'background-color': 'white'
                }
            },
            value: 30
        },
        {
            uiType: LcUI.UIImg,
            id: "FileBrowserPage_UIImg_move",
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
            id: "FileBrowserPage_UILabel_Move",
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
            id: "FileBrowserPage_UIImg_select",
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
            id: "FileBrowserPage_UILabel_select",
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
            id: "FileBrowserPage_UIImg_prev",
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
            id: "FileBrowserPage_UILabel_Prev",
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

        self.fileTableWin = self.win.getChild("FileBrowserPage_UITable_fileTable");

        var tableValue = [];
        var trValue = [];
        var j = 0;
        self.icon = ["ico_bao.png", "ico_cheng.png", "ico_fu12.png", "ico_fu15.png", "ico_hu.png", "ico_pu.png"];
        for (var i = 0; i < 200; i++) {
            trValue = [i, "a" + i, "q123456789abcdefghABCDEFGH", "c" + i, "d" + i, {
                type: 'img',
                src: 'img/level/' + self.icon[j]
            }];
            if (j < 5) {
                j++;
            }
            else {
                j = 0;
            }
            tableValue.push(trValue);
        }

        self.fileTableWin.addItems(tableValue);
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

FileBrowserPage.prototype = new LcUI.UIModule();