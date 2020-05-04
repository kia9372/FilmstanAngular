import { SendCodeVerification } from './SendCodeVerification';

export interface RegisterUserModel {
    registerRoleByAdmin: string;
    registerRoleByUser: string;
    sendCodeVerification: SendCodeVerification;
    sendCodeVerificationString:string;
}

