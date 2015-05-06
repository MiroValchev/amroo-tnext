var viewModel = require("../view-models/add-comment");
function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = viewModel.vm;
}
exports.pageNavigatedTo = pageNavigatedTo;
//# sourceMappingURL=add-comment.js.map