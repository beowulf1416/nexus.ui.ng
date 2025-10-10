export class User {

    constructor(
        readonly name: String
    ) {}

    static anonymous(): User {
        return new User(
            'anonymous'
        );
    }
}
