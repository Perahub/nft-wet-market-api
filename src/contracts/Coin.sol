// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Coin is ERC20PresetMinterPauser {

    constructor(uint256 initialSupply)
        ERC20PresetMinterPauser("PHP Token", "PHPT")
    {
        super._mint(msg.sender, SafeMath.mul(initialSupply, 10 ** decimals()));
    }

    /**
     * @dev Creates `amount` new tokens for `to`.
     *
     * See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(address to, uint256 amount) public virtual override {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "ERC20PresetMinterPauser: must have minter role to mint"
        );
        _mint(to, SafeMath.mul(amount, 10 ** decimals()));
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account)
        public
        view
        virtual
        override
        returns (uint256)
    {
        uint256 currentBalance_ = super.balanceOf(account);
        return SafeMath.div(currentBalance_, 10 ** decimals());
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        uint256 totalSupply_ = super.totalSupply();
        return SafeMath.div(totalSupply_, 10 ** decimals());
    }
}
