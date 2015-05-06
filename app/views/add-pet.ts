import pages = require("ui/page");
import observable = require("data/observable");
import viewModel = require("../view-models/add-pet");
import view = require("ui/core/view");

export function pageNavigatedTo(args: observable.EventData) {  
    var page = <pages.Page>args.object;    
    page.bindingContext = new viewModel.AddPetViewModel();
}

import frame = require("ui/frame");
export function back(args: observable.EventData) {
    frame.topmost().goBack();
}