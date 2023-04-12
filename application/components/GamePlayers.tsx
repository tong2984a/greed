import { useNFTs } from "@thirdweb-dev/react";
import { EditionDrop } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import GamePlayer from "./GamePlayer";

type Props = {
  pickaxeContract: EditionDrop;
};

/**
 * This component shows the:
 * - All of the available pickaxes from the edition drop and their price.
 */
export default function GamePlayers() {
  // const { data: availablePickaxes } = useNFTs(pickaxeContract);
  const availableWinners = [
    {
      metadata: {
        id: '1',
        name: "Anphex",
        url: "/penguin.gif",
        game: "Splatoon3",
        payout: "1 FIRE",
        address: "0xa0ee7a142d267c1f36714e4a8f75612f20a79720"
      },
    },
    {
      metadata: {
        id: '2',
        name: "boo",
        url: "/piskel.gif",
        game: "Splatoon3",
        payout: "1 FIRE",
        address: "0xbcd4042de499d14e55001ccbb24a551f3b954096"
      },
    },
    {
      metadata: {
        id: '3',
        name: "caremy",
        url: "/dragon.gif",
        game: "PUBG",
        payout: "1 FIRE",
        address: "0x71be63f3384f5fb98995898a86b02fb2426c5788"
      },
    },
    {
      metadata: {
        id: '4',
        name: "dawg",
        url: "/pig.gif",
        game: "APEX",
        payout: "1 FIRE",
        address: "0xfabb0ac9d68b0b445fb7357272ff202c5651694a"
      },
    },
    {
      metadata: {
        id: '5',
        name: "ethansmith2000",
        url: "/dragon2.gif",
        game: "APEX",
        payout: "1 FIRE",
        address: "0x1cbd3b2770909d4e10f157cabc84c7264073c9ec"
      },
    },
    {
      metadata: {
        id: '6',
        name: "Frothy",
        url: "/transformer.gif",
        game: "APEX",
        payout: "1 FIRE",
        address: "0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097"
      },
    },
    {
      metadata: {
        id: '7',
        name: "gami",
        url: "/transformer2.gif",
        game: "APEX",
        payout: "1 FIRE",
        address: "0xcd3b766ccdd6ae721141f452c550ca635964ce71"
      },
    },
    {
      metadata: {
        id: '8',
        name: "HUK",
        url: "/transformer3.gif",
        game: "APEX",
        payout: "1 FIRE",
        address: "0x2546bcd3c84621e976d8185a91a922ae77ecec30"
      },
    },
  ];

  return (
    <>
      <div className={styles.nftBoxGrid}>
        {availableWinners?.map((p) => (
          <GamePlayer
            // pickaxeContract={pickaxeContract}
            item={p}
            itemId={p.metadata.id}
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
