import { useNFTs } from "@thirdweb-dev/react";
import { EditionDrop } from "@thirdweb-dev/sdk";
import React from "react";
import styles from "../styles/Home.module.css";
import GamePlayer from "./GamePlayer";

type Props = {
  pickaxeContract: EditionDrop;
};

/**
 * This component shows the:
 * - All of the available pickaxes from the edition drop and their price.
 */
export default function GamePlayers({ pickaxeContract }: Props) {
  const { data: availablePickaxes } = useNFTs(pickaxeContract);
  const availableWinners = [
    {
      metadata: {
        id: 1,
        name: "ax",
        url: "/penguin.gif",
        game: "Splatoon3",
        date: "Jan 2, 2023",
      },
    },
    {
      metadata: {
        id: 2,
        name: "boo",
        url: "/piskel.gif",
        game: "Splatoon3",
        date: "Feb 20, 2023",
      },
    },
    {
      metadata: {
        id: 3,
        name: "caremy",
        url: "/dragon.gif",
        game: "PUBG",
        date: "Feb 21, 2023",
      },
    },
    {
      metadata: {
        id: 4,
        name: "daffie",
        url: "/pig.gif",
        game: "APEX",
        date: "Feb 22, 2023",
      },
    },
    {
      metadata: {
        id: 4,
        name: "daffie",
        url: "/dragon2.gif",
        game: "APEX",
        date: "Feb 22, 2023",
      },
    },
    {
      metadata: {
        id: 4,
        name: "daffie",
        url: "/transformer.gif",
        game: "APEX",
        date: "Feb 22, 2023",
      },
    },
    {
      metadata: {
        id: 4,
        name: "daffie",
        url: "/transformer2.gif",
        game: "APEX",
        date: "Feb 22, 2023",
      },
    },
    {
      metadata: {
        id: 4,
        name: "daffie",
        url: "/transformer3.gif",
        game: "APEX",
        date: "Feb 22, 2023",
      },
    },
  ];

  return (
    <>
      <div className={styles.nftBoxGrid}>
        {availableWinners?.map((p) => (
          <GamePlayer
            pickaxeContract={pickaxeContract}
            item={p}
            url={p.metadata.url}
            game={p.metadata.game}
            date={p.metadata.date}
            key={p.metadata.id.toString()}
          />
        ))}
      </div>
    </>
  );
}
