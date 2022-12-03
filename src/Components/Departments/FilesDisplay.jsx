import React,{useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'DDate', headerName: 'Date', width: 100 },
    { field: 'title', headerName: 'Title', width: 200, },
    { field: 'wordFile', headerName: 'File', width: 200 },
    { field: 'No', headerName: 'No', width: 120 },
    { field: 'year', headerName: 'Year', width: 80 },
    {
        field: 'DType',
        headerName: 'Type',
        width: 160,
    },
];

export default function FilesDisplay(props) {
    const department = props.department;
    console.log(department)

    return (
        <>
            {department.length>0?
             department.map(dp=>

            <div style={{ height: 400, width: '50rem' }}>
            <DataGrid
                rows={dp.files}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
             ):null}
        </>
    );
}
