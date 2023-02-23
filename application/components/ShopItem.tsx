import {
  ThirdwebNftMedia,
  useActiveClaimCondition,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, NFT } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import React from "react";
import { PICKAXE_EDITION_ADDRESS } from "../const/contractAddresses";
import styles from "../styles/Home.module.css";
import Image from 'next/image';

type Props = {
  pickaxeContract: EditionDrop;
  item: NFT;
  url: string;
};

export default function ShopItem({ item, pickaxeContract, url }: Props) {

  return (
    <div className={styles.nftBox} key={item.metadata.id.toString()}>
      
    <Image
      src={url}
      className={`${styles.nftMedia} ${styles.spacerTop}`}
      alt="Picture of the author"
      width={64}
      height={64}
    />
      <h3>{item.metadata.name}</h3>
      <p>
        Price:{" "}
        <b>
          4
          GEM
        </b>
      </p>

      <div className={styles.smallMargin}>
        <Web3Button
          colorMode="dark"
          contractAddress={PICKAXE_EDITION_ADDRESS}
          action={(contract) => console.log("Paid")}
          onSuccess={() => alert("Paid!")}
          onError={(error) => alert(error)}
        >
          Pay
        </Web3Button>
      </div>
    </div>
  );
}
