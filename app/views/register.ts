import pages = require("ui/page");
import viewModel = require("../view-models/register");
import observable = require("data/observable");

export function onNavigatedTo(args: observable.EventData) {
    var page = <pages.Page>args.object;
    page.bindingContext = viewModel.vm;
}