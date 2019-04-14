/* eslint-disable no-console */
import { LightningElement, api, wire } from 'lwc';
import contactByAccountId from '@salesforce/apex/YeurContactController.contactByAccountId';
export default class Yeuraccountcontacts extends LightningElement {
    @api recordId;
    @api errors;

    markersTitle = 'Related Contacts';

    @api mapMarkers = [];

    @wire(contactByAccountId, { accountId: '$recordId' })
    wiredContacts({ error, data }) {
        console.log(' Data ', data);
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i]) {
                    this.mapMarkers.push({
                        location: {
                            City: {...data[i].MailingCity},
                            Country: {...data[i].MailingCountry},
                        },
                        icon: 'standard:contact',
                        title: data[i].Name,
                    })
                }
            }
        }
        if (error) {
            this.errors = error;
        }
    }
}