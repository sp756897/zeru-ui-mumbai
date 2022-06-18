import React, { useEffect, useState, useCallback } from "react";
import Web3ModalSetup from "./helpers/Web3ModalSetup"
import Account from "./components/Account"
import ThemeSwitcher from "./components/ThemeSwitch";
import Address from "./components/Address";
import { useSelector, useDispatch } from "react-redux"
import { setAddress } from "./store/slices/accountSlice";

import logo from './images/logo.png'
import name from './images/name.png'
import { Layout } from 'antd';
import { Tabs } from 'antd';
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
            <Layout>
                <Header style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
                   <div style={{alignItems:'flex-start'}}>
                    <img src={logo} width={30}/>
                    <img src={name} width={100}/>
                   </div>
                    <div>
                        {address ? <Address address={address} /> : ""}
                    </div>
                    <Account
                        web3Modal={web3Modal}
                        loadWeb3Modal={loadWeb3Modal}
                        logoutOfWeb3Modal={logoutOfWeb3Modal}
                    />

                </Header>
                <Content>
                    <Tabs defaultActiveKey="Dashboard" centered>
                        <TabPane tab="Dashboard" key="Dashboard">
                            Dashboard
                        </TabPane>
                        <TabPane tab="Staking" key="Staking">
                            Staking
                        </TabPane>
                        <TabPane tab="Credit" key="Credit">
                            Credit
                        </TabPane>
                    </Tabs>
                </Content>
                <Footer>
                ⒸZERU 
                </Footer>
            </Layout>
            <ThemeSwitcher />
        </div>
    )
}

