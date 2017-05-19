import async from 'async';
declare var com: any;

export class NativeScriptAzureStorage {
  private storageAccount: any;
  private tableClient: any;
  private blobClient: any;
  private connectionString: string = undefined;

  constructor(connectionString: string) {
    let policy = new android.os.StrictMode.ThreadPolicy.Builder().permitAll().build();
    android.os.StrictMode.setThreadPolicy(policy);

    this.connectionString = connectionString;
    this.storageAccount = com.microsoft.azure.storage.CloudStorageAccount.parse(this.connectionString);
    this.tableClient = this.storageAccount.createCloudTableClient();
    this.blobClient = this.storageAccount.createCloudBlobClient();;
  }

  createTable(tableName: string): Promise<any> {
    try {
      let cloudTable = this.tableClient.getTableReference(tableName);
      cloudTable.createIfNotExists();
      return Promise.resolve(true);
    } catch (ex) {
      return Promise.reject(ex);
    }
  }

  uploadBlob(containerName: string, blobName: string, blobValue: any): Promise<any> {
    try {
      let container = this.blobClient.getContainerReference(containerName);
      let blob = container.getBlockBlobReference(blobName);
      blob.uploadText(blobValue);
      return Promise.resolve(true);
    } catch (ex) {
      return Promise.reject(ex);
    }
  }

  deleteBlob(containerName: string, blobName: string): Promise<any> {
    try {
      let container = this.blobClient.getContainerReference(containerName);
      let blob = container.getBlockBlobReference(blobName);
      blob.deleteIfExists();
      return Promise.resolve(true);
    } catch (ex) {
      return Promise.reject(ex);
    }
  }

  downloadBlob(containerName: string, blobName: string): Promise<any> {
    try {
      let list = new Array<any>();
      let container = this.blobClient.getContainerReference(containerName);
      for (let blobItem in container.listBlobs()) {
        let retrievedBlob = <any> blobItem;
        list.push(retrievedBlob.downloadText());
      }
      return Promise.resolve(list);
    } catch (ex) {
      return Promise.reject(ex);
    }
  }

  deleteBlobContainer(containerName: string): Promise<any> {
    try {
      let container = this.blobClient.getContainerReference(containerName);
      container.deleteIfExists();
      return Promise.resolve(true);
    } catch (ex) {
      return Promise.reject(ex);
    }
  }

  createBlobContainer(containerName: string): Promise<any> {
    try {
      let container = this.blobClient.getContainerReference(containerName);
      container.createIfNotExists();
      let containerPermissions = new com.microsoft.azure.storage.blob.BlobContainerPermissions();
      containerPermissions.setPublicAccess(com.microsoft.azure.storage.blob.BlobContainerPublicAccessType.CONTAINER);
      container.uploadPermissions(containerPermissions);
      return Promise.resolve(true);
    } catch (ex) {
      return Promise.reject(ex);
    }
  }

  listTables(tableName?: string): Promise<string[]> {
    try {
      let cloudTable = this.tableClient.listTables(tableName, null, null);

      let tables = new Array<string>();
      let iterator = cloudTable.iterator();

      while (iterator.hasNext()) {
        tables.push(iterator.next());
      }

      return Promise.resolve(tables);
    } catch (ex) {
      return Promise.reject(ex);
    }
  }

  listRows(tableName: string): Promise<any[]> {
    try {
      let rows = new Array<any>();
      let cloudTable = this.tableClient.getTableReference(tableName);
      let query = new com.microsoft.azure.storage.table.
                      TableQuery.from(com.microsoft.azure.storage.table.TableServiceEntity.class);
      let result = cloudTable.execute(query);
      let iterator = result.iterator();

      while (iterator.hasNext()) {
        rows.push(iterator.next());
      }

      return Promise.resolve(rows);
    } catch (ex) {
      return Promise.reject(ex);
    }
  }

  addRows(table: string, partitionKey: string, rowKeyName: string, items: any[]): Promise<any> {
    return new Promise<boolean>((resolve, reject) => {
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
    });
  }

  addRow(table: string, itemToAdd: any, partitionKey: string, rowKey: string): Promise<any> {
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
  }
}
