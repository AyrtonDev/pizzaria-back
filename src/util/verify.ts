export function verifyEmailToken(path: string) {
    let success: boolean

    switch(path) {
        case '/v1/update':
            success = true
            break;
        case '/v1/change-password':
            success = true
            break;
        default:
            success = false
    }

    return success
}