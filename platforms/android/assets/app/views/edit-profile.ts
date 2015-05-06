import pages = require("ui/page");
import observable = require("data/observable");
import viewModel = require("../view-models/edit-profile");

export function onNavigatedTo(args: observable.EventData) {
    var page = <pages.Page>args.object;
    page.bindingContext = viewModel.vm;
    page.bindingContext.setUser(page.navigationContext);    
}

import frame = require("ui/frame");
export function back(args: observable.EventData) {
    frame.topmost().goBack();
}