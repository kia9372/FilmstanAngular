
export interface GetAllAccessLevelModel {
    controllerName: string;
    controllerDisplayName: string;
    actionInfos: ActionsModel[]
}

export interface ActionsModel {
    actionName: string;
    actionDisplayName: string;
    isSelected: boolean;
}
