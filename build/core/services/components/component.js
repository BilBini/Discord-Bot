import { ComponentBuilder } from '../../builders/index.js';
import { Base } from '../../contracts/index.js';
export class Component extends Base {
    data;
    constructor(manager, plugin) {
        super(manager, plugin);
        this.data = this.build();
    }
    build() {
        return new ComponentBuilder();
    }
}
