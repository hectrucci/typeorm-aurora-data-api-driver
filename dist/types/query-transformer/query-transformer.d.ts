export interface QueryTransformationResult {
    queryString: string;
    parameters: any[];
}
export declare abstract class QueryTransformer {
    transformQueryAndParameters(query: string, srcParameters?: any[]): {
        queryString: string;
        parameters: any[] | undefined;
    };
    protected abstract transformQuery(query: string, srcParameters: any[]): string;
    protected abstract transformParameters(srcParameters?: any[]): any[] | undefined;
}
