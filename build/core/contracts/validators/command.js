var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsInt, IsArray, IsBoolean, IsOptional, IsDefined, NotEquals, Validate } from 'class-validator';
import { IsPermissionFlag } from '../index.js';
export class CommandValidator {
    enabled;
    inherited;
    aliases;
    cooldown;
    roles;
    channels;
    users;
    permission;
    permissions;
    description;
    subcommands;
    options;
}
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CommandValidator.prototype, "enabled", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CommandValidator.prototype, "inherited", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CommandValidator.prototype, "aliases", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    NotEquals(0),
    __metadata("design:type", Number)
], CommandValidator.prototype, "cooldown", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CommandValidator.prototype, "roles", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CommandValidator.prototype, "channels", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CommandValidator.prototype, "users", void 0);
__decorate([
    IsOptional(),
    IsString(),
    Validate(IsPermissionFlag),
    __metadata("design:type", String)
], CommandValidator.prototype, "permission", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    Validate(IsPermissionFlag, { each: true }),
    __metadata("design:type", String)
], CommandValidator.prototype, "permissions", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], CommandValidator.prototype, "description", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", Object)
], CommandValidator.prototype, "subcommands", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", Object)
], CommandValidator.prototype, "options", void 0);
