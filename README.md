# Diagramming Tools Infographic

An educational static website for computer science students that compares Mermaid with other modern diagramming tools.

## Purpose

This project introduces students to two major diagramming approaches:

- **Diagram-as-code** tools (Mermaid, PlantUML, Graphviz, D2)
- **Visual drag-and-drop** tools (draw.io, Lucidchart, Visio, Miro/FigJam)

The site includes:

- A diagramming ecosystem infographic
- Tool-category and usage comparison sections
- An interactive Mermaid playground with live rendering
- Rendered example diagrams (flowchart, class diagram, sequence diagram)

## What Mermaid Is

[Mermaid](https://mermaid.js.org/) is a JavaScript-based diagramming syntax that lets you define diagrams in plain text. It is popular in developer documentation because it:

- Lives naturally in source repositories
- Works well with version control
- Renders directly in Markdown environments (including GitHub)

## Run Locally

Because the site loads Mermaid examples from the `examples/` directory, use a local web server (not `file://`).

### Option 1: Python

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

### Option 2: VS Code Live Server

Open the folder and run the Live Server extension.

## Deploy with GitHub Pages

1. Push this repository to GitHub as `diagramming-tools-infographic`.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **`main`** and folder **`/ (root)`**.
5. Save.

After Pages publishes, the site will be available at:

`https://<username>.github.io/diagramming-tools-infographic`

## Project Structure

```text
diagramming-tools-infographic/
├── index.html
├── style.css
├── script.js
├── infographic.png
├── examples/
│   ├── flowchart.mmd
│   ├── classdiagram.mmd
│   └── sequence.mmd
└── README.md
```
