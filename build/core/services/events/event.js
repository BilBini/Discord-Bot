import { Base } from '../../contracts/index.js';
export class Event extends Base {
    once = false;
    priority = 3;
    /**
      * Stop the function and it will not execute events with a lower priority.
      * @throws stop
      */
    cancelEvent() {
        throw 'stop';
    }
}
