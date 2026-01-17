// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MagicLoot is ERC1155, Ownable {
    uint256 public constant SWORD = 0;
    uint256 public constant SHIELD = 1;
    uint256 public constant POTION = 2;
    uint256 public constant RARE_GEM = 3;

    constructor() ERC1155("https://api.magicbased.app/metadata/{id}.json") Ownable(msg.sender) {
        // Initial mint for testing if needed
    }

    // The main function called by the Farcaster Frame
    function dropLoot(address player) public {
        // Pseudo-randomness (in production you might use Chainlink VRF, but for a fast Game-Frame this is acceptable/cheaper)
        uint256 randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, player, block.prevrandao))) % 100;

        uint256 tokenId;
        uint256 amount = 1;

        if (randomNum < 50) {
            tokenId = POTION; // 50% chance
        } else if (randomNum < 80) {
            tokenId = SHIELD; // 30% chance
        } else if (randomNum < 95) {
            tokenId = SWORD; // 15% chance
        } else {
            tokenId = RARE_GEM; // 5% chance
        }

        _mint(player, tokenId, amount, "");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
}
