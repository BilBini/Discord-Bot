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
import { IsString, IsInt, IsIn, IsArray, IsBoolean, IsOptional, ValidateNested, IsDefined, ArrayMaxSize, IsNumber, Validate, MaxLength } from 'class-validator';
import { IsBooleanOrString, IsTextInputStyle } from '../decorators/validator.js';
class OptionsValidator {
    label;
    value;
    emoji;
    default;
    description;
}
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OptionsValidator.prototype, "label", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OptionsValidator.prototype, "value", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OptionsValidator.prototype, "emoji", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], OptionsValidator.prototype, "default", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OptionsValidator.prototype, "description", void 0);
class TextInputValidator {
    id;
    label;
    placeholder;
    required;
    'max-lenght';
    value;
    style;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], TextInputValidator.prototype, "id", void 0);
__decorate([
    IsDefined(),
    IsString(),
    MaxLength(45),
    __metadata("design:type", String)
], TextInputValidator.prototype, "label", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], TextInputValidator.prototype, "placeholder", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], TextInputValidator.prototype, "required", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], TextInputValidator.prototype, "max-lenght", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TextInputValidator.prototype, "value", void 0);
__decorate([
    IsOptional(),
    IsString(),
    Validate(IsTextInputStyle),
    __metadata("design:type", String)
], TextInputValidator.prototype, "style", void 0);
export class ModalValidator {
    title;
    components;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], ModalValidator.prototype, "title", void 0);
__decorate([
    IsDefined(),
    IsArray(),
    ArrayMaxSize(5),
    ValidateNested(),
    Type(() => TextInputValidator),
    __metadata("design:type", Array)
], ModalValidator.prototype, "components", void 0);
export class ButtonValidator {
    style;
    'custom-id';
    disabled;
    label;
    emoji;
    url;
    show;
}
__decorate([
    IsOptional(),
    IsString(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ButtonValidator.prototype, "style", void 0);
__decorate([
    IsOptional(),
    IsString(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ButtonValidator.prototype, "custom-id", void 0);
__decorate([
    IsOptional(),
    Validate(IsBooleanOrString),
    __metadata("design:type", Object)
], ButtonValidator.prototype, "disabled", void 0);
__decorate([
    IsOptional(),
    IsString(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ButtonValidator.prototype, "label", void 0);
__decorate([
    IsOptional(),
    IsString(),
    IsString({ each: true }),
    MaxLength(80, { each: true }),
    __metadata("design:type", Object)
], ButtonValidator.prototype, "emoji", void 0);
__decorate([
    IsOptional(),
    IsString(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ButtonValidator.prototype, "url", void 0);
__decorate([
    IsOptional(),
    Validate(IsBooleanOrString),
    __metadata("design:type", Object)
], ButtonValidator.prototype, "show", void 0);
export class ComponentValidator extends ButtonValidator {
    type;
    placeholder;
    'min-values';
    'max-values';
    options;
}
__decorate([
    IsOptional(),
    IsString(),
    IsIn(["button", "select-menu"]),
    __metadata("design:type", String)
], ComponentValidator.prototype, "type", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ComponentValidator.prototype, "placeholder", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    __metadata("design:type", Number)
], ComponentValidator.prototype, "min-values", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    __metadata("design:type", Number)
], ComponentValidator.prototype, "max-values", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => OptionsValidator),
    __metadata("design:type", Array)
], ComponentValidator.prototype, "options", void 0);
