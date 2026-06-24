import JSZip from "jszip";
import { buildCourseHtml } from "@/lib/exportHtml";

const SCORM_API_JS = `
// Minimal SCORM 1.2 API wrapper. Finds the LMS API in a parent/opener
// window and reports completion status.
(function () {
  function findAPI(win) {
    var attempts = 0;
    while (win && !win.API && win.parent && win.parent !== win && attempts < 10) {
      win = win.parent;
      attempts++;
    }
    return win ? win.API : null;
  }
  var api = findAPI(window) || (window.opener && findAPI(window.opener));
  window.SCORM = {
    initialized: false,
    init: function () {
      if (api && api.LMSInitialize) {
        this.initialized = api.LMSInitialize("");
      }
      return this.initialized;
    },
    setStatus: function (status) {
      if (api && api.LMSSetValue) {
        api.LMSSetValue("cmi.core.lesson_status", status);
        api.LMSCommit("");
      }
    },
    finish: function () {
      if (api && api.LMSFinish) api.LMSFinish("");
    },
  };
  window.SCORM.init();
  window.addEventListener("beforeunload", function () {
    window.SCORM.finish();
  });
})();
`;

function buildManifest(course) {
  const items = course.modules
    .flatMap((m) => m.lessons)
    .map(
      (lesson) =>
        `<item identifier="ITEM-${lesson.id}" identifierref="RES-1"><title>${lesson.title}</title></item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="INSTRACTA-${course.id}" version="1.2"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG-1">
    <organization identifier="ORG-1">
      <title>${course.title}</title>
      <item identifier="ITEM-ROOT" identifierref="RES-1">
        <title>${course.title}</title>
      </item>
      ${items}
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES-1" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html" />
      <file href="scorm_api.js" />
      <file href="analytics.html" />
    </resource>
  </resources>
</manifest>`;
}

function buildAnalyticsHtml(course) {
  return `<!doctype html>
<html><head><meta charset="utf-8" /><title>${course.title} — Analytics</title></head>
<body style="font-family: Inter, sans-serif; padding: 32px;">
  <h1>Analytics viewer</h1>
  <p>Open this file alongside the course to inspect locally stored progress
  (<code>localStorage['instracta_progress_${course.id}']</code>) once learners
  have completed lessons in this browser.</p>
  <pre id="out">Loading…</pre>
  <script>
    document.getElementById("out").textContent =
      localStorage.getItem("instracta_progress_${course.id}") || "No data yet.";
  </script>
</body></html>`;
}

export async function buildScormZip(course) {
  const zip = new JSZip();
  const courseHtml = buildCourseHtml(course).replace(
    "</body>",
    `<script src="scorm_api.js"></script>
     <script>document.addEventListener("DOMContentLoaded", function(){ window.SCORM && window.SCORM.setStatus("incomplete"); });</script>
     </body>`
  );

  zip.file("imsmanifest.xml", buildManifest(course));
  zip.file("index.html", courseHtml);
  zip.file("scorm_api.js", SCORM_API_JS);
  zip.file("analytics.html", buildAnalyticsHtml(course));

  return zip.generateAsync({ type: "blob" });
}

export async function downloadCourseScorm(course) {
  const blob = await buildScormZip(course);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${course.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-scorm.zip`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
