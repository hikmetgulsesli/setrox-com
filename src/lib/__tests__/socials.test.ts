import { describe, it } from 'node:test';
import assert from 'node:assert';
import { 
  socials, 
  socialCount,
  type SocialLink 
} from '@/data/socials';

describe('Socials Data', () => {
  it('should have exactly 3 social links', () => {
    assert.strictEqual(socials.length, 3);
    assert.strictEqual(socialCount, 3);
  });

  it('should have valid social link structure for all items', () => {
    for (const social of socials) {
      assert.ok(social.id, 'Social should have an id');
      assert.ok(social.name, 'Social should have a name');
      assert.ok(social.handle, 'Social should have a handle');
      assert.ok(social.url, 'Social should have a url');
      assert.ok(social.icon, 'Social should have an icon');
      
      // Validate URL starts with https
      assert.ok(social.url.startsWith('https://'), 'URL should be HTTPS');
    }
  });

  it('should have unique ids', () => {
    const ids = socials.map(s => s.id);
    const uniqueIds = new Set(ids);
    assert.strictEqual(uniqueIds.size, ids.length, 'All social ids should be unique');
  });

  it('should have LinkedIn, X, and GitHub', () => {
    const ids = socials.map(s => s.id);
    assert.ok(ids.includes('linkedin'), 'Should have LinkedIn');
    assert.ok(ids.includes('x'), 'Should have X');
    assert.ok(ids.includes('github'), 'Should have GitHub');
  });

  it('should have correct handles', () => {
    const linkedin = socials.find(s => s.id === 'linkedin');
    const x = socials.find(s => s.id === 'x');
    const github = socials.find(s => s.id === 'github');
    
    assert.strictEqual(linkedin?.handle, '/setrox');
    assert.strictEqual(x?.handle, '@setrox');
    assert.strictEqual(github?.handle, '@hikmetgulsesli');
  });

  it('should derive counts from .length, never hardcoded', () => {
    // This test ensures we're using dynamic counts
    assert.strictEqual(socialCount, socials.length);
  });
});
