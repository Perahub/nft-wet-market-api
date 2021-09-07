// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract Coin is ERC20PresetMinterPauser {
    constructor(uint256 initialSupply)
        ERC20PresetMinterPauser("PHP Token", "PHPT")
    {
        super._mint(msg.sender, initialSupply);
    }
}
