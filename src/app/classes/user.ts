export class User {

    constructor(
        readonly name: String
    ) {}

    get is_anonymous(): boolean {
        return this.name == '';
    }

    get is_authenticated(): boolean {
        return this.name != '';
    }

    static anonymous(): User {
        return new User(
            ''
        );
    }
}
