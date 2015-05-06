import pages = require("ui/page");
import observable = require("data/observable");
import view = require("ui/core/view");
import gestures = require("ui/gestures");
import viewModel = require("../view-models/search")
import frame = require("ui/frame");
import search = require("ui/search-bar");

export function pageNavigatedTo(args: observable.EventData) {
    var page = <pages.Page>args.object;
    page.bindingContext = viewModel.vm;

    hideSearchKeyboard(page);
}

export function showFilters(args: gestures.GestureEventData) {
    if (viewModel.vm.visibleFilters) {
        viewModel.vm.hideFilters(args);
    } else {
        viewModel.vm.showFilters(args);
    }
}

export function back(args: observable.EventData) {             
    if (viewModel.vm.visibleFilters) {
        viewModel.vm.hideFilters(args);
    } else {
        frame.topmost().goBack();
    }
}

function hideSearchKeyboard(page: view.View) {
    var searchBar = <search.SearchBar>page.getViewById("search");

    if (searchBar.android) {
        searchBar.android.clearFocus();
    }

    if (searchBar.ios) {
        searchBar.ios.resignFirstResponder();
    }
}