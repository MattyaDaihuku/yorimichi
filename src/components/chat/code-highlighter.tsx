"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeHighlighterProps {
    language: string;
    codeText: string;
}

export default function CodeHighlighter({ language, codeText }: CodeHighlighterProps) {
    return (
        <SyntaxHighlighter
            language={language}
            style={oneDark}
            customStyle={{
                margin: 0,
                maxWidth: "100%",
                overflowX: "auto",
                borderRadius: "0.5rem",
                padding: "1rem",
                fontSize: "0.95rem",
                lineHeight: "1.6",
            }}
        >
            {codeText}
        </SyntaxHighlighter>
    );
}