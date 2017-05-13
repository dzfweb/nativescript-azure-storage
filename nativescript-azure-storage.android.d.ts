export declare class NativescriptAzureStorage {
    private storageAccount;
    private tableClient;
    private connectionString;
    constructor(connectionString: string);
    createTable(tableName: string): Promise<any>;
    listTables(tableName?: string): Promise<string[]>;
    addRows(table: string, partitionKey: string, rowKeyName: string, items: any[]): Promise<any>;
    addRow(table: string, itemToAdd: any, partitionKey: string, rowKey: string): Promise<any>;
    private isConnectionStringValid();
}
