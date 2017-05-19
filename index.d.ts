export declare class NativeScriptAzureStorage {
	private storageAccount;
	private tableClient;
	private blobClient;
	private connectionString;
	private error;
	constructor(connectionString: string);
	createTable(tableName: string): Promise<any>;
	uploadBlob(containerName: string, blobName: string, blobValue: any): Promise<any>;
	deleteBlob(containerName: string, blobName: string): Promise<any>;
	downloadBlob(containerName: string, blobName: string): Promise<any>;
	deleteBlobContainer(containerName: string): Promise<any>;
	createBlobContainer(containerName: string): Promise<any>;
	listTables(tableName?: string): Promise<string[]>;
	listRows(tableName: string): Promise<any[]>;
	addRows(table: string, partitionKey: string, rowKeyName: string, items: any[]): Promise<any>;
	addRow(table: string, itemToAdd: any, partitionKey: string, rowKey: string): Promise<any>;
}

