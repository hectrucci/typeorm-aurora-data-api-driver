import { QueryTransformer } from './query-transformer';
export declare class MysqlQueryTransformer extends QueryTransformer {
    protected transformQuery(query: string, parameters: any[]): string;
    protected expandArrayParameters(parameters: any[]): any[];
    protected transformParameters(parameters?: any[]): any[] | undefined;
}
