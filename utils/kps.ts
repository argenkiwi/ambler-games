/** A Knight-Paper-Scissors move. */
export type Move = "kick" | "punch" | "sweep" | "crouch" | "block" | "jump";

/** How an exchange of two moves ends, from the player's side. */
export type Outcome =
  | "Win"
  | "Lose"
  | "Trade"
  | "Chip"
  | "Ouch"
  | "Dodge"
  | "Miss"
  | "Draw";

/** Every move, in the order they are listed to the player. */
export const MOVES: readonly Move[] = [
  "kick",
  "punch",
  "sweep",
  "crouch",
  "block",
  "jump",
];

/** Health each fighter starts a game with. */
export const STARTING_HEALTH = 10;
