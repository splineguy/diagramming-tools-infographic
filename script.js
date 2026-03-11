const FALLBACK_EXAMPLES = {
  flowchart: `flowchart LR
    Idea[Course Idea] --> Plan[Draft Lesson]
    Plan --> Lab[Build Lab Exercise]
    Lab --> Review{Peer Review}
    Review -->|Approved| Publish[Publish Module]
    Review -->|Needs Work| Plan`,
  classdiagram: `classDiagram
    class DiagramEngine {
      +render(source)
      +validate(source)
    }
    class MermaidEngine
    class PlantUMLEngine
    DiagramEngine <|-- MermaidEngine
    DiagramEngine <|-- PlantUMLEngine`,
  sequence: `sequenceDiagram
    participant Student
    participant Editor
    participant Renderer
    Student->>Editor: Edit Mermaid text
    Editor->>Renderer: Render request
    Renderer-->>Student: Updated diagram preview`
};

const EXAMPLE_PATHS = {
  flowchart: "examples/flowchart.mmd",
  classdiagram: "examples/classdiagram.mmd",
  sequence: "examples/sequence.mmd"
};

let renderCounter = 0;

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  securityLevel: "loose"
});

async function renderMermaid(code, target) {
  const graphDefinition = code.trim();
  if (!graphDefinition) {
    target.innerHTML = '<p class="error">Please enter Mermaid syntax before rendering.</p>';
    return;
  }

  const uniqueId = `mermaid-${renderCounter++}`;

  try {
    const { svg, bindFunctions } = await mermaid.render(uniqueId, graphDefinition);
    target.innerHTML = svg;
    if (typeof bindFunctions === "function") {
      bindFunctions(target);
    }
  } catch (error) {
    target.innerHTML = `<p class="error">Render error: ${error.message}</p>`;
  }
}

async function loadExample(name) {
  try {
    const response = await fetch(EXAMPLE_PATHS[name]);
    if (!response.ok) {
      throw new Error(`Could not load ${EXAMPLE_PATHS[name]}`);
    }
    return await response.text();
  } catch {
    return FALLBACK_EXAMPLES[name];
  }
}

async function initExamples() {
  const mapping = [
    ["flowchart", document.getElementById("example-flowchart")],
    ["classdiagram", document.getElementById("example-classdiagram")],
    ["sequence", document.getElementById("example-sequence")]
  ];

  await Promise.all(
    mapping.map(async ([name, element]) => {
      const source = await loadExample(name);
      await renderMermaid(source, element);
    })
  );
}

function initPlayground() {
  const editor = document.getElementById("mermaidEditor");
  const renderBtn = document.getElementById("renderBtn");
  const output = document.getElementById("playgroundDiagram");

  renderBtn.addEventListener("click", async () => {
    await renderMermaid(editor.value, output);
  });

  editor.addEventListener("keydown", async (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      await renderMermaid(editor.value, output);
    }
  });

  renderMermaid(editor.value, output);
}

window.addEventListener("DOMContentLoaded", async () => {
  initPlayground();
  await initExamples();
});
