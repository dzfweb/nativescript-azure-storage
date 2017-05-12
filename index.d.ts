export declare class NativescriptAzureStorage {
  // define your typings manually
  // or..
  // use take the ios or android .d.ts files and copy/paste them here
  connectionString: string;
  constructor(connectionString: string);

  addRows(table: string, partitionKey: string, rowKeyName: string, items: any[]): Promise<any>;
  addRow(table: string, itemToAdd: any, partitionKey: string, rowKey: string): Promise<any>;
}

