import LightningDatatable from 'lightning/datatable';
import masTableTypeStatus from './masTableTypeStatus.html';

export default class masCustomTable extends LightningDatatable {
    static customTypes = {
        customStatus: {
            template: masTableTypeStatus,
            standardCellLayout: true,
            typeAttributes: ['removeable'],
        }
        // Other types here
    }
}
