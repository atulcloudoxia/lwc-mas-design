import { LightningElement, track } from 'lwc';

const rowActions = [
    { label: 'Edit Contact', name: 'edit' },
    { label: 'Delete Contact', name: 'delete' }
];

const columns = [
    { label: 'Role', fieldName: 'role' },
    { label: 'Name', fieldName: 'name' },
    { label: 'Email', fieldName: 'email', type: 'email' },
    { label: 'Phone', fieldName: 'phone', },
    { label: 'Status', fieldName: 'amount', type: 'currency' },
    {
        type: 'action',
        typeAttributes: { 
            rowActions 
        }
    }
]; 

export default class TableContacts extends LightningElement {

    @track editContact = false;

    columns = columns;

    data = [
        { 
            name: 'Andrew Hamilton',
            role: 'Buyer 1',
            email: 'andrew@lucidlive.com',
            phone: '514-555-5555',
            status: 'Complete'
        },
        { 
            name: 'Tao-Nhan Nguyen',
            role: 'Buyer 2',
            email: 'tao@onyxtech.ca',
            phone: '514-555-5555',
            status: 'Complete'
        },
        { 
            name: 'Chuck Norris',
            role: 'Buyer 3',
            email: 'chuck@norris.ca',
            phone: '514-555-5555',
            status: 'Complete'
        }
    ];

    /**
     * Row actions
     */
    handleRowAction(event) {
        const { action, row } = event.detail;

        switch (action.name) {
            case 'edit':
                this.editRow(row);
                break;

            case 'delete':
                this.deleteRow(row);
                break;

            default:
        }
    }

     /**
     * Edit
     */
    editRow(row) {
        const { id } = row;
        const index = this.findRowById(id);
        
        this.editContact=true;
    }

    /**
     * Delete
     */
    deleteRow(row) {
        const { id } = row;
        const index = this.findRowById(id);
        
        if (index !== -1) {
        this.data = this.data
            .slice(0, index)
            .concat(this.data.slice(index + 1));
        
        // Nhan, handle delete logic here
        }
    }

    findRowById(id) {
        let ret = -1;
        this.data.some((row, index) => {
        if (row.id === id) {
            ret = index;
            return true;
        }
        return false;
        });
        return ret;
    }
}