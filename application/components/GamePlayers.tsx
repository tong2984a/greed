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
        id: '1',
        name: "Anphex",
        url: "/penguin.gif",
        game: "Splatoon3",
        payout: "1 FIRE",
        address: "0xa0e...9720"
      },
    },
    {
      metadata: {
        id: '2',
        name: "boo",
        url: "/piskel.gif",
        game: "Splatoon3",
        payout: "1 FIRE",
        address: "0xbcd...4096"
      },
    },
    {
      metadata: {
        id: '3',
        name: "caremy",
        url: "/dragon.gif",
        game: "PUBG",
        payout: "1 FIRE",
        address: "0x71b...5788"
      },
    },
    {
      metadata: {
        id: '4',
        name: "dawg",
        url: "/pig.gif",
        game: "APEX",
        payout: "1 FIRE",
        address: "0xfab...694a"
      },
    },
    {
      metadata: {
        id: '5',
        name: "ethansmith2000",
        url: "/dragon2.gif",
        game: "APEX",
        payout: "1 FIRE",
        address: "0x1cb...c9ec"
      },
    },
    {
      metadata: {
        id: '6',
        name: "Frothy",
        url: "/transformer.gif",
        game: "APEX",
        payout: "1 FIRE",
        address: "0xdf3...7097"
      },
    },
    {
      metadata: {
        id: '7',
        name: "gami",
        url: "/transformer2.gif",
        game: "APEX",
        payout: "1 FIRE",
        address: "0xcd3...ce71"
      },
    },
    {
      metadata: {
        id: '8',
        name: "HUK",
        url: "/transformer3.gif",
        game: "APEX",
        payout: "1 FIRE",
        address: "0x254...ec30"
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
