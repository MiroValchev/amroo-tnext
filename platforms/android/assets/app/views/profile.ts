import pages = require("ui/page");
import observable = require("data/observable");
import viewModel = require("../view-models/profile");
import frame = require("ui/frame");

export function onNavigatedTo(args: observable.EventData) {
    var page = <pages.Page>args.object;
    page.bindingContext = new viewModel.ProfileViewModel();
}

export function back(args: observable.EventData) {
    frame.topmost().goBack();
}