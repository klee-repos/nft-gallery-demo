import axios from "axios";

const { REACT_APP_ALCHEMY_URL } = process.env;

export async function fetchNFTs(user, next) {
  try {
    let url;
    if (user.collection.length > 0) {
      url = `${REACT_APP_ALCHEMY_URL}/getNFTs/?owner=${user.wallet}&pageSize=16&contractAddresses%5B%5D=${user.collection}`;
    } else {
      url = `${REACT_APP_ALCHEMY_URL}/getNFTs/?owner=${user.wallet}&pageSize=16`;
    }
    if (next) {
      url += `&pageKey=${user.nextPage}`;
    }
    console.log(next, url);
    let results = await axios({
      method: "get",
      url,
    });
    console.log(results.data);
    await user.setNextPage(results.data.pageKey ? results.data.pageKey : "");
    return results.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function fetchNFTCollection(user, next) {
  try {
    let url = `${REACT_APP_ALCHEMY_URL}/getNFTsForCollection/?contractAddress=${user.collection}&withMetadata=true&limit=16`;
    if (next) {
      url += `&startToken=${user.nextPage}`;
    }
    let results = await axios({
      method: "get",
      url,
    });

    console.log(results.data);
    await user.setNextPage(
      results.data.nextToken ? results.data.nextToken : ""
    );
    return results.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
