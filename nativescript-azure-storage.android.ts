import async from 'async';
declare var com: any;

export class NativescriptAzureStorage {
  public connectionString: string = undefined;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  createTable(tableName: string): Promise<any> {
    if (this.connectionString) {
      let storageAccount = this.getStorageAccount();
      let tableClient = storageAccount.createCloudTableClient();
      let cloudTable = tableClient.getTableReference(tableName);

      cloudTable.createIfNotExists();
      return Promise.resolve(true);
    } else {
      return Promise.reject('Invalid connection string');
    }
  }

  addRows(table: string, partitionKey: string, rowKeyName: string, items: any[]): Promise<any> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.connectionString) {
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
    if (this.connectionString) {
      try {
        let storageAccount = this.getStorageAccount();

        let tableClient = storageAccount.createCloudTableClient();
        let cloudTable = tableClient.getTableReference(table);
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

        let insert = com.microsoft.azure.storage.table
                    .TableOperation.insertOrReplace(item);

        cloudTable.execute(insert);

        return Promise.resolve(true);
      } catch (ex) {
        return Promise.reject(ex);
      }
    } else {
      return Promise.reject('Invalid connection string');
    }
  }

  private getStorageAccount() {
    return com.microsoft.azure.storage.CloudStorageAccount
                            .parse(this.connectionString);
  }
}
