import pages = require("ui/page");
import observable = require("data/observable");
import viewModel = require("../view-models/main")
import frame = require("ui/frame");
import platform = require("platform");
import gestures = require("ui/gestures");
import view = require("ui/core/view");
import button = require("ui/button");
import localSettings = require("local-settings");

export function pageNavigatedTo(args: observable.EventData) {
    var iosFrame = frame.topmost().ios;
    if (iosFrame) {
        // Fix status bar color and nav bar vidibility
        iosFrame.controller.view.window.backgroundColor = UIColor.blackColor();
        iosFrame.navBarVisibility = "never";
    }

    var page = <pages.Page>args.object;
    page.bindingContext = new viewModel.MainViewModel();
}

export function showSlideout(args: gestures.GestureEventData) {
    var page = view.getAncestor(args.view, "Page");
    var slideBar = <any>page.getViewById("sideBar");
    slideBar.openSlideContent();
}

export function addRoof(args: observable.EventData) {
    frame.topmost().navigate({
        moduleName: "/views/add-roof"
    });
}

export function addPet(args: observable.EventData) {
    frame.topmost().navigate({
        moduleName: "/views/add-pet"
    });
}

export function showSearch(args: observable.EventData) {
    frame.topmost().navigate({
        moduleName: "/views/search"
    });
}

export function showProfile(args: observable.EventData) {
    frame.topmost().navigate({
        moduleName: "/views/profile"
    });
}

export function logout(args: observable.EventData) {
    localSettings.remove(global.TOKEN_DATA_KEY);
    frame.topmost().navigate("./views/login");
}