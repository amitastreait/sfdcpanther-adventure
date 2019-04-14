public with sharing class YeurContactController {
    public YeurContactController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> contactList(){
        List<Contact> contactList = [Select Id, Name, FirstName, LastName, Email, Picture__c, Account.Name
                                    From Contact Where AccountId != null AND Email != null];
        return contactList;
    }
}
