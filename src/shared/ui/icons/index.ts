import Database from './database.svg';
import Discord from './discord.svg';
import FlatStack from './flatStack.svg';
import LinkedIn from './linkedin.svg';
import Reddit from './reddit.svg';
import Telegram from './telegram.svg';
import Twitter from './twitter.svg';

export const IconNames = {
  Database: 'Database',
  Discord: 'Discord',
  FlatStack: 'FlatStack',
  LinkedIn: 'LinkedIn',
  Reddit: 'Reddit',
  Telegram: 'Telegram',
  Twitter: 'Twitter',
}

export type IconName = typeof IconNames[keyof typeof IconNames];

export const Icons: Record<IconName, any> = {
  [IconNames.Database]: Database,
  [IconNames.Discord]: Discord,
  [IconNames.FlatStack]: FlatStack,
  [IconNames.LinkedIn]: LinkedIn,
  [IconNames.Reddit]: Reddit,
  [IconNames.Telegram]: Telegram,
  [IconNames.Twitter]: Twitter,
} as const;
