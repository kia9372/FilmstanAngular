export interface ServerResponse<T> {
	isSuccess: Boolean;
	message: FiledError[];
    data: T;
}
export interface FiledError{
    Field:string;
    Description:string;
}
