[![npm](https://img.shields.io/npm/v/nativescript-azure-storage.svg)](https://www.npmjs.com/package/nativescript-azure-storage)
[![npm](https://img.shields.io/npm/dt/nativescript-azure-storage.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-azure-storage)

# nativescript-azure-storage

## Installation
`tns plugin add nativescript-azure-storage`

## Usage

```
import { NativeScriptAzureStorage } from 'nativescript-azure-storage';
let azureStorage = new NativeScriptAzureStorage(this.azureStorageConnectionString);
```

## Available Methods
`createTable`: Create table with the specified name
```
azureStorage.createTable('table')
.then(() => console.log(`Table Created!`))
.catch((err) => console.log(`Error creating table: ${err}`));
```

`addRow`: Insert new row from an object
```
azureStorage.addRow('table', { foo: 'bar' }, 'partitionKey', 'rowKey')
.then(() => console.log(`Row created successfuly!`))
.catch((err) => console.log(`Error creating row: ${err}`));
```

`addRows`: Insert new row from a list of object
```
let array = new Array<any>();
array.push({ foo: 'bar' });
azureStorage.addRows('table', 'partitionKey', 'foo', array)
.then(() => console.log(`Rows created successfuly!`))
.catch((err) => console.log(`Error creating rows: ${err}`));
```

`listTables`: List all tables from storage
```
azureStorage.listTables()
.then((tables) => {
    tables.forEach((table) => {
        console.log(`Table:${table}`);
    });
})
.catch((err) => console.log(`Error getting tables: ${err}`));
```

`listRows`: List all rows from a specified table
```
azureStorage.listRows('table')
.then((rows) => {
    rows.forEach((row) => {
        console.log(`Row:${row.partitionKey} | ${row.rowKey} | ${row.getTimestamp() }`);
    });
})
.catch((err) => console.log(`Error getting rows: ${err}`));
```

`createBlobContainer`: Create a blob container
```
azureStorage.createBlobContainer('blobContainer')
.then(() => console.log(`Blog container Created!`))
.catch((err) => console.log(`Error creating blob container: ${err}`));
```

`deleteBlobContainer`: Delete a blob container
```
azureStorage.deleteBlobContainer('blobContainer')
.then(() => console.log(`Blog container deleted!`))
.catch((err) => console.log(`Error deleting blob container: ${err}`));
```

`uploadBlob`: Upload blob
```
azureStorage.uploadBlob('blobContainer', 'blobName', 'Hello World!')
.then(() => console.log(`Uploaded successfuly`))
.catch((err) => console.log(`Error uploading: ${err}`));
```

`deleteBlob`: Delete blob
```
azureStorage.deleteBlob('blobContainer', 'blobName')
.then(() => console.log(`Blob deleted successfuly`))
.catch((err) => console.log(`Error deleting blob: ${err}`));
```

`downloadBlob`: Download blob

## Next Version (available soon)
`updateRow`;

`deleteRow`;

