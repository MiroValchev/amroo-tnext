var viewModel = require("../view-models/main");
var frame = require("ui/frame");
var view = require("ui/core/view");
var localSettings = require("local-settings");
function pageNavigatedTo(args) {
    var iosFrame = frame.topmost().ios;
    if (iosFrame) {
        // Fix status bar color and nav bar vidibility
        iosFrame.controller.view.window.backgroundColor = UIColor.blackColor();
        iosFrame.navBarVisibility = "never";
    }
    var page = args.object;
    page.bindingContext = new viewModel.MainViewModel();
}
exports.pageNavigatedTo = pageNavigatedTo;
function showSlideout(args) {
    var page = view.getAncestor(args.view, "Page");
    var slideBar = page.getViewById("sideBar");
    slideBar.openSlideContent();
}
exports.showSlideout = showSlideout;
function addRoof(args) {
    frame.topmost().navigate({
        moduleName: "/views/add-roof"
    });
}
exports.addRoof = addRoof;
function addPet(args) {
    frame.topmost().navigate({
        moduleName: "/views/add-pet"
    });
}
exports.addPet = addPet;
function showSearch(args) {
    frame.topmost().navigate({
        moduleName: "/views/search"
    });
}
exports.showSearch = showSearch;
function showProfile(args) {
    frame.topmost().navigate({
        moduleName: "/views/profile"
    });
}
exports.showProfile = showProfile;
function logout(args) {
    localSettings.remove(global.TOKEN_DATA_KEY);
    frame.topmost().navigate("./views/login");
}
exports.logout = logout;
//# sourceMappingURL=main.js.map