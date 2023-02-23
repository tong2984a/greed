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
        url: "/pikachu.gif",
      },
    },
    {
      metadata: {
        id: 2,
        name: "boo",
        url: "/cow.gif",
      },
    },
    {
      metadata: {
        id: 3,
        name: "caremy",
        url: "/frog.gif",
      },
    },
    {
      metadata: {
        id: 4,
        name: "daffie",
        url: "/cute-girl.gif",
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
            key={p.metadata.id.toString()}
          />
        ))}
      </div>
    </>
  );
}
