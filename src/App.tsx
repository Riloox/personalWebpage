import { ChangeEvent, useEffect, useRef, useState } from 'react';

import HeroSection from './sections/HeroSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import type { LanguageKey } from './data/profile';

const App = () => {
  const [mode, setMode] = useState<'NORMAL' | 'INSERT'>('NORMAL');
  const [statusMessage, setStatusMessage] = useState('Press i to enter INSERT mode, Esc to exit.');
  const [commandActive, setCommandActive] = useState(false);
  const [commandLine, setCommandLine] = useState('');
  const [customHtml, setCustomHtml] = useState<string | null>(null);
  const [language, setLanguage] = useState<LanguageKey>('en');
  const [easyMode, setEasyMode] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const draftHtmlRef = useRef('');

  const getEditorHtml = () => editorRef.current?.innerHTML ?? '';

  const handleSave = () => {
    const html = draftHtmlRef.current || getEditorHtml();
    if (!html.trim()) {
      setStatusMessage('Nothing to save.');
      return;
    }

    setCustomHtml(html);
    draftHtmlRef.current = html;
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

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) {
      setStatusMessage('No file selected.');
      return;
    }

    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed || typeof parsed.html !== 'string') {
        throw new Error('Invalid file format.');
      }

      draftHtmlRef.current = parsed.html;
      setCustomHtml(parsed.html);
      setMode('NORMAL');
      setCommandActive(false);
      setCommandLine('');
      setStatusMessage('Loaded content from JSON export.');
      editorRef.current?.blur();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to load JSON file.');
    } finally {
      input.value = '';
    }
  };

  const handleEditorInput = () => {
    draftHtmlRef.current = getEditorHtml();
  };

  const easyCommandConfig = [
    { label: 'Save', cmd: 'w' },
    { label: 'Load JSON', cmd: 'load' },
    { label: 'Espa\u00f1ol', cmd: ':esp' },
    { label: 'English', cmd: ':en' },
    { label: 'Clear', cmd: 'cls' },
  ];

  const easyModeLabel = language === 'es' ? 'Modo f\u00e1cil' : 'Easy mode';
  const easyModeStateLabel = language === 'es' ? (easyMode ? 'ACTIVO' : 'APAGADO') : easyMode ? 'ON' : 'OFF';
  const isEditable = mode === 'INSERT' && customHtml !== null;

  const exitInsertMode = () => {
    if (mode !== 'INSERT') {
      return;
    }
    setMode('NORMAL');
    if (draftHtmlRef.current.trim()) {
      setCustomHtml(draftHtmlRef.current);
    }
    editorRef.current?.blur();
  };

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const normalized = trimmed.toLowerCase();
    switch (normalized) {
      case 'w':
      case 'wq':
        handleSave();
        break;
      case 'load':
        exitInsertMode();
        setStatusMessage('Select a JSON export to load.');
        fileInputRef.current?.click();
        break;
      case 'esp':
      case ':esp':
        exitInsertMode();
        setLanguage('es');
        setCustomHtml(null);
        draftHtmlRef.current = '';
        setStatusMessage('Idioma cambiado a espa\u00f1ol.');
        break;
      case 'en':
      case ':en':
        exitInsertMode();
        setLanguage('en');
        setCustomHtml(null);
        draftHtmlRef.current = '';
        setStatusMessage('Language switched to English.');
        break;
      case 'q':
      case 'q!':
        setStatusMessage('Cannot quit. Shell must stay open.');
        break;
      case 'cls':
        exitInsertMode();
        setCustomHtml(null);
        draftHtmlRef.current = '';
        setStatusMessage('Screen cleared. Default content restored.');
        break;
      default:
        setStatusMessage(trimmed ? `Bad command or file name: ${trimmed}` : 'Command cancelled');
    }
  };

  const handleEasyToggle = () => {
    setEasyMode((prev) => {
      const next = !prev;
      if (next) {
        setCommandActive(false);
        setCommandLine('');
        setStatusMessage('Easy mode enabled. Use the buttons below to run commands.');
      } else {
        setStatusMessage('Easy mode disabled. Type : to enter command mode.');
      }
      return next;
    });
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (!easyMode && commandActive) {
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

      if (!easyMode && mode === 'NORMAL' && event.key === ':') {
        setCommandActive(true);
        setCommandLine('');
        setStatusMessage('Command mode');
        event.preventDefault();
        return;
      }

      if (mode === 'NORMAL' && event.key === 'i') {
        const html = getEditorHtml();
        if (!customHtml) {
          setCustomHtml(html);
        }
        draftHtmlRef.current = html;
        setMode('INSERT');
        setStatusMessage('-- INSERT -- editing buffer');
        requestAnimationFrame(() => editorRef.current?.focus());
        event.preventDefault();
        return;
      }

      if (mode === 'INSERT' && event.key === 'Escape') {
        exitInsertMode();
        setStatusMessage('-- NORMAL -- press i to edit again');
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mode, commandActive, commandLine, easyMode, customHtml]);

  return (
    <div className="app-shell">
      <div className="dos-shell">
        <button
          type="button"
          className={`easy-toggle${easyMode ? ' active' : ''}`}
          aria-pressed={easyMode}
          onClick={handleEasyToggle}
        >
          {easyModeLabel} {easyModeStateLabel}
        </button>
        <main
          className="dos-screen"
          tabIndex={0}
          ref={editorRef}
          data-mode={mode.toLowerCase()}
          contentEditable={isEditable}
          suppressContentEditableWarning
          spellCheck={false}
          onInput={handleEditorInput}
        >
          {customHtml ? (
            <div dangerouslySetInnerHTML={{ __html: customHtml }} />
          ) : (
            <>
              <HeroSection language={language} />
              <SkillsSection language={language} />
              <ExperienceSection language={language} />
              <ProjectsSection language={language} />
              <ContactSection language={language} />
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
          <span className="vim-mode">
            {mode}
            {easyMode ? ' \u00b7 EASY' : ''}
          </span>
          <span className="vim-message">{statusMessage}</span>
          {easyMode ? (
            <div className="easy-command-group" role="group" aria-label="Easy mode commands">
              {easyCommandConfig.map(({ label, cmd }) => (
                <button
                  key={cmd}
                  type="button"
                  className="easy-command-button"
                  onClick={() => runCommand(cmd)}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : commandActive ? (
            <span className="vim-command">
              :{commandLine}
              <span className="vim-command-cursor" />
            </span>
          ) : (
            <span className="vim-hint">Type i to edit - :w to save/export - :load to import - :esp / :en to switch language - Esc to return</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
