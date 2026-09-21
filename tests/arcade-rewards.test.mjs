import assert from 'node:assert/strict';
import test from 'node:test';
import {existsSync} from 'node:fs';
import {ARCADE_REWARDS} from '../public/house-3d/arcade-rewards.js';
import {CATALOG} from '../public/house-3d/catalog.js';
import {canPlaceReward,knownUnlockedItems,rewardLockLabel} from '../public/house-3d/reward-access.js';

test('cada jogo com modelos tem três marcos crescentes e cada modelo pertence a uma recompensa',()=>{
  const games=new Map(),items=new Set();
  for(const reward of ARCADE_REWARDS){
    const group=games.get(reward.gameId)??[];group.push(reward);games.set(reward.gameId,group);
    assert.ok(Number.isInteger(reward.target)&&reward.target>0);
    for(const id of reward.items){
      assert.ok(!items.has(id),`modelo duplicado: ${id}`);items.add(id);
      const item=CATALOG.find(candidate=>candidate.id===id);
      assert.equal(item?.rewardId,reward.id);
      assert.equal(item?.category,'achievement');
      assert.ok(item?.image&&existsSync(new URL(`../public/house-3d/${item.image}`,import.meta.url)),`miniatura ausente: ${id}`);
    }
  }
  assert.equal(games.size,7);
  for(const [id,group] of games){
    assert.equal(group.length,3,`${id} precisa de três marcos`);
    assert.ok(group[0].target<group[1].target&&group[1].target<group[2].target);
  }
});

test('itens bloqueados, liberados e já colocados mantêm o acesso esperado',()=>{
  const locked='escritorio_fragmentadora';
  const unlocked=knownUnlockedItems(['escritorio_organizador_vertical','item_inventado']);
  const previous=new Set(['aventura_quadro_estrategia']);
  assert.equal(canPlaceReward(locked,unlocked,previous),false);
  assert.equal(canPlaceReward('escritorio_organizador_vertical',unlocked,previous),true);
  assert.equal(canPlaceReward('aventura_quadro_estrategia',unlocked,previous),true);
  assert.equal(canPlaceReward('table',unlocked,previous),true);
  assert.match(rewardLockLabel(locked),/500 pontos em Dumb Ways to Phish/);
  assert.equal(unlocked.has('item_inventado'),false);
  assert.equal(knownUnlockedItems(null).size,0);
});
