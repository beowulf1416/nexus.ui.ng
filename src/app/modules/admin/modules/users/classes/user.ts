export class User {

    constructor(
        readonly id: string,
        readonly active: boolean,
        readonly created: Date,
        readonly email: string,
        readonly first_name: string,
        readonly middle_name: string,
        readonly last_name: string,
        readonly prefix: string,
        readonly suffix: string
    ) {}
}
