import { createError } from "../utils/error.js";

export function invalidCredentials() {
    return createError(401, "Invalid credentials");
}
