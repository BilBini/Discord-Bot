var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsActivityType } from '../contracts/index.js';
import { Type } from 'class-transformer';
import { IsString, IsInt, ValidateNested, IsBoolean, Validate, IsDefined, NotEquals, IsHexColor, IsIn, IsPositive, IsArray } from 'class-validator';
class Activity {
    text;
    type;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Activity.prototype, "text", void 0);
__decorate([
    IsDefined(),
    IsString(),
    Validate(IsActivityType),
    __metadata("design:type", String)
], Activity.prototype, "type", void 0);
class Presence {
    interval;
    status;
    activities;
}
__decorate([
    IsDefined(),
    IsInt(),
    __metadata("design:type", Number)
], Presence.prototype, "interval", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Presence.prototype, "status", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => Activity),
    __metadata("design:type", Array)
], Presence.prototype, "activities", void 0);
class Database {
    type;
    host;
    port;
    username;
    password;
    database;
    debug;
}
__decorate([
    IsDefined(),
    IsString(),
    IsIn(['mysql', 'sqlite', 'mariadb']),
    __metadata("design:type", String)
], Database.prototype, "type", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Database.prototype, "host", void 0);
__decorate([
    IsDefined(),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], Database.prototype, "port", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Database.prototype, "username", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Database.prototype, "password", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], Database.prototype, "database", void 0);
__decorate([
    IsDefined(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], Database.prototype, "debug", void 0);
class LogConfig {
    id;
    channel;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], LogConfig.prototype, "id", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], LogConfig.prototype, "channel", void 0);
export default class DefaultConfig {
    token;
    'primary-guild';
    'default-color';
    debug;
    presence;
    database;
    'log-channels';
}
__decorate([
    IsDefined(),
    IsString(),
    NotEquals('BOT_TOKEN', {
        message: 'Please set your bot token in the configs/config.yml file.',
    }),
    __metadata("design:type", String)
], DefaultConfig.prototype, "token", void 0);
__decorate([
    IsDefined(),
    IsString(),
    NotEquals('GUILD_ID', {
        message: 'Please set your guild id in the configs/config.yml file.',
    }),
    __metadata("design:type", String)
], DefaultConfig.prototype, "primary-guild", void 0);
__decorate([
    IsDefined(),
    IsString(),
    IsHexColor(),
    __metadata("design:type", String)
], DefaultConfig.prototype, "default-color", void 0);
__decorate([
    IsDefined(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], DefaultConfig.prototype, "debug", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => Presence),
    __metadata("design:type", Presence)
], DefaultConfig.prototype, "presence", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => Database),
    __metadata("design:type", Database)
], DefaultConfig.prototype, "database", void 0);
__decorate([
    IsDefined(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => LogConfig),
    __metadata("design:type", Array)
], DefaultConfig.prototype, "log-channels", void 0);
