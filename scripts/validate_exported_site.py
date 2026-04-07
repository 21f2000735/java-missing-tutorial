#!/usr/bin/env python3

from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent.parent
DOCS_ROOT = ROOT / "docs"
SITE_BASE_PATH = "/java-missing-tutorial/"
HTML_EXTENSIONS = {".html", ".txt"}
ATTRIBUTES = ("href", "src", "srcset")
CHECKED_EXTENSIONS = {
    ".css",
    ".gif",
    ".html",
    ".ico",
    ".jpeg",
    ".jpg",
    ".js",
    ".json",
    ".png",
    ".svg",
    ".webp",
    ".woff",
    ".woff2",
}


class AssetReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.references: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if name not in ATTRIBUTES or not value:
                continue
            if name == "srcset":
                for part in value.split(","):
                    candidate = part.strip().split(" ", 1)[0]
                    if candidate:
                        self.references.append(candidate)
                continue
            self.references.append(value.strip())


def is_external(reference: str) -> bool:
    if not reference or reference.startswith(("#", "data:", "javascript:", "mailto:", "tel:")):
        return True
    parsed = urlparse(reference)
    return bool(parsed.scheme or parsed.netloc)


def resolve_reference(reference: str, source_file: Path) -> Path | None:
    parsed = urlparse(reference)
    path = parsed.path

    if not path or path == "/":
        return None

    if Path(path).suffix.lower() not in CHECKED_EXTENSIONS:
        return None

    if path.startswith(SITE_BASE_PATH):
        relative = path[len(SITE_BASE_PATH):]
        return DOCS_ROOT / relative

    if path.startswith("/"):
        return DOCS_ROOT / path.lstrip("/")

    return source_file.parent / path


def iter_html_files() -> list[Path]:
    return sorted(path for path in DOCS_ROOT.rglob("*") if path.is_file() and path.suffix in HTML_EXTENSIONS)


def main() -> int:
    if not DOCS_ROOT.exists():
        raise SystemExit("docs/ does not exist. Run the web export first.")

    missing: list[tuple[Path, str, Path]] = []

    for source_file in iter_html_files():
        parser = AssetReferenceParser()
        parser.feed(source_file.read_text(encoding="utf-8"))
        for reference in parser.references:
            if is_external(reference):
                continue
            target = resolve_reference(reference, source_file)
            if target is None:
                continue
            if not target.exists():
                missing.append((source_file.relative_to(ROOT), reference, target.relative_to(ROOT)))

    if missing:
        print("Exported site is referencing missing local assets:")
        for source_file, reference, target in missing:
            print(f"- {source_file}: {reference} -> {target}")
        return 1

    print("Exported site asset references are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
