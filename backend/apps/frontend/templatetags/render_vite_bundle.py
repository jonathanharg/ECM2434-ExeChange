# This file is largely based off the gist "Using Vite with Django, the simple way"
# https://gist.github.com/lucianoratamero/7fc9737d24229ea9219f0987272896a2

# Credit for this file, base.html and some various settings goes to
# Luciano Ratamero (https://gist.github.com/lucianoratamero) for his original work and further credit goes to
# Fábio C. Barrionuevo da Luz (https://gist.github.com/luzfcb), Sina K (https://gist.github.com/incognos),
# Pedro Viana (https://gist.github.com/pedrovgp) and Alex Sousa (https://gist.github.com/alxroots) for their
# suggestions, edits and amendments.

# This template tag is needed for production
# Add it to one of your django apps (/appdir/templatetags/render_vite_bundle.py, for example)
# pylint: disable=locally-disabled, raise-missing-from, broad-exception-raised
import json

from django import template
from django.conf import settings
from django.utils.safestring import mark_safe

register = template.Library()


@register.simple_tag
def render_vite_bundle():
    """
    Template tag to render a vite bundle.
    Supposed to only be used in production.
    For development, see other files.
    """

    try:
        with open(
            f"{settings.VITE_APP_DIR}/dist/manifest.json", "r", encoding="utf-8"
        ) as fd:
            manifest = json.load(fd)
    except:
        raise Exception(
            f"Vite manifest file not found or invalid. Maybe your {settings.VITE_APP_DIR}/dist/manifest.json file is empty?"
        )

    imports_files = "".join(
        [
            f'<script type="module" src="/static/{manifest[file]["file"]}"></script>'
            for file in manifest["index.html"]["imports"]
        ]
    )

    return mark_safe(
        f"""<script type="module" src="/static/{manifest['index.html']['file']}"></script>
        <link rel="stylesheet" type="text/css" href="/static/{manifest['index.html']['css'][0]}" />
        {imports_files}"""
    )
