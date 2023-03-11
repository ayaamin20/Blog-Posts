import { Alert, Stack } from "@mui/material";

export default function ShowAlert({ type, message }) {
  return (
    <Stack
      sx={{
        width: "99%",
        zIndex: "1000",
        justifyContent: " flex-end",
        marginTop: " 10px",
        position: " absolute",
        top: " 5%",
        direction: "rtl",
      }}
      spacing={2}
    >
      <Alert
        style={{
          direction: "ltr",
          width: "20%",
        }}
        severity={type}
      >
        {message}
      </Alert>
      {/* <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert>
      "error" */}
    </Stack>
  );
}
