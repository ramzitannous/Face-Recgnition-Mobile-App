"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
var styles_1 = __importDefault(require("./styles"));
var react_native_image_crop_picker_1 = __importDefault(require("react-native-image-crop-picker"));
var react_native_elements_1 = require("react-native-elements");
//ts-ignore
var react_native_actionsheet_1 = require("react-native-actionsheet");
var constants_1 = __importDefault(require("../../constants"));
var rn_fetch_blob_1 = __importDefault(require("rn-fetch-blob"));
var MainView = /** @class */ (function (_super) {
    __extends(MainView, _super);
    function MainView(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { names: [], isLoading: false };
        _this.pressedName = "";
        return _this;
    }
    MainView.prototype.componentWillMount = function () {
        this.getNames();
    };
    MainView.prototype.render = function () {
        var _this = this;
        return React.createElement(react_native_1.View, { style: styles_1.default.container },
            this.state.isLoading ? React.createElement(react_native_1.ProgressBarAndroid, { indeterminate: true }) : this.renderList(),
            React.createElement(react_native_actionsheet_1.ActionSheetCustom, { ref: function (o) { return _this.actionSheet = o; }, title: React.createElement(react_native_1.Text, { style: { color: '#ff1947', fontSize: 18 } }, "Choose Image From"), options: ['From Gallery', 'From Camera', 'Cancel'], cancelButtonIndex: 2, onPress: function (index) {
                    _this.chooseImages(index);
                } }));
    };
    MainView.prototype.getNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ isLoading: true });
                        return [4 /*yield*/, fetch(constants_1.default.NAMES)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) {
                            react_native_1.ToastAndroid.show("No Internet Connection", react_native_1.ToastAndroid.LONG);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, data.json()];
                    case 2:
                        json = _a.sent();
                        console.log(json);
                        this.setState({ names: json, isLoading: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    MainView.prototype.renderList = function () {
        var _this = this;
        return React.createElement(react_native_1.FlatList, {
            data: this.state.names, extraData: this.state, onRefresh: function () {
                return _this.getNames();
            }, refreshing: this.state.isLoading, renderItem: function (_a) {
                var item = _a.item;
                return React.createElement(react_native_elements_1.ListItem, { title: item + "", onPress: function () {
                        _this.actionSheet.show();
                        _this.pressedName = item + "";
                    }, bottomDivider: true, chevron: true, badge: { value: item + "" } });
            }, showsVerticalScrollIndicator: true, keyExtractor: function (_a) {
                var item = _a.item;
                return item + "";
            } });
    };
    MainView.prototype.chooseImages = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var options, images;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (index == 2)
                            return [2 /*return*/];
                        options = {
                            multiple: true,
                            mediaType: "photo",
                            cropping: true
                        };
                        images = undefined;
                        if (!(index == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, react_native_image_crop_picker_1.default.openPicker(options)];
                    case 1:
                        images = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, react_native_image_crop_picker_1.default.openCamera(options)];
                    case 3:
                        images = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.uploadImages(images);
                        return [2 /*return*/];
                }
            });
        });
    };
    MainView.prototype.uploadImages = function (images) {
        return __awaiter(this, void 0, void 0, function () {
            var rnfetch, _i, images_1, image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(images)) return [3 /*break*/, 5];
                        _i = 0, images_1 = images;
                        _a.label = 1;
                    case 1:
                        if (!(_i < images_1.length)) return [3 /*break*/, 4];
                        image = images_1[_i];
                        if (!(this.pressedName != "")) return [3 /*break*/, 3];
                        return [4 /*yield*/, rn_fetch_blob_1.default.fetch('POST', constants_1.default.UPLOAD_IMAGE + this.pressedName, { 'Content-Type': 'multipart/form-data' }, [{
                                    name: 'file',
                            filename: new Date().getTime() + "." + (image.mime.split("/")[1]),
                                    data: rn_fetch_blob_1.default.wrap(image.path)
                                }])];
                    case 2:
                        rnfetch = _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, rn_fetch_blob_1.default.fetch('POST', constants_1.default.UPLOAD_IMAGE + this.pressedName, { 'Content-Type': 'multipart/form-data' }, [{
                                name: 'file',
                                filename: 'image.' + images.mime,
                                data: rn_fetch_blob_1.default.wrap(images.path)
                            }])];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return MainView;
}(React.Component));
exports.default = MainView;
