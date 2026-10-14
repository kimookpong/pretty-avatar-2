import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // Release contracts for the upstream OneWorks npm publisher are not shipped by this website.
    exclude: ['**/app-source/**', '**/dist/**', '**/node_modules/**', '**/avatarDeployWorkflow.spec.ts', '**/avatarSdkProvenance.spec.ts', '**/sdkCiWorkflow.spec.ts', '**/npmPublishCandidate.spec.ts', '**/publishSdkPackagesArtifact.spec.ts'],
    hookTimeout: 120_000,
    maxWorkers: 1,
    testTimeout: 120_000
  }
}))
