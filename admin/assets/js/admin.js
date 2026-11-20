/**
 * SANJEEV KUMAR MALIK — ADMIN WORKSPACE CLIENT SCRIPT
 * Live slug generator, markdown parser, word count, FAQ repeater, drag & drop image
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Auto-Slug Generation from Title
  const titleInput = document.getElementById('articleTitle');
  const slugInput = document.getElementById('articleSlug');
  let userEditedSlug = false;

  if (slugInput) {
    if (slugInput.value.trim() !== '') {
      userEditedSlug = true;
    }
    slugInput.addEventListener('input', () => {
      userEditedSlug = slugInput.value.trim().length > 0;
    });
  }

  if (titleInput && slugInput) {
    titleInput.addEventListener('input', () => {
      if (!userEditedSlug) {
        const titleVal = titleInput.value;
        const generated = titleVal
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
        slugInput.value = generated;
      }
      // Also sync SEO title if empty
      const seoTitleInput = document.getElementById('seoTitle');
      if (seoTitleInput && !seoTitleInput.dataset.manual) {
        seoTitleInput.value = titleInput.value ? titleInput.value + ' | Sanjeev Kumar Malik' : '';
      }
    });
  }

  const seoTitleInput = document.getElementById('seoTitle');
  if (seoTitleInput) {
    seoTitleInput.addEventListener('input', () => {
      seoTitleInput.dataset.manual = 'true';
    });
  }

  // 2. Featured Image Drag & Drop and Preview
  const dropzone = document.getElementById('imageDropzone');
  const fileInput = document.getElementById('featuredImage');
  const previewBox = document.getElementById('imagePreviewBox');
  const previewImg = document.getElementById('imagePreviewImg');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover'].forEach(ev => {
      dropzone.addEventListener(ev, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(ev => {
      dropzone.addEventListener(ev, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        handleImagePreview(fileInput.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleImagePreview(fileInput.files[0]);
      }
    });
  }

  function handleImagePreview(file) {
    if (!file || !previewImg || !previewBox) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewBox.style.display = 'block';
      const label = previewBox.querySelector('.image-preview-label');
      if (label) label.textContent = 'Selected: ' + file.name + ' (' + Math.round(file.size / 1024) + ' KB)';
    };
    reader.readAsDataURL(file);
  }

  // 3. Schema Markup Switcher (Automatic vs Custom JSON-LD)
  const schemaAutoRadio = document.getElementById('schemaAuto');
  const schemaCustomRadio = document.getElementById('schemaCustom');
  const schemaAutoCard = document.getElementById('schemaAutoCard');
  const schemaCustomCard = document.getElementById('schemaCustomCard');

  function updateSchemaView() {
    if (schemaCustomRadio && schemaCustomRadio.checked) {
      if (schemaAutoCard) schemaAutoCard.style.display = 'none';
      if (schemaCustomCard) schemaCustomCard.style.display = 'block';
    } else {
      if (schemaAutoCard) schemaAutoCard.style.display = 'block';
      if (schemaCustomCard) schemaCustomCard.style.display = 'none';
    }
  }

  if (schemaAutoRadio && schemaCustomRadio) {
    schemaAutoRadio.addEventListener('change', updateSchemaView);
    schemaCustomRadio.addEventListener('change', updateSchemaView);
    updateSchemaView();
  }

  // 4. Markdown Editor Workspace & Stats
  const editorTextarea = document.getElementById('articleBody');
  const previewPane = document.getElementById('editorPreviewPane');
  const contentArea = document.getElementById('editorContentArea');
  const wordCountSpan = document.getElementById('wordCountSpan');
  const charCountSpan = document.getElementById('charCountSpan');

  function simpleMarkdownParse(text) {
    if (!text) return '<p class="text-muted" style="color: #94A3B8; font-style: italic;">Live preview will appear here as you type...</p>';
    
    // Normalize newlines
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3 style="font-size: 1.3rem; font-weight: 800; color: #0F172A; margin: 1.25rem 0 0.5rem;">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 style="font-size: 1.6rem; font-weight: 800; color: #0F172A; margin: 1.5rem 0 0.75rem;">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h2 style="font-size: 1.8rem; font-weight: 800; color: #0F172A; margin: 1.75rem 0 0.85rem;">$1</h2>');

    // Bold & Italic
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/gim, '<pre style="background: #0F172A; color: #E2E8F0; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 1rem 0;"><code>$2</code></pre>');
    html = html.replace(/`([^`]+)`/gim, '<code style="background: #EFF6FF; color: #2563EB; padding: 0.15rem 0.4rem; border-radius: 4px; font-weight: 600;">$1</code>');

    // Blockquote
    html = html.replace(/^\> (.*$)/gim, '<blockquote style="border-left: 4px solid #2563EB; padding-left: 1rem; color: #475569; font-style: italic; margin: 1rem 0;">$1</blockquote>');

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li style="margin-left: 1.25rem; margin-bottom: 0.25rem;">$1</li>');

    // Paragraphs
    html = html.replace(/\n\s*\n/gim, '</p><p style="margin-bottom: 1rem; line-height: 1.7; color: #334155;">');
    html = '<p style="margin-bottom: 1rem; line-height: 1.7; color: #334155;">' + html + '</p>';

    return html;
  }

  function updateEditorStatsAndPreview() {
    if (!editorTextarea) return;
    const text = editorTextarea.value.trim();

    // Stats
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const chars = text.length;

    if (wordCountSpan) wordCountSpan.textContent = words + ' words';
    if (charCountSpan) charCountSpan.textContent = chars + ' characters';

    // Preview
    if (previewPane) {
      previewPane.innerHTML = simpleMarkdownParse(text);
    }
  }

  if (editorTextarea) {
    editorTextarea.addEventListener('input', updateEditorStatsAndPreview);
    updateEditorStatsAndPreview();
  }

  // 5. Editor View Mode Toggles (Write / Preview / Split)
  const modeButtons = document.querySelectorAll('.view-mode-btn');
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.dataset.mode;
      if (contentArea) {
        contentArea.classList.remove('mode-write', 'mode-preview', 'mode-split');
        contentArea.classList.add('mode-' + mode);
      }
    });
  });

  // 6. Markdown Formatting Toolbar Actions
  const toolButtons = document.querySelectorAll('.tool-btn');
  toolButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!editorTextarea) return;
      const tool = btn.dataset.tool;
      const start = editorTextarea.selectionStart;
      const end = editorTextarea.selectionEnd;
      const selText = editorTextarea.value.substring(start, end);

      let replacement = '';
      let cursorOffset = 0;

      switch (tool) {
        case 'bold':
          replacement = `**${selText || 'bold text'}**`;
          cursorOffset = selText ? replacement.length : 2;
          break;
        case 'italic':
          replacement = `*${selText || 'italic text'}*`;
          cursorOffset = selText ? replacement.length : 1;
          break;
        case 'h2':
          replacement = `\n## ${selText || 'Section Heading'}\n`;
          cursorOffset = replacement.length;
          break;
        case 'h3':
          replacement = `\n### ${selText || 'Subsection Heading'}\n`;
          cursorOffset = replacement.length;
          break;
        case 'quote':
          replacement = `\n> ${selText || 'Quote text'}\n`;
          cursorOffset = replacement.length;
          break;
        case 'code':
          replacement = selText.includes('\n') 
            ? `\n\`\`\`javascript\n${selText || '// code here'}\n\`\`\`\n`
            : `\`${selText || 'code'}\``;
          cursorOffset = replacement.length;
          break;
        case 'list':
          replacement = `\n- ${selText || 'List item 1'}\n- List item 2\n`;
          cursorOffset = replacement.length;
          break;
        case 'link':
          replacement = `[${selText || 'Link Title'}](https://example.com)`;
          cursorOffset = replacement.length;
          break;
      }

      editorTextarea.setRangeText(replacement, start, end, 'end');
      editorTextarea.focus();
      updateEditorStatsAndPreview();
    });
  });

  // 7. Markdown File Upload (.md)
  const mdFileInput = document.getElementById('mdFileInput');
  const uploadMdBtn = document.getElementById('uploadMdBtn');
  if (uploadMdBtn && mdFileInput) {
    uploadMdBtn.addEventListener('click', () => mdFileInput.click());
    mdFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && editorTextarea) {
        const reader = new FileReader();
        reader.onload = (event) => {
          let text = event.target.result;
          // Strip YAML frontmatter if present
          text = text.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
          editorTextarea.value = text;
          updateEditorStatsAndPreview();
        };
        reader.readAsText(file);
      }
    });
  }

  // 8. FAQ Repeater Management
  const addFaqBtn = document.getElementById('addFaqBtn');
  const faqListContainer = document.getElementById('faqListContainer');
  const emptyFaqPlaceholder = document.getElementById('emptyFaqPlaceholder');

  function updateFaqPlaceholder() {
    if (!faqListContainer || !emptyFaqPlaceholder) return;
    const items = faqListContainer.querySelectorAll('.faq-repeat-item');
    if (items.length === 0) {
      emptyFaqPlaceholder.style.display = 'block';
    } else {
      emptyFaqPlaceholder.style.display = 'none';
    }
  }

  if (addFaqBtn && faqListContainer) {
    addFaqBtn.addEventListener('click', () => {
      const index = faqListContainer.querySelectorAll('.faq-repeat-item').length + 1;
      const faqItem = document.createElement('div');
      faqItem.className = 'faq-repeat-item';
      faqItem.innerHTML = `
        <div class="faq-item-header">
          <span class="faq-item-title">FAQ Item #${index}</span>
          <button type="button" class="faq-remove-btn">&times; Remove</button>
        </div>
        <div class="form-group" style="margin-bottom: 0.65rem;">
          <input type="text" name="faq_questions[]" class="form-input" placeholder="e.g. How long does a custom WordPress build take?" required style="font-weight: 600;">
        </div>
        <div class="form-group">
          <textarea name="faq_answers[]" class="form-textarea" rows="2" placeholder="Provide a detailed, clear answer..." required></textarea>
        </div>
      `;

      faqListContainer.appendChild(faqItem);
      updateFaqPlaceholder();

      // Hook remove button
      const removeBtn = faqItem.querySelector('.faq-remove-btn');
      removeBtn.addEventListener('click', () => {
        faqItem.remove();
        updateFaqIndices();
        updateFaqPlaceholder();
      });
    });
  }

  // Hook existing remove buttons if any
  document.querySelectorAll('.faq-remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = e.target.closest('.faq-repeat-item');
      if (item) {
        item.remove();
        updateFaqIndices();
        updateFaqPlaceholder();
      }
    });
  });

  function updateFaqIndices() {
    if (!faqListContainer) return;
    const items = faqListContainer.querySelectorAll('.faq-repeat-item');
    items.forEach((item, i) => {
      const title = item.querySelector('.faq-item-title');
      if (title) title.textContent = `FAQ Item #${i + 1}`;
    });
  }

  updateFaqPlaceholder();

});
