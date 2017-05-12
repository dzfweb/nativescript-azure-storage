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

## Next Version (available soon)
`updateRow`;
`deleteRow`;
`listTables`;
`listRows`:
