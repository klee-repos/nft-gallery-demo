// external
import { observer } from "mobx-react-lite";
import Snackbar from "@mui/material/Snackbar";

export const ContractCopiedSnackbar = observer(({ user }) => (
  <Snackbar
    open={user.contractCopiedSnackbar}
    autoHideDuration={4000}
    onClose={() => {
      user.setContractCopiedSnackbar(false);
    }}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <div className="snackbar-container">
      <span className="snackbar-text">✍️ Contract address copied!</span>
    </div>
  </Snackbar>
));

export const MissingInputSnackbar = observer(({ user }) => (
  <Snackbar
    open={user.missingInputSnackbar}
    autoHideDuration={4000}
    onClose={() => {
      user.setMissingInputSnackbar(false);
    }}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <div className="snackbar-container">
      <span className="snackbar-text">
        🙏 Please enter either a wallet or contract address
      </span>
    </div>
  </Snackbar>
));

export const ShowErrorSnackbar = observer(({ user }) => (
  <Snackbar
    open={user.errorSnackbar}
    autoHideDuration={4000}
    onClose={() => {
      user.setErrorSnackbar(false);
    }}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <div className="snackbar-container">
      <span className="snackbar-text">😵 Something went wrong</span>
    </div>
  </Snackbar>
));
