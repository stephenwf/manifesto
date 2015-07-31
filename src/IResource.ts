module Manifesto {
    export interface IResource {
        clickThroughService: IService;
        data: any;
        dataUri: string;
        error: any;
        isAccessControlled: boolean;
        loginService: IService;
        logoutService: IService;
        status: number;
        tokenService: IService;

        getData(accessToken?: IAccessToken): Promise<IResource>;
    }
}