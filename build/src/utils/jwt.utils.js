"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class JWTUtils {
    constructor() {
        this.generateTokens = (userData) => __awaiter(this, void 0, void 0, function* () {
            const [access_token, refresh_token] = yield Promise.all([
                this.generateAccessToken(userData),
                this.generateRefreshToken(userData),
            ]);
            return {
                access_token,
                refresh_token,
            };
        });
        this.generateAccessToken = (userData) => __awaiter(this, void 0, void 0, function* () {
            const access_token = jsonwebtoken_1.default.sign({
                token: "access_token",
                data: userData,
            }, this.PRIVATE_KEY, {
                expiresIn: "15d",
                algorithm: "RS256",
            });
            return access_token;
        });
        this.generateRefreshToken = (userData) => __awaiter(this, void 0, void 0, function* () {
            const refresh_token = jsonwebtoken_1.default.sign({
                token: "refresh_token",
                data: userData,
            }, this.PRIVATE_KEY, {
                expiresIn: "24h",
                algorithm: "RS256",
            });
            return refresh_token;
        });
        this.PRIVATE_KEY = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../../keys/jwtRS256.key"), "utf8");
        this.PUBLIC_KEY = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../../keys/jwtRS256.pub.key"), "utf8");
    }
}
exports.default = JWTUtils;
