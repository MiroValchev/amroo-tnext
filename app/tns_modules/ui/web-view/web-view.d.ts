/**
 * Contains the WebView class, which represents a standard browser widget.
 */
declare module "ui/web-view" {
    import view = require("ui/core/view");
    import dependencyObservable = require("ui/core/dependency-observable");
    import observable = require("data/observable");

    /**
     * Known event names.
     */
    export module knownEvents {
        /**
         * Raised when the web-view has completely loaded an url.
         */
        export var loadFinished: string;
        
        /**
         * Raised when the web-view starts loading an url.
         */
        export var loadStarted: string;
    }

    /**
     * Represents a standard WebView widget.
     */
    export class WebView extends view.View {

        /**
         * Represents the observable property backing the Url property of each WebView instance.
         */
        public static urlProperty: dependencyObservable.Property;

        /**
         * Gets the native [android widget](http://developer.android.com/reference/android/webkit/WebView.html) that represents the user interface for this component. Valid only when running on Android OS.
         */
        android: android.webkit.WebView;

        /**
         * Gets the native [UIWebView](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIWebView_Class/) that represents the user interface for this component. Valid only when running on iOS.
         */
        ios: UIWebView;

        /**
         * Gets or sets the url displayed by this instance.
         */
        url: string;

        /**
         * Gets a value indicating whether the WebView can navigate back.
         */
        canGoBack: boolean;

        /**
         * Gets a value indicating whether the WebView can navigate forward.
         */
        canGoForward: boolean;

        /**
         * Navigates back.
         */
        goBack();

        /**
         * Navigates forward.
         */
        goForward();

        /**
         * Reload the current url.
         */
        reload();

        on(event: string, callback: (data: observable.EventData) => void);
        on(event: "loadFinished", callback: (args: LoadEventData) => void);
        on(event: "loadStarted", callback: (args: LoadEventData) => void);
    }

    /**
     * Event data containing information for the loading events of a WebView.
     */
    export interface LoadEventData extends observable.EventData {
        /**
         * Gets the url of the web-view.
         */
        url: string;
        /**
         * Gets the error (if any). 
         */
        error: string;
    }
}
