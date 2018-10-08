LcUI = {};

LcUI.UI = {
    version: "2.0.1",
    KEY: {
        POWER: 0xe0035,
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        ENTER: 13,

        BACKSPACE: 0x08,
        MENU: 0xe0033,
        LIVETV: 27,

        RECORD: 0xe0017,
        EPG: 0xe0110,
        PVR: 0xe0114,
        MUTE: 0xe00f0,
        PLAY: 0xe0010,
        STOP: 0xe0011,

        LANG: 0xe0200,
        INFO: 0xe0034,

        CHAR0: 48,
        CHAR1: 49,
        CHAR2: 50,
        CHAR3: 51,
        CHAR4: 52,
        CHAR5: 53,
        CHAR6: 54,
        CHAR7: 55,
        CHAR8: 56,
        CHAR9: 57,

        CHNUP: 0xe0030,
        CHNDOWN: 0xe0031,
        VOLUP: 0xe00f3,
        VOLDOWN: 0xe00f4,

        FUNRED: 0xe0000,
        FUNGREEN: 0xe0001,
        FUNYELLOW: 0xe0002,
        FUNBLUE: 0xe0003,

        EDIT_VALUE_CHANGE: 0x1000001,
        SELECT_VALUE_CHANGE: 0x1000002
    },

    "width": 1280,
    "height": 720,
    "modules": [],
    "lastModule": null,

    "layerNum": 3,
    "rootWin": [],
    "focusWin": [],
    "dlgWin": [null, null],

    "getRoot": function (id) {
        if (!id) id = 1;
        return UI.rootWin[id];
    },

    "onKey": function (e) {

        var ret = false;

        LcUI.UI.lastKeyCode = e.keyCode;

        //先从rootWin最上层开始传递事件
        var i = LcUI.UI.layerNum;
        while (i) {
            var fsw = LcUI.UI.focusWin[i - 1];

            if (fsw && !ret) {
                ret = fsw.onkey(e);
            }
            i--;
        }

        return ret;
    },

    "gmodules": {},

    "getCurModule": function () {
        return LcUI.UI.lastModule;
    },

    "clearScreen": function () {

    },

    "start": function (cb) {

        for (var i = 0; i < LcUI.UI.layerNum; i++) {
            var p = {
                uiType: LcUI.UIFrame,
                id: "root" + i,
                focusStop: false,
                onFocus: false,
                attr: {
                    'position': 'absolute',
                    'left': '0',
                    'top': '0',
                    'height': '720px',
                    'width': '1280px',
                },
                parentId: "body"
            };
            LcUI.UI.rootWin[i] = new LcUI.UIFrame(p);
            LcUI.UI.focusWin[i] = LcUI.UI.rootWin[i];
        }

        document.onkeydown = function (e) {

            console.log(e.keyCode + " start.");

            LcUI.UI.onKey(e);

            console.log(e.keyCode + " end.");
        };

        if (cb) {
            cb();
        }
    },

    "createGroup": function (obj, parent, proc) {

        var arr = obj;

        var id = [];

        if (arr && arr.length > 0) {

            for (var i = 0; i < arr.length; i++) {
                //1. set parent for win
                if (i == 0) {
                    arr[0].parent = parent;
                }
                else {
                    arr[i].parent = arr[0];
                    arr[i].focusMove = arr[0].focusMove;
                }

                //2. create win
                id[i] = new arr[i].uiType(arr[i]);

                //3. attach win to parent
                if (i == 0) {
                    if (parent) {
                        id[0].attach(parent);
                    }
                    else {
                        if (LcUI.UI.rootWin[0]) {
                            id[0].attach(LcUI.UI.rootWin[0]);
                        }
                    }
                }
                else {
                    id[i].attach(id[0]);
                }

            }

            if (proc) id[0].proc = proc;
        }

        return id[0];
    },
    "mix": function (child, parent) {
        for (var property in parent) {
            console.log("property:" + property);
            child.prototype[property] = parent[property];
        }
    }
};

LcUI.UIModule = function () {
    this.open = function () {
        this.defOpen();
    };
    this.close = function () {
        this.defClose();
    };
    this.start = function () {
    };
    this.stop = function () {
    };
    this.resume = function () {
    };
    this.pause = function () {
    };

    this.hideModule = function () {
        if (this.win) {
            this.win.hide();
            if (this.win.isAncestor(this.win.getFocusWin())) {
                this.saveFocusWin = this.win.getFocusWin();
            }
        }
    };

    this.showModule = function () {
        if (this.win) {
            this.win.show();
            if (!this.win.isAncestor(this.win.getFocusWin())) {
                if (this.saveFocusWin) {
                    this.saveFocusWin.setFocus(true);
                    this.saveFocusWin = null;
                }
                else {
                    this.win.setFocus(true);
                }
            }
        }
    };

    this.doGoOut = function (switcher, cb) {

        if (switcher.closeFlag == "hide") {
            this.pause();
            this.hideModule();
        } else {
            this.stop();
            this.close();
            if (this.win) {
                this.win.destroy();
                this.win = null;
            }
            if (LcUI.UI.gmodules[this.moduleName]) {
                LcUI.UI.gmodules[this.moduleName].moduleObj = null;
            }
        }
    };

    this.doGoIn = function (switcher, moduleName) {

        var ret = null;
        if (switcher.moduleClass) {

            var moduleName = switcher.moduleName;

            if (!moduleName) {
                moduleName = switcher.moduleClass.name;
            }

            var it = LcUI.UI.gmodules[moduleName];

            if (!it) {
                LcUI.UI.gmodules[moduleName] = {moduleName: moduleName, moduleClass: switcher.moduleClass};
                it = LcUI.UI.gmodules[moduleName];
            }

            if (!it.moduleObj) {

                it.moduleObj = new switcher.moduleClass(switcher.targetParams, switcher.srcModule);
                it.moduleName = moduleName;
                it.moduleObj.moduleName = moduleName;

                var md = it.moduleObj;

                md.moduleClass = switcher.moduleClass;

                md.open();
                md.start();

                if (!md.win.isAncestor(md.win.getFocusWin())) {
                    md.win.setFocus(true);
                }

                ret = md;

            } else {
                it.moduleObj.showModule();

                ret = it.moduleObj;

                it.moduleObj.resume();
            }

            LcUI.UI.lastModule = ret;
        }

        return ret;
    };

    this.goOut = function (switcher, cb) {
        var self = this;
        self.doGoOut(switcher);
        if (cb) {
            cb();
        }
    };

    this.goIn = function (switcher, cb) {

        var self = this;
        var it = self.doGoIn(switcher);

        if (cb) {
            cb();
        }
    };

    this.goEx = function (switcher, cb) {

        var self = this;
        self.goOut(switcher, function () {
            self.goIn(switcher, cb);
        });
    };


    this.go = function (moduleClass, srcModule, params, closeFlag, moduleName) {
        return this.goEx({
            moduleClass: moduleClass,
            srcModule: srcModule,
            targetParams: params,
            closeFlag: closeFlag,
            moduleName: moduleName
        });
    };

    this.defOpen = function () {
        var self = this;
        if (!this.win && this.checkId()) {
            this.win = LcUI.UI.createGroup(this.dlgParam, LcUI.UI.rootWin[0], function (e) {
                self.onkey(e);
            });
        }
    };

    this.defClose = function () {
        if (this.win) {
            this.win.detach();
        }
    };

    this.checkId = function () {
        var moduleName = this.moduleName;
        for (var i = 0; i < this.dlgParam.length; i++) {


            if (!this.dlgParam[i].id) {
                console.log("UIModule defOpen Error!(id: Params Not Existed.)");
                return false;
            }

            if ($('#' + this.dlgParam[i].id).length > 0) {
                console.log("UIModule defOpen Error!(id:" + this.dlgParam[i].id + ")" + "Has Existed.");
                return false;
            }

            if (i == 0 && moduleName != this.dlgParam[i].id) {
                console.log("UIModule defOpen Error!(First Id Is Not The ModuleName)");
                return false;
            }

            if (i > 0) {
                var str = this.dlgParam[i].id.split("_");
                if (str[0] != moduleName) {
                    console.log("UIModule defOpen Error!(First Part Of Id Is Not The ModuleName)");
                    return false;
                }

                if (str[1] != this.dlgParam[i].uiType.name) {
                    console.log("UIModule defOpen Error!(Second Part Of Id Is Not The UIType Name)");
                    return false;
                }
            }
        }
        return true;
    };
};

LcUI.LcTree = function () {

    this.parent = null;
    this.next = null;
    this.child = null;

    this.getParent = function () {
        return this.parent;
    };

    this.getFirstChild = function () {
        return this.child;
    };

    this.getRootId = function () {
        var parent = this;
        while (parent) {
            if (parent.id == "root0" || parent.id == "root1" || parent.id == "root2") {
                var str = parent.id;
                return parseInt(str[str.length - 1]);
            }
            parent = parent.parent;
        }
        return null;
    };

    this.attach = function (parent) {
        var child = null;

        if (this.parent) {
            this.detach();
        }

        if (parent && this.parent != parent) {
            this.next = null;
            this.parent = parent;

            this.element.appendTo("#" + parent.id);

            child = parent.child;

            if (!child) {
                parent.child = this;
            }
            else {
                while (child.next) {
                    child = child.next;
                }

                child.next = this;
            }
        }
    };

    this.detach = function () {
        var pchild = null;
        var parent = this.parent;

        if (parent) {
            pchild = parent.child;
            if (pchild == this) {
                parent.child = pchild.next;
            }
            else {
                while (pchild) {
                    if (pchild.next == this) {
                        pchild.next = this.next;
                        break;
                    }
                    pchild = pchild.next;
                }
            }
        }

        this.parent = null;
    };

    this.find = function (key, cmp, nome) {
        var pnode = null;

        var pcur = this;

        if (!nome && cmp(this, key)) {
            pnode = this;
        }
        else {
            pcur = pcur.child;
            while (pcur && !pnode) {
                if (cmp(pcur, key)) {
                    pnode = pcur;
                }
                else {
                    pnode = pcur.find(key, cmp);
                }

                pcur = pcur.next;
            }
        }

        return pnode;
    };

    this.findInChildren = function (key, cmp, flag) {
        var pnode = null;
        var pcur = this;

        if (key && cmp) {
            if (!flag) {
                if (cmp(pcur, key)) {
                    pnode = pcur;
                }
            }

            if (!pnode) {
                pcur = pcur.child;

                while (pcur) {
                    if (cmp(pcur, key)) {
                        pnode = pcur;
                        break;
                    }

                    pcur = pcur.next;
                }
            }

        }

        return pnode;
    }
};

LcUI.LcAnimate = function () {

    this.startAnimate = function (css, speed, cb) {

        if (this.getAnimateStatus()) {
            this.stopAnimate(true, true);
        }
        else {
            this.element.animate(css, speed, cb);
        }


    };

    this.stopAnimate = function (stopAll, goToEnd) {
        //stopAll:是否清空队列
        //goToEnd:是否到达末尾状态
        console.log("stopAnimate");
        this.element.stop(stopAll, goToEnd);
    };

    this.getAnimateStatus = function () {
        return this.element.is(":animated");
    };

};

LcUI.UIWm = function () {

    this.element = null;
    this.visibility = 1;
    this.focusMove = false;
    this.focusStop = true;
    this.onFocus = false;

    this.onFocusStyle = function () {
        if (this.styleClass && this.styleClass.focus) {
            if (typeof(this.styleClass.focus) == 'string') {
                if (typeof(this.styleClass.normal) == 'string' && this.element.hasClass(this.styleClass.normal)) {
                    this.removeClass(this.styleClass.normal);
                }
                this.setClass(this.styleClass.focus);
            }
            else if (typeof(this.styleClass.focus) == 'object') {
                this.setCssAttr(this.styleClass.focus);
            }
        }
    };

    this.onNormalStyle = function () {
        if (this.styleClass && this.styleClass.normal) {
            if (typeof(this.styleClass.normal) == 'string') {
                if (typeof(this.styleClass.focus) == 'string' && this.element.hasClass(this.styleClass.focus)) {
                    this.removeClass(this.styleClass.focus);
                }
                this.setClass(this.styleClass.normal);
            }
            else if (typeof(this.styleClass.normal) == 'object') {
                this.setCssAttr(this.styleClass.normal);
            }
        }
    };

    this.setFocus = function (value) {

        var rootId = this.getRootId();


        if (value && this.focusStop) {

            this.onFocus = true;

            if (LcUI.UI.focusWin[rootId] != this) {

                if (LcUI.UI.focusWin[rootId]) {
                    LcUI.UI.focusWin[rootId].setFocus(false);
                }
                LcUI.UI.focusWin[rootId] = this;
            }

            if (this.visibility < 0) {
                this.show();
            }

            if (typeof (this.onFocusStyle) == 'function') {
                this.onFocusStyle();
            }

            if (typeof (this.onFocusHandler) == 'function') {
                this.onFocusHandler();
            }

        }
        else {
            this.onFocus = false;

            if (typeof (this.onNormalStyle) == 'function') {
                this.onNormalStyle();
            }

            if (typeof (this.onNormalHandler) == 'function') {
                this.onNormalHandler();
            }
        }
    };

    this.getFocusWin = function () {
        var rootId = this.getRootId();
        return LcUI.UI.focusWin[rootId];
    };


    this.releaseFocus = function () {
        var rootId = this.getRootId();
        var ret = false;
        if (LcUI.UI.focusWin[rootId] == this) {
            this.setNormalStyle();
            //1.set focus to brother
            ret = this.brotherGetFocus({keyCode: LcUI.UI.KEY.LEFT});

            //2.set focus to parent
            if (!ret) {
                ret = this.parentGetFocus();
            }

            if (!ret) {
                LcUI.UI.focusWin[rootId] = null;
            }

        }
    };

    this.setClass = function (styleClass, element) {
        if (typeof (styleClass) == 'string') {
            if (element) {
                element.addClass(styleClass);
            }
            else {
                this.element.addClass(styleClass);
            }
        }
    };

    this.removeClass = function (styleClass, element) {
        if (typeof (styleClass) == 'string') {
            if (element) {
                element.removeClass(styleClass);
            }
            else {
                this.element.removeClass(styleClass);
            }
        }
    };

    this.setCssAttr = function (styleObject, element) {
        if (typeof (styleObject) == 'object') {
            if (element) {
                element.css(styleObject);
            }
            else {
                this.element.css(styleObject);
            }

        }
    };

    this.getCssAttr = function (key, element) {
        if (typeof (key) == 'string') {
            if (element) {
                return element.css(key);
            }
            else {
                return this.element.css(key);
            }
        }
        else {
            return null;
        }

    };

    this.show = function () {
        this.doShow();
    };

    this.doShow = function () {

        this.element.css('visibility', 'visible');
        this.visibility = 1;
    };

    this.doHide = function () {
        this.releaseFocus();
        this.element.css('visibility', 'hidden');
        this.visibility = 0;
    };

    this.hide = function () {
        this.doHide();
    };

    this.getVisibility = function () {
        return this.visibility;
    };

    this.onDestory = function () {
        console.log("onDestroy id:" + this.id);
    };

    this.isAncestor = function (t) {
        var ret = false;
        pcur = t;

        while (pcur) {
            if (pcur == this) {
                ret = true;
                break;
            }
            pcur = pcur.parent;
        }
        return ret;
    };

    this.proc = function (e) {
        return false
    };

    this.onkey = function (e) {

        var ret = false;

        //1: user define onkey event
        if (this.proc) {

            ret = this.proc(e);
        }

        //2: UIwin default onkey event
        if (this.defProc && !ret) {
            ret = this.defProc(e);
        }

        //3: Wm default moveFocus onkey event
        if (this.focusMove && this.defBaseProc && !ret) {
            ret = this.defBaseProc(e);
        }

        //4: send event to parent
        if (!ret) {
            var p = this.getParent();

            if (p) {
                ret = p.onkey(e);
            }
        }

        return ret;
    };

    this.defBaseProc = function (e) {

        var ret = false;

        switch (e.keyCode) {
            case LcUI.UI.KEY.ENTER:
                //child get focus
                if (this._name == "UIFrame") {
                    //ret = this.childGetFocus(e);
                }
                break;
            case LcUI.UI.KEY.BACKSPACE:
                //parent get focus
                //ret = this.parentGetFocus(e);
                break;
            case LcUI.UI.KEY.LEFT:
            case LcUI.UI.KEY.RIGHT:
            case LcUI.UI.KEY.UP:
            case LcUI.UI.KEY.DOWN:
                //brother get focus
                ret = this.brotherGetFocus(e);
                break;
        }

        return ret;
    };

    this.childGetFocus = function (e) {
        var arr = this.getCanFocusChildren();
        var ret = false;
        if (this.nextFocusChild) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == this.nextFocusChild) {
                    ret = true;
                    arr[i].setFocus(true);
                    break;
                }
            }
        }
        if (arr.length > 0 && !ret) {
            ret = true;
            arr[0].setFocus(true);
        }
        return ret;
    };

    this.parentGetFocus = function (e) {
        var arr = this.getCanFocusParent();

        var ret = false;

        if (this.nextFocusParent) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == this.nextFocusParent) {
                    ret = true;
                    arr[i].setFocus(true);
                    break;
                }
            }
        }

        if (arr.length > 0 && !ret) {
            ret = true;
            arr[0].setFocus(true);
        }

        return ret;
    };

    this.brotherGetFocus = function (e) {

        var arr = this.getCanFocusBrother();

        var ret = false;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == this.nextFocusLeft && e.keyCode == LcUI.UI.KEY.LEFT) {
                ret = true;
            }
            else if (arr[i].id == this.nextFocusRight && e.keyCode == LcUI.UI.KEY.RIGHT) {
                ret = true;
            }
            else if (arr[i].id == this.nextFocusUp && e.keyCode == LcUI.UI.KEY.UP) {
                ret = true;
            }
            else if (arr[i].id == this.nextFocusDown && e.keyCode == LcUI.UI.KEY.DOWN) {
                ret = true;
            }

            if (ret) {
                arr[i].setFocus(true);
                break;
            }
        }

        //search brother by position  in  CanFocusChildren Array
        if (!ret) {
            var d = 0;
            if (e.keyCode == LcUI.UI.KEY.UP) {
                d = 0;
            }
            else if (e.keyCode == LcUI.UI.KEY.DOWN) {
                d = 1;
            }
            else if (e.keyCode == LcUI.UI.KEY.LEFT) {
                d = 2;
            }
            else if (e.keyCode == LcUI.UI.KEY.RIGHT) {
                d = 3;
            }

            var w = this.findBrotherByPosition(arr, d);

            if (w) {
                w.setFocus(true);

                ret = true;
            }

        }

        return ret;
    };

    this.getPosition = function () {
        var pos = {};
        pos.left = parseInt(this.getCssAttr("left"));
        pos.top = parseInt(this.getCssAttr("top"));
        pos.width = parseInt(this.getCssAttr("width"));
        pos.height = parseInt(this.getCssAttr("height"));
        return pos;
    };

    this.getBrotherByDirection = function (arr, d) {
        var bw = [];
        for (var i = 0; i < arr.length; i++) {
            if (d == 0) {
                if (arr[i].getPosition().top < this.getPosition().top) {
                    bw.push(arr[i]);
                }
            }
            else if (d == 1) {
                if (arr[i].getPosition().top > this.getPosition().top) {
                    bw.push(arr[i]);
                }
            }
            else if (d == 2) {
                if (arr[i].getPosition().left < this.getPosition().left) {
                    bw.push(arr[i]);
                }
            }
            else if (d == 3) {

                if (arr[i].getPosition().left > this.getPosition().left) {
                    bw.push(arr[i]);
                }
            }
        }
        return bw;
    };

    this.getNearestWin = function (arr) {
        var index = -1;
        var MinDis = -1;

        function getPointsDistance(x1, y1, x2, y2) {
            var xdiff = x2 - x1;
            var ydiff = y2 - y1;
            return Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
        }

        for (var i = 0; i < arr.length; i++) {
            var curDis = getPointsDistance(this.getPosition().left,
                this.getPosition().top,
                arr[i].getPosition().left,
                arr[i].getPosition().top);
            if (MinDis < 0 || MinDis > curDis) {
                MinDis = curDis;
                index = i;
            }
        }

        if (index >= 0) {
            return arr[index];
        }

        return null;
    };

    //d  0:up   1:down  left:2  right:3
    this.findBrotherByPosition = function (arr, d) {

        if (arr.length <= 0) {
            return null;
        }

        if (arr.length == 1) {
            return arr[0];
        }

        arr.sort(function (a, b) {
            if (d == 0 || d == 1) {
                return (a.getPosition().top - b.getPosition().top);
            }
            if (d == 2 || d == 3) {
                return (a.getPosition().left - b.getPosition().left);
            }
        });

        var directionArr = this.getBrotherByDirection(arr, d);

        if (directionArr.length > 0) {
            var a = this.getNearestWin(directionArr);
            if (a) {
                return a;
            }
        }

        if (d == 0 || d == 2) {
            return arr[arr.length - 1];
        }
        else if (d == 1 || d == 3) {
            return arr[0];
        }
    };

    this.getCanFocusParent = function () {
        var ch = [];
        var j = 0;

        var parent = this.parent;

        while (parent) {
            if (parent.focusStop & parent.visibility) {
                ch[j++] = parent;
            }
            parent = parent.parent;
        }

        return ch;
    };

    this.getCanFocusChildren = function () {

        var ch = [];
        var j = 0;

        var child = this.child;

        while (child) {
            if (child.focusStop && child.visibility) {
                ch[j++] = child;
            }

            child = child.next;
        }

        return ch;
    };

    this.getCanFocusBrother = function () {
        var ch = [];
        var j = 0;
        var parent = this.parent;

        if (!parent) {
            return ch;
        }
        var child = parent.child;

        while (child) {
            if (child.focusStop && child.visibility && child != this) {
                ch[j++] = child;
            }
            child = child.next;
        }
        return ch;
    };

    this.getChild = function (id) {
        return this.find(id, function (cur, key) {
            return (cur.id == key) ? true : false;
        }, true);
    };
}

LcUI.UIWm.prototype = new LcUI.LcTree();
LcUI.UI.mix(LcUI.UIWm, new LcUI.LcAnimate());

LcUI.LcPageList = function () {

    this.rows = 0;
    this.curIndex = 0;
    this.rowsOnePage = 10;

    this.listInit = function (rows, rowsOnePage, curIndex) {
        this.rows = rows;
        this.curIndex = curIndex;
        this.rowsOnePage = rowsOnePage;
    };

    this.listUp = function () {
        if (this.rows <= 0 || this.rowsOnePage <= 0) {
            return;
        }
        this.lastIndex = this.curIndex;
        this.curIndex += this.rows - 1;
        this.curIndex %= this.rows;
    };

    this.listDown = function () {
        if (this.rows <= 0 || this.rowsOnePage <= 0) {
            return;
        }
        this.lastIndex = this.curIndex;
        this.curIndex++;
        this.curIndex %= this.rows;
    };

    this.listPageUp = function () {
        var PageNum;
        var pageIndex;

        if (this.rows <= 0 || this.rowsOnePage <= 0) {
            return;
        }

        this.lastIndex = this.curIndex;
        if (this.rows > this.rowsOnePage) {
            pageIndex = Math.floor(this.curIndex / this.rowsOnePage);
            PageNum = Math.floor(this.rows / this.rowsOnePage);

            if (this.rows % this.rowsOnePage) {
                PageNum++;
            }

            pageIndex += PageNum - 1;
            pageIndex %= PageNum;

            this.curIndex = pageIndex * this.rowsOnePage;
        }
    };

    this.listPageDown = function () {
        var PageNum;
        var pageIndex;
        if (this.rows <= 0 || this.rowsOnePage <= 0) {
            return;
        }
        this.lastIndex = this.curIndex;
        if (this.rows > this.rowsOnePage) {
            pageIndex = Math.floor(this.curIndex / this.rowsOnePage);
            PageNum = Math.floor(this.rows / this.rowsOnePage);

            if (this.rows % this.rowsOnePage) {
                PageNum++;
            }

            pageIndex++;
            pageIndex %= PageNum;

            this.curIndex = pageIndex * this.rowsOnePage;
        }
    };

    this.listGetPageRange = function () {
        var pageIndex;
        var islasPage;
        var numInPage;
        var baseIndex;

        var pageRange = {'s': 0, 'num': 0};

        if (this.rows <= 0 || this.rowsOnePage <= 0) {
            return pageRange;
        }

        if (this.rows > 0) {
            pageIndex = Math.floor(this.curIndex / this.rowsOnePage);

            baseIndex = this.rowsOnePage * pageIndex;

            if (this.rows % this.rowsOnePage == 0) {
                islasPage = (pageIndex == Math.floor(this.rows / this.rowsOnePage) - 1);
            }
            else {
                islasPage = (pageIndex == Math.floor(this.rows / this.rowsOnePage));
            }

            if (!islasPage || this.rows % this.rowsOnePage == 0) {
                numInPage = this.rowsOnePage;
            }
            else {
                numInPage = this.rows % this.rowsOnePage;
            }

            pageRange.s = baseIndex;
            pageRange.num = numInPage;
        }

        return pageRange;
    };

    this.listGetIndex = function () {
        return this.curIndex;
    };

    this.listSetIndex = function (index) {
        if (index < this.rows) {
            this.curIndex = index;
        }
    };

    this.listGetIndexInPage = function () {
        return this.curIndex % this.rowsOnePage;
    };

    this.listSetRows = function (rows) {
        if (rows != this.rows) {
            this.rows = rows;
            if (this.curIndex >= this.rows) {
                this.curIndex = this.rows - 1;
            }
        }
    };
}

LcUI.UIMarquee = function (params) {

    var self = this;

    this.params = params;
    this.marqueeInfo = {
        value: '',
        temp: ''
    };
    this.MarqueeTimer = null;

    this.startTimer = null;

    this.doStartMarquee = function () {
        this.stopMarquee();

        if (!this.params.marquee()) {
            return;
        }

        if (this.params.isFocusMove()) {
            if (!this.params.getOnFocus()) {
                return;
            }
        }

        if (this.params.getJsElement().scrollWidth <= this.params.getJsElement().clientWidth) {
            return;
        }

        this.marqueeInfo.value = "" + this.params.getMarqueeValue();
        this.marqueeInfo.temp = "" + this.params.getMarqueeValue() + "&nbsp;";

        this.MarqueeTimer = setInterval(function () {
            //console.log("id:"+self.params.id()+"   Marquee");
            if ($("#" + self.params.id()).length) {
                self.Moveleft();
            }
            else {
                self.stopMarquee();
            }
        }, 300);
    };

    this.startMarquee = function () {
        if (self.startTimer) {
            clearTimeout(self.startTimer);
            self.startTimer = null;
        }
        this.startTimer = setTimeout(function () {
            self.doStartMarquee();
        }, 50);

    };

    this.restoreValue = function () {
        this.params.restoreValue();
    };

    this.stopMarquee = function () {
        if (this.MarqueeTimer) {
            clearInterval(this.MarqueeTimer);
            this.MarqueeTimer = null;
            if (!this.params.marquee()) {
                return;
            }
            this.restoreValue();
        }
    };

    this.Moveleft = function () {
        if (self.MarqueeTimer) {
            this.marqueeInfo.temp = this.marqueeInfo.temp + this.marqueeInfo.temp.substring(0, 1);
            this.marqueeInfo.temp = this.marqueeInfo.temp.substring(1, this.marqueeInfo.temp.length);
            if (this.marqueeInfo.value == ('' + this.params.getMarqueeValue())) {
                this.params.getJqElement().html(this.marqueeInfo.temp);
            }

        }
    };
}


LcUI.UIFrame = function UIFrame(attr) {
    var self = this;

    this._name = "UIFrame";

    for (var p in attr) {
        this[p] = attr[p];
    }

    this.create = function () {
        //create div element
        this.element = $("<div></div>");

        //set element id
        if (!this.id) {
            this.id = "" + (new Date().getTime());
        }

        this.element.attr('id', this.id);

        //set css attr
        if (this.cssAttr && typeof(this.cssAttr) == 'object') {
            this.setCssAttr(this.cssAttr);
        }

        //set css class
        if (this.cssClass && typeof(this.cssClass) == 'string') {
            this.setClass(this.cssClass);
        }

        //set focus or normal
        if (this.focusStop && this.onFocus) {
            this.setFocus(true);
        }
        else {
            this.setFocus(false);
        }

        if (this.parentId) {
            this.element.appendTo(this.parentId);
        }

    };

    this.getElement = function () {
        return this.element;
    };

    this.loopList = function (win) {

        if (!win) {

            return;
        }

        win.onDestory();

        if (!win.child) {

            return;
        }

        var loop = win.child;
        while (loop) {
            if (loop._name == "UIFrame") {
                self.loopList(loop);
            }
            else {
                loop.onDestory();
            }
            loop = loop.next;
        }
    };

    this.destroy = function () {
        var rootId = this.getRootId();

        //1: check focusWin is in the tree
        if (this.isAncestor(this.getFocusWin())) {
            if (this.parent) {
                this.parent.setFocus();
            }
        }

        this.loopList(this);

        //2: remove from the tree
        if (this.parent) {
            this.detach();
        }

        //3: remove from DOM
        this.element.remove();
    };

    this.defProc = function (e) {
        var ret = false;
        return ret;
    };

    this.create();
}

LcUI.UIFrame.prototype = new LcUI.UIWm();


LcUI.UILabel = function UILabel(attr) {
    var self = this;

    this._name = "UILabel";

    this.value = "";

    for (var p in attr) {
        this[p] = attr[p];
    }

    this.create = function () {
        //create div element
        this.element = $("<div></div>");


        //set element id
        if (!this.id) {
            this.id = "" + (new Date().getTime());
        }

        this.element.attr('id', this.id);

        //set css attr
        if (this.cssAttr && typeof(this.cssAttr) == 'object') {
            this.setCssAttr(this.cssAttr);
        }

        //set css class
        if (this.cssClass && typeof(this.cssClass) == 'string') {
            this.setClass(this.cssClass);
        }

        //set focus or normal
        if (this.focusStop && this.onFocus) {
            this.setFocus(true);
        }
        else {
            this.setFocus(false);
        }

        //set value
        this.setValue(this.value);

        self.mq.startMarquee();

    };
    this.getJqElement = function () {
        return self.element;
    };

    this.getJsElement = function () {
        return document.getElementById(self.id);
    };

    this.getMarqueeValue = function () {
        return self.value;
    };
    this.onFocusHandler = function () {

        if (this.isFocusMove) {
            self.mq.startMarquee();
        }
    };

    this.onNormalHandler = function () {
        if (this.isFocusMove) {
            self.mq.stopMarquee();
        }
    };

    this.setValue = function (value) {
        this.value = value;
        this.element.text(this.value);
    };

    this.getValue = function () {
        return this.value;
    };

    this.getElement = function () {
        return this.element;
    };

    this.onDestory = function () {
        console.log("onDestory id:" + this.id);
        self.mq.stopMarquee();
    };

    this.defProc = function (e) {
        var ret = false;
        return ret;
    };
    var params = {
        'id': function () {
            return self.id;
        },
        'marquee': function () {
            return self.marquee;
        },
        'isFocusMove': function () {
            return self.isFocusMove;
        },
        'getOnFocus': function () {
            return self.onFocus;
        },
        'getJsElement': self.getJsElement,
        'getJqElement': self.getJqElement,
        'getMarqueeValue': self.getMarqueeValue,
        'restoreValue': function () {
            self.element.text(self.value);
        }
    };

    this.mq = new LcUI.UIMarquee(params);

    this.create();
}

LcUI.UILabel.prototype = new LcUI.UIWm();


LcUI.UIButton = function UIButton(attr) {
    this._name = "UIButton";

    this.value = "";
    this.onKeyEnter = null;

    for (var p in attr) {
        this[p] = attr[p];
    }

    this.setValue = function (value) {
        this.value = value;
        this.element.text(this.value);
    };

    this.getValue = function () {
        return this.value;
    };

    this.create = function () {
        //create div element
        this.element = $("<div></div>");

        //set element id
        if (!this.id) {
            this.id = "" + (new Date().getTime());
        }

        this.element.attr('id', this.id);

        //set css attr
        if (this.cssAttr && typeof(this.cssAttr) == 'object') {
            this.setCssAttr(this.cssAttr);
        }

        //set css class
        if (this.cssClass && typeof(this.cssClass) == 'string') {
            this.setClass(this.cssClass);
        }

        //set focus or normal
        if (this.focusStop && this.onFocus) {
            this.setFocus(true);
        }
        else if (this.focusStop) {
            this.setFocus(false);
        }
        //set value
        this.setValue(this.value);

    };

    this.setValue = function (value) {
        this.value = value;
        this.element.text(this.value);
    };

    this.getValue = function () {
        return this.value;
    };

    this.setOnKeyEnter = function (f) {
        this.onKeyEnter = f;
    };

    this.getElement = function () {
        return this.element;
    };

    this.defProc = function (e) {
        var ret = false;
        if (e.keyCode == UI.KEY.ENTER && typeof (this.onKeyEnter) == 'function') {
            ret = this.onKeyEnter();
        }
        return ret;
    };


    this.create();
}

LcUI.UIButton.prototype = new LcUI.UIWm();


LcUI.UIImg = function UIImg(attr) {
    this._name = "UIImg";
    this.src = "";

    for (var p in attr) {
        this[p] = attr[p];
    }

    this.create = function () {
        //create div element
        this.element = $("<img>");

        //set element id
        if (!this.id) {
            this.id = "" + (new Date().getTime());
        }

        this.element.attr('id', this.id);

        //set css attr
        if (this.cssAttr && typeof(this.cssAttr) == 'object') {
            this.setCssAttr(this.cssAttr);
        }

        //set css class
        if (this.cssClass && typeof(this.cssClass) == 'string') {
            this.setClass(this.cssClass);
        }

        //set focus or normal
        if (this.focusStop && this.onFocus) {
            this.setFocus(true);
        }
        else {
            this.setFocus(false);
        }

        //set src
        this.setSrc(this.src);

    };

    this.setSrc = function (src) {
        this.src = src;
        this.element.attr('src', this.src);
    };

    this.getSrc = function () {
        return this.src;
    };

    this.getElement = function () {
        return this.element;
    };

    this.defProc = function (e) {
        var ret = false;
        return ret;
    };

    this.create();
}

LcUI.UIImg.prototype = new LcUI.UIWm();


LcUI.UISelect = function UISelect(attr) {
    this._name = "UISelect";
    this.index = 0;
    this.value = [];

    for (var p in attr) {
        this[p] = attr[p];
    }

    this.create = function () {
        //create div element
        this.element = $("<div></div>");

        //set element id
        if (!this.id) {
            this.id = "" + (new Date().getTime());
        }

        this.element.attr('id', this.id);


        //set css attr
        if (this.cssAttr && typeof(this.cssAttr) == 'object') {
            this.setCssAttr(this.cssAttr);
        }

        //set css class
        if (this.cssClass && typeof(this.cssClass) == 'string') {
            this.setClass(this.cssClass);
        }

        //set focus or normal
        if (this.focusStop && this.onFocus) {
            this.setFocus(true);
        }
        else if (this.focusStop) {
            this.setFocus(false);
        }
        //set value
        this.setValue(this.value);

    };

    this.setValue = function () {
        this.element.text(this.value[this.index]);
    };

    this.getValue = function () {
        return this.value;
    };

    this.getCurValue = function () {
        return this.value[this.index];
    };

    this.setIndex = function (index) {

        if (index >= 0 && index < this.value.length) {
            if (this.index != index) {
                this.index = index;
                this.setValue();
            }

        }
    };

    this.getIndex = function () {
        return this.index;
    };

    this.getElement = function () {
        return this.element;
    };

    this.defProc = function (e) {
        var ret = false;
        if (e.keyCode == LcUI.UI.KEY.LEFT) {
            this.index = (this.index + (-1) + this.value.length) % this.value.length;
            this.setValue();
            ret = true;
        }
        else if (e.keyCode == LcUI.UI.KEY.RIGHT) {
            this.index = (this.index + (1) + this.value.length) % this.value.length;
            this.setValue();
            ret = true;
        }
        if (ret == true) {
            LcUI.UI.onKey({keyCode: LcUI.UI.KEY.SELECT_VALUE_CHANGE, id: this.id, hwin: this});
        }
        return ret;
    };
    this.create();
}

LcUI.UISelect.prototype = new LcUI.UIWm();


LcUI.UIEdit = function UIEdit(attr) {
    this._name = "UIEdit";
    this.password = false;
    this.maxChars = 4;
    this.value = "";
    this.suffixValue = "";

    for (var p in attr) {
        this[p] = attr[p];
    }

    this.create = function (attr) {
        //create div element
        this.element = $("<div></div>");

        //set element id
        if (!this.id) {
            this.id = "" + (new Date().getTime());
        }

        this.element.attr('id', this.id);

        //set css attr
        if (this.cssAttr && typeof(this.cssAttr) == 'object') {
            this.setCssAttr(this.cssAttr);
        }

        //set css class
        if (this.cssClass && typeof(this.cssClass) == 'string') {
            this.setClass(this.cssClass);
        }

        //set focus or normal
        if (this.focusStop && this.onFocus) {
            this.setFocus(true);
        }
        else if (this.focusStop) {
            this.setFocus(false);
        }

        //set value
        this.setValue(this.value);
    };

    this.render = function () {
        if (this.password) {
            var str = "";
            for (var i = 0; i < this.value.length; i++) {
                str += "*";
            }
            this.element.text(str + "_");
        }
        else {
            this.element.text(this.value + this.suffixValue);
        }
    };

    this.setValue = function (v) {
        if (typeof (v) == "string") {
            this.value = v;
        }

        if (this.value.length >= this.maxChars) {
            this.value = this.value.slice(0, this.maxChars);
        }

        this.render();
    };

    this.getValue = function () {
        return this.value;
    };

    this.setPasswordMode = function (mode) {
        if (mode) {
            this.password = true;
        }
        else {
            this.password = false;
        }
        this.render();
    };

    this.getPasswordMode = function () {
        return this.password;
    };

    this.setSuffixValue = function (suffix) {
        if (typeof (suffix) == 'string') {

            this.suffixValue = suffix;
        }

        this.render();
    };

    this.getSuffixValue = function () {
        return this.suffixValue;
    };

    this.setMaxChars = function (mc) {
        if (typeof (mc) == 'number') {

            this.maxChars = mc;

            this.setValue();
        }
    };

    this.getMaxChars = function () {
        return this.maxChars;
    };

    this.getElement = function () {
        return this.element;
    };

    this.defProc = function (e) {
        var ret = false;
        var kechars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        if (e.keyCode >= LcUI.UI.KEY.CHAR0 && e.keyCode <= LcUI.UI.KEY.CHAR9) {
            if (this.value.length < this.maxChars) {
                this.value += kechars[e.keyCode - LcUI.UI.KEY.CHAR0];
                ret = true;
            }
        } else if (e.keyCode == LcUI.UI.KEY.LEFT) {
            if (this.value.length > 1) {
                this.value = this.value.slice(0, this.value.length - 1);
            } else {
                this.value = "";
            }
            ret = true;
        }

        if (ret == true) {
            this.setValue();
            LcUI.UI.onKey({keyCode: LcUI.UI.KEY.EDIT_VALUE_CHANGE, id: this.id, hwin: this});
        }
        return ret;
    };

    this.create();
}

LcUI.UIEdit.prototype = new LcUI.UIWm();


LcUI.UIProgress = function UIProgress(attr) {
    this._name = "UIProgress";
    this.focusStop = false;
    this.max = 100;
    this.value = 0;

    for (var p in attr) {
        this[p] = attr[p];
    }

    this.create = function (attr) {
        //create div element
        this.element = $("<div><div></div></div>");

        //set element id
        if (!this.id) {
            this.id = "" + (new Date().getTime());
        }

        this.element.attr('id', this.id);

        //set css attr
        if (this.cssAttr && typeof(this.cssAttr) == 'object') {
            this.setCssAttr(this.cssAttr);
        }

        //set css class
        if (this.cssClass && typeof(this.cssClass) == 'string') {
            this.setClass(this.cssClass);
        }

        if (this.styleClass && this.styleClass.background) {
            this.element.css(this.styleClass.background);
        }

        if (this.styleClass && this.styleClass.progress) {
            this.element.children('div').css(this.styleClass.progress);
        }

        //set focus or normal
        if (this.focusStop && this.onFocus) {
            this.setFocus(true);
        }
        else if (this.focusStop) {
            this.setFocus(false);
        }

        //set value
        this.setValue(this.value);
    };

    this.render = function () {
        var w = (this.value / this.max) * parseInt(this.element.css('width'));
        this.element.children('div').css('width', w + "px");
    };

    this.setValue = function (value) {
        if (value < 0) {
            this.value = value = 0;
        }
        else if (value > this.max) {
            this.value = value = this.max;
        }
        else {
            this.value = value;
        }
        this.render();
    };

    this.getValue = function () {
        return value;
    };

    this.setMax = function (m) {
        if (typeof (m) == 'number') {
            this.max = m;
            this.setValue();
        }
    };

    this.getMax = function () {
        return this.max;
    };

    this.getBackgroundElement = function () {
        return this.element;
    };

    this.getFillElement = function () {
        return this.element.children('div');
    };

    this.defProc = function (e) {
        var ret = false;
        return ret;
    };

    this.create();
}

LcUI.UIProgress.prototype = new LcUI.UIWm();

LcUI.UIScrollBar = function UIScrollBar(attr) {
    this._name = "UIScrollBar";
    this.focusStop = false;

    this.scrollType = "V";
    this.curIndex = 0;
    this.totalNum = 0;
    this.onePageNum = 0;

    for (var p in attr) {
        this[p] = attr[p];
    }

    this.create = function (attr) {
        //create div element
        this.element = $("<div><div></div></div>");

        //set element id
        if (!this.id) {
            this.id = "" + (new Date().getTime());
        }

        this.element.attr('id', this.id);

        //set css attr
        if (this.cssAttr && typeof(this.cssAttr) == 'object') {
            this.setCssAttr(this.cssAttr);
        }

        //set css class
        if (this.cssClass && typeof(this.cssClass) == 'string') {
            this.setClass(this.cssClass);
        }

        if (this.styleClass && this.styleClass.background) {
            this.element.css(this.styleClass.background);
        }

        if (this.styleClass && this.styleClass.scroll) {
            this.element.children('div').css(this.styleClass.scroll);
        }

        //set focus or normal
        if (this.focusStop && this.onFocus) {
            this.setFocus(true);
        }
        else if (this.focusStop) {
            this.setFocus(false);
        }

        //set value
        this.setIndex(this.curIndex);
    };


    this.render = function () {
        if (this.onePageNum > this.totalNum) {
            this.onePageNum = this.totalNum;
        }

        if (this.curIndex >= this.totalNum) {
            this.curIndex = 0;
        }

        if (this.scrollType == "V") {
            var h = (this.onePageNum / this.totalNum) * parseInt(this.element.css('height'));
            this.element.children('div').css('position', 'relative');
            this.element.children('div').css('height', h + "px");
            var t = (this.curIndex / (this.totalNum - 1)) * (parseInt(this.element.css('height')) - h);
            this.element.children('div').css('top', t + "px");
        }
        else if (this.scrollType == "H") {
            var w = (this.onePageNum / this.totalNum) * parseInt(this.element.css('width'));
            this.element.children('div').css('position', 'relative');
            this.element.children('div').css('width', w + "px");
            var l = (this.curIndex / (this.totalNum - 1)) * (parseInt(this.element.css('width')) - w);
            this.element.children('div').css('left', l + "px");
        }
    };

    this.init = function (totalNum, onePageNum, curIndex) {
        this.totalNum = totalNum;
        this.onePageNum = onePageNum;
        this.curIndex = curIndex;
        this.render();
    };

    this.setIndex = function (value) {
        if (typeof(value) != 'number') {
            return;
        }

        if (value <= 0 || value > this.totalNum) {
            return;
        }

        this.curIndex = value;

        this.render();
    };

    this.getIndex = function () {
        return this.curIndex;
    };

    this.setTotalNum = function (tn) {
        if (typeof(tn) != 'number') {
            return;
        }

        this.totalNum = tn;

        if (this.curIndex >= this.totalNum) {
            this.curIndex = this.totalNum - 1;
        }

        this.render();
    };

    this.getTotalNum = function () {
        return this.totalNum;
    };

    this.setOnePageNum = function (opn) {
        if (typeof(opn) != 'number') {
            return;
        }

        this.onePageNum = opn;

        this.render();
    };

    this.getOnePageNum = function () {
        return this.onePageNum;
    };

    this.getBackgroundElement = function () {
        return this.element;
    };

    this.getFillElement = function () {
        return this.element.children('div');
    };

    this.defProc = function (e) {
        var ret = false;
        return ret;
    };

    this.create();
}

LcUI.UIScrollBar.prototype = new LcUI.UIWm();


LcUI.UITable = function UITable(attr) {
    var self = this;
    this._name = "UITable";
    this.focusStop = true;

    this.rows = 0;
    this.cols = 0;
    this.value = [];
    this.rowsOnePage = 0;
    this.lastIndex = 0;
    this.curIndex = 0;
    this.marquee = true;
    this.isFocusMove = false;
    this.marqueeCol = 0;
    this.elementArray = [];

    this.scrollId = null;
    this.scrollWin = null;

    for (var p in attr) {
        this[p] = attr[p];
    }

    this.create = function () {
        //create table element
        this.element = $("<table></table>");

        //set element id
        if (!this.id) {
            this.id = "" + (new Date().getTime());
        }

        this.element.attr('id', this.id);

        //set css attr
        if (this.cssAttr && typeof(this.cssAttr) == 'object') {

            this.setCssAttr(this.cssAttr);
        }

        //set css class
        if (this.cssClass && typeof(this.cssClass) == 'string') {
            this.setClass(this.cssClass);
        }

        //add tr td
        for (var i = 0; i < this.rowsOnePage; i++) {

            this.elementArray[i] = {tr: null, td: []};

            this.elementArray[i].tr = $("<tr></tr>");

            this.elementArray[i].tr.appendTo(this.element);

            if (this.styleClass && this.styleClass.tr) {
                this.elementArray[i].tr.css(this.styleClass.tr);
            }

            for (var j = 0; j < this.cols; j++) {
                this.elementArray[i].td[j] = $("<td></td>");

                this.elementArray[i].td[j].appendTo(this.elementArray[i].tr);

                if (this.tdWidth && this.tdWidth.length == this.cols) {
                    this.elementArray[i].td[j].css('width', this.tdWidth[j]);
                }

                if (this.styleClass && this.styleClass.td) {
                    this.elementArray[i].td[j].css(this.styleClass.td);
                }


            }
        }

        //set focus or normal
        if (this.focusStop && this.onFocus) {
            this.setFocus(true);
        }
        else if (this.focusStop) {
            this.setFocus(false);
        }

        //set value
        this.render(true, function () {
            self.setNormalItem();
            self.setFocusItem();
        });

        if (self.scrollId) {
            self.checkScrollCreateTimer = setInterval(function () {
                if (self.parent) {
                    self.scrollWin = self.parent.getChild(self.scrollId);
                    if (self.scrollWin) {
                        self.scrollWin.init(self.rows, self.rowsOnePage, self.curIndex);
                        clearInterval(self.checkScrollCreateTimer);
                        self.checkScrollCreateTimer = null;
                    }
                }
            }, 10);
        }
    };

    this.render = function (force, cb) {
        var isUpdate = false;
        if (force) {
            isUpdate = true;
        }
        else if (parseInt(this.lastIndex / this.rowsOnePage) != parseInt(this.curIndex / this.rowsOnePage)) {
            isUpdate = true;
        }

        if (isUpdate) {
            var range = this.listGetPageRange();
            for (var i = range.s; i < (range.s + this.rowsOnePage); i++) {
                for (var j = 0; j < this.cols; j++) {
                    var td = this.elementArray[i % this.rowsOnePage].td[j];

                    if (i < (range.s + range.num)) {

                        if (td.children('img').length > 0) {
                            td.children('img').remove();
                        }

                        if (typeof (this.value[i][j]) == 'string' || typeof (this.value[i][j]) == "number") {
                            td.text(this.value[i][j]);
                        }
                        else if (typeof (this.value[i][j]) == 'object' && this.value[i][j].type == "img") {
                            td.text("");
                            var str = "<img src='" + this.value[i][j].src + "' />"
                            td.append(str);
                        }
                    }
                    else {
                        td.text("");
                    }

                }
            }
        }

        this.setNormalItem();

        this.setFocusItem();

        self.mq.startMarquee();

        if (typeof (cb) == 'function') {
            cb();
        }

        if (this.scrollWin) {
            self.scrollWin.init(self.rows, self.rowsOnePage, self.curIndex);
        }
    };

    this.getJsCellElement = function (r, c) {

        var table = document.getElementById(this.id);
        var trArray = table.rows;
        var tdArray = trArray[r].cells;
        var td = tdArray[c];
        return td;
    };


    this.onFocusHandler = function () {
        if (self.isFocusMove) {
            self.mq.startMarquee();
        }
    };

    this.onNormalHandler = function () {
        if (this.isFocusMove) {
            self.mq.stopMarquee();
        }
    };


    this.setNormalItem = function () {
        var i = this.lastIndex % this.rowsOnePage;
        if (i >= 0 && i < this.rowsOnePage && this.styleClass && this.styleClass.normalTr) {
            this.elementArray[i].tr.css(this.styleClass.normalTr);
        }
    };

    this.setFocusItem = function () {
        var i = this.curIndex % this.rowsOnePage;
        if (i >= 0 && i < this.rowsOnePage && this.styleClass && this.styleClass.foucsTr) {
            this.elementArray[i].tr.css(this.styleClass.foucsTr);
        }
    };

    this.getElement = function () {
        return this.element;
    };

    this.addItems = function (items) {

        var off = this.value.length;

        for (var i = 0; i < items.length; i++) {
            this.value[i + off] = items[i];

        }
        this.rows += items.length;

        var range = this.listGetPageRange();

        if (range.num <= this.rowsOnePage) {
            this.render(true);
        }
    };

    this.removeAllItems = function () {
        this.value = [];
        this.curIndex = 0;
        this.rows = 0;
        this.render(true);
    };

    this.getRowItemValue = function (id0) {

        var row = [];
        if (id0 >= 0 && id0 < this.rows) {
            row = this.value[id0];
        }

        return row;
    };

    this.syncScroll = function () {

    };

    this.setCellValue = function (row, col, value) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            this.value[row][col] = value;
            var range = this.listGetPageRange();
            if (row >= range.s && row <= range.num) {
                this.render(true);
            }
        }
    };

    this.getCellValue = function (row, col) {
        return this.value[row][col];
    };


    this.getRows = function () {
        return this.rows;
    };


    this.getCols = function () {
        return this.cols
    };

    this.setCurIndex = function (index) {
        if (index < 0 || index >= this.rows) {
            return;
        }

        if (this.curIndex != index) {
            this.lastIndex = this.curIndex;
            this.curIndex = index;
            this.render(false);
        }
    };

    this.getCurIndex = function () {
        return this.curIndex;
    };

    this.getTableElement = function () {
        return this.element;
    };

    this.getTrTdElement = function () {
        return this.elementArray;
    };

    this.defProc = function (e) {

        var ret = false;
        if (e.keyCode == LcUI.UI.KEY.UP) {
            this.listUp();
            this.render(false);
            ret = true;
        } else if (e.keyCode == LcUI.UI.KEY.DOWN) {
            this.listDown();
            this.render(false);
            ret = true;
        }
        else if (e.keyCode == LcUI.UI.KEY.ENTER) {
            if (typeof (this.onKeyEnter) == 'function') {
                return this.onKeyEnter();
            }
            else {
                ret = false;
            }
        }
        return ret;
    };

    this.getJqElement = function () {
        return self.elementArray[self.curIndex % self.rowsOnePage].td[self.marqueeCol];
    };

    this.getJsElement = function () {
        return self.getJsCellElement(self.curIndex % self.rowsOnePage, self.marqueeCol);
    };

    this.getMarqueeValue = function () {
        return self.value[self.curIndex][self.marqueeCol];
    };

    this.onDestory = function () {
        self.mq.stopMarquee();
        if (self.checkScrollCreateTimer) {
            clearInterval(self.checkScrollCreateTimer);
        }
    };

    var params = {
        'id': function () {
            return self.id;
        },
        'marquee': function () {
            return self.marquee;
        },
        'isFocusMove': function () {
            return self.isFocusMove;
        },
        'getOnFocus': function () {
            return self.onFocus;
        },
        'getJsElement': self.getJsElement,
        'getJqElement': self.getJqElement,
        'getMarqueeValue': self.getMarqueeValue,
        'restoreValue': function () {
            if (parseInt(self.curIndex / self.rowsOnePage) == parseInt(self.lastIndex / self.rowsOnePage)) {
                var td = self.elementArray[self.lastIndex % self.rowsOnePage].td[self.marqueeCol];
                var value = self.value[self.lastIndex][self.marqueeCol];
                td.text("" + value);
            }
        }
    };
    this.mq = new LcUI.UIMarquee(params);
    this.create();
};
LcUI.UITable.prototype = new LcUI.UIWm();
LcUI.UI.mix(LcUI.UITable, new LcUI.LcPageList());


LcUI.UIPopWidgets = function () {

    this.create = function () {
        this.defOpen();
    };

    this.destroy = function () {
        this.defClose();
    };
    this.show = function () {
        if (!this.win) {
            this.create();
        }
        else {
            this.show();
        }
    };

    this.hide = function () {
        if (this.win) {
            this.hide();
        }
    };

    this.defOpen = function () {
        var self = this;
        if (this.checkId()) {
            this.win = LcUI.UI.createGroup(this.dlgParam, LcUI.UI.rootWin[1], function (e) {
                self.onkey(e);
            });

            if (LcUI.UI.dlgWin[0]) {
                LcUI.UI.dlgWin[0] = new Array();
            }
            LcUI.UI.dlgWin[0].push(this.win);

            this.win.setFocus(true);
        }
    };

    this.defClose = function () {

        for (var i = 0; i < LcUI.UI.dlgWin[0].length; i++) {
            if (LcUI.UI.dlgWin[0][i].id == this.win.id) {
                LcUI.UI.dlgWin[0].splice(i, 1);
            }
        }

        if (this.win) {
            this.win.destroy();
        }

        if (LcUI.UI.dlgWin[0].length > 0) {
            LcUI.UI.dlgWin[LcUI.UI.dlgWin.length - 1].setFocus(true);
        }
        else {
            LcUI.UI.rootWin[1].setFocus(true);
        }
    };

    this.checkId = function () {
        for (var i = 0; i < this.dlgParam.length; i++) {
            if (!this.dlgParam[i].id) {
                console.log("UIPopWidgets defOpen Error!(id: Params Not Existed.)");
                return false;
            }

            if ($('#' + this.dlgParam[i].id).length > 0) {
                console.log("UIPopWidgets defOpen Error!(id:" + this.dlgParam[i].id + ")" + "Has Existed.");
                return false;
            }

            if (i > 0) {
                var str = this.dlgParam[i].id.split("_");
                if (str[1] != this.dlgParam[i].uiType.name) {
                    console.log("UIPopWidgets defOpen Error!(Second Part Of Id Is Not The UIType Name)");
                    return false;
                }
            }
        }
        return true;
    };
};





