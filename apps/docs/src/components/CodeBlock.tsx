import { Copy, Check } from 'lucide-react';
import { useClipboard } from '../hooks/useClipboard';
import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';

type TProps = {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language, title, showLineNumbers = true }: TProps) {
  const { copied, copyToClipboard } = useClipboard();
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    const highlighted = Prism.highlight(code, Prism.languages[language] || Prism.languages.javascript, language);
    setHighlightedCode(highlighted);
  }, [code, language]);

  function getLineNumbers() {
    const lines = code.split('\n');
    return lines.map((_, index) => (
      <div
        key={index}
        className="text-muted-foreground/60 text-right pr-3 select-none"
        style={{ minWidth: '2rem' }}
      >
        {index + 1}
      </div>
    ));
  }

  return (
    <div
      className="bg-card rounded-lg overflow-hidden border border-border"
    >
      {title && (
        <div
          className="bg-muted px-4 py-2 border-b border-border"
        >
          <div
            className="flex items-center justify-between"
          >
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
            <span className="text-xs text-muted-foreground">{language}</span>
          </div>
        </div>
      )}
      <div className="relative">
        <button
          onClick={() => copyToClipboard(code)}
          className="absolute top-3 right-3 p-2 rounded-md bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors flex items-center justify-center z-10"
          title="Copy code"
        >
          <div>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </div>
          {copied && (
            <span
              className="absolute right-full mr-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded whitespace-nowrap"
            >
              Copied!
            </span>
          )}
        </button>
        <div
          className={`text-sm overflow-x-auto ${showLineNumbers ? 'bg-muted/10' : ''}`}
        >
          <div className="flex">
            {showLineNumbers && (
              <div
                className="flex flex-col py-4 pl-4 bg-muted/20 border-r border-border"
              >
                {getLineNumbers()}
              </div>
            )}
            <pre
              className="flex-1 p-4 m-0 text-left"
            >
              <code 
                className={`language-${language}`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}