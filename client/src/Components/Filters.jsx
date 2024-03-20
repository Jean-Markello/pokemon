import { Input, Icon, InputGroup, InputLeftElement, HStack } from '@chakra-ui/react';
import { PropTypes } from 'prop-types'; 
import { FilterPopover } from './FilterPopover';
//import { FilterPopover } from './FilterPopover';
import SearchIcon  from '../icons/SearchIcon';


const Filters = ({ columnFilters, setColumnFilters }) => {
    const PokedexName = columnFilters.find((filter) => filter.id === 'name')?.value || '';

    const onFilterChange = (id, value) => setColumnFilters(
        prev => prev.filter(filter => filter.id !== id).concat({ id, value }
        ));

    return (
        <HStack mb={6} spacing={3}>
            <InputGroup size='sm' maxW='12rem'>
                <InputLeftElement pointerEvents='none'>
                    <Icon color="grey" as={SearchIcon} />
                </InputLeftElement>
                <Input
                    type='test'
                    variant='filled'
                    placeholder='Name'
                    borderRadius={5}
                    value={PokedexName}
                    onChange={(e) => onFilterChange('name', e.target.value)}
                />
            </InputGroup>
            <FilterPopover columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
        </HStack>
    );
};


Filters.propTypes = {
    columnFilters: PropTypes.array.isRequired, // columnFilters should be an array and is required
    setColumnFilters: PropTypes.func.isRequired, // setColumnFilters should be a function and is required
};

export default Filters;
