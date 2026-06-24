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
      return `<div class="block block-callout callout-${block.content.tone ?? "info"}">${escapeHtml(block.content.text ?? "")}</div>`;
    case "image":
      return `<figure class="block block-image">
        <img src="${escapeHtml(block.content.url ?? "")}" alt="${escapeHtml(block.content.alt ?? "")}" />
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
        <iframe src="${escapeHtml(block.content.url ?? "")}" loading="lazy" allowfullscreen></iframe>
        ${block.content.caption ? `<figcaption>${escapeHtml(block.content.caption)}</figcaption>` : ""}
      </figure>`;
    case "file":
      return `<a class="block block-file" href="${escapeHtml(block.content.url ?? "")}" download>
        ⬇ ${escapeHtml(block.content.label ?? "Download attachment")}
      </a>`;
    case "table": {
      const headers = (block.content.headers ?? []).map((h) => `<th>${escapeHtml(h)}</th>`).join("");
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
        <p class="quiz-feedback" hidden></p>
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
        <p class="quiz-feedback" hidden></p>
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
        <p class="quiz-feedback" hidden></p>
      </div>`;
    }
    case "code":
      return `<pre class="block block-code"><code>${escapeHtml(block.content.code ?? "")}</code></pre>`;
    default:
      return "";
  }
}

function renderLesson(lesson, moduleIndex, lessonIndex) {
  const blocks = (lesson.blocks ?? []).map(renderBlock).join("\n");
  return `<section class="lesson" id="lesson-${moduleIndex}-${lessonIndex}" data-lesson-id="${lesson.id}">
    <h2>${escapeHtml(lesson.title)}</h2>
    ${blocks}
  </section>`;
}

export function buildCourseHtml(course) {
  const nav = course.modules
    .map(
      (mod, mi) => `<li class="nav-module">
        <span class="nav-module-title">${escapeHtml(mod.title)}</span>
        <ul>
          ${mod.lessons
            .map(
              (lesson, li) =>
                `<li><a href="#lesson-${mi}-${li}">${escapeHtml(lesson.title)}</a></li>`
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
  :root { --navy: #1A2B4A; --sky: #5AB3C6; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Inter, system-ui, -apple-system, sans-serif; color: #1f2937; background: #F7F8FA; }
  .layout { display: flex; min-height: 100vh; }
  .sidebar { width: 280px; background: var(--navy); color: #fff; padding: 24px; overflow-y: auto; flex-shrink: 0; }
  .sidebar h1 { font-size: 18px; margin: 0 0 24px; }
  .sidebar ul { list-style: none; padding-left: 0; margin: 0 0 16px; }
  .sidebar ul ul { padding-left: 12px; margin-top: 6px; }
  .sidebar a { color: rgba(255,255,255,.7); text-decoration: none; font-size: 14px; display: block; padding: 4px 0; }
  .sidebar a:hover { color: #fff; }
  .nav-module-title { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--sky); }
  .content { flex: 1; padding: 48px; max-width: 760px; }
  .lesson { background: #fff; border-radius: 16px; padding: 32px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
  .lesson h2 { margin-top: 0; }
  .block { margin: 16px 0; }
  .block-image img, .block-video video, .block-audio audio, .block-embed iframe { max-width: 100%; border-radius: 12px; }
  .block-embed iframe { width: 100%; height: 400px; border: none; }
  .block-quote { border-left: 4px solid var(--sky); padding-left: 16px; color: #6b7280; font-style: italic; }
  .block-divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
  .block-callout { padding: 14px 16px; border-radius: 10px; border-left: 4px solid; }
  .callout-info { background: #2563eb0d; border-color: #2563eb; }
  .callout-warning { background: #d977060d; border-color: #d97706; }
  .callout-success { background: #16a34a0d; border-color: #16a34a; }
  .callout-error { background: #dc26260d; border-color: #dc2626; }
  .block-file { display: inline-flex; align-items: center; gap: 6px; padding: 10px 16px; border-radius: 10px; background: var(--navy); color: #fff; text-decoration: none; }
  .block-table { width: 100%; border-collapse: collapse; }
  .block-table th, .block-table td { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; font-size: 14px; }
  .block-table th { background: #F7F8FA; }
  .block-button { display: inline-flex; padding: 10px 24px; border-radius: 999px; background: var(--sky); color: #fff; text-decoration: none; font-weight: 600; }
  .block-code { background: #1f2937; color: #e5e7eb; padding: 16px; border-radius: 10px; overflow-x: auto; font-family: "JetBrains Mono", monospace; font-size: 13px; }
  .quiz-option { display: block; margin: 8px 0; cursor: pointer; }
  .quiz-submit { margin-top: 12px; background: var(--navy); color: #fff; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; }
  .quiz-feedback.correct { color: #16a34a; }
  .quiz-feedback.incorrect { color: #dc2626; }
  .toggle-nav { display: none; }
  @media (max-width: 768px) {
    .layout { flex-direction: column; }
    .sidebar { width: 100%; }
    .content { padding: 24px; }
  }
</style>
</head>
<body>
<div class="layout">
  <nav class="sidebar">
    <h1>${escapeHtml(course.title)}</h1>
    <ul>${nav}</ul>
  </nav>
  <main class="content">
    ${lessons}
  </main>
</div>
<script>
  // Per-lesson time tracking + completion, stored in localStorage so the
  // exported file works standalone on any static host.
  (function () {
    var STORAGE_KEY = "instracta_progress_${course.id}";
    var progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    var start = Date.now();

    document.querySelectorAll(".lesson").forEach(function (lesson) {
      var id = lesson.dataset.lessonId;
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            progress[id] = progress[id] || { seenAt: Date.now(), completed: false };
          }
        });
      }, { threshold: 0.5 });
      observer.observe(lesson);
    });

    document.querySelectorAll(".quiz-submit").forEach(function (button) {
      button.addEventListener("click", function () {
        var block = button.closest(".block-quiz");
        var feedback = block.querySelector(".quiz-feedback");
        feedback.hidden = false;

        var correct;
        if (button.classList.contains("multi-select-submit")) {
          var checked = [].slice.call(block.querySelectorAll("input:checked")).map(function (el) {
            return Number(el.value);
          }).sort();
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

    window.addEventListener("beforeunload", function () {
      progress.__totalSeconds = ((progress.__totalSeconds || 0) + (Date.now() - start) / 1000);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
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
