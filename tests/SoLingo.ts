import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SoLingoc } from "../target/types/so_lingoc";

describe("SoLingoc", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SoLingoc as Program<SoLingoc>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
