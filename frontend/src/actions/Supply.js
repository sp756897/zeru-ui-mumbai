import { useSelector } from "react-redux";
import { LendingPool } from '@aave/contract-helpers';
import deployed_contracts_address from "../deployed-contracts.json"
import { submitTransaction } from "./submitTransaction";

export const onSupply = async (provider, amount, reserve) => {
    e.preventDefault()

    const user = useSelector((state) => state.account.address);
    const realProvider = provider.provider
    const lendingPoolAddress = deployed_contracts_address.LendingPool.coverage.address
    const wethGatewayAddress = deployed_contracts_address.WETHGateway.coverage.address

    const lendingPool = new LendingPool(realProvider, {
        LENDING_POOL: lendingPoolAddress,
        WETH_GATEWAY: wethGatewayAddress,
    });

    // let amount = '1.456';
    // let reserve = "0xe9F2f5F08dA4864992Af3E98954f34C731D3098D"

    const txs = await lendingPool.deposit({
        user,
        reserve,
        amount
    });

    console.log(txs)

    await submitTransaction(realProvider, txs)
}