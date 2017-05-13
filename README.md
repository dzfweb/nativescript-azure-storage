# nativescript-azure-storage

## Installation
`tns plugin add nativescript-azure-storage`

## Usage

```
import { NativescriptAzureStorage } from 'nativescript-azure-storage';
let azureStorage = new NativescriptAzureStorage(this.azureStorageConnectionString);
```

## Available Methods
`createTable`: Create table with the specified name

`addRows`: Insert new row from a list of object

`addRow`: Insert new row from an object

`listTables`: List all tables from storage

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
