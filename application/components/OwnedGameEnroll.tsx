import {
  ThirdwebNftMedia,
  useAddress,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import LoadingSection from "./LoadingSection";
import styles from "../styles/Home.module.css";
import { MINING_CONTRACT_ADDRESS } from "../const/contractAddresses";
import Image from 'next/image';
import { useRouter } from "next/router";
import { deployed, chains } from '../const/config';
const { gameAddress } = deployed;
import GameJSON from '../const/Game.json';

// type Props = {
//   pickaxeContract: EditionDrop;
//   miningContract: SmartContract<any>;
// };

const btn = {
  'backgroundColor': 'black',
  'color': 'white',
  'fontSize': '20px',
  padding: '10px 60px',
  'borderRadius': '5px',
  margin: '10px 0px',
  cursor: 'pointer',
  width: '100%',
};

/**
 * This component shows the:
 * - Pickaxes the connected wallet has
 * - A stake button underneath each of them to equip it
 */
export default function OwnedGameEnroll(tournament) {
  const router = useRouter();
  const address = useAddress();
  const p = tournament.tournament;

  const [isGameStarted, setIsGameStarted] = useState(false);

  async function checkGameEnroll() {
    if (true) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      try {
        const gameContract = new ethers.Contract(gameAddress, GameJSON.abi, signer);
        let { isEnrolling } = await gameContract.connect(signer).games(p.id);
        setIsGameStarted(isEnrolling);
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
  }
  
  useEffect(() => {
    (async () => {
      try {
        await checkGameEnroll();
      } catch (ex) {
        console.log("Game Not Started", ex)
      }
    })();
  }, [])

  return (
    <div className={styles.nftBox}>
      <Image
        src={p.image}
        className={`${styles.nftMedia} ${styles.spacerTop}`}
        width={256}
        height={256}
      />
      <h3>{p.date}</h3>
      <h3>{p.title}</h3>
      <h3>{p.pin}</h3>

      <div className={styles.smallMargin}>
        { isGameStarted
        ?
        <button style={btn} onClick={() => router.push({
            pathname: '/game',
            query: { gameId: `${p.id}` }
          }, '/game')}>
          Enter
        </button>
        :
        <p>Not Started Yet.</p>}
      </div>
    </div>
  );
}
