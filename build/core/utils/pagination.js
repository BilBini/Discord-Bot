import Utils from './index.js';
import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction } from 'discord.js';
import manager from '../../index.js';
import { PaginationType } from '../contracts/index.js';
export class Pagination {
    interaction;
    type = PaginationType.SelectMenu;
    ephemeral = false;
    context = {};
    categories = [];
    variables = [];
    config;
    lang;
    placeholderText;
    defaultItems;
    currentFilters = [];
    filteredItems;
    currentItem = 0;
    currentPage = 0;
    itemsPerPage = 25;
    message;
    time = 100000;
    collector;
    constructor(interaction, items, config) {
        this.interaction = interaction;
        this.config = config;
        this.filteredItems = items;
        this.defaultItems = items;
        this.placeholderText = manager.configs.lang.getString("pagination.placeholder");
        this.lang = manager.configs.lang.getSubsection("pagination");
        return this;
    }
    /**
      * Set the type of pagination
      */
    setType(type) {
        this.type = type;
        return this;
    }
    /**
      * Make the message ephemeral or not
      */
    setEphemeral(ephemeral) {
        this.ephemeral = ephemeral;
        return this;
    }
    /**
      * Set the items per page. Default is 25
      */
    setItemsPerPage(itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
        return this;
    }
    /**
      * Set the variables to be used in the message
      */
    setVariables(variables) {
        this.variables = variables;
        return this;
    }
    /**
      * Set the categories to be used in the select menu
      */
    setCategories(categories) {
        this.categories = categories;
        return this;
    }
    /**
      * Set the context to be used in the message
      */
    setContext(context) {
        this.context = context;
        return this;
    }
    /**
      * Set the time for the collector to listen
      */
    setTime(interval) {
        this.time = interval;
        return this;
    }
    /**
      * Set the placeholder text for the select menu
      */
    setPlaceholderText(placeholderText) {
        this.placeholderText = placeholderText;
        return this;
    }
    /**
     * Send the pagination message
     */
    async send() {
        if (!this.filteredItems.length) {
            return this.interaction.reply(await Utils.setupMessage({
                config: this.lang.getSubsection("no-data"),
                variables: this.variables,
                context: this.context
            }));
        }
        const totalPages = this.getTotalPages();
        this.variables.push({ searchFor: "%total_pages%", replaceWith: totalPages });
        this.message = await this.interaction.reply(await Utils.setupMessage({
            config: this.config,
            variables: [
                ...this.variables,
                { searchFor: "%current_page%", replaceWith: this.currentPage + 1 },
                { searchFor: "%current_item%", replaceWith: this.getMessage() }
            ],
            context: this.context,
            components: await this.getComponents(),
            ephemeral: this.ephemeral
        }));
        this.createCollector();
        return this.message;
    }
    getCurrentItem() {
        return this.filteredItems[this.currentItem];
    }
    createCollector() {
        const filter = (interaction) => ['pagination_items', 'pagination_previous', 'pagination_next', 'pagination_filter'].includes(interaction.customId);
        this.collector = this.message.createMessageComponentCollector({ filter, time: this.time });
        this.collector.on('collect', async (interaction) => {
            if (interaction.customId === 'pagination_previous')
                this.prevPage();
            if (interaction.customId === 'pagination_next')
                this.nextPage();
            if (interaction instanceof StringSelectMenuInteraction) {
                if (interaction.values[0]?.startsWith("item_")) {
                    this.currentItem = parseInt(interaction.values[0].split("_")[1]);
                }
                else {
                    this.currentFilters = [];
                    for (const filter of interaction.values) {
                        const filterId = filter.split("_")[1];
                        this.currentFilters.push(filterId);
                    }
                    this.filteredItems = this.currentFilters.length
                        ? this.defaultItems.filter(item => item.category ? this.currentFilters.includes(item.category) : false)
                        : this.defaultItems;
                    this.currentPage = 0;
                    this.currentItem = 0;
                }
            }
            ;
            interaction.update(await Utils.setupMessage({
                config: this.config,
                variables: [
                    ...this.variables,
                    { searchFor: "%current_page%", replaceWith: this.currentPage + 1 },
                    { searchFor: "%current_item%", replaceWith: this.getMessage() }
                ],
                context: this.context,
                components: await this.getComponents(),
                ephemeral: this.ephemeral
            }));
        });
        this.collector.on('end', () => {
            this.message.edit({ components: [] });
        });
    }
    getMessage() {
        if (!this.filteredItems)
            return "No matched value";
        if (this.type === "button") {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredItems.length);
            return this.filteredItems.slice(startIndex, endIndex).map(item => item.message).join('\n');
        }
        return this.getCurrentItem().message;
    }
    async getComponents() {
        const rows = [];
        const totalPages = this.getTotalPages();
        const currentPage = this.getCurrentPage();
        if (this.type === PaginationType.SelectMenu && this.filteredItems.length) {
            const selectMenu = currentPage.map(item => {
                return {
                    label: item.label,
                    value: `item_${this.filteredItems.indexOf(item)}`,
                    emoji: item.emoji,
                    description: item.description
                };
            });
            rows.push(new ActionRowBuilder()
                .addComponents(new StringSelectMenuBuilder()
                .setCustomId('pagination_items')
                .setPlaceholder(await Utils.applyVariables(this.lang.getStringOrNull("select-placeholder"), [
                ...this.variables,
                { searchFor: "%current_page%", replaceWith: this.currentPage + 1 },
            ], this.context) || this.placeholderText)
                .addOptions(selectMenu)));
        }
        if (this.categories.length) {
            const selectMenu = this.categories.map(category => {
                const isSelected = this.currentFilters.includes(category.id);
                return {
                    label: category.name,
                    value: `filter_${category.id}`,
                    emoji: category.emoji,
                    description: category.description,
                    default: isSelected
                };
            });
            rows.push(new ActionRowBuilder()
                .addComponents(new StringSelectMenuBuilder()
                .setCustomId('pagination_filter')
                .setPlaceholder(this.lang.getString("filters-placeholder"))
                .setMinValues(0)
                .setMaxValues(this.categories.length)
                .addOptions(selectMenu)));
        }
        if (totalPages > 1) {
            rows.push(new ActionRowBuilder()
                .addComponents(await Promise.all([
                Utils.setupButton({ customId: 'pagination_previous', config: this.lang.getSubsection("button-previous"), disabled: this.currentPage === 0, context: this.context }),
                Utils.setupButton({ customId: 'pagination_next', config: this.lang.getSubsection("button-next"), disabled: this.currentPage === totalPages - 1, context: this.context }),
            ])));
        }
        return rows;
    }
    getCurrentPage() {
        const startIndex = this.currentPage * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredItems.slice(startIndex, endIndex);
    }
    getTotalPages() {
        return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    }
    nextPage() {
        if (this.currentPage < this.getTotalPages() - 1) {
            this.currentPage++;
        }
    }
    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
        }
    }
}
