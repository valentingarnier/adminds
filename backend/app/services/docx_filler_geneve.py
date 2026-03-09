"""
Fill a Geneva .docx template from a flat JSON dict keyed by field IDs.

Simpler than Fribourg: only form fields (header) and single-cell table fills.
"""

from __future__ import annotations

import io
from typing import Any

from docx import Document
from lxml import etree

from app.services.geneve_field_map import ALL_FORM_FIELDS, ALL_TABLE_CELLS

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}


def fill_geneve_template(template_path: str, data: dict[str, Any]) -> bytes:
    """
    Open the Geneva .docx template and fill every field that has a
    corresponding key in ``data``.  Returns the filled document as bytes.
    """
    doc = Document(template_path)
    all_ff = doc.element.findall(".//w:ffData", NS)
    tables = doc.element.findall(".//w:tbl", NS)

    # 1. Fill header form fields
    for field in ALL_FORM_FIELDS:
        value = data.get(field.id)
        if not value:
            continue
        _set_form_field_text(all_ff[field.ff_index], str(value))

    # 2. Fill answer table cells
    for tc in ALL_TABLE_CELLS:
        value = data.get(tc.id)
        if not value:
            continue
        _add_text_to_cell(tables[tc.table_index], tc.row, tc.col, str(value))

    buf = io.BytesIO()
    doc.save(buf)
    return buf.getvalue()


def _set_form_field_text(ff: etree._Element, value: str) -> None:
    """Replace text between fldChar separate and end."""
    p = ff.getparent().getparent().getparent()
    state = False
    for elem in p:
        if elem.tag == f"{W}r":
            fc = elem.find(f"{W}fldChar", NS)
            if fc is not None:
                ft = fc.get(f"{W}fldCharType")
                if ft == "begin" and fc.find(f"{W}ffData", NS) is ff:
                    state = True
                elif ft == "separate" and state:
                    state = "sep"
                elif ft == "end" and state == "sep":
                    break
            elif state == "sep":
                t = elem.find(f"{W}t", NS)
                if t is not None:
                    t.text = value
                    t.set("{http://www.w3.org/XML/1998/namespace}space", "preserve")
                    return


def _add_text_to_cell(
    table: etree._Element,
    row: int,
    col: int,
    text: str,
    size_pt: int = 9,
) -> None:
    """Insert a text run into an empty table cell."""
    rows = table.findall("w:tr", NS)
    if row >= len(rows):
        return
    cells = rows[row].findall("w:tc", NS)
    if col >= len(cells):
        return

    cell = cells[col]
    p = cell.find("w:p", NS)
    if p is None:
        return

    r = etree.SubElement(p, f"{W}r")
    rPr = etree.SubElement(r, f"{W}rPr")
    sz = etree.SubElement(rPr, f"{W}sz")
    sz.set(f"{W}val", str(size_pt * 2))
    szCs = etree.SubElement(rPr, f"{W}szCs")
    szCs.set(f"{W}val", str(size_pt * 2))
    t = etree.SubElement(r, f"{W}t")
    t.text = text
    t.set("{http://www.w3.org/XML/1998/namespace}space", "preserve")
