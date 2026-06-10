import { v4 as uuidv4, validate as uuid_validate } from 'uuid';

const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';


export class InvalidUUIDError extends Error {
  constructor(m?: string) {
    super(m || 'invalid uuid string');

    Object.setPrototypeOf(this, InvalidUUIDError.prototype);
  }
}

export class Uuid {
  id: string;

  constructor(id?: string) {
    if (id != null && uuid_validate(id)) {
      this.id = id;
    } else {
      this.id = uuidv4();
    }
  }

  static default(): Uuid {
    return new Uuid(EMPTY_GUID);
  }

  to_string(): string {
    return this.id.toString();
  }
}
