import { useNFTs } from "@thirdweb-dev/react";
import { EditionDrop } from "@thirdweb-dev/sdk";
import React from "react";
import styles from "../styles/Home.module.css";
import ShopItem from "./ShopItem";

type Props = {
  pickaxeContract: EditionDrop;
};

/**
 * This component shows the:
 * - All of the available pickaxes from the edition drop and their price.
 */
export default function Shop({ pickaxeContract }: Props) {
  const { data: availablePickaxes } = useNFTs(pickaxeContract);
  const availableWinners = [
    {
      metadata: {
        id: 1,
        name: "ax",
        url: "/penguin.gif",
        game: "Splatoon3",
        date: "Jan 2, 2023",
        payout: "1 FIRE",
        paid: true,
      },
    },
    {
      metadata: {
        id: 2,
        name: "boo",
        url: "/cow.gif",
        game: "Splatoon3",
        date: "Feb 20, 2023",
        payout: "0.2 MATIC",
      },
    },
    {
      metadata: {
        id: 3,
        name: "caremy",
        url: "/duck.gif",
        game: "PUBG",
        date: "Feb 21, 2023",
        payout: "0.14 USDC",
      },
    },
    {
      metadata: {
        id: 4,
        name: "daffie",
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
            pickaxeContract={pickaxeContract}
            item={p}
            url={p.metadata.url}
            game={p.metadata.game}
            date={p.metadata.date}
            payout={p.metadata.payout}
            paid={p.metadata.paid}
            key={p.metadata.id.toString()}
          />
        ))}
      </div>
    </>
  );
}
