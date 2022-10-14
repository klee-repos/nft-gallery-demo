// internal
import "../css/home.scss";
import Navbar from "./Navbar";
import Gallery from "./Gallery";
import { ContractCopiedSnackbar, MissingInputSnackbar } from "./Snackbars";

const Home = ({ user }) => {
  return (
    <div className="main">
      <Navbar user={user} />
      <Gallery user={user} />
      <ContractCopiedSnackbar user={user} />
      <MissingInputSnackbar user={user} />
    </div>
  );
};

export default Home;
