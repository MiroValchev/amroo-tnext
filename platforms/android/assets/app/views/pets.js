var viewModel = require("../view-models/pets");
function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = viewModel.vm;
}
exports.pageNavigatedTo = pageNavigatedTo;
//# sourceMappingURL=pets.js.map