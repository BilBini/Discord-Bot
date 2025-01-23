import { ComponentBuilder } from '../../../core/builders/index.js';
import { Component } from '../../../index.js';
export default class ExampleButton extends Component {
    customId = 'example_id';
    build() {
        return new ComponentBuilder() // Can use the same command as the slash command usefull to keep the same permissions and requirements
            .using(this.plugin.configs.commands.getSubsection("example"));
    }
    async execute(interaction, user) {
    }
}
