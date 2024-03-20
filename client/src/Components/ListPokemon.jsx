//import Fdata from "./Components/pokedex.json"
import { getCoreRowModel, useReactTable, flexRender, getFilteredRowModel, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table'
import { useState, useEffect  } from 'react'
import { Box, Icon, Text, Button, ButtonGroup, } from "@chakra-ui/react"
import Filters from './Filters';
import SortIcon from "../icons/SortIcon";
import { useQuery} from "@apollo/client";
import { GET_POKEMON } from "../GraphQL/Queries";

//import * as React from 'react';


function ListPokemon() {

  const value = useQuery(GET_POKEMON);
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  
  useEffect(() => {
    if(value.data){
      setData(value.data.getAllPokemon);
    }
  }, [value.data]);


  const columns = [
    {
      accessorKey: 'id',
      header: "Id",
      cell: (props) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p style={{ margin: 0 }}>{props.getValue()}</p>
        </div>
      ),
      enableColumnFilter: true,
      filterFn: "includesString",
      size: 70
    },
    
    {
      accessorKey: 'name.english',
      id: 'name',
      header: "Name",
      cell: (props) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          {/* Pokémon image */}
          <a href={`/pokemon/${props.getValue()}`} style={{ textDecoration: 'underline', fontSize: 'smaller', display: 'flex', alignItems: 'center' }}>
            <img
              src={`https://img.pokemondb.net/artwork/${props.getValue().toLowerCase()}.jpg`}
              alt={`${props.getValue()} artwork`}
              style={{ width: '40px', height: 'auto' }}
            />
            {/* Display Name */}
            <p style={{ margin: '0', paddingLeft: '5px', width: '150px' }}>{props.getValue()}</p>
          </a>
        </div>
      ),
      enableColumnFilter: true,
      filterFn: "includesString"
    },
    
    {
      accessorKey: 'type',
      header: 'Type',
      cell: (props) => (
        <div>
          <div>
            {props.getValue().map((type, index) => (
              <p style={{ margin: 0,  display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }} key={index}>{type}</p>
            ))}
          </div>
        </div>
      ),
      size: 150,
      enableColumnFilter: true,
      enableSorting: false,
      filterFn: (row, columnId, filterTypes) => {
        if(filterTypes.length === 0) return true;
        const types = row.getValue(columnId);
        return filterTypes.some(filterType => types.includes(filterType));
      }
    }, 
    {
      accessorKey: 'base.HP',
      id: 'hp',
      header: "HP",
      cell: (props) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p >{props.getValue()}</p>
        </div>
      ),
      enableColumnFilter: true,
      filterFn: "includesString",
      size: 100
    },
    {
      accessorKey: 'base.Attack',
      id: 'attack',
      header: "Attack",
      cell: (props) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p >{props.getValue()}</p>
        </div>
      ),
      enableColumnFilter: true,
      filterFn: "includesString",
      size: 150
    },
    {
      accessorKey: 'base.Defense',
      id: 'defense',
      header: "Defense",
      cell: (props) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p >{props.getValue()}</p>
        </div>
      ),
      enableColumnFilter: true,
      filterFn: "includesString",
      size: 150
    },
    {
      accessorKey: 'base.SpAttack',
      id: 'spAttack',
      header: "Sp. Attack",
      cell: (props) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p >{eval(props.getValue())}</p>
        </div>
      ),
      enableColumnFilter: true,
      filterFn: "includesString",
      size: 150
    },
    {
      accessorKey: 'base.SpDefense',
      id: 'spDefense', 
      header: "Sp. Defense",
      cell: (props) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p style={{ margin: 0 }}>{eval(props.getValue())}</p>
        </div>
      ),
      enableColumnFilter: true,
      filterFn: "includesString",
      size: 150
    },
    {
      accessorKey: 'base.Speed',
      id: 'speed',
      header: "Speed",
      cell: (props) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p style={{ margin: 0 }}>{props.getValue()}</p>
        </div>
      ),
      enableColumnFilter: true,
      filterFn: "includesString",
      size: 100
    },
    
  ];

  const table = useReactTable({
    data,
    columns,
    state:{
      columnFilters
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      /> 
      <Box className="table" w={table.getTotalSize()} >
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" w={header.getSize()} key={header.id}>
                {header.column.columnDef.header}
                {
                  header.column.getCanSort() && 
                  <Icon 
                  as={SortIcon} 
                  mx={3}  
                  fontSize={14}
                  onClick= {
                    header.column.getToggleSortingHandler()
                  }
                  />
                }
              </Box>
            ))}
          </Box>
        ))}
        {
          table.getRowModel().rows.map((row) => (
            <Box className="tr" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Box className="td" w={cell.column.getSize()} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
            </Box>
          ))
        }
      </Box>
      <br />
      <Text mb={2}>
        Page {table.getState().pagination.pageIndex + 1} of {" "} {table.getPageCount()}
      </Text>
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button style={{color: 'white'}} onClick={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()}>
          {"<"}
        </Button>
        <Button  style={{color: 'white'}} onClick={() => table.nextPage()} isDisabled={!table.getCanNextPage()}>
          {">"}
        </Button>
      </ButtonGroup>
    </>
  );
}

export default ListPokemon;


