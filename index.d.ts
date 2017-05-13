export declare class NativescriptAzureStorage {
  private storageAccount: any;
  private tableClient: any;
  private connectionString: string;
  constructor(connectionString: string);
  createTable(tableName: string): Promise<any>;
  listTables(tableName?: string): Promise<string[]>
  addRows(table: string, partitionKey: string, rowKeyName: string, items: any[]): Promise<any>;
  addRow(table: string, itemToAdd: any, partitionKey: string, rowKey: string): Promise<any>;
  private isConnectionStringValid();
}

