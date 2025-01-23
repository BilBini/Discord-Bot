import { Base } from '../../contracts/index.js';
export class Command extends Base {
    data;
    constructor(manager, plugin) {
        super(manager, plugin);
        this.data = this.build();
    }
    async autocomplete(interaction) {
        throw new Error('Method not implemented.');
    }
}
