import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function AutocompleteTextField({
  getList,
  getName,
  getEmployeeid,
  setName,
  handleClick,
}) {
  // console.log("EMP", getList);
  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        alignItem: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: window.screen.width * 0.6,
          padding: 5,
          alignSelf: "center",
        }}
      >
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={getList.map(
            (option) => option.employeename + "," + option.employeeid
          )}
          value={getName}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Employee"
              margin="normal"
              variant="outlined"
            />
          )}
          onChange={(event, value) => setName(value)}
          fullWidth
        />
      </div>
      <div
        style={{
          width: window.screen.width * 0.2,
          padding: 5,
          alignSelf: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick()}
          fullWidth
          style={{ height: 55, alignSelf: "center" }}
        >
          Track Employee
        </Button>
      </div>
    </div>
  );
}
