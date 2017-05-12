export declare class NativescriptAzureStorage {
    connectionString: string;
    constructor(connectionString: string);
    createTable(tableName: string): Promise<any>;
    addRows(table: string, partitionKey: string, rowKeyName: string, items: any[]): Promise<any>;
    addRow(table: string, itemToAdd: any, partitionKey: string, rowKey: string): Promise<any>;
    private getStorageAccount();
}
