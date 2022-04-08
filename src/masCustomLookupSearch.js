import { LightningElement, track, api} from 'lwc';

export default class CustomLookupSearch extends LightningElement {
    @api placeholder;
    @track searchKey;
    handleChange(event){
        /* eslint-disable no-console */
        //console.log('Search Event Started ');
        const searchKey = event.target.value;
        /* eslint-disable no-console */
        event.preventDefault();
        const searchEvent = new CustomEvent(
            'lookupchange', 
            { 
                detail : searchKey
            }
        );
        this.dispatchEvent(searchEvent);
    }
    handleonClick(event){
        const search = event.target.value;
        event.preventDefault();
        const onclicklookup = new CustomEvent(
            'lookupclick', 
            { 
                detail : search
            }
        );
        console.log('in click event2');
        this.dispatchEvent(onclicklookup);
    }
    handleEsc(event){
        const search = event.target.value;
        if(event.key === "Escape"){
            event.preventDefault();
            const onclicklookup = new CustomEvent(
                'lookupremove', 
                { 
                    detail : search
                }
            );
            console.log('in click event2');
            this.dispatchEvent(onclicklookup);
        }
    }
}