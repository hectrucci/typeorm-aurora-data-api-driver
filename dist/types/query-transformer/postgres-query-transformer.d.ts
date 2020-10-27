import { QueryTransformer } from "./query-transformer";
export declare class PostgresQueryTransformer extends QueryTransformer {
    protected transformQuery(query: string): string;
    protected transformParameters(parameters?: any[]): ({
        name: string;
        value: {
            arrayValue: {
                stringValues?: string[] | undefined;
            };
        };
        cast?: undefined;
    } | {
        name: string;
        value: any;
        cast: string;
    } | {
        [x: string]: any;
        name?: undefined;
        value?: undefined;
        cast?: undefined;
    })[] | undefined;
}
