// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

//Error Handling Section
error notOwner(string message);
error restrictAccess(string message);

contract FoterreToken is ERC20Capped {
    address public immutable _owner;

    //Token Supply Pool
    uint256 public ownerToken;
    uint256 public marketSupply;
    uint256 public reverseTransactionSupply;

    uint256 transactionCount;

    event AccountFrozenEvent(address indexed account, string message);
    //To store scammer address in the smart contract
    address[] public fraudulentUserAddresses;
    address[] public frozenAddresses;
    uint256 penaltyAmount;
    uint256 fraudulentUserCount;

    //To store transaction details
    event Transfer(
        address sender,
        address recipient,
        uint amount,
        string message,
        uint256 datetime
    );

    struct TransactionDetail {
        address sender;
        address recipient;
        uint256 amount;
        string message;
        uint256 datetime;
    }

    TransactionDetail[] transactionStruct;

    //Modifier Section
    modifier ownerAccess() {
        if (msg.sender != _owner) {
            revert notOwner("You are not the owner");
        }
        _;
    }
    modifier notFrozen() {
        for (uint256 i = 0; i < frozenAddresses.length; i++) {
            if (frozenAddresses[i] == msg.sender) {
                emit AccountFrozenEvent(
                    msg.sender,
                    "Your account has been frozen"
                );
                revert restrictAccess("Your account has been frozen");
            }
        }
        _;
    }

    constructor(
        uint256 max_supply
    ) ERC20("Foterre", "FOTE") ERC20Capped(max_supply * 1e18) {
        _owner = msg.sender;
        uint256 initialTokenSupply = 120000000000 * 1e18; //50% of total supply
        uint256 initial_reversePool = 30000000000 * 1e18;

        ownerToken = initialTokenSupply;
        reverseTransactionSupply = initial_reversePool;

        _mint(_owner, initialTokenSupply);
        _mint(_owner, initial_reversePool);
    }

    //Deduct contract token to User
    function userDeposit(uint256 amount) public notFrozen {
        amount = amount * 1e18;
        if (isFraudulentUser(msg.sender)) {
            require(amount <= ownerToken, "Insufficient token supply");
            penaltyAmount = (amount * 20) / 100;
            amount = (amount * 80) / 100;
            ownerToken -= amount;
            marketSupply += amount;
            reverseTransactionSupply += penaltyAmount;
            _transfer(_owner, msg.sender, amount);
        } else {
            require(amount <= ownerToken, "Insufficient token supply");
            ownerToken -= amount;
            marketSupply += amount;
            _transfer(_owner, msg.sender, amount);
        }
    }

    //User withdraw by sending token back to contract
    function userWithdrawal(uint256 amount) public notFrozen {
        amount = amount * 1e18;
        if (isFraudulentUser(msg.sender)) {
            penaltyAmount = (amount * 20) / 100;
            amount = (amount * 80) / 100;
            marketSupply -= amount;
            ownerToken += amount;
            reverseTransactionSupply += penaltyAmount;
        } else {
            marketSupply -= amount;
            ownerToken += amount;
            _transfer(msg.sender, _owner, amount);
        }
    }

    //Override transfer for having different supply pool
    function transfer(
        address to,
        uint256 amount
    ) public override notFrozen returns (bool) {
        amount = amount * 1e18;
        super.transfer(to, amount);
        return true;
    }

    //Owner called this function to send fund from reverse transaction pool
    function reverseTransfer(address victim, uint256 amount) internal {
        require(
            amount <= reverseTransactionSupply,
            "Insufficient fund in the pool"
        );
        reverseTransactionSupply -= amount;
        _transfer(_owner, victim, amount);
    }

    //User report scammer for reverse transaction
    function reportForReverse(address target, uint256 amount) public notFrozen {
        amount = amount * 1e18;
        require(
            amount <= reverseTransactionSupply,
            "Insufficient fund in the pool"
        );
        fraudulentUserAddresses.push(target);
        fraudulentUserCount += 1;
        reverseTransfer(msg.sender, amount);

        restrictAccountAccess(target);
    }

    //Check if target address existed in frauduser
    function restrictAccountAccess(address target) public {
        // Check if the user has been reported more than 3 times
        uint256 reportCount = getFraudulentUserReportCount(target);
        if (reportCount >= 3) {
            frozenAddresses.push(target);
        }
    }

    //To check if the user is fraudulent user
    function isFraudulentUser(address target) public view returns (bool) {
        for (uint256 i = 0; i < fraudulentUserAddresses.length; i++) {
            if (fraudulentUserAddresses[i] == target) {
                return true;
            }
        }
        return false;
    }

    //To show fraudulent usser address
    function getAllFraudulentUsers() public view returns (address[] memory) {
        return fraudulentUserAddresses;
    }

    function getAllFrozenUsers() public view returns (address[] memory) {
        return frozenAddresses;
    }

    //To check if the reported user existed before
    function getFraudulentUserReportCount(
        address target
    ) public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < fraudulentUserAddresses.length; i++) {
            if (fraudulentUserAddresses[i] == target) {
                count++;
            }
        }
        return count;
    }

    //Donation to the help victims
    function addToReversePool(uint256 amount) public {
        amount = amount * 1e18;
        marketSupply -= amount;
        reverseTransactionSupply += amount;
        _transfer(msg.sender, _owner, amount);
    }

    //Add transaction history to Blockchain
    function deployToBlockchain(
        address payable recipient,
        uint amount,
        string memory message
    ) public notFrozen {
        transactionCount += 1;
        transactionStruct.push(
            TransactionDetail(
                msg.sender,
                recipient,
                amount,
                message,
                block.timestamp
            )
        );

        emit Transfer(msg.sender, recipient, amount, message, block.timestamp);
    }

    function getAllTransactions()
        public
        view
        returns (TransactionDetail[] memory)
    {
        return transactionStruct;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
