import {
  ThirdwebNftMedia,
  useAddress,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React from "react";
import LoadingSection from "./LoadingSection";
import styles from "../styles/Home.module.css";
import { MINING_CONTRACT_ADDRESS } from "../const/contractAddresses";
import Image from 'next/image';

type Props = {
  pickaxeContract: EditionDrop;
  miningContract: SmartContract<any>;
};

/**
 * This component shows the:
 * - Pickaxes the connected wallet has
 * - A stake button underneath each of them to equip it
 */
export default function OwnedGear({ pickaxeContract, miningContract }: Props) {
  const address = useAddress();
  const { data: ownedPickaxes, isLoading } = useOwnedNFTs(
    pickaxeContract,
    address
  );

  if (isLoading) {
    return <LoadingSection />;
  }

  async function equip(id: string) {
    if (!address) return;

    // The contract requires approval to be able to transfer the pickaxe
    const hasApproval = await pickaxeContract.isApproved(
      address,
      MINING_CONTRACT_ADDRESS
    );

    if (!hasApproval) {
      await pickaxeContract.setApprovalForAll(MINING_CONTRACT_ADDRESS, true);
    }

    await miningContract.call("stake", id);

    // Refresh the page
    window.location.reload();
  }

  return (
    <>
      <div className={styles.nftBoxGrid}>
        {ownedPickaxes?.map((p) => (
          <div className={styles.nftBox} key={p.metadata.id.toString()}>
            <Image
              src="/splatoon3.jpg"
              className={`${styles.nftMedia} ${styles.spacerTop}`}
              width={256}
              height={256}
            />
            <h3>Player 1's Room</h3>
            <h3>PIN: 357</h3>
          </div>
        ))}
      </div>
    </>
  );
}
