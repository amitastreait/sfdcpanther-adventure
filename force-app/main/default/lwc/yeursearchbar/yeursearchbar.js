import { LightningElement } from 'lwc';

export default class Yeursearchbar extends LightningElement {

    doSearch(event){
        event.preventDefault();
        const searchEvent = new CustomEvent(
            'search',
            {
                detail : event.target.value
            }
        );
        this.dispatchEvent(searchEvent);
    }
}