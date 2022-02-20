async function main() {
  const ESKToken = await hre.ethers.getContractFactory("ESKToken");
  const eskToken = await ESKToken.deploy("Eskaine Token", "ESK");

  await eskToken.deployed();

  console.log("Contract deployed to:", eskToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
