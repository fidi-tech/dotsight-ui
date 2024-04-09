import Chart from './chart.svg';
import ChevronUp from './chevronUp.svg';
import Clock from './clock.svg';
import Database from './database.svg';
import Disconnect from './disconnect.svg';
import Discord from './discord.svg';
import EmptyPipe from './emptyPipe.svg';
import Ethereum from './ethereum.svg';
import Export from './export.svg';
import FlatStack from './flatStack.svg';
import Github from './github.svg';
import Google from './google.svg';
import LinkedIn from './linkedin.svg';
import Nodes from './nodes.svg';
import OutlinedArrow from './outlinedArrow.svg';
import Pen from './pen.svg';
import Plus from './plus.svg';
import Reddit from './reddit.svg';
import Search from './search.svg';
import Telegram from './telegram.svg';
import Tiles from './tiles.svg';
import Tokens from './tokens.svg';
import Trash from './trash.svg';
import Triangle from './triangle.svg';
import Wallet from './wallet.svg';
import X from './x.svg';

export const IconNames = {
  Chart: 'Chart',
  ChevronUp: 'ChevronUp',
  Clock: 'Clock',
  Database: 'Database',
  Disconnect: 'Disconnect',
  Discord: 'Discord',
  EmptyPipe: 'EmptyPipe',
  Ethereum: 'Ethereum',
  Export: 'Export',
  FlatStack: 'FlatStack',
  Github: 'Github',
  Google: 'Google',
  LinkedIn: 'LinkedIn',
  Nodes: 'Nodes',
  OutlinedArrow: 'OutlinedArrow',
  Pen: 'Pen',
  Plus: 'Plus',
  Reddit: 'Reddit',
  Search: 'Search',
  Telegram: 'Telegram',
  Tiles: 'Tiles',
  Tokens: 'Tokens',
  Trash: 'Trash',
  Triangle: 'Triangle',
  Wallet: 'Wallet',
  X: 'X',
}

export type IconName = typeof IconNames[keyof typeof IconNames];

export const Icons: Record<IconName, any> = {
  [IconNames.Chart]: Chart,
  [IconNames.ChevronUp]: ChevronUp,
  [IconNames.Clock]: Clock,
  [IconNames.Database]: Database,
  [IconNames.Disconnect]: Disconnect,
  [IconNames.Discord]: Discord,
  [IconNames.EmptyPipe]: EmptyPipe,
  [IconNames.Ethereum]: Ethereum,
  [IconNames.Export]: Export,
  [IconNames.FlatStack]: FlatStack,
  [IconNames.Github]: Github,
  [IconNames.Google]: Google,
  [IconNames.LinkedIn]: LinkedIn,
  [IconNames.Nodes]: Nodes,
  [IconNames.OutlinedArrow]: OutlinedArrow,
  [IconNames.Pen]: Pen,
  [IconNames.Plus]: Plus,
  [IconNames.Reddit]: Reddit,
  [IconNames.Search]: Search,
  [IconNames.Telegram]: Telegram,
  [IconNames.Tiles]: Tiles,
  [IconNames.Tokens]: Tokens,
  [IconNames.Trash]: Trash,
  [IconNames.Triangle]: Triangle,
  [IconNames.Wallet]: Wallet,
  [IconNames.X]: X,
} as const;
