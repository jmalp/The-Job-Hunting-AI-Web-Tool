from configparser import ConfigParser

def load_config(filename='database/database.ini', section='postgresql') -> dict:
    """
    Load configuration parameters from a specified section of a configuration file.

    This function reads a configuration file in INI format and extracts parameters 
    belonging to a specified section. It returns these parameters as a dictionary.

    Args:
    filename (str, optional): The path to the configuration file. Defaults to 'database/database.ini'.
    section (str, optional): The section name from which parameters are to be extracted. Defaults to 'postgresql'.

    Returns:
    dict: A dictionary containing configuration parameters from the specified section.
    
    Raises:
    Exception: If the specified section is not found in the configuration file.
    """
    parser = ConfigParser()
    parser.read(filename)

    config = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            config[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return config


if __name__ == '__main__':
    config = load_config()
    print(config)