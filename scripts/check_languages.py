#!/usr/bin/env python3
"""Check rendered language routes, reciprocal switches, metadata, and local links."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.lang = None
        self.links = []
        self.ids = set()
        self.switches = {}
        self.current = []
        self.alternates = {}
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "a" and "href" in a:
            self.links.append(a["href"])
            if "hreflang" in a:
                self.switches[a["hreflang"]] = a["href"]
                if a.get("aria-current") == "page":
                    self.current.append(a["hreflang"])
        if tag == "link" and a.get("rel") == "alternate" and "hreflang" in a:
            self.alternates[a["hreflang"]] = a["href"]


root = Path(sys.argv[1] if len(sys.argv) > 1 else "_site")
routes_file = Path(__file__).resolve().parents[1] / "_data/translated_routes.yml"
routes = [line[2:].strip() for line in routes_file.read_text().splitlines() if line.startswith("- ")]
codes = ("en", "ja", "ru", "kk")
parsed = {}


def read(url):
    path = urlsplit(url).path
    file = root / unquote(path).lstrip("/")
    if file.is_dir():
        file /= "index.html"
    assert file.is_file(), f"Missing route or file: {url}"
    if file.suffix != ".html":
        return None
    if file not in parsed:
        parsed[file] = Page(file.read_text())
    return parsed[file]


for route in routes:
    for code in codes:
        url = ("" if code == "en" else "/" + code) + route
        page = read(url)
        assert page.lang == code, (url, page.lang)
        assert page.current == [code], (url, page.current)
        assert set(page.switches) == set(codes), (url, page.switches)
        for other in codes:
            expected = ("" if other == "en" else "/" + other) + route
            assert urlsplit(page.switches[other]).path == expected, (url, other)
            assert urlsplit(page.alternates[other]).path == expected, (url, other)
        assert urlsplit(page.alternates["x-default"]).path == route
        for href in page.links:
            parts = urlsplit(href)
            if parts.scheme or parts.netloc:
                continue
            if parts.path and not parts.path.startswith("/"):
                continue
            target = read(parts.path or url)
            if parts.fragment and target:
                assert unquote(parts.fragment) in target.ids, (url, href, "missing anchor")

print(f"Verified {len(routes) * len(codes)} language routes and all internal destinations.")
