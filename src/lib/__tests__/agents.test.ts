import { describe, it } from 'node:test';
import assert from 'node:assert';
import { 
  agents, 
  agentCount, 
  agentsByModel,
  type Agent,
  type AgentRole,
  type AgentModel
} from '@/data/agents';

describe('Agents Data', () => {
  it('should have exactly 10 agents', () => {
    assert.strictEqual(agents.length, 10);
    assert.strictEqual(agentCount, 10);
  });

  it('should have valid agent structure for all items', () => {
    for (const agent of agents) {
      assert.ok(agent.id, 'Agent should have an id');
      assert.ok(agent.name, 'Agent should have a name');
      assert.ok(agent.role, 'Agent should have a role');
      assert.ok(agent.model, 'Agent should have a model');
      assert.ok(agent.description, 'Agent should have a description');
      assert.ok(agent.color, 'Agent should have a color');
      assert.ok(agent.icon, 'Agent should have an icon');
      
      // Validate color is a valid hex color
      assert.ok(/^#[0-9a-fA-F]{6}$/.test(agent.color), 'Color should be a valid hex color');
      
      // Validate model is one of the allowed values
      assert.ok(['MiniMax M2.5', 'Kimi K2.5'].includes(agent.model), 'Model should be valid');
    }
  });

  it('should have unique ids', () => {
    const ids = agents.map(a => a.id);
    const uniqueIds = new Set(ids);
    assert.strictEqual(uniqueIds.size, ids.length, 'All agent ids should be unique');
  });

  it('should have unique names', () => {
    const names = agents.map(a => a.name);
    const uniqueNames = new Set(names);
    assert.strictEqual(uniqueNames.size, names.length, 'All agent names should be unique');
  });

  it('should have specific required agents', () => {
    const agentNames = agents.map(a => a.name);
    assert.ok(agentNames.includes('Arya'), 'Should have Arya');
    assert.ok(agentNames.includes('Koda'), 'Should have Koda');
    assert.ok(agentNames.includes('Kaan'), 'Should have Kaan');
    assert.ok(agentNames.includes('Atlas'), 'Should have Atlas');
    assert.ok(agentNames.includes('Defne'), 'Should have Defne');
    assert.ok(agentNames.includes('Sinan'), 'Should have Sinan');
    assert.ok(agentNames.includes('Elif'), 'Should have Elif');
    assert.ok(agentNames.includes('Deniz'), 'Should have Deniz');
    assert.ok(agentNames.includes('Onur'), 'Should have Onur');
    assert.ok(agentNames.includes('Mert'), 'Should have Mert');
  });

  it('should have correct roles for each agent', () => {
    const arya = agents.find(a => a.name === 'Arya');
    const koda = agents.find(a => a.name === 'Koda');
    const kaan = agents.find(a => a.name === 'Kaan');
    const atlas = agents.find(a => a.name === 'Atlas');
    
    assert.strictEqual(arya?.role, 'CEO');
    assert.strictEqual(koda?.role, 'Lead Dev');
    assert.strictEqual(kaan?.role, 'Sr. FS');
    assert.strictEqual(atlas?.role, 'Infra');
  });

  it('should have correct model distribution', () => {
    const minimaxCount = agentsByModel.minimax.length;
    const kimiCount = agentsByModel.kimi.length;
    
    assert.ok(minimaxCount > 0, 'Should have MiniMax M2.5 agents');
    assert.ok(kimiCount > 0, 'Should have Kimi K2.5 agents');
    assert.strictEqual(minimaxCount + kimiCount, 10, 'Model counts should sum to total');
  });

  it('should derive counts from .length, never hardcoded', () => {
    // This test ensures we're using dynamic counts
    assert.strictEqual(agentCount, agents.length);
    assert.strictEqual(agentsByModel.minimax.length, agents.filter(a => a.model === 'MiniMax M2.5').length);
    assert.strictEqual(agentsByModel.kimi.length, agents.filter(a => a.model === 'Kimi K2.5').length);
  });

  it('should have valid agent-specific colors', () => {
    const expectedColors: Record<string, string> = {
      'Arya': '#ef4444',
      'Koda': '#3b82f6',
      'Kaan': '#eab308',
      'Atlas': '#22c55e',
      'Defne': '#a855f7',
      'Sinan': '#6366f1',
      'Elif': '#06b6d4',
      'Deniz': '#f97316',
      'Onur': '#14b8a6',
      'Mert': '#ec4899',
    };

    for (const agent of agents) {
      assert.strictEqual(
        agent.color, 
        expectedColors[agent.name], 
        `${agent.name} should have correct color`
      );
    }
  });
});
