// external
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
// internal
import { primary } from "../css/muiThemes";
import GalleryItem from "./GalleryItem";
import "../css/gallery.scss";
import { fetchNFTs, fetchNFTCollection } from "../apis/alchemy";

const { REACT_APP_EXAMPLE_WALLET } = process.env;

async function showExample(user) {
  await user.setWallet(REACT_APP_EXAMPLE_WALLET);
  let results = await fetchNFTs(user);
  await user.setNfts(results.ownedNfts);
}

async function addMoreItems(user, next) {
  let results;
  if (user.wallet.length > 0) {
    results = await fetchNFTs(user, next);
    let currentNFTs = JSON.parse(JSON.stringify(user.nfts));
    for (let r in results.ownedNfts) {
      currentNFTs.push(results.ownedNfts[r]);
    }
    await user.setNfts(currentNFTs);
  } else if (user.collection.length > 0) {
    results = await fetchNFTCollection(user, next);
    let currentNFTs = JSON.parse(JSON.stringify(user.nfts));
    for (let r in results.nfts) {
      currentNFTs.push(results.nfts[r]);
    }
    await user.setNfts(currentNFTs);
  }
}

const ObserveGallery = observer(({ user }) => {
  return (
    <>
      {user.nfts.length > 0 ? (
        <div className="gallery-container">
          <div className="gallery-items-container">
            {user.nfts.length > 0 ? (
              <>
                {user.nfts.map((nft) => {
                  if (nft.media[0].gateway.length > 0) {
                    return <GalleryItem user={user} nft={nft} />;
                  }
                })}
              </>
            ) : (
              <></>
            )}
          </div>
          {user.nextPage.length > 0 ? (
            <div className="pagination-container">
              <Button
                variant="outlined"
                className="navbar-search-button"
                style={{ borderRadius: "30px", border: "1px solid black" }}
                theme={primary}
                onClick={() => {
                  addMoreItems(user, true);
                }}
              >
                <span className="navbar-search-button-text">see more...</span>
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="gallery-instructions-container">
          <span className="gallery-instructions-text">
            👋 Enter a wallet or contract address above to begin
          </span>
          <Button
            variant="outlined"
            className="navbar-search-button"
            style={{ borderRadius: "30px", border: "1px solid black" }}
            theme={primary}
            onClick={() => {
              showExample(user);
            }}
          >
            <span className="gallery-example-text">Show me an example</span>
          </Button>
        </div>
      )}
    </>
  );
});

const Gallery = ({ user }) => {
  return <ObserveGallery user={user} />;
};

export default Gallery;
