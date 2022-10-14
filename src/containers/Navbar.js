// external
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// internal
import { primary } from "../css/muiThemes";
import "../css/navbar.scss";
import coffee from "../assets/coffee_circle.svg";
import { fetchNFTs, fetchNFTCollection } from "../apis/alchemy";

const TWITTER_URL = "https://twitter.com/thekvnlee";

async function performSearch(user) {
  let results;
  if (user.wallet.length > 0) {
    results = await fetchNFTs(user);
    await user.setNfts(results.ownedNfts);
  } else if (user.collection.length > 0) {
    results = await fetchNFTCollection(user);
    await user.setNfts(results.nfts);
  }
  if (user.wallet.length < 1 && user.collection.length < 1) {
    user.setMissingInputSnackbar(true);
  }
}

const ObserveNavbar = observer(({ user }) => {
  return (
    <div className="navbar-container">
      <div className="navbar-left-container">
        <div className="logo-container">
          <img
            className="logo-img"
            src={coffee}
            alt="coffee"
            onClick={() => {
              window.open(TWITTER_URL, "_blank");
            }}
          />
        </div>
      </div>
      <div className="navbar-middle-container">
        <div className="navbar-input-container">
          <TextField
            className="navbar-input"
            label="Wallet address"
            variant="outlined"
            value={user.wallet}
            size="small"
            onChange={(event) => {
              user.setWallet(event.target.value);
            }}
          />
        </div>
        <div className="navbar-input-container">
          <TextField
            className="navbar-input"
            label="Collection address"
            variant="outlined"
            value={user.collection}
            size="small"
            onChange={(event) => {
              user.setCollection(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="navbar-right-container">
        <Button
          variant="outlined"
          className="navbar-search-button"
          style={{ borderRadius: "30px", border: "2px solid black" }}
          theme={primary}
          onClick={() => {
            performSearch(user);
          }}
        >
          <span className="navbar-search-button-text"> Search</span>
        </Button>
      </div>
    </div>
  );
});

const Navbar = ({ user }) => {
  return <ObserveNavbar user={user} />;
};

export default Navbar;
