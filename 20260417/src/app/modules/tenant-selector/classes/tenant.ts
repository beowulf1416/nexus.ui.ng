import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

export class Tenant {

    constructor(
        readonly id: string,
        readonly name: string,
        readonly description: string
    ) {}

    static default(): Tenant {
        return new Tenant(
            NIL_UUID,
            'default',
            'default'
        );
    }
}
