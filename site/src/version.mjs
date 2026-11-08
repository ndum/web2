/**
 * The commit the site is built from, for the footer of every page. GitHub builds a pull request
 * from a merge commit of its own, so the preview passes the head of the branch in SITE_COMMIT.
 */
import { execFileSync } from 'node:child_process';

function git(...args) {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

const sha = process.env.SITE_COMMIT || git('rev-parse', 'HEAD');
// A shallow checkout may lack the commit, the footer then shows no date
const date = sha ? git('show', '-s', '--format=%cs', sha) : '';

export const commit = { sha, short: sha.slice(0, 7), date };
