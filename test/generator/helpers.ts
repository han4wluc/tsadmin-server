export const userColumns = {
  columns: [
    {
      id: 'id',
      label: 'ID',
      type: 'number',
      options: {},
      required: false,
      create: {
        display: false,
        editable: false,
      },
      update: {
        display: true,
        editable: false,
      },
    },
    {
      id: 'uuid',
      label: 'UUID',
      type: 'string',
      options: {},
      required: false,
      create: {
        display: false,
        editable: false,
      },
      update: {
        display: true,
        editable: false,
      },
    },
    {
      id: 'active',
      label: 'Active',
      type: 'boolean',
      options: {},
      required: true,
      create: {
        display: true,
        editable: true,
        default: true,
      },
      update: {
        display: true,
        editable: true,
        default: true,
      },
    },
    {
      id: 'role',
      label: 'Role',
      type: 'enum',
      options: {
        enumObject: {
          admin: 'admin',
          editor: 'editor',
          ghost: 'ghost',
        },
      },
      required: false,
      create: {
        display: true,
        editable: true,
        default: 'ghost',
      },
      update: {
        display: true,
        editable: true,
      },
    },
    {
      id: 'firstName',
      label: 'First Name',
      type: 'string',
      options: {},
      required: true,
      create: {
        display: true,
        editable: true,
      },
      update: {
        display: true,
        editable: true,
      },
    },
    {
      id: 'lastName',
      label: 'Last Name',
      type: 'string',
      options: {},
      required: true,
      create: {
        display: true,
        editable: true,
        default: false,
      },
      update: {
        display: true,
        editable: true,
        default: false,
      },
    },
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      options: {
        min: 1,
        max: 100,
      },
      required: false,
      create: {
        display: true,
        editable: true,
        default: 18,
      },
      update: {
        display: true,
        editable: true,
      },
    },
    {
      id: 'birthday',
      label: 'Birthday',
      type: 'date',
      options: {},
      required: false,
      create: {
        display: true,
        editable: true,
      },
      update: {
        display: true,
        editable: true,
      },
    },
    {
      id: 'notes',
      label: 'Notes',
      type: 'text',
      options: {},
      required: false,
      create: {
        display: true,
        editable: true,
      },
      update: {
        display: true,
        editable: true,
      },
    },
    {
      id: 'config',
      label: 'Config',
      type: 'json',
      options: {
        rows: 10,
      },
      required: false,
      create: {
        display: true,
        editable: true,
      },
      update: {
        display: true,
        editable: true,
      },
    },
    {
      id: 'createdAt',
      label: 'Created At',
      type: 'datetime',
      options: {},
      required: false,
      create: {
        display: false,
        editable: false,
      },
      update: {
        display: true,
        editable: false,
      },
    },
    {
      id: 'updatedAt',
      label: 'Updated At',
      type: 'datetime',
      options: {},
      required: false,
      create: {
        display: false,
        editable: false,
      },
      update: {
        display: true,
        editable: false,
      },
    },
    {
      id: 'version',
      label: 'Version',
      type: 'number',
      options: {},
      required: false,
      create: {
        display: false,
        editable: false,
      },
      update: {
        display: true,
        editable: false,
      },
    },
  ],
};
