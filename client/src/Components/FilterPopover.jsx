

import { Popover, Icon, VStack, Text, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, Button, PopoverBody, Flex } from '@chakra-ui/react';
import { PropTypes } from 'prop-types'; // Import PropTypes
import { GET_TYPE } from '../GraphQL/Queries';
import { useQuery } from "@apollo/client";
import { useState, useEffect  } from 'react'
import FilterIcon from '../icons/FilterIcon';

const TypeItem= ({type, setColumnFilters, isActive}) => <Flex
    align="center"
    cursor="pointer"
    borderRadius={5}
    fontWeight="bold"
    color = "#080221"
    bg={ isActive? "red.600": "transparent"}
    p={1.5}
    _hover={{bg: "#1073c9"}}
    onClick = {
        () => {
            setColumnFilters((prev) => {
                    const types = prev.find(filter => filter.id === 'type')?.value;
                    if(!types) {
                        return prev.concat({id: 'type', value: [type]});
                    }
                    return prev.map((filter) =>
                        filter.id === 'type'? {
                            ...filter,
                            value: isActive?
                            types.filter((s) => s !== type):
                            types.concat(type),
                        }: filter
                    )
                }
            )
        }
    }
    >
    {type}
    </Flex>

TypeItem.propTypes = {
    type: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        // Add more prop types if necessary
    }).isRequired,
};

export const FilterPopover = ( {columnFilters, setColumnFilters} ) => {

    const value = useQuery(GET_TYPE);
    const [data, setData] = useState([]);

    useEffect(() => {
        if(value.data){
          setData(value.data.types);
        }
      }, [value.data]);

    const filterTypes = columnFilters.find(filter => 
        filter.id === 'type')?.value || [];
    return (
        <Popover isLazy>
            <PopoverTrigger>
                <Button
                    size="sm"
                    leftIcon={<Icon as={FilterIcon} fontSize={18} />}
                >Filter</Button>
            </PopoverTrigger>
            <PopoverContent bg="blue.900" >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <Text fontSize="md" fontWeight="bold" mb={4}>Filter by:</Text>
                    <Text fontWeight="bold" color="blue.700" mb={1} textAlign="center" fontSize="lg" bg="blue.100">Pokemon Types</Text>
                    <VStack textAlign="center" spacing={1}>
                        {
                            data.map(type => <TypeItem 
                                type={type} 
                                isActive={ filterTypes.includes(type) } 
                                setColumnFilters={setColumnFilters} 
                                key={type} />
                            )
                        }
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

FilterPopover.propTypes = {
    columnFilters: PropTypes.array.isRequired, // columnFilters should be an array and is required
    setColumnFilters: PropTypes.func.isRequired, // setColumnFilters should be a function and is required
};

TypeItem.propTypes = {
    isActive: PropTypes.bool.isRequired, // setColumnFilters should be a function and is required
    setColumnFilters: PropTypes.func.isRequired, // setColumnFilters should be a function and is required
};