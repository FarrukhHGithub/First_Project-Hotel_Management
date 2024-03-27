/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { data } from "./roomData";
import { Delete, Edit } from "@mui/icons-material";

const Rooms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        id: "avatar",
        header: "Image",
        size: 50,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              alt="room"
              height={100}
              src={row.original.avatar}
              loading="lazy"
              style={{ borderRadius: "5px" }}
            />
          </Box>
        ),
      },
      {
        id: "rooms",
        header: "All Rooms",
        columns: [
          {
            accessorFn: (row) => row.id,
            id: "id",
            header: "#",
            size: 50,
          },
          {
            accessorKey: "roomType",
            header: "Type",
            size: 50,
          },
          {
            accessorKey: "bedType",
            header: "Bed",
            size: 50,
          },
          {
            accessorKey: "nightlyRate",
            header: "Rent",
            size: 50,
          },
          {
            accessorKey: "isBooked",
            header: "Status",
            size: 100,
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor: cell.getValue()
                    ? theme.palette.success.main
                    : theme.palette.warning.main,
                  color: "#fff",
                  borderRadius: "0.25rem",
                  padding: "0.25rem",
                  fontWeight: "500",
                })}
              >
                {cell.getValue() ? "Available" : "Booked"}{" "}
                {/* Updated logic to display Paid or Unpaid */}
              </Box>
            ),
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
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
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-around",
          left: "30px",
          maxWidth: "1000px",
          position: "sticky",
          width: "100%",
        }}
      >
        <img
          alt="room"
          height={300}
          src={row.original.avatar}
          loading="lazy"
          style={{ borderRadius: "5px" }}
        />
      </Box>
    ),
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
      <Box mb={2} textAlign="right">
        <Button variant="contained" color="primary" onClick={handleModalOpen}>
          ADD NEW+
        </Button>
      </Box>
      <MaterialReactTable table={table} />

      {/* New Room Form */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
            maxWidth: "90%",
            maxHeight: "90%",
            overflowY: "auto",
          }}
        >
          <form>
            <Typography variant="h5">Add New Room</Typography>
            <TextField
              variant="standard"
              label="Type"
              fullWidth
              margin="normal"
            />
            <TextField
              variant="standard"
              label="Bed"
              fullWidth
              margin="normal"
            />
            <TextField
              variant="standard"
              label="Rent(in dollars)"
              fullWidth
              margin="normal"
            />
               <Button
          variant="contained"
          color="primary"
          onClick={handleModalClose}
          style={{ position: 'absolute', top: "81%", right: 10}}
        >
          Close
        </Button>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleModalClose}
              >
                Add Room
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Rooms;