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
import { IsString, IsInt, ValidateNested, IsOptional, IsDefined, Max, Min, IsPositive, IsArray, IsBoolean, IsNumber } from 'class-validator';
import { MessageValidator } from '../index.js';
class ConditionArgumentValidator {
    inverse;
    'not-met-actions';
    value;
    amount;
    inherit;
    input;
    operator;
    output;
}
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ConditionArgumentValidator.prototype, "inverse", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ActionValidator),
    __metadata("design:type", Array)
], ConditionArgumentValidator.prototype, "not-met-actions", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ConditionArgumentValidator.prototype, "value", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], ConditionArgumentValidator.prototype, "amount", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ConditionArgumentValidator.prototype, "inherit", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ConditionArgumentValidator.prototype, "input", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ConditionArgumentValidator.prototype, "operator", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ConditionArgumentValidator.prototype, "output", void 0);
export class ConditionValidator {
    id;
    args;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], ConditionValidator.prototype, "id", void 0);
__decorate([
    IsOptional(),
    ValidateNested(),
    Type(() => ConditionArgumentValidator),
    __metadata("design:type", ConditionArgumentValidator)
], ConditionValidator.prototype, "args", void 0);
export class MutatorValidator {
    content;
    channel;
    role;
    guild;
    member;
    user;
}
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MutatorValidator.prototype, "content", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MutatorValidator.prototype, "channel", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MutatorValidator.prototype, "role", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MutatorValidator.prototype, "guild", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MutatorValidator.prototype, "member", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MutatorValidator.prototype, "user", void 0);
class ActionArgumentValidator extends MessageValidator {
    actions;
    value;
    every;
    cooldown;
    delay;
    chance;
    duration;
}
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ActionValidator),
    __metadata("design:type", Array)
], ActionArgumentValidator.prototype, "actions", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ActionArgumentValidator.prototype, "value", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], ActionArgumentValidator.prototype, "every", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], ActionArgumentValidator.prototype, "cooldown", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], ActionArgumentValidator.prototype, "delay", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    Min(0),
    Max(100),
    __metadata("design:type", Number)
], ActionArgumentValidator.prototype, "chance", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], ActionArgumentValidator.prototype, "duration", void 0);
export class ActionValidator {
    id;
    actions;
    args;
    conditions;
    mutators;
}
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ActionValidator.prototype, "id", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ActionValidator),
    __metadata("design:type", Array)
], ActionValidator.prototype, "actions", void 0);
__decorate([
    IsOptional(),
    ValidateNested(),
    Type(() => ActionArgumentValidator),
    __metadata("design:type", ActionArgumentValidator)
], ActionValidator.prototype, "args", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ConditionValidator),
    __metadata("design:type", Array)
], ActionValidator.prototype, "conditions", void 0);
__decorate([
    IsOptional(),
    ValidateNested(),
    Type(() => MutatorValidator),
    __metadata("design:type", MutatorValidator)
], ActionValidator.prototype, "mutators", void 0);
export class TriggerActionValidator extends ActionValidator {
    triggers;
}
__decorate([
    IsDefined(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], TriggerActionValidator.prototype, "triggers", void 0);
