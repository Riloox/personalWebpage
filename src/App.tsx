import { ChangeEvent, useEffect, useRef, useState } from 'react';

import HeroSection from './sections/HeroSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import EducationSection from './sections/EducationSection';
import CertificationsSection from './sections/CertificationsSection';
import ContactSection from './sections/ContactSection';
import type { LanguageKey } from './data/profile';

type Mode = 'NORMAL' | 'INSERT';

const SECTION_TABS = [
  { id: 'hero', file: 'about.md' },
  { id: 'skills', file: 'skills.txt' },
  { id: 'experience', file: 'history.log' },
  { id: 'projects', file: 'projects.md' },
  { id: 'education', file: 'education.log' },
  { id: 'certifications', file: 'certs.txt' },
  { id: 'contact', file: 'connect.sh' },
];

const App = () => {
  const [mode, setMode] = useState<Mode>('NORMAL');
  const [statusMessage, setStatusMessage] = useState('Press i to edit, : for commands, ? for help.');
  const [commandActive, setCommandActive] = useState(false);
  const [commandLine, setCommandLine] = useState('');
  const [customHtml, setCustomHtml] = useState<string | null>(null);
  const [language, setLanguage] = useState<LanguageKey>('en');
  const [easyMode, setEasyMode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const draftHtmlRef = useRef('');

  const getEditorHtml = () => editorRef.current?.innerHTML ?? '';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      setEasyMode(true);
    }
  }, []);

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
    { label: 'Help', cmd: 'help' },
  ];

  const easyModeLabel = language === 'es' ? 'Modo f\u00e1cil' : 'Easy mode';
  const easyModeStateLabel = language === 'es' ? (easyMode ? 'ACTIVO' : 'APAGADO') : easyMode ? 'ON' : 'OFF';
  const isEditable = mode === 'INSERT' && customHtml !== null;

  const exitInsertMode = () => {
    if (mode !== 'INSERT') return;
    setMode('NORMAL');
    if (draftHtmlRef.current.trim()) {
      setCustomHtml(draftHtmlRef.current);
    }
    editorRef.current?.blur();
  };

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const normalized = trimmed.toLowerCase().replace(/^:/, '');
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
        exitInsertMode();
        setLanguage('es');
        setCustomHtml(null);
        draftHtmlRef.current = '';
        setStatusMessage('Idioma cambiado a espa\u00f1ol.');
        break;
      case 'en':
        exitInsertMode();
        setLanguage('en');
        setCustomHtml(null);
        draftHtmlRef.current = '';
        setStatusMessage('Language switched to English.');
        break;
      case 'q':
      case 'q!':
        setStatusMessage('E37: No write since last change. (The shell must stay open.)');
        break;
      case 'cls':
        exitInsertMode();
        setCustomHtml(null);
        draftHtmlRef.current = '';
        setStatusMessage('Screen cleared. Default content restored.');
        break;
      case 'help':
      case 'h':
        setShowHelp(true);
        setStatusMessage('Help opened. Press Esc to close.');
        break;
      default:
        setStatusMessage(trimmed ? `E492: Not a command: ${trimmed}` : 'Command cancelled');
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
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (showHelp) {
        if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
          setShowHelp(false);
          event.preventDefault();
        }
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

      if (mode === 'NORMAL' && event.key === '?') {
        setShowHelp(true);
        event.preventDefault();
        return;
      }

      if (mode === 'NORMAL' && event.key === 'i') {
        const html = getEditorHtml();
        if (!customHtml) setCustomHtml(html);
        draftHtmlRef.current = html;
        setMode('INSERT');
        setStatusMessage('-- INSERT -- editing buffer');
        requestAnimationFrame(() => editorRef.current?.focus());
        event.preventDefault();
        return;
      }

      if (mode === 'INSERT' && event.key === 'Escape') {
        exitInsertMode();
        setStatusMessage('-- NORMAL -- press i to edit, : for commands, ? for help');
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mode, commandActive, commandLine, easyMode, customHtml, showHelp]);

  const titleBarText = `fprunell@portfolio: ~/portfolio \u2014 vim`;

  return (
    <div className="app-shell">
      <div className="terminal-window">
        <header className="terminal-titlebar">
          <div className="titlebar-controls" aria-hidden="true">
            <span className="titlebar-dot red" />
            <span className="titlebar-dot yellow" />
            <span className="titlebar-dot green" />
          </div>
          <div className="titlebar-title">{titleBarText}</div>
          <button
            type="button"
            className={`easy-toggle${easyMode ? ' active' : ''}`}
            aria-pressed={easyMode}
            onClick={handleEasyToggle}
          >
            {easyModeLabel} {easyModeStateLabel}
          </button>
        </header>

        <nav className="terminal-tabs" aria-label="Sections">
          {SECTION_TABS.map((tab) => (
            <a key={tab.id} href={`#${tab.id}`} className="terminal-tab">
              <span className="tab-icon">{'\u25CF'}</span>
              {tab.file}
            </a>
          ))}
        </nav>

        <div className="terminal-body">
          <main
            className="dos-screen"
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
                <EducationSection language={language} />
                <CertificationsSection language={language} />
                <ContactSection language={language} />
              </>
            )}
          </main>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />

        <div className="dos-status" aria-live="polite">
          <span className={`vim-mode mode-${mode.toLowerCase()}`}>
            {mode}
            {easyMode ? ' \u00b7 EASY' : ''}
          </span>
          {commandActive ? (
            <span className="vim-command">
              :{commandLine}
              <span className="vim-command-cursor" />
            </span>
          ) : (
            <>
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
              ) : (
                <span className="vim-hint">i edit &middot; : cmd &middot; ? help</span>
              )}
            </>
          )}
        </div>
      </div>

      {showHelp && (
        <div
          className="help-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Help"
          onClick={() => setShowHelp(false)}
        >
          <div className="help-panel" onClick={(event) => event.stopPropagation()}>
            <h2>:help keybindings</h2>
            <dl>
              <dt>i</dt>
              <dd>Enter INSERT mode &mdash; edit the rendered buffer</dd>
              <dt>Esc</dt>
              <dd>Return to NORMAL mode / close overlays</dd>
              <dt>:</dt>
              <dd>Open command mode</dd>
              <dt>:w / :wq</dt>
              <dd>Save buffer as a JSON export</dd>
              <dt>:load</dt>
              <dd>Import a previously saved JSON buffer</dd>
              <dt>:esp / :en</dt>
              <dd>Switch language (Spanish / English)</dd>
              <dt>:cls</dt>
              <dd>Clear the buffer and restore default sections</dd>
              <dt>?</dt>
              <dd>Open this help panel</dd>
            </dl>
            <p className="help-hint">press Esc to close</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
