import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },

  {
    field: "address_1",
    headerName: "Address",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",

    width: 150,
  },
  {
    field: "website_url",
    headerName: "Website",

    width: 200,
  },
  {
    field: "city",
    headerName: "City",

    width: 150,
  },
  {
    field: "state",
    headerName: "State",

    width: 150,
  },
  {
    field: "rating",
    headerName: "Rating",

    width: 150,
  },
];

export default function DataGridDemo({ rows, onClick }) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        //getRowId={(row) => row.id}
        onRowClick={onClick}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}
