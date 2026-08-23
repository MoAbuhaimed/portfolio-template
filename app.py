import json
import os
import re
from datetime import date
from pathlib import Path

from flask import Flask, render_template
from markupsafe import Markup, escape

app = Flask(__name__)

DATA_PATH = Path(__file__).parent / "data" / "portfolio.json"


def load_portfolio_data():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def highlight_terminal_line(line):
    """Wrap "quoted" substrings in a span so the whoami.py hero panel
    keeps its original punctuation/string color split, driven from a
    plain code-like string in portfolio.json (no HTML required)."""
    parts = re.split(r'("[^"]*")', line)
    html = "".join(
        f'<span class="tok-string">{escape(part)}</span>' if part.startswith('"') and part.endswith('"')
        else escape(part)
        for part in parts
    )
    return Markup(html)


def render_terminal_lines(lines):
    """Render every whoami.py line with a '>>>' prompt and the color
    split above, joined exactly like the original hand-written markup."""
    rendered = [
        f'<span class="tok-punct">&gt;&gt;&gt;</span> {highlight_terminal_line(line)}'
        for line in lines
    ]
    return Markup("\n".join(rendered))


def emphasize(text):
    """Turn **word** into the site's gradient-highlighted span, so the
    About paragraphs can call out keywords without writing HTML."""
    parts = re.split(r"\*\*(.+?)\*\*", text)
    html = "".join(
        f'<span class="grad-text">{escape(part)}</span>' if i % 2 else escape(part)
        for i, part in enumerate(parts)
    )
    return Markup(html)


app.jinja_env.filters["render_terminal_lines"] = render_terminal_lines
app.jinja_env.filters["emphasize"] = emphasize


@app.context_processor
def inject_globals():
    return {"current_year": date.today().year}


@app.route("/")
def index():
    data = load_portfolio_data()

    # Featured projects are shown first; otherwise projects render in
    # the order they appear in portfolio.json.
    projects = sorted(
        data.get("projects", []),
        key=lambda p: not p.get("featured", False),
    )

    return render_template("index.html", data=data, projects=projects)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5050)), debug=True)
