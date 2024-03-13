export const questions = [
  {
    section: 1,
    items: [
      {
        label: 'Username',
        type: 'text',
        value: 'username'
      },
      {
        label: 'Email',
        type: 'text',
        value: 'email'
      },
      {
        label: 'Password',
        type: 'password',
        value: 'password'
      },
      {
        label: 'First Name',
        type: 'text',
        value: 'first_name'
      },
        {
        label: 'Last Name',
        type: 'text',
        value: 'last_name'
      }
    ]
  },
  {
    section: 2,
    items: [
      {
        label: 'City',
        type: 'text',
        value: 'city'
      },
      {
        label: 'State',
        type: 'select',
        value: 'state',
        options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
          'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
            'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
          'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
          'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
            'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
          'West Virginia', 'Wisconsin', 'Wyoming']
      },
      {
        label: 'Phone Number',
        type: 'text',
        value: 'phone_number'
      },
    ]
  },
  {
    section: 3,
    items: [
      {
        label: 'Upload a resume for more accurate matches',
        type: 'dragDropFile',
        value: 'resume'
      }
    ]
  }
]