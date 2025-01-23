var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Utils from '../../utils/index.js';
import { ValidatorConstraint } from 'class-validator';
let IsPermissionFlag = class IsPermissionFlag {
    validate(value, args) {
        const permission = Utils.permissionFlags(value.toString());
        return permission !== undefined;
    }
    defaultMessage(args) {
        return 'Permission must be a valid permission flag.';
    }
};
IsPermissionFlag = __decorate([
    ValidatorConstraint({ name: 'isPermissionFlag', async: false })
], IsPermissionFlag);
export { IsPermissionFlag };
let IsActivityType = class IsActivityType {
    validate(value, args) {
        const activityType = Utils.activityType(value.toString());
        return activityType !== undefined;
    }
    defaultMessage(args) {
        return 'This is not a valid activity type. Please use one of the following: PLAYING, STREAMING, LISTENING, WATCHING, COMPETING';
    }
};
IsActivityType = __decorate([
    ValidatorConstraint({ name: 'isActivityType', async: false })
], IsActivityType);
export { IsActivityType };
let IsTextInputStyle = class IsTextInputStyle {
    validate(value, args) {
        const textInputStyle = Utils.textInputStyle(value.toString());
        return textInputStyle !== undefined;
    }
    defaultMessage(args) {
        return 'This is not a valid activity type. Please use one of the following: PLAYING, STREAMING, LISTENING, WATCHING, COMPETING';
    }
};
IsTextInputStyle = __decorate([
    ValidatorConstraint({ name: 'isTextInputStyle', async: false })
], IsTextInputStyle);
export { IsTextInputStyle };
let IsCommandOptionType = class IsCommandOptionType {
    validate(value, args) {
        const commandOptionType = Utils.commandOptionType(value.toString());
        return commandOptionType !== undefined;
    }
    defaultMessage(args) {
        return 'This is not a command option type.';
    }
};
IsCommandOptionType = __decorate([
    ValidatorConstraint({ name: 'isCommandOptionType', async: false })
], IsCommandOptionType);
export { IsCommandOptionType };
let IsChannelType = class IsChannelType {
    validate(value, args) {
        const channelType = Utils.channelType(value.toString());
        return channelType !== undefined;
    }
    defaultMessage(args) {
        return 'This is not a command option type.';
    }
};
IsChannelType = __decorate([
    ValidatorConstraint({ name: 'isChannelType', async: false })
], IsChannelType);
export { IsChannelType };
let IsBooleanOrString = class IsBooleanOrString {
    validate(value, args) {
        return typeof value === 'boolean' || typeof value === 'string';
    }
    defaultMessage(args) {
        return 'This is not a valid type. Please use either a boolean or a string.';
    }
};
IsBooleanOrString = __decorate([
    ValidatorConstraint({ name: 'isBooleanOrString', async: false })
], IsBooleanOrString);
export { IsBooleanOrString };
