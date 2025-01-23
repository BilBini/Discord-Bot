import { Expansion } from '../expansion.js';
export default class MathExpansion extends Expansion {
    name = 'math';
    async onRequest(context, placeholder) {
        if (/^[0-9+\-*/.() ]+$/.test(placeholder)) {
            try {
                const result = eval(placeholder);
                return result.toString();
            }
            catch (error) {
                this.logger.error("Error while calculating expression: " + error);
                return "Calcul error";
            }
        }
        else {
            return "Invalid expression";
        }
    }
}
