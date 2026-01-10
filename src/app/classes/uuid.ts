import { 
    v4 as uuidv4, 
    NIL as NIL_UUID,
    validate as uuid_validate 
} from 'uuid';

export class InvalidUUIDError extends Error {
    constructor(m?: string) {
        super(m || "invalid uuid");

        Object.setPrototypeOf(this, InvalidUUIDError.prototype);
    }
}

export class Uuid {

    private _id: string;

    private constructor(
        private id: string
    ) {
        this._id = id;
    }

    parse(id: string): Uuid {
        if (uuid_validate(id)){
            return new Uuid(id);
        } else {
            throw new InvalidUUIDError();
            // return this.nil();
        }
    }

    static generate(): Uuid {
        return new Uuid(uuidv4());
    }

    nil(): Uuid {
        return new Uuid(NIL_UUID);
    }

    to_string(): string {
        return this._id;
    }
}
