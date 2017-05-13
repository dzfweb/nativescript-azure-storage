import async from 'async';
declare var com: any;

export class NativescriptAzureStorage {
  private storageAccount: any;
  private tableClient: any;
  private connectionString: string = undefined;

  constructor(connectionString: string) {
    let policy = new android.os.StrictMode.ThreadPolicy.Builder().permitAll().build();
    android.os.StrictMode.setThreadPolicy(policy);

    this.connectionString = connectionString;
    this.storageAccount = com.microsoft.azure.storage.CloudStorageAccount.parse(this.connectionString);
    this.tableClient = this.storageAccount.createCloudTableClient();
  }

  createTable(tableName: string): Promise<any> {
    if (this.isConnectionStringValid()) {
      let cloudTable = this.tableClient.getTableReference(tableName);
      cloudTable.createIfNotExists();
      return Promise.resolve(true);
    } else {
      return Promise.reject('Invalid connection string');
    }
  }

  listTables(tableName?: string): Promise<string[]> {
    if (this.isConnectionStringValid()) {
      let cloudTable = tableName ? this.tableClient.listTables(tableName) : this.tableClient.listTables();

      let tables = new Array<string>();

      for (let table in cloudTable) {
        tables.push(table);
      }

      return Promise.resolve(tables);
    } else {
      return Promise.reject('Invalid connection string');
    }
  }

  addRows(table: string, partitionKey: string, rowKeyName: string, items: any[]): Promise<any> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.isConnectionStringValid()) {
        async.eachSeries(items, (item: any, outerCallback) => {
        this.addRow(table, item, partitionKey, item[rowKeyName])
        .then(() => outerCallback(null))
        .catch(() => outerCallback('error'));
        }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      } else {
        reject('Invalid connection string');
      }
    });
  }

  addRow(table: string, itemToAdd: any, partitionKey: string, rowKey: string): Promise<any> {
    if (this.isConnectionStringValid()) {
      try {
        let cloudTable = this.tableClient.getTableReference(table);
        let item = new com.microsoft.azure.storage.table.DynamicTableEntity(partitionKey, rowKey);

        let hash = new java.util.HashMap();
        for (let property in itemToAdd) {
            if (itemToAdd.hasOwnProperty(property)) {
              let value = undefined;
              if (typeof itemToAdd[property] === 'boolean') {
                value = itemToAdd[property].toString();
              } else {
                value = itemToAdd[property];
              }
              let prop = new com.microsoft.azure.storage.table.EntityProperty(value);
              hash.put(property, prop);
            }
        }
        item.setProperties(hash);

        let insert = com.microsoft.azure.storage.table.TableOperation.insertOrReplace(item);

        cloudTable.execute(insert);

        return Promise.resolve(true);
      } catch (ex) {
        return Promise.reject(ex);
      }
    } else {
      return Promise.reject('Invalid connection string');
    }
  }

  private isConnectionStringValid(): boolean {
    return !!this.connectionString;
  }
}
