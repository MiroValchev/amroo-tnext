var viewModel = require("../view-models/login");
var frame = require("ui/frame");
var localSettings = require("local-settings");
function onNavigatedTo(args) {
    // see if the user is already logged and if so redirect him to the main page.
    var authToken = localSettings.getString(global.TOKEN_DATA_KEY);
    if (authToken) {
        frame.topmost().navigate(global.HOME_SCREEN);
        return;
    }
    var page = args.object;
    page.bindingContext = viewModel.vm;
    var loginBtn = page.getViewById("login-btn");
    if (loginBtn.android) {
        loginBtn.android.setFocusableInTouchMode(true);
    }
    //this will hide the keyboard
    loginBtn.focus();
}
exports.onNavigatedTo = onNavigatedTo;
//# sourceMappingURL=login.js.map