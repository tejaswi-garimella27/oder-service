export enum NODE_ENV {
    DEV = 'development'
}

export type EnvVariables = {
    NODE_ENV:NODE_ENV,
    PORT:number,
    PHARMACY_BASE_URL:string,
}