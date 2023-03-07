import {
  ConnectWallet,
  useAddress,
  useContract,
  useMetamask,
} from "@thirdweb-dev/react";
import React from "react";
import CurrentGear from "../components/CurrentGear";
import LoadingSection from "../components/LoadingSection";
import OwnedGame from "../components/OwnedGame";
import Rewards from "../components/Rewards";
import GameWinners from "../components/GamePlayers";
import {
  CHARACTER_EDITION_ADDRESS,
  GOLD_GEMS_ADDRESS,
  MINING_CONTRACT_ADDRESS,
  PICKAXE_EDITION_ADDRESS,
} from "../const/contractAddresses";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Game() {
  const address = useAddress();
  const router = useRouter();

  const { contract: miningContract } = useContract(MINING_CONTRACT_ADDRESS);
  const { contract: characterContract } = useContract(
    CHARACTER_EDITION_ADDRESS,
    "edition-drop"
  );
  const { contract: pickaxeContract } = useContract(
    PICKAXE_EDITION_ADDRESS,
    "edition-drop"
  );
  const { contract: tokenContract } = useContract(GOLD_GEMS_ADDRESS, "token");

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
              pickaxeContract={pickaxeContract}
              miningContract={miningContract}
              gameId={router.query.gameId}
            />
          </div>
          <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>Pick Winners</h2>
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
            <GameWinners pickaxeContract={pickaxeContract} />
          </div>
        </>
    </div>
  );
}
