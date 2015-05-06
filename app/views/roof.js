// Event handler for Page "navigatedTo" event attached in roof.xml
function pageNavigatedTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = page.navigationContext;
}
exports.pageNavigatedTo = pageNavigatedTo;
var frame = require("ui/frame");
function back(args) {
    frame.topmost().goBack();
}
exports.back = back;
//# sourceMappingURL=roof.js.map