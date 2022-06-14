import React, { useEffect, useState, useCallback } from "react";
import { Header } from "antd/lib/layout/layout";
import Web3ModalSetup from "./helpers/Web3ModalSetup"
import Account from "./components/Account"
import ThemeSwitcher from "./components/ThemeSwitch";
import Address from "./components/Address";
import { useSelector, useDispatch } from "react-redux"
import { setAddress } from "./store/slices/accountSlice";

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
            <Header>
                <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flex: 1 }}>
                        <div>
                            {address ? <Address address={address} /> : ""}
                        </div>
                        <Account
                            web3Modal={web3Modal}
                            loadWeb3Modal={loadWeb3Modal}
                            logoutOfWeb3Modal={logoutOfWeb3Modal}
                        />
                    </div>
                </div>
            </Header>
            <h1>
                Hiiii
            </h1>
            <ThemeSwitcher />
        </div>
    )
}

