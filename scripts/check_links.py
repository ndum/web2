"""Link check of the built site and its demo: every internal link points to a page or file that
exists, and every anchor to an id on its page. Run it after the build of the site and of the demo.

    python scripts/check_links.py [site/dist]

A preview builds below a base path such as /pr-preview/pr-7/, and SITE_BASE names it here as it does
for the build. The script reads the HTML with a parser, so markup shown in code examples, such as a
link to #/items/6, is text and never counts as a link.
"""

import os
import sys
import urllib.parse
from html.parser import HTMLParser
from pathlib import Path

EXTERNAL = ("http:", "https:", "mailto:", "data:", "javascript:")


class Page(HTMLParser):
    """The ids and the targets of the links of one page."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.links = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name == "id" and value:
                self.ids.add(value)
            elif tag == "a" and name == "href" and value:
                self.links.append(value)


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).resolve().parents[1] / "site" / "dist").resolve()
    base = os.environ.get("SITE_BASE") or "/"
    if not base.endswith("/"):
        base += "/"
    pages = {}
    for file in root.rglob("*.html"):
        page = Page()
        page.feed(file.read_text(encoding="utf-8"))
        pages[file.resolve()] = page

    problems = []
    for file, page in pages.items():
        where = file.relative_to(root).as_posix()
        for href in page.links:
            if href.startswith(EXTERNAL):
                continue
            path, _, fragment = href.partition("#")
            path = urllib.parse.unquote(path.partition("?")[0])
            if path.startswith(base):
                target = root / path[len(base):]
            elif path.startswith("/"):
                problems.append(f"{where}: link outside the base path {base}: {href}")
                continue
            elif path == "":
                target = file
            else:
                target = file.parent / path
            target = Path(os.path.normpath(target))
            if target.is_dir() or not target.suffix:
                target = target / "index.html"
            if not target.exists():
                problems.append(f"{where}: missing page {href}")
                continue
            anchor = urllib.parse.unquote(fragment)
            if anchor and target.suffix == ".html" and anchor not in pages[target.resolve()].ids:
                problems.append(f"{where}: missing anchor {href}")

    for problem in problems:
        print(problem)
    print(f"{len(pages)} pages checked, {len(problems)} problems")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
