function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderBlock(block) {
  switch (block.type) {
    case "text":
      return `<div class="block block-text">${block.content.html ?? ""}</div>`;
    case "heading": {
      const level = block.content.level ?? 2;
      return `<h${level} class="block block-heading">${escapeHtml(block.content.text ?? "")}</h${level}>`;
    }
    case "bulleted-list":
      return `<ul class="block block-list">${(block.content.items ?? [])
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul>`;
    case "numbered-list":
      return `<ol class="block block-list">${(block.content.items ?? [])
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ol>`;
    case "callout":
      return `<div class="block block-callout callout-${block.content.tone ?? "info"}" role="note">${escapeHtml(block.content.text ?? "")}</div>`;
    case "image":
      return `<figure class="block block-image">
        <img src="${escapeHtml(block.content.url ?? "")}" alt="${escapeHtml(block.content.alt ?? "")}" loading="lazy" />
        ${block.content.caption ? `<figcaption>${escapeHtml(block.content.caption)}</figcaption>` : ""}
      </figure>`;
    case "video":
      return `<figure class="block block-video">
        <video controls src="${escapeHtml(block.content.url ?? "")}"></video>
        ${block.content.caption ? `<figcaption>${escapeHtml(block.content.caption)}</figcaption>` : ""}
      </figure>`;
    case "audio":
      return `<figure class="block block-audio">
        <audio controls src="${escapeHtml(block.content.url ?? "")}"></audio>
        ${block.content.caption ? `<figcaption>${escapeHtml(block.content.caption)}</figcaption>` : ""}
      </figure>`;
    case "embed":
      return `<figure class="block block-embed">
        <iframe src="${escapeHtml(block.content.url ?? "")}" loading="lazy" allowfullscreen title="Embedded content"></iframe>
        ${block.content.caption ? `<figcaption>${escapeHtml(block.content.caption)}</figcaption>` : ""}
      </figure>`;
    case "file":
      return `<a class="block block-file" href="${escapeHtml(block.content.url ?? "")}" download>
        ⬇ ${escapeHtml(block.content.label ?? "Download attachment")}
      </a>`;
    case "table": {
      const headers = (block.content.headers ?? []).map((h) => `<th scope="col">${escapeHtml(h)}</th>`).join("");
      const rows = (block.content.rows ?? [])
        .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
        .join("");
      return `<table class="block block-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    }
    case "button":
      return `<a class="block block-button" href="${escapeHtml(block.content.url ?? "#")}">${escapeHtml(block.content.label ?? "Continue")}</a>`;
    case "quote":
      return `<blockquote class="block block-quote">
        <p>${escapeHtml(block.content.text ?? "")}</p>
        ${block.content.author ? `<cite>${escapeHtml(block.content.author)}</cite>` : ""}
      </blockquote>`;
    case "divider":
      return `<hr class="block block-divider" />`;
    case "code":
      return `<pre class="block block-code"><code>${escapeHtml(block.content.code ?? "")}</code></pre>`;

    case "gallery": {
      const slides = (block.content.images ?? [])
        .map(
          (img, i) => `<div class="gallery-slide" data-index="${i}" ${i === 0 ? "" : "hidden"}>
            <img src="${escapeHtml(img.url ?? "")}" alt="${escapeHtml(img.caption ?? "")}" loading="lazy" />
            ${img.caption ? `<p class="gallery-caption">${escapeHtml(img.caption)}</p>` : ""}
          </div>`
        )
        .join("");
      return `<div class="block block-gallery" data-count="${(block.content.images ?? []).length}">
        <div class="gallery-viewport">${slides}</div>
        <div class="gallery-controls">
          <button type="button" class="gallery-prev" aria-label="Previous image">‹</button>
          <span class="gallery-status" aria-live="polite">1 / ${(block.content.images ?? []).length}</span>
          <button type="button" class="gallery-next" aria-label="Next image">›</button>
        </div>
      </div>`;
    }

    case "flashcards": {
      const cards = (block.content.cards ?? [])
        .map(
          (c) => `<button type="button" class="flashcard">
            <span class="flashcard-inner">
              <span class="flashcard-face flashcard-front">${escapeHtml(c.front)}</span>
              <span class="flashcard-face flashcard-back">${escapeHtml(c.back)}</span>
            </span>
          </button>`
        )
        .join("");
      return `<div class="block block-flashcards">${cards}</div>`;
    }

    case "accordion": {
      const items = (block.content.items ?? [])
        .map(
          (item) => `<details class="accordion-item">
            <summary>${escapeHtml(item.title)}</summary>
            <div class="accordion-body">${escapeHtml(item.body)}</div>
          </details>`
        )
        .join("");
      return `<div class="block block-accordion">${items}</div>`;
    }

    case "tabs": {
      const items = block.content.items ?? [];
      const tabId = `tabs-${Math.random().toString(36).slice(2, 8)}`;
      const tabButtons = items
        .map(
          (item, i) =>
            `<button type="button" class="tab-button${i === 0 ? " active" : ""}" data-tab="${tabId}-${i}" role="tab" aria-selected="${i === 0}">${escapeHtml(item.title)}</button>`
        )
        .join("");
      const panels = items
        .map(
          (item, i) =>
            `<div class="tab-panel${i === 0 ? " active" : ""}" id="${tabId}-${i}" role="tabpanel">${escapeHtml(item.body)}</div>`
        )
        .join("");
      return `<div class="block block-tabs">
        <div class="tab-list" role="tablist">${tabButtons}</div>
        <div class="tab-panels">${panels}</div>
      </div>`;
    }

    case "process": {
      const steps = (block.content.steps ?? [])
        .map(
          (step, i) => `<div class="process-step">
            <div class="process-marker">${i + 1}</div>
            <div class="process-content">
              <h4>${escapeHtml(step.title)}</h4>
              <p>${escapeHtml(step.body)}</p>
            </div>
          </div>`
        )
        .join("");
      return `<div class="block block-process">${steps}</div>`;
    }

    case "labeled-graphic": {
      const markers = (block.content.markers ?? [])
        .map(
          (m, i) => `<button type="button" class="hotspot-marker" style="left:${m.x}%;top:${m.y}%" data-target="hotspot-${block.id}-${i}" aria-label="${escapeHtml(m.label)}">+</button>
          <div class="hotspot-popover" id="hotspot-${block.id}-${i}" hidden>
            <strong>${escapeHtml(m.label)}</strong>
            <p>${escapeHtml(m.body)}</p>
          </div>`
        )
        .join("");
      return `<div class="block block-labeled-graphic">
        <img src="${escapeHtml(block.content.imageUrl ?? "")}" alt="" />
        ${markers}
      </div>`;
    }

    case "quiz": {
      const options = (block.content.options ?? [])
        .map(
          (opt, i) =>
            `<label class="quiz-option"><input type="radio" name="quiz-${block.id}" value="${i}" /> ${escapeHtml(opt)}</label>`
        )
        .join("");
      return `<div class="block block-quiz" data-correct="${block.content.correctIndex ?? 0}">
        <p class="quiz-question">${escapeHtml(block.content.question ?? "")}</p>
        <div class="quiz-options">${options}</div>
        <button class="quiz-submit" type="button">Check Answer</button>
        <p class="quiz-feedback" hidden aria-live="polite"></p>
      </div>`;
    }
    case "multi-select": {
      const options = (block.content.options ?? [])
        .map(
          (opt, i) =>
            `<label class="quiz-option"><input type="checkbox" name="quiz-${block.id}" value="${i}" /> ${escapeHtml(opt)}</label>`
        )
        .join("");
      return `<div class="block block-quiz" data-correct="${(block.content.correctIndexes ?? []).join(",")}">
        <p class="quiz-question">${escapeHtml(block.content.question ?? "")}</p>
        <div class="quiz-options">${options}</div>
        <button class="quiz-submit multi-select-submit" type="button">Check Answer</button>
        <p class="quiz-feedback" hidden aria-live="polite"></p>
      </div>`;
    }
    case "true-false": {
      return `<div class="block block-quiz" data-correct="${block.content.answer ? "true" : "false"}">
        <p class="quiz-question">${escapeHtml(block.content.statement ?? "")}</p>
        <div class="quiz-options">
          <label class="quiz-option"><input type="radio" name="quiz-${block.id}" value="true" /> True</label>
          <label class="quiz-option"><input type="radio" name="quiz-${block.id}" value="false" /> False</label>
        </div>
        <button class="quiz-submit true-false-submit" type="button">Check Answer</button>
        <p class="quiz-feedback" hidden aria-live="polite"></p>
      </div>`;
    }

    case "matching": {
      const pairs = block.content.pairs ?? [];
      const shuffledRight = pairs.map((p) => p.right);
      const rows = pairs
        .map((pair, i) => {
          const options = shuffledRight
            .map((r) => `<option value="${escapeHtml(r)}">${escapeHtml(r)}</option>`)
            .join("");
          return `<div class="matching-row" data-answer="${escapeHtml(pair.right)}">
            <span class="matching-left">${escapeHtml(pair.left)}</span>
            <select class="matching-select" aria-label="Match for ${escapeHtml(pair.left)}">
              <option value="">Choose a match…</option>
              ${options}
            </select>
          </div>`;
        })
        .join("");
      return `<div class="block block-matching">
        ${rows}
        <button class="quiz-submit matching-submit" type="button">Check Answers</button>
        <p class="quiz-feedback" hidden aria-live="polite"></p>
      </div>`;
    }

    case "fill-in-blank": {
      const parts = (block.content.template ?? "").split("___");
      const templateHtml = parts
        .map((part, i) => escapeHtml(part) + (i < parts.length - 1 ? `<input type="text" class="blank-input" aria-label="Fill in the blank" />` : ""))
        .join("");
      return `<div class="block block-fill-blank" data-answer="${escapeHtml(block.content.answer ?? "")}">
        <p class="fill-blank-template">${templateHtml}</p>
        <button class="quiz-submit fill-blank-submit" type="button">Check Answer</button>
        <p class="quiz-feedback" hidden aria-live="polite"></p>
      </div>`;
    }

    case "categorize": {
      const categories = block.content.categories ?? [];
      const items = block.content.items ?? [];
      const itemRows = items
        .map((item, i) => {
          const options = categories
            .map((cat, ci) => `<option value="${ci}">${escapeHtml(cat)}</option>`)
            .join("");
          return `<div class="categorize-row" data-answer="${item.category}">
            <span class="categorize-label">${escapeHtml(item.label)}</span>
            <select class="categorize-select" aria-label="Category for ${escapeHtml(item.label)}">
              <option value="">Choose a category…</option>
              ${options}
            </select>
          </div>`;
        })
        .join("");
      return `<div class="block block-categorize">
        ${itemRows}
        <button class="quiz-submit categorize-submit" type="button">Check Answers</button>
        <p class="quiz-feedback" hidden aria-live="polite"></p>
      </div>`;
    }

    default:
      return "";
  }
}

function renderLesson(lesson, moduleIndex, lessonIndex) {
  const blocks = (lesson.blocks ?? []).map(renderBlock).join("\n");
  return `<section class="lesson" id="lesson-${moduleIndex}-${lessonIndex}" data-lesson-id="${lesson.id}" tabindex="-1">
    <p class="lesson-eyebrow">Lesson</p>
    <h2>${escapeHtml(lesson.title)}</h2>
    ${blocks}
  </section>`;
}

export function buildCourseHtml(course) {
  const allLessons = course.modules.flatMap((mod, mi) =>
    mod.lessons.map((lesson, li) => ({ ...lesson, mi, li }))
  );

  const nav = course.modules
    .map(
      (mod, mi) => `<li class="nav-module">
        <span class="nav-module-title">${escapeHtml(mod.title)}</span>
        <ul>
          ${mod.lessons
            .map(
              (lesson, li) =>
                `<li><a href="#lesson-${mi}-${li}" data-lesson-id="${lesson.id}">
                  <span class="nav-check" aria-hidden="true"></span>${escapeHtml(lesson.title)}
                </a></li>`
            )
            .join("")}
        </ul>
      </li>`
    )
    .join("");

  const lessons = course.modules
    .map((mod, mi) => mod.lessons.map((lesson, li) => renderLesson(lesson, mi, li)).join("\n"))
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(course.title)}</title>
<style>
  :root {
    --navy: #1A2B4A; --sky: #5AB3C6; --sand: #D4A574;
    --success: #16a34a; --error: #dc2626;
  }
  * { box-sizing: border-box; }
  :focus-visible { outline: 3px solid var(--sky); outline-offset: 2px; }
  body {
    margin: 0; font-family: Inter, system-ui, -apple-system, sans-serif;
    color: #1f2937; background: #F7F8FA; font-size: 17px; line-height: 1.7;
  }
  button, a, input, select { font-family: inherit; font-size: 16px; }
  .progress-bar { position: fixed; top: 0; left: 0; right: 0; height: 5px; background: #e5e7eb; z-index: 100; }
  .progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--navy), var(--sky)); width: 0%; transition: width .4s ease; }
  .layout { display: flex; min-height: 100vh; padding-top: 5px; }
  .sidebar { width: 300px; background: var(--navy); color: #fff; padding: 28px 20px; overflow-y: auto; flex-shrink: 0; }
  .sidebar h1 { font-size: 19px; margin: 0 0 28px; line-height: 1.4; }
  .sidebar ul { list-style: none; padding-left: 0; margin: 0 0 20px; }
  .sidebar ul ul { padding-left: 8px; margin-top: 8px; }
  .sidebar a {
    color: rgba(255,255,255,.75); text-decoration: none; font-size: 15px;
    display: flex; align-items: center; gap: 10px; padding: 10px 8px; border-radius: 10px; min-height: 44px;
  }
  .sidebar a:hover, .sidebar a:focus-visible { color: #fff; background: rgba(255,255,255,.08); }
  .sidebar a.current { background: rgba(255,255,255,.12); color: #fff; font-weight: 600; }
  .nav-check { width: 18px; height: 18px; border-radius: 50%; border: 2px solid rgba(255,255,255,.3); flex-shrink: 0; display: inline-block; }
  .sidebar a.done .nav-check { background: var(--sky); border-color: var(--sky); }
  .nav-module-title { font-size: 12px; text-transform: uppercase; letter-spacing: .1em; color: var(--sky); font-weight: 600; }
  .content { flex: 1; padding: 64px 32px 140px; max-width: 880px; margin: 0 auto; width: 100%; }
  .lesson { background: #fff; border-radius: 24px; padding: 48px 56px; margin-bottom: 32px; box-shadow: 0 1px 3px rgba(0,0,0,.06); scroll-margin-top: 24px; }
  .lesson-eyebrow { text-transform: uppercase; letter-spacing: .15em; font-size: 12px; color: var(--sky); font-weight: 700; margin: 0 0 8px; }
  .lesson h2 { margin-top: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.01em; }
  .block { margin: 28px 0; }
  .block-image img, .block-video video, .block-audio audio, .block-embed iframe { max-width: 100%; border-radius: 16px; }
  .block-embed iframe { width: 100%; height: 420px; border: none; }
  .block-quote { border-left: 5px solid var(--sky); padding-left: 20px; color: #4b5563; font-style: italic; font-size: 19px; }
  .block-divider { border: none; border-top: 1px solid #e5e7eb; margin: 36px 0; }
  .block-callout { padding: 18px 20px; border-radius: 14px; border-left: 5px solid; font-size: 16px; }
  .callout-info { background: #2563eb0d; border-color: #2563eb; }
  .callout-warning { background: #d977060d; border-color: #d97706; }
  .callout-success { background: #16a34a0d; border-color: #16a34a; }
  .callout-error { background: #dc26260d; border-color: #dc2626; }
  .block-file { display: inline-flex; align-items: center; gap: 8px; padding: 14px 22px; min-height: 48px; border-radius: 14px; background: var(--navy); color: #fff; text-decoration: none; font-weight: 600; }
  .block-table { width: 100%; border-collapse: collapse; }
  .block-table th, .block-table td { border: 1px solid #e5e7eb; padding: 12px 16px; text-align: left; font-size: 15px; }
  .block-table th { background: #F7F8FA; }
  .block-button { display: inline-flex; padding: 14px 32px; min-height: 48px; align-items: center; border-radius: 999px; background: var(--sky); color: #fff; text-decoration: none; font-weight: 700; }
  .block-code { background: #1f2937; color: #e5e7eb; padding: 20px; border-radius: 14px; overflow-x: auto; font-family: "JetBrains Mono", monospace; font-size: 14px; }

  /* Quiz / assessment shared */
  .quiz-question, .fill-blank-template { font-weight: 700; font-size: 18px; margin-bottom: 16px; }
  .quiz-option { display: flex; align-items: center; gap: 10px; min-height: 48px; padding: 10px 14px; border-radius: 12px; margin: 6px 0; cursor: pointer; border: 1px solid #e5e7eb; }
  .quiz-option:hover { border-color: var(--sky); }
  .quiz-option input { width: 18px; height: 18px; }
  .quiz-submit, .gallery-prev, .gallery-next { margin-top: 16px; background: var(--navy); color: #fff; border: none; padding: 12px 24px; min-height: 48px; border-radius: 12px; cursor: pointer; font-weight: 600; }
  .quiz-submit:hover { background: #23385C; }
  .quiz-feedback { margin-top: 12px; font-weight: 600; }
  .quiz-feedback.correct { color: var(--success); }
  .quiz-feedback.incorrect { color: var(--error); }

  /* Flashcards */
  .block-flashcards { display: flex; flex-wrap: wrap; gap: 16px; }
  .flashcard { perspective: 1000px; width: 220px; height: 140px; background: none; border: none; padding: 0; cursor: pointer; }
  .flashcard-inner { position: relative; width: 100%; height: 100%; transition: transform .5s; transform-style: preserve-3d; }
  .flashcard.flipped .flashcard-inner { transform: rotateY(180deg); }
  .flashcard-face { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; text-align: center; padding: 16px; border-radius: 16px; backface-visibility: hidden; font-weight: 600; }
  .flashcard-front { background: var(--navy); color: #fff; }
  .flashcard-back { background: var(--sky); color: #fff; transform: rotateY(180deg); }

  /* Accordion */
  .accordion-item { border: 1px solid #e5e7eb; border-radius: 14px; margin-bottom: 10px; padding: 4px 20px; }
  .accordion-item summary { font-weight: 700; cursor: pointer; padding: 14px 0; min-height: 44px; display: flex; align-items: center; }
  .accordion-body { padding: 0 0 16px; color: #4b5563; }

  /* Tabs */
  .tab-list { display: flex; gap: 8px; border-bottom: 2px solid #e5e7eb; margin-bottom: 20px; flex-wrap: wrap; }
  .tab-button { background: none; border: none; padding: 12px 18px; min-height: 44px; font-weight: 600; color: #6b7280; cursor: pointer; border-bottom: 3px solid transparent; }
  .tab-button.active { color: var(--navy); border-color: var(--sky); }
  .tab-panel { display: none; color: #374151; }
  .tab-panel.active { display: block; }

  /* Process */
  .block-process { display: flex; flex-direction: column; gap: 4px; }
  .process-step { display: flex; gap: 18px; position: relative; padding-bottom: 28px; }
  .process-step:not(:last-child)::before { content: ""; position: absolute; left: 19px; top: 40px; bottom: 0; width: 2px; background: #e5e7eb; }
  .process-marker { width: 40px; height: 40px; border-radius: 50%; background: var(--navy); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
  .process-content h4 { margin: 6px 0 4px; font-size: 17px; }
  .process-content p { margin: 0; color: #6b7280; }

  /* Labeled graphic */
  .block-labeled-graphic { position: relative; display: inline-block; max-width: 100%; }
  .block-labeled-graphic img { max-width: 100%; border-radius: 16px; display: block; }
  .hotspot-marker {
    position: absolute; width: 32px; height: 32px; border-radius: 50%; background: var(--sky); color: #fff;
    border: 3px solid #fff; font-weight: 700; cursor: pointer; transform: translate(-50%, -50%); box-shadow: 0 2px 8px rgba(0,0,0,.25);
  }
  .hotspot-popover { position: relative; margin-top: 12px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px 18px; }

  /* Gallery */
  .gallery-viewport img { width: 100%; max-height: 420px; object-fit: cover; border-radius: 16px; }
  .gallery-caption { color: #6b7280; margin-top: 8px; }
  .gallery-controls { display: flex; align-items: center; gap: 16px; margin-top: 12px; }

  /* Matching / categorize / fill-in-blank */
  .matching-row, .categorize-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
  .matching-select, .categorize-select { min-height: 44px; border-radius: 10px; border: 1px solid #e5e7eb; padding: 8px 12px; min-width: 200px; }
  .blank-input { min-height: 40px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 6px 10px; margin: 0 4px; min-width: 140px; }

  /* Sticky continue button */
  .continue-bar { position: fixed; bottom: 24px; right: 24px; z-index: 90; }
  .continue-button {
    background: var(--navy); color: #fff; border: none; padding: 16px 32px; min-height: 52px;
    border-radius: 999px; font-weight: 700; font-size: 16px; cursor: pointer; box-shadow: 0 8px 24px rgba(0,0,0,.2);
    display: inline-flex; align-items: center; gap: 8px;
  }
  .continue-button:hover { background: #23385C; }

  .toggle-nav { display: none; }
  @media (max-width: 860px) {
    .layout { flex-direction: column; }
    .sidebar { width: 100%; }
    .content { padding: 40px 16px 140px; }
    .lesson { padding: 28px 24px; }
  }
</style>
</head>
<body>
<div class="progress-bar"><div class="progress-bar-fill" id="progress-fill"></div></div>
<div class="layout">
  <nav class="sidebar" aria-label="Course outline">
    <h1>${escapeHtml(course.title)}</h1>
    <ul>${nav}</ul>
  </nav>
  <main class="content">
    ${lessons}
  </main>
</div>
<div class="continue-bar">
  <button type="button" class="continue-button" id="continue-btn">Continue →</button>
</div>
<script>
  (function () {
    var STORAGE_KEY = "instracta_progress_${course.id}";
    var progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    var start = Date.now();
    var lessonIds = ${JSON.stringify(allLessons.map((l) => l.id))};
    var lessonSections = lessonIds.map(function (id) {
      return document.querySelector('[data-lesson-id="' + id + '"].lesson');
    });
    var navLinks = lessonIds.map(function (id) {
      return document.querySelector('.sidebar a[data-lesson-id="' + id + '"]');
    });

    function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }

    function markDone(id) {
      progress[id] = progress[id] || {};
      progress[id].completed = true;
      save();
      updateUI();
    }

    function updateUI() {
      var doneCount = 0;
      navLinks.forEach(function (link, i) {
        if (!link) return;
        var done = progress[lessonIds[i]] && progress[lessonIds[i]].completed;
        link.classList.toggle("done", !!done);
        if (done) doneCount++;
      });
      var pct = lessonIds.length ? Math.round((doneCount / lessonIds.length) * 100) : 0;
      document.getElementById("progress-fill").style.width = pct + "%";
    }

    function currentIndex() {
      var mid = window.scrollY + window.innerHeight / 3;
      var best = 0;
      lessonSections.forEach(function (el, i) {
        if (el && el.offsetTop <= mid) best = i;
      });
      return best;
    }

    navLinks.forEach(function (link) {
      if (!link) return;
      link.addEventListener("click", function () {
        navLinks.forEach(function (l) { l && l.classList.remove("current"); });
        link.classList.add("current");
      });
    });

    document.getElementById("continue-btn").addEventListener("click", function () {
      var i = currentIndex();
      markDone(lessonIds[i]);
      var next = lessonSections[i + 1];
      if (next) {
        next.scrollIntoView({ behavior: "smooth" });
        next.focus({ preventScroll: true });
      }
    });

    updateUI();

    // Quiz-style answer checking (single/multi choice, true/false)
    document.querySelectorAll(".quiz-submit").forEach(function (button) {
      if (button.classList.contains("matching-submit") || button.classList.contains("categorize-submit") || button.classList.contains("fill-blank-submit")) return;
      button.addEventListener("click", function () {
        var block = button.closest(".block-quiz");
        var feedback = block.querySelector(".quiz-feedback");
        feedback.hidden = false;
        var correct;
        if (button.classList.contains("multi-select-submit")) {
          var checked = [].slice.call(block.querySelectorAll("input:checked")).map(function (el) { return Number(el.value); }).sort();
          var expected = block.dataset.correct.split(",").filter(Boolean).map(Number).sort();
          correct = checked.length === expected.length && checked.every(function (v, i) { return v === expected[i]; });
        } else {
          var selected = block.querySelector("input:checked");
          if (!selected) {
            feedback.textContent = "Please select an answer.";
            feedback.className = "quiz-feedback";
            return;
          }
          correct = button.classList.contains("true-false-submit")
            ? selected.value === block.dataset.correct
            : Number(selected.value) === Number(block.dataset.correct);
        }
        feedback.textContent = correct ? "Correct!" : "Not quite, try again.";
        feedback.className = "quiz-feedback " + (correct ? "correct" : "incorrect");
      });
    });

    // Fill in the blank
    document.querySelectorAll(".fill-blank-submit").forEach(function (button) {
      button.addEventListener("click", function () {
        var block = button.closest(".block-fill-blank");
        var input = block.querySelector(".blank-input");
        var feedback = block.querySelector(".quiz-feedback");
        feedback.hidden = false;
        var correct = (input.value || "").trim().toLowerCase() === (block.dataset.answer || "").trim().toLowerCase();
        feedback.textContent = correct ? "Correct!" : "Not quite, try again.";
        feedback.className = "quiz-feedback " + (correct ? "correct" : "incorrect");
      });
    });

    // Matching
    document.querySelectorAll(".matching-submit").forEach(function (button) {
      button.addEventListener("click", function () {
        var block = button.closest(".block-matching");
        var feedback = block.querySelector(".quiz-feedback");
        feedback.hidden = false;
        var rows = [].slice.call(block.querySelectorAll(".matching-row"));
        var allCorrect = rows.every(function (row) {
          var select = row.querySelector(".matching-select");
          return select.value === row.dataset.answer;
        });
        feedback.textContent = allCorrect ? "All matched correctly!" : "Some matches are incorrect, try again.";
        feedback.className = "quiz-feedback " + (allCorrect ? "correct" : "incorrect");
      });
    });

    // Categorize
    document.querySelectorAll(".categorize-submit").forEach(function (button) {
      button.addEventListener("click", function () {
        var block = button.closest(".block-categorize");
        var feedback = block.querySelector(".quiz-feedback");
        feedback.hidden = false;
        var rows = [].slice.call(block.querySelectorAll(".categorize-row"));
        var allCorrect = rows.every(function (row) {
          var select = row.querySelector(".categorize-select");
          return select.value === row.dataset.answer;
        });
        feedback.textContent = allCorrect ? "All categorized correctly!" : "Some categories are incorrect, try again.";
        feedback.className = "quiz-feedback " + (allCorrect ? "correct" : "incorrect");
      });
    });

    // Flashcards
    document.querySelectorAll(".flashcard").forEach(function (card) {
      card.addEventListener("click", function () { card.classList.toggle("flipped"); });
    });

    // Tabs
    document.querySelectorAll(".block-tabs").forEach(function (block) {
      var buttons = [].slice.call(block.querySelectorAll(".tab-button"));
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
          block.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });
          btn.classList.add("active");
          btn.setAttribute("aria-selected", "true");
          document.getElementById(btn.dataset.tab).classList.add("active");
        });
      });
    });

    // Labeled graphic hotspots
    document.querySelectorAll(".hotspot-marker").forEach(function (marker) {
      marker.addEventListener("click", function () {
        var popover = document.getElementById(marker.dataset.target);
        var wasHidden = popover.hidden;
        document.querySelectorAll(".hotspot-popover").forEach(function (p) { p.hidden = true; });
        popover.hidden = !wasHidden;
      });
    });

    // Gallery
    document.querySelectorAll(".block-gallery").forEach(function (block) {
      var count = Number(block.dataset.count) || 0;
      var index = 0;
      var slides = [].slice.call(block.querySelectorAll(".gallery-slide"));
      var status = block.querySelector(".gallery-status");
      function show(i) {
        slides.forEach(function (s, si) { s.hidden = si !== i; });
        status.textContent = (i + 1) + " / " + count;
      }
      block.querySelector(".gallery-prev").addEventListener("click", function () {
        index = (index - 1 + count) % count;
        show(index);
      });
      block.querySelector(".gallery-next").addEventListener("click", function () {
        index = (index + 1) % count;
        show(index);
      });
    });

    window.addEventListener("beforeunload", function () {
      progress.__totalSeconds = (progress.__totalSeconds || 0) + (Date.now() - start) / 1000;
      save();
    });
  })();
</script>
</body>
</html>`;
}

export function downloadCourseHtml(course) {
  const html = buildCourseHtml(course);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${course.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
