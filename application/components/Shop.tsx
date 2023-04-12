import { useNFTs } from "@thirdweb-dev/react";
import { EditionDrop } from "@thirdweb-dev/sdk";
import React from "react";
import styles from "../styles/Home.module.css";
import ShopItem from "./ShopItem";
import { NFT } from "@thirdweb-dev/sdk";

type Props = {
  pickaxeContract: EditionDrop;
  player: NFT;
};

/**
 * This component shows the:
 * - All of the available pickaxes from the edition drop and their price.
 */
export default function Shop(props) {
  const playerAddress = props.playerAddress;
  const screenName = props.screenName;
  const gameId = props.gameId;
  const player = props.player;
  
  // const { data: availablePickaxes } = useNFTs(pickaxeContract);
  const availableWinners = [
    {
      metadata: {
        id: 2,
        name: "유지민",
        url: "/cow.gif",
        game: "Splatoon3",
        date: "Feb 20, 2023",
        payout: "0.2 MATIC",
      },
    },
    {
      metadata: {
        id: 3,
        name: "ダークネス",
        url: "/duck.gif",
        game: "PUBG",
        date: "Feb 21, 2023",
        payout: "0.14 USDC",
      },
    },
    {
      metadata: {
        id: 4,
        name: "鲤鱼",
        url: "/cute-girl.gif",
        game: "APEX",
        date: "Feb 22, 2023",
        payout: "2 FIRE",
      },
    },
  ];

  return (
    <>
      <div className={styles.nftBoxGrid}>
        {availableWinners?.map((p) => (
          <ShopItem
            // pickaxeContract={pickaxeContract}
            item={p}
            name={p.metadata.name}
            playerAddress={p.metadata.address}
            screenName={p.metadata.name}
            url={p.metadata.url}
            game={p.metadata.game}
            gameId={gameId}
            date={p.metadata.date}
            payout={p.metadata.payout}
            key={p.metadata.id.toString()}
          />
        ))}
        <ShopItem
          // pickaxeContract={pickaxeContract}
          item={player}
          name={player.metadata.name}
          playerAddress={playerAddress}
          screenName={screenName}
          url={player.metadata.url}
          game={player.metadata.game}
          gameId={gameId}
          date={player.metadata.date}
          payout={player.metadata.payout}
          key={player.metadata.id.toString()}
        />
      </div>
    </>
  );
}
