import observable = require("data/observable");

export class BaseEntity {
    Id: string;
    CreatedAt: Date;
    CreatedBy: string;
    ModifiedAt: Date;
    ModifiedBy: string;
    Owner: string;

    /*
getCreatedAt(): string {
    return app.helper.formatDate(this.get('CreatedAt'));
}

user(): any {
    var userId = this.get('UserId');

    var user = $.grep(app.Users.users(), function(e) {
        return e.Id === userId;
    })[0];

    return user ? user.DisplayName : 'Anonymous';
}
*/
}