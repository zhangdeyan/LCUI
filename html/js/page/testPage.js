function TestPage(params, srcModule) {
    this.dlgParam = [
        {
            uiType: LcUI.UIFrame, id: "TestPage", focusStop: true, onFocus: false, focusMove: true,
            cssAttr: {
                'left': '0',
                'top': '0',
                'height': '720px',
                'width': '1280px',
                'background': 'grey'
            }
        },
        {
            uiType: LcUI.UITable,
            onFocus: false,
            rowsOnePage: 5,
            cols: 4,
            rows: 18,
            curIndex: 0,
            marquee: true,
            isFocusMove: false,
            id: "TestPage1_UITable_testTable",
            cssAttr: {
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
                [0, 1, 1, 1], [0, 2, 2, 2], [0, 3, 3, 3], [0, 4, 4, 4], [0, 5, 5, 5], [0, 6, 6, 6], [0, 7, 7, 7], [0, 8, 8, 8], [0, 9, 9,
                    {
                    type: 'img',
                    src: 'img/ico_fu12.png'
                }]]
        }
    ];


    this.subBoxParams = [
        {
            uiType: LcUI.UIFrame, id: "SubDialogBox", focusStop: false, onFocus: false, focusMove: true,
            cssAttr: {
                'position': 'absolute',
                'left': '390px',
                'top': '210px',
                'height': '300px',
                'width': '500px',
                'border': '1px solid black',
            }
        }
    ];

    this.subParams = [
        {
            uiType: LcUI.UIFrame, id: "SubDialog", focusStop: false, onFocus: false, focusMove: true,
            cssAttr: {
                'position': 'relative',
                'top': '50%',
                'width': '300px',
                'transform': 'translateY(-50%)',
                'border': '1px solid yellow',
                'over-flow': 'hidden',
                'margin': '0px auto',
            }
        }
    ];

    this.start = function () {
        for (var i = 0; i < 6; i++) {
            var label = {
                uiType: LcUI.UILabel,
                id: "text" + i,
                focusStop: true,
                onFocus: true,
                cssAttr: {
                    'position': 'relative',
                    'text-align': 'center',
                    'font-size': '20px',
                    'margin': '10px auto'
                },
                styleClass: {
                    focus: {
                        'border': '2px solid yellow'
                    },
                    normal: {
                        'border': '2px solid blue'
                    }
                },
                value: "application" + i,
            };

            if ((i + 1) < 6) {
                label.nextFocusDown = "text" + (i + 1);
            }
            else {
                label.nextFocusDown = "text" + (0);
            }


            if (i > 0) {
                label.nextFocusUp = "text" + (i - 1);
            }
            else {
                label.nextFocusUp = "text" + (4);
            }

            this.subParams.push(label);
        }

        var subBoxWin = LcUI.UI.createGroup(this.subBoxParams, this.win, null);

        var subWin = LcUI.UI.createGroup(this.subParams, subBoxWin, null);

        console.log("okey in :" + this.win._name);
    };


    this.open = function () {
        this.defOpen();
    };


    this.stop = function () {

    };


    this.close = function () {
        this.defClose();
    };

    this.onkey = function (e) {
        if (e.keyCode == 51) {
            this.go(TestPage1);
        }
        return false;
    };
}

TestPage.prototype = new LcUI.UIModule();