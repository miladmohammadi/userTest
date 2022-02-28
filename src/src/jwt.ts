import { JWT } from "@astronautlabs/jwt";

export const signToken = (user: any) => JWT.encode(user, { algorithm: "HS256", secretOrKey: "simple" });
export const verifyToken = (token: string) => JWT.validate(token, { algorithm: "HS256", secretOrKey: "simple" });
