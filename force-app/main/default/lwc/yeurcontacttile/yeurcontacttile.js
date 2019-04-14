import { LightningElement, api } from 'lwc';

export default class Yeurcontacttile extends LightningElement {
    @api contactRecord;

    handleClick(event){
        event.preventDefault();

        const selectEvent =  new CustomEvent(
            'select',
            {
                detail : this.contactRecord.Id,
                bubbles : true,
                composed : true
            }
        );
        this.dispatchEvent(selectEvent);
    }
}