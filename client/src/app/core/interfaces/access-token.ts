export interface AccessToken {
    sub: string,
    authorities: Array<string>,
    exp: number
}