import React, { useEffect, useState, useCallback } from "react";
import Web3ModalSetup from "./helpers/Web3ModalSetup"
import Account from "./components/Account"
import ThemeSwitcher from "./components/ThemeSwitch";
import Address from "./components/Address";
import { useSelector, useDispatch } from "react-redux"
import { setAddress, setUserSummary, setUserBalances } from "./store/slices/accountSlice";
import { setReserve } from "./store/slices/reserveSlice";
import AssetDetails from "./components/AssetDetails";

import logo from './images/logo.png'
import name from './images/name.png'
import { Button, Layout } from 'antd';
import { Tabs } from 'antd';
import Dashboard from "./components/Dashboard";
import Staking from "./components/Staking";
import Credit from "./components/Credit";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { BrowserRouter as Router, NavLink, Route, Routes } from "react-router-dom";
import 'antd/dist/antd.css';
import { shortenAddress } from "./helpers/ShortenAddress";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { message } from 'antd';

import deployed_contracts_address from "./deployed-contracts.json"
import UiPoolDataProvider_abi from "./artifacts/contracts/misc/UiPoolDataProviderV2.sol/UiPoolDataProviderV2.json"
import walletBalanceProvider_abi from "./artifacts/contracts/misc/WalletBalanceProvider.sol/WalletBalanceProvider.json";
import { UiPoolDataProvider, WalletBalanceProvider } from "@aave/contract-helpers"
import { formatReserves, formatUserSummary } from '@aave/math-utils';
import dayjs from 'dayjs';

const { TabPane } = Tabs;
const { Header, Footer, Content } = Layout;

const { ethers } = require("ethers");

const web3Modal = Web3ModalSetup();

const copysuccess = () => {
    message.success('Address Copied');
  };



export default function Dapp() {

    const dispatch = useDispatch();
    const address = useSelector((state) => state.account.address);
    const userSummary = useSelector((state) => state.account.userSummary);
    const userWalletBalancesDictionary = useSelector((state) => state.account.userWalletBalancesDictionary);
    const reserveData = useSelector((state) => state.reserve.reserveData);

    const [injectedProvider, setInjectedProvider] = useState()

    const ammSymbolMap = {
        '0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5': 'UNIDAIUSDC',
        '0x004375dff511095cc5a197a54140a24efef3a416': 'UNIWBTCUSDC',
        '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11': 'UNIDAIWETH',
        '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc': 'UNIUSDCWETH',
        '0xdfc14d2af169b0d36c4eff567ada9b2e0cae044f': 'UNIAAVEWETH',
        '0xb6909b960dbbe7392d405429eb2b3649752b4838': 'UNIBATWETH',
        '0x3da1313ae46132a397d90d95b1424a9a7e3e0fce': 'UNICRVWETH',
        '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974': 'UNILINKWETH',
        '0xc2adda861f89bbb333c90c492cb837741916a225': 'UNIMKRWETH',
        '0x8bd1661da98ebdd3bd080f0be4e6d9be8ce9858c': 'UNIRENWETH',
        '0x43ae24960e5534731fc831386c07755a2dc33d47': 'UNISNXWETH',
        '0xd3d2e2692501a5c9ca623199d38826e513033a17': 'UNIUNIWETH',
        '0xbb2b8038a1640196fbe3e38816f3e67cba72d940': 'UNIWBTCWETH',
        '0x2fdbadf3c4d5a8666bc06645b8358ab803996e28': 'UNIYFIWETH',
        '0x1eff8af5d577060ba4ac8a29a13525bb0ee2a3d5': 'BPTWBTCWETH',
        '0x59a19d8c652fa0284f44113d0ff9aba70bd46fb4': 'BPTBALWETH',
    };

    const zip = (a, b) => {
        const listOfuserWalletBalances = {}
        a.map((adata, key) => {
            listOfuserWalletBalances[adata] = parseInt(b[key])
        })
        return listOfuserWalletBalances
    }

    const getReservesHumanized = (reservesRaw, poolBaseCurrencyRaw, chainId, lendingPoolAddressProvider) => {

        const reservesData = reservesRaw.map(
            reserveRaw => ({
                id: `${chainId}-${reserveRaw.underlyingAsset}-${lendingPoolAddressProvider}`.toLowerCase(),
                underlyingAsset: reserveRaw.underlyingAsset.toLowerCase(),
                name: reserveRaw.symbol,
                symbol: ammSymbolMap[reserveRaw.underlyingAsset.toLowerCase()]
                    ? ammSymbolMap[reserveRaw.underlyingAsset.toLowerCase()]
                    : reserveRaw.symbol,
                decimals: reserveRaw.decimals.toNumber(),
                baseLTVasCollateral: reserveRaw.baseLTVasCollateral.toString(),
                reserveLiquidationThreshold:
                    reserveRaw.reserveLiquidationThreshold.toString(),
                reserveLiquidationBonus: reserveRaw.reserveLiquidationBonus.toString(),
                reserveFactor: reserveRaw.reserveFactor.toString(),
                usageAsCollateralEnabled: reserveRaw.usageAsCollateralEnabled,
                borrowingEnabled: reserveRaw.borrowingEnabled,
                stableBorrowRateEnabled: reserveRaw.stableBorrowRateEnabled,
                isActive: reserveRaw.isActive,
                isFrozen: reserveRaw.isFrozen,
                liquidityIndex: reserveRaw.liquidityIndex.toString(),
                variableBorrowIndex: reserveRaw.variableBorrowIndex.toString(),
                liquidityRate: reserveRaw.liquidityRate.toString(),
                variableBorrowRate: reserveRaw.variableBorrowRate.toString(),
                stableBorrowRate: reserveRaw.stableBorrowRate.toString(),
                lastUpdateTimestamp: reserveRaw.lastUpdateTimestamp,
                aTokenAddress: reserveRaw.aTokenAddress.toString(),
                stableDebtTokenAddress: reserveRaw.stableDebtTokenAddress.toString(),
                variableDebtTokenAddress:
                    reserveRaw.variableDebtTokenAddress.toString(),
                interestRateStrategyAddress:
                    reserveRaw.interestRateStrategyAddress.toString(),
                availableLiquidity: reserveRaw.availableLiquidity.toString(),
                totalPrincipalStableDebt:
                    reserveRaw.totalPrincipalStableDebt.toString(),
                averageStableRate: reserveRaw.averageStableRate.toString(),
                stableDebtLastUpdateTimestamp:
                    reserveRaw.stableDebtLastUpdateTimestamp.toNumber(),
                totalScaledVariableDebt: reserveRaw.totalScaledVariableDebt.toString(),
                priceInMarketReferenceCurrency:
                    reserveRaw.priceInMarketReferenceCurrency.toString(),
                variableRateSlope1: reserveRaw.variableRateSlope1.toString(),
                variableRateSlope2: reserveRaw.variableRateSlope2.toString(),
                stableRateSlope1: reserveRaw.stableRateSlope1.toString(),
                stableRateSlope2: reserveRaw.stableRateSlope2.toString(),
                priceInMarketReferenceCurrency: 0,
                eModeCategoryId: 0,
                borrowCap: '',
                supplyCap: '',
                debtCeiling: '',
                debtCeilingDecimals: 0,
                isolationModeTotalDebt: '',
                eModeLtv: 0,
                eModeLiquidationThreshold: 0,
                eModeLiquidationBonus: 0,

            }),
        );

        const baseCurrencyData = {
            // this is to get the decimals from the unit so 1e18 = string length of 19 - 1 to get the number of 0
            marketReferenceCurrencyDecimals:
                poolBaseCurrencyRaw.marketReferenceCurrencyUnit.toString().length - 1,
            marketReferenceCurrencyPriceInUsd:
                poolBaseCurrencyRaw.marketReferenceCurrencyPriceInUsd.toString(),
            networkBaseTokenPriceInUsd:
                poolBaseCurrencyRaw.networkBaseTokenPriceInUsd.toString(),
            networkBaseTokenPriceDecimals:
                poolBaseCurrencyRaw.networkBaseTokenPriceDecimals,
        };

        return {
            reservesData,
            baseCurrencyData,
        };
    }

    const getPoolDatawithFormatHumanised = async (pro, addr, chainId) => {
        const lendingPoolAddressProvider = deployed_contracts_address.LendingPoolAddressesProvider.coverage.address
        const uipoolDataProvider_address = deployed_contracts_address.UiPoolDataProvider.coverage.address
        const walletBalanceProviderAddress = deployed_contracts_address.WalletBalanceProvider.coverage.address

        const reserve_data = new UiPoolDataProvider({
            uiPoolDataProviderAddress: uipoolDataProvider_address,
            provider: pro,
            chainId: chainId
        })

        const UiPoolDataProvider_contract = new ethers.Contract(
            deployed_contracts_address.UiPoolDataProvider.coverage.address,
            UiPoolDataProvider_abi.abi,
            pro
        )

        const test = await UiPoolDataProvider_contract.getReservesData(lendingPoolAddressProvider)
        const reserve = test[0]
        const base = test[1]

        const { reservesData, baseCurrencyData } = getReservesHumanized(reserve, base, chainId, lendingPoolAddressProvider);
        const { userReserves, userEmodeCategoryId } = await reserve_data.getUserReservesHumanized({
            lendingPoolAddressProvider,
            user: addr,
        });

        const currentTimestamp = dayjs().unix();
        const formattedPoolReserves = formatReserves({
            reserves: reservesData,
            currentTimestamp: currentTimestamp,
            marketReferenceCurrencyDecimals:
                baseCurrencyData.marketReferenceCurrencyDecimals,
            marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
        });
        console.log("formattedPoolReserves:", formattedPoolReserves)
        await dispatch(setReserve({ reserveData: formattedPoolReserves }))

        const userWalletProviderContract = new ethers.Contract(
            walletBalanceProviderAddress,
            walletBalanceProvider_abi.abi,
            pro
        )
        const userWalletBalances = await userWalletProviderContract.getUserWalletBalances(lendingPoolAddressProvider, addr)
        const userWalletBalancesReserves = userWalletBalances[0]
        const userWalletBalancesBalance = userWalletBalances[1]
        const userWalletBalancesZipped = zip(userWalletBalancesReserves, userWalletBalancesBalance)
        await dispatch(setUserBalances({ userWalletBalancesDictionary: userWalletBalancesZipped }))
        // console.log("userWalletBalancesZipped:", userWalletBalancesZipped)


        const userSummarytemp = formatUserSummary({
            currentTimestamp,
            marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
            marketReferenceCurrencyDecimals:
                baseCurrencyData.marketReferenceCurrencyDecimals,
            userReserves: userReserves,
            formattedReserves: formattedPoolReserves,
            userEmodeCategoryId: userEmodeCategoryId,
        });
        await dispatch(setUserSummary({ userSummary: userSummarytemp }))
        console.log("userSummarytemp:", userSummarytemp)

    }

    const logoutOfWeb3Modal = async () => {
        await web3Modal.clearCachedProvider();
        if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
            await injectedProvider.provider.disconnect();
        }
        setTimeout(() => {
            window.location.reload();
        }, 1);
    };

    const loadWeb3Modal = useCallback(async () => {
        let provider = null
        let addr = null
        let pro = null
        let chainId = null
        let signer_temp = null
        let chainData = null

        try {
            provider = await web3Modal.connect();
            pro = new ethers.providers.Web3Provider(provider);
            await pro.send("eth_requestAccounts", []);
            signer_temp = pro.getSigner();
            addr = await signer_temp.getAddress()
            chainData = await pro.getNetwork()
            chainId = chainData.chainId
            console.log(addr)
        }
        catch (err) {
            console.log("Error in loadWeb3Modal web3Modal connect: ", err)
        }

        try {
            setInjectedProvider(pro)
            dispatch(setAddress({ address: addr }))
        }
        catch (err) {
            console.log("Error in Dispatch and setInjectedProvider: ", err)
        }

        try {
            await getPoolDatawithFormatHumanised(pro, addr, chainId)
        }
        catch (err) {
            console.log("Error in loadWeb3Modal getPoolDatawithFormatHumanised: ", err)
        }

        provider.on("chainChanged", chainId => {
            console.log(`chain changed to ${chainId}! updating providers`);
            pro = new ethers.providers.Web3Provider(provider);
            setInjectedProvider(pro)
            getPoolDatawithFormatHumanised(pro, address, chainId)

        });

        provider.on("accountsChanged", async () => {
            console.log(`account changed!`);
            pro = new ethers.providers.Web3Provider(provider);
            await pro.send("eth_requestAccounts", []);
            const signer_temp = pro.getSigner();
            let addr = await signer_temp.getAddress()
            chainData = await pro.getNetwork()
            chainId = chainData.chainId
            console.log(addr)
            setInjectedProvider(pro)
            dispatch(setAddress({ address: addr }))
            getPoolDatawithFormatHumanised(pro, addr, chainId)

        });

        // Subscribe to session disconnection
        provider.on("disconnect", (code, reason) => {
            console.log(code, reason);
            logoutOfWeb3Modal();
        });
        // eslint-disable-next-line
    }, [setInjectedProvider]);

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            loadWeb3Modal();
        }
    }, [loadWeb3Modal]);

    let wrapperFunction = () => {
        //do something
        navigator.clipboard.writeText(address);
        //do something
        copysuccess();
    }

    const menu = (
        <Menu
            items={[
                {
                    label: <code>Network:Kovan</code>,
                    key: '0',
                },
                {
                    type: 'divider',
                },
                {
                    label: <a onClick={wrapperFunction}>Copy Address</a>,
                    key: '1',
                },
                {
                    label: 'View on Explorer',
                    key: '2',
                },
                {
                    label: <Account
                        web3Modal={web3Modal}
                        loadWeb3Modal={loadWeb3Modal}
                        logoutOfWeb3Modal={logoutOfWeb3Modal}
                    />,
                    key: '3'
                }
            ]}
        />
    );

    let accountButtonInfo = { name: 'Connect', action: loadWeb3Modal };

    return (
        <div className="Dapp">
            <Router>
                <Layout>
                    <Header style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
                        <div style={{ alignItems: 'flex-start' }}>
                            <img src={logo} width={30} />
                            <img src={name} width={100} />
                        </div>
                        <div className="navbar">
                        <NavLink to="/">
                            Dashboard
                        </NavLink>
                        <NavLink to="/staking">
                            Staking
                        </NavLink>
                        <NavLink to="/credit">
                            Credit
                        </NavLink>
                    </div>
                        <div>
                            {web3Modal?.cachedProvider ? <Dropdown overlay={menu} trigger={['click']}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <Avatar icon={<UserOutlined />} style={{ marginBottom: '0.7rem', marginRight: '0.6rem' }} />
                                        {address ? <code> <Address address={shortenAddress(address)} /></code> : "Connect Wallet"}
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>:<Button type="primary" onClick={accountButtonInfo.action}>Connect</Button>}
                            
                        </div>


                    </Header>
                
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/details" element={<AssetDetails />} />
                        <Route path="/staking" element={<Staking />} />
                        <Route path="/credit" element={<Credit />} />
                    </Routes>
                    <Footer style={{ background: '#191919', color: 'white' }}>
                        ⒸZERU
                    </Footer>
                </Layout>

                <ThemeSwitcher />

            </Router>
        </div>
    )
}

