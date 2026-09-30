"""Generate the downloadable CV from _pages/cv.md (requires reportlab)."""
from pathlib import Path
import re
from html import unescape
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, Flowable, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "files/kaisar-dauyey-cv.pdf"


class CircularPortrait(Flowable):
    def __init__(self, path, size=25 * mm):
        super().__init__()
        self.image = ImageReader(str(path))
        self.width = self.height = size

    def draw(self):
        canvas = self.canv
        size = self.width
        width, height = self.image.getSize()
        scale = max(size / width, size / height)
        canvas.saveState()
        clip = canvas.beginPath()
        clip.circle(size / 2, size / 2, size / 2 - 1)
        canvas.clipPath(clip, stroke=0)
        canvas.drawImage(self.image, (size - width * scale) / 2,
                         (size - height * scale) / 2,
                         width=width * scale, height=height * scale)
        canvas.restoreState()
        canvas.setStrokeColor(colors.HexColor("#a3122f"))
        canvas.circle(size / 2, size / 2, size / 2 - 1, stroke=1, fill=0)


def rich(text):
    # Keep prose and emphasis; translate Markdown links into clickable PDF links.
    text = re.sub(r"<(?!/?(?:em|strong)\b)[^>]+>", "", text)
    text = escape(unescape(text))
    for tag, target in [("em", "i"), ("strong", "b")]:
        text = text.replace(f"&lt;{tag}&gt;", f"<{target}>").replace(f"&lt;/{tag}&gt;", f"</{target}>")
    text = re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", text)
    def link(match):
        label, url = match.groups()
        if url.startswith("/"):
            url = "https://kays3.github.io" + url
        return f'<link href="{url}" color="#a3122f">{label}</link>'
    return re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link, text.strip())


def build():
    source = (ROOT / "_pages/cv.md").read_text().split("---", 2)[2]
    sections = re.split(r"^## (.+)$", source, flags=re.M)
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle("CVTitle", fontName="Helvetica-Bold", fontSize=23, leading=28, textColor=colors.HexColor("#a3122f"), spaceAfter=5))
    styles.add(ParagraphStyle("CVSection", fontName="Helvetica-Bold", fontSize=12, leading=16, textColor=colors.HexColor("#a3122f"), spaceBefore=10, spaceAfter=6, keepWithNext=True))
    styles.add(ParagraphStyle("CVBody", fontName="Helvetica", fontSize=9.5, leading=12.5, spaceAfter=4, alignment=TA_LEFT))
    styles.add(ParagraphStyle("CVRole", parent=styles["CVBody"], fontName="Helvetica-Bold", keepWithNext=True))
    header = Table([[[Paragraph("Kaisar Dauyey", styles["CVTitle"]),
                      Paragraph("Curriculum vitae · kays3.github.io", styles["CVBody"])],
                     CircularPortrait(ROOT / "images/kaisar-dauyey-portrait.jpg")]],
                   colWidths=[A4[0] - 38 * mm - 28 * mm, 28 * mm])
    header.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story = [header]
    intro = re.search(r'<p class="page-intro">(.*?)</p>', sections[0], re.S)
    story.append(Paragraph(rich(intro.group(1)), styles["CVBody"]))
    for heading, body in zip(sections[1::2], sections[2::2]):
        story.append(Paragraph(escape(heading), styles["CVSection"]))
        if 'class="timeline"' in body:
            section_heading = story.pop()
            for entry_index, (date, title, rest) in enumerate(re.findall(r'<div class="timeline-item"><div class="timeline-date">(.*?)</div><div><h3>(.*?)</h3>(.*?)</div></div>', body, re.S)):
                paragraphs = re.findall(r"<p>(.*?)</p>", rest, re.S)
                story.append(KeepTogether([
                    *([section_heading] if entry_index == 0 else []),
                    Paragraph(f"{rich(title)} <font color='#666666'>| {rich(date)}</font>", styles["CVRole"]),
                    *[Paragraph(rich(p), styles["CVBody"]) for p in paragraphs],
                    Spacer(1, 3),
                ]))
        elif 'class="tag-cloud"' in body:
            tags = re.findall(r"<span>(.*?)</span>", body)
            story.append(Paragraph(" · ".join(rich(t) for t in tags), styles["CVBody"]))
        else:
            for line in body.strip().splitlines():
                if line.strip():
                    story.append(Paragraph(("• " + rich(line[2:])) if line.startswith("- ") else rich(line), styles["CVBody"]))
    def footer(canvas, doc):
        canvas.saveState()
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#666666"))
        canvas.drawString(19 * mm, 12 * mm, "Kaisar Dauyey | Curriculum vitae")
        canvas.drawRightString(A4[0] - 19 * mm, 12 * mm, str(doc.page))
        canvas.restoreState()
    OUTPUT.parent.mkdir(exist_ok=True)
    SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=19*mm, leftMargin=19*mm, topMargin=18*mm, bottomMargin=20*mm, title="Kaisar Dauyey - Curriculum vitae", author="Kaisar Dauyey").build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUTPUT)


if __name__ == "__main__":
    build()
