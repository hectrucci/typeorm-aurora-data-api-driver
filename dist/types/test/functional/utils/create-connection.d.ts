import { Connection } from 'typeorm';
export declare const createConnection: (dbType: DbType, partialOptions?: any) => Promise<any>;
export declare const createConnectionAndResetData: (dbType: DbType, partialOptions?: any) => Promise<any>;
export declare type DbType = 'mysql' | 'postgres';
export declare const useCleanDatabase: (dbType: DbType, partialOptions: any, invoke: (connection: any) => Promise<void>) => Promise<void>;
