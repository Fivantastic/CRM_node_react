export function success(result) {
    return {
        success: true,
        ...result,
    };
}
