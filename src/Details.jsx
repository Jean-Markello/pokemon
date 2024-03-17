//import Fdata from "./Components/pokedex.json"
import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table'
import { useState } from 'react'
import DATA from './data'
import { Box } from "@chakra-ui/react"
//import * as React from 'react';


function Details() {

  const [data, setData] = useState(DATA);
  const columns = [
    {
      accessorKey: 'task',
      header: "Task",
      cell: (props) => <p>{props.getValue()}</p>,
      size: 300
    },
    {
      accessorKey: 'due',
      header: 'Due',
      cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
      size: 300
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      cell: (props) => <p>{props.getValue()}</p>,
      size: 350
    },


  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(table.getHeaderGroups());

  return (
    <>
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" w={header.getSize()} key={header.id}>
                {header.column.columnDef.header}
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
    </>
  );
}

export default Details;


