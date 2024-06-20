import { Alert } from "@mui/material";

const Alerts = (showAlert:any) => {
  return (
    <Alert variant="filled" severity="success"
    sx={{
        width: '20%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        animation: showAlert ? 'slideIn 1s forwards' : 'slideOut 1s forwards'
    }}>
    Փոփոխությունը պահպանված է
</Alert>
  );
};
export default Alerts;