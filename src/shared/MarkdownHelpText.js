import React from "react";

const MarkdownHelpText = ({ className }) => {
  return (
    <div className={className}>
      <p className="text-gray-800 text-xs">
        You can refer to
        <a
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/pulse/your-guide-writing-resume-objectives-objective-examples-leila-morgan/"
        >
          LinkedIn Guide
        </a>
        to help you write a good resume objective.
      </p>
    </div>
  );
};

export default MarkdownHelpText;
