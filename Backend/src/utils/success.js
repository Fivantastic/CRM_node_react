export function success(result) {
    return {
        success: true,
        ...result,
    };
}

export function errorResponse(message, code = 500) {
    return {
        success: false,
        error: {
            code,
            message,
        },
    };
}
