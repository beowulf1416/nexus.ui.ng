export class Tenant {

    constructor(
        readonly name: string
    ) {}

    static default(): Tenant {
        return new Tenant(
            ''
        );
    }

    get is_default() {
        return this.name == '';
    }
}
