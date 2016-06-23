
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"bin-debug/libra/displayObject/JSprite.js",
	"bin-debug/com/apowo/sim/displayObject/CellSprite.js",
	"bin-debug/com/apowo/sim/displayObject/Avatar.js",
	"bin-debug/com/apowo/sim/displayObject/CellBitmap.js",
	"bin-debug/com/apowo/sim/displayObject/Furniture.js",
	"bin-debug/com/apowo/sim/displayObject/ICellDisplayObject.js",
	"bin-debug/com/apowo/sim/model/data/Data.js",
	"bin-debug/com/apowo/sim/model/data/FurnitureData.js",
	"bin-debug/com/apowo/sim/model/DataManager.js",
	"bin-debug/com/apowo/sim/model/FurnitureManager.js",
	"bin-debug/com/apowo/sim/room/Floor.js",
	"bin-debug/com/apowo/sim/room/FloorTile.js",
	"bin-debug/com/apowo/sim/room/Room.js",
	"bin-debug/libra/collection/Dictionary.js",
	"bin-debug/libra/collection/List.js",
	"bin-debug/libra/device.js",
	"bin-debug/libra/display.js",
	"bin-debug/libra/displayObject/JMCFrame.js",
	"bin-debug/libra/displayObject/JMovieClip.js",
	"bin-debug/libra/geom/Ellipse.js",
	"bin-debug/libra/tick/ITickable.js",
	"bin-debug/libra/tick/Tick.js",
	"bin-debug/libra/utils/ArrayUtil.js",
	"bin-debug/libra/utils/ColorUtil.js",
	"bin-debug/libra/utils/CommonUtil.js",
	"bin-debug/libra/utils/DateUtil.js",
	"bin-debug/libra/utils/DrawUtil.js",
	"bin-debug/libra/utils/EffectUtil.js",
	"bin-debug/libra/utils/executor/FrameExecutor.js",
	"bin-debug/libra/utils/executor/IExecutor.js",
	"bin-debug/libra/utils/executor/QueueExecutor.js",
	"bin-debug/libra/utils/ISOUtil.js",
	"bin-debug/libra/utils/LocationProperty.js",
	"bin-debug/libra/utils/MathUtil.js",
	"bin-debug/libra/utils/OrderUtil.js",
	"bin-debug/libra/utils/QuadTree.js",
	"bin-debug/libra/utils/QueryUtil.js",
	"bin-debug/libra/utils/RegUtil.js",
	"bin-debug/libra/utils/StringUtil.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "noScale",
		contentWidth: 960,
		contentHeight: 640,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};