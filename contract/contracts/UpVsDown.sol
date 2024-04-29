//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./ERC404/ERC404.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/math/SignedMath.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract UpVsDown is ERC404, ReentrancyGuard  {
    using Address for address payable;

    string public dataURI;
    string public baseTokenURI;
    
    IUniswapV2Router02 private immutable router;
    address private immutable weth9;
    address private immutable pair;
    bool private trading = false;
    
    address private feeReceiver;
    uint256 private feeSwapLimit = 1 * 10 ** 17;

    uint256 public buyFee = 500;
    uint256 public sellFee = 500;
    uint256 public feeWeight = 10000;

    constructor(
        address _router,
        address _feeReceiver, 
        address _owner
    ) ERC404("UpVsDown", "$UVD", 18, 10000, _owner) {
        balanceOf[_owner] = 10000 * 10 ** 18;
        
        feeReceiver = _feeReceiver;
        router = IUniswapV2Router02(_router);
        weth9 = router.WETH();
        pair = IUniswapV2Factory(router.factory()).createPair(address(this), weth9);

        whitelist[pair] = true;
    }

    function enableTrading(bool _trading) public onlyOwner {
        trading = _trading;
    }

    function setFee(uint256 _buyFee, uint256 _sellFee) public onlyOwner {
        buyFee = _buyFee;
        sellFee = _sellFee;
    }

    function setDataURI(string memory _dataURI) public onlyOwner {
        dataURI = _dataURI;
    }

    function setTokenURI(string memory _tokenURI) public onlyOwner {
        baseTokenURI = _tokenURI;
    }

    function setNameSymbol(
        string memory _name,
        string memory _symbol
    ) public onlyOwner {
        _setNameSymbol(_name, _symbol);
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        if (bytes(baseTokenURI).length > 0) {
            return string.concat(baseTokenURI, Strings.toString(id));
        } else {
            uint8 seed = uint8(bytes1(keccak256(abi.encodePacked(id))));
            string memory image;
            string memory color;

            if (seed <= 100) {
                image = "1.gif";
                color = "Green";
            } else if (seed <= 160) {
                image = "2.gif";
                color = "Blue";
            } else if (seed <= 210) {
                image = "3.gif";
                color = "Purple";
            } else if (seed <= 240) {
                image = "4.gif";
                color = "Orange";
            } else if (seed <= 255) {
                image = "5.gif";
                color = "Red";
            }

            string memory jsonPreImage = string.concat(
                string.concat(
                    string.concat('{"name": "Pandora #', Strings.toString(id)),
                    '","description":"A collection of 10,000 Replicants enabled by ERC404, an experimental token standard.","external_url":"https://pandora.build","image":"'
                ),
                string.concat(dataURI, image)
            );
            string memory jsonPostImage = string.concat(
                '","attributes":[{"trait_type":"Color","value":"',
                color
            );
            string memory jsonPostTraits = '"}]}';

            return
                string.concat(
                    "data:application/json;utf8,",
                    string.concat(
                        string.concat(jsonPreImage, jsonPostImage),
                        jsonPostTraits
                    )
                );
        }
    }

    function transferFrom(
        address from,
        address to,
        uint256 amountOrId
    ) public override {
        if (amountOrId <= minted) {
            if (from != _ownerOf[amountOrId]) {
                revert InvalidSender();
            }

            if (to == address(0)) {
                revert InvalidRecipient();
            }

            if (
                msg.sender != from &&
                !isApprovedForAll[from][msg.sender] &&
                msg.sender != getApproved[amountOrId]
            ) {
                revert Unauthorized();
            }

            balanceOf[from] -= _getUnit();

            unchecked {
                balanceOf[to] += _getUnit();
            }

            _ownerOf[amountOrId] = to;
            delete getApproved[amountOrId];

            // update _owned for sender
            uint256 updatedId = _owned[from][_owned[from].length - 1];
            _owned[from][_ownedIndex[amountOrId]] = updatedId;
            // pop
            _owned[from].pop();
            // update index for the moved id
            _ownedIndex[updatedId] = _ownedIndex[amountOrId];
            // push token to to owned
            _owned[to].push(amountOrId);
            // update index for to owned
            _ownedIndex[amountOrId] = _owned[to].length - 1;

            emit Transfer(from, to, amountOrId);
            emit ERC20Transfer(from, to, _getUnit());
        } else {
            uint256 allowed = allowance[from][msg.sender];

            if (allowed != type(uint256).max)
                allowance[from][msg.sender] = allowed - amountOrId;

            _transfer(from, to, amountOrId);
        }
    }

    function transfer(
        address to,
        uint256 amount
    ) public override returns (bool) {
        return _transfer(msg.sender, to, amount);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id
    ) public override {
        transferFrom(from, to, id);

        if (
            to.code.length != 0 &&
            ERC721Receiver(to).onERC721Received(msg.sender, from, id, "") !=
            ERC721Receiver.onERC721Received.selector
        ) {
            revert UnsafeRecipient();
        }
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        bytes calldata data
    ) public override {
        transferFrom(from, to, id);

        if (
            to.code.length != 0 &&
            ERC721Receiver(to).onERC721Received(msg.sender, from, id, data) !=
            ERC721Receiver.onERC721Received.selector
        ) {
            revert UnsafeRecipient();
        }
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override returns (bool) {
      if (from == address(this) || to == address(this) || !trading) {
        super._transfer(from, to, amount);
      } else {
        uint256 feeAmount = 0;

        if(from == pair)
          feeAmount = amount * buyFee / feeWeight;
        else if (to == pair)
          feeAmount = amount * sellFee / feeWeight;

        if(feeAmount > 0)
          super._transfer(from, address(this), feeAmount);
        super._transfer(from, to, amount - feeAmount);

        if (balanceOf[address(this)] >= feeSwapLimit) {
            _swapTokensForETH();
        }
      }

      return true;
    }

    function _swapTokensForETH() internal {
        uint256 amount = balanceOf[address(this)];

        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = weth9;

        allowance[address(this)][address(router)] = amount;

        router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            amount,
            0,
            path,
            feeReceiver,
            block.timestamp
        );
    }
}