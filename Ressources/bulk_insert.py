#!/usr/bin/env python3
"""
Bulk insert exercises into the tutoring website via REST API.

Usage:
  python bulk_insert.py --file exercises.json --api http://localhost:3000/api --token YOUR_JWT

JSON format (array of objects):
[
  {
    "title": "Diagonalisation — exercice 3",
    "chapter_id": 12,
    "type": "exercice",          // exercice | cours | methode | interro | colle | ecrit_concours | oral_concours
    "level": "mpsi,mp",          // comma-separated
    "difficulty": "moyen",       // facile | moyen | difficile
    "description": "...",
    "content_type": "latex",     // pdf | latex
    "latex_statement": "Soit $E$...",
    "latex_solution": "On montre que...",
    "pdf_statement_url": "",
    "pdf_solution_url": "",
    "is_published": true
  }
]
"""

import argparse
import json
import sys
import time
import urllib.request
import urllib.error


def insert_one(api_url: str, token: str, doc: dict) -> dict:
    payload = json.dumps(doc).encode()
    req = urllib.request.Request(
        f"{api_url}/admin/documents",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
        },
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def main():
    parser = argparse.ArgumentParser(description="Bulk insert exercises via API")
    parser.add_argument("--file", required=True, help="JSON file with exercises array")
    parser.add_argument("--api", default="http://localhost:3000/api", help="API base URL")
    parser.add_argument("--token", required=True, help="JWT admin token")
    parser.add_argument("--dry-run", action="store_true", help="Print what would be sent without inserting")
    parser.add_argument("--delay", type=float, default=0.2, help="Delay between requests in seconds (default 0.2)")
    args = parser.parse_args()

    with open(args.file, encoding="utf-8-sig") as f:
        exercises = json.load(f)

    if not isinstance(exercises, list):
        print("ERROR: JSON file must contain an array", file=sys.stderr)
        sys.exit(1)

    print(f"[bulk_insert] {len(exercises)} exercises to insert")
    ok, err = 0, 0

    for i, doc in enumerate(exercises, 1):
        title = doc.get("title", "(no title)")
        if args.dry_run:
            print(f"  [{i}/{len(exercises)}] DRY-RUN: {title}")
            continue
        try:
            result = insert_one(args.api, args.token, doc)
            print(f"  [{i}/{len(exercises)}] OK  id={result.get('id')}  {title}")
            ok += 1
        except urllib.error.HTTPError as e:
            body = e.read().decode(errors="replace")
            print(f"  [{i}/{len(exercises)}] ERR {e.code}: {title} — {body}", file=sys.stderr)
            err += 1
        except Exception as e:
            print(f"  [{i}/{len(exercises)}] ERR {title} — {e}", file=sys.stderr)
            err += 1
        time.sleep(args.delay)

    if not args.dry_run:
        print(f"\n[bulk_insert] Done: {ok} inserted, {err} errors")


if __name__ == "__main__":
    main()
