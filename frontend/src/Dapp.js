import React, { useEffect, useState, useCallback } from "react";
import Web3ModalSetup from "./helpers/Web3ModalSetup"
import Account from "./components/Account"
import ThemeSwitcher from "./components/ThemeSwitch";
import Address from "./components/Address";
import { useSelector, useDispatch } from "react-redux"
import { setAddress } from "./store/slices/accountSlice";

import AssetDetails from "./components/AssetDetails";
import logo from './images/logo.png'
import name from './images/name.png'
import { Layout } from 'antd';
import { Tabs } from 'antd';
import Dashboard from "./components/Dashboard";
import Staking from "./components/Staking";
import Credit from "./components/Credit";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { HashRouter as Router, NavLink, Route, Routes } from "react-router-dom";

const { TabPane } = Tabs;
const { Header, Footer, Content } = Layout;

const { ethers } = require("ethers");

const web3Modal = Web3ModalSetup();

export default function Dapp() {

    const dispatch = useDispatch();
    const address = useSelector((state) => state.account.address);

    const [injectedProvider, setInjectedProvider] = useState()

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
        const provider = await web3Modal.connect();
        const pro = new ethers.providers.Web3Provider(provider);
        await pro.send("eth_requestAccounts", []);
        const signer = pro.getSigner();
        let addr = await signer.getAddress()
        console.log(addr)

        setInjectedProvider(pro)
        dispatch(setAddress({ address: addr }))

        provider.on("chainChanged", chainId => {
            console.log(`chain changed to ${chainId}! updating providers`);
            const pro = new ethers.providers.Web3Provider(provider);
            setInjectedProvider(pro)
        });

        provider.on("accountsChanged", async () => {
            console.log(`account changed!`);
            const pro = new ethers.providers.Web3Provider(provider);
            await pro.send("eth_requestAccounts", []);
            const signer = pro.getSigner();
            let addr = await signer.getAddress()
            console.log(addr)
            setInjectedProvider(pro)
            dispatch(setAddress({ address: addr }))

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

    return (
        <div className="Dapp">
            <Router>
                <Layout>
                    <Header style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
                        <div style={{ alignItems: 'flex-start' }}>
                            <img src={logo} width={30} />
                            <img src={name} width={100} />
                        </div>
                        <div>
                            <Avatar icon={<UserOutlined />} style={{ marginBottom: '0.7rem', marginRight: '0.6rem' }} />
                            {address ? <Address address={address} /> : ""}
                        </div>
                        <Account
                            web3Modal={web3Modal}
                            loadWeb3Modal={loadWeb3Modal}
                            logoutOfWeb3Modal={logoutOfWeb3Modal}
                        />

                    </Header>
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

