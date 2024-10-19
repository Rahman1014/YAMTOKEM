import React, { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Router from "./routes/Router";
import theme from "./theme";
import detectEthereumProvider from "@metamask/detect-provider";

function App() {
  const routing = useRoutes(Router);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log("Connected account:", accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <h1>Welcome to YAMTOKEN</h1>
        <button onClick={connectWallet}>Connect Wallet</button>
        {account && <p>Connected Account: {account}</p>}
        {routing}
      </div>
    </ThemeProvider>
  );
}

export default App;
