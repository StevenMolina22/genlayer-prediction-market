// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "src/PredictionMarket.sol";

contract PredictionMarketTest is Test {
    PredictionMarket internal market;

    address internal creator = address(0xA11CE);
    address internal resolver = address(0xB0B);
    address internal alice = address(0xCAFE);
    address internal bob = address(0xD00D);

    function setUp() public {
        market = new PredictionMarket();
        vm.deal(creator, 10 ether);
        vm.deal(resolver, 10 ether);
        vm.deal(alice, 10 ether);
        vm.deal(bob, 10 ether);
    }

    function _createMarket(uint256 deadline) internal returns (uint256 marketId) {
        vm.prank(creator);
        marketId = market.createMarket("Will ETH close above $5k this year?", deadline, resolver);
    }

    function testCreateMarket() public {
        uint256 deadline = block.timestamp + 1 days;
        uint256 marketId = _createMarket(deadline);

        PredictionMarket.Market memory created = market.getMarket(marketId);
        assertEq(marketId, 0);
        assertEq(created.creator, creator);
        assertEq(created.question, "Will ETH close above $5k this year?");
        assertEq(created.deadline, deadline);
        assertEq(created.resolver, resolver);
        assertEq(created.totalYesStake, 0);
        assertEq(created.totalNoStake, 0);
        assertEq(uint256(created.outcome), uint256(PredictionMarket.Outcome.Unresolved));
        assertFalse(created.resolved);
    }

    function testStakeYesAndNo() public {
        uint256 marketId = _createMarket(block.timestamp + 1 days);

        vm.prank(alice);
        market.placePosition{value: 1 ether}(marketId, PredictionMarket.Side.Yes);

        vm.prank(bob);
        market.placePosition{value: 2 ether}(marketId, PredictionMarket.Side.No);

        PredictionMarket.Market memory created = market.getMarket(marketId);
        PredictionMarket.Position memory alicePosition = market.getPosition(marketId, alice);
        PredictionMarket.Position memory bobPosition = market.getPosition(marketId, bob);

        assertEq(created.totalYesStake, 1 ether);
        assertEq(created.totalNoStake, 2 ether);
        assertEq(uint256(alicePosition.side), uint256(PredictionMarket.Side.Yes));
        assertEq(alicePosition.amount, 1 ether);
        assertFalse(alicePosition.claimed);
        assertEq(uint256(bobPosition.side), uint256(PredictionMarket.Side.No));
        assertEq(bobPosition.amount, 2 ether);
        assertFalse(bobPosition.claimed);
    }

    function testRejectStakeAfterDeadline() public {
        uint256 marketId = _createMarket(block.timestamp + 1 hours);
        vm.warp(block.timestamp + 1 hours);

        vm.prank(alice);
        vm.expectRevert(PredictionMarket.DeadlinePassed.selector);
        market.placePosition{value: 1 ether}(marketId, PredictionMarket.Side.Yes);
    }

    function testResolveMarket() public {
        uint256 deadline = block.timestamp + 1 hours;
        uint256 marketId = _createMarket(deadline);

        vm.warp(deadline);
        vm.prank(resolver);
        market.resolveMarket(marketId, PredictionMarket.Outcome.Yes);

        PredictionMarket.Market memory created = market.getMarket(marketId);
        assertTrue(created.resolved);
        assertEq(uint256(created.outcome), uint256(PredictionMarket.Outcome.Yes));
    }

    function testClaimPayout() public {
        uint256 deadline = block.timestamp + 1 hours;
        uint256 marketId = _createMarket(deadline);

        vm.prank(alice);
        market.placePosition{value: 2 ether}(marketId, PredictionMarket.Side.Yes);

        vm.prank(bob);
        market.placePosition{value: 1 ether}(marketId, PredictionMarket.Side.No);

        vm.warp(deadline);
        vm.prank(resolver);
        market.resolveMarket(marketId, PredictionMarket.Outcome.Yes);

        uint256 aliceBalanceBefore = alice.balance;

        vm.prank(alice);
        uint256 payout = market.claim(marketId);

        assertEq(payout, 3 ether);
        assertEq(alice.balance, aliceBalanceBefore + 3 ether);

        PredictionMarket.Position memory alicePosition = market.getPosition(marketId, alice);
        assertTrue(alicePosition.claimed);
    }

    function testPreventDoubleClaims() public {
        uint256 deadline = block.timestamp + 1 hours;
        uint256 marketId = _createMarket(deadline);

        vm.prank(alice);
        market.placePosition{value: 1 ether}(marketId, PredictionMarket.Side.Yes);

        vm.warp(deadline);
        vm.prank(resolver);
        market.resolveMarket(marketId, PredictionMarket.Outcome.Yes);

        vm.prank(alice);
        market.claim(marketId);

        vm.prank(alice);
        vm.expectRevert(PredictionMarket.AlreadyClaimed.selector);
        market.claim(marketId);
    }

    function testRejectLosingSideClaims() public {
        uint256 deadline = block.timestamp + 1 hours;
        uint256 marketId = _createMarket(deadline);

        vm.prank(alice);
        market.placePosition{value: 1 ether}(marketId, PredictionMarket.Side.Yes);

        vm.prank(bob);
        market.placePosition{value: 1 ether}(marketId, PredictionMarket.Side.No);

        vm.warp(deadline);
        vm.prank(resolver);
        market.resolveMarket(marketId, PredictionMarket.Outcome.Yes);

        vm.prank(bob);
        vm.expectRevert(PredictionMarket.LosingPosition.selector);
        market.claim(marketId);
    }

    function testHandleInvalidMarketRefund() public {
        uint256 deadline = block.timestamp + 1 hours;
        uint256 marketId = _createMarket(deadline);

        vm.prank(alice);
        market.placePosition{value: 1.5 ether}(marketId, PredictionMarket.Side.Yes);

        vm.prank(bob);
        market.placePosition{value: 0.75 ether}(marketId, PredictionMarket.Side.No);

        vm.warp(deadline);
        vm.prank(resolver);
        market.resolveMarket(marketId, PredictionMarket.Outcome.Invalid);

        uint256 aliceBalanceBefore = alice.balance;
        uint256 bobBalanceBefore = bob.balance;

        vm.prank(alice);
        uint256 alicePayout = market.claim(marketId);

        vm.prank(bob);
        uint256 bobPayout = market.claim(marketId);

        assertEq(alicePayout, 1.5 ether);
        assertEq(bobPayout, 0.75 ether);
        assertEq(alice.balance, aliceBalanceBefore + 1.5 ether);
        assertEq(bob.balance, bobBalanceBefore + 0.75 ether);
    }
}
