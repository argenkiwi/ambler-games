import { expect, test } from "bun:test";
import { factory, type State, type Utils } from "../g2048-win.ts";

const edges = { onContinue: "CONTINUE", onStop: "STOP", onUnclear: "UNCLEAR" };

function script(input: string | null) {
  const printed: string[] = [];
  const prompts: string[] = [];
  const utils: Utils = {
    print: (msg) => printed.push(msg),
    readLine: (prompt) => {
      prompts.push(prompt);
      return input;
    },
  };
  return { printed, prompts, utils };
}

const initial: State = { ending: "quit" };

for (const input of ["yes", "Y", " YES "]) {
  test(`g2048Win takes onContinue when the player answers ${JSON.stringify(input)}`, async () => {
    const { printed, prompts, utils } = script(input);

    const [next, newState] = await factory(edges, utils)(initial);

    expect(next).toBe("CONTINUE");
    expect(newState).toEqual(initial);
    expect(printed).toEqual(["You reached 2048!"]);
    expect(prompts).toEqual(["Keep playing for a higher score? (yes/no): "]);
  });
}

for (const input of ["no", "N", " No "]) {
  test(`g2048Win takes onStop with a win ending when the player answers ${JSON.stringify(input)}`, async () => {
    const { utils } = script(input);

    const [next, newState] = await factory(edges, utils)(initial);

    expect(next).toBe("STOP");
    expect(newState).toEqual({ ending: "win" });
    expect(initial.ending).toBe("quit");
  });
}

for (const input of ["", "maybe", "yep"]) {
  test(`g2048Win takes onUnclear when the player answers ${JSON.stringify(input)}`, async () => {
    const { printed, utils } = script(input);

    const [next, newState] = await factory(edges, utils)(initial);

    expect(next).toBe("UNCLEAR");
    expect(newState).toEqual(initial);
    expect(printed).toEqual(["You reached 2048!", "Please answer yes or no."]);
  });
}

test("g2048Win throws when input has ended", async () => {
  const { utils } = script(null);

  expect(async () => await factory(edges, utils)(initial)).toThrow(
    "Could not read an answer: input has ended.",
  );
});
