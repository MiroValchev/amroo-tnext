var viewModel = require("../view-models/search");
var frame = require("ui/frame");
function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = viewModel.vm;
    hideSearchKeyboard(page);
}
exports.pageNavigatedTo = pageNavigatedTo;
function showFilters(args) {
    if (viewModel.vm.visibleFilters) {
        viewModel.vm.hideFilters(args);
    }
    else {
        viewModel.vm.showFilters(args);
    }
}
exports.showFilters = showFilters;
function back(args) {
    if (viewModel.vm.visibleFilters) {
        viewModel.vm.hideFilters(args);
    }
    else {
        frame.topmost().goBack();
    }
}
exports.back = back;
function hideSearchKeyboard(page) {
    var searchBar = page.getViewById("search");
    if (searchBar.android) {
        searchBar.android.clearFocus();
    }
    if (searchBar.ios) {
        searchBar.ios.resignFirstResponder();
    }
}
//# sourceMappingURL=search.js.map