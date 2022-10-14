// external
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { v4 as uuidv4 } from "uuid";

function getTokenId(nft) {
  let id = ethers.utils.formatUnits(nft.id.tokenId, 0);
  if (id.length > 5) {
    return `${id.substring(0, 5)}...`;
  } else {
    return id;
  }
}

const ObserveGalleryItem = observer(({ user, nft }) => {
  return (
    <div className="gallery-item-container" key={uuidv4()}>
      <motion.img
        className="nft-thumbnail"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.9 }}
        src={nft.media[0].gateway}
        alt={nft.title}
        onClick={() => {
          window.open(
            `https://etherscan.io/address/${nft.contract.address}`,
            "_blank"
          );
        }}
      />
      <div className="item-content-container">
        <span className="nft-content-text">{nft.title}</span>
        <div className="nft-content-id-address-container">
          <span className="nft-id-text">#{getTokenId(nft)}</span>
          <motion.div
            className="nft-address-container"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              navigator.clipboard.writeText(nft.contract.address);
              user.setContractCopiedSnackbar(true);
            }}
          >
            <span className="nft-address-text">
              {nft.contract.address.substring(0, 4)}...
              {nft.contract.address.substring(
                nft.contract.address.length - 4,
                nft.contract.address.length
              )}
            </span>
            <div className="copy-icon">
              <ContentCopyIcon sx={{ height: "16px", width: "16px" }} />
            </div>
          </motion.div>
        </div>
        <div className="nft-content-description-container">
          <span className="nft-description-text">{nft.description}</span>
        </div>
      </div>
    </div>
  );
});

const GalleryItem = ({ user, nft }) => {
  return <ObserveGalleryItem user={user} nft={nft} />;
};

export default GalleryItem;
