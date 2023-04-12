import {
  ConnectWallet,
  useAddress,
  useContract,
  useMetamask,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import CurrentGear from "../components/CurrentGear";
import LoadingSection from "../components/LoadingSection";
import OwnedGame from "../components/OwnedGame";
import Rewards from "../components/Rewards";
import GamePlayers from "../components/GamePlayers";
import {
  CHARACTER_EDITION_ADDRESS,
  GOLD_GEMS_ADDRESS,
  MINING_CONTRACT_ADDRESS,
  PICKAXE_EDITION_ADDRESS,
} from "../const/contractAddresses";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
// const { gameAddress, tokenFarmAddress } = deployed;
import { deployed, chains } from '../const/config';
const { gameAddress } = deployed;
import GameJSON from '../const/Game.json';
import { doc, arrayUnion, updateDoc, collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../const/firebase';

export default function Game() {
  const address = useAddress();
  const router = useRouter();
  const [isWaitingForPlayers, setIsWaitingForPlayers] = useState(false);
  const [isEnrollmentClosed, setIsEnrollmentClosed] = useState(true);
  const [task, setTask] = useState();
  // const [screenNames, setScreenNames] = useState('');
  // const [seats, setSeats] = useState([]);

  async function startGameStopEnroll() {
    if (true) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      try {
        const gameContract = new ethers.Contract(gameAddress, GameJSON.abi, signer);
        let res = await gameContract.connect(signer).isEnrollmentOpen(router.query.gameId);

        if (res) {
          let transaction = await gameContract.connect(signer).startGameStopEnroll();
          await transaction.wait();
        }
        setIsEnrollmentClosed(true);
      } catch (error) {
        // perhaps better UI logic to avoid exception; perhaps isEnrollmentOpen should be refactored
        if (error.message.includes('still waiting for more players')) {
          setIsWaitingForPlayers(true);
        }
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

  // const { contract: miningContract } = useContract(MINING_CONTRACT_ADDRESS);
  // const { contract: characterContract } = useContract(
  //   CHARACTER_EDITION_ADDRESS,
  //   "edition-drop"
  // );
  // const { contract: pickaxeContract } = useContract(
  //   PICKAXE_EDITION_ADDRESS,
  //   "edition-drop"
  // );
  // const { contract: tokenContract } = useContract(GOLD_GEMS_ADDRESS, "token");


  if (isWaitingForPlayers) {
    return (
      <div className={styles.container}>
        <div
          style={{
            width: "100%",
            minHeight: "10rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <h1>Please wait. Still waiting for more players.</h1>
        </div>
      </div>
    )
  }

  if (isEnrollmentClosed) {
    return (
      <div className={styles.container}>
          <>
            <div
              style={{
                width: "100%",
                minHeight: "10rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <OwnedGame
                // pickaxeContract={pickaxeContract}
                // miningContract={miningContract}
                gameId={router.query.gameId}
              />
            </div>
            <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>Tournament</h2>
            <div
              style={{
                width: "100%",
                minHeight: "10rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <GamePlayers 
                // pickaxeContract={pickaxeContract} 
              />
            </div>
          </>
      </div>
    )
  }
  
  <div className={styles.container}>
    <div
      style={{
        width: "100%",
        minHeight: "10rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <h1>Please wait. System is processing ....</h1>
    </div>
  </div>
}
