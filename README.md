# ambler-games

Small terminal games built with [Ambler](https://github.com/argenkiwi/ambler-ts): each game is a walk (a state machine) of small, tested nodes, in TypeScript on [Bun](https://bun.sh/).

| Game | Run | Spec |
|---|---|---|
| Rock Paper Scissors | `bun run rps` | [specs/rps.md](specs/rps.md) |
| Knight-Paper-Scissors | `bun run kps` | [specs/kps.md](specs/kps.md) |
| Tic-Tac-Toe | `bun run t3` | [specs/t3.md](specs/t3.md) |

## Layout

```
ambler.ts        The engine: NodeFactory, ambler(), walk() (written by ambler; leave as is)
walks/           Walks: wire each node's edges to the next node; tests in walks/tests/
nodes/           Nodes: one step each, a factory of State, Edge and Utils; tests in nodes/tests/
utils/           Shared game logic and types (board rules, moves)
specs/           Plain-language spec for each walk
```

## Development

Install the tools once with `bun install`. Components are created with [ambler](https://github.com/argenkiwi/ambler) and built test-first:

```sh
ambler help            # conventions and guides
ambler node <name> …   # add a node
ambler walk <name> …   # wire nodes into a walk
ambler check           # conventions, tsc, biome, tests
```
