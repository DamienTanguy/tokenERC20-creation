const { expect, assert } = require("chai");

describe("Token", function () {

  let contract;

  before(async function(){
    [this.owner, this.user1, this.user2] = await ethers.getSigners();
    const tokenContract = await ethers.getContractFactory("Token");
    contract = await tokenContract.deploy();
  });

  it('should get the initial balace of the owner', async function(){
      let balanceOfOwner = await (await contract.balanceOf(this.owner.address)).toString();
      let expectedBalanceOfOwner = ethers.BigNumber.from('1000000000000000000000000').toString();
      expect(balanceOfOwner).to.equal(expectedBalanceOfOwner);
  });

  it('should mint X token if owner of the smart contractr', async function(){
      let transaction = await contract.connect(this.owner).mint(this.owner.address, ethers.BigNumber.from('1000000000000000000000000'));
      await transaction.wait(1);
      let balanceOfOwner = await (await contract.balanceOf(this.owner.address)).toString();
      let expectedBalanceOfOwner = ethers.BigNumber.from('2000000000000000000000000').toString();
      expect(balanceOfOwner).to.equal(expectedBalanceOfOwner);
  });

  it('should NOT mint token if Not the owner of the smart contractr', async function(){
      await expect(
        contract.connect(this.user1)
        .mint(this.user1.address, ethers.BigNumber.from('1000000000000000000000000'))
      ).to.be.reverted;
      await expect(
        contract.connect(this.user1)
        .mint(this.user1.address, ethers.BigNumber.from('1000000000000000000000000'))
      ).to.be.revertedWith("Ownable: caller is not the owner");
  });

});