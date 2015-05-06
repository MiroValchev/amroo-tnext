import pages = require("ui/page");
import observable = require("data/observable");

// Event handler for Page "navigatedTo" event attached in roof.xml
export function pageNavigatedTo(args: observable.EventData) {
    // Get the event sender
    var page = <pages.Page>args.object;     
    page.bindingContext = page.navigationContext;
}

import frame = require("ui/frame");
export function back(args: observable.EventData) {
    frame.topmost().goBack();
}