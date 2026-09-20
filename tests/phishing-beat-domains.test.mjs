import test from 'node:test';
import assert from 'node:assert/strict';

await import('../public/arcade-games/phishing-beat/data/scenarios.js');
const { cases, officialDomain } = globalThis.PBData;
const domains = cases.filter((entry) => entry.category === 'domain');

test('endereços sob o domínio oficial não são classificados como phishing', () => {
  const officialHosts = domains.filter((entry) => {
    const host = entry.primary.toLowerCase();
    return host === officialDomain || host.endsWith(`.${officialDomain}`);
  });
  assert.ok(officialHosts.length > 0);
  for (const entry of officialHosts) {
    assert.equal(entry.threat, false, `${entry.id}: ${entry.primary}`);
  }
});

test('casos de grafia parecida alteram o domínio base', () => {
  for (const id of ['bad-portal-vella', 'bad-login-velaa', 'bad-login-veia', 'bad-people-vel4']) {
    const example = domains.find((entry) => entry.id.endsWith(id));
    assert.ok(example, id);
    assert.equal(example.threat, true);
    assert.ok(!example.primary.toLowerCase().endsWith(`.${officialDomain}`), example.primary);
  }
});
