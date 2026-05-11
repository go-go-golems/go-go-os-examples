#!/usr/bin/env python3
import json
import os
import shutil
import sys
from pathlib import Path

APP_PORT = 5173
STORYBOOK_PORT = 6006


def emit(obj):
    sys.stdout.write(json.dumps(obj) + "\n")
    sys.stdout.flush()


def response(request_id, ok=True, output=None, error=None):
    frame = {"type": "response", "request_id": request_id, "ok": ok}
    if ok:
        frame["output"] = output or {}
    else:
        frame["error"] = error or {"code": "E_PLUGIN", "message": "unknown plugin error"}
    emit(frame)


def repo_path(ctx, *parts):
    root = Path(ctx.get("repo_root") or os.getcwd())
    return root.joinpath(*parts)


def handle_config_mutate(request_id):
    response(
        request_id,
        output={
            "config_patch": {
                "set": {
                    "services.app.port": APP_PORT,
                    "services.app.url": f"http://127.0.0.1:{APP_PORT}",
                    "services.storybook.port": STORYBOOK_PORT,
                    "services.storybook.url": f"http://127.0.0.1:{STORYBOOK_PORT}",
                    "env.BROWSER": "none",
                },
                "unset": [],
            }
        },
    )


def handle_validate(request_id, ctx):
    errors = []
    warnings = []
    root = repo_path(ctx)

    for exe in ("node", "npm"):
        if not shutil.which(exe):
            errors.append({"code": "E_MISSING_EXECUTABLE", "message": f"{exe} not found in PATH"})

    if not repo_path(ctx, "package.json").exists():
        errors.append({"code": "E_MISSING_PACKAGE_JSON", "message": "package.json missing at repo root"})
    if not repo_path(ctx, "node_modules").exists():
        errors.append({
            "code": "E_MISSING_NODE_MODULES",
            "message": "node_modules missing; run npm install before devctl up",
        })
    if not repo_path(ctx, "src", "features", "ControlPanelApp", "ControlPanelApp.tsx").exists():
        errors.append({
            "code": "E_MISSING_APP_ENTRY",
            "message": "src/features/ControlPanelApp/ControlPanelApp.tsx missing",
        })
    if repo_path(ctx, ".envrc").exists():
        warnings.append({
            "code": "W_ENVRC_PRESENT",
            "message": ".envrc exists in repo root; ensure secrets are not committed",
        })
    if (root / "dist").exists():
        warnings.append({"code": "W_DIST_PRESENT", "message": "dist/ exists from a previous build and is ignored"})

    response(request_id, output={"valid": len(errors) == 0, "errors": errors, "warnings": warnings})


def handle_launch_plan(request_id):
    response(
        request_id,
        output={
            "services": [
                {
                    "name": "app",
                    "command": ["npm", "run", "dev", "--", "--host", "127.0.0.1", "--port", str(APP_PORT)],
                    "env": {"BROWSER": "none"},
                    "health": {
                        "type": "http",
                        "url": f"http://127.0.0.1:{APP_PORT}/",
                        "timeout_ms": 30000,
                    },
                },
                {
                    "name": "storybook",
                    "command": ["npm", "run", "storybook", "--", "--host", "127.0.0.1"],
                    "env": {"BROWSER": "none"},
                    "health": {
                        "type": "http",
                        "url": f"http://127.0.0.1:{STORYBOOK_PORT}/",
                        "timeout_ms": 60000,
                    },
                },
            ]
        },
    )


emit(
    {
        "type": "handshake",
        "protocol_version": "v2",
        "plugin_name": "os1-component-lab",
        "capabilities": {"ops": ["config.mutate", "validate.run", "launch.plan"]},
    }
)

for raw_line in sys.stdin:
    line = raw_line.strip()
    if not line:
        continue
    try:
        req = json.loads(line)
        request_id = req.get("request_id", "")
        op = req.get("op", "")
        ctx = req.get("ctx", {}) or {}

        if op == "config.mutate":
            handle_config_mutate(request_id)
        elif op == "validate.run":
            handle_validate(request_id, ctx)
        elif op == "launch.plan":
            handle_launch_plan(request_id)
        else:
            response(
                request_id,
                ok=False,
                error={"code": "E_UNSUPPORTED", "message": f"unsupported op: {op}"},
            )
    except Exception as exc:
        response(
            req.get("request_id", "") if "req" in locals() else "",
            ok=False,
            error={"code": "E_PLUGIN", "message": str(exc)},
        )
