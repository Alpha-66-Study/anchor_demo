import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorDemo } from "../target/types/anchor_demo";


describe('counter-app', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.CounterApp as Program<AnchorDemo>;
  const counterKeypair = anchor.web3.Keypair.generate();

  it('Initializes counter', async () => {
    await program.methods.initialize()
      .accounts({
        counter: counterKeypair.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([counterKeypair])
      .rpc();

    const counterAccount = await program.account.counter.fetch(
      counterKeypair.publicKey
    );
    console.log('Initial Count:', counterAccount.count.toString());
  });

  it('Increments counter', async () => {
    await program.methods.increment()
      .accounts({ counter: counterKeypair.publicKey })
      .rpc();

    const counterAccount = await program.account.counter.fetch(
      counterKeypair.publicKey
    );
    console.log('Updated Count:', counterAccount.count.toString());
  });
});