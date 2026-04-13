interface PromptProps {
  path: string;
  cmd: string;
  user?: string;
}

const Prompt = ({ path, cmd, user = 'fprunell@portfolio' }: PromptProps) => (
  <p className="dos-line">
    <span className="prompt-user">{user}</span>
    <span className="prompt-sep">:</span>
    <span className="prompt-path">{path}</span>
    <span className="prompt-symbol">$</span>
    <span className="prompt-cmd">{cmd}</span>
  </p>
);

export default Prompt;
