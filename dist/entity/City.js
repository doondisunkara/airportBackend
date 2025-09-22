"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const typeorm_1 = require("typeorm");
const Airport_1 = require("./Airport");
const Country_1 = require("./Country");
let City = class City {
};
exports.City = City;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], City.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], City.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], City.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "real" }),
    __metadata("design:type", Number)
], City.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "real" }),
    __metadata("design:type", Number)
], City.prototype, "long", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Country_1.Country, country => country.cities, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "country_id" }),
    __metadata("design:type", Country_1.Country)
], City.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], City.prototype, "country_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Airport_1.Airport, airport => airport.city),
    __metadata("design:type", Array)
], City.prototype, "airports", void 0);
exports.City = City = __decorate([
    (0, typeorm_1.Entity)()
], City);
//# sourceMappingURL=City.js.map