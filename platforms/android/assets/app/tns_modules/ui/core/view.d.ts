declare module "ui/core/view" {
    import style = require("ui/styling");
    import dependencyObservable = require("ui/core/dependency-observable");
    import proxy = require("ui/core/proxy");
    import gestures = require("ui/gestures");
    import color = require("color");

    /**
     * Gets a child view by id.
     * @param view - The parent (container) view of the view to look for.
     * @param id - The id of the view to look for.
     * Returns an instance of a view (if found), otherwise undefined.
     */
    export function getViewById(view: View, id: string): View;

    /**
     * Iterates through all child views (via visual tree) and executes a function.
     * @param view - Starting view (parent container).
     * @param callback - A function to execute on every child. If function returns false it breaks the iteration.
     */
    export function eachDescendant(view: View, callback: (child: View) => boolean);

    /**
     * Gets an ancestor from a given type.
     * @param view - Starting view (child view).
     * @param typeName - The type name of the parent container which is looking for.
     * Returns an instance of a view (if found), otherwise undefined.
     */
    export function getAncestor(view: View, typeName: string): View;

    /**
     * Defines an enum with events for view class.
     */
    module knownEvents {
        /**
         * Raised when the view is added to visual tree and loaded (shown).
         */
        export var loaded: string;

        /**
         * Raised when the view is unloaded.
         */
        export var unloaded: string;
    }

    /**
     * Defines interface for an optional parameter used to create a view.
     */
    export interface Options {
        /**
         * Gets or sets the desired width of the view.
         */
        width?: number;
        /**
         * Gets or sets the desired height of the view.
         */
        height?: number;
        /**
         * Gets or sets the minimum width the view may grow to.
         */
        minWidth?: number;
        /**
         * Gets or sets the minimum height the view may grow to.
         */
        minHeight?: number;
        /**
         * Gets or sets the alignment of this view within its parent along the Horizontal axis.
         */
        horizontalAlignment?: string;
        /**
         * Gets or sets the alignment of this view within its parent along the Vertical axis.
         */
        verticalAlignment?: string;
        /**
         * Specifies extra space on the left side of this view.
         */
        marginLeft: number;

        /**
         * Specifies extra space on the top side of this view.
         */
        marginTop: number;

        /**
         * Specifies extra space on the right side of this view.
         */
        marginRight: number;

        /**
         * Specifies extra space on the bottom side of this view.
         */
        marginBottom: number;
        /**
         * Gets or sets the visibility of this view.
         */
        visibility?: string;
        /**
         * Gets or sets the CSS class of this view.
         */
        cssClass?: string;
        /**
         * Gets or sets the id of this view.
         */
        id?: string;
    }

    /**
     * This class is the base class for all UI components. 
     * A View occupies a rectangular area on the screen and is responsible for drawing and layouting of all UI components within. 
     */
    export class View extends proxy.ProxyObject {
        /**
         * Represents the observable property backing the id property of each View.
         */
        public static idProperty: dependencyObservable.Property;

        /**
         * Represents the observable property backing the cssClass property of each View.
         */
        public static cssClassProperty: dependencyObservable.Property;
        public static isEnabledProperty: dependencyObservable.Property;
        public static isUserInteractionEnabledProperty: dependencyObservable.Property;

        constructor(options?: Options);

        //----------Style property shortcuts----------

        /**
         * Gets or sets the color of the view.
         */
        color: color.Color;
        
        /**
         * Gets or sets the background color of the view.
         */
        backgroundColor: color.Color;
        
        /**
         * Gets or sets the minimum width the view may grow to.
         */
        minWidth: number;

        /**
         * Gets or sets the minimum height the view may grow to.
         */
        minHeight: number;

        /**
         * Gets or sets the desired width of the view.
         */
        width: number;

        /**
         * Gets or sets the desired height of the view.
         */
        height: number;

        /**
         * Gets or sets margin style property.
         */
        margin: string;

        /**
         * Specifies extra space on the left side of this view.
         */
        marginLeft: number;

        /**
         * Specifies extra space on the top side of this view.
         */
        marginTop: number;

        /**
         * Specifies extra space on the right side of this view.
         */
        marginRight: number;

        /**
         * Specifies extra space on the bottom side of this view.
         */
        marginBottom: number;

        /**
         * Gets or sets padding style property.
         */
        padding: string;

        /**
         * Specify the left padding of this view.
         */
        paddingLeft: number;

        /**
         * Specify the top padding of this view.
         */
        paddingTop: number;

        /**
         * Specify the right padding of this view.
         */
        paddingRight: number;

        /**
         * Specify the bottom padding of this view.
         */
        paddingBottom: number;

        /**
         * Gets or sets the alignment of this view within its parent along the Horizontal axis.
         */
        horizontalAlignment: string;

        /**
         * Gets or sets the alignment of this view within its parent along the Vertical axis.
         */
        verticalAlignment: string;

        /**
         * Gets or sets the visibility of the view.
         */
        visibility: string;

        /**
         * Gets or sets the opacity style property.
         */
        opacity: number;
        
        //----------Style property shortcuts----------

        /**
         * Gets or sets a value indicating whether the the view is enabled. This affects the appearance of the view.
         */
        isEnabled: boolean;

        /**
         * Gets or sets a value indicating whether the user can interact with the view. This does not affect the appearance of the view.
         */
        isUserInteractionEnabled: boolean;

        /**
         * Gets or sets the id for this view.
         */
        id: string;

        /**
         * Gets or sets the CSS class for this view.
         */
        cssClass: string;

        /**
         * Gets the style object associated to this view.
         */
        style: style.Style;

        /**
         * Gets the View instance that parents this view. This property is read-only.
         */
        parent: View;

        /**
         * Gets is layout is valid. This is read-only property.
         */
        isLayoutValid: boolean;

        cssType: string;

        visualState: string;

        /**
         * This is called to find out how big a view should be. The parent supplies constraint information in the width and height parameters.
         * The actual measurement work of a view is performed in onMeasure(int, int), called by this method. Therefore, only onMeasure(int, int) can and must be overridden by subclasses.
         * @param widthMeasureSpec	Horizontal space requirements as imposed by the parent
         * @param heightMeasureSpec	Vertical space requirements as imposed by the parent
         */
        public measure(widthMeasureSpec: number, heightMeasureSpec: number): void;

        /**
         * Assign a size and position to a view and all of its descendants
         * This is the second phase of the layout mechanism. (The first is measuring). In this phase, each parent calls layout on all of its children to position them. This is typically done using the child measurements that were stored in the measure pass().
         * Derived classes should not override this method. Derived classes with children should override onLayout. In that method, they should call layout on each of their children.
         * @param l Left position, relative to parent
         * @param t Top position, relative to parent
         * @param r Right position, relative to parent
         * @param b Bottom position, relative to parent
         */
        public layout(left: number, top: number, right: number, bottom: number): void;

        /**
         * Returns the raw width component.
         */
        public getMeasuredWidth(): number;

        /**
         * Returns the raw height component.
         */
        public getMeasuredHeight(): number;

        /**
         * Call this when something has changed which has invalidated the layout of this view. This will schedule a layout pass of the view tree.
         */
        public requestLayout(): void;

        /**
         * Measure the view and its content to determine the measured width and the measured height. This method is invoked by measure(int, int) and should be overriden by subclasses to provide accurate and efficient measurement of their contents.
         * When overriding this method, you must call setMeasuredDimension(int, int) to store the measured width and height of this view. Failure to do so will trigger an exception, thrown by measure(int, int).
         * @param widthMeasureSpec	horizontal space requirements as imposed by the parent. The requirements are encoded with View.MeasureSpec.
         * @param heightMeasureSpec	vertical space requirements as imposed by the parent. The requirements are encoded with View.MeasureSpec.
         */
        public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void;

        /**
         * Called from layout when this view should assign a size and position to each of its children. Derived classes with children should override this method and call layout on each of their children.
         * @param left Left position, relative to parent
         * @param top Top position, relative to parent
         * @param right Right position, relative to parent
         * @param bottom	Bottom position, relative to parent
         */
        public onLayout(left: number, top: number, right: number, bottom: number): void;

        /**
         * This method must be called by onMeasure(int, int) to store the measured width and measured height. Failing to do so will trigger an exception at measurement time.
         * @param measuredWidth	The measured width of this view. May be a complex bit mask as defined by MEASURED_SIZE_MASK and MEASURED_STATE_TOO_SMALL.
         * @param measuredHeight	The measured height of this view. May be a complex bit mask as defined by MEASURED_SIZE_MASK and MEASURED_STATE_TOO_SMALL.
         */
        public setMeasuredDimension(measuredWidth: number, measuredHeight: number): void;

        public layoutNativeView(left: number, top: number, right: number, bottom: number): void;

        public static measureChild(parent: View, child: View, widthMeasureSpec: number, heightMeasureSpec: number): { measuredWidth: number; measuredHeight: number };

        public static layoutChild(parent: View, child: View, left: number, top: number, right: number, bottom: number): void;

        /**
         * Utility to reconcile a desired size and state, with constraints imposed
         * by a MeasureSpec.  Will take the desired size, unless a different size
         * is imposed by the constraints.  The returned value is a compound integer,
         * with the resolved size in the {@link #MEASURED_SIZE_MASK} bits and
         * optionally the bit {@link #MEASURED_STATE_TOO_SMALL} set if the resulting
         * size is smaller than the size the view wants to be.
         */
        public static resolveSizeAndState(size: number, specSize: number, specMode: number, childMeasuredState: number): number;

        /**
         * Returns the child view with the specified id.
         */
        getViewById<T extends View>(id: string): T;

        /**
         * Tries to focus the view.
         * Returns a value indicating whether this view or one of its descendants actually took focus.
         */
        public focus(): boolean;

        observe(type: number, callback: (args: gestures.GestureEventData) => void): gestures.GesturesObserver;

        // Lifecycle events
        onLoaded(): void;
        onUnloaded(): void;
        isLoaded: boolean;

        _addView(view: View);
        _removeView(view: View);
        _context: android.content.Context;

        // TODO: Implement logic for stripping these lines out
        
    }

    /**
     * Base class for all UI components that implements custom layouts. 
     */
    export class CustomLayoutView extends View {
    }

    

    /**
     * Defines an interface for adding arrays declared in xml.
     */
    interface AddArrayFromBuilder {
        /**
         * A function that is called when an array declaration is found in xml.
         * @param name - Name of the array.
         * @param value - The actual value of the array.
         */
        _addArrayFromBuilder(name: string, value: Array<any>): void;
    }

    /**
     * Defines an interface for adding a child element declared in xml.
     */
    interface AddChildFromBuilder {
        /**
         * Called for every child element declared in xml.
         * This function will create an instance of declared child element.
         * @param name - Name of the element.
         * @param value - Value of the element.
         */
        _addChildFromBuilder(name: string, value: any): void;
    }

    /**
     * Defines an interface used to create a member of a class from string representation (used in xml declaration).
     */
    interface ApplyXmlAttributes {
        /**
         * Called for every attribute in xml declaration. <... fontAttributes="bold" ../>
         * @param attributeName - the name of the attribute (fontAttributes)
         * @param attrValue - the value of the attribute (bold)
         * Should return true if this attribute is handled and there is no need default handler to process it.
         */
        applyXmlAttribute(attributeName: string, attrValue: any): boolean;
    }
}