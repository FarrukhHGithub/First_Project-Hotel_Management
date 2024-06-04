/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";
import {
  
  ListItemIcon,
  MenuItem,
  
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
// import { data } from "./BookingsData";

const Bookings = () => {
  const [booking, setBooking] = useState(null);

  const fetchRoom = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/booking/`);
      console.log(response);
      setBooking(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRoom();
  }, []);

  const columns = useMemo(
    () => [
      {
        id: "users",
        header: "All Bookings",
        columns: [
          {
            accessorKey: "name",
            id: "name",
            header: "Name",
          },
          {
            accessorKey: "contact",
            header: "Mobile",
          },
          {
            accessorKey: "fromDate",
            header: "Arrive",
          },
          {
            accessorKey: "toDate",
            header: "Depart",
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: booking || [],
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [5, 10, 15, 20, 25, 30],
      shape: "rounded",
      variant: "outlined",
    },
    renderRowActionMenuItems: ({ closeMenu, table }) => [
      <MenuItem
        key="edit"
        onClick={() => {
          // Edit logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Edit
      </MenuItem>,
      <MenuItem
        key="delete"
        onClick={() => {
          const selectedRows = table.getSelectedRowModel().flatRows;
          selectedRows.forEach((row) => table.deleteRow(row.id));
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        Delete
      </MenuItem>,
    ],
  });

  return (
    <>
      
      <MaterialReactTable table={table} />
    </>
  );
};

export default Bookings;