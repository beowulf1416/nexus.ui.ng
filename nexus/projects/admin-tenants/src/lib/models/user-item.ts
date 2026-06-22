export class UserItem {
  constructor(
    readonly user_id: string,
    readonly first_name: string,
    readonly middle_name: string,
    readonly last_name: string,
    readonly prefix: string,
    readonly suffix: string,
    readonly email: string,
    readonly active: boolean,
    readonly created: Date,
  ) {}
}
