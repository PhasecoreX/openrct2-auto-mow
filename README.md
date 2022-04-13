# openrct2-auto-mow
Automatically keep the grass in OpenRCT2 at a specific length

## How?
The user chooses what kind of grass they want, by default this is clear (no weeds, but not mowed, contrary to the name of this plugin). Then every tick, at least one tile is checked if it needs to be set to that length. If it is determined that the tile will soon grow weeds (or in the case of mowed grass, will soon become clear), then it is modified to the designated length of grass chosen in the settings.

Grass grows in stages:
```
Mowed -> Clear 0 -> Clear 1 -> Clear 2 -> Weeds 0 -> Weeds 1 -> Weeds 2
```
Grass takes a minimum of just over 2 in-game months to move stages. Thus, if we scan the whole park in less than 2 months, we can make sure that all grass stays in the desired grass stage. The plugin will automatically check as many tiles as it needs to in a tick in order to ensure a full scan of the park within 2 in-game months.

If you want mowed grass, every 2 months the grass will be set to mowed. But if you want clear grass, the grass won't be set to clear (0) until the grass is in stage clear 2 (or any of the weeds stages). This makes it so we aren't modifying the map every single tick when the grass wouldn't sprout weeds within the 2 months to our next scan.

Also, if you're wondering why we don't just scan everything and update all the tiles every day instead of scanning per tick: massive lag.

## Multiplayer?
Yes! But actually no...

The plugin does work in multiplayer just fine, however if a client desyncs and then reconnects, or if the host loads a new save file, the plugin will not reload in the client and then no grass will be mowed for them. This leads to a desync very quickly. If they quit to main menu and then rejoin the server, the plugin loads fine for them. Understandably, this is annoying to deal with. I have opened an issue [here](https://github.com/OpenRCT2/OpenRCT2/issues/14009) to fix this.

## Alternatives?
The best way of doing this is just to have an option in OpenRCT2 that displays all grass as clear/mowed. Maybe have it ignore grass ticking? However, that might alter game state.

But, this is the second best thing I could come up with. Give it 2 in-game months, and you'll never have to think about weeds ever again.
