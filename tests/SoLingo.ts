import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SoLingo } from "../target/types/so_lingo";

describe("SoLingo", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SoLingoc as Program<SoLingo>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
