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
  gameId: string;
};

/**
 * This component shows the:
 * - Pickaxes the connected wallet has
 * - A stake button underneath each of them to equip it
 */
export default function OwnedGame({ pickaxeContract, miningContract, gameId }: Props) {
  const address = useAddress();
  const { data: ownedPickaxes, isLoading } = useOwnedNFTs(
    pickaxeContract,
    address
  );
  const tournaments = [{
    metadata: {
      id: '1',
      image: "/splatoon3.jpg",
      title: "EREN's Room",
      date: "Mar 2, 2023",
      pin: 'PIN: 357',
    },
  }, {
    metadata: {
      id: '2',
      image: "/pubg.jpg",
      title: "EREN's Room",
      date: "Mar 22, 2023",
      pin: 'PIN: 112',
    },
  }, {
    metadata: {
      id: '3',
      image: "/lol.jpg",
      title: "EREN's Room",
      date: "Mar 25, 2023",
      pin: 'PIN: 900',
    },
  }, {
    metadata: {
      id: '4',
      image: "/apex.jpg",
      title: "EREN's Room",
      date: "Apr 2, 2023",
      pin: 'PIN: 234',
    }
  }];
  const tournament = tournaments?.find(x => x.metadata.id === gameId);

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
        {tournament &&
          <div className={styles.nftBox} key={tournament.metadata.id.toString()}>
            <Image
              src={tournament.metadata.image}
              className={`${styles.nftMedia} ${styles.spacerTop}`}
              width={256}
              height={256}
            />
            <h3>{tournament.metadata.title}</h3>
            <h3>{tournament.metadata.pin}</h3>
            <h3>{tournament.metadata.date}</h3>
          </div>
        }
      </div>
    </>
  );
}
