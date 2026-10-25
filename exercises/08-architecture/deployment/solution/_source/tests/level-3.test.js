// @vitest-environment node
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'
import { parse } from 'yaml'

import { ROOT } from './helpers.js'

const workflow = parse(readFileSync(join(ROOT, '.github', 'workflows', 'deploy.yml'), 'utf8'))
const steps = Object.values(workflow.jobs).flatMap((job) => job.steps ?? [])
const commands = steps.map((step) => step.run).filter(Boolean)
const using = (action) => steps.find((step) => step.uses?.startsWith(`${action}@`))
const jobUsing = (action) => Object.values(workflow.jobs).find((job) => job.steps?.some((step) => step.uses?.startsWith(`${action}@`)))

describe('[%Knobelei, ein Workflow für GitHub Pages|Challenge, a workflow for GitHub Pages%]', () => {
  it('[%startet bei jedem Push auf main|starts on every push to main%]', () => {
    expect(workflow.on.push.branches).toContain('main')
  })

  it('[%darf Pages schreiben und sich ausweisen|may write to Pages and identify itself%]', () => {
    expect(workflow.permissions).toMatchObject({ pages: 'write', 'id-token': 'write' })
  })

  it('[%installiert, testet und baut in dieser Reihenfolge|installs, tests and builds in this order%]', () => {
    const order = ['npm ci', 'npm test', 'npm run build'].map((command) => commands.indexOf(command))
    expect(order.every((index) => index >= 0)).toBe(true)
    expect(order).toEqual([...order].sort((a, b) => a - b))
  })

  it('[%lädt dist hoch und veröffentlicht es in einem eigenen Job|uploads dist and publishes it in a job of its own%]', () => {
    expect(using('actions/upload-pages-artifact').with.path).toMatch(/^(\.\/)?dist\/?$/)
    const deploy = jobUsing('actions/deploy-pages')
    const build = Object.entries(workflow.jobs).find(([, job]) => job === jobUsing('actions/upload-pages-artifact'))[0]
    expect(deploy.needs).toContain(build)
    expect(deploy.environment.name).toBe('github-pages')
  })
})
