const { task } = require("hardhat/config");

// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs) => {
    const accounts = await ethers.getSigners();
  
    for (const account of accounts) {
      console.log(account.address);
    }
  });
  
task("balance", "Prints an account balance")
  .addParam("account", "The accounts address")
  .setAction(async (taskArgs) => {
    const account = taskArgs.account;
    const balance = await ethers.provider.getBalance(account);
    console.log(ethers.utils.formatUnits(balance, "ether"), "ETH");
    console.log(ethers.utils.formatEther(balance), "ETH");
  });

task("address", "Print an address from a private key")
  .addParam("privatekey", "The private key")
  .setAction(async (taskArgs, hre) => {
    const key = taskArgs.privatekey;
    const wallet = new hre.ethers.Wallet(key);
    console.log("Address: ", wallet.address);
  });

task("blockNumber", "Prints the current block number", async (taskArgs) => {
    await ethers.provider.getBlockNumber().then((blockNumber) => {
        console.log("Current block number: " + blockNumber);
    });
  });

task("provider", "Prints the provider informaiotn", async (taskArgs) => {
    console.log(await ethers.provider.getNetwork());
  });
task("checkenv", "Prints the env", async (taskArgs) => {
    console.log(process.env);
  });

task("receipt", "Get Transaction Receipt")
  .addParam("th", "The transaction hash")
  .setAction(async (taskArgs) => {
    console.log(await ethers.provider.getTransactionReceipt(taskArgs.th));
  });

task("inspect", "Prints contract information")
  .addParam("address", "The contract address")
  .setAction(async (taskArgs) => {
    const ERC20_ABI = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function totalSupply() view returns (uint256)",
        "function balanceOf(address) view returns (uint)",
    ];
    const contract = new ethers.Contract(taskArgs.address, ERC20_ABI, ethers.provider)
    const name = await contract.name()
    const symbol = await contract.symbol()
    const totalSupply = await contract.totalSupply()

    console.log(`\nReading from ${taskArgs.address}\n`)
    console.log(`Name: ${name}`)
    console.log(`Symbol: ${symbol}`)
    console.log(`Total Supply: ${totalSupply}\n`)
  });

  task("tokens", "Prints balance of user defined ERC20 Token")
  .addParam("address", "The user address")
  .setAction(async (taskArgs) => {
    const ERC20_ABI = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function totalSupply() view returns (uint256)",
        "function balanceOf(address) view returns (uint)",
    ];
    const contract = new ethers.Contract(process.env.TOKEN_ADDRESS, ERC20_ABI, ethers.provider)
    const name = await contract.name()
    const symbol = await contract.symbol()
    const totalSupply = await contract.totalSupply()

    console.log(`\nReading from ${process.env.TOKEN_ADDRESS}\n`)
    console.log(`Name: ${name}`)
    console.log(`Symbol: ${symbol}`)
    console.log(`Total Supply: ${totalSupply}\n`)
    const balance = await contract.balanceOf(taskArgs.address)
    console.log(`Balance Returned: ${balance}`)
    console.log(`Balance Formatted: ${ethers.utils.formatEther(balance)}\n`)
  });

task("tokenEvent", 
     "Print user defined token transfer events in current block",
     async (taskArgs) => {
        const ERC20_ABI = [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function totalSupply() view returns (uint256)",
            "function balanceOf(address) view returns (uint)",
        
            "event Transfer(address indexed from, address indexed to, uint amount)"
        ];
        
        const address = process.env.TOKEN_ADDRESS
        const contract = new ethers.Contract(address, ERC20_ABI, ethers.provider)
        const block = await ethers.provider.getBlockNumber()

        const transferEvents = await contract.queryFilter('Transfer', block - 1, block)
        console.log(transferEvents)
  });

