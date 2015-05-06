import pages = require("ui/page");
import observable = require("data/observable");
import viewModel = require("../view-models/login");
import frame = require("ui/frame");
import view = require("ui/core/view");
import platform = require("platform");
import localSettings = require("local-settings");
import textfield = require("ui/text-field");
import button = require("ui/button");

export function onNavigatedTo(args: observable.EventData) {
    // see if the user is already logged and if so redirect him to the main page.
    var authToken = localSettings.getString(global.TOKEN_DATA_KEY);
    if (authToken) {
        frame.topmost().navigate(global.HOME_SCREEN);
        return;
    }

    var page = <pages.Page>args.object;
    page.bindingContext = viewModel.vm;

    var loginBtn = <button.Button>page.getViewById("login-btn");
    if (loginBtn.android) {
        loginBtn.android.setFocusableInTouchMode(true);        
    }

    //this will hide the keyboard
    loginBtn.focus();        
}