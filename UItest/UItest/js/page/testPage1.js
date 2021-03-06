function TestPage1(params, srcModule) {
    var self = this;
    this.dlgParam = [
        {
            uiType: UIFrame, id: "TestPage1", focusStop: true, onFocus: false, focusMove: true,
            attr: {
                'left': '0',
                'top': '0',
                'height': '720px',
                'width': '1280px',
                'background': 'grey'
            }
        },
        {
            uiType: UITable,
            onFocus: false,
            rowsOnePage: 5,
            cols: 4,
            rows: 18,
            curIndex: 0,
            marquee: true,
            isFocusMove: false,
            id: "TestPage1_UITable_testTable",
            attr: {
                'left': '80px',
                'top': '20px',
                'border-collapse': 'collapse',
                "border": "3px solid blue",

            },
            tdWidth: ["50px", "50px", "50px", "100px"],
            styleClass: {
                tr: {},
                td: {
                    'display': 'inline-block',
                    'width': '80px',
                    'height': '30px',
                    'line-height': '30px',
                    'vertical-align': 'middle',
                    'text-align': 'right',
                    'overflow': 'hidden',
                    "border-right": "1px solid blue",
                    "border-bottom": "1px solid blue",
                },

                foucsTr: {
                    'background-image': "url('img/channelList_markselected.png')",
                    'color': 'yellow'
                },
                normalTr: {
                    'background-image': "none",
                    'color': 'white'
                },
                focus: {
                    "border": "3px solid yellow",
                },
                normal: {
                    "border": "3px solid blue",
                }
            },
            value: [["12343456789", 1, 1, 1], ["11223344556677", 2, 2, 2], ["aabbccddeeffggkk", 3, 3, 3], [4, 4, 4, 4], [5, 5, 5, 5], [6, 6, 6, 6], [7, 7, 7, 7], [8, 8, 8, 8], [9, 9, 9, {
                type: 'img',
                src: 'img/ico_fu12.png'
            }],
                [0, 1, 1, 1], [0, 2, 2, 2], [0, 3, 3, 3], [0, 4, 4, 4], [0, 5, 5, 5], [0, 6, 6, 6], [0, 7, 7, 7], [0, 8, 8, 8], [0, 9, 9, {
                    type: 'img',
                    src: 'img/ico_fu12.png'
                }]]

        },
        {
            uiType: UILabel,
            id: "text5",
            focusStop: true,
            onFocus: true,
            marquee: false,
            isFocusMove: true,
            attr: {
                'left': '700px',
                'top': '100px',
                'width': "300px",
                'height': '100px',
                'font-size': '50px',
                'overflow': 'scroll',
                'word-wrap': 'break-word',
                'overflow-x': 'hidden'
            },
            styleClass: {
                focus: "TextFocus",
                normal: "TextNormal"
            },
            proc: function (e) {
                return false;
            },
            value: "1234567899999999sssss",
        },

        {
            uiType: UIButton,
            id: "bt1",
            focusStop: true,
            onFocus: false,
            attr: {
                'left': '100px',
                'top': '400px',
                'height': '80px',
                'width': '480px',
                'font-size': '30px',
                'line-height': '80px',
                'text-align': 'center'
            },
            styleClass: {
                focus: {
                    'background-image': "url('img/bt_onfocus.png')",
                    'color': '#6798FF'
                },
                normal: {
                    'background-image': "url('img/bt_normal.png')",
                    'color': 'white'
                }
            },
            proc: function (e) {
                if (e.keyCode == UI.KEY.ENTER) {
                    if (self.win.getChild("text5").visibility) {
                        self.win.getChild("text5").hide();
                    }
                    else {
                        self.win.getChild("text5").show();
                    }
                    return true;
                }
                return false;
            },
            value: "button",
        },

        {
            uiType: UIEdit,
            id: "UIEdit1password",
            focusStop: true,
            onFocus: false,
            "password": false,
            attr: {

                'font-size': '30px',
                'line-height': '100px',
                'text-align': 'center',
                'left': '350px',
                'top': '500px',
                'padding-top': '10px',
                'height': '110px',
                'width': '720px'
            },
            styleClass: {
                focus: {
                    'background-image': "url('img/select_onfocus.png')",
                    'background-size': 'cover',
                    'color': '#6798FF'
                },
                normal: {
                    'background-image': "url('img/select_normal.png')",
                    'background-size': 'cover',
                    'color': 'white'
                }
            },
            value: "6875",
        },
        {
            uiType: UISelect,
            id: "select1",
            focusStop: true,
            onFocus: false,
            attr: {
                'font-size': '30px',
                'line-height': '80px',
                'text-align': 'center',
                'left': '550px',
                'top': '400px',
                'height': '80px',
                'width': '480px'
            },
            styleClass: {
                focus: {
                    'background-image': "url('img/select_onfocus.png')",
                    'color': '#6798FF'
                },
                normal: {
                    'background-image': "url('img/select_normal.png')",
                    'color': 'white'
                }
            },
            index: 1,
            value: ["111", "222", "333"]
        },
        {
            uiType: UIProgress,
            id: "UIProgress",
            onFocus: false,
            attr: {
                'left': '150px',
                'top': '600px',
                'height': '60px',
                'width': '480px',
                'overflow': 'hidden'
            },
            styleClass: {
                background: {
                    'padding': '2px',
                    'background-color': 'white'
                },
                progress: {
                    'height': '60px',
                    'line-height': '62px',
                    'text-align': 'center',
                    'background-color': 'rgba(123,23,211,0.4)'
                }
            },
            value: 30
        },
        {
            uiType: UIScrollBar,
            id: "UIScrollBar",
            onFocus: false,
            scrollType: "V",
            curIndex: 45,
            totalNum: 100,
            onePageNum: 10,
            attr: {
                'left': '900px',
                'top': '300px',
                'height': '300px',
                'width': '10px',
            },
            styleClass: {
                background: {
                    'padding': '2px',
                    'border': '1px solid yellow',
                    'background-color': 'white'
                },
                scroll: {
                    'height': '10px',
                    'background-color': 'red'
                }
            },
            value: 30
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
        if (e.keyCode == 51) {
            this.go(TestPage, TestPage1, null, null);
        }
        return false;
    };

}

TestPage1.prototype = new UIModule();