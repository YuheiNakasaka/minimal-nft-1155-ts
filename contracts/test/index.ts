import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFT", function () {
  it("Should be deployed and minted only by the owner.", async function () {
    const [signer, badSigner] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();

    await nft.deployed();
    expect(await nft.name()).to.equal("MYNFT");

    await nft.mint(signer.address);
    expect(await nft.balanceOf(signer.address)).to.equal(1);

    await expect(nft.connect(badSigner).mint(signer.address)).to.revertedWith(
      "ERC721PresetMinterPauserAutoId: must have minter role to mint"
    );
  });
});
