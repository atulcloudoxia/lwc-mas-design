import { LightningElement, track } from 'lwc';

const rowActions = [
    { label: 'Edit Contact', name: 'edit' },
    { label: 'Delete Contact', name: 'delete' }
];

const columns = [
    {
      label: 'Role',
      fieldName: 'role',
      hideDefaultActions:true,
      sortable:true
    },
    {
      label: 'Name',
      fieldName: 'name',
      hideDefaultActions:true,
      sortable:true
    },
    {
      label: 'Email',
      fieldName: 'email',
      type: 'email',
      hideDefaultActions:true,
      sortable:true
    },
    {
      label: 'Phone',
      fieldName: 'phone',
      hideDefaultActions:true,
      sortable:true
    },
    {
        label: 'Status',
        fieldName: 'status',
        type: 'customStatus',
        typeAttributes: {
            status: { fieldName: 'isComplete' }
        },
    },
    {
        type: 'action',
        typeAttributes: {
            rowActions
        }
    }
];

export default class TableContacts extends LightningElement {

    @track editContact = false;
    @track selectedRow = {};
    @track isCorporation = false;

    columns = columns;

    @track data = [
        {
            id: 1,
            name: 'Andrew Hamilton',
            firstname: 'Andrew',
            lastname: 'Hamilton',
            language: 'en',
            dob: '1978-10-29',
            salutation: 'mr',
            sin: '123123123',
            role: 'Buyer 1',
            email: 'andrew@lucidlive.com',
            phone: '514-555-5555',
            address: '123 Main Street',
            city: 'Montreal',
            province: 'qc',
            country: 'ca',
            status: 'Complete',
            isComplete: true,
        },
        {
            id: 2,
            name: 'Tao-Nhan Nguyen',
            firstname: 'Tao-Nhan',
            lastname: 'Nguyen',
            language: 'fr',
            dob: '1942-10-09',
            salutation: 'mr',
            sin: '123123123',
            role: 'Buyer 2',
            email: 'tao@onyxtech.ca',
            phone: '514-555-5555',
            status: 'Missing Information',
            isComplete: false,
        },
        {
            id: 3,
            name: 'Chuck Norris',
            firstname: 'Chuck',
            lastname: 'Norris',
            language: 'ch',
            dob: '1852-10-09',
            salutation: 'mr',
            sin: '123123123',
            role: 'corporation',
            email: 'chuck@norris.ca',
            phone: '514-555-5555',
            status: 'Complete',
            isComplete: true,
        }
    ];

    roleOptions = [
        { label: 'Buyer 1', value: 'buyer-1'},
        { label: 'Buyer 2', value: 'buyer-2'},
        { label: 'Buyer 3', value: 'buyer-3'},
        { label: 'Buyer 4', value: 'buyer-4'},
        { label: 'Realtor', value: 'realtor'},
        { label: '3rd Party', value: '3rd-party'},
        { label: 'Former Buyer 1', value: 'former-buyer-1'},
        { label: 'Former Buyer 2', value: 'former-buyer-2'},
        { label: 'Former Buyer 3', value: 'former-buyer-3'},
        { label: 'Former Buyer 4', value: 'former-buyer-4'},
        { label: 'Witness', value: 'witness'},
        { label: 'Corporation', value: 'corporation'},
        { label: 'Referred by Client', value: 'referred-by-client'},
    ];

    salutationOptions = [
        { label: 'Mr.', value: 'mr'},
        { label: 'Ms.', value: 'ms'},
        { label: 'Mrs.', value: 'mrs'},
        { label: 'Dr.', value: 'dr'},
        { label: 'Prof.', value: 'prof'},
    ];

    languageOptions = [
        { label: 'English', value: 'en'},
        { label: 'French', value: 'fr'},
        { label: 'Chinese.', value: 'ch'},
    ];

    handleRoleChange(event) {
        let role = event.detail.value;

        this.isCorporation = role === 'corporation';
        this.selectedRow.role = role;
    }

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
        //const index = this.findRowById(id);

        this.selectedRow = row;
        //this.selectedRow = Object.assign(row, {});
        this.isCorporation = row.role === 'corporation';
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

    /**
     *  handleFormSubmit
     */
    handleFormSubmit(event) {
        event.preventDefault();
        this.editContact=false;
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
