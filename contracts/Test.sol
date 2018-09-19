pragma solidity ^0.4.23;

contract Test {
    event CheckMoney(
        uint Wallet_sender,
        uint Wallet_reciever
    ); 
    
    mapping(bytes32 => uint) wallet;
    
    function set() public {
        wallet['A'] = 20000;
        wallet['B'] = 10000;
    }

    function checkBalance(bytes32 name) view public returns (uint) {
        return wallet[name]; 
    }
    
    function sendMoney(bytes32 f, bytes32 t, uint money) public {
        wallet[f] = wallet[f] - money;
        wallet[t] = wallet[t] + money;
        emit CheckMoney(wallet[f], wallet[t]);
    } 
    
    function xxx(uint gg) public {
        emit CheckMoney(gg,gg);
    }
}
