import { describe, it } from 'node:test';
import assert from 'node:assert';
import { 
  projects, 
  projectCount, 
  shippedProjects, 
  inProgressProjects, 
  archivedProjects,
  type Project,
  type ProjectStatus 
} from '@/data/projects';

describe('Projects Data', () => {
  it('should have exactly 12 projects', () => {
    assert.strictEqual(projects.length, 12);
    assert.strictEqual(projectCount, 12);
  });

  it('should have valid project structure for all items', () => {
    for (const project of projects) {
      assert.ok(project.id, 'Project should have an id');
      assert.ok(project.name, 'Project should have a name');
      assert.ok(typeof project.year === 'number', 'Project year should be a number');
      assert.ok(['shipped', 'in-progress', 'archived'].includes(project.status), 'Project should have valid status');
      assert.ok(project.description, 'Project should have a description');
      assert.ok(Array.isArray(project.tags), 'Project tags should be an array');
      assert.ok(project.tags.length > 0, 'Project should have at least one tag');
      assert.ok(project.sourceUrl, 'Project should have a sourceUrl');
      // liveUrl can be null
    }
  });

  it('should have unique ids', () => {
    const ids = projects.map(p => p.id);
    const uniqueIds = new Set(ids);
    assert.strictEqual(uniqueIds.size, ids.length, 'All project ids should be unique');
  });

  it('should have correct status distribution', () => {
    const shippedCount = shippedProjects.length;
    const inProgressCount = inProgressProjects.length;
    const archivedCount = archivedProjects.length;
    
    assert.ok(shippedCount > 0, 'Should have shipped projects');
    assert.ok(inProgressCount > 0, 'Should have in-progress projects');
    assert.strictEqual(archivedCount, 0, 'Should have no archived projects initially');
    assert.strictEqual(shippedCount + inProgressCount + archivedCount, 12, 'Status counts should sum to total');
  });

  it('should have projects from 2025 and 2026', () => {
    const years = projects.map(p => p.year);
    assert.ok(years.includes(2025), 'Should have projects from 2025');
    assert.ok(years.includes(2026), 'Should have projects from 2026');
  });

  it('should have specific required projects', () => {
    const projectNames = projects.map(p => p.name);
    assert.ok(projectNames.includes('Mission Control'), 'Should have Mission Control');
    assert.ok(projectNames.includes('Antfarm Workflows'), 'Should have Antfarm Workflows');
    assert.ok(projectNames.includes('RestMenu'), 'Should have RestMenu');
    assert.ok(projectNames.includes('LogPulse'), 'Should have LogPulse');
    assert.ok(projectNames.includes('AgentViz'), 'Should have AgentViz');
    assert.ok(projectNames.includes('ClawDocs'), 'Should have ClawDocs');
    assert.ok(projectNames.includes('StatusPage'), 'Should have StatusPage');
    assert.ok(projectNames.includes('Discord Bot (Arya)'), 'Should have Discord Bot (Arya)');
    assert.ok(projectNames.includes('Pomodoro Timer'), 'Should have Pomodoro Timer');
    assert.ok(projectNames.includes('Habit Tracker'), 'Should have Habit Tracker');
    assert.ok(projectNames.includes('Typing Speed Test'), 'Should have Typing Speed Test');
    assert.ok(projectNames.includes('Smart RAM Skill'), 'Should have Smart RAM Skill');
  });

  it('should derive counts from .length, never hardcoded', () => {
    // This test ensures we're using dynamic counts
    assert.strictEqual(projectCount, projects.length);
    assert.strictEqual(shippedProjects.length, projects.filter(p => p.status === 'shipped').length);
    assert.strictEqual(inProgressProjects.length, projects.filter(p => p.status === 'in-progress').length);
    assert.strictEqual(archivedProjects.length, projects.filter(p => p.status === 'archived').length);
  });
});
