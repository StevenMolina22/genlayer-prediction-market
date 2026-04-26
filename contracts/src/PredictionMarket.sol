// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PredictionMarket {
    enum Outcome {
        Unresolved,
        Yes,
        No,
        Invalid
    }

    enum Side {
        None,
        Yes,
        No
    }

    struct Market {
        address creator;
        string question;
        uint256 deadline;
        address resolver;
        uint256 totalYesStake;
        uint256 totalNoStake;
        Outcome outcome;
        bool resolved;
    }

    struct Position {
        Side side;
        uint256 amount;
        bool claimed;
    }

    error InvalidDeadline();
    error InvalidResolver();
    error MarketDoesNotExist();
    error MarketAlreadyResolved();
    error MarketNotResolved();
    error DeadlinePassed();
    error DeadlineNotReached();
    error InvalidStakeAmount();
    error InvalidOutcome();
    error UnauthorizedResolver();
    error PositionAlreadySet();
    error NoPosition();
    error AlreadyClaimed();
    error LosingPosition();
    error NoWinningPool();
    error TransferFailed();

    uint256 public nextMarketId;

    mapping(uint256 => Market) private markets;
    mapping(uint256 => mapping(address => Position)) private positions;

    event MarketCreated(
        uint256 indexed marketId,
        address indexed creator,
        string question,
        uint256 deadline,
        address indexed resolver
    );
    event PositionPlaced(uint256 indexed marketId, address indexed user, Side side, uint256 amount);
    event MarketResolved(uint256 indexed marketId, Outcome outcome, address indexed resolver);
    event Claimed(uint256 indexed marketId, address indexed user, uint256 payout);

    function createMarket(
        string calldata question,
        uint256 deadline,
        address resolver
    ) external returns (uint256 marketId) {
        if (deadline <= block.timestamp) revert InvalidDeadline();
        if (resolver == address(0)) revert InvalidResolver();

        marketId = nextMarketId++;
        markets[marketId] = Market({
            creator: msg.sender,
            question: question,
            deadline: deadline,
            resolver: resolver,
            totalYesStake: 0,
            totalNoStake: 0,
            outcome: Outcome.Unresolved,
            resolved: false
        });

        emit MarketCreated(marketId, msg.sender, question, deadline, resolver);
    }

    function placePosition(uint256 marketId, Side side) external payable {
        Market storage market = _getMarket(marketId);

        if (market.resolved) revert MarketAlreadyResolved();
        if (block.timestamp >= market.deadline) revert DeadlinePassed();
        if (msg.value == 0) revert InvalidStakeAmount();
        if (side != Side.Yes && side != Side.No) revert InvalidOutcome();

        Position storage position = positions[marketId][msg.sender];
        if (position.side == Side.None) {
            position.side = side;
        } else if (position.side != side) {
            revert PositionAlreadySet();
        }

        position.amount += msg.value;

        if (side == Side.Yes) {
            market.totalYesStake += msg.value;
        } else {
            market.totalNoStake += msg.value;
        }

        emit PositionPlaced(marketId, msg.sender, side, msg.value);
    }

    function resolveMarket(uint256 marketId, Outcome outcome) external {
        Market storage market = _getMarket(marketId);

        if (market.resolved) revert MarketAlreadyResolved();
        if (msg.sender != market.resolver) revert UnauthorizedResolver();
        if (block.timestamp < market.deadline) revert DeadlineNotReached();
        if (outcome != Outcome.Yes && outcome != Outcome.No && outcome != Outcome.Invalid) {
            revert InvalidOutcome();
        }

        market.resolved = true;
        market.outcome = outcome;

        emit MarketResolved(marketId, outcome, msg.sender);
    }

    function claim(uint256 marketId) external returns (uint256 payout) {
        Market storage market = _getMarket(marketId);
        if (!market.resolved) revert MarketNotResolved();

        Position storage position = positions[marketId][msg.sender];
        if (position.amount == 0) revert NoPosition();
        if (position.claimed) revert AlreadyClaimed();

        position.claimed = true;

        if (market.outcome == Outcome.Invalid) {
            payout = position.amount;
        } else if (market.outcome == Outcome.Yes) {
            if (position.side != Side.Yes) revert LosingPosition();
            if (market.totalYesStake == 0) revert NoWinningPool();
            payout = (position.amount * (market.totalYesStake + market.totalNoStake)) / market.totalYesStake;
        } else if (market.outcome == Outcome.No) {
            if (position.side != Side.No) revert LosingPosition();
            if (market.totalNoStake == 0) revert NoWinningPool();
            payout = (position.amount * (market.totalYesStake + market.totalNoStake)) / market.totalNoStake;
        } else {
            revert InvalidOutcome();
        }

        (bool success,) = payable(msg.sender).call{value: payout}("");
        if (!success) revert TransferFailed();

        emit Claimed(marketId, msg.sender, payout);
    }

    function getMarket(uint256 marketId) external view returns (Market memory) {
        return _getMarket(marketId);
    }

    function getPosition(uint256 marketId, address user) external view returns (Position memory) {
        _getMarket(marketId);
        return positions[marketId][user];
    }

    function _getMarket(uint256 marketId) internal view returns (Market storage market) {
        market = markets[marketId];
        if (market.resolver == address(0)) revert MarketDoesNotExist();
    }
}
