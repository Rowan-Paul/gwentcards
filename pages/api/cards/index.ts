import type { NextApiRequest, NextApiResponse } from 'next';

export interface IGetCardsResponse {
  cards: ICard[];
}

interface ICard {
  id: string;
  image: string;
  name: string;
  deck: "Scoia'tael";
  strength?: number;
  row: 'close' | 'agile' | 'ranged' | 'siege' | 'leader';
  locations?: any;
  notes?: any;
  abilities?: any[];
  isDLC?: any;
  expansion?: any;
  effect?: any;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<IGetCardsResponse>) {
  res.status(200).json({
    cards: [
      {
        id: '94F75844-01D4-4BF7-9593-23D5A253FBCA',
        image: '/assets/barclay-els.png',
        name: 'Barclay Els',
        deck: "Scoia'tael",
        row: 'agile',
        strength: 6,
        locations: [
          {
            type: 'buy',
            territory: 'novigrad or velen',
            location: 'golden sturgeon or circus camp near carsten',
            character: 'innkeeper or trader'
          }
        ],
        notes: 'agile: can be placed in either the close combat or the ranged combat row. cannot be moved once placed.'
      },
      {
        id: 'BD489DAC-5EE8-40EE-AE0A-F6D79CB58E63',
        image: '/assets/ciaran-aep-easnillien.png',
        name: 'Ciaran aep Easnillien',
        deck: "Scoia'tael",
        row: 'agile',
        strength: 3,
        locations: [{ type: 'random' }],
        notes: 'agile: can be placed in either the close combat or the ranged combat row. cannot be moved once placed.'
      },
      {
        id: '628EAC37-5D51-4233-8A5B-54C7661D90AB',
        image: '/assets/dennis-cranmer.png',
        name: 'Dennis Cranmer',
        deck: "Scoia'tael",
        row: 'close',
        strength: 6,
        locations: [{ type: 'random' }]
      },
      {
        id: '4526FE88-2D27-44A8-AC96-6B25EEB491A1',
        image: '/assets/dol-blathanna-archer.png',
        name: 'Dol Blathanna Archer',
        deck: "Scoia'tael",
        row: 'ranged',
        strength: 4,
        locations: [
          {
            type: 'buy',
            territory: 'novigrad or velen',
            location: 'passiflora or circus camp near carstenm',
            character: 'innkeeper or trader'
          }
        ]
      },
      {
        id: '62E93889-03E7-4B3A-A238-A81EE59BE75C',
        image: '/assets/dol-blathanna-scout.png',
        name: 'Dol Blathanna Scout',
        deck: "Scoia'tael",
        row: 'agile',
        strength: 6,
        locations: [
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'golden sturgeon',
            character: 'innkeeper'
          },
          { type: 'random' },
          { type: 'random' },
          {
            type: 'buy',
            territory: 'velen',
            location: 'circus camp near carsten',
            character: 'trader'
          }
        ],
        notes: 'agile: can be placed in either the close combat or the ranged combat row. cannot be moved once placed.'
      },
      {
        id: '3CF1DA80-901D-41AA-B218-9C7E4B36821F',
        image: '/assets/dwarven-skirmisher.png',
        name: 'Dwarven Skirmisher',
        deck: "Scoia'tael",
        row: 'close',
        strength: 3,
        locations: [
          { type: 'random' },
          { type: 'random' },
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'the alchemy inn, oxenfurt',
            character: 'stjepan'
          }
        ]
      },
      {
        id: '5A0D1F3F-3F15-4B64-807C-B14A214D0B78',
        image: '/assets/eithne.png',
        abilities: ['hero'],
        name: 'Eithné',
        deck: "Scoia'tael",
        row: 'ranged',
        strength: 10,
        locations: [
          {
            type: 'quest',
            territory: 'novigrad',
            location: 'rosemary and thyme',
            character: 'zoltan (quest gwent: old pals)'
          }
        ]
      },
      {
        id: '39C4D32F-1B9D-4BA5-98F3-2DE797F8AA9C',
        image: '/assets/elven-skirmisher.png',
        abilities: ['muster'],
        name: 'Elven Skirmisher',
        deck: "Scoia'tael",
        row: 'ranged',
        strength: 2,
        locations: [
          { type: 'random' },
          { type: 'random' },
          {
            type: 'buy',
            territory: 'skellige',
            location: 'urialla village, an skellig',
            character: 'innkeeper'
          }
        ]
      },
      {
        id: 'F90B16F8-5818-4DB9-9FB6-47AB50A9FCE4',
        image: '/assets/filavandrel-aen-fidhail.png',
        name: 'Filavandrel aén Fidháil',
        deck: "Scoia'tael",
        row: 'agile',
        strength: 2,
        locations: [{ type: 'random' }],
        notes: 'agile: can be placed in either the close combat or the ranged combat row. cannot be moved once placed.'
      },
      {
        id: 'E331E724-2465-4426-A291-73DF34384D6F',
        image: '/assets/francesca-findabair-daisy-of-the-valley.png',
        name: 'Francesca Findabair: Daisy of the Valley',
        deck: "Scoia'tael",
        row: 'leader',
        locations: [
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'cunny of the goose',
            character: 'innkeeper'
          }
        ],
        notes: 'daisy of the valley: draw an extra card at the beginning of the battle.'
      },
      {
        id: '80CF9E54-ABF7-4A40-B5E1-D14BBB68DBD2',
        image: '/assets/francesca-findabair-hope-of-the-aen-seidhe.png',
        name: 'Francesca Findabair: Hope of the aen Seidhe',
        deck: "Scoia'tael",
        row: 'leader',
        locations: [
          {
            type: 'buy',
            territory: 'velen',
            location: 'upper mill',
            character: "dula kh'amanni"
          }
        ],
        notes:
          "hope of the aen seidhe: move agile units to whichever valid row maximizes their strength (don't move units already in optimal row).",
        isDLC: true,
        expansion: 'hearts of stone'
      },
      {
        id: '2787E50B-1DFE-4CF9-BCE9-D3F5BD5B0A1A',
        image: '/assets/francesca-findabair-pureblood-elf.png',
        name: 'Francesca Findabair: Pureblood Elf',
        deck: "Scoia'tael",
        row: 'leader',
        locations: [{ type: 'base deck' }],
        notes: 'pureblood elf: pick a biting frost card from your deck and play it instantly.'
      },
      {
        id: '0224CE3C-3EE3-4C46-B4E1-E287BAE12759',
        image: '/assets/francesca-findabair-queen-of-dol-blathanna.png',
        name: 'Francesca Findabair: Queen of Dol Blathanna',
        deck: "Scoia'tael",
        row: 'leader',
        locations: [
          {
            type: 'quest',
            territory: 'novigrad',
            location: 'passiflora',
            character: 'finneas (quest high stakes)'
          }
        ],
        notes:
          "queen of dol blathanna: destroy your enemy's strongest close combat unit(s) if the combined strength of all his or her close combat units is 10 or more."
      },
      {
        id: 'BA02996E-CC78-466D-B8DB-9A6D328439B5',
        image: '/assets/francesca-findabair-the-beautiful.png',
        name: 'Francesca Findabair: the Beautiful',
        deck: "Scoia'tael",
        row: 'leader',
        locations: [
          {
            type: 'quest',
            location: 'won after completing gwent: big city players'
          }
        ],
        notes:
          "the beautiful: doubles the strength of all your ranged combat units (unless a commander's horn is also present on that row)."
      },
      {
        id: 'D43CB3B1-0491-41FE-84D8-F76D5584FB4B',
        image: '/assets/havekar-healer.png',
        abilities: ['medic'],
        name: 'Havekar Healer',
        deck: "Scoia'tael",
        row: 'ranged',
        strength: 0,
        locations: [
          { type: 'random' },
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'cunny of the goose',
            character: 'innkeep'
          },
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'kingfisher inn',
            character: 'innkeeper'
          },
          {
            type: 'buy',
            territory: 'velen',
            location: 'circus camp near carsten',
            character: 'trader'
          }
        ]
      },
      {
        id: '7975F9C3-B1FD-4C17-8DF5-0A382674AACF',
        image: '/assets/havekar-smuggler.png',
        abilities: ['muster'],
        name: 'Havekar Smuggler',
        deck: "Scoia'tael",
        row: 'close',
        strength: 5,
        locations: [
          { type: 'random' },
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'kingfisher inn',
            character: 'innkeeper'
          },
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'seven cats inn',
            character: 'innkeeper'
          },
          {
            type: 'buy',
            territory: 'velen',
            location: 'circus camp near carsten',
            character: 'trader'
          }
        ]
      },
      {
        id: '6D2FDA25-4182-49D4-9C90-3A5B3822A296',
        image: '/assets/ida-emean-aep-sivney.png',
        name: 'Ida Emean aep Sivney',
        deck: "Scoia'tael",
        row: 'ranged',
        strength: 6,
        locations: [{ type: 'random' }]
      },
      {
        id: 'D79CF906-ECE0-405A-8CCC-18A7A43626CE',
        image: '/assets/iorveth.png',
        abilities: ['hero'],
        name: 'Iorveth',
        deck: "Scoia'tael",
        row: 'ranged',
        strength: 10,
        locations: [{ type: 'quest', location: 'won after completing shock therapy' }]
      },
      {
        id: 'DE3C0C25-EC12-44D3-8C33-2D23577EA169',
        image: '/assets/isengrim-faoiltiarna.png',
        abilities: ['hero', 'morale boost'],
        name: 'Isengrim Faoiltiarna',
        deck: "Scoia'tael",
        row: 'close',
        strength: 10,
        locations: [
          {
            type: 'quest',
            territory: 'novigrad',
            location: "zed's house (quest a dangerous game)"
          }
        ]
      },
      {
        id: '81C34C21-6C0C-4D3C-8B67-8779E89C3902',
        image: '/assets/mahakaman-defender.png',
        abilities: ['muster'],
        name: 'Mahakaman Defender',
        deck: "Scoia'tael",
        row: 'close',
        strength: 5,
        locations: [
          {
            type: 'buy',
            territory: 'velen',
            location: 'circus camp near carsten',
            character: 'trader'
          },
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'passiflora',
            character: 'marquise serenity'
          },
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'the alchemy inn, oxenfurt',
            character: 'stjepan'
          },
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'golden sturgeon',
            character: 'innkeeper'
          },
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'seven cats inn',
            character: 'innkeeper'
          },
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'kingfisher inn',
            character: 'innkeeper'
          }
        ]
      },
      {
        id: '7D0F4BCA-1ED1-41E1-989C-B48FF9CBCF0B',
        image: '/assets/milva.png',
        abilities: ['morale boost'],
        name: 'Milva',
        deck: "Scoia'tael",
        row: 'ranged',
        strength: 10,
        locations: [
          {
            type: 'quest',
            territory: 'novigrad',
            location: 'vegelbud estate',
            character: 'quest a matter of life and death'
          }
        ]
      },
      {
        id: 'A0AF9BAB-1A26-4585-898E-E01494989879',
        image: '/assets/riordain.png',
        name: 'Riordain',
        deck: "Scoia'tael",
        row: 'ranged',
        strength: 1,
        locations: [{ type: 'random' }]
      },
      {
        id: '2EFF1C1E-239E-4F1E-8D90-96249BB316C0',
        image: '/assets/saesenthessis.png',
        name: 'Saesenthessis',
        deck: "Scoia'tael",
        row: 'ranged',
        strength: 10,
        locations: [
          {
            type: 'quest',
            territory: 'novigrad',
            location: 'temerian resistance camp',
            character: 'vernon roche (quest gwent: old pals)'
          }
        ]
      },
      {
        id: '93A2791E-093B-451C-AB0E-FB5F98C2527D',
        image: '/assets/schirrú.png',
        name: 'Schirrú',
        deck: "Scoia'tael",
        row: 'siege',
        strength: 8,
        locations: [
          {
            type: 'quest',
            territory: 'velen',
            location: 'circus camp near carsten',
            character: 'merchant'
          }
        ],
        effect: 'scorch',
        isDLC: true,
        expansion: 'hearts of stone'
      },
      {
        id: 'DF3AE767-FC5A-4783-BB65-7D8150A70420',
        image: '/assets/toruviel.png',
        abilities: ['hero'],
        name: 'Toruviel',
        deck: "Scoia'tael",
        row: 'ranged',
        strength: 10,
        locations: [{ type: 'quest', location: 'won after completing shock therapy' }]
      },
      {
        id: 'A2E74B29-1C7E-4580-A8E5-C67F250B9FBA',
        image: '/assets/vrihedd-brigade-recruit.png',
        name: 'Vrihedd Brigade Recruit',
        deck: "Scoia'tael",
        row: 'agile',
        strength: 10,
        locations: [
          { type: 'random' },
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'the alchemy inn, oxenfurt',
            character: 'stjepan'
          },
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'kingfisher inn',
            character: 'innkeeper'
          }
        ],
        notes: 'agile: can be placed in either the close combat or the ranged combat row. cannot be moved once placed.'
      },
      {
        id: 'B9681C03-90B4-472F-9741-A3E05ECD11F9',
        image: '/assets/yaevinn.png',
        name: 'Yaevinn',
        deck: "Scoia'tael",
        row: 'agile',
        strength: 10,
        locations: [
          {
            type: 'quest',
            territory: 'skellige',
            location: 'kaer trolde harbor',
            character: 'sjusta the tailor'
          }
        ],
        notes: 'agile: can be placed in either the close combat or the ranged combat row. cannot be moved once placed.'
      },
      {
        id: 'DD8DA30D-11D6-4F6E-BEC4-75AA2D5FF26F',
        image: '/assets/vrihedd-brigade-veteran.png',
        name: 'Vrihedd Brigade Veteran',
        deck: "Scoia'tael",
        row: 'agile',
        strength: 5,
        locations: [
          {
            type: 'buy',
            territory: 'novigrad',
            location: 'the alchemy inn, oxenfurt',
            character: 'stjepan'
          },
          {
            type: 'buy',
            territory: 'novigrad or velen',
            location: 'kingfisher inn or circus camp near carsten',
            character: 'innkeeper or trader'
          }
        ],
        notes: 'agile: can be placed in either the close combat or the ranged combat row. cannot be moved once placed.'
      }
    ]
  });
}
