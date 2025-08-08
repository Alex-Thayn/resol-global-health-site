This pack adds Decap CMS and JSON content for your site.

Add files/folders to your repo:
- admin/
- assets/content.js
- content/*.json

Then patch your pages:
- Add a page class to <body> (page-projects, page-about, page-donate, page-contact)
- Import and call the hydrators at the end of each page:
    <script type="module">
      import { hydrateProjects } from "/assets/content.js"; hydrateProjects();
    </script>

Optional: replace your style.css with the cleaned version we discussed.