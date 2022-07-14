import LightningDatatable from 'lightning/datatable';
import masTableTypeStatus from './masTableTypeStatus.html';
import masDatatablePicklist from './masDatatablePicklist.html';
export default class masCustomTable extends LightningDatatable {
  static customTypes = {
    customStatus: {
      template: masTableTypeStatus,
      standardCellLayout: true,
      typeAttributes: ['status'],
    },
    picklist: {
      template: masDatatablePicklist,
      typeAttributes: ['label', 'placeholder', 'options', 'value', 'context'],
    },
    // Other types to come...
  }
  
}
 
