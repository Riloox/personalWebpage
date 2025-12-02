import { ChangeEvent, useEffect, useRef, useState } from 'react';

import HeroSection from './sections/HeroSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

const App = () => {
  const [mode, setMode] = useState<'NORMAL' | 'INSERT'>('NORMAL');
  const [statusMessage, setStatusMessage] = useState('Press i to enter INSERT mode, Esc to exit.');
  const [commandActive, setCommandActive] = useState(false);
  const [commandLine, setCommandLine] = useState('');
  const [customHtml, setCustomHtml] = useState<string | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getEditorHtml = () => editorRef.current?.innerHTML ?? '';

  const handleSave = () => {
    const html = getEditorHtml();
    if (!html.trim()) {
      setStatusMessage('Nothing to save.');
      return;
    }

    setCustomHtml(html);
    const payload = JSON.stringify({ html }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const filename = `portfolio-export-${Date.now()}.json`;

    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatusMessage(`Saved buffer to ${filename}`);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setStatusMessage('No file selected.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (!parsed || typeof parsed.html !== 'string') {
          throw new Error('Invalid file format.');
        }
        setCustomHtml(parsed.html);
        setStatusMessage('Loaded content from JSON export.');
      } catch (error) {
        setStatusMessage(error instanceof Error ? error.message : 'Unable to load JSON file.');
      } finally {
        event.target.value = '';
      }
    };

    reader.readAsText(file);
  };

  const handleEditorInput = () => {
    const html = getEditorHtml();
    if (html.trim()) {
      setCustomHtml(html);
    }
  };

  useEffect(() => {
    const runCommand = (cmd: string) => {
      const trimmed = cmd.trim();
      const normalized = trimmed.toLowerCase();
      switch (normalized) {
        case 'w':
        case 'wq':
          handleSave();
          break;
        case 'load':
          setStatusMessage('Select a JSON export to load.');
          fileInputRef.current?.click();
          break;
        case 'q':
        case 'q!':
          setStatusMessage('Cannot quit. Shell must stay open.');
          break;
        case 'cls':
          setCustomHtml(null);
          setStatusMessage('Screen cleared. Default content restored.');
          break;
        default:
          setStatusMessage(trimmed ? `Bad command or file name: ${trimmed}` : 'Command cancelled');
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (commandActive) {
        if (event.key === 'Enter') {
          runCommand(commandLine);
          setCommandLine('');
          setCommandActive(false);
          event.preventDefault();
          return;
        }

        if (event.key === 'Escape') {
          setCommandActive(false);
          setCommandLine('');
          setStatusMessage('Command cancelled');
          event.preventDefault();
          return;
        }

        if (event.key === 'Backspace') {
          setCommandLine((prev) => prev.slice(0, -1));
          event.preventDefault();
          return;
        }

        if (event.key.length === 1) {
          setCommandLine((prev) => prev + event.key);
          event.preventDefault();
        }
        return;
      }

      if (mode === 'NORMAL' && event.key === ':') {
        setCommandActive(true);
        setCommandLine('');
        setStatusMessage('Command mode');
        event.preventDefault();
        return;
      }

      if (mode === 'NORMAL' && event.key === 'i') {
        setMode('INSERT');
        setStatusMessage('-- INSERT -- editing buffer');
        requestAnimationFrame(() => editorRef.current?.focus());
        event.preventDefault();
        return;
      }

      if (mode === 'INSERT' && event.key === 'Escape') {
        setMode('NORMAL');
        setStatusMessage('-- NORMAL -- press i to edit again');
        editorRef.current?.blur();
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mode, commandActive, commandLine]);

  return (
    <div className="app-shell">
      <div className="dos-shell">
        <main
          className="dos-screen"
          tabIndex={0}
          ref={editorRef}
          data-mode={mode.toLowerCase()}
          contentEditable={mode === 'INSERT'}
          suppressContentEditableWarning
          spellCheck={false}
          onInput={handleEditorInput}
        >
          {customHtml ? (
            <div dangerouslySetInnerHTML={{ __html: customHtml }} />
          ) : (
            <>
              <HeroSection />
              <SkillsSection />
              <ExperienceSection />
              <ProjectsSection />
              <ContactSection />
            </>
          )}
        </main>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />

        <div className="dos-status" aria-live="polite">
          <span className="vim-mode">{mode}</span>
          <span className="vim-message">{statusMessage}</span>
          {commandActive ? (
            <span className="vim-command">
              :{commandLine}
              <span className="vim-command-cursor" />
            </span>
          ) : (
            <span className="vim-hint">Type i to edit - :w to save/export - :load to import - Esc to return</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
