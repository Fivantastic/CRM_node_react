export const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
      height: '30px',
      border: 'none',
      borderBottom: 'none',
      borderRadius: '0',
      boxShadow: 'none',
      padding: '10px 0 0 0',
      '&:hover': {
        borderBottom: 'none',
      }
    }),
    input: (provided) => ({
      ...provided,
      color: '#333',
      fontSize: '20px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#ccc',
      fontSize: '20px',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? '#ccc' : '#333',
      fontSize: '20px',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: '0',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#333',
      '&:hover': {
        color: '#333',
      }
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '0',
      borderRadius: '0',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '0',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#f5f5f5' : state.isFocused ? '#e6e6e6' : 'white',
      color: 'black',
      '&:hover': {
        backgroundColor: '#e6e6e6',
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#f5f5f5',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#333',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#999',
      ':hover': {
        backgroundColor: '#333',
        color: 'white',
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: '0',
      cursor: 'pointer',
      '&:hover': {
        color: '#333',
      }
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      fontSize: '14px',
      color: '#999',
    }),
  };
  