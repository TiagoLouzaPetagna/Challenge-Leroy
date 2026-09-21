import assert from 'node:assert/strict';
import {test} from 'node:test';
import {GAMES} from '../public/arcade-games/dumb-ways-extras/catalog.js';
import {createSession,ROUND_COUNT} from '../public/arcade-games/dumb-ways-extras/generator.js';

function random(seed){
  let state=seed;
  return ()=>((state=(state*1664525+1013904223)>>>0)/2**32);
}

const ids=Object.keys(GAMES);

test('todas as modalidades geram rodadas distintas com respostas válidas',()=>{
  for(const id of ids){
    for(let seed=1;seed<=100;seed++){
      const rounds=createSession(id,random(seed));
      assert.equal(rounds.length,ROUND_COUNT,`${id}, semente ${seed}`);
      const seen=new Set();
      for(const round of rounds){
        const key=round.url||(Array.isArray(round.answer)?round.answer.join(''):`${round.from}|${round.message}`);
        assert.equal(seen.has(`${round.kind}:${key}`),false,`${id}: rodada repetida`);
        seen.add(`${round.kind}:${key}`);
        if(round.kind==='hover'){
          const hostname=new URL(round.url).hostname;
          assert.equal(round.safe,hostname.endsWith(`.${round.trusted}`));
        }
        if(round.kind==='lockpick'){
          const hostname=new URL(round.url).hostname;
          assert.equal(round.choices.length,3);
          assert.equal(new Set(round.choices).size,3);
          assert.deepEqual(round.choices.map(choice=>hostname.endsWith(`.${choice}`)),round.choices.map((_,index)=>index===round.answer));
        }
        if(round.kind==='builder'){
          assert.equal(round.pieces.length,6);
          assert.equal(new Set(round.pieces).size,6);
          assert.ok(round.answer.every(piece=>round.pieces.includes(piece)));
          assert.ok(new URL(round.answer.join('')).hostname.endsWith(`.${round.trusted}`));
        }
        if(round.kind==='login'){
          assert.equal(round.flags.length,2);
          assert.equal(new Set(round.flags).size,2);
          assert.equal(round.reasons.length,2);
        }
        if(round.kind==='callback'){
          assert.equal(round.choices.length,3);
          assert.equal(new Set(round.choices).size,3);
          assert.ok(round.answer>=0&&round.answer<3);
        }
      }
    }
  }
});

test('rodadas de inspeção distribuem destinos conhecidos e imitações',()=>{
  assert.equal(createSession('hover-first',random(41)).filter(round=>round.safe).length,5);
  assert.equal(createSession('link-lockpick',random(41)).filter(round=>round.why.includes('Ele coincide')).length,5);
});
