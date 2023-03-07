import {
  ConnectWallet,
  useAddress,
  useContract,
  useMetamask,
} from "@thirdweb-dev/react";
import React from "react";
import CurrentGear from "../components/CurrentGear";
import LoadingSection from "../components/LoadingSection";
import OwnedGames from "../components/OwnedGames";
import Rewards from "../components/Rewards";
import Shop from "../components/Shop";
import {
  CHARACTER_EDITION_ADDRESS,
  GOLD_GEMS_ADDRESS,
  MINING_CONTRACT_ADDRESS,
  PICKAXE_EDITION_ADDRESS,
} from "../const/contractAddresses";
import styles from "../styles/Home.module.css";

export default function Play() {
  const address = useAddress();

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
      <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>
        Your Games
      </h2>
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
        <OwnedGames
          pickaxeContract={pickaxeContract}
          miningContract={miningContract}
        />
      </div>
    </div>
  );
}
