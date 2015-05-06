import pages = require("ui/page");
import observable = require("data/observable");
import viewModel = require("../view-models/add-comment");
import view = require("ui/core/view");

export function pageNavigatedTo(args: observable.EventData) {     
    var page = <pages.Page>args.object;    
    page.bindingContext = viewModel.vm;
}