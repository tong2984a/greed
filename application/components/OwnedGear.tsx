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
  const tournaments = [{
    metadata: {
      id: 1,
      image: "/splatoon3.jpg",
      title: "EREN's Room",
      pin: 'PIN: 357',
    },
  }, {
    metadata: {
      id: 2,
      image: "/pubg.jpg",
      title: "flamincat's Room",
      pin: '0.08 USDC',
      button: 'Claim',
    },
  }, {
    metadata: {
      id: 3,
      image: "/lol.jpg",
      title: "AnEnderNon's Room",
      pin: '1.02 MATIC',
      button: 'Claim',
    },
  }, {
    metadata: {
      id: 4,
      image: "/apex.jpg",
      title: "justinjohn-03's Room",
      pin: '1 FIRE',
      button: 'Claim',
    }
  }];

  const currentDate = new Date();
  const after7Daysdate=new Date(currentDate.setDate(currentDate.getDate() + 7));

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
        {tournaments?.map((p) => (
          <div className={styles.nftBox} key={p.metadata.id.toString()}>
            <Image
              src={p.metadata.image}
              className={`${styles.nftMedia} ${styles.spacerTop} ${p.metadata.button && styles.grayscale}`}
              width={256}
              height={256}
            />
            <h3>{p.metadata.title}</h3>
            <h3>{p.metadata.pin}</h3>
            <h3>{!p.metadata.button && after7Daysdate.toDateString()}</h3>

            <div className={styles.smallMargin}>
              {p.metadata.button &&
                <Web3Button
                  colorMode="dark"
                  contractAddress={MINING_CONTRACT_ADDRESS}
                  action={() => equip(p.metadata.id)}
                >
                  Claim
                </Web3Button>
              }
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
