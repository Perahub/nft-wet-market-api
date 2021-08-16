// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Product is ERC721Enumerable {
    string[] public products;

    mapping(string => bool) _productExists;

    constructor() ERC721("Product", "PRDCT") {}

    modifier productExists(string memory _productName) {
        // require unique product name
        require(!_productExists[_productName], "Product already exists!");
        _;
    }

    function mint(string memory _productName)
        external
        productExists(_productName)
    {
        // product name
        products.push(_productName);
        // https://ethereum.stackexchange.com/a/89793
        uint256 tokenId = products.length - 1;
        // call the mint function
        _mint(msg.sender, tokenId);
        _productExists[_productName] = true;
    }
}
