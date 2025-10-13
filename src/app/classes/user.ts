import { Tenant } from "./tenant";

export class User {

    constructor(
        readonly name: String,
        readonly tenant: Tenant,
        readonly permissions: Array<number>
    ) {}

    get is_anonymous(): boolean {
        return this.name == '';
    }

    get is_authenticated(): boolean {
        return this.name != '';
    }

    static anonymous(): User {
        return new User(
            '',
            Tenant.default(),
            new Array<number>()
        );
    }
}
