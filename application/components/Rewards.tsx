import { ethers } from "ethers";
import { React, useState } from 'react';
import {
  ThirdwebNftMedia,
  useAddress,
  useContractRead,
  useMetadata,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { SmartContract, Token } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";
import ApproxRewards from "./ApproxRewards";
import { MINING_CONTRACT_ADDRESS } from "../const/contractAddresses";
import { DEMO } from "../const/demo";
import Game from '../const/Game.json';
import { deployed } from '../const/config';

type Props = {
  miningContract: SmartContract<any>;
  tokenContract: Token;
};

/**
 * This component shows the:
 * - Metadata of the token itself (mainly care about image)
 * - The amount this wallet holds of this wallet
 * - The amount this user can claim from the mining contract
 */
export default function Rewards({ miningContract, tokenContract }: Props) {
  const [claimedOn, setClaimedOn] = useState(false);
  const address = useAddress();
  const { data: tokenMetadata } = useMetadata(tokenContract);
  const { data: currentBalance } = useTokenBalance(tokenContract, address);
  const { data: unclaimedAmount } = useContractRead(
    miningContract,
    "calculateRewards",
    address
  );
  const currentDate = new Date();
  const after7Daysdate=new Date(currentDate.setDate(currentDate.getDate() + 7));

  async function claimRewards() {
    if (1 > 2) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      try {
        const contract = new ethers.Contract(deployed.gameAddress, Game.abi, signer);
        const transaction = await contract.withdrawRewards();
        const tx = await transaction.wait();
        const event = tx.events[0];
        console.log({ event });
      } catch (error) {
        if (error.code === -32603) {
          console.error({ title: 'Error - Please check your wallet and try again.', message: 'It is very possible that the RPC endpoint you are using to connect to the network with MetaMask is congested or experiencing technical problems' });
          throw new Error('Error - Please check your wallet and try again.', { cause: 'It is very possible that the RPC endpoint you are using to connect to the network with MetaMask is congested or experiencing technical problems' });
        } else {
          console.error({ title: 'Error - Please check your wallet and try again.', message: error.message });
          throw new Error('Error - Please check your wallet and try again.', { cause: error.message });
        }
      }
    }
    const today = new Date();
    setClaimedOn(today.toLocaleDateString("en-US", { month: 'short' })
      + " " + today.toLocaleDateString("en-US", { day: 'numeric' })
      + ", " + today.toLocaleDateString("en-US", { year: 'numeric' }));
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p>
        Your <b>FIRE Rewards</b>
      </p>

      {tokenMetadata && (
        <ThirdwebNftMedia
          // @ts-ignore
          metadata={tokenMetadata}
          height={"48"}
        />
      )}
      <p className={styles.noGapBottom}>
        Balance: <b>{currentBalance?.displayValue}</b>
      </p>
      <p>
        Unclaimed:{" "}
        <b>{unclaimedAmount && ethers.utils.formatUnits(unclaimedAmount)}</b>
      </p>

      <div className={styles.smallMargin}>
        <Web3Button
          colorMode="dark"
          contractAddress={deployed.gameAddress}
          contractAbi={Game.abi}
          action={() => claimRewards()}
          isDisabled={claimedOn}
        >
          { claimedOn ? 'Claimed' : 'Claim' }
        </Web3Button>
      </div>
    </div>
  );
}
