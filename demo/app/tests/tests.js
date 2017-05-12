var NativescriptAzureStorage = require("nativescript-nativescript-azure-storage").NativescriptAzureStorage;
var nativescriptAzureStorage = new NativescriptAzureStorage();

// TODO replace 'functionname' with an acual function name of your plugin class and run with 'npm test <platform>'
describe("functionname", function() {
  it("exists", function() {
    expect(nativescriptAzureStorage.functionname).toBeDefined();
  });

  it("returns a promise", function() {
    expect(nativescriptAzureStorage.functionname()).toEqual(jasmine.any(Promise));
  });
});