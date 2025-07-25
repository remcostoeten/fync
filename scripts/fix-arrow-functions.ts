#!/usr/bin/env tsx

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

type TArrowFunctionMatch = {
  file: string;
  line: number;
  original: string;
  fixed: string;
};

function findTypeScriptFiles(dir: string): string[] {
  const files: string[] = [];
  
  function traverse(currentDir: string) {
    const entries = readdirSync(currentDir);
    
    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules' && entry !== 'dist') {
        traverse(fullPath);
      } else if (stat.isFile() && (entry.endsWith('.ts') || entry.endsWith('.tsx'))) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

function detectArrowFunctionConstants(content: string): TArrowFunctionMatch[] {
  const lines = content.split('\n');
  const matches: TArrowFunctionMatch[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Pattern 1: const functionName = () => { ... }
    // Pattern 2: const functionName = async () => { ... }
    // Pattern 3: const functionName = (params) => { ... }
    const arrowFunctionPattern = /^\s*const\s+(\w+)\s*=\s*(async\s+)?\([^)]*\)\s*=>\s*(.*)$/;
    const match = line.match(arrowFunctionPattern);
    
    if (match) {
      const [, functionName, asyncKeyword, body] = match;
      const isAsync = asyncKeyword ? 'async ' : '';
      
      // Extract parameters from the original line
      const paramMatch = line.match(/\(([^)]*)\)/);
      const params = paramMatch ? paramMatch[1] : '';
      
      let fixed: string;
      
      if (body.trim().startsWith('{')) {
        // Multi-line function body
        fixed = `${isAsync}function ${functionName}(${params}) ${body}`;
      } else {
        // Single expression - convert to return statement
        fixed = `${isAsync}function ${functionName}(${params}) {\n${' '.repeat(line.length - line.trimStart().length + 2)}return ${body.replace(/;$/, '')};\n${' '.repeat(line.length - line.trimStart().length)}}`;
      }
      
      matches.push({
        file: '',
        line: i + 1,
        original: line,
        fixed
      });
    }
  }
  
  return matches;
}

function fixArrowFunctions(filePath: string): TArrowFunctionMatch[] {
  const content = readFileSync(filePath, 'utf-8');
  const matches = detectArrowFunctionConstants(content);
  
  if (matches.length === 0) {
    return [];
  }
  
  let fixedContent = content;
  const lines = content.split('\n');
  
  // Process matches in reverse order to maintain line numbers
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    match.file = filePath;
    
    const lineIndex = match.line - 1;
    
    if (match.fixed.includes('\n')) {
      // Multi-line replacement
      const fixedLines = match.fixed.split('\n');
      lines.splice(lineIndex, 1, ...fixedLines);
    } else {
      // Single line replacement
      lines[lineIndex] = match.fixed;
    }
  }
  
  fixedContent = lines.join('\n');
  writeFileSync(filePath, fixedContent, 'utf-8');
  
  return matches;
}

function scanProject(projectPath: string): void {
  const files = findTypeScriptFiles(projectPath);
  const allMatches: TArrowFunctionMatch[] = [];
  
  console.log(`🔍 Scanning ${files.length} TypeScript files for arrow function constants...\n`);
  
  for (const file of files) {
    const matches = fixArrowFunctions(file);
    allMatches.push(...matches);
    
    if (matches.length > 0) {
      console.log(`📝 Fixed ${matches.length} arrow functions in ${file.replace(projectPath, '.')}`);
      for (const match of matches) {
        console.log(`  Line ${match.line}: ${match.original.trim()}`);
        console.log(`  →       ${match.fixed.split('\n')[0].trim()}`);
      }
      console.log('');
    }
  }
  
  if (allMatches.length === 0) {
    console.log('✅ No arrow function constants found!');
  } else {
    console.log(`\n🎉 Successfully fixed ${allMatches.length} arrow function constants across ${new Set(allMatches.map(m => m.file)).size} files.`);
  }
}

// Run the script
const projectPath = process.argv[2] || process.cwd();
scanProject(projectPath);
