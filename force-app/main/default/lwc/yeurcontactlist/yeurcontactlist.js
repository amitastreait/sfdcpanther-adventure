/* eslint-disable no-console */
import { LightningElement, api, wire, track } from 'lwc';
import contactList from '@salesforce/apex/YeurContactController.contactList';
import YEURDREAMIN_LOGO from '@salesforce/resourceUrl/YeurDreaminLogo';
export default class Yeurcontactlist extends LightningElement {
    @api contacts;
    @api errors;
    YEURDREAMINLOGO = YEURDREAMIN_LOGO;
    @track searchParam;
    @track selectedContact;
    @wire(contactList)
        wiredContacts({error, data}){
            if(data){
                this.contacts = data;
                this.errors = undefined;
            }
            if(error){
                this.errors = error;
                this.data = undefined;
            }
        }

    errorCallback(error){
        console.log(`Error Occured while fethcing the contacts ${error}`)
    }
    handleSelectRecord(event){
        event.preventDefault();
        const contactId = event.detail;
        console.log(`Selected Contact Recprd ${contactId}`);

        this.selectedContact = this.contacts.find(
            contact => contact.Id === contactId
        );

        console.log(`selected contact record is ${this.selectedContact}`)
    }
}