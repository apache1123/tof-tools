# Tower of Fantasy Tools
![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.toweroffantasytools.com%2F&up_message=online&down_message=offline)
![GitHub package.json version](https://img.shields.io/github/package-json/v/apache1123/tof-tools)
![GitHub last commit](https://img.shields.io/github/last-commit/apache1123/tof-tools)
![GitHub License](https://img.shields.io/github/license/apache1123/tof-tools?style=flat)

[ToF Tools](https://www.toweroffantasytools.com/gear-comparer) is a helper website built with Next.js that contains a set of tools for the MMO game Tower of Fantasy. It is intended to assist players with optimizing their gear to max-min their characters and damage output.

The website is periodically updated with the latest weapons/matrices/simulaca that are added to the game.

The tools include:
- **Character inventory**: Add/import your character's weapons, matrices, gear and presets. For gear, manual input or import using screenshot is supported.
<img width="400" height="200" alt="image" src="https://github.com/user-attachments/assets/6cbf8a45-c775-4dc4-bde3-88d8562a0fb1" />
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/0d73f7d5-bf1a-4685-af9b-46fa78e29619" />

- **Gear growth preview**: Once a gear and its stats are entered, you can then view the maximum possible stats it can have after titan
<img width="180" height="150" alt="image" src="https://github.com/user-attachments/assets/5b0051f3-d5ce-4fd3-97a6-c958560869c1" />

- **Gear compare**: Since comparing two pieces of gear can be complicated with all the different flat Attack/Attack %/Damage % values, diminishing returns etc., this tool helps with that. You can select any two pieces of gear from your inventory and compare them. It takes into account **all** the relevant attack/damage buffs etc. coming from your weapons, matrices, gear, and simulacrum trait and simulates the total amount of damage of each piece of gear. You can then see which gear gives you the most damage. A damage breakdown with all the buffs is also shown.
<img width="260" height="150" alt="image" src="https://github.com/user-attachments/assets/c73fc78d-55ce-4070-8c65-05bcce265e67" />
<img width="300" height="150" alt="image" src="https://github.com/user-attachments/assets/369cf3cd-d867-43d1-bbda-b36a8d1218df" />

- **Gear max augment increase calculator**, **Crit rate calculator**

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)
