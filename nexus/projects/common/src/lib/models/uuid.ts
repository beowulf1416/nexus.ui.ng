import { v4 as uuidv4, validate as uuid_validate } from 'uuid';

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
}
