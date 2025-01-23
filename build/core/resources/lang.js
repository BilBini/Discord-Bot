var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { IsString, ValidateNested, IsDefined } from 'class-validator';
import { MessageValidator, ButtonValidator } from '../contracts/index.js';
class Interaction {
    'in-cooldown';
    'no-permission';
    'channel-restricted';
}
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], Interaction.prototype, "in-cooldown", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], Interaction.prototype, "no-permission", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], Interaction.prototype, "channel-restricted", void 0);
class Plugin {
    information;
    list;
    enabled;
    disabled;
    'already-enabled';
    'already-disabled';
    'not-found';
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Plugin.prototype, "information", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], Plugin.prototype, "list", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], Plugin.prototype, "enabled", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], Plugin.prototype, "disabled", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], Plugin.prototype, "already-enabled", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], Plugin.prototype, "already-disabled", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], Plugin.prototype, "not-found", void 0);
class Pagination {
    'select-placeholder';
    'filters-placeholder';
    placeholder;
    'no-data';
    'button-next';
    'button-previous';
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Pagination.prototype, "select-placeholder", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Pagination.prototype, "filters-placeholder", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Pagination.prototype, "placeholder", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], Pagination.prototype, "no-data", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => ButtonValidator),
    __metadata("design:type", ButtonValidator)
], Pagination.prototype, "button-next", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => ButtonValidator),
    __metadata("design:type", ButtonValidator)
], Pagination.prototype, "button-previous", void 0);
class Leaderboard extends MessageValidator {
    'messages-format';
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Leaderboard.prototype, "messages-format", void 0);
class Engine {
    'missing-argument';
    'missing-context';
}
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], Engine.prototype, "missing-argument", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], Engine.prototype, "missing-context", void 0);
export default class DefaultConfig {
    'no-permission';
    'in-cooldown';
    'only-in-primary-guild';
    pagination;
    interaction;
    plugin;
    leaderboard;
    parsed;
    reloaded;
    'error-reloading';
    engine;
}
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], DefaultConfig.prototype, "no-permission", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], DefaultConfig.prototype, "in-cooldown", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], DefaultConfig.prototype, "only-in-primary-guild", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => Pagination),
    __metadata("design:type", Pagination)
], DefaultConfig.prototype, "pagination", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => Interaction),
    __metadata("design:type", Interaction)
], DefaultConfig.prototype, "interaction", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => Plugin),
    __metadata("design:type", Plugin)
], DefaultConfig.prototype, "plugin", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => Leaderboard),
    __metadata("design:type", Leaderboard)
], DefaultConfig.prototype, "leaderboard", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], DefaultConfig.prototype, "parsed", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], DefaultConfig.prototype, "reloaded", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => MessageValidator),
    __metadata("design:type", MessageValidator)
], DefaultConfig.prototype, "error-reloading", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => Engine),
    __metadata("design:type", Engine)
], DefaultConfig.prototype, "engine", void 0);
