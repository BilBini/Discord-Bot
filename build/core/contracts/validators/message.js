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
import { IsString, IsArray, IsBoolean, IsOptional, IsDefined, ValidateNested } from 'class-validator';
import { ComponentValidator } from '../index.js';
class MessageComponentValidator {
    1;
    2;
    3;
    4;
    5;
}
__decorate([
    IsDefined(),
    ValidateNested({ each: true }),
    IsArray(),
    Type(() => ComponentValidator),
    __metadata("design:type", Array)
], MessageComponentValidator.prototype, 1, void 0);
__decorate([
    IsOptional(),
    ValidateNested({ each: true }),
    IsArray(),
    Type(() => ComponentValidator),
    __metadata("design:type", Array)
], MessageComponentValidator.prototype, 2, void 0);
__decorate([
    IsOptional(),
    ValidateNested({ each: true }),
    IsArray(),
    Type(() => ComponentValidator),
    __metadata("design:type", Array)
], MessageComponentValidator.prototype, 3, void 0);
__decorate([
    IsOptional(),
    ValidateNested({ each: true }),
    IsArray(),
    Type(() => ComponentValidator),
    __metadata("design:type", Array)
], MessageComponentValidator.prototype, 4, void 0);
__decorate([
    IsOptional(),
    ValidateNested({ each: true }),
    IsArray(),
    Type(() => ComponentValidator),
    __metadata("design:type", Array)
], MessageComponentValidator.prototype, 5, void 0);
class MessageEmbedFieldValidator {
    name;
    value;
    inline;
    show;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], MessageEmbedFieldValidator.prototype, "name", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], MessageEmbedFieldValidator.prototype, "value", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], MessageEmbedFieldValidator.prototype, "inline", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], MessageEmbedFieldValidator.prototype, "show", void 0);
class MessageEmbedValidator {
    title;
    description;
    url;
    color;
    timestamp;
    footer;
    'footer-icon';
    image;
    thumbnail;
    author;
    'author-icon';
    'author-url';
    fields;
}
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "title", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", String)
], MessageEmbedValidator.prototype, "url", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "color", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], MessageEmbedValidator.prototype, "timestamp", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "footer", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "footer-icon", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "image", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "thumbnail", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "author", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "author-icon", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "author-url", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => MessageEmbedFieldValidator),
    __metadata("design:type", Array)
], MessageEmbedValidator.prototype, "fields", void 0);
export class MessageValidator {
    content;
    embeds;
    components;
    ephemeral;
    'disable-mentions';
}
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageValidator.prototype, "content", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => MessageEmbedValidator),
    __metadata("design:type", Array)
], MessageValidator.prototype, "embeds", void 0);
__decorate([
    IsOptional(),
    ValidateNested(),
    Type(() => MessageComponentValidator),
    __metadata("design:type", MessageComponentValidator)
], MessageValidator.prototype, "components", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], MessageValidator.prototype, "ephemeral", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], MessageValidator.prototype, "disable-mentions", void 0);
