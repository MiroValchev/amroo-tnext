import observable = require("data/observable");
import dialogs = require("ui/dialogs");
import frameModule = require("ui/frame");
import localSettings = require("local-settings");
import http = require("http");
import button = require("ui/button");
var everlive = require("../lib/everlive");
import roof = require("../models/roof");
import enums = require("../models/enums");

export class AddCommentViewModel extends observable.Observable {
    private _roof: roof.Roof;
    private roofsUrl: string;
    private _activePanelId: string;
    private _roofTypes: Array<any>; //Array<roof.Roof>;
    
    constructor() {
        super();
        // Initialize default values.
        this._activePanelId = "roofTitle";
    }
    
    get roof(): roof.Roof {
        if (!this._roof) {
            this._roof = new roof.Roof();
        }

        return this._roof;
    }
    set roof(value: roof.Roof) {
        this._roof = value;
    }

    get activePanelId(): string {
        return this._activePanelId;
    }
    set activePanelId(value: string) {
        this._activePanelId = value;
        this.notify({ object: this, eventName: observable.knownEvents.propertyChange, propertyName: "activePanelId", value: value });
    }

    get roofTypes(): Array<any> {
        if (!this._roofTypes) {
            this._roofTypes.push({ "key": "1", "text": "House" });
            this._roofTypes.push({ "key": "2", "text": "Apartment" });
            this._roofTypes.push({ "key": "3", "text": "Hotel" });
        }
        
        return this._roofTypes;
    }
    
    public nextView(args: observable.EventData) {
        var btn = <button.Button>args.object
        this.activePanelId = btn.id
    }
}

export var vm = new AddCommentViewModel();