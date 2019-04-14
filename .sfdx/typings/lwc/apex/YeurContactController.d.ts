declare module "@salesforce/apex/YeurContactController.contactList" {
  export default function contactList(): Promise<any>;
}
declare module "@salesforce/apex/YeurContactController.searhContactByName" {
  export default function searhContactByName(param: {contacName: any}): Promise<any>;
}
declare module "@salesforce/apex/YeurContactController.contactByAccountId" {
  export default function contactByAccountId(param: {accountId: any}): Promise<any>;
}
