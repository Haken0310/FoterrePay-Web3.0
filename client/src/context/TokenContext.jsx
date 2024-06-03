import React, { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  token_contractABI,
  foterreToken_tx_Sepolia,
} from "../utils/tokenConstant";

export const TokenContext = React.createContext();

const { ethereum } = window;

const getContracts = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    //FoterreToken Contract Instance
    const tokenContract = new ethers.Contract(
      foterreToken_tx_Sepolia,
      token_contractABI,
      signer
    );

    return { tokenContract };
  } catch (error) {
    console.error(error);
    console.log("Please import Sepolia Testnet in your wallet");
  }
};

export const FoterreTokenProvider = ({ children }) => {
  //To store and set account
  const [currentAccount, setCurrentAccount] = useState("");
  //To get form data
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    message: "",
  });
  //To get the user balance
  const [userBalance, setUserBalance] = useState("");

  //To trigger loading screen
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  //To get transaction history
  const [transaction, setTransaction] = useState([]);

  //To get token supply in the market
  const [marketSupply, setmarketSupply] = useState("");

  //To get reverse supply pool
  const [reverseSupply, setReverseSupply] = useState("");

  //To get owner supply pool
  const [ownerSupply, setOwnerSupply] = useState("");

  //To get fraudulent user
  const [fraudUser, setFraudUser] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };
  //Force Reload Page
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  //Check if metamask installed
  const checkWalletConnection = async () => {
    try {
      if (window.ethereum == null) {
        console.log("Install metamask to access the website");
        toast.error("Error: Please Install metamask to access the website");
        provider = ethers.getDefaultProvider(); //If not, read access only is given
      } else {
        const accounts = await ethereum.request({
          method: "eth_accounts",
        });
        const chainId = await ethereum.request({ method: "eth_chainId" });
        const decimalChainId = parseInt(chainId, 16);

        //Sepolia Testnet ChainId
        if (decimalChainId !== 11155111) {
          toast.error("Error: Please switch to Sepolia Testnet");
        }
        //Wallet Connected: If has account, set account
        try {
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
            fetchUserBalance(); //Get User Balance
            getTransactions(); //Get User Transaction History
          } else {
            console.log("No existing account");
            toast.error("Please create a wallet");
          }
        } catch (error) {
          console.error(error);
          toast.error(error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  //Connect Metamask Wallet Function
  const connectWallet = async () => {
    try {
      if (window.ethereum == null) {
        console.log("Install metamask to access the website");
        toast.error("Error: Please Install metamask to access the website");
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
        toast.success("Wallet Connected...Welcome");
        forceUpdate();
      }
    } catch (error) {
      console.error(error);
    }
  };
  //Get User Account Balance
  const fetchUserBalance = async () => {
    try {
      const { tokenContract } = await getContracts();
      const balance = await tokenContract.balanceOf(currentAccount);
      const balanceInEther = ethers.formatUnits(balance, "ether");
      setUserBalance(balanceInEther.toString());
    } catch (error) {
      console.error(error);
    }
  };

  const getTransactions = async () => {
    try {
      if (window.ethereum == null) {
        console.log("Install metamask to access the website");
        provider = ethers.getDefaultProvider(); //If not, read access only is given
      }
      const { tokenContract } = await getContracts();
      const transactionDetails = await tokenContract.getAllTransactions();

      const transactionStruct = await transactionDetails.map((transaction) => ({
        recipient: transaction.recipient,
        sender: transaction.sender,
        amount: parseInt(transaction.amount),
        message: transaction.message,
        timestamp: transaction.timestamp,
      }));
      setTransaction(transactionStruct);
      console.log(transactionStruct);
    } catch (error) {
      console.error(error);
    }
  };

  //Get User Transaction Count
  const fetchUserTransactionCount = async () => {
    try {
      const { tokenContract } = await getContracts();
      const transactionCount = await tokenContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.error(error);
    }
  };
  //Get User Account Balance
  const fetchmarketSupply = async () => {
    try {
      const { tokenContract } = await getContracts();
      const market = await tokenContract.marketSupply();
      const marketSupplyInEther = ethers.formatUnits(market, "ether");
      setmarketSupply(marketSupplyInEther.toString());
    } catch (error) {
      console.error(error);
    }
  };

  //Get User Account Balance
  const fetchreverseSupply = async () => {
    try {
      const { tokenContract } = await getContracts();
      const reverseSupply = await tokenContract.reverseTransactionSupply();
      const reverseSupplyInEther = ethers.formatUnits(reverseSupply, "ether");
      setReverseSupply(reverseSupplyInEther.toString());
    } catch (error) {
      console.error(error);
    }
  };

  //Get Owner/Smart contract Balance
  const fetchownerSupply = async () => {
    try {
      const { tokenContract } = await getContracts();
      const ownerSupply = await tokenContract.ownerToken();
      const ownerSupplyInEther = ethers.formatUnits(ownerSupply, "ether");
      setOwnerSupply(ownerSupplyInEther.toString());
    } catch (error) {
      console.error(error);
    }
  };

  //Get fraudulent user address
  const fetchfraudAddress = async () => {
    try {
      const { tokenContract } = await getContracts();
      const fraudUser = await tokenContract.getAllFraudulentUsers();

      setFraudUser(fraudUser);
    } catch (error) {
      console.error(error);
    }
  };

  //Deposit Token-Smart Contract send token to user
  const depositToken = async () => {
    try {
      if (window.ethereum == null) {
        console.log("Install metamask to access the website");
      } else {
        const { recipient, amount, description } = formData;
        const { tokenContract } = await getContracts();

        //Call contract deposit function
        await tokenContract.userDeposit(amount);
        const transactionHash = await tokenContract.deployToBlockchain(
          recipient,
          amount,
          description
        );
        setLoadingScreen(true);
        console.log(`Adding transaction to blockchain....${transactionHash}`);
        await transactionHash.wait();
        setLoadingScreen(false);
        console.log(`Succesful...Transactionhash = ${transactionHash}`);

        const transactionCount = await tokenContract.getTransactionCount();
        setTransactionCount(transactionCount);

        forceUpdate();
        toast.success("Token successfully deposited in your account");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error...Please contact the developer");
    }
  };

  //Withdraw token- User send token to smart contract
  const withdrawToken = async () => {
    try {
      if (window.ethereum == null) {
        console.log("Install metamask to access the website");
      } else {
        const { recipient, amount, description } = formData;
        const { tokenContract } = await getContracts();

        //Call contract deposit function
        await tokenContract.userWithdrawal(amount);

        const transactionHash = await tokenContract.deployToBlockchain(
          recipient,
          amount,
          description
        );
        setLoadingScreen(true);
        console.log(`Adding transaction to blockchain....${transactionHash}`);
        await transactionHash.wait();
        setLoadingScreen(false);
        console.log(`Succesful...Transactionhash = ${transactionHash}`);

        const transactionCount = await tokenContract.getTransactionCount();
        setTransactionCount(transactionCount);
        forceUpdate();
        toast.success("Token successfully withdrawn...");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error..Address not found");
    }
  };

  //Send FoterreToken- User to User
  const sendToken = async () => {
    try {
      if (window.ethereum == null) {
        console.log("Install metamask to access the website");
      } else {
        const { recipient, amount, description } = formData;
        const { tokenContract } = await getContracts();

        //Use FoterreToken to do Transfer
        await tokenContract.transfer(recipient, amount);

        //Deploy all the transaction detail on Blockchain
        const transactionHash = await tokenContract.deployToBlockchain(
          recipient,
          amount,
          description
        );
        setLoadingScreen(true);
        console.log(`Adding transaction to blockchain....${transactionHash}`);
        await transactionHash.wait();
        setLoadingScreen(false);
        console.log(`Succesful...Transactionhash = ${transactionHash}`);

        const transactionCount = await tokenContract.getTransactionCount();
        setTransactionCount(transactionCount);
        toast.success("Transaction successfully sent!");
        forceUpdate();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending transaction. Please try again");
    }
  };

  const reverseReport = async () => {
    try {
      if (window.ethereum == null) {
        console.log("Install metamask to access the website");
      } else {
        const { recipient, amount, description } = formData;
        const { tokenContract } = await getContracts();

        //Report the target user
        await tokenContract.reportForReverse(recipient, amount);

        //Deploy all the transaction detail on Blockchain
        const transactionHash = await tokenContract.deployToBlockchain(
          recipient,
          amount,
          description
        );
        setLoadingScreen(true);
        console.log(`Adding transaction to blockchain....${transactionHash}`);
        await transactionHash.wait();
        setLoadingScreen(false);
        console.log(`Succesful...Transactionhash = ${transactionHash}`);

        const transactionCount = await tokenContract.getTransactionCount();

        setTransactionCount(transactionCount);
        forceUpdate();
        toast.success("User successfully reported");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error..Address not found");
    }
  };

  useEffect(() => {
    checkWalletConnection();
    fetchUserTransactionCount();
    fetchmarketSupply();
    fetchreverseSupply();
    fetchownerSupply();
    fetchfraudAddress();
  }, [transactionCount, currentAccount]);

  return (
    <TokenContext.Provider
      value={{
        connectWallet,
        currentAccount,
        userBalance,
        marketSupply,
        reverseSupply,
        ownerSupply,
        transaction,
        fraudUser,
        formData,
        setFormData,
        handleChange,
        sendToken,
        depositToken,
        withdrawToken,
        reverseReport,
        loadingScreen,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
