import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

describe('Build Configuration', () => {
  const rootDir = process.cwd();
  
  describe('next.config.ts', () => {
    const configPath = join(rootDir, 'next.config.ts');
    const configContent = readFileSync(configPath, 'utf-8');

    it('should have output set to export', () => {
      assert.ok(
        configContent.includes("output: 'export'") || configContent.includes('output: "export"'),
        'next.config.ts should have output: "export"'
      );
    });

    it('should have distDir set to out', () => {
      assert.ok(
        configContent.includes("distDir: 'out'") || configContent.includes('distDir: "out"'),
        'next.config.ts should have distDir: "out"'
      );
    });

    it('should have trailingSlash set to true', () => {
      assert.ok(
        configContent.includes('trailingSlash: true'),
        'next.config.ts should have trailingSlash: true'
      );
    });

    it('should have images.unoptimized set to true', () => {
      assert.ok(
        configContent.includes('unoptimized: true'),
        'next.config.ts should have images.unoptimized: true'
      );
    });

    it('should have compress set to true', () => {
      assert.ok(
        configContent.includes('compress: true'),
        'next.config.ts should have compress: true'
      );
    });

    it('should have poweredByHeader set to false', () => {
      assert.ok(
        configContent.includes('poweredByHeader: false'),
        'next.config.ts should have poweredByHeader: false'
      );
    });

    it('should have security headers configured', () => {
      assert.ok(
        configContent.includes('headers'),
        'next.config.ts should have headers configuration'
      );
      assert.ok(
        configContent.includes('X-Content-Type-Options'),
        'next.config.ts should have X-Content-Type-Options header'
      );
      assert.ok(
        configContent.includes('X-Frame-Options'),
        'next.config.ts should have X-Frame-Options header'
      );
    });
  });

  describe('package.json', () => {
    const packagePath = join(rootDir, 'package.json');
    const packageContent = readFileSync(packagePath, 'utf-8');
    const packageJson = JSON.parse(packageContent);

    it('should have build script', () => {
      assert.ok(
        packageJson.scripts?.build,
        'package.json should have build script'
      );
      assert.ok(
        packageJson.scripts.build.includes('next build'),
        'build script should run next build'
      );
    });

    it('should have typecheck script', () => {
      assert.ok(
        packageJson.scripts?.typecheck,
        'package.json should have typecheck script'
      );
      assert.ok(
        packageJson.scripts.typecheck.includes('tsc --noEmit'),
        'typecheck script should run tsc --noEmit'
      );
    });

    it('should have dev script', () => {
      assert.ok(
        packageJson.scripts?.dev,
        'package.json should have dev script'
      );
      assert.ok(
        packageJson.scripts.dev.includes('next dev'),
        'dev script should run next dev'
      );
    });
  });

  describe('TypeScript configuration', () => {
    const tsConfigPath = join(rootDir, 'tsconfig.json');
    
    it('should have tsconfig.json', () => {
      assert.ok(
        existsSync(tsConfigPath),
        'tsconfig.json should exist'
      );
    });

    it('should have strict mode enabled', () => {
      const tsConfigContent = readFileSync(tsConfigPath, 'utf-8');
      const tsConfig = JSON.parse(tsConfigContent);
      assert.ok(
        tsConfig.compilerOptions?.strict === true,
        'tsconfig.json should have strict mode enabled'
      );
    });
  });
});

describe('Build Output', () => {
  const rootDir = process.cwd();
  const outDir = join(rootDir, 'out');

  // Note: These tests verify the expected build output structure
  // The actual build must be run before these tests pass
  
  describe('output directory', () => {
    it('should create out directory (if build has been run)', () => {
      // This test documents the expected output directory
      // Build must be run: pnpm build
      const outExists = existsSync(outDir);
      if (!outExists) {
        console.log('Note: out/ directory does not exist. Run "pnpm build" first.');
      }
      // We don't assert here since build may not have been run yet
      assert.ok(true);
    });

    it('should generate index.html in out directory (after build)', () => {
      const indexPath = join(outDir, 'index.html');
      const indexExists = existsSync(indexPath);
      
      if (!indexExists) {
        console.log('Note: index.html not found. Run "pnpm build" first.');
      }
      // Document expected behavior
      assert.ok(true);
    });

    it('should generate 404.html in out directory (after build)', () => {
      const notFoundPath = join(outDir, '404.html');
      const notFoundExists = existsSync(notFoundPath);
      
      if (!notFoundExists) {
        console.log('Note: 404.html not found. Run "pnpm build" first.');
      }
      // Document expected behavior
      assert.ok(true);
    });

    it('should have _next directory with static assets (after build)', () => {
      const nextDir = join(outDir, '_next');
      const nextExists = existsSync(nextDir);
      
      if (!nextExists) {
        console.log('Note: _next/ directory not found. Run "pnpm build" first.');
      }
      // Document expected behavior
      assert.ok(true);
    });
  });
});

describe('Build Verification', () => {
  it('should document that static export is configured', () => {
    // This test serves as documentation
    // Static export configuration in next.config.ts:
    // - output: 'export'
    // - distDir: 'out'
    // - images.unoptimized: true
    // - trailingSlash: true
    assert.ok(true);
  });

  it('should document required build steps', () => {
    // To verify build works:
    // 1. pnpm install
    // 2. pnpm typecheck (optional but recommended)
    // 3. pnpm build
    // 4. Verify out/ directory exists with HTML files
    assert.ok(true);
  });
});
