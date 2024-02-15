export enum CategoryId {
  network = 'network',
  wallet = 'wallet',
}

export type Category = {
  id: CategoryId,
  name: string,
  icon: string | null,
}