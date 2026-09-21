import {ARCADE_REWARDS} from './arcade-rewards.js';

const rewardByItem=new Map(ARCADE_REWARDS.flatMap(reward=>reward.items.map(id=>[id,reward])));

export function canPlaceReward(id,unlockedItems,previouslyPlacedItems){
  return !rewardByItem.has(id)||unlockedItems.has(id)||previouslyPlacedItems.has(id);
}

export function rewardLockLabel(id){
  const reward=rewardByItem.get(id);
  return reward?`Alcance ${reward.target} ${reward.unit} em ${reward.game} para liberar ${reward.title}.`:'';
}

export function knownUnlockedItems(value){
  return new Set(Array.isArray(value)?value.filter(id=>typeof id==='string'&&rewardByItem.has(id)):[]);
}
