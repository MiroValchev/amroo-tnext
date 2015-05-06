var count = 0;
function buttonTap2(args) {
    count++;
    var parent = args.object.parent;
    if (parent) {
        var lbl = parent.getViewById("Label1");
        if (lbl) {
            lbl.text = "You clicked " + count + " times!";
        }
    }
}
exports.buttonTap2 = buttonTap2;
//# sourceMappingURL=MyControl.js.map