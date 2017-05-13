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

`addRows`: Insert new row from a list of object

`addRow`: Insert new row from an object

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

`createBlobContainer`: Create a blob container

`deleteBlobContainer`: Delete a blob container

`uploadBlob`: Upload blob

`deleteBlob`: Delete blob

`downloadBlob`: Download blob

## Next Version (available soon)
`updateRow`;

`deleteRow`;

`Support for iOS`;
